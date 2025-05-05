---
title: Build-only or Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each organization may have different workflows to build and push Docker images. One common scenario is to build an image locally, scan it for vulnerabilities, and push only after a successful scan.

Harness CI now supports these workflows by passing environment variables to adjust the default behavior of the native **Build and Push steps**. Harness uses two build tools to build and push images - BuildX and Kaniko. Harness makes this selection based on the build infrastructure. You also have the option to pick one of these build tools.

**Kaniko** is used to build container images from a Dockerfile inside a container or Kubernetes pod. It runs as a standalone executable in containers without privileged mode, eliminating the need for Docker-in-Docker setups, enhancing security and simplifying **kubernetes** workflows. It performs builds directly by executing Dockerfile instructions and assembling the layers without Docker itself.

**BuildX** is a Docker CLI plugin that extends Docker's build capabilities using BuildKit (Docker's builder). It relies on a Docker daemon to perform builds. It interacts directly with Docker. BuildX can operate in two modes:
- With Docker Daemon: Often requires a Docker-in-Docker (DinD) or privileged access when used inside containers or kubernetes environment.
- Daemonless mode: BuildX supports daemonless builds using container runtimes like `containerd` or remote builders requiring additional configuration. This is supported on both Kubernetes or VM based environment, but is more commonly used in Kubernetes and less needed in VMs.
BuildX, however, offers better support for caching (Docker Layer Caching in Harness), multi-platform builds, other buildkit features like secret mounting, output options - tarball or oci image. This also integrates better with a local Docker setup or in VM based environments.
:::note
By default, Harness uses Kaniko for Kubernetes builds. To use BuildX instead, enable the `CI_USE_BUILDX_ON_K8` feature flag.
:::

In the sections below, we will cover the following build and push image workflows: 
- Build-only
- Push-only
- Build once and push to multiple registries
- Build, scan and push image as a tarball using Kaniko

## Build-only
This mode builds a Docker image locally without pushing it to a registry. For instance, you might build an image locally and store it as an artifact or scan it for vulnerabilities in another step.

### Setup
- Choose the relevant native Build and Push step in the Harness CI Step Palette
- Set these environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skips pushing the image)
  - `PLUGIN_TAR_PATH`: `Path for saving the image` (e.g. /folder/image.tar)
  - `PLUGIN_DEAEMON_OFF`: `true` (for daemonless BuildX mode)

Following is a reference `build-only` YAML snippet:

```YAML
  - step:
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
          PLUGIN_NO_PUSH: "true"
```

The examples above demonstrate build-only mode to Dockerhub on Harness Cloud. You can apply the same to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variables.

## Push-only
This mode pushes a pre-built Docker image without building it again. Ideally used after scanning or validation.

### Setup
- Choose the relevant native Build and Push step in the Harness CI Step Palette
- Set these environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
  - `PLUGIN_SOURCE_TAR_PATH`: `Path to your previously built image` (e.g. /folder/image.tar)
  - `PLUGIN_DAEMON_OFF`: `true` (for daemonless BuildX mode)

Following is a reference `build-only` YAML snippet:

```YAML
  - step:
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
          PLUGIN_NO_PUSH: "true"
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
              PLUGIN_PUSH_ONLY: "true"
          when:
            stageStatus: Success
```
The examples above demonstrate push-only mode to Dockerhub on Harness Cloud. You can apply the same to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variables.

## Build Once and Push to Multiple Registries in Parallel
This mode builds an image once and pushes it simultaneously to multiple registries(ECR, GAR, ACR and Docker) in parallel. Once an image is built, the native build and push steps expect a distinct tag for each of the images being pushed. Harness retags the image before pushing it to the registry.

### Setup
:::note
This workflow currently only works with Buildx.
:::
- Build an image in a native **Build and Push** step with the the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` 
  - `PLUGIN_BUILDX_LOAD`: `true`
- Create separate push steps with:
  - `PLUGIN_PUSH_ONLY`: `true`
  - `PLUGIN_SOURCE_IMAGE`: `Name of the image to retag before pushing`
  - `PLUGIN_DAEMON_OFF`: `true` (BuildX in daemonless mode)

**Key Environment Variables**

| **Environment Variable** | **Description**                                                                                |
|--------------------------|------------------------------------------------------------------------------------------------|
| `PLUGIN_NO_PUSH`         | Set this at the step level to skip image push                         |
| `PLUGIN_BUILDX_LOAD`     | Loads the built image into the local Docker daemon (required for reuse).                       |
| `PLUGIN_PUSH_ONLY`       | Pushes the built image without rebuilding.                                                     |
| `PLUGIN_SOURCE_IMAGE`    | Specifies the name and tag of the image for retagging before pushing to registries.            |
| `PLUGIN_DAEMON_OFF`      | Runs BuildX in daemonless mode

Let us look at how this workflow is supported in Harness

```YAML
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

## Build, Scan, and Push (using Kaniko)

Following is a complete workflow to build, scan for vulnerabilities and then push the image. This example is using Kaniko, but the same can be achieved using BuildX

### Setup
- Build an image in a native **Build and Push** step with the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skip pushing during build)
  - `PLUGIN_TAR_PATH`: `Path for saving the image` (e.g. /folder/image.tar)
- Push the image with the native **Build and Push** step with the following environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
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