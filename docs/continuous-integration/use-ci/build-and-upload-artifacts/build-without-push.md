---
title: Build-only or Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each organization may have different workflows to build and push Docker images. One common scenario is to build an image locally, scan it for vulnerabilities, and push only after a successful scan.

Harness CI now supports these workflows by passing environment variables to adjust the default behavior of the native **Build and Push steps**. The build and push steps may work with either Kaniko or BuildX plugins under the hood, and the plugin used will impact the environment variables passed to the steps. 

Before we dive into the workflows supported by Harness, lets look at why you would choose one build tool over another.

**Kaniko** is used to build container images from a Dockerfile inside a container or Kubernetes pod.
- Runs without privileged mode (granting same capabilities as the host machine - making it a root-level container)
- **Default** choice for Kubernetes environments
- Executes Dockerfile instructions directly

**BuildX** is a Docker CLI plugin that extends Docker's build capabilities using BuildKit (Docker's builder). It relies on a Docker daemon to perform builds. 
- Better for caching and multi-platform builds
- **Default** choice for non kubernetes environments
- Works in two modes:
  - With Docker Daemon (may require Docker-in-Docker) 
  - Daemonless mode (using containerd or remote builders)


:::note
By default, Harness uses Kaniko when running `Build and Push` steps in Kubernetes build infrastructure. To use BuildX instead, enable the `CI_USE_BUILDX_ON_K8` feature flag, or check the Docker Layer Caching (DLC) checkbox in the build and push steps. When DLC is used, the Build and Push steps will default to BuildX, even if the feature flag is disabled. 
:::


## Environment Variables Overview

This table summarizes the environment variables used across different **Build-only**, **Push-only**, **Build Once and Push to Many**, and **Build, Scan, and Push** workflows in **Harness CI**.

| **Environment Variable**     | **Description**                                                                                                                               | **Supported builder**  |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------- |----------------------------------------|
| `PLUGIN_NO_PUSH`             | Skip pushing the image after it is built. Set as `true` for build-only mode.                                                                                                   | BuildX + Kaniko                                  |
| `PLUGIN_PUSH_ONLY`           | Set as `true` for pushing an image without rebuilding it.                                                                                                          | BuildX + Kaniko                                   |
| `PLUGIN_BUILDX_LOAD`         | Required when using a non default docker driver (docker-container, kubernetes or remote). The resulting image is loaded into local Docker image store to make it available in subsequent steps                                          | BuildX only                    |
| `PLUGIN_TAR_PATH`            | Used when in build-only mode to provide a path for in which to save the tarball image (if exporting as a `.tar` file).                                                                    |  BuildX + Kaniko                                     |
| `PLUGIN_SOURCE_TAR_PATH`     |  Used when in push-only mode, to provide a Path to a local tarball image to be pushed.                                                                                                       |  BuildX + Kaniko                                     |
| `PLUGIN_SOURCE_IMAGE`        | Used when in push-only mode, in case you need to retag and push.                                                                                    |  BuildX + Kaniko                                     |
| `PLUGIN_DAEMON_OFF`          | Runs BuildX in daemonless mode, commonly used for Kubernetes builds in conjunction with a docker daemon provisioned in a Background step (DIND)| BuildX only                    |

In the sections below, we will cover the following build and push image workflows: 
- Build-only
- Push-only
- Build once and push to multiple registries
- Build, scan and push image as a tarball using Kaniko

## Build-only
This mode builds a Docker image locally without pushing it to a registry. For instance, you might build an image locally and store it as an artifact or scan it for vulnerabilities in another step.

<Tabs>
<TabItem value="BuildX" label="BuildX" default>

 Following are reference snippets in `build-only` mode using BuildX on **Harness Cloud** and **Kubernetes**

<Tabs>
<TabItem value="Cloud" label="Cloud">

#### Setup
- Set the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skips pushing the image)
  - `PLUGIN_TAR_PATH`: `Path for saving the image as tar archive (Optional)` (e.g. /folder/image.tar) - if you choose to build a tarball image

```YAML
  runtime:
  type: Cloud
  spec: {}
  stages:
    - stage:
        name: build_scan_push
        identifier: build_scan_push
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step: null
                identifier: BuildAndPushDockerRegistry_1
                type: BuildAndPushDockerRegistry
                name: docker build only
                spec:
                  connectorRef: CONNECTOR
                  repo: REPO_NAME
                  tags:
                    - new-nopush-<+pipeline.sequenceId>-build-x
                  caching: true
                  envVariables:
                    PLUGIN_NO_PUSH: 'true'

```
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

To use BuildX on Kubernetes ensure either Docker Layer Caching (DLC) is enabled or the `CI_USE_BUILDX_ON_K8` feature flag is enabled.

#### Setup
- Set the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skips pushing the image)
  - `PLUGIN_TAR_PATH`: `Path for saving the image as tar archive (Optional)` (e.g. /folder/image.tar) - if you choose to build a tarball image
  - `PLUGIN_DEAEMON_OFF`: `true` (for daemonless BuildX mode)
  - `PLUGIN_BUILDX_LOAD`: `true` - required when running a build on **Harness Cloud** (the resulting image is loaded into local Docker image store to make it available in subsequent steps)

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, a background step with a Docker container(DinD) is required, as shown in the snippet below
:::
```YAML
stages:
  - stage:
      name: build_scan_push
      identifier: build_scan_push
      type: CI
      spec:
        cloneCodebase: true
        infrastructure:
          type: KubernetesDirect
          spec:
            connectorRef: opk3saws
            namespace: default
            automountServiceAccountToken: true
            nodeSelector: {}
            os: Linux
        execution:
          - steps:
            - step:
                identifier: Background_1
                type: Background
                name: Background_1
                spec:
                  connectorRef: CONNECTOR
                  image: 'docker:dind'
                  shell: Sh
            - step:
                identifier: BuildAndPushDockerRegistry_1
                type: BuildAndPushDockerRegistry
                name: docker build only
                spec:
                  connectorRef: CONNECTOR
                  repo: REPO_NAME
                  tags:
                    - nopush-<+pipeline.sequenceId>-build-x
                  caching: true
                  envVariables:
                    PLUGIN_NO_PUSH: 'true'
                    PLUGIN_BUILDX_LOAD: 'true'
                    PLUGIN_DAEMON_OFF: 'true'
        sharedPaths:
          - /var/run

```
</TabItem>
</Tabs>
</TabItem>

<TabItem value="Kaniko" label="Kaniko">

Following is a reference `build-only` YAML snippet using Kaniko on **Kubernetes**

#### Setup

- Set the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skips pushing the image)
  - `PLUGIN_TAR_PATH`: `Path for saving the image as tar archive (Required)` (e.g. /folder/image.tar)

```YAML
stages:
  - stage:
      name: build_scan_push
      identifier: build_scan_push
      type: CI
      spec:
        cloneCodebase: true
        infrastructure:
          type: KubernetesDirect
          spec:
            connectorRef: K8S_CONNECTOR_REF
            namespace: default
            automountServiceAccountToken: true
            nodeSelector: {}
            os: Linux
        execution:
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
```
</TabItem>
</Tabs>
The examples above demonstrate build-only mode with the native Build and Push to Docker step. You can apply this to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variables.

## Push-only
This mode pushes a pre-built Docker image without building it again. Ideally used after scanning or validation.

<Tabs>
<TabItem value="BuildX" label="BuildX" default>

 Following are reference snippets in `push-only` mode using BuildX on **Harness Cloud** and **Kubernetes**
<Tabs>
<TabItem value="Cloud" label="Cloud">

#### Setup
- Set these environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
  - `PLUGIN_SOURCE_TAR_PATH`: `Path to your previously built image` (e.g. /folder/image.tar) - if you built a tarball image

```YAML
runtime:
  type: Cloud
  spec: {}
execution:
  - steps:
    - step:
        identifier: BuildAndPushDockerRegistry_2
        type: BuildAndPushDockerRegistry
        name: Docker Push only
        spec:
          connectorRef: CONNECTOR
          repo: REPO_NAME
          tags:
            - new-nopush-<+pipeline.sequenceId>-build-x
          envVariables:
            PLUGIN_PUSH_ONLY: 'true'

```
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

To use BuildX on Kubernetes ensure either Docker Layer Caching (DLC) is enabled or the `CI_USE_BUILDX_ON_K8` feature flag is enabled.

#### Setup
- Set these environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
  - `PLUGIN_SOURCE_TAR_PATH`: `Path to your previously built image (Optional)` (e.g. /folder/image.tar) - if you built a tarball image
  - `PLUGIN_DEAEMON_OFF`: `true` (for daemonless BuildX mode)

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, a background step with a Docker container(DinD) is required, as shown in the snippet below
:::
```YAML
stage:
  spec:
    cloneCodebase: true
    infrastructure:
      type: KubernetesDirect
      spec:
        connectorRef: CONNECTOR
        namespace: default
        automountServiceAccountToken: true
        nodeSelector: {}
        os: Linux
    execution:
      - steps:
          - step:
              identifier: Background_1
              type: Background
              name: Background_1
              spec:
                connectorRef: CONNECTOR
                image: 'docker:dind'
                shell: Sh
          - step:
              identifier: BuildAndPushDockerRegistry_2
              type: BuildAndPushDockerRegistry
              name: Docker Push only
              spec:
                connectorRef: CONNECTOR
                repo: REPO_NAME
                tags:
                  - push-only-<+pipeline.sequenceId>-build-x
                envVariables:
                  PLUGIN_PUSH_ONLY: 'true'
    sharedPaths:
      - /var/run
  
```
</TabItem>
</Tabs>
</TabItem>

<TabItem value="Kaniko" label="Kaniko">

Following is a reference build-only YAML snippet using Kaniko on **Kubernetes**

#### Setup
Set these environment variables:
- `PLUGIN_PUSH_ONLY`: `true` (skips building)
- `PLUGIN_SOURCE_TAR_PATH`: `Path to your previously built image` (e.g. /folder/image.tar) - if you built a tarball image

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
                      PLUGIN_NO_PUSH: 'true'
                      PLUGIN_TAR_PATH: image.tar
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
                      PLUGIN_PUSH_ONLY: 'true'
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
</TabItem>
</Tabs>

The examples above demonstrate push-only mode to Dockerhub on Harness Cloud. You can apply the same to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variables.
When you build a traditional OCI image, the step uses properties like `tags`, `registry` and `repo` to properly push the image built.

## Build Once and Push to Multiple Registries in Parallel
This mode builds an image once and pushes it simultaneously to multiple registries(ECR, GAR, ACR and Docker) in parallel. Once an image is built, the native build and push steps expect a distinct tag for each of the images being pushed. Harness retags the image before pushing it to the registry.

### Setup
:::note
This workflow currently only works with **BuildX**.
:::

Let us look at how this workflow is supported in Harness Cloud and Kubernetes
<Tabs>
<TabItem value="Cloud" label="Cloud" default>

- Build an image in a native **Build and Push** step with the the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (Skips pushing the image during build)
- Create separate push steps with:
  - `PLUGIN_PUSH_ONLY`: `true` (Pushes without rebuilding)
  - `PLUGIN_SOURCE_IMAGE`: `Name of the image to retag before pushing` (Harness distinctly retags these images as required by the native step)  

```YAML
    runtime:
      type: Cloud
      spec: {}
    - steps:
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
```
</TabItem>

<TabItem value="Kubernetes" label="Kubernetes" default>

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, it is recommended you run a background step with a Docker container(DinD), as shown in the snippet below
:::
- Build an image in a native **Build and Push** step with the the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (Skips pushing the image during build)
  - `PLUGIN_BUILDX_LOAD`: `true` (Required in Kubernetes or when using non-default drivers. The resulting image is loaded into local Docker image store to make it available in subsequent steps)
- Create separate push steps with:
  - `PLUGIN_PUSH_ONLY`: `true` (Pushes without rebuilding)
  - `PLUGIN_SOURCE_IMAGE`: `Name of the image to retag before pushing` (Harness distinctly retags these images as required by the native step)
  - `PLUGIN_DAEMON_OFF`: `true` (BuildX in daemonless mode)

```YAML
 stage:
  spec:
    cloneCodebase: true
    infrastructure:
      type: KubernetesDirect
      spec:
        connectorRef: CONNECTOR
        namespace: default
        automountServiceAccountToken: true
        nodeSelector: {}
        os: Linux
    infrastructure:
      type: KubernetesDirect
      spec:
        connectorRef: opk3saws
        namespace: default
        automountServiceAccountToken: true
        nodeSelector: {}
        os: Linux
    execution:   
      - steps: 
        - step:
          identifier: Background_1
          type: Background
          name: Background_1
          spec:
            connectorRef: CONNECTOR
            image: docker:dind
            shell: Sh
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
                PLUGIN_DAEMON_OFF: "true"
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
                    PLUGIN_DAEMON_OFF: "true"
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
                    PLUGIN_DAEMON_OFF: "true"
    sharedPaths:
      - /var/run
```
</TabItem>
</Tabs>

## Build, Scan, and Push (using Kaniko)

Following is a complete workflow to build, scan for vulnerabilities and then push the image. This example is using Kaniko, but the same can be achieved using BuildX

### Setup
- Build an image in a native **Build and Push** step with the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skip pushing the image during build)
  - `PLUGIN_TAR_PATH`: `Path for saving the image` (e.g. /folder/image.tar)
- Push the image with the native **Build and Push** step with the following environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (Pushes without rebuilding)
  - `PLUGIN_SOURCE_TAR_PATH`: `Path to your previously built image` (e.g. /folder/image.tar)

Refer to the following pipeline example:

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

This approach separates building, scanning and pushing into distinct steps, improving security and pipeline flexibility.
To learn more, refer to the [plugin operation modes](https://github.com/drone/drone-kaniko/blob/main/README.md#operation-modes)
