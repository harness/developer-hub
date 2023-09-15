---
title: Build and Push to Docker
description: Use a CI pipeline to build and push an image to a Docker registry.
sidebar_position: 20
helpdocs_topic_id: q6fr5bj63w
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to configure the **Build and Push an image to Docker Registry** step in a Harness CI pipeline. This step creates a Docker image from a [Dockerfile](https://docs.docker.com/engine/reference/builder/) and pushes it to a Docker registry. This is one of several options for [building and pushing artifacts in Harness CI](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

:::tip

The **Build and Push an image to Docker Registry** step is primarily used to push to Docker Hub. However, you can also use it to push to Azure Container Registry (ACR).

You can use either the **Build and Push an image to Docker Registry** step or the [Build and Push to ACR step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr) to push to Azure Container Registry (ACR), because the **Build and Push an image to Docker Registry** step is equivalent to the Docker [build](https://docs.docker.com/engine/reference/commandline/build/) and [push](https://docs.docker.com/engine/reference/commandline/push/) commands.

:::

## Requirements

You need:

* Access to a Docker registry.
* A [Harness CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).
* A [Docker connector](#docker-connector).

### Kubernetes cluster build infrastructures require root access

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image. It doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

## Add a Build and Push to Docker step

In your pipeline's **Build** stage, add a **Build and Push an image to Docker Registry** step and configure the [settings](#build-and-push-to-docker-step-settings) accordingly.

Here is a YAML example of a minimum **Build and Push an image to Docker Registry** step.

```yaml
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and push to Docker
                  identifier: Build_and_push_to_Docker
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: DOCKER_USERNAME/DOCKER_REPO_NAME
                    tags:
                      - <+pipeline.sequenceId>
```

When you run a pipeline, you can observe the step logs on the [build details page](../viewing-builds.md). If the **Build and Push** step succeeds, you can find the uploaded image in your Docker repo.

:::tip

You can also:

* [Build images without pushing](./build-without-push.md)
* [Build multi-architecture images](./build-multi-arch.md)

:::

## Build and Push to Docker step settings

The **Build and Push an image to Docker Registry** step has the following settings. Depending on the build infrastructure, some settings may be unavailable or optional. Settings specific to containers, such as **Set Container Resources**, are not applicable when using a VM or Harness Cloud build infrastructure.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Docker Connector

The Harness Docker Registry connector where you want to upload the image. For more information, go to [Docker connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).

This step supports Docker connectors that use username and password authentication.

### Docker Repository

The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`.

For private Docker registries, specify a fully qualified repo name.

### Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

![](./static/build-and-push-to-docker-hub-step-settings-10.png)

:::tip

When you push an image to a repo, you tag the image so you can identify it later. For example, in one pipeline stage, you push the image, and, in a later stage, you use the image name and tag to pull it and run integration tests on it.

Harness expressions are a useful way to define tags. For example, you can use the expression `<+pipeline.sequenceId>` as a tag. This expression represents the incremental build identifier, such as `9`. By using a variable expression, rather than a fixed value, you don't have to use the same image name every time.

For example, if you use `<+pipeline.sequenceId>` as a tag, after the pipeline runs, you can see the `Build Id` in the output.

![](./static/build-and-upload-an-artifact-15.png)

And you can see where the `Build Id` is used to tag your image:

![](./static/build-and-upload-an-artifact-12.png)

Later in the pipeline, you can use the same expression to pull the tagged image, such as `myrepo/myimage:<+pipeline.sequenceId>`.

:::

### Optimize

With Kubernetes cluster build infrastructures, select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can reduce the time it takes to create snapshots. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

For information about setting other kaniko runtime flags, go to [Set kaniko runtime flags](#set-kaniko-runtime-flags).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

### Context

Enter a path to a directory containing files that make up the [build's context](https://docs.docker.com/engine/reference/commandline/build/#description). When the pipeline runs, the build process can refer to any files found in the context. For example, a Dockerfile can use a `COPY` instruction to reference a file in the context.

:::info Kubernetes cluster build infrastructures

Kaniko, which is used by the **Build and Push** step with Kubernetes cluster build infrastructures, requires root access to build the Docker image. If you have not already enabled root access, you will receive the following error:

`failed to create docker config file: open/kaniko/ .docker/config.json: permission denied`

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

:::

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

![](./static/build-and-push-to-docker-hub-step-settings-11.png)

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Enter the name of the remote cache image, such as `<container-registry-repo-name>/<image-name>`.

The remote cache repository must exist in the same host and project as the build image. The repository will be automatically created if it doesn't exist. For caching to work, the entered image name must exist.

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache. This can dramatically improve build time by sharing layers across pipelines, stages, and steps.

### Run as User

With Kubernetes cluster build infrastructures, you can specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

This step requires root access. You can use the **Run as User** setting if your build runs as non-root (`runAsNonRoot: true`), and you can run the **Build and Push** step as root. To do this, set **Run as User** to `0` to use the root user for this individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

### Conditions, looping, and failure strategies

You can find the following settings on the **Advanced** tab in the step settings pane:

* [Conditional Execution](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md): Set conditions to determine when/if the step should run.
* [Failure Strategy](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md): Control what happens to your pipeline when a step fails.
* [Looping Strategies Overview -- Matrix, Repeat, and Parallelism](/docs/platform/8_Pipelines/looping-strategies-matrix-repeat-and-parallelism.md): Define a looping strategy for an individual step.

### Set kaniko runtime flags

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md).

You can set kaniko runtime flags by adding [stage variables](/docs/platform/pipelines/add-a-stage/#option-stage-variables) formatted as `PLUGIN_FLAG_NAME`. For example, to set `--skip-tls-verify`, you would add a stage variable named `PLUGIN_SKIP_TLS_VERIFY` and set the variable value to `true`.

```yaml
        variables:
          - name: PLUGIN_SKIP_TLS_VERIFY
            type: String
            description: ""
            required: false
            value: "true"
```
