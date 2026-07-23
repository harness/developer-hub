---
title: Synchronize parallel stages and step groups using Barriers
description: Synchronize parallel stages and step groups in your Harness pipeline using barriers.
sidebar_position: 3
keywords:
  - barriers
  - synchronization
  - flow control
  - parallel stages
  - step groups
tags:
  - continuous-delivery
  - barriers
  - flow-control
---

This topic describes how to synchronize stages and [step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) in your pipeline using barriers.

:::note
Harness provides multiple options for controlling resource usage and protecting capacity limits. Go to [controlling resource usage with Barriers, Resource Constraints, and Queue steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/controlling-deployments-with-barriers-resource-constraints-and-queue-steps) to compare barriers, resource constraints, and queue steps.
:::

## What will you learn in this topic?

- How to [synchronize parallel stages and step groups](#barriers-and-synchronization) with a barrier.
- How to [add a barrier](#add-a-barrier) and [use it in a step](#use-a-barrier-in-a-step).
- How to [avoid rollback barrier cycles](#avoid-rollback-barrier-cycles).
- How to [use barriers with looping strategies](#using-barriers-with-looping-strategies).

---

## Barriers and synchronization

import Barriers from '/docs/platform/pipelines/barriers.md';

<Barriers name="barriers" />

---

## Barrier configuration rules

Keep the following rules in mind when you configure barriers:

* You can have multiple Barrier steps in a stage or step group. Every Barrier step in the same stage or step group must use a unique **Barrier Reference**.
* Ensure the Barrier Reference string for each related barrier across the different stages or step groups matches.
* Do not use the same **Barrier Reference** in sequential stages. This results in the first stage with the Barrier step never ending, and the flow never reaches the next stage with the second Barrier step.
* You can use the same barrier only within a single pipeline. If you attempt to use a barrier name from one pipeline in the Barrier step of another pipeline, it does not function.

---

## Using barriers with looping strategies

There are a few behaviors to note when using barriers within a looping strategy, for example, when setting up a matrix that creates multiple stages that run in parallel, and the stages contain a Barrier step:

* In general, barriers are supported in all the looping strategies. You can use them when [repeating stages, looping, or in matrices](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism), or when using multi-service or multi-environment stages in pipelines.
* When setting up the Barrier step, use the same **Barrier Reference** in all of the looped stages so that all of them execute up to the Barrier step, and then continue or fail together.
* You cannot use the `maxConcurrency` parameter when setting up looping. When this parameter is used, not all the stages start up in parallel, and some wait for the first few to end. Barriers prevent the initial set of stages from ending, so the pipeline gets stuck.
* When using barriers with a multi-service deployment, select the **Deploy Services in Parallel** option, so that the pipeline does not wait for a stage to complete before beginning the next one.
* You can use barriers to coordinate between multiple sets of looped stages, or between a single stage and a group of looped stages. As mentioned before, the same **Barrier Reference** must be used across all the sets of stages. The stages all execute up to the Barrier step and wait for the others. This applies even if one of the groups starts later than another.
* Barriers are also supported across child pipelines. A parent pipeline can define and use a barrier, and any child pipeline can reference and synchronize using the same barrier.

---

## Next steps

You have synchronized parallel stages and step groups using barriers. Continue your learning journey with the following:

- [Step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups): Group related steps and apply shared configuration across a stage.
- [Controlling deployments with Barriers, Resource Constraints, and Queue steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/controlling-deployments-with-barriers-resource-constraints-and-queue-steps): Compare the options for controlling resource usage and protecting capacity limits.
- [Looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism): Repeat stages and steps using matrix, repeat, and parallelism.
