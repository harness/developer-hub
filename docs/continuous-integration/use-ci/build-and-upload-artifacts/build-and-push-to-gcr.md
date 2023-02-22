---
title: Build and Push to GCR
description: Use a CI pipeline to build and push an image to GCR.
sidebar_position: 30
helpdocs_topic_id: gstwrwjwgu
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to add a Build and Push to [Google Container Registry](https://cloud.google.com/container-registry) (GCR) step to a CI pipeline.

These steps assume you're familiar with creating CI pipelines. If you haven't create a pipeline before, try this tutorial to [Get started for free with the fasted CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).

## Add the Build and Push to GCR step

1. Go to **Pipelines** and create a new pipeline or edit an existing pipeline.
2. If your pipeline doesn't already have a **Build** stage, select **Add Stage**, and then select **Build**.
3. On the **Build** stage's **Infrastructure** tab, configure the build infrastructure. For example, you can [Define a Kubernetes cluster build infrastructure](../set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).
4. In the **Build** stage's **Execution** tab, select **Add Step**, select **Add Step** again, and then select **Build and Push to GCR** from the Step Library.
5. Configure the [Build and Push to GCR step settings](../../ci-technical-reference/build-and-push-to-gcr-step-settings.md).
6. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

## Run the pipeline

Select **Run Pipeline** to run your pipeline. Depending on your pipeline's codebase configuration, you may need to select a Git branch or tag to use for the build.

![](./static/build-and-push-to-ecr-515.png)

While the build runs, you can monitor the **Build and Push to GCR** step logs.

![](./static/build-and-push-to-ecr-516.png)

If the build succeeds, you can find your pushed image on GCR.

![](./static/build-and-push-to-ecr-518.png)

## See also

* [Run step settings](../../ci-technical-reference/run-step-settings.md)
* [CI pipeline quickstart](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [Delegates overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md)
* [CI stage settings](../../ci-technical-reference/ci-stage-settings.md)
* [Harness key concepts](../../../getting-started/learn-harness-key-concepts.md)

