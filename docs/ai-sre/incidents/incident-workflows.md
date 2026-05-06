---
title: Automate Incident Response with Runbooks
description: Learn how to automate incident workflows using runbooks and triggers in Harness AI SRE.
sidebar_label: Automate Incident Response
sidebar_position: 3
redirect_from:
- /docs/incident-response/incidents/incident-workflows
---

# Automate Incident Response with Runbooks

Learn how to automate incident response workflows in Harness AI SRE using runbooks, triggers, and integrations.

## Overview

AI SRE automates incident workflows through:
- **Runbooks** - Sequences of automated actions (notifications, API calls, scripts)
- **Triggers** - Conditions that automatically execute runbooks (alert rules, incident events, status changes)
- **Alert Rules** - Route alerts to on-call teams and auto-create incidents
- **Integrations** - Connect to Slack, Jira, ServiceNow, Zoom, PagerDuty, and more

Workflow automation in AI SRE uses **form-based UI configuration with Mustache templates**, not YAML files. Actions are configured through forms where you can:
- Select integration type (Slack, Jira, HTTP, etc.)
- Fill in action parameters using form fields
- Reference incident data using Mustache syntax like `{{incident.title}}` or `{{alert.severity}}`
- Test actions before saving

## Automation Patterns

### Pattern 1: Alert Detection → Incident Creation

**Use case**: Automatically create incidents from high-severity alerts

**How to configure**:

1. Navigate to **Alerts** → **Alert Rules**
2. Click **Create Alert Rule**
3. Configure the rule:
   - **Name**: "P1/P2 Alerts Auto-Create Incidents"
   - **Conditions**: `alert.priority` in `[p1_critical, p2_error]`
   - **Action**: Create Incident
     - **Incident Type**: Select "Service Incident"
     - **Map Fields**:
       - Title: `{{alert.title}}`
       - Service: `{{alert.service}}`
       - Severity: `{{alert.priority}}`
4. Click **Save**

**Result**: When P1 or P2 alerts are received, incidents are automatically created with pre-populated fields.

---

### Pattern 2: Incident Creation → Automated Response

**Use case**: When a P1 incident is created, automatically notify on-call, create Zoom bridge, and trigger diagnostic runbook

**How to configure**:

1. Create a runbook for P1 response:
   - Navigate to **Runbooks** → **Create Runbook**
   - **Name**: "P1 Incident Response"
   - Add actions:
     1. **Zoom: Create Meeting**
        - Name: `{{incident.title}} - Incident Bridge`
        - Participants: `{{incident.responders}}`
     2. **Slack: Post Message**
        - Channel: `#incidents`
        - Message: 
          ```
          🔴 **P1 Incident Created**
          **Title**: {{incident.title}}
          **Service**: {{incident.service}}
          **Zoom Bridge**: {{runbook.outputs.zoom_create_meeting.join_url}}
          **Incident Link**: {{incident.url}}
          ```
     3. **On-Call: Page Service**
        - Service: `{{incident.service}}`
        - Message: `P1 incident - join bridge at {{runbook.outputs.zoom_create_meeting.join_url}}`

2. Configure automatic trigger:
   - In the runbook editor, go to **Triggers** tab
   - Click **Add Trigger**
   - **Trigger Type**: Incident Created
   - **Conditions**: 
     - `incident.severity` equals `SEV0` OR `SEV1`
   - Click **Save**

**Result**: P1 incidents automatically trigger the runbook, creating a Zoom bridge and notifying responders.

---

### Pattern 3: Status Change → Stakeholder Notification

**Use case**: When incident status changes to "Resolved", notify stakeholders and create post-incident review task

**How to configure**:

1. Create a runbook:
   - **Name**: "Incident Resolution Workflow"
   - Add actions:
     1. **Slack: Post Message**
        - Channel: `#incidents`
        - Message:
          ```
          ✅ **Incident Resolved**
          **Title**: {{incident.title}}
          **Duration**: {{incident.duration}}
          **Resolved By**: {{incident.resolver}}
          Post-incident review scheduled.
          ```
     2. **Jira: Create Issue**
        - Project: `SRE`
        - Issue Type: Task
        - Summary: `Post-Incident Review: {{incident.title}}`
        - Description:
          ```
          Incident: {{incident.url}}
          Duration: {{incident.duration}}
          Severity: {{incident.severity}}
          
          Complete post-incident review within 3 business days.
          ```
        - Assignee: `{{incident.owner}}`

2. Configure trigger:
   - **Trigger Type**: Incident Field Updated
   - **Field**: Status
   - **New Value**: Resolved

**Result**: When incidents are marked resolved, stakeholders are notified and a review task is created in Jira.

---

### Pattern 4: Time-Based Escalation

**Use case**: If a P1 incident isn't acknowledged within 5 minutes, escalate to VP Engineering

**How to configure**:

1. Create escalation runbook:
   - **Name**: "P1 Escalation"
   - Add actions:
     1. **Slack: Post Message**
        - Channel: `#exec-alerts`
        - Message: 
          ```
          🚨 **ESCALATION: P1 Incident Not Acknowledged**
          **Title**: {{incident.title}}
          **Created**: {{incident.created_at}}
          **Service**: {{incident.service}}
          **Link**: {{incident.url}}
          
          @vp-engineering - immediate attention required
          ```
     2. **PagerDuty: Trigger Escalation**
        - Escalation Policy: "Executive Escalation"

2. Configure trigger:
   - **Trigger Type**: Incident Created
   - **Conditions**: 
     - `incident.severity` equals `SEV0` OR `SEV1`
   - **Delay**: 5 minutes
   - **Only run if**: `incident.status` not equals `Acknowledged`

**Result**: If P1 incidents remain unacknowledged for 5 minutes, executives are paged.

---

### Pattern 5: Deployment Change → Proactive Investigation

**Use case**: When a deployment occurs, automatically check for related alerts and create incident if errors spike

**How to configure**:

1. Send deployment webhooks to AI SRE:
   - Configure your CI/CD pipeline to POST deployment events to:
     ```
     POST https://app.harness.io/gateway/ai-sre/api/v1/orgs/{org}/projects/{project}/webhooks/deploy
     ```
   - Webhook payload:
     ```json
     {
       "service": "payment-service",
       "version": "v2.3.1",
       "environment": "production",
       "deployed_by": "jane@company.com",
       "git_commit": "abc123"
     }
     ```

2. AI SRE automatically:
   - Correlates the deployment with any alerts occurring within 30 minutes
   - Surfaces the deployment as a root cause theory in investigations
   - Links related pull requests for code review

**No additional configuration needed** - deployment correlation is automatic when webhooks are sent.

---

## Runbook Components

### Actions

Runbooks execute sequences of actions. Available action types:

#### Communication Actions
- **Slack: Post Message** - Send formatted messages to Slack channels
- **Slack: Update Message** - Update existing Slack messages
- **Microsoft Teams: Post Message** - Send messages to Teams channels
- **Google Chat: Post Message** - Send messages to Google Chat spaces
- **Zoom: Create Meeting** - Generate instant Zoom bridges

#### Ticketing Actions
- **Jira: Create Issue** - Create Jira tickets with incident context
- **Jira: Update Issue** - Update existing Jira issues
- **ServiceNow: Create Incident** - Create ServiceNow incidents
- **ServiceNow: Update Incident** - Update ServiceNow incidents

#### Deployment Actions
- **Harness: Run Pipeline** - Trigger Harness CD pipelines (rollback, scale, deploy)

#### On-Call Actions
- **Page Service** - Page the on-call responders for a service
- **Page User** - Directly page a specific user
- **Page Team** - Page all members of a team

#### Custom Actions
- **HTTP Request** - Call any REST API
- **Script** - Run custom JavaScript/Python logic

### Action Inputs

Actions use form-based configuration with Mustache template support:

**Text fields** accept Mustache variables:
```
Title: {{incident.title}}
Service: {{incident.service}}
Owner: {{incident.owner}}
```

**Available variables**:
- `{{incident.*}}` - Current incident fields (title, severity, service, owner, status, etc.)
- `{{alert.*}}` - Alert fields if runbook triggered by alert rule
- `{{runbook.outputs.*}}` - Outputs from previous actions in the runbook
- `{{user.*}}` - User who triggered the runbook (name, email)

**Example: Reference previous action output**
```
Action 1: Zoom: Create Meeting
  → Outputs: join_url, meeting_id

Action 2: Slack: Post Message
  Message: Join the incident bridge at {{runbook.outputs.zoom_create_meeting.join_url}}
```

### Triggers

Runbooks can be triggered:

#### Manual Execution
- Run from incident timeline
- Run from pinned runbooks list
- Run via `/harness run <slug>` Slack command

#### Automatic Triggers

**Incident Created**
- Condition: `incident.severity in [SEV0, SEV1]`
- Runs when new incidents match conditions

**Incident Field Updated**
- Condition: `incident.status changed_to Resolved`
- Runs when specific fields change

**Alert Rule Match**
- Configured in alert rules
- Runs when alerts meet routing criteria

**Scheduled**
- Cron syntax: `0 9 * * 1` (every Monday at 9am)
- Use for: daily health checks, weekly reports

### Conditions

Trigger conditions use field comparisons:

**Operators**:
- `equals`, `not_equals`
- `in`, `not_in` (for arrays)
- `changed_to`, `changed_from` (for field updates)
- `contains`, `not_contains` (for strings)
- `greater_than`, `less_than` (for numbers)

**Examples**:
```
incident.severity in [SEV0, SEV1]
incident.service equals payment-service
incident.status changed_to Resolved
alert.priority equals p1_critical
```

## Integration Examples

### Slack Incident Channel Creation

**Goal**: Create a dedicated Slack channel for each P1 incident

1. Enable Slack integration:
   - Navigate to **Project Settings** → **Integrations**
   - Connect Slack workspace

2. Create runbook:
   - Action: **Slack: Create Channel**
     - Channel Name: `inc-{{incident.short_id}}-{{incident.service}}`
     - Topic: `{{incident.title}} - {{incident.severity}}`
     - Invite Users: `{{incident.responders}}`
   - Action: **Slack: Post Message**
     - Channel: `{{runbook.outputs.slack_create_channel.channel_id}}`
     - Message: 
       ```
       🚨 **Incident Summary**
       **Service**: {{incident.service}}
       **Severity**: {{incident.severity}}
       **Owner**: {{incident.owner}}
       
       View details: {{incident.url}}
       ```

3. Configure trigger:
   - **Trigger Type**: Incident Created
   - **Conditions**: `incident.severity in [SEV0, SEV1]`

### Jira Bidirectional Sync

**Goal**: Create Jira tickets for incidents and sync status updates

**Outbound (AI SRE → Jira)**:

1. Create runbook:
   - Action: **Jira: Create Issue**
     - Project: `INCIDENT`
     - Summary: `{{incident.title}}`
     - Description: 
       ```
       Incident: {{incident.url}}
       Service: {{incident.service}}
       Severity: {{incident.severity}}
       ```
   - Action: **AI SRE: Add Timeline Event**
     - Description: `Jira ticket created: {{runbook.outputs.jira_create_issue.issue_key}}`

2. Trigger: Incident Created with severity P1/P2

**Inbound (Jira → AI SRE)**:

Requires custom configuration using Jira Automation Rules:

1. In Jira, create automation rule:
   - **Trigger**: Issue Updated
   - **Condition**: Status changed
   - **Action**: Send web request
     - URL: `https://app.harness.io/gateway/ai-sre/api/v1/incidents/{{issue.customfield_incident_id}}/status`
     - Method: PUT
     - Body: `{"status": "{{issue.status}}"}`

See [Jira Integration Guide](../runbooks/runbook-action-integrations/jira.md) for complete setup.

### ServiceNow Change Correlation

**Goal**: Automatically surface ServiceNow change requests in incident investigations

1. Configure ServiceNow connector:
   - Navigate to **Project Settings** → **Connectors**
   - Add ServiceNow connector with credentials

2. Enable RCA Change Agent:
   - The agent automatically polls ServiceNow every 5 minutes
   - Change requests are correlated with incidents by:
     - Time window (changes within 1 hour of incident)
     - Service/CI matching
     - Configuration item relationships

3. View correlated changes:
   - Open an incident
   - Go to **Investigation** tab
   - ServiceNow changes appear as root cause theories

See [RCA Change Agent](../ai-agent/rca-change-agent.md) for details.

## Best Practices

### Start Simple
- Begin with 1-2 critical workflows (e.g., P1 notifications)
- Add automation incrementally as you validate effectiveness
- Avoid over-automating before processes are stable

### Test Thoroughly
- Use runbook test mode to validate actions without creating real incidents
- Test with non-production services first
- Verify Mustache variables render correctly with sample data

### Handle Failures Gracefully
- Add error notifications if critical actions fail
- Use HTTP action retries for flaky APIs
- Monitor runbook execution logs for patterns

### Monitor Effectiveness
- Track runbook execution success rates
- Measure time-to-response improvements
- Gather feedback from incident responders
- Iterate based on what works

### Document Runbook Purpose
- Add clear descriptions to each runbook
- Document what triggers it and what it does
- Note any prerequisites (credentials, permissions)
- Keep runbooks focused on single workflows

## Related Documentation

- [Create a Runbook](../runbooks/create-runbook.md) - Detailed runbook creation guide
- [Runbook Triggers](../runbooks/create-trigger.md) - Configure automatic execution
- [Alert Rules](../alerts/alert-rules.md) - Route alerts and auto-create incidents
- [Slack Integration](../runbooks/runbook-action-integrations/slack.md) - Slack action reference
- [Jira Integration](../runbooks/runbook-action-integrations/jira.md) - Jira action reference
