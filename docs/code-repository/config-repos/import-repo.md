---
title: Import repositories
description: Import repositories in Harness Code
sidebar_position: 20
---

Repositories are where your code is stored. When developers make changes to code in a Harness Code repository, those changes are tracked with version control. Harness Code fosters collaboration and governance with code reviews, approvals, status checks, and more.

You can [create repositories directly in Harness Code](./create-repo.md) or import repositories from other Git SCM providers, such as GitHub, GitLab, BitBucket, and more.

## Import repositories

1. In the Harness Code module, make sure you are at the [scope](/docs/platform/role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes) where you want to import repositories.

   You can import repos at the account, organization, or project scope. For example, a repo imported at the account scope is available to the entire account, whereas a repo imported at the project scope is limited to that project.

2. Select **Repositories**, select the dropdown next to **New Repository**, and then select **Import Repository** or **Import Repositories**.
   * **Import Repository:** Import a single repository.
   * **Import Repositories:** Import all repositories in a GitHub/Gitea/Gogs organization, GitLab group, or Bitbucket project or workspace. Harness won't import repositories with conflicting names.
3. Select the **Git Provider**, such as GitHub or GitLab.
4. Depending on the provider, provide the administrative entity (**Organization**, **Project**, **Workspace**, or **Group**) and **Host URL** (if applicable) associated with your repository.
5. If you are importing a single repository, enter the name of the repository you want to import in **Repository**.

   Harness automatically populates the **Name** field based on the **Repository** field.

   If you want or need to change the repository name in Harness Code, you can change the **Name** field.

   Repository names in Harness Code can't contain the following strings:

   ```
   account.
   org.
   project.
   .git
   ```

6. If the repository or entity is private, select **Requires Authorization** and provide authorization credentials to access the repository.

   Permissions required for tokens depend on the provider, for example:

   * To import a Bitbucket Server repository, your [BitBucket Server personal access token](https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html) must have repository `Read` permissions.
   * To import a GitHub repository, your [GitHub classic personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) must have `repo` and `read:org` [permissions](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes).
   * To import a GitLab repository, your [GitLab personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) must have `read_api` and `read_repository` [scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes).
   * To import an Azure DevOps repository, your [Azure DevOps personal access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) must have `Code (read)` scope.

7. Select your preference for visibility (**Public** or **Private**).
8. Select **Import Repository** or **Import Repositories**.

You can observe in-progress imports on the **Repositories** page.

:::tip Cancel import

To cancel an in-progress import, locate the in-progress import on the **Repositories** page, select **More options** (&vellip;), and then select **Cancel Import**.

:::

## Work with repositories

After importing a repository, you can:

* [Clone your repository.](../work-in-repos/clone-repos.md)
* Create [branches](../work-in-repos/branch.md) and [tags](../work-in-repos/tag.md).
* [Commit changes](../work-in-repos/commit.md) and [open pull requests](/docs/category/pull-requests).
* [Configure branch rules](./rules.md) and [access control](/docs/code-repository/get-started/onboarding-guide.md#manage-access).
* Use Harness Code repositories in your [Harness pipelines](../pipelines/codebase-from-harness-code.md).
* Set up [triggers](../pipelines/code-triggers.md) to automatically run pipelines based on activity in your Harness Code repositories.
* [Configure webhooks](./webhooks.md) to integrate your repositories with third-party applications.
