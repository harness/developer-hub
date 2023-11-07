---
title: Merge PRs
description: Merge PRs in Harness Code
sidebar_position: 30
---

<!-- How to merge (CLI/GUI), merge strategies, merge requirements, status checks, branch protections -->

* Cant revert.
* Branch not auto-deleted unless rule enabled.
* Conflicts - Block merge but you must use other tools/CLI Git to inspect and resolve MCs.
* Rebase/update from main - Can create a PR to merge main into another branch or use CLI Git/other tools to rebase.




## Merge pull requests

Gitness automatically checks for potential merge conflicts in PRs. If conflicts are found, merging is blocked until you resolve the conflicts.

If all checks have passed, you can select a merge strategy:

- **Squash and merge**: All commits from the source branch are combined into one commit in the base branch.
- **Merge pull request**: All commits from the source branch are added to the base branch via a merge commit.
- **Rebase and merge**: All commits from the source branch are rebased and added to the base branch.

**Squash and merge** is the default strategy. To select another strategy, select the dropdown next to **Squash and merge**.

<details>
<summary>Learn more about merge strategies</summary>

Merge strategies define how changes from the source branch are integrated to the base branch. Depending on your branch history, some strategies might be unavailable. Also, your team or organization might have a preferred or required strategy. Gitness offers three merge strategies:

* **Squash and merge**: The **Squash and merge** strategy combines all commits from the source branch into a single commit, or *squash commit*, on the base branch. This strategy is best if you want to maintain a linear project history. From a project standpoint, a squash commit represents a single, meaningful commit on the base branch. The squash commit preserves the context of all changes through PR comments, discussions, and the metadata stored within the commit itself. However, the drawback is that you lose some granular commit-by-commit metadata that you would retain with other merge strategies.

* **Merge pull request**: The **Merge pull request** strategy incorporates all commits from the source branch into the base branch through a merge commit. In Gitness, the merge commit captures a snapshot of the codebase after merging the source branch into the base branch. This strategy preserves a detailed history of changes, and this record remains accessible for future reference through the merge commit.

* **Rebase and merge**: With the **Rebase and merge** strategy, all commits in the source branch are rebased before being incorporated into the base branch. This strategy alters the commit history in order to provide a linear sequence of commits on the base branch. This strategy provides a chronological and streamlined history of events while retaining individual commit messages and contributions.

</details>


## Close pull requests

1. In your repository, go to **Pull Requests** and select the PR you want to close.
2. Select the dropdown next to **Squash and merge**, and select **Close pull request**.
3. Select **Close pull request** again to confirm the closure.

   To reopen the PR, select **Open for review**.
