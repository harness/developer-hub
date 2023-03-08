---
title: Bitrise plugin step settings
description: Use Bitrise plugins in your Harness CI pipelines.
sidebar_position: 100
---


[Bitrise Integrations](https://bitrise.io/integrations/steps)<!-- need description -->.

You can use the **Bitrise plugin** step to run Bitrise Integrations in your Harness CI pipelines.

:::info

Currently, the **Bitrise plugin** step is supported for the Harness Cloud build infrastructure only.

For other build infrastructures, you can use the generic **Plugin** step with the GitHub Actions Drone Plugin, as explained in [Run GitHub Actions in CI pipelines](../use-ci/use-drone-plugins/run-a-git-hub-action-in-cie.md).<!-- can you use Plugin step for bitrise? -->

:::

<!-- ALL CONTENT DUPLICATED FROM GITHUB ACTION PLUGIN STEP SETTINGS. NEED TO MODIFY ALL FOR BITRISE -->

## Usage examples

In the following YAML examples, Bitrise plugin steps are used to...<!-- need 2-3 examples -->

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
<TabItem value="Go" label="Example 1" default>
```
This Action step uses the `actions/setup-go` GitHub Action to setup a Go environment that the subsequent steps in the stage can use. It specifies Go 1.17.

```yaml
              - step:
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: '1.17'
```

```mdx-code-block
</TabItem>
<TabItem value="Java" label="Setup Java">
```

This Action step uses the `actions/setup-java` GitHub Action to setup a Java environment that the subsequent steps in the stage can use. It specifies Java 17.

```yaml
              - step:
                  type: Action
                  name: setup java
                  identifier: setup_java
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      java-version: '17'
```

```mdx-code-block
</TabItem>
<TabItem value="Ruby" label="Setup Ruby">
```

This Action step uses the `ruby/setup-ruby` GitHub Action to setup a Ruby environment that the subsequent steps in the stage can use. It specifies Ruby 2.7.2.

```yaml
              - step:
                  type: Action
                  name: setup ruby
                  identifier: setup_ruby
                  spec:
                    uses: ruby/setup-ruby@v1
                    with:
                      ruby-version: '2.7.2'
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Settings and specifications

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```

```mdx-code-block
<Tabs2>
  <TabItem2 value="YAML" label="YAML editor" default>
```

To add a Bitrise plugin step to your pipeline YAML, add an `Bitrise` step, for example:

```yaml
              - step:
                  type: Bitrise
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: github.com/<repo>/test-step.git
                    with:
                      is_debug: yes
                    env:
```

The `spec` parameters define which plugin to use as well as settings and environment variables required by the plugin. These are configured according to the plugin's usage specifications.

* `uses:` Specify the plugin's repo, along with a branch or tag, such as `actions/stepup-go@v3`.
* `with:` If required by the plugin, provide a mapping of key-value pairs representing settings required by the plugin, such as `go-version: '1.17'`.
* `env:` If required by the plugin, provide a mapping of environment variables to pass to the plugin, such as `GITHUB_TOKEN: <+secrets.getValue("github_pat")>`. <!-- required for private Action repos? -->

:::tip

If you already configured GitHub Actions elsewhere, you can quickly [transfer Bitrise plugins into Harness CI](#transfer-bitrise-plugins-into-harness-ci) by copying the `spec` details from your existing GitHub Actions YAML.

You can use variable expressions in the `with` and `env` settings. For example, `credentials: <+stage.variables.[TOKEN_SECRET]>` uses a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables).

:::

<details>
<summary>YAML Example: Pipeline with an Bitrise step</summary>

This pipeline uses a Bitrise plugin step to ... It then ...
<!-- inserted the bitrise step but otherwise didnt modify the pipeline -->

```yaml
pipeline:
  name: Build and test golang application
  identifier: Build_test_golang
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: Github_connector
        build: <+input>
  stages:
    - stage:
        name: Build golang application
        identifier: Build_golang_application
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  identifier: bitrise
                  name: bitrise
                  type: Bitrise
                  spec:
                    uses: github.com/<repo>/test-step.git
                  with:
                    is_debug: yes
              - step:
                  type: Run
                  name: Build and test
                  identifier: Build_and_test
                  spec:
                    shell: Bash
                    command: |-
                      go build .
                      go test -v ./...
```

</details>

```mdx-code-block
  </TabItem2>
  <TabItem2 value="visual" label="Visual editor">
```

In the Visual editor, add the **Bitrise plugin** step to your pipeline's **Build** stage, and then populate the settings. The **Name** and **Uses** fields are required.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Description

Optional text string describing the step's purpose.

### Uses

Specify the repo and branch or tag of the plugin that you want to use, for example `actions/setup-go@v3`. Refer to the plugin's usage specifications for information about branches and tags.

### Settings

Found under **Optional Configuration**. If required by the plguin, add key-value pairs representing plugin settings. For example, you would specify `go-version: '>=1.17.0'` by entering `go-version` in the key field and `>=1.17.0` in the value field.

Refer to the plugin's `with` usage specifications for details about specific settings available for the plugin you want to use.

:::tip

Settings as a whole can be supplied as fixed values or runtime input, and individual setting values can be supplied as fixed values, runtime input, or expressions. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

### Environment Variables

Found under **Optional Configuration**. If required by the plugin, add key-value pairs representing plugin environment variables. For example, you would specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` by entering `GITHUB_TOKEN` in the key field and `<+secrets.getValue("github_pat")>` in the value field.

Refer to the plugin's `env` usage specifications for details about specific settings available for the plugin you want to use.

:::tip

You can use fixed values, runtime input, or variable expressions for environment variable values. For example, `<+stage.variables.[TOKEN_SECRET]>` is a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables). Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

<!-- Assuming that the token requirement for private action repos also applies to this step? -->

### Timeout

Found under **Optional Configuration**. Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

```mdx-code-block
  </TabItem2>
</Tabs2>
```

## Transfer Bitrise plugins into Harness CI

If you already configured Bitrise plugins elsewhere, you can copy the `uses`, `with` and `env` lines from your Bitrise YAML into the `Action` step's `spec` in your Harness CI pipeline YAML.

If you're using the Visual editor, you can transfer the data into the **Uses**, **Settings**, and **Environment Variables** fields.

The following table compares Bitrise YAML with Harness CI Bitrise step YAML. Notice the consistency of `uses`, `with`, and `env`.

<table>
<tr>
<td> Bitrise YAML </td> <td> Harness CI Action step YAML </td>
</tr>
<tr>
<td>

```yaml
- name: hello-world
  uses: actions/hello-world-javascript-action@main
  with:
    who-to-greet: 'Mona the Octocat'
  env:
    hello: world
```

</td>
<td>

```yaml
- step:
    type: Action
    name: hello world
    identifier: hello_world
    spec:
      uses: actions/hello-world-javascript-action@main
      with:
        who-to-greet: 'Mona the Octocat'
      env:
        hello: world
```

</td>
</tr>
</table>
