---
title: SEI GitLab connector
description: Integrate SEI with GitLab.
sidebar_position: 80
sidebar_label: GitLab
---

GitLab is a DevOps platform that provides Git repos, CI/CD pipelines, issue management, and more.

Use the SEI GitLab connector to integrate SEI with GitLab.com.

To integrate with the on-premises, privately-hosted GitLab, you must use the [generic SEI connector](./sei-connector-generic.md) with API key (personal access token) authentication.

## Configure authentication

The SEI GitLab connector can use either OAuth or personal access token authentication.

For OAuth, your account must have the **Reporter** role or higher.

If you can't use OAuth, you must create a GitLab personal access token to configure the SEI GitLab connector.

1. Log in to your GitLab account and create a personal access token. For instructions, go to the GitLab documentation on [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Select the `api` scope with complete read/write API access.
3. Copy the token somewhere that you can retrieve it when you configure the connector.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **GitLab** or **GitLab Cloud** connector, and select **Install**.
4. Select an authentication method for the connector:

   * To use OAuth, select **Authorize** and follow the prompts to grant access to GitLab.
   * To use a personal access token, enter the **URL** for your GitLab instance and paste your **Access Token**.

5. In **Integration Name**, enter a name for the connector.
6. Finish configuration and save the connector.
