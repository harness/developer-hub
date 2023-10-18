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

When deploying interdependent services, such as microservices or a large and complicated application, there might be a need to coordinate the timing of the different components' deployments. A common example is the need to verify a group of services only after *all the services* are deployed successfully.

Harness address this scenario using Barriers. Barriers allow you to synchronize different stages and step groups in your Pipeline, and control the flow of your deployment systematically.

Barriers have an effect only when two or more stages/step groups use the same barrier name (**Barrier Reference** setting in the Barrier step), and are executed in parallel in a Pipeline. When executed in parallel, both stages/step groups will cross the barrier at the same time. (There are additional constraints when these parallel steps are generated using looping strategies. For more information, go to [Important notes](/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers#notes))

If a stage/step group fails before reaching its barrier point, the stage/step group signals the other stages/step groups that have the same barrier, and the other stages/step groups will react as if they failed as well. At that point, each stage/step group will act according to its [define a failure strategy on stages and steps](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps/).

Here's a visualization of three stages run in parallel using Barriers. Stages A and B will wait for each other to reach Barrier X and Stages B and C will wait for each other to reach Barrier Y.

![](./static/synchronize-deployments-using-barriers-29.png)

## Add Barrier

A barrier is simply a name added in a pipeline's **Flow Control** settings.

1. In your pipeline, select **Flow Control**.
   
   ![](./static/synchronize-deployments-using-barriers-30.png)
2. In **Flow Control**, select **Add Barrier**.
   
   ![](./static/synchronize-deployments-using-barriers-31.png)
3. In **Barrier Name**, enter a unique name, and then click outside of the settings. The barrier is created.
   
   ![](./static/synchronize-deployments-using-barriers-32.png)

Next, the name is selected using the **Barrier** step in the stages where you want to synchronize.

## Configure Barrier

To apply a barrier, do the following:

1. In your stage, in **Execution**, select **Add Step**, and then select **Barrier**.
   
   ![](./static/synchronize-deployments-using-barriers-33.png)
2. Enter a name for the step.
3. In **Timeout**, enter the timeout period, in milliseconds. For example, 600000 milliseconds is 10 minutes. The timeout period determines how long each stage with a barrier must wait for the other stage to reach their barrier point. When the timeouts expire, it is considered a deployment failure.
4. Barrier timeouts are not hard timeouts. A barrier can fail anytime between timeout + 1min.In **Barrier Reference**, select the name of an existing barrier.
   
   ![](./static/synchronize-deployments-using-barriers-34.png)
5. Select **Apply Changes**.

You cannot use a Harness variable expression in **Barrier Reference**.Now you can add another Barrier step using the same name to another stage at the point where you want to synchronize execution.

##Using Barriers with Looping strategies

:::note

Barrier support in looping strategies is behind the feature flag `CDS_NG_BARRIER_STEPS_WITHIN_LOOPING_STRATEGIES`. If this flag is turned off, synchronization might not work correctly in looping strategies. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

::: 

There are a few behaviours to note when using Barriers within a looping strategy (for example, when setting up a Matrix that creates multiple stages which run in parallel, and the stages contain a Barrier step). 

* In general, Barriers are supported in all the looping strategies. You can use them when [repeating stages, looping, Matrices](docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/), or when using Multi-Service or Multi-Environment stages in Pipelines.
* When setting up the Barrier step, make sure that you are using the same **Barrier Reference** in all of the looped stages (this wil make sure that all the looped stages execute till the Barrier step, and then continue (or fail!) together.
* You cannot use the `maxConcurrency` parameter in setting up looping. When this parameter is used, not all the stages start up in parallel, and some wait for the first few to end. Barriers will prevent the initial set of stages from ending, so the pipeline will get stuck. 
* When using Barriers with a Multi-service deployment, please make sure to select the "Deploy Services in Parallel" option, so that the pipeline does not wait for a stage to complete before beginning the next one. 
* You can use Barriers to co-ordinate between multiple sets of looped stages, or between a single stage and a group of looped stages. Of course, as before, the same Barrier Reference must be used across all the sets of stages; they will all execute up to the Barrier step and wait for the others. This applies even if one of the groups starts later than the other.


## Important notes

* You can have multiple Barriers in a stage/step group. Every Barrier in the same stage/step group must use a unique **Barrier Reference**.
* Ensure the Barrier Reference string for each related barrier across the different stages/step groups matches.
* Please make sure to not use the same Barrier Reference in sequential stages! Doing so would mean the the first stage with the Barrier never ends and the flow never reaches the next stage with the second Barrier. 

 

