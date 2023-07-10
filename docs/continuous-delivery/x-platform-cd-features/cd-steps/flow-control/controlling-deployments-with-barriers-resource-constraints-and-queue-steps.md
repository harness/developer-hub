---
title: Controlling resource usage with Barriers, Resource Constraints, and Queue steps
description: This topic describes how to control resource usage during Harness deployments.
sidebar_position: 1
---

Harness has a number of ways to control deployments and resource usage to protect resources and their capacity limits. This topic describes their differences and provides best practices.

## Control Option Definitions

The following options help you control how deployments use your resources.

### Barriers

Barriers synchronize stages/[step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) of a pipeline that are executed in parallel. Barriers ensure that one stage/step group does not proceed until another stage/step group has reached a specific point.

See [Synchronize parallel stages and step groups using Barriers](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers).

#### Barriers scope

Barriers are scoped to the **Pipeline**.

You can only use the same Barrier within the same pipeline. If you add a **Barrier Name** from one pipeline into the Barrier step in another pipeline, it will not work.

### Resource Constraints

Resource Constraints protect resource capacity limits by preventing simultaneous deployments to the same service + infrastructure combination. The service + infrastructure combination acts as a fixed key.

Resource Constraints are added to every Stage by default, but it can be disabled in a stage's **Infrastructure** settings by enabling the **Allow simultaneous deployments on the same infrastructure** option.

For more information, go to [pipeline Resource Constraints](/docs/continuous-delivery/manage-deployments/deployment-resource-constraints).

The automatic **Resource Constraints** setting does not apply to [Custom stages](/docs/platform/pipelines/add-a-custom-stage/). **Resource Constraints** apply to a combination of service + infrastructure, and Custom stages have no services or infrastructures. You can use Barriers and Queue steps in any stage types.

### Queue steps

Queue steps synchronize pipeline executions, queuing pipelines using a custom key.

Multiple deployments are queued so that one deployment completes before other deployments with the same key can proceed.

For more information, go to [control resource usage with Queue steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/control-resource-usage-with-queue-steps).

#### Queue step scope

Queue step are scoped to your entire Harness **account**.

If there are Queue steps with the same resource key in pipelines in projects A and B and the pipeline in project A is running, the pipeline in project B will be queued until the pipeline in project A is completed.

## Best practices

Here are some best practices to help you decide which resource control option to use:

* **Barriers:** use when you want to coordinate the timing of different components’ deployments with stages/step groups executed in parallel in the same pipeline.  
For example, your pipeline executes stages A and B in parallel, but you want a database migration in Stage A to complete before a deployment in stage B. You place a Barrier step after the migration in stage A and before the deployment step in stage B.
* **Resource Constraints:** use when you want to prevent simultaneous deployments to the same service + infrastructure combination. This feature is enabled by default.
* **Queue steps:** use when you want to control the **sequence** of multiple pipeline executions. This can be used on different pipelines or even multiple executions of the same pipeline.

