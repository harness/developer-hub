---
title: Build-only or Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There might be cases where you want to build a Docker image without pushing the image to a registry. A common example is to build an image locally, scan it for vulnerabilities and push the image upon a successful scan. 

In Harness CI, you can build container images without pushing them. This can be achieved by passing an environment variable to the **Build and Push** steps (meant to be used to build and push in one step execution) to modify their default behavior.

The environment variable to use depends on the build tool used in the **Build and Push** steps. Refer to the table below to learn more.

Harness CI uses different build tools depending on the infrastructure and feature flags. Here’s how to configure your environment correctly for each scenario:

1. **Kubernetes (K8s) Environment**
- **Default Build Tool**: `Kaniko`
- **Required Setting**:
    - Pass the following environment variable at a stage-level or step-level.
```bash
PLUGIN_PUSH_ONLY=true
```
**Exceptions – When Buildx is Used Instead of Kaniko**: If any of the following are true, `Buildx` will be used instead of `Kaniko`:
    - Feature flag `CI_USE_BUILDX_ON_K8` is enabled.
    - Docker Layer Caching (DLC) is enabled in the step.
  
In these cases, use:
```bash
PLUGIN_DRY_RUN=true
```
2. **Non-Kubernetes Environments (Cloud VMs or Local Runner)**
- **Default Build Tool**: `Buildx`
- **Required Setting**:
    - Pass the following environment variable at a **stage-level only**. This will not work at step-level.
```bash
PLUGIN_DRY_RUN=true
```

## Build, Scan, and Push on Kubernetes Infrastructure

In this section, we'll demonstrate how you can build a docker image locally, save it as a tar file, scan it locally, and then push to ECR (Elastic Container Registry). 

:::note
- The following environment variables are currently supported when using `Kaniko` as a build tool. `Buildx` is not currently supported.
- This is only supported for these **Build and Push** steps 
    - **Build and Push to Docker Registry**
    - **Build and Push to ECR**
:::

Refer to the following pipeline example for building an image (build-only), then running a Trivy image scan, and then pushing the image to multiple registries in parallel(push-only).

```YAML
pipeline:
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  identifier: build_scan_push
  name: build_scan_push
  stages:
    - stage:
        name: build_scan_push
        identifier: build_scan_push
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: BuildAndPushECR
                  name: Build Docker Image
                  identifier: BuildOnly
                  spec:
                    connectorRef: AWS_CONNECTOR
                    region: REGION
                    account: AWS_ACCOUNT_ID
                    imageName: test-image
                    tags:
                      - new-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_NO_PUSH: "true"
                      PLUGIN_TAR_PATH: image.tar
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
                  identifier: push_only
                  spec:
                    connectorRef: AWS_CONNECTOR
                    region: REGION
                    account: AWS_ACCOUNT_ID
                    imageName: test-image
                    tags:
                      - new-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_PUSH_ONLY: "true"
                      PLUGIN_SOURCE_TAR_PATH: image.tar
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_CONNECTOR_REF
              namespace: default
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

This pipeline demonstrates a flexible, multi-stage container workflow using Kaniko with enhanced image tarball handling. It builds a Docker image, exports it as a tarball without pushing (`PLUGIN_NO_PUSH`), scans it for vulnerabilities using Aqua Trivy, and finally pushes the scanned image using `PLUGIN_PUSH_ONLY` and `PLUGIN_SOURCE_TAR_PATH`. The use of tarball-based workflows allows a clean separation between build and push stages, improving traceability and security posture.

In the above pipeline, we demonstrated how these environment variables enhance the plugin's image handling capabilities when conditionally building and pushing to Docker Registry or ECR:

- `PLUGIN_PUSH_ONLY` – Enables pushing a pre-built image tarball without running a build.

- `PLUGIN_SOURCE_TAR_PATH` – Used in conjunction with push-only mode to specify the source tarball.

- `PLUGIN_TAR_PATH` (or `PLUGIN_DESTINATION_TAR_PATH`) – Use during the build only phase in conjunction with `PLUGIN_NO_PUSH` to set the output image tarball's name and location.

To learn more, refer to the [plugin operation modes](https://github.com/drone/drone-kaniko/blob/main/README.md#operation-modes).

The following section provides a guide to configure additional build and push workflows in Harness CI. The main use cases covered are:

- Build once, push to multiple registries (reuse image)
- Build and Push using TAR files

We will cover these use cases for Kubernetes and Cloud

## Build Once and Push to Multiple Registries in Parallel
There are scenarios where you might want to build a Docker image once and push it to multiple registries in parallel(such as ECR, GAR, and ACR). This would save a lot of time in the build process. Harness CI now supports this use case using out-of-the-box Build and Push steps with environment variables.

This workflow enables you to:

- Build an image once using Buildx.

- Optionally scan the image as covered above.

- Push the image to multiple registries in parallel using the same image artifact.


### How it Works

For Buildx: Passing both PLUGIN_DRY_RUN and PLUGIN_BUILDX_LOAD will build and load the image into the local Docker daemon.
The build step uses PLUGIN_NO_PUSH=true to avoid pushing and PLUGIN_BUILDX_LOAD=true to make the image available to subsequent steps in the same execution environment. Then, multiple Build and Push steps—each targeting a different registry—can run in parallel to push the same image.

:::note
This workflow is supported only when using Buildx, not Kaniko.
:::

Let us look at how this workflow is supported on different infrastructures: Harness cloud, Kubernetes
<Tabs>
<TabItem value="Cloud" label="Harness Cloud" default>
This example demonstrates how to build a image once using Buildx in Harness Cloud infrastructure, then push the same image to multiple registries in parallel (ECR, GAR, ACR).
```YAML
pipeline:
  identifier: build_push_parallel_cloud
  name: Build and Push to Multiple Registries (Cloud)
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  stages:
    - stage:
        name: Build and Push
        identifier: build_push_stage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build Image Only
                  identifier: build_only
                  spec:
                    connectorRef: DOCKER_CONNECTOR
                    repo: myorg/myapp
                    tags:
                      - new-no-push-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_NO_PUSH: "true"
                      PLUGIN_BUILDX_LOAD: "true"
              - parallel:
                  - step:
                      identifier: BuildAndPushDockerRegistry_2
                      type: BuildAndPushDockerRegistry
                      name: Docker Push only
                      spec:
                        connectorRef: DOCKER_CONNECTOR
                        repo: myorg/myapp
                        tags:
                          - new-no-push-<+pipeline.sequenceId>
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_IMAGE: myorg/myapp:new-no-push-<+pipeline.sequenceId>-buildx
                  - step:
                      identifier: BuildAndPushECR_1
                      type: BuildAndPushECR
                      name: Push to ECR
                      spec:
                        connectorRef: AWS_CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: myapp
                        tags:
                          - new-no-push-<+pipeline.sequenceId>
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_IMAGE: myorg/myapp:new-no-push-<+pipeline.sequenceId>-buildx
          infrastructure:
            type: VM
            spec:
              platform:
                os: Linux
                arch: Amd64
```
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">
This example demonstrates the same build-once, push-many approach, but on Kubernetes infrastructure. This works when Buildx is enabled either via feature flag.
```YAML
pipeline:
  identifier: build_push_parallel_k8s
  name: Build and Push to Multiple Registries (K8s)
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  stages:
    - stage:
        name: Build and Push
        identifier: build_push_stage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build Image Only
                  identifier: build_only
                  spec:
                    connectorRef: DOCKER_CONNECTOR
                    repo: myorg/myapp
                    tags:
                      - new-no-push-<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_NO_PUSH: "true"
                      PLUGIN_BUILDX_LOAD: "true"
              - parallel:
                  - step:
                      identifier: BuildAndPushDockerRegistry_2
                      type: BuildAndPushDockerRegistry
                      name: Docker Push only
                      spec:
                        connectorRef: DOCKER_CONNECTOR
                        repo: myorg/myapp
                        tags:
                          - new-no-push-<+pipeline.sequenceId>
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_IMAGE: myorg/myapp:new-no-push-<+pipeline.sequenceId>-buildx
                  - step:
                      identifier: BuildAndPushECR_1
                      type: BuildAndPushECR
                      name: Push to ECR
                      spec:
                        connectorRef: AWS_CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: myapp
                        tags:
                          - new-no-push-<+pipeline.sequenceId>
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_IMAGE: myorg/myapp:new-no-push-<+pipeline.sequenceId>-buildx
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_CONNECTOR
              namespace: default
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```
</TabItem>
</Tabs>
### Key Environment Variables

| **Environment Variable** | **Description**                                                                 |
|--------------------------|---------------------------------------------------------------------------------|
| `PLUGIN_NO_PUSH`         | Skips pushing the image during the build step.                                 |
| `PLUGIN_BUILDX_LOAD`     | Loads the built image into the local Docker daemon (required for reuse).       |
| `PLUGIN_PUSH_ONLY`       | Pushes an already built image without rebuilding.                              |
| `PLUGIN_SOURCE_IMAGE`    | Specifies the name and tag of the locally built image to be pushed.            |

:::Note
Harness retags these images internally with the tags specified in the push step. This is required because the underlying plugin expects distinct image names.
:::

## Push Only with TAR (Buildx)
In some CI workflows, users prefer to build an image and export it as a TAR archive, then scan or validate the image offline, and only push it once validated. This separation helps ensure that only secure, tested images are deployed to production registries. This also beings buildx tool in parity with kaniko.

### Why use a TAR-based flow?

- Security: Run image scans before pushing to production.
- Traceability: Store and archive artifacts before pushing.
- Cross-stage separation: Build in one stage, push in another.
- Registry agnostic: Push the same built artifact to DockerHub, ECR, GAR, ACR, etc.

<Tabs> 
<TabItem value="cloud" label="Harness Cloud" default>

- No need to manually start Docker Daemon (DinD).

- daemon_off=true is optional but recommended for consistency.

- Uses native container runtimes with Buildx available by default.

```YAML
pipeline:
  identifier: cloud_tar_push
  name: Cloud TAR Push Only
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  stages:
    - stage:
        identifier: build_push_tar_cloud
        type: CI
        name: Cloud TAR Push
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - parallel:
                  - step:
                      identifier: BuildGAR
                      type: BuildAndPushDockerRegistry
                      name: GAR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: garimage.tar

                  - step:
                      identifier: BuildECR
                      type: BuildAndPushECR
                      name: ECR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: ecrimage.tar

                  - step:
                      identifier: BuildDocker
                      type: BuildAndPushDockerRegistry
                      name: Docker Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: dockerimage.tar

                  - step:
                      identifier: BuildACR
                      type: BuildAndPushDockerRegistry
                      name: ACR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: acrimage.tar

              - parallel:
                  - step:
                      identifier: PushGAR
                      type: BuildAndPushDockerRegistry
                      name: GAR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: garimage.tar

                  - step:
                      identifier: PushECR
                      type: BuildAndPushECR
                      name: ECR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: ecrimage.tar

                  - step:
                      identifier: PushDocker
                      type: BuildAndPushDockerRegistry
                      name: Docker Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: dockerimage.tar

                  - step:
                      identifier: PushACR
                      type: BuildAndPushDockerRegistry
                      name: ACR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: acrimage.tar

```
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

- PLUGIN_DAEMON_OFF=true is mandatory to bypass the Docker socket.

```YAML
pipeline:
  identifier: k8s_tar_push
  name: Kubernetes TAR Push Only
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  stages:
    - stage:
        identifier: build_push_tar_k8s
        type: CI
        name: K8s TAR Push
        spec:
          cloneCodebase: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: CONNECTOR
              namespace: default
              automountServiceAccountToken: true
              os: Linux
              nodeSelector: {}
          execution:
            steps:
              - parallel:
                  - step:
                      identifier: BuildGAR
                      type: BuildAndPushDockerRegistry
                      name: GAR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: garimage.tar
                          PLUGIN_USERNAME: oauth2accesstoken
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: BuildECR
                      type: BuildAndPushECR
                      name: ECR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: ecrimage.tar
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: BuildDocker
                      type: BuildAndPushDockerRegistry
                      name: Docker Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: dockerimage.tar
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: BuildACR
                      type: BuildAndPushDockerRegistry
                      name: ACR Build Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_NO_PUSH: "true"
                          PLUGIN_TAR_PATH: acrimage.tar
                          PLUGIN_DAEMON_OFF: "true"

              - parallel:
                  - step:
                      identifier: PushGAR
                      type: BuildAndPushDockerRegistry
                      name: GAR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: garimage.tar
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: PushECR
                      type: BuildAndPushECR
                      name: ECR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        region: REGION
                        account: AWS_ACCOUNT_ID
                        imageName: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: ecrimage.tar
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: PushDocker
                      type: BuildAndPushDockerRegistry
                      name: Docker Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: dockerimage.tar
                          PLUGIN_DAEMON_OFF: "true"

                  - step:
                      identifier: PushACR
                      type: BuildAndPushDockerRegistry
                      name: ACR Push Only
                      spec:
                        connectorRef: CONNECTOR
                        repo: REPO
                        tags:
                          - <+pipeline.sequenceId>-buildx
                        envVariables:
                          PLUGIN_PUSH_ONLY: "true"
                          PLUGIN_SOURCE_TAR_PATH: acrimage.tar
                          PLUGIN_DAEMON_OFF: "true"

```
</TabItem>
</Tabs>
