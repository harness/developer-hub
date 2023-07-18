---
title: CI concepts
description: Harness CI simplifies the code development and testing process.

sidebar_position: 20
helpdocs_topic_id: rch2t8j1ay
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness is a leading provider of the Continuous Delivery-as-a-Service platform. Harness CI extends this functionality with Continuous Integration-as-a-Service. Harness CI simplifies the code development and testing process. In Harness CI pipelines, you model your build and test processes as CI stages. Each stage includes steps for building, testing, and pushing your code. Pipelines can be triggered manually or automatically by triggers, such as Git commits and pull requests.

CI executes pipeline steps in containers, isolating code and dependencies from other steps. When you create a pipeline, you specify a container to use, and then Harness locates and launches the container in which the step runs. You don't need to manage a dependency chain when steps and plugins run in their own containers.

This topic describes CI concepts and provides a summary of the benefits of CI.

For information about general Harness Platform concepts, go to [Harness key concepts](../../getting-started/learn-harness-key-concepts.md).

## Visual summary

The following video walks you through Harness CI.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://harness-1.wistia.com/medias/fsc2b05uxz" />

<!-- div class="hd--embed" data-provider="Wistia" data-thumbnail="">
   <iframe src="//fast.wistia.net/embed/iframe/fsc2b05uxz" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="620" height="349"></iframe><script src="//fast.wistia.net/assets/external/E-v1.js" async=""></script>
</div -->

## Architecture

The architecture diagram of the Harness CI setup is as follows:

<!-- ![](./static/ci-concepts-10.png) -->

<docimage path={require('./static/ci-concepts-10.png')} />

The [Harness Delegate](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md) is central to all CI processes and is in charge of all CI operations. It runs in your environment, such as your local network, virtual private cloud, or cluster. It connects the Harness Manager in your SaaS instance to all of your code repositories, artifacts, infrastructure, and cloud providers.

The [build infrastructure](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) communicates directly with your repos, repositories, and cloud providers. You can maintain your code and artifacts internally or on public platforms, such as GitHub or Docker Hub.

The Delegate manages your build infrastructure to run build jobs and tests as needed, and sends data back to the Harness Manager. You can use this data for DAG orchestration, debugging, health checks, analytics, notifications, and the generation of ML models.

When a CI pipeline build finishes successfully, the build infrastructure then sends the artifacts to the registry of your choice.

Here's a an end-to-end demo that shows how to set up a CI pipeline and run a build. You can go through a similar workflow yourself in the following tutorials:

* [Build and test on a Kubernetes cluster build infrastructure](/tutorials/ci-pipelines/kubernetes-build-farm)
* [Get started for free with the fastest CI on the planet](/tutorials/ci-pipelines/fastest-ci)

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" />

<!--div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/kZmOCLCpvmk/hqdefault.jpg"><iframe width=" 480" height="270" src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

## Harness CI features

Here are some key features of Harness CI.

### Harness Cloud

You can run builds on Harness-hosted build infrastructure. For more information, go to [Get started with Harness Cloud](./hosted-builds-on-virtual-machines-quickstart.md).

### Test Intelligence

[Test Intelligence (TI)](test-intelligence-concepts.md) reduces test time significantly by running only the tests required to confirm the quality of the code changes that triggered the build. TI selects tests that are needed to confirm the quality of the code changes that triggered the build and ranks them in the best possible order to increase the rate of fault detection.

While Test Intelligence is specific to unit testing, you can run a variety of tests in your CI pipelines.

### Integrated Platform

Harness CI is seamlessly integrated with other Harness modules such as [Continuous Delivery](/docs/continuous-delivery), [Cloud Cost Management](/docs/cloud-cost-management), [Feature Flags](/docs/feature-flags), and [Security Testing Orchestration](/docs/security-testing-orchestration). The Harness Platform offers unified CI/CD pipelines with visual controls and approval gates. You no longer have to navigate between applications to follow the steps of the pipeline.

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

## Harness CI components

For information about CI pipeline components, go to [CI pipeline basics](./ci-pipeline-basics.md).

## FAQs

For frequently asked questions about Harness CI, other Harness modules, and the Harness Platform, go to [FAQs](/docs/category/faqs).

## Try Harness CI

Interested in trying CI for yourself? No need to wait any longer! [Request a demo](https://harness.io/demo) and [get started for free with the fastest CI on the planet](/tutorials/ci-pipelines/fastest-ci).
