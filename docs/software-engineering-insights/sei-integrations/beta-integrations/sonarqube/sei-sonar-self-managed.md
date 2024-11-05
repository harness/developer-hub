---
title: Connect with SonarQube Server
description: Integrate SEI with SonarQube Server
sidebar_position: 200
sidebar_label: Connect with SonarQube Server
---

To integrate SEI with on-premises SonarQube instances, you must use an Ingestion Satellite. The configuration steps for this integration are similar to those for Sonar Cloud, with the key difference being the use of the satellite for communication with the SonarQube server.

### Requirements

To use the SEI SonarQube integration you need a **SonarQube API Token**.

* The user creating the token must have **Administer System** permissions.
   * To configure permissions in SonarQube, go to **Administration**, then **Security**, and then **Global Permissions**.
   * Due to the scope of access required, consider using a managed service account, rather than a personal user account, to create the token.
* For instructions on creating API tokens, go to the SonarQube documentation on [Generating and using tokens](https://docs.sonarsource.com/sonarqube/9.7/user-guide/user-account/generating-and-using-tokens/).
* Copy the key somewhere that you can retrieve it when you configure the integration.

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
5. Click on Download YAML file to download the satellite configuration file.

The ```satellite.yml``` file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml`

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' 
  # Note that this URL is relative to the Environment of your Harness Account.

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

### Supported metadata

<table>
    <tr>
        <td><b>Metadata</b></td>
        <td><b>Type</b></td>
        <td><b>Description</b></td>
    </tr>
    <tr>
        <td>allow_unsafe_ssl</td>
        <td>Boolean</td>
        <td>Allows users to bypass SSL verification for custom certificates authorized by the SonarQube server</td>
    </tr>
    <tr>
        <td>use_privileged_APIs</td>
        <td>Boolean</td>
        <td>Set to True to enable the use of privileged APIs, which are required when all project data is not visible. This requires the API key to have the **Administer System** permission in SonarQube. For more information, go to [SonarQube Documentation](https://next.sonarqube.com/sonarqube/web_api/api/projects/search).</td>
    </tr>
</table>
