---
title: Create a Runbook
sidebar_label: Create a Runbook
description: Step-by-step guide on creating and configuring runbooks in Harness Incident Response.
---

# Create a Runbook

This guide walks you through the process of creating a runbook in Harness Incident Response.

## Before You Begin

Ensure you have:
- Access to Harness Incident Response
- Appropriate permissions to create runbooks
- Access to the integrations you plan to use

## Step 1: Design Your Workflow

1. Navigate to **Incident Response** → **Runbooks**
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
- **Slack**
  - Send notifications
  - Create channels
  - Start threads
- **Microsoft Teams**
  - Team notifications
  - Updates
- **Zoom**
  - Create meetings
  - Manage participants

#### Incident Response Automation
- **PagerDuty**
  - On-call notifications
  - Escalations
- **OpsGenie**
  - Alert management
  - Routing
- **Harness Pipelines**
  - Remediation workflows
  - Service management

#### Feature Flagging & Deployment
- **Split**
  - Feature management
- **GitHub Actions**
  - Workflow triggers
- **Jenkins**
  - Job execution

#### Observability & Monitoring
- **Datadog**
  - Metric analysis
  - Alerts
- **Grafana Incident**
  - Incident correlation

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

- [Configure Authentication for Actions](./configure-authentication.md)
- [Configure Incident Fields](./configure-incident-fields.md)
- [Set Up Integrations](./configure-integrations.md)
