---
title: GitHub sign-in and redirects
sidebar_label: Sign-In & Redirects
description: Where the AI Code Review results link sends a GitHub user, and what it requires.
sidebar_position: 30
keywords:
  - ai code review
  - github
  - sign in
  - redirect
tags:
  - ai-code-review
  - platforms
  - github
---

Most people meet AI Code Review on a GitHub pull request rather than in the Harness navigation. This page explains where the link in that comment goes and what it requires.

---

## What you will learn from this topic
- What the results link points at.
- What a GitHub user needs in order to open it.
- What is readable without leaving GitHub.

---

## The results link

Every AI Code Review comment ends with a `View results →` link. It points at the AI Code Review page for that pull request in the Harness UI:

```text
<harness-base-url>/ng/account/<account>/all/orgs/<org>/projects/<project>/ai-code-review/pull-requests/<repository>/<pr-number>
```

The account, organization, and project come from the repository path in Harness, and the repository segment is the repository name. Each pull request has its own stable URL, so the link can be shared.

---

## What the link requires

The destination is the Harness UI, so it requires a Harness session with access to that project. A GitHub user who is not a Harness user, or who is signed in to a different account, does not see the results page.

There is no unauthenticated view of the full review.

:::info There is no GitHub sign-in path

AI Code Review does not provide a GitHub-style authentication flow, and no Harness account is created for a reviewer who follows the link without one. Reviewers who need the full detail need a Harness account with access to the project.

:::

---

## What is readable without leaving GitHub

A reviewer who cannot open the Harness UI still sees enough to act:

- **The comment itself**, including whether the review is running or complete, and the overall risk level.
- **The status checks**, one per criterion, with a pass, fail, or error state and a summary.

What requires Harness is the full written overview and the per-criterion detail behind each check.

For a team where most reviewers are GitHub-only, write criterion titles and summaries that stand on their own, because for those reviewers the check name may be all they read.

---

## Related concepts

- [GitHub results, comments, and checks](/docs/ai-code-review/platforms/github/results-comments-and-checks): Exactly what is posted to a pull request.
- [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac): What a person needs in order to view results.
- [GitHub integration](/docs/ai-code-review/platforms/github/github-integration): How the repository is connected.
