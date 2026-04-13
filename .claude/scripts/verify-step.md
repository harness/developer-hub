# Verification step (--verify pre | --verify post)

Executed only when `--verify pre` or `--verify post` is passed. Both modes gate on page type,
use qa.harness.io for live walkthrough, and self-correct the file if the score is below 80.
The difference is what state the file is in when verification starts.

---

## Mode: `--verify pre`

Verify the markdown file **in its current state** before any rewriting.

1. Run the standard audit (Steps 3–5 of the parent command) to produce the initial score.
2. Apply the page-type gate (see Gate 1 below).
3. If the page qualifies, run the qa.harness.io walkthrough (Gate 2 + Gate 3).
4. Recalculate the Accuracy score using confirmed walkthrough findings.
5. If the overall weighted score is **< 80**, apply targeted fixes directly to the markdown
   file to bring it to ≥ 80 — see "Self-correction" below.
6. Write the audit report with a `pre` badge on the verification section.

---

## Mode: `--verify post`

Rewrite the file to align with the doc-structure-template **first**, then verify the result.

1. Read the template:
   ```bash
   cat .cursor/rules/doc-structure-template.mdc
   ```
2. Rewrite the markdown file in the repo to conform to the template structure. Apply all
   editorial fixes identified in the audit (frontmatter, headings, links, callouts, intro
   paragraphs, Troubleshoot component, Next steps). Save the file.
3. Re-score the rewritten file against all three dimensions (Accuracy, Completion, Editorial).
4. Apply the page-type gate (see Gate 1 below).
5. If the page qualifies, run the qa.harness.io walkthrough (Gate 2 + Gate 3) on the
   newly rewritten content.
6. If the overall weighted score is **still < 80** after the rewrite, apply further targeted
   fixes — see "Self-correction" below.
7. Write the audit report with a `post` badge and a before/after score comparison.

---

## Gate 1 — Page type check (both modes)

Only run the live UI walkthrough for **instructional** pages. Classify the page before
navigating to qa.harness.io.

**Proceed with walkthrough if the page shows instructional signals:**
- Title or `sidebar_label` contains action verbs: Configure, Create, Set up, Deploy, Install,
  Enable, Migrate, Integrate, Run, Build, Add, Connect, Get started
- Page has numbered steps or a sequential step-by-step structure
- `##` headings are imperative: "Install the agent", "Configure a pipeline", "Create a workspace"
- Frontmatter `tags` include: `tutorial`, `how-to`, `get-started`, `guide`

**Skip walkthrough and note in report if the page shows conceptual signals:**
- Title contains: Overview, Introduction, What is, Key concepts, About, Reference, Architecture
- Page is primarily explanatory prose with no numbered steps
- Frontmatter `tags` include: `concept`, `reference`, `overview`

If skipping, add this note to the Accuracy section of the report:

> ⚠ **Live walkthrough skipped** — page classified as [overview / key concepts / reference].
> Accuracy assessed by content review only. Consider running `/doc-section-audit --verify post`
> after a rewrite if the page is refactored into an instructional format.

---

## Gate 2 — Navigate to qa.harness.io

Use the Claude in Chrome MCP to navigate to `https://qa.harness.io`. **Never use `app.harness.io`.**

```
navigate → https://qa.harness.io
```

Then take a screenshot to check the current state:

```
computer → screenshot
```

**Login barrier — human in the loop:**
If the screenshot shows a login or SSO screen, stop and tell the user:

> "I've reached the qa.harness.io login screen and need you to authenticate before I continue.
> Please log in, then let me know and I'll pick up from where I left off."

Do not attempt to enter, guess, or retrieve credentials. Wait for explicit confirmation, then
take a fresh screenshot to confirm the authenticated state before continuing.

Once authenticated, use `navigate` to go to the module area relevant to the page being audited
(derive the path from the doc's live URL).

---

## Gate 3 — Walk through the instructions

Use the Chrome MCP tools to actively work through each step in the doc against the live
qa.harness.io UI. For each step:

1. **Read the current page state** to understand what's visible:
   ```
   read_page or get_page_text
   ```

2. **Find the described UI element** — button, field, menu, or nav item the step references:
   ```
   find → [element description or selector]
   ```

3. **Take a screenshot** to visually confirm the element exists and matches the doc's description:
   ```
   computer → screenshot
   ```

4. **Navigate or click** to follow the step's instruction, where it is safe to do so:
   ```
   navigate → [url] or find + left_click → [element]
   ```

**Rules for each step:**
- ✅ **Confirm** — element found at the described location with the correct label/name
- ⚠ **Drift** — element exists but name, location, or flow has changed since the doc was written
- ❌ **Broken** — element or path does not exist or cannot be reached
- ⏭ **Skipped** — step requires credentials, external integration, or unavailable resource; note why
- 🛑 **Stop** before any destructive action — verify navigation and form fields up to the
  confirmation dialog but do not click through deletions, deployments, or org-level changes

After completing all walkable steps, take a final screenshot for the report record.

---

## Self-correction (score < 80)

If the weighted score after verification is below 80, fix the file directly before finalising
the report. Do not just list issues — resolve them:

**Accuracy fixes (from walkthrough):**
- Update any step description, UI label, or navigation path that was found to have drifted
- Remove or correct any instruction that couldn't be reproduced in qa
- Add a `:::note` callout for any step that required context not in the page (e.g. prerequisite
  resource, permission) if fixing the step itself isn't possible

**Completion fixes:**
- Add the missing section (prerequisites, RBAC, Next steps, Troubleshoot component) directly
  to the file

**Editorial fixes:**
- Apply remaining frontmatter, heading case, link format, and structural issues from the
  rubric that still haven't been addressed

After each fix pass, recalculate the score. Repeat until the score reaches ≥ 80 or you have
exhausted all addressable issues. If ≥ 80 cannot be reached because fixes require product
knowledge you cannot confirm (e.g. accuracy issues that need a Harness engineer to verify),
stop and document the blocker clearly in the report.

---

## Report section: Verification

Add this block to the audit report's Accuracy section:

```markdown
### Verification

**Mode:** pre / post
**Page type:** Instructional / Conceptual (skipped)
**Environment:** qa.harness.io
**Walkthrough date:** [today]
**Steps verified:** [N of M]

| Step | Result | Notes |
|------|--------|-------|
| [description] | ✅ Confirmed / ⚠ Drift / ❌ Broken / ⏭ Skipped | [detail] |

**Score before verification:** [N]/100
**Score after verification + fixes:** [N]/100
**File updated:** Yes / No
```

Deductions from confirmed walkthrough failures go into Issues found → Accuracy with a
`[Verified ✓]` tag to distinguish them from inferred issues.

For `--verify post`, also include a before/after score table at the top of the report:

```markdown
| | Before rewrite | After rewrite + verification |
|---|---|---|
| Accuracy | /100 | /100 |
| Completion | /100 | /100 |
| Editorial | /100 | /100 |
| **Total** | **/100** | **/100** |
```
