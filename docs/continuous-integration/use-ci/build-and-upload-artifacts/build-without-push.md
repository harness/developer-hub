---
title: Build images without pushing
description: You can build images without pushing them.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In Harness CI, you can build images without pushing them. For example, you can use your CI pipeline to test a Dockerfile from your codebase to verify that the resulting image is correct before you push it to your Docker repository.

The build dry run configuration depends on your build infrastructure and the step or plugin you use for your build.

## Harness Cloud, local runner, or self-managed VM

Use these instructions for build dry runs on Harness Cloud, self-managed VM, or local runner build infrastructure.

<Tabs>
<TabItem value="builtin" label="Built-in Build and Push steps" default>

For built-in [Build and Push steps](/docs/category/build-and-push), you need to add a [**STAGE** variable](/docs/platform/pipelines/add-a-stage/#stage-variables) named `PLUGIN_DRY_RUN`.

1. In your CI pipeline, go to the **Build** stage that includes a [Build and Push step](/docs/category/build-and-push).
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

</TabItem>
<TabItem value="run" label="Run step">

For build scripts executed in [Run steps](/docs/continuous-integration/use-ci/run-step-settings), refer to your build tool's documentation for dry run specifications.

</TabItem>
</Tabs>

## Kubernetes cluster build infrastructure

Use these instructions for build dry runs on Kubernetes cluster build infrastructure.

<Tabs>
<TabItem value="builtin" label="Built-in Build and Push steps" default>

For the built-in [Build and Push steps](/docs/category/build-and-push), add the `PLUGIN_NO_PUSH` variable to the **Build and Push** step's **Environment Variables**.

```yaml
                    envVariables:
                      PLUGIN_NO_PUSH: true
```

</TabItem>
<TabItem value="buildah" label="Buildah plugin (Plugin step)">

The Buildah plugin is used to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

To configure a build dry run with this plugin, add the following [stage variable](/docs/platform/pipelines/add-a-stage/#stage-variables) to the stage where you run the Buildah plugin:

```yaml
        variables:
          - name: PLUGIN_DRY_RUN
            type: String
            description: ""
            required: false
            value: "true"
```

</TabItem>
<TabItem value="run" label="Run step">

For build scripts executed in [Run steps](/docs/continuous-integration/use-ci/run-step-settings), refer to your build tool's documentation for dry run specifications.

</TabItem>
</Tabs>
