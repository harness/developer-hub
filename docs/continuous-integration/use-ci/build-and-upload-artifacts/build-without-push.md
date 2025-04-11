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

<TabItem value="ecr" label="Build and Push to ECR">

Three new flags enhance the `kaniko-ecr` plugin's image handling capabilities:

- `PLUGIN_PUSH_ONLY` – Enables pushing a pre-built image tarball without running a build.

- `PLUGIN_SOURCE_TAR_PATH` – Used in conjunction with push-only mode to specify the source tarball.

- `PLUGIN_TAR_PATH`, `PLUGIN_DESTINATION_TAR_PATH` – Provide consistent naming with PLUGIN_SOURCE_TAR_PATH.

These additions enable more flexible workflows by allowing the separation of build and push operations. Refer to the following pipeline example for building an image (build-only), then running a Trivy image scan, and then pushing the image (push-only).

```YAML
pipeline:
  tags: {}
  stages:
    - stage:
        name: test-artifact-linux-arm64
        identifier: Pull
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    connectorRef: account.harnessImage
                    image: alpine
                    shell: Sh
                    command: |-
                      cat <<EOF > Dockerfile
                      # Use an official Alpine Linux as a base image
                      FROM alpine:latest
                      # Install basic packages
                      RUN apk add --no-cache bash
                      # Set the default command to run when starting the container
                      CMD ["bash"]
                      EOF
              - step:
                  type: BuildAndPushECR
                  name: BuildAndPushECR_1
                  identifier: BuildAndPushECRBuildOnly
                  spec:
                    connectorRef: AWS_CONNECTOR2_REF
                    region: ap-southeast-2
                    account: "AWS_ACCOUNT_ID"
                    imageName: test-image
                    tags:
                      - new-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_NO_PUSH: "true"
                      PLUGIN_TAR_PATH: image.tar
                  when:
                    stageStatus: Success
              - step:
                  type: Run
                  name: List Image Tar
                  identifier: Run_2
                  spec:
                    connectorRef: account.harnessImage
                    image: alpine
                    shell: Sh
                    command: ls
              - step:
                  type: BuildAndPushECR
                  name: BuildAndPushECRPushOnly
                  identifier: BuildAndPushECR_2
                  spec:
                    connectorRef: AWS_CONNECTOR1_REF
                    region: ap-southeast-2
                    account: "AWS_ACCOUNT_ID"
                    imageName: test-image
                    tags:
                      - new-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_PUSH_ONLY: "true"
                      PLUGIN_SOURCE_TAR_PATH: image.tar
                      PLUGIN_LOG_LEVEL: debug
                  when:
                    stageStatus: Success
          caching:
            enabled: false
            paths: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_CONNECTOR_REF
              namespace: default
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  variables:
    - name: awsAccess
      type: Secret
      description: ""
      required: false
      value: AWS_ACCESS_SECRET
    - name: awsSecret
      type: Secret
      description: ""
      required: false
      value: AWS_SECRET_KEY
  allowStageExecutions: true
  identifier: PIPELINE_ID
  name: PIPELINE_NAME
```

This pipeline demonstrates a two-step Kaniko ECR workflow: first building and exporting a container image as a tarball, then pushing it separately using the `PLUGIN_PUSH_ONLY` flag. The `PLUGIN_TAR_PATH` is used during the build step to define the output tarball, while `PLUGIN_SOURCE_TAR_PATH` references it in the subsequent push-only step. This separation allows greater flexibility in CI pipelines where build and push stages need to be decoupled or run in different environments.
</TabItem>

</Tabs>
```