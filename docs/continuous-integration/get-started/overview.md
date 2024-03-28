---
title: Harness Continuous Integration (CI) overview
sidebar_label: Overview
description: Harness CI simplifies the code development and testing process.
sidebar_position: 1
helpdocs_topic_id: rch2t8j1ay
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/ci-quickstarts/ci-concepts
  - /tutorials/ci-pipelines/ci-overview
---

Harness is a leading provider of the Continuous Delivery-as-a-Service platform. Harness CI extends this functionality with Continuous Integration-as-a-Service. Harness CI simplifies the code development and testing process.

In Harness CI pipelines, you model your build and test processes as CI stages. Each stage includes steps for building, testing, and pushing your code. Pipelines can be triggered manually or automatically by triggers, such as Git commits and pull requests.

CI executes pipeline steps in containers, isolating code and dependencies from other steps. When you create a pipeline, you can specify a container to use, and then Harness locates and launches the container in which the step runs. You don't need to manage a dependency chain when steps and plugins run in their own containers.

<details>
<summary>Video: Introduction to Harness CI</summary>

The following video introduces Harness CI and walks through a basic Harness CI pipeline.

<DocVideo src="https://youtu.be/yQRwVjPTQ5E" />

</details>

## CI architecture

<figure>

![](./static/ci-concepts-10.png)

<figcaption>Harness CI architecture diagram.</figcaption>
</figure>

The [Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) is central to CI processes and is in charge of CI operations. It runs in your environment, such as your local network, virtual private cloud, or cluster. It connects the Harness Manager in your SaaS instance to all of your code repositories, artifacts, infrastructure, and cloud providers.

The [build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me) communicates directly with your repos, repositories, and cloud providers. You can maintain your code and artifacts internally or on public platforms, such as GitHub or Docker Hub.

The delegate manages your build infrastructure to run build jobs and tests as needed, and sends data back to the Harness Manager. You can use this data for DAG orchestration, debugging, health checks, analytics, notifications, and the generation of ML models.

When a CI pipeline build finishes successfully, the build infrastructure then sends the artifacts to the registry of your choice.

<details>
<summary>Video: Create and run a CI pipeline</summary>

The following video demonstrates how to set up a CI pipeline and run a build.

<DocVideo src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" />

</details>

If you want to try creating a pipeline for yourself, these tutorials walk through the pipeline creation process:

- [Tutorial: Build on Harness Cloud](./tutorials.md)
- [Tutorial: Build on a Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra)

For information about CI pipeline components, go to the [CI key concepts](/docs/continuous-integration/get-started/key-concepts).

## Harness Cloud

You can run builds on your own build infrastructure or on Harness-managed build infrastructure. For a comparison of build infrastructure options, go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

With Harness Cloud, you can run builds in isolation on Harness-managed virtual machines (VMs). You can run builds at scale on Linux, Windows, and macOS machines that are preconfigured with tools, packages, and settings commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

- Free monthly credits for up to 2,000 build minutes.
- Starter pipelines for different programming languages.
- Blazing fast builds on Linux, macOS, and Windows.
- Get the latest features first. Features may be enabled for Harness Cloud build infrastructure before rolling out to other build infrastructure options.

:::info What happens when pipelines run on Harness Cloud?

During a pipeline build that uses Harness Cloud build infrastructure, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.

:::

For more information about using Harness Cloud for your CI pipelines, including supported platforms, image specifications, and YAML examples, go to [Use Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md). For information about build credit consumption and billing, go to [Subscriptions and licenses](./ci-subscription-mgmt.md#harness-cloud-billing-and-build-credits).

## Harness CI Intelligence

Harness CI Intelligence features are designed to smartly speed up builds and boost efficiency.

### Cache Intelligence

Modern continuous integration systems execute pipelines inside ephemeral environments that are provisioned solely for pipeline execution and are not reused from prior pipeline runs. As builds often require downloading and installing many library and software dependencies, caching these dependencies for quick retrieval at runtime can save a significant amount of time.

There are several ways to configure caching in Harness CI, such as Cache Intelligence, Save and Restore Cache steps, and mounting volumes. Save and Restore Cache steps and mounted volumes require you to manage the cache.

With [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence), Harness automatically caches and restores common dependencies. Cache Intelligence doesn't require you to bring your own storage, because the cache is stored in the Harness-managed environment, Harness Cloud.

### Test Intelligence

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests, and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build.

Harness Test Intelligence (TI) helps your test cycle move faster without compromising quality. TI can dramatically improve test times by running only the unit tests required to confirm the quality of the code changes that triggered the build. Instead of always running all unit tests, TI selects a subset of unit tests and skips the rest. Harness TI can also automatically split tests to run them in parallel.

Test Intelligence gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. Using TI doesn't require you to change build and test processes.

To learn more about the Test Intelligence architecture, how it works, and how to enable it, go to [Test Intelligence overview](/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence).

While Test Intelligence is only for unit tests, you can [run a variety of tests in your CI pipelines](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci).

#### Time and cost savings with Test Intelligence

We ran Test Intelligence on our biggest repository, Harness-Core. Here's what we achieved:

- PRs checked: 3000
- Average UT time without TI: 75 minutes
- Average UT time with TI: 25 minutes

Here's how Harness Test Intelligence performed with some popular open-source repositories:

| **Project name**     | **Average test run time without TI** | **Average test run time with TI** |
| -------------------- | ------------------------------------ | --------------------------------- |
| Harness-Core         | 75 mins                              | 25 mins                           |
| Incubator Pinot      | 338 mins                             | 228 mins                          |
| Hudi                 | 58 mins                              | 43 mins                           |
| RocketMQ             | 4.6 mins                             | 3.1 mins                          |
| Spring Cloud Alibaba | 0.744 mins                           | 0.59 mins                         |
| Incubator Shenyu     | 1.16 min                             | 0.4 min                           |
| Sentinel             | 1.90 min                             | 1 min                             |


### Harness-managed Docker layer caching

With [Docker layer caching with Harness Cloud](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching), Harness can manage the Docker layer cache backend for you without relying on your Docker registry. This ensures that layers are always pulled from the fastest available source.

## Other CI features

Here are some other key features of Harness CI.

For information about upcoming and recently released features, go to the [CI product roadmap](https://developer.harness.io/roadmap/#ci), [CI release notes](/release-notes/continuous-integration), and [CI early access features](/docs/continuous-integration/ci-supported-platforms/#harness-ci-early-access-features).

For information about general Harness Platform concepts and features, go to [Harness key concepts](/docs/platform/get-started/key-concepts).

### Platform integration

Harness CI is seamlessly integrated with other Harness modules, such as [Continuous Delivery](/docs/continuous-delivery), [Cloud Cost Management](/docs/cloud-cost-management), [Feature Flags](/docs/feature-flags), and [Security Testing Orchestration](/docs/security-testing-orchestration). The Harness Platform offers unified CI/CD pipelines with visual controls and approval gates. You no longer have to navigate between applications to follow the phases of your pipelines.

### Containerized steps

CI pipeline steps run as containers, making it language-agnostic. Containers are lightweight abstractions of the host operating system that can package code and dependencies independently of the steps. You can specify a container in the pipeline itself, and the agent will fetch and start the container where the job runs. Because all of the steps run in containers, and plugins have their own containers, you don't need to worry about dependencies.

### Visual and YAML pipeline editors

Scripting pipelines can be time-consuming and tedious. It may be difficult to envision the sequence of events in more complex pipelines. Harness CI's Pipeline Studio provides both a YAML editor and a graphical, visual editor. In the visual editor, you can easily add, remove, edit, and rearrange steps and stages. You can also use the YAML editor, which functions similarly to any other IDE, to configure your pipelines-as-code. You can also switch between the two for a combined approach.

For more information about YAML in Harness, go to [Write pipelines in YAML](/docs/platform/pipelines/harness-yaml-quickstart.md).

### Harness Git Experience

The [Harness Git Experience](/docs/category/git-experience) provides seamless integration between your Harness projects, pipelines, and resources and your Git repos. You can work entirely from Git or use a hybrid method of Git and the Harness Manager. Harness CI integrates with all the popular source control management tools, including GitHub, GitLab, and Bitbucket. To get started, you need to activate the repository and include a `.harness` folder for the configuration files. This triggers a build within Harness CI once a commit is detected.

## Try Harness CI

Interested in trying CI for yourself? No need to wait any longer! [Request a demo](https://harness.io/demo) and [get started for free with the fastest CI on the planet](./tutorials.md).
