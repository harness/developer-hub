---
title: New Relic Integration Webhook Template
description: Receive NRQL alerts and APM monitoring.
sidebar_label: New Relic Webhook Template
sidebar_position: 9
keywords:
  - New Relic
  - webhook
  - monitoring
  - alerts
  - AI SRE
  - NRQL
tags:
  - ai-sre
  - webhooks
  - monitoring
---

Configure New Relic integration to receive NRQL alerts and APM monitoring in Harness AI SRE.

## Overview

New Relic provides:
- **NRQL alerts:** Query-based alerting on any data
- **Entity correlation:** Link alerts to monitored entities
- **Service mapping:** Automatic service discovery
- **Golden signals:** Pre-built SLI monitoring
- **APM integration:** Application performance tracking

---

## Set up New Relic integration

Complete the following steps to connect New Relic to Harness AI SRE:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **New Relic** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your New Relic account, configure a webhook notification channel pointing to the copied URL.
7. Configure payload mapping to match New Relic incident fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming New Relic incidents.

---

## Example alert payload

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

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route New Relic alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
