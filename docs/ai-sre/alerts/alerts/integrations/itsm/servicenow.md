---
title: ServiceNow Integration
description: Configure ServiceNow integration for Harness AI SRE to receive ITSM event notifications.
sidebar_label: ServiceNow
sidebar_position: 19
---

# ServiceNow Integration

Configure ServiceNow integration to receive ITSM event notifications in Harness AI SRE.

## Overview

ServiceNow provides:
- **Incident management**: Track ServiceNow incidents
- **Change management**: Monitor change requests
- **Problem management**: Receive problem ticket notifications
- **Service catalog**: Track service requests
- **CMDB events**: Configuration item change notifications

---

## Set up ServiceNow integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **ServiceNow** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your ServiceNow instance, configure a business rule or outbound REST message pointing to the copied URL
7. Configure payload mapping to match ServiceNow incident fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming ServiceNow events

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route ServiceNow alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
