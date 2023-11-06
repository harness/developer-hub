---
title: Create repositories
description: Create repositories in Harness Code
sidebar_position: 10
---

Repositories are where your code is stored. When developers make changes to code in a Harness Code repository, those changes are tracked with version control. Harness Code fosters collaboration and governance with code reviews, approvals, status checks, and more.

## Create a repository

1. Go to the Harness project where you want to create a repo.
2. Go to the **Code** module and select **New Repository**.
3. Enter a repository **Name** and optional **Description**.
4. Harness Code repositories are initialized with a `main` branch, unless you specify a different name for the base branch. To change the base branch name, select `main` and enter a name for the base branch.
5. Select your preference for visibility (**Public** or **Private**).
6. Optionally, you can add a **License**, **.gitignore**, or **README** file to your repository.
7. Select **Create Repository**.

After creating a repository, you're you can change the name, description, and visibility on the repository's **Settings** page.

## Import a repository

The ability to import repositories is coming soon. While the Harness Code UI includes options to import repositories, this functionality is not yet fully supported.

## Work with repositories

After creating a repository, you can:

* [Clone your repository.](../work-in-repos/clone-repos.md)
* [Create a branch](../work-in-repos/branch.md), [commit changes](../work-in-repos/commit.md), and [open a pull request](/docs/category/pull-requests).
* [Create tags.](../work-in-repos/tag.md)
* [Configure webhooks to automatically trigger CI/CD pipelines.](../pipelines/webhooks.md)
