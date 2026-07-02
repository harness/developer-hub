---
title: PagerDuty Integration Webhook Template
description: Configure PagerDuty integration for Harness AI SRE to receive incident management alerts.
sidebar_label: PagerDuty Webhook Template
sidebar_position: 9
---

# PagerDuty Integration Webhook Template

Configure PagerDuty integration to receive incident management alerts in Harness AI SRE.

## Overview

PagerDuty provides:
- **Incident management**: Two-way incident synchronization
- **PagerDuty alert routing**: Route based on service and priority
- **PagerDuty on-call schedules**: Sync schedule information
- **PagerDuty escalation policies**: Mirror escalation rules
- **Service dependencies**: Track service relationships

---

## Use this template

### In Harness AI SRE

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **PagerDuty** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL

The template automatically configures field mapping to match PagerDuty incident fields to Harness alert properties.

### In PagerDuty

Configure PagerDuty to send webhooks to your Harness webhook URL. Go to [PagerDuty Webhook Setup](../../integration-guides/monitoring/pagerduty.md) for complete step-by-step instructions.

---

## Example Alert Payload

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

---

## Configure PagerDuty to Send Webhooks

After creating a webhook from this template in Harness, configure PagerDuty to send incidents to your webhook URL.

Go to [PagerDuty Webhook Setup](../../integration-guides/monitoring/pagerduty.md) for detailed step-by-step instructions including:
- Setting up V3 webhooks or webhook extensions
- Selecting event types to monitor
- Configuring event filters
- Testing the integration

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route PagerDuty alerts.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) to add custom filtering logic.
- Go to [Webhook Templates Overview](../overview.md) to view other templates.
