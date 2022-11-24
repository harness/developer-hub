---
title: Run Specific Stages in Pipeline
description: You can choose to run a specific stage instead of running the whole Pipeline in Harness. The ability to run a specific stage helps in situations when only a few stages fail in a Pipeline This topic e…
# sidebar_position: 2
helpdocs_topic_id: 95q2sp1hpr
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

A Pipeline is an end-to-end process that delivers a new version of your software. Each Pipeline has stages that contain the logic to perform one major segment of the Pipeline process.

While executing a Pipeline, you might encounter situations where most of the stages succeed, but a few of them fail. Or you might want to run only specific Stages. In such situations, Harness lets you select specific stages to run instead of executing the entire Pipeline again.

This topic explains how to run specific stages in a Pipeline.

In this topic:

* [Before You Begin](#before_you_begin)
* [Review: Dependent and Independent Stages](#review_dependent_and_independent_stages)
* [Step 1: Select Stage Execution Settings](#step_1_select_stage_execution_settings)
* [Option: Run Specific Independent Stages](#option_run_specific_independent_stages)
* [Option: Run Specific Dependent Stages](#option_run_specific_dependent_stages)
* [Option: Rerun Stage](#option_rerun_stage)

### Before You Begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization)
* [Add a Stage](/article/2chyf1acil-add-a-stage#add-a-stage)
* Make sure you have **Execute** permissions for Pipeline to run a specific Stage of the Pipeline. For example, the [Pipeline Executor](/article/yaornnqh0z-permissions-reference) default role in the Project where your Pipeline is located.

### Review: Dependent and Independent Stages

The Services and Environments in a Pipeline stage can be propagated to subsequent Stages. Also, the settings of one stage such as its variables and step inputs and outputs can be referenced in other Stages as expressions.

See [Fixed Values, Runtime Inputs, and Expressions](/article/f6yobn7iq0-runtime-inputs).

If a Stage uses the settings of another Stage, it is a dependent Stage.

If a Stage does not use the settings of any other Stage, it is an independent Stage.

How you run and rerun Stages is different depending on whether the Stage is dependent or independent.

Let's look at the different options.

### Step 1: Select Stage Execution Settings

To run specific stages in your Pipeline, you must allow selective stage(s) execution.

To do this, in your Pipeline click **Advanced Options**.

In **Stage Execution Settings**, set **Allow selective stage(s) executions?** to **Yes**.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1644601442680/clean-shot-2022-02-11-at-09-43-47.png)### Option: Run Specific Independent Stages

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization).

You can [create a Pipeline](/article/2chyf1acil-add-a-stage#step_1_create_a_pipeline) from any module in your Project, and then [add Stages](/article/2chyf1acil-add-a-stage#add-a-stage) for any module.

In your Pipeline, click Run. The Run Pipeline settings appear.

In Stages, select one or more stages in your Pipeline which are independent of other stages.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1636940898394/screenshot-2021-11-15-at-7-17-31-am.png)If the selected stage requires any [Runtime Inputs](/article/f6yobn7iq0-runtime-inputs#runtime_inputs), you can provide the inputs only for that Stage manually or by selecting an input set.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1636738356923/screenshot-2021-11-12-at-11-01-23-pm.png)You can also view the execution details in the Pipeline execution history.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1636952333430/screenshot-2021-11-15-at-10-26-55-am.png)### Option: Run Specific Dependent Stages

If you want to run Stages that propagate settings or need inputs from previous Stages as [expressions](/article/f6yobn7iq0-runtime-inputs#expressions), you can provide the inputs manually while executing this Stage independently.

The below example shows a Pipeline with 3 stages. Stage2 uses the value of timeout in stage1 using an expression. When you run stage2 without executing stage1, this expression is evaluated as a runtime input. You can input the value during execution and run this Stage independently.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1638289607458/screenshot-2021-11-30-at-9-55-35-pm.png)### Option: Rerun Stage

You can rerun an executed Stage by clicking the Rerun Stage button and providing any Runtime inputs.

![](https://files.helpdocs.io/i5nl071jo5/articles/95q2sp1hpr/1636956662207/screenshot-2021-11-15-at-11-35-02-am.png)