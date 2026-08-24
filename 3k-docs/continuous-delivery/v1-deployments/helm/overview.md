---
title: Overview
sidebar_label: Overview
description: Deploy Helm charts to a Kubernetes cluster using Harness CD.
sidebar_position: 1
---

A Helm stage lets you deploy applications packaged as Helm charts to any Kubernetes cluster. You configure a Native Helm service with your chart and values, point it at a Helm infrastructure definition, choose a deployment strategy, and Harness manages the full Helm release lifecycle: install, upgrade, and rollback.

---

## Before you begin

- A Kubernetes cluster with outbound HTTPS access to `app.harness.io`.
- A delegate running in the cluster. Go to [Getting Started](../../getting-started.md#step-1-install-a-delegate) to install one.
- A Helm chart in a Git repository, Helm repository, OCI registry, S3, or GCS.

---

## Set up a Helm deployment

When you create a pipeline, Harness adds a default **Stage 1** automatically. You can edit it and add a deployment target, service, and environment, but editing an existing stage does **not** give you the execution strategy wizard and you have to add steps manually.

To get the strategy wizard, create a new stage:

1. Go to **Pipelines** and select **Create Pipeline**. Enter a name, select **Inline** or a Git store, and select **Create**.
2. Delete the default **Stage 1**, then select **+** to add a new stage.
3. Select **Deploy** and select **Next**.
4. Enter a stage name and set **Deployment Target** to **Native Helm**. Select **Next**.

The wizard then walks you through service, environment, and strategy. The sections below explain each piece.

---

## Service

A Helm service holds the chart source, values files, and service-level variables. The service deployment type is **Native Helm**. Services are reusable — configure once and reference across multiple stages and pipelines. Stages can override values files and variables per deployment without changing the shared service definition.

Go to [Helm services](./helm-services.md) to configure chart sources and values overrides.

---

## Environment and infrastructure

An environment is a logical target (dev, staging, production). The **infrastructure definition** within the environment is a **Native Helm infrastructure** — it points to the Kubernetes cluster and namespace where Harness runs the Helm release. It references a Kubernetes connector, which uses a Delegate running inside your network to connect to the cluster.

Go to [Helm infrastructure](./helm-infrastructure.md) to configure environments, infrastructure definitions, and connectors.

---

## Deployment strategies

| Strategy | What it does |
| --- | --- |
| **Helm Basic Deploy Strategy** | Runs `helm upgrade --install` in a single phase. Suitable for most workloads. |
| **Helm Canary Deploy Strategy** | Deploys a canary release at a reduced instance count alongside the stable release, then promotes to full rollout. |
| **Helm Blue Green Deploy Strategy** | Brings up a full new Helm release, routes staging traffic to it, then swaps production traffic once validated. |
| **Blank canvas** | No steps pre-populated. Build the execution sequence manually. |

Go to [Helm deployment strategies](./helm-deployment-strategies/basic) to view step-by-step walkthroughs.

## Additional steps

The strategy wizard adds the minimum steps for the selected strategy. You can add further Helm steps to extend the stage.

| Step | What it does |
| --- | --- |
| [Helm Basic Deploy](./step-library/helm-basic-deploy.md) | Run `helm upgrade --install` as a standalone step |
| [Helm Rollback](./step-library/helm-rollback.md) | Roll back a Helm release to a previous revision |
| [Helm Delete](./step-library/helm-delete.md) | Delete a Helm release from the cluster |
| [Helm Canary Deploy](./step-library/helm-canary-deploy.md) | Deploy a canary release at a specified instance count |
| [Helm Canary Delete](./step-library/helm-canary-delete.md) | Remove the canary release before promoting to full rollout |
| [Helm Blue Green Deploy](./step-library/helm-blue-green-deploy.md) | Deploy the new release to the stage environment |
| [Helm Blue Green Swap](./step-library/helm-blue-green-swap.md) | Swap traffic from the stage environment to production |

---

## Stage settings

Each stage has a set of settings accessible from the stage editor. A separate pipeline stages reference covers all of these in depth; the descriptions below give you enough to get started.

### Clone

Controls whether the stage clones source code before running steps. Set to `false` to skip cloning (disabled by default).

```yaml
clone: false
```

### Platform

Sets the operating system and CPU architecture for the stage execution environment.

| OS | Supported architectures |
| --- | --- |
| Linux | AMD64, ARM64 |
| macOS | ARM64 only |
| Windows | AMD64 only |

```yaml
platform:
  os: linux
  arch: amd64
```

### Runtime

Defines where steps in the stage run. **The `runtime` block is mandatory for Helm deployments** — a stage without it cannot connect to a cluster and fails immediately.

**Kubernetes**: steps run as pods on a cluster you specify.

```yaml
runtime:
  kubernetes:
    namespace: <target-namespace>
    connector: <your-kubernetes-connector-id>
```

**Cloud**: steps run on Harness-hosted infrastructure.

```yaml
runtime:
  cloud: {}
```

**Shell**: steps run directly on the machine where the Delegate is installed.

```yaml
runtime:
  shell: {}
```

### Shared paths

By default, all steps in a stage share the same workspace. Use `shared-paths` to make additional filesystem paths available across steps.

```yaml
shared-paths:
  - /shared/output
```

### Strategy

Configures a looping strategy so the stage runs multiple times across a set of values or conditions.

**Matrix** — runs the stage for each combination of values in the matrix.

```yaml
strategy:
  matrix:
    environment: [dev, staging, prod]
  max-concurrency: 2
```

**For loop** — runs the stage a fixed number of times.

```yaml
strategy:
  for:
    iterations: 3
```

**While loop** — runs the stage until a condition is false or a max iteration count is reached.

```yaml
strategy:
  while:
    max-iterations: 10
    condition: "${{some.expression}}"
```

Add `fast-fail: true` to any strategy to stop remaining iterations immediately if one fails.

### Concurrency

Limits how many instances of this stage can run simultaneously across pipeline executions.

### On failure

Defines what Harness does when the stage fails. Common actions are `stage-rollback`, `retry`, `skip`, and `mark-as-success`.

```yaml
on-failure:
  errors: all
  action: stage-rollback
```

### Conditional execution

Controls whether the stage runs based on an expression evaluated at runtime.

```yaml
when:
  condition: "${{inputs.deploy_env == 'prod'}}"
```

### Delegate

Pins the stage to a specific delegate by tag. By default Harness selects any available delegate.

```yaml
delegate: my-delegate-tag
```

### Inputs and outputs

Declare typed inputs the stage accepts and outputs it produces. Inputs are available as `${{inputs.<name>}}` within the stage.

```yaml
inputs:
  target_env:
    type: environment
    description: Target deployment environment

outputs:
  release_id:
    type: string
```

### Environment variables

Set environment variables available to all steps in the stage.

```yaml
env:
  APP_ENV: production
  LOG_LEVEL: info
```

### Timeout duration

Maximum time the stage is allowed to run before Harness terminates it. Default is `24h`.

```yaml
timeout: 2h
```

### Build intelligence and cache intelligence

**Build intelligence** skips steps whose outputs are unchanged, reducing execution time on repeated runs. **Cache intelligence** stores and restores dependency caches between runs to speed up build steps. These are primarily relevant for build stages; in stages without build steps they have no effect unless you include build steps.

---

## Next steps

- Go to [Helm services](./helm-services.md) to configure chart sources, values files, and artifact sources
- Go to [Helm infrastructure](./helm-infrastructure.md) to configure environments and infrastructure definitions
- Go to [Basic deployment](./helm-deployment-strategies/basic) to walk through a single-phase Helm upgrade
- Go to [Canary deployment](./helm-deployment-strategies/canary) to walk through a staged rollout with canary release
- Go to [Blue-green deployment](./helm-deployment-strategies/blue-green) to walk through stage/production swap and rollback
- Go to [Step reference](./step-library/helm-basic-deploy.md) to view all available Helm steps
