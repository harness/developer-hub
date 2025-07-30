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
* You cannot use the `maxConcurrency` parameter in setting up looping. When this parameter is used, not all the stages start up in parallel, and some wait for the first few to end. Barriers will prevent the initial set of stages from ending, so the pipeline will get stuck. 
* When using barriers with a multi-service deployment, please select the **Deploy Services in Parallel** option, so that the pipeline does not wait for a stage to complete before beginning the next one. 
* You can use barriers to coordinate between multiple sets of looped stages, or between a single stage and a group of looped stages. As mentioned before, the same **Barrier Reference** must be used across all the sets of stages. The stages will all execute up to the Barrier step and wait for the others. This applies even if one of the groups starts later than another.
* **Barriers are also supported across child pipelines.** A parent pipeline can define and use a barrier, and any child pipeline can reference and synchronize using the same barrier.


## Important notes

* You can have multiple Barrier steps in a stage/step group. Every Barrier step in the same stage/step group must use a unique **Barrier Reference**.
* Ensure the Barrier Reference string for each related barrier across the different stages/step groups matches.
* Please do not use the same **Barrier Reference** in sequential stages. This results in the first stage with the Barrier step never ending and the flow never reaches the next stage with the second Barrier step. 
* You can use the same Barrier only within a single pipeline. If you attempt to use a Barrier name from one pipeline in the Barrier step of another pipeline, it will not function.

 

