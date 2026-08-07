---
title: Jira Integration Webhook Template
description: Receive issue tracking notifications.
sidebar_label: Jira Webhook Template
sidebar_position: 16
keywords:
  - Jira
  - webhook
  - template
  - integration
  - AI SRE
  - alerts
tags:
  - ai-sre
  - webhooks
  - jira
---

Configure Jira integration to receive issue tracking notifications in Harness AI SRE.

## Overview

Jira provides:
- **Issue tracking:** Monitor issue creation and updates
- **Project management:** Track project milestones and progress
- **Sprint events:** Receive sprint start and completion notifications
- **Status changes:** Monitor issue status transitions
- **Priority changes:** Track critical issue escalations

---

## Set up Jira integration

To connect Jira to Harness AI SRE, complete these steps:

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Jira** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Jira project settings, configure a webhook pointing to the copied URL
7. Configure payload mapping to match Jira issue fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Jira events

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route Jira alerts to the right destinations.
- [Ingest alerts overview](/docs/ai-sre/alerts/webhooks/templates/overview): View other integrations.
