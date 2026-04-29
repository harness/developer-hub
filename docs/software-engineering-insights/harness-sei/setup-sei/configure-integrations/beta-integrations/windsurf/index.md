---
title: Windsurf Integration
description: Set up the Windsurf integration to track AI assistant adoption and impact in SEI 2.0.
sidebar_label: Windsurf
---

:::tip
The Windsurf integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The Windsurf integration enables SEI 2.0 to track adoption and usage metrics for Windsurf coding assistants. This integration is required to view the [AI Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/ai).

### Prerequisites

Before you get started, you must create an [API service key in Windsurf](https://docs.windsurf.com/windsurf/accounts/api-reference/api-introduction#authentication) with appropriate permissions to access usage metrics. The API key should have read access to organization or team usage data.

1. In Windsurf, navigate to the [**Settings** page](https://windsurf.com/team/settings). 
1. Under `Service Key Configuration`, click **Add Service Key**.
1. Copy the output key and save it.

## Setup

To configure the Windsurf integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the Windsurf integration tile under `AI Assistants` and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration and optionally, add tags to identify the integration.
1. In the **Configure Windsurf Authentication** section, enter your Windsurf API service key and click **Validate Credentials**.
1. Once validated, click **Validate and Create Integration**.

Once the integration is configured and data is ingested, Windsurf activity becomes available in the AI Insights dashboard on the **Insights** page, where you can analyze adoption, productivity, and code quality metrics at the organization or team level. For more information, see [AI Insights](/docs/software-engineering-insights/harness-sei/insights/ai).