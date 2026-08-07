---
title: BigPanda Integration Webhook Template
description: Receive aggregated and correlated alerts.
sidebar_label: BigPanda Webhook Template
sidebar_position: 2
keywords:
  - BigPanda
  - webhook
  - monitoring
  - alerts
  - AI SRE
tags:
  - ai-sre
  - webhooks
  - monitoring
---

Configure BigPanda integration to receive alert aggregation and correlation in Harness AI SRE.

## Overview

BigPanda provides:
- **Alert aggregation:** Consolidate alerts from multiple sources
- **Incident correlation:** Automatically group related alerts
- **Noise reduction:** Filter and deduplicate alerts
- **Root cause analysis:** Identify underlying issues
- **Event enrichment:** Add context to alerts

---

## Set up BigPanda integration

To connect BigPanda to Harness AI SRE, complete these steps:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **BigPanda** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your BigPanda account, configure an outbound webhook integration pointing to the copied URL.
7. Configure payload mapping to match BigPanda alert fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming BigPanda alerts.

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route BigPanda alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
