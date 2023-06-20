---
title: Get started with Harness Cloud
description: You can run your builds on Harness-hosted VMs.
sidebar_position: 40
helpdocs_topic_id: jkh1wsvajv
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

With Harness Cloud you can run builds in isolation on Harness-hosted virtual machines (VMs). You can run builds at scale on Linux, Windows, and macOS machines that are preconfigured with the tools, packages, and settings that are commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

* Free monthly credits for up to 2,000 build minutes.
* Starter pipelines for different programming languages.
* Blazing fast builds on Linux, macOS, and Windows.
* Get the latest features first. Features may be enabled for Harness Cloud build infrastructure before rolling out to other build infrastructure options.

[Sign up now](https://harness.io/products/continuous-integration) to get started.

You can also use your own Kubernetes, VM, or local build infrastructure. For a comparison of build infrastructure options, go to [Which build infrastructure is right for me](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

## What happens when pipelines run on Harness Cloud?

During a pipeline build that uses Harness Cloud build infrastructure, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.

For more information about using Harness Cloud for your CI pipelines, including the YAML specification, go to [Use Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).

## Supported platforms

Harness Cloud offers the following operating systems and architectures:

* Linux: amd64 and arm64
* macOS: arm64 (M1)
* Windows: amd6

For more information about supported platforms, including image specifications, go to [Use Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).
