---
title: Octopus Deploy Integration Webhook Template
description: Configure Octopus Deploy integration for Harness AI SRE to receive deployment event notifications.
sidebar_label: Octopus Deploy Webhook Template
sidebar_position: 17
---

# Octopus Deploy Integration Webhook Template

Configure Octopus Deploy integration to receive deployment event notifications in Harness AI SRE.

## Overview

Octopus Deploy provides:
- **Deployment events**: Track deployment success and failures
- **Release notifications**: Monitor release progression
- **Environment deployments**: Track deployments across environments
- **Runbook automation**: Receive runbook execution status
- **Infrastructure events**: Monitor deployment target health

---

## Set up Octopus Deploy integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Octopus Deploy** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Octopus Deploy instance, configure a subscription webhook pointing to the copied URL
7. Configure payload mapping to match Octopus Deploy event fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Octopus Deploy events

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Octopus Deploy alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
