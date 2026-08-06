---
title: Runbook Management
sidebar_label: Overview
sidebar_position: 1
description: Automate incident response with integrations for communication, remediation, and monitoring.
keywords:
  - runbooks
  - incident response
  - automation
  - remediation
tags:
  - ai-sre
  - runbooks
redirect_from:
- /docs/incident-response/runbooks/runbooks
---

Harness AI SRE allows teams to **automate incident resolution** by leveraging **Runbook automation**. Runbooks provide predefined workflows that execute **automated actions** based on specific triggers.

## Key features

### Automated response actions
- Instant incident communication
- Automated remediation steps
- Multi-channel notifications
- Integrated team collaboration

### Integration ecosystem
- **Communication tools**
  - [Slack](/docs/ai-sre/runbooks/integrations/collaboration/slack): Channel management and notifications
  - [Microsoft Teams](/docs/ai-sre/runbooks/integrations/collaboration/teams): Team collaboration
  - [Zoom](/docs/ai-sre/runbooks/integrations/collaboration/zoom): Incident bridges

- **Ticketing systems**
  - [Jira](/docs/ai-sre/runbooks/integrations/ticketing/jira): Issue tracking and updates
  - [ServiceNow](/docs/ai-sre/runbooks/integrations/ticketing/servicenow): Incident management

---

## Getting started

1. [Create your first runbook](/docs/ai-sre/runbooks/create-runbook)
   - Design workflows
   - Configure triggers
   - Test and deploy

2. [Configure authentication](/docs/ai-sre/runbooks/integrations/overview)
   - Set up integration access
   - Manage permissions
   - Secure your runbooks

3. [Configure incident fields](/docs/ai-sre/runbooks/workflows/overview)
   - Define custom fields
   - Set up field mapping
   - Configure templates

---

## Example runbook templates

### 1. High CPU usage response
**Purpose:** Automated response to CPU spikes

**Trigger configuration:**
- Alert Type: Datadog
- Metric: CPU Usage
- Threshold: > 90%
- Duration: 5 minutes

**Action steps:**
1. **Initial Alert**
   - Action Type: Slack
   - Channel: #sre-alerts
   - Message: "🚨 High CPU Alert: [service] CPU usage > 90% for 5 minutes"

2. **Create Incident Bridge**
   - Action Type: Zoom
   - Operation: Create Meeting
   - Name: "CPU Incident - [service]"
   - Participants: SRE Team

3. **Automated Remediation**
   - Action Type: Harness Pipeline
   - Pipeline: Scale Service Pipeline
   - Input Variables:
     - Service: [service]
     - Replicas: +2

4. **On-Call Notification**
   - Action Type: PagerDuty
   - Priority: High
   - Assignee: SRE On-Call
   - Details: "High CPU incident - Scaling pipeline initiated"

### 2. Database connection alert
**Purpose:** Multi-channel incident response coordination

**Trigger configuration:**
- Alert Type: Grafana Incident
- Service: Database
- Condition: Connection Timeout
- Priority: High

**Action steps:**
1. **Create Teams Channel**
   - Action Type: Microsoft Teams
   - Operation: Create Channel
   - Name: "db-incident-[timestamp]"
   - Add Team: Database Support

2. **Execute Recovery**
   - Action Type: Jenkins
   - Job: DB-Recovery-Job
   - Parameters:
     - Service: [database_service]
     - Action: restart_connections

3. **Status Update**
   - Action Type: OpsGenie
   - Operation: Create Alert
   - Team: Database
   - Message: "🔴 DB Connection Issues - Recovery Job Status: [jenkins.status]"

4. **Incident Management**
   - Action Type: Grafana Incident
   - Operation: Update
   - Status: Investigating
   - Note: "Recovery procedures initiated via Jenkins"

### 3. API error rate response
**Purpose:** Feature management and incident coordination

**Trigger configuration:**
- Alert Type: Datadog
- Metric: Error Rate
- Threshold: > 5%
- Time Window: 5 minutes

**Action steps:**
1. **Feature Control**
   - Action Type: Split
   - Operation: Disable Feature
   - Feature Name: new_api_version
   - Environment: production

2. **Pipeline Execution**
   - Action Type: GitHub Actions
   - Workflow: api-recovery
   - Inputs:
     - service: [service]
     - action: rollback

3. **Team Communication**
   - Action Type: Slack
   - Channel: #api-incidents
   - Message: "⚠️ API Error Rate Incident\n- Feature flag disabled\n- Recovery workflow status: [github.status]"

4. **Stakeholder Bridge**
   - Action Type: Zoom
   - Operation: Create Meeting
   - Name: "API Incident Bridge"
   - Participants: ["@api-team", "@product"]

---

## Next steps

### Documentation
- [Create a runbook](/docs/ai-sre/runbooks/create-runbook)
- [Configure authentication](/docs/ai-sre/runbooks/integrations/overview)
- [Configure incident fields](/docs/ai-sre/runbooks/workflows/overview)

### Integration guides
- Communication tools
  - [Slack integration](/docs/ai-sre/runbooks/integrations/collaboration/slack)
  - [Microsoft Teams integration](/docs/ai-sre/runbooks/integrations/collaboration/teams)
  - [Zoom integration](/docs/ai-sre/runbooks/integrations/collaboration/zoom)
- Ticketing systems
  - [Jira integration](/docs/ai-sre/runbooks/integrations/ticketing/jira)
  - [ServiceNow integration](/docs/ai-sre/runbooks/integrations/ticketing/servicenow)
