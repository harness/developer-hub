---
title: Docker layer caching
description: Caching Docker layers between pipeline executions can reduce build times.
sidebar_position: 20
---

When a layer changes in your Docker image, that layer, and all subsequent layers, are rebuilt. Docker layer caching can cache unchanged layers and reuse them across pipeline runs, which can dramatically reduce build times.

To maximize time savings, you must write your Dockerfiles to [use the cache efficiently](https://docs.docker.com/build/cache/#how-can-i-use-the-cache-efficiently).

## Harness-managed Docker layer caching

Harness can manage the [Docker layer cache backend](https://docs.docker.com/build/cache/backends/) for you without relying on your Docker registry. This ensures that layers are always pulled from the fastest available source.

You can use Harness-managed Docker layer caching with any [build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md); however Harness-managed Docker layer caching applies to built-in [Build and Push steps](/docs/category/build-and-push) only.

<!-- DLC uses the buildx plugin rather than kaniko or drone-docker. Example - GCR buildx plugin: https://github.com/drone-plugins/drone-buildx-gcr -->

### Docker layer caching with Harness CI Cloud

When you use Harness-managed Docker layer caching with [Harness CI Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), you don't need to bring your own storage, because the cache is stored in the Harness-managed environment, Harness Cloud

To enable Docker layer caching with Harness CI cloud, select __Enable Docker layer caching__ in your [Build and Push steps](/docs/category/build-and-push).

### Docker layer caching with self-managed build infrastructures

Self-managed build infrastructure is any [build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) other than Harness CI Cloud.

To enable Docker layer caching with self-managed build infrastructures, you must [configure S3-compatible global object storage](/docs/platform/settings/default-settings.md#continuous-integration) that Harness can use to store and manage caches, and then select __Enable Docker layer caching__ in your [Build and Push steps](/docs/category/build-and-push).

If your storage isn't S3-compatible or your don't want to use access key and secret key authentication, consider using [remote cache image](#remote-cache-image) instead.

## Remote cache image

Remote cache image is an alternative to Harness-managed Docker layer caching. It functions similarly to Docker layer caching to improve build times by sharing data across pipelines, stages, and steps.

:::info

If you enable both Harness-managed Docker layer caching *and* remote cache image on the same [Build and Push step](/docs/category/build-and-push), then Harness uses the remote cache image setting and ignores Harness-managed Docker layer caching.

:::

Remote caching leverages your existing Docker registry to pull previously built layers. Each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple Build and Push steps, enabling them to share the same remote cache.

To enable remote cache image in your [Build and Push steps](/docs/category/build-and-push):

1. Select the **Remote Cache Image** option.
2. Enter the name of the remote cache repository/registry and image, depending on the step you are using. For example:

   * Build and Push to Docker: `NAMESPACE/IMAGE` or `REGISTRY/IMAGE`
   * Build and Push to GCR: `gcr.io/PROJECT_ID/IMAGE`
   * Build and Push to GAR: `LOCATION-docker.pkg.dev/PROJECT_ID/REPO/IMAGE`
   * Build and Push to ECR: `APP/IMAGE`
   * Build and Push to ACR: `CONTAINER_REGISTRY.azurecr.io/IMAGE`

3. For the best performance, make sure:

   * The remote cache repo/registry exists in the same host/account and project/organization as the build image.
   * The specified repo/registry and image already exist. For some providers, Harness can automatically create the repository if it doesn't already exist, but this is not guaranteed. For any provider, Harness needs an existing image to overwrite.

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
