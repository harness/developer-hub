---
title: Synchronize parallel stages and step groups using Barriers
description: This topic describes how to synchronize different stages in your Pipeline using barriers.
sidebar_position: 3
---

This topic describes how to synchronize stages and [step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) in your pipeline using barriers.

:::note

Harness provides multiple options for controlling resource usage and protecting capacity limits. Go to [controlling resource usage with Barriers, Resource Constraints, and Queue steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/controlling-deployments-with-barriers-resource-constraints-and-queue-steps) for more information.

:::
  
## Barriers and synchronization

import Barriers from '/docs/platform/pipelines/barriers.md';

<Barriers name="barriers" />



## Using Barriers with Looping strategies

There are a few behaviors to note when using Barriers within a looping strategy (for example, when setting up a matrix that creates multiple stages that run in parallel, and the stages contain a Barrier step):

* In general, Barriers are supported in all the looping strategies. You can use them when [repeating stages, looping, or in matrices](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism), or when using multi-service or multi-environment stages in pipelines.
* When setting up the Barrier step, ensure that you are using the same **Barrier Reference** in all of the looped stages (this ensure that all the looped stages execute until the Barrier step, and then continue/fail together.
* Do not use the `maxConcurrency` parameter when looping stages that contain a Barrier step. When `maxConcurrency` is set, not all the iterations start in parallel: some wait for the first batch to finish before they begin. In testing, this causes barriers to be scoped per batch rather than across all iterations, so the barrier may not synchronize as intended.
* When using barriers with a multi-service deployment, please select the **Deploy Services in Parallel** option, so that the pipeline does not wait for a stage to complete before beginning the next one. 
* You can use barriers to coordinate between multiple sets of looped stages, or between a single stage and a group of looped stages. As mentioned before, the same **Barrier Reference** must be used across all the sets of stages. The stages will all execute up to the Barrier step and wait for the others. This applies even if one of the groups starts later than another.
* **Barriers are also supported across child pipelines.** A parent pipeline can define and use a barrier, and any child pipeline can reference and synchronize using the same barrier.

:::warning do not use maxconcurrency with barriers

When a looping strategy uses `maxConcurrency`, the iterations run in batches instead of all at once. In testing, this caused the barrier to be scoped per batch rather than across all iterations, so the barrier did not synchronize across the full loop. Leave `maxConcurrency` unset on any looping strategy whose stages contain a Barrier step.

:::

## Example: matrix stages synchronized with a barrier

The following pipeline defines a barrier named `deployBarrier` in **Flow Control**, then uses a matrix to fan out one stage per region. Each generated stage runs a Barrier step that references the same barrier, so every region waits at the barrier before any of them proceeds. The matrix omits `maxConcurrency` so that all iterations start in parallel.

```yaml
pipeline:
  identifier: matrix_barrier_example
  name: matrix-barrier-example
  flowControl:
    barriers:
      - identifier: deployBarrier
        name: deployBarrier
  stages:
    - stage:
        identifier: deploy
        name: deploy
        type: Deployment
        strategy:
          matrix:
            region:
              - us-east-1
              - us-west-2
              - eu-west-1
            # Do not set maxConcurrency here; it scopes the barrier per batch.
        spec:
          deploymentType: Kubernetes
          execution:
            steps:
              - step:
                  identifier: waitAtBarrier
                  name: wait at barrier
                  type: Barrier
                  timeout: 10m
                  spec:
                    barrierRef: deployBarrier
              - step:
                  identifier: rollout
                  name: rollout
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
```

Each matrix iteration (`us-east-1`, `us-west-2`, `eu-west-1`) reaches the `waitAtBarrier` step and holds until all iterations arrive, then all of them continue to the rollout step together.

## Important notes

* You can have multiple Barrier steps in a stage/step group. Every Barrier step in the same stage/step group must use a unique **Barrier Reference**.
* Ensure the Barrier Reference string for each related barrier across the different stages/step groups matches.
* Please do not use the same **Barrier Reference** in sequential stages. This results in the first stage with the Barrier step never ending and the flow never reaches the next stage with the second Barrier step. 
* You can use the same Barrier only within a single pipeline. If you attempt to use a Barrier name from one pipeline in the Barrier step of another pipeline, it will not function.

 

