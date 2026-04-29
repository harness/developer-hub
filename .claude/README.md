# Claude tooling for Harness Developer Hub

This directory contains skills and scripts for auditing and improving HDH documentation using Claude Code and Cowork.

---

## Skills

All doc tooling is implemented as skills in `.claude/skills/`. Invoke them by name in Claude Code or Cowork, or describe what you want in natural language — Claude will match the right skill automatically.

---

### `doc-audit-check`

Triage a module to find the most overdue documentation. Run this first when you are not sure where to start.

Finds the three oldest pages in a module, profiles each page's section folder, and recommends whether each candidate needs a full section audit or a single-page audit.

```
doc-audit-check iacm
doc-audit-check cd
doc-audit-check ccm
```

Output: a ranked list of candidates with last-updated dates and a suggested next skill to run. Reports saved to `.claude/skills/doc-audit-check/audits/`.

---

### `doc-audit`

Audit a single documentation page. Scores it across accuracy, completion, and editorial quality, then produces a written report and a ready-to-use rewrite prompt.

**Target options (pick one):**

| Target | Example |
|--------|---------|
| Local file path (primary) | `docs/infra-as-code-management/workspaces/cli-integration.md` |
| Live URL | `https://developer.harness.io/docs/infrastructure-as-code-management/workspaces/cli-integration` |
| Module abbreviation | `iacm` — audits the oldest page in that module |

**Verify flag (optional):**

Only valid when the target is a file path or URL — not a module abbreviation. If you pass a module abbreviation with `--verify`, Claude asks you for a specific file path or URL instead.

| Flag | Behaviour |
|------|-----------|
| `--verify` | Defaults to `post`. |
| `--verify pre` | Walk through the page as-is on qa.harness.io after scoring. Self-correct the file if score < 80. |
| `--verify post` | Rewrite the file to match the doc template first, then walk through and self-correct if score < 80. |

```
doc-audit docs/artifact-registry/troubleshooting/authorization/auth-403-errors.md
doc-audit docs/artifact-registry/troubleshooting/authorization/auth-403-errors.md --verify
doc-audit https://developer.harness.io/docs/cloud-cost-management/get-started/overview --verify pre
doc-audit iacm
```

Reports saved to `.claude/skills/doc-audit/audits/`.

---

### `doc-rewrite`

Apply a `doc-audit` report to the page. Reads all audit findings and rewrites the file to address every issue. Pass either the audit report path or the original file path (Claude finds the latest report automatically).

```
doc-rewrite .claude/skills/doc-audit/audits/opa-workspace-audit-20260414.md
doc-rewrite docs/infra-as-code-management/policies-governance/opa-workspace.md
```

---

### `doc-section-audit`

Full audit: scores a page and crawls every sibling page in its section folder. Produces a page-level score, a section-level verdict, a consolidation plan, and a JIRA ticket description.

Uses the same target options and verify flag as `doc-audit`.

```
doc-section-audit docs/infra-as-code-management/workspaces/cli-integration.md
doc-section-audit iacm --verify post
```

Reports saved to `.claude/skills/doc-section-audit/audits/`.

---

### `doc-section-rewrite`

Apply a `doc-section-audit` report directly in Claude Code, in three supervised phases. No copy-pasting required — Claude reads all affected files and makes the edits, pausing for a `git diff` review between each phase. File deletions are always listed as manual steps.

```
doc-section-rewrite .claude/skills/doc-section-audit/audits/auth-403-errors-audit-20260413.md
```

**Phases:**

| Phase | What happens |
|---|---|
| 1 — Structure | Create new pages, scaffold DMS/tabs, rename files (only if IA changes needed) |
| 2 — Content | Rewrite all in-scope files per audit findings, oldest-first |
| 3 — Cleanup | Add `redirect_from` entries, fix cross-references, list files to delete manually |

Prefer Cursor? Each phase block is self-contained and can be pasted into a Cursor chat independently.

---

### `doc-module-audit`

Score every page in a module for compliance with the HDH style guide, doc-structure template, and editorial rules. Produces a ranked module-level compliance report.

```
doc-module-audit iacm
doc-module-audit ci --full
```

Reports saved to `.claude/skills/doc-module-audit/audits/`.

---

### `doc-reviewer`

Extended review for non-Harness docs or when image/link/SEO validation is needed. Adds image path/alt-text validation, cross-reference checking, factual verification via web search, and SEO/AEO analysis. For Harness DevHub docs, use `doc-section-audit` instead — it includes Harness-specific scoring and JIRA generation.

```
doc-reviewer path/to/external-README.md
doc-reviewer https://example.com/tutorial
doc-reviewer path/to/docs/
doc-reviewer path/to/docs/ --files README.md,tutorial.md
```

Reports saved to `.claude/skills/doc-reviewer/audits/`.

---

## Module abbreviations

The authoritative list is `.claude/scripts/modules.json`. To print it:

```bash
python .claude/scripts/find-oldest-docs.py --list-modules
```

| Abbreviation | Module |
|---|---|
| `ci` | Continuous Integration |
| `cd` | Continuous Delivery |
| `ccm` | Cloud Cost Management |
| `iacm` | Infrastructure as Code Management |
| `rt` | Resilience Testing |
| `sto` | Security Testing Orchestration |
| `platform` | Platform |
| `sei` | Software Engineering Insights |
| `idp` | Internal Developer Portal |
| `scs` | Software Supply Chain Assurance |
| `fme` | Feature Management & Experimentation |
| `hsf` | Harness Solutions Factory |
| `dbdevops` | Database DevOps |
| `ar` | Artifact Registry |

**Not audited:** `ff`, `srm`, `cet`, release-notes.

---

## Scripts

### `.claude/scripts/find-oldest-docs.py`

The underlying script used by all audit skills. Auto-detects the repo root.

```bash
# Find the 3 oldest pages in a module
python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management --top 3

# Profile all pages in the same folder as a specific file
python .claude/scripts/find-oldest-docs.py docs/cloud-cost-management --section docs/cloud-cost-management/getting-started/ccm-overview.md

# Get the last git commit date for a single file
python .claude/scripts/find-oldest-docs.py --git-date docs/artifact-registry/troubleshooting/authorization/auth-403-errors.md
```

### `.claude/scripts/verify-step.md`

Instructions for the `--verify` flag. Defines the pre/post modes, page-type gate (instructional vs conceptual), qa.harness.io walkthrough behaviour, and self-correction logic. Read automatically when `--verify` is passed.

---

## Typical workflow

```
# 1. Find the worst pages in a module
doc-audit-check iacm

# 2. Quick single-page audit
doc-audit docs/infra-as-code-management/workspaces/some-page.md

# 3. Full section audit (page + all siblings)
doc-section-audit docs/infra-as-code-management/workspaces/some-page.md

# 4. Apply the section findings across all affected files
doc-section-rewrite .claude/skills/doc-section-audit/audits/some-page-audit-20260413.md

# Or jump straight to a verified rewrite:
doc-section-audit docs/infra-as-code-management/workspaces/some-page.md --verify post
```
