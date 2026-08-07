---
title: GitHub Integration Webhook Template
description: Receive repository event notifications.
sidebar_label: GitHub Webhook Template
sidebar_position: 14
keywords:
  - GitHub
  - webhook
  - template
  - integration
  - AI SRE
  - alerts
tags:
  - ai-sre
  - webhooks
  - github
---

Configure GitHub integration to receive repository event notifications in Harness AI SRE.

## Overview

GitHub provides:
- **Repository events:** Push, pull request, and release notifications
- **Deployment events:** Track deployment status and outcomes
- **Issue tracking:** Monitor issue creation and updates
- **Security alerts:** Receive Dependabot and security scanning alerts
- **Workflow events:** GitHub Actions workflow status

---

## Set up GitHub integration

Complete these steps to connect GitHub to Harness AI SRE:

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **GitHub** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your GitHub repository settings, add a webhook pointing to the copied URL
7. Configure payload mapping to match GitHub event fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming GitHub events

---

## Next steps

- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route GitHub alerts to the right destinations.
- [Ingest alerts overview](/docs/ai-sre/alerts/webhooks/templates/overview): View other integrations.
