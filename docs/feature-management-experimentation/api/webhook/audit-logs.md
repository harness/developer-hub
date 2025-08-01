---
title: Webhook for Audit Logs
description: Learn how to configure the webhook for audit logs in Harness FME.
sidebar_position: 1
sidebar_label: Audit Logs
---

## Overview

Use this outgoing webhook to integrate Split changes into the tools that your team already uses. You can use Split webhooks to enhance your monitoring, tracking, and analytics tools by updating external issue trackers and support tickets or overlaying performance charts.

Anytime a feature flag is modified, we send an HTTP POST payload to the webhook's configured URL. The data sent has the following schema. Any response code other than 200 is marked as failure.

```json
{
  "name": "string", // name of the feature.
  "type": "string", // 'split' for now.
  "changeNumber": 1234, // version of the feature definition post change.
  "time": 5678, // the unix timestamp of the change.
  "definition": "string", // the definition of this feature post change.
  "description": "string", // a readable summary of the change.
  "link": "string", // a link to the Split. Nullable.
  "environmentName": "string", // name of the environment in which this Split was changed.
  "editor": "string", // who made this change.
  "schemaVersion": 1, // version of schema for this doc.
  "previous": <a reference to a similar object representing the previous change> 
}
```

## Retry

If Split receives a non-200 response to a webhook POST, Split waits 300 milliseconds and attempts to retry the delivery once.

## Configuring the webhook

To configure this webhook:

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
1. Click **Integrations** and navigate to the **Marketplace** tab.
1. Find Outgoing webhook (Audit log), click **Add** and select the Split project for which you would like to configure the integration.
1. Check the environments where you want data sent from.
1. Enter the URL where the POST should be sent.
1. Click **Save**.

Contact support@split.io if you have any issues with this webhook.