---
name: doc-audit
description: >
  Audit a single Harness Developer Hub documentation page for accuracy, completeness, and
  editorial quality. Produces a scored report (pass/fail) and a ready-to-use rewrite prompt.
  Triggers: "audit [file-path]", "audit [url]", "doc audit", "check this doc", "score this page",
  "audit the oldest page in [module]", or any request to evaluate a single documentation page
  against the Harness quality rubric. Also triggers when the user provides a developer.harness.io
  URL and asks for feedback or a JIRA ticket.
  For a full audit that also crawls every sibling page in the section, use doc-section-audit instead.
argument-hint: "<file-path | url | module-abbreviation> [--verify pre | --verify post]"
user-invocable: true
---

Audit a single Harness Developer Hub documentation page for accuracy, completion, and editorial
quality. Produces a scored report and a ready-to-use rewrite prompt.

For a full audit that also crawls and assesses every sibling page in the section, use `doc-section-audit` instead.

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

Parse arguments from the user's message.

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

## Step 2 — Determine page type and fetch appropriate template

Read the page file first to assess its type. Check for FAQ first — it is the most specific type.

**Page type assessment (check in this order):**

- **FAQ page** if ANY of:
  - `sidebar_label: FAQ` in frontmatter, OR `title` contains "FAQ" or "Frequently asked questions" (case-insensitive)
  - Filename is `faq.md`, ends with `-faq.md`, or ends with `-faqs.md`
  - More than 60% of H2 sections contain only `<details>`/`<summary>` blocks with no step-by-step prose (legacy detection)

- **Instructional/Action page** if:
  - Title is action-oriented ("Create", "Configure", "Set up", "Install")
  - Contains step-by-step UI navigation ("Select X, then click Y")
  - Has sequential procedures users follow verbatim
  - Prerequisites include account access and RBAC permissions

- **Informative/Overview page** if:
  - Title is a noun phrase ("OPA Policies", "Workspace Architecture", "Delegate Types")
  - Explains concepts, architecture, or "how it works"
  - Code examples are illustrative/reference, not step-by-step
  - No UI walkthrough or sequential procedures
  - Content is "what/why/how" rather than "do this, then that"

Once you determine the page type, fetch the appropriate template:

**For FAQ pages:**
```bash
cat .cursor/rules/faq-template.mdc
```

**For instructional pages:**
```bash
cat .cursor/rules/doc-structure-template.mdc
```

**For overview pages:**
```bash
cat .cursor/rules/doc-structure-overview-template.mdc
```

Use the selected template as the structural benchmark for the Editorial score.

**Report the page type to the user:**
Tell the user: **"Page type: [FAQ/Instructional/Overview] — using [template name] for scoring."**

---

## Step 3 — Read and score the page

Read the local file directly:
```bash
cat <file-path>
```

If a live URL exists, optionally use Claude in Chrome to view the rendered page for context —
but base all scoring and edits on the local file, not the rendered version.

Score across three dimensions (each starts at 100). **Adjust criteria based on page type:**

### Scoring for FAQ pages

**Accuracy (40%):** –20 answer contradicts current product behaviour, –15 broken or incorrect code in answer, –10 stale version info in answer, –5 broken links in answers

**Completion (30%):** –15 `<details>` body is empty or contains only a link with no context sentence, –10 a category heading has no `<details>` entries, –10 `<FAQ>` component used on a page with 10 or more questions, –5 answer is a verbatim copy of an existing doc section that Ask AI would already surface (should be shortened + linked)

**Editorial (30%):** –15 page does not follow faq-template skeleton (H2 categories + `<details>`/`<summary>`), –10 missing/incorrect frontmatter (must include `sidebar_label: FAQ`, `title: FAQ — X`, `faq` tag, description), –10 non-site-relative links, –10 missing `redirect_from` on a moved page, –10 em dashes / bare link text (S-1, S-3), –5 `<summary>` text does not end with `?`, –5 `###` or deeper heading found in page body, –5 `## Prerequisites`, `## Next steps`, or `## Troubleshooting` section present, –5 link phrasing — see [link], refer to, to learn more (S-2), –5 contractions (S-7), –5 "please" in body (S-5), –5 spelling/grammar

**Key differences for FAQ pages:**
- No Prerequisites, Next steps, or "What will you learn?" sections required — their absence is not penalised
- No Troubleshoot component expected — `<details>` is the correct pattern
- C-1 (landmark sections) does not apply
- H-2 (gerund headings) does not apply — FAQ categories are noun phrases by design
- The `<FAQ>` component is allowed only when fewer than 10 questions appear on the page

---

### Scoring for Instructional pages

**Accuracy (40%):** –20 contradicts UI/behaviour, –15 steps would error, –15 outdated screenshots, –15 broken code, –10 wrong API, –10 stale versions, –10 wrong prerequisites, –5 broken links

**Completion (30%):** –15 undocumented capabilities, –10 missing prerequisites (account/RBAC), –10 missing troubleshooting, –10 missing config options, –10 no code examples, –10 missing cross-module refs (esp. Platform), –10 no RBAC guidance, –10 missing limitations, –10 incomplete API params, –5 no Next Steps

**Editorial (30%):** –15 wrong structure (vs template), –10 missing/incorrect frontmatter, –10 wrong heading case (must be sentence case + imperative; gerund headings such as “Configuring X” are wrong), –10 non-site-relative links, –10 missing redirect_from, –10 em dashes / bare link text — here, click here (S-1, S-3), –5 link phrasing — see [link], refer to, to learn more (S-2), –10 walls of text, –5 inconsistent UI bolding, –5 no intro before lists (S-6), –5 “please” in body (S-5), –5 contractions — don’t, won’t, can’t etc. (S-7), –5 missing Troubleshoot component (T-1) / ## Introduction heading in body (T-2), –5 spelling/grammar, –5 missing callouts, –5 slug /docs/docs/ bug

### Scoring for Overview pages

**Accuracy (40%):** –20 contradicts behavior/concepts, –15 incorrect examples, –15 broken code, –10 wrong API/schema, –10 stale versions, –10 incorrect conceptual explanations, –5 broken links

**Completion (30%):** –15 missing "What you will learn", –10 incomplete concept explanations, –10 missing reference material (attributes/params), –10 no code examples, –10 missing cross-module refs (esp. Platform), –10 missing architectural context, –10 missing limitations/caveats, –5 no Related concepts/Next steps, –5 light/no prerequisites for knowledge context

**Editorial (30%):** –15 wrong structure (vs overview template), –10 missing/incorrect frontmatter, –10 wrong heading case (must be sentence case + descriptive/noun phrases, NOT imperative), –10 non-site-relative links, –10 missing redirect_from, –10 em dashes / bare link text — here, click here (S-1, S-3), –5 link phrasing — see [link], refer to, to learn more (S-2), –10 walls of text, –5 inconsistent bolding, –5 no intro before lists (S-6), –5 “please” in body (S-5), –5 contractions — don’t, won’t, can’t etc. (S-7), –5 missing Troubleshoot component (T-1) / ## Introduction heading in body (T-2), –5 spelling/grammar, –5 missing callouts, –5 slug /docs/docs/ bug

**Key differences for overview pages:**
- Prerequisites are optional/lightweight (knowledge context only, NOT account/RBAC)
- "What you will learn" section is required
- Headings should be descriptive/noun phrases, NOT imperative verbs
- Troubleshooting/FAQs are optional
- End section is "Related concepts" or "Learn more" (not necessarily "Next steps")

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

### 4d — Tab TOC duplication

**Check for duplicate major sections across tabs that create TOC confusion.**

If the page uses `<Tabs>` / `<TabItem>` components, scan all tab contents for duplicate `##` headings — especially:
- `## Prerequisites`
- `## Troubleshooting`
- `## Next steps`
- Step headings (e.g., `## Step 1`, `## Step 2`)

**Problem:** Docusaurus right-hand TOC shows headings from ALL tabs simultaneously, not just the active tab. When multiple tabs contain the same major sections, the TOC displays duplicates (e.g., Prerequisites ×2, Troubleshooting ×2), making it impossible to tell which tab each heading belongs to.

**When to flag:**
- Two or more tabs each contain `## Prerequisites`, `## Troubleshooting`, or `## Next steps`
- Multiple tabs use the same step heading structure (e.g., both have `## Step 1: X`, `## Step 2: Y`)

**Recommended fix — DMS restructuring:**

When tabs represent different approaches to the same task (e.g., Terraform vs API provisioning), restructure using DMS:

**Parent page** (with DMS component):
- Introduction (shared — what the task accomplishes and why)
- DMS component with tiles for each approach
- Troubleshooting (shared — common issues apply to all approaches)
- Next steps (shared — what to do after provisioning)

**Child pages** (in `content/` subdirectory, flat structure):
- File naming: `content/<parent-name>-<approach>.md` (e.g., `content/provision-terraform.md`, `content/provision-api.md`)
- Keep content folder flat — do NOT nest as `content/<parent-name>/<approach>.md`
- Prerequisites (approach-specific — Terraform needs Terraform CLI, API needs curl)
- Step-by-step instructions (unique to each approach)
- No Troubleshooting/Next steps sections (those live on parent only)
- H1 heading allowed (serves as tab section title)

**Benefits:**
- TOC only shows ONE approach at a time (whichever tile is selected)
- Shared sections aren't duplicated
- Prerequisites can still differ by approach
- URL structure: `parent-page#terraform` and `parent-page#api`

**Example flagging:**

```markdown
**Tab TOC duplication detected:**
- Both "Terraform" and "API" tabs contain `## Prerequisites`
- Both tabs contain `## Troubleshooting`
- Both tabs contain `## Next steps`

**Impact:** Right-hand TOC shows 6 major sections (Prerequisites ×2, Troubleshooting ×2, Next steps ×2), making navigation confusing.

**Recommendation:** Restructure with DMS — shared sections (Intro, Troubleshooting, Next steps) on parent page, approach-specific content (Prerequisites, Steps) in child pages at `content/provision-terraform.md` and `content/provision-api.md`.
```

If no duplicate sections are found across tabs, or the page doesn't use tabs, note: "No tab TOC duplication detected."

---

## Step 5 — User confusion gap analysis

This step identifies where readers might get stuck, confused, or lack context to proceed. This is **not** about accuracy (Step 3 covers that) — it's about usability and clarity.

Read the page as if you're a user encountering this feature for the first time. Flag gaps in these categories:

### 5a — Missing "how to access/use" context

**For overview pages with reference material (attributes, schemas, API endpoints):**
- Are there examples showing **how to use** the items in the reference list?
- Do code examples include explanatory prose before/after?
- Is the input/output structure explained (e.g., "Access these via `input.workspace.*` in Rego")?

**For instructional pages:**
- Is the UI path clear? (e.g., "Go to **Project Settings > Policies**")
- Are prerequisite steps linked? (e.g., if you need a connector first, does it link to how to create one?)

**Examples of gaps:**
- Attribute list with no example showing `input.workspace.provisioner_version`
- "Create a policy set" with no link to where/how to do that
- "Use the Harness API" with no endpoint or authentication guidance

### 5b — Unexplained behavior or outcomes

**What happens when X fails or succeeds?**
- Policy fails → What happens? (Pipeline stops? Warning? Error message shown?)
- Deployment completes → Where do I see the results?
- Configuration saved → When does it take effect?

**Examples of gaps:**
- "Policies are evaluated automatically" — but no mention that pipeline **fails** if policy denies
- "Terraform state is updated" — but no mention of where to view it or what happens on conflict
- Error messages mentioned but no guidance on how to debug them

### 5c — Missing prerequisite knowledge or links

Does the page assume knowledge the reader might not have?
- OPA/Rego syntax → Should link to OPA documentation
- Terraform plan JSON structure → Should link to Terraform docs or show example structure
- Harness RBAC → Should link to Platform RBAC docs, not re-explain it

**Flag when:**
- Technical concepts (OPA, Rego, JSON schema) are used without definition or link
- External tool knowledge is required (Terraform, Kubernetes) without reference links
- Harness Platform concepts (connectors, delegates, secrets) are mentioned without linking to Platform docs

### 5d — Broken or vague links

Check all links in "Related concepts" or "Next steps":
- Do they actually exist? (Run a quick check for broken paths if possible)
- Are they actionable? Good: "Create your first policy" → Bad: "Policy documentation"
- Do they help the user **do** something vs. just read more?

**Examples of gaps:**
- Link to `/docs/iacm/pipelines/iacm-pipelines` (broken — should be `/docs/iacm/pipelines/default-pipelines`)
- "Learn more about policies" (vague) → "Create policies and policy sets" (actionable)
- Link to generic Platform overview when a specific how-to guide exists

### 5e — Jargon or abbreviations without explanation

First use of specialized terms should include:
- Brief inline definition, OR
- Link to glossary/concept doc, OR
- Expansion of abbreviation

**Flag when:**
- IaCM, OPA, RBAC used in intro without expansion (fine later in doc after first use)
- Domain terms like "policy set", "entity type", "evaluation" used without brief definition
- Product-specific jargon ("workspace", "connector") without context for new users

### Scoring impact

This step **does NOT affect the Accuracy/Completion/Editorial score**. However, gaps identified here should be included in the **Completion** section of the audit report as context-related issues, and in the **Structural rewrite plan** section with specific fixes.

Think of this as a "usability layer" on top of the technical correctness audit.

---

## Step 6 — Write the audit report

Save to `.claude/skills/doc-audit/audits/[slug]-audit-YYYYMMDD.md` (e.g. `auth-403-errors-audit-20260410.md`). Use today's date. The folder already exists.

```markdown
# Audit: [Page Title]

**URL:** [url]
**Last git commit:** [date or "unknown"]
**Audit date:** [today]
**Overall score:** [score]/100 — PASS / FAIL

## Page type assessment

**Type:** [Instructional | Overview]
**Template used:** [.cursor/rules/doc-structure-template.mdc | .cursor/rules/doc-structure-overview-template.mdc]

**Rationale:**
[2-3 sentences explaining why this page is categorized as instructional or overview. Reference title pattern, content style, presence/absence of step-by-step procedures, etc.]

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

## User confusion gaps

> Usability issues where readers might get stuck or lack context to proceed.

### Missing "how to access/use" context
[List gaps where the doc shows WHAT but not HOW to use it]

### Unexplained behavior or outcomes
[List gaps where the doc doesn't explain what happens when X succeeds/fails]

### Missing prerequisite knowledge or links
[List assumed knowledge that should be defined or linked]

### Broken or vague links
[List broken links, vague link text, or missing actionable links]

### Jargon without explanation
[List terms/abbreviations that need inline definition or links]

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

1. [.cursor/rules/doc-structure-template.mdc OR .cursor/rules/doc-structure-overview-template.mdc — use the template that matches the page type from the audit]
2. .cursor/rules/doc-linking.mdc             — link formatting (site-relative paths only)
3. .cursor/rules/doc-slugs-and-redirects.mdc — slug and redirect_from conventions
4. .cursor/rules/doc-move.mdc                — redirect requirements if restructuring
5. CLAUDE.md                                 — project-wide conventions (headings, components, frontmatter)

Page to rewrite: [repo-relative file path]
Live URL: [full URL]
Audit report: .claude/skills/doc-audit/audits/[slug]-audit-YYYYMMDD.md

**Page type:** [Instructional | Overview] — see audit report for rationale

---
ACCURACY FIXES
[paste Accuracy issues from audit]

COMPLETION GAPS TO ADDRESS
[paste Completion issues from audit]

EDITORIAL FIXES
[paste Editorial issues from audit]

USER CONFUSION GAPS TO ADDRESS
[paste User confusion gaps from audit — focus on adding missing context, explaining behavior, linking prerequisites, fixing vague links, and defining jargon]

STRUCTURAL REWRITE PLAN
[paste Structural rewrite plan from audit]

REDIRECTS REQUIRED
[paste Redirect changes required from audit]

---
The rewritten page must satisfy all of the following before you consider it done:

**For FAQ pages:**
- Follows faq-template.mdc skeleton exactly (frontmatter → 1–2 sentence intro → `---` + `##` categories → `<details>`/`<summary>` Q&A)
- `sidebar_label: FAQ`, title `FAQ — [Feature Name]`, `faq` tag present in frontmatter
- Every `<summary>` ends with `?`
- Every `<details>` body contains at least one full sentence (not just a link)
- No `## Prerequisites`, `## Next steps`, `## Troubleshooting`, or `###` headings anywhere on the page
- `<FAQ>` component only used if page has fewer than 10 questions total
- No `<Troubleshoot>` component

**For Instructional pages:**
- Follows doc-structure-template.mdc skeleton exactly (frontmatter → intro → prerequisites →
  step-by-step instructions → Troubleshoot component → Next steps)
- Prerequisites include account access, RBAC permissions with specific permission names and links
- All ## and ### headings use sentence case with imperative form ("Create X", "Configure Y")
- <Troubleshoot> component for common task errors

**For Overview pages:**
- Follows doc-structure-overview-template.mdc skeleton exactly (frontmatter → intro → What you will learn →
  optional lightweight prerequisites → concept sections → optional FAQs → Related concepts)
- "What you will learn" section with 3-5 learning outcomes
- Prerequisites are optional/lightweight (knowledge context only, NOT account/RBAC)
- All ## and ### headings use sentence case with descriptive noun phrases ("Policy entity types", "How X works")
- Optional <FAQ> component for conceptual questions

**For both page types:**
- Frontmatter is complete: title, sidebar_label (Title Case), description, keywords, tags;
  slug does not include a /docs/ prefix
- All internal links use site-relative paths (/docs/...), never full production URLs
- redirect_from added to frontmatter for any URL being superseded
- UI element names are consistently bolded
- No intro is missing before the first list (S-6)
- No em dashes in body (S-1)
- Links use "Go to X to Y" phrasing — no "see [link]", "refer to", "to learn more" (S-2, S-3)
- No "please" anywhere in the body (S-5)
- No contractions — use full forms (do not, cannot, it is, etc.) (S-7)
- Troubleshooting entries use the `<Troubleshoot>` component, not static `### heading` pairs (T-1)
- No `## Introduction` heading — intro is plain prose only (T-2)
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
