---
title: New Relic Integration
description: Configure New Relic integration for Harness AI SRE to receive NRQL alerts and APM monitoring.
sidebar_label: New Relic
sidebar_position: 8
---

# New Relic Integration

Configure New Relic integration to receive NRQL alerts and APM monitoring in Harness AI SRE.

## Overview

New Relic provides:
- **NRQL alerts**: Query-based alerting on any data
- **Entity correlation**: Link alerts to monitored entities
- **Service mapping**: Automatic service discovery
- **Golden signals**: Pre-built SLI monitoring
- **APM integration**: Application performance tracking

---

## Set up New Relic integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **New Relic** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your New Relic account, configure a webhook notification channel pointing to the copied URL
7. Configure payload mapping to match New Relic incident fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming New Relic incidents

---

## Example Alert Payload

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

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route New Relic alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
