---
title: Travis CI Integration Webhook Template
description: Receive build and deployment notifications.
sidebar_label: Travis CI Webhook Template
sidebar_position: 18
keywords:
  - travis ci
  - webhook
  - integration
  - ai sre
  - alerts
tags:
  - ai-sre
  - webhooks
  - travis-ci
---

Configure Travis CI integration to receive build and deployment notifications in Harness AI SRE.

## Overview

Travis CI provides:
- **Build notifications:** Track build success and failures.
- **Deployment events:** Monitor deployment status.
- **Test results:** Receive test failure notifications.
- **Branch builds:** Track builds across branches.
- **Pull request builds:** Monitor PR build status.

---

## Set up Travis CI integration

To connect Travis CI to Harness AI SRE, complete these steps:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **Travis CI** from the template options.
4. Enter a name and generate an ID.
5. Copy the generated webhook URL.
6. In your Travis CI repository settings, configure a webhook notification pointing to the copied URL.
7. Configure payload mapping to match Travis CI event fields to Harness AI SRE fields.
8. Set up route alerts to route and filter incoming Travis CI events.

---

## Next steps

- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route Travis CI alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
