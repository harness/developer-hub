---
title: Revert PRs  
description: Revert merged PRs in Harness Code  
sidebar_position: 35  
---

Use the **Revert** button to quickly undo changes introduced by a merged pull request. Harness automatically creates a new branch and helps you open a revert PR with minimal steps.

## Revert a pull request

You can only revert **merged** pull requests.

1. In your repository, go to **Pull Requests**, and select the merged PR you want to revert.
2. Click **Revert**.

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-revert.png')} />
This action does the following:

   - Creates a new branch with the format:  
     `revert-pullreq-{PR Number}`  
   - Navigates you to the **Create pull request** page, pre-filling the revert changes.

:::note
If a branch with the name `revert-pullreq-{PR Number}` already exists, Harness skips creating a new branch and takes you directly to the **Create pull request** page.
:::

## Restore branch

If the branch of the original PR was deleted after merging, you can also choose **Restore Branch** to bring it back.
