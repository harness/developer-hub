---
title: CD steps, stages, and strategies
description: Learn the CD steps, stages, and strategies
sidebar_position: 2
---

This topic talks about CD steps, stages, and strategies.

## CD steps

Steps can be added to pipelines individually or as a step group.

Individual steps and steps in step groups can be run serially or in parallel.

Unlike individual steps, a step group can apply conditional execution (skip conditions), failure strategy, and rollback steps to all steps in the group. For more information, go to [group steps using step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups).

# CD stages

A stage is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

When you add a CD stage, you select the deploy module.

For more information about adding stages, go to [add a stage](/docs/platform/Pipelines/add-a-stage).

You can also run pipeline stages in parallel. Deploy multiple services simultaneously and perform flow control using barriers. See [synchronize deployments using barriers](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers). This topic describes how to add a step group in a stage.

## CD deployment strategies

You have likely heard terms like blue-green and canary when it comes to deploying code and applications into production. These are common deployment strategies, available in Harness CD as stage strategies, along with others.

For more information, go to [CD deployment concepts](/docs/continuous-delivery/manage-deployments/deployment-concepts).