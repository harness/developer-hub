---
title: What's Supported in Harness AI SRE
description: Platforms, integrations, and features available in AI SRE.
sidebar_label: What’s Supported
sidebar_position: 10
keywords:
  - supported integrations
  - platforms
  - features
  - ingest
  - automation
tags:
  - ai-sre
redirect_from:
- /docs/incident-response/resources/whats-supported
---

This page outlines the supported platforms, integrations, and features available in Harness AI SRE.

For information about support in other Harness modules, go to the Harness Platform documentation.

## Prerequisites

To configure and use Harness AI SRE, ensure the following:

- A Harness account with the AI SRE module enabled.
- Administrator access to configure integrations, automations, and communication tools.
- Service accounts with API access for third-party integrations (e.g., Jira, Slack, ServiceNow).

---

## Integration capabilities

Every AI SRE integration provides one of two capabilities, and some provide both:

1. **Ingest:** The tool sends alerts, tickets, and change data into AI SRE.
2. **Automation:** A runbook acts on the tool during a response.

Transport is how the connection is made. Webhooks are ingest-only. Connectors and delegates call the tool's API and power automation, on-call schedule sync, and polling-based ingestion. Go to [Set up integration management](/docs/ai-sre/integrations) to review the authoritative per-tool capability matrix.

---

## Ingest integrations

These tools send alerts, monitoring signals, and change data into AI SRE. Most use webhooks.

### Monitoring and observability
- AlertSite
- BigPanda
- Datadog
- Dynatrace
- Grafana
- Grafana Incident
- New Relic
- Opsgenie
- Prometheus
- Sentry

### CI/CD and DevOps tools
- Bitbucket
- GitHub
- GitLab
- Jenkins
- Octopus Deploy
- Travis CI

### Incident management and ticketing tools
- Jira
- PagerDuty
- ServiceNow

### Custom webhook sources
- Any tool capable of sending HTTP webhooks with JSON payloads can integrate with AI SRE.

---

## Automation integrations

These tools are acted on by runbooks through Harness connectors or delegates. The capability listed after each tool is what a runbook can do with it.

### Communication and collaboration
- Slack: Create channels, invite users, manage user groups, execute runbooks via slug commands (`/harness run <slug>`)
- Microsoft Teams: Create and select channels and teams
- Google Chat: Link spaces to incidents, send messages via runbook actions
- Zoom: Create meetings

### ITSM and ticketing tools
- Jira: Create and manage Jira issues
- ServiceNow: Create, update, and select records

### On-call and escalation management
- Opsgenie: Acknowledge alerts, add responders to incidents
- PagerDuty: Create incidents, add responders, manage on-call schedules
- Service Paging Webhook: Trigger on-call notifications via HTTP POST or email from external monitoring tools (AI SRE native, no connector required)

### Documentation and collaboration
- Confluence: Create, retrieve (as HTML), update, delete pages

### DevOps and CI/CD automation
- GitHub: Create issues, comment on PRs, list commits
- Harness: Execute pipelines, select input sets and projects

---

## AI and machine learning capabilities

Harness AI SRE leverages AI-driven incident response with:

- **AI-powered incident summarization:** Generates real-time summaries from incident discussions.
- **[RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent):** Automatically analyzes deployments, pull requests, ServiceNow change records, and change events to identify root cause candidates with confidence scores.
- **ServiceNow change correlation:** When a ServiceNow connector exists, change request records automatically appear as root cause theories in active incidents.
- **AI-native post-mortem generation:** Automatically generates structured post-incident reviews when incidents are closed, synthesizing incident metadata, timeline events, RCA theories, and notes into six standardized sections (Summary, Impact, Root Cause, Resolution, Insights, Lessons Learned).
- **Real-time action item detection:** Automatically detects action items during active incidents from Slack conversations, meeting transcriptions, and incident notes, including assignee and due date information extracted from conversation context.
- **Investigator agent pipelines (Early Access):** Extend the RCA Change Agent's investigation with custom investigation logic using pipeline stages to connect domain-specific data sources (internal wikis, observability tools, custom APIs) and enrich incident investigations with infrastructure-specific context.

:::note
Voice Transcription Analysis used in conjunction with Recall.ai 
:::

---

## Stakeholder communication

AI SRE keeps stakeholders informed during incidents through the following channels:

- **Status updates:** Incident commanders can send structured status updates via email to stakeholders subscribed to impacted services. Recipients are resolved dynamically from service subscriber lists configured in the Service Directory.
- **Service subscriptions:** Individual users and Harness User Groups can subscribe to services to receive automated status update notifications during incidents affecting those services.
- **Email delivery:** Status updates are delivered via branded HTML emails from `aisre-noreply@harness.io`.

---

## Feature flags

Some Harness AI SRE features are released behind feature flags for early adopters.

To enable feature flags in your Harness account, contact Harness Support.

---

## Next steps

- Go to [Set up integration management](/docs/ai-sre/integrations) to review the per-tool capability matrix and connect your tools.
- Go to [Runbooks](/docs/ai-sre/runbooks) to automate actions across the supported integrations.
- Go to [Incidents](/docs/ai-sre/incidents) to see how ingested alerts become tracked incidents.