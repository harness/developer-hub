---
title: Controlling resource usage with Barriers, Resource Constraints, and Queue steps
description: This topic describes how to control resource usage during Harness deployments.
sidebar_position: 2
helpdocs_topic_id: 7ogetmgq7y
helpdocs_category_id: etz0u5kujd
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness has a number of ways to control deployments and resource usage to protect resources and their capacity limits. This topic describes their differences and provides best practices.

## Control Option Definitions

The following options help you control how deployments use your resources.

### Barriers

Barriers synchronize stages/[step groups](../x-platform-cd-features/cd-steps/step-groups.md) of a Pipeline that are executed in parallel. Barriers ensure that one stage/step group does not proceed until another stage/step group has reached a specific point.

See [Synchronize Parallel Stages and Step Groups using Barriers](./synchronize-deployments-using-barriers.md).

#### Barriers Scope

Barriers are scoped to the **Pipeline**.

You can only use the same Barrier within the same Pipeline. If you add a **Barrier Name** from one Pipeline into the Barrier step in another Pipeline, it will not work.

### Resource Constraints

Resource Constraints protect resource capacity limits by preventing simultaneous deployments to the same Service + Infrastructure combination. The Service + Infrastructure combination acts as a fixed key.

Resource Constraints are added to every Stage by default, but it can be disabled in a Stage's **Infrastructure** settings by enabling the **Allow simultaneous deployments on the same infrastructure** option.

See [Pipeline Resource Constraints](./deployment-resource-constraints.md).

The automatic **Resource Constraints** setting does not apply to [Custom Stages](../../platform/8_Pipelines/add-a-custom-stage.md). **Resource Constraints** apply to a combination of Service + Infrastructure, and Custom Stages have no Services or Infrastructures. You can use Barriers and Queue steps in any stage types.

### Queue Steps

Queue Steps synchronize Pipeline executions, queuing Pipelines using a custom key.

Multiple deployments are queued so that one deployment completes before other deployments with the same key can proceed.

See [Control Resource Usage with Queue Steps](./control-resource-usage-with-queue-steps.md).

#### Queue Step Scope

Queue Step are scoped to your entire Harness **account**.

If there are Queue steps with the same Resource Key in Pipelines in Projects A and B and the Pipeline in Project A is running, the Pipeline in Project B will be queued until the Pipeline in Project A is completed.

## Best Practices

Here are some best practices to help you decide which resource control option to use:

* **Barriers:** use when you want to coordinate the timing of different components’ deployments with stages/step groups executed in parallel in the same Pipeline.  
For example, your Pipeline executes Stages A and B in parallel, but you want a database migration in Stage A to complete before a deployment in Stage B. You place a Barrier step after the migration in Stage A and before the deployment step in Stage B.
* **Resource Constraints:** use when you want to prevent simultaneous deployments to the same Service + Infrastructure combination. This feature is enabled by default.
* **Queue steps:** use when you want to control the **sequence** of multiple Pipeline executions. This can be used on different Pipelines or even multiple executions of the same Pipeline.

