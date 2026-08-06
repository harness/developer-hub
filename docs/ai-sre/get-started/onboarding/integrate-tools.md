---
title: Integrate Your First Tool
description: Connect collaboration and monitoring tools.
sidebar_label: Integrate Tools
sidebar_position: 2
keywords:
  - integrations
  - slack
  - monitoring
  - onboarding
tags:
  - ai-sre
  - getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

Connect your collaboration and monitoring tools to enable real-time incident detection and seamless team coordination.

## Before you begin

- **AI SRE access:** A Harness project with AI SRE enabled. Go to the [AI SRE onboarding guide](/docs/ai-sre/get-started/onboarding/overview) to review prerequisites.
- **Admin permissions:** Access to Organization Settings to configure third-party integrations.
- **Tool credentials:** Sign-in access or API keys for the tools you connect (Slack, Datadog, New Relic, and similar).

:::info Important note
AI SRE works best when integrated with your existing monitoring and collaboration tools. This enables real-time incident detection and seamless team coordination.

Go to [AI SRE Integrations documentation](/docs/category/integrations) for detailed integration guides.
:::

## Integrate tools

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Step by Step" label="Step by Step" default>

### Connect Slack

1. Navigate to **Organization Settings** in the Left Panel
2. Head over to **Third Party Integrations (AI SRE)**
3. By default you will see some connectors. Click on **Connect**
4. Sign into SSO or whatever authentication method is required
5. For Slack, select the required **Workspace** from your list of workspaces
6. Click on **Install Harness AI SRE**

### Connect monitoring tools

For monitoring tool integrations (Datadog, New Relic, Grafana, and similar):

1. **Name:** A descriptive name for the integration.
2. **Webhook URL:** Copy the provided webhook URL to your monitoring tool.
3. **Authentication:** Configure API keys or tokens as required.

### Connect additional communication tools

Set up additional communication integrations:

1. **Microsoft Teams:** Configure the Teams connector.
2. **Zoom:** Set up meeting automation for incident bridges.

### Connect ServiceNow (optional)

For ServiceNow integration:

1. Configure a ServiceNow connector with read access to the `change_request` table
2. Once configured, ServiceNow change records automatically flow into the [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent) with no additional setup
3. Go to [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent#servicenow-change-integration) to learn how ServiceNow changes appear as root cause theories

:::tip Integration best practice
Start with your primary monitoring tool and main communication channel. You can add more integrations later as needed. If your organization already uses a ServiceNow connector for pipeline approvals, change data automatically appears in RCA.
:::

  </TabItem>
  <TabItem value="Interactive Guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/c55a8b8f-bce1-487c-b8ea-5d178a844682?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Integrate Collaboration and Monitoring Tools in Harness AI SRE" />

Use connectors to integrate with Teams, Slack, ServiceNow, and other monitoring tools for real-time incident alerts.

  </TabItem>
</Tabs>

---

## Next steps

- Go to [Set Up Incident Types](/docs/ai-sre/get-started/onboarding/setup-incident-types) to define incident types and severity levels.
- Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/templates/overview) to view all available monitoring tool integrations.
