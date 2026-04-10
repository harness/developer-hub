# Doc Audit Check — Triage candidates for audit

Identifies the most overdue documentation in a module and recommends whether each candidate
warrants a quick single-page audit (`/doc-audit`) or a full section audit (`/doc-section-audit`).

## Usage

```
/doc-audit-check <module-abbreviation>
```

**Examples:**
- `/doc-audit-check iacm`
- `/doc-audit-check cd`
- `/doc-audit-check ccm`

## Arguments

`$ARGUMENTS`

Expects a single module abbreviation. If none is provided, ask the user for one.

---

## Module map

| Abbreviation | Live URL base | Repo folder |
|---|---|---|
| `ci` | /docs/continuous-integration | docs/continuous-integration |
| `cd` | /docs/continuous-delivery | docs/continuous-delivery |
| `ccm` | /docs/cloud-cost-management | docs/cloud-cost-management |
| `iacm` | /docs/infrastructure-as-code-management | docs/infra-as-code-management |
| `chaos` | /docs/resilience-testing | docs/resilience-testing |
| `sto` | /docs/security-testing-orchestration | docs/security-testing-orchestration |
| `platform` | /docs/platform | docs/platform |
| `sei` | /docs/software-engineering-insights | docs/software-engineering-insights |
| `ssca` | /docs/software-supply-chain-assurance | docs/software-supply-chain-assurance |
| `idp` | /docs/internal-developer-portal | docs/internal-developer-portal |
| `sca` | /docs/software-supply-chain-assurance | docs/software-supply-chain-assurance |

**Excluded — refuse and ask for another:**
`ff`, `srm`, `cet`, release-notes.

---

## Step 1 — Find the 3 oldest pages in the module

```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --top 3
```

These are your three audit candidates.

---

## Step 2 — For each candidate, profile its section

For each of the 3 files found above, get the full section profile:

```bash
python .claude/scripts/find-oldest-docs.py docs/<MODULE-FOLDER> --section <candidate-file>
```

The script outputs the total page count, stale count (>180 days), and a recommendation of
`/doc-section-audit` or `/doc-audit` based on whether 2 or more pages in the folder are stale.

---

## Step 3 — Rank and recommend

Rank the three candidates by audit priority using this logic:

**Score each candidate:**
1. Age of the candidate page itself (older = higher priority)
2. Number of stale siblings in its folder (more stale siblings = higher priority)
3. Staleness ratio of the folder (higher ratio = more urgency)

**Determine recommendation for each:**
- If **2 or more pages** in the folder are >180 days old → recommend `/doc-section-audit`
- If **fewer than 2 pages** in the folder are >180 days old → recommend `/doc-audit`

---

## Step 4 — Present the results

Output a ranked summary in this format:

```
## Doc audit candidates — [MODULE]

### #1 — [page slug] · [folder/]
**Page last updated:** [date] ([N days ago])
**Recommendation:** /doc-section-audit  ← or /doc-audit

**Section: [folder name]** ([total] pages, [stale] stale)
| Page | Last updated | Days ago |
|------|-------------|----------|
| [filename] ← this candidate | [date] | [N] |
| [sibling] | [date] | [N] |
| [sibling] | [date] | [N] |
...

**Why:** [One sentence — e.g. "3 of 5 pages in this folder haven't been touched in over 6 months,
making the whole section a candidate for restructure."]

---

### #2 — [page slug] · [folder/]
...

---

### #3 — [page slug] · [folder/]
...

---

## Quick commands

To act on these results:
- `/doc-section-audit [url-of-#1]` — full audit of page #1 and its section
- `/doc-audit [url-of-#1]` — page-only audit of #1
```

Keep the output concise — the goal is a quick read that makes it obvious where to start.
