---
title: Use the Bitrise step
description: Use Bitrise Workflow Steps in your Harness CI pipelines.
sidebar_position: 50
---

With the **Bitrise plugin** step (also called the **Bitrise** step), you can use [Bitrise Workflow Steps](https://bitrise.io/integrations/steps) in your Harness CI pipelines. For more information about plugins in CI pipelines, go to [Explore plugins](./explore-ci-plugins.md).

:::info

Currently, the **Bitrise plugin** step is supported for Harness Cloud build infrastructure only. For other build infrastructures, you can run [Bitrise Workflow Steps](https://bitrise.io/integrations/steps) in a Run step or write a custom plugin.

:::

## Bitrise step usage example

In the following YAML example, a Harness **Bitrise** step runs the [Android Build Bitrise step](https://bitrise.io/integrations/steps/android-build). It calls the source repo ([bitrise-steplib/bitrise-step-android-build](https://github.com/bitrise-steplib/bitrise-step-android-build)) and provides configuration parameters as described in the [Android Build README](https://github.com/bitrise-steplib/bitrise-step-android-build#android-build).

```yaml
              - step:
                  type: Bitrise
                  name: bitrise android build
                  identifier: bitrise_android_build
                  spec:
                    uses: github.com/bitrise-steplib/bitrise-step-android-build.git
                    with:
                      variant: 'debug'
                      build_type: 'apk'
```

## Bitrise step settings and specifications

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="YAML" label="YAML editor" default>

Add a `Bitrise` step to your pipeline, for example:

```yaml
              - step:
                  type: Bitrise
                  name: bitrise android build
                  identifier: bitrise_android_build
                  spec:
                    uses: github.com/bitrise-steplib/bitrise-step-android-build.git
                    with:
                      variant: 'debug'
                      build_type: 'apk'
```

The `spec` parameters define which Bitrise Step to use, the Bitrise Step inputs, and the environment variables that you want to pass in. These are configured according to the Bitrise Step's usage specifications.

* `uses:` Specify the Bitrise Steps's source repo, such as `github.com/bitrise-steplib/bitrise-step-android-build.git`.
* `with:` If required by the Bitrise Step, provide a mapping of key-value pairs representing inputs, such as `build_type: 'apk'`. For more information, go to [Settings](#settings).
* `env:` If required by the Bitrise Step, provide a mapping of environment variables to pass in. For more information, go to [Environment Variables](#environment-variables).

:::tip

If you already configured Bitrise Steps elsewhere, you can [transfer Bitrise Steps into Harness CI](#transfer-bitrise-steps-into-harness-ci).

You can use [expressions](/docs/platform/variables-and-expressions/runtime-inputs) in the `with` and `env` settings. For example, `credentials: <+stage.variables.[TOKEN_SECRET]>` uses an expression referencing a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables).

:::

</TabItem>
  <TabItem value="visual" label="Visual editor">

In the Visual editor, add the **Bitrise plugin** step to your pipeline's **Build** stage, and then populate the settings. **Name** and **Uses** are required. Refer to each Bitrise Step's documentation for information about **Settings** and **Environment Variables**.

</TabItem>
</Tabs>

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

The **Description** is optional.

### Uses

Specify the repo of the Bitrise Step that you want to use, for example `github.com/bitrise-steplib/bitrise-step-android-build.git`.

### Settings

If required by the Bitrise Step, add key-value pairs representing inputs, such as `build_type: 'apk'`. Refer to your chosen Bitrise Step's usage specifications for details about specific inputs available for the Bitrise Step that you want to use.

:::tip

* Settings keys can be supplied as fixed values or runtime input, and values can be supplied as fixed values, runtime input, or expressions. For more information, go to [Fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs).
* In the Visual editor, there are separate fields for keys and values. For example, to specify `build_type: 'apk'` in the Visual editor, you would enter `build_type` in the key field and `apk` in the value field.

:::

### Environment Variables

If required by the Bitrise Step, add key-value pairs representing environment variables that you want to pass to the Bitrise Step, such as `GITHUB_TOKEN: <+secrets.getValue("github_pat")>`.

These are *incoming* environment variables that you're passing to the Bitrise Workflow Step. These are separate from *outgoing* environment variables that might be produced by the Bitrise Step you're using. Refer to your chosen Bitrise Step's usage specifications for details about specific environment variables relevant to the Bitrise Step that you want to use.

:::tip

* You can use [fixed values, runtime inputs, or expressions](/docs/platform/variables-and-expressions/runtime-inputs) for environment variable values. For example, `<+stage.variables.[TOKEN_SECRET]>` is a variable expression [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables).
* In the Visual editor, there are separate fields for keys and values. For example, to specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` in the Visual editor, you would enter `GITHUB_TOKEN` in the key field and `<+secrets.getValue("github_pat")>` in the value field.

:::

#### Empty environment variables

:::note

Currently, support for empty environment variables in CI pipelines is behind the feature flag `CI_USE_LESS_STRICT_EVALUATION_FOR_MAP_VARS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

If your Bitrise Step requires an empty environment variable, you must contact [Harness Support](mailto:support@harness.io) to enable an [early access feature](/docs/continuous-integration/ci-supported-platforms.md#harness-ci-early-access-features) that allows empty environment variables in CI pipelines.

### Timeout

You can set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

## Transfer Bitrise Steps into Harness CI

If you already configured Bitrise Workflow Steps elsewhere, the Bitrise `inputs` mapping is equivalent to the Harness Bitrise plugin step's `spec: with:` mapping. The following table compares Bitrise `inputs` specification with the equivalent Harness `with` specification.

<table>
<tr>
<td> Bitrise `inputs` </td> <td> Harness `with` </td>
</tr>
<tr>
<td>

```
    inputs:
    - variant: debug
    - build_type: apk
```

</td>
<td>

```yaml
      with:
        variant: 'debug'
        build_type: 'apk'
```

</td>
</tr>
</table>

## Support for Bitrise Steps on VM and Local Runner Build Infrastructure

### Prerequisites for self-managed VM infrastructure

To support Bitrise steps in your self-managed VM infrastructure, your build VMs must include a few additional tools at runtime.

These tools are required for the GitHub Actions/Bitrise runners embedded within the Harness build process.

#### Required tools
Ensure that all build VMs (those provisioned by your runner) include:

- nodejs version 16 or higher

- python3 (with python pointing to python3)

- golang

- A correctly set HOME environment variable

These are prerequisites for the Bitrise step runtimes and are not automatically installed by Harness.

#### Recommended: Install via user_data script
To automate provisioning of these tools, you can inject setup commands through the runner’s `user_data` in your `pool.yml`.

Here’s an example for Linux-based VMs:

```yaml
user_data: |
  #cloud-config
  runcmd:
    - 'sed -i "1s|^|HOME=/home/ubuntu\n|" /etc/environment'
    - 'curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -'
    - 'sudo apt install -y python3 python-is-python3 nodejs golang'
```
This script:

- Initializes the `HOME` variable for login shells

- Installs the required language runtimes and tooling

- Prepares the VM to run GitHub Actions and Bitrise step definitions reliably

:::note Minimum Delegate Version

To use Bitrise step types in Harness CI, your Harness Delegate must be version 863 or later.

:::

Check out [user-data-example](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure#user-data-example) for details.

### Prerequisites for local runner

Starting with **v0.1.19**, local runners support **Bitrise** and **GitHub Action steps**.

To use this feature, make sure:

- You're using **runner version v0.1.19 or later**.
- The **feature flag** `CI_ENABLE_PLUGIN_OUTPUT_SECRETS` is **enabled**.
- The machine has **access to github.com**, since the runner downloads additional binaries during execution.
