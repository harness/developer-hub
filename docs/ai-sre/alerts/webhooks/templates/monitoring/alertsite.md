---
title: AlertSite Integration Webhook Template
description: Receive website and API monitoring alerts.
sidebar_label: AlertSite Webhook Template
sidebar_position: 1
keywords:
  - AlertSite
  - webhook
  - monitoring
  - alerts
  - AI SRE
tags:
  - ai-sre
  - webhooks
  - monitoring
---

Configure AlertSite integration to receive website and API monitoring alerts in Harness AI SRE.

## Overview

AlertSite provides:
- **Website monitoring:** Uptime and performance tracking
- **API monitoring:** Endpoint health checks
- **Transaction monitoring:** Multi-step user flows
- **Performance metrics:** Response times and throughput
- **Availability tracking:** Geographic location monitoring

---

## Set up AlertSite integration

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **AlertSite** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your AlertSite account, configure a webhook notification pointing to the copied URL.
7. Configure payload mapping to match AlertSite alert fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming AlertSite alerts.

---

## Example alert payload

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

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route AlertSite alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
