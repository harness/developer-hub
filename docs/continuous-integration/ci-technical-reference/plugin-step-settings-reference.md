---
title: Plugin step settings
description: Plugins are Docker containers that perform predefined tasks and are configured as steps.
sidebar_position: 80
helpdocs_topic_id: 8r5c3yvb8k
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the CI Plugin step. Plugins are Docker containers that perform predefined tasks and are configured as steps in your stage. Plugins can be used to deploy code, publish artifacts, send notifications, and more.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string describing the step's purpose.

## Container Registry

Harness connector for the container registry where the plugin image is located.

## Image

The name of the plugin's Docker image. The image name should include the tag. If you don't include a tag, Harness uses the latest tag. For more information about tags, go to [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag).

You can use any Docker image from any Docker registry, including Docker images from private registries.

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Privileged

Select this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

### Settings

Specify plugin-specific settings according to the plugin's documentation. For more information, go to the [Drone plugins documentation](http://plugins.drone.io/).

### Image Pull Policy

Select an option to set the pull policy for the image:

* **Always:** The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present:** The image is pulled only if it isn't already present locally.
* **Never:** The image is assumed to exist locally. No attempt is made to pull the image.

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set container resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* * **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
