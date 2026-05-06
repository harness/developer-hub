---
title: What's Supported in Harness AI SRE
description: Supported Platforms and Features in Harness AI SRE
sidebar_label: What’s Supported
sidebar_position: 10
redirect_from:
- /docs/incident-response/resources/whats-supported
---

This page outlines the supported platforms, integrations, and features available in Harness AI SRE.

For information about support in other Harness modules, visit the Harness Platform documentation.

## Prerequisites

To configure and use Harness AI SRE, ensure the following:

- A Harness account with the AI SRE module enabled.
- Administrator access to configure integrations, automations, and communication tools.
- Service accounts with API access for third-party integrations (e.g., Jira, Slack, ServiceNow).

## Incident Data Sources

Harness AI SRE supports two primary ways to ingest incident-related data:

1. **Webhooks** – Send alerts, tickets, and event data to AI SRE from external systems.
2. **Harness Connectors & Delegates** – Direct integrations for bidirectional updates and automation.

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

## Harness Connector / Delegate-Based Integrations

These integrations use Harness Connectors or Delegates for direct API-based interactions.

### Communication & Collaboration
- Slack – Create channels, invite users, manage user groups, execute runbooks via slug commands (`/harness run <slug>`)
- Microsoft Teams – Create/select channels and teams  
- Google Chat – Link spaces to incidents, send messages via runbook actions  
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
- Service Paging Webhook – Trigger on-call notifications via HTTP POST or email from external monitoring tools  

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

## AI & Machine Learning Capabilities

Harness AI SRE leverages AI-driven incident response with:

- **AI-Powered Incident Summarization**: Generates real-time summaries from incident discussions.
- **RCA Change Agent**: Automatically analyzes deployments, pull requests, ServiceNow change records, and change events to identify root cause candidates with confidence scores.
- **ServiceNow Change Correlation**: When a ServiceNow connector exists, change request records automatically appear as root cause theories in active incidents.
- **AI-Native Post-Mortem Generation**: Automatically generates structured post-incident reviews when incidents are closed, synthesizing incident metadata, timeline events, RCA theories, and notes into six standardized sections (Summary, Impact, Root Cause, Resolution, Insights, Lessons Learned).
- **Real-Time Action Item Detection**: Automatically detects action items during active incidents from Slack conversations, meeting transcriptions, and incident notes, including assignee and due date information extracted from conversation context.
- **Investigator Agent Pipelines (Early Access)**: Extend the AI Investigator with custom investigation logic using pipeline stages to connect domain-specific data sources (internal wikis, observability tools, custom APIs) and enrich incident investigations with infrastructure-specific context.

:::note
Voice Transcription Analysis used in conjunction with Recall.ai 
:::

## Stakeholder Communication

- **Status Updates**: Incident commanders can send structured status updates via email to stakeholders subscribed to impacted services. Recipients are resolved dynamically from service subscriber lists configured in the Service Directory.
- **Service Subscriptions**: Individual users and Harness User Groups can subscribe to services to receive automated status update notifications during incidents affecting those services.
- **Email Delivery**: Status updates are delivered via branded HTML emails from `aisre-noreply@harness.io`.

## Feature Flags

Some Harness AI SRE features are released behind feature flags for early adopters.

To enable feature flags in your Harness account, contact Harness Support.