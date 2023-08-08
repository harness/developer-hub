---
title: Plugin step settings
description: Plugins perform predefined tasks.
sidebar_position: 40
helpdocs_topic_id: 8r5c3yvb8k
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the **Plugin** step. For more information about plugins, go to [Explore plugins](./explore-ci-plugins.md).

:::info

Depending on the stage's build infrastructure, some settings may be unavailable or located under **Optional Configuration**.

:::

## Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string describing the step's purpose.

## Container Registry and Image

**Container Registry** is a Harness container registry connector that has access to Docker Hub. If you have created your own plugin, the connector must have access to the container registry where your plugin image is located.

The name of the plugin's Docker image. The image name should include the tag, or it defaults to the `latest` tag if unspecified. For more information about tags, go to [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag).

You can use any Docker image from any Docker registry, including Docker images from private registries.

:::info

These fields are located under **Optional Configuration** for stages that use [self-hosted cloud provider VM build infrastructure](/docs/category/set-up-vm-build-infrastructures) or [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).

:::

## Privileged

Select this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

## Settings

Specify plugin-specific settings according to the plugin's documentation, either in the Harness CI documentation ([Explore plugins](./explore-ci-plugins.md)) or on the Drone Plugins Marketplace.

For detailed information about a plugin's settings, go to the plugin's page on the [Drone Plugins Marketplace](http://plugins.drone.io/). In addition to the settings described on a plugin's Marketplace page, each plugin has a README where you can read about the plugin's settings in detail. The README can include additional or uncommon settings that aren't described on the Marketplace page or the Harness CI documentation. You can find README links at the top of each plugin's Marketplace page.

<figure>

![](./static/plugin-marketplace-readme-link.png)

<figcaption>The README link is at the top of each plugin's Drone Plugin Marketplace page.</figcaption>
</figure>

### Output variables

:::info

Output variables are not available for all plugins.

Support for plugin output variables may vary with [self-hosted Cloud provider VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

:::

Output variables are exposed values that can be used by other steps or stages in the pipeline. If the plugin writes outputs to the `.env` file present in the `DRONE_OUTPUT` path, you can use expressions to reference output variables in other steps and stages in the pipeline.

To reference an output variable in another step in the same stage, use either of the following expressions:

```
<+steps.STEP_ID.output.outputVariables.VAR_NAME>
<+execution.steps.STEP_ID.output.outputVariables.VAR_NAME>
```

To reference an output variable in a different stage than the one where it originated, use either of the following expressions:

```
<+stages.STAGE_ID.spec.execution.steps.STEP_ID.output.outputVariables.VAR_NAME>
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.output.outputVariables.VAR_NAME>
```

For each expression:

* Replace `STEP_ID` with the ID of the **Plugin** step.
* Replace `VAR_NAME` with the relevant variable name.
* In cross-stage references, replace `STAGE_ID` with the ID of the stage where the **Plugin** step exists.

## Image Pull Policy

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify an image pull policy:

* **Always:** The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present:** The image is pulled only if it isn't already present locally.
* **Never:** The image is assumed to exist locally. No attempt is made to pull the image.

## Run as User

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify the user ID to use for running processes in containerized steps.

For a Kubernetes cluster build infrastructure, the step uses this user ID to run all processes in the pod. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

## Set container resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

## Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
