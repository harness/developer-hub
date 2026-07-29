#!/usr/bin/env node
/**
 * Unit tests for the pure helpers in scripts/lib/pr-preview-utils.mjs.
 *
 * These functions decide which docs pages show up in a PR's preview table
 * (and which ones are skipped as frontmatter-only). They have no other test
 * coverage, so a regression here fails silently — the preview list is just
 * wrong or missing entries, with no CI signal.
 *
 * Run: npm run test:pr-preview-utils
 */
import assert from 'node:assert/strict';
import {
  isFrontmatterOnlyChange,
  fileToSitePath,
  parseNameStatusLines,
} from './lib/pr-preview-utils.mjs';

let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`OK   ${name}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${name}`);
    console.error(`  ${err.message}`);
  }
}

// --- isFrontmatterOnlyChange -------------------------------------------------

check('isFrontmatterOnlyChange: true when only redirect_from is removed', () => {
  const oldContent = [
    '---',
    'title: Get started',
    'redirect_from:',
    '  - /docs/platform/old-path',
    '---',
    '',
    'Same body content.',
    '',
  ].join('\n');
  const newContent = [
    '---',
    'title: Get started',
    '---',
    '',
    'Same body content.',
    '',
  ].join('\n');
  assert.equal(isFrontmatterOnlyChange(oldContent, newContent), true);
});

check('isFrontmatterOnlyChange: false when the body content changes', () => {
  const oldContent = ['---', 'title: Get started', '---', '', 'Old body.'].join('\n');
  const newContent = ['---', 'title: Get started', '---', '', 'New body.'].join('\n');
  assert.equal(isFrontmatterOnlyChange(oldContent, newContent), false);
});

check('isFrontmatterOnlyChange: true when only line endings/whitespace differ', () => {
  const oldContent = ['---', 'title: X', '---', '', 'Body text.', ''].join('\r\n');
  const newContent = ['---', 'title: X', '---', '', 'Body text.'].join('\n');
  assert.equal(isFrontmatterOnlyChange(oldContent, newContent), true);
});

check('isFrontmatterOnlyChange: handles null/undefined content without throwing', () => {
  assert.equal(isFrontmatterOnlyChange(null, undefined), true);
});

// --- fileToSitePath -----------------------------------------------------------

check('fileToSitePath: maps a plain docs path', () => {
  assert.equal(
    fileToSitePath('docs/platform/get-started/onboarding-guide.md', {}),
    '/docs/platform/get-started/onboarding-guide',
  );
});

check('fileToSitePath: strips a trailing index.md', () => {
  assert.equal(
    fileToSitePath('docs/platform/get-started/index.md', {}),
    '/docs/platform/get-started',
  );
});

check('fileToSitePath: strips a trailing README.md', () => {
  assert.equal(
    fileToSitePath('docs/resilience-testing/chaos-testing/infrastructure/README.md', {}),
    '/docs/resilience-testing/chaos-testing/infrastructure',
  );
});

check('fileToSitePath: collapses a file whose basename matches its parent folder', () => {
  // Docusaurus convention: get-started/get-started.md routes to /get-started,
  // not /get-started/get-started (which 404s).
  assert.equal(
    fileToSitePath('docs/infra-as-code-management/get-started/get-started.md', {}),
    '/docs/infra-as-code-management/get-started',
  );
});

check('fileToSitePath: does not collapse a nested doc with a different basename', () => {
  assert.equal(
    fileToSitePath('docs/infra-as-code-management/get-started/onboarding.md', {}),
    '/docs/infra-as-code-management/get-started/onboarding',
  );
});

check('fileToSitePath: honors a frontmatter slug override', () => {
  assert.equal(
    fileToSitePath('docs/platform/some-internal-file.md', { slug: '/platform/get-started' }),
    '/docs/platform/get-started',
  );
});

check('fileToSitePath: normalizes a slug override with no leading slash', () => {
  assert.equal(
    fileToSitePath('docs/platform/some-internal-file.md', { slug: 'platform/get-started' }),
    '/docs/platform/get-started',
  );
});

check('fileToSitePath: honors non-docs content roots (3k-docs, release-notes, university, roadmap)', () => {
  assert.equal(fileToSitePath('3k-docs/platform/foo.md', {}), '/3k-docs/platform/foo');
  assert.equal(fileToSitePath('release-notes/2026-01-01.md', {}), '/release-notes/2026-01-01');
  assert.equal(fileToSitePath('university/courses/intro.md', {}), '/university/courses/intro');
  assert.equal(fileToSitePath('roadmap/q1.md', {}), '/roadmap/q1');
});

check('fileToSitePath: returns null for paths outside known content roots', () => {
  assert.equal(fileToSitePath('src/components/Foo.tsx', {}), null);
});

// --- parseNameStatusLines -----------------------------------------------------

check('parseNameStatusLines: includes modified and added docs', () => {
  const entries = parseNameStatusLines([
    'M\tdocs/platform/foo.md',
    'A\tdocs/platform/bar.md',
  ]);
  assert.deepEqual(entries, [
    { status: 'M', filePath: 'docs/platform/foo.md' },
    { status: 'A', filePath: 'docs/platform/bar.md' },
  ]);
});

check('parseNameStatusLines: excludes deleted files', () => {
  const entries = parseNameStatusLines(['D\tdocs/platform/removed.md']);
  assert.deepEqual(entries, []);
});

check('parseNameStatusLines: uses the new path for renames and keeps the status', () => {
  const entries = parseNameStatusLines([
    'R100\tdocs/platform/old-name.md\tdocs/platform/new-name.md',
  ]);
  assert.deepEqual(entries, [{ status: 'R100', filePath: 'docs/platform/new-name.md' }]);
});

check('parseNameStatusLines: excludes non-markdown files', () => {
  const entries = parseNameStatusLines(['M\tdocs/platform/diagram.png']);
  assert.deepEqual(entries, []);
});

check('parseNameStatusLines: excludes files outside known content roots', () => {
  const entries = parseNameStatusLines(['M\tsrc/components/Foo.tsx']);
  assert.deepEqual(entries, []);
});

check('parseNameStatusLines: skips blank lines', () => {
  const entries = parseNameStatusLines(['', '  ', 'M\tdocs/platform/foo.md']);
  assert.deepEqual(entries, [{ status: 'M', filePath: 'docs/platform/foo.md' }]);
});

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log('\nAll pr-preview-utils tests passed.');
