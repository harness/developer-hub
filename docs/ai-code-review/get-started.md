---
title: Get started with AI Code Review
sidebar_label: Get Started
description: Turn on AI Code Review for a GitHub repository or a Harness Code repository, and verify the first review.
sidebar_position: 20
keywords:
  - ai code review
  - get started
  - onboarding
  - github
  - harness code
tags:
  - ai-code-review
  - get-started
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide takes one repository from nothing to a reviewed pull request. The steps differ between GitHub and Harness Code only in how the repository is connected. Everything after that, including the pipeline, the trigger, and the review itself, is identical.

Onboarding a repository is not a per-user action. It creates shared Harness resources in your account and enables reviews for everyone who opens a pull request against that repository.

---

## Before you begin

- **Harness account access:** You need `repo_edit` on the space you are onboarding. Go to [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac) to review what each action requires.
- **A target space:** An account, organization, or project path. A space path has at most three segments, `account/org/project`.
- **A repository to onboard:** Either a Harness Code repository, or a GitHub repository plus a Harness connector that can reach it.
- **Familiarity with review criteria:** Go to [AI Code Review overview and key concepts](/docs/ai-code-review/overview) to understand what the agent evaluates.

:::info Onboarding is idempotent

Running onboarding again against the same space and repositories is safe. Resources that already exist are reused rather than duplicated, and supplying a different connector updates the existing linked repository and trigger.

:::

---

## Connect your repository

Select your source control platform. The steps below cover connecting the repository and turning on reviews. Both the Harness UI and the API are shown.

<DynamicMarkdownSelector
  toc={toc}
  precedingHeadingID="connect-your-repository"
  nextHeadingID="what-harness-creates"
  disableSort={true}
  options={{
    "GitHub": {
      path: "/ai-code-review/content/github.md",
      logo: "github-logo.svg",
      logoSize: 22,
      description: "Link a GitHub repository through a Harness connector, then enable reviews on it."
    },
    "Harness Code": {
      path: "/ai-code-review/content/harness-code.md",
      logo: "harness-code-logo.svg",
      logoSize: 22,
      description: "Enable reviews directly on a repository that already lives in Harness Code."
    }
  }}
/>

## What Harness creates

Onboarding is not only a switch. The first run in a space creates a dedicated service account, a role, a long-lived token stored as a secret, and a pipeline in every target project. Each repository then gets a pull request trigger.

You do not need to understand all of it to get a review, but an administrator will be asked what appeared in the account.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review every resource by name, including the generated pipeline and trigger, and what offboarding does and does not remove.

---

## Define your first review criteria

A repository with no criteria produces no checks. Onboarding creates an empty setting for the repository; the criteria are yours to write.

Start with two, not twenty. One criterion the team already argues about in review, and one that is easy to verify. Vague criteria produce vague findings, and a team that does not trust the first ten findings will not read the next hundred.

Go to [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria) to create them.

---

## Verify the first review

Work through these in order. Each step confirms one surface, so a failure tells you where the chain broke.

1. Open a pull request against the onboarded repository, or push a commit to an existing open pull request.
2. Confirm the `aicr` pipeline execution starts in the target project. The trigger fires on pull request create, update, and reopen.
3. On the pull request, confirm a comment appears reading `🤖 Harness AI Code Review in progress…` with a link to the results.
4. When the run completes, confirm the comment updates to `✅ Harness AI Code Review complete` with a risk level of `LOW`, `MEDIUM`, or `HIGH`.
5. Confirm one status check appears per enabled criterion. Check identifiers take the form `aicr_<criterion-title>_<criterion-id>`.

If the pull request shows a comment but no checks, the run started and did not report results. If it shows checks but no comment, the comment integration is not configured. Both cases are covered below.

---

## Troubleshooting

<Troubleshoot
  issue="Harness AI Code Review does not run when a pull request is opened on an onboarded repository"
  mode="fallback-only"
  fallback="Confirm the aicr pipeline trigger exists in the target project. Onboarding creates one trigger per repository per project, named aicr_pr_trigger_<repository>. The trigger fires only on pull request create, update, and reopen, so an existing pull request with no new activity does not trigger a review."
/>

<Troubleshoot
  issue="Harness AI Code Review reports no status checks on a pull request even though the pipeline ran successfully"
  mode="fallback-only"
  fallback="A repository with no enabled review criteria produces no checks. Confirm the repository, or a space above it, defines at least one criterion with enabled set to true. Remember that a non-recursive settings read only shows criteria defined at that exact scope."
/>

<Troubleshoot
  issue="No Harness AI Code Review comment appears on the pull request although status checks are reported"
  mode="fallback-only"
  fallback="Comment posting is best effort and never fails the review. It is skipped entirely when the Harness UI base URL is not configured, or when the repository has no linked provider connector. Status checks are unaffected."
/>

<Troubleshoot
  issue="Onboarding a GitHub repository fails because the repository identifier is missing the provider owner"
  mode="fallback-only"
  fallback="An account-level connector requires the full provider path in owner/repo form for each repository. A bare name produces an ownerless URL that GitHub returns as not found. Supply owner/repo, or use a repository-level connector and leave the identifier empty."
/>

<Troubleshoot
  issue="Harness AI Code Review status checks disappear from a pull request after a force push"
  mode="fallback-only"
  fallback="Results are recorded against a specific head commit. A force push moves the head past the reviewed commit, so the earlier results no longer apply and are not shown. The next review run reports against the new head commit."
/>

---

## Next steps

- [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria): Tell the agent what to check.
- [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance): Apply one standard across many repositories.
- [Review a pull request end to end](/docs/ai-code-review/workflows/review-a-pull-request-end-to-end): Follow a single change through a full review.
