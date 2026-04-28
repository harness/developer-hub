---
name: doc-reviewer
description: >
  Extended documentation review for non-Harness docs or when image/link/SEO validation is needed.
  Use for: external repos, README reviews, blog posts, tutorial audits where asset validation matters.
  Adds: image path/alt-text/freshness checks, cross-reference validation, factual verification via
  web search, SEO/AEO analysis, What-Why-How framework evaluation. For Harness DevHub docs, use
  /doc-section-audit instead (includes Harness-specific scoring and JIRA generation).
argument-hint: "<file-path-or-url> | <folder-path> [--files <list>]"
user-invocable: true
---

# Doc Reviewer — Asset & SEO validation for non-Harness docs

Extends documentation review with capabilities not in the Harness audit skills:
- Image validation (paths, alt text, screenshot freshness)
- Cross-reference checking (broken links, missing anchors)
- Factual verification via web search
- SEO and AEO compliance analysis

**For Harness DevHub docs:** use `/doc-section-audit` instead — it includes the Harness-specific
doc-structure-template scoring, JIRA ticket generation, and section-level recommendations.

**This skill is for:** external repos, blog posts, READMEs, tutorials outside the Harness ecosystem.

---

## Arguments

`$ARGUMENTS`

Parse the input:

**File path or URL** (e.g., `docs/external/README.md`, `https://example.com/tutorial`):
Single-file review with asset validation.

**Folder path** (e.g., `docs/external/`, `/path/to/repo/docs`):
Repo Discovery mode — inventory files, let user select which to review.

**Folder + `--files <list>`** (e.g., `docs/external/ --files README.md,tutorial.md`):
Pre-selected files within a folder.

---

## Input Modes

### Mode A: Single Document
File path, URL, or pasted text. Proceed to Step 1 (Review Process).

### Mode B: Folder Path
User provided a directory. Run **Repo Discovery** (Step R1-R3), then proceed to Step 1 for each
selected file.

### Mode C: Folder + Pre-selected Files
Parse `--files` argument, skip user selection step (R2), run repo-level checks (R3), proceed to
Step 1 for each specified file.

---

## Repo Discovery (Mode B only)

### Step R1: Inventory the Docs Folder

Scan the directory tree using the `view` tool or `bash` (`find` command). Build an inventory of:

```bash
# Find all documentation files recursively
find <docs-root> -type f \( -name "*.md" -o -name "*.mdx" -o -name "*.rst" -o -name "*.html" -o -name "*.txt" -o -name "*.adoc" \) | sort | head -50

# Find all image files referenced by docs
find <docs-root> -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" -o -name "*.webp" \) | sort | head -50
```

Present the inventory to the user as a numbered list, grouped by folder. Include file sizes to give a sense of doc length. Example:

```
I found 12 documentation files in /path/to/docs:

📁 docs/
  1. README.md (4.2 KB)
  2. getting-started.md (8.1 KB)
  3. api-reference.md (15.3 KB)

📁 docs/guides/
  4. authentication.md (6.7 KB)
  5. deployment.md (3.9 KB)
  6. troubleshooting.md (2.1 KB)

📁 docs/tutorials/
  7. first-app.md (11.2 KB)
  8. advanced-config.md (7.8 KB)

Also found 9 images in docs/images/ and docs/assets/
```

### Step R2: Let the User Choose

Ask the user which files they'd like reviewed. Offer helpful defaults:

- "Want me to review all of them, or would you like to pick specific files?"
- If there are many files (>10), suggest: "I'd recommend starting with the most user-facing ones — your README and getting-started guide. Want to start there?"
- Accept responses like "1, 3, 5", "the guides folder", "all of them", "start with the README"

### Step R3: Pre-scan for Repo-Level Issues

Before diving into individual file reviews, do a quick repo-level health check. Run these checks using bash and report findings in a **Repo Health Summary** at the top of your report:

**Image path validation:**

Write a bash script to:
1. Extract every image reference (`![alt](path)` in Markdown, `<img src="...">` in HTML) from all doc files
2. Resolve each path relative to the file that references it
3. Check if the target image file actually exists on disk
4. Report any broken paths with the source file and line number

Example approach:
```bash
# For each markdown file, extract image refs and check existence
find <docs-root> -name "*.md" -o -name "*.mdx" | while read docfile; do
  dir=$(dirname "$docfile")
  grep -n '!\[.*\](' "$docfile" | while read match; do
    lineno=$(echo "$match" | cut -d: -f1)
    imgpath=$(echo "$match" | grep -oP '!\[.*?\]\(\K[^)]+')
    # Skip URLs (http/https)
    if [[ ! "$imgpath" =~ ^https?:// ]]; then
      resolved="$dir/$imgpath"
      if [ ! -f "$resolved" ]; then
        echo "BROKEN: $docfile:$lineno -> $imgpath"
      fi
    fi
  done
done
```

**Image alt text audit:**
- Flag images with empty alt text (`![](image.png)`) — these fail accessibility standards
- Flag images with generic alt text like "image", "screenshot", "photo", "pic", "img" — these don't help screen readers or SEO
- Note images with good, descriptive alt text as positive examples

**Screenshot currency check:**
- Check image file modification dates using `stat` or `ls -la`
- Flag any images older than 12 months — they may show outdated UI or information
- If the doc references specific software versions, cross-check whether screenshots likely match that version
- Frame findings as "worth verifying" rather than "definitely wrong" — file dates are heuristic, not proof

**Cross-reference validation (light touch):**
```bash
# Find all internal markdown links and check if targets exist
find <docs-root> -name "*.md" -o -name "*.mdx" | while read docfile; do
  dir=$(dirname "$docfile")
  grep -n '\[.*\](\..*\.md' "$docfile" | while read match; do
    lineno=$(echo "$match" | cut -d: -f1)
    linkpath=$(echo "$match" | grep -oP '\[.*?\]\(\K[^)#]+')
    resolved="$dir/$linkpath"
    if [ ! -f "$resolved" ]; then
      echo "BROKEN LINK: $docfile:$lineno -> $linkpath"
    fi
  done
done
```

Check for:
- Links to other docs in the repo that point to files that don't exist
- Anchor links (`#section-name`) that reference headings that don't exist in the target file
- Obviously orphaned docs — files that no other doc links to and that aren't the main README (mention these but don't flag as errors; they might be linked from a sidebar config or external site)

Do NOT attempt to audit full navigation configs (sidebars.js, mkdocs.yml, etc.) — that's out of scope.

---

## Review Process

Follow these steps in order for each document being reviewed. Do not skip steps.

### Step 1: Read the Document

Read the full document. It may come from:
- Pasted directly in chat
- An uploaded file (check `/mnt/user-data/uploads/` for .md, .txt, .html, .pdf, .docx files)
- A URL (use `web_fetch` to retrieve it)
- A local file path within a docs repo (use `view` or `bash cat` to read it)

If the document is unclear or missing, ask the user to provide it before proceeding.

**For local files:** also read the file in context — check what folder it lives in, what images it references, and what other docs it links to. This context matters for image and cross-reference checks.

### Step 2: Identify the Document Type

Determine which category fits best — this shapes your review expectations:

| Type | What to prioritize |
|---|---|
| **Product guide / tutorial** | Step-by-step clarity, prerequisites listed, expected outcomes stated, code samples tested |
| **README / onboarding doc** | Quick comprehension, setup instructions, "time to first success" minimized |
| **Blog post / article** | Narrative flow, hook, takeaways, audience-appropriate depth |

### Step 3: Unique Review Dimensions

Focus on capabilities not covered by Harness audit skills:

**A — What/Why/How Framework**
- Does each section establish **What** it's about before diving into **How**?
- Is the **Why** (motivation, benefit, use case) clear?
- Flag sections that jump straight to implementation without context.

**B — Factual Verification (web search)**
Use `web_search` to verify:
- Version numbers, API endpoints, CLI command syntax
- Install commands, default values, configuration options
- Claims about tool behavior, compatibility, or deprecation status
- External links (do they still exist and point to the right content?)

Keep a **Fact-Check Log** (table format):
| Claim | Source checked | Verdict |
|---|---|---|
| "Default port is 8080" | [official docs URL] | ✅ Verified / ⚠️ Outdated / ❌ Incorrect |

Only verify claims that would cause real problems if wrong. Skip obvious or trivial statements.

### Step 4: Image & Asset Validation (local files only)

**UNIQUE TO THIS SKILL** — not covered by Harness audits.

For each image reference in the file (`![alt](path)`, `<img src="...">`):

**A — Path validation**
```bash
# Resolve relative to the doc's directory
dir=$(dirname <file-path>)
# Extract image path from markdown/HTML
# Check if file exists at resolved path
[ -f "$dir/$imgpath" ] || echo "BROKEN: Line N → $imgpath"
```

**B — Alt text quality**
Flag patterns:
- Empty: `![](path)` — WCAG fail
- Generic: `![image](path)`, `![screenshot](path)` — not helpful for screen readers
- Filename-as-alt: `![config_2024.png](path)` — meaningless

Good example: `![Workspace settings panel showing the API key field highlighted in red]`

**C — Screenshot freshness**
```bash
# Check modification date
stat -f "%Sm" -t "%Y-%m-%d" <image-path>  # macOS
stat -c "%y" <image-path> | cut -d' ' -f1  # Linux
```

Flag images >12 months old as "worth verifying" — especially for UI screenshots, dashboards, or
version-specific content. This is a heuristic; file dates can mislead. Frame as "check recommended."

### Step 5: Cross-Reference Validation (local files only)

**UNIQUE TO THIS SKILL** — not covered by Harness audits.

For each internal link in the file:

**A — Path validation**
```bash
# For Markdown links: [text](./path.md), [text](../folder/doc.md)
# Resolve relative to file's directory
# Check if target exists
[ -f "$resolved_path" ] || echo "BROKEN LINK: Line N → $linkpath"
```

**B — Anchor validation**
For links with fragments (`[text](./doc.md#section-name)`):
- Read the target file
- Check if heading `## Section name` or `### Section name` exists
- Flag if anchor doesn't resolve

**C — Missed cross-references**
If the doc text mentions a concept that has a dedicated page in the same repo but doesn't link to
it, flag as an opportunity. Example: tutorial mentions "authentication" but doesn't link to
`authentication.md` in the same folder.

Keep this light — only flag broken links or obvious missed opportunities, not the full link graph.

### Step 6: SEO & AEO Analysis

**UNIQUE TO THIS SKILL** — not covered by Harness audits.

**SEO (Search Engine Optimization):**
- **Title/H1**: Clear, keyword-rich, <60 chars?
- **Meta description**: 150-160 chars, compelling, includes primary keyword?
- **Heading structure**: H2/H3 use natural keyword variations (not vague "Overview" / "Details")?
- **Keyword presence**: Primary topic appears in first 100 words? Used naturally throughout?
- **Anchor text**: Links use descriptive text (not "click here")?

**AEO (Answer Engine Optimization):**
- **Direct answers**: Does content directly answer "what is X", "how to Y", "why Z"?
- **FAQ-style sections**: Could key info be phrased as Q&A pairs for AI snippets?
- **Structured data**: Would definition lists, step numbering, summary boxes help AI parsing?
- **Snippet-friendliness**: Are there 2-3 sentence self-contained answers AI can extract?

### Step 7: Write the Report

Save to `.claude/skills/doc-reviewer/audits/<filename>-review-YYYYMMDD.md`

Use this structure (aligned with Harness audit format):

```markdown
# Review: [Document Title]

**File:** [file path or URL]
**Type:** [Product guide / Tutorial / README / Blog post / Article]
**Review date:** [today]
**Reviewer:** Claude (doc-reviewer skill)

---

## Summary

[2-3 sentences: overall impression, biggest strengths, top 3 issues]

---

## Scorecard

| Dimension | Rating | Notes |
|---|---|---|
| What-Why-How coverage | 🔴 / 🟡 / 🟢 | [one-line summary] |
| Factual accuracy | 🔴 / 🟡 / 🟢 | [verified N claims via web search] |
| Images & assets | 🔴 / 🟡 / 🟢 / N/A | [N broken paths, M stale screenshots] |
| Cross-references | 🔴 / 🟡 / 🟢 / N/A | [N broken links, M missing anchors] |
| SEO compliance | 🔴 / 🟡 / 🟢 | [title, keywords, anchor text] |
| AEO compliance | 🔴 / 🟡 / 🟢 | [snippet-friendliness, FAQ opportunities] |

**Key:**
- 🔴 Critical issues (block or mislead readers)
- 🟡 Important (confusion, missed opportunities)
- 🟢 Pass (no major issues)
- N/A (not applicable — e.g., pasted text has no image paths to check)

---

## Issues Found

### What-Why-How Coverage
[Flag sections that jump to "how" without establishing "what" or "why"]

### Factual Accuracy — Fact-Check Log

| Claim | Location | Source Checked | Verdict |
|---|---|---|---|
| "Default port is 8080" | Line 42 | [official docs] | ✅ Verified |
| "Supports Python 3.6+" | Line 15 | [changelog] | ⚠️ Outdated (dropped 3.6 in v2.0) |

### Image & Asset Issues
[Include only for local files]
- **Line 78**: Broken path `![](./images/setup.png)` — file not found
- **Line 92**: Empty alt text `![](dashboard.png)` — WCAG fail
- **Line 105**: Stale screenshot `admin-panel.png` (last modified 2022-03-10, >12mo old)

### Cross-Reference Issues
[Include only for local files]
- **Line 34**: Broken link `[setup guide](./setup.md)` — target does not exist
- **Line 67**: Anchor link `[config](#configuration)` — heading not found in target file
- **Line 89**: Mentions "authentication flow" but doesn't link to `authentication.md` in same folder

### SEO & AEO Issues
- **Title/H1**: Missing or vague (currently "Overview") — recommend "How to Deploy X on Kubernetes"
- **Meta description**: Missing
- **Keyword presence**: Primary term "deploy" not in first 100 words
- **FAQ opportunities**: Section "Common pitfalls" could be rephrased as Q&A pairs for AI snippets

---

## Top 5 Priority Fixes

1. **[Severity]** [Issue] — [why it matters] — [line/section reference]
2. ...
3. ...
4. ...
5. ...

---

## What's Working Well

[2-3 positive callouts — structure, clarity, examples, etc.]

---

## Next Steps

[If this is a Harness doc that needs deeper audit:]
Run `/doc-section-audit <file-path>` for Harness-specific scoring and JIRA ticket generation.

[Otherwise:]
Apply fixes above, re-run `/doc-reviewer <file-path>` to verify.
```

**For multi-file reviews (Repo Discovery mode):**

1. **Repo Health Summary** (`.claude/skills/doc-reviewer/audits/repo-health-YYYYMMDD.md`):
   - Aggregate findings from Step R3 (broken images, stale screenshots, broken links across all files)
   - Scorecard table with all reviewed files
   - Top 10 priority fixes across the repo

2. **Individual reports** per file (`.claude/skills/doc-reviewer/audits/<filename>-review-YYYYMMDD.md`)

Create the `audits/` directory if it doesn't exist.

### Step 8: Report Back

After saving the file(s), respond with:

1. **Summary** (2-3 sentences): overall rating, top 3 issues
2. **File link**: `computer://<repo-path>/.claude/skills/doc-reviewer/audits/<filename>-review-YYYYMMDD.md`
3. **Quick command**: next action (apply fixes, re-run review, or escalate to `/doc-section-audit` if Harness doc)

Keep the chat response brief — the detail is in the report file.

---

## Important Notes

**When NOT to use this skill:**
- Harness DevHub docs → use `/doc-section-audit` instead (includes Harness scoring + JIRA)
- Module-wide compliance → use `/doc-module-audit`
- Staleness triage → use `/doc-audit-check`

**This skill is for:**
- External repos, blog posts, READMEs
- When image/link validation is critical
- When SEO/AEO analysis is needed
- When factual verification via web search matters

**Heuristics:**
- Screenshot freshness based on file dates is approximate — frame as "worth checking," not "definitely wrong"
- Cross-reference validation is light touch — flag broken links, don't audit the full graph
- Factual verification focuses on high-impact claims — not every sentence

**Tone:**
- Constructive, not harsh — frame issues as opportunities
- Specific — "Line 42 jumps to implementation without explaining what a webhook is" beats "confusing"
- Prioritize ruthlessly — the Top 5 section matters most