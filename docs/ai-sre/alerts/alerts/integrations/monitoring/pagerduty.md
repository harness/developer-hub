---
title: PagerDuty Integration
description: Configure PagerDuty integration for Harness AI SRE to receive incident management alerts.
sidebar_label: PagerDuty
sidebar_position: 9
---

# PagerDuty Integration

Configure PagerDuty integration to receive incident management alerts in Harness AI SRE.

## Overview

PagerDuty provides:
- **Incident management**: Two-way incident synchronization
- **PagerDuty alert routing**: Route based on service and priority
- **PagerDuty on-call schedules**: Sync schedule information
- **PagerDuty escalation policies**: Mirror escalation rules
- **Service dependencies**: Track service relationships

---

## Set up PagerDuty integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **PagerDuty** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your PagerDuty account, configure a webhook extension pointing to the copied URL
7. Configure payload mapping to match PagerDuty incident fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming PagerDuty incidents

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

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route PagerDuty alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
