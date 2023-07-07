---
title: SEI Jira connector
description: Integrate SEI with Jira.
sidebar_position: 130
sidebar_label: Jira
---

Jira is a proprietary issue tracking product that allows bug tracking and agile project management.

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

## Add custom hygiene misses

The [Issue Hygiene Report widget](../sei-metrics-and-reports/execution/quality-and-support-metrics.md#issue-hygiene-report) uses data from Jira to calculate hygiene scores. These scores represent _hygiene misses_ in a designated time frame. A hygiene miss means that a ticket in your issue management system was missing an important field, failed to change status in a timely manner, or was assigned to an inactive user.

What constitutes a miss depends on your _hygiene categories_. There are several built-in [hygiene categories](../sei-metrics-and-reports/execution/quality-and-support-metrics.md#hygiene-categories), and you can add custom hygiene categories by configuring **Custom Hygiene Misses** in your issue management connectors.

To add custom hygiene categories:

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Find your **Jira** connector and edit it.
4. Select **Add Custom Hygiene Miss Criteria** and configure the new hygiene category:

   * **Name:** Enter a name for the category. This name appears on the Issue Hygiene Report widget along with the category's score.
   * **Field:** Select the Jira field that provides data for this category.
   * **Operator:** Specify the operator, such as **Missing** or **Greater Than**, that determines if there was a hygiene miss for this category.

   The **Operator** represents an undesired state for the specified **Field**. For example, if your *desired state* is for the specified **Field** to be populated, then your *undesired state* is that the field is empty. Therefore, you would set the **Operator** to **Missing**.

5. To get scores for custom hygiene categories, you must modify the category **Weights** in your Issue Hygiene Report widgets. Custom categories don't have an initial weight, so you must modify all instances of this widget to include your custom categories in the hygiene score calculations. For instructions, go to [Configure the Issue Hygiene Report widget](../sei-metrics-and-reports/execution/quality-and-support-metrics.md#configure-the-issue-hygiene-report-widget).
