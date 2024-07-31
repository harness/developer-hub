---
title: Clone a subdirectory
description: Use a Run step to clone a subdirectory instead of an entire repo.
sidebar_position: 30
---


## Sparse Checkout support with 'Clone Codebase' or 'Git Clone' step. 


When you [configure a codebase](./create-and-configure-a-codebase.md), you can specify a [sparse checkout](https://git-scm.com/docs/git-sparse-checkout#_internalscone_pattern_set) to clone a subdirectory instead of the entire repo.


Similarly, you can use the built-in [git clone step](./git-clone-step) to clone a subdirectory instead of the entire repo.

:::note

The feature is behind feature flag `CI_GIT_CLONE_ENHANCED`. If it is not available in your account, contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

The following example shows how to use the `sparseCheckout` option to clone the `docs/continuous-integration` and `docs/code-repository` subdirectories from the [Harness Developer Hub](https://github.com/harness/developer-hub) code repository.

```yaml
pipeline:
  name: git_clone_pipeline
  identifier: git_clone_pipeline
  projectIdentifier: default_project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: clone_subdirectory_example
        identifier: clone_subdirectory_example
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            paths: []
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: run_step
                  identifier: run_step
                  spec:
                    shell: Sh
                    command: ls -la docs
  properties:
    ci:
      codebase:
        connectorRef: github_connector
        repoName: harness/developer-hub
        build: <+input>
        sparseCheckout:
          - docs/continuous-integration
          - docs/code-repository
```

## Clone a subdirectory using a Run step

You can disable the pipeline's default codebase and then run your `git` commands in a [Run](../../../continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step/) step.

You can also use this pattern if you need to use specific `git clone` arguments to clone your codebase.

:::warning

The following section explains how to use a Run step to run specific `git clone` arguments (such as `--recursive` or `sparse-checkout`) *instead* of using the built-in [clone codebase](./create-and-configure-a-codebase.md) or [git clone step](../../../continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step.md) functionality.

Disabling the built-in clone step removes access to some associated functionality, such as PR status updates or resolution of `<+codebase.*>` expressions.

:::

### Determine if you need to disable Clone Codebase

* **Clone with my git commands instead of using the built-in clone step:** If **Clone Codebase** is enabled, then the build clones the pipeline's [default codebase](./create-and-configure-a-codebase.md#configure-the-default-codebase) automatically. If you don't want to clone the default codebase, you must [disable Clone Codebase](./create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages) so that you can clone the repo with your desired `git` commands.
* **Clone with my git commands and use the built-in clone step:** If you want to clone files from another repo *in addition to* the default codebase, then *do not* disable **Clone Codebase**. For this pattern, follow the instructions in [Clone multiple code repos in one pipeline](./clone-and-process-multiple-codebases-in-the-same-pipeline.md) and use the **Run** step option.

### Add a Run step with git commands

Add a [Run step](../run-step-settings.md) containing your desired `git` commands, such as `git sparse-checkout` to clone a subdirectory instead of an entire repo.

```yaml
              - step:
                  type: Run
                  identifier: clone
                  name: clone
                  spec:
                    shell: Sh
                    command: |-
                      git sparse-checkout ...
```

:::tip

Store tokens and passwords as [Harness secrets](/docs/category/secrets) and use variable expressions, such as `<+secrets.getValue("YOUR_TOKEN_SECRET")>`, to call them in your commands.

:::
