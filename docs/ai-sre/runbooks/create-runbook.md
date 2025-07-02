---
title: Create a Runbook
sidebar_label: Create a Runbook
sidebar_position: 2
description: Step-by-step guide on creating and configuring runbooks in Harness AI SRE.
---

# Create a Runbook

This guide walks you through the process of creating a runbook in Harness AI SRE.

## Before You Begin

Ensure you have:
- Access to Harness AI SRE
- Appropriate permissions to create runbooks
- Access to the integrations you plan to use

## Step 1: Design Your Workflow

1. Navigate to **AI SRE** → **Runbooks**
2. Click **+ New Runbook**
3. Enter a name and description for your runbook
4. Build your workflow:
   - Add actions (Slack notifications, pipeline executions, etc.)
   - Configure action parameters
   - Set up action sequences
   - Define workflow variables

### Available Actions

Choose from these integration categories:

#### Communication & Collaboration
- **[Slack](./integrations/slack.md)**
  - Send notifications
  - Create channels
  - Start threads
- **[Microsoft Teams](./integrations/teams.md)**
  - Team notifications
  - Updates
- **[Zoom](./integrations/zoom.md)**
  - Create meetings
  - Manage participants
- **[Harness Pipelines](./integrations/harness-pipelines.md)**
  - Send Notifications
  - 

#### Incident Response Automation
- **[Jira](./integrations/jira.md)**
  - Issue tracking
  - Status updates
- **[ServiceNow](./integrations/servicenow.md)**
  - Incident management
  - Change requests
- **[Harness Pipelines](./integrations/harness-pipelines.md)**
  - Remediation workflows
  - Service management

## Step 2: Configure Triggers

After designing your workflow, set up triggers that will initiate your runbook:

1. Click the **Triggers** tab
2. Configure trigger conditions:
   - Alert patterns
   - Service impacts
   - Time windows
   - Manual triggers
3. Save your trigger configuration

## Step 3: Test Your Runbook

Before deploying to production:

1. Test in a non-production environment
2. Validate all notifications
3. Review pipeline executions
4. Check integration responses

## Best Practices

- Start with simple workflows and gradually add complexity
- Use clear naming conventions for variables
- Include appropriate stakeholders in notifications
- Document expected outcomes
- Set up proper error handling

## Next Steps

### Documentation
- [Configure Authentication](./configure-authentication.md)
- [Configure Incident Fields](./configure-incident-fields.md)
- [Return to Overview](./runbooks.md)

### Integration Guides
- Communication Tools
  - [Slack Integration](./integrations/slack.md)
  - [Microsoft Teams Integration](./integrations/teams.md)
  - [Zoom Integration](./integrations/zoom.md)
- Ticketing Systems
  - [Jira Integration](./integrations/jira.md)
  - [ServiceNow Integration](./integrations/servicenow.md)
