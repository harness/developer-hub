---
title: SEI Jira integration
description: Integrate SEI with Jira.
sidebar_position: 130
sidebar_label: Jira
---

Jira is a proprietary issue tracking product that allows bug tracking and agile project management.

Use the SEI Jira integration to integrate SEI with Jira in the Cloud.

## Configure Jira

Before you configure the SEI Jira integration, you must install the Harness SEI Jira app and generate an Atlassian API token.

:::tip Use a service account

The user creating the token must have read access to all projects that you want SEI to track, and the user must be able to search issues within the SEI-relevant projects.

Due to the scope of visibility required, consider using a managed service account, rather than a personal user account, to create the token.

:::

1. Create an Atlassian API token. For instructions, go to the Atlassian documentation on [Managing API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
2. Make sure to copy the token somewhere that you can retrieve it when you configure the integration.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Configure the integration

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Cloud" default>
```

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Jira integration**, and select **Install**.
4. Configure the integration:
   * Add the **URL** of your **Jira** integration instance, for example, `"https://organization.atlassian.net"`. Make sure it's a valid URL.
   * Enter your Jira **Username**.
   * Provide the **API key** that you previously generated within your **Atlassian account**.
   * If necessary, add a custom **JQL (Jira Query Language) query**. This query will determine which issues are ingested by SEI. Leave this field blank if you want to ingest all issues.
   * Select your **Preferred Time Zone** from the available options.
   * Choose the **Fields** you wish to exclude from ingestion. 
      
      You might exclude fields containing sensitive information such as **Summary**, **Description**, and **Comments**. Excluded fields will not be evaluated for **hygiene** or adherence to best practices.
   * Finish configuration and **Save** the integration.

To integrate with the on-premises Jira instances, you must username and password authentication and an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **satellite** is similar to configuring the integration on cloud, with the exception of using **satellite to communicate** with the Atlassian server.

To integrate with **On-Premises Jira** instances, you can use the **Username** and the **User-Generated API key** with the relevant permission. Make sure to select the **Satellite Integration Checkbox** while configuring the integration.

Once you save the integration a **satellite.yml** file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api'
integrations:
  - id: '<ID>'
    application: jira
    url: '<ATLASSIAN_JIRA_URL>'
    username: <ATLASSIAN_USERNAME>
    api_key: <ATLASSIAN_API_KEY>
    metadata:
      timezone: 'America/Los_Angeles'
      sensitive_fields:
        - summary
        - description
        - comment
jira:
  allow_unsafe_ssl: true

```

:::info
The timezone field within the metadata should be in the Atlassian standard version.

To find the correct timezone, go to ```https://<ORGANIZATION>.atlassian.net/rest/api/2/myself```
:::

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```

### ADFS-based Auth for JIRA connectivity via Satellite

ADFS (Active Directory Federation Services) is a Microsoft service that provides single sign-on authentication to users across multiple applications or systems. When integrating with Jira using ADFS-based authentication via Satellite, specific fields need to be configured in the `satellite.yml` file.

Update the `satellite.yml` file:

Remove:

```yaml
username:
api_key:
```

Replace with:

```yaml
authentication: adfs
adfs_url: <ADFS_SERVER_ENDPOINT>
adfs_client_id: <CLIENT_IDENTIFIER> / <APPLICATION_ID>
adfs_resource: <RESOURCE_IDENTIFIER>
adfs_username: <ADFS_USERNAME>
adfs_password: <ADFS_PASSWORD>
```

Replace `<ADFS_PASSWORD>` with the actual password for the specified ADFS username. Ensure the rest of the file remains unchanged.

* `authentication:` This field specifies the authentication method to be used, in this case, ADFS.

* `adfs_url:` The URL of the ADFS server endpoint where authentication requests will be sent.

* `adfs_client_id:` The client identifier or application ID assigned to your application in the ADFS configuration. It uniquely identifies your application to the ADFS server.

* `adfs_resource:` The identifier of the resource for which the access token is being requested. In the context of Jira integration, it specifies the URI of the Jira OAuth API on the ADFS server.

* `adfs_username:` The username used for authentication. This could be a service account or a specific user account authorized to access Jira via ADFS.\

* `adfs_password:` The password associated with the specified ADFS username. It is important to keep this information secure.

## Add the Salesforce mapping

If you also have an [SEI Salesforce integration](../other-integrations/sei-integration-salesforce), you can link Salesforce tickets to Jira issues by using a custom Jira field.

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Find your **Jira** integration and edit it.
4. Under **Salesforce Mapping**, select the Jira field that contains your Salesforce case IDs.

## Add custom hygiene misses

The [Issue Hygiene Report widget](/docs/software-engineering-insights/sei-metrics-and-reports/hygiene-metrics#issue-hygiene-reports) uses data from Jira to calculate hygiene scores. These scores represent _hygiene misses_ in a designated time frame. A hygiene miss means that a ticket in your issue management system was missing an important field, failed to change status in a timely manner, or was assigned to an inactive user.

What constitutes a miss depends on your _hygiene categories_. There are several built-in [hygiene categories](/docs/software-engineering-insights/sei-metrics-and-reports/hygiene-metrics.md#issue-hygiene-categories), and you can add custom hygiene categories by configuring **Custom Hygiene Misses** in your issue management integration.

To add custom hygiene categories:

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Find your **Jira** integration and edit it.
4. Select **Add Custom Hygiene Miss Criteria** and configure the new hygiene category:

   * **Name:** Enter a name for the category. This name appears on the Issue Hygiene Report widget along with the category's score.
   * **Field:** Select the Jira field that provides data for this category.
   * **Operator:** Specify the operator, such as **Missing** or **Greater Than**, that determines if there was a hygiene miss for this category.

   The **Operator** represents an undesired state for the specified **Field**. For example, if your *desired state* is for the specified **Field** to be populated, then your *undesired state* is that the field is empty. Therefore, you would set the **Operator** to **Missing**.

5. To get scores for custom hygiene categories, you must modify the category **Weights** in your Issue Hygiene Report widgets. Custom categories don't have an initial weight, so you must modify all instances of this widget to include your custom categories in the hygiene score calculations. For instructions, go to [Configure the Issue Hygiene Report](/docs/software-engineering-insights/sei-metrics-and-reports/hygiene-metrics#configure-the-issue-hygiene-report).
