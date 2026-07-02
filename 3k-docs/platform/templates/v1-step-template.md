---
title: Create a V1 step template
sidebar_label: V1 Step Template
description: Define a reusable step template in V1 pipelines and reference it from any pipeline.
sidebar_position: 17
keywords:
  - step template
  - v1 pipelines
  - templates
tags:
  - templates
  - v1-pipelines
---

A step template captures one reusable step that you can drop into any V1 pipeline. Use it for a self-contained unit of work, such as a build, a script, or a single deployment action.

---

## Before you begin

- **V1 pipeline access:** A project with V1 pipelines enabled. Go to the [V1 pipelines overview](/docs/platform/pipelines) to enable V1 in your project.
- **Connector for the runtime image:** A container connector for the image your step uses (for example, `docker_hub_anonymous`). Go to the [connectors reference](/docs/platform/connectors) to configure one.
- **Permissions:** Create and Edit on Templates. Go to the [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## Author the step template

Define the template under the top-level `template` key with a single `step` block. The body of `step` is identical to a step you would write inline in a pipeline.

```yaml
template:
  step:
    run:
      script: |-
        pnpm build
        pnpm test
      container:
        image: nodejs:latest
        connector: docker_hub_anonymous
```

To make the template configurable, declare inputs under `template.inputs` and reference them with the `${{ inputs.<name> }}` expression.

```yaml
template:
  inputs:
    version:
      type: string
      default: latest
  step:
    run:
      container: node:${{ inputs.version }}
      script:
        - npm install
        - npm test
```

---

## Store the template

Choose where the template is versioned.

- **Harness-managed:** Save the template in the Harness platform. Versions are created and promoted in Harness.
- **Git-stored:** Commit the template to a Git repository. The Git tag, branch, or commit determines the resolved version.

Go to the [V1 Template Library overview](/docs/platform/templates/v1-template-library-overview) to compare storage modes.

---

## Reference the template from a pipeline

Reference a step template from inside a step list using the `template` block. Set `uses` to `<scope>.<name>@<version>` and supply input values under `with`.

```yaml
pipeline:
  stages:
    - steps:
        - template:
            uses: account.docker@1.0.0
            with:
              push: true
              tags: latest
              repo: harness/hello-world
```

If you omit the version suffix, the pipeline resolves to the latest stable version at execution time.

```yaml
pipeline:
  stages:
    - steps:
        - template:
            uses: account.docker
            with:
              push: true
              tags: latest
```

---

## Next steps

A step template solves the single-step case. When several steps always run together, group them into one reusable unit instead. Go to the [step group template guide](/docs/platform/templates/v1-step-group-template) to bundle multiple steps. Go to the [stage template guide](/docs/platform/templates/v1-stage-template) to standardize a complete stage.
