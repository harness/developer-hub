---
title: Pipeline YAML v1 Overview
sidebar_label: Pipeline YAML v1
id: index
slug: /platform/getting-started/pipeline
description: The v1 YAML specification for Harness 3.0 pipelines — reduced boilerplate, expression-based conditionals, typed inputs, and compatibility with GitHub Actions and Drone workflows.
---

A Pipeline is the top-level execution unit in Harness 3.0. It defines a sequence of stages, their execution order, triggers, inputs, and runtime configuration. The v1 YAML specification is a ground-up redesign that reduces boilerplate, improves readability, and introduces compatibility with GitHub Actions and Drone workflows.

:::info Key Concept
In Harness 3.0, a pipeline is declared using the `pipeline:` root key at the top of the YAML file. All pipeline configuration (stages, inputs, triggers, etc.) is nested under this root key. The v1 parser supports short-form syntax, expression-based conditionals, and typed inputs. See the spec repository for the complete schema definition.
:::

---

## Schema Definition

The `Pipeline` interface defines the complete structure of a v1 pipeline. All fields are optional except `stages`, which must contain at least one stage.

```typescript title="pipeline-schema.ts"
interface Pipeline {
  // Core configuration
  stages: Stage[]                        // List of stages to execute (required)
  inputs: Record<string, Input>          // Typed input variables
  env: Record<string, string>            // Global environment variables

  // Repository and cloning
  repo: {                                // Override default repository
    name: string                         // Repository name
    connector: string                    // Repository connector
  }
  clone: boolean | {                     // Clone configuration
    depth: number                        // Clone depth
    disabled: boolean                    // Disable cloning
    insecure: boolean                    // Skip SSL verification
    lfs: boolean                         // Clone LFS files
    strategy: "source-branch" | "merge"  // Clone strategy
    submodules: boolean                  // Clone submodules
    tags: boolean                        // Clone tags
    trace: boolean                       // Enable trace logging
    ref: string | {                      // Override ref
      name: string                       // Branch/tag name
      type: "branch" | "pull-request" | "tag"
      sha: string                        // Commit SHA
    }
  }

  // Deployment targets
  environment: string | {                // Target environment
    sequential: boolean                  // Deploy sequentially
    items: Array<{
      name: string
      "deploy-to": "all" | string | string[]
    }>
  }
  service: string | string[] | {         // Target service(s)
    sequential: boolean
    items: string[]
  }

  // Execution controls
  delegate: string | string[]            // Delegate selector tags
  if: string                             // Conditional execution (${{ ... }})
  on: TriggerConfig                      // Event triggers
  timeout: string                        // Max execution time (e.g., "30m")
  barriers: string[]                     // Pipeline barriers
  status: {                              // Status check configuration
    disabled: boolean
    name: string
    level: "pipeline" | "stage" | "step"
    matrix: "itemize" | "aggregate"
  }

  // Concurrency control
  concurrency: string | {                // Concurrency group
    group: string
    "cancel-in-progress": boolean
  }

  // GitHub Actions compatibility
  jobs: Record<string, Stage>            // GHA jobs (alternative to stages)
  permissions: "write-all" | "read-all" | PermissionsLong
}
```

---

## Properties Reference

All pipeline-level properties are optional unless otherwise noted.

| Property | Type | Required | Description |
|---|---|---|---|
| `stages` | `Stage[]` | Yes | List of stages to execute. Stages run sequentially by default. |
| `inputs` | `Record<string, Input>` | No | Typed input variables. Supported types: `string`, `number`, `boolean`, `array`, `duration`, `choice`, `environment`, `secret`, `step`, `object`. |
| `env` | `Record<string, string>` | No | Global environment variables available to all stages and steps. |
| `repo` | `Repository` | No | Override the default repository. Contains `name` and `connector` fields. |
| `clone` | `boolean \| CloneConfig` | No | Clone configuration. Set to `false` to disable. Supports `depth`, `lfs`, `submodules`, `strategy`, `ref`, and more. |
| `environment` | `string \| EnvironmentRef` | No | Target environment for deployment pipelines. Supports sequential multi-environment deployments. |
| `service` | `string \| string[] \| ServiceRef` | No | Target service(s) for deployment pipelines. Supports sequential multi-service deployments. |
| `delegate` | `string \| string[]` | No | Delegate selector tags for routing execution to specific delegates. |
| `if` | `string` | No | Expression that must evaluate to `true` for the pipeline to execute. Uses `${{ }}` syntax. |
| `on` | `TriggerConfig` | No | Event triggers: `push`, `pull_request`, `tag`, `schedule`, `workflow_dispatch`, and more. |
| `timeout` | `string` | No | Maximum execution time (e.g., `"30m"`, `"2h"`). |
| `barriers` | `string[]` | No | Named barriers for synchronizing parallel stages. |
| `status` | `StatusConfig` | No | Status check configuration with `name`, `level`, and `matrix` handling. |
| `concurrency` | `string \| ConcurrencyConfig` | No | Controls concurrent pipeline runs. Supports group keys and `cancel-in-progress`. |
| `jobs` | `Record<string, Stage>` | No | GitHub Actions compatible stage definitions (alternative to `stages`). |
| `permissions` | `Permissions` | No | GitHub token permissions (`read-all`, `write-all`, or granular per-resource). |

---

## Basic Examples

The v1 specification supports multiple syntax forms, from minimal one-liners to fully expanded configurations.

### Minimal Pipeline

The simplest valid pipeline contains a single stage with one step.

```yaml title="minimal-pipeline.yaml"
pipeline:
  stages:
    - name: build
      steps:
        - run: echo "Hello, Harness 3.0!"
```

### Pipeline with Multiple Stages

```yaml title="multi-stage-pipeline.yaml"
pipeline:
  timeout: 30m
  env:
    NODE_ENV: production
  stages:
    - name: build
      steps:
        - run: npm install
        - run: npm test
    - name: deploy
      steps:
        - run: ./deploy.sh
```

### Global Environment Variables

Environment variables declared at the pipeline level are injected into all stages and steps.

```yaml title="global-env.yaml"
pipeline:
  stages:
    - name: build
      env:
        REGION: us-east-1
        LOG_LEVEL: debug
        NODE_ENV: production
      steps:
        - run: echo "Deploying to $REGION"
```

### Input Variables

Declare typed inputs that can be supplied when triggering the pipeline manually or via API.

```yaml title="input-variables.yaml"
pipeline:
  stages:
    - name: deploy
      steps:
        - run: |
            echo "Deploying version ${{ inputs.version }}"
            echo "Target: ${{ inputs.environment }}"
  inputs:
    version:
      type: string
      default: "latest"
      description: "Image tag to deploy"
    environment:
      type: choice
      enum:
        - dev
        - staging
        - production
      default: dev
    api-key:
      type: secret
      description: "API key for deployment"
    replicas:
      type: number
      default: 3
```

### Conditional Execution

Use the `if` property with an expression to conditionally execute the entire pipeline.

```yaml title="conditional-pipeline.yaml"
pipeline:
  stages:
    - name: deploy
      if: ${{ branch }} == "main"
      steps:
        - run: ./deploy.sh production
```

### Repository Override

Override the default repository when the pipeline YAML is stored separately from the application source.

```yaml title="repo-override.yaml"
pipeline:
  repo:
    name: my-org/my-app
    connector: github
  clone:
    depth: 50
    lfs: true
    submodules: true
  stages:
    - name: build
      steps:
        - run: make build
```

---

## Event Triggers

The `on` property defines when a pipeline should automatically trigger. Harness 3.0 supports `push`, `pull_request`, `tag`, `schedule`, `workflow_dispatch`, and more.

### Push Trigger with Filters

```yaml title="push-trigger.yaml"
pipeline:
  on:
    push:
      branches:
        - main
        - "release/*"
      branches-ignore:
        - "release/legacy-*"
      paths:
        - "src/**"
        - "packages/**"
      paths-ignore:
        - "docs/**"
        - "*.md"
  stages:
    - name: build
      steps:
        - run: npm run build
```

### Pull Request Trigger

```yaml title="pr-trigger.yaml"
pipeline:
  on:
    pull_request:
      branches:
        - main
        - develop
      types:
        - opened
        - synchronize
        - reopened
  stages:
    - name: validate
      steps:
        - run: npm run lint
        - run: npm test
```

### Multiple Triggers

```yaml title="multiple-triggers.yaml"
pipeline:
  on:
    push:
      branches:
        - main
    pull_request:
      branches:
        - main
    schedule:
      - cron: "0 2 * * 1-5"
  stages:
    - name: build-and-test
      steps:
        - run: npm ci && npm test
```

### Tag Trigger

```yaml title="tag-trigger.yaml"
pipeline:
  on:
    push:
      tags:
        - "v*"
      tags-ignore:
        - "v*-rc*"
  stages:
    - name: release
      steps:
        - run: ./build-release.sh
```

:::info Cron Syntax
Cron triggers use standard 5-field cron syntax (minute, hour, day-of-month, month, day-of-week). All scheduled pipelines run in the UTC time zone by default.
:::

---

## Concurrency Control

Concurrency control prevents multiple runs of the same pipeline from executing simultaneously. This is critical for deployment pipelines where overlapping runs could cause conflicts.

### Basic Concurrency (String Shorthand)

```yaml title="basic-concurrency.yaml"
pipeline:
  concurrency: deploy-production
  stages:
    - name: deploy
      steps:
        - run: ./deploy.sh
```

### Concurrency with Cancel-in-Progress

Use expressions to create dynamic concurrency groups and automatically cancel in-flight runs.

```yaml title="dynamic-concurrency.yaml"
pipeline:
  concurrency:
    group: deploy-${{ branch }}
    cancel-in-progress: true
  stages:
    - name: deploy
      steps:
        - run: ./deploy.sh
```

:::warning Cancel In Progress
When `cancel-in-progress: true` is set, any in-flight pipeline run in the same concurrency group will be cancelled when a new run starts. Use this carefully with deployment pipelines to avoid leaving infrastructure in a partial state.
:::

---

## GitHub Actions Compatibility

Harness 3.0 supports GitHub Actions-style `jobs:` syntax as an alternative to `stages:`. This makes it easier to migrate existing GitHub Actions workflows to Harness. Key GHA features supported include `runs-on:` for runner selection, `needs:` for job dependencies, and `uses:` for referencing GitHub Actions directly.

### GHA-Compatible Pipeline

```yaml title="gha-compat.yaml"
name: CI Pipeline
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: linux
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
  deploy:
    needs: build
    runs-on: linux
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
```

### Permissions (GHA Feature)

Configure GitHub token permissions at the pipeline level. Supports shorthand (`read-all`, `write-all`) or granular per-resource permissions.

```yaml title="permissions.yaml"
pipeline:
  permissions:
    contents: read
    pull-requests: write
    id-token: write
  stages:
    - name: build
      steps:
        - run: npm ci
```

### Native Harness vs GHA Syntax

```yaml title="harness-native.yaml"
# Harness Native Syntax
pipeline:
  stages:
    - name: build
      steps:
        - run: npm ci
        - run: npm test
    - name: deploy
      steps:
        - run: ./deploy.sh
```

```yaml title="gha-syntax.yaml"
# GitHub Actions Syntax (also works)
name: CI Pipeline
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: linux
    steps:
      - run: npm ci
      - run: npm test
  deploy:
    needs: build
    runs-on: linux
    steps:
      - run: ./deploy.sh
```

### Migration Path

If you are migrating from GitHub Actions, you can use the `jobs:` syntax directly in Harness 3.0 with minimal changes. GitHub Actions workflows use root-level keys like `name:`, `on:`, and `jobs:` without a `pipeline:` wrapper. Most GitHub Actions are supported natively via the `uses:` keyword.