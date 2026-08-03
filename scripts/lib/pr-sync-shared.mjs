// Shared logic for the CI-driven PR sync (see HDH-1049).
//
// Ported from the retired local pre-push automation (scripts/pr-sync.mjs) so the
// summary/label rules stay in one place instead of forking between a local
// script and a CI script. These functions are pure string/data logic only — no
// git shelling, no local .env reading, no network waits — so they work the same
// whether called from a developer's machine or a Harness CI step.
//
// CI NEVER TOUCHES THE WORDS (HDH-1099). A PR title is `tag: [ticket]: summary`.
// CI repairs the tag and ticket segments when they are missing and leaves the
// summary alone, because that is the author's. The wholesale generation that used
// to live here (buildTitle/cleanSubject/humanizeBranch) was deleted rather than
// disabled: it rebuilt the entire title from the latest commit on every push, which
// reverted hand-written titles as fast as people could fix them.
//
// The one exception is an explicit `[retitle]` marker in the author's own commit
// message — see RETITLE_TOKEN below.

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

// --- title inspection (read-only) / body generation ---------------------------

// Prefixes that match the Jira-key shape but never are one. Without this,
// `fix-utf-8-encoding` yields "UTF-8" and a branch about RFC-2119 or SHA-256 gets a
// Jira link to nowhere. Cheaper than maintaining a list of every Harness project key.
const NOT_TICKET_PREFIXES = new Set([
  'UTF', 'ISO', 'RFC', 'SHA', 'MD', 'AES', 'RSA', 'IPV', 'HTTP', 'ES', 'UI', 'X',
]);

// Pull a Jira key out of any string — a branch name, a commit subject, a PR title.
// Handles both branch conventions in use here, `HDH-1234/ticket-tag` and
// `HDH-1234-ticket-tag`, and returns the first candidate that is plausibly a ticket.
export function extractJira(text) {
  if (!text) return null;
  const matches = String(text).matchAll(/\b([A-Z][A-Z0-9]*)-(\d+)\b/gi);
  for (const m of matches) {
    const prefix = m[1].toUpperCase();
    if (prefix.length < 2) continue;
    if (NOT_TICKET_PREFIXES.has(prefix)) continue;
    return `${prefix}-${m[2]}`;
  }
  return null;
}

// Where a ticket may come from, in order of how much it reflects intent:
// what the author put in the title, then what they put in a commit message (the
// usual Jira hook), then the branch name. Commits are read oldest first, since the
// first commit is where the branch's purpose was stated.
export function resolveTicket({ title = '', commits = [], branch = '' } = {}) {
  const fromTitle = extractJira(title);
  if (fromTitle) return fromTitle;

  for (const c of commits) {
    const fromCommit = extractJira(c);
    if (fromCommit) return fromCommit;
  }

  return extractJira(branch);
}

export function detectType(commitSubject) {
  const m = commitSubject.match(/^(\w+)(\([^)]*\))?!?:/);
  if (m && CONVENTIONAL_TYPES.includes(m[1].toLowerCase())) {
    return m[1].toLowerCase();
  }
  return DEFAULT_TYPE;
}

// The shape we would like PR titles to have.
export const TITLE_FORMAT_HINT = 'type: [JIRA-123]: short description';
export const TITLE_FORMAT_EXAMPLE = 'chore: [HDH-1099]: stop CI rewriting PR titles';

// --- title structure: tag, ticket, summary -----------------------------------
//
// A PR title is three parts: `tag: [ticket]: summary`.
//
//   chore: [HDH-1099]: Update CI PR pipeline step scripts
//   ^tag    ^ticket     ^summary
//
// CI owns the first two and repairs them when they are missing. **It never touches
// the summary.** Harness Code seeds the summary from the first commit when the PR
// is opened, and from that point it belongs to the author (HDH-1099).
//
// Repair is presence-based, not equality-based: if a ticket segment is already
// there, it stays, even when it differs from the branch. An author who retargets
// their PR to another ticket has made a judgement call, and overriding it every
// push is the bug this ticket exists to fix, in miniature.

// Stands in for a ticket when none can be found. Deliberately not a plausible key
// like JIRA-123 — it should read as a blank someone still has to fill.
export const TICKET_PLACEHOLDER = 'ticket-id';

// Broad list for *recognising* an existing tag slot. Only feat and chore are ever
// written (CONVENTIONAL_TYPES); anything else here is normalised to one of them.
// Kept deliberately narrow so an ordinary title like "Note: fix the links" is not
// mistaken for a tagged one and mangled.
const RECOGNISED_TAGS = [
  'feat', 'feature', 'fix', 'chore', 'docs', 'style',
  'refactor', 'perf', 'test', 'build', 'ci', 'revert',
];

const TICKET_PATTERN = /^[A-Z][A-Z0-9]+-\d+$/i;

// Split a title into its three parts. Any part that is not present comes back null
// (tag, ticket) or as whatever text remains (summary). Never throws.
export function parseTitle(title) {
  let rest = (title || '').trim();
  let tag = null;
  let ticket = null;

  const tagMatch = rest.match(/^([A-Za-z]+)(\([^)]*\))?!?:\s*/);
  if (tagMatch && RECOGNISED_TAGS.includes(tagMatch[1].toLowerCase())) {
    tag = tagMatch[1].toLowerCase();
    rest = rest.slice(tagMatch[0].length);
  }

  // `[HDH-1099]:` or `[ticket-id]:` — brackets optional trailing colon.
  const bracketed = rest.match(/^\[\s*([^\]]+?)\s*\]\s*:?\s*/);
  if (bracketed) {
    const inner = bracketed[1];
    if (TICKET_PATTERN.test(inner)) {
      ticket = inner.toUpperCase();
      rest = rest.slice(bracketed[0].length);
    } else if (inner.toLowerCase() === TICKET_PLACEHOLDER) {
      ticket = TICKET_PLACEHOLDER;
      rest = rest.slice(bracketed[0].length);
    }
  }

  // Bare leading ticket, e.g. Harness Code's default "HDH-1099 Update the thing".
  // Promoting it (rather than leaving it in place) is what stops a repair producing
  // "chore: [HDH-1099]: HDH-1099 Update the thing".
  if (!ticket) {
    const bare = rest.match(/^([A-Z][A-Z0-9]+-\d+)\s*:?\s+/i);
    if (bare) {
      ticket = bare[1].toUpperCase();
      rest = rest.slice(bare[0].length);
    }
  }

  return { tag, ticket, summary: rest.trim() };
}

// Add a missing tag or ticket while leaving the summary exactly as it is.
//
// Returns { title, changed, reasons }. `changed` is false when the title already
// has both parts — that is the check that stops this running on every push. Repair
// is idempotent: repairing a repaired title changes nothing.
export function repairTitle({
  title,
  commits = [],
  branch = '',
  branchJira = null,
  defaultTag = DEFAULT_TYPE,
}) {
  const parsed = parseTitle(title);
  const reasons = [];

  if (!parsed.summary) {
    // Nothing to preserve, so there is no safe repair. Leave it alone.
    return { title: (title || '').trim(), changed: false, reasons: ['no summary text to preserve'] };
  }

  let tag = parsed.tag;
  if (!tag) {
    tag = CONVENTIONAL_TYPES.includes(defaultTag) ? defaultTag : DEFAULT_TYPE;
    reasons.push(`added the missing "${tag}" tag`);
  } else if (!CONVENTIONAL_TYPES.includes(tag)) {
    const mapped = tag === 'feature' ? 'feat' : DEFAULT_TYPE;
    reasons.push(`normalised the "${parsed.tag}" tag to "${mapped}"`);
    tag = mapped;
  }

  let ticket = parsed.ticket;
  if (!ticket || ticket === TICKET_PLACEHOLDER) {
    // Title, then commit messages, then branch name. `branchJira` stays supported so
    // callers that already extracted it do not have to pass the branch as well.
    const resolved = resolveTicket({
      title,
      commits,
      branch: branch || '',
    }) || branchJira || null;
    if (resolved) {
      reasons.push(
        ticket === TICKET_PLACEHOLDER
          ? `replaced the ${TICKET_PLACEHOLDER} placeholder with ${resolved}`
          : `added the missing ticket reference ${resolved}`,
      );
      ticket = resolved;
    } else if (!ticket) {
      reasons.push(`no ticket found — inserted the ${TICKET_PLACEHOLDER} placeholder`);
      ticket = TICKET_PLACEHOLDER;
    }
  }

  const repaired = `${tag}: [${ticket}]: ${parsed.summary}`;
  return { title: repaired, changed: repaired !== (title || '').trim(), reasons };
}

// --- opt-in retitle ----------------------------------------------------------
//
// CI never renames a PR on its own (HDH-1099). An author who wants one generated
// asks for it, per push, by putting `[retitle]` anywhere in the commit message:
//
//   git commit -m "fix broken links [retitle]"
//
// In-band on purpose: the token travels with the push, so it works from the CLI,
// an IDE, or the Harness Code web editor with nothing installed locally. That
// keeps HDH-1049's property that no behaviour depends on a contributor's machine.
export const RETITLE_TOKEN = '[retitle]';
const RETITLE_RE = /\[\s*retitle\s*\]/gi;

// IMPORTANT: callers must test HEAD's message only, never the whole branch range.
// A token stays in `origin/main..HEAD` for the life of the branch, so scanning
// every commit would retitle on every subsequent push — the HDH-1099 bug rebuilt.
export function hasRetitleToken(message) {
  if (!message) return false;
  RETITLE_RE.lastIndex = 0;
  return RETITLE_RE.test(message);
}

// Remove the marker before the message is shown or fed to the summariser, so it
// does not leak into the PR description or the generated title.
export function stripRetitleToken(message) {
  if (!message) return '';
  return message.replace(RETITLE_RE, '').replace(/[ \t]{2,}/g, ' ').trim();
}

// Inspect a PR title against the house convention. PURE AND READ-ONLY: returns
// findings, changes nothing. Callers log the findings and move on — a badly
// formatted title is never a build failure and is never rewritten for the author.
//
// `jira` is the ticket derived from the branch name, or null when the branch
// carries none (in which case the ticket segment is not required).
export function checkTitleFormat(title, { jira = null } = {}) {
  const problems = [];
  const t = (title || '').trim();

  if (!t) {
    return { ok: false, problems: ['title is empty'] };
  }

  const m = t.match(/^(\w+)(\([^)]*\))?!?:\s*(.+)$/);
  if (!m) {
    problems.push(
      `no conventional-commit prefix (expected one of: ${CONVENTIONAL_TYPES.join(', ')})`,
    );
  } else if (!CONVENTIONAL_TYPES.includes(m[1].toLowerCase())) {
    problems.push(
      `unrecognised type "${m[1]}" (expected one of: ${CONVENTIONAL_TYPES.join(', ')})`,
    );
  }

  if (jira) {
    const titleJira = extractJira(t);
    if (!titleJira) {
      problems.push(`no [${jira}] ticket reference`);
    } else if (titleJira !== jira) {
      problems.push(`references ${titleJira}, but the branch is for ${jira}`);
    }
  }

  return { ok: problems.length === 0, problems };
}

// A machine-written title has to clear a higher bar than a human-written one, so
// this is deliberately stricter than checkTitleFormat(). An author referencing a
// ticket their branch does not carry is a judgement call we respect; a model doing
// it is a fabrication, and we would be writing it into their PR. The prompt already
// asks for the right shape, but a prompt is a request, not a guarantee.
export function isGeneratedTitleAcceptable(title, { jira = null } = {}) {
  const base = checkTitleFormat(title, { jira });
  if (!base.ok) return base;

  if (!jira) {
    const invented = extractJira(title);
    if (invented) {
      return {
        ok: false,
        problems: [`invented the ticket reference ${invented} for a branch that has none`],
      };
    }
  }

  return { ok: true, problems: [] };
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

// Returns { summary, choreKind, title } where choreKind is 'cleanup' | 'gap' | null.
//
// `title` is null unless `wantTitle` is set. It is only ever populated when an
// author explicitly asked for a retitle (see RETITLE_TOKEN) — the model does not
// get to rename anyone's PR off its own bat.
export async function geminiSummary({ apiKey, title, commits, diffstat, files, jira = null, wantTitle = false }) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  // A branch with no Jira ticket must not be given one. Asking for the generic
  // `[JIRA-123]` shape here would put that literal placeholder into a real PR
  // title, and checkTitleFormat() (correctly) treats a ticketless title as valid
  // on a ticketless branch, so nothing downstream would catch it.
  const titleShape = jira ? `type: [${jira}]: short description` : 'type: short description';
  const ticketRule = jira
    ? ` Use the ticket ${jira} exactly as written. Do not substitute a different one.`
    : ' Do not include a ticket reference of any kind: this branch has no Jira ticket.';

  const titleKeySpec = wantTitle
    ? [
      `- "title": a PR title of exactly the form \`${titleShape}\`, where type is one of ${CONVENTIONAL_TYPES.join(' or ')}.`
      + ticketRule
      + ' Describe the pull request as a whole, not just the most recent commit.'
      + ' Keep the description under 70 characters, lower-case its first letter, and do not end it with a full stop.',
    ]
    : [];

  const prompt = [
    'You are writing the "Pull Request Summary" section of a documentation pull request for the Harness Developer Hub.',
    'Follow this house style: present tense, active voice, address the reader as "you", no contractions, no em dashes, no "please".',
    'Do NOT invent changes that are not shown below.',
    '',
    `Return ONLY a JSON object (no code fences, no prose outside it) with exactly these keys:${wantTitle ? '' : ''}`,
    '- "summary": a Markdown string. One short intro paragraph (2-3 sentences) describing what the PR changes and why it matters, then a bullet list under a bold "**Key updates:**" label. No heading above the intro, no title.',
    '- "choreKind": one of "cleanup", "gap", or null. Set "cleanup" when the change polishes, reformats, fixes, or tidies existing documentation. Set "gap" when it fills missing/outdated content or pays down documentation tech debt. Use null if this is clearly a feature/enhancement rather than a chore.',
    ...titleKeySpec,
    '',
    `PR title: ${title || '(none)'}`,
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
      const newTitle = wantTitle && typeof parsed.title === 'string' ? parsed.title.trim() : null;
      return { summary: (parsed.summary || '').trim(), choreKind, title: newTitle || null };
    } catch {
      // Model returned prose instead of JSON — treat the whole thing as the summary.
      // No title in that case: a half-parsed response is not something to rename a PR with.
      return { summary: text, choreKind: null, title: null };
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

// NOTE: there is deliberately no createPR() here (HDH-1099). The author opens the
// PR and the pipeline runs afterwards, so CI creating one was both dead code and a
// hazard: findOpenPR() filters on state=open, so a re-run against a branch whose PR
// had already merged would fall through and open a fresh PR for merged work.

export async function getPR({ token, number }) {
  const res = await harnessCodeRequest({ token, method: 'GET', apiPath: `pullreq/${number}` });
  if (res.status !== 200 || !res.body) return null;
  return res.body;
}

// PATCH /pullreq/{number} — see
// https://developer.harness.io/api-reference?module=code-repository#pullreq-update-pull-request
//
// Harness Code does NOT treat an omitted `title` as "leave unchanged". Omitting it
// returns 400 `{"message":"Pull request title can't be empty"}`, so a title has to
// be in the body on every update.
//
// This function therefore takes no title from its caller. It reads the live one
// immediately before writing and echoes it back verbatim, which is a no-op for the
// title and keeps the HDH-1099 guarantee intact: the routine every-push path cannot
// change what the PR is called, whatever a caller passes.
//
// Reading it *here* rather than accepting one from further up is the point. Step B
// runs minutes after step A, so a title captured earlier could be stale, and echoing
// a stale value would revert an author who renamed their PR while the preview built
// — the reported bug, in a window that would be miserable to diagnose.
// The single PATCH primitive. Both fields are always sent, because this endpoint
// validates the whole payload rather than merging a partial one.
export async function writePR({ token, number, title, description }) {
  return harnessCodeRequest({
    token,
    method: 'PATCH',
    apiPath: `pullreq/${number}`,
    body: { title, description },
  });
}

// Description-only update. Takes NO title from its caller: it reads the live one
// immediately before writing and echoes it back verbatim, so no call site can
// rename a PR whatever it passes, and there is no stale value to echo.
//
// Used by ci-pr-sync-preview.mjs, which runs minutes after the create step and must
// never touch the title. ci-pr-sync-create.mjs calls writePR() directly, because it
// is the one place allowed to repair a title.
export async function updatePR({ token, number, description }) {
  const current = await getPR({ token, number });
  const title = current?.title;
  if (!title) {
    return {
      status: 0,
      body: null,
      raw: `Could not read the current title for PR #${number}; refusing to PATCH rather than risk clearing it.`,
    };
  }
  return writePR({ token, number, title, description });
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
