---
title: Build-only or Push-only Options for Docker Images 
description: You can build images without pushing them Or push a pre-built image without building.
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There might be cases where you want to build a Docker image without pushing the image to an image registry. A common example is to build an image locally and scan the image for vulnerabilities and only push the image once it's scanned and verified. 

In Harness CI, you can build container images without pushing them. This can be achieved by passing an environment variable to the **Build and Push** steps to modify their default behavior, which is to build and push the image in the same step execution.

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

Refer to the following pipeline example for building an image (build-only), then running a Trivy image scan, and then pushing the image (push-only).

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

These new flags enhance the plugin's image handling capabilities when pushing to Docker Registry or ECR:

- `PLUGIN_PUSH_ONLY` – Enables pushing a pre-built image tarball without running a build.

- `PLUGIN_SOURCE_TAR_PATH` – Used in conjunction with push-only mode to specify the source tarball.

- `PLUGIN_TAR_PATH` (or `PLUGIN_DESTINATION_TAR_PATH`) – Use during the build only phase in conjunction with `PLUGIN_NO_PUSH` to set the output image tarball's name and location.

To learn more, refer to the [plugin operation modes](https://github.com/drone/drone-kaniko/blob/main/README.md#operation-modes).

These additions enable more flexible workflows by allowing the separation of build and push operations. 
:::note
- The following environment variables are currently supported when using Kaniko as a build tool. Buildx is not currently supported.
- This is only supported for these **Build and Push** steps 
    - **Build and Push to Docker Registry**
    - **Build and Push to ECR**
:::
