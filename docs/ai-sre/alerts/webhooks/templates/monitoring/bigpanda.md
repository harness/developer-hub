---
title: BigPanda Integration Webhook Template
description: Configure BigPanda integration for Harness AI SRE to receive alert aggregation and correlation.
sidebar_label: BigPanda Webhook Template
sidebar_position: 3
---

# BigPanda Integration Webhook Template

Configure BigPanda integration to receive alert aggregation and correlation in Harness AI SRE.

## Overview

BigPanda provides:
- **Alert aggregation**: Consolidate alerts from multiple sources
- **Incident correlation**: Automatically group related alerts
- **Noise reduction**: Filter and deduplicate alerts
- **Root cause analysis**: Identify underlying issues
- **Event enrichment**: Add context to alerts

---

## Set up BigPanda integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **BigPanda** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your BigPanda account, configure an outbound webhook integration pointing to the copied URL
7. Configure payload mapping to match BigPanda alert fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming BigPanda alerts

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route BigPanda alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
