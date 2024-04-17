---
title: Timeout settings
description: Configure timeouts for steps, stages, and pipelines
sidebar_position: 10
redirect_from:
  - /docs/platform/pipelines/w_pipeline-steps-reference/timeout-settings
---

Timeout settings help prevent steps, stages, and pipelines from running excessively long. For example, this can help end a pipeline naturally if a step enters an endless loop or other long-lasting or infinite failure condition.

## Step timeouts

Step timeouts mark steps as expired in the following scenarios:

* The step does not complete before the configured timeout.
* The stage or pipeline reaches the stage/pipeline timeout limit when the step is still running.

## Stage timeout

Stage timeouts mark stages as expired in the following scenarios:

* The stage does not complete before the configured timeout.
* The pipeline reaches its timeout limit when the stage is still running.

## Pipeline timeouts

The pipeline timeout applies to the duration of the entire pipeline. It does not override stage/step timeouts, but stages and steps will timeout if the pipeline timeout limit is hit while a stage/step is running.

:::warning Approvals

Approval steps and stages can *pause* execution but they *do not* stop the pipeline timeout counter. Make sure that the pipeline timeout setting accommodates the time required for approvals.

:::
