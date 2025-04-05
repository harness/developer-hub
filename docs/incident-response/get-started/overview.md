---
title: Harness Incident Response Overview and Key Concepts
sidebar_position: 1
redirect_from:
- /docs/incident-response/getting-started/
sidebar_label: Overview and Key Concepts
description: Harness Incident Response Overview and Key Concepts
---

# Harness Incident Response (IR) Module

## Overview
Harness Incident Response (IR) is a comprehensive incident management system that enables teams to detect, respond to, and resolve incidents efficiently. It integrates with various monitoring, alerting, and collaboration tools to provide a seamless incident resolution workflow.

## Core Objects

### AI Incident Response Agent
- AI-driven agent for detecting, analyzing, and responding to incidents.
- Supports **voice and chat-based analysis** to discover key events, capture them, and then provide summarization.
<!-- - Supports **Probable Root Cause Analysis** leveraging data accessible in the Harness Platform. ![Coming Soon](https://img.shields.io/badge/Coming%20Soon-blue?style=flat) -->

### Alerts
- Alerts originate from **webhooks** and are referred to as **Integrations**.
- They serve as the primary trigger for incident detection and response.
- Alerts can be deduplicated, normalized, and correlated to prevent redundant alert creation.
- Alerts can be linked to **On-Call Escalations** and **Alert Rules** to determine response criteria.
- Alerts can also trigger **Runbooks** without escalating into an incident.

### Incidents
- Incidents can be created in three ways:
  1. **From Alerts** – when an alert meets predefined criteria.
  2. **Manually from the Web UI** – allowing direct user intervention.
  3. **Via Slack Command (`/ir new`)** – enabling quick incident creation from Slack.
- Incidents link to **Services**, **Runbooks**, **Fire Drills**, and **Change Events**.

### Actions
- Actions are automation tasks provided by Harness.
- Some require **Delegates** (e.g., ServiceNow), while others are built-in (e.g., GitHub actions).
- Examples of Actions:
  - **Post to Slack Channel** – Configurable to specify message content and channel.
  - **Create Incident Slack Channel** – Automatically generates a Slack workspace for an incident.
  - **Create Microsoft Teams Meeting** – Initiates an incident resolution meeting.

### Runbooks
- A **Runbook** is an automated playbook consisting of **one or more Actions**.
- Used for structured incident response workflows.
- Example: **Major Incident Response Runbook**
  1. Create an Incident-specific Slack Channel.
  2. Post an Incident Notification.
  3. Create a Zoom Bridge.
  4. Post bridge details in Slack.
  5. Use **Services Impacted** to invite on-call resources.
  6. Page the Service Team via PagerDuty.
- Runbooks can execute **process actions** or **API interactive actions**.
- Can trigger **Harness Pipelines** for rollback scenarios.

### Delegates
- Delegates facilitate secure execution of Actions that interact with external systems.
- Required for most Actions to run successfully.
- Follows the **Harness Delegate** model to ensure scalability and security.

### Fire Drills
- Fire Drills simulate real incidents to test team preparedness.
- Initiated manually or via **chaos experiments**.
- Used for training and proactive reliability testing.
- Can target **application maps** or specific services.

### Application Maps
- Represents a **group of interacting services**.
- Enables users to manage and monitor services as a single entity.
- Supports testing, monitoring, deployment, and response workflows.

### Change Events (Coming Soon)
- Captures **system modifications** that could impact reliability.
- Examples of Change Events:
  - **Code Changes** (Git commits, pull requests, merges).
  - **Deployments** (CI/CD executions, feature flag activations).
  - **Infrastructure Changes** (Kubernetes updates, scaling events).
  - **Service Modifications** (API changes, new dependencies).
  - **Third-Party Changes** (Datadog alerts, ServiceNow updates).

### On-Call (Coming Soon)
- Ensures availability of personnel for incident response.
- Includes:
  - **Schedules** – Define rotations.
  - **Policies** – Establish escalation rules.
  - **Notifications** – Alert the right responders.

## Relationships Between Objects
- **Alerts → Incidents** – Alerts can escalate into incidents.
- **Changes → Incidents** – Change Events can be root causes of incidents.
- **Fire Drills → Incidents** – Fire drills simulate or trigger incidents.
- **Runbooks → Incidents** – Runbooks provide structured response actions.
- **Services** link to:
  - **Incidents** (for impact assessment).
  - **Alerts** (for ownership resolution).
  - **Fire Drills** (for reference).
  - **Change Events** (for tracking modifications).

## Dashboards & Reporting
The **IR Overview Dashboard** provides key incident metrics:
- **Active Incidents** – Ongoing incidents count.
  - Subtitle: **Mean Time to Resolve (MTTR)** with trends.
- **Recent Alerts** – Count of triggered alerts.
- **SLO Breaches** – Number of breached SLOs.
<!-- - **On-Call Response Time** – Average response time for escalations.-->
<!-- - **Deployment Health** – Success vs. rollback rates.-->
<!-- - **Chaos Experiment Coverage** – % of services with chaos testing.-->
- **System Uptime** – Percentage uptime of monitored services.
- **Mean Time Between Failures (MTBF)** – Measures system stability.

## Integration Points
Harness IR integrates with various monitoring, alerting, and collaboration tools:
### Webhook-Based Integrations:
- **Monitoring & Alerting Systems:**
  - Datadog, New Relic, Splunk, Cloudwatch, Dynatrace, Stackdriver, Grafana, OpsGenie.
- **CI/CD & Development Tools:**
  - GitHub, GitLab, Jenkins, Bitbucket, Octopus Deploy, Harness SLO.
- **ITSM & Incident Management:**
  - ServiceNow, Jira, PagerDuty, VictorOps (Splunk On-Call), BigPanda.
- **Manual & Custom Alert Sources:**
  - Custom Webhooks, Manual Alert Entries.

### API-Based Integrations:
- **Communication & Collaboration:**
  - Slack, Microsoft Teams, Zoom, and Confluence.
- **Incident Response Automation:**
  - PagerDuty, OpsGenie, Harness Pipelines.
- **Feature Flagging & Deployment Control:**
  - Split, GitHub Actions, Jenkins, Harness Pipelines.
- **Observability & Monitoring Enhancements:**
  - Datadog, Grafana Incident.

Harness IR enables seamless, automated incident response through deep integrations, advanced AI capabilities, and structured workflows, ensuring rapid issue resolution and system reliability.

