---
title: Alert Integrations Overview
description: Overview of native alert integrations in Harness AI SRE for popular monitoring and observability tools.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/ai-sre/alerts/integrations
- /docs/incident-response/alerts/integrations
- /docs/incident-response/alerts/alerts/integrations
- /docs/ai-sre/alerts/alerts/integrations/overview
---

# Alert Integrations Overview

Harness AI SRE provides native integrations with popular monitoring and observability tools.

## Overview

Native integrations offer:
- **Automated alert ingestion**: Alerts flow automatically from your monitoring tools
- **Rich context and metadata**: Full alert payloads with detailed information
- **Bi-directional sync capabilities**: Update alerts in both systems
- **Advanced filtering options**: Route alerts based on severity, service, and custom fields

---

## Available Integrations

### Cloud Providers
- **AWS CloudWatch**: Metric alarms, composite alarms, log insights

### Monitoring & Observability
- **AlertSite**: Website and API monitoring
- **BigPanda**: Alert aggregation and correlation
- **Datadog**: Infrastructure, APM, and log monitoring
- **Dynatrace**: Application performance and infrastructure monitoring
- **Grafana**: Unified alerting from any data source
- **Grafana Incident**: Incident management platform
- **Harness SLO**: Service level objective violations and error budget alerts
- **Lacework**: Cloud security monitoring
- **New Relic**: Full-stack observability platform
- **Opsgenie**: Alert management and on-call scheduling
- **PagerDuty**: Incident management platform
- **Prometheus AlertManager**: Cloud-native monitoring
- **Sentry**: Error tracking and performance monitoring

### CI/CD & Development
- **Bitbucket**: Repository event notifications
- **GitHub**: Repository and deployment events
- **GitLab**: Repository and pipeline events
- **Octopus Deploy**: Deployment automation events
- **Travis CI**: Build and deployment notifications

### ITSM
- **Jira**: Issue tracking and project management
- **ServiceNow**: IT service management events

### Custom Integrations
For monitoring systems not listed above, use [webhooks](../../webhooks/overview.md) to receive alerts from any system that can send HTTP requests.

---

## Getting Started

Select an integration below to view setup instructions and example payloads.

Integrations are organized by category in the navigation. Browse the categories below or use the sidebar navigation to find your integration.

---

## Next Steps

- Go to [Configure Webhooks](../../webhooks/overview.md) for custom integrations.
- Go to [Configure Alert Rules](../../alert-rules/overview.md) to route and filter alerts.
