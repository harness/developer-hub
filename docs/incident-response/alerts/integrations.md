---
title: Alert Integrations
description: Learn how to configure native alert integrations in Harness Incident Response for popular monitoring and observability tools.
sidebar_label: Integrations
sidebar_position: 3
---

# Alert Integrations

Learn how to configure native alert integrations in Harness Incident Response.

## Overview

Harness IR provides native integrations with popular monitoring and observability tools. These integrations offer:
- Automated alert ingestion
- Rich context and metadata
- Bi-directional sync capabilities
- Advanced filtering options

## Supported Integrations

### Monitoring Tools

#### Datadog
Native integration features:
- Alert ingestion
- Metric correlation
- Service mapping
- Environment detection
- APM integration

Example alert payload:
```json
{
  "alert": {
    "name": "High CPU Usage",
    "severity": "[severity]",
    "message": "CPU usage above [threshold]%",
    "timestamp": "[timestamp]"
  },
  "service": {
    "name": "[service]",
    "environment": "[environment]",
    "team": "[team]"
  },
  "metrics": {
    "cpu_usage": "[value]",
    "threshold": "[threshold]"
  }
}
```

#### Grafana
Native integration features:
- Alert rules sync
- Dashboard linking
- Metric exploration
- Team mapping
- Source correlation

Example alert payload:
```json
{
  "monitor": {
    "name": "[alert_name]",
    "status": "[status]",
    "dashboard": "[dashboard_id]"
  },
  "resource": {
    "service": "[service]",
    "environment": "[environment]"
  },
  "data": {
    "value": "[value]",
    "threshold": "[threshold]",
    "duration": "[duration]"
  }
}
```

#### New Relic
Native integration features:
- NRQL alerts
- Entity correlation
- Service mapping
- Golden signals
- APM integration

Example alert payload:
```json
{
  "alert": {
    "name": "[alert_name]",
    "severity": "[severity]",
    "message": "[message]"
  },
  "entity": {
    "name": "[entity]",
    "type": "[entity_type]"
  },
  "metrics": {
    "name": "[metric_name]",
    "value": "[value]"
  }
}
```

#### Prometheus
Native integration features:
- AlertManager rules
- PromQL alerts
- Service discovery
- Label mapping
- Metric correlation

Example alert payload:
```json
{
  "alert": {
    "name": "[alert_name]",
    "severity": "[severity]",
    "message": "[message]"
  },
  "labels": {
    "service": "[service]",
    "environment": "[environment]"
  },
  "metrics": {
    "name": "[metric_name]",
    "value": "[value]"
  }
}
```

### Cloud Providers

#### AWS CloudWatch
Native integration features:
- Metric alarms
- Log insights
- EventBridge events
- Health events
- Resource alerts

Example alert payload:
```json
{
  "alarm": {
    "name": "[alarm_name]",
    "state": "[state]",
    "reason": "[reason]"
  },
  "resource": {
    "service": "[service]",
    "region": "[region]",
    "type": "[resource_type]"
  },
  "metrics": {
    "namespace": "[namespace]",
    "name": "[metric_name]",
    "value": "[value]"
  }
}
```

#### Azure Monitor
Native integration features:
- Metric alerts
- Log alerts
- Service health
- Resource health
- Activity log alerts

Example alert payload:
```json
{
  "alert": {
    "name": "[alert_name]",
    "severity": "[severity]",
    "status": "[status]"
  },
  "resource": {
    "name": "[service]",
    "group": "[resource_group]",
    "type": "[resource_type]"
  },
  "context": {
    "subscription": "[subscription]",
    "region": "[region]"
  }
}
```

#### Google Cloud Monitoring
Native integration features:
- Metric alerts
- Log-based alerts
- Uptime checks
- Service monitoring
- Resource alerts

Example alert payload:
```json
{
  "alert": {
    "name": "[alert_name]",
    "severity": "[severity]",
    "message": "[message]"
  },
  "resource": {
    "service": "[service]",
    "region": "[region]",
    "type": "[resource_type]"
  },
  "metrics": {
    "name": "[metric_name]",
    "value": "[value]"
  }
}
```

## Integration Setup

### General Steps
1. Navigate to **Settings** → **Alert Sources**
2. Click **+ New Integration**
3. Select your monitoring system
4. Follow integration-specific setup
5. Test the connection

### Authentication
Most integrations support:
- API keys
- OAuth 2.0
- Service accounts
- Role-based access

### Data Mapping
Map integration-specific fields to Harness IR:
```yaml
# Example mapping configuration
fields:
  severity: $.alert.severity
  service: $.resource.service
  environment: $.resource.environment
  description: $.alert.message
  source: $.monitor.type
```

## Alert Processing

### Alert Enrichment
Integrations automatically add:
- Service context
- Environment details
- Team information
- Historical data
- Related metrics

### Alert Correlation
Group related alerts using:
```yaml
correlation:
  window: 5m
  group_by:
    - service
    - environment
    - alert_type
  conditions:
    - field: service
      value: [service]
    - field: environment
      value: [environment]
```

### Alert Routing
Route alerts based on:
```yaml
routing:
  rules:
    - name: "Service Team"
      conditions:
        service: [service]
      route_to:
        team: [team]
        channel: "#[service]-alerts"
    - name: "Environment"
      conditions:
        environment: [environment]
      route_to:
        team: [environment]-ops
```

## Best Practices

### Integration Setup
- Use service accounts
- Configure proper permissions
- Test with sample alerts
- Document configuration
- Monitor integration health

### Alert Configuration
- Define clear alert names
- Include relevant context
- Set proper thresholds
- Configure severity mapping
- Use consistent labels

### Alert Management
- Review alert patterns
- Update routing rules
- Clean up stale alerts
- Monitor alert volume
- Track alert quality

## Next Steps

### Documentation
- [Alert Overview](./alerts.md)
- [Configure Webhooks](./webhooks.md)
- [Configure Alert Rules](./alert-rules.md)

### Related Topics
- [Create a Runbook](../runbooks/create-runbook.md)
- [Configure Fields](../runbooks/configure-incident-fields.md)
