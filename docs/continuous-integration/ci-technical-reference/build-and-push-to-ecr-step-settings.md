---
title: Build and Push to ECR Step Settings
description: This topic provides settings for the Build and Push to ECR step, which builds an image and pushes it to AWS ECR. See also Pushing a Docker image in the AWS docs. Name. The unique name for this Connec…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: aiqbxaef15
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Build and Push to ECR step, which builds an image and pushes it to [AWS ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html).

See also [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) in the AWS docs.

### Name

The unique name for this Connector.

### Id

See [Entity Identifier Reference](https://docs.harness.io/article/li0my8tcz3-entity-identifier-reference).

### AWS Connector

The Harness AWS Connector to use to connect to ECR. The AWS IAM roles and policies associated with the account used in the Harness AWS Connector must be able to push to ECR. See [AWS Connector Settings Reference](https://docs.harness.io/article/m5vkql35ca-aws-connector-settings-reference).

### Region

The AWS region to use when pushing the image. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com` and a region is required. See [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) from AWS.

### Account Id

The AWS account Id to use when pushing the image. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com` and an account Id is required. See [Pushing a Docker image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) from AWS.

### Image Name

The name of the image you are pushing. It can be any name.

### Tags

 [Docker build tag](https://docs.docker.com/engine/reference/commandline/build/#tag-an-image--t)   (`-t`).

Each tag should added separately.

![](./static/build-and-push-to-ecr-step-settings-24.png)

### Optional Configuration

#### Base Image Connector

Select an authenticated Connector to download base images from the container registry. Otherwise, the Step downloads base images without authentication. Specifying a Base Image Connector is recommended because unauthenticated downloads generally have a lower rate limit than authenticated downloads. ​

#### Optimize

Enable this option to redo snapshot mode.

#### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes the Dockerfile is in the root folder of the codebase.

#### Context

Context represents a directory containing a Dockerfile that kaniko uses to build your image. For example, a `COPY` command in your Dockerfile should refer to a file in the build context.

#### Labels

 [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

#### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) (`--build-arg`).

![](./static/build-and-push-to-ecr-step-settings-25.png)

#### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target) (--target). For example, `build-env`.

#### Remote Cache Image

Harness enables remote Docker Layer Caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

In addition, you can specify the same Docker repo for multiple Build and Push steps, enabling them to share the same remote cache.

Remote Docker Layer Caching can dramatically improve build time by sharing layers across Pipelines, Stages, and steps.

Enter the name of the remote cache image (for example, `app/myImage`).

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

