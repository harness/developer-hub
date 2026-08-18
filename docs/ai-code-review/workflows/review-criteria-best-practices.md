---
title: Review criteria best practices
sidebar_label: Criteria Best Practices
description: Write and place AI Code Review criteria so the findings get read rather than ignored.
sidebar_position: 30
keywords:
  - ai code review
  - review criteria
  - best practices
tags:
  - ai-code-review
  - workflows
  - best-practices
---

Every enabled criterion produces a status check on every pull request. That single fact drives most of the advice below: criteria are cheap to add and expensive to ignore, and a reviewer facing twenty checks reads none of them.

---

## Keep each criterion to one concern

A criterion produces one check with one verdict. A criterion covering three concerns can only report one result, so a pull request that violates one of the three is indistinguishable from one that violates all three.

If you do not split them, reviewers cannot tell what actually failed and stop reading the summaries. Split the concern and accept the extra check.

---

## Name the failure, not the subject

Write the description as the condition that is wrong, and ask for the location.

`Check error handling` produces observations on every pull request. `Flag any new function under src/handlers/ that calls an external service without a timeout, and name the call site` produces a finding a reviewer resolves in seconds.

If you write topics rather than conditions, the agent has nothing specific to fail on, so it comments on everything. Broad criteria are the main cause of noise, not the model.

---

## Bound the scope of each criterion

Name the paths, file types, or change types a criterion applies to.

An unbounded criterion fires on unrelated pull requests, including documentation and configuration changes. Reviewers learn that a given check is usually irrelevant and stop reading it, which loses you the cases where it mattered.

---

## Define shared criteria once, at the highest scope that is true

Criteria are combined down the hierarchy, not replaced. A repository under a project under an organization runs all three levels of criteria.

Put a criterion at the scope where the statement is genuinely true for everything beneath it. If you restate the same criterion lower down instead, both copies run and produce two checks on the same pull request, because criteria are never deduplicated by title.

Go to [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance) to review the merge rules.

---

## Never restate an inherited criterion to override it

There is no override. A criterion inherited from a parent space cannot be replaced or disabled at a lower scope, only added to.

If you restate it with a changed description, both versions run and a reviewer sees two checks with conflicting summaries. When an inherited criterion is wrong for one repository, fix it at the scope that owns it or remove it from there.

---

## Start with two criteria, not twenty

Add two, let them run for a week, and read what they produce before adding more.

Turning on a full set at once means you cannot tell which criterion is generating the noise, and the team forms its opinion of the whole feature from the worst one. A team that ignores the first ten findings will not read the next hundred.

---

## Retire criteria that never fire

Review the criteria that have not produced a failure in a month and decide whether they are protecting something or padding the check list.

A criterion that always passes still costs a check on every pull request and tokens on every run. Cost scales with the scope it is defined at, so a permanently passing criterion at organization level is charged against every pull request in the organization.

---

## Rename criteria deliberately

The status check identifier is derived from the criterion title, so renaming a criterion changes its check name.

If a branch protection rule requires that check by name, the rule stops matching and silently stops enforcing. Update the rule in the same change as the rename.

---

## Next steps

- [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria): Create and verify a criterion.
- [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance): Choose the right level.
- [Settings reference](/docs/ai-code-review/configure/settings-reference): Every field and its behaviour.
