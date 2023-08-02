---
title: Use the GitHub Action plugin step
description: Run Github Actions in your Harness CI pipelines.
sidebar_position: 70
---

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a GitHub feature that enables you to automate various event-driven activities in GitHub, such as cloning a repository, generating Docker images, and testing scripts. You can find over 10,000 GitHub Actions on the [GitHub Marketplace](https://github.com/marketplace?type=actions) or create your own Actions.

You can use the **GitHub Action plugin** step to run GitHub Actions in your [Harness CI pipelines](../prep-ci-pipeline-components.md).

:::info

Currently, the **GitHub Action plugin** step is supported for the Harness Cloud build infrastructure only.

For other build infrastructures, you can use the [GitHub Actions Drone plugin in a Plugin step](./run-a-git-hub-action-in-cie.md).

For more information about using plugins in CI pipelines, go to [Explore plugins](./explore-ci-plugins.md).

:::

## Usage examples

The following YAML examples use **GitHub Action plugin** steps (`Action` steps) to set up Node.js, Go, Java, and Ruby environments.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
<TabItem value="js" label="Setup Node.js" default>
```

This `Action` step uses the `actions/setup-node` GitHub Action to set up a Node.js environment that the subsequent steps in the stage can use.

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

This `Action` step uses the `actions/setup-go` GitHub Action to set up a Go environment that the subsequent steps in the stage can use. It specifies Go 1.17.

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

This `Action` step uses the `actions/setup-java` GitHub Action to set up a Java environment that the subsequent steps in the stage can use. It specifies Java 17.

```yaml
              - step:
                  type: Action
                  name: setup java
                  identifier: setup_java
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      distribution: 'temurin'
                      java-version: '17'
```

```mdx-code-block
</TabItem>
<TabItem value="Ruby" label="Setup Ruby">
```

This `Action` step uses the `ruby/setup-ruby` GitHub Action to set up a Ruby environment that the subsequent steps in the stage can use. It specifies Ruby 2.7.2.

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

:::info Docker-in-Docker

If a stage has a [Docker-in-Docker Background step](../run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md), you can't use GitHub Actions that launch Docker-in-Docker (DinD) in the same stage.

If possible, run the **GitHub Action plugin** step in a separate stage, or try to find a GitHub Action that doesn't use DinD.

:::

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```

```mdx-code-block
<Tabs2>
  <TabItem2 value="YAML" label="YAML editor" default>
```

To add a **GitHub Action plugin** step in the YAML editor, add an `Action` step, for example:

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
* `env:` If required by the Action, provide a mapping of environment variables to pass to the Action. Note that `env` specifies incoming environment variables, which are separate from outgoing environment variables that may be output by the Action.

The following cases *always* require environment variables:

* **Private Action repos:** For [private Action repositories](#private-action-repositories), you must provide the `GITHUB_TOKEN` environment variable, such as `GITHUB_TOKEN: <+secrets.getValue("[SECRET_NAME]")>`. You need a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be required, depending on the Action's purpose.
* **Duplicate Actions:** If you run multiple instances of the same GitHub Action, either in parallel or with a looping strategy, you must set the `XDG_CACHE_HOME` environment variable. The default value of this variable is `/home/ubuntu/.cache`; however, the `XDG_CACHE_HOME` variable must have a different value for each iteration of the Action. If you have separate steps running in parallel, assign distinct values to each step, such as `XDG_CACHE_HOME: /home/ubuntu/.cache1`. If you apply a looping strategy to the same step, you can use an expression to generate distinct values, such as `XDG_CACHE_HOME: /home/ubuntu/.cache<+step.identifier>`.

:::tip Tips

* If you already configured GitHub Actions elsewhere, you can quickly [transfer GitHub Actions into Harness CI](#transfer-github-actions-into-harness-ci) by copying the `spec` details from your existing GitHub Actions YAML.
* You can use variable expressions in the `with` and `env` settings. For example, `credentials: <+stage.variables.[TOKEN_SECRET]>` uses a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables) to call a token stored as a [Harness secret](/docs/category/secrets).
* For GitHub Actions steps, `with` mappings are automatically exported as [output variables](#output-variables-from-github-actions-steps).

:::

```mdx-code-block
  </TabItem2>
  <TabItem2 value="visual" label="Visual editor">
```

1. Add the **GitHub Action plugin** step to your pipeline's **Build** stage.
2. Enter a **Name** and optional **Description**.

   Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

3. For **Uses**, specify the repo and branch or tag of the GitHub Action that you want to use, for example `actions/setup-go@v3`.

   Refer to the GitHub Action's README for information about branches and tags.

4. If required by the Action, add key-value pairs representing GitHub Action settings in the **Settings** field under **Optional Configuration**. For example, you would specify `go-version: '>=1.17.0'` by entering `go-version` in the key field and `>=1.17.0` in the value field.

   Most Actions require settings. Refer to the GitHub Action's `with` usage specifications in the Action's README for details about specific settings available for the Action that you want to use.

5. If required by the Action, add key-value pairs representing environment variables that you want to pass to the GitHub Action in the **Environment Variables** field under **Optional Configuration**. For example, you would specify `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` by entering `GITHUB_TOKEN` in the key field and `<+secrets.getValue("github_pat")>` in the value field.

   Refer to the GitHub Action's `env` usage specifications for details about specific settings available for the Action that you want to use. Note that `env` specifies incoming environment variables, which are separate from outgoing environment variables that may be output by the Action.

   The following cases *always* require environment variables:

   * **Private Action repos:** For [private Action repositories](#private-action-repositories), you must provide the `GITHUB_TOKEN` environment variable. You need a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be required, depending on the Action's purpose.
   * **Duplicate Actions:** If you run multiple instances of the same GitHub Action, either in parallel or with a looping strategy, you must set the `XDG_CACHE_HOME` environment variable. The default value of this variable is `/home/ubuntu/.cache`; however, the `XDG_CACHE_HOME` variable must have a different value for each iteration of the Action. If you have separate steps running in parallel, assign distinct values to each step, such as `XDG_CACHE_HOME: /home/ubuntu/.cache1`. If you apply a looping strategy to the same step, you can use an expression to generate distinct values, such as `XDG_CACHE_HOME: /home/ubuntu/.cache<+step.identifier>`.

6. Optionally, you can set the **Timeout**. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

   * [Step Skip Condition settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
   * [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

:::tip Tips

* You can use fixed values, runtime input, or variable expressions for **Settings** and **Environment Variables** values. For example, `<+stage.variables.[TOKEN_SECRET]>` is a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables) that calls a token stored as a [Harness secret](/docs/category/secrets).
* For GitHub Actions steps, **Settings** are automatically exported as [output variables](#output-variables-from-github-actions-steps).

:::

```mdx-code-block
  </TabItem2>
</Tabs2>
```

<details>
<summary>YAML example: Pipeline with an Action step</summary>

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
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
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

## Private Action repositories

If you want to use an Action that is in a private repository, you must provide the `GITHUB_TOKEN` environment variable. You need a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be necessary depending on the Action's purpose.

```mdx-code-block
import Tabs3 from '@theme/Tabs';
import TabItem3 from '@theme/TabItem';
```

```mdx-code-block
<Tabs3>
  <TabItem3 value="YAML" label="YAML editor" default>
```

In the YAML editor, add `GITHUB_TOKEN` to the `env` mapping, for example:

```yaml
- step:
    type: Action
    name: hello world
    identifier: hello_world
    spec:
      uses: my-actions-repo/hello-world-javascript-action@main
      with:
        who-to-greet: 'Mona the Octocat'
      env:
        GITHUB_TOKEN: <+secrets.getValue("[SECRET_NAME]")>
```

:::tip

You can use a variable expressions, such as `<+secrets.getValue("[SECRET_NAME]")>`, to call a token stored as a Harness Secret.

:::

For more information about configuring the Action step's settings, go to the [Settings and specifications](#settings-and-specifications) section, above.

```mdx-code-block
  </TabItem3>
  <TabItem3 value="Visual" label="Visual editor">
```

In the Visual editor, specify `GITHUB_TOKEN` in the **Environment Variables**. Enter `GITHUB_TOKEN` in the key field and the token or variable expression in the value field, for example:

* Key: `GITHUB_TOKEN`
* Value: `<+secrets.getValue("[SECRET_NAME]")>`

:::tip

You can use a variable expressions, such as `<+secrets.getValue("[SECRET_NAME]")>`, to call a token stored as a Harness Secret.

:::

For more information about configuring the GitHub Action plugin step's settings, go to the [Settings and specifications](#settings-and-specifications) section, above.

```mdx-code-block
  </TabItem3>
</Tabs3>
```

## Output variables from GitHub Actions steps

Output variables are exposed values that can be used by other steps or stages in the pipeline. For GitHub Actions steps, `with`/**Settings** values are automatically exported as output variables, and you can fetch those values in later steps or stages in the same pipeline.

To reference an output variable in another step in the same stage, use either of the following expressions:

```
<+steps.[stepID].output.outputVariables.[varName]>
<+execution.steps.[stepID].output.outputVariables.[varName]>
```

To reference an output variable in a different stage than the one where it originated, use either of the following expressions:

```
<+stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
<+pipeline.stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
```

For each expression:

* Replace `[stepID]` with the ID of the GitHub Actions step
* Replace `[varName]` with the relevant variable name, wrapped in quotes.
* In cross-stage references, replace `[stageID]` with the ID of the stage where the GitHub Actions step exists.

:::caution

Github Actions settings keys can include `-`, which is not supported by JEXL. Therefore, you must wrap these variable names in quotes when using them in Harness expressions.

:::

<details>
<summary>YAML example: GitHub Actions output variable</summary>

In the following YAML example, the `setup_go` step uses a `go-version` setting, which is automatically exported as an output variable. The `beta` step includes two expressions referencing the `go-version` output variable.

```yaml
              - step:
                  type: Action
                  name: setup golang
                  identifier: setup_go
                  spec:
                    uses: actions/setup-go@v3
                    with:
                      go-version: `1.17`
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo <+steps.setup_go.output.outputVariables."go-version">
                      echo <+execution.steps.setup_go.output.outputVariables."go-version">
```

</details>
