---
title: Build and Push to ACR step settings
description: This topic describes settings for the Build and Push to ACR step.
sidebar_position: 20
---

This topic provides settings for the **Build and Push to ACR** step, which builds an image and pushes it to [Azure Container Registry](https://azure.microsoft.com/en-us/free/container-registry/) (ACR).

:::note

The **Build and Push to ACR** step is supported on Kubernetes build infrastructures only.

For other build infrastructures, you can use the [Build and Push an image to Docker Registry step](./build-and-push-to-docker-hub-step-settings.md) to push to ACR.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Azure Connector

The Harness Azure Cloud connector to use to connect to your ACR. This step supports Azure Cloud connectors that use access key authentication. This step doesn't support Azure Cloud connectors that inherit delegate credentials.

For more information about Azure connectors, including details about required permissions, go to [Add a Microsoft Azure Cloud Provider connector](../../platform/7_Connectors/add-a-microsoft-azure-connector.md).

## Repository

The URL for the target ACR repository where you want to push your artifact. You must use this format: `<container-registry-name>.azurecr.io/<image-name>`.

## Subscription Id

Name or ID of an ACR subscription. This field is required for artifacts to appear in the build's **Artifacts** tab.

For more information about, go to the Microsoft documentation about [How to manage Azure subscriptions with the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli).

## Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

:::tip

Harness expression are a useful way to define tags. For example, `<+pipeline.sequenceId>` is a built-in Harness expression. It represents the Build ID number, such as `Build ID: 9`. You can use the same tag in another stage to reference the same build by its tag.

:::

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Optimize

Select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can improve snapshot times. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

### Context

Context represents a directory containing a Dockerfile which kaniko will use to build your image. For example, a `COPY` command in your Dockerfile should refer to a file in the build context.

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in later builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

You can also specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache.

Remote Docker layer caching can dramatically improve build time by sharing layers across pipelines, stages, and steps.

Enter the name of the remote cache image, such as `<container-registry-name>.azurecr.io/<image-name>`.

The Remote Cache Repository must be in the same account and organization as the build image. For caching to work, the entered image name must exist.

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* * **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## Advanced settings

You can find the following settings on the **Advanced** tab in the step settings pane:

* [Conditional Execution](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md): Set conditions to determine when/if the step should run.
* [Failure Strategy](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md): Control what happens to your pipeline when a step fails.
* [Looping Strategies Overview -- Matrix, Repeat, and Parallelism](/docs/platform/8_Pipelines/looping-strategies-matrix-repeat-and-parallelism.md): Define a looping strategy for an individual step.
