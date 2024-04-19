---
title: Docker layer caching
description: Caching Docker layers between pipeline executions can reduce build times.
sidebar_position: 20
---

When a layer changes in your Docker image, that layer, and all subsequent layers, are rebuilt. Docker layer caching can cache unchanged layers and reuse them across pipeline runs, which can dramatically reduce build times.

To maximize time savings, you must write your Dockerfiles to [use the cache efficiently](https://docs.docker.com/build/cache/#how-can-i-use-the-cache-efficiently).







## Docker layer caching



### Docker layer caching with Harness Cloud

:::note

Currently, Docker layer caching with Harness Cloud is behind the feature flags `CI_ENABLE_DLC` and `CI_HOSTED_CONTAINERLESS_OOTB_STEP_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

<!-- DLC uses the buildx plugin rather than kaniko or drone-docker. Example - GCR buildx plugin: https://github.com/drone-plugins/drone-buildx-gcr -->

:::

[Harness Cloud](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md) can manage the Docker layer [cache backend](https://docs.docker.com/build/cache/backends/) for you without relying on your Docker registry. This ensures that layers are always pulled from the fastest available source.

To enable Docker layer caching for Harness Cloud, select __Enable Docker layer caching__ in your [Build and Push to Docker step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry).

### Docker layer caching with other build infrastructures

Other build infrastructures can leverage remote Docker caching using your existing Docker registry.

:::note

Harness is developing support for other storage backends with self-managed runners.

:::

Each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple Docker build steps, enabling them to share the same remote cache.

You can enable the **Remote Cache Image** option in the following steps:

* [Build and Push to Docker](../build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md)
* [Build and Push to ECR](../build-and-upload-artifacts/build-and-push/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GAR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gar.md)
* [Build and Push to GCR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gcr.md)
* [Build and Push to ACR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-acr.md)

### Remote cache images vs Docker Layer Caching

Remote Docker caching can dramatically improve build times by sharing data across pipelines, stages, and steps. Remote caching leverages your existing Docker registry to pull previously built layers.

Remote caching isn't available for all build infrastructures. If available for your build infrastructure, you can enable the **Remote Cache Image** option in the following steps:

* [Build and Push to Docker](../build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md)
* [Build and Push to ECR](../build-and-upload-artifacts/build-and-push/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GAR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gar.md)
* [Build and Push to GCR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gcr.md)
* [Build and Push to ACR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-acr.md)

:::info

Harness Cloud can manage the Docker layer cache backend for you, without relying on your Docker registry, which can further reduce build times. To learn more, go to [Docker Layer Caching](./docker-layer-caching.md).

:::







## Optimize Docker images and Dockerfiles

In addition to enabling Docker layer caching, the following practices can reduce Docker image build times.

<details>
<summary>Pre-build images that include all required dependencies</summary>

If most of the build time is spent downloading dependencies, you should pre-build an image with all required dependencies in a separate pipeline. Then, set up a periodic pipeline that builds the image with all the latest dependencies and pushes it to your Docker registry. Use this image in all of your build pipelines.

Pre-building images with all required dependencies is more efficient than downloading them to a baseline image as part of the Build setup. This is especially true if you update your images often to ensure that they include all the latest updates.

</details>

<details>
<summary>Exclude unnecessary files and packages from your images</summary>

In addition to reducing build times, excluding unnecessary files and packages makes the resulting images smaller, simpler, and more portable. You can use [dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file) files to exclude unnecessary files and folders from your images.

</details>

<details>
<summary>Optimize Dockerfiles</summary>

* Sort multi-line arguments in your Dockerfile alphabetically. This makes it easier to update and avoid duplicate packages.
* Review [Docker's best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).
* Write your Dockerfiles to [use Docker layer caching efficiently](https://docs.docker.com/build/cache/#how-can-i-use-the-cache-efficiently).

</details>
