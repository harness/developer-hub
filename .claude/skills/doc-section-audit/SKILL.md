---
name: doc-section-audit
description: >
  Audit a Harness Developer Hub documentation page for accuracy, completeness, and editorial quality.
  Use this skill whenever the user wants to audit, score, review, or assess a Harness docs page.
  Triggers include: "audit [module]", "audit [url]", "doc audit", "check this doc", "score this page",
  "review the iacm docs", "what's the oldest page in [module]", or any request to evaluate
  documentation quality against the Harness rubric. Also use when the user provides a
  developer.harness.io URL and asks for feedback, quality check, or a JIRA ticket.
---

# Harness Doc Section Audit

You are auditing a Harness Developer Hub documentation page. Your output is a scored audit report
saved to the developer-hub repo, plus a ready-to-paste JIRA ticket description.

---

## Step 1 — Resolve the target page

Check the user's message for one of:

**A — Direct URL**
Any `https://developer.harness.io/docs/...` URL → use it directly.

**B — Module abbreviation**
A short code like `iacm`, `ccm`, `cd`, etc. → resolve using the map below, then find the oldest
page in that module (Step 2).

**Module map:**
| Code | Base URL | Repo folder |
|------|----------|-------------|
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

**Excluded — never audit these, tell the user if they try:**
- `ff` / feature-flags
- `srm` / service-reliability-management
- `cet` / continuous-error-tracking
- release-notes

**If nothing is provided**, ask: "Please give me either a docs URL
(`https://developer.harness.io/docs/...`) or a module abbreviation (e.g. `iacm`, `ccm`, `cd`)."

---

## Step 2 — Find the oldest page (module abbreviation only)

The developer-hub repo may be in one of two locations depending on the environment:
- **Cowork session:** `/sessions/serene-exciting-ramanujan/mnt/developer-hub`
- **Local macOS:** `/Users/richardblack/repos/developer-hub`

Try the Cowork path first; fall back to the macOS path if it doesn't exist:

```bash
REPO=/sessions/serene-exciting-ramanujan/mnt/developer-hub
[ -d "$REPO" ] || REPO=/Users/richardblack/repos/developer-hub
cd "$REPO"
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --top 1
```

Use the **Repo folder** column from the module map in Step 1 for `<MODULE-FOLDER>`.

Take the **oldest** result (first line). Convert the file path to a live URL using the
**Base URL** from the module map (the URL path may differ from the repo folder name — for example,
`iacm` files live in `docs/infra-as-code-management/` but the live URL uses
`/docs/infrastructure-as-code-management/`):
- Strip leading `docs/<REPO-FOLDER>/` from the file path, keep the remainder and strip `.md`
- Prepend the module's **Base URL**
- Example for iacm: `docs/infra-as-code-management/workspaces/cli-integration.md`
  → `https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration`

Tell the user: **"The oldest page in [MODULE] is [URL], last updated [DATE]. Starting audit…"**

Note the git date — you'll need it in the report.

---

## Step 3 — Fetch the doc-structure-template

Read it from the local repo (try Cowork path first, fall back to macOS path):

```bash
REPO=/sessions/serene-exciting-ramanujan/mnt/developer-hub
[ -d "$REPO" ] || REPO=/Users/richardblack/repos/developer-hub
cat "$REPO/.cursor/rules/doc-structure-template.mdc"
```

If that fails, use Claude in Chrome to open:
`https://github.com/harness/developer-hub/blob/main/.cursor/rules/doc-structure-template.mdc`

Use the template as the benchmark for Editorial scoring.

---

## Step 4 — Read the page

Use Claude in Chrome to navigate to the resolved URL and read the full page content. Note:
- All visible headings and their hierarchy
- Frontmatter visible in any "Edit this page" link (derive the file path)
- Whether a `<Troubleshoot>` component is present
- Whether there is an intro paragraph before the first heading
- Last-updated date shown on the page (if any)
- All links (internal vs external)

---

## Step 5 — Score the page

Each dimension starts at 100. Subtract deductions. Minimum 0.

### Accuracy (weight 40%)
| Issue | Deduction |
|-------|-----------|
| Feature described contradicts current UI or behaviour | –20 |
| Steps would produce errors if followed | –15 |
| Outdated screenshots or UI paths | –15 |
| Broken or incorrect code samples | –15 |
| Incorrect API details | –10 |
| Stale version/compatibility info | –10 |
| Incorrect prerequisites | –10 |
| Broken internal links | –5 |

### Completion (weight 30%)
| Issue | Deduction |
|-------|-----------|
| Undocumented feature capabilities | –15 |
| Missing prerequisites section | –10 |
| Missing troubleshooting for known issues | –10 |
| Missing configuration options | –10 |
| No code examples where expected | –10 |
| Missing cross-module references (especially Platform) | –10 |
| No RBAC/permissions guidance | –10 |
| Missing limitations or edge cases | –10 |
| Incomplete API parameters | –10 |
| No "Next steps" section | –5 |

### Editorial (weight 30%)
| Issue | Deduction |
|-------|-----------|
| Does not follow doc-structure-template skeleton | –15 |
| Missing/incorrect frontmatter (title, sidebar_label, description, keywords, tags) | –10 |
| Inconsistent heading style (must be sentence case) | –10 |
| Non-site-relative internal links (full URLs instead of `/docs/...`) | –10 |
| Missing `redirect_from` on clearly-moved page | –10 |
| Style guide violations | –10 |
| Walls of text — missing callouts, notes, or step structure | –10 |
| Inconsistent bolding of UI element names | –5 |
| No intro paragraph before first list or step | –5 |
| Spelling or grammar issues | –5 |
| Missing callouts where appropriate | –5 |
| Slug producing `/docs/docs/` double-prefix | –5 |

**Weighted score:**
```
Quality = (Accuracy × 0.4) + (Completion × 0.3) + (Editorial × 0.3)
```
Pass threshold: ≥ 80. Below 80 = FAIL.

---

## Step 6 — Section assessment

Don't just note what's visible from the single page — actively assess the whole section.

**6a — Map the section using git**

From the repo, list every `.md` file in the same folder as the audited page (its immediate parent
directory) along with its last git commit date:

```bash
cd $REPO
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --section docs/<MODULE-FOLDER>/path/to/page.md
```

Note the total page count, the date range (newest to oldest), and how many pages are stale
(last updated > 6 months ago).

**6b — Read every sibling page**

Use Claude in Chrome to visit each sibling page in the section. For each one, quickly assess:
- Is it a navigation-only page (pure list of links with no unique content)?
- Does its content duplicate or contradict another page in the section?
- Is the page's scope too narrow to justify its own page (could merge with a sibling)?
- Does it reference the audited page correctly, or is it out of sync?

**6c — Identify section-level issues**

After reading all siblings, flag:
- **Redundant pages** — two or more pages covering the same concept; recommend merge
- **Navigation stubs** — pages that only list links the sidebar already provides; recommend removal with `redirect_from`
- **Contradictions** — conflicting information across pages (note both pages and which is likely correct)
- **Duplicated content** — identical or near-identical blocks copy-pasted across pages
- **Coverage gaps** — topics users would expect to find in this section that aren't covered anywhere
- **Stale cluster** — if multiple pages share the same old commit date, they were likely bulk-committed and may all need review

Produce a section verdict: **Healthy**, **Needs attention**, or **Restructure recommended** — with a one-paragraph justification and a prioritised list of section-level actions (beyond the single-page fixes).

---

## Step 7 — Write the report

Determine the repo path (same logic as Step 2) and save to:
```
$REPO/.claude/skills/doc-section-audit/audits/[page-slug]-audit.md
```
Create the `audits/` directory if it doesn't exist.

Use this exact structure:

```markdown
# Audit: [Page Title]

**URL:** [full URL]
**Last git commit:** [ISO date, or "unknown" if URL was supplied directly]
**Audit date:** [today]
**Overall score:** [weighted score]/100 — PASS / FAIL

## Scores

| Dimension | Raw | Weight | Weighted |
|-----------|-----|--------|----------|
| Accuracy  | /100 | 40% | |
| Completion | /100 | 30% | |
| Editorial | /100 | 30% | |
| **Total** | | | **/100** |

## Issues found

### Accuracy
[Each deduction: what is wrong and exactly where on the page]

### Completion
[Each gap with specifics]

### Editorial
[Each structural or formatting issue, referencing doc-structure-template where relevant]

## Section assessment

**Pages in section:** [N total — list each with its last-git-commit date]

**Verdict:** Healthy / Needs attention / Restructure recommended

[One-paragraph justification of the verdict]

**Section-level issues (prioritised):**
- [Issue 1: type — e.g. Redundant pages, Navigation stub, Contradiction, Duplicated content, Coverage gap, Stale cluster — with specific page names and recommended action]
- [Issue 2...]

**Recommended section actions:**
- [ ] [Specific action, e.g. "Remove X page, add redirect_from to Y"]
- [ ] ...

## Structural rewrite plan
[Concrete plan: frontmatter changes, sections to add/remove/reorder, callouts to introduce, links to fix]

## Redirect changes required
[Any redirect_from entries or URL changes needed]

## JIRA ticket description

**Summary:** [one-sentence summary]

**Description:**
[Critical fixes labelled HIGH / MEDIUM / LOW]

**Acceptance criteria:**
- [ ] [specific, testable criterion]
- [ ] ...

**Labels:** docs-quality, [module-abbreviation], [stale if applicable]
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

Page to rewrite: [repo-relative file path, e.g. docs/infra-as-code-management/workspaces/cli-integration.md]
Live URL: [full URL]
Audit report: .claude/skills/doc-section-audit/audits/[slug]-audit.md

---
ACCURACY FIXES
[paste the full Accuracy issues section from the audit]

COMPLETION GAPS TO ADDRESS
[paste the full Completion issues section from the audit]

EDITORIAL FIXES
[paste the full Editorial issues section from the audit]

STRUCTURAL REWRITE PLAN
[paste the full Structural rewrite plan section from the audit]

REDIRECTS REQUIRED
[paste the Redirect changes required section from the audit]

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

---

## Step 8 — Report back

After saving the file, respond with:

1. Score and PASS/FAIL at a glance
2. Top 3 most impactful issues
3. File link using the resolved repo path: `computer://$REPO/.claude/skills/doc-section-audit/audits/[slug]-audit.md`
4. JIRA ticket description pasted inline, ready to copy

Do **not** write anything back to a Google Sheet.
