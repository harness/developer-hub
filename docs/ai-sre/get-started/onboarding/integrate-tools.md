---
title: Integrate Your First Tool
description: Connect collaboration and monitoring tools to Harness AI SRE.
sidebar_label: Integrate Tools
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

# Integrate Your First Tool

Connect your collaboration and monitoring tools to enable real-time incident detection and seamless team coordination.

:::info Important Note
AI SRE works best when integrated with your existing monitoring and collaboration tools. This enables real-time incident detection and seamless team coordination.

Go to [AI SRE Integrations documentation](/docs/category/integrations) for detailed integration guides.
:::

## Integrate Tools

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Step by Step" label="Step by Step" default>

### Connect Slack

1. Navigate to **Organization Settings** in the Left Panel
2. Head over to **Third Party Integrations (AI SRE)**
3. By default you will see some connectors. Click on **Connect**
4. Sign into SSO or whatever authentication method is required
5. For Slack, select the required **Workspace** from your list of workspaces
6. Click on **Install Harness AI SRE**

### Connect Monitoring Tools

For monitoring tool integrations (Datadog, New Relic, Grafana, etc.):

1. **Name**, A descriptive name for the integration
2. **Webhook URL**, Copy the provided webhook URL to your monitoring tool
3. **Authentication**, Configure API keys or tokens as required

### Connect Additional Communication Tools

Set up additional communication integrations:

1. **Microsoft Teams**, Configure the Teams connector
2. **Zoom**, Set up meeting automation for incident bridges

### Connect ServiceNow (Optional)

For ServiceNow integration:

1. Configure a ServiceNow connector with read access to the `change_request` table
2. Once configured, ServiceNow change records automatically flow into RCA Change Agent with no additional setup
3. Go to [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent#servicenow-change-integration) to learn how ServiceNow changes appear as root cause theories

:::tip Integration Best Practice
Start with your primary monitoring tool and main communication channel. You can add more integrations later as needed. If your organization already uses a ServiceNow connector for pipeline approvals, change data automatically appears in RCA.
:::

  </TabItem>
  <TabItem value="Interactive Guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/c55a8b8f-bce1-487c-b8ea-5d178a844682?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Integrate Collaboration and Monitoring Tools in Harness AI SRE" />

Use connectors to integrate with Teams, Slack, ServiceNow, and other monitoring tools for real-time incident alerts.

  </TabItem>
</Tabs>

---

## Next Steps

- Go to [Set Up Incident Types](./setup-incident-types.md) to define incident types and severity levels.
- Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/templates/overview) to view all available monitoring tool integrations.
