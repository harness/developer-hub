# Doc Section Audit — Page + full section

Audit a Harness Developer Hub documentation page and its entire section. Scores the page,
crawls every sibling page in the same section, produces a section-level verdict, and outputs
a JIRA ticket description and rewrite prompt.

For a faster single-page-only audit, use `/doc-audit` instead.

## Usage

```
/doc-section-audit [file-path | url | module-abbreviation] [--verify pre | --verify post]
```

**Examples:**
- `/doc-section-audit docs/infra-as-code-management/workspaces/cli-integration.md` — audit a local file + full section, no walkthrough
- `/doc-section-audit docs/infra-as-code-management/workspaces/cli-integration.md --verify` — rewrite then walk through (defaults to post)
- `/doc-section-audit docs/infra-as-code-management/workspaces/cli-integration.md --verify pre` — walk through as-is, self-correct if < 80
- `/doc-section-audit iacm` — audit oldest IACM page + full section, no walkthrough
- `/doc-section-audit https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration --verify post`

## Arguments

`$ARGUMENTS`

Parse two things from the arguments:

**Target** (required — one of):
- A repo-relative file path (`docs/.../*.md`) → audit that file and its section directly (primary approach; works for new and unpublished docs)
- A `https://developer.harness.io/docs/...` URL → derive the local file path, then audit the file and its section; use the URL for optional browser rendering
- A module abbreviation → find and audit the oldest page in that module, plus its full section
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
published (strip `docs/<REPO-FOLDER>/` and `.md`, prepend the Base URL). If the doc is new
and has no live URL yet, note "New/unpublished — no live URL" in the report and skip browser steps.

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

## Step 4 — Section assessment

Actively assess the whole section — don't just note what's visible from the single page.

**Map the section via git** — list every `.md` file in the same folder with its last commit date:
```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --section docs/<MODULE-FOLDER>/path/to/page.md
```
Note the total page count, date range, and how many pages are stale (last updated > 6 months ago).

**Read every sibling page** using Claude in Chrome. For each one assess:
- Is it navigation-only (pure link list with no unique content)?
- Does it duplicate or contradict another page in the section?
- Is its scope too narrow to justify its own page?
- Does it reference the audited page correctly, or is it out of sync?

**Produce a section verdict:** Healthy / Needs attention / Restructure recommended, with a
prioritised list of section-level issues:
- **Redundant pages** — two or more covering the same concept; recommend merge
- **Navigation stubs** — pages that only list links the sidebar already provides; recommend removal with `redirect_from`
- **Contradictions** — conflicting information across pages (note both and which is likely correct)
- **Duplicated content** — identical or near-identical blocks copy-pasted across pages
- **Coverage gaps** — topics users would expect that aren't covered anywhere
- **Stale cluster** — multiple pages sharing the same old commit date, likely bulk-committed

---

## Step 5 — Section structure assessment

**This step proposes a restructuring plan that `doc-section-rewrite` will execute.** Assess whether the section needs consolidation based on page count and natural content groupings.

### 5a — Count pages and assess need for restructure

**Target structure guideline:**
- **If 1 page:** No collapsible folder needed
- **If 2-4 pages:** Consider if 1 overview + remaining pages works (may already be optimal)
- **If 5-7 pages:** Aim for 1 overview + 3-4 action pages (~25-40% reduction)
- **If 8-12 pages:** Aim for 1 overview + ~6 action pages (~50% reduction)
- **If 12+ pages:** Aim for 1 overview + 6-8 action pages (50-60% reduction)

**Be intuitive, not rigid:** The goal is maintainability and clear user workflow, not hitting exact numbers. Natural content groupings trump arbitrary targets.

### 5b — Assess current state

- ❌ / ✅ **Overview page present?** Does an overview/hub page exist that orients users?
- ❌ / ✅ **Logical progression?** Do pages follow a natural workflow (setup → configuration → advanced → troubleshooting)?
- ❌ / ✅ **Clear grouping?** Are related pages grouped, or is content scattered?

### 5c — Propose consolidation groups

Identify natural pairings or groupings for merge based on:
- **Topic similarity** — Pages covering related aspects of the same feature
- **Workflow sequence** — Steps that naturally follow each other (e.g., "add artifact" + "configure artifact")
- **Shared purpose** — Pages solving the same user goal (e.g., multiple troubleshooting pages → one troubleshooting guide)

For each proposed merge:
1. **List source pages** — which existing pages will be consolidated
2. **Suggest new page title** — what the consolidated page will be called
3. **Component recommendation** — DMS / Synced tabs / Unsynced tabs / Subsections
4. **Rationale** — why these pages belong together

**Example consolidation plan:**
```
**Action page 1: Configure Kubernetes manifests** (CONSOLIDATE)
- Merge: `define-kubernetes-manifests.md` + `add-a-custom-remote-script-and-manifests.md`
- Use synced tabs for different manifest sources (Git, Helm, Kustomize, remote scripts)
- Rationale: Both pages cover how to add manifests to a service; different sources are variants of the same task
- Total: 2 pages → 1
```

### 5d — Propose workflow order

List the final structure with logical ordering:
1. Overview (new if needed) — "What features are available?"
2. Action page 1 — "How do I do X?" (setup/fundamental task)
3. Action page 2 — "How do I configure Y?" (configuration)
4. Action page 3+ — Additional features, advanced topics
5. Last page — Troubleshooting (if separate from other pages)

### 5e — List files to delete and rename

**Files to delete after consolidation:**
- List each file that will be merged into another page
- Note: Content will be moved, not lost

**Files to rename/keep:**
- List files that will become the new consolidated pages (absorbing content from deleted files)

**redirect_from required:**
- Remind that each deleted page's URL must be added to `redirect_from` in the target page's frontmatter

### 5f — Calculate reduction

**Result:** [X pages] → [Y pages] ([Z%] reduction)

Example: 12 pages → 7 pages (42% reduction)

---

## Step 6 — Information architecture review

This step is **advisory only** — findings go into a separate IA section in the report and do
not affect the score. Some suggestions may intentionally flex the standard template depending
on doc type. Flag opportunities; do not auto-apply them.

### 6a — Page length (target page)

- If the target page exceeds ~800 lines or is clearly too long for a single read, flag it.
- Reference benchmark: the ECS deployment tutorial (`ecs-deployment-tutorial`) is a known
  example of a page too long to understand in one read. Use it as a yardstick.
- Consider whether the page could be restructured as a parent overview + DMS child pages.

### 6b — Platform doc duplication (target page + siblings)

Scan the target page and each sibling for content that restates Harness Platform docs —
particularly RBAC, delegates, variables, expressions, secrets, connectors, and service accounts.

- Suggest replacing duplicated sections with 1–2 sentences + a "Go to [platform doc] to [do Y]" link.
- If a sibling page entirely duplicates a platform topic, flag it as a candidate for removal with a redirect.

### 6c — Consolidation opportunities (section-level)

With the full section map available, assess whether pages could be consolidated. Run the
**heading similarity analysis** first, then apply the **decision guide** to choose a component.

#### Heading similarity analysis

Read every sibling page and extract all `##` and `###` headings. Then:

1. **Normalize each heading** — lowercase, remove leading articles (a, an, the), strip punctuation.
2. **Group near-matches across pages** — headings are "similar" if they share the same first
   3 words, or one is a substring of the other, or they describe the same action with minor
   rewording. Examples of matches:
   - "Create a connector" ≈ "Add a connector" ≈ "Set up your connector"
   - "Configure the pipeline" ≈ "Configure your pipeline"
   - "Prerequisites" = "Prerequisites" (exact)
3. **Count recurrence** — how many sibling pages contain each heading group?
4. **Score the pattern** — if 3 or more heading groups each appear in 3+ sibling pages, those
   pages share a structural pattern. This is the primary signal for synced tabs. Report the
   top recurring headings in the Consolidation table so the rewrite author can verify before acting.

**Get started guide pattern** — a common variant: a set of sibling pages (often provider-
or format-specific) that each follow the same onboarding sequence with identical or near-
identical headings ("Create a connector", "Create your workspace", "Add a provision pipeline",
"Add an approval step") but with different commands, screenshots, or configuration values.
The headings may not be exact matches — look for semantic equivalence. These are strong
synced tabs candidates regardless of exact heading wording.

#### Page profile check

For each page or candidate group, note:
- **Line count** — approximate (use `wc -l`)
- **Topic scope** — distinct independent topic, or a provider/platform/format/environment
  variant of the same concept?
- **Differentiator** — does the content differ primarily in *commands/values* (synced tabs
  candidate) or in *concepts and depth* (DMS candidate)?

#### Decision guide

| Signal | Best fit |
|---|---|
| 2–5 pages, short (≤150 lines each), same concept with provider/format/environment variants, 3+ shared heading groups | **Synced tabs** |
| 3+ pages, medium–long (100+ lines each), distinct self-contained topics, few shared headings | **DMS** |
| 2–5 pages, short–medium (≤100 lines each), related but independent concepts, not provider variants | **Unsynced tabs** |
| Single long page (800+ lines) that can be broken into self-contained subtopics | **DMS parent + children** |
| Most sibling pages manage or configure specific sub-features of one parent concept | **DMS with "Manage [X]" parent** — "Manage [X]" is a valid grouping label even when [X] matches the folder name, because the grouping describes management/configuration intent, not navigation duplication |

**DynamicMarkdownSelector (DMS)**
- Best when multiple full-content child pages exist under a shared parent concept and a hub
  page improves discoverability and reduces navigation steps.
- Not limited to 4–5 options — uses grid tiles, suited to full self-contained guides.
- Reference pattern: `docs/artifact-registry/get-started/quickstart.md` surfaces all child
  get-started pages via DMS tiles on a single parent page.
- Only recommend DMS when child pages are genuinely self-contained full guides, not short sections.
- For DMS child file rules (image paths, RedirectIfStandalone props, no Troubleshooting/Next
  steps in children), see Phase 1 and Phase 2 in `/doc-section-rewrite`.

**Synced tabs**
- Best when the same concept or procedure applies across multiple environments, platforms,
  providers, or formats and the user only needs one variant at a time.
- Content differs primarily in commands, values, or screenshots — not in concepts.
- Selecting a tab on one page auto-selects it on other pages using the same `groupId`.
- Reference: https://docusaurus.io/docs/markdown-features/tabs#syncing-tab-choices

**Unsynced tabs**
- Best for 2–5 shorter parallel sections on one page to reduce vertical scroll.
- If content is long or there are more than ~5 options, prefer DMS over tabs.

For each sibling or group, note the best fit or "No consolidation opportunity."

---

## Step 7 — Write the audit report

Save to `.claude/skills/doc-section-audit/audits/[slug]-audit-YYYYMMDD.md` (e.g. `cli-integration-audit-20260410.md`). Use today's date. The folder already exists.

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

## Section structure assessment

**Current state:** [N pages] in `[folder-name]`

**Target structure:** [guideline based on page count — e.g., "1 overview page + ~6 action pages (aim for ~50% reduction)"]

**Assessment:**
- ❌ / ✅ **Overview page present?** [Yes / No — description]
- ❌ / ✅ **Logical progression?** [Assessment of workflow order]
- ❌ / ✅ **Clear grouping?** [Assessment of content organization]

**Proposed restructure:**

1. **NEW/KEEP: Overview page** — "[title]"
   - [Description of purpose]
   - [If using DMS, note it here]

2. **Action page 1: [title]** (CONSOLIDATE / KEEP)
   - [If consolidating] Merge: `file1.md` + `file2.md` + ...
   - [Component recommendation: synced tabs / unsynced tabs / subsections]
   - [Rationale for grouping]
   - Total: [X pages → 1]

3. **Action page 2:** [repeat pattern]

[Continue for all action pages]

**Result:** [X pages] → [Y pages] ([Z%] reduction)

**Workflow order:**
1. [Page 1] — "[User question it answers]"
2. [Page 2] — "[User question it answers]"
[Continue for all pages]

**Files to delete after consolidation:**
- `file1.md` (merged into Action page X)
- `file2.md` (merged into Action page Y)
[List all files that will be deleted]

**Files to rename/keep:**
- `existing-file.md` → becomes Action page 1 (absorbs content from deleted files)
[List files that become consolidated pages]

**redirect_from required:** Each deleted page's URL must be added to `redirect_from` in the target page's frontmatter.

---

## Section assessment

**Pages in section:** [N total — list each with last-git-commit date]
**Verdict:** Healthy / Needs attention / Restructure recommended

[One-paragraph justification]

**Section-level issues (prioritised):**
- [Issue type — Redundant pages / Navigation stub / Contradiction / Duplicated content / Coverage gap / Stale cluster — with page names and recommended action]

**Recommended section actions:**
- [ ] [Specific action, e.g. "Remove X page, add redirect_from to Y"]

## Structural rewrite plan

## Redirect changes required

## Information architecture

> Advisory only — does not affect the quality score.

**Page length:** [short / medium / long — flag if >800 lines]

**Platform doc duplication:**
- [Duplicated section + suggested platform doc link, or "None identified"]

**Consolidation opportunities:**
| Pages / sections | Component | Rationale |
|---|---|---|
| [description] | DMS / Synced tabs / Unsynced tabs / None | [why] |

**DMS candidate:** [Yes — child pages: X, Y, Z / No]
**Tab candidate:** [Yes — options: X, Y, Z / No]
**Section consolidation:** [e.g. "Pages A, B, C could be merged into one page with unsynced tabs" / "None"]

## JIRA ticket description
**Summary:**
**Description:** [HIGH/MEDIUM/LOW issues]
**Acceptance criteria:** [ ] ...
**Labels:** docs-quality, [module], [stale if applicable]
**Effort:** Low / Medium / High

## Apply the rewrite

Run this command in Claude Code to apply findings across the section in supervised phases:

```
/doc-section-rewrite .claude/skills/doc-section-audit/audits/[slug]-audit-YYYYMMDD.md
```

Claude Code will execute the changes directly — reading all files first, then working through
Phase 1 (structure), Phase 2 (content), and Phase 3 (cleanup), pausing for a `git diff`
review between each phase. File deletions are always listed as manual steps, never executed
automatically.

**Prefer Cursor instead?** Paste the phase blocks from `/doc-section-rewrite` output directly
into a Cursor chat. Each phase is self-contained and can be run independently.

---

## Step 8 — Report back

1. Score + PASS/FAIL
2. Top 3 most impactful page-level issues
3. Section verdict + single most important section action
4. If the file was rewritten, remind the user to review the diff before committing:
   ```
   git diff docs/path/to/file.md
   ```
5. Link: `computer://[full path to audit file]`
6. JIRA ticket description pasted inline, ready to copy

Do **not** write to any Google Sheet.
