---
title: What is Harness CI
description: Harness CI simplifies the code development and testing process.
sidebar_position: 20
helpdocs_topic_id: rch2t8j1ay
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness is a leading provider of the Continuous Delivery-as-a-Service platform. Harness CI extends this functionality with Continuous Integration-as-a-Service. Harness CI simplifies the code development and testing process. In Harness CI pipelines, you model your build and test processes as CI stages. Each stage includes steps for building, testing, and pushing your code. Pipelines can be triggered manually or automatically by triggers, such as Git commits and pull requests.

CI executes pipeline steps in containers, isolating code and dependencies from other steps. When you create a pipeline, you specify a container to use, and then Harness locates and launches the container in which the step runs. You don't need to manage a dependency chain when steps and plugins run in their own containers.

<details>
<summary>Video introduction</summary>

The following video introduces Harness CI and walks through a basic Harness CI pipeline.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://harness-1.wistia.com/medias/fsc2b05uxz" />

<!-- div class="hd--embed" data-provider="Wistia" data-thumbnail="">
   <iframe src="//fast.wistia.net/embed/iframe/fsc2b05uxz" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="620" height="349"></iframe><script src="//fast.wistia.net/assets/external/E-v1.js" async=""></script>
</div -->

</details>

## Architecture

<figure>

![](./static/ci-concepts-10.png)

<figcaption>Harness CI architecture diagram.</figcaption>
</figure>

The [Harness Delegate](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md) is central to all CI processes and is in charge of all CI operations. It runs in your environment, such as your local network, virtual private cloud, or cluster. It connects the Harness Manager in your SaaS instance to all of your code repositories, artifacts, infrastructure, and cloud providers.

The [build infrastructure](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) communicates directly with your repos, repositories, and cloud providers. You can maintain your code and artifacts internally or on public platforms, such as GitHub or Docker Hub.

The Delegate manages your build infrastructure to run build jobs and tests as needed, and sends data back to the Harness Manager. You can use this data for DAG orchestration, debugging, health checks, analytics, notifications, and the generation of ML models.

When a CI pipeline build finishes successfully, the build infrastructure then sends the artifacts to the registry of your choice.

The following video demonstrates how to set up a CI pipeline and run a build.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" />

<!--div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/kZmOCLCpvmk/hqdefault.jpg"><iframe width=" 480" height="270" src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

If you want to try it for yourself, these tutorials walk through the pipeline creation process:

* [Get started for free with the fastest CI on the planet](/tutorials/ci-pipelines/fastest-ci)
* [Build and test on a Kubernetes cluster build infrastructure](/tutorials/ci-pipelines/kubernetes-build-farm)

For information about CI pipeline components, go to [CI pipeline basics](./ci-pipeline-basics.md).

## Features

Here are some key features of Harness CI. For information about general Harness Platform concepts, go to [Harness key concepts](../../getting-started/learn-harness-key-concepts.md).

### Harness Cloud

You can run builds on your own build infrastructure or on Harness-hosted build infrastructure. For a comparison of build infrastructure options, go to [Which build infrastructure is right for me](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

With Harness Cloud, you can run builds in isolation on Harness-hosted virtual machines (VMs). You can run builds at scale on Linux, Windows, and macOS machines that are preconfigured with tools, packages, and settings commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on building software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

* Free monthly credits for up to 2,000 build minutes.
* Starter pipelines for different programming languages.
* Blazing fast builds on Linux, macOS, and Windows.
* Get the latest features first. Features may be enabled for Harness Cloud build infrastructure before rolling out to other build infrastructure options.

:::info What happens when pipelines run on Harness Cloud?

During a pipeline build that uses Harness Cloud build infrastructure, Harness runs each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

The steps in each stage execute on the stage's dedicated VM. This allows the stage's steps to share information through the underlying filesystem. You can run CI steps directly on the VM or in a Docker container. When the stage is complete, the VM automatically shuts down.



:::

For more information about using Harness Cloud for your CI pipelines, including supported platforms, image specifications, and YAML examples, go to [Use Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).

### Test Intelligence

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests, and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build.

Harness Test Intelligence (TI) helps your test cycle move faster without compromising quality. TI can dramatically improve test times by running only the unit tests required to confirm the quality of the code changes that triggered the pipeline. Instead of always running all unit tests, TI selects a subset of unit tests and skips the rest. Harness TI can also automatically split tests to run them in parallel.

Test Intelligence gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. Using TI doesn't require you to change build and test processes.

To learn more about the Test Intelligence architecture, how it works, and how to enable it, go to [Enable Test Intelligence](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md).

While Test Intelligence is only for unit tests, you can [run a variety of tests in your CI pipelines](../use-ci/set-up-test-intelligence/run-tests-in-ci.md).

#### Time and cost savings with Test Intelligence

We ran Test Intelligence on our biggest repository, Harness-Core. Here's what we achieved:

* PRs checked: 3000
* Average UT time without TI: 75 minutes
* Average UT time with TI: 25 minutes

Here's how Harness Test Intelligence performed with some popular open-source repositories:

| **Project name** | **Average test run time without TI** | **Average test run time with TI** |
| -- | -- | -- |
| Harness-Core | 75 mins | 25 mins |
| Incubator Pinot | 338 mins | 228 mins |
| Hudi | 58 mins | 43 mins |
| RocketMQ | 4.6 mins | 3.1 mins |
| Spring Cloud Alibaba | 0.744 mins | 0.59 mins |
| Incubator Shenyu | 1.16 min | 0.4 min |
| Sentinel | 1.90 min | 1 min |

### Platform integration

Harness CI is seamlessly integrated with other Harness modules, such as [Continuous Delivery](/docs/continuous-delivery), [Cloud Cost Management](/docs/cloud-cost-management), [Feature Flags](/docs/feature-flags), and [Security Testing Orchestration](/docs/security-testing-orchestration). The Harness Platform offers unified CI/CD pipelines with visual controls and approval gates. You no longer have to navigate between applications to follow the phases of your pipelines.

<!-- ![](./static/ci-concepts-501.png) -->

<docimage path={require('./static/ci-concepts-501.png')} />

### Containerized steps

CI pipeline steps run as containers, making it language-agnostic. Containers are lightweight abstractions of the host operating system that can package code and dependencies independently of the steps. You can specify a container in the pipeline itself, and the agent will fetch and start the container where the job runs. Because all of the steps run in containers, and plugins have their own containers, you don't need to worry about dependencies.

<!-- ![](./static/ci-concepts-503.png) -->

<docimage path={require('./static/ci-concepts-503.png')} />

### Visual and YAML pipeline editors

Scripting pipelines can be time-consuming and tedious. It may be difficult to envision the sequence of events in more complex pipelines. Harness CI's Pipeline Studio provides both a YAML editor and a graphical, visual editor. In the visual editor, you can easily add, remove, edit, and rearrange steps and stages. You can also use the YAML editor, which functions similarly to any other IDE, to configure your pipelines-as-code. You can also switch between the two for a combined approach.

<!-- ![](./static/ci-concepts-505.png) -->

<docimage path={require('./static/ci-concepts-505.png')} />

### Harness Git Experience

The [Harness Git Experience](/docs/category/git-experience) provides seamless integration between your Harness projects, pipelines, and resources and your Git repos. You can work entirely from Git or use a hybrid method of Git and the Harness Manager. Harness CI integrates with all the popular source control management tools, including GitHub, GitLab, and Bitbucket. To get started, you need to activate the repository and include a `.harness` folder for the configuration files. This triggers a build within Harness CI once a commit is detected.

<!-- ![](./static/ci-concepts-506.png) -->

<docimage path={require('./static/ci-concepts-506.png')} />

## Try Harness CI

Interested in trying CI for yourself? No need to wait any longer! [Request a demo](https://harness.io/demo) and [get started for free with the fastest CI on the planet](/tutorials/ci-pipelines/fastest-ci).
