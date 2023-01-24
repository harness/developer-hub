---
title: Which build infrastructure is right for me?
description: Compare Harness-hosted and self-hosted CI build infrastructure options.

sidebar_position: 10
---

You can run builds on Harness-hosted machines or your own infrastructure. Self-hosted build infrastructure can be local or in a Kubernetes cluster.

# Harness Cloud (Harness-hosted options)

:::info

Available with all CI plans.

:::

With Harness Cloud you can run builds in isolation on machines hosted and maintained by Harness. You can run builds at scale on Linux, Windows, and macOS machines that are preinstalled with software commonly used in CI pipelines.

Harness maintains and upgrades these machines so that you can focus on building great software instead of maintaining build infrastructure.

To use Harness Cloud, go to [Get started with Harness Cloud](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart/).

# Self-hosted options

## Local

:::info

Available with all CI plans.

:::

With the Local runner (also known as the Docker runner) you can run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

To learn more, go to [Define a local build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

## Kubernetes cluster

:::info

Available only with paid CI plans.

:::

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds at scale in your own infrastructure.

When running builds in a Kubernetes cluster, each CI stage executes in a pod, and the stage's steps share the pod's resources.

To learn more about using a Kubernetes cluster as build infrastructure, go to [Define a Kubernetes cluster build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure).

# Compatibility matrix

The following table shows which operating systems and architectures are supported by each build infrastructure option.

| Operating system | Architecture | Harness Cloud | Self-hosted local | Self-hosted Kubernetes cluster |
| -  | - | - | - | - |
| Linux | amd64 | ✅ Supported | ✅ Supported | ✅ Supported |
| Linux | arm64 | ✅ Supported | ✅ Supported | ✅ Supported |
| macOS | arm64 | ✅ Supported | ✅ Supported | ❌ Not supported |
| Windows | amd64 | 🟡 Coming soon | ✅ Supported | ✅ Supported |
| Windows | arm64 | ❌ Not supported | ❌ Not supported | ❌ Not supported |