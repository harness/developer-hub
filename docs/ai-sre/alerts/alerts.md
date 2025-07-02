---
title: Alerts Overview
description: Learn how to manage and configure alerts in Harness AI SRE
sidebar_label: Overview
sidebar_position: 1
---

# Alert Management in Harness AI SRE

Learn how to effectively manage and configure alerts in Harness AI SRE.

## Overview

Harness AI SRE provides flexible alert management capabilities that help you:
- Receive alerts from any monitoring system
- Configure alert routing and escalation
- Customize alert handling based on severity and source
- Automate responses using runbooks

## Alert Sources

### Native Integrations
Harness AI SRE supports direct integrations with popular monitoring tools:
- Datadog
- Grafana
- New Relic
- Prometheus
- AWS CloudWatch
- Azure Monitor
- Google Cloud Monitoring

### Webhooks
Our [webhook integration](./webhooks.md) supports any monitoring system or custom application that can send HTTP requests. Common use cases include:
- Custom monitoring solutions
- Internal applications
- Legacy monitoring systems
- Third-party services

## Alert Configuration

### Alert Routing
Configure where alerts are sent based on:
- Service
- Environment
- Team
- Severity
- Custom fields

### Alert Enrichment
Enhance alerts with additional context:
- Service metadata
- Environment details
- Team information
- Historical data
- Related incidents

### Alert Actions
Define automated actions when alerts are received:
- Create incidents
- Trigger runbooks
- Send notifications
- Update dashboards
- Create tickets

## Best Practices

### Alert Design
- Use clear, actionable alert names
- Include relevant context in alert descriptions
- Set appropriate thresholds
- Configure proper severity levels

### Alert Management
- Document alert patterns
- Review alert frequency
- Update alert rules regularly
- Clean up stale alerts

### Alert Response
- Define clear ownership
- Set up escalation paths
- Document response procedures
- Configure automated responses

## Next Steps

### Documentation
- [Configure Webhooks](./webhooks.md)
- [Alert Integrations](./integrations.md)
- [Configure Alert Rules](./alert-rules.md)

### Related Topics
- [Create a Runbook](../runbooks/create-runbook.md)
- [Configure Fields](../runbooks/configure-incident-fields.md)