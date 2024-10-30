---
title: Connect with GitLab Cloud
description: Integrate SEI with GitLab Cloud.
sidebar_position: 10
sidebar_label: Connect with GitLab Cloud
redirect_from:
  - docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab       
---

GitLab is a DevOps platform that provides Git repos, CI/CD pipelines, issue management, and more.

To integrate SEI with Gitlab, you must choose your Gitlab Account type. SEI supports connecting with the following:

* Gitlab Cloud
* Gitlab Private Cloud
* Gitlab Enterprise

To integrate with Gitlab Enterprise, go to [Connect with Gitlab Enterprise](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab).

### Configure authentication

The SEI GitLab integration can use either OAuth or personal access token authentication.

For OAuth, your account must have the **Reporter** role or higher.

If you can't use OAuth, you must create a GitLab personal access token to configure the SEI GitLab integration.

1. Log in to your GitLab account and create a personal access token. For instructions, go to the GitLab documentation on [Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Select the `api` scope with complete read/write API access.
3. Copy the token somewhere that you can retrieve it when you configure the integration.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Add the integration

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab** integration, and select **Install**.
4. Choose the type of **Gitlab Account** as **Cloud**.

<Tabs>
  <TabItem value="oauth" label="Using OAuth" default>

* Select the authentication medium as **Using OAuth** and follow the prompts to grant access to GitLab.
* In **Integration Name**, enter a name for the integration.
* Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
  <TabItem value="pat" label="Using Personal Access Token">

This authentication method is simple to set up and is suitable for various API interactions. Note that the access token needs periodic renewal based on the timeline of the generated token. 

* Select the authentication medium as **Using Personal Access Token (PAT)**.
* In **Integration Name**, enter a name for the integration.
* Paste the previously generated Personal Access Token.
* Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
</Tabs>
