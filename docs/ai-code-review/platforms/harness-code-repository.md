---
title: Harness Code Repository
sidebar_label: Harness Code
description: How AI Code Review works on a repository that already lives in Harness Code.
sidebar_position: 20
keywords:
  - ai code review
  - harness code repository
tags:
  - ai-code-review
  - platforms
---

A Harness Code repository is reviewed in place. There is no connector, no linked repository, and no import to wait for, so onboarding is a single step.

---

## What you will learn from this topic
- What differs between Harness Code and GitHub.
- What onboarding turns on for the repository.
- What appears on a pull request.

---

## What differs from GitHub

| | Harness Code | GitHub |
| --- | --- | --- |
| Connector required | No | Yes |
| Provider repository identifier | Not used | Required for account-level connectors |
| Repository linked and imported | No | Yes |
| Wait before the trigger is registered | None | Until the import completes |

Everything after the repository is connected is identical. The same pipeline, the same trigger, the same checks, and the same comment.

Go to [Get started with AI Code Review](/docs/ai-code-review/get-started) for the onboarding steps.

---

## Enablement is a feature flag, then per repository

Two steps, in order:

1. **The AI Code Review feature flag is enabled on your account.** Contact Harness to have it turned on for beta.
2. **Each repository is opted in individually.** Onboarding a repository is what registers its trigger and enables review on it.

A repository is not reviewed until both are true.

:::warning The review page is upgraded, not duplicated

Once the feature flag is on, a repository with AI Code Review enabled shows the AI Code Review version of the pull request review page. The previous review page is not kept alongside it and is not separately reachable.

:::

---

## What onboarding turns on

For each Harness Code repository, onboarding:

- Registers a pull request trigger named `aicr_pr_trigger_<repository>` that fires on pull request create, update, and reopen.
- Creates a pipeline record for the repository with identifier `aicr`.
- Creates an AI Code Review setting anchored to the repository path, with no criteria.
- Sets the repository AI pull request review flag to enabled.

The setting matters even though it starts empty. It is the installation record, and a repository without one does not appear in AI Code Review pull request listings.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review the account-level resources created alongside these.

---

## What appears on a pull request

The same two surfaces as GitHub:

- One status check per enabled review criterion, identified as `aicr_<criterion-title>_<criterion-id>`.
- A single pull request comment showing the review state, the overall risk, and a link to the full results.

Go to [GitHub results, comments, and checks](/docs/ai-code-review/platforms/github/results-comments-and-checks) for the exact check identifier rules and comment text, which are the same on both platforms.

---

## Existing review rules

AI Code Review reports checks. It does not merge, approve, or block on its own. Whether a failing criterion prevents a merge is decided by your existing branch rules and required checks, not by AI Code Review.

Because there is one check per criterion and no aggregate check, requiring AI Code Review on a merge means requiring the individual check identifiers. Renaming a criterion changes its identifier, so a rule that names a check needs updating when a title changes.

---

## Remove a repository

Offboarding deletes the pull request trigger and sets the repository AI pull request review flag back to disabled. The pipeline record, the AI Code Review setting, and its criteria remain, so re-onboarding the repository restores reviews with the criteria intact.

---

## Related concepts

- [Get started with AI Code Review](/docs/ai-code-review/get-started): Turn it on.
- [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria): A repository with no criteria produces no checks.
- [What Harness creates](/docs/ai-code-review/configure/what-harness-creates): Everything onboarding adds to your account.
