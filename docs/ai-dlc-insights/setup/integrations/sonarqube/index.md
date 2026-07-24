---
title: Connect with SonarQube
description: Configure the SonarQube integration in Harness AIDI to ingest code quality data.
sidebar_position: 2
sidebar_label: SonarQube
redirect_from:
  - /docs/ai-dlc-insights/setup/integrations/beta-integrations/sonarqube/
---

:::tip
The SonarQube integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

[SonarQube](https://docs.sonarsource.com/) is an open-source platform for continuous inspection of code quality. It performs automatic static analysis to detect bugs, code quality issues, and security vulnerabilities.

On initial setup, Harness AIDI backfills up to 6 months of historical code quality findings. When configured, Harness AIDI can ingest and validate SonarQube code quality data.

## Prerequisites

Before you begin, ensure that you have:

- An [SEI Admin role](/docs/software-engineering-insights/harness-sei/get-started/rbac#sei-admin-account--project-level)
- Access to a SonarQube or SonarQube Cloud account and can generate a SonarQube API token with read access to the required organizations and projects

## Create a SonarQube API token

To configure the SonarQube integration, create an API token in SonarQube. The token must be either a **User Token** or a **Global Analysis Token**, and have permission to read organization and project-level analysis data. For [SonarQube Cloud](https://docs.sonarsource.com/sonarqube-cloud/managing-your-account/managing-tokens), tokens are associated with a user and scoped by that user's organization access.

The token must have access to all organizations and projects you want SEI to monitor, and the following required permission:

| Permission | Why it’s required |
|-----------|-------------------|
| **Browse** | Allows SEI to access projects, metrics, issues, and quality gate status |

Harness recommends using a service account user token with **read-only access** and **no expiry or a long-term expiry (1+ year)**. This helps ensure uninterrupted ingestion and avoids issues caused by employee turnover. 

SonarQube tokens can also be scoped at the **organization** level. For more information about creating scoped organization tokens, see the [official SonarQube documentation](https://docs.sonarsource.com/sonarqube-cloud/administering-sonarcloud/managing-organization/scoped-organization-tokens).

:::info
If your SonarQube instance uses an allowlist, ensure that required Harness IP addresses are permitted. For more information, see [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips).
:::

## Add the integration

To add the integration:

1. From the SEI navigation menu, click **Account Management**.
1. On the **Integrations** page, select the **Available Integrations** tab.
1. Locate the **SonarQube** integration and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration (for example, `SonarQube Production`) and optionally, add tags.
1. Click **Continue**.
1. Add your SonarQube instance URL (for example, `https://sonarcloud.io`) in the `SonarQube URL` field.
1. Enter your SonarQube API token in the `API Token` field. The token must be a **User Token** or **Global Analysis Token**.
1. Click **Continue**.
1. Optionally, limit ingestion to a specific organization or set of projects by entering a name in the `Organization` field and a project key in the `Project Keys` field. 

   - Project keys are case-sensitive. 
   - Leave the `Project Keys` field empty to ingest all projects.

1. Click **Continue** to validate the connection.
2. Once validation succeeds, click **Finish**.

## Integration monitoring

Once you've configured the integration, you can monitor ingestion activity on the **Monitoring** tab in the SonarQube integration page.

The **Monitoring** tab displays ingestion logs that show the status and execution details of each sync. You can filter logs by **Status**, such as `Success`, `Failed`, `Pending`, or `Scheduled`.

### Ingestion logs

You can use ingestion logs to validate successful syncs and troubleshoot ingestion issues. Each ingestion run includes the following information:

| Column | Description |
|------|-------------|
| **Scan Range Time** | The time window for which data was retrieved. |
| **Data Retrieval Process** | The ingestion process used. |
| **Task Start Time** | When the job started. |
| **Status** | Execution status (for example, `Success` or `Failed`). |
| **Time to Complete** | Total runtime for the job. |
| **Retries** | Number of retries before completion. |
