---
title: Run specific stages in pipeline
description: Run specific stages in a pipeline.
sidebar_position: 7
helpdocs_topic_id: 95q2sp1hpr
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

A pipeline is an end-to-end process that completes a workflow, such as delivers a new version of your software. Each pipeline has stages that perform one major segment of the pipeline process.

You might encounter situations where you want to run some, but not all, stages. For example, if only one stage fails, you might want to rerun only the failed stage. In Harness, you can select specific stages to run, rather than the entire pipeline.

This topic assumes you're familiar with [Harness' key concepts](../../getting-started/learn-harness-key-concepts.md), you have a [Harness project](../organizations-and-projects/create-an-organization.md), and you have a pipeline with multiple [stages](../8_Pipelines/add-a-stage.md). You must also have **Execute** permissions for pipelines in your project, such as the [Pipeline Executor role](../role-based-access-control/add-manage-roles.md).

## Dependent and independent stages

Stages can be dependent on input from previous stages.

Some settings can be propagated from one stage to another, such as infrastructure settings, [Services](/docs/continuous-delivery/x-platform-cd-features/services/services-overview), and [Environments](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview). Also, you can use [expressions](../20_References/runtime-inputs.md) to reference stage settings, such as stage variables, and step input and outputs across stages.

An *independent stage* is a stage that doesn't use settings from any other stage.

A *dependent stage* is a stage that uses another stage's settings. To run a dependent stage, you either need to provide the dependencies as runtime inputs or run the dependent stage and all the stages it depends on.

## Enable selective stage executions

To run specific stages, you must enable selective stage execution.

1. In your pipeline, select **Advanced Options** in the Pipeline Studio's Visual Editor.
2. In **Stage Execution Settings**, select **Yes** for **Allow selective stage(s) executions**.

![](./static/run-specific-stage-in-pipeline-44.png)

## Run specific stages

1. Go to your pipeline, and then select **Run**.
2. Select **Stages**, and then select the independent stages that you want to run.

   ![](./static/run-specific-stage-in-pipeline-45.png)

3. If required, provide [runtime inputs](../20_References/runtime-inputs.md#runtime-inputs).

   ![](./static/run-specific-stage-in-pipeline-46.png)

4. Select **Run Pipeline**.

You can view the execution details in the pipeline's execution history.

## Rerun stages from execution history

When viewing execution details for a previous pipeline run, you can select **Re-run** or **Re-run Stage** to rerun a single stage. If necessary, you're prompted to provide runtime inputs.

![](./static/run-specific-stage-in-pipeline-49.png)
