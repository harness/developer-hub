---
title: Webhook for Impressions
description: Learn how to configure the webhook for impressions in Harness FME.
sidebar_position: 3
sidebar_label: Impressions
redirect_from:
  - /docs/feature-management-experimentation/api/webhook/impressions
---

Use the Impressions webhook to send Harness FME [impression](/docs/feature-management-experimentation/feature-management/monitoring-analysis/impressions/) data to the tools your team already uses, such as analytics platforms, data warehouses, or custom systems. This webhook helps engineering and product teams track feature flag evaluations and enrich their existing tracking pipelines.

## Outgoing data

When an impression is recorded by an SDK, Harness FME sends an HTTP `POST` payload to the configured webhook URL in JSON format (`Content-Type: application/json`). Impressions are batched and delivered approximately every 10 seconds. To reduce latency, each request is gzipped unless the endpoint is a Slack or [Fivetran](https://fivetran.com/) webhook.

```json
[
  {
    "key": "string", // A primary key used for both targeting (matching in rules or segments) and bucketing (treatment assignment), unless a separate bucketingKey was explicitly provided at the time of evaluation.
    "split": "string", // feature flag name
    "environmentId": "string", // environment id where we are evaluating the feature flag
    "environmentName": "string", // environment name
    "treatment": "string", // treatment we gave to this key
    "time": "long", // timestamp when the SDK made the evaluation
    "bucketingKey": "string", // Optional, a key used for hashing to determine the treatment bucket when provided. If not provided, defaults to the matching key.
    "label": "string", // the rule that was applied to return a treatment
    "machineName": "string", // the hostname of the SDK host (if available)
    "machineIp": "string", // the IP of the SDK host (if available)
    "splitVersionNumber": "long", // equivalent to the generation time
    "sdk": "string", // the SDK language that evaluated the feature flag
    "sdkVersion": "string", // the SDK version that evaluated the feature flag
    "properties": "string" // reserved for future use
  },
  // ... a list of objects with the same type
]
```

A `200` response indicates successful delivery. Any other response code is marked as a failure.

## Retry

If Harness FME receives a non-`200` response from your endpoint, it waits 300 milliseconds and retries delivery once. For sustained failures, see [Delivery protection](#delivery-protection) below.

## Delivery protection

To ensure reliable delivery, Harness monitors the health of each configured webhook endpoint. If an endpoint returns a sustained high rate of errors (non-2xx responses, timeouts, or connection failures), delivery to that specific integration configuration may be temporarily paused.

This protection is applied per integration configuration. Other integrations or configurations within the same project are not affected.

### What happens during a pause

- After a short cooldown period, Harness automatically retries delivery.
- If the endpoint has recovered and responds successfully, normal delivery resumes immediately.
- If the endpoint continues to fail, the pause is extended.

### What does not trigger a pause

Occasional or sporadic errors do not cause a pause. Only a sustained pattern of failures activates this protection.

### Recommended actions 

If you notice a gap in impression delivery:

1. **Check your endpoint health**: Verify that your receiving service is reachable, responding with 2xx status codes, and processing requests promptly.
2. **Review error responses**: If your endpoint is returning 4xx or 5xx errors, identify and fix the root cause. Once your endpoint responds successfully, delivery resumes automatically.

## Setup

To configure the impressions webhook:

1. From the Harness FME navigation menu, click **FME Settings** > **Integrations** and select **Webhooks** from the categories menu.
1. Click **Add** on the **Outgoing Webhook (Impressions)** integration and select a project to add the webhook to.
1. Select one or more environments from which impressions should be sent.
1. Enter the webhook URL where `POST` requests should be sent.
1. Click **Save**.

If you experience any issues with webhook delivery or payload configuration, contact [Harness Support](/docs/feature-management-experimentation/fme-support).