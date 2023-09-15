---
title: Build images without pushing
description: You can build images without pushing them.
sidebar_position: 110
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

You can build images without pushing them. For example, you can use your CI pipeline to test a Dockerfile from your codebase to verify that the resulting image is correct before you push it to your Docker repository.

The configuration depends on your build infrastructure.

## Harness Cloud, local runner, or self-hosted VM

1. In your CI pipeline, go to the **Build** stage that includes the **Build and Push** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

## Kubernetes cluster running as root

Use these steps if you're using the built-in **Build and Push** steps.

1. In your CI pipeline, go to the **Build** stage that includes the **Build and Push** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_NO_PUSH`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

## Kubernetes cluster running as non-root

Use these steps with the Buildah plugin, which is used to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

1. In your CI pipeline, go to the **Build** stage that includes the **Plugin** step with the Buildah plugin.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.
