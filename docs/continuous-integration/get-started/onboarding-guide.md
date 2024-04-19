---
title: CI onboarding guide
description: A self-service onboarding guide for Harness CI.
sidebar_position: 4
sidebar_label: Onboarding guide
---

Harness CI simplifies the code development and testing process. In Harness CI pipelines, you model your build and test processes as CI stages. Each stage includes steps for building, testing, and pushing your code. Pipelines can be triggered manually or automatically by triggers, such as Git commits and pull requests.

This guide explains what you need to know to get started using Harness CI to build and test your code.

## Onboard to the Harness Platform

If you're new to Harness, review the [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide) and [Harness Platform key concepts](/docs/platform/get-started/key-concepts) before onboarding to CI.

## Learn about Harness CI

Learn about the features, components, and key concepts of Harness CI:

* [CI overview](./overview.md): Learn about Harness CI architecture and key features, such as Harness Intelligence and Harness Cloud.
* [CI key concepts](./key-concepts.md): Learn about common terminology and functionality in Harness CI, such as pipelines, stages, steps, plugins, and more.

## Create your first Harness CI pipeline

Learn about [creating pipelines in Harness CI](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md) and then try it for yourself:

* [Tutorial - Build on Harness Cloud](./tutorials.md)
* [Tutorial - Build on a Kubernetes cluster](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra)

### Build infrastructure options

Harness offers several build infrastructure options, including Harness-managed and self-managed options. To compare build infrastructure options, go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

Harness recommends starting with [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), which you can start using in minutes and is available for all plan tiers.

### Migrate to Harness CI

If you're migrating to Harness CI from another CI provider, review the [Harness CI migration guides](/docs/category/migrate-to-harness-ci) for useful information about converting your existing workflows to Harness CI pipelines.

## Advance your pipelines

Explore the documentation to learn what your Harness CI pipelines can do.

* [Build images, push images, and upload artifacts.](../use-ci/build-and-upload-artifacts/build-and-upload-an-artifact)
* [Use caching](/docs/category/share-and-cache-ci-data) and [manage dependencies](/docs/category/manage-dependencies).
* Run [scripts](../use-ci/run-step-settings.md) and [tests](/docs/category/run-tests).
* [Use plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) and [write your own plugins](../use-ci/use-drone-plugins/custom_plugins.md).

:::tip

With Harness CI, you can build and test code in any language. For guidance on some popular languages and platforms, check out the [CI development guides](/docs/category/development-guides).

:::

## Check your license and build credit usage

Your Harness CI subscription includes a number of developer licenses and build credits. It's important to understand your [license and build credit usage](./ci-subscription-mgmt.md#license-and-build-credit-usage).

If you plan to use [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md), it's important to understand [Harness Cloud billing and build credits](./ci-subscription-mgmt.md#harness-cloud-billing-and-build-credits).

## Become a Harness Certified Expert

There are three tiers of [Harness CI certifications](/university/continuous-integration).

* **Developer certification:**: The [CI Developer certification](/university/continuous-integration) is the starting point for evaluating your understanding of Harness CI.
* **Administrator certification:** Building on the CI Developer certification, the [CI Administrator certification](/university/continuous-integration) tests your skills across CI and the Harness Platform.
* **Architect certification:** Building upon the CI Administrator certification, the [CI Architect certification](/university/continuous-integration) goes further into design, implementation, and management of CI.
