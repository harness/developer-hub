---
title: BigPanda Integration
description: Configure BigPanda integration for Harness AI SRE to receive alert aggregation and correlation.
sidebar_label: BigPanda
sidebar_position: 3
---

# BigPanda Integration

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
8. Set up alert rules to route and filter incoming BigPanda alerts

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route BigPanda alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
