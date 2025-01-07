---
title: Docker layer caching
description: Caching Docker layers between pipeline executions can reduce build times.
sidebar_position: 20
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When a layer changes in your Docker image, that layer, and all subsequent layers, are rebuilt. Docker layer caching can cache unchanged layers and reuse them across pipeline runs, which can dramatically reduce build times.

:::tip

To maximize savings, consider modifying your Dockerfile to [use the cache efficiently](https://docs.docker.com/build/cache/#how-can-i-use-the-cache-efficiently).

:::

## Docker Layer Caching, an Intelligence Feature 

With **Docker Layer Caching (DLC)** , a [Harness CI Intelligence](/docs/continuous-integration/get-started/harness-ci-intelligence.md) feature, Harness seamlessly caches Docker layers between builds to  accelerate the time it takes to build Docker images.

You can use DLC with any [build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md). When you use DLC with Harness CI Cloud, the cache is stored in the Harness-managed environment.

:::info

Docker Layer Caching is now Generally Available (GA). 

If this feature is not yet enabled in your account, please reach out to [Harness Support](mailto:support@harness.io) for assistance.
:::



### Cache storage

When you use Docker Layer Caching with Harness CI Cloud, the cache is stored in the Harness-managed environment. When running builds on self-managed infrastructure, you will need to provide your own storage. 

<Tabs>
<TabItem value="cloud" label="Harness Cloud" default>

When you use Docker Layer Caching with [Harness CI Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), you don't need to bring your own storage, because the cache is stored in Harness-managed Harness Cloud storage.

All pipelines in the account use the same cache storage, and each build tool has a unique cache key that is used to restore the appropriate cache data at runtime.

The cache storage limit depends on your subscription plan type. Please visit [Subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt.md#usage-limits) page to learn more about usage limits.

Harness doesn't limit the number of caches you can store, but, once you reach your storage limit, Harness continues to save new caches by automatically evicting old caches.

The cache retention window is 15 days, which resets whenever a cache is updated.

</TabItem>
<TabItem value="sm" label="Self-managed build infrastructures">

When running builds in self-managed infrastructures, [configure S3-compatible  default object storage](/docs/platform/settings/default-settings.md#continuous-integration) that Harness can use to seamlessly store and manage the cache.


If your storage isn't S3-compatible or your don't want to use access key and secret key for authentication, consider using [remote cache image](#remote-cache-image) instead.

We suggest that you consider setting bucket level retention policy for efficient cache management. 

:::info
Enabling DLC when running on Kubernetes requires *privileged mode* on the cluster where the builds run. 
:::


</TabItem>
</Tabs>


### Enable Docker Layer Caching

1. If you're *not* using Harness Cloud build infrastructure, you must [configure S3-compatible global object storage](/docs/platform/settings/default-settings.md#continuous-integration) that Harness can use to store and manage caches.

   This is not required for Harness Cloud build infrastructure. For more information, go to [Cache storage](#cache-storage).

2. To enable Docker layer caching with Harness CI cloud, select __Enable Docker layer caching__ in your [Build and Push steps](/docs/category/build-and-push).

Here is a YAML example of a  **Build and Push an image to Docker Registry** step that uses DLC.

```yaml
   - step:
      type: BuildAndPushDockerRegistry
      name: Build and push to Docker
      identifier: Build_and_push_to_Docker
      spec:
         connectorRef: YOUR_DOCKER_CONNECTOR_ID
         repo: DOCKER_USERNAME/DOCKER_REPO_NAME
         caching: true 
         tags:
            - <+pipeline.sequenceId>
```



## Remote cache image

Remote cache image is an alternative to Harness CI Intelligence Docker layer caching. 

Remote caching leverages your existing Docker registry to pull previously built layers. Each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple Build and Push steps, enabling them to share the same remote cache.

:::info

If you enable both Harness Intelligence Docker layer caching *and* set remote cache image on the same [Build and Push step](/docs/category/build-and-push), Harness will use the remote cache image for caching.
:::

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

## Troubleshooting DLC

### I use DLC but I do not observe time savings

Distributed Layer Caching (DLC) provides caching benefits, but certain operations may not see significant improvements due to how caching works. For example, `FROM` statements never use cache, as base image layers are always pulled to ensure freshness. Additionally, external dependencies (like copying files from non-cached sources) may not be fully cached. DLC primarily caches self-contained operations, and checksum-based steps (like `COPY` or `ADD`) only reuse cache when source files remain unchanged. To maximize caching benefits, optimize Dockerfile instructions to reduce dependency on external sources.

See [Optimize Docker images and Dockerfiles](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching/#optimize-docker-images-and-dockerfiles) to learn more.