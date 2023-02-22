---
title: Build and Push an image to Docker Registry step settings
description: This topic describes settings for the Build and Push an image to Docker Registry step.
sidebar_position: 20
helpdocs_topic_id: q6fr5bj63w
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes settings for the **Build and Push an image to Docker Registry** step, which creates a Docker image from a [Dockerfile](https://docs.docker.com/engine/reference/builder/) and pushes it to a Docker registry.

You can also use this step to push to Azure Container Registry (ACR) because this step is equivalent to the Docker [build](https://docs.docker.com/engine/reference/commandline/build/) and [push](https://docs.docker.com/engine/reference/commandline/push/) commands.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Docker Connector

The Harness Docker Registry connector where you want to upload the image. For more information, go to [Docker connector settings reference](../../platform/7_Connectors/ref-cloud-providers/docker-registry-connector-settings-reference.md).

This step supports Docker connectors that use either anonymous or username and password authentication.

## Docker Repository

The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`.

For private Docker registries, specify a fully qualified repo name.

## Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

![](./static/build-and-push-to-docker-hub-step-settings-10.png)

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Optimize

Select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can improve snapshot times. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

### Context

Context represents a directory containing a Dockerfile which kaniko will use to build your image. For example, a`COPY` command in your Dockerfile should refer to a file in the build context.

Kaniko requires root access to build the Docker image. If you have not already enabled root access, you will receive the following error:

`failed to create docker config file: open/kaniko/ .docker/config.json: permission denied`

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

![](./static/build-and-push-to-docker-hub-step-settings-11.png)

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Repository

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

In addition, you can specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache.

Remote Docker layer caching can dramatically improve build time by sharing layers across pipelines, stages, and steps.

In the step's **Remote Cache Repository** field, enter the name of the remote cache repo where the cached image layers will be stored.

The remote cache repository needs to be created in the same host and project as the build image. The repository will be automatically created if it doesn't exist. For caching to work, the entered image name must exist.

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
