---
title: DAG pipelines [Beta]
sidebar_label: DAG Pipelines [Beta]
description: Learn how to configure pipelines using Directed Acyclic Graph (DAG) dependencies. This feature is in beta.
sidebar_position: 11
keywords:
  - DAG pipelines
  - directed acyclic graph
  - stage dependencies
  - pipeline execution
tags:
  - pipelines
---

import DocImage from '@site/src/components/DocImage';

Harness DAG (Directed Acyclic Graph) pipelines enable you to configure flexible stage execution flows by defining explicit dependencies between stages. Unlike traditional pipelines where stages can only run sequentially or in parallel, DAG pipelines allow you to specify which stages must complete before others can start, creating complex workflows that optimize execution time.

:::note
This feature is currently in beta. It is behind the feature flag `PIPE_ENABLE_DEPENDENCY_BASED_EXECUTION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

---

## What will you learn?

- **When to use DAG pipelines:** Recognize the workflows where stage dependencies beat sequential or parallel execution.
- **How DAG pipelines work:** Understand how the `dependsOn` field controls execution instead of stage order.
- **How to enable DAG:** Create a new DAG pipeline or convert an existing pipeline to the DAG format.
- **How to define dependencies:** Add, remove, and visualize dependencies between stages.

---

## Before you begin

- **Harness account with the DAG beta enabled:** DAG pipelines are behind the feature flag `PIPE_ENABLE_DEPENDENCY_BASED_EXECUTION`.

    :::info Contact Harness support:

    If DAG options do not appear in the pipeline editor, contact your account administrator or [Harness Support](mailto:support@harness.io) to enable the feature.

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand roles and permissions, and go to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to create or edit a role.
- **Familiarity with Harness pipelines:** You should know how to create and run a pipeline. If you are new to pipelines, go to [Harness Pipelines](/docs/category/pipelines) to learn the basics.

---

## When to use DAG pipelines

DAG pipelines are ideal for workflows where different stages have specific dependencies that do not fit into a simple sequential or parallel pattern.

Consider a build pipeline for a multi-platform application. You have separate build stages for iOS, Android, and web platforms. Traditionally, you would either run these builds sequentially (wasting time) or in parallel, then wait for all three to complete before deploying any of them. With DAG pipelines, you can deploy the iOS app as soon as its build completes, without waiting for the Android or web builds to finish. Each platform's deployment depends only on its own build stage, allowing truly independent parallel workflows.

Other scenarios where DAG pipelines excel include:
- **Multi-environment deployments** where different environments have different prerequisites
- **Parallel testing workflows** where integration tests depend on specific unit test stages
- **Build and deployment pipelines** where artifact publishing stages depend on specific build stages, not all of them
- **Conditional workflow paths** where certain stages only run when their specific dependencies succeed

---

## How DAG pipelines work

In DAG pipelines, stage execution is controlled by the `dependsOn` field rather than stage order. Each stage declares which other stages must complete successfully before it can start. A stage with no dependencies (empty `dependsOn` array) starts immediately when the pipeline begins.

The pipeline can have multiple independent execution paths, with each path progressing based on its dependencies. The overall pipeline completes when all stages finish, regardless of their execution path.

### Key differences from traditional pipelines

Traditional pipelines use the `parallel` keyword in YAML to group stages that run simultaneously. DAG pipelines eliminate this keyword entirely. Instead of grouping stages into parallel or sequential blocks, you explicitly define dependencies for each stage.

Stage order in the pipeline YAML does not affect execution order in DAG pipelines. Only the `dependsOn` field matters. You can list stages in any order in your YAML, and they will execute based solely on their declared dependencies.

---

## Enable DAG for a pipeline

You can create a DAG pipeline from scratch, or migrate one of your existing pipelines to the DAG format.

### Create a new DAG pipeline

1. In your Harness project, go to **Pipelines** and select **Create a Pipeline**.
2. In the pipeline creation dialog, enable the **Allow user to edit stage dependencies?** toggle.
3. Enter a name and optional description for your pipeline.
4. Select **Start**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/create-dag-pipeline-dialog.png')} width="60%" height="60%" title="Create DAG pipeline dialog" />
</div>

The pipeline editor opens in DAG mode. Unlike traditional pipelines, DAG pipelines do not show start or end nodes in the visual graph.

For comparison, a traditional pipeline shows the start and end nodes that DAG pipelines omit:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/traditional-pipeline-with-start-end.png')} width="60%" height="60%" title="Traditional pipeline with start and end nodes" />
</div>

### Convert an existing pipeline to DAG

Converting an existing pipeline to DAG creates a clone of the original pipeline with DAG enabled. This preserves your original pipeline so you can test DAG behavior before fully migrating.

1. In your Harness project, go to **Pipelines** and select the pipeline you want to convert.
2. Select **More Options** (...) and choose **Clone as DAG Pipeline**.
3. Enter a name for the cloned DAG pipeline.
4. Select **Clone**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/clone-convert-to-dag-menu.png')} width="60%" height="60%" title="Clone and convert to DAG pipeline menu option" />
</div>

Harness creates a new pipeline with DAG enabled. Your original pipeline remains unchanged. The new DAG pipeline removes all `parallel` keywords and sets up initial dependencies based on the original stage order (sequential stages get converted to direct dependencies, parallel stages get empty dependencies to start simultaneously).

:::warning One-way conversion
Converting a pipeline to DAG is a one-way operation. You cannot convert a DAG pipeline back to a traditional pipeline. This is because DAG pipelines support dependency patterns that cannot be represented in the traditional sequential/parallel model. For example, a stage that depends on only two out of three parallel stages has no equivalent representation in traditional pipeline syntax.
:::

### Git-stored pipelines

For pipelines stored in Git, cloning and converting to DAG follows the same process as any pipeline clone. Harness clones the pipeline YAML and adds the DAG metadata to the new pipeline. The YAML is stored in Git according to your repository structure, either in the same branch or a different branch based on your configuration.

The pipeline YAML itself is stored in Git, but pipeline metadata (including the DAG enablement flag) is stored in Harness. This means manually removing the `dependsOn` fields from a DAG pipeline's YAML in Git will not convert it back to a traditional pipeline.

---

## Configure stage dependencies

In a DAG pipeline, you define dependencies using the visual editor or by editing the YAML directly.

### Add dependencies visually

When you select a stage in the pipeline visual editor, you will see three action buttons that help you configure dependencies:

- **Left plus button**: Adds a dependency from another stage to the selected stage
- **Right plus button**: Creates a new stage that depends on the selected stage
- **Cross (X) button**: Removes dependencies from the selected stage

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-stage-action-buttons.png')} width="60%" height="60%" title="DAG stage with three action buttons" />
</div>

#### Add a dependency to an existing stage

1. In the pipeline visual editor, select the stage where you want to add a dependency.
2. Select the **left plus (+)** button that appears to the left of the stage.
3. From the dropdown list, select which stage(s) must complete before this stage can run.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-add-dependency-dropdown.png')} width="60%" height="60%" title="Add dependency dropdown" />
</div>

The dropdown shows only stages that will not create a circular dependency. Harness automatically excludes:
- Stages that are already dependencies (direct dependencies)
- Stages that depend on the current stage (would create a cycle)
- Stages that indirectly depend on the current stage through other dependencies

After you add the dependency, the visual graph updates to show the connection between the stages.

#### Create a new stage with dependencies

You can quickly create a new stage that depends on an existing stage:

1. Select a stage in the visual editor.
2. Select the **right plus (+)** button that appears to the right of the stage.
3. Choose the stage type and configure its settings.

The new stage is automatically created with a dependency on the selected stage.

If you instead hover below an existing stage and select the **plus (+)** button that appears there, the new stage will be created with the same dependencies as the existing stage (not depending on it).

#### Remove dependencies

1. Select the stage where you want to remove dependencies.
2. Select the **cross (X)** button.
3. From the list of current dependencies, select **Remove** next to the dependencies you want to remove.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-remove-dependencies-dialog.png')} width="60%" height="60%" title="Remove dependencies dialog" />
</div>

The visual graph updates to reflect the removed dependencies. If you remove all dependencies from a stage, it will start executing immediately when the pipeline begins.

### Edit dependencies in YAML

In the pipeline YAML editor, each stage has a `dependsOn` field that lists the stage identifiers it depends on.

<details>
<summary>Example: Multi-path deployment with selective dependencies and multiple endpoints</summary>

Consider a complex CI/CD pipeline with multiple independent workflows that selectively converge and diverge, ultimately completing at three different endpoints. This pipeline demonstrates advanced DAG patterns that cannot be expressed in traditional pipelines:

```yaml
pipeline:
  name: Multi-Path DAG with Selective Dependencies
  identifier: complex_dag_demo
  projectIdentifier: project1
  orgIdentifier: default
  stages:
    - stage:
        name: Setup Infrastructure
        identifier: setup_infra
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Provision Infrastructure
                  identifier: provision_infra
                  spec:
                    shell: Bash
                    command: echo "Setting up cloud infrastructure..."
        dependsOn: []
    - stage:
        name: Build Config
        identifier: build_config
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Generate Configuration
                  identifier: gen_config
                  spec:
                    shell: Bash
                    command: echo "Building configuration files..."
        dependsOn: []
    - stage:
        name: Deploy Database
        identifier: deploy_database
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Deploy DB
                  identifier: deploy_db
                  spec:
                    shell: Bash
                    command: echo "Deploying database..."
        dependsOn:
          - setup_infra
    - stage:
        name: Build Frontend
        identifier: build_frontend
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Build Frontend Assets
                  identifier: build_fe_assets
                  spec:
                    shell: Bash
                    command: echo "Building frontend application..."
        dependsOn:
          - build_config
    - stage:
        name: Build Backend
        identifier: build_backend
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Build Backend Services
                  identifier: build_be_services
                  spec:
                    shell: Bash
                    command: echo "Building backend services..."
        dependsOn:
          - build_config
    - stage:
        name: Integration Tests
        identifier: integration_tests
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Run Integration Tests
                  identifier: run_integration
                  spec:
                    shell: Bash
                    command: echo "Running integration tests..."
        dependsOn:
          - deploy_database
          - build_backend
    - stage:
        name: Deploy Frontend
        identifier: deploy_frontend
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Deploy Frontend App
                  identifier: deploy_fe_app
                  spec:
                    shell: Bash
                    command: echo "Deploying frontend to CDN..."
        dependsOn:
          - build_frontend
    - stage:
        name: Deploy Backend
        identifier: deploy_backend
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Deploy Backend Services
                  identifier: deploy_be_services
                  spec:
                    shell: Bash
                    command: echo "Deploying backend services..."
        dependsOn:
          - integration_tests
    - stage:
        name: E2E Tests
        identifier: e2e_tests
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Run E2E Tests
                  identifier: run_e2e
                  spec:
                    shell: Bash
                    command: echo "Running end-to-end tests..."
        dependsOn:
          - deploy_frontend
          - deploy_backend
    - stage:
        name: Monitor Setup
        identifier: monitor_setup
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Configure Monitoring
                  identifier: config_monitoring
                  spec:
                    shell: Bash
                    command: echo "Setting up monitoring dashboards..."
        dependsOn:
          - deploy_backend
    - stage:
        name: Deploy Production
        identifier: deploy_production
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Production Deployment
                  identifier: prod_deploy
                  spec:
                    shell: Bash
                    command: echo "Deploying to production environment..."
        dependsOn:
          - e2e_tests
    - stage:
        name: Backup Data
        identifier: backup_data
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Create Backup
                  identifier: create_backup
                  spec:
                    shell: Bash
                    command: echo "Creating database backup..."
        dependsOn:
          - deploy_database
    - stage:
        name: Send Notifications
        identifier: send_notifications
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Notify Teams
                  identifier: notify_teams
                  spec:
                    shell: Bash
                    command: echo "Sending deployment notifications..."
        dependsOn:
          - deploy_production
          - monitor_setup
```

**Key DAG patterns demonstrated:**

1. **Multiple independent starting points**: Setup Infrastructure and Build Config start simultaneously with no dependencies
2. **Selective dependencies (Convergence 1)**: Integration Tests depends only on Deploy Database + Build Backend, not on Build Frontend
3. **Independent paths**: Deploy Frontend proceeds independently from backend testing, not waiting for Integration Tests
4. **Selective dependencies (Convergence 2)**: E2E Tests waits for both Deploy Frontend + Deploy Backend to complete
5. **Partial dependency**: Monitor Setup depends only on Deploy Backend, not on E2E Tests
6. **Three distinct endpoints**:
   - **Endpoint 1**: Deploy Production (depends on E2E Tests)
   - **Endpoint 2**: Send Notifications (depends on Deploy Production + Monitor Setup)
   - **Endpoint 3**: Backup Data (independent path from Deploy Database)

**Pipeline visual representation:**

The DAG pipeline visual graph shows all stages and their dependency relationships:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-pipeline-example-visual.png')} width="70%" height="70%" title="Multi-path DAG pipeline visual graph" />
</div>

**Execution flow:**

- **Wave 1**: Setup Infrastructure and Build Config start immediately (2 parallel)
- **Wave 2**: Deploy Database (from infra) + Build Frontend + Build Backend (from config) run in parallel (3 parallel)
- **Wave 3**: Integration Tests (needs database + backend) runs while Deploy Frontend proceeds independently
- **Wave 4**: Deploy Backend starts after integration tests; Backup Data completes independently
- **Wave 5**: E2E Tests waits for both deployments; Monitor Setup configures based on backend only
- **Wave 6**: Deploy Production happens after E2E Tests pass
- **Wave 7**: Send Notifications waits for both production deployment AND monitoring setup to complete

**Completed execution:**

After all stages complete, you can see the full execution results showing the complex dependency relationships and multiple endpoints:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-pipeline-execution-complete.png')} width="70%" height="70%" title="Completed DAG pipeline execution with multiple endpoints" />
</div>

**Why this cannot be expressed in traditional pipelines:**

- Deploy Frontend does not wait for Integration Tests (selective independence)
- Backup Data completes on its own timeline without blocking other stages
- Send Notifications requires two specific stages (Deploy Production + Monitor Setup) but not all stages
- Monitor Setup only needs Deploy Backend, not the full E2E Tests
- Multiple terminal nodes rather than a single end point

This pipeline demonstrates how DAG enables complex workflows where different components proceed at their own pace, converge only when necessary, and complete independently.

</details>

---

## Visual graph behavior

The DAG pipeline visual editor provides several features to help you understand and manage complex dependency relationships.

### No start or end nodes

DAG pipelines do not show explicit start or end nodes in the visual graph. Stages with empty `dependsOn` arrays are visually positioned at the start, and stages that no other stages depend on appear at the end. However, these positions are for visual clarity only, and execution is controlled by dependencies, not visual position.

### Highlighted dependency paths

When you select a stage in the visual editor, Harness highlights the entire dependency path for that stage. This includes:
- All stages that the selected stage directly depends on
- All stages that those stages depend on (indirect dependencies)
- The connections between all these stages

Stages outside this dependency path are dimmed, making it easier to trace how the selected stage fits into the overall workflow.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-dependency-path-highlighted.png')} width="60%" height="60%" title="DAG pipeline with highlighted dependency path" />
</div>

### Automatic graph layout

Harness automatically arranges stages in the visual graph based on their dependencies. Stages with no dependencies appear at the top (leftmost in a horizontal layout), and stages with the most dependencies appear toward the bottom (rightmost).

If you add or remove dependencies, the graph automatically reorganizes to maintain a clear visual representation of the dependency structure.

---

## Execution behavior

Understanding how DAG pipelines execute helps you design efficient workflows.

### Dependency resolution

A stage begins executing as soon as all of its dependencies complete successfully. Harness does not wait for other stages that are not dependencies. This "execute as soon as possible" approach maximizes parallelism and reduces overall pipeline execution time.

For example, if Stage A depends on Stages B and C, but Stages D and E are also running:
- Stage A starts when both B and C succeed
- Stage A does not wait for D or E to complete
- D and E can still be running when A starts

### Multiple dependencies (AND logic)

When a stage depends on multiple other stages, it uses AND logic. All dependencies must succeed before the stage executes.

If Stage X depends on Stages A, B, and C:
- Stage X starts only after A AND B AND C all succeed
- If any dependency fails, Stage X will not execute (unless you configure failure strategies)

### Pipeline completion

The pipeline status reflects the outcome of all stages, regardless of their dependencies. A pipeline is complete when all stages have finished executing (succeeded, failed, or been skipped).

If Stage A completes while Stage B (an independent path) is still running, the pipeline continues until Stage B finishes. The pipeline status shows "Running" until all stages complete.

### Independent execution paths

DAG pipelines can have completely independent execution paths. Stages in one path do not affect stages in another path unless they share dependencies.

For example, in a pipeline with two separate workflows:
- Path 1: Build iOS → Deploy iOS → Test iOS
- Path 2: Build Android → Deploy Android → Test Android

These paths execute independently. If the iOS build fails, the Android workflow continues unaffected. The pipeline status shows which stages succeeded and which failed, giving you a clear view of what worked and what did not.

---

## Templates and DAG pipelines

DAG pipelines support pipeline templates and stage templates with specific behaviors.

### Pipeline templates

You can create pipeline templates with DAG enabled. The template defines the stage dependencies, and pipelines created from the template inherit the DAG structure.

When creating a new pipeline template, enable the **Allow user to edit stage dependencies?** toggle in the template creation dialog:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-template-creation-dialog.png')} width="60%" height="60%" title="Create DAG pipeline template dialog" />
</div>

To convert an existing pipeline template to DAG:
1. Open the pipeline template in the template studio.
2. Select **More Options** (...) and choose **Clone as DAG Template**.
3. Enter a name for the new DAG template.
4. Select **Clone**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/dag-template-clone-convert.png')} width="60%" height="60%" title="Clone as DAG template menu option" />
</div>

The new template has DAG enabled, and any pipelines created from it will be DAG pipelines.

### Stage templates

When you use stage templates within a DAG pipeline, the template itself does not define dependencies. Dependencies are configured at the pipeline level, where you add the stage template to the pipeline.

A stage template in a DAG pipeline behaves like any other stage. You configure its dependencies using the same visual editor or YAML approach. The template defines what the stage does, and the pipeline defines when it runs (based on dependencies).

:::info known issue
In the current release, when you add a stage template to a DAG pipeline, the visual editor might show it as a traditional pipeline stage. This is a visual bug only, and the stage template still functions correctly as part of the DAG pipeline. You can configure its dependencies normally, and the execution behavior is unaffected.
:::

---

## Conditional execution

DAG pipelines support conditional execution settings in addition to dependency-based execution. You can combine dependencies with conditional execution and manual stage controls to create sophisticated workflow logic.

### Standard conditional execution

DAG pipelines support all standard conditional execution options:
- **Always execute this stage**: The stage runs regardless of previous stage outcomes
- **Execute this stage only if prior stages succeeded**: The default behavior (stages run only when all dependencies complete successfully)
- **Execute this stage only if prior stages failed**: Run error-handling or cleanup stages

These conditions apply to the stage's dependencies. For example, if Stage X depends on Stage Y and uses "only if prior stages succeeded," Stage X runs only if Stage Y succeeds.

### Manual stage execution

You can combine DAG dependencies with [manual pipeline execution](/docs/platform/pipelines/pipeline-manual-run/) to gain granular control over which stages run in a given execution. Manual execution allows you to select specific stages to run or skip before starting the pipeline, while DAG dependencies ensure that selected stages only run after their dependencies complete successfully.

For example, you might have a DAG pipeline with deployment stages for multiple regions, where each region has specific dependencies. Using manual execution, you can choose to deploy only to specific regions in a given run, and DAG dependencies ensure those regions deploy only after their required build and test stages complete.

---

## Limitations

Be aware of these current limitations when using DAG pipelines:

- **One-way conversion**: You cannot convert a DAG pipeline back to a traditional pipeline. Plan your migration carefully and test DAG behavior before fully committing.
- **No step-level dependencies**: DAG dependencies apply to stages only, not to individual steps within a stage. Steps within a stage always execute in the order defined in the stage configuration.
- **Git YAML editing**: Manually editing a DAG pipeline's YAML in Git to remove `dependsOn` fields will not convert it back to a traditional pipeline. The DAG metadata is stored separately in Harness and must be changed through the UI.
