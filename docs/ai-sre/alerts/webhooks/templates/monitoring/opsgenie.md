---
title: Opsgenie Integration Webhook Template
description: Receive incident management alerts.
sidebar_label: Opsgenie Webhook Template
sidebar_position: 10
keywords:
  - Opsgenie
  - webhook
  - template
  - integration
  - AI SRE
  - alerts
tags:
  - ai-sre
  - webhooks
  - opsgenie
---

Configure Opsgenie integration to receive incident management alerts in Harness AI SRE.

## Overview

Opsgenie provides:
- **Alert management:** Centralized alert routing and escalation
- **On-call scheduling:** Automatic responder assignment
- **Incident tracking:** Full incident lifecycle management
- **Team collaboration:** Coordinated incident response
- **Integration hub:** Connect multiple monitoring tools

---

## Set up Opsgenie integration

Complete the following steps to connect Opsgenie to Harness AI SRE:

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Opsgenie** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Opsgenie account, configure an outgoing webhook integration pointing to the copied URL
7. Configure payload mapping to match Opsgenie alert fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Opsgenie alerts

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route Opsgenie alerts to the right destinations.
- [Ingest alerts overview](/docs/ai-sre/alerts/webhooks/templates/overview): View other integrations.
