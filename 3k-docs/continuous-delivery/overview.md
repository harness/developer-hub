---
title: Overview
description: Deploy services, infrastructure, and databases to any environment using automated pipelines and governed execution.
sidebar_position: 1
---

Harness Deployments takes your built artifacts and moves them safely through environments to production. You define what to deploy, where, and how. Harness executes the steps, enforces your policies, verifies the outcome, and rolls back when something goes wrong — all through a Delegate running inside your own network.

Deployments is a capability of the Harness Software Delivery Agent, alongside Builds, Infrastructure Deployments, Database Deployments, Artifacts, Code Repositories, and Code Reviews.

## How it works

![How Harness Deployments Work — diagram showing Git repository and artifact registry on the left feeding into the Harness pipeline, service, and environment configuration in the center, which dispatches tasks outbound to a Delegate running inside your network, which then deploys to your target infrastructure on the right.](./static/overview/harness-overview-arch.png)

Harness sits between your artifact sources and your deployment targets. You define the what (service), the where (environment and infrastructure), and the how (pipeline steps). Harness orchestrates execution through a Delegate running inside your own network — it never requires inbound access to your environment.

## Pipeline versions

Harness supports two pipeline authoring experiences. Both share the same core entities — service, environment, and infrastructure definition — but differ in how steps execute, where they run, and how you write YAML.

| Feature | v0 | v1 |
| --- | --- | --- |
| Step model | Built-in steps compiled into the Delegate | Every step runs as a plugin image in a container or as a plugin binary via a Delegate subprocess |
| Stage model | Separate deploy and build stage types | Single stage type: run deploy and build steps together |
| Delegate | Delegate 1.0 | Delegate 1.0 and Delegate 3.x |
| Expressions | JEXL `<+expression>` | CEL `${{expression}}` and JEXL |
| YAML | Verbose, type-specific fields | Simplified, schema-driven |
| Templates | Account/org/project scope | Global Template Library (shared across accounts) |

For v0 pipeline documentation, go to [Harness CD (v0)](/docs/continuous-delivery).

<!-- TODO: Add link to v0 vs v1 comparison and migration guide — next iteration -->

## What v1 brings

### Every step is a plugin

In v1, every step — whether it deploys to Kubernetes, runs a shell command, or sends a notification — is a self-contained container image. The Delegate pulls the relevant image and executes it for each step. This means:

- **Delegate upgrades are decoupled from step capabilities.** Plugin images version independently of the Delegate.
- **Consistent execution model across deploy and build steps.** A Kubernetes deploy step and a Docker build step run the same way, in the same stage, with the same failure-handling configuration.

### Deploy and build steps run in the same stage

In v0, a deploy stage can only contain deploy steps and a build stage can only contain build steps. In v1, there is one stage type. You can build an artifact, scan it, deploy it, and verify it — all in a single stage — without switching stage types or chaining separate pipelines. This is the sharpest difference from v0.

### Choose where your steps run

Because steps are container images, you choose the runtime platform that best fits your workload:

- **Kubernetes**: Steps run as pods on a cluster you specify. Use this for cloud-native isolation, custom resource limits, or workloads that already run on Kubernetes.
- **Harness Cloud**: Steps run on Harness-hosted infrastructure. No Delegate installation required for the execution environment itself.

You set the platform at stage level. All steps in a stage share the same runtime environment.

### Expressions: CEL and JEXL both supported

v1 supports both expression syntaxes. Both resolve to identical values — CEL is recommended for new pipelines.

| Syntax | Format | Example |
| --- | --- | --- |
| CEL | `${{expression}}` | `${{artifacts.primary.tag}}` |
| JEXL | `<+expression>` | `<+artifacts.primary.tag>` |

CEL is a sandboxed language — it cannot invoke arbitrary Java objects or make network calls. This eliminates the class of security vulnerabilities inherent in JEXL's architecture. Existing JEXL expressions continue to evaluate without changes.

**Common expressions** — these work in both syntaxes:

| What you need | CEL | JEXL |
| --- | --- | --- |
| Pipeline variable | `${{pipeline.variables.myVar}}` | `<+pipeline.variables.myVar>` |
| Stage input | `${{inputs.myInput}}` | `<+inputs.myInput>` |
| Service name | `${{service.name}}` | `<+service.name>` |
| Service variable | `${{serviceVariables.myVar}}` | `<+serviceVariables.myVar>` |
| Primary artifact tag | `${{artifacts.primary.tag}}` | `<+artifacts.primary.tag>` |
| Primary artifact image | `${{artifacts.primary.image}}` | `<+artifacts.primary.image>` |
| Sidecar image | `${{artifacts.sidecars.myId.image}}` | `<+artifacts.sidecars.myId.image>` |
| Environment name | `${{env.name}}` | `<+env.name>` |
| Environment type | `${{env.type}}` | `<+env.type>` |
| Infrastructure name | `${{infra.name}}` | `<+infra.name>` |
| Infrastructure connector | `${{infra.connectorRef}}` | `<+infra.connectorRef>` |

:::info Ternary expressions (CEL only)
If an operand is itself an expression, wrap it with `${{ }}`:

```yaml
# simple condition
"${{env.type == 'Production' ? 'prod-ns' : 'staging-ns'}}"

# operands are expressions — each must be wrapped
"${{ ${{inputs.target == 'prod'}} ? ${{inputs.prod_ns}} : ${{inputs.staging_ns}} }}"
```
:::

### Global Template Library

In v1, when you add a step to a pipeline, Harness automatically resolves it from the Global Template Library — a Harness-curated set of versioned step templates that works across all accounts. You do not need to set it up or browse it separately; the right template is pulled in when you select a step.


### Simplified YAML

v1 YAML removes the deeply nested, type-specific structure of v0. The structure is consistent across all deployment types rather than varying per step type. Key differences from v0:

- **No type nesting** — v0 wraps everything in `spec` blocks at every level; v1 fields are at the stage level directly
- **Steps reference templates by ID** — `template: uses: helmDeployBasicStep` instead of declaring `type`, `spec`, and step-specific fields inline
- **Rollback is a sibling of steps** — not buried inside `execution.rollbackSteps`
- **Failure strategy is one line** — `on-failure: errors: all` instead of a nested `failureStrategies` block
- **Runtime is explicit** — the `runtime` block at stage level sets where all steps in that stage run (Kubernetes or Harness Cloud)

For a detailed YAML reference and field definitions, go to [Pipeline YAML format](/3k-docs/platform/getting-started#pipeline-yaml-format).

## Core concepts

These are the building blocks you configure to run a deployment in Harness.

- **Service** — what you deploy: the artifact, manifests, and service-level configuration
- **Environment** — where you deploy it: a logical target such as staging or production
- **Infrastructure definition** — the specific cluster, namespace, or host within an environment
- **Pipeline** — stages and steps that execute the deployment
- **Triggers** — conditions that start a pipeline automatically (Git event, schedule, webhook)
- **Approval steps** — manual gates requiring sign-off before execution continues

### Service

A Harness service represents what you deploy. It holds the artifact reference, manifests or specifications, configuration files, and service-specific variables. Services exist independently of pipelines, so you can reuse the same service definition across multiple environments and pipelines.

Each service has a **service definition** that specifies the artifact, manifest files, and variables. When you add a service to a pipeline stage, you can override any of these values for that specific deployment.

:::info Pre-built artifacts
Harness Deployments focuses on deploying pre-built artifacts. If you need to build artifacts first, use Harness Builds steps.
:::

### Environment

An environment represents a deployment target such as development, staging, or production. Each environment contains **infrastructure definitions** that point to the actual cluster, namespace, host, or cloud account where the Delegate executes the deployment.

You can apply environment-level variable overrides and service configuration overrides, so a single service definition behaves differently across environments without duplicating configuration.

### Pipeline

A deployment pipeline is a sequence of stages that moves a service through environments. Each **stage** targets one environment and runs the steps needed to complete that deployment — manifest application, approval gates, verification, and rollback.

**Steps** are the individual operations within a stage: applying a manifest, running a script, requesting an approval, or verifying a deployment outcome. Harness automatically adds the steps required for your chosen deployment strategy. You can add extra steps, run steps in parallel, and configure per-step failure strategies.

### Deployment strategies

Harness supports multiple strategies for controlling how new versions reach your users:

- **Rolling**: Replace instances incrementally, batch by batch
- **Canary**: Route a percentage of traffic to the new version before a full rollout
- **Blue-green**: Maintain two identical environments and switch traffic between them
- **Custom**: Define your own rollout logic using shell scripts or other steps

### Verification

Harness Continuous Verification (CV) connects to your APM and logging tools after a deployment and uses machine learning to detect anomalies. When Harness detects a problem, it can automatically roll back the deployment before users are affected.

### Delegate

Harness executes all deployment operations through a Delegate — an agent you install inside your own environment. The Delegate connects outbound to Harness, picks up tasks, and executes steps using the credentials you configure in connectors. You control where execution happens; Harness controls what runs. No inbound ports need to be opened.

**Delegate** supports both v0 and v1 pipelines. It is a long-running service with built-in support for deployment protocols: Kubernetes, ECS, SSH, WinRM, and others. Steps execute as Java tasks inside the Delegate process.

**Delegate 3.x** is supported for v1 pipelines. It is a lighter agent with no built-in step logic. It runs step plugins as containers and as binary plugins via subprocesses.

## Next steps

- **Get started**: [Getting Started](/3k-docs/continuous-delivery/getting-started) — run your first deployment end to end
- **What's supported**: [What's Supported](/3k-docs/continuous-delivery/cd-integrations) — see all supported platforms and integrations
- **Licensing**: Harness Deployments is licensed by service instance. Go to [Subscriptions and Licenses](/3k-docs/platform/subscriptions-licenses/subscriptions) to understand how service instances are counted
