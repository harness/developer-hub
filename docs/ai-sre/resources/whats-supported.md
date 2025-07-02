---
title: What's Supported in Harness AI SRE
description: Supported Platforms and Features in Harness AI SRE
sidebar_label: What’s Supported
sidebar_position: 10
---

This page outlines the supported platforms, integrations, and features available in Harness AI SRE.

For information about support in other Harness modules, visit the Harness Platform documentation.

---

## Prerequisites

To configure and use Harness AI SRE, ensure the following:

- A Harness account with the AI SRE module enabled.
- Administrator access to configure integrations, automations, and communication tools.
- Service accounts with API access for third-party integrations (e.g., Jira, Slack, ServiceNow).

---

## Incident Data Sources

Harness AI SRE supports two primary ways to ingest incident-related data:

1. **Webhooks** – Send alerts, tickets, and event data to AI SRE from external systems.
2. **Harness Connectors & Delegates** – Direct integrations for bidirectional updates and automation.

---

## Webhook-Based Integrations

These integrations send incident alerts, monitoring signals, and notifications to AI SRE via webhooks.

### Monitoring & Observability
- AlertManager  
- AlertSite  
- BigPanda  
- Datadog  
- Dynatrace  
- Grafana  
- Grafana Incident  
- New Relic  
- Opsgenie  
- Sentry  
- Splunk On-Call (VictorOps)  
- Stackdriver  

### CI/CD & DevOps Tools
- Bitbucket  
- GitHub  
- GitLab  
- Jenkins  
- Octopus Deploy  
- Travis CI  

### Incident Management & Ticketing
- Jira  
- PagerDuty  
- ServiceNow  

### Custom Webhook Sources
- Any tool capable of sending HTTP webhooks with JSON payloads can integrate with AI SRE.

---

## Harness Connector / Delegate-Based Integrations

These integrations use Harness Connectors or Delegates for direct API-based interactions.

### Communication & Collaboration
- Slack – Create channels, invite users, manage user groups  
- Microsoft Teams – Create/select channels and teams  
- Zoom – Create meetings  
- Google Calendar – Create Google Meet events  

### ITSM & Ticketing
- Jira – Create and manage Jira issues  
- ServiceNow – Create, update, and select records  

### Monitoring & Observability
- Datadog – Fetch logs, retrieve graphs, and analyze dashboards  

### On-Call & Escalation Management
- Opsgenie – Acknowledge alerts, add responders to incidents  
- PagerDuty – Create incidents, add responders, manage on-call schedules  

### Documentation and Collaboration
- Confluence – Create, retrieve (as HTML), update, delete pages

### Incident Status & Reporting
- Statuspage – Select components, update incidents  

### DevOps & CI/CD Automation
- GitHub – Create issues, comment on PRs, list commits  
- GitLab – Create issues, manage merge requests  
- Bitbucket – Sync repositories for incident tracking  
- Harness – Execute pipelines, select input sets and projects  
- Jenkins – Run jobs, select projects  

---

## AI & Machine Learning Capabilities

Harness AI SRE leverages AI-driven incident response with:

- AI-Powered Incident Summarization – Generates real-time summaries from incident discussions. 
:::note
Voice Transcription Analysis used in conjunction with Recall.ai 
:::
---

## Feature Flags

Some Harness AI SRE features are released behind feature flags for early adopters.

To enable feature flags in your Harness account, contact Harness Support.