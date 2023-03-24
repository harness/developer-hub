---
title: Harness CI concepts
description: Harness CI simplifies the code development and testing process.

sidebar_position: 30
helpdocs_topic_id: rch2t8j1ay
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness is a leading provider of the Continuous Delivery-as-a-Service platform. Harness CI extends this functionality with Continuous Integration-as-a-Service. Harness CI simplifies the code development and testing process. In Harness CI pipelines, you model your build and test processes as CI stages. Each stage includes steps for building, testing, and pushing your code. Pipelines can be triggered manually or automatically by triggers, such as Git commits.

CI executes steps as containers, packaging code, and dependencies in isolation from other steps. You simply specify a container to use, and Harness locates and launches the container in which the job will run. There is no longer a dependency chain to manage when steps and plugins run in their own containers.

This topic describes CI concepts and provides a summary of the benefits of CI.

For information about general Harness Platform concepts, go to [Harness Key Concepts](../../getting-started/learn-harness-key-concepts.md). For information about how Drone and Harness CI work together, go to [Drone and Harness](drone-and-harness.md).

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

The [Harness Delegate](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md) is central to all CI processes and is in charge of all CI operations. It runs in your environment, such as your local network, virtual private cloud, or cluster. It connects the Harness Manager in your SaaS instance to all of your code repositories, artifacts, infrastructure, and cloud providers.

The [build infrastructure](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) communicates directly with your repos, repositories, and cloud providers. You can maintain your code and artifacts internally or on public platforms, such as GitHub or DockerHub.

The Delegate manages your build infrastructure to run build jobs and tests as needed, and sends data back to the Harness Manager. You can use this data for DAG orchestration, debugging, health checks, analytics, notifications, and the generation of ML models.

When a CI pipeline build finishes successfully, the build infrastructure then sends the artifacts to the registry of your choice.

Here's a an end-to-end demo that shows how to set up a CI pipeline and run a build. You can go through a similar workflow yourself in the [CI tutorial](ci-pipeline-quickstart.md) or [Get started for free with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" />

<!--div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/kZmOCLCpvmk/hqdefault.jpg"><iframe width=" 480" height="270" src="https://www.youtube.com/embed/r1GLYtOmJmM?feature=oembed" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

## Harness CI features

Here are some key features of Harness CI.

### Test Intelligence

Test Intelligence (TI) reduces unit test time significantly by running only the unit tests required to confirm the quality of the code changes that triggered the build. TI selects tests that are needed to confirm the quality of the code changes that triggered the build and ranks them in the best possible order to increase the rate of fault detection. For more information, go to [Test Intelligence overview](test-intelligence-concepts.md).

<!-- ![](./static/ci-concepts-600.png) -->

<docimage path={require('./static/ci-concepts-600.png')} />

While Test Intelligence is specific to unit testing, you can run a variety of tests in your CI pipelines.

### Integrated Platform

Harness is seamlessly integrated with other Harness modules such as [Continuous Delivery](../../continuous-delivery/cd-deployments-category/deployment-concepts.md), [Cloud Cost Management](/docs/category/set-up-cloud-cost-management), and [Feature Flags](../../feature-flags/ff-onboarding/cf-feature-flag-overview.md). You no longer have to navigate from application to application to follow the steps of the pipeline. Harness platform offers unified CI/CD pipelines with visual controls and approval gates.

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

Harness Git Experience provides seamless integration between your Harness projects, pipelines, and resources and your Git repos. You can work entirely from Git or use a hybrid method of Git and the Harness Manager. Harness CI integrates with all the popular source control management tools, including GitHub, GitLab, and Bitbucket. To get started, you need to activate the repository and include a `.harness` folder for the configuration files. This triggers a build within Harness CI once a commit is detected. For more information, go to [Git Experience](../../platform/10_Git-Experience/harness-git-experience-overview.md).

<!-- ![](./static/ci-concepts-506.png) -->

<docimage path={require('./static/ci-concepts-506.png')} />

## Harness CI components

For information about CI pipeline components, go to [CI pipeline basics](./ci-pipeline-basics.md).

## Try Harness CI

Interested in trying CI for yourself? No need to wait any longer! Book your [Demo](https://harness.io/demo) and [Get started for free with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).
