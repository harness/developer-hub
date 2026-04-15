---
title: Auto-merge pull requests
sidebar_label: Auto-Merge PRs
description: Automatically merge pull requests when all merge requirements are met in Harness Code.
sidebar_position: 35
keywords:
  - auto-merge
  - pull request
  - merge automation
  - code repository
tags:
  - code-repository
  - pull-requests
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Auto-merge lets you queue a pull request to merge automatically once all [merge requirements](/docs/code-repository/pull-requests/merge-pr#merge-requirements) are satisfied. This is useful when a PR is ready for integration but is waiting on status checks, required approvals, or other branch rules to pass.

When auto-merge is enabled on a PR, Harness Code monitors its requirements continuously. As soon as every required check passes and all approvals are in place, the PR merges using the strategy you selected, with no manual action needed.

## Prerequisites

- **Auto-merge enabled on the repository:** A repository administrator must turn on the **Allow auto-merge** setting in repository settings before contributors can use auto-merge on individual PRs. Go to [Enable auto-merge for a repository](#enable-auto-merge-for-a-repository) to turn on this setting.
- **Open, non-draft pull request:** Auto-merge is only available on PRs that are open and not in draft state.
- **Pending merge requirements:** The **Enable auto-merge** button appears only when the PR has unmet requirements (status checks running, approvals pending, or branch rule violations) that currently block a direct merge. If the PR is already mergeable, you can [merge it directly](/docs/code-repository/pull-requests/merge-pr).

## Enable auto-merge for a repository

Before contributors can use auto-merge on individual PRs, a repository administrator must enable it at the repository level.

1. In Harness Code, go to the repository where you want to enable auto-merge.
2. Go to **Settings**, and then select the **General** tab.
3. Under **Features**, select the **Allow auto-merge** checkbox.

The setting takes effect immediately. Contributors can now enable auto-merge on individual PRs in this repository.

:::info
Disabling **Allow auto-merge** in repository settings does not cancel auto-merge on pull requests where it is already active. Those PRs continue to merge automatically when their requirements are met. The setting only prevents contributors from enabling auto-merge on new PRs going forward. To stop an in-progress auto-merge, you must [disable it directly on the PR](#disable-auto-merge-on-a-pull-request).
:::

## Enable auto-merge on a pull request

Once auto-merge is enabled at the repository level, contributors can turn it on for individual PRs that have pending merge requirements.

1. In Harness Code, go to **Pull Requests**, and select the PR.
2. In the merge panel at the bottom of the **Conversation** tab, select a merge strategy from the **Enable auto-merge** dropdown:

   - **Squash and merge:** Combines all commits into a single commit on the base branch.
   - **Merge pull request:** Adds all commits to the base branch via a merge commit.
   - **Rebase and merge:** Rebases all commits onto the base branch.
   - **Fast-forward merge:** Moves the base branch pointer forward without creating a merge commit.

   Available strategies depend on the repository's [branch rules](/docs/code-repository/config-repos/rules) and the branch history.

3. For **Squash and merge** or **Merge pull request**, you can optionally customize the commit message and description.
4. Select **Confirm auto-merge**.

The merge panel updates to show that auto-merge is active and displays the selected merge strategy. The PR merges automatically when all requirements are met.

:::tip
If you choose **Squash and merge**, the commit description is pre-populated with a summary of the PR's commits. You can edit this before confirming.
:::

## Disable auto-merge on a pull request

If you change your mind or need to adjust the merge strategy, you can disable auto-merge at any time before the PR is merged.

1. Go to the PR's **Conversation** tab.
2. Select **Disable auto-merge**.

The PR returns to its normal state and will not merge automatically.

## Bypass rules with auto-merge active

If you have bypass permissions and auto-merge is active on a PR, you can choose to bypass branch rules and merge immediately instead of waiting for all requirements.

Select the **Bypass and merge** checkbox in the merge panel. This overrides the auto-merge queue and lets you merge the PR directly, following the standard [merge flow](/docs/code-repository/pull-requests/merge-pr).

## Auto-merge failure

Auto-merge can be automatically disabled if the selected merge strategy is no longer supported by the repository's branch rules. For example, if an administrator removes **Squash and merge** from the allowed strategies after you enabled auto-merge with that method, auto-merge is disabled and a timeline entry appears on the PR:

> disabled auto-merge — squash is no longer a supported merge method

To resolve this, [enable auto-merge again](#enable-auto-merge-on-a-pull-request) with a strategy that is currently allowed.

## Troubleshooting

<Troubleshoot
  issue="Enable auto-merge button does not appear on a Harness Code pull request"
  mode="docs"
  fallback="Verify that Allow auto-merge is enabled in the repository's Settings > General > Features, the PR is open (not draft), and the PR has pending merge requirements that block a direct merge."
/>

<Troubleshoot
  issue="Auto-merge was disabled automatically on a Harness Code pull request"
  mode="docs"
  fallback="The selected merge strategy may no longer be allowed by the repository's branch rules. Re-enable auto-merge with a currently supported strategy."
/>

## Next steps

You've learned how to configure and use auto-merge for pull requests in Harness Code. Auto-merge is especially useful in CI-heavy workflows where PRs frequently wait on pipeline checks before they can be integrated.

- [Merge PRs](/docs/code-repository/pull-requests/merge-pr): Learn about merge strategies and requirements.
- [Branch rules](/docs/code-repository/config-repos/rules): Configure required checks, approvals, and allowed merge strategies.
- [Review PRs](/docs/code-repository/pull-requests/review-pr): Understand the review and approval process.