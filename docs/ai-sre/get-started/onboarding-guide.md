---
title: AI SRE onboarding guide
description: A self-service onboarding guide for Harness AI SRE.
slug: /ai-sre/get-started/onboarding-guide/
sidebar_position: 4
sidebar_label: Get Started
keywords:
  - ai sre
  - incident response
  - harness ai sre
  - harness incident response
  - harness sre
  - site reliability engineering
  - incident management
  - automated response
  - runbooks
  - webhooks
tags:
  - ai-sre
  - incident-response
  - harness-ai-sre
  - onboarding-guide
  - getting-started
  - sre
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide introduces you to the powerful capabilities of Harness AI SRE, providing a comprehensive approach to proactively managing and resolving incidents with real-time insights, alerts, and seamless integration. When you configure AI SRE in Harness, we orchestrate intelligent incident detection, automated response workflows, and collaborative resolution processes across your monitoring and communication tools.

## Prerequisites

Before beginning the walkthroughs in this guide, ensure you have:
| Item | Details / Link |
| --- | --- |
| Harness account | AI SRE Feature flag enabled (contact your sales representative or reach out to the team at [ai-sre-support@harness.io](mailto:support@harness.io)) |
| Monitoring tools | Integration with monitoring systems like Datadog, New Relic, or Grafana |
| Communication platforms | Slack, Microsoft Teams, or Zoom for incident collaboration |
| On-call management | PagerDuty, OpsGenie, or similar on-call scheduling tools (optional) |

:::info supported tools & platforms
Go to [What's supported with Harness AI SRE](/docs/ai-sre/resources/whats-supported) for a full list of supported **monitoring & observability** tools, **communication & collaboration** platforms, and **on-call & escalation management** tools.
:::

<DocImage path={require('./static/ai-sre-dashboard.png')} width="90%" height="90%" title="Steps to Get started on AI SRE" />

## 1. Integrate your collaboration and monitoring tools

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/c55a8b8f-bce1-487c-b8ea-5d178a844682?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Integrate Collaboration and Monitoring Tools in Harness AI SRE" />

Use connectors to integrate with Teams, Slack, ServiceNow, and other monitoring tools for real-time incident alerts.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

:::info Important Note
AI SRE works best when integrated with your existing monitoring and collaboration tools. This enables real-time incident detection and seamless team coordination.

Go to  [AI SRE Integrations documentation](/docs/category/integrations) for details integrations guides.
:::

1. Navigate to **Organization Settings** in the Left Panel.
2. Head over to **Third Party Integrations (AI SRE)**.
3. By default you will see some connectors. Click on **Connect**.
4. Sign into SSO or whatever authentication method is required.
5. For Slack, select the required **Workspace** from your list of workspaces.
6. Click on **Install Harness AI SRE**.

7. For monitoring tool integrations (Datadog, New Relic, Grafana, etc.):
   - **Name** - A descriptive name for the integration
   - **Webhook URL** - Copy the provided webhook URL to your monitoring tool
   - **Authentication** - Configure API keys or tokens as required

8. Set up additional communication integrations:
   - **Microsoft Teams** - Configure the Teams connector
   - **Zoom** - Set up meeting automation for incident bridges

:::tip Integration Best Practice
Start with your primary monitoring tool and main communication channel. You can add more integrations later as needed.
:::

  </TabItem>
</Tabs>

## 2. Set up your incident types

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/50543ebc-97c8-4b92-86c2-bc19cd4fc230?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Set up your incident types" />

Define incident types to standardize severity levels, responders, and escalation paths.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

Define Incident Types for your teams to standardize your response process by defining severity levels, response teams, and escalation procedures.

1. Navigate to **Incidents**.
2. Click on **Incident Types**.
3. Click on **Create Incident Type**.
4. Fill details in the form with the incident type information.
5. Click on **Save**.

6. Once Incident type is created, you can configure the incident fields:
   - Check the **Default Fields** and **Custom fields**, and update them as per the requirements.
   - Click on the **edit icon** to check the default fields.
   - You can set **Optional fields** as **Required**.
   - Click on **Save**.

7. Click on **Add Custom Field** to add any extra fields as part of Incident creation form:
   - Fill in the details of the additional field and hit **Save**.

8. Click on **Creation Form**:
   - By default, you will have a creation form for the selected fields from the left pane.
   - Click on the **checkbox** to add any more fields to the form as per your requirements.

9. Test your incident type:
   - Fill in the details of the incident in text fields.
   - Type or fill from the dropdown options.
   - Click on **Create** to make a new incident of the new incident type.
   - Hit **Save** from the top right.

10. Additionally, you can add **runbooks** to your incident type for automated response workflows.

  </TabItem>
</Tabs>

## 3. Configure your first webhook

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/f14f004b-3405-4384-baae-48a035a8eb12?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure webhooks in Harness AI SRE" />

Send events from external tools, like alerts, builds, deployments, and config changes. Categorize them to track and respond effectively.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

Webhooks enable external tools to automatically create alerts and incidents in AI SRE.

1. Click on **Integrations**.
2. Click on **New Integration**.
3. Fill in the details for the Webhook:
   - You can select the type - **Incident**, **Alert**, **Deployment**, **Build**
   - Select the **Template type** from the dropdown list
   - Click on **Save**

4. Once the integration is saved, you will receive a **URL** that you can configure on the application with which you want the integration to happen. This step varies from tool to tool, and can be checked in the documentation of those applications.

5. Next, Click on **Payload Configuration**:
   - You will get the default values of the payload configuration for the template you have selected.
   - You can wish to add more data from the configuration by clicking on the **checkbox** and extracting it.
   - Click on **Next** on the bottom of the page.

6. You will be able to view the **Mapped Fields** which you have selected in the previous step:
   - You can fill in the values on the mapped fields simply by **dragging and dropping** from the saved fields pane.

7. You can also add any **custom fields** that you want in your integration payload:
   - Just simply scroll down and select **Add Field**.
   - Fill the details of the custom field and hit **Save**.
   - **Drag and drop** the values from the saved fields to the custom field placeholder added. You can choose to manually add it or use the **Data picker** too.
   - Click on **Next**.

8. You can now **test the integration** with the cURL command, the POST request contains the endpoint URL which will be used for the integration.

9. Finally, click on **Save** on the top right, the integration is ready.

  </TabItem>
</Tabs>

## 4. Create your first runbook

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/48a2f0ca-d07f-4395-aa7b-9b5c2c7b9018?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create  runbook in AI SRE" />

Automate response actions and guide responders step-by-step during incidents.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

Runbooks automate incident response actions and provide step-by-step guidance for responders.

1. Navigate to **Runbooks** from the left pane.
2. Click on **New Runbook**.
3. Fill the creation form with the details.
   - Fill in the runbook details
   - Click on **Save**

4. Click on **New Action**.
5. Select the action from the categories you want to add in your runbook. The actions have been classified into different categories based on the use case.
6. Select the action:
   - Select the action
   - Click on **Select**

7. Fill the details for the selected action.
8. Click on **Save**.
9. Once saved, you can add more actions:
   - Click on **New Action**
   - Then, **Select Action** and repeat the steps and save.

10. Additionally, you can add triggers for your runbooks. Click on **Triggers** (This step is optional).
11. Click on **New Trigger**.
12. Select the **Incident type** from the dropdown with which you want to attach the runbook.
13. Define the **condition of the trigger**.
14. Click on **Save** from the top right.

  </TabItem>
</Tabs>

## Next steps {#ai-sre-next-steps}

This guide introduced you to the core functionalities and setup of Harness AI SRE, from integrating monitoring tools to creating automated runbooks. To enhance your incident response capabilities and team efficiency, get the most out of Harness AI SRE's advanced features, including:

- **[Managing Incidents in Slack:](/docs/ai-sre/incidents/slack-commands)** Use Slack slash commands to create, manage, and resolve incidents directly from your workspace.
- **[Advanced Runbooks:](/docs/ai-sre/runbooks/create-runbook)** Build sophisticated automation workflows with multiple actions, triggers, and conditional logic.
- **[Integration Library:](/docs/category/integrations)** Connect with ServiceNow, Jira, and other ITSM tools for seamless incident management workflows.
- **[AI Scribe Agent:](/docs/ai-sre/ai-agent)** Leverage AI-powered documentation and insights to capture incident communications automatically.
