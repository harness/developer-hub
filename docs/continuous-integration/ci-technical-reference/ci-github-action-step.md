---
title: GitHub Action plugin step settings
description: Run Github Actions in your Harness CI pipelines.
sidebar_position: 1
---

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a GitHub feature that enables you to automate various event-driven activities in GitHub, such as cloning a repository, generating Docker images, and testing scripts. You can find over 10,000 GitHub Actions on the [GitHub Marketplace](https://github.com/marketplace?type=actions) or create your own Actions.

You can use the **GitHub Action plugin** step to run GitHub Actions in your Harness CI pipelines.

:::info

Currently, the **GitHub Action plugin** step is supported for the Harness Cloud build infrastructure only.

For other build infrastructures, you can use the generic **Plugin** step with the GitHub Actions Drone Plugin, as explained in [Run GitHub Actions in CI pipelines](../use-ci/use-drone-plugins/run-a-git-hub-action-in-cie.md).

:::

## Usage examples

In the following YAML examples, **GitHub Action plugin** steps are used to set up Node.js, Go, Java, and Ruby environments.


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
<TabItem value="js" label="Setup Node.js" default>
```

This Action step uses the `actions/setup-node` GitHub Action to set up a Node.js environment that the subsequent steps in the stage can use.

```yaml
              - step:
                  type: Action
                  name: setup nodejs
                  identifier: setup_nodejs
                  spec:
                    uses: actions/setup-node@v3
                    with:
                      node-version: '16'
```

```mdx-code-block
</TabItem>
<TabItem value="Go" label="Setup Golang">
```

This Action step uses the `actions/setup-go` GitHub Action to set up a Go environment that the subsequent steps in the stage can use. It specifies Go 1.17.

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

This Action step uses the `actions/setup-java` GitHub Action to set up a Java environment that the subsequent steps in the stage can use. It specifies Java 17.

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

This Action step uses the `ruby/setup-ruby` GitHub Action to set up a Ruby environment that the subsequent steps in the stage can use. It specifies Ruby 2.7.2.

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

To add a GitHub Action plugin step to your pipeline YAML, add an `Action` step, for example:

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

The `spec` parameters define which Action to use, the Action settings, and environment variables that you need to pass to the Action. These are configured according to the GitHub Action's usage specifications.

* `uses:` Specify the Action's repo, along with a branch or tag, such as `actions/stepup-go@v3`.
* `with:` If required by the Action, provide a mapping of key-value pairs representing Action settings, such as `go-version: '1.17'`.
* `env:` If required by the Action, provide a mapping of environment variables to pass to the Action. <!-- Not working for private repos, CI-7300 -->

:::tip

If you already configured GitHub Actions elsewhere, you can quickly [transfer GitHub Actions into Harness CI](#transfer-github-actions-into-harness-ci) by copying the `spec` details from your existing GitHub Actions YAML.

You can use variable expressions in the `with` and `env` settings. For example, `credentials: <+stage.variables.[TOKEN_SECRET]>` uses a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables).

:::

<details>
<summary>YAML Example: Pipeline with an Action step</summary>

This pipeline uses a **GitHub Action plugin** step to install golang version 1.19.5. It then compiles the golang application and runs tests.

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
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: 1.19.5
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

In the Visual editor, add the **GitHub Action plugin** step to your pipeline's **Build** stage, and then populate the settings. The **Name** and **Uses** fields are required.

### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

### Description

Optional text string describing the step's purpose.

### Uses

Specify the repo and branch or tag of the GitHub Action that you want to use, for example `actions/setup-go@v3`. Refer to the GitHub Action's repo for information about branches and tags.

### Settings

Found under **Optional Configuration**. If required by the Action, add key-value pairs representing GitHub Action settings. For example, you would specify `go-version: '>=1.17.0'` by entering `go-version` in the key field and `>=1.17.0` in the value field.

Refer to the GitHub Action's `with` usage specifications for details about specific settings available for the Action that you want to use.

:::tip

Settings as a whole can be supplied as fixed values or runtime input, and individual setting values can be supplied as fixed values, runtime input, or expressions. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

### Environment Variables

Found under **Optional Configuration**. If required by the Action, add key-value pairs representing environment variables that you want to pass to the GitHub Action. For example, you would specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` by entering `GITHUB_TOKEN` in the key field and `<+secrets.getValue("github_pat")>` in the value field.

Refer to the GitHub Action's `env` usage specifications for details about specific settings available for the Action that you want to use. Note that `env` specifies incoming environment variables, which are separate from outgoing environment variables that may be output by the Action.

:::tip

You can use fixed values, runtime input, or variable expressions for environment variable values. For example, `<+stage.variables.[TOKEN_SECRET]>` is a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables). Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change input types.

:::

<!-- CI-7300 private repos info needed on this tab when fixed -->

### Timeout

Found under **Optional Configuration**. Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

```mdx-code-block
  </TabItem2>
</Tabs2>
```

## Transfer GitHub Actions into Harness CI

If you already configured GitHub Actions elsewhere, you can copy the `uses`, `with` and `env` lines from your GitHub Action YAML into the `Action` step's `spec` in your Harness CI pipeline YAML.

If you're using the Visual editor, you can transfer the data into the **Uses**, **Settings**, and **Environment Variables** fields.

The following table compares GitHub Action YAML with Harness CI Action step YAML. Notice the consistency of `uses`, `with`, and `env`.

<table>
<tr>
<td> Github Action YAML </td> <td> Harness CI Action step YAML </td>
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
