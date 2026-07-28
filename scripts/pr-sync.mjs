#!/usr/bin/env node
// PR automation for the Harness Code remote.
//
// On push (via .husky/pre-push) this creates or updates the pull request for the
// current branch: conventional-commit title, Gemini or deterministic summary,
// preview table (skipping frontmatter-only doc changes), then polls for the CI
// Netlify draft URL and rewrites preview links when the build finishes.
//
// Config: copy .env.example to .env at the repo root and fill in your PAT(s).
//
// Usage:
//   npm run pr-sync
//   node scripts/pr-sync.mjs --dry-run

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import {
  buildPreviewTableMarkdown,
  classifyChangedDocsFromNameStatus,
} from './lib/pr-preview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const LOG = '[pr-sync]';
const DRY_RUN = process.argv.includes('--dry-run');

// Only these two types are used for now. `feat` for new/expanded docs, else `chore`.
const CONVENTIONAL_TYPES = ['feat', 'chore'];
const DEFAULT_TYPE = 'chore';

// Harness Code label ids for this repo (from GET /repos/developer-hub/+/labels).
const LABELS = {
  chore: 34,
  choreContentCleanup: 240, // "Content - chore/cleanup"
  choreContentGap: 251, // "Content - gap / tech debt"
  enhancement: 5,
  enhancementContent: 245, // "Content - enhancement"
};

const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_TIMEOUT_MS = 20000;

// How long to wait for a freshly-pushed branch to appear on the remote.
const BRANCH_WAIT_ATTEMPTS = 15;
const BRANCH_WAIT_INTERVAL_MS = 2000;

// The CI preview build never finishes before ~10 min, so wait that long before
// the first check, then poll every 5 min until a fresh preview URL appears.
const PREVIEW_INITIAL_DELAY_MS = 10 * 60 * 1000; // 10 min before first check
const PREVIEW_POLL_INTERVAL_MS = 5 * 60 * 1000; // then every 5 min
const PREVIEW_MAX_CHECKS = 7; // 10 + 6*5 = up to ~40 min total window
const PREVIEW_BOT = 'developer-hub-bot';
// The bot comment reads: "... Current Draft URL is: https://<hash>--harness-developer.netlify.app"
const PREVIEW_URL_RE = /Current Draft URL is:\s*(https:\/\/[^\s]+--harness-developer\.netlify\.app)\b/i;

function log(msg) {
  console.log(`${LOG} ${msg}`);
}

function git(args) {
  return execSync(`git ${args}`, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
}

// --- env ---------------------------------------------------------------------

function loadEnv() {
  const env = {};
  const envPath = path.join(REPO_ROOT, '.env');
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

// PAT format is `pat.<accountId>.<...>.<...>`; segment 1 is the owning account.
function accountOfToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  return parts.length >= 2 ? parts[1] : null;
}

// --- remote parsing ----------------------------------------------------------

// origin: https://git0.harness.io/<acct>/<org>/<project>/<repo>.git
function parseRemote() {
  const remote = git('remote get-url origin');
  const host = (remote.match(/https?:\/\/([^/]+)\//) || [])[1] || 'git0.harness.io';
  const tail = remote.replace(/^.*\/\/[^/]+\//, '').replace(/\.git$/, '');
  const [account, org, project, repo] = tail.split('/');
  // git0.harness.io -> harness0.harness.io is the UI/gateway host for this cluster.
  // app.harness.io stays app.harness.io.
  let apiHost;
  if (host.startsWith('git.')) apiHost = host.replace(/^git\./, 'app.');
  else if (host.startsWith('git0.')) apiHost = host.replace(/^git0\./, 'harness0.');
  else apiHost = host.replace(/^git/, ''); // best-effort fallback
  return { account, org, project, repo, apiHost };
}

// --- title / body generation -------------------------------------------------

function extractJira(branch) {
  const m = branch.match(/([A-Z][A-Z0-9]+-\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

function humanizeBranch(branch) {
  // HDH-933/relist-iacm-cli -> relist iacm cli
  let s = branch.replace(/^[A-Z][A-Z0-9]+-\d+[/_-]*/i, '');
  s = s.replace(/[/_-]+/g, ' ').trim();
  return s || branch;
}

function detectType(commitSubject) {
  const m = commitSubject.match(/^(\w+)(\([^)]*\))?!?:/);
  if (m && CONVENTIONAL_TYPES.includes(m[1].toLowerCase())) {
    return m[1].toLowerCase();
  }
  return DEFAULT_TYPE;
}

// Strip a leading `type(scope): ` and any leading `JIRA-123` from a subject.
function cleanSubject(subject, jira) {
  let s = subject.replace(/^(\w+)(\([^)]*\))?!?:\s*/, '');
  if (jira) {
    s = s.replace(new RegExp(`^\\s*${jira}\\s*[:\\-]?\\s*`, 'i'), '');
  }
  return s.trim();
}

function buildTitle({ branch, latestSubject }) {
  const jira = extractJira(branch);
  const type = detectType(latestSubject);
  let desc = cleanSubject(latestSubject, jira);
  if (!desc) desc = humanizeBranch(branch);
  // lower-case first char to match the repo's existing PR titles
  desc = desc.charAt(0).toLowerCase() + desc.slice(1);
  return jira ? `${type}: [${jira}]: ${desc}` : `${type}: ${desc}`;
}

// Collect the raw git material for a summary: commit subjects + diffstat vs base.
// Uses three-dot (merge-base) diffs so files merged into the base after this
// branch diverged are NOT counted as this PR's changes.
function collectChangeData(baseRef) {
  let commits = [];
  let diffstat = '';
  let files = [];
  try {
    commits = git(`log ${baseRef}..HEAD --pretty=format:%s`).split('\n').filter(Boolean);
  } catch { /* base may not exist locally */ }
  try {
    diffstat = git(`diff --stat ${baseRef}...HEAD`);
    files = git(`diff --name-status ${baseRef}...HEAD`).split('\n').filter(Boolean);
  } catch { /* ignore */ }
  return { commits, diffstat, files };
}

function deterministicSummary({ commits, files }) {
  const lines = [];
  if (commits.length) {
    lines.push('This PR includes the following changes:');
    lines.push('');
    for (const c of commits) lines.push(`- ${c}`);
  }
  if (files.length) {
    lines.push('');
    lines.push(`**Files changed (${files.length}):**`);
    lines.push('');
    for (const f of files.slice(0, 25)) {
      const [status, ...rest] = f.split('\t');
      lines.push(`- \`${status}\` ${rest.join('\t')}`);
    }
    if (files.length > 25) lines.push(`- …and ${files.length - 25} more`);
  }
  if (!lines.length) lines.push('Documentation updates.');
  return lines.join('\n');
}

// Returns { summary, choreKind } where choreKind is 'cleanup' | 'gap' | null.
// choreKind classifies a chore Markdown change so the caller can pick between
// the "Content - chore/cleanup" and "Content - gap / tech debt" labels.
async function geminiSummary({ apiKey, title, commits, diffstat, files }) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = [
    'You are writing the "Pull Request Summary" section of a documentation pull request for the Harness Developer Hub.',
    'Follow this house style: present tense, active voice, address the reader as "you", no contractions, no em dashes, no "please".',
    'Do NOT invent changes that are not shown below.',
    '',
    'Return ONLY a JSON object (no code fences, no prose outside it) with exactly these keys:',
    '- "summary": a Markdown string. One short intro paragraph (2-3 sentences) describing what the PR changes and why it matters, then a bullet list under a bold "**Key updates:**" label. No heading above the intro, no title.',
    '- "choreKind": one of "cleanup", "gap", or null. Set "cleanup" when the change polishes, reformats, fixes, or tidies existing documentation. Set "gap" when it fills missing/outdated content or pays down documentation tech debt. Use null if this is clearly a feature/enhancement rather than a chore.',
    '',
    `PR title: ${title}`,
    '',
    'Commit subjects:',
    commits.length ? commits.map((c) => `- ${c}`).join('\n') : '(none)',
    '',
    'Diffstat:',
    diffstat || '(none)',
    '',
    'Changed files:',
    files.length ? files.join('\n') : '(none)',
  ].join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  try {
    const result = await model.generateContent(
      { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
      { signal: controller.signal },
    );
    const text = result.response.text().trim();
    const jsonStr = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    try {
      const parsed = JSON.parse(jsonStr);
      const choreKind = ['cleanup', 'gap'].includes(parsed.choreKind) ? parsed.choreKind : null;
      return { summary: (parsed.summary || '').trim(), choreKind };
    } catch {
      // Model returned prose instead of JSON — treat the whole thing as the summary.
      return { summary: text, choreKind: null };
    }
  } finally {
    clearTimeout(timer);
  }
}

// Fill the template: replace the intro block and rebuild the Preview/JIRA table.
function fillTemplate({ template, summary, jira, previewPages, previewBase }) {
  let body = template;

  const summaryBlock = `## Pull Request Summary\n\n${summary}\n`;
  const firstRuleIdx = body.indexOf('\n---');
  if (firstRuleIdx !== -1) {
    body = summaryBlock + body.slice(firstRuleIdx);
  } else {
    body = summaryBlock + '\n\n' + body;
  }

  const table = buildPreviewTableMarkdown(previewPages, { jiraTicket: jira, previewBase });
  body = body.replace(
    /\|\s*Description\s*\|\s*Link\s*\|[\s\S]*?\n\n/,
    table + '\n\n',
  );

  return body;
}

// --- label selection ---------------------------------------------------------

// files come from `git diff --name-status`, e.g. "M\tdocs/foo.md".
function touchesMarkdown(files) {
  return files.some((f) => {
    const p = f.split('\t').pop() || '';
    return /\.(md|mdx)$/i.test(p);
  });
}

// Decide the single label id to ensure on the PR.
function resolveLabelId({ type, files, choreKind }) {
  const isContent = touchesMarkdown(files);
  if (type === 'feat') {
    return isContent ? LABELS.enhancementContent : LABELS.enhancement;
  }
  // chore
  if (!isContent) return LABELS.chore;
  return choreKind === 'gap' ? LABELS.choreContentGap : LABELS.choreContentCleanup;
}

// --- Harness Code API --------------------------------------------------------

function apiRequest({ apiHost, token, method, apiPath, query, body }) {
  const qs = new URLSearchParams(query).toString();
  const url = `https://${apiHost}/gateway/code/api/v1/${apiPath}?${qs}`;
  return new Promise((resolve, reject) => {
    import('https').then(({ default: https }) => {
      const payload = body ? JSON.stringify(body) : null;
      const req = https.request(
        url,
        {
          method,
          headers: {
            'x-api-key': token,
            'Content-Type': 'application/json',
            ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            let parsed = null;
            try { parsed = data ? JSON.parse(data) : null; } catch { /* non-JSON */ }
            resolve({ status: res.statusCode, body: parsed, raw: data });
          });
        },
      );
      req.on('error', reject);
      if (payload) req.write(payload);
      req.end();
    });
  });
}

async function findOpenPR({ ctx, token, branch }) {
  const res = await apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'GET',
    apiPath: `repos/${ctx.repo}/+/pullreq`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
      source_branch: branch,
      state: 'open',
    },
  });
  if (res.status !== 200 || !Array.isArray(res.body)) return null;
  return res.body.find((pr) => pr.source_branch === branch) || res.body[0] || null;
}

async function createPR({ ctx, token, branch, base, title, description }) {
  return apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'POST',
    apiPath: `repos/${ctx.repo}/+/pullreq`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
    },
    body: { source_branch: branch, target_branch: base, title, description, is_draft: false },
  });
}

async function updatePR({ ctx, token, number, title, description }) {
  return apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'PATCH',
    apiPath: `repos/${ctx.repo}/+/pullreq/${number}`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
    },
    body: { title, description },
  });
}

async function listPRLabels({ ctx, token, number }) {
  const res = await apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'GET',
    apiPath: `repos/${ctx.repo}/+/pullreq/${number}/labels`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
    },
  });
  // Response shape: { label_data: [{ id, key, ... }] } (types.ScopesLabels).
  if (res.status !== 200 || !res.body) return [];
  const arr = res.body.label_data || res.body.labels || (Array.isArray(res.body) ? res.body : []);
  return arr.map((l) => l.id).filter((id) => id != null);
}

async function assignPRLabel({ ctx, token, number, labelId }) {
  return apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'PUT',
    apiPath: `repos/${ctx.repo}/+/pullreq/${number}/labels`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
    },
    body: { label_id: labelId },
  });
}

async function listActivities({ ctx, token, number }) {
  const res = await apiRequest({
    apiHost: ctx.apiHost,
    token,
    method: 'GET',
    apiPath: `repos/${ctx.repo}/+/pullreq/${number}/activities`,
    query: {
      accountIdentifier: ctx.account,
      orgIdentifier: ctx.org,
      projectIdentifier: ctx.project,
      routingId: ctx.account,
    },
  });
  return res.status === 200 && Array.isArray(res.body) ? res.body : [];
}

// Find the newest bot preview URL posted at/after `sinceMs`. Returns the base
// origin (https://<hash>--harness-developer.netlify.app) or null.
async function latestPreviewBase({ ctx, token, number, sinceMs }) {
  const activities = await listActivities({ ctx, token, number });
  let best = null;
  let bestTime = 0;
  for (const a of activities) {
    if (a.type !== 'comment') continue;
    const isBot = a.author?.display_name === PREVIEW_BOT || a.author?.type === 'serviceaccount';
    if (!isBot) continue;
    const t = a.created || a.edited || 0;
    if (t < sinceMs) continue;
    const m = (a.text || '').match(PREVIEW_URL_RE);
    if (m && t >= bestTime) {
      bestTime = t;
      best = m[1].replace(/\/+$/, '');
    }
  }
  return best;
}

// Wait for the fresh preview URL: hold off for the initial delay (the build is
// never ready sooner), then poll on the interval until it appears or we give up.
async function waitForPreviewBase({ ctx, token, number, sinceMs }) {
  await new Promise((r) => setTimeout(r, PREVIEW_INITIAL_DELAY_MS));
  for (let i = 0; i < PREVIEW_MAX_CHECKS; i++) {
    const base = await latestPreviewBase({ ctx, token, number, sinceMs });
    if (base) return base;
    if (i < PREVIEW_MAX_CHECKS - 1) {
      await new Promise((r) => setTimeout(r, PREVIEW_POLL_INTERVAL_MS));
    }
  }
  return null;
}

// Add-only: ensure labelId is present; never remove existing labels.
async function ensureLabel({ ctx, token, number, labelId }) {
  const current = await listPRLabels({ ctx, token, number });
  if (current.includes(labelId)) {
    log(`Label ${labelId} already on PR #${number}.`);
    return;
  }
  const res = await assignPRLabel({ ctx, token, number, labelId });
  if (res.status >= 200 && res.status < 300) {
    log(`Added label ${labelId} to PR #${number}.`);
  } else {
    log(`Label assign failed (HTTP ${res.status}): ${res.raw?.slice(0, 200)}`);
  }
}

// --- helpers -----------------------------------------------------------------

function resolveBaseRef() {
  // Prefer the tracked default branch; fall back to origin/main then main.
  const candidates = [];
  try { candidates.push(git('symbolic-ref --short refs/remotes/origin/HEAD')); } catch { /* not set */ }
  candidates.push('origin/main', 'main');
  for (const c of candidates) {
    try { git(`rev-parse --verify --quiet ${c}`); return c; } catch { /* try next */ }
  }
  return 'origin/main';
}

async function waitForBranchOnRemote(branch) {
  for (let i = 0; i < BRANCH_WAIT_ATTEMPTS; i++) {
    try {
      const out = git(`ls-remote --heads origin ${branch}`);
      if (out.includes(`refs/heads/${branch}`)) return true;
    } catch { /* transient */ }
    if (i < BRANCH_WAIT_ATTEMPTS - 1) {
      await new Promise((r) => setTimeout(r, BRANCH_WAIT_INTERVAL_MS));
    }
  }
  return false;
}

// --- main --------------------------------------------------------------------

async function main() {
  const env = loadEnv();
  const ctx = parseRemote();

  const branch = git('rev-parse --abbrev-ref HEAD');
  if (branch === 'HEAD' || branch === 'main') {
    log(`On '${branch}' — nothing to do.`);
    return;
  }

  // Pick the token whose embedded account matches this repo's account.
  const candidateTokens = [env.HARNESS0_API_KEY, env.HARNESS_API_KEY].filter(Boolean);
  const token = candidateTokens.find((t) => accountOfToken(t) === ctx.account);
  if (!token) {
    log(`No API token in .env matches repo account ${ctx.account}.`);
    log('Add a PAT for that account as HARNESS0_API_KEY (or HARNESS_API_KEY). Skipping.');
    return;
  }

  const baseLocalRef = resolveBaseRef();
  const baseBranch = baseLocalRef.replace(/^origin\//, '') || 'main';

  const latestSubject = git('log -1 --pretty=format:%s');
  const title = buildTitle({ branch, latestSubject });
  const jira = extractJira(branch);
  const type = detectType(latestSubject);

  const { commits, diffstat, files } = collectChangeData(baseLocalRef);

  let summary;
  let choreKind = null;
  if (env.GEMINI_API_KEY) {
    try {
      const g = await geminiSummary({ apiKey: env.GEMINI_API_KEY, title, commits, diffstat, files });
      summary = g.summary;
      choreKind = g.choreKind;
      log('Summary generated with Gemini.');
    } catch (e) {
      log(`Gemini summary failed (${e.message}); using deterministic summary.`);
    }
  }
  if (!summary) summary = deterministicSummary({ commits, files });

  const labelId = resolveLabelId({ type, files, choreKind });
  const labelName = Object.keys(LABELS).find((k) => LABELS[k] === labelId);

  const { previewPages, frontmatterOnly } = classifyChangedDocsFromNameStatus(
    files,
    baseLocalRef,
    'HEAD',
    REPO_ROOT,
  );
  if (frontmatterOnly.length) {
    log(`Skipped ${frontmatterOnly.length} frontmatter-only file(s) from preview list.`);
  }

  const templatePath = path.join(REPO_ROOT, '.harness', 'pull_request_template.md');
  const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '';

  const render = (previewBase) =>
    fillTemplate({ template, summary, jira, previewPages, previewBase });

  if (DRY_RUN) {
    const demoBase = 'https://<deploy-hash>--harness-developer.netlify.app';
    console.log('\n===== TITLE =====\n' + title);
    console.log('\n===== LABEL =====\n' + `${labelId} (${labelName})`);
    console.log('\n===== PREVIEW PAGES =====');
    if (previewPages.length) {
      previewPages.forEach((p) => console.log(`- ${p.label} -> ${p.sitePath}`));
    } else {
      console.log('(no pages need per-page previews)');
    }
    console.log('\n===== DESCRIPTION (with preview URL filled) =====\n' + render(demoBase) + '\n');
    return;
  }

  // Timestamp before we touch anything: only bot preview comments at/after this
  // push count as "fresh". Milliseconds, to match the API's `created` field.
  const sinceMs = Date.now();

  log(`Waiting for '${branch}' to appear on origin…`);
  const present = await waitForBranchOnRemote(branch);
  if (!present) {
    log('Branch not visible on origin yet; skipping PR sync for this push.');
    return;
  }

  // Initial write: previews show "Pending CI preview build…".
  const existing = await findOpenPR({ ctx, token, branch });
  let prNumber = null;
  if (existing) {
    const res = await updatePR({ ctx, token, number: existing.number, title, description: render(null) });
    if (res.status >= 200 && res.status < 300) prNumber = existing.number;
    else log(`Update failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
  } else {
    const res = await createPR({ ctx, token, branch, base: baseBranch, title, description: render(null) });
    if (res.status >= 200 && res.status < 300 && res.body?.number) prNumber = res.body.number;
    else log(`Create failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
  }

  if (!prNumber) return;
  const prUrl = `https://${ctx.apiHost}/ng/account/${ctx.account}/module/code/orgs/${ctx.org}/projects/${ctx.project}/repos/${ctx.repo}/pulls/${prNumber}`;
  log(`${existing ? 'Updated' : 'Created'} PR #${prNumber}: ${title}`);
  log(prUrl);

  await ensureLabel({ ctx, token, number: prNumber, labelId });

  // Poll for the fresh preview URL, then rewrite the table with real links.
  const windowMin = Math.round(
    (PREVIEW_INITIAL_DELAY_MS + (PREVIEW_MAX_CHECKS - 1) * PREVIEW_POLL_INTERVAL_MS) / 60000,
  );
  log(`Waiting for CI preview URL (first check at 10 min, then every 5 min, up to ~${windowMin} min)…`);
  const previewBase = await waitForPreviewBase({ ctx, token, number: prNumber, sinceMs });
  if (previewBase) {
    const res = await updatePR({ ctx, token, number: prNumber, title, description: render(previewBase) });
    if (res.status >= 200 && res.status < 300) {
      log(`Preview URLs updated: ${previewBase}`);
    } else {
      log(`Preview update failed (HTTP ${res.status}): ${res.raw?.slice(0, 200)}`);
    }
  } else {
    log('No fresh preview URL within the wait window; left pending placeholders.');
  }
}

main().catch((e) => {
  log(`Error: ${e.stack || e.message}`);
  process.exit(0); // never block the developer's workflow
});
