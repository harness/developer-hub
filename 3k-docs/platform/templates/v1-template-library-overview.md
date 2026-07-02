---
title: V1 Template Library overview
sidebar_label: V1 Template Library Overview
description: Understand step, step group, and stage templates in V1 pipelines, including how Harness and Git versioning work.
sidebar_position: 16
keywords:
  - templates
  - v1 pipelines
  - step template
  - stage template
  - step group template
tags:
  - templates
  - v1-pipelines
---

The Template Library lets you define reusable building blocks for V1 pipelines and reference them across pipelines, projects, and accounts. A template is authored once and consumed many times, so the logic stays consistent and updates flow through every pipeline that references it.

V1 templates are written in the V1 pipeline YAML format and are registered under the `template` top-level key. Pipelines reference a template by name and version using the `uses` field on a step, step group, or stage.

---

## What you will learn

- The three V1 template types and when to use each.
- How a pipeline references a template with `uses` and `with`.
- How template inputs are declared and passed.
- The difference between Harness-stored and Git-stored templates.
- How template versioning works in each storage backend.

---

## Template types

V1 supports three template types. The shape of each template mirrors the construct it produces when expanded into a pipeline.

### Step templates

A step template defines a single reusable step. Use it for one self-contained unit of work, such as a build, a deployment, or a script.

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

### Step group templates

A step group template defines an ordered set of steps that always run together. Use it when several steps form a single logical unit, such as build and test, or scan and publish.

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

### Stage templates

A stage template defines an entire stage, including the steps inside it and any inputs the stage needs at runtime. Use it to standardize a complete unit of pipeline execution, such as a release stage or a failure-analysis stage.

```yaml
template:
  inputs:
    executionUrl:
      required: true
      type: string
  stage:
    steps:
      - id: analyze_execution_failure
        name: Analyze Execution Failure
        run:
          container:
            image: pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/claude-code-plugin:main
          env:
            ANTHROPIC_API_KEY: <+secrets.getValue("rohan_llm_key")>
          with:
            allowed_tools: mcp__harness__*
            task: |
              Analyze the failed execution at <+inputs.executionUrl>.
version: 1
```

---

## Reference a template from a pipeline

A pipeline references a template by setting `uses` on a `template` block. The template type must match the position in the pipeline:

- A step template is referenced from inside a step list.
- A step group template is referenced the same way; its expanded steps run as a group.
- A stage template is referenced from inside the `stages` list.

Pass values for the template's declared inputs through the `with` map.

```yaml
pipeline:
  stages:
    - template:
        uses: account.golang@1.0.0
        with:
          version: "1.19"
          goos: linux
          goarch: amd64
```

```yaml
pipeline:
  stages:
    - steps:
        - template:
            uses: account.docker
            with:
              push: true
              tags: latest
              repo: harness/hello-world
```

If you omit the version suffix on `uses`, the pipeline resolves to the latest stable version of the template at execution time.

---

## Template inputs

Templates declare inputs under `template.inputs`. Each input has a name, a type, and optional metadata such as `required`, `default`, `enum`, and `description`.

```yaml
template:
  inputs:
    version:
      type: string
      default: latest
    push:
      type: boolean
      default: false
  step:
    run:
      container: node:${{ inputs.version }}
      script:
        - npm install
        - npm test
```

Pipelines supply input values through `with`. Values are validated against the declared type and constraints when the template is resolved.

Supported input types include `string`, `number`, `boolean`, `array`, `duration`, `secret`, and `object`. Go to the [V1 pipeline input reference](/docs/platform/pipelines) to review the full list of supported types and constraints.

---

## Storage and versioning

V1 templates can live in Harness or in Git. The choice determines how versions are produced and promoted.

### Harness-managed templates

A Harness-managed template is stored in the Harness platform. Versions are created in Harness and the platform manages the version lifecycle, including stable and draft markers.

Use Harness storage when you want:

- A single source of truth managed entirely inside Harness.
- Built-in version controls without a Git workflow.
- Faster onboarding for teams that do not yet store pipelines in Git.

### Git-stored templates

A Git-stored template is checked into a Git repository alongside your pipeline code. Versioning is driven by Git: each tag, branch, or commit can resolve to a specific template version.

Use Git storage when you want:

- Templates to follow the same review and change process as application code.
- Branch-based promotion (for example, `main` for stable, feature branches for experimentation).
- Auditable history through Git commits and pull requests.

Both storage modes support the same `uses: <name>@<version>` syntax. The difference is where Harness fetches the template from when the pipeline runs.

---

## Scope

Templates are scoped at the account, organization, or project level. The scope prefix in `uses` determines visibility:

- `account.<name>`: available to every project in the account.
- `org.<name>`: available to every project in the organization.
- `<name>` (no prefix): resolved within the current project.

Use account or organization scope for templates that should be shared across teams. Use project scope for templates owned by a single team.

---

## Related concepts

- Go to the [step template guide](/docs/platform/templates/v1-step-template) to author a single-step template.
- Go to the [step group template guide](/docs/platform/templates/v1-step-group-template) to bundle several steps into one reusable unit.
- Go to the [stage template guide](/docs/platform/templates/v1-stage-template) to standardize a complete stage with inputs.
