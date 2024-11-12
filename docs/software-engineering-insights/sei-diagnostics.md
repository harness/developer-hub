---
title: Diagnostics
description: Validate your data in SEI 
sidebar_label: Diagnostics
sidebar_position: 85
---

Diagnostics helps you validate data accuracy, monitor data ingestion, and troubleshoot integration related issues in the application. It provides visibility into data ingestion status, progress, and alerts to ensure the SEI system is healthy and  has the latest data updated.

## Primary scenarios

Use SEI Diagnostics if you need to:

* Compare data between Jira or supported SCM tools and SEI and verify the accuracy and completeness of ingested data
* Track real-time status of all integrations and view the summary of data ingested from each source.
* Identify and resolve integration misconfigurations
* Investigate missing tickets, commits, or pull request data in SEI reports
* Monitor status and progress of data ingestion jobs
* Receive alerts for anomalies or issues in the ingestion process

:::info Supported Integrations:

* Issue Management: Jira by Atlassian
* Source Control Management (SCM): All SCM integrations supported by SEI
:::

## System Status

The System Status overview provides a centralized view of your SEI system's health, specifically focusing on the ingestion jobs and satellite connectivity. Here's a breakdown of what each section covers:

### Injestion Jobs

Ingestion jobs retrieve data from integrated platforms. For each job, the following details are available:

* **Integration ID:** Identify the specific integration source, helpful for multi-platform environments.
* **Ingestion Period:** Tracks the duration of each job to assess efficiency and detect any unusually long processes.
* **Status:** Shows if the job was successful or failed, with a timestamp for the last update.
* **Error Logs:** In case of a failure, the logs provide insights into the cause and any associated errors for troubleshooting.

![](./static/system-status.png)

Below are examples of errors you might find in the error logs, along with causes and potential fixes:

#### 401/403 Unauthorized Access

* **Cause:** The token provided was invalid, resulting in failure to access project data or certain API endpoints.
* **Solution:** Confirm the token validity and if the token has expired, update the integration configuration by reauthenticating with the third-party platform. Ensure the integration is configured with correct credentials.
* If the error persists, reach out to support with these details for further investigation.

Note that if you're using the Azure DevOps integration, 203 also reflects issue with the access token being expired.

#### Stream Exception

This error happens when data fetching from paginated endpoints fails midstream. It can result from:

* Authorization issues (e.g., expired or invalid tokens).
* Misconfigurations in settings (e.g., exceeding data limits).

**Solution**

* **Verify API Token:** Go to your SEI integration settings and confirm that the API token is valid and hasn’t expired. Generate a new token if needed and [reauthenticate](/docs/software-engineering-insights/sei-integrations/reauthenticate-integration), especially if the integration has been recently reconfigured.
* **Check Permissions:** Ensure the user or service account associated with the integration has the necessary permissions to access the data.
* **Review integration settings:** If you’re pulling large volumes of data from GitHub / Jira, try reconfiguring the integration using multiple access tokens in the integration’s configuration (e.g., 4-5 PATs for a data size of 20k+ repositories in GitHub) to manage data limits better.
* If the error persists, reach out to [support](/docs/software-engineering-insights/sei-support) with the details for further investigation.

#### IOException

An IOException occurs when network connectivity issues prevent data retrieval, even after multiple retries. This can be due to:

* Network outages or intermittent connectivity.
* Endpoint downtime

**Solution**

* **Test Connectivity:** Check if you can access the API endpoints directly from your network (e.g., using a curl command). This will help determine if the endpoint is down or if there are network issues preventing access.
* **Verify Network Settings:** Confirm that any firewall or proxy settings are allowing traffic to the endpoint. If you're using a cloud-based integration with allowlist settings in the third-party account or if you're utilizing an ingestion satellite, confirm that [Harness IP addresses are allowlisted](/docs/platform/references/allowlist-harness-domains-and-ips) to avoid access restrictions.
* If the error persists, reach out to [support](/docs/software-engineering-insights/sei-support) with the details for further investigation.

#### 429 Rate Limiting

This error occurs when the integration is sending too many requests to the API within a given time frame. This is typically caused by a large set of data being ingested using one integration exceeding the API rate limit.

**Solution**

If you're using a PAT (Personal Access Token) or API Key for authentication, try [reauthenticating](/docs/software-engineering-insights/sei-integrations/reauthenticate-integration) the integration with multiple access tokens for different service accounts. This can help distribute the request load and reduce the likelihood of hitting rate limits. If the error persists, reach out to [support](/docs/software-engineering-insights/sei-support) with the details for further investigation.

### Ingestion Satellite Status

Monitor the health of ingestion satellites for on-prem integration setups. 

## Integration Status

Check the status of individual integrations and drill down into specific issues.

![](./static/integration-status.png)

## Run Spot Check

Perform targeted validation of data for a specific timeframe or data subset.

## Troubleshooting

### Missing data in the system

If you encounter a 