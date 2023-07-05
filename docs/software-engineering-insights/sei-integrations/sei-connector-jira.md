---
title: SEI Jira connector
description: Integrate SEI with Jira.
sidebar_position: 120
sidebar_label: Jira
---

Use the SEI Jira connector to integrate SEI with Jira in the Cloud.

To integrate with the on-premises Jira instances, you must use the [generic SEI connector](./sei-connector-generic.md) with username and password authentication.

## Configure Jira

Before you configure the SEI Jira connector, you must install the Harness SEI Jira app and generate an Atlassian API token.

:::tip Use a service account

The user creating the token must have read access to all projects that you want SEI to track, and the user must be able to search issues within the SEI-relevant projects.

Due to the scope of visibility required, consider using a managed service account, rather than a personal user account, to create the token.

:::

1. Install the [Harness SEI Jira app](https://marketplace.atlassian.com/apps/1231375/harness-software-engineering-insights-sei?hosting=cloud&tab=overview) in your Jira instance.
2. Create an Atlassian API token. For instructions, go to the Atlassian documentation on [Managing API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).
3. Make sure to copy the token somewhere that you can retrieve it when you configure the connector.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Jira** connector, and select **Install**.
4. Configure the connector and install the SEI Jira app in your Jira instance.

## Add the Salesforce mapping

If you also have an [SEI Salesforce connector](./sei-connector-salesforce.md), you can link Salesforce tickets to Jira issues by using a custom Jira field.

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Find your **Jira** connector and edit it.
4. Under **Salesforce Mapping**, select the Jira field that contains your Salesforce case IDs.
