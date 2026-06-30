---
title: Grafana Integration
description: Configure Grafana integration for Harness AI SRE to receive unified alerting from any data source.
sidebar_label: Grafana
sidebar_position: 7
---

# Grafana Integration

Configure Grafana integration to receive unified alerting from any data source in Harness AI SRE.

## Overview

Grafana provides:
- **Alert rules sync**: Forward alerts from Grafana alert manager
- **Dashboard linking**: Link to relevant dashboards
- **Metric exploration**: Connect to underlying metrics
- **Team mapping**: Organize alerts by team
- **Source correlation**: Track alert sources

---

## Set up Grafana integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Grafana** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Grafana instance, configure a contact point with webhook type pointing to the copied URL
7. Configure payload mapping to match Grafana alert fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming Grafana alerts

---

## Example Alert Payload

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
      "silenceURL": "https://grafana.example.com/alerting/silence/new",
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

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route Grafana alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
