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

## Integrations

### Event Sources

#### AlertSite
Event source features:
- Website monitoring
- API monitoring
- Transaction monitoring
- Performance metrics
- Availability tracking

Example alert payload:
```json
{
  "source": "AlertSite",
  "notify_type": "alert",
  "custid": "12345",
  "company": "Example Corp",
  "device_id": "device_789",
  "device_name": "API Health Check",
  "timestamp": "2025-03-16T15:00:00Z",
  "status": "error",
  "errcount": "3",
  "status_text": "API endpoint returned 500 error",
  "location": "US-West",
  "location_num": "4",
  "device_typecode": "API",
  "device_type": "API Monitor",
  "transaction": "GET /api/health",
  "url": "https://api.example.com/health",
  "http_status": "500",
  "step_num": "2",
  "step_name": "Check Response Code",
  "rotated_locations": [
    {
      "status": "error",
      "status_text": "API endpoint returned 500 error",
      "location": "US-West-DC1"
    }
  ]
}
```

#### AWS CloudWatch
Event source features:
- Metric alarms
- Composite alarms
- Log insights
- Cross-account monitoring
- Resource health

Example alert payload:
```json
{
  "version": "0",
  "id": "12345678-1234-1234-1234-123456789012",
  "detail-type": "CloudWatch Alarm State Change",
  "source": "aws.cloudwatch",
  "account": "123456789012",
  "time": "2025-03-16T15:00:00Z",
  "region": "us-west-2",
  "resources": [
    "arn:aws:cloudwatch:us-west-2:123456789012:alarm:HighCPUAlarm"
  ],
  "detail": {
    "alarmName": "HighCPUAlarm",
    "state": {
      "value": "ALARM",
      "reason": "Threshold Crossed: 1 datapoint [99.5 (16/03/25 14:55:00)] was greater than the threshold (90.0).",
      "reasonData": "{\"version\":\"1.0\",\"queryDate\":\"2025-03-16T15:00:00.000+0000\",\"startDate\":\"2025-03-16T14:55:00.000+0000\",\"statistic\":\"Average\",\"period\":300,\"recentDatapoints\":[99.5],\"threshold\":90.0}",
      "timestamp": "2025-03-16T15:00:00.000+0000"
    },
    "configuration": {
      "description": "CPU usage has exceeded 90%",
      "metrics": [
        {
          "id": "m1",
          "metricStat": {
            "metric": {
              "namespace": "AWS/EC2",
              "name": "CPUUtilization",
              "dimensions": {
                "InstanceId": "i-1234567890abcdef0"
              }
            },
            "period": 300,
            "stat": "Average"
          },
          "returnData": true
        }
      ]
    }
  }
}
```

#### Azure Monitor
Event source features:
- Resource metrics
- Activity logs
- Application insights
- Service health
- Log analytics

Example alert payload:
```json
{
  "schemaId": "azureMonitorCommonAlertSchema",
  "data": {
    "essentials": {
      "alertId": "/subscriptions/123456-7890-abcd-efgh-ijklmnopqrst/providers/Microsoft.AlertsManagement/alerts/12345678-9012-3456-7890-123456789012",
      "alertRule": "High Memory Usage Alert",
      "severity": "Sev2",
      "signalType": "Metric",
      "monitorCondition": "Fired",
      "monitoringService": "Platform",
      "alertTargetIDs": [
        "/subscriptions/123456-7890-abcd-efgh-ijklmnopqrst/resourcegroups/production/providers/microsoft.compute/virtualmachines/web-server-01"
      ],
      "configurationItems": [
        "web-server-01"
      ],
      "originAlertId": "12345678-9012-3456-7890-123456789012",
      "firedDateTime": "2025-03-16T15:00:00.000Z",
      "description": "Memory usage greater than 90%",
      "essentialsVersion": "1.0",
      "alertContextVersion": "1.0"
    },
    "alertContext": {
      "properties": {},
      "conditionType": "SingleResourceMultipleMetricCriteria",
      "condition": {
        "windowSize": "PT5M",
        "allOf": [
          {
            "metricName": "Percentage Memory",
            "metricNamespace": "Microsoft.Compute/virtualMachines",
            "operator": "GreaterThan",
            "threshold": "90",
            "timeAggregation": "Average",
            "dimensions": [
              {
                "name": "ResourceId",
                "value": "web-server-01"
              }
            ],
            "metricValue": 95.2,
            "webTestName": null
          }
        ]
      }
    }
  }
}
```

#### Datadog
Event source features:
- Alert ingestion
- Metric correlation
- Service mapping
- Environment detection
- APM integration

Example alert payload:
```json
{
  "body": "Monitor Alert: System CPU > 95%",
  "last_updated": "1614728748000",
  "event_type": "monitor_alert",
  "title": "High CPU Usage",
  "date": "1614728748",
  "org": {
    "id": "abc123",
    "name": "MyOrg"
  },
  "id": "event-123",
  "alert_id": "12345",
  "alert_metric": "system.cpu.user",
  "alert_priority": "P1",
  "alert_transition": "Triggered",
  "alert_status": "Alert",
  "alert_title": "High CPU Usage",
  "alert_type": "metric_alert",
  "host_name": "web-server-01",
  "priority": "normal",
  "tags": ["env:production", "service:web"],
  "alert_scope": ["host:web-server-01"]
}
```

#### Dynatrace
Event source features:
- Problem detection
- Service monitoring
- Infrastructure monitoring
- Application insights
- Root cause analysis

Example alert payload:
```json
{
  "ImpactedEntities": [
    {
      "type": "SERVICE",
      "name": "payment-service",
      "entity": "SERVICE-F5D7459A6CD9842B"
    }
  ],
  "ImpactedEntity": "SERVICE-F5D7459A6CD9842B",
  "PID": "PID-F5D7459A6CD9842B",
  "ProblemDetailsHTML": "<div>High response time detected</div>",
  "ProblemDetailsJSON": {
    "ID": "PID-F5D7459A6CD9842B"
  },
  "ProblemID": "PID-F5D7459A6CD9842B",
  "ProblemImpact": "APPLICATION",
  "ProblemTitle": "Response time degradation",
  "Problem URL": "https://dynatrace.example.com/problems/PID-F5D7459A6CD9842B",
  "State": "OPEN",
  "Tags": "production,payment,critical"
}
```

#### Grafana
Event source features:
- Alert rules sync
- Dashboard linking
- Metric exploration
- Team mapping
- Source correlation

Example alert payload:
```json
{
  "receiver": "webhook",
  "status": "firing",
  "orgId": 1,
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "HighCPUUsage",
        "team": "platform",
        "zone": "us-west-2"
      },
      "annotations": {
        "description": "CPU usage above 90% for 5 minutes",
        "runbook_url": "https://runbook.example.com/cpu",
        "summary": "High CPU usage detected"
      },
      "startsAt": "2025-03-16T15:00:00Z",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": "https://grafana.example.com/alerting/1234",
      "fingerprint": "abc123def456",
      "silenceURL": "https://grafana.example.com/alerting/silence/new?alertmanager=1234",
      "dashboardURL": "https://grafana.example.com/d/abc123/system-metrics",
      "panelURL": "https://grafana.example.com/d/abc123/system-metrics?viewPanel=10",
      "valueString": "value: 95.5"
    }
  ],
  "groupLabels": {},
  "commonLabels": {
    "team": "platform"
  },
  "commonAnnotations": {},
  "externalURL": "https://grafana.example.com",
  "version": "1",
  "groupKey": "{}:{alertname=\"HighCPUUsage\"}",
  "truncatedAlerts": 0,
  "title": "[FIRING:1] HighCPUUsage platform",
  "state": "alerting"
}
```

#### New Relic
Event source features:
- NRQL alerts
- Entity correlation
- Service mapping
- Golden signals
- APM integration

Example alert payload:
```json
{
  "incident": {
    "id": 123456789,
    "condition_id": 87654321,
    "condition_name": "High Error Rate",
    "policy_id": 543219876,
    "policy_name": "Production API Policy",
    "severity": "critical",
    "state": "open",
    "timestamp": 1647446400,
    "url": "https://alerts.newrelic.com/accounts/12345/incidents/123456789"
  },
  "details": {
    "message": "Error rate exceeded 5% threshold",
    "duration": 300,
    "threshold": 5.0,
    "trigger_time": "2025-03-16T15:00:00Z"
  },
  "targets": [
    {
      "id": "MXxBUE18QVBQTElDQVRJT058MTIzNDU2Nzg5",
      "name": "Production API",
      "type": "application",
      "product": "APM",
      "link": "https://rpm.newrelic.com/accounts/12345/applications/987654321"
    }
  ]
}
```

#### PagerDuty
Event source features:
- Incident management
- PagerDuty alert routing
- PagerDuty on-call schedules
- PagerDuty escalation policies
- Service dependencies

Example alert payload:
```json
{
  "event": {
    "id": "01BKGDFB3DZXFJ9W6JQ5QPKM9I",
    "event_type": "incident.trigger",
    "resource_type": "incident",
    "occurred_at": "2025-03-16T15:00:00.000Z",
    "agent": {
      "id": "P123456",
      "type": "service"
    }
  },
  "incident": {
    "id": "PIJ90N7",
    "incident_number": 123,
    "title": "High CPU Usage",
    "description": "CPU usage above 90% for 5 minutes",
    "created_at": "2025-03-16T15:00:00.000Z",
    "status": "triggered",
    "urgency": "high",
    "priority": {
      "id": "P1",
      "name": "P1",
      "description": "Critical - Service Down"
    }
  }
}
```

#### Prometheus AlertManager
Event source features:
- AlertManager rules
- PromQL alerts
- Service discovery
- Label mapping
- Metric correlation

Example alert payload:
```json
{
  "receiver": "harness-webhook",
  "status": "firing",
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "HighLatency",
        "dc": "us-west-2",
        "instance": "web-server-01:9090",
        "job": "node"
      },
      "annotations": {
        "description": "High latency detected for web-server-01"
      },
      "startsAt": "2025-03-16T15:00:00Z",
      "endsAt": "2025-03-16T16:00:00Z",
      "generatorURL": "http://prometheus.example.com/graph?g0.expr=rate%28http_request_duration_seconds%29"
    }
  ],
  "groupLabels": {
    "alertname": "HighLatency",
    "job": "node"
  },
  "commonLabels": {
    "alertname": "HighLatency",
    "dc": "us-west-2",
    "instance": "web-server-01:9090",
    "job": "node"
  },
  "commonAnnotations": {
    "description": "High latency detected for web-server-01"
  },
  "externalURL": "http://alertmanager.example.com",
  "version": "4",
  "groupKey": "{}/{}:{alertname=\"HighLatency\", job=\"node\"}"
}
```

#### Splunk
Event source features:
- Search alerts
- Metric alerts
- Log correlation
- Custom dashboards
- Saved searches

Example alert payload:
```json
{
  "sid": "scheduler_admin_search_12345",
  "search_name": "High Error Rate Alert",
  "app": "search",
  "owner": "admin",
  "results_link": "https://splunk.example.com/app/search/@go?sid=scheduler_admin_search_12345",
  "result": {
    "sourcetype": "access_combined",
    "count": "523",
    "error_rate": "8.7",
    "service": "payment-api",
    "environment": "production",
    "_time": "2025-03-16T15:00:00.000Z"
  },
  "triggered_alert": {
    "label": "High Error Rate Detection",
    "alert_type": "number of events",
    "severity": "critical",
    "trigger_time": "2025-03-16T15:00:00.000Z",
    "trigger_timespan": "5m",
    "trigger_conditions": [
      {
        "relation": "greater than",
        "threshold": "5",
        "field": "error_rate"
      }
    ]
  }
}
```

## Integration Setup

For detailed instructions on setting up integrations and configuring webhooks, refer to the [Webhooks documentation](./webhooks.md).

## Field Mapping and Correlation

When configuring webhooks, you can map fields from the incoming payload to Harness IR fields using the visual field mapper. These mapped fields can then be used for correlation and grouping of alerts.

For example, if you map the `service` field from your webhook payload, all alerts with the same service value (like "payment-api") will be automatically correlated and grouped together.

Common fields used for correlation include:
- Service
- Environment
- Alert Type
- Source

For detailed information on configuring field mapping and correlation using the visual interface, refer to the [Webhooks documentation](./webhooks.md).

## Alert Rules

Alert rules determine when to create incidents based on incoming alerts. Using the visual condition builder, you can create rules that evaluate alert fields and trigger appropriate actions.

:::note
The Harness IR on-call module will be available in Q2. This will enable native on-call management within Harness IR.
:::

For detailed information on configuring alert rules using the visual interface, refer to the [Alert Rules documentation](./alert-rules.md).

## Next Steps

### Documentation
- [Alert Overview](./alerts.md)
- [Configure Webhooks](./webhooks.md)
- [Configure Alert Rules](./alert-rules.md)

### Related Topics
- [Create a Runbook](../runbooks/create-runbook.md)
- [Configure Fields](../runbooks/configure-incident-fields.md)
