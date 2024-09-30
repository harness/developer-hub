---
title: Create repositories
description: Create repositories in Harness Code
sidebar_position: 10
canonical_url: https://www.harness.io/harness-devops-academy/what-is-a-code-repository
---

Repositories are where your code is stored. When developers make changes to code in a Harness Code repository, those changes are tracked with version control. Harness Code fosters collaboration and governance with code reviews, approvals, status checks, and more.

You can create repositories directly in Harness Code or [import repositories](./import-repo.md) from other Git SCM providers.

## Create a repository

1. In the Harness Code module, make sure you are at the [scope](/docs/platform/role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes) where you want to create the repository.

   You can create repos at the account, organization, or project scope. For example, a repo created at the account scope is available to the entire account, whereas a repo created at the project scope is limited to that project.

2. Select **Repositories**, and then select **New Repository**.
3. Enter a repository **Name** and optional **Description**.

   Repository names can't contain the following strings:

   ```
   account.
   org.
   project.
   .git
   ```

4. Harness Code repositories are initialized with a `main` branch, unless you specify a different name for the base branch. To change the base branch name, select `main` and enter a name for the base branch.
5. Select your preference for visibility (**Public** or **Private**).
6. Optionally, you can add a **License**, **.gitignore**, or **README** file to your repository.
7. Select **Create Repository**.

## Work with repositories

After creating a repository, you can:

* [Clone your repository.](../work-in-repos/clone-repos.md)
* Create [branches](../work-in-repos/branch.md) and [tags](../work-in-repos/tag.md).
* [Commit changes](../work-in-repos/commit.md) and [open pull requests](/docs/category/pull-requests).
* [Configure branch rules](./rules.md) and [access control](/docs/code-repository/get-started/onboarding-guide.md#manage-access).
* Use Harness Code repositories in your [Harness pipelines](../pipelines/codebase-from-harness-code.md).
* Set up [triggers](../pipelines/code-triggers.md) to automatically run pipelines based on activity in your Harness Code repositories.
* [Configure webhooks](./webhooks.md) to integrate your repositories with third-party applications.