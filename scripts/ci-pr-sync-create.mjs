#!/usr/bin/env node
// CI PR sync — step A (see HDH-1049).
//
// Runs early in the harnessDeveloperHub pipeline on PUSH events to non-main
// branches. Finds or creates the Harness Code PR for the branch with a
// conventional-commit title and an initial summary/preview table (preview
// links are placeholders here — see scripts/ci-pr-sync-preview.mjs, which runs
// after the Netlify preview build and patches in the real URL).
//
// Prints `PR_NUMBER=<n>` on the last line of stdout; the pipeline step's shell
// wrapper captures and exports it for later steps to read via
// <+execution.steps.PR_Sync_Create.output.outputVariables.PR_NUMBER>.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { classifyChangedDocsFromNameStatus } from './lib/pr-preview-utils.mjs';
import {
  buildTitle,
  extractJira,
  detectType,
  deterministicSummary,
  geminiSummary,
  fillTemplate,
  resolveLabelId,
  findOpenPR,
  createPR,
  updatePR,
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

  const latestSubject = git('log -1 --pretty=format:%s');
  const title = buildTitle({ branch, latestSubject });
  const jira = extractJira(branch);
  const type = detectType(latestSubject);

  const { commits, diffstat, files } = collectChangeData(BASE_REF);

  let summary;
  let choreKind = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      const g = await geminiSummary({ apiKey: process.env.GEMINI_API_KEY, title, commits, diffstat, files });
      summary = g.summary;
      choreKind = g.choreKind;
      log('Summary generated with Gemini.');
    } catch (e) {
      log(`Gemini summary failed (${e.message}); using deterministic summary.`);
    }
  }
  if (!summary) summary = deterministicSummary({ commits, files });

  const labelId = resolveLabelId({ type, files, choreKind });

  const { previewPages } = classifyChangedDocsFromNameStatus(files, BASE_REF, 'HEAD', REPO_ROOT);

  const templatePath = path.join(REPO_ROOT, '.harness', 'pull_request_template.md');
  const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '';
  const description = fillTemplate({ template, summary, jira, previewPages, previewBase: null });

  const existing = await findOpenPR({ token, branch });
  let prNumber = null;

  if (existing) {
    const res = await updatePR({ token, number: existing.number, title, description });
    if (res.status >= 200 && res.status < 300) prNumber = existing.number;
    else log(`Update failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
  } else {
    const res = await createPR({ token, branch, base: 'main', title, description });
    if (res.status >= 200 && res.status < 300 && res.body?.number) prNumber = res.body.number;
    else log(`Create failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
  }

  if (!prNumber) {
    log('No PR number to report — skipping label and output variable.');
    process.exit(1);
  }

  log(`${existing ? 'Updated' : 'Created'} PR #${prNumber}: ${title}`);
  await ensureLabel({ token, number: prNumber, labelId });

  // Last line only — the shell wrapper parses this to set/export PR_NUMBER.
  console.log(`PR_NUMBER=${prNumber}`);
}

main().catch((e) => {
  log(`Error: ${e.stack || e.message}`);
  process.exit(1);
});
