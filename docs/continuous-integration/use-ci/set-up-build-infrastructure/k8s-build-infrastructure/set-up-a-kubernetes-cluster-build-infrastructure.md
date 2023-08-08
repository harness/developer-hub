---
title: Set up a Kubernetes cluster build infrastructure
description: You can use a Kubernetes cluster build infrastructure for a Harness CI pipeline.

sidebar_position: 30
helpdocs_topic_id: ia5dwx5ya8
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you can use a Kubernetes cluster build infrastructure for the **Build** stage in a Harness CI pipeline.

This topic assumes you have a basic understanding of [Harness' key concepts](/docs/getting-started/learn-harness-key-concepts.md).

## Important notes

Review the following important information about using Kubernetes cluster build infrastructures for your Harness CI builds.

### Privileged mode is required for Docker-in-Docker

If your build process needs to run Docker commands, [Docker-in-Docker (DinD) with privileged mode](../../run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md) is necessary when using a Kubernetes cluster build infrastructure.

If your Kubernetes cluster doesn't support privileged mode, you'll need to use another build infrastructure, such as [Harness Cloud](../use-harness-cloud-build-infrastructure.md) or a [VM build infrastructure](/docs/category/set-up-vm-build-infrastructures). Other infrastructure types allow you to run Docker commands directly on the host.

### GKE Autopilot is not recommended

We don't recommend using Harness CI with GKE Autopilot due to Docker-in-Docker limitations and potential cloud cost increases.

Autopilot clusters do not allow privileged pods, which means you can't use [Docker-in-Docker](../../run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md) to run Docker commands, since these require privileged mode.

Additionally, GKE Autopilot sets resource limits equal to resource requests for each container. This can cause your builds to allocate more resources than they need, resulting in higher cloud costs with no added benefit.

<details>
<summary>GKE Autopilot cloud cost demonstration</summary>

Consider the following CI stage:

![](../static/set-up-a-kubernetes-build-infrastructure-530.png)

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

### Windows builds

Go to [Run Windows builds in a Kubernetes cluster build infrastructure](./run-windows-builds-in-a-kubernetes-build-infrastructure.md).

### Self-signed certificates

Go to [Configure a Kuberneted build farm to use self-signed certificates](./configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md).

## Process overview

After you set up the Kubernetes cluster that you want to use as your build infrastructure, you use a Harness [Kubernetes Cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector) and Harness Delegate to create a connection between Harness and your cluster.

Here's a short video that walks you through adding a Harness Kubernetes Cluster connector and Harness Kubernetes delegate. The delegate is added to the target cluster, then the Kubernetes Cluster connector uses the delegate to connect to the cluster.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/wUC23lmqfnY/hqdefault.jpg"><iframe width=" 200" height="150" src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

Follow the steps below to set up your Kubernetes cluster build infrastructure. For a tutorial walkthrough, try the [Build and test on a Kubernetes cluster build infrastructure tutorial](/tutorials/ci-pipelines/kubernetes-build-farm).

## Step 1: Create a Kubernetes cluster

Make sure your Kubernetes cluster meets the build infrastructure requirements in the [CI cluster requirements](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference#harness-ci-cluster-requirements) and the Harness-specific [permissions required for CI](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference#permissions-required).

You need to install the Harness Kubernetes Delegate on the same cluster you use as your build infrastructure. Make sure that the cluster has enough memory and CPU for the Delegate you are installing. Harness Kubernetes Delegates can be in a different [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) than the one you provide while defining the build farm infrastructure for the CI pipeline.

For instructions on creating clusters, go to:

* [Creating a cluster in Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/)
* [Creating a cluster in GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster)

## Step 2: Add the Kubernetes Cluster connector and install the Delegate

1. In your Harness **Project**, select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **Kubernetes cluster**.
3. Enter a name for the connector and select **Continue**.
4. Select **Use the credentials of a specific Harness Delegate**, and then select **Continue**.
5. Select **Install new Delegate**.

   ![](../static/set-up-a-kubernetes-cluster-build-infrastructure-01.png)

6. Install the Delegate on a pod in your Kubernetes build infrastructure. You can use a Helm Chart, Terraform, or Kubernetes Manifest to install Kubernetes delegates. For details and instructions for each of these options, go to [Delegate installation overview](/docs/platform/delegates/delegate-concepts/delegate-overview).
7. After installing the delegate, return to the Harness UI and select **Verify** to test the connection. It might take a few minutes to verify the Delegate. Once it is verified, exit delegate creation and return to connector setup.
8. In your Kubernetes Cluster connector's **Delegates Setup**, select **Only use Delegates with all of the following tags**.
9. Select your new Kubernetes delegate, and then select **Save and Continue**.
10. Wait while Harness tests the connection, and then select **Finish**.

:::tip

Although you must select a specific delegate when you create the Kubernetes Cluster connector, you can choose to use a different delegate for executions and cleanups in individual pipelines or stages. To do this, use [pipeline-level delegate selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors#pipeline-delegate-selector) or [stage-level delegate selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors#stage-delegate-selector).

Delegate selections take precedence in the following order:

1. Stage
2. Pipeline
3. Connector

This means that if delegate selectors are present at the pipeline and stage levels, then these selections override the delegate selected in the Kubernetes cluster connector's configuration. If a stage has a stage-level delegate selector, then it uses that delegate. Stages that don't have stage-level delegate selectors use the pipeline-level selector, if present, or the connector's delegate.

For example, assume you have a pipeline with three stages called `alpha`, `beta`, and `gamma`. If you specify a stage-level delegate selector on `alpha` and you don't specify a pipeline-level delegate selector, then `alpha` uses the stage-level delegate, and the other stages (`beta` and `gamma`) use the Connector delegate.

:::

## Step 3: Define the Build Farm Infrastructure in Harness

In the **Build** stage's **Infrastructure** tab, select the Kubernetes cluster connector you created previously.

In **Namespace**, enter the Kubernetes namespace to use. You can also use a Runtime Input (`<+input>`) or expression for the namespace. For more information, go to [Runtime Inputs](/docs/platform/20_References/runtime-inputs.md).

You may need to configure the settings described below, as well as other advanced settings described in [CI Build stage settings](../ci-stage-settings.md). Review the details of each setting to understand whether it is required for your configuration.

<details>
<summary>Service Account Name</summary>

Specify a Kubernetes service account that you want step containers to use when communicating with the Kubernetes API server. Leave this field blank if you want to use the namespace's default service account. You must set this field in the following cases:

* Your build infrastructure runs on EKS, you have an IAM role associated with the service account, *and* the stage has a step that uses a Harness AWS connector with IRSA. For more information, go to the AWS documentation on [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).
* Your Build stage has steps that communicate with any external services using a service account other than the default. For more information, go to the Kubernetes documentation on [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/).
* Your Kubernetes cluster connector inherits authentication credentials from the Delegate.

</details>

<details>
<summary>Run as User or Run as Non-Root</summary>

Use the **Run as Non-Root** and **Run as User** settings to override the default Linux user ID for containers running in the build infrastructure. This is useful if your organization requires containers to run as a specific user with a specific set of permissions.

:::caution

Using a non-root user can require other changes to your pipeline.

With a Kubernetes cluster build infrastructure, all [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact) use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). This tool requires root access to build the Docker image. It doesn't support non-root users.

If you enable **Run as Non-Root**, then you must:

* Run the **Build and Push** step as root by setting **Run as User** to `0` on the **Build and Push** step. This will use the root user for that individual step only.
* If your security policy doesn't allow running as root for any step, you must use the Buildah Drone plugin to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

:::

* **Run as Non-Root:** Enable this option to run all steps as a non-root user. If enabled, you must specify a default user ID for all containers in the **Run as User** field.
* **Run as User:** Specify a user ID, such as `1000`, to use for all containers in the pod. You can also set **Run as User** values for individual steps. If you set **Run as User** on a step, it overrides the build infrastructure **Run as User** setting.

For more information, go to [Configure a security context for a Pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod) in the Kubernetes docs.

</details>

<details>
<summary>Init Timeout</summary>

If you use large images in your Build stage's steps, you might find that the initialization step times out and the build fails when the pipeline runs. In this case, you can increase the [init timeout](../ci-stage-settings.md#init-timeout) from the default of 8 minutes.

</details>

<details>
<summary>Annotations</summary>

You can add Kubernetes annotations to the pods in your infrastructure. An annotation can be small or large, structured or unstructured, and can include characters not permitted by labels. For more information, go to the Kubernetes documentation on [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

</details>

<details>
<summary>Labels</summary>

You can add Kubernetes labels, as key-value pairs, to the pods in your infrastructure. Labels are useful for searching, organizing, and selecting objects with shared metadata. You can find pods associated with specific stages, organizations, projects, pipelines, builds, or any custom labels you want to query, for example:

```
kubectl get pods -l stageID=mycibuildstage
```

For more information, go to the Kubernetes documentation on [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

Custom label values must the following regex in order to be generated:

```
^[a-z0-9A-Z][a-z0-9A-Z\\-_.]*[a-z0-9A-Z]$
```

Harness adds the following labels automatically:

* `stageID`: See `pipeline.stages.stage.identifier` in the Pipeline YAML.
* `stageName`: See `pipeline.stages.stage.name` in the Pipeline YAML.
* `orgID`: See `pipeline.orgIdentifier` in the Pipeline YAML.
* `projectID`: See `pipeline.projectIdentifier` in the Pipeline YAML.
* `pipelineID`: See `pipeline.identifier` in the Pipeline YAML.
* `pipelineExecutionId`: To find this, go to a CI Build in the Harness UI. The `pipelineExecutionID` is near the end of the URL path, between `executions` and `/pipeline`, for example:

```
https://app.harness.io/ng/#/account/myaccount/ci/orgs/myusername/projects/myproject/pipelines/mypipeline/executions/__PIPELINE_EXECUTION-ID__/pipeline
```

</details>

## YAML example

Here's a YAML example of a stage configured to use a Kubernetes cluster build infrastructure.


```yaml
  stages:
    - stage:
        name: Build Test and Push
        identifier: Build_Test_and_Push
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: account.harnessk8s
              namespace: harness-delegate
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

## Troubleshooting

For Kubernetes cluster build infrastructure troubleshooting guidance go to:

* [Troubleshoot CI](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci.md)
* [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen)
