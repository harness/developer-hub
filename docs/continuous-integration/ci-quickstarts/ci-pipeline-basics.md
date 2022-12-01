---
title: CI Pipeline Basics
description: This topic covers CI Pipeline basics to get you ready to start building Pipelines easily. For details on general Harness concepts, see Learn Harness' Key Concepts. Pipelines. A CI Pipeline is an end-…
tags: 
   - helpDocs
sidebar_position: 20
helpdocs_topic_id: 3amcd8hn53
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic covers CI Pipeline basics to get you ready to start building Pipelines easily.

For details on general Harness concepts, see [Learn Harness' Key Concepts](../../getting-started/learn-harness-key-concepts.md).

### Pipelines

A CI Pipeline is an end-to-end integration workflow that pulls a codebase, builds an artifact, and then uploads the artifact to storage or a registry such as Docker Hub, Google Cloud Registry, JFrog Artifactory, and many others.

You can run a Pipeline manually or set up Triggers to automatically run it on a schedule or when an event occurs, like a Git merge in your codebase.

### Stages

A CI Stage is a subset of a Pipeline that performs one major segment of the CI workflow. A Build Stage includes Steps for building, pushing, and testing your code. The first Stage in a Pipeline includes the default Codebase for the Pipeline and shares it with later stages. See [CI Stage Settings](../ci-technical-reference/ci-stage-settings.md).

### Steps

A Stage contains one or more Steps. Each Step is a series of commands that perform a task. A Build and Push Step builds an image and pushes it to a cloud repo, a Run Step runs a series of shell commands, and so on.

When a Pipeline runs, it creates a temporary volume called a *Workspace*. The Build Stage clones your codebase to the root of the Workspace and runs Steps inside the root. The Workspace persists for the lifetime of the Stage and enables individual Steps to communicate and share state information.

Harness CI includes an extensive Step Library for common CI tasks: building artifacts, uploading to cloud repos, running tests, and so on.

![](./static/ci-pipeline-basics-510.png)

### Shared Path

You can use Shared Paths in a Stage to share data across Steps. By default, all Steps in a Stage use the same Workspace to share data. By default, `/harness` is the shared working directory for a Stage. For example, the Maven m2 repo is stored in `/root/.m2` by default. You can specify this same path in later Stages.

If you need to share additional volumes, you can add Shared Paths.

### Service Dependencies

A Service Dependency enables multiple Stages to access the same service. For example, your Pipeline might include unit tests that require a running Redis server. Service Dependencies run in an isolated container, so you don't need to handle dependencies. See [Configure Service Dependency](../ci-technical-reference/configure-service-dependency-step-settings.md).

### Plugins

Plugins are Docker containers that perform predefined tasks and are configured as Steps in your Stage. You can use Plugins to deploy code, publish artifacts, send notifications, and more.

The Drone community maintains an [extensive library](https://plugins.drone.io/) of plugins for specific CI workflows. You can customize and extend your build processes using existing plugins or [write your own](https://harness.io/blog/continuous-integration/write-first-plugin-for-cie/).

See [Plugin Step Settings](../ci-technical-reference/plugin-step-settings-reference.md) and [Run a Drone Plugin in CI](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

### Caching

Caching ensures faster job execution by reusing data from expensive fetch operations in previous jobs. You can use Save Cache and Restore Cache steps to save a cache to a cloud storage bucket and restore it later. See [Cache CI Data](https://docs.harness.io/category/share-and-cache-ci-data).

### Remote Docker Layer Caching

Harness enables remote Docker Layer Caching where each Docker layer is uploaded as an image to a Docker repo you identify. If the same layer is used in subsequent builds, Harness downloads the layer from the Docker repo.

This is different from other CI vendors that are limited to local caching and persistent volumes.

You can also specify the same Docker repo for multiple Build and Push steps, enabling them to share the same remote cache.

Remote Docker Layer Caching can dramatically improve build time by sharing layers across Pipelines, Stages, and steps.

### Artifact Repos

Harness CIE offers popular object storage options such as JFrog, Amazon S3, and Google GCS where you can push your artifacts. Object storage repos are set up as Pipeline Steps by using the Upload Artifacts step from the Step library.

### Services

A Service represents your microservices, Serverless functions, and other workloads logically. You can deploy, monitor, or change each Service independently.

### Service Definition

When you add a Service to a Stage, the Service Definition represents the real artifacts, manifests, and variable settings of that Service. You can propagate or override a Service in later Stages of the Pipeline.

### Infrastructure Definition

Infrastructure Definitions represent the Kubernetes build infrastructure used by a CI pipeline: the target clusters, hosts, and so on.

### Connectors

Connectors contain the information necessary to integrate and work with third-party tools such as Git providers and artifact repos. For example, a GitHub Connector authenticates with a GitHub account and repo and fetches files as part of a deploy Stage. Harness uses Connectors at Pipeline runtime to authenticate and run operations in external tools.

### Permissions

Connectors require different permissions depending on your build environment and the tasks your Pipeline performs.

For example, if your Pipeline builds and pushes an image to Docker Hub, you need a Connector that can connect to the Docker Hub repo and push images.

### Delegates

The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, and so on.

### Credentials and Permissions

The Delegate uses the credentials set up in the Connectors used by the Pipeline to perform deployment tasks.

The Delegate also needs permissions in the target environment to execute build tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

### Variables

You can add and reference custom variables in Pipelines and Stages. They're available across the Pipeline. You can propagate and override their values in later stages.

### Triggers

You can run your Pipelines manually or use triggers to initiate their execution. You can trigger a Pipeline based on Git commits and pull requests, schedules, and so on.

### Test Intelligence

Test Intelligence speeds up your test cycles by running only the tests required to confirm the quality of the code changes that triggered a build. You can easily see the code changes and gaps in the test plan. Test Intelligence also identifies negative trends and provides actionable insights to improve quality.

### CI Overview

The CI Overview provides a bird's-eye view of all your Builds — successful, failed, aborted, and expired — and the percentage of successful builds for individual codebases. You can easily see where your builds have failed and drill down into specific builds to troubleshoot and analyze the root causes.

### Advanced Settings

Pipelines, Stages, and Steps have advanced settings to control the flow of operations.

#### Inputs and Overlays

Harness Input Sets are collections of Runtime Inputs for a Pipeline run. Overlays are groups of Input Sets. Overlays enable you to provide several Input Sets when you run a Pipeline. With Input Sets and Overlays, you can make one Pipeline template and use it for multiple scenarios. Each scenario can be defined in an Input Set or Overlay and simply selected at runtime.

#### Conditional Executions

You can set conditions on when you run Stages and Steps. For example, `Execute This Stage Only if Prior Pipeline or Stage Failed`.

The stage Conditional Execution applies to all steps that don't have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.

#### Failure Strategies

A failure strategy defines how your Stages and Steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

