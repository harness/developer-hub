---
title: CI pipeline creation overview
description: An overview of CI pipeline components and Build stage settings
sidebar_position: 10
redirect_from:
  - /docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times
---

This topic provides an overview of CI pipeline creation and configuration, including common components, such as stages, steps, and codebases, as well as advanced settings.

For information about Harness CI's key features, Harness Platform components in Harness CI, and definitions of terms like build infrastructure, delegate, connector, and so on, go to [Harness CI key concepts](../get-started/key-concepts.md).

## Pipelines

A CI pipeline is an end-to-end integration workflow that, in its simplest form, pulls a codebase, builds an artifact, and then uploads the artifact to storage or a registry such as Docker Hub, Google Cloud Registry, JFrog Artifactory, and many others. Pipelines are comprised of [stages](#stages) and [steps](#steps).

You can run a pipeline manually or set up triggers to automatically run it on a schedule or when an event occurs, such as a Git merge in your codebase.

### Create a Harness CI pipeline

1. Log in to your Harness account. If you don't have an account yet, go to [Try Harness CI](../get-started/tutorials.md).
2. Go to the **Continuous Integration** module, select **Pipelines**, and then select **Create a Pipeline**.
3. Enter a **Name** for the pipeline. **Description** and **Tags** are optional.
4. Select **Inline** to store your pipeline configuration in Harness, or select **Remote** to store your pipeline as code in a Git repository.
5. If you want to use a [pipeline template](/docs/platform/templates/template), select **Start with Template**.
6. Select **Start**.

You can now add [stages](#stages) and [steps](#steps) to the pipeline, as well as configure [pipeline settings](#pipeline-settings).

:::tip

You can also [import pipelines from Git](/docs/platform/git-experience/import-a-pipeline/).

:::

### Pipeline settings

In addition to a [default codebase](#codebases), you can configure the following settings at the pipeline level:

* [Input sets and overlays](/docs/platform/pipelines/input-sets)
* [Triggers](/docs/category/triggers)
* [Variables](/docs/category/variables-and-expressions)
* [Notifications](/docs/category/notifications)
* [Flow Control: Synchronization barriers](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers)
* [Policy Sets](/docs/platform/governance/policy-as-code/harness-governance-overview)
* Advanced Options: Pipeline [Timeout Settings](/docs/platform/pipelines/failure-handling/timeout-settings.md), [Stage Execution Settings](/docs/platform/pipelines/run-specific-stage-in-pipeline/), and [Delegate Selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)

:::tip

Harness [Input sets](/docs/platform/pipelines/input-sets) are collections of runtime inputs for a pipeline run. Overlays are groups of input sets. You can use overlays to provide multiple input sets when you run a pipeline.

With input sets and overlays, you can use the same pipeline for multiple scenarios. You can define each scenario in an input set or overlay, and then select the appropriate scenario at runtime.

:::

### Visual and YAML editors

Harness CI provides two interchangeable modes for creating pipelines: The **Visual** editor and the **YAML** editor.

* The **Visual** editor provides a GUI experience where you can easily configure settings, add and remove steps and stages, and drag-and-drop steps and stages to rearrange them, organize them in parallel, or add or remove them from step groups.
* The **YAML** editor provides a text editor experience for creating pipelines.

You can freely switch between the two editors. When editing a pipeline in Harness, use the selector at the top of the **Pipeline Studio** to switch between the **Visual** and **YAML** editors.

![](./static/harness-yaml-quickstart-21.png)

For more information about Harness YAML, go to [Write pipelines in YAML](/docs/platform/pipelines/harness-yaml-quickstart).

## Stages

A CI stage is a subset of a pipeline that contains one major segment of the CI workflow. All stages have stage settings and one or more steps.

To [add a stage to a pipeline](/docs/platform/pipelines/add-a-stage/), select **Add Stage** in the Pipeline Studio. The most essential stage for CI pipelines is the **Build** stage, which includes [steps](#steps) that test code, build and push images, and upload artifacts, among other steps.

[CI Build stage settings](./set-up-build-infrastructure/ci-stage-settings.md) include [codebase configuration](#codebases), [build infrastructure](#build-infrastructure), [shared paths](#shared-paths), and other [advanced settings](#advanced-settings).

:::tip

To make pipelines more versatile, you can create [templates](/docs/category/templates), use [stage variables](/docs/platform/pipelines/add-a-stage.md#stage-variables), and create [custom stages](/docs/platform/pipelines/add-a-stage.md#add-a-custom-stage), among other [optimization strategies](#optimization-strategies).

:::

### Codebases

CI pipelines build and test code that is pulled from a Git code repository. When you add a **Build** stage to a CI pipeline, you specify the Git account and repository where your code is stored. The codebase declared in the first stage in a pipeline becomes the pipeline's default codebase. You can use this codebase for later stages in the pipeline, or you can use multiple codebases in the same pipeline. For more information, go to [Configure codebases](/docs/category/configure-codebases/).

Harness uses [code repo connectors](/docs/category/code-repo-connectors) to connect to Git repositories.

### Build infrastructure

All stages have an infrastructure definition, which represents the build infrastructure used by a CI pipeline: the target clusters, hosts, and so on. Build infrastructure components and specifications depend on the build infrastructure you choose. For more information, go to [Which build infrastructure is right for me](./set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

:::tip Tutorials

* [Build on Harness Cloud build infrastructure](../get-started/tutorials.md)
* [Build on a Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra)

:::

### Shared Paths

You can use **Shared Paths** in a stage to [share data across steps](./caching-ci-data/share-ci-data-across-steps-and-stages.md) or customize cache paths for [Cache Intelligence](./caching-ci-data/cache-intelligence.md).

When a pipeline runs, it creates a temporary volume for each stage called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is the current working directory for each step in the stage. The workspace persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The default shared working directory for a stage is `/harness`. The workspace is destroyed when the stage ends.

Individual steps can communicate and share state using the workspace filesystem. The workspace is a volume, so filesystem changes persist throughout the stage lifetime. If you need to share additional volumes, you can add **Shared Paths**. Paths must begin with a forward slash, such as `/vol`.

For example, the maven `m2` repo is stored in `/root/.m2` by default. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

If you need to shared data across stages, use [caching](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-across-stages).

## Steps

A stage contains one or more steps. Each step is a series of commands that perform a task. For example, A **Build and Push** step builds an image and pushes it to a cloud repo, a **Run** step runs a series of shell commands, and so on. Go to the following documentation for details about how you can use various CI steps in your pipelines:

* [Build and push images or upload and download artifacts](/docs/category/build-push-upload-download)
* [Run tests](/docs/category/run-tests)
* [Manage dependencies](/docs/category/manage-dependencies)
* [Share and cache CI data](/docs/category/share-and-cache-ci-data)
* [Run scripts](/docs/continuous-integration/use-ci/run-step-settings)
* [Use plugins](/docs/category/use-plugins)
* [Security step (Harness STO)](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)

:::tip

Use [step groups](/docs/platform/pipelines/use-step-groups.md) to organize complex stages that have many steps.

Use [templates](/docs/category/templates/) to share and utilize pre-built pipelines, stages, and steps.

:::

## Advanced settings

Stages and steps have advanced settings you can use to control the flow of operations.

### Conditional Executions

Use [conditional execution settings](/docs/platform/pipelines/step-skip-condition-settings) to specify when a stage or step should run. For example, you can specify that a particular stage should run only if the prior pipeline or stage failed.

You can specify conditional execution settings for an entire stage and for individual steps. A stage's conditional execution settings apply to all steps in that stage that don't have their own step-level conditional execution settings. A step's conditional execution settings overrides the stage's conditional execution settings.

### Looping Strategies

[Looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) enable you to run a stage or step multiple times with different inputs. This eliminates the need to copy the same stage or step for each variation you need. It also makes the pipeline more organized, clean, and easy to maintain. Looping strategies enable use cases such as:

* You want to test a UI feature in multiple browsers and platforms. You can define a matrix that specifies the browsers and platforms to test.
* You want to build artifacts for multiple JDK versions in the same Build Stage.
* You have a Build Pipeline with 20 unit tests. To speed up execution, you want to run the tests in parallel across 4 jobs that run 5 tests each.

### Failure Strategies

[Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) define how your stages and steps handle different failure conditions.

Each failure strategy is comprised of the following:

* Error conditions that trigger the failure strategy.
* Actions to take when the specified error conditions occur.

Failure strategies are a critical pipeline design component that determine what causes a stage or step to fail and what to do when a failure occurs.

## Optimization strategies

You can optimize your CI pipelines to make them faster, more efficient, and more versatile. For example:

### Dependencies

* [Harness CI Intelligence](/docs/continuous-integration/get-started/harness-ci-intelligence.md)
* [Caching and data sharing](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages.md)
* [Dependency management strategies](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies.md)

### Variables

Expressions and runtime inputs make your pipelines more dynamic.

* [Fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs)
* [Variables and expressions](/docs/category/variables-and-expressions)
* [CI environment variables](/docs/continuous-integration/troubleshoot-ci/ci-env-var.md)
* [Input sets and overlays](/docs/platform/pipelines/input-sets)

### Automation

Strategies to automate and manage build sequences include:

* [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining.md)
* [Failure strategies](#failure-strategies)
* [Conditional executions](#conditional-executions)
* [Looping strategies](#looping-strategies)
* [Triggers](/docs/category/triggers)

### Integration

There are many ways you can incorporate third party tools and services in your CI pipelines, including:

* [Plugins](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins.md)
* [Secrets Managers](/docs/platform/get-started/tutorials/add-secrets-manager)
* [Notifications](/docs/category/notifications)
* [Branch protection and status checks](/docs/continuous-integration/use-ci/codebase-configuration/scm-status-checks.md)

### Resource consumption

* Understand [resource allocation](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits.md).
* [Enforce pipeline concurrency limits.](/docs/platform/pipelines/pipeline-settings.md)
* Use [Queue Intelligence](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#queue-intelligence).
