---
title: GitHub Copilot Integration
description: Set up the GitHub Copilot integration to ingest usage and adoption metrics in SEI 2.0.
sidebar_label: GitHub Copilot
---

:::tip
The GitHub Copilot integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The GitHub Copilot integration enables SEI 2.0 to ingest usage and adoption metrics for GitHub Copilot coding assistants. 

### Prerequisites

Before you get started:

- Create an [API key in GitHub's Copilot Settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-your-own-api-keys) with `manage_billing:copilot`, `read:org`, and `read:enterprise` permissions to access usage metrics. 
- If you are using [GitHub Enterprise Cloud](https://docs.github.com/en/enterprise-cloud@latest/get-started/onboarding/getting-started-with-github-enterprise-cloud) or [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.20/admin/overview/about-github-enterprise-server), locate your GitHub Enterprise ID. You can find this in your GitHub Enterprise account settings or from your enterprise URL or slug.

## Setup

To configure the GitHub Copilot integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the GitHub Copilot integration tile under 'AI Assistants' and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration and optionally, add tags to identify the integration. Then, click **Continue**.
1. In the **Configure Authentication** section, enter your GitHub Copilot API key and click **Validate & Continue**.
1. Select the GitHub organization type for this integration:
   
   - **Standard GitHub Organization**: For organizations using GitHub.com without a GitHub Enterprise account.
   - **GitHub Enterprise**: For organizations using GitHub Enterprise Cloud or GitHub Enterprise Server.

1. If you selected **GitHub Enterprise**, enter your GitHub Enterprise ID and click **Continue**.
1. Once validated, click **Validate and Create Integration**.

## Integration monitoring

To monitor the status of the GitHub Copilot integration, navigate to the **Monitoring** tab. This page displays ingestion logs that provide visibility into data synchronization.

You can click the **Filters** icon to filter logs by **Status** (`Success`, `Failed`, `Pending`, or `Scheduled`).

Each ingestion log includes the following fields:

| Field | Description |
|------|-------------|
| **Scan Range Time** | The time window of data retrieved from GitHub during the ingestion task. |
| **Data Retrieval Process** | The ingestion job responsible for fetching data from GitHub. |
| **Task Start Time** | The timestamp when the ingestion task began running. |
| **Status** | The current state of the ingestion task (for example, Success, Failed, Pending, or Scheduled). |
| **Time to Complete** | The total duration required for the ingestion task to complete. |
| **Retries** | The number of times the ingestion task was retried after a failure. |
