---
name: doc-rewrite
description: >
  Rewrite a single Harness Developer Hub documentation page based on an existing audit report.
  Reads the audit findings and applies all suggested improvements to the page.
  Triggers: "rewrite [file-path]", "apply the audit", "fix the doc", "doc rewrite [file]",
  or any request to apply audit findings to a page. Requires a prior doc-audit report to exist.
  For section-wide rewrites, use doc-section-rewrite instead.
argument-hint: "<audit-report-path | file-path>"
user-invocable: true
---

Rewrite a single Harness Developer Hub documentation page based on an audit report. This command reads an existing audit report and applies all suggested improvements to the page.

**Use this when:** You have already run `doc-audit` and want to apply the rewrite.

**For full section rewrites:** Use `doc-section-rewrite` instead (not yet implemented).

## Usage

```
/doc-rewrite [audit-report-path | file-path]
```

**Examples:**
- `/doc-rewrite .claude/skills/doc-audit/audits/opa-workspace-audit-20260414.md` — rewrite based on audit report
- `/doc-rewrite docs/infra-as-code-management/policies-governance/opa-workspace.md` — find latest audit for this file and rewrite

## Arguments

Parse arguments from the user's message.

Parse the target:

**Audit report path** (`.claude/skills/doc-audit/audits/*.md`):
- Extract the file path from the audit report (it's listed in the report)
- Read all issues and fixes from the audit report
- Apply the rewrite

**File path** (`docs/.../*.md`):
- Look for the most recent audit report for this file in `.claude/skills/doc-audit/audits/`
- If multiple audits exist, use the most recent (by date in filename)
- If no audit exists, tell the user to run `doc-audit` first

**Nothing:**
- Ask the user to provide either an audit report path or a file path

---

## Step 1 — Locate and read the audit report

If given an audit report path directly, read it.

If given a file path, find the corresponding audit:
```bash
# Extract slug from file path (e.g., docs/iacm/policies/opa-workspace.md → opa-workspace)
# Find all audits matching that slug
ls -t .claude/skills/doc-audit/audits/${slug}-audit-*.md | head -1
```

Read the audit report to extract:
1. **Page type** (Instructional | Overview)
2. **File path** to rewrite
3. **Template to use** (.cursor/rules/faq-template.mdc, doc-structure-template.mdc, or doc-structure-overview-template.mdc)
4. **All issues** (Accuracy, Completion, Editorial)
5. **Structural rewrite plan**
6. **Redirect changes required**

Tell the user:
**"Found audit report: [audit-report-path]"**
**"Target page: [file-path]"**
**"Page type: [Instructional | Overview]"**
**"Starting rewrite..."**

---

## Step 2 — Read prerequisite files

Before making changes, read these files in order:

1. **The appropriate template** based on page type:
   - FAQ: `.cursor/rules/faq-template.mdc`
   - Instructional: `.cursor/rules/doc-structure-template.mdc`
   - Overview: `.cursor/rules/doc-structure-overview-template.mdc`

2. **Documentation rules:**
   - `.cursor/rules/doc-linking.mdc`
   - `.cursor/rules/doc-slugs-and-redirects.mdc`
   - `CLAUDE.md`

3. **The current page file** (to understand existing content)

---

## Step 3 — Apply the rewrite

Rewrite the page to address all issues identified in the audit. Follow the structural rewrite plan from the audit report.

**For FAQ pages:**
- Structure: Frontmatter → 1–2 sentence intro (plain prose, no heading) → `---` + `##` category headings → `<details>`/`<summary>` Q&A entries
- Questions: Every `<summary>` must end with `?`. No `###` or deeper headings anywhere.
- Answers: Every `<details>` body must contain at least one full sentence of content.
- Components: Use static `<details>`/`<summary>` for all entries. Only use `<FAQ>` component if the page has fewer than 10 questions total. Never use `<Troubleshoot>`.
- Banned sections: No `## Prerequisites`, `## Next steps`, `## Troubleshooting`, `## What will you learn?`, or `## Introduction`.
- Frontmatter: `sidebar_label: FAQ`, `title: FAQ — [Feature Name]`, `faq` tag required.

**For Instructional pages:**
- Structure: Frontmatter → Introduction (2-3 paragraphs) → Prerequisites → Step-by-step instructions → Troubleshooting (with Troubleshoot component) → Next steps
- Headings: Imperative, sentence case ("Create X", "Configure Y")
- Prerequisites: Account access, RBAC permissions with links to Platform docs
- Code examples: Step-by-step, meant to be followed

**For Overview pages:**
- Structure: Frontmatter → Introduction (2-3 paragraphs) → What you will learn → Optional lightweight prerequisites → Concept sections → Optional FAQs → Related concepts
- Headings: Descriptive noun phrases, sentence case ("Policy entity types", "How X works")
- Prerequisites: Optional, knowledge-context only (NO account/RBAC requirements)
- Code examples: Illustrative reference, meant to be adapted

**Key improvements to apply:**

1. **Frontmatter fixes:**
   - Add missing `keywords` and `tags`
   - Add `sidebar_label` if needed (Title Case)
   - Add `redirect_from` if URLs are being superseded
   - Ensure `slug` doesn't include `/docs/` prefix

2. **Introduction enhancement:**
   - Expand to 2-3 full paragraphs (what, why, key benefits)
   - Keep existing :::info or :::warning callouts if they add value

3. **Section additions (Instructional and Overview pages only — do NOT apply to FAQ pages):**
   - Add "What you will learn" (Overview pages only)
   - Add Prerequisites (Instructional) or lightweight knowledge prerequisites (Overview, optional)
   - Add Troubleshooting with `<Troubleshoot>` component (Instructional)
   - Add FAQs with `<FAQ>` component (Overview, optional)
   - Add Next steps or Related concepts

4. **Editorial fixes:**
   - Fix all non-site-relative links (change full URLs to `/docs/...` format)
   - Fix heading capitalization (sentence case + proper nouns only)
   - Ensure all UI elements are bolded
   - Add intro sentences before all lists
   - Import Troubleshoot/FAQ components if used

5. **User confusion gap fixes:**
   - Add "how to access/use" context for reference material (e.g., "Access these via `input.workspace.*`")
   - Explain behavior and outcomes (e.g., "When a policy fails, the pipeline stops")
   - Add prerequisite knowledge links (OPA docs, Terraform JSON format, Platform RBAC)
   - Fix broken or vague links in "Related concepts"
   - Define or link jargon and abbreviations on first use

6. **Screenshot formatting:**
   - Import DocImage component: `import DocImage from '@site/src/components/DocImage';`
   - Use DocImage component with `path={require('./static/image.png')}` syntax
   - Add descriptive alt text and title attributes
   - **Always center captions** using `<p align="center"><em>Caption text</em></p>` - captions appear centered at the bottom of screenshots
   - Only center narrow screenshots (mobile UI, small dialogs, < 75% width) - full-width screenshots should NOT be centered
   - For full-width screenshots (most desktop UI):
     ```jsx
     <DocImage path={require('./static/screenshot.png')} alt="Descriptive alt text" title="Click to view full size" />
     <p align="center"><em>Clear caption explaining what the screenshot shows</em></p>
     ```
   - For narrow screenshots (mobile UI, small widgets):
     ```jsx
     <div align="center">
       <DocImage path={require('./static/mobile-ui.png')} alt="Descriptive alt text" title="Click to view full size" width="40%" />
       <p align="center"><em>Caption for narrow screenshot</em></p>
     </div>
     ```

7. **Horizontal rules between sections:**
   - Add `---` (horizontal rule) before each major `##` section heading
   - This provides clear visual separation between sections
   - Example: `---\n\n## Prerequisites`

8. **Structural reorganization:**
   - Follow the template structure exactly
   - Reorganize sections if needed to match template order
   - Ensure all required sections are present

---

## Step 4 — Verify the rewrite

After applying changes:

1. **Read the rewritten file** to verify all changes were applied correctly

2. **Check against audit issues:**
   - Confirm all HIGH priority issues are addressed
   - Confirm all MEDIUM priority issues are addressed
   - Confirm all LOW priority issues are addressed
   - Confirm all user confusion gaps are addressed

3. **Validate structure:**
   - Frontmatter is complete
   - All sections follow the appropriate template
   - All links are site-relative
   - All headings follow the correct case and style for page type
   - Components are imported if used

   **Additional checks for FAQ pages:**
   - `sidebar_label: FAQ` present in frontmatter
   - `title` follows `FAQ — [Feature Name]` format
   - `faq` tag is first in tags list
   - Every `<summary>` ends with `?`
   - Every `<details>` body has at least one full sentence (not just a link)
   - No `###` or deeper headings anywhere in the body
   - No `## Prerequisites`, `## Next steps`, `## Troubleshooting`, or `## What will you learn?` sections
   - `<FAQ>` component only used if total question count is fewer than 10
   - No `<Troubleshoot>` component used

4. **Calculate expected score improvement:**
   Based on the issues fixed, estimate the new audit score (should be ≥ 80)

---

## Step 5 — Report back to user

Provide a summary:

1. **Changes applied:**
   - List the key changes (e.g., "Added 'What you will learn' section", "Fixed 3 non-site-relative links", "Added Troubleshooting component with 4 entries")

2. **Sections added:**
   - List any new sections that were added

3. **Expected score improvement:**
   - Original score: [X]/100
   - Expected new score: [Y]/100 (based on issues fixed)

4. **Next steps:**
   ```
   Review the changes:
   git diff docs/path/to/file.md
   
   Optional: Re-audit to verify score:
   /doc-audit docs/path/to/file.md
   ```

5. **Reminder:** "Review the diff carefully before committing. The rewrite preserves all accurate technical content while improving structure and completeness."

---

## Important notes

- **Preserve accurate content:** Never remove or change technically accurate information. Only add, restructure, or improve clarity.
- **Maintain code examples:** Keep all working code examples. Improve comments or explanations, but don't change functional code.
- **Don't over-edit:** Only make changes that address issues identified in the audit report. Don't add features or make stylistic changes beyond what's needed.
- **Component imports:** When adding `<Troubleshoot>` or `<FAQ>` components to Instructional/Overview pages, remember to add the import at the top:
  ```jsx
  import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
  ```
  FAQ pages use static `<details>`/`<summary>` elements — no component import needed unless the `<FAQ>` component is used (permitted only when fewer than 10 questions on the page).
- **Respect page type:** Don't convert an overview page into an instructional page or vice versa. The page type was determined in the audit and should be preserved.
