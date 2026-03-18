---
title: qTest Integration
description: Set up the qTest integration to ingest test management data in SEI 2.0.
sidebar_label: qTest
---

:::tip
The qTest integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The qTest integration enables SEI 2.0 to ingest test management data from qTest Cloud. This data can be used to track testing activity and correlate test execution with engineering metrics in SEI dashboards.

### Prerequisites

Before you get started, you must create an [API key in qTest](https://docs.tricentis.com/qtest-saas/content/user_and_administration/administration/administration.htm) with appropriate permissions to access test management data. 

## Setup

To configure the qTest integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the qTest integration tile under `Test Management` and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration and optionally, add tags to identify the integration.
1. Click **Continue**.
1. In the **Configure Authentication** section, enter your qTest instance URL and API key.
1. Click **Validate & Continue**.
1. Once validation succeeds, click **Validate and Create Integration**.

Once the integration is configured, Harness SEI begins ingesting test management data from qTest.

## Integration monitoring

To monitor the status of the qTest integration, navigate to the **Monitoring** tab. This page displays ingestion logs that provide visibility into data synchronization.

You can click the **Filters** icon to filter logs by **Status** (`Success`, `Failed`, `Pending`, or `Scheduled`).

Each ingestion log includes the following fields: 

| Field | Description |
|------|-------------|
| **Scan Range Time** | The time window of data that the ingestion task retrieves from qTest. |
| **Data Retrieval Process** | The specific ingestion job or process responsible for fetching data from qTest. |
| **Task Start Time** | The timestamp when the ingestion task began running. |
| **Status** | The current state of the ingestion task (for example, Success, Failed, Pending, or Scheduled). |
| **Time to Complete** | The total duration required for the ingestion task to finish processing. |
| **Retries** | The number of times the ingestion task was retried after a failure. |

