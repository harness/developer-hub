---
title: Create a V1 step group template
sidebar_label: V1 Step Group Template
description: Bundle multiple steps into a reusable step group template for V1 pipelines.
sidebar_position: 18
keywords:
  - step group template
  - v1 pipelines
  - templates
tags:
  - templates
  - v1-pipelines
---

A step group template bundles an ordered set of steps into a single reusable unit. Use it when several steps always run together, such as build and test, or scan and publish.

---

## Before you begin

- **V1 pipeline access:** A project with V1 pipelines enabled. Go to the [V1 pipelines overview](/docs/platform/pipelines) to enable V1 in your project.
- **Connector for the runtime image:** A container connector for each image referenced in the group. Go to the [connectors reference](/docs/platform/connectors) to configure one.
- **Permissions:** Create and Edit on Templates. Go to the [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## Author the step group template

Define the template under the top-level `template` key with a `step.group` block. Each entry under `steps` is a regular V1 step.

```yaml
template:
  step:
    group:
      steps:
        - description: build and test
          group:
            steps:
              - run:
                  script: pnpm test
                  container:
                    image: nodejs:latest
                    connector: docker_hub_anonymous
              - run:
                  script: pnpm build
                  container:
                    image: nodejs:latest
                    connector: docker_hub_anonymous
```

Steps inside a group share the group's execution context. They run in the declared order unless you set a parallel strategy on individual steps.

To make the group configurable, declare inputs under `template.inputs` and reference them with `${{ inputs.<name> }}` inside any step.

```yaml
template:
  inputs:
    version:
      type: string
      default: latest
  step:
    group:
      steps:
        - run:
            container: node:${{ inputs.version }}
            script: npm install
        - run:
            container: node:${{ inputs.version }}
            script: npm test
```

---

## Store the template

Choose where the template is versioned.

- **Harness-managed:** Save the template in the Harness platform. Versions are created and promoted in Harness.
- **Git-stored:** Commit the template to a Git repository. The Git tag, branch, or commit determines the resolved version.

Go to the [V1 Template Library overview](/docs/platform/templates/v1-template-library-overview) to compare storage modes.

---

## Reference the template from a pipeline

Reference a step group template from inside a step list with the `template` block. Set `uses` to `<scope>.<name>@<version>` and pass input values under `with`. The group is expanded inline at runtime; the steps run as a group inside the parent stage.

```yaml
pipeline:
  stages:
    - steps:
        - template:
            uses: account.node-build@1.0.0
            with:
              version: "20"
```

If you omit the version suffix, the pipeline resolves to the latest stable version at execution time.

---

## Next steps

A step group template covers a fixed sequence of steps inside a stage. When you also want to standardize stage-level settings (such as inputs, environment, or failure strategy), use a stage template instead. Go to the [stage template guide](/docs/platform/templates/v1-stage-template) to author a stage template.
