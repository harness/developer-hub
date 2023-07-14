---
title: Define a failure strategy on stages and steps
description: Currently, only the All Errors Failure Type is supported. A failure strategy defines how your stages and steps handle different failure conditions. The failure strategy contains error conditions that…
sidebar_position: 11
helpdocs_topic_id: 0zvnn5s1ph
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, only **All Errors** Failure Type is supported. A failure strategy defines how your stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

You can apply a failure strategy to the following:

* Step
* Step Group
* Stage

For details on strategy options and how strategies work, go to [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).

### Before you begin

* [Add a Stage](add-a-stage.md)

### Visual summary

Here's a quick video of how to set up failure strategies:

<!-- Video:
https://www.youtube.com/watch?v=4KYGllvJ42U-->
<docvideo src="https://www.youtube.com/watch?v=4KYGllvJ42U" />

Here is what a Manual Intervention action looks like when a failure occurs:

![](./static/define-a-failure-strategy-on-stages-and-steps-11.png)

You can select an option or, if the Manual Intervention exceeds its Timeout setting, select the Post Timeout Action that will happen automatically.

### Failure strategy takes precedence over conditional execution

Harness Pipeline stages and steps both include **Conditional Execution** and **Failure Strategy** settings:

![](./static/define-a-failure-strategy-on-stages-and-steps-12.png)

Using these settings together in multiple stages requires some consideration.

Let's say you have a Pipeline with two stages: **stage 1** followed by **stage 2**. 

Stage 2's **Conditional Execution** is set to **Execute this step only if prior stage or step failed**. Stage 1's **Failure Strategy** is set to **Rollback Stage on All Errors**.

If stage 1 has any error it is rolled back and so it is not considered a failure. Hence, the stage 2's **Conditional Execution** is not executed.

In order to get stage 2 to execute, you can set the stage 1 **Failure Strategy** to **Ignore Failure**. Rollback will not occur and stage 2's **Conditional Execution** is executed.

In general, if you want to run particular steps on a stage failure, you should add them to stage's **Rollback** section.

### Add a stage failure strategy

The stage failure strategy applies to all steps in the stage that do not have their own failure strategy configured.

In a stage, click **Advanced**.

In **Failure Strategy**, you can see the default stage strategy:

**On all errors other than those specified in failure strategies defined here, perform action**

This default cannot be removed, but it can be edited. You can choose a new Action, Timeout, and Post timeout action.

To add an additional stage failure strategy, click **Add**.

Select the following:

* **On failure of type:** select one or more of the error types. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).
* **Timeout** and **Post timeout action:** these are available if you selected **Manual Intervention** in Action. Enter the timeout for the failure strategy and the subsequent action to perform.
* **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** in Action. Enter the number of times to retry the step, and the retries intervals.

### Add a step failure strategy

By default, steps do not have a failure strategy. Steps follow the stage failure strategy.

When you add a step failure strategy, you are overriding the stage failure strategy.

In a step, click **Advanced**.

Click **Failure Strategy** and click **Add**.

Select the following:

* **On failure of type:** select one or more of the error types. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).
* **Timeout** and **Post timeout action:** these are available if you selected **Manual Intervention** in Action. Enter the timeout for the failure strategy and the subsequent action to perform.
* **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** in Action. Enter the number of times to retry the step, and the retries intervals.

### Rollback pipeline steps or stages

The Rollback Pipeline failure strategy applies to all steps and stages in a pipeline. 

:::info

If a pipeline includes a child pipeline as a stage ([Pipeline chaining](/docs/platform/pipelines/pipeline-chaining/)), rolling back the parent pipeline will not roll back the child pipeline as the latter is considered as a separate execution. In such cases, only the deployment stages of the parent pipeline rolls back.

:::

Currently, the Rollback Pipeline failure strategy applies to the following deployments only:
* Kubernetes
* Native Helm
* Amazon Elastic Container Service (ECS)

In a pipeline's step or stage, select **Advanced**.

In **Failure Strategy**, you can see the default stage strategy:

**On all errors other than those specified in failure strategies defined here, perform action**

To add an additional stage failure strategy, select **Add**.

In **On failure of type**, select one or more of the error types, or select **All Errors**. Go to [Error types](/docs/platform/Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings#error-types) for more information.

In **Perform Action**, select **Rollback Pipeline**


### Failure strategy as a runtime input

Failure strategies can be defined as runtime inputs in pipelines and templates at stage, step, and step group levels. 

Here's a video that explains how to define failure strategy as a runtime input:

<!-- Video:
https://harness-24.wistia.com/medias/bj2kzkgw8a-->
<docvideo src="https://harness-24.wistia.com/medias/bj2kzkgw8a" />

### See also

* [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Stage and Step Execution Condition Settings](w_pipeline-steps-reference/step-skip-condition-settings.md)

