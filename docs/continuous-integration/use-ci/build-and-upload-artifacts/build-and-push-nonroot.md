---
title: Build and push with non-root users
description: Use the buildah plugin if you can't use the built-in Build and Push steps.
sidebar_position: 100
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

With a Kubernetes cluster build infrastructure, all **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image. It doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root for any step, you must use the [Buildah Drone plugin](https://plugins.drone.io/plugins/buildah) in a **Plugin** step to build and push your images. This topic explains how to configure the Buildah plugin.

## Requirements

* You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).
* Your Build stage uses a [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md) that is configured to [run as non-root](../set-up-build-infrastructure/ci-stage-settings.md#run-as-non-root-or-a-specific-user).
* `anyuid` SCC is required. For more information, go to the OpenShift documentation on [Managing Security Context Constraints](https://docs.openshift.com/container-platform/3.11/admin_guide/manage_scc.html).

## Add a Plugin step

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

At the point in your pipeline where you want to build and upload an image, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `buildah` plugin.

* **Name:** Enter a name.
* **Container Registry:** Select a connector corresponding to your push destination.
   * Docker Hub: Docker connector
   * ACR: Azure connector
   * ECR: AWS connector
   * GCR: GCP connector
* **Image:** Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* **Privileged:** Must be enabled for non-OpenShift clusters.
* **Run as User:** Specify the ID of the non-root user to use for this step, such as `1000`.
* **Settings:** Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the Dockerfile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`.
   * `password`: An [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For more information and additional settings, including AWS S3 settings, go to [Settings](#settings).

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

At the point in your pipeline where you want to build and upload an image, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `buildah` plugin, for example:

```yaml
                - step:
                    type: Plugin
                    name: buildah-docker
                    identifier: buildahdocker
                    spec:
                      connectorRef: account.harnessImage
                      image: plugins/buildah-docker:1.1.0-linux-amd64
                      privileged: false
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
   * GCR: GCP connector
* `image`: Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* `privileged`: Set to `false` for OpenShift clusters. Set to `true` for non-OpenShift clusters.
* `runAsUser`: Specify the ID of the non-root user to use for this step, such as `1000`.
* `settings`: Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the Dockerfile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`.
   * `password`: An [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For more information and additional settings, including AWS S3 settings, go to [Settings](#settings).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Settings

For information about Buildah plugin settings, go to the [Buildah README](https://github.com/drone-plugins/drone-buildah/blob/master/README.md), the [Buildah Drone Plugins Marketplace page](https://plugins.drone.io/plugins/buildah), and the the `main.go` file for each destination.

* [Docker main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-docker/main.go)
* [ACR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-acr/main.go)
* [ECR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-ecr/main.go)
* [GCR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-gcr/main.go)

Many Buildah plugin settings correspond with settings for the built-in **Build and Push** steps. If you're encountering an error with the `buildah` plugin configuration, you can reference the settings definitions for the built-in steps for guidance on the expected value for the equivalent Buildah settings. However, keep in mind that the configuration for **Build and Push** steps (such as field names and location in the YAML) is not an exact match to the **Plugin** step configuration.

| Destination | Buildah image | Buildah main.go | Equivalent Build and Push step |
| ----------- | --------------------- | ------------------------------------- | ------------------------------ |
| Docker Hub | `buildah-docker` | [Docker main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-docker/main.go) | [Build and Push to Docker Hub settings](./build-and-push-to-docker-hub-step-settings.md) |
| ACR | `buildah-acr` | [ACR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-acr/main.go) | [Build and Push to ACR settings](./build-and-push-to-acr.md) |
| ECR | `buildah-ecr` | [ECR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-ecr/main.go) | [Build and Push to ECR settings](./build-and-push-to-ecr-step-settings.md) |
| GCR | `buildah-grc` | [GCR main.go](https://github.com/drone-plugins/drone-buildah/blob/master/cmd/drone-gcr/main.go) | [Build and Push to GCR settings](./build-and-push-to-gcr.md) |

## YAML example

This YAML example shows a Build (`CI`) stage with a Kubernetes cluster build infrastructure running as non-root (`runAsNotRoot: true` and `runAsUser: "1000"`) and a `Plugin` step running the Buildah plugin.

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

This configuration is valid with the Docker Buildah plugin (`plugins/buildah-docker`) only.

1. In your CI pipeline, go to the **Build** stage that includes the **Plugin** step with the Docker Buildah plugin.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.
