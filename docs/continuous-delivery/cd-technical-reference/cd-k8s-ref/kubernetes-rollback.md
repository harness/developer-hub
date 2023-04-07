---
title: Kubernetes Rollback
description: How Harness does Kubernetes roll backs.
sidebar_position: 6
helpdocs_topic_id: rt449t1xhy
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how Harness rolls back to the last successful version of your workload in response to failures.

Harness follows standard Kubernetes behavior during rollback. See [kubectl rollout undo](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-undo-em-).

## Workload Rollback Only

Rollback rolls back workloads only. If there are other objects or operations executed in your stage, Harness does not roll those back.For details on Harness Kubernetes workloads, see [What Can I Deploy in Kubernetes?](what-can-i-deploy-in-kubernetes.md).

## Scaling and Rollback

Each time Harness deploys, the deployment gets new replicas that get scaled up and the old replicas are scaled down.

By default, Kubernetes keeps the last 10 revisions as [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).

When Harness performs rollback it identifies which revision number to use (`rollback-to`). Harness identifies that last successful ReplicaSet, and selects it to be scaled up.

## Rollback and Artifacts

The artifact(s) used for the replicas that are scaled up as part of rollback are simply the artifact(s) from the time that version was deployed.

## Blue Green Rollbacks

In the case of Blue Green, the resources are not versioned because a Blue Green deployment uses **rapid rollback**. Network traffic is simply routed back to the original instances.

You do not need to redeploy previous versions of the service/artifact and the instances that comprised their environment.

## Rolling Rollback Step

You can add a **Rolling Rollback** step to roll back the workloads deployed by the [Rolling Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-rolling-deployment.md) step.

Simply add this step where you want to initiate a rollback. Note that this step applies to the deployments of the Rolling Deployment command, and not the [Apply Step](../../cd-execution/kubernetes-executions/deploy-manifests-using-apply-step.md).

## Option: Declarative Rollback

User's can now opt into an alternative rollback behavior for kubernetes deployments called declarative rollback. This is defined in the service because its tied to the service's manifests. The `enableDeclarativeRollback: true` will be configured as true, and the `skipResourceVersioning: false` will be false and disabled in the UI


```YAML
service:
  name: nginx
  identifier: K8s
  tags:
    harness: "app"
    sample: "demo"
  serviceDefinition:
    spec:
      artifacts:
        primary: {}
      manifests:
        - manifest:
            identifier: dev
            type: K8sManifest
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /Sample Manifest Onboarding
              valuesPaths:
                - /values.yaml
              skipResourceVersioning: false
              enableDeclarativeRollback: true
      variables:
        - name: replica
          type: String
          description: ""
          value: "1"
        - name: cpu
          type: String
          description: "nginx cpu"
          value: "0.25"
        - name: memory
          type: String
          description: "nginx memory"
          value: 1Gb
    type: Kubernetes

```

Declarative rollback is about using `kubectl apply -f <prevision version of manifest>` instead of `kubectl rollout undo`. This reduces the risk of getting in the wrong state in the next subsequent deployment because the merge state is impacted by the rollout undo command.

- We are storing the manifest in the release history, and we will go and fetch the last successful one for rollback
- Now there will no more incremental versioning of the configmap and secret. We needed to use the incremental versioning with kubectl rollout undo.
- We are now going to reapply the previous manifest (This is the declarative nature, it includes the config map and secrets of the last known good state)
- We will have a config map for canary and one for blue-green when we do the declarative rollback.
- Previously we stored release history in one big configmap, with declarative rollback we are now storing it in secrets and each release is a different secret. 1 Secret per release essentially.
-  So on average you would have 2 secrets
  - 1 would be the previous successful release
  - 1 would be the current release





## See Also

* [Kubernetes CD Quickstart](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md)
* [Kubernetes How-tos](/docs/category/kubernetes)
* [Kubernetes Deployments Overview](../../cd-advanced/cd-kubernetes-category/kubernetes-deployments-overview.md)

