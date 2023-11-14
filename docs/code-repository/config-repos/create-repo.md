---
title: Create repositories
description: Create repositories in Harness Code
sidebar_position: 10
---

Repositories are where your code is stored. When developers make changes to code in a Harness Code repository, those changes are tracked with version control. Harness Code fosters collaboration and governance with code reviews, approvals, status checks, and more.

You can create repositories directly in Harness Code or [import repositories](./import-repo.md) from other Git SCM providers.

## Create a repository

1. Go to the Harness project where you want to create a repo.
2. Go to the **Code** module and select **New Repository**.
3. Enter a repository **Name** and optional **Description**.
4. Harness Code repositories are initialized with a `main` branch, unless you specify a different name for the base branch. To change the base branch name, select `main` and enter a name for the base branch.
5. Select your preference for visibility (**Public** or **Private**).
6. Optionally, you can add a **License**, **.gitignore**, or **README** file to your repository.
7. Select **Create Repository**.

## Work with repositories

After creating a repository, you can:

* [Clone your repository.](../work-in-repos/clone-repos.md)
* [Create a branch](../work-in-repos/branch.md), [commit changes](../work-in-repos/commit.md), and [open a pull request](/docs/category/pull-requests).
* [Create tags.](../work-in-repos/tag.md)
* [Configure branch rules.](./rules.md)
* [Configure your pipelines to build, test, and deploy code from your Harness Code repositories.](../pipelines/codebase-from-harness-code.md)
* [Configure webhooks](./webhooks.md) to get notifications or automatically run pipelines when certain Git events occur.
