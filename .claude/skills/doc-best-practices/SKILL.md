---
name: doc-best-practices
description: >
  Write, rewrite, or review a best-practices documentation page in any module so it reads like
  advice from an experienced practitioner, not a feature tour. Enforces the
  recommendation + rationale + consequence model and the must-not rules (no "What you will
  learn", no Troubleshooting, no concept dumps). Triggers: "best practices page",
  "X best practices", "write best practices for", "is this a good best practices page",
  "review this best practices doc", "score this best practices page", or any request to create
  or update a page whose job is to recommend what to do and warn what breaks if you do not.
user-invocable: true
---

Use this skill whenever you create, rewrite, or review a **best-practices page** in this repo,
for any module (IaCM, CI, CD, STO, platform, and so on). A best-practices page tells the reader
what to do, why it matters, and what breaks if they do not. It is a distinct doc type from
feature, overview, and FAQ pages, and it is scored against a different rubric.

This skill is a thin wrapper. The **single source of truth** is the rule file. Do not duplicate
its contents here; read it and apply it.

## Step 1 — Read the source-of-truth rules

```bash
cat .cursor/rules/doc-structure-best-practices-template.mdc
cat .cursor/rules/writing-style.mdc
cat .cursor/rules/doc-linking.mdc
cat CLAUDE.md
```

The best-practices template defines the full structure, voice, scoring rubric, and the
before/after examples. writing-style.mdc, doc-linking.mdc, and CLAUDE.md carry the
project-wide voice, link phrasing, and sidebar rules that still apply.

## Step 2 — Apply the defining rule to every entry

Every recommendation on the page states three things:

1. **Recommendation** — what to do, in the imperative.
2. **Rationale** — why it matters.
3. **Consequence** — what breaks, degrades, or costs more if the reader does not follow it
   ("if you do not do X, then Y happens").

If you cannot state a consequence for an entry, it is not a best practice. Move it to an
overview, concept, or setup page and link to it instead.

## Step 3 — Enforce the must-not rules

Remove or never add the following on a best-practices page:

- "What you will learn" section.
- Troubleshoot blocks or any troubleshooting section. Fold an instructive failure mode into
  a recommendation as its consequence instead.
- Concept dumps: hierarchies, architecture, framework or version matrices, "how RBAC works".
  Link out to the canonical concept page.
- Standalone "Limitations and gotchas" section. Convert each into a practice with a consequence,
  or move pure reference limitations to the feature page.
- A feature-tour introduction. Open with the purpose of the page, not what the product does.
- A "trade-offs" heading whose content lists only benefits. State the real downside and when the
  alternative is the better choice.

Route genuinely useful platform-level or concept material (RBAC, secret management, diagrams)
out of the body: link to the canonical page or surface it under Next steps.

## Step 4 — Self-check against the scoring rubric

Before finishing, verify the page:

- States a consequence for every recommendation.
- Reads like advice from an experienced practitioner, not a feature description.
- Uses imperative headings that name practices (for example "Store state in a remote backend").
- Omits "What you will learn" and "Troubleshooting" by design.
- Links out concept and platform material instead of reproducing it.
- States honest trade-offs for the options it recommends.
- Follows the project voice: present tense, second person, no contractions, no em dashes, no
  gerunds in headings, "Go to X to Y" link phrasing, site-relative links.

When reviewing an existing page rather than writing one, report findings against this same
rubric and flag the common failure signals listed in the rule file (bare imperatives, concept
content in the body, misplaced troubleshooting, benefits-only trade-offs, feature-tour intro).

## Reference example

The IaCM best-practices page (docs/infra-as-code-management/iacm-best-practices.md) is the
worked example of this template: imperative practice headings, every entry carrying its
consequence, concept content linked out, and platform controls routed to Next steps.
