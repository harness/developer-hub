---
title: Datadog Integration Webhook Template
description: Configure Datadog integration for Harness AI SRE to receive monitoring and APM alerts.
sidebar_label: Datadog Webhook Template
sidebar_position: 5
---

# Datadog Integration Webhook Template

Configure Datadog integration to receive monitoring and APM alerts in Harness AI SRE.

## Overview

Datadog provides:
- **Alert ingestion**: Automated alert forwarding from monitors
- **Metric correlation**: Link alerts to related metrics
- **Service mapping**: Automatic service discovery
- **Environment detection**: Production vs staging classification
- **APM integration**: Application performance monitoring

---

## Use this template

### In Harness AI SRE

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Datadog** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL

The template automatically configures field mapping to match Datadog alert fields to Harness alert properties.

### In Datadog

Configure Datadog monitors to send webhooks to your Harness webhook URL. Go to [Datadog Webhook Setup](../../integration-guides/monitoring/datadog.md) for complete step-by-step instructions.

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

## Configure Datadog to Send Webhooks

After creating a webhook from this template in Harness, configure Datadog to send alerts to your webhook URL.

Go to [Datadog Webhook Setup](../../integration-guides/monitoring/datadog.md) for detailed step-by-step instructions including:
- Creating webhook integrations in Datadog
- Configuring monitor notifications
- Customizing payload fields
- Testing the integration

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Datadog alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add custom filtering logic.
- Go to [Webhook Templates Overview](../overview.md) to view other templates.
