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

Harness Cloud is available with all CI plans. For more information, go to [Use Harness Cloud build infrastructure](./use-harness-cloud-build-infrastructure.md).

## Self-hosted builds

Self-hosted build infrastructure options include local machines, Kubernetes clusters, and VMs from Cloud providers, such as AWS.

### Local runners

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

With the local runner, which is also known as the Docker runner, you can run builds on a local machine. You can execute build steps in Docker containers or directly on the host machine.

This option is recommended for small, limited-scale builds, such as one-off builds on your local machine.

Self-hosted local build infrastructure is available with all CI plans. To learn more, go to [Set up a local runner build infrastructure](./define-a-docker-build-infrastructure.md).

### Kubernetes clusters

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Executing builds in a Kubernetes cluster is useful when you want to run ephemeral builds-at-scale in your own infrastructure.

When running builds in a Kubernetes cluster, each CI stage executes in a pod, and the stage's steps share the pod's resources.

To learn more about using a Kubernetes cluster as build infrastructure, go to [Set up a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

### Cloud provider virtual machines

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Your build infrastructure can use VMs from a Cloud provider, including AWS, Microsoft Azure, GCP, and Anka (for macOS build farms).

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
| [Delegate selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors) | 🔸 Not applicable | ✅ Supported - Pipeline and stage delegate selectors | ✅ Supported - Pipeline, stage, and connector delegate selectors | ❌ Not supported |
| [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| [Bring-your-own secret manager](/docs/platform/secrets/secrets-management/add-secrets-manager) | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| GitHub App support | ❌ Not supported | <!-- unknown --> | ✅ Supported | ✅ Supported |
| [STO](/docs/security-testing-orchestration) steps/stages | ✅ Supported - Linux | ❌ Not supported | ✅ Supported | <ul><li>✅ Supported - Linux</li><li> ❌ Not supported - Windows</li></ul> |
| Plugins | ✅ Supported - Run on containers or host machine | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>🔸 Not applicable - Run on host machine</li></ul> | <ul><li>✅ Supported - Run on containers</li><li>❌ Not supported - Run on host machine</li></ul> |
| [GitHub Actions](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#github-actions) | ✅ Supported - GitHub Actions plugin step | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin | ✅ Supported - Drone plugin |
| [Bitrise Integrations](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins#bitrise-integrations) | ✅ Supported - Bitrise plugin step | ❌ Not supported | ❌ Not supported | ❌ Not supported |
| Plugin output variables | ✅ Supported | ❌ Not supported | ✅ Supported | ✅ Supported |
| [Build details - Artifacts tab](/docs/continuous-integration/use-ci/viewing-builds#build-details) | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
