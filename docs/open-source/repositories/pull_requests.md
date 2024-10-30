---
sidebar_position: 2
---

# Pull requests

Pull requests foster collaboration within your team, ensuring code changes go through required reviews, approvals, and checks before being merged to the base branch.

## Create pull requests

1. In your repository, go to **Pull Requests** and select **New Pull Request**.
2. Select the base branch and the branch you want to merge into the base branch.
3. You can edit the **Title** and enter a **Description**.
4. Select **Create pull request** to submit your PR for review.

   To save your PR as a draft, select the dropdown next to **Create pull request**, and then select **Create draft pull request**.

:::tip

You can also create a PR by comparing branches. In your repository, go to **Branches**, locate the branch that you want to compare against the base branch, select **More options** (&vellip;), and then select **Compare**.

:::

## Request reviews

To request a reviews from other users in your Gitness instance:

1. In your repository, go to **Pull Requests** and select your PR.
2. On the **Conversation** tab, in the **Reviewers** section, select **Add**.
3. Select the user that you want to assign as a reviewer.

   To review PRs, the user must be a [project member](/docs/open-source/administration/project-management.md).

   To remove a reviewer, select **More options** (&vellip;) next to the reviewer's name, and then select **Remove**.

:::tip

When reviewers leave comments on your PR, you can reply and resolve comments on either the **Conversation** or **Changes** tabs.

:::

## Submit reviews

Reviewers can leave feedback, approve, or reject PRs. Anyone with sufficient permission in the project can review PRs without being assigned as a reviewer.

1. In your repository, go to **Pull Requests** and select the PR you need to review.
2. On the **Conversation** tab, you can read the PR description and add comments.
3. On the **Changes** tab, you can review the code changes and add line-by-line comments.

   Select the `+` icon to comment on a single line.

   Select and drag the `+` icon to comment on multiple lines.

4. If everything looks good, you can select **Approve** to approve the PR for merge.

   To request changes, select the dropdown next to **Approve** and select **Request changes**.

   To leave feedback without a decision, you can add comments on the **Changes** or **Conversation** tab.

:::tip

On a PR's **Changes** tab, you can mark files as **Viewed** to collapse the diff. This is useful when reviewing PRs with lots of changed files.

If a file is changed after you mark it as viewed, the file is marked as **Change since last viewed**, so you don't have to manually check for changes to viewed files.

Gitness also tracks file deletions and additions. Assume that a file was deleted in a PR, and you marked it as viewed. If that file is later restored in the PR, Gitness marks the file appropriately so you can review it in its restored state.

:::

## Status checks

A status check appears for each [pipeline](../pipelines/overview) configured in your repository. A failing pipeline results in a failing status check.

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
