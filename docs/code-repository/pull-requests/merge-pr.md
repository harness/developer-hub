---
title: Merge PRs
description: Merge PRs in Harness Code
sidebar_position: 30
---

After [reviewing a PR](./review-pr.md), you can merge it and commit the changes to your base branch.

## Merge a pull request

To merge a PR, you must be the PR owner, a user with sufficient permissions in the Harness project, or designated in the **Bypass List** in the repository's [protection rules](../config-repos/protection-rules.md).

1. In Harness Code, go to the repository where you need to merge a pull request.
2. Go to **Pull Requests**, and select the PR you need to merge.
3. If the [merge requirements](#merge-requirements) have passed, select a merge strategy to merge the PR:

   * **Squash and merge:** All commits from the source branch are combined into one commit in the base branch.
   * **Merge pull request:** All commits from the source branch are added to the base branch via a merge commit.
   * **Rebase and merge:** All commits from the source branch are rebased and added to the base branch.

   **Squash and merge** is the default strategy. To select another strategy, select the dropdown next to **Squash and merge**, and then select your preferred strategy. Available strategies depend on your branch history and the repository's [protection rules for merges](#protection-rules-for-merges).

### Merge strategies

Merge strategies define how changes from the source branch are integrated to the base branch. Available strategies depend on your branch history and the repository's [protection rules for merges](#protection-rules-for-merges). Harness Code offers three merge strategies:

* **Squash and merge:** Combine all commits from the source branch into a single commit, or *squash commit*, on the base branch. This strategy is best if you want to maintain a linear project history. From a project standpoint, a squash commit represents a single, meaningful commit on the base branch. The squash commit preserves the context of all changes through PR comments, discussions, and the metadata stored within the commit itself. However, the drawback is that you lose some granular commit-by-commit metadata that you would retain with other merge strategies.
* **Merge pull request:** Incorporate all commits from the source branch into the base branch through a merge commit. In Harness Code, the merge commit captures a snapshot of the codebase after merging the source branch into the base branch. This strategy preserves a detailed history of changes, and this record remains accessible for future reference through the merge commit.
* **Rebase and merge:** With the **Rebase and merge** strategy, all commits in the source branch are rebased before being incorporated into the base branch. This strategy alters the commit history in order to provide a linear sequence of commits on the base branch. This strategy provides a chronological and streamlined history of events while retaining individual commit messages and contributions.

### Revert a merged PR

You can't automatically revert Harness Code PRs after they are merged.

If you need to undo a merged PR, you can manually undo the changes in a new branch or [clone the repo](../work-in-repos/clone-repos.md) and use command line Git or another local Git tool to revert the PR's commits to the base branch.

## Merge requirements

Merge requirements help prevent unapproved, inadequate, or erroneous code from being merged to your base branch (and potentially deployed to users). Merge requirements can include:

* **Merge conflicts:** Harness Code automatically checks for potential merge conflicts in PRs. If conflicts are found, merging is blocked until you resolve the conflicts. You need to [clone the repo](../work-in-repos/clone-repos.md) and use a local Git tool to investigate and resolve merge conflicts.
* **Status checks:** When viewing a PR, the **Checks** tab shows the results of status checks for the PR, if any are configured. Depending on the repository's [protection rules](../config-repos/protection-rules.md), passing status checks might be required to merge the PR. <!-- how do you configure them? -->
* [**Protection rules for PR reviews.**](./review-pr.md#protection-rules-for-pr-reviews)
* [**Protection rules for merges.**](#protection-rules-for-merges)

### Protection rules for merges

The following table describes some [branch protection rules](../config-repos/protection-rules.md) that are useful for controlling merges.

| Rule | Description |
| ---- | ------------------------ |
| **Require a minimum number of reviewers** | Specify the minimum number of reviewers required to merge a PR. |
| **Require review from code owners** | Designate code owners and require a code owner review before merging a PR. This rule requires a `CODEOWNERS` file in your branches. If there is no `CODEOWNERS` file, Harness can't enforce the rule. |
| **Require approval of new changes** | If a PR is changed after someone has approved it, the PR must be re-approved. |
| **Require comment resolution** | Require all comments on a PR to be resolved before merging. |
| **Require status checks to pass** | Specify status checks that must pass in order to merge PRs. |
| **Limit merge strategies** | Specify allowed [merge strategies](#merge-strategies). |
| **Auto delete branch on merge** | Upon merge, the PR branch is automatically deleted. This helps with branch cleanup. |
| **Block merge without pull request** | This rule prevents users from committing directly to branches. All commits must go through PRs. This rule doesn't block users in the **Bypass List**. |

