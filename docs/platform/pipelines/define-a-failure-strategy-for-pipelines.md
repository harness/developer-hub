---
title: Rollback pipelines
description: Rollback pipelines to handle different failure conditions. 
sidebar_position: 12
---


You can add a Rollback Pipeline failure strategy to your pipelines. Rollback pipeline applies to all steps and stages in a pipeline. 

:::info

If a pipeline includes a child pipeline as a stage ([Pipeline chaining](/docs/platform/pipelines/pipeline-chaining/)), rolling back the parent pipeline will not roll back the child pipeline as the latter is considered as a separate execution. In such cases, only the deployment stages of the parent pipeline roll back.
:::

Currently, the Rollback Pipeline failure strategy applies to the following deployments only:
* Kubernetes
* Native Helm
* Amazon Elastic Container Service (ECS)

## Rollback pipeline steps or stages

1. In a pipeline's step or stage, select **Advanced**.
2. In **Failure Strategy** > **On failure of type**, select a failure type or select **All Errors**. 
   Go to [Step and Stage Failure Strategy Settings](w_pipeline-steps-reference/step-failure-strategy-settings.md) for information about error types.
3. In **Perform Action**, select **Rollback Pipeline**.

   Here's the equivalent YAML for the Pipeline Rollback failure strategy: 

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

If you select **Mark as Success**, the stage passes, and the next stage's execution begins. 

![](static/pipeline-failure-strategy-2.png)

## See also

[Step and stage failure strategy references](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)

