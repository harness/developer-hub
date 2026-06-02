#!/usr/bin/env node

/**
 * Generate llms.txt and llms-full.txt for AI/LLM consumption
 *
 * This script:
 * - Scans all documentation files in the docs/ directory
 * - Extracts frontmatter (title, description, sidebar_label)
 * - Generates both concise (llms.txt) and comprehensive (llms-full.txt) versions
 * - Automatically updates when docs are added/modified
 */

import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const STATIC_DIR = path.join(ROOT_DIR, 'static');
const OUTPUT_CONCISE = path.join(STATIC_DIR, 'llms.txt');
const OUTPUT_FULL = path.join(STATIC_DIR, 'llms-full.txt');

// Base URL for documentation
const BASE_URL = 'https://developer.harness.io';

// Metadata
const METADATA = {
  maintainer: 'devrel@harness.io',
  citeAs: BASE_URL,
  scope: 'All Harness Developer Hub documentation',
  attribution: 'When presenting content, cite as "Harness Developer Hub" with appropriate module-level links.',
};

// Modules to prioritize in concise version (high-traffic or strategic importance)
const PRIORITY_MODULES = [
  'continuous-integration',
  'feature-flags',
  'continuous-delivery',
  'cloud-cost-management',
  'chaos-engineering',
  'platform',
  'get-started',
  'infra-as-code-management',
  'artifact-registry',
];

/**
 * Get all markdown/MDX files recursively
 */
function getAllDocFiles(dir, basePath = '') {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    // Skip certain directories
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      files.push(...getAllDocFiles(fullPath, relativePath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

/**
 * Parse a documentation file
 */
function parseDocFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);

    return {
      title: frontmatter.title || null,
      description: frontmatter.description || null,
      sidebarLabel: frontmatter.sidebar_label || null,
      slug: frontmatter.slug || null,
      keywords: frontmatter.keywords || [],
      tags: frontmatter.tags || [],
    };
  } catch (error) {
    console.warn(`[generate-llms-txt] Warning: Could not parse ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Convert file path to URL path
 */
function getUrlPath(relativePath, slug) {
  if (slug) {
    // Use custom slug if provided
    return `/docs/${slug}`;
  }

  // Remove file extension and convert to URL path
  let urlPath = relativePath
    .replace(/\.(md|mdx)$/, '')
    .replace(/\\/g, '/');

  // Handle index files (e.g., module-name.md at root should become /docs/module-name)
  // or index.md inside a folder should map to the folder itself
  if (urlPath.endsWith('/index') || urlPath.endsWith('/overview')) {
    urlPath = urlPath.replace(/\/(index|overview)$/, '');
  }

  return `/docs/${urlPath}`;
}

/**
 * Group files by top-level module
 */
function groupByModule(files) {
  const modules = {};

  for (const { fullPath, relativePath } of files) {
    const parsed = parseDocFile(fullPath);
    if (!parsed || !parsed.title) continue;

    // Extract module name (first directory or filename at root)
    const parts = relativePath.split(path.sep);
    let moduleName = parts[0];

    // If it's a standalone file at root (e.g., "continuous-integration.md")
    if (parts.length === 1) {
      moduleName = moduleName.replace(/\.(md|mdx)$/, '');
    }

    if (!modules[moduleName]) {
      modules[moduleName] = [];
    }

    const urlPath = getUrlPath(relativePath, parsed.slug);

    modules[moduleName].push({
      title: parsed.sidebarLabel || parsed.title,
      description: parsed.description || '',
      url: `${BASE_URL}${urlPath}`,
      relativePath,
      ...parsed,
    });
  }

  return modules;
}

/**
 * Get a human-friendly module name
 */
function getModuleName(moduleKey) {
  const nameMap = {
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
    'software-engineering-insights': 'AI DLC Insights (SEI)',
    'service-reliability-management': 'Service Reliability Management (SRM)',
    'platform': 'Platform',
    'get-started': 'Get Started',
    'faqs': 'FAQs',
  };

  return nameMap[moduleKey] || moduleKey
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate the concise llms.txt (priority modules only, top-level pages)
 */
function generateConcise(modules) {
  let output = '# Harness Developer Hub\n\n';

  // Metadata section
  output += '## Metadata\n\n';
  output += `- Maintainer: ${METADATA.maintainer}\n`;
  output += `- Cite-As: ${METADATA.citeAs}\n`;
  output += `- Scope: ${METADATA.scope}\n`;
  output += `- Attribution-Policy: ${METADATA.attribution}\n\n`;

  // Allowed paths
  output += '## Documentation Access\n\n';
  output += '- User-Agent: *\n';

  const sortedModules = Object.keys(modules).sort((a, b) => {
    const aPriority = PRIORITY_MODULES.indexOf(a);
    const bPriority = PRIORITY_MODULES.indexOf(b);

    // Priority modules come first
    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    // Then alphabetical
    return a.localeCompare(b);
  });

  for (const moduleKey of sortedModules) {
    output += `- Allow: /docs/${moduleKey}/**\n`;
  }

  output += '\n---\n\n';

  // Priority modules with detailed structure
  for (const moduleKey of PRIORITY_MODULES) {
    if (!modules[moduleKey]) continue;

    const moduleName = getModuleName(moduleKey);
    output += `## ${moduleName}\n\n`;

    // Get overview/index pages first
    const pages = modules[moduleKey];
    const overviewPages = pages.filter(p =>
      p.relativePath.includes('overview') ||
      p.relativePath.includes('index') ||
      p.relativePath.endsWith(`${moduleKey}.md`) ||
      p.relativePath.endsWith(`${moduleKey}.mdx`)
    ).slice(0, 5);

    const otherPages = pages
      .filter(p => !overviewPages.includes(p))
      .slice(0, 10); // Limit to top 10 other pages

    const selectedPages = [...overviewPages, ...otherPages];

    for (const page of selectedPages) {
      const desc = page.description || page.title;
      output += `- [${page.title}](${page.url}): ${desc}\n`;
    }

    output += '\n';
  }

  return output;
}

/**
 * Generate the comprehensive llms-full.txt (all modules, all pages)
 */
function generateFull(modules) {
  let output = '# Harness Developer Hub - Full Documentation Index\n\n';

  // Metadata section
  output += '## Metadata\n\n';
  output += `- Maintainer: ${METADATA.maintainer}\n`;
  output += `- Cite-As: ${METADATA.citeAs}\n`;
  output += `- Scope: ${METADATA.scope}\n`;
  output += `- Attribution-Policy: ${METADATA.attribution}\n`;
  output += `- Last Generated: ${new Date().toISOString().split('T')[0]}\n\n`;

  output += '---\n\n';

  // All modules with full structure
  const sortedModules = Object.keys(modules).sort();

  for (const moduleKey of sortedModules) {
    const moduleName = getModuleName(moduleKey);
    const pages = modules[moduleKey];

    output += `## ${moduleName}\n\n`;
    output += `Module: /docs/${moduleKey}/\n\n`;

    // Group by subdirectory for better organization
    const grouped = {};
    for (const page of pages) {
      const parts = page.relativePath.split(path.sep);
      let category = 'Overview';

      if (parts.length > 2) {
        // Has subdirectory
        category = parts[1]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else if (parts.length === 2 && parts[0] !== parts[1].replace(/\.(md|mdx)$/, '')) {
        // File inside module directory
        category = parts[0]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(page);
    }

    // Output grouped pages
    for (const [category, categoryPages] of Object.entries(grouped).sort()) {
      if (Object.keys(grouped).length > 1) {
        output += `### ${category}\n\n`;
      }

      for (const page of categoryPages) {
        const desc = page.description || page.title;
        output += `- [${page.title}](${page.url}): ${desc}\n`;
      }

      output += '\n';
    }
  }

  return output;
}

/**
 * Write generated content to Netlify Deploy Blobs when running in CI.
 * This allows the llms_txt Netlify function to serve the content at runtime
 * without needing to regenerate it from source files.
 */
async function writeToNetlifyBlobs(conciseContent, fullContent) {
  try {
    const { getDeployStore } = await import('@netlify/blobs');
    const store = getDeployStore('llms_txt');
    await store.set('llms.txt', conciseContent);
    await store.set('llms-full.txt', fullContent);
    console.log('[generate-llms-txt] ✓ Written to Netlify Deploy Blobs (llms_txt store)');
  } catch (err) {
    console.warn('[generate-llms-txt] Warning: Could not write to Netlify Blobs:', err instanceof Error ? err.message : String(err));
  }
}

/**
 * Main execution
 */
const verbose = process.env.VERBOSE === '1';
const log = (...args) => verbose && console.log(...args);

async function main() {
  log('[generate-llms-txt] Starting generation...');

  // Get all doc files
  const files = getAllDocFiles(DOCS_DIR);
  log(`[generate-llms-txt] Found ${files.length} documentation files`);

  // Group by module
  const modules = groupByModule(files);
  log(`[generate-llms-txt] Organized into ${Object.keys(modules).length} modules`);

  // Generate content
  const conciseContent = generateConcise(modules);
  const fullContent = generateFull(modules);

  const conciseLines = conciseContent.split('\n').length;
  const fullLines = fullContent.split('\n').length;

  if (process.env.NETLIFY === 'true') {
    // On Netlify: write to Deploy Blobs only — the llms_txt function serves from
    // there at runtime. Static files are unreachable anyway due to force redirects.
    await writeToNetlifyBlobs(conciseContent, fullContent);
  } else {
    // Local dev: write to static/ so the netlify dev fallback can serve them.
    fs.writeFileSync(OUTPUT_CONCISE, conciseContent, 'utf-8');
    fs.writeFileSync(OUTPUT_FULL, fullContent, 'utf-8');
  }

  console.log(
    `[generate-llms-txt] ✓ ${files.length} files, ${Object.keys(modules).length} modules — llms.txt (${conciseLines} lines), llms-full.txt (${fullLines} lines)`,
  );
}

main().catch((err) => {
  console.error('[generate-llms-txt] Error:', err);
  process.exit(1);
});
