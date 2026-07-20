---
title: Which build infrastructure is right for me
description: Compare Harness-managed and self-managed CI build infrastructure options.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With Harness CI, you can run builds on [Harness-managed machines (Harness Cloud)](#harness-cloud) or [your own infrastructure](#bring-your-own-infrastructure).

| Harness Cloud | Self-managed machines |
| ------------- | --------------------- |
| Maintained and updated by Harness. | Maintained and updated by you or your cloud services provider. |
| Preinstalled with common software/tools.<br/>You can add additional tools at runtime. | Configuration determined by you or your cloud services provider. |
| Use build credits to cover build minutes.<br/>Default credits allowance varies by plan. | Costs vary for physical hardware maintenance, cloud services provider pricing models, or other factors. |

Learn more about each option below, including recommended use cases, supported platforms, and feature compatibility.

## Harness Cloud

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Paid plans" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

When you [use Harness Cloud](./use-harness-cloud-build-infrastructure.md), your builds run in isolation on Harness-managed machines. You can run builds at scale on Linux, Windows, and macOS machines that are preinstalled with software commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on developing software instead of maintaining build farms.

<details>
<summary>Harness Cloud advantages</summary>

* Harness-managed infrastructure. You don't need to bring or maintain your own infrastructure.
* Highly scalable.
* Quick and easy configuration. Start building in seconds.
* Linux, Windows, and macOS platforms with modifiable images.
* Usually first to receive new feature developments.
* Available for all plan tiers.

</details>

## Bring-your-own infrastructure

Self-managed build infrastructure options include local machines, Kubernetes clusters, and AWS/GCP/Azure VMs.

<details>
<summary>Local runner</summary>

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Paid plans" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

When you [use a local runner](./define-a-docker-build-infrastructure.md), also known as a Docker runner, you run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

**This option is recommended for small, limited-scale builds, such as one-off builds on your local machine. It is commonly used to build custom apps that have specific build machine requirements, such as legacy Windows apps that must be built on a custom Windows VM.**

Self-managed local build infrastructure is available with all CI plans.

</details>

<details>
<summary>Kubernetes cluster</summary>

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Paid plans" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

When you [use a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md), you can run ephemeral builds-at-scale in your own self-managed Kubernetes clusters. In this case, each CI stage executes in a pod, and the stage's steps share the pod's resources.

If you are familiar with Kubernetes, this option is relatively easy to set up and manage, but there are [some cluster configuration requirements](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md#create-a-kubernetes-cluster).

</details>

<details>
<summary>AWS/GCP/Azure VMs</summary>

<DocsTag  text="Paid plans" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

You can [run builds on self-managed AWS, GCP, or Azure VMs](/docs/category/set-up-vm-build-infrastructures)

This option can be challenging to configure and manage if you're not already familiar with managing cloud-provider VMs. However, compared to the Kubernetes cluster build infrastructure option, it allows you more freedom with Docker commands, offers native support for Windows, can support Docker builds on Windows (based on the VM configuration), and supports Linux, Windows, and macOS platforms.

While you can use an Anka registry to configure a macOS build farm, Harness recommends using [Harness Cloud](./use-harness-cloud-build-infrastructure) for macOS builds.

</details>

## Supported operating systems and architectures

The following table shows the supported operating systems and architectures for each build infrastructure option.

| Operating system | Architecture | Harness Cloud | Self-managed local runner | Self-managed Kubernetes cluster | Self-managed AWS/GCP/Azure VMs |
| -  | - | - | - | - | - |
| Linux | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Linux | arm64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| macOS | arm64 | ✅ Supported & Recommended | ✅ Supported | ❌ Not supported | 🔸 Supported, not recommended |
| Windows | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Windows | arm64 | ❌ Not supported | ❌ Not supported | ❌ Not supported | ❌ Not supported |

:::info

**Harness recommends [Harness Cloud](./use-harness-cloud-build-infrastructure) for macOS builds.**

This recommendation is due to licensing requirements and the complexity of configuring and managing macOS VMs with Anka virtualization.

With Harness Cloud, your builds run on Harness-managed machines, and you can start running builds in minutes.

:::

## Feature compatibility matrix

Some Harness CI features are not compatible with all build infrastructures or platforms. New features are rolled out for Harness Cloud first before being enabled for other build infrastructures.


| Feature | Harness Cloud | Self-managed local runner | Self-managed Kubernetes cluster | Self-managed AWS/GCP/Azure VMs |
| - | - | - | - | - |
| [Build Intelligence](docs/continuous-integration/use-ci/build-and-upload-artifacts/build-intelligence.md) | ✅ Supported - Linux only | ❌ Not supported | ✅ Supported - Linux only  | ❌ Not supported|
| [Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Test splitting](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Cache to S3/GCS](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Multilayer caching](/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Harness-managed Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) | 🔸 Not applicable | ✅ Supported - Pipeline and stage delegate selectors | ✅ Supported - Pipeline, stage, and connector delegate selectors | ❌ Not supported |
| [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Bring-your-own secret manager](/docs/platform/get-started/tutorials/add-secrets-manager) | ✅ Supported - using OIDC (or static credentials for AWS/GCP) | <!-- unknown --> | ✅ Supported | ✅ Supported |
| GitHub App support | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| [STO](/docs/security-testing-orchestration) steps/stages | ✅ Supported - Linux | ❌ Not supported | ✅ Supported | <ul><li>✅ Supported - Linux</li><li> ❌ Not supported - Windows</li></ul> |
| Plugins | ✅ Supported - Run on containers or host machine | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>🔸 Not applicable - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> |
| [GitHub Actions](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#github-actions) | ✅ Supported - GitHub Actions plugin step | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin |
| [Bitrise Workflow Steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#bitrise-integrations) | ✅ Supported - Bitrise plugin step | ❌ Not supported | ❌ Not supported | ❌ Not supported |
| Plugin output variables | ✅ Supported | ❌ Not supported | ✅ Supported | ✅ Supported |
| [Build details - Artifacts tab](/docs/continuous-integration/use-ci/viewing-builds#build-details) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [IP Allowlisting](/docs/platform/security/add-manage-ip-allowlist) | ✅ Supported for Mac, Linux, Windows | ✅ Supported | ✅ Supported | ✅ Supported |
