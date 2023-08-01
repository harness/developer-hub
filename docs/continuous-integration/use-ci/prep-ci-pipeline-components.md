---
title: CI pipeline creation overview
description: An overview of CI pipeline components and Build stage settings
sidebar_position: 10
---

This topic provides an overview of CI pipeline creation and configuration, including common components, such as **Build** stages, steps, and codebases, as well as advanced settings.

For definitions of terms like stage, step, build infrastructure, delegate, connector, and so on, go to [CI pipeline components](../ci-quickstarts/ci-pipeline-basics.md).

## Pipelines

A CI pipeline is an end-to-end integration workflow that, in its simplest form, pulls a codebase, builds an artifact, and then uploads the artifact to storage or a registry such as Docker Hub, Google Cloud Registry, JFrog Artifactory, and many others. Pipelines are comprised of [stages](#stages) and [steps](#steps).

You can run a pipeline manually or set up triggers to automatically run it on a schedule or when an event occurs, such as a Git merge in your codebase.

<details>
<summary>Create a pipeline in Harness CI</summary>

1. In the **Builds** (Continuous Integration) modules, select **Pipelines**, and then select **Create a Pipeline**.
2. Enter a **Name** for the pipeline. **Description** and **Tags** are optional.
3. Select **Inline** to store your pipeline configuration in Harness, or select **Remote** to store your pipeline as code in a Git repository.
4. If you want to use a [pipeline template](/docs/platform/Templates/template), select **Start with Template**.
5. Select **Start**.

You can now add [stages](#stages) and [steps](#steps) to the pipeline, as well as configure pipeline settings. For a guided experience, try one of the [CI tutorials](../ci-quickstarts/ci-pipeline-quickstart.md).

:::tip

You can also [import pipelines from Git](/docs/platform/git-experience/import-a-pipeline/).

:::

</details>

<details>
<summary>Pipeline settings</summary>

In addition to a default [codebase](#codebases), the following settings are configurable at the pipeline level:

* [Input sets and overlays](/docs/platform/Pipelines/input-sets)
* [Triggers](/docs/category/triggers)
* [Variables](/docs/category/variables-and-expressions)
* [Notifications](/docs/category/notifications)
* [Flow Control: Synchronization barriers](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers)
* [Policy Sets](/docs/platform/Governance/Policy-as-code/harness-governance-overview)
* Advanced Options: Pipeline Timeout Settings, [Stage Execution Settings](/docs/platform/pipelines/run-specific-stage-in-pipeline/), and [Delegate Selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)

:::tip

Harness [Input Sets](/docs/platform/Pipelines/input-sets) are collections of runtime inputs for a pipeline run. Overlays are groups of Input Sets. Use Overlays to provide multiple Input Sets when you run a pipeline.

With Input Sets and Overlays, you can use the same pipeline for multiple scenarios. You can define each scenario in an Input Set or Overlay, and then select the appropriate scenario at runtime.

:::

</details>

## Stages

A CI stage is a subset of a pipeline that contains one major segment of the CI workflow. All stages have stage settings and one or more steps.

To [add a stage to a pipeline](/docs/platform/pipelines/add-a-stage/), select **Add Stage** in the Pipeline Studio. The most essential stage for CI pipelines is the **Build** stage, which includes [steps](#steps) that test code, build and push images, and upload artifacts, among other steps.

[CI Build stage settings](./set-up-build-infrastructure/ci-stage-settings.md) include [codebase configuration](#codebases), [build infrastructure](#build-infrastructure), [shared paths](#shared-paths), and other [advanced settings](#advanced-stage-and-step-settings).

:::tip

To make pipelines more versatile, you can create [templates](/docs/category/templates), use [stage variables](/docs/platform/pipelines/add-a-stage/#option-stage-variables), and create [custom stages](/docs/platform/pipelines/add-a-custom-stage/), among other [optimization techniques](./optimize-and-more/optimizing-ci-build-times.md).

:::

### Codebases

CI pipelines build and test code that is pulled from a Git code repository. When you add a **Build** stage to a CI pipeline, you specify the Git account and repository where your code is stored. The codebase declared in the first stage in a pipeline becomes the pipeline's default codebase. You can use this codebase for later stages in the pipeline, or you can use multiple codebases in the same pipeline. For more information, go to [Configure codebases](/docs/category/configure-codebases/).

Harness uses [code repo connectors](/docs/category/code-repo-connectors) to connect to Git repositories.

### Build infrastructure

All stages have an infrastructure definition, which represents the build infrastructure used by a CI pipeline: the target clusters, hosts, and so on. Build infrastructure components and specifications depend on the build infrastructure you choose. For more information, go to [Which build infrastructure is right for me](./set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

:::tip Tutorials

* [Harness Cloud build infrastructure tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster build infrastructure tutorial](/tutorials/ci-pipelines/kubernetes-build-farm)

:::

### Shared Paths

You can use **Shared Paths** in a stage to [share data across steps](./caching-ci-data/share-ci-data-across-steps-and-stages.md) or customize cache paths for [Cache Intelligence](./caching-ci-data/cache-intelligence.md).

When a pipeline runs, it creates a temporary volume called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is the current working directory for each step in the stage. The workspace persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The default shared working directory for a stage is `/harness`. The workspace is destroyed when the stage ends.

Individual steps can communicate and share state using the workspace filesystem. The workspace is a volume, so filesystem changes persist throughout the stage lifetime. If you need to share additional volumes, you can add **Shared Paths**. Paths must begin with a forward slash, such as `/vol`.

For example, the maven `m2` repo is stored in `/root/.m2` by default. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

## Steps

A stage contains one or more steps. Each step is a series of commands that perform a task. For example, A **Build and Push** step builds an image and pushes it to a cloud repo, a **Run** step runs a series of shell commands, and so on. Go to the following documentation for details about how you can use the various CI steps in your pipelines:

* [Build and upload artifacts](/docs/category/build-and-upload-artifacts)
* [Run tests](/docs/category/run-tests)
* [Manage dependencies](/docs/category/manage-dependencies)
* [Share and cache CI data](/docs/category/share-and-cache-ci-data)
* [Run scripts](/docs/category/run-scripts)
* [Use plugins](/docs/category/use-plugins)
* [Security step (Harness STO)](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)

## Advanced stage and step settings

Stages and steps have advanced settings to control the flow of operations.

<details>
<summary>Conditional Executions</summary>

Use [conditional execution settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/) to specify when a stage or step should run. For example, you can specify that a particular stage should run only if the prior pipeline or stage failed.

You can specify conditional execution settings for an entire stage and for individual steps. A stage's conditional execution settings apply to all steps in that stage that don't have their own step-level conditional execution settings. A step's conditional execution settings overrides the stage's conditional execution settings.

</details>

<details>
<summary>Looping Strategies</summary>

For information about looping strategies to go:

* [Looping strategies - matrix, repeat, parallelism](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism)
* [Optimize and enhance CI pipelines](/docs/category/optimize-and-enhance)

</details>

<details>
<summary>Failure Strategies</summary>

[Failure strategies](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) define how your stages and steps handle different failure conditions.

Each failure strategy is comprised of the following:

* Error conditions that trigger the failure strategy.
* Actions to take when the specified error conditions occur.

Failure strategies are a critical pipeline design component that determine what causes a stage or step to fail and what to do when a failure occurs.

See also:

* [Retry failed executions](/docs/platform/Pipelines/resume-pipeline-deployments)

</details>
