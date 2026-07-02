import fs from 'fs';
import path from 'path';

// Usage:
// node scripts/generate-3k-wrapper-docs.mjs hdh Hdh --dry-run

const moduleName = process.argv[2];
const componentName = process.argv[3];
const isDryRun = process.argv.includes('--dry-run');

if (!moduleName || !componentName) {
  console.error(
    'Usage: node scripts/generate-3k-wrapper-docs.mjs <module-path> <component-name> [--dry-run]'
  );
  process.exit(1);
}

const targetDir = `./3k-docs/${moduleName}`;

function extractFrontmatter(content, filePath) {
  if (!content.startsWith('---')) {
    console.log(`Skipping (no frontmatter): ${filePath}`);
    return null;
  }

  const lines = content.split('\n');

  let endIndex = -1;

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    console.log(`Skipping (no closing frontmatter): ${filePath}`);
    return null;
  }

  const frontmatter = lines.slice(0, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 1).join('\n');

  return { frontmatter, body };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    const parsed = extractFrontmatter(content, fullPath);
    if (!parsed) continue;

    const { frontmatter } = parsed;

    const relativePath = path
      .relative('./3k-docs', fullPath)
      .replace(/\\/g, '/');

    const importPath = `@site/docs/${relativePath}`;

    const newContent =
`${frontmatter}

import ${componentName} from '${importPath}';

<${componentName} />
`;

    if (isDryRun) {
      console.log('\n🟡 DRY RUN - would update:');
      console.log(fullPath);
      console.log('---');
      console.log(newContent);
      console.log('---\n');
    } else {
      fs.writeFileSync(fullPath, newContent);
      console.log(`✅ Updated: ${fullPath}`);
    }
  }
}

walk(targetDir);

console.log(
  isDryRun
    ? `\n🟡 Dry run complete for ${moduleName}`
    : `\n✅ Done generating wrappers for ${moduleName}`
);