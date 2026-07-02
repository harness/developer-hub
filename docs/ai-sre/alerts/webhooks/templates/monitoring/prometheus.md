---
title: Prometheus AlertManager Integration Webhook Template
description: Configure Prometheus AlertManager integration for Harness AI SRE to receive cloud-native monitoring alerts.
sidebar_label: Prometheus AlertManager Webhook Template
sidebar_position: 10
---

# Prometheus AlertManager Integration Webhook Template

Configure Prometheus AlertManager integration to receive cloud-native monitoring alerts in Harness AI SRE.

## Overview

Prometheus AlertManager provides:
- **AlertManager rules**: Forward alerts from Prometheus AlertManager
- **PromQL alerts**: Query-based metric alerting
- **Service discovery**: Automatic target discovery
- **Label mapping**: Rich metadata from Prometheus labels
- **Metric correlation**: Link to underlying time-series data

---

## Set up Prometheus AlertManager integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Prometheus AlertManager** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your AlertManager configuration, add a webhook receiver pointing to the copied URL
7. Configure payload mapping to match Prometheus alert fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Prometheus alerts

---

## Example Alert Payload

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
      "generatorURL": "http://prometheus.example.com/graph?g0.expr=<PROMQL>"
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

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Prometheus alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
