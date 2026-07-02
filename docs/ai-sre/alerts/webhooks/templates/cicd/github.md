---
title: GitHub Integration Webhook Template
description: Configure GitHub integration for Harness AI SRE to receive repository event notifications.
sidebar_label: GitHub Webhook Template
sidebar_position: 14
---

# GitHub Integration Webhook Template

Configure GitHub integration to receive repository event notifications in Harness AI SRE.

## Overview

GitHub provides:
- **Repository events**: Push, pull request, and release notifications
- **Deployment events**: Track deployment status and outcomes
- **Issue tracking**: Monitor issue creation and updates
- **Security alerts**: Receive Dependabot and security scanning alerts
- **Workflow events**: GitHub Actions workflow status

---

## Set up GitHub integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **GitHub** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your GitHub repository settings, add a webhook pointing to the copied URL
7. Configure payload mapping to match GitHub event fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming GitHub events

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route GitHub alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
