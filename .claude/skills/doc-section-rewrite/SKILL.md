---
name: doc-section-rewrite
description: >
  Apply a doc-section-audit report across an entire section in supervised phases. Reads the
  audit findings and executes structural changes (Phase 1), content rewrites (Phase 2), and
  redirect/cleanup work (Phase 3), pausing for a git diff review between each phase.
  Triggers: "section rewrite [audit-report]", "apply the section audit", "execute the rewrite plan",
  "doc section rewrite", or any request to apply a doc-section-audit report to files in the repo.
argument-hint: "<audit-report-path>"
user-invocable: true
---

Reads a `doc-section-audit` report and applies the recommended changes directly in Claude Code,
in supervised phases. You review a `git diff` between each phase before continuing.

This is the default execution path for section rewrites. The same phases can also be pasted
individually into Cursor if preferred — each phase is a self-contained block.

## Usage

```
/doc-section-rewrite <audit-report-path>
```

**Example:**
```
/doc-section-rewrite .claude/skills/doc-section-audit/audits/auth-403-errors-audit-20260413.md
```

## Arguments

Parse arguments from the user's message.

Expects a path to a `doc-section-audit` report. If no path is provided, list the most recent
reports in `.claude/skills/doc-section-audit/audits/` and ask the user to choose one.

---

## Step 1 — Read and parse the audit report

Read the full audit report at the provided path. Extract:

- **Target file** — the primary file that was audited
- **Section structure assessment** — from the `## Section structure assessment` section:
  - Current page count
  - Target structure (overview + action pages)
  - Proposed consolidation groups (which files merge into which)
  - Workflow order (final page sequence)
  - Files to delete list
  - Files to rename/keep list
  - Percentage reduction goal
- **Section verdict** — Healthy / Needs attention / Restructure recommended
- **Section files** — all `.md` files identified in the section map (from the Section assessment)
- **Per-file issues** — Accuracy, Completion, and Editorial findings for each file
- **IA recommendations** — DMS, tabs, consolidation, platform doc duplication, page length flags
- **Structural rewrite plan** — from the `## Structural rewrite plan` section
- **Redirect changes required** — from the `## Redirect changes required` section

Also read the rules Claude must follow:
```bash
cat .cursor/rules/doc-structure-template.mdc
cat .cursor/rules/doc-linking.mdc
cat .cursor/rules/doc-slugs-and-redirects.mdc
cat .cursor/rules/writing-style.mdc
cat CLAUDE.md
```

---

## Step 2 — Determine rewrite scope and phases needed

Based on the **Section Structure Assessment** and section verdict, determine which phases are needed.

**Scope by verdict:**

| Verdict | Scope |
|---|---|
| Healthy | Target file only — suggest `/doc-audit <file>` instead and stop |
| Needs attention | Target file + any siblings flagged as stale or failing in the section map |
| Restructure recommended | Follow the Section Structure Assessment consolidation plan — create overview if needed, merge pages per the proposed groups, delete listed files |

**Phases needed:**

| Phase | Trigger |
|---|---|
| Phase 1 — Structure | If Section Structure Assessment proposes consolidation (new overview page, merged pages, files to delete) OR if IA recommends DMS/tabs |
| Phase 2 — Content | Always — rewrite files per audit findings and merge content from deleted files into consolidated pages |
| Phase 3 — Cleanup | Always — add `redirect_from` entries, fix cross-references, list files for manual deletion |

**Key difference for Phase 1:**
- If **Section Structure Assessment** exists, use its consolidation plan as the primary guide
- The IA recommendations (Step 6) supplement this with implementation details (e.g., use synced tabs for variants, use DMS for parent page)

Tell the user:
> "Section structure: [X pages] → [Y pages] ([Z%] reduction)
> Section verdict: [VERDICT]. Scope: [N] files to consolidate.
> Phases: [1+2+3 / 2+3 / 2 only].
> Starting Phase [N] — I'll pause for your review after each phase."

If Phase 1 is not needed, skip directly to Phase 2.

---

## Phase 1 — Structural changes

**Only run this phase if the Section Structure Assessment proposes consolidation OR if the IA review requires new files or file moves.**

First, review the consolidation plan from the audit's Section Structure Assessment:
- Which files are being merged into which consolidated pages?
- What new overview page needs to be created (if any)?
- Which component should be used for each consolidation (DMS, synced tabs, unsynced tabs, subsections)?

Read all files in scope first — do not edit anything until you have read them all:
```bash
cat <file-1>
cat <file-2>
...
```

Then make structural changes in this order:

1. **Create new files** — DMS parent page, merged pages, or restructured skeleton files.
   Use the doc-structure-template frontmatter and section order. Leave content placeholders
   where Phase 2 will fill in the actual content.

   **DMS child files:** Place child content files in a `content/` subfolder relative to the
   parent page (e.g. `docs/module/section/content/child-file.md`). The docusaurus config
   excludes `**/content/**` from the sidebar automatically — no extra config needed.

   **CRITICAL child file structure rules:**
   - **No frontmatter.** Child files must not contain any `---` frontmatter blocks. Strip them completely.
   - **No imports.** Child files must not import any components. The parent page handles all component imports.
   - **No structural sections.** Child files must NOT contain `## Prerequisites`, `## Troubleshooting`, or `## Next steps` sections. These belong only on the parent page. The DMS injects each selected child file's TOC headings into the parent page's "On this page" panel — including any "Next steps" heading — which causes it to appear repeatedly for every child. Strip those sections from child files and consolidate them on the parent.
   - **No embedded components.** Remove any `<Troubleshoot>`, `<FAQ>`, `<HelmMultiManifests>`, or other JSX components from child files. Replace with plain text explanations and links where needed.
   - **Content only.** Child files contain pure instructional "how to" content — just the core steps and explanations specific to that topic.

   **When NOT to use DMS:** If prerequisites differ significantly between child pages (e.g., different RBAC permissions, different setup steps), or if troubleshooting is vastly different per topic, this indicates the pages should remain separate action pages rather than being consolidated with DMS. More action pages is allowed when the content genuinely requires different context.

   **Image paths in child files:** Content files sit one level deeper than their parent page,
   so image paths must account for the extra folder level. Use `../static/image.png` (not
   `./static/image.png`) for images stored in the parent page's `static/` folder. Failing to
   adjust these paths causes a webpack `Module not found` build error. Check every
   `require('./static/` and `![](./static/` in the original file and update to `../static/`
   when moving content into a child file.

   **DMS component syntax:**
   ```jsx
   <DynamicMarkdownSelector
     toc={toc}
     nextHeadingID="next-steps"
     options={{
       "Display Label": {
         path: "/module/section/content/child-file.md",
         description: "Brief description"
       },
       "Another Label": {
         path: "/module/section/content/another-file.md",
         description: "Brief description"
       }
     }}
   />
   ```
   - Use `options={{...}}` (object literal), NOT `options={[...]}` (array)
   - Use `path` property, NOT `docPath`
   - Keys are display labels shown in grid tiles
   - Paths are full from docs root: `/module/section/content/file.md` (no `/docs/` prefix, yes `.md` extension)

   **`RedirectIfStandalone` in child files:** If you add a `<RedirectIfStandalone>` component
   to a child content file (to redirect users who navigate directly to the child URL back to
   the parent DMS page), you MUST pass both `label` and `targetPage` props. A bare
   `<RedirectIfStandalone />` with no props will compile but crash at runtime with
   `TypeError: Cannot read properties of undefined (reading 'toLowerCase')`. The `label`
   must match the option key in the parent page's DMS `options` prop exactly. For example:
   ```jsx
   import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

   <RedirectIfStandalone label="AWS" targetPage="/docs/module/parent-page" />
   ```

2. **Rename or move files** — use `git mv` for any files being renamed or relocated:
   ```bash
   git mv docs/old/path/file.md docs/new/path/file.md
   ```

3. Do **not** delete any files in this phase. Do **not** update content yet.

**Checkpoint — pause after Phase 1:**

Run:
```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --section <target-file>
```

Then tell the user:
> "Phase 1 complete. New structure:
> [list new/moved files]
>
> Run `git diff --stat` to review structural changes. Reply **proceed** to continue to
> Phase 2 (content rewrites), or describe any corrections needed."

Wait for explicit confirmation before continuing.

---

## Phase 2 — Content rewrites

Rewrite each file in scope, applying all findings from the audit report. Process files in
this order:
1. The primary target file first
2. Siblings in order of staleness (oldest first — use the section map dates from the report)
3. Any new files created in Phase 1 (fill in content placeholders)

**Edit failure protocol:**

If an edit fails, do **not** retry the same pattern. Instead:
1. Re-read the file with `Read` to get the exact current content
2. Identify the precise mismatch (extra whitespace, different punctuation, stale content from a prior edit)
3. Use the exact text from the fresh read as the `old_string`

Do **not** use `cat -A` to debug — that flag is GNU/Linux only and does not exist on macOS.
Use `cat -v` to show non-printing characters, or `hexdump -C <file> | head` to inspect raw bytes.

**For each file:**

1. Read the current file content
2. Check the file against the standard template (`doc-structure-template.mdc`) and apply all fixes:

   **Template structure check — verify this order is present:**
   - Frontmatter (`title`, `sidebar_label`, `description`, `keywords`, `tags`)
   - Introduction paragraphs (no `##` heading — plain prose)
   - `## What will you learn?` — add this for any tutorial, how-to, or overview page if
     absent. Use a short bold-label bullet list of key outcomes. Omit only for pure reference
     pages (permissions tables, settings references, API references).
   - `## Prerequisites` — concise bullets, bold label + link each, no paragraph-length bullets
   - Body content using `###` (not `##`) for procedural sections — this keeps the right-hand
     TOC hierarchical. Reserve `##` only for the structural anchors above.
   - `## Troubleshooting` (if issues exist — use `<Troubleshoot>` components, never static headings)
   - `## Next steps` — 1–2 sentence wrap-up + 2–4 links using "Go to X to Y" phrasing

   **Frontmatter fixes:**
   - Ensure `sidebar_label` is present and uses Title Case. The `title` field uses sentence
     case; `sidebar_label` overrides the left-nav entry. Add it if missing.
   - **Sidebar label deduplication — two rules, always check both:**
     1. **No folder name in child labels.** Child pages must not repeat the parent folder
        name in their `sidebar_label`. The folder provides the context — the label should
        only name the specific topic. For example, inside an "Access Control" folder:
        - ❌ `Dashboard Access Control` → ✅ `Dashboards`
        - ❌ `Asset Governance RBAC` → ✅ `Asset Governance`
        - ❌ `Perspective Folder Access Control` → ✅ `Perspective Folders`
     2. **No duplicate folder/page pair.** If the folder's `_category_.json` label and a
        child page's `sidebar_label` are identical (e.g., folder = "Access Control", page =
        "Access Control"), rename the page label to something more specific such as
        "Overview" or the page's actual subject. A user should never see the same word twice
        in the same sidebar level.

   **Editorial fixes:**
   - Accuracy issues identified for this file
   - Headings: sentence case, imperative, no gerunds, no `#` (h1) in body
   - Link phrasing: "Go to [link] to [do Y]" — never "see", "refer to", "to learn more"
   - Bold label + colon for list items
   - No em dashes
   - IA improvements (replace duplicated platform content with links, restructure long sections)

3. Save the updated file
4. Move to the next file

Follow all rules from the cursor rules read in Step 1. In particular:
- "Go to [link] to [do Y]" for all links — never "see" or "refer to"
- Sentence case headings, imperative form — no gerunds
- Bold label + colon for list items
- Prerequisites: concise bullets with a link each, no paragraph-length bullets
- No em dashes

**DMS child file rules — strictly enforced:**

- **No frontmatter.** Strip all `---` frontmatter blocks from child files. Only parent pages have frontmatter.

- **No imports.** Child files must not import any components (`Troubleshoot`, `FAQ`, `DocImage`, etc.). The parent page handles all imports. If a child file had component usage, remove the component and replace with plain text + links.

- **No `## Prerequisites` in child files.** Prerequisites belong on the parent page only. Consolidate all prerequisite requirements from child files into a single Prerequisites section on the parent.

- **No `## Troubleshooting` in child files.** Troubleshoot components belong on the parent
  page only. Collect all `<Troubleshoot>` entries from every child file and move them to a
  single `## Troubleshooting` section on the parent page (above `## Next steps`). Import
  `{ Troubleshoot }` from `@site/src/components/AdaptiveAIContent` on the parent if not
  already imported.

- **No `## Next steps` in child files.** The DMS injects child-file TOC headings into the
  parent page's right-side "On this page" panel. A "Next steps" section in every child
  creates a repeated "Next steps" entry in that panel. Move all unique next-step links to the
  parent page's `## Next steps` section and consolidate: deduplicate links, group by topic,
  and rewrite the section so it is concise rather than a flat dump of all child next-steps.

- **Image paths adjustment.** Change all `require('./static/image.png')` to `require('../static/image.png')` in child files (one level deeper than parent).

- **Content only.** Child files contain pure instructional content — the "how to" steps and explanations. No structural scaffolding, no components, no frontmatter.

- **Single-page folder sidebar fix.** If a DMS restructure results in a folder with only one
  visible page in the sidebar, update that folder's `_category_.json` so the category label
  links directly to the page instead of generating a dead-end index:
  ```json
  "link": {
    "type": "doc",
    "id": "module/folder/page-id"
  }
  ```
  This makes the sidebar label itself clickable, reducing the two-click expand→select to a
  single click.

Do **not** update any `redirect_from` entries yet — that is Phase 3.

**Checkpoint — pause after Phase 2:**

Tell the user:
> "Phase 2 complete. [N] files updated:
> [list each file with a one-line summary of changes]
>
> Run `git diff` to review all content changes. Reply **proceed** to continue to
> Phase 3 (redirects and cleanup), or describe any corrections needed."

Wait for explicit confirmation before continuing.

---

## Phase 3 — Cleanup

**Redirects:**

Add `redirect_from` entries to the frontmatter of any destination files for URLs being
superseded. Follow `.cursor/rules/doc-slugs-and-redirects.mdc` exactly.

**Cross-reference fixes:**

Scan all updated files for internal links that reference old paths (from any file moves in
Phase 1) and update them to the new paths.

**Files to delete:**

Do **not** delete files in Claude Code. Instead, list each file flagged for removal with the
exact command the user should run manually:

```
Files to delete (run these manually after reviewing):

  git rm docs/path/to/redundant-page.md
  git rm docs/path/to/another-page.md

Each has redirect_from already added to its destination page.
```

**Final summary:**

Tell the user:
> "Phase 3 complete. Section rewrite finished.
>
> - Files updated: [N]
> - Redirects added: [N]
> - Files to delete manually: [list with git rm commands]
>
> Run `git diff` for a final review. If everything looks good, commit with:
> `git add -A && git commit -m 'docs: revamp [section name] section'`"
