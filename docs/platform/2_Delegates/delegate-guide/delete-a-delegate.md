---
title: Delete a delegate
description: This topic describes how to delete a Harness Delegate from a Kubernetes cluster and Harness.
# sidebar_position: 2
helpdocs_topic_id: tl6ql57em6
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to delete a delegate from your Kubernetes cluster and Harness installation.

### Identify the delegate type

Harness Delegate is installed as a Kubernetes [Deployment](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/) object**.** A legacy delegate, on the other hand, is installed as a Kubernetes [StatefulSet](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/stateful-set-v1/) object. This means that the process used to delete a legacy delegate differs from the process used to delete Harness Delegate.

You can verify the delegate you're using by looking at its manifest file or by running `kubectl get all -n harness-delegate-ng`.

To delete a legacy delegate, skip to the "Delete a legacy delegate" section.

### Delete a delegate

Use the following process to delete a delegate.

#### Step 1: Delete the deployment for the delegate

To delete a delegate from your Kubernetes cluster, you delete the **Deployment** object that represents its deployment.

`kubectl delete deployment -n harness-delegate-ng <Deployment name>`

Use the following command to retrieve a list of deployments:

`kubectl get deployments`

The deployment name is specified in the `metadata.name` field of the Kubernetes manifest you used to install the delegate.


```
...  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  labels:  
    harness.io/name: doc-demos  
  name: doc-demos  
  namespace: harness-delegate-ng  
...
```
In this example, the `name` field is specified as `doc-demos.`

Next, delete the Updater **CronJob**:

`kubectl delete cronjob -n harness-delegate-ng <Deployment name>-upgrader-job`

For example, if the **Deployment** name is `quickstart-delegate`:

`kubectl delete cronjob -n harness-delegate-ng quickstart-delegate-upgrader-job`

#### Step 2: Delete the delegate in Harness

Locate the delegate in the Harness account/Project/Org, click more options (⋮), and then click **Delete**.

![](./static/delete-a-delegate-15.png)
### Delete a legacy delegate

Use the following process to delete a Legacy Delegate.

#### Step 1: Delete the StatefulSet for the delegate

To delete a legacy delegate from your Kubernetes cluster, you delete the **StatefulSet** object that represents its deployment.

A **StatefulSet** resource is ensures that the desired number of pods are running and available at all times. If you delete a pod that belongs to a **StatefulSet** without deleting the **StatefulSet** itself, the pod is recreated.

For example, you can use the following command to delete the **StatefulSet** that created a delegate pod named `quickstart-vutpmk-0`:

`$ kubectl delete statefulset -n harness-delegate-ng quickstart-vutpmk`

The name of the delegate pod includes the name of the **StatefulSet** followed by the pod identifier `-0`.

#### Step 2: Delete the delegate in Harness

Locate the delegate in the Harness account/Project/Org, click more options (⋮), and then click **Delete**.

![](./static/delete-a-delegate-16.png)