---
title: Run specific stages
description: Run specific stages in a pipeline.
sidebar_position: 20
helpdocs_topic_id: 95q2sp1hpr
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - selective stage execution
  - run specific stages
  - stage selection
  - rerun stage
tags:
  - pipelines
  - execution
---

A pipeline can contain multiple stages that perform different parts of a workflow. Selective stage execution lets you run specific stages instead of running the entire pipeline.

For example, if you need to rerun a stage without running the other stages, you can select that stage when starting a pipeline execution.

---

## What you will learn from this topic

- Understand [dependent and independent stages](#dependent-and-independent-stages).
- How to [enable selective stage execution](#enable-selective-stage-executions) for a pipeline.
- How to [run specific stages](#run-specific-stages) when executing a pipeline.
- How to [rerun stages from execution history](#rerun-stages-from-execution-history) after a pipeline run completes.

---

## Before you begin

- **Harness project**: You need an existing project. For more information, refer to <a href="/docs/platform/organizations-and-projects/projects-and-organizations" target="_blank" rel="noopener noreferrer">Organizations and Projects</a>.
- **Pipeline with stages**: You need a pipeline with multiple stages. For more information, refer to <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>.
- **Pipeline permissions**: You need **Pipeline: Execute** permission to run pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Key concepts**: Familiarity with <a href="/docs/platform/get-started/key-concepts" target="_blank" rel="noopener noreferrer">Harness key concepts</a> is helpful but not required.

---

## Dependent and independent stages

Stage dependencies determine which stages you can select to run when using selective stage execution. Harness distinguishes between dependent and independent stages based on whether a stage requires input or context from another stage.

### Independent stages

An independent stage is a stage that does not use settings from any other stage. Independent stages can execute without requiring input or context from another stage.

When you select an independent stage to run, you can run it individually without running other stages in the pipeline.

### Dependent stages

A dependent stage is a stage that uses another stage's settings. Stages can be dependent on input from previous stages in the following ways:

- **Infrastructure settings**: A stage can inherit infrastructure settings from a previous stage.
- **Services and Environments**: Some settings can be propagated from one stage to another, such as <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview" target="_blank" rel="noopener noreferrer">Services</a> and <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview" target="_blank" rel="noopener noreferrer">Environments</a>.
- **Expressions**: You can use <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">expressions</a> to reference stage settings, such as stage variables, step inputs, and step outputs across stages.

To run a dependent stage, you must either:

- Provide the dependencies as runtime inputs when you run the stage.
- Run the dependent stage and all the stages it depends on.

When you select a dependent stage to run, Harness automatically selects all upstream stages that the selected stage depends on. You cannot deselect these upstream stages because they are required for the dependent stage to execute.

---

## Enable selective stage executions

Before you can run specific stages, you must enable selective stage execution in your pipeline settings.

Perform the following steps to enable selective stage execution.

1. In Harness, open your pipeline in Pipeline Studio.
2. In the Pipeline Studio Visual Editor, select **Advanced Options**.
3. In the **Stage Execution Settings** section, select **Yes** for **Allow selective stage(s) executions**.

   <div align="center"><DocImage path={require('./static/run-specific-stage-in-pipeline-44.png')} alt="Stage Execution Settings showing Allow selective stage(s) executions option" width="80%" /></div>

4. Select **Save** to save the pipeline.

<details>
<summary>YAML example</summary>

```yaml
pipeline:
  name: My Pipeline
  identifier: My_Pipeline
  allowStageExecutions: true  # Enable selective stage execution
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          # ... stage configuration ...
    - stage:
        name: Deploy
        identifier: Deploy
        type: Deployment
        spec:
          # ... stage configuration ...
```
</details>

---

## Run specific stages

After enabling selective stage execution, you can choose which stages to run when you execute the pipeline.

Consider the following when selecting stages:

- Select stages that have all required inputs and dependencies available.
- A stage that depends on settings from another stage might require the dependent stages to be included in the execution.
- Selective stage execution determines which stages are included in the pipeline execution. It does not change the configuration of the stages.

Perform the following steps to run specific stages in a pipeline.

1. In Harness, navigate to your pipeline and select **Run**.
2. In the **Run Pipeline** dialog, select the **Stages** tab.
3. Select the independent stages you want to run. Harness automatically selects dependent stages and their upstream dependencies.

   <div align="center"><DocImage path={require('./static/run-specific-stage-in-pipeline-45.png')} alt="Stage selection in the Run Pipeline dialog showing available stages" width="80%" /></div>

4. If the selected stages require runtime inputs, provide the required values.

   <div align="center"><DocImage path={require('./static/run-specific-stage-in-pipeline-46.png')} alt="Runtime inputs tab in the Run Pipeline dialog" width="80%" /></div>

5. Select **Run Pipeline**.

The pipeline executes only the selected stages and their dependencies. Stages that are not selected are skipped. You can view the execution details in the pipeline execution history.

---

## Rerun stages from execution history

After a pipeline run completes, you can rerun a single stage from the execution history without rerunning the entire pipeline.

Perform the following steps to rerun a stage from execution history.

1. In Harness, navigate to your pipeline and select the **Execution History** tab.
2. Select the execution you want to rerun from.
3. In the execution details view, select **Re-run Stage** on the stage card you want to rerun.

   <div align="center"><DocImage path={require('./static/run-specific-stage-in-pipeline-49.png')} alt="Re-run Stage button on a stage card in execution history" width="80%" /></div>

4. If the stage requires runtime inputs, provide the required values in the **Re-run Stage** dialog.
5. Select **Re-run Stage** to start the execution.

You can rerun a stage from execution history even when the pipeline execution was successful. For more information on viewing execution history, go to <a href="/docs/category/execution-history-and-logs" target="_blank" rel="noopener noreferrer">Execution history and logs</a>.

---

## Selective stage execution and triggers

Selective stage execution can also be used with supported triggers to run specific stages.

For information about configuring a trigger to execute specific stages, go to <a href="/docs/platform/triggers/selective-stage-execution-using-triggers" target="_blank" rel="noopener noreferrer">Selective pipeline stage execution by using triggers</a>.

---

## Next steps

- <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>: Learn how to add and configure stages in your pipeline.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">Runtime inputs</a>: Provide values at execution time instead of defining them in the pipeline.
- <a href="/docs/category/execution-history-and-logs" target="_blank" rel="noopener noreferrer">Execution history and logs</a>: View and analyze pipeline execution history and logs.

