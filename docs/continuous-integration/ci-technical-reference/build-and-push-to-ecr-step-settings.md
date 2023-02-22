---
title: Build and Push to ECR step settings
description: This topic provides settings for the Build and Push to ECR step.
sidebar_position: 30
helpdocs_topic_id: aiqbxaef15
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Build and Push to ECR step, which builds an image and pushes it to [AWS ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html).

For more information, go to the AWS documentation for [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html).

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## AWS Connector

The Harness AWS connector to use to connect to ECR.

The AWS IAM roles and policies associated with the account connected to the Harness AWS connector must be able to push to ECR. For more information about roles and permissions for AWS connectors, go to:

* [Add an AWS connector](../../platform/7_Connectors/add-aws-connector.md)
* [AWS connector settings reference](../../platform/7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).

This step supports AWS connectors with any authentication method (AWS access key, Delegate IAM role assumption, IRSA, and cross account access).

## Region

Define the AWS region to use when pushing the image.

The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com` and a region is required. For more information, go to the AWS documentation for [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html).

## Account Id

The AWS account ID to use when pushing the image. This is required.

The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`. For more information, go to the AWS documentation for [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html).

## Image Name

The name of the image you are pushing. It can be any name.

## Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

![](./static/build-and-push-to-ecr-step-settings-24.png)

## Optional Configuration

Use the following settings to add additional configuration to the step.

### Base Image Connector

Select an authenticated connector to download base images from a DockerHub container registry. If you do not specify a **Base Image Connector**, the step downloads base images without authentication. Specifying a **Base Image Connector** is recommended because unauthenticated downloads generally have a lower rate limit than authenticated downloads.

### Optimize

Select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can improve snapshot times. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes the Dockerfile is in the root folder of the codebase.

### Context

Context represents a directory containing a Dockerfile that kaniko uses to build your image. For example, a `COPY` command in your Dockerfile should refer to a file in the build context.

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

![](./static/build-and-push-to-ecr-step-settings-25.png)

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

In addition, you can specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache.

Remote Docker layer caching can dramatically improve build times by sharing layers across pipelines, stages, and steps.

Enter the name of the remote cache image, for example, `app/myImage`.

The remote cache repository must be in the same account and organization as the build image. For caching to work, the specified image name must exist.

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
