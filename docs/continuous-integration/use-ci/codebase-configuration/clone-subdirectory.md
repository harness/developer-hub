---
title: Clone a subdirectory
description: Use a Run step to clone a subdirectory instead of an entire repo.
sidebar_position: 30
---

If you want to clone a subdirectory instead of your entire Git repo, you can disable the pipeline's default codebase and then run your `git` commands in a **Run** step.

You can also use this pattern if you need to use specific `git clone` arguments to clone your codebase.

:::warning

This topic explains how to use a Run step to run specific `git clone` arguments (such as `--recursive` or `sparse-checkout`) *instead* of using the built-in [clone codebase](./create-and-configure-a-codebase.md) functionality.

Disabling the built-in clone step removes access to some associated functionality, such as PR status updates or resolution of `<+codebase.*>` expressions.

:::

## Determine if you need to disable Clone Codebase

* **Clone with my git commands instead of using the built-in clone step:** If **Clone Codebase** is enabled, then the build clones the pipeline's [default codebase](./create-and-configure-a-codebase.md#configure-the-default-codebase) automatically. If you don't want to clone the default codebase, you must [disable Clone Codebase](./create-and-configure-a-codebase/#disable-clone-codebase-for-specific-stages) so that you can clone the repo with your desired `git` commands.
* **Clone with my git commands and use the built-in clone step:** If you want to clone files from another repo *in addition to* the default codebase, then *do not* disable **Clone Codebase**. For this pattern, follow the instructions in [Clone multiple code repos in one pipeline](./clone-and-process-multiple-codebases-in-the-same-pipeline.md) and use the **Run** step option.

## Add a Run step with git commands

Add a [Run step](../run-ci-scripts/run-step-settings.md) containing your desired `git` commands, such as [`git sparse-checkout`](https://git-scm.com/docs/git-sparse-checkout) to clone a subdirectory instead of an entire repo.

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
