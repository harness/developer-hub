#!/usr/bin/env node

/**
 * Incrementally update llms-full.txt (and llms.txt for priority modules)
 * when doc files are added, modified, renamed, or deleted.
 *
 * Unlike generate-llms-txt.mjs (which scans every file every time), this script
 * detects which modules changed and rebuilds only those sections — making it
 * fast enough to run as a file watcher during local development.
 *
 * Usage:
 *   node scripts/update-llms-txt.mjs                          # auto-detect via git
 *   node scripts/update-llms-txt.mjs docs/platform/auth.md   # specific file(s)
 *   node scripts/update-llms-txt.mjs --watch                  # watch docs/ for changes
 *   node scripts/update-llms-txt.mjs --all                    # full regeneration
 */

import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const STATIC_DIR = path.join(ROOT_DIR, 'static');
const OUTPUT_FULL = path.join(STATIC_DIR, 'llms-full.txt');
const OUTPUT_CONCISE = path.join(STATIC_DIR, 'llms.txt');
const BASE_URL = 'https://developer.harness.io';

const PRIORITY_MODULES = [
  'continuous-integration',
  'feature-flags',
  'continuous-delivery',
  'cloud-cost-management',
  'chaos-engineering',
  'platform',
  'get-started',
];

const MODULE_NAME_MAP = {
  'continuous-integration': 'Continuous Integration (CI)',
  'feature-flags': 'Feature Flags (FF)',
  'feature-management-experimentation': 'Feature Management & Experimentation (FME)',
  'continuous-delivery': 'Continuous Delivery & GitOps (CD)',
  'cloud-cost-management': 'Cloud Cost Management (CCM)',
  'chaos-engineering': 'Chaos Engineering (CE)',
  'security-testing-orchestration': 'Security Testing Orchestration (STO)',
  'cloud-development-environments': 'Cloud Development Environments (CDE)',
  'code-repository': 'Code Repository',
  'artifact-registry': 'Artifact Registry',
  'internal-developer-portal': 'Internal Developer Portal (IDP)',
  'software-engineering-insights': 'AI DLC Insights (AIDI)',
  'service-reliability-management': 'Service Reliability Management (SRM)',
  'platform': 'Platform',
  'get-started': 'Get Started',
  'faqs': 'FAQs',
};

// ─── Shared utilities (mirrors generate-llms-txt.mjs) ──────────────────────

function getModuleName(moduleKey) {
  return MODULE_NAME_MAP[moduleKey] || moduleKey
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseDocFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);
    return {
      title: frontmatter.title || null,
      description: frontmatter.description || null,
      sidebarLabel: frontmatter.sidebar_label || null,
      slug: frontmatter.slug || null,
    };
  } catch {
    return null;
  }
}

function getUrlPath(relativePath, slug) {
  if (slug) return `/docs/${slug}`;
  let urlPath = relativePath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
  if (urlPath.endsWith('/index') || urlPath.endsWith('/overview')) {
    urlPath = urlPath.replace(/\/(index|overview)$/, '');
  }
  return `/docs/${urlPath}`;
}

function getAllDocFilesInModule(moduleKey) {
  const moduleDir = path.join(DOCS_DIR, moduleKey);
  if (!fs.existsSync(moduleDir)) return [];

  const pages = [];

  function walk(dir, relBase) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.join(relBase, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walk(full, rel);
        }
      } else if (/\.(md|mdx)$/.test(entry.name)) {
        const parsed = parseDocFile(full);
        if (!parsed || !parsed.title) continue;
        const urlPath = getUrlPath(rel, parsed.slug);
        pages.push({
          title: parsed.sidebarLabel || parsed.title,
          description: parsed.description || '',
          url: `${BASE_URL}${urlPath}`,
          relativePath: rel,
        });
      }
    }
  }

  walk(moduleDir, moduleKey);
  return pages;
}

// ─── Build one module's section text ───────────────────────────────────────

function buildModuleSection(moduleKey) {
  const pages = getAllDocFilesInModule(moduleKey);
  const moduleName = getModuleName(moduleKey);

  let section = `## ${moduleName}\n\nModule: /docs/${moduleKey}/\n\n`;

  // Group by subdirectory (second path segment)
  const grouped = {};
  for (const page of pages) {
    const parts = page.relativePath.split(path.sep);
    let category = moduleName;
    if (parts.length > 2) {
      category = parts[1]
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(page);
  }

  const categories = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  const hasMultipleCategories = categories.length > 1;

  for (const [category, categoryPages] of categories) {
    if (hasMultipleCategories) {
      section += `### ${category}\n\n`;
    }
    for (const page of categoryPages) {
      section += `- [${page.title}](${page.url}): ${page.description || page.title}\n`;
    }
    section += '\n';
  }

  return section;
}

// ─── Parse llms-full.txt into { header, sections } ─────────────────────────
//
// Sections are keyed by module key, extracted from the "Module: /docs/key/"
// line that the generator writes into every module block.

function parseFullTxt(content) {
  // Split on lines that begin a new top-level module heading.
  // The header (Metadata + ---) doesn't contain "Module:" lines.
  const moduleBlockRe = /(?=^## (?!Metadata\b))/m;
  const parts = content.split(moduleBlockRe);

  // parts[0] = file header up to the first non-Metadata ## heading
  const header = parts[0];
  const sections = {}; // moduleKey → raw text block

  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];
    const keyMatch = block.match(/^Module: \/docs\/([^/\n]+)\//m);
    if (keyMatch) {
      sections[keyMatch[1]] = block;
    }
  }

  return { header, sections };
}

function serializeFullTxt({ header, sections }) {
  const sortedKeys = Object.keys(sections).sort((a, b) =>
    getModuleName(a).localeCompare(getModuleName(b))
  );
  return header + sortedKeys.map(k => sections[k]).join('');
}

// ─── Update llms-full.txt for specific modules ─────────────────────────────

function updateFullTxt(moduleKeys) {
  if (!fs.existsSync(OUTPUT_FULL)) {
    console.log('[update-llms-txt] llms-full.txt not found — running full generation instead.');
    runFullGeneration();
    return;
  }

  const existing = fs.readFileSync(OUTPUT_FULL, 'utf-8');
  const parsed = parseFullTxt(existing);

  let updated = 0;
  let added = 0;

  for (const moduleKey of moduleKeys) {
    const newSection = buildModuleSection(moduleKey);
    const isNew = !parsed.sections[moduleKey];
    parsed.sections[moduleKey] = newSection;
    if (isNew) added++;
    else updated++;
  }

  fs.writeFileSync(OUTPUT_FULL, serializeFullTxt(parsed), 'utf-8');
  console.log(`[update-llms-txt] llms-full.txt — updated ${updated} module(s), added ${added} new.`);
}

// ─── Concise llms.txt: rebuild the priority module entries ─────────────────
//
// The concise file is small enough that we always regenerate it in full when
// any priority module changes. This avoids fragile in-place text surgery.

function rebuildConciseTxt(allModuleKeys) {
  // Collect all known modules from the full file so the Allow list stays complete
  let knownModules = allModuleKeys;
  if (fs.existsSync(OUTPUT_FULL)) {
    const { sections } = parseFullTxt(fs.readFileSync(OUTPUT_FULL, 'utf-8'));
    knownModules = [...new Set([...Object.keys(sections), ...allModuleKeys])];
  }

  const sortedModules = knownModules.sort((a, b) => {
    const ai = PRIORITY_MODULES.indexOf(a);
    const bi = PRIORITY_MODULES.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  let output = '# Harness Developer Hub\n\n';
  output += '## Metadata\n\n';
  output += '- Maintainer: devrel@harness.io\n';
  output += `- Cite-As: ${BASE_URL}\n`;
  output += '- Scope: All Harness Developer Hub documentation\n';
  output += '- Attribution-Policy: When presenting content, cite as "Harness Developer Hub" with appropriate module-level links.\n\n';
  output += '## Documentation Access\n\n';
  output += '- User-Agent: *\n';

  for (const m of sortedModules) {
    output += `- Allow: /docs/${m}/**\n`;
  }

  output += '\n---\n\n';

  for (const moduleKey of PRIORITY_MODULES) {
    const pages = getAllDocFilesInModule(moduleKey);
    if (pages.length === 0) continue;

    const moduleName = getModuleName(moduleKey);
    output += `## ${moduleName}\n\n`;

    const overviewPages = pages.filter(p =>
      p.relativePath.includes('overview') ||
      p.relativePath.includes('index') ||
      p.relativePath.endsWith(`${moduleKey}.md`) ||
      p.relativePath.endsWith(`${moduleKey}.mdx`)
    ).slice(0, 5);

    const otherPages = pages
      .filter(p => !overviewPages.includes(p))
      .slice(0, 10);

    for (const page of [...overviewPages, ...otherPages]) {
      output += `- [${page.title}](${page.url}): ${page.description || page.title}\n`;
    }

    output += '\n';
  }

  fs.writeFileSync(OUTPUT_CONCISE, output, 'utf-8');
  console.log('[update-llms-txt] llms.txt rebuilt.');
}

// ─── Detect changed files from git ─────────────────────────────────────────

function getChangedDocFilesFromGit() {
  const run = cmd => {
    try {
      return execSync(cmd, { cwd: ROOT_DIR, stdio: ['pipe', 'pipe', 'ignore'] })
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  const changed = [
    ...run('git diff --name-only --diff-filter=ACMRD HEAD'),
    ...run('git diff --cached --name-only --diff-filter=ACMRD'),
    ...run('git ls-files --others --exclude-standard -- "docs/"'),
  ];

  return [...new Set(changed)].filter(f => /\.(md|mdx)$/.test(f) && f.startsWith('docs/'));
}

// ─── Derive module key from a docs-relative file path ──────────────────────

function moduleKeyFromPath(filePath) {
  // Accept both "docs/platform/auth.md" and absolute paths
  const rel = filePath.startsWith(DOCS_DIR)
    ? path.relative(DOCS_DIR, filePath)
    : filePath.replace(/^docs[/\\]/, '');
  const moduleKey = rel.split(path.sep)[0].replace(/\.(md|mdx)$/, '');
  return moduleKey;
}

// ─── Full regeneration fallback ─────────────────────────────────────────────

function runFullGeneration() {
  const scriptPath = path.join(__dirname, 'generate-llms-txt.mjs');
  execSync(`node "${scriptPath}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
}

// ─── Watch mode ─────────────────────────────────────────────────────────────

async function watchMode() {
  // Use chokidar (bundled with Docusaurus/webpack) — handles large trees without
  // hitting the OS file-descriptor limit that Node's built-in fs.watch runs into.
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  const chokidar = require('chokidar');

  console.log('[update-llms-txt] Watching docs/ for changes… (Ctrl+C to stop)');

  // Debounce: collect changed modules over 300 ms then flush in one pass
  let pending = new Set();
  let timer = null;

  function flush() {
    const modules = [...pending];
    pending = new Set();
    timer = null;
    console.log(`[update-llms-txt] Detected changes in: ${modules.join(', ')}`);
    updateFullTxt(modules);
    if (modules.some(m => PRIORITY_MODULES.includes(m))) {
      rebuildConciseTxt(modules);
    }
  }

  function handlePath(filePath) {
    if (!/\.(md|mdx)$/.test(filePath)) return;
    pending.add(moduleKeyFromPath(filePath));
    clearTimeout(timer);
    timer = setTimeout(flush, 300);
  }

  chokidar
    .watch(DOCS_DIR, { ignoreInitial: true, ignored: /(^|[/\\])\../ })
    .on('add', handlePath)
    .on('change', handlePath)
    .on('unlink', handlePath)
    .on('error', err => console.error('[update-llms-txt] Watcher error:', err));
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--all')) {
    console.log('[update-llms-txt] --all flag: running full regeneration.');
    runFullGeneration();
    return;
  }

  if (args.includes('--watch')) {
    // When launched by `npm start`, generate-llms-txt.mjs has just run a full
    // rescan, so skip the redundant git-diff check and go straight to watching.
    await watchMode();
    return;
  }

  // Explicit file paths from CLI
  const filePaths = args.filter(a => !a.startsWith('--') && /\.(md|mdx)$/.test(a));

  let changedFiles = filePaths.length > 0 ? filePaths : getChangedDocFilesFromGit();

  if (changedFiles.length === 0) {
    console.log('[update-llms-txt] No changed doc files detected. Nothing to update.');
    return;
  }

  const affectedModules = [...new Set(changedFiles.map(moduleKeyFromPath))];
  console.log(`[update-llms-txt] Affected modules: ${affectedModules.join(', ')}`);

  updateFullTxt(affectedModules);

  if (affectedModules.some(m => PRIORITY_MODULES.includes(m))) {
    rebuildConciseTxt(affectedModules);
  }

  console.log('[update-llms-txt] Done.');
}

main();
