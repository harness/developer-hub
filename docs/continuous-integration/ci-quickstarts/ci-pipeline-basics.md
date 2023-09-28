---
title: CI pipeline basics
description: Basic terminology and concepts related to CI pipelines
sidebar_position: 30
helpdocs_topic_id: 3amcd8hn53
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic covers basic terminology and concepts related to CI pipelines. For general Harness Platform terminology and concepts, go to [Harness key concepts](../../getting-started/learn-harness-key-concepts.md). For information about creating pipelines and configuring pipeline components go to [CI pipeline creation overview](../use-ci/prep-ci-pipeline-components.md).

## Pipelines

A CI pipeline is an end-to-end integration workflow that, in its simplest form, pulls a codebase, builds an artifact, and then uploads the artifact to storage or a registry such as Docker Hub, Google Cloud Registry, JFrog Artifactory, and many others.

You can run a pipeline manually or set up [triggers](#triggers) to automatically run it on a schedule or when an event occurs, such as a Git merge in your codebase.

Pipelines are comprised of stages and steps.

### Stages

A CI stage is a subset of a pipeline that contains one major segment of the CI workflow. A **Build** stage includes [steps](#steps) for building, pushing, and testing your code. For more information, go to [CI pipeline creation overview](../use-ci/prep-ci-pipeline-components.md).

<details>
<summary>What is build infrastructure?</summary>

All stages have an infrastructure definition, which represents the build infrastructure used by a CI pipeline: the target clusters, hosts, and so on. Build infrastructure components and specifications depend on the build infrastructure you choose. For more information, go to [Which build infrastructure is right for me](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

</details>

<details>
<summary>What are shared paths?</summary>

You can use **Shared Paths** in a stage to [share data across steps](../use-ci/caching-ci-data/share-ci-data-across-steps-and-stages.md) or customize cache paths for [Cache Intelligence](../use-ci/caching-ci-data/cache-intelligence.md).

When a pipeline runs, it creates a temporary volume called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is the current working directory for each step in the stage. The workspace persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The default shared working directory for a stage is `/harness`. The workspace is destroyed when the stage ends.

Individual steps can communicate and share state using the workspace filesystem. The workspace is a volume, so filesystem changes persist throughout the stage lifetime. If you need to share additional volumes, you can add **Shared Paths**. Paths must begin with a forward slash, such as `/vol`. <!-- resolves as `/vol/harness`? -->

For example, the maven `m2` repo is stored in `/root/.m2` by default. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

</details>

### Steps

A stage contains one or more steps. Each step is a series of commands that perform a task. For example, A **Build and Push** step builds an image and pushes it to a cloud repo, a **Run** step runs a series of shell commands, and so on.

Harness CI includes an extensive Step Library for common CI tasks: building artifacts, uploading to cloud repos, running tests, and so on. For more information, go to [CI pipeline creation overview](../use-ci/prep-ci-pipeline-components.md).

![](./static/ci-pipeline-basics-510.png)

## Tests

In a CI pipeline, you can [run a variety of tests](../use-ci/set-up-test-intelligence/run-tests-in-ci.md), such as integration tests, functional tests, and unit tests. To do this, you can use a [Run Tests step](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md#add-the-run-tests-step) or a [Run step](../use-ci/run-ci-scripts/run-step-settings.md). You must use the **Run Tests** step to [enable Test Intelligence](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md).

### Test Intelligence

Test Intelligence speeds up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. You can easily see the code changes and gaps in your unit test plan. Test Intelligence also identifies negative trends and provides actionable insights to improve quality. For more information, go to [Enable Test Intelligence](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md).

## Plugins

Plugins perform predefined tasks, such as deploying code, publishing artifacts, sending notifications, and more. They are configured as steps in your CI pipelines.

Docker Plugins are Docker containers that perform predefined tasks and run in **Plugin** steps. The Drone community maintains an [extensive plugin library](https://plugins.drone.io/) for specific CI workflows. You can customize and extend your build processes using existing plugins or [write your own plugins](../use-ci/use-drone-plugins/custom_plugins.md).

For more information, go to [Use Plugins](/docs/category/use-plugins/), [Plugin step settings](../use-ci/use-drone-plugins/plugin-step-settings-reference.md), and [Run a Drone plugin in CI](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

If you're using Harness Cloud build infrastructure, you can also use the [GitHub Action plugin step](../use-ci/use-drone-plugins/ci-github-action-step.md) and [Bitrise plugin step](../use-ci/use-drone-plugins/ci-bitrise-plugin.md) to run GitHub Actions and Bitrise Integrations in your CI pipelines.

## Dependencies and background services

If you decide to split your pipeline into multiple stages, you need to make sure each stage has access to any dependencies. An example of a use case for background services is when your unit tests require a running Redis server. Background services can run in an isolated container or on the host. For information about configuring and calling background services, go to [Background step settings](../use-ci/manage-dependencies/background-step-settings.md).

### Caching

Caching expedites job execution by reusing data from expensive fetch operations that ran in previous jobs. You can also use caching to share data across stages. For example, you can use **Save Cache** and **Restore Cache** steps to save a cache to a cloud storage bucket and restore it later. For more information, go to [Share and cache CI data](/docs/category/share-and-cache-ci-data).

### Remote Docker layer caching

Harness enables remote Docker layer caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo. You can also specify the same Docker repo for multiple **Build and Push** steps, enabling them to share the same remote cache. This can dramatically improve build time by sharing layers across pipelines, stages, and steps.

### Artifact repos

Harness CI offers popular object storage options such as JFrog, Amazon S3, and Google GCS where you can [push your artifacts](/docs/category/build-and-upload-artifacts). Object storage repos are configured as **Upload Artifacts** steps in your pipelines.

### Services

A service represents your microservices, Serverless functions, and other workloads logically. You can deploy, monitor, or change each service independently.

### Service definition

When you add a service to a stage, the service definition represents the real artifacts, manifests, and variable settings of that service. You can propagate or override a service in later stages of the pipeline.

## Platform components

Harness CI uses some components that are common to the Harness Platform.

### Connectors

Connectors contain the information necessary to integrate and work with third-party tools, such as Git providers and artifact repos. For example, a GitHub connector authenticates with a GitHub account and/or repo and fetches files as part of a deploy stage. Harness uses connectors at pipeline runtime to authenticate and run operations in external tools.

Connectors require different permissions depending on your build environment and the tasks your pipeline performs. For example, if your pipeline builds and pushes an image to Docker Hub, you need a connector that can connect to the Docker Hub repo and push images.

For more information, go to the Harness Platform documentation on [Connectors](https://developer.harness.io/docs/category/connectors).

### Delegates

The Harness Delegate is a software service you install in an environment, such as a Kubernetes cluster, that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, and so on.

The Delegate uses the credentials set up in the connectors used by the pipeline to perform deployment tasks. Additionally, the Delegate needs permissions in the target environment to execute build tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

For more information, go to the Harness Platform documentation on [Delegates](/docs/category/delegates).

### Variables

You can add and reference [built-in and custom variables](/docs/category/variables-and-expressions) in pipelines and stages. They're available across the pipeline. You can propagate and override their values in later stages.

### Triggers

You can run your pipelines manually or use [triggers](/docs/category/triggers) to initiate their execution. You can trigger a pipeline based on Git commits and pull requests, schedules, and so on.

### Dashboards

The **Overview** screen provides a high-level view of all your builds, regardless of status (successful, failed, cancelled, or expired) and the percentage of successful builds for individual codebases. You can easily see where your builds have failed and [drill down into specific builds](../use-ci/viewing-builds.md) to troubleshoot and analyze the root causes.
