---
title: Define a Failure Strategy on Stages and Steps
description: Currently, only the All Errors Failure Type is supported. A failure strategy defines how your stages and steps handle different failure conditions. The failure strategy contains error conditions that…
# sidebar_position: 2
helpdocs_topic_id: 0zvnn5s1ph
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, only the **All Errors** Failure Type is supported.A failure strategy defines how your stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

You can apply a failure strategy to the following:

* Step
* Step Group
* Stage

For details on strategy options and how strategies work, see [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).

### Before you begin

* [Add a Stage](add-a-stage.md)

### Visual Summary

Here's a quick video of how to set up failure strategies:

Here is what a Manual Intervention action looks like when a failure occurs:

![](./static/define-a-failure-strategy-on-stages-and-steps-11.png)
You can select an option or, if the Manual Intervention exceeds its Timeout setting, select the Post Timeout Action that will happen automatically.

### Review: Failure Strategy takes Precedence over Conditional Execution

Harness Pipeline stages and steps both include **Conditional Execution** and **Failure Strategy** settings:

![](./static/define-a-failure-strategy-on-stages-and-steps-12.png)
Using these settings together in multiple stages requires some consideration.

Let's say you have a Pipeline with two stages: **stage 1** followed by **stage 2**. 

Stage 2's **Conditional Execution** is set to **Execute this step only if prior stage or step failed**. Stage 1's **Failure Strategy** is set to **Rollback Stage on All Errors**.

If stage 1 has any error it is rolled back and so it is not considered a failure. Hence, the stage 2's **Conditional Execution** is not executed.

In order to get stage 2 to execute, you can set the stage 1 **Failure Strategy** to **Ignore Failure**. Rollback will not occur and stage 2's **Conditional Execution** is executed.

In general, if you want to run particular steps on a stage failure, you should add them to stage's **Rollback** section.

### Step: Add a Stage Failure Strategy

The stage failure strategy applies to all steps in the stage that do not have their own failure strategy configured.

In a stage, click **Advanced**.

In **Failure Strategy**, you can see the default stage strategy:

**On all errors other than those specified in failure strategies defined here, perform action**

This default cannot be removed, but it can be edited. You can choose a new Action, Timeout, and Post timeout action.

To add an additional stage failure strategy, click **Add**.

Select the following:

* **On failure of type:** select one or more of the error types. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).

Currently, only **All Errors** is supported.* **Action:** select one of the available actions. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).
* **Timeout** and **Post timeout action:** these are available if you selected **Manual Intervention** in Action. Enter the timeout for the failure strategy and the subsequent action to perform.
* **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** in Action. Enter the number of times to retry the step, and the retries intervals.

### Step: Add a Step Failure Strategy

By default, steps do not have a failure strategy. Steps follow the stage failure strategy.

When you add a step failure strategy, you are overriding the stage failure strategy.

In a step, click **Advanced**.

Click **Failure Strategy** and click **Add**.

Select the following:

* **On failure of type:** select one or more of the error types. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).

Currently, only **All Errors** is supported.* **Action:** select one of the available actions. See [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).
* **Timeout** and **Post timeout action:** these are available if you selected **Manual Intervention** in Action. Enter the timeout for the failure strategy and the subsequent action to perform.
* **Retry Count** and **Retry Intervals:** these are available if you selected **Retry** in Action. Enter the number of times to retry the step, and the retries intervals.

### See also

* [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Stage and Step Execution Condition Settings](w_pipeline-steps-reference/step-skip-condition-settings.md)

