---
title: Kubernetes Rollout step
description: Define the Kubernetes Rollout step.
sidebar_position: 2
helpdocs_topic_id: 2bwlugh9gi
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the Kubernetes Rollout Deployment step.

## Rollout Deployments

The Rollout Deployment step performs a Kubernetes [rolling update strategy](/docs/continuous-delivery/manage-deployments/deployment-concepts#rolling-deployment). All nodes within a single environment are incrementally added one-by-one with a new service/artifact version.

The new pods are scheduled on nodes with available resources. The rolling update Deployment uses the number of pods you specified in the Service Definition **Manifests** (number of replicas).

Similar to application-scaling, during a rolling update of a Deployment, the Kubernetes service will load-balance the traffic only to available pods (an instance that is available to the users of the application) during the update.

## What Workloads Can I Deploy?

See [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes).

## Rolling vs Apply

The following table lists the differences between the Rolling Deployment step (default in a Rolling strategy) and the Apply step (which may be used with any strategy).



|  | **Jobs** | **Rollback** |
| --- | --- | --- |
| **Rolling Deployment step** | No | Yes |
| **Apply step** | Yes | No |

## Multiple Managed Workloads

With the Rolling Deployment step, you can deploy multiple managed workloads.

For Canary and Blue/Green steps, only one managed object may be deployed per step by default.

You can deploy additional objects using the [Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step), but it is typically used for deploying Jobs controllers.

You can specify the multiple workload objects in a single manifest or in individual manifests, or any other arrangement.Here is the log from a deployment where you can see both Deployment objects deployed:


```yaml
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: anshul-multiple-workloads-deployment  
spec:  
  replicas: 1  
  selector:  
    matchLabels:  
      app: anshul-multiple-workloads  
  template:  
    metadata:  
      labels:  
        app: anshul-multiple-workloads  
    spec:  
      containers:  
      - name: anshul-multiple-workloads  
        image: registry.hub.docker.com/library/nginx:stable  
        envFrom:  
        - configMapRef:  
            name: anshul-multiple-workloads  
        - secretRef:  
            name: anshul-multiple-workloads  
---  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: anshul-multiple-workloads-deployment-1  
spec:  
  replicas: 3  
  selector:  
    matchLabels:  
      app: anshul-multiple-workloads  
  template:  
    metadata:  
      labels:  
        app: anshul-multiple-workloads  
    spec:  
      containers:  
      - name: anshul-multiple-workloads  
        image: registry.hub.docker.com/library/nginx:stable  
        envFrom:  
        - configMapRef:  
            name: anshul-multiple-workloads  
        - secretRef:  
            name: anshul-multiple-workloads
```
## Name

The name for the step.

## Timeout

How long Harness should wait for this step to complete before failing it.

## Skip Dry Run

By default, Harness uses the `--dry-run` flag on the `kubectl apply` command, which prints the object that would be sent to the cluster without really sending it. If the **Skip Dry Run** option is selected, Harness will not use the `--dry-run` flag.

## Advanced Settings

See the following:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

