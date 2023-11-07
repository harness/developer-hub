---
title: Review PRs
description: Review PRs in Harness Code
sidebar_position: 20
---

<!-- how to review (GUI), add reviewers, code owners files, conduct reviews (comments/line-by-line comments/request changes), status checks (separate page) -->


## Request reviews

To request a reviews from other users in your Gitness instance:

1. In your repository, go to **Pull Requests** and select your PR.
2. On the **Conversation** tab, in the **Reviewers** section, select **Add**.
3. Select the user that you want to assign as a reviewer.

   To review PRs, the user must be a [project member](/docs/administration/project-management.md).

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

## Reject (close) a PR

1. In your repository, go to **Pull Requests** and select the PR you want to close.
2. Select the dropdown next to **Squash and merge**, and select **Close pull request**.
3. Select **Close pull request** again to confirm the closure.

   To reopen the PR, select **Open for review**.
