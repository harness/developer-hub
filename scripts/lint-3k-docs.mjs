import fs from "fs";
import path from "path";

const ROOT = "./3k-docs";

let failed = false;

function checkFile(filePath, content) {
  const errors = [];

  if (!content.startsWith("---")) {
    errors.push("Missing frontmatter start");
  }

  const fmEnd = content.indexOf("\n---", 3);
  if (fmEnd === -1) {
    errors.push("Missing frontmatter end");
  }

  const fm = content.split("\n---\n")[0];

  // raw array detection (your current bug)
  if (/\n\s*\[[^\]]+\]\s*\n/.test(fm)) {
    errors.push("Raw array detected in frontmatter");
  }

  // orphan tags/redirect anomalies
  if (/\n- \/.+/.test(fm)) {
    errors.push("Hanging markdown link inside frontmatter");
  }

  if (errors.length) {
    failed = true;
    console.log(`\n❌ ${filePath}`);
    errors.forEach(e => console.log("   - " + e));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) continue;

    const content = fs.readFileSync(full, "utf8");
    checkFile(full, content);
  }
}

walk(ROOT);

if (failed) {
  console.log("\n🚨 LINT FAILED — fix issues before compile");
  process.exit(1);
}

console.log("\n✅ LINT PASSED");