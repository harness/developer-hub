---
title: Use Harness Cloud build infrastructure
description: You can use Harness-managed build infrastructure for your Harness CI pipelines.
sidebar_position: 20
redirect_from:
  - /docs/continuous-integration/use-ci/optimize-and-more/queue-intelligence
---

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

With Harness Cloud, you can run builds in isolation on Harness-managed VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines. Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

* Use Cloud credits to run builds on Harness-managed infrastructure. No need to set-up and maintain the infrastructure yourself
* Starter pipelines for different programming languages.
* Blazing fast builds on Linux, macOS, and Windows.
* Get the latest features first. Harness may enable features for Harness Cloud before rolling them out to other build infrastructure options.

For a comparison of build infrastructure options, go to [Which build infrastructure is right for me](./which-build-infrastructure-is-right-for-me.md).

:::info What happens when pipelines run on Harness Cloud?

When a build runs on Harness Cloud, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.

:::

## Billing and Cloud Credits

Free plans get 2000 free Harness Cloud credits each month. 
If you're using a paid CI plan, you can purchase build credit packages.

Harness can invoice in arrears for overages. For more information about Harness Cloud billing and build credit consumption, go to [Subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt.md#harness-cloud-billing-and-cloud-credits).

Free plans require credit card validation to use Harness Cloud. If you don't want to provide a credit card, consider using [local runner build infrastructure](./define-a-docker-build-infrastructure).

## Platforms and image specifications

Harness Cloud offers Linux, macOS, and Windows platforms. To enable Windows and macOS for Harness Cloud, contact [Harness Support](mailto:support@harness.io).

Review the following image specifications for information about image components and preinstalled software.

* [Linux amd64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-amd/Ubuntu2204-Readme.md)
* [Linux arm64 image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Linux-arm/Ubuntu2204-Readme.md)
* [macOS arm64 (M1) image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/macos-14-Readme.md)
* [Windows Server 2022 (Windows amd64) image specifications](https://github.com/wings-software/harness-docs/blob/main/harness-cloud/Windows2022-Readme.md)

**You can customize the Harness Cloud build environment.** In your pipelines, you can [select specific versions of pre-installed tools](#specify-versions), ensure that a step [uses a specific version every time](#lock-versions-or-install-additional-tools), or [install additional tools and versions](#lock-versions-or-install-additional-tools) that aren't preinstalled on the Harness Cloud images. You can run these steps on the host machine or as separate Docker images.

:::info

Currently, macOS platforms for Harness Cloud are behind a feature flag with limited availability. You can [submit a request to enable the feature](https://forms.gle/CWCcuE3nxqEdFJcZ6).

:::

## Requirements for connectors and secrets

* You must use the built-in Harness Secret Manager to store connector credentials and other secrets.
* All connectors must connect through the Harness Platform, not a delegate.
* AWS connectors can't use IRSA or AssumeRole.
* GCP and Azure connectors can't use authentication that inherits credentials from the delegate.

## Use Harness Cloud

You can configure your pipelines to use Harness Cloud in minutes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Visual" label="Visual editor" default>

1. Go to the pipeline where you want to use Harness Cloud build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **Harness Cloud** and the desired **Platform**.
4. Save and run your pipeline.

</TabItem>
  <TabItem value="YAML" label="YAML editor">

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

</TabItem>
</Tabs>

:::info

Currently, macOS platforms for Harness Cloud are behind a feature flag with limited availability. You can [submit a request to enable the feature](https://forms.gle/CWCcuE3nxqEdFJcZ6).

:::

### Using Resource Classes
You can use the yaml editor to change the cloud machine size. 

:::info

Currently, specifying machine size is behind the feature flag CI_ENABLE_RESOURCE_CLASSES. You can [submit a request to enable the feature](https://forms.gle/CWCcuE3nxqEdFJcZ6).
:::

To select a resource class size, please set the desired size as value for `size` property in the CI stge cloud infrastructure runtime configuration. For example: 

```yaml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: 
              size: xlarge # optional 
```
To learn more about all available resource classes in Harness Cloud, please visit [Harness Cloud billing and cloud credits](/docs/continuous-integration/get-started/ci-subscription-mgmt.md#harness-cloud-billing-and-cloud-credits).

### Hardware Acceleration 

Harness supports hardware acceleration using nested virtualization on Linux/AMD Cloud machines.

By enabling this feature, Android SDK tools and emulators can run more efficiently within virtualized environments, making Android test execution faster and optimizing build time.

To enable this feature, set the `nestedVirtualization` property to `true` as shown below. 

:::note
* To enable `nestedVirtualization` use the YAML editor, as this option is currently unavailable in the visual editor.
* When using hardware acceleration, run your steps directly on the VM, rather than inside a container. Running inside a container is currently not supported with hardware acceleration.
* Hardware acceleration is available for all machine sizes, when using Linux with AMD architecture on Harness Cloud.
:::

```yaml
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec:
              nestedVirtualization: true
              size: xlarge # optional 
```


### Harness Cloud best practices

* Don't hardcode system environment variables. Instead, use references like `$HOME` or `$USER`.
* Don't hardcode the number of processors/threads. Instead, use commands like `nproc` to specify threads/jobs in your build and test commands.
* Don't use tools that only run on a specific cloud environment, such as `gcloud`. Harness Cloud sources its build VMs from a variety of cloud providers. It is impossible to predict which specific cloud provider hosts the Harness Cloud VM that your build uses during any single execution. Therefore, avoid using tools (such as gsutil or gcloud) that require a specific cloud provider's environment.
* Know the [requirements for connectors and secrets](#requirements-for-connectors-and-secrets).
* Know that Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, make sure you [lock versions](#lock-versions-or-install-additional-tools) to prevent your pipeline from failing when the image changes.
* Know that you can add steps to your pipeline to [specify versions of tools](#specify-versions) and [lock versions, set up environments, or install additional tools](#lock-versions-or-install-additional-tools).
* Run `apt-get update` before [installing additional software](#lock-versions-or-install-additional-tools) that might not be in the image's packages list.

### Specify versions

If a [Harness Cloud image](#platforms-and-image-specifications) has multiple versions of a tool pre-installed, you can specify the version that you want to use in a step's **Command**. For example, with the Harness Cloud macOS build infrastructure, you could use the following command in a [Run step](../run-step-settings.md) to select an Xcode version:

```
sudo xcode-select -switch /Applications/Xcode_15.1.0.app
```

:::warning

Harness Cloud machine images can change. If your pipeline relies on a specific version of a software, tool, or environment, make sure you [lock versions](#lock-versions-or-install-additional-tools) to prevent your pipeline from failing when the image changes.

:::

### Lock versions or install additional tools

If your build requires a specific version of a tool or you need to use a version/tool that isn't pre-installed on the [Harness Cloud image](#platforms-and-image-specifications), you must add a step (such as a [Run step](../run-step-settings.md) or [Plugin step](../use-drone-plugins/explore-ci-plugins.md)) to install the version/tool directly on the build machine or run a Docker image that has the required version/tool.

When installing additional tools, run `apt-get update` before installing new software that might not be in the packages list.

<details>
<summary>Example: Use an Action step to setup Java</summary>

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

You can also use the [Bitrise step](../use-drone-plugins/ci-bitrise-plugin.md) to run Bitrise Workflow Steps in your CI pipelines.

:::

</details>

<details>
<summary>Example: Use a Docker image</summary>

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

</details>

## Secure connect (private networking)

You can use Harness Cloud build infrastructure in firewalled environments. For more information, go to [Secure connector for Harness Cloud](/docs/continuous-integration/secure-ci/secure-connect).

## Queue Intelligence

With Queue Intelligence, Harness CI can queue and run build jobs in sequence when the build infrastructure receives more jobs than it can run concurrently. 

The Queue Intelligence feature introduces a `queued` state for individual builds. Builds progress through the following states:

* `pending`: Build request created and waiting for a delegate. The maximum timeout for this state is 12 hours.
* `queued`: Build request queued by a delegate. The maximum timeout for this state is 12 hours. When viewing the build in the UI, this state is indicated by a **Queued license limit reached** message.
* `running`: The delegate runs a build for each build stage in the pipeline. The maximum timeout for this state is one hour.

<!-- No longer applicable:

### Concurrency and resource limits

Your CI license `https://www.harness.io/pricing?module=ci#` determines the maximum number of concurrent builds you can run. Each account has a specified maximum that applies to all builds on all pipelines in the account. Upon hitting the concurrency limit, builds show the **Queued license limit reached** state in the UI.

If you're using a Docker build infrastructure, you also have resource limits per delegate. For example, a delegate installed on your laptop might have just enough RAM and CPU to run two builds concurrently. In the `docker-compose.yml` file, you can set the `MAX_CONCURRENCY_LIMIT` if you want to limit the number of concurrent jobs for a delegate based on the node's available resources. Note that this constraint does not apply to Harness Cloud, Kubernetes, and VM-based build infrastructures, which can scale up as needed.

-->

## Troubleshoot Harness Cloud build infrastructure

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Harness Cloud build infrastructure, including:

* [Account verification error with Harness Cloud on Free plan.](/kb/continuous-integration/continuous-integration-faqs/#account-verification-error-with-harness-cloud-on-free-plan)
* [Can't use STO steps with Harness Cloud macOS runners.](/kb/continuous-integration/continuous-integration-faqs/#cant-use-sto-steps-with-harness-cloud-macos-runners)
* [Is Harness Cloud compatible with tools like gsutil or gcloud?](/kb/continuous-integration/continuous-integration-faqs/#does-gsutil-work-with-harness-cloud)
* [Connector or delegate errors when using Harness Cloud.](/kb/continuous-integration/continuous-integration-faqs/#connector-errors-with-harness-cloud-build-infrastructure)
* [Built-in Harness Docker Connector isn't working with Harness Cloud build infrastructure.](/kb/continuous-integration/continuous-integration-faqs/#built-in-harness-docker-connector-doesnt-work-with-harness-cloud-build-infrastructure)
* [Can I use xcode for a MacOS build with Harness Cloud?](/kb/continuous-integration/continuous-integration-faqs/#can-i-use-xcode-for-a-macos-build-with-harness-cloud)
* [Can I get logs for a service running on Harness Cloud when a specific Run step is executing?](/kb/continuous-integration/continuous-integration-faqs/#can-i-get-logs-for-a-service-running-on-harness-cloud-when-a-specific-run-step-is-executing)

### Known issues

#### Harness Cloud macOS platform .netrc file can have incorrect permissions

There is a known issue impacting macOS machines on [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) due to incorrect permissions for the `.netrc` file at `/Users/anka/.netrc`. The permissions are set to `644` when they should be `600`.

This can cause errors when installing Cocoapods. If your build installs Cocoapods, uses a macOS platform on Harness Cloud build infrastructure, and fails due to an error like `Couldn't determine repo type for URL` when installing Cocoapods, then, until this issue is fixed, make sure the pipeline edits the permissions on the `.netrc` file before attempting to install Cocoapods.

#### Harness Cloud Windows platforms can fail to clone BitBucket Cloud repos

Due to a [BitBucket Cloud issue](https://jira.atlassian.com/browse/BCLOUD-23158), specific versions of BitBucket Cloud could fail to clone repos on Windows platforms running Git version 2.44.

Atlassian released a fix for this issue; however, if you use a Harness Cloud Windows platform and your build is unable to clone your BitBucket Cloud repo, do the folloiwng:

1. [Disable Clone Codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages).
2. At the beginning of your build stage, add a a [Run step](/docs/continuous-integration/use-ci/run-step-settings) that uses the `harness/drone-git` image and Git commands to clone your BitBucket cloud repo.
