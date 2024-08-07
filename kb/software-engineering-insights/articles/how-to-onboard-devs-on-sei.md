---
title: How to onboard 1000+ developers on SEI
---
This guide outlines the process for efficiently onboarding a large number of contributors to Harness Software Engineering Insights (SEI). Contributors include developers and team members whose actions contribute to your SEI metrics and insights.

### Step 1: Use integrations to fetch contributors data from a third party tool

Configure integrations with third-party tools. SEI automatically detects user identities and creates contributor profiles.

For detailed information on available integrations and setup instructions, go to [SEI Integrations](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview).

:::info
Please note that after adding or updating an integration, it may take up to 24 hours for the data to be fully reflected in SEI. Widgets and insights will update once synchronization is complete.
:::

### Step 2: Manually update the contributors list for missing details.

When you configure new integrations, SEI automatically detects user identities in your integrations and creates contributors from those identities. However, there are several reasons you might need to modify contributors, such as:

* Users don't have the same email address for all accounts.
* A user's identity wasn't detected through the integration.
* You need to populate data for custom attributes that isn't otherwise populated.

To modify contributors, you must export a CSV file, edit it, and then import the edited file.

* In your **Harness project**, go to the **SEI module**, and select **Account**.
* Select **Contributors** under **Data Settings**.
* Select **Import and Export Contributors**.
* Select **Export Existing Contributors** or, if you don't yet have any contributors, select **Export Sample CSV**.
* Open the CSV file and edit the data accordingly.
* Go back to the **Contributors** page in SEI, and select **Import and Export Contributors**.
* Select **Import Contributors**, and upload your modified CSV file.

If you need to manually add a contributor, and add a row for each new contributor. At minimum, you must provide a name and email for the contributor to be valid.

:::info License Utilization
A Contributor is counted as a licensing unit if they have at least one user account associated with an integrated Source Code Management (SCM) tool, such as GitHub, GitLab, Bitbucket or any other. For more information, go to [SEI Subscriptions and Licenses](/docs/software-engineering-insights/get-started/sei-subscription-and-licensing)
:::