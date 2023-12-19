---
title: Expression status type reference
description: Learn about the differences between `status`, `currentStatus`, and `liveStatus` expressions.
sidebar_position: 6
---

When using expressions in Harness, there are differences between the `status`, `currentStatus`, and `liveStatus` expression types. `status` refers to the running status of a single node. `currentStatus` and `liveStatus` provide the combined statuses of all running steps within a pipeline or stage. The difference between status types is based on how they handle step failures and if the status of steps running in a matrix or strategy is included in the overall status calculation.

### Status
The `status` refers to the current running status of a single node. It provides information about the state of that specific node without considering the status of its child nodes. It focuses on the immediate status of the node itself.

### Current Status
The `currentStatus` represents the combined status of all the running steps within a pipeline or stage. It takes into account the statuses of all the individual steps and determines the overall status. If any of the steps have failed, regardless of the running or completed steps, the current status of both the pipeline and the stage will be considered as failed. This means that the failure of even one step can affect the status of the entire pipeline or stage.

:::info note
The status of a currently running step inside a matrix is not factored into the current status calculation. This means that the running status of a step within a matrix does not contribute to the overall current status of the pipeline or stage.

:::

### Live Status
Similar to `currentStatus`, `liveStatus` also provides the combined status of all the running steps within a pipeline or stage. It considers the statuses of individual steps to determine the overall status. If any step fails, the `liveStatus` of both the pipeline and the stage will be marked as failed, regardless of the running or completed steps.

:::info note
Unlike the `currentStatus`, the `liveStatus` calculation includes the status of a stage step running inside a strategy as part of the overall live status. This means that the running status of a step within a strategy contributes to the determination of the live status of the pipeline or stage.

::: 

#### Status examples
The following example describes an ongoing execution with three steps named step1, step2, and step3 within a stage called stage1.

Step1 is executed using a matrix strategy, specifically with two values: "john" and "doe".

The current status of the steps is as follows:

- stage1: Running

- step1: Success

- step2: Success

- step3 (matrix): Running 

   - "john": Failed

   - "doe": Success

In this example, the status values for stage1 are as follows:

- stage1.status: Running (directly taken from the status of stage1)

- stage1.currentStatus: Success (derived from the statuses of all steps, excluding step3 with the matrix)

- stage1.liveStatus: Failed (calculated by considering the statuses of all steps, excluding step3 with the matrix)

In summary:

- The  `status` of stage1 is `Running`.

- The `currentStatus` of stage1, which excludes step3 with the matrix, is `Success`.

- The `liveStatus` of stage1, also excluding step3 with the matrix, is `Failed`.
