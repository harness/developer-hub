const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '../src/components/ToolTip/tooltips.json');
const OUTPUT_DIR = path.join(__dirname, '../src/data');
const OUTPUT = path.join(OUTPUT_DIR, 'glossary.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read tooltips
const raw = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function formatTerm(key) {
  return key.replace(/-/g, ' ');
}

function walk(obj, currentPath = [], results = []) {
  Object.entries(obj).forEach(([key, value]) => {
    const newPath = [...currentPath, key];

    if (typeof value === 'string') {
      const [module, category, ...rest] = newPath;

      results.push({
        id: newPath.join('.'),
        term: formatTerm(key),
        definition: value,
        slug: slugify(key),
        module,
        category: category || null,
        letter: (formatTerm(key)[0] || '').toUpperCase()
      });

    } else if (value !== null && typeof value === 'object') {
      walk(value, newPath, results);
    }
  });

  return results;
}

function groupByLetter(entries) {
  return entries.reduce((acc, entry) => {
    acc[entry.letter] = acc[entry.letter] || [];
    acc[entry.letter].push(entry);
    return acc;
  }, {});
}

// Add related terms
function addRelated(entries) {
  return entries.map((entry) => {
    const related = entries
      .filter((e) => e.category === entry.category && e.id !== entry.id)
      .slice(0, 3)
      .map((e) => ({ term: e.term, slug: e.slug }));
    return { ...entry, related };
  });
}

// Main
function main() {
  let entries = walk(raw);
  entries.sort((a, b) => a.term.localeCompare(b.term));
  entries = addRelated(entries);

  const grouped = groupByLetter(entries);

  fs.writeFileSync(OUTPUT, JSON.stringify({ entries, grouped }, null, 2));

  console.log(`✅ Glossary generated (${entries.length} terms)`);
}

main();