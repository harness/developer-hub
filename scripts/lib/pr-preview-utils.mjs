import { execSync } from 'node:child_process';
import matter from 'gray-matter';

/** Docusaurus content roots (relative path prefix -> routeBasePath). */
export const DOC_ROOTS = {
  'docs/': 'docs',
  '3k-docs/': '3k-docs',
  'release-notes/': 'release-notes',
  'university/': 'university',
  'roadmap/': 'roadmap',
};

const DOC_ROOT_KEYS = Object.keys(DOC_ROOTS);

/** Normalize markdown body so whitespace-only edits are not treated as content changes. */
export function normalizeMarkdownBody(body) {
  return (body ?? '').replace(/\r\n/g, '\n').trim();
}

/** True when old and new file differ only in YAML frontmatter (redirect_from, title, etc.). */
export function isFrontmatterOnlyChange(oldContent, newContent) {
  const oldBody = normalizeMarkdownBody(matter(oldContent ?? '').content);
  const newBody = normalizeMarkdownBody(matter(newContent ?? '').content);
  return oldBody === newBody;
}

export function getPreviewLabel(frontmatter) {
  const label = frontmatter?.sidebar_label || frontmatter?.title;
  return typeof label === 'string' ? label.trim() : null;
}

/**
 * Map a repo-relative Markdown path to its published site path (no host).
 * Honors frontmatter `slug` and each plugin routeBasePath.
 */
export function fileToSitePath(relPath, frontmatter) {
  const rootKey = DOC_ROOT_KEYS.find((r) => relPath.startsWith(r));
  if (!rootKey) return null;

  const base = DOC_ROOTS[rootKey];
  const rest = relPath.slice(rootKey.length);

  if (frontmatter?.slug) {
    const slug = String(frontmatter.slug).replace(/^\//, '');
    return `/${base}/${slug}`.replace(/\/+/g, '/');
  }

  let routePart = rest.replace(/\.(md|mdx)$/i, '');
  routePart = routePart.replace(/\/(index|README)$/i, '');
  // Docusaurus convention: a file whose basename matches its parent folder
  // (e.g. get-started/get-started.md) routes to the folder itself, same as
  // index/README — otherwise the built link 404s with the segment doubled.
  routePart = routePart.replace(/\/([^/]+)\/\1$/, '/$1');
  return `/${base}/${routePart}`.replace(/\/+/g, '/');
}

function runGit(command, cwd) {
  return execSync(command, { cwd, encoding: 'utf8' }).trim();
}

/** Resolve base ref to a commit SHA for stable git show/diff operations. */
export function resolveGitRef(ref, cwd) {
  return runGit(`git rev-parse ${ref}`, cwd);
}

export function readFileAtRef(ref, filePath, cwd) {
  try {
    return runGit(`git show ${ref}:${filePath}`, cwd);
  } catch {
    return null;
  }
}

/** Parse `git diff --name-status` lines into { status, filePath }. */
export function parseNameStatusLines(lines) {
  const entries = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    const status = parts[0];
    if (status.startsWith('D')) continue;
    const filePath = parts[parts.length - 1];
    if (!/\.(md|mdx)$/i.test(filePath)) continue;
    if (!DOC_ROOT_KEYS.some((r) => filePath.startsWith(r))) continue;
    entries.push({ status, filePath });
  }
  return entries;
}

function buildPreviewEntry(filePath, content) {
  const { data: frontmatter } = matter(content);
  const label = getPreviewLabel(frontmatter) ?? filePath;
  const sitePath = fileToSitePath(filePath, frontmatter);
  if (!sitePath) return null;

  return {
    filePath,
    label,
    sitePath,
  };
}

/**
 * Classify changed docs for PR preview generation from name-status lines.
 * Returns { previewPages, frontmatterOnly, skipped }.
 */
export function classifyChangedDocsFromNameStatus(nameStatusLines, baseRef, headRef, cwd) {
  const base = resolveGitRef(baseRef, cwd);
  const head = resolveGitRef(headRef, cwd);
  const entries = parseNameStatusLines(nameStatusLines);

  const previewPages = [];
  const frontmatterOnly = [];
  const skipped = [];
  const seen = new Set();

  for (const { filePath } of entries) {
    if (seen.has(filePath)) continue;
    seen.add(filePath);

    const oldContent = readFileAtRef(base, filePath, cwd);
    const newContent = readFileAtRef(head, filePath, cwd);

    if (newContent == null) {
      skipped.push({ filePath, reason: 'deleted' });
      continue;
    }

    if (oldContent != null && isFrontmatterOnlyChange(oldContent, newContent)) {
      frontmatterOnly.push({ filePath });
      continue;
    }

    const page = buildPreviewEntry(filePath, newContent);
    if (page) previewPages.push(page);
  }

  previewPages.sort((a, b) => a.label.localeCompare(b.label));
  frontmatterOnly.sort((a, b) => a.filePath.localeCompare(b.filePath));

  return { previewPages, frontmatterOnly, skipped };
}

/** Classify changed docs using a three-dot diff against baseRef. */
export function classifyChangedDocs(baseRef, headRef, cwd) {
  const base = resolveGitRef(baseRef, cwd);
  const head = resolveGitRef(headRef, cwd);
  const output = runGit(`git diff --name-status ${base}...${head}`, cwd);
  const lines = output ? output.split('\n') : [];
  return classifyChangedDocsFromNameStatus(lines, baseRef, headRef, cwd);
}

export const PENDING_PREVIEW_LINK = '_Pending CI preview build…_';

export function buildPreviewTableMarkdown(previewPages, options = {}) {
  const { jiraTicket, previewBase } = options;
  const lines = [
    '| Description | Link |',
    '|-------------|------|',
  ];

  if (previewPages.length === 0) {
    const cell = previewBase
      ? `[Open site preview](${previewBase})`
      : 'No per-page previews needed (changes are frontmatter-only). Use the Netlify draft URL from the CI comment when the build completes.';
    lines.push(`| Preview URL | ${cell} |`);
  } else {
    for (const page of previewPages) {
      const cell = previewBase
        ? `[${page.label}](${previewBase}${page.sitePath})`
        : PENDING_PREVIEW_LINK;
      lines.push(`| Preview: ${page.label} | ${cell} |`);
    }
  }

  if (jiraTicket) {
    lines.push(
      `| JIRA Ticket | [${jiraTicket}](https://harness.atlassian.net/browse/${jiraTicket}) |`,
    );
  } else {
    lines.push('| JIRA Ticket | [JIRA Ticket ID](https://harness.atlassian.net/browse/<JIRA Ticket ID>) |');
  }

  return lines.join('\n');
}
