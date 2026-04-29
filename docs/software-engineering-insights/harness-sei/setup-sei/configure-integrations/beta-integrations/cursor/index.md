---
title: Cursor Integration
description: Set up the Cursor integration to track AI assistant adoption and impact in SEI 2.0.
sidebar_label: Cursor
---

:::tip
The Cursor integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The Cursor integration enables SEI 2.0 to track adoption and usage metrics for Cursor coding assistants. This integration is required to view the [AI Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/ai).

### Prerequisites

Before you get started, you must create an [API key in Cursor](https://cursor.com/docs/api#creating-api-keys) with appropriate permissions to access usage metrics. The API key must be created as an Admin API & AI Code Tracking key, and should have read access to organization or team usage data.

## Setup

To configure the Cursor integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the Cursor integration tile under `AI Assistants` and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration and optionally, add tags to identify the integration.
1. In the **Configure Cursor Authentication** section, enter your Cursor API key and click **Validate Credentials**.
1. Once validated, click **Validate and Create Integration**.

Once the integration is configured and data is ingested, Cursor activity becomes available in the AI Insights dashboard on the **Insights** page, where you can analyze adoption, productivity, and code quality metrics at the organization or team level. For more information, see [AI Insights](/docs/software-engineering-insights/harness-sei/insights/ai).