---
title: Which build infrastructure is right for me?
description: Compare Harness-hosted and self-hosted CI build infrastructure options.
sidebar_position: 10
---

You can run builds on Harness-hosted machines or your own infrastructure.

## Harness Cloud

With Harness Cloud, your builds run in isolation on Harness-hosted machines. You can run builds at scale on Linux, Windows, and macOS machines that are preinstalled with software commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on developing software instead of maintaining build farms.

Harness Cloud is available with all CI plans. For more information, go to [Use Harness Cloud build infrastructure](./use-harness-cloud-build-infrastructure.md).

## Self-hosted options

Self-hosted build infrastructure options include local machines, Kubernetes clusters, and VMs from Cloud providers, such as AWS.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="local" label="Local" default>
```

With the local runner, which is also known as the Docker runner, you can run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

This option is recommended for small, limited-scale builds, such as one-off builds on your local machine.

Self-hosted local build infrastructure is available with all CI plans. To learn more, go to [Set up a local runner build infrastructure](./define-a-docker-build-infrastructure.md).

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes cluster">
```

:::info

This option is available only with paid CI plans.

:::

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds-at-scale in your own infrastructure.

When running builds in a Kubernetes cluster, each CI stage executes in a pod, and the stage's steps share the pod's resources.

To learn more about using a Kubernetes cluster as build infrastructure, go to [Set up a Kubernetes cluster build infrastructure](./set-up-a-kubernetes-cluster-build-infrastructure.md).

```mdx-code-block
  </TabItem>
  <TabItem value="vms" label="Virtual machines">
```

:::info

This option is available only with paid CI plans.

:::

Your build infrastructure can use VMs from a Cloud provider, including AWS, Microsoft Azure, GCP, and Anka (for macOS build farms).

To learn more about VM build infrastructures, go to [Set up VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Supported operating systems and architectures

The following table shows the supported operating systems and architectures for each build infrastructure option.

| Operating system | Architecture | Harness Cloud | Self-hosted local runner | Self-hosted Kubernetes cluster | Self-hosted PaaS VMs |
| -  | - | - | - | - | - |
| Linux | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Linux | arm64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| macOS | arm64 (M1) | ✅ Supported | ✅ Supported | ❌ Not supported | ✅ Supported |
| Windows | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Windows | arm64 | ❌ Not supported | ❌ Not supported | ❌ Not supported | ❌ Not supported |

## Feature compatibility matrix

Some Harness CI features are not compatible with all build infrastructures or platforms. New features are rolled out for Harness Cloud first before being enabled for other build infrastructures.

| Feature | Harness Cloud | Self-hosted local runner | Self-hosted Kubernetes cluster | Self-hosted PaaS VMs |
| - | - | - | - | - |
| Test Intelligence | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Test Parallelism | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Cache Intelligence | ✅ Supported | ❌ Not supported | ❌ Not supported | ❌ Not supported |
| Remote Caching in **Build and Push** steps | ❌ Not supported | ❌ Not supported | ✅ Supported | ❌ Not supported |
| Harness Secret Manager | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Custom Secret Manager | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| GitHub App support | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| STO step in Build stage | ✅ Supported for Linux platform| ❌ Not supported | ✅ Supported | <ul><li>✅ Supported for Linux platform</li><li> ❌ Not supported for Windows</li></ul>|