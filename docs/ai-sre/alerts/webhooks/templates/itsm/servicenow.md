---
title: ServiceNow Integration Webhook Template
description: Receive ITSM event notifications.
sidebar_label: ServiceNow Webhook Template
sidebar_position: 19
keywords:
  - ServiceNow
  - webhook
  - template
  - integration
  - AI SRE
  - alerts
tags:
  - ai-sre
  - webhooks
  - servicenow
---

Configure ServiceNow integration to receive ITSM event notifications in Harness AI SRE.

## Overview

ServiceNow provides:
- **Incident management:** Track ServiceNow incidents
- **Change management:** Monitor change requests
- **Problem management:** Receive problem ticket notifications
- **Service catalog:** Track service requests
- **CMDB events:** Configuration item change notifications

---

## Set up ServiceNow integration

To connect ServiceNow to Harness AI SRE, complete these steps:

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **ServiceNow** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your ServiceNow instance, configure a business rule or outbound REST message pointing to the copied URL
7. Configure payload mapping to match ServiceNow incident fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming ServiceNow events

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route ServiceNow alerts to the right destinations.
- [Ingest alerts overview](/docs/ai-sre/alerts/webhooks/templates/overview): View other integrations.
