---
title: Kubernetes Rollback
description: If a Harness Kubernetes deployment fails, Harness will rollback to the last successful version of your workload. Please review the Kubernetes Versioning and Annotations topic. It explains how Harness…
sidebar_position: 50
helpdocs_topic_id: v41e8oo00e
helpdocs_category_id: yp3yaavhla
helpdocs_is_private: false
helpdocs_is_published: true
---

If a Harness Kubernetes deployment fails, Harness will rollback to the last successful version of your workload.

Please review the [Kubernetes Versioning and Annotations](versioning-and-annotations.md) topic. It explains how Harness names and versions Kubernetes releases.

### Identifying Deployments for Rollback

All Harness entities have Ids. You can see them in the URL of each entity. For example, here is a Service URL where you can see the Id `GmukVkNJRhqX53JEzI-3UQ` after `services`:


```
https://app.harness.io/#/account/OgiB4-xETamKNVAz-wQRwk/app/zPM4lB-jSqmpIrMk7WLvWw/services/GmukVkNJRhqX53JEzI-3UQ/details
```
Harness identifies a Kubernetes deployment using a combination of Workflow Id and Infrastructure Mapping (`inframapping`). Infrastructure Mapping is a unique combination of Service Id, Infrastructure Id, Cluster Name, and Namespace.

### Rollback with Workflow Id and Infrastructure Mapping

When a Harness Kubernetes Workflow deployment fails, rollback is initiated. 

Rollback fetches the last successful deployment with the current Workflow Id and Infrastructure Mapping.

### Rollback with Any Workflow and Infrastructure Mapping

:::note 
Currently, this feature is behind the feature flag `INFRA_MAPPING_BASED_ROLLBACK_ARTIFACT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

In some cases, you might want to run multiple Workflows with the same Infrastructure Mapping (Service Id, Infrastructure Id, Cluster Name, and Namespace), but not tie the rollback artifact to a specific Workflow Id.

Instead, you want to tie the rollback artifact to just the Infrastructure Mapping because multiple Workflows are using that Infrastructure Mapping.

So, when rollback occurs for a Workflow + Infrastructure Mapping, Harness fetches from last successful Workflow execution of any Workflow using the current Infrastructure Mapping.

For example, if two different Workflows, w1 and w2, are using same Infrastructure Mapping, then the rollback artifact can come from last successful execution of either of w1 or w2.

### Workload Rollback Only

:::note
**Rollback rolls back workloads only.** If there are other objects or operations executed in your Workflow or Pipeline, Harness does not roll those back.
:::

See [What Can I Deploy in Kubernetes?](what-can-i-deploy-in-kubernetes.md).

### Scaling and Rollback

Each time Harness deploys, the deployment gets new replicas that get scaled up and the old replicas are scaled down.

By default, Kubernetes keeps the last 10 revisions as [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).

When Harness performs rollback it identifies which revision number to use (`rollback-to`). Harness identifies that last successful ReplicaSet, and selects it to be scaled up.

### Rollback and Artifacts

The artifact(s) used for the replicas that are scaled up as part of rollback are simply the artifact(s) from the time that version was deployed.

### Blue/Green Rollbacks

In the case of Blue/Green, the resources are not versioned because a Blue/Green deployment uses **rapid rollback**: network traffic is simply routed back to the original instances.

You do not need to redeploy previous versions of the service/artifact and the instances that comprised their environment.

### Rollback Command

You can add a **Rollback Deployment** command to the **Rollback Steps** in your Workflow to roll back the workloads deployed by the **Rollout Deployment** step.

Simply add this command to the **Rollback Steps** in a Workflow where you want to initiate a rollback. Note that this command applies to the deployments of the Rollout Deployment command, and not the [Apply Step](../../../../continuous-delivery/kubernetes-deployments/deploy-manifests-separately-using-apply-step.md) command.

### See Also

* [Kubernetes Quickstart](../../../../first-gen-quickstarts/kubernetes-quickstart.md)
* [Kubernetes How-tos](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)
* [Kubernetes Deployments Overview](../../../../continuous-delivery/concepts-cd/deployment-types/kubernetes-overview.md)

