---
sidebar_position: 1
description: Create an OpenTofu pipeline.
---

# OpenTofu

This guide covers how to use [OpenTofu](https://opentofu.org/) in pipelines.

:::caution

OpenTofu's [state locking](https://opentofu.org/docs/language/state/locking/) features can help ensure multiple pipeline executions can't write to the [state](https://opentofu.org/docs/language/state/) at once.

Alternatively, you can set [GITNESS_CI_PARALLEL_WORKERS](../../installation/settings.md#gitness_ci_parallel_workers) to `1`, so your Harness Open Source instance will only execute one pipeline at a time.

:::

## Plan and apply example

This pipeline supports a common workflow where __Push__ and __Pull Request__ [triggers](../../pipelines/triggers.md) have been enabled.

The [init](https://opentofu.org/docs/cli/commands/init/) step always runs.

The [plan](https://opentofu.org/docs/cli/commands/plan/) step always runs.

The [apply](https://opentofu.org/docs/cli/commands/apply/) step uses [conditions](../../pipelines/conditions.md) to ensure it only runs on `manual` or `push` [events](../../reference/pipelines/expression_variables.md#buildevent) for the `main` [branch](../../reference/pipelines/expression_variables.md#buildsource).

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
    - type: ci
      spec:
        envs:
          TF_CLI_ARGS: -no-color
        steps:
          - name: init
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              script: |
                tofu init
          - name: plan
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              script: |
                tofu plan
          - name: apply
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              script: |
                tofu apply -auto-approve
            when: 
              build.source == "main"
              and
              build.event matches "manual|push"
```

Note that [TF_CLI_ARGS](https://opentofu.org/docs/cli/config/environment-variables/#tf_cli_args-and-tf_cli_args_name) is set as [stage environment variable](../../pipelines/variables.md#stage).

## Authentication

The `plan` and `apply` steps will likely need to authenticate with [providers](https://opentofu.org/docs/language/providers/) and the [backend](https://opentofu.org/docs/language/settings/backends/configuration/) defined in your configuration.

Add any sensitive values as [secrets](../../pipelines/secrets.md) and reference them in required steps.

For example, these steps set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` [step environment variables](../../pipelines/variables.md#step), which are required by the [AWS](https://github.com/opentofu/terraform-provider-aws/) provider and the [s3 backend](https://opentofu.org/docs/language/settings/backends/s3/).

```yaml {}
          - name: plan
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              envs:
                AWS_ACCESS_KEY_ID: ${{ secrets.get("AWS_ACCESS_KEY_ID") }}
                AWS_SECRET_ACCESS_KEY: ${{ secrets.get("AWS_SECRET_ACCESS_KEY") }}
              script: |
                tofu plan
          - name: apply
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              envs:
                AWS_ACCESS_KEY_ID: ${{ secrets.get("AWS_ACCESS_KEY_ID") }}
                AWS_SECRET_ACCESS_KEY: ${{ secrets.get("AWS_SECRET_ACCESS_KEY") }}
              script: |
                tofu apply -auto-approve
```

## Check formatting

Optionally add an initial step to run [fmt](https://opentofu.org/docs/cli/commands/fmt/).

If your configuration does not follow OpenTofu's [style conventions](https://opentofu.org/docs/language/syntax/style/), the step will fail.

```yaml {}
          - name: fmt
            type: run
            spec:
              container: ghcr.io/opentofu/opentofu:1.6
              script: |
                tofu fmt -check -diff
```

