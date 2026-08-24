---
title: Overview
sidebar_label: Overview
description: Deploy container images to a Kubernetes cluster using Harness CD.
sidebar_position: 1
---

A Kubernetes stage lets you deploy container-based applications to any Kubernetes cluster. You define the service (your manifests and images), the target infrastructure (cluster and namespace), and the deployment strategy. Harness manages the rollout, tracks release state, and rolls back automatically on failure.

---

## Before you begin

Before you add Kubernetes deployment steps to a stage, make sure you have:

- A Kubernetes cluster with outbound HTTPS access to `app.harness.io`, `github.com`, and `hub.docker.com`.
- A Kubernetes service account with `list`, `get`, `create`, and `delete` permissions on the target namespace. Cluster-admin or namespace admin permission is sufficient.
- A delegate running in the cluster. Go to [Getting Started](../../getting-started.md#step-1-install-a-delegate) to install one.

---

## What Harness deploys

Harness takes the Kubernetes manifests and container images you configure and applies them to the target cluster. You can source manifests from a Git repository, Helm chart, or Kustomize overlay.

A **managed workload** is a Kubernetes object that Harness deploys and tracks to steady state. If steady state is not reached, the deployment fails and the failure strategy runs (typically rollback). The table below shows which object types each strategy supports as managed workloads.

| Object type | Apply | Rolling | Rollback | Blue Green | Canary | Scale |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Deployment | Yes | Yes | Yes | Yes (1 only) | Yes (1 only) | Yes |
| DaemonSet | Yes | Yes | Yes | No | No | Yes |
| CRDs | Yes | Yes | Yes | No | No | No |
| Any object | Yes | No | No | No | No | No |

To deploy objects outside this list alongside a managed workload, add the annotation `harness.io/direct-apply: "true"` to the manifest. Harness applies these as unmanaged workloads without tracking steady state.

---

## Set up a Kubernetes deployment

When you create a pipeline, Harness adds a default **Stage 1** automatically. You can edit this stage: add a deployment target (for example, Kubernetes), then add a service and environment. The stage also has options for clone, platform, runtime, shared path, and strategy (looping strategy, failure strategy, and fast-fail).

However, **editing an existing stage does not give you the execution strategy wizard**. You can add service and environment, but you have to add deployment steps manually.

To get the full deployment wizard (including the execution strategy step where you choose Rolling, Canary, or Blue-green), you need to **create a new stage**:

1. Go to the **Pipelines** section and click **Create Pipeline**.
2. Enter a pipeline name. Under **Storage**, select **Inline** (Harness manages the pipeline YAML) or a Git repository (Harness Code, GitHub, GitLab, or Bitbucket). Click **Create**.
3. A default **Stage 1** is added. Delete it, then click the **+** icon to add a new stage.
4. When prompted with "What would you like to do?", select **Deploy** and click **Next**. Other options here include Build and Test, Blank Canvas, Use Template, and Chain Pipeline; Deploy is what triggers the deployment configuration wizard.
5. Enter a stage name, set **Deployment Target** to **Kubernetes**, and click **Next**.

The wizard then walks you through configuring the service, environment, and execution strategy in sequence. The sections below explain each piece.

---

## Service

A **service** in Harness represents what you deploy. It holds the Kubernetes manifests (or Helm charts, Kustomize overlays), artifact sources, config files, and service-level variables. Services are independent of pipelines; you configure them once and reuse them across stages and pipelines.

When you configure a stage, you either create a new service inline or pick an existing one. The stage can override service-level variables and artifact sources for that specific deployment without changing the shared service definition.

Go to [Kubernetes services](./kubernetes-services.md) to configure manifests, artifact sources, and values overrides.

---

## Environment and infrastructure

An **environment** is a logical deployment target: development, staging, or production. An **infrastructure definition** within an environment points to the actual Kubernetes cluster and namespace where Harness runs the deployment.

The infrastructure definition references a **Kubernetes connector**, which authenticates to the cluster. The connector uses a **Delegate** running inside your network to connect to the cluster; no inbound access to your environment is required. The Delegate picks up tasks from Harness and executes steps on its behalf.

Go to [Kubernetes infrastructure](./kubernetes-infrastructure.md) to configure environments, infrastructure definitions, and connectors.

---

## Deployment strategies

Harness supports the following Kubernetes strategies. Select the one that fits your release pattern when you add a stage.

| Strategy | What it does |
| --- | --- |
| **Rolling** | Applies updated manifests incrementally. Uses `25% max unavailable, 25% max surge` by default. |
| **Canary** | Deploys a subset of pods with the new version alongside stable pods, then shifts traffic when the canary is healthy. |
| **Blue Green** | Brings up a full new environment, routes staging traffic to it, then swaps production traffic once validated. |
| **Blank canvas** | No steps are pre-populated. Build the execution sequence manually. Use this for non-standard workloads such as Jobs, CronJobs, and ConfigMaps that do not need a managed rollout strategy. |

Go to [Kubernetes deployment strategies](./kubernetes-deployment-strategies/rolling) for step-by-step walkthroughs of each strategy.

## Additional steps

When the strategy wizard populates a stage, it adds the minimum steps needed for that strategy. You can add further Kubernetes steps to the stage to extend the pipeline, before, after, or between the strategy steps.

| Step | What it does |
| --- | --- |
| [Kubernetes Apply](./step-library/k8s-apply.md) | Apply specific manifest files outside the standard rollout flow |
| [Kubernetes Delete](./step-library/k8s-delete.md) | Delete specific Kubernetes resources by name or selector |
| [Kubernetes Diff](./step-library/k8s-diff.md) | Preview what would change if manifests were applied, without applying them |
| [Kubernetes Dry Run](./step-library/k8s-dry-run.md) | Validate manifests server-side without creating resources |
| [Kubernetes Patch](./step-library/k8s-patch.md) | Modify a specific resource field without affecting the rest of the manifest |
| [Kubernetes Rollout](./step-library/k8s-rollout.md) | Check or wait on the status of a Kubernetes rollout |
| [Kubernetes Scale](./step-library/k8s-scale.md) | Scale a workload to a target pod count or percentage |
| [Kubernetes Steady State Check](./step-library/k8s-steady-state-check.md) | Explicitly wait for a workload to reach steady state at any point in the stage |
| [Kubernetes Traffic Shift](./step-library/k8s-traffic-shift.md) | Shift a percentage of traffic between services during a staged rollout |

---

## Stage settings

Each stage has a set of settings accessible from the stage editor. These are available when you create a new stage or edit an existing one. A separate pipeline stages reference covers all of these in depth; the descriptions below give you enough to get started.

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

Defines where steps in the stage run. Choose one of three options:

**Kubernetes**: steps run as pods on a cluster you specify. **This is mandatory for Kubernetes deployments**; a stage without a `runtime` block cannot connect to a cluster and will fail immediately.

```yaml
runtime:
  kubernetes:
    namespace: <target-namespace>
    connector: <your-kubernetes-connector-id>
```

**Cloud**: steps run on Harness-hosted infrastructure. Select image name and machine size.

```yaml
runtime:
  cloud: {}
```

**Shell**: steps run directly on the machine where the Delegate is installed. Requires a Docker connector.

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

**Matrix**: runs the stage for each combination of values in the matrix.

```yaml
strategy:
  matrix:
    environment: [dev, staging, prod]
  max-concurrency: 2
```

**For loop**: runs the stage a fixed number of times.

```yaml
strategy:
  for:
    iterations: 3
```

**While loop**: runs the stage until a condition is false or a max iteration count is reached.

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

- Go to [Kubernetes services](./kubernetes-services.md) to configure manifests, artifact sources, and values overrides
- Go to [Kubernetes infrastructure](./kubernetes-infrastructure.md) to configure environments, infrastructure definitions, and connectors
- Go to [Rolling deployment](./kubernetes-deployment-strategies/rolling) to learn the step sequence, YAML, and configuration
- Go to [Canary deployment](./kubernetes-deployment-strategies/canary) to learn the step sequence, traffic shifting, and promotion
- Go to [Blue-green deployment](./kubernetes-deployment-strategies/blue-green) to learn the stage/production swap and rollback
- Go to [Blank canvas](./kubernetes-deployment-strategies/blank-canvas) to manually build a stage for non-standard workloads
- Go to [Step reference](./step-library/k8s-apply.md) to review all available Kubernetes steps
