---
title: Pausing pipeline execution using the Wait step
description: This topic shows you how to use the Wait step to pause a pipeline execution for any amount of time.
sidebar_position: 5
---

:::note

Currently, this feature is behind the feature flag, `WAIT_STEP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

This topic describes how to use the Wait step included in Harness pipeline stages.

Imagine you want to automatically pause and hold a pipeline execution while you check third party systems, such as checking to ensure that a Kubernetes cluster has the necessary resources, or that a database schema has been updated.

Harness pipelines include the Wait step so you can pause the pipeline execution for any amount of time. After the wait time expires, the pipeline execution proceeds.

When the Wait step is running, it provides **Mark as Success** and **Mark as Failed** options. **Mark as Success** ends the wait period and proceeds with the execution. **Mark as Failed** initiates the Failure Strategy for the step or stage, if any, or simply fails the execution.

## Add the Wait step

The Wait step is available in approval, custom, CD, and feature Flag stages. You can add the Wait step anywhere in those stages.

1. In your stage **Execution** (or **Rollout Strategy** in Feature Flags), select **Add Step**, and then selct **Wait**.
2. Enter a name for the step.
3. In **Duration**, enter how long the Wait step should run. Once the timeout occurs, the pipeline execution proceeds.  
When the Wait step runs, the duration is displayed in its **Details**.  
![](./static/wait-step-27.png)
4. Select **Apply Changes**.

### Duration

The allowed values for **Duration** are:

* `w` for weeks
* `d` for days
* `h` for hours
* `m` for minutes
* `s` for seconds
* `ms` for milliseconds

The maximum is `53w`.

You can use a fixed value, runtime input, or expression for **Duration**.

If you use runtime input, you can enter the wait time when you run the pipeline. You can also set it in a trigger.

If you use an expression, ensure that the expression resolves to one of the allowed time values. 

For information, go to [fixed values, runtime inputs, and expressions](/docs/platform/references/runtime-inputs/). 

## Marking the Wait step as success or fail

When the Wait step is running, it provides **Mark as Success** and **Mark as Failed** options. **Mark as Success** ends the wait period and proceeds with the execution. **Mark as Failed** initiates the failure strategy for the step or stage.

![](./static/wait-step-28.png)

For information on failure strategies, go to [define a failure strategy on stages and steps](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps/).

For example, let's say a Wait step has the failure strategy **Manual Intervention**. When the user selects **Mark as Failed**, they are prompted with the **Manual Intervention** options:

![](./static/wait-step-29.png)

If no failure strategy is set at the step or stage level, then selecting **Mark as Failed** simply fails the pipeline execution at the Wait step.

## Important notes

* The Wait step is available in approval, custom, CD, and feature flag stages.
* The Wait step does not use a Harness delegate. It is run by the Harness platform. There is no **Delegate Selector** in the Wait step's **Advanced** settings.

