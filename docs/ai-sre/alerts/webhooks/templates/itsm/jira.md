---
title: Jira Integration Webhook Template
description: Configure Jira integration for Harness AI SRE to receive issue tracking notifications.
sidebar_label: Jira Webhook Template
sidebar_position: 16
---

# Jira Integration Webhook Template

Configure Jira integration to receive issue tracking notifications in Harness AI SRE.

## Overview

Jira provides:
- **Issue tracking**: Monitor issue creation and updates
- **Project management**: Track project milestones and progress
- **Sprint events**: Receive sprint start and completion notifications
- **Status changes**: Monitor issue status transitions
- **Priority changes**: Track critical issue escalations

---

## Set up Jira integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Jira** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Jira project settings, configure a webhook pointing to the copied URL
7. Configure payload mapping to match Jira issue fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming Jira events

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route Jira alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
