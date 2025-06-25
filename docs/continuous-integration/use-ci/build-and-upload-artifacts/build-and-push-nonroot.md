---
title: How to Build and push with non-root users
description: Use the buildah plugin if you can't use the built-in Build and Push steps.
sidebar_position: 23
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

Building with non-root users may be necessary for an organization due to security or compliance requirements. This page describes how to build and push Docker images as a non-root user, and outlines Harness options and best practices for Kubernetes-based builds. T

---

### Kaniko Builds

By default, Harness uses Kaniko to build and push images in Kubernetes cluster build infrastructure.

:::note
We will support a maintained version of Kaniko as our default. More information to come. 
:::

- **Kaniko does not require privileged mode** (`privileged: false`).
- **Kaniko always runs as root** (rootless mode is not supported).
- **If your policy requires non-root for builds:** Kaniko will not meet that requirement. See Buildah below.
- Kaniko is recommended for most security-conscious teams as it minimizes risk by not requiring privileged pods.

---

### BuildX Builds

You may also use BuildX by enabling the [CI_USE_BUILDX_ON_K8](https://developer.harness.io/docs/continuous-integration/ci-supported-platforms/#harness-ci-early-access-features) flag via Harness Support.  
- **BuildX requires both root user and privileged mode** in Kubernetes.
- This tool provides the richest feature set, but is the least restrictive in terms of privileges, and is not recommended where least-privilege is a hard requirement.

---

### Drone Docker

You can also use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md) for image builds as a plugin step.  
- This method is generally used for backwards compatibility or in specific CI workflows.
- **Privilege and user requirements will be similar to Docker/BuildX** (privileged and root).

---

### Individual Step Root / Buildah Plugin

If your Kubernetes cluster build infrastructure is configured to run as non-root (`runAsNonRoot: true` and `runAsUser: 1000`), you have two options for building images:

1. [**Enable root access for individual steps**](#enable-root-access-for-a-single-step) (if allowed by policy):  
    If your build infrastructure is set up for non-root execution (`runAsNonRoot: true`), but your security policy allows **Build and Push** to run as root, set **Run as User** to `0` for that step only. **This enables only that step to run as root.**

    *If your security policy forbids root user entirely for all steps, [use the Buildah plugin](#use-the-buildah-plugin) running as a non-root user, with privileged mode enabled.*

2. [**Use the Buildah plugin**](#use-the-buildah-plugin):  
    If your policy does not allow root for any step, use the [Buildah plugin](https://plugins.drone.io/plugins/buildah) in a Plugin step, and specify a non-root UID (`runAsUser: 1000`).
    Buildah can run as a non-root user (e.g., UID 1000). However, **it still requires privileged mode** in Kubernetes (except for some OpenShift SCC scenarios).
    This is due to kernel-level operations required by Buildah, even in rootless mode.

    :::tip
    Buildah requires special configuration for OpenShift clusters (use the `anyuid` SCC and `privileged: false`).  
    For standard Kubernetes clusters, `privileged: true` is required even for non-root user.
    :::

    To use the Buildah plugin, your pipeline must meet these requirements:

    * [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md)
    * [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md) set to [run as non-root](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md#run-as-non-root-or-a-specific-user)
    * **For OpenShift Buildah users:** `anyuid` SCC is required. [OpenShift SCC documentation](https://docs.openshift.com/container-platform/3.11/admin_guide/manage_scc.html)

---

### Add a Plugin step

<Tabs>
  <TabItem value="Visual" label="Visual">

At the point in your pipeline where you want to build and upload an image, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `buildah` plugin.

* **Name:** Enter a name.
* **Container Registry:** Select a connector corresponding to your push destination.
   * Docker Hub: Docker connector
   * ACR: Azure connector
   * ECR: AWS connector
   * GAR/GCR: GCP connector
* **Image:** Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * ACR: [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * ECR: [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * GAR/GCR: [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * Docker Hub: [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* **Privileged:** Set to `false` for OpenShift clusters; `true` for standard Kubernetes.
* **Run as User:** Specify the ID of the non-root user to use for this step, such as `1000`.
* **Settings:** Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the Dockerfile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/variables-and-expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`.
   * `password`: An [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/variables-and-expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For more information and additional settings, including AWS S3 settings, go to [Buildah plugin settings](#buildah-plugin-settings).

</TabItem>
  <TabItem value="YAML" label="YAML" default>

At the point in your pipeline where you want to build and upload an image, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `buildah` plugin, for example:

```yaml
                - step:
                    type: Plugin
                    name: buildah-docker
                    identifier: buildahdocker
                    spec:
                      connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                      image: plugins/buildah-docker:1.1.0-linux-amd64
                      privileged: true     # false for OpenShift with anyuid SCC
                      settings:
                        repo: myDockerHub1234/test
                        tags: buildahtest
                        registry: https://index.docker.io/v2/
                        dockerfile: Dockerfile
                        username: <+secrets.getValue("DOCKER_HUB_USER")>
                        password: <+secrets.getValue("DOCKER_HUB_SECRET")>
                      runAsUser: "1000"
```

This step requires the following specifications:

* `connectorRef`: Provide the ID of a connector corresponding to your push destination.
   * Docker Hub: Docker connector
   * ACR: Azure connector
   * ECR: AWS connector
   * GAR/GCR: GCP connector
* `image`: Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * ACR: [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * ECR: [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * GAR/GCR: [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * Docker Hub: [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* `privileged`: Set to `false` for OpenShift clusters. Set to `true` for non-OpenShift clusters.
* `runAsUser`: Specify the ID of the non-root user to use for this step, such as `1000`.
* `settings`: Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the Dockerfile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/variables-and-expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`.
   * `password`: An [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/variables-and-expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For more information and additional settings, including AWS S3 settings, go to [Buildah plugin settings](#buildah-plugin-settings).

</TabItem>
</Tabs>

#### Buildah plugin settings

For information about Buildah plugin settings, go to the [Buildah README](https://github.com/drone-plugins/drone-buildah/blob/master/README.md), the [Buildah Drone Plugins Marketplace page](https://plugins.drone.io/plugins/buildah), and the the `main.go` file for each destination:

* [Docker main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-docker/main.go)
* [ACR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-acr/main.go)
* [ECR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-ecr/main.go)
* [GAR/GCR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-gcr/main.go)

Many Buildah plugin settings correspond with settings for the built-in **Build and Push** steps. If you're encountering an error with the `buildah` plugin configuration, you can reference the settings definitions for the built-in steps for guidance on the expected value for the equivalent Buildah settings. However, keep in mind that the configuration for **Build and Push** steps (such as field names and location in the YAML) is not an exact match to the **Plugin** step configuration.

| Destination | Buildah image | Buildah main.go | Equivalent Build and Push step |
| ----------- | --------------------- | ------------------------------------- | ------------------------------ |
| Docker Hub | `buildah-docker` | [Docker main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-docker/main.go) | [Build and Push to Docker Registry](./build-and-push/build-and-push-to-docker-registry) |
| ACR | `buildah-acr` | [ACR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-acr/main.go) | [Build and Push to ACR](./build-and-push/build-and-push-to-acr.md) |
| ECR | `buildah-ecr` | [ECR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-ecr/main.go) | [Build and Push to ECR](./build-and-push/build-and-push-to-ecr-step-settings.md) |
| GAR/GCR | `buildah-grc` | [GCR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-gcr/main.go) | [Build and Push to GAR](./build-and-push/build-and-push-to-gar.md)/[Build and Push to GCR](./build-and-push/build-and-push-to-gcr.md) |

## Stage YAML example

This YAML example shows a Build (`CI`) stage with a Kubernetes cluster build infrastructure running as non-root (`runAsNonRoot: true` and `runAsUser: "1000"`) and a `Plugin` step running the Buildah plugin.

```yaml
    - stage:
        identifier: stage1
        type: CI
        name: stage1
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                runAsNonRoot: true
                runAsUser: "1000"
              os: Linux
          execution:
            steps:
              - step:
                  identifier: buildah plugin
                  type: Plugin
                  name: buildah_plugin
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR
                    image: plugins/buildah-docker:1.1.0-linux-amd64
                    privileged: true
                    settings:
                      repo: myhub/test-repo
                      tags: builadhrootless
                      registry: https://index.docker.io/v2/
                      dockerfile: Dockerfile2
                      username: <+pipeline.variables.DOCKER_HUB_USER>
                      password: <+secrets.getValue("MyDockerPAT")>
                    runAsUser: "1000"
```

## Build an image without pushing

You can use your CI pipeline to test a Dockerfile used in your codebase and verify that the resulting image is correct before you push it to your Docker repository.

The following configuration is valid with the Docker Buildah plugin (`plugins/buildah-docker`) only. For other configurations, go to [Build without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push).

1. In your CI pipeline, go to the **Build** stage that includes the **Plugin** step with the Docker Buildah plugin.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.
