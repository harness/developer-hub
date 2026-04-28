# How to Use the Doc-Reviewer Skill

## Quick Start (5 Lines)

1. **Review a single file:** `/doc-reviewer path/to/file.md` or "Review the getting started guide at docs/iacm/get-started.md"
2. **Review a folder:** "Review the docs in docs/infra-as-code-management/" — Claude will list files and let you choose which to review
3. **Review your changes:** "Review all docs I've changed in this branch" — automatically finds modified .md files in your current branch
4. **Get a detailed report:** The skill generates a markdown report with severity-coded issues (🔴 critical, 🟡 important, 🟢 minor), fact-checks, SEO analysis, and Top 5 Priority Fixes
5. **Validates Harness standards:** Automatically checks against CLAUDE.md conventions (frontmatter, heading case, component usage, linking patterns)

## What It Checks

- **Content accuracy** (verifies claims, commands, version numbers)
- **Readability** (plain language, flow, scannability)
- **Structure** (heading hierarchy, formatting consistency)
- **Images** (broken paths, alt text quality, stale screenshots)
- **Cross-references** (broken internal links, missed linking opportunities)
- **SEO/AEO** (keywords, meta descriptions, snippet-friendliness)
- **Harness conventions** (CLAUDE.md compliance)

## Common Use Cases

```
# Before publishing new docs
Review docs/new-feature/overview.md

# Audit an entire section
Review the docs in docs/continuous-integration/

# Check your PR changes
Review all docs I've changed in this branch

# Quick spot-check
Review the troubleshooting section in docs/iacm/workspaces.md
```

## Output

The skill generates:
- **Single file:** `review-<filename>.md` with detailed findings
- **Multiple files:** `repo-health-summary.md` + individual reports for each file
- All saved to your working directory