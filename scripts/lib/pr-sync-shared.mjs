// Shared logic for the CI-driven PR sync (see HDH-1049).
//
// Ported from the retired local pre-push automation (scripts/pr-sync.mjs) so the
// title/summary/label rules stay in one place instead of forking between a local
// script and a CI script. These functions are pure string/data logic only — no
// git shelling, no local .env reading, no network waits — so they work the same
// whether called from a developer's machine or a Harness CI step.

import { execSync } from 'node:child_process';
import { buildPreviewTableMarkdown } from './pr-preview-utils.mjs';

// Harness CI's codebase clone only fetches the branch actually being built —
// `origin/main` is not a resolvable ref by default, unlike a typical local clone
// that has every remote branch tracked. Both CI scripts diff against `origin/main`,
// so fetch it explicitly before any git plumbing that assumes it exists. Best
// effort: never throw, so a transient fetch failure degrades to empty diff data
// (via the existing try/catch in collectChangeData) instead of hard-failing the step.
export function ensureBaseRefFetched(baseBranch, cwd) {
  try {
    execSync(`git fetch origin ${baseBranch}:refs/remotes/origin/${baseBranch}`, { cwd, encoding: 'utf8' });
  } catch (e) {
    console.error(`[pr-sync-shared] Could not fetch origin/${baseBranch}: ${e.message}`);
  }
}

// Only these two types are used for now. `feat` for new/expanded docs, else `chore`.
export const CONVENTIONAL_TYPES = ['feat', 'chore'];
export const DEFAULT_TYPE = 'chore';

// Harness Code label ids for this repo (from GET /repos/developer-hub/+/labels).
export const LABELS = {
  chore: 34,
  choreContentCleanup: 240, // "Content - chore/cleanup"
  choreContentGap: 251, // "Content - gap / tech debt"
  enhancement: 5,
  enhancementContent: 245, // "Content - enhancement"
};

export const GEMINI_MODEL = 'gemini-flash-latest';
export const GEMINI_TIMEOUT_MS = 20000;

// Repo coordinates for the Harness Code API — fixed for a CI step (unlike the local
// script, which had to derive these from each contributor's `git remote get-url origin`).
export const REPO_CTX = {
  account: 'l7B_kbSEQD2wjrM7PShm5w',
  org: 'PROD',
  project: 'Harness_Commons',
  repo: 'developer-hub',
  apiHost: 'harness0.harness.io',
};

// --- title / body generation -------------------------------------------------

export function extractJira(branch) {
  const m = branch.match(/([A-Z][A-Z0-9]+-\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

export function humanizeBranch(branch) {
  // HDH-933/relist-iacm-cli -> relist iacm cli
  let s = branch.replace(/^[A-Z][A-Z0-9]+-\d+[/_-]*/i, '');
  s = s.replace(/[/_-]+/g, ' ').trim();
  return s || branch;
}

export function detectType(commitSubject) {
  const m = commitSubject.match(/^(\w+)(\([^)]*\))?!?:/);
  if (m && CONVENTIONAL_TYPES.includes(m[1].toLowerCase())) {
    return m[1].toLowerCase();
  }
  return DEFAULT_TYPE;
}

// Strip a leading `type(scope): ` and any leading `JIRA-123` from a subject.
export function cleanSubject(subject, jira) {
  let s = subject.replace(/^(\w+)(\([^)]*\))?!?:\s*/, '');
  if (jira) {
    s = s.replace(new RegExp(`^\\s*${jira}\\s*[:\\-]?\\s*`, 'i'), '');
  }
  return s.trim();
}

export function buildTitle({ branch, latestSubject }) {
  const jira = extractJira(branch);
  const type = detectType(latestSubject);
  let desc = cleanSubject(latestSubject, jira);
  if (!desc) desc = humanizeBranch(branch);
  // lower-case first char to match the repo's existing PR titles
  desc = desc.charAt(0).toLowerCase() + desc.slice(1);
  return jira ? `${type}: [${jira}]: ${desc}` : `${type}: ${desc}`;
}

export function deterministicSummary({ commits, files }) {
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
export async function geminiSummary({ apiKey, title, commits, diffstat, files }) {
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
export function fillTemplate({ template, summary, jira, previewPages, previewBase }) {
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
export function touchesMarkdown(files) {
  return files.some((f) => {
    const p = f.split('\t').pop() || '';
    return /\.(md|mdx)$/i.test(p);
  });
}

// Decide the single label id to ensure on the PR.
export function resolveLabelId({ type, files, choreKind }) {
  const isContent = touchesMarkdown(files);
  if (type === 'feat') {
    return isContent ? LABELS.enhancementContent : LABELS.enhancement;
  }
  // chore
  if (!isContent) return LABELS.chore;
  return choreKind === 'gap' ? LABELS.choreContentGap : LABELS.choreContentCleanup;
}

// --- Harness Code API ---------------------------------------------------------
//
// Auth/addressing style matches the `Commentor` pipeline step, which is the
// proven-working pattern from inside this CI environment — not the x-api-key +
// query-param style the old local script used against a personally-held PAT.

export async function harnessCodeRequest({ token, method, apiPath, body }) {
  const url = `https://${REPO_CTX.apiHost}/gateway/code/api/v1/repos/${REPO_CTX.account}/${REPO_CTX.org}/${REPO_CTX.project}/${REPO_CTX.repo}/+/${apiPath}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const raw = await res.text();
  let parsed = null;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { /* non-JSON */ }
  return { status: res.status, body: parsed, raw };
}

export async function findOpenPR({ token, branch }) {
  const res = await harnessCodeRequest({
    token,
    method: 'GET',
    apiPath: `pullreq?source_branch=${encodeURIComponent(branch)}&state=open`,
  });
  if (res.status !== 200 || !Array.isArray(res.body)) return null;
  return res.body.find((pr) => pr.source_branch === branch) || res.body[0] || null;
}

export async function createPR({ token, branch, base, title, description }) {
  return harnessCodeRequest({
    token,
    method: 'POST',
    apiPath: 'pullreq',
    body: { source_branch: branch, target_branch: base, title, description, is_draft: false },
  });
}

// PATCH /pullreq/{number} — see
// https://developer.harness.io/api-reference?module=code-repository#pullreq-update-pull-request
export async function updatePR({ token, number, title, description }) {
  return harnessCodeRequest({
    token,
    method: 'PATCH',
    apiPath: `pullreq/${number}`,
    body: { title, description },
  });
}

export async function listPRLabels({ token, number }) {
  const res = await harnessCodeRequest({ token, method: 'GET', apiPath: `pullreq/${number}/labels` });
  if (res.status !== 200 || !res.body) return [];
  const arr = res.body.label_data || res.body.labels || (Array.isArray(res.body) ? res.body : []);
  return arr.map((l) => l.id).filter((id) => id != null);
}

export async function assignPRLabel({ token, number, labelId }) {
  return harnessCodeRequest({
    token,
    method: 'PUT',
    apiPath: `pullreq/${number}/labels`,
    body: { label_id: labelId },
  });
}

// Add-only: ensure labelId is present; never remove existing labels.
export async function ensureLabel({ token, number, labelId }) {
  const current = await listPRLabels({ token, number });
  if (current.includes(labelId)) return;
  await assignPRLabel({ token, number, labelId });
}
