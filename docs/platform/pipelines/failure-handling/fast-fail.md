---
title: Fail Fast Pipeline
description: You can enable fail fast behavior in your pipelines.
---

:::note
Currently, this feature is behind the feature flag: `PIPE_FAIL_ALL_FAILURE_STRATEGY`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature.

Currently, this is only supported for **Deploy steps**. For example, Helm deploy step, ASG Deploy steps, Kubernetes deploy, GitOps Sync steps, etc. It is **not supported** for other step types including:
- **Verify steps**
- **Approval steps**
- Other non-deployment steps
:::

In traditional deployments, Harness waits for all steps or stages to complete before determining pipeline status. This can be inefficient when an early failure is enough to trigger rollback.

Harness now supports **Fail Fast** behavior:

- If **any step or stage** in a parallel group fails, the pipeline immediately:
  - Fails without waiting for the remaining steps to complete.
  - Triggers the configured **failure strategy**, such as **pipeline rollback**.

This is particularly useful in scenarios where early failures should halt the entire rollout.

Here is a sample YAML for setting up fail fast in your pipeline:
```yaml
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: PipelineRollback
                spec:
                  failAll: true
```

Adding `failAll: true` to the **failure strategy** at **stage level** will enable fail fast behavior.

## Fail fast with matrix iterations

`failAll: true` also applies when the failing stage uses a [matrix strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism#matrix-strategies). When one matrix iteration fails, Harness triggers the configured failure strategy for the stage, for example rolling back through **PipelineRollback**.

`failAll: true` does not cancel matrix iterations that are already running. Iterations that have started continue to completion; only iterations that haven't started yet are skipped. This matches the general parallel-execution behavior described in [Failure strategy support for multiservice, multi-infrastructure, and matrix deployment](/docs/continuous-delivery/x-platform-cd-features/failure-strategy-service-env#failure-strategy-support-for-multiservice-multi-infrastructure-and-matrix-deployment): already-started deployments in a parallel group cannot be stopped, even when a failure occurs elsewhere in the group.

Once every iteration reaches a terminal state, the configured failure strategy runs once for the stage, for example a single **PipelineRollback** that rolls back all matrix iterations together.