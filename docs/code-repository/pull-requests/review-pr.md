---
title: Review PRs
description: Review PRs in Harness Code
sidebar_position: 20
---

After [creating a PR](./create-pr.md), you can request review from one or more reviewers within your organization. Once approved by the reviewers, you can [merge the PR](./merge-pr.md).

## Assign reviewers

To request PR reviews from other users in your Harness project.

1. In your repository, go to **Pull Requests**, and select your PR.
2. On the **Conversation** tab, in the **Reviewers** section, select **Add**.
3. Select the user that you want to assign as a reviewer.

   To remove a reviewer, select **More options** (&vellip;) next to the reviewer's name, and then select **Remove**.

:::tip

When reviewers leave comments on your PR, you can reply and resolve comments on either the **Conversation** or **Changes** tabs.

:::

## Submit reviews

When you review a PR, you can leave feedback, request changes, or approve the PR.

1. In Harness Code, go to the repository where you need to review a pull request.
2. Go to **Pull Requests**, and select the PR you need to review.
3. Select each tab to inspect the PR.

   * **Conversation:** Read the PR description, comment history (including code comments), commit activity, and all other activity on the PR.
   * **Changes:** Review the aggregated, latest code changes in the PR and add line-by-line comments. Select the `+` icon to comment on a specific line.
      * Mark files as **Viewed** to collapse the diff. This is useful when reviewing PRs with lots of changed files. If a file is changed after you mark it as viewed, the file is marked as **Change since last viewed**, so you don't have to manually check for changes to viewed files.
      * Harness Code also tracks file deletions and additions. If a file was deleted in a PR, and you marked it as viewed, if that file is later restored in the PR, Harness Code marks the file appropriately so you can review it in its restored state.
   * **Commits:** [Inspect commits](../work-in-repos/commit.md#inspect-a-commit) included in this PR. This is useful if you need to trace the PR's change history across commits.
   * **Checks:** Inspect the results of status checks for the PR.
      * Harness pipelines [triggered](../pipelines/code-triggers.md) by PR creation or updates automatically report the pipeline run status on the PR.
      * Status checks can also be reported by [custom webhooks](../config-repos/webhooks.md).
      * Depending on the repository's [branch rules](../config-repos/rules.md), passing status checks might be required to [merge the PR](./merge-pr.md).

4. Make a decision on the PR:

   * **Approve:** If everything looks good, you can select **Approve** to approve the PR for merge.
   * **Request changes:** To request changes, select the dropdown next to **Approve** and select **Request changes**.
