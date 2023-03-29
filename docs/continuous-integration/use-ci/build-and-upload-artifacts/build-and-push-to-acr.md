---
title: Build and Push to ACR
description: Use a CI pipeline to build and push an image to ACR.
sidebar_position: 30
helpdocs_topic_id: gstwrwjwgu
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to add a Build and Push to [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry) (ACR) step to a CI pipeline.

These steps assume you're familiar with creating CI pipelines. If you haven't created a pipeline before, try this tutorial to [get started for free with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).

## Add the Build and Push to ACR step

1. Go to **Pipelines** and create a new pipeline or edit an existing pipeline.
2. If your pipeline doesn't already have a **Build** stage, select **Add Stage**, and then select **Build**.
3. On the **Build** stage's **Infrastructure** tab, configure the build infrastructure.

:::note

The **Build and Push to ACR** step is only available for [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md). For other build infrastructures, you can use the [Build and Push and image to Docker Registry step](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md) to [build and push an artifact](./build-and-upload-an-artifact.md) to ACR.

:::

4. In the **Build** stage's **Execution** tab, select **Add Step**, select **Add Step** again, and then select **Build and Push to ACR** from the Step Library.
5. Configure the [Build and Push to ACR step settings](../../ci-technical-reference/build-and-push-to-acr-step-settings.md).
6. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

## Run the pipeline

Select **Run Pipeline** to run your pipeline. Depending on your pipeline's codebase configuration, you may need to select a Git branch or tag to use for the build.

While the build runs, you can monitor the **Build and Push to ACR** step logs, and, if the build succeeds, you can find your pushed image on ACR.

## See also

* [Run step settings](../../ci-technical-reference/run-step-settings.md)
* [CI pipeline tutorial](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [Delegate overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md)
* [CI Build stage settings](../../ci-technical-reference/ci-stage-settings.md)
* [Harness key concepts](../../../getting-started/learn-harness-key-concepts.md)
