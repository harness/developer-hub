---
title: Bitbucket Integration Webhook Template
description: Receive repository event notifications.
sidebar_label: Bitbucket Webhook Template
sidebar_position: 13
keywords:
  - bitbucket
  - webhook
  - integration
  - ai sre
  - alerts
tags:
  - ai-sre
  - webhooks
  - bitbucket
---

Configure Bitbucket integration to receive repository event notifications in Harness AI SRE.

## Overview

Bitbucket provides:
- **Repository events:** Push, pull request, and branch notifications.
- **Pipeline events:** Bitbucket Pipelines status and failures.
- **Deployment events:** Track deployment status.
- **Code review:** Monitor pull request activity.
- **Build status:** Receive build success and failure notifications.

---

## Set up Bitbucket integration

Complete these steps to connect Bitbucket to Harness AI SRE:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **Bitbucket** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your Bitbucket repository settings, add a webhook pointing to the copied URL.
7. Configure payload mapping to match Bitbucket event fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming Bitbucket events.

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route Bitbucket alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
