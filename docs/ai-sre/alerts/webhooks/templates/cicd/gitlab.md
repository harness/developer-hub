---
title: GitLab Integration Webhook Template
description: Configure GitLab integration for Harness AI SRE to receive repository and pipeline event notifications.
sidebar_label: GitLab Webhook Template
sidebar_position: 15
---

# GitLab Integration Webhook Template

Configure GitLab integration to receive repository and pipeline event notifications in Harness AI SRE.

## Overview

GitLab provides:
- **Repository events**: Push, merge request, and tag notifications
- **Pipeline events**: CI/CD pipeline status and failures
- **Deployment events**: Track deployment outcomes
- **Issue tracking**: Monitor issue and merge request activity
- **Security scanning**: Receive security vulnerability alerts

---

## Set up GitLab integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **GitLab** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your GitLab project settings, add a webhook pointing to the copied URL
7. Configure payload mapping to match GitLab event fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming GitLab events

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route GitLab alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
