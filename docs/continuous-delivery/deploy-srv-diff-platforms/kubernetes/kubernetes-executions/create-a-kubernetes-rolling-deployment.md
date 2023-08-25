---
title: Create a Kubernetes Rolling deployment
description: This topic describes how to perform a Kubernetes rolling update deployment in Harness.
sidebar_position: 1
helpdocs_topic_id: xsla71qg8t
helpdocs_category_id: uj8bqz9j0q
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to perform a Kubernetes rolling update deployment in Harness.

A [rolling update strategy](/docs/continuous-delivery/manage-deployments/deployment-concepts.md) updates Kubernetes deployments with zero downtime by incrementally updating pod instances with your new app version. New pods are scheduled on nodes using the available resources.

This method is similar to a standard Canary strategy, but different from the Harness Kubernetes Canary strategy. The Harness Kubernetes Canary strategy uses a canary phase followed by a rolling update as its final phase. See [Create a Kubernetes Canary Deployment](create-a-kubernetes-canary-deployment.md) for more information.

For a detailed explanation of Kubernetes rolling updates, see [Performing a Rolling Update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/) from Kubernetes.

### Before you begin

* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md)
* [Add Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests.md)
* [Define Your Kubernetes Target Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure.md)

## What workloads can I deploy?

Stages using Harness Canary and Blue/Green steps only support [Kubernetes Deployment workloads](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

The Rolling Deployment step supports all workloads. 

In Harness, a workload is a Deployment, StatefulSet, or DaemonSet object deployed and managed to steady state.

If you deploy Kubernetes Jobs using the Rolling Deployment step, it does not manage the Job to steady state. Typically, Jobs are deployed with the Apply step.

The [Apply Step](deploy-manifests-using-apply-step.md) can deploy any workloads or objects in any strategy including Rolling Deployment.


### Rolling vs Apply

The following table lists the differences between the Rolling Deployment step (default in a Rolling strategy) and the Apply step (which may be used with any strategy).



|  | **Jobs** | **Rollback** |
| --- | --- | --- |
| **Rolling Deployment step** | No | Yes |
| **Apply step** | Yes | No |

### Multiple managed workloads

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

## Define rollout strategy

There are no mandatory Rolling Update–specific settings for manifests in the Harness Service. You can use any Kubernetes configuration.

The default Rolling Update strategy used by Harness is:


```
RollingUpdateStrategy:  25% max unavailable, 25% max surge
```

If you want to set a Rolling Update strategy that is different from the default, you can include the strategy settings in your Deployment manifest:


```yaml
strategy:  
  type: RollingUpdate  
  rollingUpdate:  
    maxSurge: 1  
    maxUnavailable: 1
```

For details on the settings, see [RollingUpdateDeployment](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#deploymentstrategy-v1-apps/#rollingupdatedeployment-v1-apps) in the Kubernetes API.

## Define the service and infrastructure

1. Create your CD Pipeline stage.

To set up your Service and Infrastructure in the stage, follow the steps in these topics:

* [Add Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests)
* [Define Your Kubernetes Target Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)

## Add the Rollout Step

1. In the stage's **Execution**, click **Add Step**, and select **Rolling Deployment**.

That's it. Harness will perform the Kubernetes rollout using your manifests and artifacts.

To change the default settings, click the **Rolling Deployment** step.

See [Kubernetes Rollout Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollout-step) for settings.

## Deploy

Let's look at what the **Rollout Deployment** step does in the deployment logs.

### Apply

The Apply section deploys the manifests from the Service **Manifests** section as one file.


```
kubectl --kubeconfig=config apply --filename=manifests.yaml --record  
  
configmap/harness-example-config-3 configured  
deployment.apps/harness-example-deployment created  
  
Done.
```

### Wait for Steady State

The Wait for Steady State section shows the containers and pods rolled out.


```
kubectl --kubeconfig=config get events --output=custom-columns=KIND:involvedObject.kind,NAME:.involvedObject.name,MESSAGE:.message,REASON:.reason --watch-only  
  
kubectl --kubeconfig=config rollout status Deployment/harness-example-deployment --watch=true  
  
  
Status : Waiting for deployment "harness-example-deployment" rollout to finish: 0 of 2 updated replicas are available...  
Event  : Pod    harness-example-deployment-5674658766-6b2fw   Successfully pulled image "registry.hub.docker.com/library/nginx:stable-perl"   Pulled  
Event  : Pod   harness-example-deployment-5674658766-p9lpz   Successfully pulled image "registry.hub.docker.com/library/nginx:stable-perl"   Pulled  
Event  : Pod   harness-example-deployment-5674658766-6b2fw   Created container   Created  
Event  : Pod   harness-example-deployment-5674658766-p9lpz   Created container   Created  
Event  : Pod   harness-example-deployment-5674658766-6b2fw   Started container   Started  
Event  : Pod   harness-example-deployment-5674658766-p9lpz   Started container   Started  
  
Status : Waiting for deployment "harness-example-deployment" rollout to finish: 1 of 2 updated replicas are available...  
  
Status : deployment "harness-example-deployment" successfully rolled out  
  
Done.
```

### Wrap Up

The Wrap Up section shows the Rolling Update strategy used.


```
...  
Name:                   harness-example-deployment  
Namespace:              default  
CreationTimestamp:      Sun, 17 Feb 2019 22:03:53 +0000  
Labels:                 <none>  
Annotations:            deployment.kubernetes.io/revision: 1  
                        kubectl.kubernetes.io/last-applied-configuration:  
                          {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{"kubernetes.io/change-cause":"kubectl apply --kubeconfig=config --f...  
                        kubernetes.io/change-cause: kubectl apply --kubeconfig=config --filename=manifests.yaml --record=true  
Selector:               app=harness-example  
Replicas:               2 desired | 2 updated | 2 total | 2 available | 0 unavailable  
StrategyType:           RollingUpdate  
MinReadySeconds:        0  
RollingUpdateStrategy:  25% max unavailable, 25% max surge  
...  
NewReplicaSet:   harness-example-deployment-5674658766 (2/2 replicas created)  
Events:  
  Type    Reason             Age   From                   Message  
  ----    ------             ----  ----                   -------  
  Normal  ScalingReplicaSet  8s    deployment-controller  Scaled up replica set harness-example-deployment-5674658766 to 2  
  
Done.
```
## Rolling update deployment example

Now that the setup is complete, you can click **Run Pipeline**.

The Pipeline is deployed.

To see the completed deployment, log into your cluster and run `kubectl get all`. The output lists the new Deployment:


```
NAME                                                   READY     STATUS    RESTARTS   AGE  
pod/harness-example-deployment-5674658766-6b2fw        1/1       Running   0          34m  
pod/harness-example-deployment-5674658766-p9lpz        1/1       Running   0          34m  
                                                         
NAME                                                   TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE  
service/kubernetes                                     ClusterIP      10.83.240.1     <none>           443/TCP        34m  
                                                         
NAME                                                   DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE  
deployment.apps/harness-example-deployment             2         2         2            2           34m  
                                                         
NAME                                                   DESIRED   CURRENT   READY     AGE  
replicaset.apps/harness-example-deployment-5674658766  2         2         2         34m
```
## Important notes

### Enable Kubernetes Pruning option

See [Prune Kubernetes Resources](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources).

### Rolling Rollback step

You can add a **Rolling Rollback** step to your stage to roll back the workloads deployed by the **Rollout Deployment** step.

Simply add this step where you want to initiate a rollback. Note that this command applies to the deployments of the Rollout Deployment command, and not the [Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step) command.

## Next Steps

* [Kubernetes CD Reference](/docs/category/kubernetes)

