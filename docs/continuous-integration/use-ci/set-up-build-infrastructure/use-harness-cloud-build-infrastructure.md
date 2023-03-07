---
title: Use Harness Cloud build infrastructure
description: You can use Harness-hosted build infrastructure for your Harness CI pipelines.

sidebar_position: 20
helpdocs_topic_id: ia5dwx5ya8
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

With Harness Cloud you can run builds in isolation on Harness-hosted VMs that are preconfigured with the tools, packages, and settings commonly used in CI pipelines. Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

This topic describes how to use Harness-hosted build infrastructure for your Harness CI pipelines, as well as information about machine specifications, special considerations, and additional configuration required for certain use cases.

For more information about the Harness Cloud architecture, go to [Get started with Harness Cloud](../../ci-quickstarts/hosted-builds-on-virtual-machines-quickstart.md). For a comparison of build infrastructure options, go to [Which build infrastructure is right for me?](./which-build-infrastructure-is-right-for-me.md)

## Platforms and image specifications

Harness Cloud offers the following operating systems and architectures:

* Linux, amd64 and arm64
* macOS, arm64 (M1)
* Windows, amd6

:::tip

You can use Bitrise plugins with the macOS platform on Harness Cloud build infrastructure.

Currently, Windows and macOS for Harness Cloud are behind feature flags. If these options are not available when configuring your pipeline's build infrastructure, contact [Harness Support](mailto:support@harness.io) to enable the feature flags.

:::

Refer to the following image specification README files for more information about image components and preinstalled software.

* [Linux image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Ubuntu2204-Readme.md)
* [macOS image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-12-Readme.md)
* [Windows image specifications README.md](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md)

<details>
<summary>Specify versions</summary>

If there are multiple versions of a tool installed, you can specify the version to use, as demonstrated in the following YAML example where a Java version is specified.

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

<details>
<summary>Install additional tools</summary>

If your build requires a tool that isn't already available on the VM, you can use a step, such as a **Run** step or **Background** step, to install it directly or run it in a Docker image. An additional Docker image is used in the [configuration-as-code YAML example](#configuration-as-code-yaml-example).

However, note that steps running in containers can't communicate with [Background steps](../../ci-technical-reference/background-step-settings.md) running on the Harness Cloud build infrastructure, because they do not have a common host.

</details>

## Use Harness Cloud

You can start using Harness Cloud in minutes:

1. Go to the pipeline where you want to use Harness Cloud build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **Harness Cloud** and the desired **Platform**.
4. Save and run your pipeline.

### Requirements

* You must use Harness Secret Manager to store connector credentials and other secrets.
* All connectors must connect through the Harness Platform, not the delegate.
* AWS connectors can't use IRSA or AssumeRole.
* GCP and Azure connectors can't inherit credentials from the delegate.
* **Build and Push** steps can't use remote caching.
* Steps running in containers can't communicate with **Background** steps running on the Harness Cloud build infrastructure.

### Configuration-as-code: YAML example

The following YAML example illustrates the YAML specification for Harness Cloud build infrastructure. This pipeline contains a Build (`type: CI`) stage that contains a __Run__ step executing an `echo` command. Here are some important notes about this YAML example and the YAML specification for Harness Cloud build infrastructure:

* `platform`: Found in `stage: spec:`, the `platform` properties define the target machine that the stage runs on. In this example, the pipeline uses a Linux amd64 machine.
* `type: Cloud`: Found in `stage: spec: runtime:`, the value `Cloud` indicates that this stage runs on Harness-hosted infrastructure.
* `connectorRef: my_dockerhub`: In `step: spec:`, this optional connector reference identifies a Docker connector that contains Docker credentials and is used to pull an image from Docker for a specific step. This is useful
* `image: alpine`: In `step: spec:`, you have the option to specify an image to use for that step. If unspecified, the step runs on the stage's host machine.

<details>
<summary>Example: CI pipeline using Harness Cloud build infrastructure</summary>

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

</details>

## Build private repos with Harness Cloud

You can use Harness Cloud build infrastructure with private repositories. If your codebase or Docker registry are not publicly accessible, you must whitelist the following IPs in your firewall:

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
