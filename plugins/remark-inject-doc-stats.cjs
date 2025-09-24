const {execSync} = require('child_process');

const cache = new Map();
const WPM = 200;

function getLastCommitISO(filePath) {
  if (!filePath) return null;
  const k = `last:${filePath}`;
  if (cache.has(k)) return cache.get(k);
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
    cache.set(k, iso || null);
    return iso || null;
  } catch {
    cache.set(k, null);
    return null;
  }
}

function getFirstCommitISO(filePath) {
  if (!filePath) return null;
  const k = `first:${filePath}`;
  if (cache.has(k)) return cache.get(k);
  try {
    // first commit touching the file
    const iso = execSync(`git log --diff-filter=A --format=%cI -1 -- "${filePath}"`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
    cache.set(k, iso || null);
    return iso || null;
  } catch {
    cache.set(k, null);
    return null;
  }
}

function estimateMinutesFromMarkdown(vfile) {
  // vfile.value contains raw md/mdx; strip code fences lightly and count words
  const raw = String(vfile?.value || '');
  if (!raw) return null;
  const noCode = raw.replace(/```[\s\S]*?```/g, ' ');
  const words = (noCode.match(/\S+/g) || []).length;
  if (!words) return 1;
  return Math.max(1, Math.round(words / WPM));
}

module.exports = function remarkInjectDocStats() {
  return (tree, vfile) => {
    // Avoid double-inject on HMR
    const first = tree.children?.[0];
    const already =
      first &&
      (first.type === 'mdxJsxFlowElement' || first.type === 'mdxJsxTextElement') &&
      first.name === 'DocStatsBlock';

    const attrs = [];

    const filePath = vfile?.path;
    const updatedISO = getLastCommitISO(filePath);
    const publishedISO = getFirstCommitISO(filePath);
    const minutes = estimateMinutesFromMarkdown(vfile);

    if (updatedISO) {
      attrs.push({type: 'mdxJsxAttribute', name: 'overrideUpdated', value: updatedISO});
    }
    if (publishedISO) {
      attrs.push({type: 'mdxJsxAttribute', name: 'overridePublished', value: publishedISO});
    }
    if (typeof minutes === 'number') {
      attrs.push({type: 'mdxJsxAttribute', name: 'overrideReadingMin', value: String(minutes)});
    }

    if (!already) {
      tree.children.unshift({
        type: 'mdxJsxFlowElement',
        name: 'DocStatsBlock',
        attributes: attrs,
        children: [],
      });
    }
  };
};