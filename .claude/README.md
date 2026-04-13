# Claude tooling for Harness Developer Hub

This directory contains slash commands, Cowork skills, and scripts for auditing and improving HDH documentation using Claude Code and Cowork.

---

## Slash commands (Claude Code)

These run directly in Claude Code. Slash commands are available as soon as you open the repo.

### `/doc-audit-check <module>`

Triage a module to find the most overdue documentation. Run this first when you're not sure where to start.

Finds the three oldest pages in a module, profiles each page's section folder, and recommends whether each candidate needs a full section audit or a single-page audit.

```
/doc-audit-check iacm
/doc-audit-check cd
/doc-audit-check ccm
```

Output: a ranked list of candidates with last-updated dates and a suggested next command to run.

---

### `/doc-audit <target> [--verify pre | --verify post]`

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
/doc-audit docs/artifact-registry/troubleshooting/authorization/auth-403-errors.md
/doc-audit docs/artifact-registry/troubleshooting/authorization/auth-403-errors.md --verify
/doc-audit https://developer.harness.io/docs/cloud-cost-management/get-started/overview --verify pre
/doc-audit iacm
```

Reports are saved to `.claude/skills/doc-audit/audits/`.

---

### `/doc-section-audit <target> [--verify pre | --verify post]`

Full audit: scores a page and crawls every sibling page in its section folder. Produces a page-level score, a section-level verdict, and a JIRA ticket description.

Uses the same target options and verify flag as `/doc-audit`.

```
/doc-section-audit docs/infra-as-code-management/workspaces/cli-integration.md
/doc-section-audit iacm --verify post
```

Reports are saved to `.claude/skills/doc-section-audit/audits/`.

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

## Cowork skill

The doc-section-audit workflow is also available as a Cowork skill for use outside Claude Code.

**Skill location:** `.claude/skills/doc-section-audit/SKILL.md`

Invoke it in a Cowork session by asking Claude to audit a doc page. It follows the same target resolution model — local file path, URL, or module abbreviation.

---

## Scripts

### `.claude/scripts/find-oldest-docs.py`

The underlying script used by all three commands. Auto-detects the repo root.

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
/doc-audit-check iacm

# 2. Audit the top candidate (page only, quick)
/doc-audit docs/infra-as-code-management/workspaces/some-page.md

# 3. Full section audit with a post-rewrite verification pass
/doc-section-audit docs/infra-as-code-management/workspaces/some-page.md --verify post
```
