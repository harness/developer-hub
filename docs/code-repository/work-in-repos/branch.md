---
title: Branch
sidebar_label: Branch
description: Create, switch, compare, protect, and delete branches in Harness Code repositories.
keywords:
  - branch
  - remote branch
  - branch protection
  - delete branch
tags:
  - code-repository
  - work-in-repos
sidebar_position: 20
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

With Harness Code Repository, you can manage branches directly in the Harness UI, or [clone your repository](/docs/code-repository/work-in-repos/clone-repos) and manage branches from your local machine.

The branches you see in Harness Code are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches). If you clone your repository and create a branch locally, you must publish that branch to the remote before you can work with it in Harness Code.

This page covers branch operations in the Harness UI. For branch operations through command line Git, an IDE, or another local tool, go to the documentation for that tool.

---

## Before you begin

- **Repository permissions:** You need **Push** on the repository to create or delete branches, and **View** to browse them. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the permission list.
- **Branch rules:** Branch rules can block branch creation, deletion, and force pushes. Go to [Rules](/docs/code-repository/config-repos/rules) to review the rules that apply to your repository.

---

## Work with branches

### Create a branch

To create a branch in the Harness UI, do the following:

1. When viewing a repository in Harness Code, go to **Branches**, then select **Create Branch**.
2. Enter a branch **Name**.
3. Select the branch or tag to base the new branch on.
4. Select **Create Branch**.
5. In **Summary**, **Files**, **Commits**, or **Branches**, select your new branch to start working in it. You can work directly in the Harness UI, or [clone your repository](/docs/code-repository/work-in-repos/clone-repos) to work locally.

### Switch branches

Most repository pages open on the default branch. You can switch branches in several ways:

- Go to **Summary**, select the current branch name, then select a branch from the dropdown.
- Go to **Files**, select the current branch name, then select a branch from the dropdown.
- Go to **Commits**, select the current branch name, then select a branch from the dropdown.
- Go to **Branches**, then select a branch from the list.

### Compare branches to create a pull request

To compare two branches, [create a pull request](/docs/code-repository/pull-requests/create-pr). The pull request view shows the diff between the source and target branches.

Go to [Pull requests](/docs/category/pull-requests) to create and manage pull requests.

### Delete a branch

Harness Code does not delete branches automatically when you [merge a pull request](/docs/code-repository/pull-requests/merge-pr). Clean up branches periodically, but confirm that a branch is not active or holding work in progress before you remove it.

:::warning

You cannot recover a branch deleted directly in Harness Code, because these are your [remote branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches).

To delete a branch you cloned to your local machine, use command line Git, an IDE, or another tool that manages local branches.

:::

To delete a branch, do the following:

1. When viewing a repository in Harness Code, go to **Branches**.
2. Select **More options** (&vellip;) next to the branch you want to delete, then select **Delete**.

:::tip

You can enable the **Auto delete branch on merge** branch rule to delete branches automatically when pull requests merge. Go to [Rules](/docs/code-repository/config-repos/rules#available-branch-rules) to configure it.

:::

---

## Protect a branch

Branch rules control who can create, update, and delete a branch, and what must happen before a pull request merges into it. Go to [Rules](/docs/code-repository/config-repos/rules#branch-rules) to configure branch protection.

---

## Troubleshooting

<Troubleshoot
  issue="Creating a branch in Harness Code Repository is blocked or the Create Branch option is unavailable"
  mode="docs"
  fallback="A branch rule with Block branch creation may cover the branch name pattern, or your role may lack Push on the repository. Check the Rules tab and your assigned permissions."
/>

<Troubleshoot
  issue="A branch created locally does not appear in the Harness Code Repository branch list"
  mode="docs"
  fallback="Local branches are not visible until published. Run git push -u origin BRANCH_NAME to publish the branch to the remote."
/>

<Troubleshoot
  issue="Deleting a branch in Harness Code Repository is rejected"
  mode="docs"
  fallback="A branch rule with Block branch deletion may cover the branch pattern. Check the Rules tab, or ask to be added to the rule bypass list."
/>

---

## Next steps

You can create, switch between, compare, and remove branches, and you know which of those actions are irreversible.

- [Commit](/docs/code-repository/work-in-repos/commit): Commit changes to your branch.
- [Create a pull request](/docs/code-repository/pull-requests/create-pr): Propose merging your branch.
- [Rules](/docs/code-repository/config-repos/rules): Protect branches with rules and required reviews.
