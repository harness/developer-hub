---
title: Rollback pipelines
description: Rollback pipelines to handle different failure conditions.
sidebar_position: 2
redirect_from:
  - /docs/platform/pipelines/define-a-failure-strategy-for-pipelines
---

Pipeline rollback is a type of [failure strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps). A rollback pipeline failure strategy applies to all steps and stages in a pipeline.

Currently, the Rollback Pipeline failure strategy is available for the following deployment types only:

* Kubernetes
* Native Helm
* Amazon Elastic Container Service (ECS)

## Configure a rollback failure strategy

1. In your pipeline, go to the step or stage where you want the rollback strategy to be triggered if that step or stage fails.
2. Go to the **Advanced** settings for the selected step or stage.
3. under **Failure Strategy**, locate **On failure of type**, and select the [error type](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps/#error-types) that you want to trigger the rollback.
3. Under **Perform Action**, select **Rollback Pipeline**.

Here's an example of the YAML for a pipeline rollback failure strategy that triggers on any error.

```yaml
failureStrategies:
  - onFailure:
      errors:
         - AllErrors
      action:
         type: PipelineRollback
```

During pipeline execution, if the failure event occurs that triggers the rollback failure strategy, all steps and stages are rolled back accordingly.

:::warning

If a pipeline uses [pipeline chaining](/docs/platform/pipelines/pipeline-chaining/) (where one or more stages are actually other pipelines), rolling back the parent pipeline **does not** roll back the child pipeline, because the child pipeline is considered a separate pipeline execution. In such cases, only the deployment stages of the parent pipeline roll back.

:::
