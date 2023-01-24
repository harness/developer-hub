---
title: Prune Kubernetes Resources (FirstGen)
description: Remove old resources in your target Kubernetes cluster by pruning them during deployment.
sidebar_position: 350 
helpdocs_topic_id: pmndpu61bk
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `PRUNE_KUBERNETES_RESOURCES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.This content is for Harness [FirstGen](../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/t7phv4eowh).Changes to the manifests used in Harness Kubernetes deployments can result in orphaned resources you are unaware of.

For example, one deployment might deploy resources A and B but the next deployment deploys A and C. C is the new resource and B was removed from the manifest. Without pruning, resource B will remain in the cluster.

You can manually delete Kubernetes resources using the [Delete](delete-kubernetes-resources.md) step, but Harness will also perform resource pruning automatically during deployment.

Harness uses pruning by default to remove any resources that were present in an old manifest, but no longer present in the manifest used for the current deployment.

Harness also allows you to identify resources you do not want pruned using the annotation `harness.io/skipPruning`.

### Before You Begin

* [Kubernetes Quickstart](https://docs.harness.io/article/7in9z2boh6-kubernetes-quickstart)
* [Create a Kubernetes Rolling Deployment](create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Blue/Green Deployment](create-a-kubernetes-blue-green-deployment.md)
* [Delete Kubernetes Resources](delete-kubernetes-resources.md)

### Supported Platforms and Technologies

Pruning is supported for the following deployment strategies and Workflow types:

* Rolling Deployments
* Blue/Green Deployments

See:

* [Supported Platforms and Technologies](https://docs.harness.io/article/220d0ojx5y-supported-platforms)
* [Create a Kubernetes Rolling Deployment](create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Blue/Green Deployment](create-a-kubernetes-blue-green-deployment.md)

### Limitations

* To prevent pruning using the Harness annotation `harness.io/skipPruning: "true"`, the resource must have been deployed by Harness.  
Harness pruning does not consider resources outside of a Harness deployment.  
If you make any changes to your Kubernetes resources using a tool other than Harness (before or after the deployment), Harness does not track those changes.
* The maximum manifest/chart size is 0.5MB. When Harness prunes, it stores the full manifest in configMap to use it as part of release history. While deploying very large manifests/charts though Kubernetes, Harness is limited by configMap capacity.
* While it is unlikely, if you are using the same entity in two Harness Services, Harness does not know this. So if you prune the resource in one deployment it might be unavailable in another deployment. Use the annotation `harness.io/skipPruning: "true"` to avoid issues.

### Review: Harness Kubernetes Pruning Criteria

Kubernetes pruning in Harness is similar to the `kubectl apply --prune` method provided by [Kubernetes](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/#alternative-kubectl-apply-f-directory-prune-l-your-label).

Kubernetes pruning queries the API server for all objects matching a set of labels and attempts to match the returned live object configurations against the object configuration files.

Similarly, Harness compares the objects you are deploying with the objects it finds in the cluster. If Harness finds objects which are not in the current release, it prunes them.

Harness also allows you to identify resources you do not want pruned using the annotation `harness.io/skipPruning`. This is described later in this topic.

#### Rolling Deployments

Kubernetes Rolling deployments manage pruning as follows:

In the Deploy stage of the Workflow, Harness compares resources in the last successful release with the current release.

Harness prunes the resources from the last successful release that are not in current release.

If a deployment fails, Harness recreates the pruned resources during its Rollback stage.

During rollback, any new resources that were created in the failed deployment stage that were not in the last successful release are deleted also.

#### Blue/Green Deployments

Kubernetes Blue/Green deployments manage pruning as follows:

In the first step of a Blue/Green deployment, the new version of the release is deployed to the stage environment (pod set).

Harness prunes by comparing the new and previous releases in the stage pod set. Harness prunes the resources from the last successful release which are not in the current release.

Let's look at an example.

1. Deployment 1 is successfully deployed. It contained manifests for resources a, b, and c.
2. Deployment 2 failed. It contained manifests for resources a, c, and d, but not b.
3. Before failure, resource d is created and resource b is pruned.
4. During rollback, Harness recreates the previously pruned resource b and deletes resource d.

### Review: Pruning Examples

The first time you deploy a resource (Deployment, StatefulSet, ReplicaSet, etc) no pruning will take place.

In Harness **Deployments**, in the Workflow step, you will see a **Prune** section with the following message:


```
No previous successful deployment found, so no pruning required
```
When Harness finds resources that match the pruning criteria, you will see a message like this:


```
kubectl --kubeconfig=config delete Deployment/k8s-orphaned-resource-b --namespace=default  
  
deployment.apps "k8s-orphaned-resource-b" deleted  
  
kubectl --kubeconfig=config delete ConfigMap/k8s-orphaned-resource-configmap-b --namespace=default  
  
configmap "k8s-orphaned-resource-configmap-b" deleted  
  
Pruning step completed
```
If a deployment fails, Harness recreates any of the pruned resources it removed as part of the deployment. In the **Rollback Deployment** step, you will see a **Recreate Pruned Resources** section with message like this:


```
kubectl --kubeconfig=config apply --filename=manifests.yaml --record  
  
deployment.apps/k8s-orphaned-resource-f created  
  
Successfully recreated pruned resources.
```
### Step 1: Skip Pruning for a Resource

To ensure that a resource is not pruned, add the annotation `harness.io/skipPruning: "true"`.

When Harness identifies resources from the last successful release which are not in current release, it searches for the `harness.io/skipPruning` annotation and ignores any resources that have it set to `true`.

You can deploy a resource using the annotation `harness.io/skipPruning: "true"`, and then if the manifest is removed and another deployment occurs, Harness will see the annotation `harness.io/skipPruning: "true"` on the resource previously deployed and skip pruning it.

As mentioned in **Limitations** above, you cannot add a resource with the annotation outside of a Harness deployment and have Harness skip the pruning of that resource.

### See Also

* [Delete Kubernetes Resources](delete-kubernetes-resources.md)

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

