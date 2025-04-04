---
title: Build images without pushing
description: You can build images without pushing them.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In Harness CI, you can build container images without pushing them. This is useful to validate your Dockerfile or check if the image builds successfully before pushing it to a registry.

The dry-run behavior **depends on the image build tool** used by your pipeline step — either **Kaniko** or **Buildx** — **not** on the infrastructure (Kubernetes, Harness Cloud, etc.).

## Build tool behavior

| Build Tool | Dry Run Flag           | Notes                                                                 |
|------------|------------------------|-----------------------------------------------------------------------|
| Kaniko     | `PLUGIN_PUSH_ONLY=true`  | Default on Kubernetes unless overridden by feature flag              |
| Buildx     | `PLUGIN_DRY_RUN=true`  | Used when DLC checkbox is enabled or feature flag switches to Buildx |

**DLC checkbox**: Enabling this forces usage of Buildx regardless of infrastructure.

**Kubernetes users**: You get Kaniko by default. If the Buildx feature flag is enabled, it switches to Buildx — even if the DLC checkbox is off.

## Harness Cloud, Local Runner, or Self-managed VM

These environments use Buildx by default. Add `PLUGIN_DRY_RUN=true` to trigger a dry run.

<Tabs>
<TabItem value="builtin" label="Built-in Build and Push steps" default>

For built-in [Build and Push steps](/docs/category/build-and-push), add a [**STAGE** variable](/docs/platform/pipelines/add-a-stage/#stage-variables):

1. Go to the **Build** stage with the [Build and Push step](/docs/category/build-and-push).
2. In the **Overview** tab, expand the **Advanced** section.
3. Add a variable:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

</TabItem>
<TabItem value="run" label="Run step">

If you're using a [Run step](/docs/continuous-integration/use-ci/run-step-settings) with a custom script, follow the dry-run guidance from your specific build tool (e.g., `docker build`, `buildx build`, etc).

</TabItem>
</Tabs>

## Kubernetes Cluster Build Infrastructure

<Tabs>
<TabItem value="builtin" label="Built-in Build and Push steps" default>

Kubernetes infra **uses Kaniko by default**. In this case, use the `PLUGIN_PUSH_ONLY` flag:

```yaml
envVariables:
  PLUGIN_PUSH_ONLY: true
```

If your org has enabled the Buildx feature flag (or if DLC is enabled), use:

```yaml
envVariables:
  PLUGIN_DRY_RUN: true
```

</TabItem>
<TabItem value="buildah" label="Buildah plugin (Plugin step)">

For the Buildah plugin (used for non-root image builds), use:

```yaml
variables:
  - name: PLUGIN_DRY_RUN
    type: String
    value: "true"
```

</TabItem>
<TabItem value="run" label="Run step">

If you're using a custom build command in a [Run step](/docs/continuous-integration/use-ci/run-step-settings), refer to your tool's own dry-run mechanism.

</TabItem>
</Tabs>
```