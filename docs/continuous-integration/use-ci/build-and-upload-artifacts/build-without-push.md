---
title: Build images without pushing
description: You can build images without pushing them.
sidebar_position: 110
---

In Harness CI, you can build images without pushing them. For example, you can use your CI pipeline to test a Dockerfile from your codebase to verify that the resulting image is correct before you push it to your Docker repository.

The configuration depends on your build infrastructure.

## Build without pushing on Harness Cloud, a local runner, or a self-hosted VM

1. In your CI pipeline, go to the **Build** stage that includes a [Build and Push step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

## Build without pushing on a Kubernetes cluster running as root

Use these steps if you're using the built-in [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

1. In your CI pipeline, go to the **Build** stage that includes a **Build and Push** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_NO_PUSH`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

## Build without pushing on a Kubernetes cluster running as non-root

Use these steps with the Buildah plugin, which is used to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

1. In your CI pipeline, go to the **Build** stage that includes the **Plugin** step with the Buildah plugin.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.
