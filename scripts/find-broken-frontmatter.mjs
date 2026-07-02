import fs from "fs";
import path from "path";

const ROOT = "./3k-docs"; // or ./docs

function isBadFrontmatter(content) {
  if (!content.startsWith("---")) return false;

  const lines = content.split("\n");

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }

  if (end === -1) return true;

  const fm = lines.slice(0, end + 1).join("\n");

  // 🔥 key failure signals from your stack trace
  return (
    fm.includes("\nimport ") ||   // import inside frontmatter
    fm.includes("---\nimport") || // broken delimiter
    /redirect_from:\n\s*-\s*.*---/m.test(fm) // corrupted URL + ---
  );
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) {
      continue;
    }

    const content = fs.readFileSync(full, "utf8");

    if (isBadFrontmatter(content)) {
      console.log("❌ BAD:", full);
    }
  }
}

walk(ROOT);

console.log("\nDone scanning.");