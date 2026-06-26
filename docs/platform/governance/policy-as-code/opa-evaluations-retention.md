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

## Contact support

For questions about data retention policies or to request a custom retention period, contact [Harness Support](mailto:support@harness.io).
