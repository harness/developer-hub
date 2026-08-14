---
title: Harness Platform Overview
sidebar_label: Overview
id: index
slug: /platform/getting-started
sidebar_position: 1
description: Understand what the Harness Platform is, what changes between Harness NG and Harness 3.0, and what those changes mean for your pipelines.
keywords:
  - harness platform
  - harness 3.0
  - pipeline yaml v1
  - migration
tags:
  - platform
  - getting-started
---

The Harness Platform is the foundation that the rest of Harness is built on. It owns the capabilities your teams rely on everywhere in Harness, such as user management, access control, secrets, connectors, delegates, governance, auditing, and notifications. You define these capabilities once and reuse them across Harness.

Harness 3.0 rebuilds that platform around a simplified pipeline format and a container-based execution model. Your existing Harness NG resources continue to work, but the way you author pipelines, run them, and navigate the UI changes.

This topic explains what the platform provides and compares Harness NG with Harness 3.0 so you know what to expect before you migrate.

---

## What you will learn

- What the [Harness Platform](#what-the-harness-platform-provides) is, and how the Account, Organization, and Project hierarchy structures your work.
- What changes between Harness NG and Harness 3.0, [area by area](#what-changes-at-a-glance).
- What [Harness Agents](#harness-agents) are, and how they bring governed AI automation into your pipelines.
- How [pipeline YAML v1](#pipeline-yaml-format) differs from v0, and how [Drone and GitHub Actions](#drone--github-actions-compatibility) pipelines fit in.
- How [containerized steps](#containerized-step-execution), [typed inputs](#typed-inputs), [versioned steps](#versioned-steps), and [Delegate 3.0](#delegate-30) change pipeline execution.
- What changes in the UI, including the [Pipeline Studio](#redesigned-pipeline-studio), [navigation](#redesigned-navigation), [Harness Code](#harness-code), and the [AI Assistant](#ai-assistant).

---

## What the Harness Platform provides

Harness 3.0 ships as a single product. Delivery, security, runtime protection, and cost capabilities run on the same platform foundation and are grouped into [Harness Agents](#harness-agents) rather than separate products, so you no longer assemble a workflow out of pieces. When you configure authentication, permissions, or notifications at the platform level, those settings apply consistently across Harness.

The platform organizes your work through a three-level hierarchy:

- **Account:** The highest level for every operation in Harness. You define your organizational structure, manage global settings, and control access across all users and projects.
- **Organization:** A grouping of related projects, with its own settings and shared resources.
- **Project:** The working scope where you build pipelines, environments, and services for a team or application.

Resources such as connectors, secrets, templates, and delegates are created at one of these scopes and inherited by lower scopes, so teams work independently while still following the security and governance rules set above them.

:::info Harness Manager
The Harness Platform is also referred to as **Harness Manager**. It is the web UI where you sign in, create projects, set up pipelines, and manage your configurations.
:::

Your existing NG resources keep working in Harness 3.0. For details, see <a href="/3k-docs/platform/migrations-and-compatibility/compatibility" target="_blank">Backward Compatibility</a> and <a href="/3k-docs/platform/migrations-and-compatibility/migration" target="_blank">Migration</a>.

---

## What changes in Harness 3.0

In Harness 3.0, pipelines move to a simplified YAML format (also known as pipeline v1) with the following characteristics:

- Pipelines are a superset of Drone and GitHub Actions.
- Every step in a pipeline runs as a container on your target infrastructure.
- A single unified Delegate replaces the per-type Delegates of Harness NG.

These changes affect how you define pipelines, how you run them, and where you configure them.

### What changes at a glance

The following table compares Harness NG with Harness 3.0 across multiple areas.

| Area             | Harness NG                                                                    | Harness 3.0                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Pipeline YAML    | Deeply nested v0 schema with `pipeline/stages/stage/spec/execution` hierarchy | Flat v1 schema, stages, and steps at top level with minimal nesting                                             |
| Compatibility    | Harness-proprietary YAML only                                                 | Superset of Drone YAML and GitHub Actions YAML                                                                  |
| Stage Types      | Fixed types: CI, CD, Approval, Custom, Feature Flag                           | No fixed types, any stage can contain any mix of steps                                                         |
| Step Execution   | Steps run on Delegate or Harness Manager depending on type                    | All steps run as containers on the target infrastructure                                                        |
| Inputs           | Runtime inputs with `<+input>` expressions, untyped                           | Typed inputs (`string`, `number`, `boolean`, `secret`, `connector`, `service`, `environment`, `infrastructure`) |
| Step Updates     | Steps bundled with Delegate version                                           | Steps versioned independently,  pin or upgrade per pipeline                                                     |
| Delegate         | Multiple Delegate types (K8s, Docker, Shell, Helm, ECS)                       | Single, lightweight Delegate 3.0                                                                         |
| UI Configuration | Modal-based Pipeline Studio with multi-step wizards                           | Drawer-based Pipeline Studio with smart defaults and auto-generated names                                       |
| Navigation       | Product-centric navigation with separate sidebars                             | Holistic platform view with pinning, favorites, and unified project selector                                    |
| Code Repository  | External Git providers only                                                   | Harness Code: built-in Git hosting with enhanced PR experience                                                 |
| AI Assistant     | AIDA floating button, limited to troubleshooting                              | Integrated AI Assistant in navigation: performs actions, available on all pages                                |
| Agents           | Not available                                                                 | Harness Agents group capabilities and run AI automation as governed pipeline steps                              |

---

## Harness Agents

Agents are the largest addition in Harness 3.0. They replace the product-by-product boundaries of Harness NG with four agents that own a set of related capabilities, and they bring AI automation into your pipelines without giving up control, security, or governance.

### The four Harness Agents

| Agent | Capabilities |
| ----- | ------------ |
| **Software Delivery Agent** | Code Deployments, Builds, Infrastructure Deployments, Database Deployments, Artifacts, Code Repositories, Code Reviews |
| **Security Testing Agent** | Security Testing Orchestration, Supply Chain Security, SAST, SCA, Hardened Images (soon) |
| **Runtime Protection Agent** | API Posture Management, API Advanced Protection, AI Security |
| **Cost Management Agent** | AI Costs, Cloud Costs, Engineering Efficiency |

Alongside these, Harness ships a catalog of more than 13 pre-built agents for tasks such as code review, test coverage, CI failure autofix, zero-day remediation, feature flag cleanup, and dependency upgrades. Each one is a reusable pipeline template you can run as-is or fork.

### Why Agents matter

- **AI automation inside your pipelines:** An agent analyzes, fixes, refactors, and optimizes code and configuration as a pipeline step, so AI work runs inside the guardrails you already trust for delivery.
- **Bring your own model:** Agents connect to OpenAI, Anthropic, Gemini, MCP servers, or Harness AI through an `AIModel` connector. Point them at SaaS endpoints or self-hosted models inside your network.
- **Governed like any other step:** Every agent run respects RBAC, OPA policies, and audit trails, and agent templates are versioned through GitX.
- **Human approval by default:** Agents push changes to a branch and open a pull request. Nothing is auto-merged.
- **System or custom:** Use the System Agents that Harness maintains, fork one to change prompts and containers, or build a custom agent from AI steps.

### How an Agent runs

1. **Trigger:** Start the agent from the UI, the API, or automatically on an event such as a CI failure or a new pull request.
2. **Clone:** The agent clones the target repository using the configured SCM credentials. Harness Code, GitHub, GitLab, and Bitbucket are detected automatically.
3. **Analyze:** The model reviews the codebase, logs, or pull request diff for context.
4. **Execute:** The agent performs its task, such as writing code, generating tests, or producing a fix.
5. **Review:** Changes land on a new branch as a pull request for human review.

```yaml title="pipeline-with-agent.yaml" showLineNumbers {5-8}
pipeline:
  stages:
    - name: autofix-pr
      steps:
        - agent:
            name: autofix
            template: pr-autofix
            on-failure:
              strategy: always-run
```

For the full catalog, model connectors, input types, and governance controls, see <a href="/3k-docs/platform/getting-started/agents" target="_blank">Harness Agents</a>.

---

## Pipeline YAML format

The single biggest change in Harness 3.0 is the pipeline configuration format. The v0 YAML required deep nesting; every stage lived inside a `pipeline` > `stages` > `stage` > `spec` > `execution` > `steps` hierarchy. The v1 YAML flattens this dramatically, making pipelines shorter, easier to read, and compatible with existing Drone and GitHub Actions definitions.

<div className="row">
<div className="col col--6">

**Before: Harness NG YAML**

```yaml title="pipeline-v0.yaml (Harness NG)" showLineNumbers {}
pipeline:
  name: build-and-deploy
  identifier: build_and_deploy
  projectIdentifier: my-project
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: k8s-connector
              namespace: harness-build
          execution:
            steps:
              - step:
                  type: Run
                  name: Unit Tests
                  identifier: unit_tests
                  spec:
                    connectorRef: dockerhub
                    image: golang:1.21
                    command: go test ./...
```

</div>
<div className="col col--6">

**After: Harness 3.0 YAML**

```yaml title="pipeline-v1.yaml (Harness 3.0)" showLineNumbers {1}
pipeline:
  stages:
    - name: build
      steps:
        - name: unit-tests
          run:
            script: go test ./...
            container: golang:1.21
```

</div>
</div>

:::tip Key Improvement
The v1 format eliminates deeply nested `spec.execution.steps` paths. Steps are now directly under `stages[].steps`. Every pipeline uses pipeline: as the root key with all configuration nested underneath.
:::

---

## Drone & GitHub Actions compatibility

Harness 3.0 YAML is a superset of both Drone YAML and GitHub Actions YAML. This means you can take an existing Drone pipeline or a GitHub Actions workflow and run it in Harness with minimal or no modifications. Harness extends these formats with additional capabilities such as approvals, deployments, and governance.

<div className="row">
<div className="col col--6">

**GitHub Actions Style Pipeline in Harness 3.0**

```yaml title="gha-style.yaml" showLineNumbers {5-6,8-9}
pipeline:
  stages:
    - name: build
      steps:
        - action:
            uses: actions/checkout@v4

        - action:
            uses: actions/setup-node@v4
            with:
              node-version: "20"

        - run: |
            npm ci
            npm test
```

</div>
<div className="col col--6">

**Drone Style Pipeline in Harness 3.0**

```yaml title="drone-style.yml" showLineNumbers {6-7,10,13-14}
pipeline:
  stages:
    - name: build
      steps:
        - name: test
          run:
            script: |
              go build ./...
              go test ./...
            container: golang:1.21

        - name: publish
          action:
            uses: plugins/docker
            with:
              repo: myorg/myapp
              tags: latest
```

</div>
</div>

:::info Compatibility
The `action:` step key natively runs GitHub Actions and Drone plugins via the `uses:` field. Both GitHub Actions and Drone plugins are first-class citizens in Harness 3.0 alongside Harness-native step types like `run:`.
:::

---

## Stage groups

Harness 3.0 introduces the `group` keyword to organize related stages. Stage groups run their member stages in parallel by default and provide a shared failure strategy, making it easy to model fan-out/fan-in patterns and multi-environment deployments.

```yaml title="stage-groups.yaml" showLineNumbers {7-8}
pipeline:
  stages:
    - name: build
      steps:
        - run: make build

    - group:
        stages:
          - name: deploy-us-east
            steps:
              - run: kubectl apply -f k8s/ --context us-east

          - name: deploy-eu-west
            steps:
              - run: kubectl apply -f k8s/ --context eu-west

          - name: deploy-ap-south
            steps:
              - run: kubectl apply -f k8s/ --context ap-south
```

:::tip Parallel by Default
Stages inside a group run in parallel by default. The pipeline waits for all grouped stages to complete before moving to the next stage or group in the sequence.
:::

---

## No more fixed stage types

In Harness NG, stages had fixed types; a CI stage could only contain build steps, a CD stage could only contain deployment steps, and an Approval stage was its own separate construct. Harness 3.0 removes this restriction. Any stage can contain any combination of build steps, deployment steps, approval steps, and custom steps.

| Behavior            | Harness NG                                                   | Harness 3.0                                      |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| Build + Deploy      | Requires a CI stage followed by a separate CD stage          | Single stage with build steps, then deploy steps |
| Approval            | Requires a dedicated Approval stage between CI and CD stages | Approval is a step within any stage              |
| Mixed Workloads     | Not possible. Each stage type restricts available steps      | Any step type can appear in any stage            |
| Stage Configuration | Each stage type has a different configuration schema         | Unified stage schema across all workloads        |

For example, Build, Approve, and Deploy in one stage:

```yaml title="mixed-stage.yaml" showLineNumbers {14-15,22-23}
pipeline:
  stages:
    - name: build-approve-deploy
      steps:
        - name: build
          run:
            script: |
              npm ci
              npm run build
              docker build -t myorg/myapp:latest .
            container: node:20

        - name: approval
          approval:
            uses: harness/manual-approval
            with:
              message: "Approve deployment to production?"
              approvers:
                - role: project-admin

        - name: deploy
          run:
            script: |
              kubectl set image deployment/myapp \
                myapp=myorg/myapp:latest
            container: bitnami/kubectl:latest
```

---

## Containerized step execution

In Harness 3.0, all steps execute as containers on the target infrastructure. This provides consistent, isolated execution environments regardless of step type. Build steps, deployment steps, approval steps, and custom steps all follow the same containerized execution model.

| Benefit                  | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| Isolation                | Every step runs in its own container, preventing tool conflicts and side effects                    |
| Reproducibility          | Container images pin exact tool versions, ensuring identical behavior across runs                   |
| No Delegate Dependencies | Steps no longer depend on tools installed on the Delegate; everything ships in the container image  |
| Portability              | Same step definition runs on Kubernetes, Docker, or Harness Cloud without changes                   |
| Security                 | Containers have limited permissions by default, reducing the blast radius of a compromised step     |

For example, see this approval step running as a container:

```yaml title="containerized-steps.yaml"
pipeline:
  stages:
    - name: build-and-approve
      steps:
        - name: run-tests
          run:
            script: npm test
            container: node:20-alpine

        - name: security-scan
          action:
            uses: plugins/trivy
            with:
              image_name: myorg/myapp:latest

        - name: manual-approval
          approval:
            uses: harness/manual-approval
            with:
              message: "Tests passed. Approve release?"
              timeout: 72h
```

:::info Container Configuration
Each step can specify its own container image, resource limits, environment variables, and volume mounts. Shared volumes allow steps within a stage to pass files between each other.
:::

---

## Typed inputs

Harness NG used untyped runtime inputs with `<+input>` expressions. Harness 3.0 replaces these with a proper typed input system. Inputs are declared at the top of the pipeline and the UI renders the appropriate form controls (such as text fields, dropdowns, secret pickers, connector selectors) based on the declared type.

The following input types are available:

| Type             | Description                                      | UI Control              |
| ---------------- | ------------------------------------------------ | ----------------------- |
| `string`         | Free-form text value                             | Text input              |
| `number`         | Numeric value                                    | Number input            |
| `boolean`        | True or false                                    | Toggle switch           |
| `secret`         | Reference to a Harness secret                    | Secret picker           |
| `connector`      | Reference to a Harness connector                 | Connector selector      |
| `service`        | Reference to a Harness service                   | Service dropdown        |
| `environment`    | Reference to a Harness environment               | Environment dropdown    |
| `infrastructure` | Reference to a Harness infrastructure definition | Infrastructure selector |

```yaml title="typed-inputs.yaml" showLineNumbers {2-4,8-9,12-13,17-18,21-22,25-26}
pipeline:
  inputs:
    target_env:
      type: environment
      description: "Target deployment environment"
      default: staging

    image_tag:
      type: string
      description: "Docker image tag to deploy"

    run_security_scan:
      type: boolean
      description: "Run Trivy security scan before deploy"
      default: true

    docker_connector:
      type: connector
      description: "Docker registry connector"

    deploy_secret:
      type: secret
      description: "Deployment credentials"

    replica_count:
      type: number
      description: "Number of pod replicas"
      default: 3

  stages:
    - name: deploy
      steps:
        - name: scan
          if: ${{ inputs.run_security_scan }} == true
          action:
            uses: plugins/trivy

        - name: rollout
          run:
            script: |
              kubectl set image deployment/myapp \
                myapp=myorg/myapp:${{ inputs.image_tag }} \
                -n ${{ inputs.target_env }}
              kubectl scale deployment/myapp \
                --replicas=${{ inputs.replica_count }} \
                -n ${{ inputs.target_env }}
            container: bitnami/kubectl:latest
            env:
              DEPLOY_SECRET: ${{ inputs.deploy_secret }}
```

:::danger Migration
Existing `<+input>` runtime inputs from Harness NG pipelines will need to be converted to typed inputs when migrating to pipeline YAML v1. The Harness pipeline converter tool can assist with this migration.
:::

---

## Versioned steps

In Harness NG, step implementations were bundled with the Delegate. Upgrading a Delegate upgraded all steps simultaneously, which could introduce breaking changes across all pipelines. In Harness 3.0, each step is independently versioned and shipped as its own container image. Teams can pin specific step versions per pipeline and upgrade on their own schedule.

| Aspect           | Harness NG                                               | Harness 3.0                                         |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------- |
| Update Mechanism | Steps update when Delegate is upgraded                   | Steps update independently via container image tags |
| Version Control  | All steps share the Delegate version                     | Each step has its own semantic version              |
| Rollback         | Requires Delegate downgrade (affects all pipelines)      | Pin a previous step version in a single pipeline    |
| Testing          | Test by deploying a new Delegate to a separate namespace | Test by changing the version tag in one pipeline    |

For example, in version pinning:

```yaml title="versioned-steps.yaml" showLineNumbers {8,12,18}
pipeline:
  stages:
    - name: build
      steps:
        - name: run-tests
          run:
            script: npm test
            container: node:20

        - name: security-scan
          action:
            uses: plugins/trivy:2.1.0
            with:
              severity: HIGH,CRITICAL

        - name: publish
          action:
            uses: plugins/docker
            with:
              repo: myorg/myapp
```

:::tip Best Practice
Pin step versions in production pipelines to ensure stability. Use latest only in development or testing pipelines where you want to pick up new features automatically.
:::

---

## Redesigned Pipeline Studio

The Pipeline Studio in Harness 3.0 has been redesigned for speed and simplicity. The modal-based configuration flow from Harness NG has been replaced with a drawer pattern that keeps you in context while editing step details.

- **Drawer pattern:** Clicking a step opens a configuration drawer on the right side of the canvas instead of a full-screen modal. You can see the pipeline graph and the step configuration simultaneously, making it easier to understand how the step fits into the larger pipeline.
- **Smart defaults:** When you add a new step, Harness 3.0 pre-fills sensible defaults based on the step type and your project context. For example, a Run step auto-selects the most recently used container image, and a Deploy step auto-selects the last targeted environment.
- **Auto-generated names:** Step names and identifiers are auto-generated based on the step type and configuration. You no longer need to manually name every step during initial pipeline creation. Names can be customized later if needed.

:::info
The Pipeline Studio continues to support both visual and YAML editing modes. Changes made in either mode are synchronized in real time.
:::

---

## Delegate 3.0

Harness NG required different Delegate types depending on your infrastructure: a Kubernetes Delegate for K8s workloads, a Docker Delegate for container tasks, a Shell Delegate for VM-based operations, and so on. Harness 3.0 consolidates all of these into a single, unified, lightweight Delegate 3.0.

| Aspect          | Harness NG                                                         | Harness 3.0                                                     |
| --------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Delegate Count  | Multiple delegates per environment (K8s, Docker, Shell, Helm, ECS) | One unified Delegate 3.0 per environment                        |
| Image Size      | Large image with pre-installed tooling (~1.5 GB)                   | Lightweight base image (~200 MB): tools run as step containers |
| Tool Management | Tools installed on Delegate, upgraded with Delegate                | Tools ship inside step containers, versioned independently      |
| Startup Time    | Slower startup due to large image and initialization scripts       | Fast startup: minimal initialization required                   |

The following platforms are supported:

- Kubernetes (Helm chart)
- Docker (docker-compose)
- Linux (systemd service)
- macOS (launchd)
- Windows (Windows Service)
- Harness Cloud (managed)

:::warning Upgrade Path
Existing Harness NG Delegates will continue to work during the transition period. Harness provides a migration tool to convert existing Delegate configurations to Delegate 3.0. See the <a href="/3k-docs/platform/migrations-and-compatibility/migration" target="_blank">Migration</a> guide for detailed instructions.
:::

---

## Redesigned navigation

In Harness NG, navigation was organized around separate products; you picked one (CI, CD, Feature Flags, and so on) and everything was scoped to it. Harness 3.0 removes those boundaries and replaces them with a holistic platform view where all capabilities are accessible from a single, unified navigation system.

- **Holistic platform view:** The primary navigation shows all platform capabilities (Pipelines, Environments, Connectors, Secrets, Code, etc.) without requiring you to pick a starting point first. This reduces context switching and provides a unified view of your project.
- **Pinning + favorites:** Pin frequently used navigation items to the top of the sidebar for quick access. Star projects, pipelines, and environments to add them to your favorites list, which is accessible from a dedicated section in the navigation.
- **Project selector improvements:** The project selector now supports search, recent projects, and pinned projects at the top of the list. Switching between Account, Organization, and Project scope is a single click instead of navigating through nested menus.

For a detailed breakdown of the new navigation system, see <a href="/3k-docs/platform/getting-started/navigation" target="_blank">Navigation</a>.

---

## Harness Code

Harness 3.0 includes Harness Code, a built-in Git hosting solution that provides a simplified code experience directly within the platform. While Harness continues to support external Git providers (GitHub, GitLab, Bitbucket, Azure Repos), Harness Code provides a tighter integration with pipelines, secrets, and the platform as a whole.

- **Simplified code experience:** Browse repositories, view file contents, and navigate commit history from within the Harness UI. The code viewer supports syntax highlighting, blame annotations, and search across files.
- **Enhanced pull request performance:** Pull requests in Harness Code are optimized for large diffs and complex review workflows. The diff viewer loads incrementally, supports inline comments, and handles files with thousands of changed lines without degrading browser performance.
- **File tree view for diffs:** When reviewing a pull request, a collapsible file tree on the left shows all changed files organized by directory structure. Click any file to jump directly to its diff. Files are annotated with change type indicators (added, modified, deleted, renamed).

---

## AI Assistant

The Harness AI Assistant in 3.0 is a significant upgrade over the AIDA floating button in Harness NG. It is integrated directly into the navigation panel instead of appearing as a floating overlay, and it can perform actions, not just answer questions.

- **Integrated in navigation:** The AI Assistant is accessed from a dedicated entry in the navigation sidebar, not a floating button. This provides a full-height panel for interactions and keeps the assistant accessible without obscuring page content.
- **Action-capable:** Beyond answering questions, the AI Assistant can perform actions on your behalf, for example:
  - Create a new pipeline from a natural language description
  - Update an existing secret or connector configuration
  - Diagnose a failed pipeline execution and suggest fixes
  - Generate YAML snippets for complex configurations
  - Explain pipeline execution logs in plain language
- **Available across Harness:** The AI Assistant is context-aware and available on every page in the platform. When opened from a pipeline execution page, it automatically has context about that execution. When opened from the connectors page, it can help troubleshoot connection issues. The assistant adapts its suggestions and capabilities to the current page context.

---

## Related articles

- <a href="/3k-docs/platform/getting-started/agents" target="_blank">Harness Agents</a>: Agent catalog, model connectors, and governance controls.
- <a href="/3k-docs/platform/migrations-and-compatibility/compatibility" target="_blank">Backward Compatibility</a>: Harness NG resources that keep working in Harness 3.0.
- <a href="/3k-docs/platform/migrations-and-compatibility/migration" target="_blank">Migration</a>: Move your pipelines to YAML v1.
- <a href="/3k-docs/platform/getting-started/navigation" target="_blank">Navigation</a>: The redesigned navigation in detail.
