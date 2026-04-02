---
title: AI SRE Onboarding Guide for Incident Responders
description: A self-service onboarding guide for responders and engineers using Harness AI SRE.
slug: /ai-sre/get-started/onboarding-guide-users/
sidebar_position: 5
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
  - responders
tags:
  - ai-sre
  - incident-response
  - harness-ai-sre
  - onboarding-guide
  - getting-started
  - sre
  - responders
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks you through the essentials of using Harness AI SRE as a responder or engineer. 

You'll learn how to navigate the dashboard, respond to incidents, collaborate with your team, and leverage runbooks and AI-powered tools to resolve issues faster. 

Your administrator has already configured the integrations and incident types — this guide focuses on what you need to know to be effective as an incident responder from day one.

## Prerequisites

Before getting started, confirm the following with your administrator:

| Item | Details |
| --- | --- |
| Harness account access | You have been added to your organization's Harness account with appropriate permissions |
| Slack / Teams connected | The Harness AI SRE bot is installed in your team's Slack workspace or Microsoft Teams environment |
| Monitoring tools configured | Your organization's monitoring tools (Datadog, New Relic, Grafana, etc.) are already integrated |
| On-call schedule (if applicable) | You've been added to your team's on-call rotation in PagerDuty, OpsGenie, or a similar tool |

:::info Need admin setup first?
If your organization hasn't configured AI SRE yet, share the [Administrator Onboarding Guide](/docs/ai-sre/get-started/onboarding-guide-admins/) with your platform team to get started.
:::

## 1. Explore the AI SRE dashboard

<Tabs groupId="ai-sre-user" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/c55a8b8f-bce1-487c-b8ea-5d178a844682?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Explore the Harness AI SRE Dashboard" />

Get familiar with the dashboard layout, active incidents, alerts, and key metrics at a glance.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

The AI SRE dashboard is your central hub for situational awareness during on-call shifts and day-to-day operations.

1. Log in to your **Harness account**.
2. Navigate to **AI SRE** from the left navigation panel.
3. On the dashboard, review:
   - **Active Incidents** — Any ongoing incidents that need attention.
   - **Recent Alerts** — The latest alerts ingested from your monitoring tools.
   - **Metrics & Trends** — Key reliability metrics like MTTR (Mean Time to Resolve) and incident volume.
4. Use the filters at the top to narrow by **incident type**, **severity**, **status**, or **assigned team**.

:::tip Quick Orientation
Bookmark the AI SRE dashboard for quick access during on-call shifts. The active incidents panel updates in real time so you always know the current state of your services.
:::

  </TabItem>
</Tabs>

## 2. Respond to an incident

<Tabs groupId="ai-sre-user" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/50543ebc-97c8-4b92-86c2-bc19cd4fc230?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Respond to an incident in Harness AI SRE" />

Learn how to acknowledge, triage, and begin working on an incident when you're paged or alerted.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

When an incident is created — either automatically from a monitoring alert or manually by a teammate — here's how to respond.

1. You'll receive a notification via **Slack**, **Microsoft Teams**, or your on-call tool (PagerDuty, OpsGenie, etc.).
2. Click the notification link to open the **incident detail page** in Harness.
3. Review the incident summary:
   - **Severity** and **incident type** — Understand the scope and priority.
   - **Timeline** — See the sequence of alerts and events that triggered the incident.
   - **Related alerts** — View correlated monitoring data and affected services.
4. **Acknowledge** the incident to let your team know you're on it.
5. Update the **status** as you work through it (e.g., Investigating → Identified → Monitoring → Resolved).
6. Use the **incident channel** (auto-created in Slack or Teams) to collaborate with other responders in real time.
7. Add **notes and updates** directly in the incident timeline to maintain a clear record of actions taken.

:::info Slack Commands
You can manage incidents without leaving Slack. Use `/harness` slash commands to acknowledge, update status, add notes, and more. See [Managing Incidents in Slack](/docs/ai-sre/get-started/slack-commands) for the full command reference.
:::

  </TabItem>
</Tabs>

## 3. Create an incident manually

<Tabs groupId="ai-sre-user" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/f14f004b-3405-4384-baae-48a035a8eb12?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create a new incident in Harness AI SRE" />

Sometimes you'll spot an issue before automated monitoring catches it. Learn how to declare an incident manually.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

Not every incident starts from an automated alert. If you notice a problem — customer reports, degraded performance you've observed, or a teammate flagging something — you can create an incident manually.

1. Navigate to **Incidents** from the left panel.
2. Click **Create Incident**.
3. Select the appropriate **Incident Type** from the dropdown (your admin has configured these).
4. Fill in the incident details:
   - **Title** — A clear, concise summary (e.g., "Elevated error rates on checkout API").
   - **Severity** — Choose the appropriate level based on impact.
   - **Description** — Provide context: what you're observing, when it started, and any initial hypotheses.
   - Fill in any additional **required fields** or **custom fields** specific to your incident type.
5. Click **Create**.
6. An incident channel will be automatically created in your communication tool, and relevant team members will be notified based on the incident type's configuration.

:::tip From Slack
You can also create incidents directly from Slack using the `/harness new` command. This is especially useful during on-call when you want to stay in your communication tool.
:::

  </TabItem>
</Tabs>

## 4. Use runbooks during an incident

<Tabs groupId="ai-sre-user" queryString>
  <TabItem value="Interactive Guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/48a2f0ca-d07f-4395-aa7b-9b5c2c7b9018?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Use runbooks during an incident" />

Runbooks guide you through predefined response steps and can automate common actions during an incident.

  </TabItem>
  <TabItem value="Step by Step" label="Step by Step">

Runbooks are predefined playbooks that guide you through incident response. Some runbooks run automatically when certain conditions are met; others can be triggered manually.

1. Open the **incident detail page** for an active incident.
2. Navigate to the **Runbooks** tab within the incident.
3. You'll see any runbooks that have been **auto-attached** based on the incident type and trigger conditions.
4. To manually attach a runbook:
   - Click **Add Runbook**.
   - Search for or browse available runbooks.
   - Select the appropriate runbook and confirm.
5. **Execute the runbook** step by step:
   - Each action in the runbook will be displayed in order.
   - Some steps may be **automated** (e.g., restarting a service, scaling infrastructure) — these will run and report their results.
   - Other steps may be **manual** — follow the instructions provided and mark each step complete as you go.
6. Runbook execution progress is logged in the incident timeline for full visibility.

:::tip When to use runbooks
If you're unsure which runbook applies, check the incident type — your administrator has likely associated recommended runbooks with each type. You can also browse all available runbooks under **Runbooks** in the left navigation.
:::

  </TabItem>
</Tabs>

## 5. Use the AI Scribe Agent

The **AI Scribe Agent** works alongside you during incidents to reduce manual overhead and improve post-incident learning.

- **Automatic Summaries** — The AI Scribe monitors your incident channel conversations and generates real-time summaries of key decisions, actions, and findings.
- **Timeline Generation** — It constructs a structured timeline of the incident based on channel activity, status changes, and runbook execution.
- **Post-Incident Reports** — After resolution, the AI Scribe drafts a post-incident report pulling from the incident timeline, channel discussions, and metadata — giving you a head start on your retrospective.

To access AI Scribe outputs, navigate to the **incident detail page** and look for the **AI Summary** and **Timeline** sections.

:::info Learn more
See the full [AI Scribe Agent documentation](/docs/ai-sre/ai-agent) for details on how AI-powered documentation works and how to get the most out of it.
:::

## Next steps {#ai-sre-user-next-steps}

You're now equipped to respond to incidents effectively with Harness AI SRE. To deepen your skills and get even more out of the platform, explore:

- **[Slack Commands Reference:](/docs/ai-sre/get-started/slack-commands)** Master the full set of slash commands for managing incidents directly from Slack.
- **[Understanding Incident Types:](/docs/ai-sre/incidents)** Learn how your organization's incident types map to severity levels, responder teams, and escalation paths.
- **[Browsing Runbooks:](/docs/ai-sre/runbooks/create-runbook)** Explore the runbook library to understand the automated playbooks available to you.
- **[Integration Overview:](/docs/category/integrations)** See which monitoring, communication, and ITSM tools are connected to your AI SRE environment.
- **[AI Scribe Agent:](/docs/ai-sre/ai-agent)** Dive deeper into AI-powered incident documentation and insights.