---
title: Alert Management
description: Learn how to receive, route, and respond to alerts from monitoring systems in Harness AI SRE.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/alerts/alerts/overview
- /docs/ai-sre/alerts/alerts
- /docs/ai-sre/alerts/alerts/overview
---

Harness AI SRE provides flexible alert management to receive, route, and respond to alerts from any monitoring system or custom application.

## Overview

Alert management in Harness AI SRE enables you to:

- **Receive alerts from any source**: Webhook integrations support 25+ monitoring tools with pre-configured templates, plus custom webhooks for any system that can send HTTP requests.
- **Route alerts intelligently**: Route alerts based on service, environment, team, severity, or custom fields.
- **Enrich alerts with context**: Automatically add service metadata, team information, historical data, and related incidents.
- **Automate responses**: Trigger runbooks, create incidents, send notifications, and execute remediation actions.

---

## How Alerts Work

### Alert Ingestion

Alerts enter Harness AI SRE through **webhook integrations**:

1. **External monitoring system** (Datadog, PagerDuty, Prometheus, etc.) detects an issue
2. **Webhook POST** sends alert payload to your unique webhook URL
3. **Field extraction** parses the JSON payload using JSONPath expressions
4. **Field mapping** populates alert properties using Mustache templates
5. **Alert created** in Harness AI SRE with enriched context

Go to [Ingest Alerts](./webhooks/overview.md) to set up webhook integrations.

### Alert Routing

Once alerts are received, **alert routing rules** determine how they are processed:

- **Route to services**: Automatically link alerts to the affected service
- **Assign to teams**: Route alerts to the responsible on-call team
- **Create incidents**: Automatically create incidents for critical alerts
- **Trigger runbooks**: Execute automated remediation workflows
- **Suppress duplicates**: Deduplicate alerts based on custom rules

Go to [Route Alerts](./alert-rules/overview.md) to set up routing and automation.

---

## Alert Sources

### Webhook Integrations

Harness AI SRE uses **webhook integrations** to receive alerts from monitoring systems. Webhooks provide:

- **25+ pre-configured templates**: Ready-to-use integrations for popular monitoring tools
- **Custom webhooks**: Support for any system that can send HTTP POST requests
- **Flexible payload mapping**: JSONPath extraction and Mustache templates for field mapping
- **Dual trigger methods**: HTTP POST endpoint or email address for legacy systems

#### Supported Monitoring Tools (Webhook Templates)

**Application Performance Monitoring**:
- [Datadog](./webhooks/templates/monitoring/datadog.md)
- [New Relic](./webhooks/templates/monitoring/new-relic.md)
- [Dynatrace](./webhooks/templates/monitoring/dynatrace.md)
- [Sentry](./webhooks/templates/monitoring/sentry.md)

**Infrastructure Monitoring**:
- [Prometheus (AlertManager)](./webhooks/templates/monitoring/prometheus.md)
- [Grafana](./webhooks/templates/monitoring/grafana.md)
- [AWS CloudWatch](./webhooks/templates/cloud/aws-cloudwatch.md)

**Incident Management**:
- [PagerDuty](./webhooks/templates/monitoring/pagerduty.md)
- [OpsGenie](./webhooks/templates/monitoring/opsgenie.md)
- [Grafana Incident](./webhooks/templates/monitoring/grafana-incident.md)

**Security and Compliance**:
- [Lacework](./webhooks/templates/monitoring/lacework.md)

**Website Monitoring**:
- [AlertSite](./webhooks/templates/monitoring/alertsite.md)

**Alert Correlation**:
- [BigPanda](./webhooks/templates/monitoring/bigpanda.md)

**SLO Monitoring**:
- [Harness SLO](./webhooks/templates/monitoring/harness-slo.md)

Go to [Webhook Templates](./webhooks/templates/overview.md) to browse all available templates.

#### Custom Monitoring Tools

For custom monitoring solutions, internal applications, or legacy systems:

- **Generic Webhook**: Accepts any JSON payload with custom field mapping
- **Email Triggers**: Send alerts via email for systems without webhook support
- **Custom Field Mapping**: Use JSONPath, Mustache templates, and CEL expressions

Go to [Create a Webhook](./webhooks/create-webhook.md) for custom webhook setup.

### Service Paging Webhooks

For dedicated on-call paging from external systems:

- **Service-specific webhook URLs**: Each service gets a unique paging webhook
- **Automatic on-call routing**: Pages the current on-call engineer
- **Email-based triggering**: Legacy systems can page via email
- **Bypass alert routing**: Direct service paging without alert rule processing

Go to [Service Paging Webhook](/docs/ai-sre/oncall/service-paging-webhook) for dedicated service paging.

---

## Alert Configuration

### Alert Routing

Configure alert routing based on:

- **Service**: Route alerts to specific services based on payload fields
- **Environment**: Separate production, staging, and development alerts
- **Team**: Direct alerts to the responsible team or on-call schedule
- **Severity**: Escalate critical alerts, suppress informational alerts
- **Custom fields**: Route based on any field in the alert payload

**Example routing rules**:
- Critical alerts → Create incident + page on-call
- Warning alerts → Create alert + notify Slack channel
- Info alerts → Log only, no notifications

Go to [Route Alerts](./alert-rules/overview.md) for routing configuration.

### Alert Enrichment

Enhance alerts with additional context automatically:

- **Service metadata**: Service owner, runbooks, documentation links
- **Team information**: On-call schedule, escalation policy, Slack channel
- **Environment details**: Region, cluster, deployment version
- **Historical data**: Similar past incidents, resolution patterns
- **Related incidents**: Link to active incidents for the same service

Enrichment data is added at alert creation time and visible in the alert timeline.

### Alert Actions

Define automated actions when alerts are received:

**Incident Creation**:
- Create incidents automatically for critical alerts
- Link related alerts to existing incidents
- Inherit incident metadata from service configuration

**Runbook Execution**:
- Trigger diagnostic runbooks automatically
- Execute remediation workflows
- Gather context before human intervention

**Notifications**:
- Send Slack messages to team channels
- Page on-call engineers via PagerDuty
- Post to Microsoft Teams or Google Chat

**Ticketing**:
- Create Jira issues for alerts requiring follow-up
- Open ServiceNow incidents for escalation
- Track alert resolution in external systems

Go to [Create a Runbook](../runbooks/create-runbook.md) to automate alert responses.

---

## Alert Lifecycle

### Alert States

Alerts progress through these states:

1. **New**: Alert received from monitoring system
2. **Acknowledged**: On-call engineer acknowledges alert
3. **Resolved**: Underlying issue resolved (automatic or manual)
4. **Closed**: Alert closed after resolution confirmation

### Alert Resolution

Alerts can be resolved in multiple ways:

**Automatic Resolution**:
- Monitoring system sends resolution webhook (e.g., Datadog recovery)
- Alert rule detects resolution condition
- Linked incident is resolved

**Manual Resolution**:
- On-call engineer marks alert as resolved
- Runbook completes successfully
- External system (Jira, ServiceNow) updates status

### Alert History

All alert events are tracked in the alert timeline:

- Alert creation from monitoring system
- Status changes (acknowledged, resolved)
- Associated incidents and runbooks
- Comments and annotations
- Related alerts and context

---

## Best Practices

### Alert Design

**Use clear, actionable alert names**:
- ❌ `Alert triggered`
- ✅ `High CPU usage on api-service in us-east-1`

**Include relevant context in alert descriptions**:
- Service name and environment
- Current metric value and threshold
- Link to dashboard or logs
- Suggested remediation steps

**Set appropriate thresholds**:
- Avoid alert fatigue from noisy thresholds
- Balance sensitivity with false positive rate
- Use dynamic thresholds for variable workloads

**Configure proper severity levels**:
- **Critical**: Service down, immediate action required
- **High**: Degraded performance, page on-call
- **Medium**: Warning condition, notify team channel
- **Low**: Informational, log only

### Alert Management

**Document alert patterns**:
- Maintain a runbook for each alert type
- Document common causes and resolutions
- Link alerts to service documentation

**Review alert frequency**:
- Monitor alert volume over time
- Identify and tune noisy alerts
- Remove alerts that no longer provide value

**Update alert routing rules regularly**:
- Review routing rules quarterly
- Adjust thresholds based on service behavior
- Update team assignments as ownership changes

**Clean up stale alerts**:
- Archive resolved alerts after retention period
- Remove alerts for decommissioned services
- Consolidate duplicate alert definitions

### Alert Response

**Define clear ownership**:
- Assign each alert to a service
- Map services to on-call teams
- Document escalation contacts

**Set up escalation paths**:
- Primary on-call engineer (5 minutes)
- Secondary on-call engineer (15 minutes)
- Team lead or manager (30 minutes)

**Document response procedures**:
- Create runbooks for common alerts
- Link runbooks from alert descriptions
- Include diagnostic steps and remediation commands

**Configure automated responses**:
- Gather diagnostic data automatically
- Execute safe remediation steps
- Notify stakeholders of progress

---

## Related Concepts

### Alerts vs Incidents

- **Alerts**: Notifications from monitoring systems about potential issues
- **Incidents**: Confirmed service disruptions requiring investigation and resolution

Alerts can automatically create incidents based on severity and routing rules. Multiple related alerts can be grouped into a single incident.

### Alerts vs Events

- **Alerts**: Actionable notifications requiring attention or response
- **Events**: Informational updates about system state (deploys, config changes)

Events provide context for alerts and incidents but do not require immediate action.

---

## Next Steps

### Set Up Alert Ingestion
- Go to [Webhook Templates](./webhooks/templates/overview.md) to use pre-configured integrations for Datadog, PagerDuty, Prometheus, and other monitoring tools.
- Go to [Create a Webhook](./webhooks/create-webhook.md) to configure custom webhook integrations.
- Go to [External System Setup](./webhooks/integration-guides/overview.md) for provider-specific configuration guides.

### Configure Alert Routing
- Go to [Route Alerts](./alert-rules/overview.md) to route and filter alerts.
- Go to [Integrate Service Directory](/docs/ai-sre/oncall/integrate-service-directory) to define services and map alerts to services.
- Go to [Set Up On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to route alerts to on-call engineers.

### Automate Alert Response
- Go to [Create a Runbook](../runbooks/create-runbook.md) to automate diagnostic and remediation steps.
- Go to [Integrate External Tools](/docs/category/integrate-external-tools) to connect Slack, Jira, ServiceNow, and other tools.
- Go to [AI SRE Best Practices](/docs/ai-sre/resources/ai-sre-best-practices) for alert management optimization.
