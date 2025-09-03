---
title: Branch
description: Create and manage branches in your Harness Code repositories.
sidebar_position: 20
---

With Harness Code, you can manage branches directly in the Harness Code UI or you can [clone your repo](./clone-repos.md) and manage branches from your local machine.

Branches that you see in Harness Code are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches). If you [clone your repo](./clone-repos.md) and create a branch on your local machine, you must publish your local branch to the remote if you want to work with it in Harness Code.

This topic explains how to work with branches in the Harness Code UI. For information about working with branches through command line Git, an IDE, or another local Git tool, refer to the branch-related documentation for your preferred tool.

## Create a branch

1. When viewing a repository in Harness Code, go to **Branches** and select **+ Create Branch**.
2. Enter a branch **Name**.
3. Select the branch or tag that you want to base your new branch on.
4. Select **Create Branch**.
5. In **Summary**, **Files**, **Commits**, or **Branches**, select your new branch to start working in it. You can work directly in the Harness Code UI or [clone your repo](/docs/code-repository/work-in-repos/clone-repos) to work locally.

## Protect a branch

For information about branch rules, go to [Enable branch rules](../config-repos/rules.md).

## Switch branches

When viewing a repository in Harness Code, most pages initially show the default branch. There are several ways you can switch branches:

* Go to **Summary**, select the current branch name, and then select a branch from the dropdown menu.
* Go to **Files**, select the current branch name, and then select a branch from the dropdown menu.
* Go to **Commits**, select the current branch name, and then select a branch from the dropdown menu.
* Go to **Branches** and select a branch from the list of branches.

## Compare branches (create a PR)

You can [create a pull request (PR)](/docs/code-repository/pull-requests/create-pr) to compare branches.

For more information about creating and managing PRs, go to [pull requests](/docs/category/pull-requests).

## Delete a branch

By default, branches are not automatically deleted when you [merge PRs](../pull-requests/merge-pr.md) in Harness Code. It is a good idea to clean up branches periodically, but make sure you don't delete any active branches or inactive work-in-progress branches.

:::warning

You can't recover branches that are deleted directly in Harness Code because these are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches).

If you want to delete a branch that you cloned to your local machine, use command line Git, and IDE, or another tool to manage your local branches.

:::

1. When viewing a repository in Harness Code, go to **Branches**.
2. Select **More options** (&vellip;) next to the branch you want to delete, and select **Delete**.

:::tip

You can [enable branch rules](../config-repos/rules.md) to automatically delete branches when PRs are merged.

:::