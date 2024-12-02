---
title: Merge PRs
description: Merge PRs in Harness Code
sidebar_position: 30
---

After [reviewing a PR](./review-pr.md), you can merge it and commit the changes to your base branch.

## Merge a pull request

1. In Harness Code, go to the repository where you need to merge a pull request.
2. Go to **Pull Requests**, and select the PR you need to merge.
3. If the [merge requirements](#merge-requirements) have passed, select a merge strategy to merge the PR:

   * **Squash and merge:** All commits from the source branch are combined into one commit in the base branch.
   * **Merge pull request:** All commits from the source branch are added to the base branch via a merge commit.
   * **Rebase and merge:** All commits from the source branch are rebased and added to the base branch.
   * **Fast-forward merge** Moves the base branch pointer to the latest commit of the source branch without creating a merge commit. 

   **Squash and merge** is the default strategy. To select another strategy, select the dropdown next to **Squash and merge**, and then select your preferred strategy. Available strategies depend on your branch history and the repository's [branch rules](../config-repos/rules.md).

### Rebase a PR

If the base branch has diverged from the source branch, you may want to rebase the PR before merging to ensure a clean integration of changes. You can do this by selecting the **Rebase** option in the 'more actions' menu of the PR before proceeding with the merge. Rebase is optional for all merge strategies but may be required for Fast-forward merges when the base branch has diverged from the source branch. 

:::info Note

* Merge conflicts will need to be resolved locally on the client before rebasing.
* Rebase is not possible if force-push is disabled on the source branch in repository branch rules.

:::

### Merge strategies

Merge strategies define how changes from the source branch are integrated to the base branch. Available strategies depend on your branch history and the repository's [branch rules](../config-repos/rules.md). Harness Code offers three merge strategies:

* **Squash and merge:** Combine all commits from the source branch into a single commit, or *squash commit*, on the base branch. This strategy is best if you want to maintain a linear project history. From a project standpoint, a squash commit represents a single, meaningful commit on the base branch. The squash commit preserves the context of all changes through PR comments, discussions, and the metadata stored within the commit itself. However, the drawback is that you lose some granular commit-by-commit metadata that you would retain with other merge strategies.
* **Merge pull request:** Incorporate all commits from the source branch into the base branch through a merge commit. In Harness Code, the merge commit captures a snapshot of the codebase after merging the source branch into the base branch. This strategy preserves a detailed history of changes, and this record remains accessible for future reference through the merge commit.
* **Rebase and merge:** With the **Rebase and merge** strategy, all commits in the source branch are rebased before being incorporated into the base branch. This strategy alters the commit history in order to provide a linear sequence of commits on the base branch. This strategy provides a chronological and streamlined history of events while retaining individual commit messages and contributions.
* **Fast-forward merge** Moves the base branch pointer to the latest commit of the source branch without creating a merge commit. This strategy is useful when the base branch has not diverged from the source branch, allowing for a clean and straightforward integration of changes. If the base branch has diverged from the source branch, a fast-forward merge is not possible until the source has been rebased.

### Revert a merged PR

You can't automatically revert Harness Code PRs after they are merged.

If you need to undo a merged PR, you can manually undo the changes in a new branch or [clone the repo](../work-in-repos/clone-repos.md) and use command line Git or another local Git tool to revert the PR's commits to the base branch.

## Merge requirements

Merge requirements help prevent unapproved, inadequate, or erroneous code from being merged to your base branch (and potentially deployed to users). Merge requirements can include:

* **Merge conflicts:** Harness Code automatically checks for potential merge conflicts in PRs. If conflicts are found, merging is blocked until you resolve the conflicts. You need to [clone the repo](../work-in-repos/clone-repos.md) and use a local Git tool to investigate and resolve merge conflicts.
* **Status checks:** When viewing a PR, the **Checks** tab shows the results of status checks for the PR, if any are configured.
   * Harness pipelines [triggered](../pipelines/code-triggers.md) by PR creation or updates automatically report the pipeline run status and other execution details on the PR.
   * Status checks can also be reported by [custom webhooks](../config-repos/webhooks.md).
   * Depending on the repository's [branch rules](../config-repos/rules.md), passing status checks might be required to merge the PR.
* [**Branch rules**](../config-repos/rules.md)
