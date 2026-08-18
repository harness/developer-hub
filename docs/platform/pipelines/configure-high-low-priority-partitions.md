---
title: Configure High/Low priority partitions
description: Allocate account concurrency capacity between High and Low priority partitions for project execution control.
sidebar_position: 31
keywords:
  - pipeline concurrency
  - priority partitions
  - high priority
  - low priority
  - execution capacity
tags:
  - pipelines
  - concurrency
---

High/Low priority partition mode allows you to allocate your account's concurrency capacity between **High** and **Low** priority partitions. You can assign projects to a partition to control how much execution capacity is available to those projects.

This mode is useful when you want to reserve capacity for critical projects or limit the capacity available to selected projects.

:::note
This feature is behind feature flags `PIPE_PROJECT_LEVEL_EXECUTION_CONCURRENCY` and `PIPE_ENABLE_QUEUE_BASED_PLAN_CREATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

---

## What you will learn in this topic

- How to [configure High/Low priority partitions](#configure-highlow-priority-partitions).
- How to [assign projects to partitions](#partition-assignment).
- How to understand [partition execution behavior](#partition-behavior).

---

## Before you begin

- **Account administrator access**: Only account administrators can configure account-level concurrency settings. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to review role requirements.
- **Feature flags enabled**: The High/Low priority partition mode requires the `PIPE_PROJECT_LEVEL_EXECUTION_CONCURRENCY` and `PIPE_ENABLE_QUEUE_BASED_PLAN_CREATION` feature flags. Contact [Harness Support](mailto:support@harness.io) if these flags are not enabled.

---

## Configure High/Low priority partitions

Only account administrators can configure the account-level concurrency settings.

To configure High/Low priority partitions:

1. Navigate to **Account Settings** > **General** > **Default Settings** > **Pipeline** > **CONCURRENCY MANAGEMENT**.

   <div align="center"><DocImage path={require('./static/project-concurrency.png')} alt="Concurrency Management settings in High/Low priority partition mode, showing Concurrency Mode, Pipeline Execution Priority, Concurrency Limit, and Prioritized Projects" width="90%" /></div>

2. In **Concurrency Mode**, select **Use High/Low priority partitions (current behavior)**.

3. Confirm the change when Harness prompts you. Changing the concurrency mode affects pipeline executions across the account.

4. In **Concurrent Active Pipeline Executions**, enter your account's total concurrency limit. The default is `1000`. Select **Restore to Default** to reset the value to the system default.

5. In **Pipeline Execution Priority**, select the partition you want to configure: **High** or **Low**.

6. In **Concurrency Limit**, specify how many execution slots to allocate to the selected partition. The value must be less than the account's total concurrency limit.

   For example, if the account's total concurrency limit is `1000` and you set the High-priority concurrency limit to `200`, the High partition has 200 slots and the remaining 800 slots are available to the Low partition.

7. In **Prioritized Projects**, select one or more projects to assign to the selected partition. All projects that are not selected automatically belong to the opposite partition.

8. Select **Restore to Default** to revert the partition configuration.

---

## Partition assignment

There are two ways to configure the High and Low partitions, depending on which projects you want to explicitly identify.

### Reserve capacity for High-priority projects

- Define the number of slots for the High partition and select the projects that should belong to it.
- All other projects, including newly created projects, automatically belong to the Low partition.
- Use this approach when you want to reserve capacity for a small number of critical projects, such as security fixes or production releases.

### Limit selected projects to Low priority

- Define the number of slots for the Low partition and select the projects that should belong to it.
- All other projects, including newly created projects, automatically belong to the High partition.
- Use this approach when you want to limit noisy or build-heavy projects, such as CI projects, and preserve capacity for other projects.

---

## Partition behavior

For example, assume an account has a total concurrency limit of `1000`, with `200` slots allocated to High priority and `800` slots allocated to Low priority.

- High-priority executions can use available capacity from the High partition and can spill over into available Low capacity.
- Low-priority executions can use only the Low partition.
- If the Low partition is full, new Low-priority executions remain queued until a Low slot becomes available.
- If both partitions are full, new High-priority executions are queued. A queued High-priority execution can start when a slot becomes available in either partition.
- Queued Low-priority executions start when a slot becomes available in the Low partition.

This behavior allows High-priority projects to use available account capacity while preventing Low-priority projects from consuming the capacity reserved for High priority.

---

## Next steps

- Go to [Configure per-project concurrency](/docs/platform/pipelines/configure-per-project-concurrency) to learn about the alternative concurrency mode.
- Go to [Pipeline settings](/docs/platform/pipelines/pipeline-settings) to configure other account-level pipeline settings.
- Go to [Use looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to understand how parallelism interacts with concurrency limits.
