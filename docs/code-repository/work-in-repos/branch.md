---
title: Branch
description: Create and manage branches in your Harness Code repositories.
sidebar_position: 20
---

With Harness Code, you can manage branches directly in the Harness Code UI or you can [clone your repo](./clone-repos.md) and manage branches from your local machine.

Branches that you see in Harness Code are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches). If you [clone your repo](./clone-repos.md) and create a branch on your local machine, you must publish your local branch to the remote if you want to work with it in Harness Code.

This topic explains how to work with branches in the Harness Code UI. For information about working with branches through command line Git, an IDE, or another local Git SCM tool, refer to the branch-related documentation for your preferred tool.

## Create a branch

1. In your Harness project, go to the **Code** module, select **Repositories**, and then select your repository.
2. Go to **Branches** and select **New Branch**.
3. Enter a branch **Name**.
4. Select the branch that you want to base your new branch on.
5. Select **Create Branch**.
6. On the list of branches, select your new branch to start working in it. You can work directly in the Harness Code UI or [clone your repo](./clone-repos.md) to work locally.

:::tip

You can also create branches from the **Files** page.

On the repository's **Files** page, select the current branch name, type the name you want to give your new branch, and select **Create branch**.

Make sure the current branch is the branch that you want to base your new branch on.

:::

## Switch branches

When viewing a repository in Harness Code, there are several ways you can switch branches:

* Go to **Branches** and select a branch from the list of branches.
* Go to **Commits**, select the current branch name, and then select a branch from the dropdown menu.
* Go to **Files**, select the current branch name, and then select a branch from the dropdown menu.

## Compare branches (create a PR)

You can [create a pull request (PR)](../pull-requests/create-pr.md) by comparing branches.

1. When viewing a repository in Harness Code, go to **Branches**.
2. On the list of branches, locate the **Compare branch**. This is the branch that you want to merge into your base branch (or another branch).
3. Select **More options** (&vellip;) next to the compare branch, and select **Compare**.
4. Enter a PR **Title** and optional **Description**.
5. Select **Create pull request**.

For more information about creating and managing PRs, go to [pull requests](/docs/category/pull-requests).

## Delete a branch

Branches are not automatically deleted when you [merge PRs](../pull-requests/merge-pr.md) in Harness Code. It is a good idea to clean up branches periodically, but make sure you don't delete any active branches or inactive work-in-progress branches.

:::caution

You can't recover branches deleted directly in Harness Code, as these are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches).

If you want to delete a branch that you cloned to your local machine, use command line Git, and IDE, or another tool to manage your local branches.

:::

1. When viewing a repository in Harness Code, go to **Branches**.
2. On the list of branches, select **More options** (&vellip;) next to the branch you want to delete, and select **Delete**.
