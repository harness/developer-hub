---
title: Build and Push to ACR
description: Use a CI pipeline to build and push an image to ACR.
sidebar_position: 30
helpdocs_topic_id: gstwrwjwgu
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to configure the **Build and Push to ACR** step in a Harness CI pipeline. This step is used to build and push to [Azure Container Registry (ACR)](https://azure.microsoft.com/en-us/products/container-registry).

You need:

* Access to ACR and an ACR repo where you can upload your image.
* An [Azure Cloud Provider connector](#azure-connector).
* A [Harness CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md) that uses a Linux platform on a Kubernetes cluster build infrastructure.

## Kubernetes cluster build infrastructure is required

The **Build and Push to ACR** step is supported for Linux platforms on [Kubernetes cluster build infrastructures](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md) only. For other platforms and build infrastructures, use the [Build and Push to Docker Registry step](./build-and-push-to-docker-hub-step-settings.md) to push to ACR.

## Root access is required

With Kubernetes cluster build infrastructures, all **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). This tool requires root access to build the Docker image, and it doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

## Add a Build and Push to ACR step

In your pipeline's **Build** stage, add a **Build and Push to ACR** step and configure the [settings](#build-and-push-to-acr-step-settings) accordingly.

Here is a YAML example of a minimum **Build and Push to ACR** step.

```yaml
              - step:
                  type: BuildAndPushACR
                  name: BuildAndPushACR_1
                  identifier: BuildAndPushACR_1
                  spec:
                    connectorRef: YOUR_AZURE_CONNECTOR_ID
                    repository: CONTAINER-REGISTRY-NAME.azurecr.io/IMAGE-NAME
                    tags:
                      - <+pipeline.sequenceId>
```

When you run a pipeline, you can observe the step logs on the [build details page](../viewing-builds.md). If the **Build and Push to ACR** step succeeds, you can find the uploaded image on ACR.

:::tip

You can also:

* [Build images without pushing](./build-without-push.md)
* [Build multi-architecture images](./build-multi-arch.md)

:::

## Build and Push to ACR step settings

The **Build and Push to ACR** step has the following settings. Some settings are located under **Optional Configuration** in the visual pipeline editor.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](/docs/platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Azure Connector

The Harness Azure Cloud connector to use to connect to your ACR. This step supports Azure Cloud connectors that use access key authentication. This step doesn't support Azure Cloud connectors that inherit delegate credentials.

For more information about Azure connectors, including details about required permissions, go to [Add a Microsoft Azure Cloud Provider connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector).

### Repository

The URL for the target ACR repository where you want to push your artifact. You must use this format: `CONTAINER-REGISTRY-NAME.azurecr.io/IMAGE-NAME`.

### Subscription Id

Name or ID of an ACR subscription. This field is required for artifacts to appear in the build's **Artifacts** tab.

For more information about, go to the Microsoft documentation about [How to manage Azure subscriptions with the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli).

### Tags

Add [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag). This is equivalent to the `-t` flag.

Add each tag separately.

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

Select this option to enable `--snapshotMode=redo`. This setting causes file metadata to be considered when creating snapshots, and it can reduce the time it takes to create snapshots. For more information, go to the kaniko documentation for the [snapshotMode flag](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#flag---snapshotmode).

For information about setting other kaniko runtime flags, go to [Set kaniko runtime flags](#set-kaniko-runtime-flags).

### Dockerfile

The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.

### Context

Enter a path to a directory containing files that make up the [build's context](https://docs.docker.com/engine/reference/commandline/build/#description). When the pipeline runs, the build process can refer to any files found in the context. For example, a Dockerfile can use a `COPY` instruction to reference a file in the context.

### Labels

Specify [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the Docker image.

### Build Arguments

The [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#build-arg). This is equivalent to the `--build-arg` flag.

### Target

The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#target), equivalent to the `--target` flag, such as `build-env`.

### Remote Cache Image

Enter the name of the remote cache image, such as `<container-registry-name>.azurecr.io/<image-name>`.

The remote cache repository must be in the same account and organization as the build image. For caching to work, the entered image name must exist.

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in later builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple **Build and Push** steps, enabling these steps to share the same remote cache. This can dramatically improve build time by sharing layers across pipelines, stages, and steps.

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

Because the **Build and Push to ACR** step requires root access, use the **Run as User** setting if your build runs as non-root (`runAsNonRoot: true`) *and* you can run the **Build and Push to ACR** step as root. To do this, set **Run as User** to `0` on the **Build and Push to ACR** step to use the root user for this individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](./build-and-push-nonroot.md).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Step Failure Strategy settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)

### Conditions, looping, and failure strategies

You can find the following settings on the **Advanced** tab in the step settings pane:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings): Set conditions to determine when/if the step should run.
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings): Control what happens to your pipeline when a step fails.
* [Looping strategies overview](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism): Define a matrix, repeat, or parallelism strategy for an individual step.

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
