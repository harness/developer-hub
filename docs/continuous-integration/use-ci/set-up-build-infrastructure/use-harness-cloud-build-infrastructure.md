---
title: Use Harness Cloud build infrastructure
description: You can use Harness-hosted build infrastructure for your Harness CI pipelines.
sidebar_position: 20
---

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

With Harness Cloud, you can run builds in isolation on Harness-hosted VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines. Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

* Free monthly credits for up to 2,000 build minutes.
* Starter pipelines for different programming languages.
* Blazing fast builds on Linux, macOS, and Windows.
* Get the latest features first. Harness may enable features for Harness Cloud before rolling them out to other build infrastructure options.

For a comparison of build infrastructure options, go to [Which build infrastructure is right for me](./which-build-infrastructure-is-right-for-me.md).

:::info What happens when pipelines run on Harness Cloud?

When a build runs on Harness Cloud, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.

:::

## Build credits

All plans get 2000 free build credits each month. For more information about Harness Cloud build credit consumption, go to [Subscriptions and licenses](../../get-started/ci-subscription-mgmt.md#harness-cloud-billing-and-build-credits).

## Requirements for connectors and secrets

* You must use the built-in Harness Secret Manager to store connector credentials and other secrets.
* All connectors must connect through the Harness Platform, not a delegate.
* AWS connectors can't use IRSA or AssumeRole.
* GCP and Azure connectors can't use authentication that inherits credentials from the delegate.

## Platforms and image specifications

Harness Cloud offers Linux, macOS, and Windows platforms. To enable Windows and macOS for Harness Cloud, contact [Harness Support](mailto:support@harness.io).

Review the following image specifications for information about image components and preinstalled software.

* [Linux amd64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md)
* [Linux arm64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md)
* [macOS arm64 (M1) image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-13-Readme.md)
* [Windows Server 2019 (Windows amd64) image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2019-Readme.md)

In your pipelines, you can [select specific versions of pre-installed tools](#specify-versions), ensure that a step [uses a specific version every time](#lock-versions-or-install-additional-tools), or [install additional tools and versions](#lock-versions-or-install-additional-tools) that aren't preinstalled on the Harness Cloud images. You can run these steps on the host machine or as separate Docker images.

### Specify versions

If a Harness Cloud image has multiple versions of a tool pre-installed, you can specify the version that you want to use in a step's **Command**. For example, with the Harness Cloud macOS build infrastructure, you could use the following command in a [Run step](../run-ci-scripts/run-step-settings.md) to select an Xcode version:

```
sudo xcode-select -switch /Applications/Xcode_14.1.0.app
```

:::caution

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, use the instructions in [Lock versions or install additional tools](#lock-versions-or-install-additional-tools) to prevent your pipeline from failing when the image changes.

:::

### Lock versions or install additional tools

If your build requires a specific version of a tool, or you need to use a version/tool that isn't pre-installed on the Harness Cloud image, you must:

* Add a step to your pipeline to install the version/tool directly on the build machine
* Add a step to your pipeline to run a Docker image that has the required version/tool.

There are a variety of steps you can use to do this, such as [Run steps](../run-ci-scripts/run-step-settings.md) or [Plugin steps](../use-drone-plugins/explore-ci-plugins.md).

#### Example: Use an Action step to setup Java

In the following YAML example, an [Action step](../use-drone-plugins/ci-github-action-step.md) runs the `actions/setup-java` GitHub Action to install a Java version, and then the **Run** step confirms the Java version.

```yaml
            steps:
              - step:
                  identifier: install_java
                  name: intall java version 17
                  type: Action
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      distribution: 'temurin'
                      java-version: '16'
              - step:
                  identifier: java_ver_check
                  name: java version check
                  type: Run
                  spec:
                    shell: Bash
                    command: |
                      JAVA_VER=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
                      if [[ $JAVA_VER == 16 ]]; then
                        echo successfully installed $JAVA_VER
                      else
                        exit 1
                      fi
```

:::tip

You can also use the [Bitrise step](../use-drone-plugins/ci-bitrise-plugin.md) to run Bitrise Integrations in your CI pipelines.

:::

#### Example: Use a Docker image

The following YAML example demonstrates how a **Run** step can use a Docker image to leverage tools that are available on the image without having to install them on the build machine.

```yaml
    - stage:
        name: Print welcome message
        identifier: welcome_message
        type: CI
        spec:
          cloneCodebase: true
          platform: ## Platform properties describe the target machine required by this stage.
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud ## This build runs on Harness-provided infrastructure.
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Welcome
                  identifier: Welcome
                  spec:
                    connectorRef: my_docker_hub  ## Specify a Docker connector to pull an image from Docker.
                    image: alpine ## If no image is specified, the step runs on the host machine.
                    shell: Sh
                    command: Echo "Welcome to Harness CI"
```

:::info

Steps running in containers can't communicate with [Background steps](../manage-dependencies/background-step-settings.md) running on Harness Cloud build infrastructure because they don't have a common host.

:::

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

To enable Harness Cloud build infrastructure in your pipeline YAML, specify the `platform` and `runtime` in the `stage.spec`. For example:

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

The following YAML example describes a basic CI pipeline that uses Harness Cloud build infrastructure:

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

You can add steps to your pipeline to specify versions of tools, set up environments, or install additional tools. For image specifications and instructions on specifying versions, locking versions, and installing additional tools, go to the [Platforms and image specifications](#platforms-and-image-specifications) section, above.

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, use the instructions in [Lock versions or install additional tools](#lock-versions-or-install-additional-tools) to prevent your pipeline from failing when the image changes.

:::

<!-- whitelist removed - DOC-2875 -->
