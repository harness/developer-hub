import fs from 'fs';
import path from 'path';

// Usage:
// node scripts/cleanup-3k-changes.mjs [module-path] [--dry-run]
//
// 3k-docs/ pages are usually markdown import stubs (see convert-3k-docs.mjs)
// -- they render content via `import X from '@site/docs/...'` and never
// reference their own /static/ assets. When a module folder is copied from
// docs/ into 3k-docs/ as the first step of the triage process, any static/
// subfolders (screenshots, diagrams) come along for the ride but are dead
// weight: the wrapper component doesn't need them, and they just bloat the
// commit with unnecessary binary diffs.
//
// HOWEVER: modules listed in the "rewritten" array of
// 3k-docs-module-status.json (see CLAUDE.md's "3k-docs Content Reuse"
// section) have been cut over to hand-authored content and can legitimately
// reference their own local static/ assets, e.g.
// 3k-docs/platform/getting-started/navigation/index.md uses
// `![](../static/nav-1.png)`. Deleting those breaks the build via
// `onBrokenLinks: 'throw'`. This script therefore:
//
//   1. Skips every static/ folder that lives under a "rewritten" module.
//   2. As a second, independent safety net (for modules mid-migration that
//      aren't in that list yet), scans every .md/.mdx file in the enclosing
//      module for a reference that resolves into the candidate static/
//      folder, and skips it if one is found.
//
// Only static/ folders that clear both checks are removed.
//
// Run this as the third step, after convert-3k-docs.mjs and
// cleanup-3k-frontmatter.mjs, to remove any unreferenced static/ folders
// under the module before committing.
//
// Examples:
//   node scripts/cleanup-3k-changes.mjs /feature-management-experimentation/              # scan 3k-docs/feature-management-experimentation/ only
//   node scripts/cleanup-3k-changes.mjs /feature-management-experimentation/ --dry-run    # preview, no deletion
//   node scripts/cleanup-3k-changes.mjs                  # scan all of 3k-docs/

const REUSE_ROOT = './3k-docs';
const MODULE_STATUS_FILE = './3k-docs-module-status.json';

const isDryRun = process.argv.includes('--dry-run');
const moduleName = process.argv.slice(2).find((a) => a !== '--dry-run');

const targetDir = moduleName ? `${REUSE_ROOT}/${moduleName}` : REUSE_ROOT;

if (!fs.existsSync(targetDir)) {
  console.error(`Target does not exist: ${targetDir}`);
  process.exit(1);
}

function loadRewrittenModules() {
  if (!fs.existsSync(MODULE_STATUS_FILE)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(MODULE_STATUS_FILE, 'utf8'));
    return Array.isArray(data.rewritten) ? data.rewritten : [];
  } catch {
    console.warn(
      `⚠️  Could not parse ${MODULE_STATUS_FILE}; treating no modules as rewritten (safer: more skips, not fewer).`
    );
    return [];
  }
}

const rewrittenModules = new Set(loadRewrittenModules());

function moduleOf(fullPath) {
  const rel = path.relative(REUSE_ROOT, fullPath).split(path.sep);
  return rel[0];
}

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(fullPath) : fs.statSync(fullPath).size;
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Scanned for asset references. .md/.mdx carry the overwhelming majority of
// them, but 3k-docs/ also contains a handful of .js/.ts/.tsx files (sidebar
// definitions, image wrapper components, template data) that can reference a
// sibling static/ asset. Include them so a component-only reference cannot
// leave its static/ folder looking unreferenced.
const SOURCE_FILE_RE = /\.(md|mdx|js|jsx|ts|tsx)$/;

function findSourceFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'static') continue; // nothing to scan inside a static/ folder itself
      files.push(...findSourceFiles(fullPath));
    } else if (SOURCE_FILE_RE.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

// Matches quoted or paren-wrapped paths containing "static/", covering
// markdown image/link syntax `](../static/x.png)`, JSX `src="../static/x.png"`,
// and `require('../static/x.png')`. All three forms occur in .md/.mdx as well
// as in code files -- MDX supports JSX, and `<DocImage path={require('./static/
// x.png')} />` is the dominant image pattern across this repo -- so the same
// regex is applied to every file type in SOURCE_FILE_RE.
const ASSET_REF_RE = /(['"(])([^'")\s]*static\/[^'")\s]*)/g;

// Scans every source file under moduleRoot for a reference that resolves
// into staticDirPath. Returns the first match found, or null.
function findReference(staticDirPath, moduleRoot) {
  const staticAbs = path.resolve(staticDirPath) + path.sep;
  for (const file of findSourceFiles(moduleRoot)) {
    const content = fs.readFileSync(file, 'utf8');
    ASSET_REF_RE.lastIndex = 0;
    let m;
    while ((m = ASSET_REF_RE.exec(content))) {
      const refPath = m[2];
      if (/^(https?:)?\/\//.test(refPath) || refPath.startsWith('@site/')) continue;

      const resolved = path.resolve(path.dirname(file), refPath);
      if (resolved + path.sep === staticAbs || (resolved + path.sep).startsWith(staticAbs)) {
        return { file, refPath };
      }
    }
  }
  return null;
}

function walk(dir) {
  const found = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.name === 'static') {
      found.push(fullPath);
      continue; // no need to descend into a static/ folder we're evaluating
    }

    found.push(...walk(fullPath));
  }

  return found;
}

const candidates = walk(targetDir);

if (!candidates.length) {
  console.log(`✅ No static/ folders found under ${targetDir}`);
  process.exit(0);
}

const toRemove = [];
const skipped = [];

for (const dirPath of candidates) {
  const mod = moduleOf(dirPath);
  const size = dirSize(dirPath);

  if (rewrittenModules.has(mod)) {
    skipped.push({
      dirPath,
      size,
      reason: `module "${mod}" is listed as rewritten in ${MODULE_STATUS_FILE} (hand-authored content may reference local assets)`,
    });
    continue;
  }

  const moduleRoot = path.join(REUSE_ROOT, mod);
  const ref = findReference(dirPath, moduleRoot);

  if (ref) {
    skipped.push({
      dirPath,
      size,
      reason: `referenced by ${ref.file} (${ref.refPath})`,
    });
    continue;
  }

  toRemove.push({ dirPath, size });
}

if (skipped.length) {
  console.log(`\n🛡️  Skipping ${skipped.length} static/ folder(s) that are still referenced:`);
  for (const { dirPath, size, reason } of skipped) {
    console.log(`  - ${dirPath} (${formatBytes(size)})\n      ${reason}`);
  }
}

if (!toRemove.length) {
  console.log(`\n✅ Nothing safe to remove under ${targetDir}`);
  process.exit(0);
}

const totalSize = toRemove.reduce((sum, d) => sum + d.size, 0);

console.log(
  isDryRun
    ? `\n🟡 DRY RUN - would remove ${toRemove.length} static/ folder(s) (${formatBytes(totalSize)}):`
    : `\n🗑️  Removing ${toRemove.length} static/ folder(s) (${formatBytes(totalSize)}):`
);

for (const { dirPath, size } of toRemove) {
  console.log(`  - ${dirPath} (${formatBytes(size)})`);
  if (!isDryRun) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

console.log(
  isDryRun
    ? `\n🟡 Dry run complete for ${targetDir}. Re-run without --dry-run to delete.`
    : `\n✅ Done stripping static/ folders from ${targetDir}. Review with 'git status' before committing.`
);
