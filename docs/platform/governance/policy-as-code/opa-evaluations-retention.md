---
title: Policy evaluations retention
description: Learn about the retention period for Policy as Code (OPA) evaluations in Harness.
sidebar_position: 100
---

Harness retains Policy as Code (OPA) evaluation data for a default period of 6 months. This applies to all policy evaluations performed by the Harness OPA server across pipelines, templates, feature flags, and other entities.

## Default retention period

The default retention period for OPA evaluations is 6 months. After this period, Harness automatically removes evaluation data from your account.

## Retention period alignment with pipeline data

If your account has a pipeline data retention policy that exceeds 6 months, your Policy as Code evaluations retention period automatically aligns with your existing pipeline data retention window.

Go to [Data retention](/docs/platform/references/data-retention) to learn more about Harness data retention policies across products.

## What happens when evaluations expire

When the retention period expires, the following occurs:

- You can no longer view evaluation results in the Harness UI for evaluations older than the retention window.
- You can no longer download evaluation data that occurred beyond the retention period.
- Harness automatically removes expired evaluations from your account.

## Download evaluations for compliance

If you need to retain evaluation data beyond the default period for compliance or audit purposes, download your evaluation data regularly before it expires.

To download evaluation data:

1. In Harness, go to the policy evaluation results you want to download.
2. Download the evaluation data through the Harness UI.
3. Schedule regular downloads (at least once every 6 months) to maintain historical records.

## How evaluation data is stored

Harness stores policy evaluation data in two locations to optimize database performance and support larger policy inputs:

- **Evaluation input:** The JSON of the entity being evaluated (pipeline YAML, Terraform plans, etc.).
- **Evaluation results and metadata:** Stored in the database. This includes policy evaluation outcomes, status information, account ID, organization, project, and timestamps.

The input is a field within the evaluation data. For larger evaluations it is not returned inline in the standard API responses (find, find-by-ids, list) and is instead delivered through the input signed-URL API.

### Why input is stored separately

Evaluation inputs can be very large (10 KB to 30+ MB for infrastructure-as-code modules). To support larger inputs without impacting database performance, we have offloaded the input to the new API.

### Accessing evaluation input

When you view evaluation results in the Harness UI, Harness automatically retrieves the input when needed. If you use the Harness API to retrieve evaluations, for some evaluations the input is included inline in `evaluation_data.input`. If the field is null, call the new API:

```http
GET /api/v1/evaluations/evaluation-input-signed-url/{evaluation_id}
```

This endpoint returns a signed URL that you can use to download the input JSON directly from cloud storage. The validity of the URL comes in the Expires field.

## Contact support

For questions about data retention policies or to request a custom retention period, contact [Harness Support](mailto:support@harness.io).
