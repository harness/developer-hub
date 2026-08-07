---
title: PagerDuty Integration Webhook Template
description: Receive incident management alerts.
sidebar_label: PagerDuty Webhook Template
sidebar_position: 11
keywords:
  - PagerDuty
  - webhook
  - template
  - integration
  - AI SRE
  - alerts
tags:
  - ai-sre
  - webhooks
  - pagerduty
---

Configure PagerDuty integration to receive incident management alerts in Harness AI SRE.

## Overview

PagerDuty provides:
- **Incident management:** Two-way incident synchronization
- **PagerDuty alert routing:** Route based on service and priority
- **PagerDuty on-call schedules:** Sync schedule information
- **PagerDuty escalation policies:** Mirror escalation rules
- **Service dependencies:** Track service relationships

---

## Use this template

### In Harness AI SRE

Create the webhook integration from the PagerDuty template:

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **PagerDuty** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL

The template automatically configures field mapping to match PagerDuty incident fields to Harness alert properties.

### In PagerDuty

Configure PagerDuty to send webhooks to your Harness webhook URL. Go to the [PagerDuty webhook setup guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/pagerduty) to complete the step-by-step instructions.

---

## Example alert payload

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

## Configure PagerDuty to send webhooks

After creating a webhook from this template in Harness, configure PagerDuty to send incidents to your webhook URL.

Go to the [PagerDuty webhook setup guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/pagerduty) to complete detailed step-by-step instructions, including:
- Set up V3 webhooks or webhook extensions
- Select event types to monitor
- Configure event filters
- Test the integration

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route PagerDuty alerts to the right destinations.
- [Use CEL in webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks): Add custom filtering logic.
- [Webhook templates overview](/docs/ai-sre/alerts/webhooks/templates/overview): View other templates.
