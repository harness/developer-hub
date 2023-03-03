---
title: Get started with Harness Cloud
description: You can run your build on Harness-hosted VMs.
sidebar_position: 10
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
* Blazing fast builds.
* Hosted runners to run builds on Linux, macOS, or Windows.

[Sign up now](https://harness.io/products/continuous-integration) to get started.

For a comparison of build infrastructure options, go to [Which build infrastructure is right for me?](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md)

## What happens when pipelines run on Harness Cloud?

During a pipeline build that uses Harness Cloud build infrastructure, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.

### Sample pipeline

The following YAML shows a pipeline with one CI stage that contains a __Run__ step executing an `echo` command. The `platform` property defines the target machine where the stage is executed:

```yaml
 pipeline:
  projectIdentifier: Docs
  orgIdentifier: default
  identifier: Hello_World
  name: Hello World
  properties:
    ci:
      codebase:
        connectorRef: account.Github
        repoName: keen-software/jhttp
        build: <+input>
  stages:
    - stage:
        name: Print welcome message
        identifier: welcome_message
        type: CI
        spec:
          cloneCodebase: true
          platform: // Platform properties describe the target machine required by this stage.
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud // This build runs on Harness-provided infrastructure.
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Welcome
                  identifier: Welcome
                  spec:
                    connectorRef: my_dockerhub // (Optional) The Docker connectors hold your Docker credentials to pull the image from Docker.
                    image: alpine // (Optional) If no image is specified, the step runs on the host machine,
                    shell: Sh
                    command: Echo "Welcome to Harness CI"
```

Here are some important notes about this YAML example:

* `platform`: Found in the stage's `spec` section, platform properties describe the target machine required by this stage.
* `type: Cloud`: Found in the stage's `runtime` specification, `Cloud` indicates that this stage runs on Harness-hosted infrastructure.
* `connectorRef: my_dockerhub`: In a step's `spec` section, this optional connector reference identifies a Docker connector that contains Docker credentials and is used to pull the image from Docker for a specific step.
* `image: alpine`: In a step's `spec` section, you have the option to specify an image to use for that step. If unspecified, the step runs on the stage's host machine.

## Platforms and image specifications

Harness Cloud offers the following operating systems and architectures. Refer to the image specifications for more information about image components and preinstalled software:

* Linux amd64 and arm64 ([Linux image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Ubuntu2204-Readme.md))
* macOS arm64 (M1) ([macOS image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-12-Readme.md))
* Windows amd64 ([Windows image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md))

:::note

Currently, Windows and macOS for Harness Cloud are behind feature flags. If these options are not available when configuring your pipeline's build infrastructure, contact [Harness Support](mailto:support@harness.io) to enable the feature flags.

:::
