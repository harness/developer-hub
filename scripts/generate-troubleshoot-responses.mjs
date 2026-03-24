#!/usr/bin/env node
/**
 * Scans all docs/**\/*.md files for <Troubleshoot mode="general"> entries,
 * calls Gemini for any that are missing from generated-responses.json,
 * and writes the results back. Exits 0 on any failure so builds always continue.
 * Output file is gitignored — this script always ensures it exists (at least `{}`) before bundling.
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';
import { GoogleGenerativeAI } from '@google/generative-ai';

const glob = promisify(_glob);

const GENERATED_FILE = path.resolve('src/components/AdaptiveAIContent/generated-responses.json');
const DOCS_GLOB = 'docs/**/*.md';
const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_TIMEOUT_MS = 30000;
const LOG = '[troubleshoot-gen]';

function isGeminiAvailable() {
  return !!process.env.GEMINI_API_KEY;
}

/** Ensure JSON exists so TS/webpack can resolve the import; not committed (see .gitignore). */
function ensureGeneratedResponsesFile() {
  const dir = path.dirname(GENERATED_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(GENERATED_FILE)) {
    fs.writeFileSync(GENERATED_FILE, '{}\n');
    console.log(`${LOG} Created empty ${GENERATED_FILE} (populate at build with GEMINI_API_KEY).`);
  }
}

async function callGemini(issue) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `You are a technical support engineer. A user is encountering this issue:

"${issue}"

Provide a concise, actionable troubleshooting response as a short bulleted list (3-5 points).
Focus on the most common root causes and practical steps to resolve the issue.
Use markdown formatting with bullet points.
Be specific and technical but brief — each bullet should be one sentence.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  try {
    const result = await model.generateContent(prompt, { signal: controller.signal });
    return result.response.text().trim();
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractGeneralIssues(content) {
  const issues = [];
  // Match both prop orderings: mode="general" issue="..." and issue="..." mode="general"
  const patterns = [
    /mode="general"[^>]*issue="([^"]+)"/g,
    /issue="([^"]+)"[^>]*mode="general"/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const issue = match[1].trim();
      if (!issues.includes(issue)) issues.push(issue);
    }
  }
  return issues;
}

async function main() {
  ensureGeneratedResponsesFile();

  if (!isGeminiAvailable()) {
    console.log(`${LOG} GEMINI_API_KEY not set — skipping generation.`);
    return;
  }

  const files = await glob(DOCS_GLOB);
  const allIssues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const issues = extractGeneralIssues(content);
    allIssues.push(...issues);
  }

  const unique = [...new Set(allIssues)];

  const existing = fs.existsSync(GENERATED_FILE)
    ? JSON.parse(fs.readFileSync(GENERATED_FILE, 'utf8'))
    : {};

  const toGenerate = unique.filter(issue => !existing[issue] || !existing[issue].trim());

  if (toGenerate.length === 0) {
    console.log(`${LOG} No new general-mode issues to generate.`);
    fs.writeFileSync(GENERATED_FILE, JSON.stringify(existing, null, 2));
    return;
  }

  console.log(`${LOG} Generating responses for ${toGenerate.length} issue(s)…`);

  const results = await Promise.allSettled(
    toGenerate.map(async issue => {
      try {
        const response = await callGemini(issue);
        console.log(`${LOG} ✓ ${issue.slice(0, 60)}…`);
        return { issue, response };
      } catch (err) {
        console.warn(`${LOG} ✗ Failed for: ${issue.slice(0, 60)}… (${err.message})`);
        return { issue, response: null };
      }
    })
  );

  const updated = { ...existing };
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.response) {
      updated[result.value.issue] = result.value.response;
    }
  }

  fs.writeFileSync(GENERATED_FILE, JSON.stringify(updated, null, 2));
  console.log(`${LOG} Written to ${GENERATED_FILE}`);
}

main().catch(err => {
  console.error(`${LOG} Unexpected error:`, err.message);
  process.exit(0); // Always exit 0 so the build continues
});
