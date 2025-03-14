---
title: Runbook Automation Overview
sidebar_label: Overview
description: Learn about Harness Incident Response Runbook Automation - a powerful tool for automating incident response with integrations for communication, remediation, and monitoring.
---

# Runbook Automation Overview

Harness Incident Response (**IR**) allows teams to **automate incident resolution** by leveraging **Runbook automation**. Runbooks provide predefined workflows that execute **automated actions** based on specific triggers.

## Overview

Runbooks are automated playbooks that codify your team's best practices for incident response. They help standardize response procedures, reduce human error, and accelerate incident resolution.

### Key Features

- **Automated Actions**
  - Execute predefined response procedures
  - Integrate with external tools and systems
  - Run diagnostic commands
  - Implement remediation steps

- **Trigger Conditions**
  - Alert-based triggers
  - Severity-based execution
  - Time-based triggers
  - Manual execution options

- **Customizable Workflows**
  - Sequential and parallel execution
  - Conditional branching
  - Error handling and rollback procedures
  - Approval gates for critical actions

### Common Use Cases

1. **Infrastructure Management**
   - Automated system diagnostics
   - Resource scaling
   - Configuration updates
   - Service restarts

2. **Security Response**
   - Threat containment
   - Access control modifications
   - Log collection and analysis
   - Security tool integration

3. **Application Recovery**
   - Database failover
   - Cache clearing
   - Load balancer configuration
   - Feature flag management

## Integration Support

Runbooks support the following API-based integrations:

### Communication & Collaboration
- **Slack**: Notifications, channels, threads
- **Microsoft Teams**: Team notifications and updates
- **Zoom**: Meeting creation and management

### Incident Response Automation
- **PagerDuty**: On-call notifications and escalations
- **OpsGenie**: Alert management and routing
- **Harness Pipelines**: Automated remediation workflows

### Feature Flagging & Deployment Control
- **Split**: Feature flag management
- **GitHub Actions**: Workflow triggers
- **Jenkins**: Job execution
- **Harness Pipelines**: Deployment automation

### Observability & Monitoring
- **Datadog**: Metric analysis and alerts
- **Grafana Incident**: Incident correlation

## Example Runbook Templates

### 1. High CPU Usage Alert Response
**Purpose**: Coordinate response across teams with automated remediation

**Trigger Configuration**:
- Alert Type: Datadog Metric Alert
- Metric: CPU Usage
- Threshold: > 90%
- Duration: 5 minutes

**Action Steps**:
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

### 2. Database Connection Alert
**Purpose**: Multi-channel incident response coordination

**Trigger Configuration**:
- Alert Type: Grafana Incident
- Service: Database
- Condition: Connection Timeout
- Priority: High

**Action Steps**:
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

### 3. API Error Rate Response
**Purpose**: Feature management and incident coordination

**Trigger Configuration**:
- Alert Type: Datadog
- Metric: Error Rate
- Threshold: > 5%
- Time Window: 5 minutes

**Action Steps**:
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
   - Invite: API Team, Product, Support

## Creating Runbooks

### Step 1: Design Workflow
1. Navigate to the Runbooks section
2. Select "Create New Runbook"
3. Build your workflow:
   - Add Slack notifications
   - Configure pipeline executions
   - Set up action sequences
   - Define variables

### Step 2: Configure Triggers
1. Set up trigger conditions:
   - Alert patterns
   - Service impacts
   - Time windows
   - Manual triggers

### Step 3: Test and Deploy
1. Run in test environment
2. Validate notifications
3. Review pipeline executions
4. Deploy to production

## Best Practices

- **Start Simple**: Begin with basic automation and gradually add complexity
- **Include Documentation**: Add detailed descriptions for each action
- **Monitor Execution**: Track runbook performance and success rates
- **Regular Updates**: Keep runbooks current with system changes
- **Access Control**: Implement proper authorization for critical actions

## Best Practices for Using Runbook Automation
- Start with simple notification-based runbooks
- Use pipelines for complex remediation actions
- Include pipeline status in notifications
- Create dedicated incident channels for coordination
- Consider timezone-aware notifications for global teams

## How to Trigger Runbook Automation

### **1. Automatically Trigger Runbooks from an Incident or Alert**
Runbooks can be configured to **automatically execute** when a new incident or alert meets predefined conditions.

#### **Steps to Configure Automatic Triggers:**
1. Navigate to **Runbooks** →
2. Edit an existing runbook or [create a new one](#)
	- Select the Trigger tab
3. Define trigger conditions, such as:
   - **Incident severity** (e.g., P1 or P2)
   - **Service impacted** (e.g., API Gateway, Database)
   - **Specific integration type** (e.g., Integration:Kubernetes)
4. Click **Save** to apply the trigger rule.

> **Example:** If an incident is categorized as **Sev0**, a **Runbook can automatically scale additional resources** to mitigate impact.

### **2. Manually Trigger a Runbook from an Active Incident or Alert**
Teams can **manually trigger** Runbooks to **execute predefined actions** during an active incident or an alert.

#### **Steps to Manually Trigger a Runbook:**
1. Open the **Incident or Alert Details** page.
2. Click **Runbooks**.
3. Select **Execute Additional Runbook** and choose from the available list.
4. Confirm execution to **initiate**.
5. Track Runbook progress in the **Timeline**.

Next Steps
- [Configuring Automated Incident Response](#)
- [Integrating Runbooks with Supported Tools](#)
- [Using AI Insights to Trigger Runbook Actions](#)