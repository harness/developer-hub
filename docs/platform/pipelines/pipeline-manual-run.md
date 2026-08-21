---
title: Run stages manually
description: Run a stage manually in a pipeline.
sidebar_position: 13
keywords:
  - manual execution
  - manual stage
  - manual run
  - stage control
tags:
  - pipelines
  - execution
---

Manual execution allows you to control when a pipeline stage starts. When a stage is configured for manual execution, the pipeline waits for you to manually start the stage before continuing to the next stage in sequential execution.

Manual execution is useful when a stage should not start until an external validation, human decision, or dependent system is ready.

---

## What you will learn from this topic

- How to [enable manual execution](#enable-manual-execution-of-a-stage) for a stage.
- How to [handle runtime inputs](#handle-runtime-inputs) when manually executing a stage.
- How to [run a stage manually](#run-a-stage-manually) during pipeline execution.
- How to [understand failure behavior](#failure-of-a-manual-stage) when a manual stage times out or fails.

---

## Before you begin

- **Feature flag enabled**: This feature requires the `PIPE_ENABLE_MANUAL_STAGE_RUN` feature flag. Contact <a href="mailto:support@harness.io" target="_blank" rel="noopener noreferrer">Harness Support</a> to enable it.
- **Existing pipeline**: You need a pipeline with at least one stage. For more information, refer to <a href="/docs/platform/pipelines/harness-yaml-quickstart" target="_blank" rel="noopener noreferrer">Create your first pipeline</a>.
- **Pipeline permissions**: You need **Pipeline: Create/Edit** permission to enable manual execution and **Pipeline: Execute** permission to trigger manual stages. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.

---

## Enable manual execution of a stage

Perform the following steps to enable manual execution for a stage.

1. In Harness, open your pipeline in Pipeline Studio.
2. Select the stage you want to run manually.
3. In the stage configuration panel, select the **Advanced** tab.
4. Under **Manual Execution**, select the toggle to enable it.
   
   <div align="center"><DocImage path={require('./static/manual-run-enable.png')} alt="Manual Execution toggle in the Advanced tab of a stage configuration" width="80%" /></div>

5. In the **Timeout** field, enter the timeout value. The default timeout is 10m. If the stage is not manually triggered within this timeout, the stage fails.
6. Select **Apply Changes**, then select **Save** to save the pipeline.

<details>
<summary>YAML example</summary>

```yaml
stage:
  name: customStage
  identifier: customStage
  description: Initial approval stage
  type: Custom
  spec:
    execution:
      steps:
        - step:
            type: ShellScript #use any step
            name: Setup
            identifier: Setup
            spec:
              shell: Bash
              executionTarget: {}
              source:
                type: Inline
                spec:
                  script: echo "Pipeline started - preparing for deployment"
              environmentVariables: []
              outputVariables: []
            timeout: 10m
  tags: {}
  runMode:
    type: Manual  #Indicating the stage is set to manual run
    timeout: 10m
```
</details>

---

## Handle runtime inputs

If your stage includes runtime inputs, you must provide values for those inputs when you manually trigger the stage. You can not run the pipeline until you define values for all required runtime inputs.

<div align="center"><DocImage path={require('./static/manual-run-inputs.png')} alt="Run Stage dialog showing runtime input fields for a manually executed stage" width="80%" /></div>

---


## Run a stage manually

When a pipeline reaches a stage marked for manual execution, the pipeline pauses and waits for you to manually trigger the stage.

Perform the following steps to manually trigger a stage during pipeline execution.

1. Navigate to the pipeline execution view. The stage marked for manual execution shows a **Waiting** status. A **Run** button appears next to the stage name.

   :::note
   The **Run** button is visible only after you define values for all runtime inputs required by the stage.
   :::

   <div align="center"><DocImage path={require('./static/manual-run-run.png')} alt="Run button on a stage card in the execution view" width="80%" /></div>

2. Select **Run**.

3. If the stage requires runtime inputs, the **Run Stage** dialog opens. Enter the required values and select **Run Stage**.

4. The stage begins executing.

The pipeline does not proceed to the next stage in sequential order until the manual stage completes successfully.

---

## Execution behavior

Manual execution affects the stage that is configured for manual execution.

- The pipeline waits while the stage is in the **Waiting** state.
- Sequential stages after the manual stage do not start until the manual stage is triggered and successfully completes.
- Stages that run in parallel with the manual stage are independent and continue to execute without waiting for the manual stage.

---

## Failure of a manual stage

A manual stage can fail in two ways:

1. **Timeout failure**: The stage is not manually triggered within the defined timeout period.
2. **Execution failure**: The stage is triggered but fails during execution (for example, a step inside the stage fails).

### Timeout failure

If the manual stage times out because it was not manually triggered within the defined timeout:

- The stage status changes to **Failed**.
- The <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">failure strategy</a> you configured for the stage takes effect (for example, mark as success, retry, or run a rollback stage).
- The pipeline stops if the stage is in a sequential flow, unless the failure strategy continues the pipeline.

### Execution failure

If the stage is manually triggered but fails during execution:

- Stage-level failure strategies are overridden by step and step group failure strategies, if present.
- For more information, refer to <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">failure strategies</a>.

---

## Next steps

- <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Conditional execution</a>: Run stages only when specific conditions are met.
- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Failure strategies</a>: Define what happens when a stage fails.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">Runtime inputs</a>: Provide values at execution time instead of defining them in the pipeline.

---