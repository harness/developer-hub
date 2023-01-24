---
title: Build and Push to GCR Step Settings
description: This topic provides settings for the Build and Push to GCR Step, which builds an image and pushes it to GCR. Requirements. This step assumes that the target GCR registry meets the GCR requirements fo…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 66ykcm0sf0
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Build and Push to GCR Step, which builds an image and pushes it to GCR.

### Requirements

This step assumes that the target GCR registry meets the GCR requirements for pushing images. See [Pushing and pulling images](https://cloud.google.com/container-registry/docs/pushing-and-pulling) from Google.

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### GCP Connector

The Harness GCP Connector to use to connect to GCR. See [Google Cloud Platform (GCP) Connector Settings Reference](https://docs.harness.io/article/yykfduond6-gcs-connector-settings-reference).

### Host

The GCR registry hostname. For example, `us.gcr.io` hosts images in data centers in the United States, in a separate storage bucket from images hosted by `gcr.io`.

### Project ID

The GCP [Resource Manager project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).

### Image Name

The name of the image you want to build.

### Tags

 [Docker build tag](https://docs.docker.com/engine/reference/commandline/build/#tag-an-image--t) (`-t`). Add each tag separately.

### Optional Configurations

#### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

#### Context

Context represents a directory containing a Dockerfile that kaniko uses to build your image. For example, a`COPY` command in your Dockerfile should refer to a file in the build context.

#### Labels

 [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

#### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) (`--build-arg`).

![](./static/build-and-push-to-gcr-step-settings-23.png)

#### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target) (--target).

For example, `build-env`.

#### Remote Cache Image

Harness enables remote Docker Layer Caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in later builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

You can also specify the same Docker repo for multiple Build and Push steps, enabling them to share the same remote cache.

Remote Docker Layer Caching can dramatically improve build time by sharing layers across Pipelines, Stages, and steps.

Enter the name of the remote cache image (for example, `gcr.io/project-id/<image>`).

The Remote Cache Repository must be in the same account and organization as the build image. For caching to work, the entered image name must exist.

#### Run as User

Set the value to specify the user id for all processes in the pod, running in containers. See [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set container resources

Maximum resources limit values for the resources used by the container at runtime.

##### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed: you can specify one hundred millicpu as `0.1` or `100m`. See [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

##### Timeout

Timeout for the step. Once the timeout is reached, the step fails, and the Pipeline execution continues.

### See Also

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)

