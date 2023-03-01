---
title: Define a Kubernetes Cluster Build Infrastructure
description: This topic describes how to set up a Kubernetes cluster build infrastructure for a Harness CI stage. The codebase and tests you add to a Harness CI Stage are built and run using a build infrastructur…

tags: 
   - helpDocs
sidebar_position: 20
helpdocs_topic_id: ia5dwx5ya8
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you can use Kubernetes cluster build infrastructure for a Harness CI pipeline stage.

Once you set up the Kubernetes cluster to use as your build infrastructure, you connect Harness to it with a Harness [Kubernetes cluster connector](../../../platform/7_Connectors/add-a-kubernetes-cluster-connector.md) and Harness Delegate.

You can also set up build infrastructures using VMs. See [Set Up Build Infrastructure](/docs/category/set-up-build-infrastructure).

## GKE Autopilot is not recommended

We don't recommend using Harness CI with GKE Autopilot due to Docker-in-Docker limitations and potential cloud cost increases.

Autopilot clusters do not allow Privileged pods. This means you can't use [Docker-in-Docker](../run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md) to run Docker commands, since these require Privileged mode.

Additionally, GKE Autopilot sets resource limits equal to resource requests for each container. This can cause your builds to allocate more resources than they need, resulting in higher cloud costs with no added benefit.

<details>
<summary>GKE Autopilot cloud cost demonstration</summary>

Consider the following CI stage:

![](./static/set-up-a-kubernetes-build-infrastructure-530.png)

Assume that you configure your stage resources as follows:

* Redis (service dependency in Background step): 5GB, 2 CPU
* s1 step: 2GB, 2 CPU
* s2 step: 3GB, 1 CPU
* s3 step: 4GB, 1 CPU
* s4 step: 2GB, 1 CPU
* s5 step: 2GB, 1 CPU

Kubernetes would allocate a pod based on the maximum requirements for the overall stage. In this example, the peak requirement is when the s3, s4, and s5 steps run in parallel. The pod also needs to run the Redis service at the same time. The total maximum requirements are the sum of Redis + s3 + s4 + s5:

* 5 + 4 + 2 + 2 = **13GB Memory**
* 2 + 1 + 1 + 1 = **5 CPUs**

GKE Autopilot calculates resource requirements differently. For containers, it sets resource limits equivalent to resource requests. For pods, it sums all step requirements in the stage, whether they're running in parallel or not. In this example, the total maximum requirements are the sum of Redis + s1 + s2 + s3 + s4 + s5:

* 5 + 2 + 2+ 4 + 4 + 4 = **17GB Memory**
* 2 + 1 + 1+ 1 + 1 + 1 = **7 CPUs**

Autopilot might be cheaper than standard Kubernetes if you only run builds occasionally. This can result in cost savings because some worker nodes are always running in a standard Kubernetes cluster. If you're running builds more often, Autopilot can increase costs unnecessarily.

</details>

## Before You Begin

* [CI Pipeline Quickstart](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [Delegates Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md)
* [CI Stage Settings](../../ci-technical-reference/ci-stage-settings.md)
* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)

## Visual Summary

Here's a short video that walks you through adding a Harness Kubernetes Cluster Connector and Harness Kubernetes Delegate. The Delegate is added to the target cluster, then the Kubernetes Cluster Connector uses the Delegate to connect to the cluster.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/wUC23lmqfnY/hqdefault.jpg"><iframe width=" 200" height="150" src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->


## Step 1: Create a Kubernetes Cluster

### Prerequisites

* Ensure your Kubernetes cluster meets the build infrastructure requirements in [CI Cluster Requirement](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md#harness-ci-cluster-requirements).
* For Harness-specific permission requirements, see [permission required](../../../platform/7_Connectors/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md#permissions-required) for CI.
* Install the Harness Kubernetes Delegate on the same cluster you use as your build infrastructure. Make sure that the cluster has enough memory and CPU for the Delegate you are installing. Harness Kubernetes Delegates can be in a different [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) than the one you provide while defining the build farm infrastructure for the CI Pipeline.

To create a new Kubernetes cluster, see:

* [Creating a cluster in Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/)
* [Creating a cluster in GKE (Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster))

## Step 2: Add the Kubernetes Cluster connector and install the Delegate

1. In your Harness **Project**, select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **Kubernetes cluster**.
3. Enter a name for the connector and select **Continue**.
4. Harness can connect to your Kubernetes cluster through a master URL and credentials or through a Harness Delegate. Select **Use the credentials of a specific Harness Delegate**, and then select **Continue**.
5. Select **Install new Delegate**.

   ![](./static/set-up-a-kubernetes-cluster-build-infrastructure-01.png)

6. You can use a Helm Chart, Terraform, or Kubernetes Manifest to install Kubernetes delegates. Select **Kubernetes Manifest**. For information about the other options, go to [Install a delegate](/docs/platform/Delegates/install-delegates/install-a-delegate).
7. Usually it makes sense to install and run the Delegate on a pod in your Kubernetes build infrastructure. In a terminal, login to your Kubernetes cluster, and use the `curl` command provided in the **New Delegate** setup to copy the Kubernetes YAML file to the pod where you want to install the Delegate.
8. Update the Kubernetes YAML file as instructed in the **New Delegate** setup. For details about these settings, refer to the **Kubernetes environment** section of [Install a delegate](/docs/platform/Delegates/install-delegates/install-a-delegate).
9. If necessary, specify the **Delegate Size** and **Delegate Permissions**. As a default, you can give the Delegate cluster-wide read/write access. In the future, you can add configurations to run scripts on your Delegates and scope them to different environments.
10. In your Kubernetes cluster, run the `kubectl apply` command to install the delegate, as provided in the **New Delegate** setup. You should get output similar to the following:

   ```
   % kubectl apply -f harness-delegate.yaml  
   namespace/harness-delegate-ng created  
   clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-ng-cluster-admin created  
   secret/ci-quickstart created  
   statefulset.apps/ci-quickstart created  
   service/delegate-service created
   ```

11. Return to the Harness UI and select **Verify** to test the connection. It might take a few minutes to verify the Delegate. Once it is verified, exit delegate creation and return to connector setup.
12. In your Kubernetes Cluster connector's **Delegates Setup**, select **Only use Delegates with all of the following tags**.
13. Select your new Kubernetes delegate, and then select **Save and Continue**. Select the new delegate in your Kubernetes.
14. Wait while Harness tests the connection, and then select **Finish**.

### Step 3: Define the Build Farm Infrastructure in Harness

In this step, you set up your build infrastructure using the Connector and Delegate you added previously. 

In the CI stage Infrastructure, select the Kubernetes Cluster Connector you created in the previous step.

In Namespace, enter the Kubernetes namespace to use.

You can use a Runtime Input (`<+input>`) or expression also. See [Runtime Inputs](../../../platform/20_References/runtime-inputs.md).

## Option: Service Account Name

The Kubernetes service account name. You must set this field in the following cases:

* Your build infrastructure runs on EKS, you have an IAM role associated with the service account, and a CI step uses an AWS Connector with IRSA. See [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) in the AWS docs.
* You have a CI Build stage with Steps that communicate with any external services using a service account other than default. See [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) in the Kubernetes docs.

## Option: Run as User

You can override the default Linux user ID for containers running in the build infrastructure. This is useful if your organization requires containers to run as a specific user with a specific set of permissions. See [Configure a security context for a Pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod) in the Kubernetes docs. 

## Option: Init Timeout

If you use large images in your Build Steps, you might find that the initialization step times out and the build fails when the Pipeline runs. In this case, you can increase the default init time window (10 minutes). 

## Option: Add Annotations

You can add Kubernetes annotations to the pods in your infrastructure. An annotation can be small or large, structured or unstructured, and can include characters not permitted by labels. See [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes docs. 

## Option: Add Labels

You can add Kubernetes labels (key-value pairs) to the pods in your infrastructure. Labels are useful for searching, organizing, and selecting objects with shared metadata. See [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) in the Kubernetes docs. 

If a custom label value does not match the following regex, the label won't get generated:  
`^[a-z0-9A-Z][a-z0-9A-Z\\-_.]*[a-z0-9A-Z]$`Labels make it easy to find pods associated with specific Stages, Organizations, Projects, Pipelines, Builds, and any custom labels you want to add: 


```
kubectl get pods -l stageID=mycibuildstage
```
Harness adds the following labels automatically:

* `stageID`: See `pipeline.stages.stage.identifier` in the Pipeline YAML.
* `stageName`: See `pipeline.stages.stage.name` in the Pipeline YAML.
* `orgID`: See `pipeline.orgIdentifier` in the Pipeline YAML.
* `projectID`: See `pipeline.projectIdentifier` in the Pipeline YAML.
* `pipelineID`: See `pipeline.identifier` in the Pipeline YAML.
* `pipelineExecutionId`: To find this, go to a CI Build in the Harness UI. The `pipelineExecutionID` is near the end of the URL path, between `executions` and `/pipeline`: 

`https://app.harness.io/ng/#/account/myaccount/ci/orgs/myusername/projects/myproject/pipelines/mypipeline/executions/__PIPELINE_EXECUTION-ID__/pipeline`

## Configure As Code: YAML

When configuring your Pipeline in YAML, you add the Kubernetes Cluster CI infrastructure using the infrastructure of type KubernetesDirect:


```yaml
pipeline:  
...  
  stages:  
    - stage:  
        ...  
        spec:  
          ...  
          infrastructure:  
            type: KubernetesDirect  
            spec:  
              connectorRef: account.mydelegate  
              namespace: default  
          ...
```

Once the build infrastructure is set up, you can now add CI stages to execute your Run steps to build, deploy your code.
