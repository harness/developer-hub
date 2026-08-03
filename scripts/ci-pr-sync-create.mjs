#!/usr/bin/env node
// CI PR sync — step A (see HDH-1049, HDH-1099).
//
// Runs early in the harnessDeveloperHub pipeline for a branch that already has an
// open PR. Refreshes the PR description — summary and preview table — on every
// push (preview links are placeholders here; scripts/ci-pr-sync-preview.mjs runs
// after the Netlify build and patches in the real URL).
//
// It also repairs the title's `tag:` and `[ticket]:` segments when they are missing,
// and NEVER the summary that follows them — that is the author's (HDH-1099). A title
// that already has both segments is written back unchanged. The one exception is an
// explicit `[retitle]` marker in the author's own commit message.
//
// This is the only script permitted to change a title. ci-pr-sync-preview.mjs uses
// updatePR(), which echoes the live title back and cannot rename anything.
//
// Prints `PR_NUMBER=<n>` to stdout as soon as the PR is found; the pipeline step's
// shell wrapper captures and exports it for later steps to read via
// <+execution.steps.PR_Sync_Create.output.outputVariables.PR_NUMBER>.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { classifyChangedDocsFromNameStatus } from './lib/pr-preview-utils.mjs';
import {
  resolveTicket,
  detectType,
  repairTitle,
  TICKET_PLACEHOLDER,
  isGeneratedTitleAcceptable,
  RETITLE_TOKEN,
  hasRetitleToken,
  stripRetitleToken,
  deterministicSummary,
  geminiSummary,
  fillTemplate,
  resolveLabelId,
  findOpenPR,
  getPR,
  writePR,
  ensureLabel,
  ensureBaseRefFetched,
} from './lib/pr-sync-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const LOG = '[ci-pr-sync-create]';
const BASE_REF = 'origin/main';

function log(msg) {
  console.error(`${LOG} ${msg}`);
}

function git(args) {
  return execSync(`git ${args}`, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
}

// Decide the title to write. Three outcomes, in priority order:
//
//   1. The author asked for a new one with [retitle] and we produced an acceptable
//      one — use it. This is the only path that rewrites the summary.
//   2. The tag or ticket segment is missing — repair those, leaving the summary
//      untouched.
//   3. Nothing to do — echo the live title back unchanged (this endpoint rejects a
//      payload without one).
function decideTitle({ liveTitle, commits, branch, defaultTag, generatedTitle }) {
  if (generatedTitle) {
    return { title: generatedTitle, changed: true, why: 'generated on request' };
  }

  const { title, changed, reasons } = repairTitle({
    title: liveTitle,
    commits,
    branch,
    defaultTag,
  });

  return { title, changed, why: reasons.join('; ') };
}

function collectChangeData(baseRef) {
  let commits = [];
  let diffstat = '';
  let files = [];
  try {
    commits = git(`log ${baseRef}..HEAD --pretty=format:%s`)
      .split('\n')
      .map(stripRetitleToken) // the opt-in marker is plumbing, not content
      .filter(Boolean);
  } catch { /* base may not exist locally */ }
  try {
    diffstat = git(`diff --stat ${baseRef}...HEAD`);
    files = git(`diff --name-status ${baseRef}...HEAD`).split('\n').filter(Boolean);
  } catch { /* ignore */ }
  return { commits, diffstat, files };
}

async function main() {
  const token = process.env.commentorToken;
  if (!token) {
    log('No commentorToken in env — cannot call the Harness Code API. Exiting.');
    process.exit(1);
  }

  const branch = process.env.BRANCH;
  if (!branch) {
    log('No BRANCH env var set (expected <+codebase.branch> from the pipeline). Exiting.');
    process.exit(1);
  }

  ensureBaseRefFetched('main', REPO_ROOT);

  // Look the PR up first: its title is the best context for the summary, and
  // there is nothing to sync without it.
  const existing = await findOpenPR({ token, branch });
  if (!existing) {
    // Normal, not a failure. CI does not open PRs — the author does, and the
    // pipeline runs afterwards. Nothing to update yet.
    log(`No open PR for branch "${branch}" — nothing to sync.`);
    process.exit(0);
  }

  const prNumber = existing.number;
  const title = existing.title || '';

  // HEAD only. A token stays in origin/main..HEAD for the life of the branch, so
  // checking the whole range would retitle on every later push — the bug this
  // ticket exists to fix, rebuilt.
  const headMessage = git('log -1 --pretty=format:%B');
  const retitleRequested = hasRetitleToken(headMessage);

  log(`PR #${prNumber} title: "${title}"`);
  if (retitleRequested) {
    log(`${RETITLE_TOKEN} found on HEAD — a new title will be generated for this push.`);
  }

  const latestSubject = stripRetitleToken(git('log -1 --pretty=format:%s'));
  const type = detectType(latestSubject);

  const { commits, diffstat, files } = collectChangeData(BASE_REF);

  // Commits arrive newest-first from git log; read them oldest-first so the ticket
  // comes from where the branch's purpose was first stated.
  const commitsOldestFirst = [...commits].reverse();

  // One resolved ticket for everything — the title's ticket segment and the Jira row
  // in the description. Title, then commit messages (the usual Jira hook), then the
  // branch name, which handles both HDH-1234/slug and HDH-1234-slug.
  const jira = resolveTicket({ title, commits: commitsOldestFirst, branch });
  if (jira) {
    log(`Ticket resolved as ${jira}.`);
  } else {
    log(`No ticket found in the title, commit messages, or branch name — using the [${TICKET_PLACEHOLDER}] placeholder.`);
  }

  let summary;
  let choreKind = null;
  let generatedTitle = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      const g = await geminiSummary({
        apiKey: process.env.GEMINI_API_KEY,
        title,
        commits,
        diffstat,
        files,
        jira,
        wantTitle: retitleRequested,
      });
      summary = g.summary;
      choreKind = g.choreKind;
      generatedTitle = g.title;
      log('Summary generated with Gemini.');
    } catch (e) {
      log(`Gemini summary failed (${e.message}); using deterministic summary.`);
    }
  }
  if (!summary) summary = deterministicSummary({ commits, files });

  // Never write a generated title that does not hold up. Refusing leaves the
  // author's own title in place, which is always the safer of the two outcomes.
  if (generatedTitle) {
    const verdict = isGeneratedTitleAcceptable(generatedTitle, { jira });
    if (!verdict.ok) {
      log(`Discarding generated title "${generatedTitle}" — ${verdict.problems.join('; ')}.`);
      generatedTitle = null;
    }
  }

  const labelId = resolveLabelId({ type, files, choreKind });

  const { previewPages } = classifyChangedDocsFromNameStatus(files, BASE_REF, 'HEAD', REPO_ROOT);

  const templatePath = path.join(REPO_ROOT, '.harness', 'pull_request_template.md');
  const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '';
  const description = fillTemplate({ template, summary, jira, previewPages, previewBase: null });

  // Emit PR_NUMBER before anything that can fail. The later steps in this pipeline
  // read it from stdout, and stranding them because a description update 400'd
  // costs the preview links and Jira row too. log() writes to stderr, so stdout
  // still contains only this line.
  console.log(`PR_NUMBER=${prNumber}`);

  if (retitleRequested && !generatedTitle) {
    // Deliberately do nothing to the summary. Falling back to a commit subject here
    // is the behaviour HDH-1099 removed, and it would fire on the one push where the
    // author is paying attention to the title.
    log(`${RETITLE_TOKEN} was requested but no title could be generated — the summary stays as it is.`);
  }

  // Re-read the title immediately before writing. The GET at the top of this run
  // happened before a Gemini call that can take twenty seconds, and echoing a stale
  // title would revert an author who renamed their PR in the meantime.
  const fresh = await getPR({ token, number: prNumber });
  const liveTitle = fresh?.title;
  if (!liveTitle) {
    log(`Could not re-read the title for PR #${prNumber}; refusing to PATCH rather than risk clearing it.`);
    process.exit(1);
  }

  const decided = decideTitle({
    liveTitle,
    commits: commitsOldestFirst,
    branch,
    defaultTag: type,
    generatedTitle,
  });

  const res = await writePR({
    token,
    number: prNumber,
    title: decided.title,
    description,
  });
  if (res.status < 200 || res.status >= 300) {
    log(`Update failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
    process.exit(1);
  }

  log(`Updated description on PR #${prNumber}.`);
  if (decided.changed) {
    log(`Title repaired (${decided.why}):`);
    log(`  was: "${liveTitle}"`);
    log(`  now: "${decided.title}"`);
    log('The summary was not touched — only the tag and ticket segments.');
  } else {
    log(`Title already well-formed, left unchanged: "${liveTitle}"`);
  }

  await ensureLabel({ token, number: prNumber, labelId });
}

main().catch((e) => {
  log(`Error: ${e.stack || e.message}`);
  process.exit(1);
});
