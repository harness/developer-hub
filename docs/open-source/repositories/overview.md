---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

A repository is where your code is stored. When developers make changes to code in a Gitness repository, those changes are tracked with version control. Gitness fosters collaboration and governance with code reviews, approvals, status checks, and more.

## Create a repository

1. In your [project](../administration/project-management.md), select **Repositories**, and then select **New Repository**.
2. Enter a repository **Name** and optional **Description**.
3. Gitness repositories are initialized with a `main` branch, unless you specify a different name for the base branch. To change the base branch name, select **main** and enter a name for the base branch.
4. Select your preference for visibility (**Public** or **Private**).
5. Optionally, you can add a **License**, **.gitignore**, or **README** file to your repository.
6. Select **Create Repository**.

## Import a repository

Gitness can import repositories from external sources such as GitLab or GitHub.

1. In your [project](../administration/project-management.md), select **Repositories**.
2. Select the dropdown next to **New Repository**, and then select **Import Repository**.
3. Enter the **Repository URL**.
4. If the repository is private, select **Requires Authorization** and provide your authorization credentials to access the repository.

   <Tabs>
   <TabItem value="Bitbucket Server" label="Bitbucket Server">
     To import a Bitbucket Server repository, your token must have repository "Read" permissions.
     <br/><br/>
     For more information, refer to Bitbucket Server's <a href="https://confluence.atlassian.com/bitbucketserver072/personal-access-tokens-1005335924.html">Personal access tokens</a> documentation.
   </TabItem>

   <TabItem value="GitHub" label="GitHub">
     To import a GitHub repository, your token must have <tt>repo</tt> and <tt>read:org</tt> permissions.
     <br/><br/>
     For more information, refer to GitHub's <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic">Creating classic personal access tokens</a> and <a href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes">Available scopes</a> documentation.
   </TabItem>

   <TabItem value="GitLab" label="GitLab">
     To import a GitLab repository, your token must have <tt>read_api</tt> and <tt>read_repository</tt> scopes.
     <br/><br/>
     For more information, refer to GitLab's <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token">Create a personal access token</a> and <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes">Personal access token scopes</a> documentation.
   </TabItem>
   </Tabs>

5. Enter a repository **Name** and optional **Description**.
6. Select your preference for visibility (**Public** or **Private**).
7. Select **Import Repository**.

## Work with repositories

After creating a repository, you can:

- [Clone](./cloning.md) your repository.
- Create a branch, commit changes, and open a [pull request](./pull_requests.md).
- Create tags.
- Create [pipelines](../pipelines/overview.md) and configure [webhooks](./webhooks.md).
