#!/usr/bin/env node
// CI PR sync — step B (see HDH-1049).
//
// Runs after Publish-Netlify-Preview, once DRAFT_URL is known. Rebuilds the PR
// description with real per-page preview links (step A left placeholders).
// Re-derives the same summary/preview-page data as step A rather than passing
// it across steps, since Harness step output variables are best kept small
// (a PR number and a URL) rather than a multi-KB rendered description.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { classifyChangedDocsFromNameStatus } from './lib/pr-preview-utils.mjs';
import {
  buildTitle,
  extractJira,
  deterministicSummary,
  geminiSummary,
  fillTemplate,
  updatePR,
  ensureBaseRefFetched,
} from './lib/pr-sync-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const LOG = '[ci-pr-sync-preview]';
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
  } catch { /* ignore */ }
  try {
    diffstat = git(`diff --stat ${baseRef}...HEAD`);
    files = git(`diff --name-status ${baseRef}...HEAD`).split('\n').filter(Boolean);
  } catch { /* ignore */ }
  return { commits, diffstat, files };
}

async function main() {
  const token = process.env.commentorToken;
  const prNumber = process.env.PR_NUMBER;
  const previewBase = process.env.DRAFT_URL;
  const branch = process.env.BRANCH;

  if (!token || !prNumber || !branch) {
    log(`Missing required env (token=${!!token}, PR_NUMBER=${prNumber}, BRANCH=${branch}) — skipping.`);
    process.exit(0); // never fail the build over a missed preview-link update
  }
  if (!previewBase) {
    log('No DRAFT_URL — Publish-Netlify-Preview may not have produced one. Leaving placeholders as-is.');
    process.exit(0);
  }

  ensureBaseRefFetched('main', REPO_ROOT);

  const latestSubject = git('log -1 --pretty=format:%s');
  const title = buildTitle({ branch, latestSubject });
  const jira = extractJira(branch);
  const { commits, diffstat, files } = collectChangeData(BASE_REF);

  let summary;
  if (process.env.GEMINI_API_KEY) {
    try {
      const g = await geminiSummary({ apiKey: process.env.GEMINI_API_KEY, title, commits, diffstat, files });
      summary = g.summary;
    } catch (e) {
      log(`Gemini summary failed (${e.message}); using deterministic summary.`);
    }
  }
  if (!summary) summary = deterministicSummary({ commits, files });

  const { previewPages } = classifyChangedDocsFromNameStatus(files, BASE_REF, 'HEAD', REPO_ROOT);

  const templatePath = path.join(REPO_ROOT, '.harness', 'pull_request_template.md');
  const template = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '';
  const description = fillTemplate({ template, summary, jira, previewPages, previewBase });

  const res = await updatePR({ token, number: prNumber, title, description });
  if (res.status >= 200 && res.status < 300) {
    log(`Preview URLs updated on PR #${prNumber}: ${previewBase}`);
  } else {
    log(`Preview update failed (HTTP ${res.status}): ${res.raw?.slice(0, 300)}`);
  }
}

main().catch((e) => {
  log(`Error: ${e.stack || e.message}`);
  process.exit(0); // never block the pipeline over this step
});
