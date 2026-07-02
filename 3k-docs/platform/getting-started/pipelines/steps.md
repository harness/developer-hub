---
title: Steps Reference
sidebar_label: Steps
description: Steps are the smallest executable units in a Harness 3.0 pipeline — run scripts, invoke actions, request approvals, manage background services, and more.
---

A Step is the smallest executable unit within a pipeline stage. Steps are the building blocks that perform actual work — running scripts, invoking actions, requesting approvals, or managing background services. Harness 3.0 provides multiple step types with a flexible, short-form YAML syntax.

---

## Step Types

| Step Type | Key | Description |
|---|---|---|
| Run | `run` | Execute shell commands |
| Run-Test | `run-test` | Execute tests with intelligence and splitting |
| Action | `action` | Invoke actions and plugins |
| Clone | `clone` | Clone a repository |
| Approval | `approval` | Request human or automated approval |
| Background | `background` | Start long-running services |
| Barrier | `barrier` | Synchronize parallel stages |
| Group | `group` | Sequential substeps |
| Parallel | `parallel` | Concurrent substeps |
| Queue | `queue` | Queue management |
| Template | `template` | Reference a reusable template |

---

## Common Step Properties

All step types share these common properties in addition to their type-specific fields.

```typescript title="step-common.ts"
interface StepCommon {
  id: string                              // Step identifier
  name: string                            // Display name
  if: string                              // Conditional execution
  disabled: boolean                       // Disable step
  timeout: string                         // Max execution time
  needs: string | string[]                // Step dependencies
  strategy: Strategy                      // Matrix/looping
  status: StatusConfig                    // Status configuration
  on-failure: FailureStrategy             // Failure handling
  delegate: DelegateSelector              // Delegate selector
  env: Record<string, string>             // Environment variables (GHA compat)
}
```

---

## Run Step

The Run step executes shell commands. It supports multiple syntax variants from single-line shorthand to fully configured forms with containers, environment variables, and test reports.

```typescript title="step-run-schema.ts"
// Short form: a single string
type StepRunShort = string

// Long form
interface StepRun {
  shell: "sh" | "bash" | "powershell" | "pwsh" | "python"
  script: string | string[]              // Command script(s)
  container: string | {                  // Container image
    image: string
    connector: string                    // Registry connector
    credentials: { username: string; password: string }
    pull: "always" | "never" | "if-not-exists"
    entrypoint: string | string[]
    args: string | string[]
    env: Record<string, string>
    privileged: boolean
    user: string | number
    group: string | number
    cpu: string | number
    memory: string | number              // e.g., "1gb", "512m"
    volumes: Mount[]
    ports: string[]
    network: string
  }
  env: Record<string, string>            // Environment variables
  report: Report | Report[]              // Test report paths
}
```

### Shortest Syntax

```yaml title="run-shortest.yaml"
steps:
  - run: echo "Hello"
```

### Named Step

```yaml title="run-named.yaml"
steps:
  - name: install
    run: npm install
```

### Multi-Line Script

```yaml title="run-multiline.yaml"
steps:
  - name: setup-and-build
    run: |
      echo "Setting up environment..."
      export BUILD_DATE=$(date +%Y-%m-%d)
      npm ci --production
      npm run build
      echo "Build completed at $BUILD_DATE"
```

### Array of Commands

Each command runs independently. If one fails, subsequent commands are skipped.

```yaml title="run-array.yaml"
steps:
  - name: build-steps
    run:
      - npm ci
      - npm run lint
      - npm run build
      - npm test
```

### With Container

Run the step inside a specific container image. Supports both a short-form string and a long-form object with pull policy, credentials, and resource limits.

```yaml title="run-container.yaml"
# Short form: image string
steps:
  - name: build
    run:
      script: go build ./...
      container: golang:1.23-alpine

# Long form: full container configuration
  - name: test-with-config
    run:
      script: pytest tests/
      container:
        image: python:3.12
        pull: always
        credentials:
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_PASS }}
        memory: 1gb
        cpu: 2
```

### With Environment Variables

```yaml title="run-env.yaml"
steps:
  - name: deploy
    run:
      script: ./deploy.sh
      env:
        AWS_REGION: us-east-1
        DEPLOY_ENV: production
        API_KEY: ${{ secrets.API_KEY }}
        BUILD_NUMBER: ${{ pipeline.sequenceId }}
```

### With Shell Selection

Supported values: `sh`, `bash`, `powershell`, `pwsh`, `python`.

```yaml title="run-shell.yaml"
steps:
  - name: bash-script
    run:
      shell: bash
      script: |
        set -euo pipefail
        echo "Running with bash"
  - name: python-script
    run:
      shell: python
      script: |
        import os
        print(f"Python version: {os.sys.version}")
        result = 2 + 2
        print(f"Result: {result}")
  - name: powershell-script
    run:
      shell: powershell
      script: |
        Write-Host "Running on Windows"
        Get-Process | Select-Object -First 5
```

### With Test Reports

```yaml title="run-report.yaml"
steps:
  - name: test
    run:
      script: npm test -- --coverage
      report:
        type: junit
        path:
          - "coverage/junit.xml"
          - "coverage/report-*.xml"
```

---

## Run-Test Step

The Run-Test step extends the Run step with built-in test intelligence, test splitting, and test report collection. Harness analyzes test results, identifies flaky tests, and optimizes execution through intelligent parallelism.

```typescript title="step-test-schema.ts"
interface StepTest {
  shell: "sh" | "bash" | "powershell" | "pwsh" | "python"
  script: string | string[]
  match: string | string[]               // Test file patterns
  container: string | ContainerConfig
  env: Record<string, string>
  splitting: {                            // Test splitting
    disabled: boolean
    concurrency: number                   // Parallel splits
  }
  intelligence: {                         // Test intelligence
    disabled: boolean
  }
  report: Report | Report[]
}
```

### Basic Test Step

```yaml title="test-basic.yaml"
steps:
  - name: unit-tests
    run-test:
      script: npm test
      report:
        type: junit
        path:
          - "coverage/junit.xml"
```

### Test Intelligence

Harness Test Intelligence selects only the tests relevant to code changes, significantly reducing execution time.

```yaml title="test-intelligence.yaml"
steps:
  - name: smart-tests
    run-test:
      script: mvn test
      intelligence:
        disabled: false
      report:
        type: junit
        path:
          - "target/surefire-reports/*.xml"
```

### Test Splitting

Distribute tests across parallel instances for faster execution.

```yaml title="test-splitting.yaml"
steps:
  - name: parallel-tests
    run-test:
      script: npx jest --shard=${{ split.index }}/${{ split.total }}
      match:
        - "src/**/*.test.ts"
      splitting:
        concurrency: 4
      report:
        type: junit
        path:
          - "coverage/junit-*.xml"
```

---

## Action Step

Action steps invoke pre-built integrations and plugins. Harness 3.0 supports GitHub Actions (via `uses:`), Harness plugins, and Drone plugins.

```typescript title="step-action-schema.ts"
interface StepAction {
  uses: string                            // Action reference
  with: Record<string, any>              // Action inputs
  env: Record<string, string>            // Environment variables
  report: Report | Report[]
}
```

### GitHub Action

```yaml title="action-gha.yaml"
steps:
  - action:
      uses: actions/checkout@v4
  - action:
      uses: actions/setup-node@v4
      with:
        node-version: "20"
        cache: npm
  - run: npm ci
  - run: npm test
```

### Action with Inputs

```yaml title="action-with-inputs.yaml"
steps:
  - name: upload-artifact
    action:
      uses: actions/upload-artifact@v4
      with:
        name: build-output
        path: dist/
        retention-days: 5
```

### Harness Plugin

```yaml title="action-plugin.yaml"
steps:
  - name: build-and-push
    action:
      uses: docker-build-push
      with:
        registry: docker.io
        repo: my-org/my-app
        tags:
          - latest
          - ${{ pipeline.sequenceId }}
        dockerfile: Dockerfile
        context: .
        username: ${{ secrets.DOCKER_USER }}
        password: ${{ secrets.DOCKER_PASS }}
```

:::info GitHub Actions Compatibility
Harness 3.0 supports most GitHub Actions out of the box. Actions execute inside containers with the appropriate runtime. Some Actions that depend on GitHub-specific APIs may require configuration adjustments.
:::

---

## Approval Step

Approval steps pause pipeline execution and wait for human or automated approval. Harness 3.0 supports native Harness approvals, Jira-based approvals, and ServiceNow-based approvals via the `uses:` field.

```typescript title="step-approval-schema.ts"
interface StepApproval {
  uses: string                            // Approval system (harness, jira, servicenow)
  with: Record<string, any>              // Configuration
  env: Record<string, string>
}
```

### Harness Approval

```yaml title="approval-harness.yaml"
steps:
  - name: approve-production
    approval:
      uses: harness
      with:
        approvers:
          users:
            - admin@company.com
            - devops-lead@company.com
          groups:
            - production-approvers
          minimum: 1
        message: |
          Production deployment for version ${{ inputs.version }}.
          Please review and approve.
        timeout: 4h
```

### Jira Approval

```yaml title="approval-jira.yaml"
steps:
  - name: jira-approval
    approval:
      uses: jira
      with:
        connector: jira-connector
        project: DEPLOY
        issue_type: "Change Request"
        status: Approved
        fields:
          Summary: "Deploy ${{ inputs.version }} to production"
          Description: "Automated deployment request"
        timeout: 24h
```

### ServiceNow Approval

```yaml title="approval-servicenow.yaml"
steps:
  - name: snow-approval
    approval:
      uses: servicenow
      with:
        connector: snow-connector
        ticket_type: change_request
        fields:
          short_description: "Production deployment"
          category: Software
          priority: "3 - Moderate"
        approval_criteria:
          status: Approved
        timeout: 48h
```

---

## Background Step

Background steps start long-running services that remain active for the duration of the stage. They share the same structure as Run steps but use the `background:` key. Typical uses include databases, caches, and local dev servers needed for integration testing.

### Redis Service

```yaml title="background-redis.yaml"
steps:
  - name: redis
    background:
      container: redis:7-alpine
  - name: run-tests
    run:
      script: npm test
      env:
        REDIS_URL: redis://redis:6379
```

### PostgreSQL Service

```yaml title="background-postgres.yaml"
steps:
  - name: postgres
    background:
      script: docker-entrypoint.sh postgres
      container:
        image: postgres:16-alpine
        ports:
          - "5432:5432"
      env:
        POSTGRES_DB: testdb
        POSTGRES_USER: testuser
        POSTGRES_PASSWORD: testpass
  - name: run-migrations
    run:
      script: npm run db:migrate
      env:
        DATABASE_URL: postgres://testuser:testpass@postgres:5432/testdb
  - name: run-tests
    run:
      script: npm test
      env:
        DATABASE_URL: postgres://testuser:testpass@postgres:5432/testdb
```

### Local Dev Server

```yaml title="background-dev-server.yaml"
steps:
  - name: app-server
    background:
      script: npm start
      container:
        image: node:20-alpine
        ports:
          - "3000:3000"
  - name: e2e-tests
    run:
      script: npx cypress run
      env:
        BASE_URL: http://app-server:3000
```

:::warning Readiness Probes
Background services may take time to initialize. Use readiness probes or add an explicit wait step to ensure services are fully available before subsequent steps begin. Without verification, dependent steps may encounter connection failures.
:::

---

## Barrier Step

Barrier steps synchronize execution across parallel stages. When a barrier is reached, the stage pauses until all other stages referencing the same barrier name also reach it. Barrier names must be declared in the `pipeline.barriers` list.

```typescript title="step-barrier-schema.ts"
interface StepBarrier {
  name: string                            // Barrier name (must match pipeline.barriers)
}
```

### Synchronizing Parallel Stages

```yaml title="barrier-step.yaml"
pipeline:
  barriers:
    - deployment-sync
  stages:
    - parallel:
        stages:
          - name: deploy-service-a
            steps:
              - run: ./deploy.sh service-a
              - barrier:
                  name: deployment-sync
              - run: ./verify.sh service-a
          - name: deploy-service-b
            steps:
              - run: ./deploy.sh service-b
              - barrier:
                  name: deployment-sync
              - run: ./verify.sh service-b
          - name: deploy-service-c
            steps:
              - run: ./deploy.sh service-c
              - barrier:
                  name: deployment-sync
              - run: ./verify.sh service-c
```

:::info Barrier Scope
Barriers are scoped to the current pipeline execution. All parallel stages referencing the same barrier name will wait for each other. If a stage fails before reaching the barrier, the barrier times out after the specified duration.
:::

---

## Clone Step

The Clone step checks out source code from a repository. By default, Harness automatically clones the pipeline repository, but the Clone step allows full customization of depth, submodules, sparse checkout, and more.

```typescript title="step-clone-schema.ts"
interface StepClone {
  repo: string                            // Repository name
  connector: string                       // Repository connector
  clean: boolean                          // Run git clean/reset
  depth: number                           // Clone depth
  disabled: boolean                       // Disable clone
  filter: string                          // Partial clone filter
  insecure: boolean                       // Skip SSL
  lfs: boolean                            // Clone LFS files
  path: string                            // Workspace path
  "set-safe-directory": boolean           // git safe.directory
  "sparse-checkout": string               // Sparse checkout patterns
  strategy: "source-branch" | "merge"     // Clone strategy
  submodules: boolean                     // Clone submodules
  tags: boolean                           // Clone tags
  trace: boolean                          // Enable trace
  ref: string | {                         // Branch/tag/SHA
    name: string
    type: "branch" | "pull-request" | "tag"
    sha: string
  }
}
```

| Property | Type | Description |
|---|---|---|
| `repo` | `string` | Repository name to clone |
| `depth` | `number` | Clone depth (0 for full history) |
| `submodules` | `boolean` | Initialize and clone submodules |
| `lfs` | `boolean` | Fetch Git LFS files |
| `sparse-checkout` | `string` | Sparse checkout patterns |
| `strategy` | `string` | `source-branch` or `merge` |
| `ref` | `string \| object` | Branch, tag, SHA, or structured ref object |

### Shallow Clone

```yaml title="clone-shallow.yaml"
steps:
  - clone:
      depth: 1
```

### With Submodules

```yaml title="clone-submodules.yaml"
steps:
  - clone:
      depth: 50
      submodules: true
      tags: true
```

### Clone a Specific Repository

```yaml title="clone-specific-repo.yaml"
steps:
  - name: clone-shared-lib
    clone:
      repo: my-org/shared-library
      connector: github-connector
      path: ./libs/shared
      depth: 1
```

### PR Clone Ref

```yaml title="clone-pr-ref.yaml"
steps:
  - clone:
      ref:
        name: feature/new-api
        type: pull-request
        sha: abc123def
      strategy: merge
      depth: 10
```

### Sparse Checkout

Clone only specific directories from a large monorepo.

```yaml title="clone-sparse.yaml"
steps:
  - clone:
      sparse-checkout: |
        services/api/
        packages/shared/
        configs/
      depth: 1
```

:::info Default Clone Behavior
If no Clone step is defined and `clone: disabled` is not set at the stage or pipeline level, Harness automatically clones the pipeline repository with default settings.
:::

---

## Group & Parallel Steps

Steps can be organized into sequential groups or run in parallel within a stage. Both `group:` and `parallel:` accept nested step lists and support conditionals, failure strategies, and other common step properties.

### Sequential Group

```yaml title="step-group.yaml"
steps:
  - name: build-and-test
    group:
      steps:
        - run: npm ci
        - run: npm run build
        - run: npm test
  - name: deploy
    if: ${{ trigger.branch }} == "main"
    group:
      steps:
        - run: ./deploy.sh staging
        - run: ./verify.sh staging
```

### Parallel Steps

All parallel steps must complete before the next step begins.

```yaml title="parallel-steps.yaml"
steps:
  - run: npm ci
  - parallel:
      steps:
        - name: lint
          run: npm run lint
        - name: typecheck
          run: npm run typecheck
        - name: unit-tests
          run: npm test
  - run: npm run build
```

### Group with Failure Strategy

```yaml title="group-failure.yaml"
steps:
  - name: optional-checks
    on-failure: ignore
    group:
      steps:
        - name: lint
          run: npm run lint
        - name: audit
          run: npm audit
```

:::warning Parallel Step Isolation
Parallel steps share the same filesystem within a stage but execute concurrently. Be careful with steps that write to the same files. If isolation is needed, consider using parallel stages instead.
:::

---

## Template Step

Template steps reference reusable step templates stored in the Harness template library. The `uses:` field follows the pattern `account.name@version`.

```typescript title="step-template-schema.ts"
interface StepTemplate {
  uses: string                            // Template ref (account.name[@version])
  with: Record<string, any>              // Input parameters
  env: Record<string, string>
}
```

### Basic Template Reference

```yaml title="template-basic.yaml"
steps:
  - name: deploy
    template:
      uses: account.deploy-to-k8s@1.0.0
      with:
        namespace: production
        replicas: 3
        image: my-app:${{ pipeline.sequenceId }}
```

### Template with Version Pinning

```yaml title="template-versioned.yaml"
steps:
  - name: scan
    template:
      uses: account.security-scan@1.5.2
      with:
        scan_type: full
        severity_threshold: high
        fail_on_critical: true
  - name: publish
    template:
      uses: account.publish-artifact@3.0.0
      with:
        registry: docker.io
        repo: my-org/my-app
        tag: ${{ inputs.version }}
```

### Template with Inputs and Env

```yaml title="template-inputs-env.yaml"
steps:
  - name: notify
    template:
      uses: account.slack-notify@2.1.0
      with:
        channel: "#deployments"
        message: "Deployed ${{ inputs.version }}"
      env:
        SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
```

:::warning Template Versioning
Always pin template versions in production pipelines. Using `latest` or omitting the version may cause unexpected behavior when the template is updated. Use semantic versioning (e.g., `account.my-template@2.1.0`) for reproducible builds.
:::