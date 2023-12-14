---
title: Docker layer caching
description: Caching Docker layers between pipeline executions can reduce build times.
sidebar_position: 20
---

When a layer changes in your Docker image, that layer must be rebuilt. Additionaly, all layers that come after must also be rebuilt. Docker layer caching allows these layers to be cached and reused between your pipelines, which can dramatically reduce build times.

Write your Dockerfiles to [use the cache efficiently](https://docs.docker.com/build/cache/#how-can-i-use-the-cache-efficiently).

## Docker layer caching with Harness Cloud

[Harness Cloud](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md) can manage the Docker layer [cache backend](https://docs.docker.com/build/cache/backends/) for you, without relying on your Docker registry. This ensures that layers are always pulled from the fastest available source.

Enable Docker layer caching by selecting __Enable Docker layer caching__ in your Docker build and push step.

:::note

Currently, Docker layer caching with Harness Cloud is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.<!-- CI_ENABLE_DLC and CI_HOSTED_CONTAINERLESS_OOTB_STEP_ENABLED --> <!-- DLC uses the buildx plugin rather than kaniko or drone-docker. Example - GCR buildx plugin: https://github.com/drone-plugins/drone-buildx-gcr -->

:::

## Docker layer caching with other build infrastructures

Other build infrastructures can leverage remote Docker caching using your existing Docker registry.

:::note

Support for other storage backends with self-hosted runners is in development.

:::

Each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple Docker build steps, enabling them to share the same remote cache.

You can enable the **Remote Cache Image** option in the following steps:

* [Build and Push to Docker](../build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to ECR](../build-and-upload-artifacts/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GAR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gar.md)
* [Build and Push to GCR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr.md)
* [Build and Push to ACR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr.md)