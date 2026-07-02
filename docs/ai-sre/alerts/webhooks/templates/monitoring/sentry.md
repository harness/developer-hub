---
title: Sentry Integration Webhook Template
description: Configure Sentry integration for Harness AI SRE to receive error tracking and performance monitoring alerts.
sidebar_label: Sentry Webhook Template
sidebar_position: 12
---

# Sentry Integration Webhook Template

Configure Sentry integration to receive error tracking and performance monitoring alerts in Harness AI SRE.

## Overview

Sentry provides:
- **Error tracking**: Capture and track application errors
- **Performance monitoring**: Monitor application performance issues
- **Release tracking**: Link errors to specific releases
- **User context**: Track which users are affected
- **Stack traces**: Detailed error context and debugging information

---

## Set up Sentry integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Sentry** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Sentry project settings, configure a webhook integration pointing to the copied URL
7. Configure payload mapping to match Sentry issue fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Sentry issues

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Sentry alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
