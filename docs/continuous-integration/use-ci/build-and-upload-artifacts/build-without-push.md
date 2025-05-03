---
title: Build-only or Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each organization may have different workflows to build and push Docker images. One common scenario is to build an image locally, scan it for vulnerabilities, and push only after a successful scan.

Harness CI now supports these workflows by passing environment variables to adjust the default behavior of the native **Build and Push steps**. Harness uses two build tools to build and push images - BuildX and Kaniko. Harness makes this selection based on the build infrastructure. You also have the option to pick one of these build tools.

The table below summarizes build tools Harness picks by default.

| **Environment**                        | **Default Tool Used** | **Key Reasons**                                                       |
|----------------------------------------|-----------------------|-----------------------------------------------------------------------|
| Kubernetes                             | Kaniko                | Daemonless builds, Kubernetes-native, enhanced security               |
| Harness Cloud (non Kubernetes, VMs)    | Buildx                | Docker daemon access, **Docker Layer Caching**, multi-platform builds |

:::note
Enable the `CI_USE_BUILDX_ON_K8` flag to use Buildx instead of Kaniko on Kubernetes.
:::

## What are these Build Tools?
**Kaniko** is a tool to build container images from a Dockerfile inside a container or Kubernetes pod. It runs as a standalone executable in containers without privileged mode, eliminating the need for Docker-in-Docker setups, enhancing security and simplifying **kubernetes** workflows. It performs builds directly by executing Dockerfile instructions and assembling the layers without Docker itself.

**BuildX** is a Docker CLI plugin that extends Docker's build capabilities using BuildKit (Docker's builder). It relies on a Docker daemon to perform builds. It interacts directly with Docker. BuildX can operate in two modes:
- With Docker Daemon: Often requires a Docker-in-Docker (DinD) or privileged access when used inside containers or kubernetes environment.
- Daemonless mode: BuildX supports daemonless builds using container runtimes like `containerd` or remote builders requiring additional configuration. This is supported on both Kubernetes or VM based environment, but is more commonly used in Kubernetes and less needed in VMs.
BuildX, however, offers better support for caching (Docker Layer Caching in Harness), multi-platform builds, other buildkit features like secret mounting, output options - tarball or oci image. This also integrates better with a local Docker setup or in VM based environments. 

In the sections below, we will cover the following build and push image workflows: 
- Build-only
- Push-only
- Build once and push to multiple registries
- Build, scan and push image as a tarball using Kaniko

## Build-only
This mode builds a Docker image locally without pushing it to a registry. For instance, you might build an image locally and store it as an artifact or scan it for vulnerabilities in another step.

### Setup
- Enable `CI_USE_BUILDX_ON_K8` feature flag to use buildx irrespective of the infrastructure
- Choose the relevant native Build and Push step in the Harness CI Step Palette 
- Set the `PLUGIN_NO_PUSH` environment variable to `true` at the stage or step level
- If you want to build a tarball archive instead of the standard docker OCI, you would need to pass a destination and image name (e.g. /folder/image.tar) to `PLUGIN_TAR_PATH` environment variable.
- Set the `PLUGIN_DAEMON_OFF` to `true` to run Buildx tool in the daemonless mode as in Kubernetes or Cloud.
<Tabs>
<TabItem value="Cloud" label="Harness Cloud" default>

```YAML
pipeline:
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  identifier: build_scan_push
  name: build_scan_push
  stages:
    - parallel:
        - stage:
            identifier: ID
            type: CI
            name: NAME
            description: ""
            spec:
              cloneCodebase: true
              platform:
                os: Linux
                arch: Amd64
              runtime:
                type: Cloud
                spec: {}
              execution:
                steps:
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
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

```YAML
pipeline:
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  identifier: build_scan_push
  name: build_scan_push
  stages:
    - parallel:
        - stage:
            identifier: ID
            type: CI
            name: NAME
            description: ""
            spec:
              cloneCodebase: true
              caching:
                enabled: true
              infrastructure:
                type: KubernetesDirect
                spec:
                  connectorRef: CONNECTOR
                  namespace: default
                  automountServiceAccountToken: true
                  nodeSelector: {}
                  os: Linux
              execution:    
                - step:
                    identifier: BuildAndPushDockerRegistry_1
                    type: BuildAndPushDockerRegistry
                    name: BuildAndPushDockerRegistry_1
                    spec:
                      connectorRef: CONNECTOR
                      repo: REPO_NAME
                      tags:
                        - test
                      envVariables:
                        PLUGIN_NO_PUSH: "true"
```
</TabItem>
</Tabs>
The examples above demonstrate build-only mode with Docker registry. You can apply the same to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variable.

## Push-only
This mode pushes a pre-built Docker image without building it again. This is useful after scanning or other validation steps.

### Setup
- Enable `CI_USE_BUILDX_ON_K8` feature flag to use buildx irrespective of the infrastructure
- Choose the relevant native Build and Push step in the Harness CI Step Palette 
- Set the `PLUGIN_PUSH_ONLY` environment variable to `true` at the step level to ensure the build and push step will pick up the image built to push to the registry
- If you built a tarball archive earlier, set the `PLUGIN_SOURCE_TAR_PATH` pointing correctly to the source folder of that image and name. (e.g. /folder/image.tar)
- Set the `PLUGIN_DAEMON_OFF` to `true` to run Buildx tool in the daemonless mode in Kubernetes or Cloud
<Tabs>
<TabItem value="Cloud" label="Harness Cloud" default>

```YAML
pipeline:
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  identifier: build_scan_push
  name: build_scan_push
  stages:
    - parallel:
        - stage:
            identifier: testsift
            type: CI
            name: build-test-sift
            description: ""
            spec:
              cloneCodebase: true
              platform:
                os: Linux
                arch: Amd64
              runtime:
                type: Cloud
                spec: {}
              execution:
                steps:
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
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

```YAML
pipeline:
  projectIdentifier: PROJECT_ID
  orgIdentifier: ORG_ID
  identifier: build_scan_push
  name: build_scan_push
  stages:
    - parallel:
        - stage:
            identifier: ID
            type: CI
            name: NAME
            description: ""
            spec:
              cloneCodebase: true
              caching:
                enabled: true
              infrastructure:
                type: KubernetesDirect
                spec:
                  connectorRef: CONNECTOR
                  namespace: default
                  automountServiceAccountToken: true
                  nodeSelector: {}
                  os: Linux
              execution:
                steps:
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
</TabItem>
</Tabs>

## Build Once and Push to Multiple Registries in Parallel
This mode builds an image once and push it simultaneously to multiple registries(ECR, GAR, ACR and Docker). Once an image is built, the native build and push steps expect a distinct tag for each of the images being pushed. Harness retags the image before pushing it to the registry.

### Setup
:::note
This workflow is currently supported using Buildx only.
:::
- Build an image in a native **Build and Push** step with the `PLUGIN_NO_PUSH` environment variable
- Set `PLUGIN_BUILDX_LOAD` environment variable to true. This makes the image available in the local docker daemon
- Create 4 native build and push steps (in series or parallel) to with the `PLUGIN_PUSH_ONLY` environment variable set to `true`
- Set the `PLUGIN_SOURCE_IMAGE` environment variable with an appropriate name, so Harness can retag the image before pushing
- Set the `PLUGIN_DAEMON_OFF` to `true` to run Buildx tool in the daemonless mode in Kubernetes or Cloud

**Key Environment Variables**

| **Environment Variable** | **Description**                                                                                |
|--------------------------|------------------------------------------------------------------------------------------------|
| `PLUGIN_NO_PUSH`         | Set this at the step level to skip image push                         |
| `PLUGIN_BUILDX_LOAD`     | Loads the built image into the local Docker daemon (required for reuse).                       |
| `PLUGIN_PUSH_ONLY`       | Pushes the built image without rebuilding.                                                     |
| `PLUGIN_SOURCE_IMAGE`    | Specifies the name and tag of the image for retagging before pushing to registries.            |
| `PLUGIN_DAEMON_OFF`      | Runs the 

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
This example demonstrates the same build-once, push-many approach, on Kubernetes infrastructure.

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

## Build, Scan, and Push (using Kaniko)

Lastly, putting all of this together, this mode demonstrates how you can build a docker image locally, save it as a tar file, scan it, and then push to ECR (Elastic Container Registry). 

### Setup
- Build an image in a native **Build and Push** step with the `PLUGIN_NO_PUSH` environment variable

This mode uses the following environment variables in the step configuration to 
| **Environment Variable** | **Description**                                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------|
| `PLUGIN_NO_PUSH`          | Set this at step level to skip pushing image being built to the registry                       |
| `PLUGIN_TAR_PATH`         | Used during the build only phase in conjunction with `PLUGIN_NO_PUSH` to set the output image tarball's name and location.                                                                             |
| `PLUGIN_PUSH_ONLY`        | Pushes the image built in the step earlier without rebuilding.                                 |
| `PLUGIN_SOURCE_TAR_PATH`  | Specifies the directory and name of the image tarball to push. Harness will pick up the tarball image from this location and push it to the registry.                                                                                                     |

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

To learn more, refer to the [plugin operation modes](https://github.com/drone/drone-kaniko/blob/main/README.md#operation-modes)