---
title: Review PRs
description: Review PRs in Harness Code
sidebar_position: 20
---

After [creating a PR](./create-pr.md), you can request review from one or more reviewers within your organization. Once approved by the reviewers, you can [merge the PR](./merge-pr.md).

## Assign reviewers

To request PR reviews from other users in your Harness project.

1. In your repository, go to **Pull Requests**, and select your PR.
2. On the **Conversation** tab, in the **Reviewers** section, select **More Options**x`` (&vellip;).
3. Select the user that you want to assign as a reviewer.

   To remove a reviewer, select **More options** (&vellip;) next to the reviewer's name, and then select **Remove**.

:::tip

When reviewers leave comments on your PR, you can reply and resolve comments on either the **Conversation** or **Changes** tabs.

:::

## Submit reviews

When you review a PR, you can leave feedback, request changes, or approve the PR.

1. In Harness Code, go to the repository where you need to review a pull request.
2. Go to **Pull Requests**, and select the PR you need to review.

   If you need to review multiple PRs, you can right-click and open the PRs in separate windows or tabs.

3. Select each tab on the PR to inspect the reviews, comments, code changes, commit history, PR check, and other details.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="conversation" label="Conversation" default>

On the **Conversation** tab, you can read the PR description, comment history (including code comments), commit activity, and all other activity on the PR.

You can add images and videos to your PR comments. Videos must be 10MB or less. Harness Code supports and tests the following video file formats: `.3gpp`, `.avi`, `.flv`, `.mkv`, `.mov`, `.mp4`, and `.webm`. Other formats might work, but support isn't guaranteed.

If you need to share a comment with someone else, you can copy the PR comment's direct link.

</TabItem>
<TabItem value="changes" label="Changes">

On the **Changes** tab, you can review the aggregated, latest code changes in the PR and add line-by-line comments.

* Select the `+` **Add** icon to comment on a specific line.

* Select the **Expand All** icon view an entire file within the Changes context.

* Select **Viewed** to mark a file as viewed and collapse the diff for that file.

   This setting persists across sessions and machines. Files marked as viewed remain viewed/collapsed even if you open the PR on a different machine, browser, or refreshed/new browser session.

   If a file changes after you mark it as viewed, the file is marked as **Change since last viewed**, so you don't have to manually check for changes to viewed files.

   Harness Code also tracks file deletions and additions. For example, assume a file was deleted in a PR, and you marked the deletion as viewed. If, later in the PR's lifespan, the file is restored, Harness Code marks the restored file appropriately so you can review it in its restored state.

</TabItem>
<TabItem value="commits" label="Commits">

On the **Commits** tab, you can [inspect commits](../work-in-repos/commit.md#inspect-a-commit) included in the PR. This is useful if you need to trace the PR's change history across commits.

</TabItem>
<TabItem value="checks" label="Checks">

On the **Checks** tab, you can inspect the results of PR status checks.

Harness pipelines [triggered](../pipelines/code-triggers.md) by PR creation or updates automatically report the pipeline run status and other execution details on the PR.

Status checks can also be reported by [custom webhooks](../config-repos/webhooks.md).

Depending on the repository's [branch rules](../config-repos/rules.md), passing status checks might be required to [merge the PR](./merge-pr.md).

</TabItem>
</Tabs>

---
4. If everything looks good, select **Approve** to approve the PR for merge. To request changes, select the dropdown next to **Approve** and select **Request changes**.
