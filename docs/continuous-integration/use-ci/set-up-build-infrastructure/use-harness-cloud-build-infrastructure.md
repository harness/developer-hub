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

## Requirements

* You must use Harness Secret Manager to store connector credentials and other secrets.
* All connectors must connect through the Harness Platform, not the delegate.
* AWS connectors can't use IRSA or AssumeRole.
* GCP and Azure connectors can't inherit credentials from the delegate.

## Platforms and image specifications

Harness Cloud offers the following operating systems and architectures:

* Linux: amd64 and arm64
* macOS: arm64 (M1)
* Windows: amd64

:::tip

To enable Windows and macOS for Harness Cloud, contact [Harness Support](mailto:support@harness.io).

:::

Refer to the following image specification README files for more information about image components and preinstalled software.

* [Linux amd64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md)
* [Linux arm64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md)
* [macOS image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-12-Readme.md)
* [Windows Server 2019 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2019-Readme.md)

You can include steps in your pipeline to specify a version of a tool installed on an image, lock the stage to a required version, or install additional tools and versions that aren't available on the image. These steps run on the host machine or run as separate Docker images.

:::caution

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, use the instructions in **Lock versions or install additional tools** to prevent your pipeline from failing when the image changes.

:::

<details>
<summary>Specify versions</summary>

If there are multiple versions of a tool installed on an image, you can specify the version to use in a step's **Command**.

For example, with the Harness Cloud macOS build infrastructure, you could use the following command in a **Run** step to select an Xcode version:

```
sudo xcode-select -switch /Applications/Xcode_14.1.0.app
```

:::caution

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, use the instructions in **Lock versions or install additional tools** to prevent your pipeline from failing when the image changes.

:::

</details>

<details>
<summary>Lock versions or install additional tools</summary>

If your build requires a specific version of a tool or a tool that isn't already available on the Harness Cloud image, you can use a step to install it directly or run it in a Docker image. There are a variety of steps you can use to do this, such as:

* [Run step](../../ci-technical-reference/run-step-settings.md)
* [Background step](../../ci-technical-reference/background-step-settings.md)
* [GitHub Action plugin step](../../ci-technical-reference/ci-github-action-step.md)
* [Bitrise plugin step](../../ci-technical-reference/ci-bitrise-plugin.md)
* [Plugin step](../../ci-technical-reference/plugin-step-settings-reference.md)

:::tip

Use the [Bitrise plugin step](../../ci-technical-reference/ci-bitrise-plugin.md) to run Bitrise Integrations in your CI pipelines.

:::

In the following YAML example, an `Action` step runs the `actions/setup-java` GitHub Action to load Java 17, and then the **Run** step confirms the Java version.

```yaml
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
```

The following YAML example demonstrates how a **Run** step can use a Docker image (specified in `conectorRef` and `image`) to leverage tools available on that image that aren't available on the host image:

```yaml
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
                    connectorRef: my_dockerhub // Specify a Docker connector to pull an image from Docker.
                    image: alpine // If no image is specified, the step runs on the host machine.
                    shell: Sh
                    command: Echo "Welcome to Harness CI"
```

:::caution

Steps running in containers can't communicate with [Background steps](../../ci-technical-reference/background-step-settings.md) running on the Harness Cloud build infrastructure, because they do not have a common host.

:::

</details>

## Use Harness Cloud

You can start using Harness Cloud in minutes.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual editor" default>
```

1. Go to the pipeline where you want to use Harness Cloud build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **Harness Cloud** and the desired **Platform**.
4. Save and run your pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML editor">
```

To enable Harness Cloud build infrastructure in your pipeline YAML, specify the `platform` and `runtime` in the `stage: spec:`. For example:

```yaml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

* In `runtime`, you must include `type: Cloud`.
* In `platform`, specify the `os` and `arch`. For a list of supported operating systems and architectures, go to [Platforms and image specifications](#platforms-and-image-specifications).

<details>
<summary>Pipeline YAML example</summary>

The following YAML example illustrates a basic CI pipeline that uses Harness Cloud build infrastructure:

```yaml
pipeline:
  name: Build sample-app
  identifier: Build_sample_app_1677210779657
  projectIdentifier: my-app-project
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: account.GitHub_example
        repoName: my-gh-account/example-repo
        build: <+input>
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Echo Welcome Message
                  identifier: Echo_Welcome_Message
                  spec:
                    shell: Sh
                    command: echo "Welcome to Harness CI"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

</details>

```mdx-code-block
  </TabItem>
</Tabs>
```

:::info

Add steps to your pipeline to specify versions of tools, set up environments, or install additional tools. For image specifications and instructions on specifying versions, locking versions, and installing additional tools, go to the [Platforms and image specifications](#platforms-and-image-specifications) section, above.

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, use the instructions to **Lock versions or install additional tools** in [Platforms and image specifications](#platforms-and-image-specifications) to prevent your pipeline from failing when the image changes.

:::

## Build private repos with Harness Cloud

:::danger

Whitelisting is only required if your code repository, Docker registry, or Artifactory registry isn't accessible by direct connection over the internet, such as those that are behind firewalls.

:::

You can use Harness Cloud build infrastructure with private repositories. However, if your codebase repository or Docker/Artifactory registry is not publicly accessible, you must whitelist the following IPs in your firewall:

<!-- keep space between because users copy 1x1 -->
```text
34.171.8.178

34.172.44.211

34.28.94.170

34.82.176.50

35.199.170.16

35.247.53.82

34.94.207.230

34.94.194.45

34.102.51.149

34.94.56.103

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

35.247.11.84

34.168.91.26

35.230.82.250

35.247.57.139

34.83.191.187

34.127.8.91

35.247.40.237
```
