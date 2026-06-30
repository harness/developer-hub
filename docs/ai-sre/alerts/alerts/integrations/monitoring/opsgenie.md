---
title: Opsgenie Integration
description: Configure Opsgenie integration for Harness AI SRE to receive incident management alerts.
sidebar_label: Opsgenie
sidebar_position: 8
---

# Opsgenie Integration

Configure Opsgenie integration to receive incident management alerts in Harness AI SRE.

## Overview

Opsgenie provides:
- **Alert management**: Centralized alert routing and escalation
- **On-call scheduling**: Automatic responder assignment
- **Incident tracking**: Full incident lifecycle management
- **Team collaboration**: Coordinated incident response
- **Integration hub**: Connect multiple monitoring tools

---

## Set up Opsgenie integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Opsgenie** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Opsgenie account, configure an outgoing webhook integration pointing to the copied URL
7. Configure payload mapping to match Opsgenie alert fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming Opsgenie alerts

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route Opsgenie alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
