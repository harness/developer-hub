---
title: Advanced Configuration
sidebar_label: Advanced Configuration
description: Advanced Harness 3.0 pipeline capabilities — caching, volumes, failure strategies, execution strategies, concurrency control, container configuration, clone settings, permissions, and test reporting.
---

This section covers advanced pipeline capabilities including caching, volumes, failure strategies, execution strategies, concurrency control, container configuration, clone settings, permissions, and test reporting.

---

## Caching

Caching preserves files between pipeline runs to speed up builds. Harness 3.0 supports key-based caching with automatic invalidation based on file hashes.

```typescript title="cache-schema.ts"
interface CacheConfig {
  // Cache key (supports expressions and hashFiles)
  key: string
  // Fallback keys to try if the primary key misses
  restore_keys: string[]
  // Paths to cache
  paths: string[]
  // Cache backend (auto, s3, gcs)
  backend: string
}
```

### Node.js Cache

```yaml title="cache-node.yaml"
stages:
  - name: build
    cache:
      key: node-${{ hashFiles('**/package-lock.json') }}
      restore_keys:
        - node-
      paths:
        - node_modules/
        - ~/.npm
    steps:
      - run: npm ci
      - run: npm run build
      - run: npm test
```

### Multi-Language Cache

```yaml title="cache-multi.yaml"
stages:
  - name: build
    cache:
      key: deps-${{ hashFiles('**/go.sum', '**/package-lock.json') }}
      restore_keys:
        - deps-go-${{ hashFiles('**/go.sum') }}
        - deps-node-${{ hashFiles('**/package-lock.json') }}
        - deps-
      paths:
        - node_modules/
        - ~/go/pkg/mod
        - ~/.cache/go-build
    steps:
      - run: go mod download
      - run: npm ci
      - run: make build
```

:::info Cache Invalidation
Cache keys are matched exactly. When the hash of your lock files changes, the primary key will miss and Harness will try the `restore_keys` in order. After the stage completes, the cache is saved under the primary key.
:::

---

## Volumes

Volumes provide shared storage between steps within a stage. They are useful for sharing build artifacts, caches, or data between steps that run in different containers.

```typescript title="volume-schema.ts"
interface VolumeConfig {
  // Volume name
  name: string
  // Volume type
  type: "temp" | "host" | "claim"
  // Mount path inside the container
  path: string
  // Persistent volume claim name (for claim type)
  claim_name: string
  // Host path (for host type)
  host_path: string
  // Size limit (for temp type)
  size: string
}
```

### Temporary Volume

```yaml title="volume-temp.yaml"
stages:
  - name: build-and-test
    volumes:
      - name: build-output
        type: temp
        path: /workspace/dist
        size: 5Gi
    steps:
      - name: build
        run: npm run build --output /workspace/dist
        container: node:20
      - name: test
        run: npm test -- --coverage-dir /workspace/dist/coverage
        container: node:20
```

### Host Volume

```yaml title="volume-host.yaml"
stages:
  - name: build
    runtime:
      type: shell
    volumes:
      - name: docker-socket
        type: host
        host_path: /var/run/docker.sock
        path: /var/run/docker.sock
    steps:
      - run: docker build -t my-app .
```

### Persistent Volume Claim

```yaml title="volume-pvc.yaml"
stages:
  - name: build
    runtime:
      type: kubernetes
      spec:
        connector: k8s-cluster
        namespace: ci
    volumes:
      - name: shared-cache
        type: claim
        claim_name: ci-cache-pvc
        path: /cache
    steps:
      - run: |
          cp -r /cache/node_modules node_modules/ 2>/dev/null || true
          npm ci
          cp -r node_modules/ /cache/node_modules/
```

---

## Failure Strategies

Failure strategies define how the pipeline responds to errors at the step, stage, or pipeline level. Strategies can be simple actions or complex chains with escalation paths.

```typescript title="failure-strategy-schema.ts"
interface FailureStrategy {
  // Action to take on failure
  action: "ignore" | "retry" | "abort"
         | "manual-intervention" | "mark-as-success"
         | "rollback"
  // Error types to match
  errors: ("timeout" | "authentication" | "connectivity"
           | "verification" | "unknown" | "all")[]
  // Retry configuration
  retry: {
    count: number
    interval: Duration
    backoff: "fixed" | "exponential"
  }
  // Manual intervention configuration
  manual_intervention: {
    timeout: Duration
    on_timeout: "abort" | "ignore" | "mark-as-success"
    approvers: { users: string[]; groups: string[] }
  }
  // Rollback configuration
  rollback: {
    steps: Step[]
  }
}
```

### Error-Specific Strategies

```yaml title="failure-error-specific.yaml"
stages:
  - name: deploy
    on_failure:
      - errors:
          - timeout
        action: retry
        retry:
          count: 2
          interval: 30s
      - errors:
          - authentication
        action: abort
      - errors:
          - all
        action: manual-intervention
        manual_intervention:
          timeout: 1h
          on_timeout: abort
    steps:
      - run: ./deploy.sh production
```

### Rollback Strategy

```yaml title="failure-rollback.yaml"
stages:
  - name: deploy-production
    on_failure:
      action: rollback
      rollback:
        steps:
          - run: |
              echo "Rolling back to previous version"
              kubectl rollout undo deployment/my-app
          - run: |
              echo "Verifying rollback"
              ./health-check.sh production
    steps:
      - run: kubectl apply -f k8s/
      - run: kubectl rollout status deployment/my-app --timeout=5m
```

---

## Strategy (Matrix & Loops)

Execution strategies control how stages or steps are repeated. Harness 3.0 supports matrix expansion, for loops, and while loops.

```typescript title="strategy-schema.ts"
interface StrategyConfig {
  // Matrix: creates combinations of variables
  matrix: {
    [dimension: string]: any[]
    include: Record<string, any>[]
    exclude: Record<string, any>[]
  }
  // For loop: iterates over items
  for: {
    items: any[]
    max_concurrency: number
  }
  // While loop: repeats while condition is true
  while: {
    condition: string
    max_iterations: number
    delay: Duration
  }
  // Maximum concurrent instances
  max_concurrency: number
  // Fail-fast: stop all instances if one fails
  fail_fast: boolean
}
```

### Matrix with Fail-Fast

```yaml title="strategy-matrix-failfast.yaml"
stages:
  - name: test
    strategy:
      matrix:
        node: ["18", "20", "22"]
        os: [linux, macos]
      fail_fast: true
      max_concurrency: 4
    steps:
      - run: |
          echo "Testing Node ${{ matrix.node }} on ${{ matrix.os }}"
          npm test
```

### For Loop with Concurrency

```yaml title="strategy-for-concurrent.yaml"
stages:
  - name: deploy-regions
    strategy:
      for:
        items:
          - us-east-1
          - us-west-2
          - eu-west-1
          - ap-southeast-1
        max_concurrency: 2
    steps:
      - run: |
          echo "Deploying to ${{ strategy.item }}"
          aws ecs update-service \
            --cluster my-cluster \
            --region ${{ strategy.item }} \
            --service my-app \
            --force-new-deployment
```

---

## Concurrency Control

Concurrency control limits how many instances of a pipeline or stage can run simultaneously. This prevents resource contention and ensures orderly deployments.

```typescript title="concurrency-schema.ts"
interface ConcurrencyConfig {
  // Group name for concurrency grouping
  group: string
  // Whether to cancel in-progress runs
  cancel_in_progress: boolean
  // Maximum number of concurrent runs (default: 1)
  limit: number
}
```

### Pipeline-Level Concurrency

```yaml title="concurrency-pipeline.yaml"
pipeline:
  concurrency:
    group: deploy-${{ trigger.branch }}
    cancel_in_progress: false
    limit: 1
  stages:
    - name: deploy
      steps:
        - run: ./deploy.sh
```

### Stage-Level Concurrency

```yaml title="concurrency-stage.yaml"
stages:
  - name: deploy-staging
    concurrency:
      group: staging-deploy
      cancel_in_progress: true
    steps:
      - run: ./deploy.sh staging
  - name: deploy-production
    concurrency:
      group: production-deploy
      cancel_in_progress: false
    steps:
      - run: ./deploy.sh production
```

---

## Container Configuration

Steps can run inside specific container images with custom configuration for pull policies, credentials, resource limits, and entry points.

```typescript title="container-schema.ts"
interface ContainerConfig {
  // Container image
  image: string
  // Image pull policy
  pull: "always" | "never" | "if-not-present"
  // Registry credentials
  credentials: {
    username: string
    password: string
  }
  // Entry point override
  entrypoint: string | string[]
  // Resource limits
  resources: {
    requests: { cpu: string; memory: string }
    limits: { cpu: string; memory: string }
  }
  // Privileged mode
  privileged: boolean
  // User to run as
  user: string
  // Additional volumes
  volumes: VolumeMount[]
  // Network mode
  network: string
}
```

### Full Container Configuration

```yaml title="container-full.yaml"
steps:
  - name: build
    run: go build -o /output/app ./cmd/...
    container:
      image: golang:1.23-alpine
      pull: if-not-present
      credentials:
        username: ${{ secrets.REGISTRY_USER }}
        password: ${{ secrets.REGISTRY_PASS }}
      resources:
        requests:
          cpu: "1"
          memory: 2Gi
        limits:
          cpu: "2"
          memory: 4Gi
      user: "1000"
    env:
      GOPROXY: https://proxy.golang.org
      CGO_ENABLED: "0"
```

### Privileged Container (Docker-in-Docker)

```yaml title="container-dind.yaml"
steps:
  - name: build-image
    run: |
      docker build -t my-app:latest .
      docker push my-app:latest
    container:
      image: docker:24-dind
      privileged: true
    env:
      DOCKER_TLS_CERTDIR: ""
```

---

## Clone Configuration

Configure how and whether the pipeline repository is cloned at the pipeline or stage level.

```typescript title="clone-config-schema.ts"
interface CloneConfig {
  // Clone depth (0 = full, 1 = shallow)
  depth: number
  // Initialize submodules
  submodules: boolean | "recursive"
  // Disable LFS
  lfs: boolean
  // Fetch tags
  tags: boolean
  // Specific ref to checkout
  ref: string
  // Alternative repository
  repo: string
  // Connector for authentication
  connector: string
}
```

### Disable Clone

```yaml title="clone-disable.yaml"
# Pipeline-level: disable clone for all stages
pipeline:
  clone: false
  stages:
    - name: notify
      steps:
        - run: curl -X POST https://api.example.com/notify
```

### Custom Clone Configuration

```yaml title="clone-custom.yaml"
pipeline:
  clone:
    depth: 1
    submodules: recursive
    lfs: true
    tags: true
  stages:
    - name: build
      steps:
        - run: make build
```

### Stage-Level Clone Override

```yaml title="clone-stage-override.yaml"
stages:
  - name: build
    steps:
      - run: npm run build
  - name: deploy
    clone: false
    steps:
      - run: |
          # No source code needed for deployment
          kubectl apply -f https://raw.githubusercontent.com/org/repo/main/k8s/deploy.yaml
```

---

## Permissions

Pipeline permissions control access to resources and operations. Permissions can be configured at the pipeline, stage, or step level.

```typescript title="permissions-schema.ts"
interface Permissions {
  // Repository permissions
  contents: "read" | "write"
  // Pull request permissions
  pull_requests: "read" | "write"
  // Issue permissions
  issues: "read" | "write"
  // Package permissions
  packages: "read" | "write"
  // Deployment permissions
  deployments: "read" | "write"
  // ID token permissions (for OIDC)
  id_token: "write"
}
```

```yaml title="permissions-example.yaml"
pipeline:
  permissions:
    contents: read
    packages: write
    id_token: write
  stages:
    - name: build-and-publish
      steps:
        - run: npm ci
        - run: npm run build
        - run: npm publish
```

:::warning Least Privilege
Always apply the principle of least privilege. Grant only the permissions that are strictly required for the pipeline to function. Avoid granting `write` permissions unless the pipeline actually needs to modify resources.
:::

---

## Test Reports

Test reports collect and display test results in the Harness UI. Harness 3.0 supports JUnit and NUnit report formats with automatic parsing, trend analysis, and flaky test detection.

```typescript title="report-schema.ts"
interface ReportConfig {
  // Report format
  type: "junit" | "nunit"
  // Glob patterns for report files
  paths: string[]
  // Whether to fail the step if reports are not found
  fail_on_missing: boolean
}
```

### JUnit Reports

```yaml title="reports-junit.yaml"
steps:
  - name: unit-tests
    run: npm test -- --ci --reporters=default --reporters=jest-junit
    reports:
      type: junit
      paths:
        - "junit.xml"
  - name: integration-tests
    run: pytest tests/ --junitxml=report.xml
    reports:
      type: junit
      paths:
        - "report.xml"
```

### NUnit Reports

```yaml title="reports-nunit.yaml"
steps:
  - name: dotnet-tests
    run: dotnet test --logger "trx" --logger "nunit"
    reports:
      type: nunit
      paths:
        - "**/*.xml"
      fail_on_missing: true
```

### Wildcard Report Paths

```yaml title="reports-wildcard.yaml"
steps:
  - name: test-all
    run: make test
    reports:
      type: junit
      paths:
        - "**/target/surefire-reports/*.xml"
        - "**/build/test-results/**/*.xml"
        - "**/coverage/junit-*.xml"
```

:::info Report Aggregation
When multiple report files match the glob patterns, Harness automatically aggregates all results into a single test summary. This works across parallel test splits and matrix instances.
:::

---

## Complete Pipeline Example

The following example demonstrates many advanced features combined in a single production-grade pipeline: typed inputs, caching, matrix testing, container steps, concurrency control, failure strategies, approvals, and multi-environment deployment.

```yaml title="complete-pipeline.yaml"
pipeline:
  # Typed inputs
  inputs:
    version:
      type: string
      description: "Release version"
      required: true
      validation:
        regex: "^\d+\.\d+\.\d+$"
        message: "Must be semver format"
    environment:
      type: choice
      options: [staging, production]
      default: staging
    dry_run:
      type: boolean
      default: false

  # Event triggers
  on:
    push:
      branches:
        include:
          - main
          - "release/*"
    pull_request:
      branches:
        include:
          - main

  # Concurrency control
  concurrency:
    group: deploy-${{ inputs.environment }}
    cancel_in_progress: false

  # Global environment variables
  env:
    REGISTRY: docker.io
    IMAGE_NAME: my-org/my-app

  # Pipeline permissions
  permissions:
    contents: read
    packages: write

  stages:
    # ---- Build Stage ----
    - name: build
      runtime:
        type: cloud
        spec:
          size: large
      cache:
        key: node-${{ hashFiles('**/package-lock.json') }}
        restore_keys:
          - node-
        paths:
          - node_modules/
      steps:
        - run: npm ci
        - run: npm run build
        - name: compute-tag
          run: |
            TAG="${{ inputs.version }}-$(git rev-parse --short HEAD)"
            echo "IMAGE_TAG=$TAG" >> $HARNESS_OUTPUT

    # ---- Test Stage (Matrix) ----
    - name: test
      strategy:
        matrix:
          node: ["18", "20", "22"]
        fail_fast: true
      cache:
        key: node-${{ hashFiles('**/package-lock.json') }}
        paths:
          - node_modules/
      steps:
        - run: npm ci
        - name: run-tests
          run:
            script: npm test -- --ci
          reports:
            type: junit
            paths:
              - "junit.xml"

    # ---- Security Scan ----
    - name: security-scan
      steps:
        - name: scan
          action:
            uses: security-scanner
            with:
              severity_threshold: high
              fail_on_critical: true

    # ---- Build & Push Image ----
    - name: build-image
      steps:
        - name: docker-build
          action:
            uses: docker-build-push
            with:
              registry: ${{ env.REGISTRY }}
              repo: ${{ env.IMAGE_NAME }}
              tags:
                - ${{ stages.build.output.IMAGE_TAG }}
                - latest
              dockerfile: Dockerfile
              context: .
              username: ${{ secrets.DOCKER_USER }}
              password: ${{ secrets.DOCKER_PASS }}

    # ---- Deploy to Staging ----
    - name: deploy-staging
      if: ${{ inputs.environment }} == "staging" || ${{ inputs.environment }} == "production"
      service: my-app
      environment:
        name: staging
        deploy-to: non-production
      on_failure:
        action: retry
        retry:
          count: 2
          interval: 30s
      steps:
        - run: |
            if [ "${{ inputs.dry_run }}" = "true" ]; then
              echo "DRY RUN: Would deploy ${{ stages.build.output.IMAGE_TAG }}"
            else
              kubectl set image deployment/my-app \
                app=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ stages.build.output.IMAGE_TAG }}
              kubectl rollout status deployment/my-app --timeout=5m
            fi

    # ---- Staging Verification ----
    - name: verify-staging
      if: ${{ inputs.dry_run }} != true
      steps:
        - run: ./smoke-test.sh staging
        - run: ./integration-test.sh staging

    # ---- Production Approval ----
    - name: production-approval
      if: ${{ inputs.environment }} == "production"
      approval:
        uses: harness
        with:
          approvers:
            groups:
              - release-managers
            minimum: 2
          message: |
            Approve deployment of ${{ inputs.version }} to production.
            Image: ${{ stages.build.output.IMAGE_TAG }}
            Staging verification: passed
          timeout: 8h

    # ---- Deploy to Production ----
    - name: deploy-production
      if: ${{ inputs.environment }} == "production"
      service: my-app
      environment:
        name: production
        deploy-to: production
      on_failure:
        - action: retry
          retry:
            count: 1
            interval: 15s
        - action: rollback
          rollback:
            steps:
              - run: kubectl rollout undo deployment/my-app
      steps:
        - run: |
            kubectl set image deployment/my-app \
              app=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ stages.build.output.IMAGE_TAG }}
            kubectl rollout status deployment/my-app --timeout=10m

    # ---- Notify ----
    - name: notify
      if: always()
      steps:
        - action:
            uses: slack
            with:
              channel: "#deployments"
              webhook_url: ${{ secrets.SLACK_WEBHOOK }}
              message: |
                Pipeline ${{ pipeline.status }} for ${{ inputs.version }}
                Environment: ${{ inputs.environment }}
                Image: ${{ stages.build.output.IMAGE_TAG }}
                Triggered by: ${{ trigger.user }}
```

:::tip Pipeline Design
This example follows best practices for production pipelines: typed inputs with validation, dependency caching, parallel testing, security scanning, progressive deployment with staging verification, approval gates, automated rollback, and notifications regardless of outcome.
:::