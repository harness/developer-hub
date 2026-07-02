---
title: Lacework Integration Webhook Template
description: Configure Lacework integration for Harness AI SRE to receive cloud security alerts.
sidebar_label: Lacework Webhook Template
sidebar_position: 7
---

# Lacework Integration Webhook Template

Configure Lacework integration to receive cloud security alerts in Harness AI SRE.

## Overview

Lacework provides:
- **Cloud security**: Continuous security monitoring for cloud environments
- **Anomaly detection**: Machine learning-based threat detection
- **Compliance monitoring**: Track compliance violations
- **Vulnerability management**: Container and host vulnerability scanning
- **Behavioral analysis**: Detect unusual activity patterns

---

## Set up Lacework integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Lacework** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Lacework console, configure a webhook alert channel pointing to the copied URL
7. Configure payload mapping to match Lacework event fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Lacework events

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Lacework alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
