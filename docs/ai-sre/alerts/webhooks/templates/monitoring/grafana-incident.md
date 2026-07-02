---
title: Grafana Incident Integration Webhook Template
description: Configure Grafana Incident integration for Harness AI SRE to receive incident management alerts.
sidebar_label: Grafana Incident Webhook Template
sidebar_position: 6
---

# Grafana Incident Integration Webhook Template

Configure Grafana Incident integration to receive incident management alerts in Harness AI SRE.

## Overview

Grafana Incident provides:
- **Incident management**: Dedicated incident response platform
- **On-call scheduling**: Manage on-call rotations
- **Escalation policies**: Define escalation chains
- **Incident timeline**: Track incident resolution progress
- **Post-incident review**: Document and learn from incidents

---

## Set up Grafana Incident integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Grafana Incident** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Grafana Incident settings, configure an outgoing webhook pointing to the copied URL
7. Configure payload mapping to match Grafana Incident fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Grafana Incident alerts

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Grafana Incident alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
