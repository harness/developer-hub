---
title: CI Build stage settings
description: This topic describes CI Build stage settings.
sidebar_position: 60
helpdocs_topic_id: yn4x8vzw3q
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes CI Build stage settings. For more information about configuring stages in CI pipelines, go to [CI pipeline creation overview](../prep-ci-pipeline-components.md).

:::info Add a Build stage to a pipeline

To create, edit, and delete stages in CI pipelines, you need either Project Admin or Project Member permissions. For more information, go to the [Permission Reference](/docs/platform/Role-Based-Access-Control/ref-access-management/permissions-reference).

1. In Harness, edit or [create a pipeline](../prep-ci-pipeline-components.md).
2. Select **Add Stage**, and then select **Build**.
3. Enter a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.
4. Select the [Overview](#overview), [Infrastructure](#infrastructure), [Execution](#execution), and [Advanced](#advanced) tabs to configure the stage settings, [set up the build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure), and add steps to the stage.

:::

## Stage Name

Enter a name summarizing the stage's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string.

## Tags

For details, go to the [Tags Reference](../../../platform/20_References/tags-reference.md).

## Clone Codebase

When selected, Harness automatically clones the [codebase](../codebase-configuration/create-and-configure-a-codebase.md) before executing the steps in the stage.

If not selected, Harness does not clone the codebase when initializing the stage.

## Configure Codebase

Specify the pipeline's default codebase configuration. These settings are available when you add the first stage to a pipeline. After you add the first stage, you manage these under the pipeline's overall **Codebase** settings. For more information about codebase configuration, go to [Edit Codebase Configuration](../codebase-configuration/create-and-configure-a-codebase.md).

### Connector

A Harness code repo connector that connects to the repository where the codebase is located. For information about code repo connectors, go to [Create and configure a codebase](../codebase-configuration/create-and-configure-a-codebase.md).

### Repository URL

If not populated by default, enter the full URL to the code repository that you want the pipeline to use.

## Overview

These settings are found on the **Overview** tab after adding a stage to a pipeline.

### Stage Details

You can edit the [Name](#stage-name), [Description](#description), and [Tags](#tags). You can also toggle the [Clone Codebase](#clone-codebase) setting for this stage.

### Shared Paths

You can use **Shared Paths** to specify paths to folders outside the default workspace. You can use this to [share data across steps](../caching-ci-data/share-ci-data-across-steps-and-stages.md) or customize cache paths for [Cache Intelligence](../caching-ci-data/cache-intelligence.md).

When a pipeline runs, it creates a temporary volume called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is the current working directory for each step in the stage. The workspace persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The default shared working directory for a stage is `/harness`. The workspace is destroyed when the stage ends.

Individual steps can communicate and share state using the workspace filesystem. The workspace is a volume, so filesystem changes persist throughout the stage lifetime. If you need to share additional volumes, you can add **Shared Paths**. Path declarations must begin with a forward slash, such as `/vol`.

For example, the maven `m2` repo is stored in `/root/.m2` by default. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

### Cache Intelligence

You can enable  <!-- and configure --> [Cache Intelligence](../caching-ci-data/cache-intelligence.md). This feature is only available for Linux and Windows platforms on Harness Cloud build infrastructure.

For fully supported build tools with dependencies stored in the default location for the tool used, you only need to select **Enable Cache Intelligence**.

For other build tools or non-default cache locations, you must provide custom cache paths in addition to enabling Cache Intelligence.

<!-- select **Enable Cache Intelligence** and provide **Paths** to cache.-->

Optionally, you can specify a custom cache key.

<!-- Optionally, you can specify a custom cache **Key**. -->

For information about supported tools, enabling cache intelligence, and configuring custom cache paths and keys, go to the [Cache Intelligence](../caching-ci-data/cache-intelligence.md) documentation.

### Advanced: Stage Variables

[Stage variables](/docs/platform/pipelines/add-a-stage/#option-stage-variables) are available to all steps in the stage. For an example use case, go to [Useful techniques: Build a Docker image without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#useful-techniques).

## Infrastructure

These settings are found on the **Infrastructure** tab after adding a stage to a pipeline.

Infrastructure is where the build runs the steps in this stage. It is a build farm, such as a Kubernetes cluster. Infrastructure settings vary by [build infrastructure type](./which-build-infrastructure-is-right-for-me.md).

The first stage requires you to configure a build infrastructure. In stages after the first, you can either **Propagate from an existing stage** or **Use a New Infrastructure**.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Cloud">
```

Use the **Cloud** infrastructure option for [Harness Cloud build infrastructure](./use-harness-cloud-build-infrastructure.md).

The following **Platform** settings are available:

* **Select the Operating System:** Select the relevant OS.
* **Select the Architecture:** Select the relevant architecture.

```mdx-code-block
  </TabItem>
  <TabItem value="kubernetes" label="Kubernetes" default>
```

Use the **Kubernetes** infrastructure option to [set up a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

The following **Platform** settings are available:

* **Select the Operating System:** Select the relevant OS.
* **Kubernetes Cluster:** Select a [Kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector).
* **Namespace:** Enter the Kubernetes namespace to use in the target cluster. You can also use a Runtime Input (`<+input>`) or expression for the namespace. For more information, go to [Runtime Inputs](../../../platform/20_References/runtime-inputs.md).

The following **Advanced** settings are available for the **Kubernetes** infrastructure:

### Volumes

A list of the volumes you want to mount onto the pod running the stage.

### Service Account Name

Specify a Kubernetes service account that you want step containers to use when communicating with the Kubernetes API server. Leave this field blank if you want to use the namespace's default service account. You must set this field in the following cases:

* Your build infrastructure runs on EKS, you have an IAM role associated with the service account, *and* the stage has a step that uses a Harness AWS connector with IRSA. For more information, go to the AWS documentation on [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).
* Your Build stage has steps that communicate with any external services using a service account other than the default. For more information, go to the Kubernetes documentation on [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/).
* Your Kubernetes cluster connector inherits authentication credentials from the Delegate.

### Automount Service Account Token

By default, this option is selected and Kubernetes mounts a token for the Service Account when it creates a pod, which enables the pod to communicate with the Kubernetes API server. When this option is not selected, the service account token is not mounted.

### Labels

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

### Annotations

You can add Kubernetes annotations to the pods in your infrastructure. An annotation can be small or large, structured or unstructured, and can include characters not permitted by labels. For more information, go to the Kubernetes documentation on [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

### Container Security Context

Configure the [Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for the stage (pod) and steps (containers):

* **Privileged:** Run all containers with the [`--privileged`](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities) flag enabled. This flag is disabled by default. You can override this setting in individual Run and Run Tests steps.
* **Allow Privilege Escalation:** When enabled, a process can gain more privileges than its parent process. This setting determines whether the [`no_new_privs`](https://www.kernel.org/doc/Documentation/prctl/no_new_privs.txt) flag gets set on the container process.
* **Add Capabilities:** The list of capabilities to add to each step by default, in addition to the runtime defaults. This field corresponds to the [`capabilities: add`](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container) option in Kubernetes.
* **Drop Capabilities:** The list of capabilities that must be dropped from each step. This field corresponds to the [`capabilities: drop`](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container) option in Kubernetes.
* **Read-Only Root Filesystem:** Run all steps with a read-only root filesystem that has no writable layer.
* **Run as Non-Root** and **Run as User:** Go to [Run as non-root or a specific user](#run-as-non-root-or-a-specific-user).

#### Run as non-root or a specific user

You can use the **Run as Non-Root** and **Run as User** settings to run builds as a non-root user or a specific user ID.

:::caution

Using a non-root user can require other changes to your pipeline.

With a Kubernetes cluster build infrastructure, all [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact) use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). This tool requires root access to build the Docker image. It doesn't support non-root users.

If you enable **Run as Non-Root**, then you must:

* Run the **Build and Push** step as root by setting **Run as User** to `0` on the **Build and Push** step. This will use the root user for that individual step only.
* If your security policy doesn't allow running as root for any step, you must use the Buildah Drone plugin to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

:::

* **Run as Non-Root:** Enable this option to run all steps as a non-root user. If enabled, you must specify a default user ID for all containers in the **Run as User** field.
* **Run as User:** Specify a user ID, such as `1000`, to use for all containers in the pod. You can also set **Run as User** values for individual steps. If you set **Run as User** on a step, it overrides the build infrastructure **Run as User** setting.

### Priority Class

Set the stage pod's [`PriorityClass`](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) in case resources run out on the host node. You can specify a `PriorityClass` from your build infrastructure or use the predefined classes `system-cluster-critical` or `system-node-critical`, which ensure that the stage is always scheduled first.

If you leave this field blank, the `PriorityClass` is set to the `globalDefault`, if your infrastructure has one defined, or `0`, which is the lowest priority.

### Node Selector

A list of [`nodeSelectors`](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector), which whitelist the set of candidate nodes based on your stage pod's requirements.

### Tolerations

A list of [`tolerations`](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/), which allow (but do not require) the pods to schedule onto nodes with matching taints.

### Host Names

A list of [HostAliases](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/) to set pod-level override of hostname resolution.

### Init Timeout

Set the timeout for the initialization phase. During this phase, Harness downloads the build step images and spins up the containers to execute the build steps.

If you use large images in your Build stage's steps, you might find that the initialization step times out and the build fails when the pipeline runs. In this case, you can increase the init timeout window from the default of 8 minutes.

### Override Image Connector

By default, [Harness pulls certain images from public Docker Hub repos](./harness-ci.md) that are needed to run a build. You can override this by using a [Docker connector that downloads the images from the Harness Container Image Registry](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector) instead. This option is useful when your default Delegate cannot access the public registry (for example, due to security policies in your organization or if your infrastructure is running in a private cloud).

```mdx-code-block
  </TabItem>
  <TabItem value="local" label="Local">
```

Use the **Local** infrastructure option for a [local runner build infrastructure](./define-a-docker-build-infrastructure.md).

The following **Platform** settings are available:

* **Select the Operating System:** Select the relevant OS.
* **Select the Architecture:** Select the relevant architecture.

```mdx-code-block
  </TabItem>
  <TabItem value="vm" label="VMs">
```

Use the **VMs** infrastructure option for [self-hosted cloud provider VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

The following **Platform** settings are available:

* **Select the Operating System:** Select the build infrastructure OS.
* **Pool Name:** Enter the pool name as specified in the `pool.yml` setup file in your build infrastructure.
* **Override Image Connector:** By default, [Harness pulls certain images from public Docker Hub repos](./harness-ci.md) that are needed to run a build. You can override this by using a [Docker connector that downloads the images from the Harness Container Image Registry](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector) instead. This option is useful when your default Delegate cannot access the public registry (for example, due to security policies in your organization or if your infrastructure is running in a private cloud).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Execution

The **Execution** tab is where you add steps to the stage. For details about different step types, go to:

* [Build and upload artifacts](/docs/category/build-and-upload-artifacts)
* [Run tests](/docs/category/run-tests)
* [Manage dependencies](/docs/category/manage-dependencies)
* [Share and cache CI data](/docs/category/share-and-cache-ci-data)
* [Run scripts](/docs/category/run-scripts)
* [Use plugins](/docs/category/use-plugins)
* [Security step (Harness STO)](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)

## Advanced

The **Advanced** tab contains settings for [conditional execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings), [looping strategies](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism), and [failure strategies](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps).
