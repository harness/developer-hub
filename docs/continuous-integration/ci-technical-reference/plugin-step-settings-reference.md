---
title: Plugin Step Settings
description: This topic provides settings for the CI Plugin step. Plugins are Docker containers that perform predefined tasks and are configured as steps in your stage. Plugins can be used to deploy code, publish…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 8r5c3yvb8k
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the CI Plugin step.

Plugins are Docker containers that perform predefined tasks and are configured as steps in your stage. Plugins can be used to deploy code, publish artifacts, send notifications, and more.

### Name

The unique name for this step.

### ID

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### Description

Text string.

### Tags

See [Tags Reference](https://docs.harness.io/article/i8t053o0sq-tags-reference).

### Container Registry

Harness Connector for the container registry where the plugin image is located.

### Image

The name of the Plugin Docker image. The image name should include the tag and will default to the latest tag if unspecified.

You can use any Docker image from any Docker registry, including Docker images from private registries.

### Optional Configurations

#### Privileged

Enable this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

#### Settings

Plugin-specific settings. See [Drone plugins docs](http://plugins.drone.io/).

#### Image Pull Policy

Select an option to set the pull policy for the image.

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it isn't already present locally.
* **Never**: The kubelet assumes that the image exists locally and doesn't try to pull the image.

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set container resources

These settings specify the maximum resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails, and the Pipeline execution continues.

### See Also

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)

