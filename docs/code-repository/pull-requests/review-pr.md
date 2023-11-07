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

Reviewers can leave feedback, approve, or reject PRs. Users with sufficient permissions in your Harness project (or designated in the **Bypass List** in the repository's [protection rules](../config-repos/protection-rules.md)) can review or merge PRs without being assigned as a reviewer.

1. In Harness Code, go to the repository where you need to review a pull request.
2. Go to **Pull Requests**, and select the PR you need to review.
3. Select each tab to inspect the PR.

   * **Conversation:** Read the PR description and add comments.
   * **Changes:** Review the aggregated, latest code changes in the PR and add line-by-line comments.
      * Select the `+` icon to comment on a single line.
      * Select and drag the `+` icon to comment on multiple lines.
      * Mark files as **Viewed** to collapse the diff. This is useful when reviewing PRs with lots of changed files. If a file is changed after you mark it as viewed, the file is marked as **Change since last viewed**, so you don't have to manually check for changes to viewed files.
      * Harness Code also tracks file deletions and additions. If a file was deleted in a PR, and you marked it as viewed, if that file is later restored in the PR, Harness Code marks the file appropriately so you can review it in its restored state.
   * **Commits:** [Inspect commits](../work-in-repos/commit.md#inspect-a-commit) included in this PR. This is useful if you need to trace the PR's change history across commits.
   * **Checks:** Inspect the results of status checks for the PR. Depending on the repository's [protection rules](../config-repos/protection-rules.md), passing status checks might be required to [merge the PR](./merge-pr.md).

4. Make a decision on the PR:

   * **Approve:** If everything looks good, you can select **Approve** to approve the PR for merge.
   * **Reject:** To request changes, select the dropdown next to **Approve** and select **Request changes**.
   * **Comment:** To leave feedback without a decision, you can add comments on the **Changes** or **Conversation** tab.
   * **Close:** If you have the appropriate permissions, you can [close the PR](./create-pr.md#close-a-pull-request).

## Protection rules for PR reviews

The following table describes some [branch protection rules](../config-repos/protection-rules.md) that are useful for controlling the flow of PR reviews.

| Rule | Description |
| ---- | ----------- |
| **Require a minimum number of reviewers** | Specify the minimum number of reviewers required to merge a PR. |
| **Require review from code owners** | Designate code owners and require a code owner review before merging a PR. This rule requires a `CODEOWNERS` file in your branches. If there is no `CODEOWNERS` file, Harness can't enforce the rule. |
| **Require approval of new changes** | If a PR is changed after someone has approved it, the PR must be re-approved. |
| **Require comment resolution** | Require all PR comments to be resolved before merging. |
| **Require status checks to pass** | Specify status checks that must pass in order to merge PRs. |
| **Block merge without pull request** | This rule prevents users from committing directly to branches. All commits must go through PRs. This rule doesn't block users in the **Bypass List**. |
