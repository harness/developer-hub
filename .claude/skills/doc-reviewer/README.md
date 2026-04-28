# Doc Reviewer Skill

## Purpose

Extended documentation review for **non-Harness docs** or when **image/link/SEO validation** is needed.

## When to Use

✅ **Use doc-reviewer for:**
- External repos, blog posts, READMEs
- Tutorial audits where asset validation matters
- When you need image path/alt-text/screenshot freshness checks
- When you need cross-reference validation (broken links, missing anchors)
- When factual verification via web search is required
- When SEO/AEO analysis is needed

❌ **Do NOT use for Harness DevHub docs:**
- Use `/doc-section-audit` instead → includes Harness-specific scoring, JIRA generation
- Use `/doc-module-audit` for module-wide compliance
- Use `/doc-audit-check` for staleness triage

## Unique Capabilities

This skill adds capabilities NOT in the Harness audit skills:

### 1. Image Validation
- **Path checking**: Verifies every image reference resolves to an actual file
- **Alt text audit**: Flags empty, generic, or filename-as-alt patterns (WCAG compliance)
- **Screenshot freshness**: Flags images >12 months old (heuristic check)

### 2. Cross-Reference Validation
- **Broken links**: Checks every internal link resolves to existing file
- **Anchor validation**: Verifies `#section-name` links point to actual headings
- **Missed opportunities**: Flags concepts mentioned but not linked

### 3. Factual Verification
- Uses **web search** to verify technical claims
- Validates version numbers, API endpoints, CLI syntax
- Produces **Fact-Check Log** table with sources and verdicts

### 4. SEO & AEO Analysis
- **SEO**: Title/H1, meta description, keyword usage, anchor text
- **AEO**: Snippet-friendliness, FAQ opportunities, structured data

### 5. What-Why-How Framework
- Evaluates whether each section establishes context before diving into implementation
- Flags sections that jump to "how" without explaining "what" or "why"

## Usage

```bash
# Single file
/doc-reviewer path/to/file.md
/doc-reviewer https://example.com/tutorial

# Folder (Repo Discovery mode)
/doc-reviewer path/to/docs/

# Folder with pre-selected files
/doc-reviewer path/to/docs/ --files README.md,tutorial.md
```

## Output

Reports saved to: `.claude/skills/doc-reviewer/audits/`

**Single-file review:**
- `<filename>-review-YYYYMMDD.md`

**Multi-file review (Repo Discovery):**
- `repo-health-YYYYMMDD.md` (aggregate findings)
- `<filename>-review-YYYYMMDD.md` (per file)

## Report Format

Aligned with Harness audit skills:

```markdown
# Review: [Document Title]

**File:** [path or URL]
**Type:** [Product guide / Tutorial / README / etc.]
**Review date:** [today]

## Summary
[2-3 sentences]

## Scorecard
| Dimension | Rating | Notes |
|---|---|---|
| What-Why-How coverage | 🔴/🟡/🟢 | ... |
| Factual accuracy | 🔴/🟡/🟢 | ... |
| Images & assets | 🔴/🟡/🟢/N/A | ... |
| Cross-references | 🔴/🟡/🟢/N/A | ... |
| SEO compliance | 🔴/🟡/🟢 | ... |
| AEO compliance | 🔴/🟡/🟢 | ... |

## Issues Found
[Organized by dimension]

## Top 5 Priority Fixes
[Most impactful changes]

## What's Working Well
[2-3 positive callouts]
```

## Comparison with Harness Skills

| Feature | doc-reviewer | doc-section-audit | doc-module-audit |
|---------|-------------|-------------------|------------------|
| **Target** | Any doc | Harness page + section | Full Harness module |
| **Image validation** | ✅ | ❌ | ❌ |
| **Cross-ref validation** | ✅ | ❌ | ❌ |
| **Factual verification** | ✅ (web search) | ❌ | ❌ |
| **SEO/AEO analysis** | ✅ | ❌ | ❌ |
| **Harness scoring** | ❌ | ✅ | ✅ |
| **JIRA tickets** | ❌ | ✅ | ❌ |
| **DMS recommendations** | ❌ | ✅ | ❌ |
| **Module compliance** | ❌ | ❌ | ✅ |

## Examples

### External README review
```bash
/doc-reviewer external-repo/README.md
```
→ Checks image paths, alt text, cross-references, SEO

### Blog post audit
```bash
/doc-reviewer blog-posts/kubernetes-tutorial.md
```
→ Verifies technical claims via web search, checks SEO/AEO

### Multi-file discovery
```bash
/doc-reviewer external-docs/
```
→ Inventories folder, lets you pick files, runs repo-level health check

## Notes

- **Heuristics**: Screenshot freshness is approximate (based on file dates)
- **Light touch**: Cross-reference validation flags broken links, not full graph
- **High-impact focus**: Factual verification targets claims that matter
- **Constructive tone**: Frame issues as opportunities, not problems
