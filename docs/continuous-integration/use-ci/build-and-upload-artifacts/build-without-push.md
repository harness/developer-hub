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

- `PLUGIN_TAR_PATH` (or `PLUGIN_DESTINATION_TAR_PATH`) – Use during the build only phase in conjunction with `PLUGIN_NO_PUSH` to set the output image tarball's name and location.

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
                    connectorRef: DOCKER_REGISTRY_CONNECTOR
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
                  name: Build Docker Image
                  identifier: BuildAndPushECRBuildOnly
                  spec:
                    connectorRef: AWS_CONNECTOR_1
                    region: REGION
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
                    connectorRef: DOCKER_REGISTRY_CONNECTOR
                    image: alpine
                    shell: Sh
                    command: ls
                contextType: Pipeline
              - step:
                  type: AquaTrivy
                  name: Scan with Aqua Trivy
                  identifier: AquaTrivy_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: container
                      workspace: /harness/image.tar
                      detection: manual
                      name: test-image
                      variant: new-<+pipeline.sequenceId>
                    advanced:
                      log:
                        level: info
                    privileged: true
                    image:
                      type: local_archive
                contextType: Pipeline
              - step:
                  type: BuildAndPushECR
                  name: Push to ECR
                  identifier: BuildAndPushECR_2
                  spec:
                    connectorRef: AWS_CONNECTOR_2
                    region: REGION
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
              harnessImageConnectorRef: DOCKER_REGISTRY_CONNECTOR
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

This pipeline demonstrates a flexible, multi-stage container workflow using Kaniko with enhanced image tarball handling. It builds a Docker image, exports it as a tarball without pushing (`PLUGIN_NO_PUSH`), scans it for vulnerabilities using Aqua Trivy, and finally pushes the scanned image using `PLUGIN_PUSH_ONLY` and `PLUGIN_SOURCE_TAR_PATH`. The use of tarball-based workflows allows a clean separation between build and push stages, improving traceability and security posture.
</TabItem>

</Tabs>
```