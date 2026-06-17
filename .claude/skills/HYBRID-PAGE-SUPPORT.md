# Hybrid Page Support in Audit Skills

**Date:** 2026-06-17
**Author:** Claude (with user guidance)
**Context:** HDH-757 drift-ephemeral-workspaces.md audit revealed need for hybrid page classification

## Problem Statement

The drift-ephemeral-workspaces.md page demonstrated that real-world documentation often combines **conceptual/overview content** with **procedural/instructional content** in a single page. When scored strictly as either "Overview" or "Instructional", such hybrid pages could be unfairly penalized for having characteristics from both templates.

**Example characteristics of hybrid pages:**
- Title is a noun phrase (overview pattern) but contains extensive step-by-step UI navigation (instructional pattern)
- Has "What you will learn" section (overview pattern) AND detailed RBAC prerequisites (instructional pattern)
- Contains conceptual "How it works" sections with descriptive headings AND procedural "Enable X" sections with imperative headings
- Includes reference tables and architecture explanations (overview) alongside API curl examples and configuration steps (instructional)

## Solution: Hybrid Page Classification

Updated the audit skills to recognize and appropriately score hybrid pages.

### Classification Logic

**Hybrid pages are identified when a page contains BOTH:**
- Substantial conceptual content (architecture explanations, "how it works" sections, reference tables)
- Substantial procedural content (step-by-step UI navigation, API examples, configuration walkthroughs)

**Scoring approach:**
1. **Estimate content ratio** — is it ≥60% procedural, ≥60% conceptual, or 40-60% balanced?
2. **Choose scoring template:**
   - **≥60% procedural** → Score as Instructional (hybrid leaning instructional)
   - **≥60% conceptual** → Score as Overview (hybrid leaning overview)
   - **40-60% balanced** → Score against BOTH templates, use whichever yields the higher score
3. **Apply adjusted scoring rules** to avoid unfair penalties

### Adjusted Scoring Rules for Hybrids

**Hybrid (Instructional leaning):**
- ✅ Do NOT penalize for having "What you will learn" section
- ✅ Do NOT penalize for conceptual sections with noun phrase headings alongside imperative procedural headings
- ✅ Reduce penalty for missing detailed RBAC prerequisites (–5 instead of –10) if page is primarily configuration-focused
- ✅ Allow mixed heading styles: imperative for procedural sections, descriptive for conceptual sections

**Hybrid (Overview leaning):**
- ✅ Do NOT penalize for having procedural sections with step-by-step instructions
- ✅ Do NOT penalize for imperative headings in procedural subsections
- ✅ Reduce penalty for missing "What you will learn" (–5 instead of –15) if page has strong introductory explanation
- ✅ Allow mixed heading styles: descriptive for conceptual sections, imperative for procedural sections

**Hybrid (Balanced):**
- Score against both templates
- Report both scores in the audit
- Use whichever score is higher as the official score
- In report, note: "Hybrid (balanced) — Instructional scoring: X/100, Overview scoring: Y/100. Using higher score."

**General adjustments for all hybrid pages:**
- **Editorial heading case:** Allow mixed heading styles without penalty as long as each heading matches its section type
- **Completion RBAC:** Reduce RBAC prerequisite penalty to –5 if page focuses more on architecture/concepts than account setup
- **Structure flexibility:** Do not penalize for having both "What you will learn" (overview) and detailed "Before you begin" (instructional) in same document

## Skills Updated

### 1. doc-audit (`/.claude/skills/doc-audit/skill.md`)

**Location:** Step 2 — Determine page type and fetch appropriate template

**Changes:**
- Added hybrid page detection criteria
- Added dominant content assessment (≥60% threshold)
- Added balanced hybrid handling (score against both templates)
- Added adjusted scoring rules section for hybrids

**Impact:** Single-page audits now correctly identify and score hybrid pages, reducing false failures due to cross-template characteristics.

### 2. doc-section-audit (`/.claude/skills/doc-section-audit/skill.md`)

**Location:** 
- Step 2 — Determine page type and fetch appropriate template
- Step 3 — Read and score the page

**Changes:**
- References doc-audit Step 2 logic for page type detection (includes hybrid support)
- References doc-audit Step 3 scoring logic (includes hybrid adjusted rules)
- Ensures section audits apply same hybrid handling as single-page audits

**Impact:** Section audits (page + all siblings) now use consistent hybrid classification across all pages in the section.

### 3. doc-module-audit (`/.claude/skills/doc-module-audit/skill.md`)

**Location:** Phase 1 — Structural compliance scan, rules H-1 and H-2

**Changes:**
- Added note to H-1 (Sentence case in headings): Hybrid pages may legitimately have mixed heading styles; violations should be reviewed in context
- Added note to H-2 (No gerund headings): Gerunds are always wrong regardless of page type, but hybrids may have different heading styles for different section types

**Impact:** Module-wide scans now flag potential hybrid pages for manual review rather than auto-failing them. The Python scanner (`.claude/scripts/scan-module.py`) remains rule-based and doesn't need page type classification — it reports violations, and the skill interprets them.

## Rationale for Thresholds

**Why ≥60% for lean classification?**
- Clear majority indicates dominant purpose
- Allows up to 40% of content to be the "other" type without affecting classification
- Reduces ambiguity in scoring approach

**Why 40-60% for balanced classification?**
- Narrow band ensures only truly balanced pages get dual-scored
- Dual scoring is more expensive (requires reading both templates), so reserve for genuine edge cases
- Outside this band, one template clearly applies better than the other

## Testing

**Test case:** `docs/infra-as-code-management/workspaces/drift-ephemeral-workspaces.md`

**Before hybrid support:**
- Classified as "Overview" (has "What you will learn", noun phrase title)
- Scored 97/100 with lenient interpretation
- **OR** classified as "Instructional" (has step-by-step UI navigation, API examples)
- Scored 75/100 with strict interpretation, failing for H-1 heading case violations

**After hybrid support:**
- Should be classified as "Hybrid (Instructional leaning)" — contains substantial conceptual sections but ≥60% of content is procedural (UI steps, API curl examples, configuration instructions)
- Scored using Instructional template with adjusted rules:
  - No penalty for having "What you will learn" section
  - No penalty for having conceptual sections like "Configuration levels" and "How the two features relate" with descriptive headings
  - H-1 violations (Title Case in `## Drift Detection`, `## Ephemeral Workspaces`) are still violations, but context notes that feature names may be Title Case
- Expected score: 75-85/100 (acknowledges violations but doesn't over-penalize for hybrid nature)

## Future Considerations

1. **Template evolution:** As we encounter more hybrid pages, we may need to create a third "Hybrid template" rather than always choosing Instructional vs Overview as the base.

2. **Automated ratio detection:** Currently, the ≥60% threshold is assessed manually by reading the page. Future enhancement could use heuristics:
   - Count imperative vs descriptive headings
   - Detect UI navigation patterns ("Select X", "Click Y", "In the Z field")
   - Detect API code blocks (curl, REST endpoints)
   - Count "How it works" vs "Configure X" sections

3. **Scanner integration:** The Python scanner (`.claude/scripts/scan-module.py`) could be enhanced to detect potential hybrid pages and flag them for manual review, rather than just reporting violations.

4. **Rewrite guidance:** When generating rewrite prompts for hybrid pages, explicitly note the hybrid nature and instruct to preserve both conceptual and procedural content while fixing editorial issues.

## Documentation

This change affects how the following docs should be interpreted:

- `.cursor/rules/doc-structure-template.mdc` — Instructional template remains the baseline for procedural content
- `.cursor/rules/doc-structure-overview-template.mdc` — Overview template remains the baseline for conceptual content
- Hybrid pages can reference both templates but should be internally consistent (imperative headings for steps, descriptive headings for concepts)

**Maintainer note:** When writing new hybrid pages, aim for ≥60% lean toward one type to keep scoring straightforward. If a page is truly 50/50, consider splitting into two pages (overview parent + instructional child, or separate concept vs configuration pages).

---

## Summary

Hybrid page support allows the audit skills to fairly evaluate pages that combine conceptual and procedural content, reducing false failures and providing more accurate quality scores. The change is backward-compatible — pure Overview and pure Instructional pages continue to be scored as before.
