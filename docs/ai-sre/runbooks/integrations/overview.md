---
title: Runbook Integrations Overview
description: Configure third-party integrations for runbook actions in Harness AI SRE.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/runbooks/configure-project-connectors
- /docs/ai-sre/runbooks/configure-project-connectors
- /docs/incident-response/runbooks/configure-authentication
- /docs/ai-sre/runbooks/integrations/configure-authentication
---

# Runbook Integrations Overview

Harness AI SRE runbooks can integrate with third-party tools to automate incident response workflows.

## Available Integrations

### Collaboration Tools
- [Slack](/docs/ai-sre/runbooks/integrations/collaboration/slack) - Send messages, create channels, manage incident communication
- [Microsoft Teams](/docs/ai-sre/runbooks/integrations/collaboration/teams) - Post messages, create teams, coordinate response
- [Google Chat](/docs/ai-sre/runbooks/integrations/collaboration/google-chat) - Send messages to spaces and threads
- [Zoom](/docs/ai-sre/runbooks/integrations/collaboration/zoom) - Create meetings, generate conference bridges

### Incident Management & On-Call
- [PagerDuty](/docs/ai-sre/runbooks/integrations/incident-management/pagerduty) - Create incidents, trigger escalations, manage on-call
- [OpsGenie](/docs/ai-sre/runbooks/integrations/incident-management/opsgenie) - Create alerts, page teams, acknowledge incidents
- [xMatters](/docs/ai-sre/runbooks/integrations/incident-management/xmatters) - On-call synchronization only (no runbook actions)

### Ticketing & Documentation
- [Jira](/docs/ai-sre/runbooks/integrations/ticketing/jira) - Create issues, add comments, track incident work
- [ServiceNow](/docs/ai-sre/runbooks/integrations/ticketing/servicenow) - Create incidents, update records, manage ITSM workflows
- [Confluence](/docs/ai-sre/runbooks/integrations/ticketing/confluence) - Create pages, update documentation, maintain knowledge base

### Source Control
- [GitHub](/docs/ai-sre/runbooks/integrations/source-control/github) - Create branches, pull requests, issues

### Automation
- [Harness Pipelines](/docs/ai-sre/runbooks/integrations/automation/harness-pipelines) - Trigger deployment pipelines, execute automation

These connectors ensure that actions performed by your runbooks are properly attributed to specific service accounts.

:::note
Project-level connectors provide better accountability and access control compared to organization-level connectors.
:::

---

## Why Project Connectors?

When executing runbook actions that interact with external tools (Zoom, GitHub, Jira), Harness AI SRE needs to authenticate as a specific user or service account. Project connectors ensure:

* Actions are performed using dedicated service accounts
* Activities can be properly tracked and audited
* Access permissions are scoped to project needs
* Integration credentials are managed at the project level

---

## Accessing Project Connectors

To configure project connectors:

1. Sign in to your Harness account
2. Go to your project
3. Go to **Project Settings** → **Third-Party Integrations (IR)**
4. Select the integration type you want to configure

---

## Configuring Project Connectors

### Best Practices

When setting up project connectors:

1. Create dedicated service accounts for runbook actions
2. Use project-specific service accounts rather than shared accounts
3. Document the purpose and ownership of each connector

### Selecting or Creating Connectors

In **Project Settings** → **Third-Party Integrations (IR)**, you can either:

* Select an existing connector from the list if one is already configured with appropriate permissions
* Create a new connector if you need a dedicated service account for your project's runbook actions

### Creating New Connectors

Only follow these steps if you need to create a new connector. If an appropriate connector already exists, you can select it from the list.

#### Zoom Connector

If you need a new Zoom connector:

1. Click **Add Zoom Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: OAuth (recommended)
   * Service Account: Dedicated Zoom account for runbook actions
3. Test the connection
4. Save the configuration

#### GitHub Connector

If you need a new GitHub connector:

1. Click **Add GitHub Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: GitHub App or OAuth
   * Repository Access: Only repositories needed for runbook actions
3. Test the connection
4. Save the configuration

#### Jira Connector

If you need a new Jira connector:

1. Click **Add Jira Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: API Token (recommended)
   * Project Access: Only projects needed for runbook actions
3. Test the connection
4. Save the configuration

---

## Using Project Connectors in Runbooks

When creating runbook actions:

1. Add an integration action (Create Jira Issue, Schedule Zoom Meeting, etc.)
2. The project connector you configured will be automatically used
3. The action will be performed using the service account associated with the connector

:::tip
Always test runbook actions in a non-production environment to verify proper authentication and permissions.
:::

---

## Next Steps

* [Create a Runbook](../create-runbook.md) to start using these integrations.
* [Jira Integration](./ticketing/jira.md) for detailed Jira configuration.
* [Slack Integration](./collaboration/slack.md) for detailed Slack configuration.
