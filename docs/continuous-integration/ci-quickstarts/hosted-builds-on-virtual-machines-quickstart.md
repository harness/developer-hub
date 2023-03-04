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

The following YAML is for a pipeline with one CI stage that contains a __Run__ step executing an `echo` command. Here are some important notes about this YAML example:

* `platform`: Found in the stage's `spec` section. `platform` properties define the target machine that the stage runs on.
* `type: Cloud`: Found in the stage's `runtime` specification. `Cloud` indicates that this stage runs on Harness-hosted infrastructure.
* `connectorRef: my_dockerhub`: In a step's `spec` section, this optional connector reference identifies a Docker connector that contains Docker credentials and is used to pull the image from Docker for a specific step.
* `image: alpine`: In a step's `spec` section, you have the option to specify an image to use for that step. If unspecified, the step runs on the stage's host machine.

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

## Platforms and image specifications

Harness Cloud offers the following operating systems and architectures:

* Linux, amd64 and arm64
* macOS, arm64 (M1)
* Windows, amd6

:::note

Currently, Windows and macOS for Harness Cloud are behind feature flags. If these options are not available when configuring your pipeline's build infrastructure, contact [Harness Support](mailto:support@harness.io) to enable the feature flags.

:::

Refer to the following image specification README files for more information about image components and preinstalled software.

* [Linux image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Ubuntu2204-Readme.md)
* [macOS image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-12-Readme.md)
* [Windows image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md)

If your build requires a tool that isn't already available on the VM, you can use, for example, a Run step or Background step, to  install it directly or run it in a Docker image. This is demonstrated in the [sample pipeline](#sample-pipeline), above. It is important to note that steps running in containers cannot communicate with [Background steps](../ci-technical-reference/background-step-settings.md) running on the Harness Cloud build infrastructure, because they do not have a common host.

If there are multiple versions of a tool installed, you can specify the version to use, as demonstrated in the following YAML sample.

<details>
<summary>Example: Specify the Java version on Harness Cloud build infrastructure</summary>

```yaml
 pipeline:
  identifier: ci_pipeline
  name: "pipeline with multi tool java success"
  stages:
    - stage:
        identifier: multi_tool_java_success
        name: multi tool java success
        type: CI
        spec:
          execution:
            steps:
              - step:
                  identifier: install_java
                  name: intall java version 17
                  type: Action
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      distribution: 'zulu' # See 'Supported distributions' for available options
                      java-version: '17'
              - step:
                  identifier: java_ver_check
                  name: java version check
                  type: Run
                  spec:
                    shell: Bash
                    command: |
                      JAVA_VER=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
                      if [[ $JAVA_VER == 17 ]]; then
                        echo successfully installed $JAVA_VER
                      else
                        exit 1
                      fi
          infrastructure:
            type: VM
            spec:
              type: Pool
              spec:
                identifier: test
          cloneCodebase: false
```

</details>

## Build private repos with Harness Cloud

You can use Harness Cloud build infrastructure with private repositories. If your codebase is behind a firewall, you must whitelist the following IPs in your firewall:

```
35.247.122.103
34.127.37.47
35.233.166.205
34.94.180.31
34.102.88.236
34.94.194.4
34.82.155.149
34.83.51.28
35.230.70.231
34.105.92.100
35.233.187.42
35.247.6.7
34.83.106.43
34.168.179.66
34.145.10.183
35.197.78.109
```

## Other notes

Keep in mind the following when running builds on Harness Cloud infrastructure:

* You must use Harness Secret Manager to store connector credentials and other secrets.
* All connectors must connect through the Harness Platform, not the delegate.
* AWS connectors cannot use IRSA or AssumeRole.
* GCP and Azure connectors cannot inherit credentials from the delegate.
* Remote caching is not supported for **Build and Push** steps.
* Steps running in containers cannot communicate with Background steps running on the Harness Cloud build infrastructure