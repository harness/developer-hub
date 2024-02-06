---
title: Which build infrastructure is right for me
description: Compare Harness-hosted and self-hosted CI build infrastructure options.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can run builds on Harness-hosted machines or your own infrastructure.

## Harness-hosted builds (Harness Cloud)

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

With Harness Cloud, your builds run in isolation on Harness-hosted machines. You can run builds at scale on Linux, Windows, and macOS machines that are preinstalled with software commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on developing software instead of maintaining build farms.

:::info Harness Cloud advantages

* Harness-hosted infrastructure. You don't need to bring or maintain your own infrastructure.
* Highly scalable.
* Quick and easy configuration. Start building in seconds.
* Linux, Windows, and macOS platforms with modifiable images.

:::

Harness Cloud is available with all CI plans. For more information, go to [Use Harness Cloud build infrastructure](./use-harness-cloud-build-infrastructure.md).

## Self-hosted builds

Self-hosted build infrastructure options include local machines, Kubernetes clusters, and VMs from Cloud providers, such as AWS.

### Local runners

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

With the local runner, also known as the Docker runner, you can run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

This option is recommended for small, limited-scale builds, such as one-off builds on your local machine. It is commonly used to build custom apps that have specific build machine requirements, such as legacy Windows apps that must be built on a custom Windows VM.

Self-hosted local build infrastructure is available with all CI plans. To learn more, go to [Set up a local runner build infrastructure](./define-a-docker-build-infrastructure.md).

### Kubernetes clusters

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds-at-scale in your own infrastructure.

When running builds in a Kubernetes cluster, each CI stage executes in a pod, and the stage's steps share the pod's resources.

If you are familiar with Kubernetes, this option is relatively easy to set up and manage, but there are some configuration requirements. For example, macOS [platforms](#supported-operating-systems-and-architectures) are not supported, the built-in [Build and Push steps require root access](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md#kubernetes-cluster-build-infrastructures-require-root-access) and [privileged mode is required for Docker-in-Docker](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md#privileged-mode-is-required-for-docker-in-docker).

To learn more about using a Kubernetes cluster as build infrastructure, go to [Set up a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

### Cloud provider virtual machines

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Your build infrastructure can use VMs from a Cloud provider, including AWS, Microsoft Azure, GCP, and Anka (for macOS build farms).

This is the most difficult build infrastructure option to configure and manage. However, compared to the Kubernetes cluster build infrastructure option, it allows you more freedom with Docker commands, offers native support for Windows, can support Docker builds on Windows (based on the VM configuration), and supports Linux, Windows, and macOS platforms.

To learn more about VM build infrastructures, go to [Set up VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

## Supported operating systems and architectures

The following table shows the supported operating systems and architectures for each build infrastructure option.

| Operating system | Architecture | Harness Cloud | Self-hosted local runner | Self-hosted Kubernetes cluster | Self-hosted Cloud provider VMs |
| -  | - | - | - | - | - |
| Linux | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Linux | arm64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| macOS | arm64 (M1) | ✅ Supported | ✅ Supported | ❌ Not supported | ✅ Supported |
| Windows | amd64 | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| Windows | arm64 | ❌ Not supported | ❌ Not supported | ❌ Not supported | ❌ Not supported |

## Feature compatibility matrix

Some Harness CI features are not compatible with all build infrastructures or platforms. New features are rolled out for Harness Cloud first before being enabled for other build infrastructures.

| Feature | Harness Cloud | Self-hosted local runner | Self-hosted Kubernetes cluster | Self-hosted Cloud provider VMs |
| - | - | - | - | - |
| [Test Intelligence](/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Test splitting](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) | <ul><li>✅ Supported - Linux, Windows</li><li>❌ Not supported - macOS</li></ul>| ❌ Not supported | ❌ Not supported | ❌ Not supported |
| [Cache to S3/GCS](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Multilayer caching](/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching) in **Build and Push** steps | ✅ Supported | ❌ Not supported | ✅ Supported | ❌ Not supported |
| [Delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) | 🔸 Not applicable | ✅ Supported - Pipeline and stage delegate selectors | ✅ Supported - Pipeline, stage, and connector delegate selectors | ❌ Not supported |
| [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Bring-your-own secret manager](/docs/platform/secrets/secrets-management/add-secrets-manager) | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| GitHub App support | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| [STO](/docs/security-testing-orchestration) steps/stages | ✅ Supported - Linux | ❌ Not supported | ✅ Supported | <ul><li>✅ Supported - Linux</li><li> ❌ Not supported - Windows</li></ul> |
| Plugins | ✅ Supported - Run on containers or host machine | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>🔸 Not applicable - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> |
| [GitHub Actions](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#github-actions) | ✅ Supported - GitHub Actions plugin step | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin |
| [Bitrise Integrations](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#bitrise-integrations) | ✅ Supported - Bitrise plugin step | ❌ Not supported | ❌ Not supported | ❌ Not supported |
| Plugin output variables | ✅ Supported | ❌ Not supported | ✅ Supported | ✅ Supported |
| [Build details - Artifacts tab](/docs/continuous-integration/use-ci/viewing-builds#build-details) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |

## Pros and cons comparison

| Build infrastructure | Pros | Cons | Best For |
| - | - | - | - |
| [Harness Cloud](#harness-hosted-builds-harness-cloud) | <ul><li>Harness-hosted infrastructure. No need to manage your own build machines.</li><li>Highly scalable.</li><li>Quick and easy configuration.</li><li>Linux, Windows, and macOS platforms with modifiable images.</li><li>Available to all CI plan tiers.</li></ul> | <ul><li>Not recommended for highly-customized build environments. While you can [modify Harness Cloud runner images](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#specify-versions), these runner modifications are temporary, and Harness can update the [runner images](./use-harness-cloud-build-infrastructure.md#platforms-and-image-specifications) at any time. <b>If you need a highly-specific build machine configuration, consider using your own [self-hosted local runner](#local-runners) with a static configuration that you manage.</b></li><li>Requires credit card validation for Free plans. If you don't want to provide a credit card, you can use the [self-hosted local runner build infrastructure](#local-runners).</li><li>Requires build credits. All accounts get 2000 free monthly build credits, with the option to purchase more credits.</li></ul> | Getting started fast. |
| [Self-hosted local runner](#local-runners) | <ul><li>Build on your local machine.</li><li>High degree of stability and control over the build machine configuration.</li><li>Available to all CI plan tiers.</li></ul> | <ul><li>Not scalable.</li><li>Limited to the resources/capacity constraints of the host machine.</li></ul> | Building custom apps that have specific build machine requirements.|
| [Self-hosted Kubernetes cluster](#kubernetes-clusters) | <ul><li></li></ul> | <ul><li></li></ul> | <ul><li>Users who want to bring their own Kubernetes cluster build environment.</li><li>Users that run builds extremely frequently and don't want to be constrained by Harness Cloud build credits.</li></ul> |
| [Self-hosted Cloud provider VMs](#cloud-provider-virtual-machines) | <ul><li></li></ul> | <ul><li></li></ul> | <ul><li>Users who want to manage their own VM pool and have more control over the VM specs.</li><li>Users that run builds extremely frequently and don't want to be constrained by Harness Cloud build credits.</li></ul> |
