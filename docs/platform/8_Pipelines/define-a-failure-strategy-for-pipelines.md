---
title: Rollback pipelines
description: Rollback pipelines to handle different failure conditions. 
sidebar_position: 12
---

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

You can apply a failure strategy to the following:

* Step
* Step Group
* Stage
* Pipeline

For details on strategy options and how strategies work on steps and stages, go to [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md).

### Add a pipeline failure strategy

You can add a Rollback Pipeline failure strategy to your pipelines. This failure strategy applies to all stages in the pipeline. 

1. In a pipeline, select **Advanced**.
2. In **Failure Strategy** > **On failure of type**, select a failure type or select **All Errors**. 
   Go to [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md) for information about error types.
3. In **Perform Action**, select **Rollback Pipeline**.

   Here's a pipeline rollback sample YAML: 

   ```
   failureStrategies:
     - onFailure:
         errors:
            - AllErrors                           
         action:
            type: PipelineRollback
   ```

During pipeline execution, in **Permissible Actions**, if you select **Mark as Fail**, the pipeline stage fails and rolls back. 

![](static/pipeline-failure-strategy-1.png)

If you select **Mark as Success**, the stage passes and the next stage's execution begins. 

![](static/pipeline-failure-strategy-2.png)