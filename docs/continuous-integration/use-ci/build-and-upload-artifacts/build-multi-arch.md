---
title: Build multi-architecture images
description: You can build multi-architecture images in a CI pipeline.
sidebar_position: 21
---

This document covers methods for building multi architecture images in Harness with or without [Docker layer caching (DLC)](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching). 

## With DLC

:::info Self-Hosted Infrastructure

If you're using self-hosted infrastructure, turn on the feature flag `CI_ENABLE_DLC_SELF_HOSTED`. To enable this flag, contact [Harness Support](mailto:support@harness.io).

:::

1. Open your [Build and Push an image to Docker Registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry/) step. 
2. Select `Enable Docker Layer caching`. To learn more, go to [Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching).
2. Open the **Optional Configuration** dropdown at the bottom of the step.
3. Add a variable under **Environment Variables**.
4. Enter `PLUGIN_PLATFORM` for your **Key**. 
5. Enter your architectures as a comma separated list as your **Value**. For example, `linux/amd64,linux/arm64`.

## Without DLC

:::info Kubernetes Infrastructure

If you're using Kubernetes infrastructure, turn on the feature flag `CI_USE_BUILDX_ON_K8`. To enable this flag, contact [Harness Support](mailto:support@harness.io).

:::

1. Open your `Build and Push an image to Docker Registry` step. 
2. Open the **Optional Configuration** dropdown at the bottom of the step.
3. Add two variables under **Environment Variables**.
4. Enter `PLUGIN_PLATFORM` for your first **Key**. 
5. Then, enter your architectures as a comma separated list as your **Value**. For example, `linux/amd64,linux/arm64`.
6. Enter `PLUGIN_BUILDER_DRIVER` for your second variable's **Key**.
7. Then, enter `docker-container` for your second variable's **Value**.

## Deprecated Methods
<details>
<summary>Deprecated method of building multi-arch images on Kubernetes infrastructure</summary>

:::info

The following method for building multi-arch images is not recommended. 

:::

To build multi-architecture images in a CI pipeline, use a separate stage to build and push each architecture.

For example, the following pipeline has two stages. The two stages have similar components, but they differ according to the architecture of the image that the stage builds. Each stage has:

* A variation of a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures). Notice that each stage uses a different Kubernetes cluster connector (`infrastructure.spec.connectorRef`) and other settings due to the different architecture requirements.
* A [Run step](../run-step-settings.md) that prepares the Dockerfile.
* A [Build and Push step](./build-and-upload-an-artifact.md) that builds and uploads the image. If the images are uploaded to the same repository, use `tags` to differentiate them, such as `1.0-linux-amd64` and `1.0-linux-arm64`.

```yaml
pipeline:
  allowStageExecutions: true
  projectIdentifier: default
  orgIdentifier: default
  identifier: CI_MultiArch
  name: CI_MultiArch
  tags:
    CI: ""
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: K8
        identifier: upload
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: k8Linux
              namespace: <+input>
              runAsUser: ""
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                runAsUser: ""
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: CreateDockerFile
                  identifier: CreateDockerFile
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: alpine:latest
                    command: |-
                      touch harnessDockerfileui
                      cat > harnessDockerfileui <<- EOM
                      FROM alpine:latest AS dev-env
                      ARG foo
                      RUN echo "$foo bar"
                      ENTRYPOINT ["pwd"]

                      FROM alpine:latest AS release-env
                      ARG hello
                      RUN echo "$hello world"
                      ENTRYPOINT ["ls"]
                      EOM
                      cat harnessDockerfileui
                    resources:
                      limits:
                        memory: 100M
              - step:
                  type: BuildAndPushDockerRegistry
                  name: DockerPushStep
                  identifier: DockerPushStep
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: my-repo/ci-demo
                    tags:
                      - "1.0-linux-amd64"
                    dockerfile: harnessDockerfileui
                    target: dev-env
                    resources:
                      limits:
                        memory: 100M
    - stage:
        name: K8s Linux arm
        identifier: CI_Golden_ARM
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: k8sarm
              namespace: ci-gold-arm-delegate
              automountServiceAccountToken: true
              tolerations:
                - effect: NoSchedule
                  key: kubernetes.io/arch
                  operator: Equal
                  value: arm64
              nodeSelector:
                kubernetes.io/arch: arm64
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: CreateDockerFile
                  identifier: CreateDockerFile
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: alpine:latest
                    command: |-
                      touch harnessDockerfileui
                      cat > harnessDockerfileui <<- EOM
                      FROM alpine:latest AS dev-env
                      ARG foo
                      RUN echo "$foo bar"
                      ENTRYPOINT ["pwd"]

                      FROM alpine:latest AS release-env
                      ARG hello
                      RUN echo "$hello world"
                      ENTRYPOINT ["ls"]
                      EOM
                      cat harnessDockerfileui
                    resources:
                      limits:
                        memory: 100M
              - step:
                  type: BuildAndPushDockerRegistry
                  name: DockerPushStep
                  identifier: DockerPushStep
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: my-repo/ci-demo
                    tags:
                      - "1.0-linux-arm64"
                    dockerfile: harnessDockerfileui
                    target: dev-env
                    resources:
                      limits:
                        memory: 100M
```

</details>