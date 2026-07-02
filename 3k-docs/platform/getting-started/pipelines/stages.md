---
title: Stages & Stage Groups
sidebar_label: Stages & Stage Groups
description: Stages are the major execution blocks of a Harness 3.0 pipeline — each with its own runtime, caching, failure strategies, and steps. Supports sequential, parallel, matrix, and grouped execution.
---

A Stage is a major execution block within a pipeline. Each stage has its own runtime environment, caching configuration, failure strategies, and execution steps. Stages run sequentially by default, but can be configured for parallel execution or matrix-based fan-out.

:::info Key Concept
In Harness 3.0, stages no longer require explicit type declarations like CI or Deployment. A stage is a container for steps, with deployment behavior configured through `service` and `environment` references.
:::

---

## Stage Schema

The `Stage` interface defines the complete structure of a stage in a v1 pipeline. Execution types (`steps`, `approval`, `group`, `parallel`, `template`, `chain`) are mutually exclusive — each stage uses exactly one.

```typescript title="stage-schema.ts"
interface Stage {
  // Identifiers
  id: string                              // Stage identifier
  name: string                            // Display name

  // Execution types (mutually exclusive)
  steps: Step[]                           // Regular step execution
  approval: { uses: string; with: Record<string, any> }  // Approval gate
  group: { stages: Stage[] }              // Grouped stages (sequential)
  parallel: { stages: Stage[] }           // Parallel stages
  template: { uses: string; with: Record<string, any> }  // Template reference
  chain: { uses: string; with: Record<string, any> }     // Chained pipeline

  // Configuration
  inputs: Input                           // Stage input variables
  env: Record<string, string>             // Stage environment variables
  outputs: Record<string, any>            // Output variables for inter-stage communication
  clone: boolean | CloneConfig            // Stage-level clone override
  delegate: string | string[]             // Delegate selector

  // Runtime & Platform
  runtime: "cloud" | "vm" | "kubernetes" | "shell" | RuntimeConfig
  platform: { os: string; arch: string }  // Target OS and architecture
  workspace: boolean | { disabled: boolean; path: string }

  // Resources
  cache: {                                // Cache configuration
    disabled: boolean
    path: string | string[]
    key: string
    policy: "pull" | "pull-push" | "push"
  }
  volumes: Volume[]                       // Volume definitions

  // Deployment targets
  service: ServiceRef                     // Stage service target
  environment: EnvironmentRef             // Stage environment target
  rollback: Step                          // Rollback step on failure

  // Control flow
  if: string                              // Conditional execution
  disabled: boolean                       // Disable stage
  on-failure: FailureStrategy             // Failure handling
  timeout: string                         // Max execution time
  strategy: Strategy                      // Matrix/looping strategy
  concurrency: ConcurrencyConfig          // Concurrency controls
  status: StatusConfig                    // Status check configuration

  // GitHub Actions compatibility
  needs: string | string[]                // Stage dependencies
  runs-on: string                         // Machine type
  services: Record<string, Container>     // Background services
  permissions: Permissions                // Stage permissions
}
```

---

## Properties Reference

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the stage |
| `name` | `string` | Display name for the stage |
| `steps` | `Step[]` | List of steps for regular sequential execution |
| `approval` | `{ uses, with }` | Approval gate using a named provider and configuration |
| `group` | `{ stages: Stage[] }` | Sequential group of nested substages |
| `parallel` | `{ stages: Stage[] }` | Concurrent group of nested substages |
| `template` | `{ uses, with }` | Reference to a reusable stage template with inputs |
| `chain` | `{ uses, with }` | Triggers another pipeline as a child execution |
| `inputs` | `Input` | Stage input variables for parameterization |
| `env` | `Record<string, string>` | Stage-level environment variables available to all steps |
| `outputs` | `Record<string, any>` | Output variables for inter-stage communication |
| `clone` | `boolean \| CloneConfig` | Stage-level clone override for repository checkout |
| `delegate` | `string \| string[]` | Delegate selector for routing stage execution |
| `runtime` | `string \| RuntimeConfig` | Runtime infrastructure: `cloud`, `vm`, `kubernetes`, `shell`, or detailed config |
| `platform` | `{ os, arch }` | Target operating system and architecture |
| `workspace` | `boolean \| { disabled, path }` | Workspace configuration for shared filesystem |
| `cache` | `CacheConfig` | Cache configuration with `path`, `key`, and `policy` (`pull`, `pull-push`, `push`) |
| `volumes` | `Volume[]` | Volume definitions for shared storage between steps |
| `service` | `ServiceRef` | Service reference for deployment stages |
| `environment` | `EnvironmentRef` | Environment reference for deployment stages |
| `rollback` | `Step` | Rollback step executed on stage failure |
| `if` | `string` | Expression that controls conditional execution |
| `disabled` | `boolean` | When `true`, the stage is skipped without removing it from the YAML |
| `on-failure` | `FailureStrategy` | Failure handling strategy with error matching and actions |
| `timeout` | `string` | Maximum execution time (e.g., `30m`, `2h`) |
| `strategy` | `Strategy` | Matrix, for-loop, or while-loop execution strategy |
| `concurrency` | `ConcurrencyConfig` | Concurrency controls for parallel execution limits |
| `status` | `StatusConfig` | Status check configuration for the stage |
| `needs` | `string \| string[]` | Stage dependencies (GitHub Actions compatibility) |
| `runs-on` | `string` | Machine type selector (GitHub Actions compatibility) |
| `services` | `Record<string, Container>` | Background service containers for the stage |
| `permissions` | `Permissions` | Stage-level permissions (GitHub Actions compatibility) |

---

## Stage Types

There are six functional patterns for stages. The execution types are mutually exclusive — each stage uses exactly one of `steps`, `approval`, `template`, `chain`, `group`, or `parallel`.

### 1. Steps Stage (Default)

The default stage type. Contains a list of steps that execute sequentially.

```yaml title="steps-stage.yaml"
stages:
  - name: build
    steps:
      - run: npm install
      - run: npm run build
      - run: npm test
```

### 2. Approval Stage

Pauses the pipeline and waits for manual or automated approval before proceeding.

```yaml title="approval-stage.yaml"
stages:
  - name: approve-deploy
    approval:
      uses: harness
      with:
        approvers:
          users:
            - admin@company.com
          minimum: 1
        message: "Please approve production deployment"
        timeout: 24h
```

### 3. Template Stage

References a reusable stage template with parameterized inputs.

```yaml title="template-stage.yaml"
stages:
  - name: deploy-staging
    template:
      uses: account.deploy-template@1.2.0
      with:
        environment: staging
        replicas: 2
```

### 4. Chain Stage

Triggers another pipeline as a child execution, passing context and inputs.

```yaml title="chain-stage.yaml"
stages:
  - name: run-integration-tests
    chain:
      uses: integration-test-pipeline
      with:
        build_number: ${{ stages.build.outputs.BUILD_NUMBER }}
```

### 5. Group Stage

Organizes multiple substages into a sequential group with shared configuration.

```yaml title="group-stage.yaml"
stages:
  - name: deploy-all
    group:
      stages:
        - name: deploy-staging
          steps:
            - run: ./deploy.sh staging
        - name: deploy-production
          steps:
            - run: ./deploy.sh production
```

### 6. Parallel Stage

Runs multiple substages concurrently. The pipeline waits for all to complete before continuing.

```yaml title="parallel-stage.yaml"
stages:
  - name: test-all
    parallel:
      stages:
        - name: unit-tests
          steps:
            - run: npm run test:unit
        - name: integration-tests
          steps:
            - run: npm run test:integration
```

---

## Stage Groups

Stage groups organize related stages together and allow shared configuration like failure strategies or conditionals to apply to all stages in the group.

### Basic Group

```yaml title="stage-group.yaml"
stages:
  - name: integration-tests
    group:
      stages:
        - name: api-tests
          steps:
            - run: npm run test:api
        - name: e2e-tests
          steps:
            - run: npm run test:e2e
        - name: performance-tests
          steps:
            - run: npm run test:perf
```

### Conditional Group

Apply a condition to an entire group. When the condition evaluates to `false`, all stages in the group are skipped.

```yaml title="conditional-group.yaml"
stages:
  - name: build
    steps:
      - run: npm run build
  - name: deploy-stages
    if: ${{ trigger.branch == "main" }}
    group:
      stages:
        - name: deploy-staging
          steps:
            - run: ./deploy.sh staging
        - name: deploy-production
          steps:
            - run: ./deploy.sh production
```

### Group with Shared Failure Strategy

Apply a failure strategy to the entire group so all substages inherit the same behavior.

```yaml title="group-failure-strategy.yaml"
stages:
  - name: deployment-pipeline
    on-failure:
      action:
        manual-intervention:
          timeout: 1h
          timeout-action: abort
    group:
      stages:
        - name: deploy-staging
          steps:
            - run: ./deploy.sh staging
        - name: run-smoke-tests
          steps:
            - run: npm run test:smoke
        - name: deploy-production
          steps:
            - run: ./deploy.sh production
```

---

## Parallel Execution

Use the `parallel:` keyword to run multiple stages concurrently. All stages in a parallel block start simultaneously, and the pipeline waits for all to complete before continuing.

```yaml title="parallel-stages.yaml"
stages:
  - name: build
    steps:
      - run: npm run build
  - name: test-all
    parallel:
      stages:
        - name: unit-tests
          steps:
            - run: npm run test:unit
        - name: integration-tests
          steps:
            - run: npm run test:integration
        - name: lint
          steps:
            - run: npm run lint
  - name: deploy
    steps:
      - run: ./deploy.sh
```

:::info Parallel Performance
Parallel stages each get their own runtime environment and can run on different machines or containers simultaneously, significantly reducing total pipeline execution time.
:::

Individual stages within a parallel block can also have their own conditions.

```yaml title="parallel-conditional.yaml"
stages:
  - name: quality-checks
    parallel:
      stages:
        - name: unit-tests
          steps:
            - run: npm run test:unit
        - name: security-scan
          if: ${{ trigger.branch == "main" }}
          steps:
            - run: npm run security:scan
        - name: license-check
          steps:
            - run: npm run license:check
```

---

## Matrix Strategy

The `strategy` field supports three looping patterns: `matrix`, `for`, and `while`.

### Matrix

Creates stage instances for each combination of matrix variables. Use `include` to add extra combinations and `exclude` to remove specific ones.

```yaml title="matrix-strategy.yaml"
stages:
  - name: test
    strategy:
      matrix:
        go: ["1.21", "1.22", "1.23"]
        os: [linux, macos, windows]
        include:
          - go: "1.23"
            os: linux
            experimental: true
        exclude:
          - go: "1.21"
            os: windows
      max-parallel: 4
      fail-fast: true
    steps:
      - run: echo "Testing Go ${{ matrix.go }} on ${{ matrix.os }}"
```

Use `max-parallel` to limit concurrency and `fail-fast` to cancel remaining instances on the first failure.

### For Loop

Iterate a stage a fixed number of times. Access the current iteration index via `${{ for.iteration }}`.

```yaml title="for-loop.yaml"
stages:
  - name: deploy
    strategy:
      for:
        iterations: 3
    steps:
      - run: echo "Iteration ${{ for.iteration }}"
```

### While Loop

Repeat a stage while a condition evaluates to `true`. Set `iterations` as a safety bound on maximum repetitions.

```yaml title="while-loop.yaml"
stages:
  - name: wait-for-healthy
    strategy:
      while:
        iterations: 10
        condition: ${{ steps.health_check.output.STATUS }} != "healthy"
    steps:
      - name: health_check
        run: curl -s https://api.example.com/health
```

---

## Conditional Execution

### Expression-Based Conditions

```yaml title="conditional-stages.yaml"
stages:
  - name: build
    steps:
      - run: npm run build
  - name: deploy-staging
    if: ${{ trigger.branch == "develop" }}
    steps:
      - run: ./deploy.sh staging
  - name: deploy-production
    if: ${{ trigger.branch == "main" && trigger.event == "push" }}
    steps:
      - run: ./deploy.sh production
  - name: notify
    if: always()
    steps:
      - run: ./send-notification.sh
```

Use `always()` to run a stage regardless of previous outcomes, `failure()` to run only when a previous stage failed, and `success()` (the default) to run only when all previous stages succeeded.

### Disabled Stage

Set `disabled: true` to skip a stage without removing it from the YAML. Useful for debugging or temporary suppression.

```yaml title="disabled-stage.yaml"
stages:
  - name: build
    steps:
      - run: npm run build
  - name: experimental-deploy
    disabled: true
    steps:
      - run: ./deploy-experimental.sh
```

---

## Failure Strategies

Define how a stage handles failures using the `on-failure` property. Strategies can match specific error types and define actions including retry, manual intervention, and rollback.

### Error Types

| Error Type | Description |
|---|---|
| `all` | Match all error types |
| `timeout` | Step or stage exceeded its configured timeout |
| `authentication` | Authentication failure |
| `authorization` | Authorization failure |
| `connectivity` | Network connectivity issue |
| `delegate-provisioning` | Delegate provisioning failure |
| `input-timeout` | Input approval timed out |
| `verification` | Verification step failure |
| `unknown` | Unknown error type |

### Action Types

| Action | Description |
|---|---|
| `abort` | Abort the pipeline |
| `fail` | Mark as failed (default behavior) |
| `ignore` | Ignore the failure and continue |
| `retry` | Retry the step or stage |
| `manual-intervention` | Pause for manual intervention |
| `stage-rollback` | Rollback the stage |
| `pipeline-rollback` | Rollback the entire pipeline |
| `success` | Mark as success despite failure |

### Ignore Failures

```yaml title="ignore-failure.yaml"
on-failure:
  action: ignore
```

### Retry with Configuration

```yaml title="retry-config.yaml"
on-failure:
  errors:
    - connectivity
    - timeout
  action:
    retry:
      attempts: 3
      interval:
        - "10s"
        - "30s"
        - "1m"
      failure-action: abort
```

### Manual Intervention

```yaml title="manual-intervention.yaml"
on-failure:
  action:
    manual-intervention:
      timeout: 1h
      timeout-action: abort
```

### Match Specific Exit Codes

```yaml title="exitcode-failure.yaml"
on-failure:
  exitcode: "1"
  action: ignore
```

:::warning Failure Propagation
If no failure strategy is defined, stage failures propagate up to the pipeline level. The pipeline will be marked as failed and subsequent stages will not execute unless they have an `if: always()` condition.
:::