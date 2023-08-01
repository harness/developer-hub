---
title: Build and Push to ACR
description: Use a CI pipeline to build and push an image to ACR.
sidebar_position: 30
helpdocs_topic_id: gstwrwjwgu
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to configure the **Build and Push to ACR** step in a Harness CI pipeline. This step is used to build and push to [Azure Container Registry (ACR)](https://azure.microsoft.com/en-us/products/container-registry).

## Requirements

* **Must use a Kubernetes Cluster build infrastructure:** The **Build and Push to ACR** step is supported for [Kubernetes cluster build infrastructures](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md) only. For other build infrastructures, use the [Build and Push an image to Docker Registry step](./build-and-push-to-docker-hub-step-settings.md) to push to ACR.
* **Must run as root:** With a Kubernetes cluster build infrastructure, all **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). This tool requires root access to build the Docker image, and it doesn't support non-root users.
   * If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.
   * If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

## Add the Build and Push to ACR step

Add the **Build and Push to ACR** step to the [Build stage](../set-up-build-infrastructure/ci-stage-settings.md) in a [CI pipeline](../prep-ci-pipeline-components.md) If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

The **Build and Push to ACR** step settings are described below. Some settings are located under **Optional Configuration** in the visual pipeline editor.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](/docs/platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Azure Connector

The Harness Azure Cloud connector to use to connect to your ACR. This step supports Azure Cloud connectors that use access key authentication. This step doesn't support Azure Cloud connectors that inherit delegate credentials.

For more information about Azure connectors, including details about required permissions, go to [Add a Microsoft Azure Cloud Provider connector](/docs/platform/Connectors/Cloud-providers/add-a-microsoft-azure-connector).

### Repository

The URL for the target ACR repository where you want to push your artifact. You must use this format: `<container-registry-name>.azurecr.io/<image-name>`.

### Subscription Id

Name or ID of an ACR subscription. This field is required for artifacts to appear in the build's **Artifacts** tab.

For more information about, go to the Microsoft documentation about [How to manage Azure subscriptions with the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli).

### Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

:::tip

Harness expressions are a useful way to define tags. For example, `<+pipeline.sequenceId>` is a built-in Harness expression. It represents the Build ID number, such as `9`. You can use the same tag in another stage to reference the same build by its tag.

:::

### Optimize

Select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can reduce the time it takes to create snapshots. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

### Context

Enter a path to a directory containing files that make up the [build's context](https://docs.docker.com/engine/reference/commandline/build/#description). When the pipeline runs, the build process can refer to any files found in the context. For example, a Dockerfile can use a `COPY` instruction to reference a file in the context.

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Enter the name of the remote cache image, such as `<container-registry-name>.azurecr.io/<image-name>`.

The remote cache repository must be in the same account and organization as the build image. For caching to work, the entered image name must exist.

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in later builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache. This can dramatically improve build time by sharing layers across pipelines, stages, and steps.

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

Because the **Build and Push to ACR** step requires root access, use the **Run as User** setting if your build runs as non-root (`runAsNonRoot: true`) *and* you can run the **Build and Push to ACR** step as root. To do this, set **Run as User** to `0` on the **Build and Push to ACR** step to use the root user for this individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

### Advanced settings

You can find the following settings on the **Advanced** tab in the step settings pane:

* [Conditional Execution](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md): Set conditions to determine when/if the step should run.
* [Failure Strategy](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md): Control what happens to your pipeline when a step fails.
* [Looping Strategies Overview -- Matrix, Repeat, and Parallelism](/docs/platform/8_Pipelines/looping-strategies-matrix-repeat-and-parallelism.md): Define a looping strategy for an individual step.

## Run the pipeline

After saving the pipeline, select **Run** to run the pipeline.

On the [build details page](../viewing-builds.md), you can see the logs for each step as they run.

If the build succeeds, you can find your pushed image on ACR.

## See also

* [Useful techniques for Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#useful-techniques) (Build without pushing, build multi-architecture images, use Harness expressions for tags)
* [Use Run steps](../run-ci-scripts/run-step-settings.md)
* [Build and test on a Kubernetes cluster build infrastructure](/tutorials/ci-pipelines/kubernetes-build-farm)
* [Delegate overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md)
* [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md)
* [Harness key concepts](../../../getting-started/learn-harness-key-concepts.md)
