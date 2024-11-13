---
title: Define failure strategies for stages and steps
description: A failure strategy defines how your stages and steps handle different failure conditions.
sidebar_position: 1
helpdocs_topic_id: 0zvnn5s1ph
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps
  - /docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps
  - /docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings
  - /docs/platform/Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings
canonical_url: https://www.harness.io/blog/deployment-pipeline-patterns
---

A failure strategy defines how steps, stages, and step groups handle different failure conditions.

A failure strategy consists of error conditions that must occur to trigger the strategy and the actions to take when those failure conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

<details>
<summary>Video: Configure failure strategies</summary>

<DocVideo src="https://www.youtube.com/watch?v=4KYGllvJ42U" />

</details>

## Configure failure strategies

You can apply failure strategies to:

* **Stages:** A stage failure strategy applies to all steps and step groups in the stage that don't have step-level failure strategies.
* **Steps:** This failure strategy overrides (or enhances) the stage failure strategy.
* **Step Groups:** You can set up a failure strategy for all steps in the group. Individual steps in the group don't have a failure strategy.
* **Pipelines:** [Pipeline rollback](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines) is a failure strategy for all stages in a pipeline. The pipeline rolls back if any of the stages in the pipeline fails.

### Add a stage failure strategy

The stage failure strategy applies to all steps in the stage that do not have their own failure strategy configured.

1. In your pipeline, select the [stage](/docs/platform/pipelines/add-a-stage) where you want to add the failure strategy.
2. Select the **Advanced** tab.
3. Under **Failure Strategy**, the default stage failure strategy is shown:

   ```
   On all errors other than those specified in failure strategies defined here, perform action.
   ```

   You can't remove the default strategy, but you can edit it to choose a different **Action**, **Timeout**, and **Post timeout action**.

4. To add an additional stage failure strategy, select **Add**, and then configure the [failure strategy settings](#failure-strategy-settings):

   - **On failure of type:** Select one or more of the error types to trigger the failure strategy.
   - **Perform Action:** Select the action that should occur when the specified failure event happens.
   - **Timeout** and **Post timeout action:** These are available if you selected **Manual Intervention** for the **Action**. The manual intervention action allows a user to intervene and choose an **Action** when the specified failure event occurs. You can enter a **Timeout** for the user to select an action, and a **Post Timeout Action** to fallback on if the user doesn't manually select an action in a certain amount of time.
   - **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** for the **Action**. Enter the number of times to retry the step and the retry interval.

### Add a step failure strategy

Steps don't have a default failure strategy. Instead, steps inherit the stage failure strategy if there is no step-level failure strategy.

When you add a step failure strategy, you override the stage failure strategy for that step.

To add a step failure strategy:

1. Edit the step where you want to add the failure strategy.
2. Select the **Advanced** tab.
3. Select **Failure Strategy**, select **Add**, and then configure the [failure strategy settings](#failure-strategy-settings):

   - **On failure of type:** Select one or more of the error types to trigger the failure strategy.
   - **Perform Action:** Select the action that should occur when the specified failure event happens.
   - **Timeout** and **Post timeout action:** These are available if you selected **Manual Intervention** for the **Action**. The manual intervention action allows a user to intervene and choose an **Action** when the specified failure event occurs. You can enter a **Timeout** for the user to select an action, and a **Post Timeout Action** to fallback on if the user doesn't manually select an action in a certain amount of time.
   - **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** for the **Action**. Enter the number of times to retry the step and the retry interval.

### Failure strategies as runtime input

You can also define stage, step, and step group failure strategies at runtime by configuring them as [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs).

To do this, go to the **Failure Strategy** settings where you want to configure a failure strategy to be specified at runtime, select the **Thumbtack** icon, and change the input type to **Runtime Input**.

When you run the pipeline, you'll be prompted to define the failure strategy settings for that run.

Due to the potential complexity of failure strategies, [input sets](/docs/platform/pipelines/input-sets) are useful for failure strategies as runtime input. Input sets contain pre-defined runtime inputs that you select at runtime. This eliminates the need to manually define the entire failure strategy each time.

### Failure strategies for CD steps and stages

For guidance on configuring failure strategies for CD stages and steps, go to [Define a failure strategy on Harness CD stages and steps](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings.md).

## Failure strategy settings

### Error types

The following error types can be selected in a failure strategy.

| **Error Type** | **Description** |
| :--- | :--- |
| **Authentication Errors** | Credentials provided in a connector are not valid. Typically, the Harness secret used for one of the credentials is incorrect. If Harness cannot determine if the error is for authentication or authorization, it is treated as an authentication error. |
| **Authorization Errors** | The credentials are valid but the user permissions needed to access the resource are not sufficient. If Harness cannot determine if the error is for authentication or authorization, it is treated as an authentication error. |
| **Connectivity Errors** | A Harness Delegate can't connect to a specific resource, such as a repository, VM, or secrets manager. |
| **Delegate Provisioning Errors** | No available delegate can accomplish the task, or the task is invalid. For example, if an HTTP step attempts to connect to a URL but there is no available delegate to perform the task. |
| **Timeout Errors** | A Harness Delegate fails to complete a task within the stage/step timeout limit. For example, if the Kubernetes workload you are deploying fails to reach a steady state within the step timeout limit. |
| **Unknown Errors** | Errors that don't fall into any other category. This includes Harness application errors. |
| **Verification Failures** | A Harness Continuous Verification step fails. |
| **Policy Evaluation Failures** | An Open Policy Evaluation (OPA) applied on a step fails. |
| **Execution-time Inputs Timeout Errors**| A step times out when running a pipeline due to the unavailability of a runtime input. |
| **Approval Rejection** | An approval step is rejected. You can select specific failure strategies for approval rejection across steps and stages. |
| **Delegate Restart** | An error triggered when the delegate is unreachable when running a pipeline. |
| **All Errors** | An error whether defined by the other error types or not. |

### Error scope

The scope of a failure strategy is confined to where it is set.

For example, a failure strategy set on a step doesn't impact the failure strategy set on a stage. Likewise, the failure strategy set at the stage doesn't override any failure strategies on its steps.

### Rollback stage

Both step and stage failure strategies include the **Rollback Stage** action option. There is no rollback step option.

### Failure strategy actions

The following table lists the failure strategy actions and how they work at the step, step group, and stage levels.

These actions can be applied to the failure strategy as primary action and timeout action.

| Action                  | Step                                                                                                                                                                                                                                                                                                                                 | Step Group                                                                                                                                                        | Stage                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Manual Intervention** | A Harness user can perform a manual intervention when the error type occurs. There are several options to select from:  **Mark as Success** **Ignore Failure** **Retry** **Abort** **Rollback Stage**Harness pauses the pipeline execution when waiting for manual intervention. The pipeline execution state appears as **Paused**. | Same as step.                                                                                                                                                     | Same as step, but applies to all steps.                                           |
| **Mark as Success**     | The step is marked as **Successful** and the stage execution continues.                                                                                                                                                                                                                                                              | Same as step.                                                                                                                                                     | The failed step is marked as **Successful** and the pipeline execution continues. |
| **Ignore Failure**      | The stage execution continues. The step is marked as **Failed**, but rollback is not triggered.                                                                                                                                                                                                                                      | Same as step.                                                                                                                                                     | Same as step.                                                                     |
| **Retry Step**          | Harness retries the execution of the failed step automatically. You can set **Retry Count** and **Retry Intervals**.                                                                                                                                                                                                                 | Same as step.                                                                                                                                                     | Same as step.                                                                     |
| **Retry Step Group**    | N/A                                                                                                                                                                                                                                                                                                                                  | Harness will retry the execution of the complete step group automatically, from the beginning. You can set **Retry Count** and **Retry Intervals**.               | N/A                                                                               |
| **Abort**               | Pipeline execution is aborted. If you select this option, no timeout is needed.                                                                                                                                                                                                                                                      | Same as step.                                                                                                                                                     | Same as step.                                                                     |
| **Rollback Stage**      | The stage rolls back to the state prior to stage execution. How the stage rolls back depends on the type of build or deployment it was performing.                                                                                                                                                                                   | Same as step.                                                                                                                                                     | Same as step.                                                                     |
| **Rollback Step Group** | N/A                                                                                                                                                                                                                                                                                                                                  | The step group rolls back to the state prior to step group execution. How the step group rolls back depends on the type of build or deployment it was performing. | N/A                                                                               |
| **Mark As Failure**     | Harness marks the step as **Failed**.                                                                                                                                                                                                                                                                                                | Harness marks the step group as **Failed**.                                                                                                                       | Harness marks the stage as **Failed** and executes the next stage.                |

:::info note
**Mark As Failure** as a Failure Strategy marks the stage/stepGroup/step as failed and moves the execution to next step/stage according to when conditions applied on the next step/stage.
:::

#### Manual interventions

Here is what a Manual Intervention action looks like when a failure occurs:

![](../static/define-a-failure-strategy-on-stages-and-steps-11.png)

The user can select an **Action**. If the Manual Intervention exceeds the **Timeout** setting, Harness automatically selects the **Post Timeout Action**.

## Prioritization and handling

How and when failure strategies are resolved depends on a number of conditions.

### Failure strategies take precedence over conditional executions

Harness pipeline stages and steps can include both [conditional executions](../step-skip-condition-settings.md) and failure strategies.

![](../static/define-a-failure-strategy-on-stages-and-steps-12.png)

When using these settings together in multiple stages, you must consider how they could interact.

For example, assume you have a pipeline with two stages: `stage1` and `stage2`. Assume `stage2` has a **Conditional Execution** set to **Execute this stage only if prior pipeline or stage failed**, and `stage1` has a **Failure Strategy** set to **Rollback Stage** on **All Errors**. With this configuration, if `stage1` has any error, it rolls back and it isn't marked as failed; therefore, the **Conditional Execution** for `stage2` isn't triggered and `stage2` doesn't run. To get `stage2` to run, you can set the **Failure Strategy** for `stage1` to **Ignore Failure**. This causes the pipeline to proceed (instead of rolling back) when `stage1` fails, and, since `stage1` is now marked as failed, the **Conditional Execution** for `stage2` is triggered and `stage2` runs.

If you want to run particular steps when a stage fails, make sure you add those steps to the stage's **Rollback** failure strategy settings. Typically, you don't want a rollback to continue when there is an error. However, if you want to force a step to run whether or not the rollback fails, include the required step in the stage's **Rollback** settings, configure the required step's conditional execution to **Always**, and then set the preceding step's failure strategy to **Mark as failure** for **All errors**. This ensures the required step runs even if the previous step fails.

### Stage, step, and step group failure strategy priority

The stage failure strategy applies to all steps that do not have their own failure strategy. A step's failure strategy takes precedence over a step group's failure strategy, which takes precedence over a stage's failure strategy.

Step failure strategies are evaluated before step group's and stage's failure strategy.

The order of the steps determines which failure strategy is evaluated first.

If the step is not part of a step group, and the first step in the execution doesn't have a failure strategy, the stage's failure strategy is used. If the second step has its own failure strategy, it is used. And so on.

### Multiple failure strategies in a stage

A stage can have multiple failure strategies.

![](../static/step-failure-strategy-settings-08.png)

When using multiple failure strategies in a stage, consider the following:

* For failure strategies that don't overlap (different types of failures selected), they behave as expected.
* Two failures cannot occur at the same time. Whichever error occurs first, that failure strategy is used.

### Failure strategy conflicts

Conflicts might arise between failure strategies on the same level or different levels (meaning stage or step level).

#### Same level

If there is a conflict between multiple failures in strategies on the same level, the first applicable strategy is used and the remaining strategies are ignored.

For example, consider these two strategies:

1. Abort on verification failure or authentication failure.
2. Ignore on verification failure or connectivity error.

Here is what will happen:

* On a verification failure, the stage is aborted.
* On an authentication failure, the stage is aborted.
* On a connectivity error, the error is ignored.

#### Different levels

If there is a clash between selected errors in strategies on different levels, the step-level strategy is used and the stage-level strategy is ignored.
