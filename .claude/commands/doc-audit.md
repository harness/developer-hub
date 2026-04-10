# Doc Audit — Single page

Audit a single Harness Developer Hub documentation page for accuracy, completion, and editorial
quality. Produces a scored report and a ready-to-use rewrite prompt.

For a full audit that also crawls and assesses every sibling page in the section, use `/doc-section-audit` instead.

## Usage

```
/doc-audit [url | module-abbreviation]
```

**Examples:**
- `/doc-audit iacm` — find the oldest page in the IACM module and audit it
- `/doc-audit ccm` — find the oldest page in Cloud Cost Management and audit it
- `/doc-audit https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration` — audit a specific page directly

## Arguments

`$ARGUMENTS`

If a **module abbreviation** is provided, find the oldest (least recently updated) `.md` file in
that module's docs folder using `git log`, then audit it.

If a **direct URL** is provided (`https://developer.harness.io/docs/...`), audit that page directly.

If **nothing** is provided, ask the user for a URL or module abbreviation before proceeding.

---

## Module map

| Abbreviation | Live URL base | Repo folder |
|---|---|---|
| `ci` | /docs/continuous-integration | docs/continuous-integration |
| `cd` | /docs/continuous-delivery | docs/continuous-delivery |
| `ccm` | /docs/cloud-cost-management | docs/cloud-cost-management |
| `iacm` | /docs/infrastructure-as-code-management | docs/infra-as-code-management |
| `chaos` | /docs/resilience-testing | docs/resilience-testing |
| `sto` | /docs/security-testing-orchestration | docs/security-testing-orchestration |
| `platform` | /docs/platform | docs/platform |
| `sei` | /docs/software-engineering-insights | docs/software-engineering-insights |
| `ssca` | /docs/software-supply-chain-assurance | docs/software-supply-chain-assurance |
| `idp` | /docs/internal-developer-portal | docs/internal-developer-portal |
| `sca` | /docs/software-supply-chain-assurance | docs/software-supply-chain-assurance |

**Excluded — never audit:**
`ff` (feature-flags), `srm` (service-reliability-management), `cet` (continuous-error-tracking), release-notes.

---

## Step 1 — Resolve the target page

**Module abbreviation:**
```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --top 1
```
Take the single result. Convert the file path to a URL:
- Strip `docs/<REPO-FOLDER>/` and `.md`
- Prepend the module's Base URL from the table above
- Example: `docs/infra-as-code-management/workspaces/cli-integration.md` → `https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration`

Tell the user: **"Oldest page in [MODULE]: [URL] — last updated [DATE]. Starting audit…"**

**Direct URL:** use it as-is.

---

## Step 2 — Fetch the doc-structure-template

```bash
cat .cursor/rules/doc-structure-template.mdc
```

Use this as the structural benchmark for the Editorial score.

---

## Step 3 — Read and score the page

Use Claude in Chrome to navigate to the URL and read the full page.

Score across three dimensions (each starts at 100):

**Accuracy (40%):** –20 contradicts UI/behaviour, –15 steps would error, –15 outdated screenshots, –15 broken code, –10 wrong API, –10 stale versions, –10 wrong prerequisites, –5 broken links

**Completion (30%):** –15 undocumented capabilities, –10 missing prerequisites, –10 missing troubleshooting, –10 missing config options, –10 no code examples, –10 missing cross-module refs (esp. Platform), –10 no RBAC guidance, –10 missing limitations, –10 incomplete API params, –5 no Next Steps

**Editorial (30%):** –15 wrong structure (vs template), –10 missing/incorrect frontmatter, –10 wrong heading case (must be sentence case), –10 non-site-relative links, –10 missing redirect_from, –10 style violations, –10 walls of text, –5 inconsistent UI bolding, –5 no intro before lists, –5 spelling/grammar, –5 missing callouts, –5 slug /docs/docs/ bug

**Weighted score:** `(Accuracy × 0.4) + (Completion × 0.3) + (Editorial × 0.3)`
**Pass: ≥ 80. Fail: < 80.**

---

## Step 4 — Write the audit report

Save to `.claude/skills/doc-audit/audits/[slug]-audit.md`. The folder already exists.

```markdown
# Audit: [Page Title]

**URL:** [url]
**Last git commit:** [date or "unknown"]
**Audit date:** [today]
**Overall score:** [score]/100 — PASS / FAIL

## Scores
| Dimension | Raw | Weight | Weighted |
|---|---|---|---|
| Accuracy | /100 | 40% | |
| Completion | /100 | 30% | |
| Editorial | /100 | 30% | |
| **Total** | | | **/100** |

## Issues found
### Accuracy
### Completion
### Editorial

## Structural rewrite plan

## Redirect changes required

## JIRA ticket description
**Summary:**
**Description:** [HIGH/MEDIUM/LOW issues]
**Acceptance criteria:** [ ] ...
**Labels:** docs-quality, [module], [stale if applicable]
**Effort:** Low / Medium / High

## Rewrite prompt

Copy this prompt into Claude Code or Cursor to apply the suggested changes:

```
Rewrite the following Harness Developer Hub documentation page to address quality issues
identified in an audit. Before making any changes, read these files in order:

1. .cursor/rules/doc-structure-template.mdc  — required page structure and section order
2. .cursor/rules/doc-linking.mdc             — link formatting (site-relative paths only)
3. .cursor/rules/doc-slugs-and-redirects.mdc — slug and redirect_from conventions
4. .cursor/rules/doc-move.mdc                — redirect requirements if restructuring
5. CLAUDE.md                                 — project-wide conventions (headings, components, frontmatter)

Page to rewrite: [repo-relative file path]
Live URL: [full URL]
Audit report: .claude/skills/doc-audit/audits/[slug]-audit.md

---
ACCURACY FIXES
[paste Accuracy issues from audit]

COMPLETION GAPS TO ADDRESS
[paste Completion issues from audit]

EDITORIAL FIXES
[paste Editorial issues from audit]

STRUCTURAL REWRITE PLAN
[paste Structural rewrite plan from audit]

REDIRECTS REQUIRED
[paste Redirect changes required from audit]

---
The rewritten page must satisfy all of the following before you consider it done:

- Follows the doc-structure-template skeleton exactly (frontmatter → intro → prerequisites →
  steps → Troubleshoot component → Next steps)
- Frontmatter is complete: title, sidebar_label (Title Case), description, keywords, tags;
  slug does not include a /docs/ prefix
- All ## and ### headings use sentence case; imperative form for instructional sections
- All internal links use site-relative paths (/docs/...), never full production URLs
- redirect_from added to frontmatter for any URL being superseded
- <Troubleshoot> component replaces any static troubleshooting headings (import from
  @site/src/components/AdaptiveAIContent)
- UI element names are consistently bolded
- No intro is missing before the first list or step
- Page scores ≥ 80 on a re-audit across Accuracy, Completion, and Editorial dimensions
```
```

---

## Step 5 — Report back

1. Score + PASS/FAIL
2. Top 3 most impactful issues
3. Link: `computer://[full path to audit file]`
4. JIRA ticket description pasted inline, ready to copy

Do **not** write to any Google Sheet.
