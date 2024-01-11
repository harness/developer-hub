---
title: SEI SonarQube integration
description: Integrate SEI with SonarQube or SonarCloud.
sidebar_position: 200
sidebar_label: SonarQube
---

SonarQube is an open-source platform for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.

Use the SEI SonarQube integration to integrate SEI with SonarQube or SonarCloud.

## Requirements

To use the SEI SonarQube integration you need a SonarQube API token.

* The user creating the token must have **Administer System** permissions.
   * To configure permissions in SonarQube, go to **Administration**, then **Security**, and then **Global Permissions**.
   * Due to the scope of access required, consider using a managed service account, rather than a personal user account, to create the token.
* For instructions on creating API tokens, go to the SonarQube documentation on [Generating and using tokens](https://docs.sonarsource.com/sonarqube/9.7/user-guide/user-account/generating-and-using-tokens/).
* Copy the key somewhere that you can retrieve it when you configure the integration.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Configure the integration


<Tabs>
  <TabItem value="cloud" label="Cloud" default>


1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **SonarQube** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL of the server where SonarQube is running. For SonarCloud, enter `https://sonarcloud.io`.
   * **Username:** The email address of the user that created the token in SonarQube.
   * **API Key:** Enter the SonarQube API token.
   * **Organization:** Enter your SonarQube **Organization Name**. For SonarCloud, you can find your organization name under **My Account**. Note that **Organization Key** is different from the **Organization Name**.
   * **Project Keys:** Enter one or more project keys to ingest. If you want SEI to ingest all projects, leave this field empty. Project keys are case sensitive.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

To integrate with the on-premises SonarQube instances, you must use an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the SonarQube server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a ```satellite.yml``` file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml`

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: sonarqube
    url: '<SONARQUBE_URL>'
    username: <SONARQUBE_USERNAME>
    api_key: <SONARQUBE_API_KEY>
    metadata:
      organization: <SONARQUBE_ORG_NAME>
      project_keys: <SONARQUBE_PROJECT_KEYS>

```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>
