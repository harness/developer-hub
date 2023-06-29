---
title: Build and push with non-root users
description: Use the buildah plugin if you can't use the built-in Build and Push steps.
sidebar_position: 90
---

All **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md) by default. This tool requires root access to build the Docker image. It doesn't support non-root users.

If your security policy doesn't allow running as root, you must use the [Drone Buildah plugin](https://plugins.drone.io/plugins/buildah) in a **Plugin** step to build and push your images.

## Prepare a pipeline

You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md).

If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Add a Plugin step

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

At the point in your pipeline where you want to build and upload an image, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `buildah` plugin.

* **Name:** Enter a name.
* **Container Registry:** Select a connector corresponding to your push destination.
   * DockerHub: Docker connector
   * ACR: Azure connector
   * ECR: AWS connector
   * GCR: GCP connector
* **Image:** Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* **Run as User:** Specify the ID of the non-root user to use for this step, such as `1000`.
* **Settings:** Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the DockerFile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`
   * `password`: An [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For additional settings, including AWS S3 settings, go to the [Drone Buildah plugin documentation](https://plugins.drone.io/plugins/buildah).

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
   * DockerHub: Docker connector
   * ACR: Azure connector
   * ECR: AWS connector
   * GCR: GCP connector
* `image`: Specify the plugin image and tag to use, such as  `plugins/buildah-docker:1.1.0-linux-amd64`. If you don't specify a tag, the `latest` tag is used by default. Go to an image's Docker Hub page to browse available tags:
   * [buildah-acr](https://hub.docker.com/r/plugins/buildah-acr/tags)
   * [buildah-ecr](https://hub.docker.com/r/plugins/buildah-ecr/tags)
   * [buildah-gcr](https://hub.docker.com/r/plugins/buildah-gcr)
   * [buildah-docker](https://hub.docker.com/r/plugins/buildah-docker)
* `runAsUser`: Specify the ID of the non-root user to use for this step, such as `1000`.
* `settings`: Add the following settings as key-value pairs.
   * `repo`: The name of the repository where you want to store the image, for example, `<hub-user>/<repo-name>`. For private registries, specify a fully qualified repo name.
   * `tags`: Specify tags for your image.
   * `registry`: Specify the registry index, such as `https://index.docker.io/v2/`. The registry format for ECR is `aws_account_id.dkr.ecr.region.amazonaws.com`.
   * `dockerfile`: Specify the DockerFile to use for the build.
   * `username`: Provide the username to access the push destination, either as plaintext or an [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable), such as `<+pipeline.variables.DOCKER_HUB_USER>`
   * `password`: An [expression](/docs/platform/references/runtime-inputs/#expressions) referencing a [Harness secret](/docs/category/secrets) or [pipeline variable](/docs/platform/Variables-and-Expressions/add-a-variable) containing the password to access the push destination, such as `<+pipeline.variables.DOCKER_HUB_SECRET>`.
   * For additional settings, including AWS S3 settings, go to the [Drone Buildah plugin documentation](https://plugins.drone.io/plugins/buildah).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Troubleshooting

Many **Settings** correspond with settings used in the built-in **Build and Push** steps. If you're encountering an error with the `buildah` plugin configuration, you can reference those settings definitions for information about the expected value for those settings. However, keep in mind that the configuration for **Build and Push** steps (such as field names and location in the YAML) is not an exact match to the **Plugin** step configuration.

* [Build and Push to Docker Hub settings](./build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to ACR settings](./build-and-push-to-acr.md)
* [Build and Push to GCR settings](./build-and-push-to-gcr.md)
* [Build and Push to ECR settings](./build-and-push-to-ecr-step-settings.md)
