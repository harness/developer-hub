---
description: You can use image from multiple ACRs.
title: Use images from multiple ACRs
---

The harness does not have its own built-in container image registry to store and host container images. Instead, Harness relies on external container image registries, such as Docker Hub, Amazon Elastic Container Registry (ECR), Google Container Registry (GCR), or Azure Container Registry (ACR), to pull images during the deployment process.

When deploying applications using Harness, you specify the image repository and tag for each service or microservice you want to deploy. Then Harness pulls the specified images from your container image registry (e.g., Docker Hub, ECR, GCR, ACR) and deploys them to your target environment. For more information and a list of supported container registries, go to [Build and push artifacts and images](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

## Problem

Harness supports [pushing and pulling images from ACR](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr). If you have multiple ACRs, you might need to pull images from different ACRs in the same pipeline.

## Solution

If you have multiple ACRs, the solution depends on the images you are pulling.

### Pull Harness-required images from a private registry

When you run a Harness CI pipeline, Harness pulls [required CI images](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci) from the public registry where they are stored. If desired, you can [pull Harness images from a private registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#pull-harness-images-from-a-private-registry). This involves replicating the images into your own private registry, and then modifying the built-in Harness Docker connector (ID: `harnessImage`) to pull from your private registry.

### Pull your own images from multiple ACRs

To pull your own images from multiple ACRs, you can create one or more [Microsoft Azure connectors](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector) or [Docker connectors](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) for your ACRs.

If your ACRs are under the same app registration or Azure subscription, then you can use one connector. If you need to pull images from ACRs in multiple app registrations or subscriptions, you need to create a separate connector for each app/subscription. For more information, go to [Add a Microsoft Azure connector - Configure credentials](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector/#configure-credentials).

To pull images, use your connectors in **Run** steps or other steps where you need to pull images. If you created multiple connectors, you need to create a separate step for each connector. To optimize your pipeline, you can use [parallelism and looping strategies](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to execute multiple steps at once or repeat over the same commands with different connectors. You can also execute matrix steps in parallel for more time savings.

### Push images to multiple ACRs

To push your own images to multiple ACRs, you can create one or more Azure or Docker connectors for your ACRs.

* **Azure connector:** To use the [Build and Push to ACR step](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr), you must use a [Microsoft Azure cloud provider connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector).
* **Docker connector:** If your ACRs are Docker V2 compliant and you want to use the [Build and Push to Docker step](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings), you must use a [Docker connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) with the **Provider type** as **Other**.

If your ACRs are under the same app registration or Azure subscription, then you can use one connector. If you need to push images to ACRs in multiple app registrations or subscriptions, you need to create a separate connector for each app/subscription. For more information, go to [Add a Microsoft Azure connector - Configure credentials](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector/#configure-credentials).

<!--
These are the original steps that were in this article, but they are not clear and it isn't explained why the user would modify the built-in Harness Image connector.

Steps to follow:
1. Create a new connector using the same details as the default HarnessImage connector - Harness External Images
2. Modify the default HarnessImage connector to point to the internal container registry
3. Pin the images with their repository path (excluding the registry name) as the customer config
4. All pipelines will still pull from the correct container registry and the override would only be to override when/where needed
5. Pulling new images will need to come from the Harness External Images connector
-->
