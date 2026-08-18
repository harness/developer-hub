---
title: GitHub integration
sidebar_label: Integration
description: How Harness connects to a GitHub repository for AI Code Review, and what each connector type requires.
sidebar_position: 10
keywords:
  - ai code review
  - github
  - connector
  - linked repository
tags:
  - ai-code-review
  - platforms
  - github
---

AI Code Review does not review a GitHub repository in place. Harness creates a linked repository that mirrors it and runs the review there, reporting results back to the GitHub pull request.

This page covers what that link requires and how to maintain it. Go to [Get started with AI Code Review](/docs/ai-code-review/get-started) for the onboarding steps.

---

## What you will learn from this topic
- Why a GitHub repository is linked rather than reviewed directly.
- What an account-level connector requires that a repository-level connector does not.
- What happens while a newly linked repository imports.

---

## The linked repository model

When you onboard a GitHub repository, Harness creates a linked Harness Code repository backed by your connector. The review pipeline clones that linked repository, and the pull request trigger is a Harness webhook trigger on the Harness side rather than a GitHub-native one.

Two consequences follow:

- **Onboarding is not instant.** Harness waits for the initial import to complete before registering the trigger, because webhook registration is rejected while a repository is still importing. Large repositories take longer.
- **The connector is load bearing after onboarding.** It keeps the linked repository in sync, so revoking or breaking it stops reviews rather than only affecting the initial import.

---

## Which connector to use

AI Code Review uses **standard Harness GitHub connectors**. There is no separate AI Code Review GitHub App to install, and most teams already have a connector that works.

| Property | Supported |
| --- | --- |
| Authentication | Any type the Harness GitHub connector supports, including personal access token and OAuth |
| GitHub Cloud | Supported |
| GitHub Enterprise Server | Supported, on the same connector model |

---

## Connector scope

| Connector scope | Repository identifier | Notes |
| --- | --- | --- |
| Account-level | Required, in `owner/repo` form | One connector covers many repositories |
| Repository-level | Must be empty | The connector is already scoped to one repository |

:::warning Account-level connectors need the full provider path

With an account-level connector, supplying a bare repository name is the common failure. Harness attempts to recover the owner from the repository path, and when it cannot, onboarding fails with an error naming both the identifier and the path.

Without the owner the link points at an ownerless URL, which GitHub returns as not found during import or sync. Always supply `owner/repo`.

:::

---

## Change the connector

Re-run onboarding with a different `connector_ref`. Harness updates both the linked repository and the trigger, so a connector can be rotated without removing and re-adding the repository.

Omitting the repository identifier on a re-run leaves the stored provider path unchanged rather than clearing it, so you do not have to restate `owner/repo` every time.

---

## Permissions the agent uses

The review agent runs as a Harness service account with four permissions, and push is not among them. It cannot commit to your branches.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review the service account, its role, and the long-lived token onboarding creates.

---

## Remove a repository

Offboarding removes the pull request trigger and disables review on the repository. The linked repository and its connector metadata remain, as does the AI Code Review setting and its criteria.

If you onboarded at an organization or account scope, triggers were created in every project under that scope, and offboarding removes only the one in the repository's own project.

---

## Related concepts

- [GitHub results, comments, and checks](/docs/ai-code-review/platforms/github/results-comments-and-checks): What appears on a reviewed pull request.
- [Get started with AI Code Review](/docs/ai-code-review/get-started): Onboard a repository.
- [What is supported](/docs/ai-code-review/whats-supported): Platform support and known boundaries.
