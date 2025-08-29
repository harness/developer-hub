---
title: Build-only and Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each organization may have different workflows to build and push Docker images. One common scenario is to build an image locally, scan it for vulnerabilities, and push only after a successful scan.

Harness CI now supports these workflows by passing environment variables to adjust the default behavior of the native **Build and Push steps**. The build and push steps may work with either Kaniko or BuildX plugins under the hood, and the plugin used will impact the environment variables passed to the steps. 

Before diving into the supported workflows, let’s quickly review the differences between Kaniko and BuildX, and how Harness chooses between them.


## Build Tools Used by Harness
Harness CI uses two tools to build container images, depending on your infrastructure and step configuration: Kaniko and BuildX.

### Kaniko
- Kaniko builds images from a Dockerfile inside a container/Kubernetes pod.
- Executes Dockerfile instructions without needing a Docker daemon.
- Commonly used in Kubernetes environments.
- Does not require privileged mode.
- Requires root access inside the container (If your stage is configured with `runAsNonRoot: true`, set Run as User to 0 in the Build and Push step to allow Kaniko to function).

### BuildX
- BuildX is a Docker CLI plugin that extends Docker’s build capabilities using BuildKit.
- Enables Docker Layer Caching (DLC) and multi-platform builds.
- Requires a Docker daemon or BuildKit backend (e.g., Docker-in-Docker or containerd)
- Used automatically when DLC is enabled or specific feature flags are set.

### How Harness Chooses Between BuildX and Kaniko
Harness automatically selects the builder to be used by the **Build and Push steps** based on your infrastructure type and settings:
| **Environment**               | **Default Behavior**                                                           | **When BuildX Plugin Is Used**                                             |
| ----------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Non-Kubernetes (Cloud, VMs, etc)**             | Uses **Docker CLI** (`docker build`, `docker push`) | ✅ **BuildX** is used when **Docker Layer Caching (DLC)** is enabled, BuildX plugin is used    |
| **Kubernetes** | Uses **Kaniko**                                                                | ✅ **BuildX** is used when **DLC** is enabled or `CI_USE_BUILDX_ON_K8` feature flag is enabled |

To enable the `CI_USE_BUILDX_ON_K8` feature flag, contact [Harness Support](mailto:support@harness.io)

### Buildah

You can also use Buildah via `plugins/buildah-docker`. 
- Buildah allows building container images without requiring a Docker daemon.
- Supports both Dockerfile-based and script-based image builds.
- Can run in rootless mode, making it a secure choice for unprivileged environments.
- Commonly used when enhanced isolation or compliance with Open Container Initiative (OCI) standards is needed.
- May require additional configuration depending on the base image and permissions.

If your Kubernetes cluster build infrastructure is configured to run as non-root, you can [use the Buildah plugin](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot/#individual-step-root--buildah-plugin).

## Using Environment Variables to Control Build and Push Behavior


Harness CI supports flexible Docker workflows across different environments and use cases — from building-only to scanning and pushing images to multiple registries. These workflows are powered by a set of environment variables that modify the behavior of our native Build and Push steps.


### Supported Workflows at a Glance

| **Workflow**          | **Supported Builders** | **Use Case**                                 |
| --------------------- | ---------------------- | -------------------------------------------- |
| Build-only            | Kaniko, BuildX         | Build, scan, and store image without pushing |
| Push-only             | Kaniko, BuildX         | Push pre-built or scanned image              |
| Build once, push many | BuildX only            | Push same image to multiple registries       |
| Build, scan, push     | Kaniko, BuildX         | Secure builds with vulnerability scanning    |


Each workflow is controlled by specific environment variables, depending on the builder used (Kaniko or BuildX). The table below outlines the key variables and how they apply.

### Supported Environment Variables


| **Environment Variable**     | **Description**                                                                                                                                 | **Supported builder**  |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------ |------------------------|
| `PLUGIN_NO_PUSH`             | Skip pushing the image after it is built. Set as `true` for build-only mode.                                                                    | BuildX + Kaniko      |
| `PLUGIN_PUSH_ONLY`           | Set as `true` for pushing an image without rebuilding it.                                                                                       | BuildX + Kaniko      |
| `PLUGIN_BUILDX_LOAD`         | The resulting image is loaded into local Docker image store to make it available in subsequent steps                                            | BuildX only          |
| `PLUGIN_TAR_PATH`            | Used when in build-only mode to provide a path for in which to save the tarball image (if exporting as a `.tar` file).                          | BuildX + Kaniko      |
| `PLUGIN_SOURCE_TAR_PATH`     | Used when in push-only mode, to provide a Path to a local tarball image to be pushed.                                                           | BuildX + Kaniko      |
| `PLUGIN_SOURCE_IMAGE`        | Used when in push-only mode, in case you need to retag and push.                                                                                | BuildX               |
| `PLUGIN_DAEMON_OFF`          | Runs BuildX in daemonless mode, commonly used for Kubernetes builds in conjunction with a docker daemon provisioned in a Background step (DinD).| BuildX only          |



The following sections provide step-by-step examples for the following scenarios:
- **Build-only**: Build an image without pushing it.
- **Push-only**: Push a pre-built image.
- **Build once, push to multiple registries**: Push the same image to several registries in parallel.
- **Build, scan, and push**: Secure your image before pushing it.

## Build-only
In build-only mode, you build a Docker image locally without pushing it to a registry. The resulting image can be either loaded into the local Docker image store (BuildX) or saved as a tarball file (both BuildX and Kaniko), which can then be scanned or reused in later steps. This is useful for workflows that require image validation or vulnerability scanning before pushing.

<Tabs>
<TabItem value="BuildX" label="BuildX" default>

 Following are reference snippets in `build-only` mode using BuildX or Kaniko:

<Tabs>
<TabItem value="Cloud" label="Cloud">

  - Ensure Docker Layer Caching (DLC) is enabled, for BuildX to be used.
  - Use the following environment variables:
    - `PLUGIN_NO_PUSH`: `true` - skips pushing the image.
    - `PLUGIN_BUILDX_LOAD`: `true` - loads the image into local Docker Daemon.
    - `PLUGIN_TAR_PATH`: Path for saving the image as tar archive (Optional) (e.g. /folder/image.tar) - the image will be saved with the name provided. If a folder isn't provided, the image will be saved in the current working directory

```YAML
  - step: 
      type: BuildAndPushDockerRegistry
      name: docker build only
      identifier: BuildAndPushDockerRegistry_1
      spec:
        connectorRef: YOUR_DOCKER_CONNECTOR
        repo: YOUR_DOCKER_REPO_NAME
        tags:
          - v.<+pipeline.sequenceId>
        caching: true #DLC on - required for using BuildX builder.
        envVariables:
          PLUGIN_NO_PUSH: 'true' # build-only mode
          PLUGIN_TAR_PATH: /PATH/TO/TAR # (optional) set in case you wish to export a tarball file.
          PLUGIN_BUILDX_LOAD: "true"
```
</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

- To use BuildX on Kubernetes ensure either Docker Layer Caching (DLC) is enabled or the `CI_USE_BUILDX_ON_K8` feature flag is enabled.
- Use a background step with a Docker container(DinD).
- Add `/var/run` to your stage's shared paths (under Stage > Overview > Shared Paths, as shown in the snippet below).
- Use the following environment variables:
  - `PLUGIN_NO_PUSH`: `true`  - skips pushing the image.
  - `PLUGIN_TAR_PATH`: Path for saving the image as tar archive (e.g. /folder/image.tar) - the image will be saved with the name provided. If a folder isn't provided, the image will be saved in the current working directory
  - `PLUGIN_DAEMON_OFF`: `true` - for daemonless BuildX mode - needed for leveraging DinD background service. 
  - `PLUGIN_BUILDX_LOAD`: `true` - required when building an image (the resulting image is loaded into local Docker image store to make it available in subsequent steps)

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, a background step with a Docker container(DinD) is required, as shown in the snippet below
:::
```YAML
stages:
  - stage:
      name: build_only
      identifier: build_only
      type: CI
      spec:
        cloneCodebase: true
        infrastructure:
          type: KubernetesDirect
          spec:
            connectorRef: CONNECTOR
            namespace: default
            os: Linux
        execution:
          steps:
            - step:
                identifier: Background_1
                type: Background
                name: Background_1
                spec:
                  connectorRef: CONNECTOR
                  image: docker:dind
                  shell: Sh
            - step:
                identifier: BuildAndPushDockerRegistry_1
                type: BuildAndPushDockerRegistry
                name: Build only
                spec:
                  connectorRef: CONNECTOR
                  repo: REPO_NAME
                  tags:
                    - v.<+pipeline.sequenceId>
                  caching: true
                  envVariables:
                    PLUGIN_NO_PUSH: "true"
                    PLUGIN_BUILDX_LOAD: "true"
                    PLUGIN_DAEMON_OFF: "true"
        sharedPaths:
          - /var/run
```
`sharedPaths` mounts the same host path across all steps in the stage so that one step (like the DinD daemon) can write to a path (e.g., Docker socket), and another step (like BuildAndPushDockerRegistry) can read/use it.

</TabItem>
</Tabs>
</TabItem>

<TabItem value="Kaniko" label="Kaniko">

Following is a reference `build-only` YAML snippet using Kaniko on **Kubernetes**

- Use the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skips pushing the image)
  - `PLUGIN_TAR_PATH`: Path for saving the image as tar archive (Required). (e.g. /folder/image.tar)

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
            connectorRef: K8S_CONNECTOR
            namespace: default
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
                  - v.<+pipeline.sequenceId>
                envVariables:
                  PLUGIN_NO_PUSH: "true"
                  PLUGIN_TAR_PATH: image.tar
```
</TabItem>
<TabItem value="Buildah" label="Buildah">

Following is a reference `build-only` YAML snippet using Buildah on **Kubernetes**

- Use the following environment variables:
  - `dry_run`: `true` (skips pushing the image)
  - `tar_path`: Path for saving the image as tar archive (Required). (e.g. /folder/image.tar)

```YAML
- step:
    type: Plugin
    name: Build Only with Buildah
    identifier: Build_Only_with_Buildah
    spec:
      connectorRef: YOUR_DOCKER_CONNECTOR
      image: plugins/buildah-docker:1.2.2
      privileged: true
      settings:
        repo: YOUR_DOCKER_REPO
        tag: YOUR_IMAGE_TAG
        password: <+secrets.getValue("YOUR_DOCKER_SECRET")>
        username: YOUR_DOCKER_USERNAME
        dockerfile: Dockerfile
        dry_run: "true"
        tar_path: image.tar
      imagePullPolicy: Always
```
:::warning Kubernetes Requirement
When running in Kubernetes, Buildah requires privileged mode.
:::
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

- Ensure Docker Layer Caching (DLC) is enabled, for BuildX to be used.
- Use these environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
  - `PLUGIN_SOURCE_TAR_PATH`: Path to your previously built image (e.g. /folder/image.tar) - if you built a tarball image

```YAML
runtime:
  type: Cloud
  spec: {}
execution:
  steps:
    - step:
        identifier: BuildAndPushDockerRegistry_2
        type: BuildAndPushDockerRegistry
        name: Docker Push only
        spec:
          connectorRef: CONNECTOR
          repo: REPO_NAME
          tags:
            - v.<+pipeline.sequenceId>
          caching: true
          envVariables:
            PLUGIN_PUSH_ONLY: "true"

```
The examples above demonstrate push-only mode to Dockerhub on Harness Cloud. You can apply the same to other registries using the appropriate native build and push steps in the Harness CI step palette with the same environment variables.
When you build a traditional OCI image, the step uses properties like `tags`, `registry` and `repo` to properly push the image built.

</TabItem>
<TabItem value="Kubernetes" label="Kubernetes">

- Ensure either Docker Layer Caching (DLC) is enabled or the `CI_USE_BUILDX_ON_K8` feature flag is enabled, for BuildX to be used.
- Use a background step with a Docker container(DinD).
- Add `/var/run` to your stage's shared paths (under Stage > Overview > Shared Paths, as shown in the snippet below).
- Set these environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (skips building)
  - `PLUGIN_SOURCE_TAR_PATH`: Path to your previously built image (Optional). (e.g. /folder/image.tar) - if you built a tarball image
  - `PLUGIN_DAEMON_OFF`: `true` (for daemonless BuildX mode)

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, a background step with a Docker container(DinD) is required, as shown in the snippet below
:::
```YAML
stage:
  name: push_only
  identifier: push_only
  type: CI
  spec:
    cloneCodebase: true
    infrastructure:
      type: KubernetesDirect
      spec:
        connectorRef: CONNECTOR
        namespace: default
        os: Linux
    execution:
      steps:
        - step:
            identifier: Background_1
            type: Background
            name: Background_1
            spec:
              connectorRef: CONNECTOR
              image: docker:dind
              shell: Sh
        - step:
            identifier: BuildAndPushDockerRegistry_2
            type: BuildAndPushDockerRegistry
            name: Docker Push only
            spec:
              connectorRef: CONNECTOR
              repo: REPO_NAME
              tags:
                - v.<+pipeline.sequenceId>
              caching: true # not needed for push-only if `CI_USE_BUILDX_ON_K8` feature flag is enabled 
              envVariables:
                PLUGIN_PUSH_ONLY: "true"
    sharedPaths:
      - /var/run
```

This works when:
A previous step (in the stage) built the image and cached it in a shared volume or DinD.
The image must be available in the Docker daemon started in the Background_1 step (via DinD).
</TabItem>
</Tabs>
</TabItem>

<TabItem value="Kaniko" label="Kaniko">

The following is a reference push-only YAML snippet using Kaniko on **Kubernetes**

Use these environment variables:
- `PLUGIN_PUSH_ONLY`: `true` (skips building)
- `PLUGIN_SOURCE_TAR_PATH`: Path to your previously built image (e.g. /folder/image.tar)

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
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_CONNECTOR_REF
              namespace: default
              os: Linux
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
                      - v.<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_NO_PUSH: "true"
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
                      - v.<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_PUSH_ONLY: "true"
                      PLUGIN_SOURCE_TAR_PATH: image.tar
```
</TabItem>
<TabItem value="Buildah" label="Buildah">

Following is a reference `build-only` YAML snippet using Buildah on **Kubernetes**

- Use the following environment variables:
  - `push_only`: `true` (skips building)
  - `source_tar_path`: Path for saving the image as tar archive (Required). (e.g. /folder/image.tar)

```YAML
- step:
    type: Plugin
    name: Push Only with Buildah
    identifier: Push_Only_with_Buildah
    spec:
      connectorRef: YOUR_DOCKER_CONNECTOR
      image: plugins/buildah-docker:1.2.2
      privileged: true
      settings:
        repo: YOUR_DOCKER_REPO
        tag: YOUR_IMAGE_TAG
        password: <+secrets.getValue("YOUR_DOCKER_SECRET")>
        username: YOUR_DOCKER_USERNAME
        dockerfile: Dockerfile
        push_only: "true"
        source_tar_path: image.tar
      imagePullPolicy: Always
```
:::warning Kubernetes Requirement
When running in Kubernetes, Buildah requires privileged mode.
:::
</TabItem>
</Tabs>



## Build Once and Push to Multiple Registries in Parallel
This mode builds an image once and pushes it simultaneously to multiple registries(ECR, GAR, ACR and Docker) in parallel. Once an image is built, the native build and push steps expect a distinct tag for each of the images being pushed. Harness retags the image before pushing it to the registry.

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
  - `PLUGIN_SOURCE_IMAGE`: `myorg/myapp:v.<+pipeline.sequenceId>` - Source Image with tag - will be used to retag when image is built once and pushed to multiple repositories
   

```YAML
runtime:
  type: Cloud
  spec: {}
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
            - v.<+pipeline.sequenceId>
          caching: true
          envVariables:
            PLUGIN_NO_PUSH: "true"
    - parallel:
        - step:
            identifier: push_to_docker
            type: BuildAndPushDockerRegistry
            name: Docker Push only
            spec:
              connectorRef: DOCKER_CONNECTOR
              repo: myorg/myapp
              tags:
                - v.<+pipeline.sequenceId>
              caching: true
              envVariables:
                PLUGIN_PUSH_ONLY: "true"
        - step:
            identifier: push_to_ecr
            type: BuildAndPushECR
            name: Push to ECR
            spec:
              connectorRef: AWS_CONNECTOR
              region: REGION
              account: AWS_ACCOUNT_ID
              imageName: myapp
              tags:
                - v.<+pipeline.sequenceId>
              caching: true 
              envVariables:
                PLUGIN_PUSH_ONLY: "true"
                PLUGIN_SOURCE_IMAGE: myorg/myapp:v.<+pipeline.sequenceId>

```


</TabItem>

<TabItem value="Kubernetes" label="Kubernetes" default>

:::note
When the `PLUGIN_DAEMON_OFF` environment variable set to `true`, it is recommended you run a background step with a Docker container(DinD), as shown in the snippet below
:::
- Build an image in a native **Build and Push** step with the the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (Skips pushing the image during build)
  - `PLUGIN_BUILDX_LOAD`: `true` (Required) The resulting image is loaded into local Docker image store to make it available in subsequent steps.
- Create separate push steps with:
  - `PLUGIN_PUSH_ONLY`: `true` (Pushes without rebuilding)
  - `PLUGIN_SOURCE_IMAGE`: `myorg/myapp:v.<+pipeline.sequenceId>` - Source Image with tag - will be used to retag when image is built once and pushed to multiple repositories
  - `PLUGIN_DAEMON_OFF`: `true` (BuildX in daemonless mode)

```YAML
 stage:
  name: build_and_push
  identifier: build_and_push
  type: CI
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
      steps:
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
                - v.<+pipeline.sequenceId>
              envVariables:
                PLUGIN_NO_PUSH: "true"
                PLUGIN_BUILDX_LOAD: "true"
                PLUGIN_DAEMON_OFF: "true"
        - parallel:
            - step:
                identifier: push_to_docker
                type: BuildAndPushDockerRegistry
                name: Docker Push only
                spec:
                  connectorRef: DOCKER_CONNECTOR
                  repo: myorg/myapp
                  tags:
                    - v.<+pipeline.sequenceId>
                  envVariables:
                    PLUGIN_PUSH_ONLY: "true"
                    PLUGIN_DAEMON_OFF: "true"
            - step:
                identifier: push_to_ecr
                type: BuildAndPushECR
                name: Push to ECR
                spec:
                  connectorRef: AWS_CONNECTOR
                  region: REGION
                  account: AWS_ACCOUNT_ID
                  imageName: myapp
                  tags:
                    - v.<+pipeline.sequenceId>
                  envVariables:
                    PLUGIN_PUSH_ONLY: "true"
                    PLUGIN_SOURCE_IMAGE: myorg/myapp:v.<+pipeline.sequenceId>
                    PLUGIN_DAEMON_OFF: "true"

    sharedPaths:
      - /var/run
```
Summarizing the snippet above:
- DinD runs in background and exposes /var/run/docker.sock
- Build step creates an image (without pushing) and tags it as `v.<+pipeline.sequenceId>`
- Parallel steps push the same built image to:
  - Docker Registry
  - Amazon ECR - `only push_to_ecr` step uses `PLUGIN_SOURCE_IMAGE` for retag, as it was build by a build ans push step of a different Type.

</TabItem>
</Tabs>

## Build, Scan, and Push (using Kaniko on K8S)

Following is a complete workflow to build, scan for vulnerabilities and then push the image. This example is using Kaniko, but the same can be achieved using BuildX

### Setup
- Build an image in a native **Build and Push** step with the following environment variables:
  - `PLUGIN_NO_PUSH`: `true` (skip pushing the image during build)
  - `PLUGIN_TAR_PATH`: Path for saving the image (e.g. /folder/image.tar)
- Push the image with the native **Build and Push** step with the following environment variables:
  - `PLUGIN_PUSH_ONLY`: `true` (Pushes without rebuilding)
  - `PLUGIN_SOURCE_TAR_PATH`: Path to your previously built image (e.g. /folder/image.tar)

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
                      - v.<+pipeline.sequenceId>
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
                      workspace: image.tar
                      detection: manual
                      name: test-image
                      variant: v.<+pipeline.sequenceId>
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
                      - v.<+pipeline.sequenceId>
                    envVariables:
                      PLUGIN_PUSH_ONLY: "true"
                      PLUGIN_SOURCE_TAR_PATH: image.tar
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_CONNECTOR_REF
              namespace: default
              os: Linux
```

This approach separates building, scanning and pushing into distinct steps, improving security and pipeline flexibility.
To learn more, refer to the [plugin operation modes](https://github.com/drone/drone-kaniko/blob/main/README.md#operation-modes)