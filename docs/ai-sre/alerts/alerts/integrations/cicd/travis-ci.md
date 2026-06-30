---
title: Travis CI Integration
description: Configure Travis CI integration for Harness AI SRE to receive build and deployment notifications.
sidebar_label: Travis CI
sidebar_position: 18
---

# Travis CI Integration

Configure Travis CI integration to receive build and deployment notifications in Harness AI SRE.

## Overview

Travis CI provides:
- **Build notifications**: Track build success and failures
- **Deployment events**: Monitor deployment status
- **Test results**: Receive test failure notifications
- **Branch builds**: Track builds across branches
- **Pull request builds**: Monitor PR build status

---

## Set up Travis CI integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Travis CI** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Travis CI repository settings, configure a webhook notification pointing to the copied URL
7. Configure payload mapping to match Travis CI event fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming Travis CI events

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route Travis CI alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.
