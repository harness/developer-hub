---
title: ECS Auto Scaling
description: In Harness, you configure ECS Service Auto Scaling in the ECS Service Setup step of a Workflow. In a Workflow with the ECS Service Setup step, open the ECS Service Setup step. In Auto Scaler Configur…
# sidebar_position: 2
helpdocs_topic_id: 28ehkmqy3v
helpdocs_category_id: yp3yaavhla
helpdocs_is_private: false
helpdocs_is_published: true
---

In Harness, you configure [ECS Service Auto Scaling](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html) in the **ECS Service Setup** step of a Workflow.

[![](https://files.helpdocs.io/kw8ldg1itf/articles/d7rnemtfuz/1607033537628/image.png)](https://files.helpdocs.io/kw8ldg1itf/articles/d7rnemtfuz/1607033537628/image.png)1. In a Workflow with the **ECS Service Setup** step, open the **ECS Service Setup** step.
2. In **Auto Scaler Configurations**, the Auto Scaling property fields appear.

When Harness deploys your ECS service, it will register the service with ECS Service Auto Scaling to apply the scaling policy, scaling out (and in) using CloudWatch target tracking.

### Auto Scaling is added after the Last Upgrade Containers Step

By default, when you create an ECS Workflow of any supported type (Basic, Blue/Green, Canary), Harness automatically adds ECS Auto Scaling after the last **Upgrade Containers** step in the last Phase in a Workflow.

For example, in an ECS Canary Workflow, ECS Auto Scaling is added after the **Upgrade Containers** step in Phase 2.

### Upgrade Containers and Rollback Containers Steps are Dependent

In order for rollback to add ECS Auto Scaling to the previous, successful service, you must have both the **Upgrade Containers** and **Rollback Containers** steps in the same Phase.

![](https://files.helpdocs.io/kw8ldg1itf/articles/28ehkmqy3v/1610478708602/image.png)Since ECS Auto Scaling is added by the **Upgrade Containers** step, if you delete **Upgrade Containers**, then **Rollback Containers** has no ECS Auto Scaling to roll back to.

If you want to remove ECS Auto Scaling from a Phase, delete both the **Upgrade Containers** and **Rollback Containers** steps. The Phase will no longer perform ECS Auto Scaling during deployment or rollback.### Deleting Upgrade Containers Step

If you delete the **Upgrade Containers** step from Phase 2, ECS Auto Scaling is not added because Phase 2 is missing the **Upgrade Containers** step.

To ensure that ECS Auto Scaling is applied, you can add the **Upgrade Containers** step in **Deploy Containers** to Phase 1.

if you add the **Upgrade Containers** step to Phase 1, you must also add the **Rollback Containers** step in **Rollback Steps** of Phase 1. This ensures that ECS Auto Scaling is added to the last successful service in the case of rollback.Deleting **Upgrade Containers** from the last Phase of a Canary Workflow is not a good use of the Canary strategy. Instead, use a Basic Workflow strategy. See [Deployment Concepts and Strategies](/article/325x7awntc-deployment-concepts-and-strategies).### Rollback when Auto Scaling is Enabled

See [ECS Rollbacks](/article/d7rnemtfuz-ecs-rollback).

### See Also

* [AWS ECS Quickstart](/article/j39azkrevm-aws-ecs-deployments)
* [ECS Deployments Overview](/article/08whoizbps-ecs-deployments-overview)
* [ECS Workflows](/article/oinivtywnl-ecs-workflows)
* [ECS Blue/Green Workflows](/article/7qtpb12dv1-ecs-blue-green-workflows)

