#!/usr/bin/env node

/**
 * Generate PR preview rows for changed docs, excluding frontmatter-only edits.
 *
 * Frontmatter-only changes (redirect_from, title, sidebar_label, etc.) do not
 * affect rendered page content, so they do not need per-page preview links.
 *
 * Usage:
 *   node scripts/generate-pr-preview-list.mjs
 *   node scripts/generate-pr-preview-list.mjs --base origin/main --head HEAD
 *   node scripts/generate-pr-preview-list.mjs --json
 *   node scripts/generate-pr-preview-list.mjs --jira HDH-1032
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildPreviewTableMarkdown,
  classifyChangedDocs,
} from './lib/pr-preview-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const options = {
    base: 'origin/main',
    head: 'HEAD',
    jira: null,
    json: false,
    verbose: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') options.json = true;
    else if (arg === '--verbose') options.verbose = true;
    else if (arg === '--base') {
      options.base = argv[i + 1];
      i += 1;
    } else if (arg === '--head') {
      options.head = argv[i + 1];
      i += 1;
    } else if (arg === '--jira') {
      options.jira = argv[i + 1];
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

function inferJiraFromBranch(cwd) {
  try {
    const branch = execSync('git branch --show-current', { cwd, encoding: 'utf8' }).trim();
    const match = branch.match(/^([A-Z]+-\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function printHelp() {
  console.log(`Generate PR preview table rows for changed docs.

Options:
  --base <ref>   Base branch or commit (default: origin/main)
  --head <ref>   Head branch or commit (default: HEAD)
  --jira <id>    JIRA ticket for the table row (default: inferred from branch name)
  --json         Output JSON instead of markdown
  --verbose      Print skipped frontmatter-only files to stderr
  -h, --help     Show this help text
`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const jiraTicket = options.jira ?? inferJiraFromBranch(ROOT_DIR);
  const result = classifyChangedDocs(options.base, options.head, ROOT_DIR);

  if (options.verbose) {
    if (result.frontmatterOnly.length > 0) {
      console.error(
        `[pr-preview] Skipped ${result.frontmatterOnly.length} frontmatter-only file(s):`,
      );
      for (const entry of result.frontmatterOnly) {
        console.error(`  - ${entry.filePath}`);
      }
    }
    if (result.skipped.length > 0) {
      console.error(`[pr-preview] Skipped ${result.skipped.length} non-preview file(s):`);
      for (const entry of result.skipped) {
        console.error(`  - ${entry.filePath} (${entry.reason})`);
      }
    }
  }

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          jiraTicket,
          previewPages: result.previewPages,
          frontmatterOnlyCount: result.frontmatterOnly.length,
          frontmatterOnlyFiles: result.frontmatterOnly.map((entry) => entry.filePath),
          skipped: result.skipped,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(buildPreviewTableMarkdown(result.previewPages, { jiraTicket }));
}

main();
