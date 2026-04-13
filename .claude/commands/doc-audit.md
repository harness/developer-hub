# Doc Audit — Single page

Audit a single Harness Developer Hub documentation page for accuracy, completion, and editorial
quality. Produces a scored report and a ready-to-use rewrite prompt.

For a full audit that also crawls and assesses every sibling page in the section, use `/doc-section-audit` instead.

## Usage

```
/doc-audit [file-path | url | module-abbreviation] [--verify pre | --verify post]
```

**Examples:**
- `/doc-audit docs/infra-as-code-management/workspaces/cli-integration.md` — audit a local file, no walkthrough
- `/doc-audit docs/infra-as-code-management/workspaces/cli-integration.md --verify` — rewrite then walk through (defaults to post)
- `/doc-audit docs/infra-as-code-management/workspaces/cli-integration.md --verify pre` — walk through as-is, self-correct if < 80
- `/doc-audit docs/infra-as-code-management/workspaces/cli-integration.md --verify post` — rewrite first, then walk through
- `/doc-audit iacm` — score the oldest IACM page, no live walkthrough
- `/doc-audit https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration --verify post`

## Arguments

`$ARGUMENTS`

Parse two things from the arguments:

**Target** (required — one of):
- A repo-relative file path (`docs/.../*.md`) → audit that file directly (primary approach; works for new and unpublished docs)
- A `https://developer.harness.io/docs/...` URL → derive the local file path, then audit locally; use the URL for optional browser rendering
- A module abbreviation (e.g. `iacm`, `ccm`) → find and audit the oldest page in that module
- Nothing → ask the user before proceeding

**Verify flag** (optional):
- `--verify pre` → after scoring, run the live qa.harness.io walkthrough on the current file; self-correct if score < 80
- `--verify post` → rewrite the file to match the doc-structure-template first, then walk through and self-correct if score < 80
- `--verify` (no mode) → default to `post`
- Omitted → no live walkthrough; report and rewrite prompt only

`--verify` is only valid when the target is a file path or URL. If the target is a module abbreviation, reject the combination and ask the user to specify a file path or URL instead.

If `--verify` is present, **warn the user before starting:**
> "The `--verify` flag runs a live walkthrough on qa.harness.io. It may pause and ask you to log in — stay at your desk during this step."

Then read `.claude/scripts/verify-step.md` before executing the verification phase and follow its instructions exactly.

---

## Module map

The authoritative module list lives in `.claude/scripts/modules.json`. Read it when resolving a
module abbreviation:

```bash
python .claude/scripts/find-oldest-docs.py --list-modules
```

**Excluded — never audit:**
`ff` (feature-flags), `srm` (service-reliability-management), `cet` (continuous-error-tracking), release-notes.

---

## Step 1 — Resolve the target page

**A — Local file path** (`docs/.../*.md`) — primary approach:
Read the file directly from the repo. Derive the live URL from the module map if the doc is
published (strip `docs/<REPO-FOLDER>/` and `.md`, prepend the Base URL). If the doc is new and
has no live URL yet, note "New/unpublished — no live URL" in the report and skip browser steps.

Get the last git commit date:
```bash
python .claude/scripts/find-oldest-docs.py --git-date <file-path>
```

Tell the user: **"Auditing [FILE-PATH] — last updated [GIT-DATE]. Starting audit…"**

**B — Direct URL** (`https://developer.harness.io/docs/...`):
Derive the local file path by reversing the module map:
- Match the URL prefix to a Base URL entry → get the Repo folder
- Strip the Base URL prefix from the URL path, append `.md`, prepend `docs/<REPO-FOLDER>/`
- Example: `https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration`
  → `docs/infra-as-code-management/workspaces/cli-integration.md`

Read the local file. Also use the URL for browser rendering where helpful.

Tell the user: **"Auditing [FILE-PATH] (from URL). Starting audit…"**

**C — Module abbreviation:**
```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --top 1
```
Take the single result file path. Derive the live URL (strip `docs/<REPO-FOLDER>/` and `.md`,
prepend the Base URL). Treat as Case A going forward.

Tell the user: **"Oldest page in [MODULE]: [FILE-PATH] — last updated [DATE]. Starting audit…"**

---

## Step 2 — Fetch the doc-structure-template

```bash
cat .cursor/rules/doc-structure-template.mdc
```

Use this as the structural benchmark for the Editorial score.

---

## Step 3 — Read and score the page

Read the local file directly:
```bash
cat <file-path>
```

If a live URL exists, optionally use Claude in Chrome to view the rendered page for context —
but base all scoring and edits on the local file, not the rendered version.

Score across three dimensions (each starts at 100):

**Accuracy (40%):** –20 contradicts UI/behaviour, –15 steps would error, –15 outdated screenshots, –15 broken code, –10 wrong API, –10 stale versions, –10 wrong prerequisites, –5 broken links

**Completion (30%):** –15 undocumented capabilities, –10 missing prerequisites, –10 missing troubleshooting, –10 missing config options, –10 no code examples, –10 missing cross-module refs (esp. Platform), –10 no RBAC guidance, –10 missing limitations, –10 incomplete API params, –5 no Next Steps

**Editorial (30%):** –15 wrong structure (vs template), –10 missing/incorrect frontmatter, –10 wrong heading case (must be sentence case), –10 non-site-relative links, –10 missing redirect_from, –10 style violations, –10 walls of text, –5 inconsistent UI bolding, –5 no intro before lists, –5 spelling/grammar, –5 missing callouts, –5 slug /docs/docs/ bug

**Weighted score:** `(Accuracy × 0.4) + (Completion × 0.3) + (Editorial × 0.3)`
**Pass: ≥ 80. Fail: < 80.**

---

## Step 4 — Information architecture review

This step is **advisory only** — findings go into a separate IA section in the report and do
not affect the Accuracy/Completion/Editorial score. Some suggestions may intentionally flex the
standard template depending on doc type (tutorial vs. feature reference vs. conceptual). Flag
opportunities; do not auto-apply them.

### 4a — Page length

Count the approximate word count or line count of the file.

- If the page exceeds ~800 lines or feels like it requires multiple reads to understand end-to-end,
  flag it as a candidate for splitting or restructuring.
- Consider whether a long instructional page could be broken into a parent overview + child pages
  surfaced via the **DynamicMarkdownSelector (DMS)** — see 4c below.
- Reference: the ECS deployment tutorial is a known example of a page that is too long for a
  single read; use it as a benchmark for "this needs restructuring".

### 4b — Platform doc duplication

Scan the page for content that restates or paraphrases Harness Platform documentation —
particularly around RBAC, delegates, variables, expressions, secrets, pipelines, connectors,
or service accounts.

- If a section largely duplicates a platform doc, flag it: suggest replacing the section with
  1–2 sentences of context + a "Go to [platform doc] to [do Y]" link.
- If an entire page duplicates a platform topic (e.g. re-explaining RBAC from scratch), flag
  it as a candidate for removal with a redirect.

### 4c — Consolidation: DMS vs tabs vs synced tabs

Assess whether the page, or its siblings (if visible from the section map), could benefit from
consolidation using one of the following Docusaurus components:

**DynamicMarkdownSelector (DMS)**
- Use when multiple full-content child pages exist and a parent "hub" page would improve
  discoverability and reduce navigation steps.
- Not limited to 4–5 options — uses grid tiles, suited to full context pieces.
- Reference pattern: `docs/artifact-registry/get-started/quickstart.md` pulls all child
  get-started pages into one parent via DMS.
- Only recommend DMS when the child pages are genuinely self-contained full guides, not when
  they are short parallel sections.

**Synced tabs**
- Use when the same concept or procedure applies across multiple environments, platforms,
  or providers and the user would likely only need one at a time.
- Example: configuring a connector for AWS / GCP / Azure — the same steps but platform-specific
  values. Syncing tabs means selecting "AWS" on one page auto-selects it elsewhere.
- Reference: https://docusaurus.io/docs/markdown-features/tabs#syncing-tab-choices

**Unsynced tabs**
- Use when several related but independent concepts can be shown side-by-side on the same page
  to reduce vertical scroll and improve scannability.
- Best for shorter sections (2–5 options). If options are longer or more than ~5, prefer DMS.
- Tabs increase engagement by encouraging interaction — a useful secondary benefit but not a
  primary goal.

If none of the above apply, note "No consolidation opportunity identified."

---

## Step 6 — Write the audit report

Save to `.claude/skills/doc-audit/audits/[slug]-audit-YYYYMMDD.md` (e.g. `auth-403-errors-audit-20260410.md`). Use today's date. The folder already exists.

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

## Information architecture

> These are advisory recommendations only. They do not affect the quality score.
> Apply them only if they genuinely improve the user experience for this doc type.

**Page length:** [short / medium / long — flag if >800 lines or clearly too long for one read]

**Platform doc duplication:**
- [Section or concept that duplicates a platform doc — suggest replace with link, or "None identified"]

**Consolidation opportunities:**
| Opportunity | Component | Rationale |
|---|---|---|
| [description] | DMS / Synced tabs / Unsynced tabs / None | [why] |

**DMS candidate:** [Yes — child pages: X, Y, Z / No]
**Tab candidate:** [Yes — options: X, Y, Z / No]

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
Audit report: .claude/skills/doc-audit/audits/[slug]-audit-YYYYMMDD.md

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

## Step 7 — Report back

1. Score + PASS/FAIL
2. Top 3 most impactful issues
3. If the file was rewritten, remind the user to review the diff before committing:
   ```
   git diff docs/path/to/file.md
   ```
4. Link: `computer://[full path to audit file]`
5. JIRA ticket description pasted inline, ready to copy

Do **not** write to any Google Sheet.
