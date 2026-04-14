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

Check the user's message for an optional `--verify` flag before starting:
- `--verify pre` → after the standard audit, run the live qa.harness.io walkthrough on the file as-is, then self-correct if score < 80. Read `.claude/scripts/verify-step.md` for the full instructions.
- `--verify post` → rewrite the file to match the doc-structure-template first, then run the walkthrough and self-correct if score < 80. Read `.claude/scripts/verify-step.md` for the full instructions.
- `--verify` (no mode specified) → treat as `--verify post`.
- `--verify` is only valid when the target is a file path or URL. If the user provides a module abbreviation with `--verify`, stop and ask them to provide a specific file path or URL instead.
- Omitted → standard audit only, no live walkthrough.

---

## Step 1 — Resolve the target page

Check the user's message for one of:

**A — Local file path** (`docs/.../*.md`) — primary approach:
Read the file directly from the repo. Derive the live URL from the module map if the doc is
published (strip `docs/<REPO-FOLDER>/` and `.md`, prepend the Base URL). If the doc is new
and has no live URL yet, note "New/unpublished — no live URL" in the report and skip browser steps.

Get the last git commit date for the file:
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

Read the local file. Also use the URL for optional browser rendering.

Tell the user: **"Auditing [FILE-PATH] (from URL). Starting audit…"**

**C — Module abbreviation:**
Resolve using the map below, then find the oldest page in that module.

**D — Nothing provided:** Ask: "Please give me a local file path (`docs/.../*.md`), a docs URL, or a module abbreviation (e.g. `iacm`, `ccm`, `cd`)."

**Module map:** The authoritative list is in `.claude/scripts/modules.json`. To view it:
```bash
python .claude/scripts/find-oldest-docs.py --list-modules
```

**Excluded — never audit these, tell the user if they try:**
- `ff` / feature-flags
- `srm` / service-reliability-management
- `cet` / continuous-error-tracking
- release-notes

---

## Step 2 — Find the oldest page (module abbreviation only)

The script auto-detects the repo root, so no `cd` or path setup is needed:

```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --top 1
```

Use the **Repo folder** column from the module map in Step 1 for `<MODULE-FOLDER>`.

Take the **oldest** result file path. Derive the live URL using the **Base URL** from the module
map (the URL path may differ from the repo folder name — for example, `iacm` files live in
`docs/infra-as-code-management/` but the live URL uses `/docs/infrastructure-as-code-management/`):
- Strip leading `docs/<REPO-FOLDER>/` from the file path, keep the remainder and strip `.md`
- Prepend the module's **Base URL**
- Example for iacm: `docs/infra-as-code-management/workspaces/cli-integration.md`
  → `https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration`

Then treat this as Case A (local file path). Tell the user:
**"The oldest page in [MODULE] is [FILE-PATH] — last updated [DATE]. Starting audit…"**

Note the git date — you'll need it in the report.

---

## Step 3 — Read the doc-structure-template (always do this first)

The template is the authoritative source for what a correct Harness doc looks like. Read it
fresh every audit run — do not rely on any embedded or remembered version of the rules.

```bash
REPO=/sessions/serene-exciting-ramanujan/mnt/developer-hub
[ -d "$REPO" ] || REPO=/Users/richardblack/repos/developer-hub
cat "$REPO/.cursor/rules/doc-structure-template.mdc"
```

If that fails, use Claude in Chrome to open:
`https://github.com/harness/developer-hub/blob/main/.cursor/rules/doc-structure-template.mdc`

Also read CLAUDE.md for project-wide conventions (frontmatter fields, component usage, heading rules):
```bash
cat "$REPO/CLAUDE.md"
```

Hold both documents in context for all subsequent scoring and rewriting steps. The template
defines the skeleton every page must follow; CLAUDE.md covers the conventions that apply
within that skeleton. The Editorial scoring rubric in Step 5 is a deduction shorthand — the
template is the ground truth it refers to.

---

## Step 4 — Read the page

Read the local file directly:
```bash
cat <file-path>
```

Note from the file content:
- All headings and their hierarchy
- Frontmatter (title, sidebar_label, description, keywords, tags, slug, redirect_from)
- Whether a `<Troubleshoot>` component is present
- Whether there is an intro paragraph before the first heading
- All links (internal vs external)

If a live URL exists, optionally use Claude in Chrome to view the rendered page for context —
but base all scoring and edits on the local file, not the rendered version.

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

## Step 7 — Information architecture review

Advisory only — findings go into the IA section of the report and do not affect the quality
score. Flag opportunities; do not auto-apply them.

**7a — Section size:**
A well-structured section has 3–5 pages maximum — an overview and 2–4 focused action pages.
Flag the section if it has more than 5 pages as an IA issue independent of individual page
quality. Assess whether pages can be consolidated (7c) or split into two sub-sections.

**7b — Page length:**
Flag the target page if it exceeds ~800 lines or is clearly too long for a single read.
The ECS deployment tutorial (`ecs-deployment-tutorial`) is the benchmark for "too long."
Consider whether the page should become a parent overview + DMS child pages.

**7c — Platform doc duplication:**
Scan the target page and each sibling for content that restates Harness Platform docs —
RBAC, delegates, variables, expressions, secrets, connectors, service accounts.
Suggest replacing duplicated sections with a brief context sentence + "Go to [platform doc]
to [do Y]" link. Flag whole-page duplicates as removal candidates with redirects.

**7d — Consolidation opportunities (section-level):**

*DynamicMarkdownSelector (DMS)*: recommend when multiple full-content child pages exist under
a shared parent concept. Uses grid tiles, not limited to 4–5 options. Only recommend when
child pages are genuinely self-contained full guides, not short parallel sections.
Reference pattern: `docs/artifact-registry/get-started/quickstart.md`.

*Synced tabs*: recommend when the same concept applies across environments, platforms, or
providers (e.g. AWS/GCP/Azure variants) and the user only needs one at a time.
Reference: https://docusaurus.io/docs/markdown-features/tabs#syncing-tab-choices

*Unsynced tabs*: recommend for 2–5 shorter parallel sections that sit side-by-side on one
page. Reduces vertical scroll. If content is long or more than ~5 options, prefer DMS.

For each sibling or group of siblings, note the best-fit component or "No opportunity."

---

## Step 9 — Write the report

Determine the repo path (same logic as Step 2) and save to:
```
$REPO/.claude/skills/doc-section-audit/audits/[page-slug]-audit-YYYYMMDD.md
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

## Information architecture

> Advisory only — does not affect the quality score.

**Page length:** [short / medium / long — flag if >800 lines]

**Platform doc duplication:**
- [Section + suggested replacement link, or "None identified"]

**Consolidation opportunities:**
| Pages / sections | Component | Rationale |
|---|---|---|
| [description] | DMS / Synced tabs / Unsynced tabs / None | [why] |

**DMS candidate:** [Yes — child pages: X, Y, Z / No]
**Tab candidate:** [Yes — options: X, Y, Z / No]
**Section consolidation:** [description or "None"]

## JIRA ticket description

**Summary:** [one-sentence summary]

**Description:**
[Critical fixes labelled HIGH / MEDIUM / LOW]

**Acceptance criteria:**
- [ ] [specific, testable criterion]
- [ ] ...

**Labels:** docs-quality, [module-abbreviation], [stale if applicable]
**Effort:** Low / Medium / High

## Apply the rewrite

Run this command in Claude Code to apply findings across the section in supervised phases:

```
/doc-section-rewrite .claude/skills/doc-section-audit/audits/[slug]-audit-YYYYMMDD.md
```

Claude Code reads all files first, then works through Phase 1 (structure), Phase 2 (content),
and Phase 3 (cleanup), pausing for a `git diff` review between each phase. File deletions are
always listed as manual steps, never executed automatically.

**Prefer Cursor?** Each phase block produced by `/doc-section-rewrite` is self-contained and
can be pasted into a Cursor chat independently.

---

## Step 10 — Report back

After saving the file, respond with:

1. Score and PASS/FAIL at a glance
2. Top 3 most impactful issues
3. File link using the resolved repo path: `computer://$REPO/.claude/skills/doc-section-audit/audits/[slug]-audit.md`
4. JIRA ticket description pasted inline, ready to copy

Do **not** write anything back to a Google Sheet.
