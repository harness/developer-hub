---
title: Build and Push to GCR step settings
description: This topic provides settings for the Build and Push to GCR step.
sidebar_position: 40
helpdocs_topic_id: 66ykcm0sf0
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Build and Push to GCR Step, which builds an image and pushes it to GCR. This step assumes that the target GCR registry meets the GCR requirements for pushing images. For more information, go to the Google documentation on [Pushing and pulling images](https://cloud.google.com/container-registry/docs/pushing-and-pulling).

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## GCP Connector

The Harness GCP connector to use to connect to GCR. The GCP account associated with the GCP connector needs specific roles. For more information, go to [Google Cloud Platform (GCP) connector settings reference](../../platform/7_Connectors/ref-cloud-providers/gcs-connector-settings-reference.md).

This step supports GCP connectors that use access key authentication. It does not support GCP connectors that inherit delegate credentials.

## Host

The Google Container Registry hostname. For example, `us.gcr.io` hosts images in data centers in the United States in a separate storage bucket from images hosted by `gcr.io`. For a list of Container Registries, go to the Google documentation on [Pushing and pulling images](https://cloud.google.com/container-registry/docs/pushing-and-pulling).

## Project ID

The [GCP resource manager project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

## Image Name

The name of the image you want to build and push to the target container registry.

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

Context represents a path to a directory containing a Dockerfile that kaniko uses to build your image. For example, a `COPY` command in your Dockerfile should refer to a file in the build context.

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

![](./static/build-and-push-to-gcr-step-settings-23.png)

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in later builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

In addition, you can specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache.

Remote Docker layer caching can dramatically improve build time by sharing layers across pipelines, stages, and steps.

Enter the name of the remote cache image, for example, `gcr.io/project-id/<image>`.

The remote cache repository must be in the same account and organization as the build image. For caching to work, the specified image name must exist.

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

## See also

You can find the following settings on the **Advanced** tab in the step settings pane.

### Conditional Execution

* [Conditional Execution](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md): Set conditions to determine when/if the step should run.
* [Failure Strategy](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md): Control what happens to your pipeline when a step fails.
* 