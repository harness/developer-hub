---
title: Grafana Incident Integration Webhook Template
description: Receive incident management alerts.
sidebar_label: Grafana Incident Webhook Template
sidebar_position: 6
keywords:
  - Grafana Incident
  - webhook
  - monitoring
  - alerts
  - AI SRE
tags:
  - ai-sre
  - webhooks
  - monitoring
---

Configure Grafana Incident integration to receive incident management alerts in Harness AI SRE.

## Overview

Grafana Incident provides:
- **Incident management:** Dedicated incident response platform
- **On-call scheduling:** Manage on-call rotations
- **Escalation policies:** Define escalation chains
- **Incident timeline:** Track incident resolution progress
- **Post-incident review:** Document and learn from incidents

---

## Set up Grafana Incident integration

To connect Grafana Incident to Harness AI SRE, complete these steps:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **Grafana Incident** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your Grafana Incident settings, configure an outgoing webhook pointing to the copied URL.
7. Configure payload mapping to match Grafana Incident fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming Grafana Incident alerts.

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route Grafana Incident alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
