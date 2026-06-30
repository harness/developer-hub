---
title: Datadog Integration
description: Configure Datadog integration for Harness AI SRE to receive monitoring and APM alerts.
sidebar_label: Datadog
sidebar_position: 5
---

# Datadog Integration

Configure Datadog integration to receive monitoring and APM alerts in Harness AI SRE.

## Overview

Datadog provides:
- **Alert ingestion**: Automated alert forwarding from monitors
- **Metric correlation**: Link alerts to related metrics
- **Service mapping**: Automatic service discovery
- **Environment detection**: Production vs staging classification
- **APM integration**: Application performance monitoring

---

## Set up Datadog integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Datadog** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Datadog account, configure a webhook integration pointing to the copied URL
7. Configure payload mapping to match Datadog alert fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming Datadog alerts

---

## Example Alert Payload

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

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route Datadog alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
