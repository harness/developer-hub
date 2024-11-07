---
title: Connect with SonarCloud
description: Integrate SEI with Sonar Cloud
sidebar_position: 200
sidebar_label: Connect with Sonar Cloud
---

SonarQube is an open-source platform for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.

This topic describes the settings and permissions for the SonarQube integration. Harness supports both [Cloud](#add-the-integration) and [Self-Managed (On-Prem)](/docs/software-engineering-insights/sei-integrations/bitbucket/sei-integration-bitbucket) versions of SonarQube. The following settings are applicable to Sonar Cloud.

### Requirements

To use the SEI SonarQube integration you need a **SonarQube API Token**.

* The user creating the token must have **Administer System** permissions.
   * To configure permissions in SonarQube, go to **Administration**, then **Security**, and then **Global Permissions**.
   * Due to the scope of access required, consider using a managed service account, rather than a personal user account, to create the token.
* For instructions on creating API tokens, go to the SonarQube documentation on [Generating and using tokens](https://docs.sonarsource.com/sonarqube/9.7/user-guide/user-account/generating-and-using-tokens/).
* Copy the key somewhere that you can retrieve it when you configure the integration.

:::info
If you have enabled an allow list in your SonarQube account, certain Harness IP addresses must be added to it in order to allow communication between the Harness Platform and SonarQube. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integration can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Add the integration

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **SonarQube** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL of the server where SonarQube is running. For SonarCloud, enter `https://sonarcloud.io`.
   * **Username:** The email address of the user that created the token in SonarQube.
   * **API Key:** Enter the SonarQube API token.
   * **Organization:** Enter your SonarQube **Organization Name**. For SonarCloud, you can find your organization name under **My Account**. Note that **Organization Key** is different from the **Organization Name**.
   * **Project Keys:** Enter one or more project keys to ingest. If you want SEI to ingest all projects, leave this field empty. Project keys are case sensitive.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
5. Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.
