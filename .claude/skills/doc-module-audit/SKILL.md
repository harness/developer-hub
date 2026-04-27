---
name: doc-module-audit
description: >
  Score every page in a Harness Developer Hub module for compliance with the
  Claude and cursor rules, doc-structure template, and HDH writing style.
  Produces a module-level compliance report ranked by severity.
  Triggers: "module audit [module]", "compliance check [module]", "score all docs in [module]",
  "doc-module-audit [module]", "doc-module-check [module]", or any request to audit
  quality or style compliance across all pages in a module.
argument-hint: "<module-abbreviation> [--full] [--folder <subfolder>]"
user-invocable: true
---

# Doc Module Audit — Full-module compliance scoring

Score every page in a Harness Developer Hub module against the HDH style guide, doc-structure
template, and editorial rules. Produces a ranked compliance report across the whole module.

For a staleness triage that recommends which pages to audit next, use `/doc-audit-check` instead.
For a deep quality audit of one page, use `/doc-audit`.
For a page + its section, use `/doc-section-audit`.

## Usage

```
/doc-module-audit <module-abbreviation> [--full] [--folder <subfolder>]
```

**Examples:**
- `/doc-module-audit iacm` — structural compliance scan of all IaCM docs (quick mode)
- `/doc-module-audit iacm --full` — structural scan + batched editorial quality scoring
- `/doc-module-audit iacm --folder workspaces` — scope to `docs/infra-as-code-management/workspaces/`
- `/doc-module-audit ccm --full` — full compliance + quality pass on all CCM docs

## Arguments

`$ARGUMENTS`

Parse three things from the arguments:

**Module** (required): a module abbreviation (e.g. `iacm`, `fme`, `ccm`). If omitted, ask the
user before proceeding.

**`--full`** (optional flag): after the structural scan, picks the 3 worst-scoring pages and
runs a deeper single-page audit on each — producing a specific rewrite brief per page.
Without it, only the structural scan runs. Default: off.

**`--folder <subfolder>`** (optional): scope the audit to a specific subfolder within the module
(e.g. `--folder workspaces` scopes to `docs/infra-as-code-management/workspaces/`). Useful for
large modules or when you want to focus on one area.

---

## Prerequisites

This skill runs directly in the `developer-hub` repository.

---

## Module map

The authoritative module list lives in `.claude/scripts/modules.json`. Read it when resolving a
module abbreviation:

```bash
python .claude/scripts/find-oldest-docs.py --list-modules
```

Match the user's input against the `code` field and the `aliases` array (if present).
If no match is found, ask the user to confirm the module abbreviation.

**Excluded — refuse and ask for another:**
`ff`, `srm`, `cet`, release-notes.

---

## Scalability guidance

Before starting, count the files in scope:

```bash
find docs/<MODULE-FOLDER> -name "*.md" \
  ! -path "*/shared/*" \
  ! -name "*.release-notes.md" \
  ! -name "release-notes.md" | wc -l
```

Apply this guidance based on the count:

| File count | Quick mode | Full mode |
|---|---|---|
| Any | Proceed normally | Proceed normally |

Phase 1 always runs on the full file set and costs no tokens. Phase 2 (`--full`) only runs
a deep audit on the 3 worst pages identified by Phase 1 — token cost is bounded regardless
of module size.

---

## Step 1 — Discover all files

Enumerate every in-scope `.md` file:

```bash
find ./internal/developer-hub/docs/<MODULE-FOLDER>[/<SUBFOLDER-IF-ANY>] -name "*.md" \
  ! -path "*/shared/*" \
  ! -name "*.release-notes.md" \
  ! -name "release-notes.md" \
  [! -path "*/<EXCLUDED-FOLDER>/*" ...]    # one clause per entry in exclude_folders
  | sort
```

Before running the find command, read the `exclude_folders` array for this module from
`.claude/scripts/modules.json`. If the array is non-empty, add a `! -path "*/<folder>/*"` clause
for each entry and tell the user which folders are being excluded.

Tell the user: **"Found N pages in [MODULE][/subfolder]. Running compliance scan…"**

### Classify each file and construct its canonical URL

For every file discovered, determine its type and full URL before scanning. Store these
alongside the file path — they are used in the report.

**Step A — Detect DMS content files**

A file is a **DMS content file** if its path contains `/content/` as a path segment
(e.g. `docs/artifact-registry/get-started/content/supported-formats/docker-quickstart.md`).

DMS content files are children embedded in a DynamicMarkdownSelector on their parent page.
They do not have their own standalone URL — they are accessed via the parent page and a
fragment derived from the **option key** in the DMS component, not the filename.

For each DMS content file:

1. **Find the parent file**: the `.md` file in the directory that contains the `/content/`
   subfolder (e.g. `docs/artifact-registry/get-started/quickstart.md`).

2. **Find the matching option key**: read the parent file and locate the
   `DynamicMarkdownSelector` component. Find the option whose `path` value ends with this
   content file's relative path. The key for that option is the fragment source.
   Example — for `docker-quickstart.md`, the matching option is:
   ```
   Docker: {
     path: "/artifact-registry/content/supported-formats/docker-quickstart.md",
     ...
   }
   ```
   The key is `Docker`.

3. **Derive the fragment**: lowercase the key and replace spaces with hyphens.
   - `Docker` → `#docker`
   - `Raw File` → `#raw-file`
   - `Hugging Face` → `#hugging-face`

4. **Canonical URL** = parent page URL + `#` + fragment
   e.g. `https://developer.harness.io/docs/artifact-registry/get-started/quickstart#docker`

If the parent file cannot be found or the content file is not referenced in any DMS
component, fall back to noting the file as an **unlinked DMS child** in the report.

**Step B — Construct URLs for regular files**

For all other files, derive the live URL from the module map:

1. Read `base_url` for this module from `.claude/scripts/modules.json`
   (e.g. `iacm` → `/docs/infrastructure-as-code-management`)
2. Strip the `docs/<MODULE-FOLDER>/` prefix from the file path to get the page path
   (e.g. `docs/infra-as-code-management/pipelines/operations/drift-detection.md`
   → `pipelines/operations/drift-detection.md`)
3. Strip the `.md` suffix
4. Apply the **duplicate segment rule**: if the final path segment matches the preceding
   folder name (e.g. `get-started/get-started`), drop the trailing segment
   (result: `get-started`)
5. Join: `https://developer.harness.io` + base_url + `/` + page path
   e.g. `https://developer.harness.io/docs/infrastructure-as-code-management/pipelines/operations/drift-detection`

**Step C — Fetch last-updated date**

For each file, get the date of its most recent git commit:

```bash
git log --format="%ad" --date=short -1 -- <file-path>
```

Assign a staleness indicator based on how long ago that date was (relative to today):

| Age | Indicator |
|---|---|
| < 6 months | 🟢 |
| 6–18 months | 🟡 |
| > 18 months | 🔴 |

Store each file’s `{path, url, is_dms_content, last_updated, staleness}` where `is_dms_content` is true when the path contains `/content/` as a segment, and `staleness` is one of 🟢 🟡 🔴.

---

## Phase 1 — Structural compliance scan (always runs)

For **every file** in the list, check the following rules. These are detectable from the file
content directly — no LLM reasoning needed. Read the files directly using their paths.

For efficiency, read files in batches (10–15 at a time) and record results as you go.

### Rule set

Score each file against these rules. Record PASS ✅, WARN ⚠️, or FAIL ❌ for each.

**FM-1 — `title` present in frontmatter**
FAIL if the YAML frontmatter block (between `---` delimiters) does not contain a `title:` field.
**Exempt:** DMS content files (path contains `/content/`) — frontmatter lives on the parent page.

**FM-2 — `description` present in frontmatter**
FAIL if the frontmatter block does not contain a `description:` field with a non-empty value.
**Exempt:** DMS content files (path contains `/content/`).

**FM-3 — No H1 in body**
FAIL if any line in the file body (after the closing `---`) matches `^# ` (a single-hash heading).
The page title is set via frontmatter; a `# Heading` in the body is always wrong.
**Exempt:** DMS content files (path contains `/content/`) — H1 is expected and valid as the section title within a tab.

**H-1 — Sentence case in headings**
WARN for any `##` or `###` heading where a non-first, non-proper-noun word is capitalized.
Proper nouns to allow: Harness, IaCM, CI, CD, STO, CCM, SEI, FF, SRM, CET, FME,
Kubernetes, Terraform, OpenTofu, AWS, GCP, Azure, GitHub, Docker, Helm, Argo, Vault,
and any word that appears as a brand or product name. Flag clearly: state the heading and the
word(s) that are wrongly capitalized.

**H-2 — No gerund headings**
FAIL for any `##` or `###` heading that ends with a word matching `\w+ing` as the final token
(e.g. "## Configuring the connector", "### Installing delegates").
Exceptions: `## Troubleshooting`, `## Prerequisites` — these are standard section names.

**H-3 — Body content at `##` level**
WARN if the file uses `##` headings for body sections rather than only the standard landmarks
(`## Prerequisites`, `## Troubleshooting`, `## Next steps`, `## What will you learn?`,
`## Step N`). Specifically flag when more than 4 `##` headings are present and none of the
body `##` entries are step headings, suggesting body content is at the wrong heading level.

**S-1 — No em dashes in body**
FAIL for any line containing an em dash character (`—`). Em dashes are banned in HDH docs.

**S-2 — Link phrasing**
FAIL for any inline link preceded by `see `, `refer to `, or followed by ` to learn more`,
` for more information`, ` for details`. Patterns: `see \[`, `refer to \[`, `learn more`,
`for more information`.

**S-3 — Meaningful link text**
FAIL for any link whose text is exactly `here`, `click here`, `this page`, `this doc`,
or `this article`. Patterns: `\[here\]`, `\[click here\]`, `\[this page\]`.

**S-4 — Site-relative links**
FAIL for any Markdown link pointing to `https://developer.harness.io/docs/` — these should
be site-relative paths (e.g. `/docs/platform/...`).

**S-5 — No "please"**
WARN for any occurrence of the word `please` in the file body (case-insensitive). HDH docs
are authoritative — "please" is disallowed.

**S-6 — Intro before first list**
WARN if a `##` or `###` heading is immediately followed on the next non-blank line by a
list item (`^- ` or `^\d+\. `) with no prose in between.

**S-7 — No contractions**
WARN for common contractions in the file body. Check for: `don't`, `won't`, `can't`, `isn't`,
`aren't`, `doesn't`, `didn't`, `haven't`, `hasn't`, `hadn't`, `shouldn't`, `wouldn't`,
`couldn't`, `you'll`, `you're`, `we'll`, `we're`, `it's`, `that's`, `there's`, `here's`,
`let's`, `I'm`, `I'll`, `I've` (case-insensitive). Technical documentation should use full forms
(e.g., `do not` instead of `don't`).

**C-1 — Has at least one landmark section**
WARN if the file body contains none of: `## Prerequisites`, `## Next steps`,
`## Troubleshooting`, `## What will you learn?`. Pages with no landmark sections are likely
stubs or uncategorized fragments.
**Exempt:** DMS content files (path contains `/content/`) — landmark sections belong on the
parent page only, not in DMS children. Skip this check for those files.

**C-2 — Code blocks have language tags**
WARN for any fenced code block opening (` ``` ` on a line by itself with no language identifier
immediately following). Language tags are required (e.g. ```` ```bash ````, ```` ```yaml ````).


**T-1 — Troubleshoot component used**
WARN if the file contains `## Troubleshooting` but does not contain `<Troubleshoot` (the
AdaptiveAIContent component). Static `### heading` + `**Solution:**` pairs are the old pattern
and should be replaced with the `<Troubleshoot>` component.
**Exempt:** DMS content files (path contains `/content/`).

**T-2 — No `## Introduction` heading**
FAIL if the file body contains a line matching `^## Introduction`. The introduction must be
plain prose paragraphs — a `## Introduction` heading is explicitly wrong per the doc template.
**Exempt:** DMS content files (path contains `/content/`).

**ST-1 — Section order**
WARN if both `## Prerequisites` and `## Next steps` are present but `## Next steps` appears
before `## Prerequisites` in the file (check line numbers). Prerequisites must come first.
**Exempt:** DMS content files (path contains `/content/`).

---

## Phase 1 output — Compliance scoring

After scanning all files, compute a **compliance score** per file:

Start at 100. Apply deductions:
- Each FAIL rule: –10 points
- Each WARN rule: –3 points
- Minimum score: 0

Thresholds: **Pass ≥ 85** · **Partial 70–84** · **Fail < 70**

---

## Phase 2 — Deep audit of top candidates (only when `--full` is passed)

After Phase 1, identify the **3 lowest-scoring pages** (by Phase 1 compliance score). For each
of these three pages, run the same deep analysis that `/doc-audit` uses:

1. Read the full page content.
2. Score it against all three `/doc-audit` dimensions: Accuracy (content review only — no live
   walkthrough), Completion, and Editorial.
3. Identify the specific issues holding each page back and what a rewrite would need to address.
4. Produce a **rewrite brief** for each page: a short, actionable summary of what needs to change,
   ready to hand off to a writer or pass to `/doc-section-audit` for a full rewrite pass.

The goal is not to score every page editorially — it is to give concrete, prioritised next actions
for the pages most likely to move the module's overall compliance score.

For each of the 3 pages, recommend the right follow-up command:
- `/doc-section-audit [file]` — if sibling pages in the same folder also scored poorly,
  suggesting the whole section needs attention
- `/doc-audit [file]` — if the page is an isolated problem or its siblings are passing

---

## Step 2 — Write the compliance report

Save to `.claude/skills/doc-module-audit/audits/[MODULE]-module-audit-YYYYMMDD.md`
(e.g. `.claude/skills/doc-module-audit/audits/iacm-module-audit-20260427.md`). Use today's date. Create the audits directory if needed.

```markdown
# Module audit: [MODULE NAME]

**Module:** [module code] — [folder path]
**Scope:** [full module | docs/<folder>/<subfolder>]
**Excluded folders:** [none | list from modules.json exclude_folders]
**Audit date:** [today]
**Mode:** Quick (structural only) | Full (structural + editorial)
**Files scanned:** N

## Summary

| Status | Count | % of module |
|---|---|---|
| ✅ Pass (≥ 85) | N | % |
| ⚠️ Partial (70–84) | N | % |
| ❌ Fail (< 70) | N | % |

**Overall module compliance:** [weighted average score]/100

## Rule breakdown

**Rule prefix key:** FM = Frontmatter · H = Heading · S = Style · C = Content · T = Troubleshoot · ST = Structure

| Rule | Description | Failures | Warnings |
|---|---|---|---|
| FM-1 | Missing title | N | — |
| FM-2 | Missing description | N | — |
| FM-3 | H1 in body | N | — |
| H-1 | Heading case violations | — | N |
| H-2 | Gerund headings | N | — |
| H-3 | Body content at ## level | — | N |
| S-1 | Em dashes | N | — |
| S-2 | Link phrasing (see/refer to) | N | — |
| S-3 | Bare link text (here/click here) | N | — |
| S-4 | Hardcoded domain links | N | — |
| S-5 | "please" in body | — | N |
| S-6 | No intro before list | — | N |
| S-7 | Contractions (don't, won't, can't, etc.) | — | N |
| C-1 | No landmark sections (Prerequisites, Next steps, Troubleshooting, What will you learn?) | — | N |
| C-2 | Code blocks without language tag | — | N |
| T-1 | Troubleshoot component not used | — | N |
| T-2 | ## Introduction heading in body | N | — |
| ST-1 | Section order (Next steps before Prerequisites) | — | N |

**Top 3 most common issues across this module:**
1. [Rule + description + count of affected files]
2. [Rule + description + count]
3. [Rule + description + count]

## Files ranked by compliance score

Sorted worst-first by Phase 1 compliance score. Partial and failing files only; passing files listed in the appendix.

### ❌ Failing (score < 70)

| File | Score | Last updated | Top violations |
|---|---|---|---|
| [Page title](https://developer.harness.io/docs/.../page-slug) | NN | 🔴 2021-03-10 | H-2 (gerund headings), S-1 (em dashes), S-2 (link phrasing) |
| [Page title](https://developer.harness.io/docs/.../#anchor) `[DMS]` | NN | 🟡 2023-08-22 | S-1, C-2 |

### ⚠️ Partial (score 70–84)

| File | Score | Last updated | Top violations |
|---|---|---|---|
| [Page title](https://developer.harness.io/docs/.../page-slug) | NN | 🟡 2023-06-15 | H-1 (heading case), S-1 (em dashes) |

## Violation details

For each failing or partial file, list the specific violations found:

### [Page title]
**URL:** [full canonical URL]
**Score:** NN/100 — FAIL / PARTIAL
- **[RULE-ID]** Line N: `[exact text]`
- **[RULE-ID]** Line N: `[exact text]`

[repeat for each failing/partial file]

## Top candidates for rewrite *(full mode only)*

The 3 pages most likely to move the module's overall compliance score if fixed:

### 1. [Page title](url) — score NN/100

**Why it's a priority:** [top violations from Phase 1]
**Rewrite brief:** [specific issues to fix — structure, content gaps, style violations]
**Suggested next step:** `/doc-section-audit [file-path]` or `/doc-audit [file-path]`

### 2. [Page title](url) — score NN/100

**Why it's a priority:** [top violations]
**Rewrite brief:** [what needs to change]
**Suggested next step:** `/doc-section-audit [file-path]` or `/doc-audit [file-path]`

### 3. [Page title](url) — score NN/100

**Why it's a priority:** [top violations]
**Rewrite brief:** [what needs to change]
**Suggested next step:** `/doc-section-audit [file-path]` or `/doc-audit [file-path]`

## Recommended actions

Based on the rule breakdown, the highest-impact fixes for this module are:

1. **[Most common rule violation]:** N files affected. Fix: [one-line fix description].
   Run `/doc-section-audit [worst-offending-file]` to address the worst cluster.

2. **[Second most common]:** N files affected. Fix: [description].

3. **[Third most common]:** N files affected. Fix: [description].

## Next steps

- Deep rewrite of the worst section: `/doc-section-audit [file-path-of-worst-file]`
- Single-page rewrite: `/doc-audit [file-path]`
- Re-run after fixes: `/doc-module-audit [module] [--full]`

## Appendix — Passing files

| File | Score | Last updated |
|---|---|---|
| [Page title](https://developer.harness.io/docs/.../page-slug) | NN | 🟢 2024-11-01 |
```

---

## Step 3 — Report back

1. Module compliance summary: total files, pass/partial/fail counts, overall %
2. Top 3 most common rule violations across the module
3. The single worst-scoring file and its top issues
4. Link to the audit report file
5. Suggested next command (e.g. `/doc-section-audit` on the worst-scoring section)

Keep the response brief — the detail is in the report file.
