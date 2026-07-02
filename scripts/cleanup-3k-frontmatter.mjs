import fs from "fs";
import path from "path";

const targetDir = "./3k-docs";

function extractFrontmatter(content) {
  if (!content.startsWith("---")) return null;

  const lines = content.split("\n");

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }

  if (end === -1) return null;

  return {
    lines,
    frontmatter: lines.slice(1, end),
    end,
  };
}

function removeRedirectFrom(frontmatter) {
  const cleaned = [];

  let skipping = false;
  let removed = false;

  for (const line of frontmatter) {
    const trimmed = line.trim();

    // Start removing redirect_from block
    if (trimmed === "redirect_from:") {
      skipping = true;
      removed = true;
      continue;
    }

    if (skipping) {
      // Continue skipping redirect entries
      if (trimmed.startsWith("- ")) {
        continue;
      }

      // We've reached the next frontmatter field
      skipping = false;
    }

    cleaned.push(line);
  }

  return { cleaned, removed };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) {
      continue;
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const fm = extractFrontmatter(content);

    if (!fm) continue;

    const { cleaned, removed } = removeRedirectFrom(fm.frontmatter);

    if (!removed) continue;

    const newContent = [
      "---",
      ...cleaned,
      "---",
      ...fm.lines.slice(fm.end + 1),
    ].join("\n");

    fs.writeFileSync(fullPath, newContent, "utf8");

    console.log(`✅ Removed redirect_from from ${fullPath}`);
  }
}

walk(targetDir);

console.log("\n🎉 Done!");