---
title: Fail Fast Pipeline Support
description: You can enable fail fast behavior in your pipelines.
---

:::note
Currently, this feature is behind the feature flag: `PIPE_FAIL_ALL_FAILURE_STRATEGY`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

In traditional deployments, Harness waits for all steps or stages to complete before determining pipeline status. This can be inefficient when an early failure is enough to trigger rollback.

Harness now supports **Fail Fast** behavior:

- If **any step or stage** in a parallel group fails, the pipeline immediately:
  - Fails without waiting for the remaining steps to complete.
  - Triggers the configured **failure strategy**, such as **pipeline rollback**.

This is particularly useful in scenarios where early failures should halt the entire rollout.
