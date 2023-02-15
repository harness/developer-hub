---
title: Which build infrastructure is right for me?
description: Compare Harness-hosted and self-hosted CI build infrastructure options.
sidebar_position: 10
---

You can run builds on Harness-hosted machines or your own infrastructure.

## Harness Cloud (Harness-hosted option)

With Harness Cloud you can run builds in isolation on Harness-hosted machines. You can run builds at scale on Linux, Windows, and macOS machines that are preinstalled with software commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on building great software instead of maintaining build infrastructure.

Harness Cloud is available with all CI plans. For more information, go to [Get started with Harness Cloud](../../ci-quickstarts/hosted-builds-on-virtual-machines-quickstart.md).

## Self-hosted options

Self-hosted build infrastructure can be local or in a Kubernetes cluster.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="local" label="Local" default>
```

With the local runner, which is also known as the Docker runner, you can run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

Self-hosted local build infrastructure is available with all CI plans. To learn more, go to [Define a local build infrastructure](./define-a-docker-build-infrastructure.md).

```mdx-code-block
  </TabItem>
  <TabItem value="k8s" label="Kubernetes cluster">
```

:::info

This option is available only with paid CI plans.

:::

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds at scale in your own infrastructure.

When running builds in a Kubernetes cluster, each CI stage executes in a pod, and the stage's steps share the pod's resources.

To learn more about using a Kubernetes cluster as build infrastructure, go to [Define a Kubernetes cluster build infrastructure](./set-up-a-kubernetes-cluster-build-infrastructure.md).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Supported operating systems and architectures

The following table shows which operating systems and architectures that each build infrastructure option supports.

| Operating system | Architecture | Harness Cloud | Self-hosted local | Self-hosted Kubernetes cluster |
| -  | - | - | - | - |
| Linux | amd64 | ✅ Supported | ✅ Supported | ✅ Supported |
| Linux | arm64 | ✅ Supported | ✅ Supported | ✅ Supported |
| macOS | arm64 | ✅ Supported | ✅ Supported | ❌ Not supported |
| Windows | amd64 | ✅ Supported | ✅ Supported | ✅ Supported |
| Windows | arm64 | ❌ Not supported | ❌ Not supported | ❌ Not supported |