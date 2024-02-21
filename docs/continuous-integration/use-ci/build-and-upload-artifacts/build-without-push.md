---
title: Build images without pushing
description: You can build images without pushing them.
sidebar_position: 22
---

In Harness CI, you can build images without pushing them. For example, you can use your CI pipeline to test a Dockerfile from your codebase to verify that the resulting image is correct before you push it to your Docker repository.

The configuration depends on your build infrastructure:

## Harness Cloud, local runner, or self-managed VM

To build without pushing on Harness Cloud, a local runner, or a self-managed VM build infrastructure, add the following environment variable to your [Build and Push step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact):

```yaml
                    envVariables:
                      PLUGIN_DRY_RUN: true
```

## Kubernetes cluster running as root

To build without pushing on a Kubernetes cluster build infrastructure running as root, add the following environment variable to your [Build and Push step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact):

```yaml
                    envVariables:
                      PLUGIN_NO_PUSH: true
```

## Kubernetes cluster running as non-root

To build without pushing with the Buildah plugin, which is used to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md), add the following [stage variable](/docs/platform/pipelines/add-a-stage/#option-stage-variables) to the stage where you use the Buildah plugin:

```yaml
        variables:
          - name: PLUGIN_DRY_RUN
            type: String
            description: ""
            required: false
            value: "true"
```
