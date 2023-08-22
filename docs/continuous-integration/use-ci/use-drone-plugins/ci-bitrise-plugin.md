---
title: Use the Bitrise plugin step
description: Use Bitrise Integrations in your Harness CI pipelines.
sidebar_position: 50
---


With the **Bitrise plugin** step, you can use [Bitrise Integrations](https://bitrise.io/integrations/steps) in your Harness CI pipelines. For more information about plugins in CI pipelines, go to [Explore plugins](./explore-ci-plugins.md).

:::info

Currently, the **Bitrise plugin** step is supported for the Harness Cloud build infrastructure only.

:::

## Usage example

In the following YAML example, a **Bitrise plugin** step uses the [Bitrise Android Build step](https://bitrise.io/integrations/steps/android-build). It calls the source repo ([bitrise-steplib/bitrise-step-android-build](https://github.com/bitrise-steplib/bitrise-step-android-build)) and provides configuration parameters as described in the [Android Build README](https://github.com/bitrise-steplib/bitrise-step-android-build#android-build).

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

## Settings and specifications

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML editor" default>
```

To add a **Bitrise plugin** step to your pipeline YAML, add a `Bitrise` step, for example:

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

The `spec` parameters define which Bitrise Integration to use, Bitrise Integration inputs, and environment variables that you want to pass to the Integration. These are configured according to the Integration's usage specifications.

* `uses:` Specify the Bitrise Integration's source repo, such as `github.com/bitrise-steplib/bitrise-step-android-build.git`.
* `with:` If required by the Integration, provide a mapping of key-value pairs representing Integration inputs, such as `build_type: 'apk'`.
* `env:` If required by the Integration, provide a mapping of environment variables to pass to the Integration.  <!-- CI-7300 private repos -->

:::tip

If you already configured Bitrise Integrations elsewhere, you can [transfer Bitrise Integrations into Harness CI](#transfer-bitrise-integrations-into-harness-ci).

You can use variable expressions in the `with` and `env` settings. For example, `credentials: <+stage.variables.[TOKEN_SECRET]>` uses a [stage variable](/docs/platform/Pipelines/add-a-stage#stage-variables).

:::

```mdx-code-block
  </TabItem>
  <TabItem value="visual" label="Visual editor">
```

In the Visual editor, add the **Bitrise plugin** step to your pipeline's **Build** stage, and then populate the settings. The **Name** and **Uses** fields are required.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Description

Optional text string describing the step's purpose.

### Uses

Specify the repo of the Bitrise Integration that you want to use, for example `github.com/bitrise-steplib/bitrise-step-android-build.git`.

### Settings

Found under **Optional Configuration**. If required by the Integration, add key-value pairs representing Integration inputs. For example, you would specify `build_type: 'apk'` by entering `build_type` in the key field and `apk` in the value field.

Refer to the Integration's usage specifications for details about specific inputs available for the Integration that you want to use.

:::tip

Settings as a whole can be supplied as fixed values or runtime input, and individual setting values can be supplied as fixed values, runtime input, or expressions. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

### Environment Variables

Found under **Optional Configuration**. If required by the Integration, add key-value pairs representing environment variables that you want to pass to the Integration. For example, you would specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` by entering `GITHUB_TOKEN` in the key field and `<+secrets.getValue("github_pat")>` in the value field.

Refer to the Integration's usage specifications for details about specific environment variables relevant to the plugin you want to use. Note that `env` specifies incoming environment variables, which are separate from outgoing environment variables that are output by the Integration.

:::tip

You can use fixed values, runtime inputs, or variable expressions for environment variable values. For example, `<+stage.variables.[TOKEN_SECRET]>` is a variable expression [stage variable](/docs/platform/Pipelines/add-a-stage#stage-variables). Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

<!-- CI-7300 private repos -->

### Timeout

Found under **Optional Configuration**. Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

```mdx-code-block
  </TabItem>
</Tabs>
```

## Transfer Bitrise Integrations into Harness CI

If you already configured Bitrise Integrations elsewhere, the Bitrise `inputs` mapping is equivalent to the Harness Bitrise plugin step's `spec: with:` mapping. The following table compares Bitrise `inputs` specification with the equivalent Harness `with` specification.

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
