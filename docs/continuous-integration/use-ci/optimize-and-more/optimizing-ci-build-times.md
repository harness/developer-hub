---
title: Optimize and enhance CI pipelines
description: You can optimize your CI pipelines to make them faster, more efficient, and more versatile.
sidebar_position: 10
helpdocs_topic_id: g3m7pjq79y
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

You can optimize your CI pipelines to make them faster, more efficient, and more versatile.

## Background services, caches, and shared volumes

For information about service dependencies, caches, and shared volumes, go to:

* [Share CI data across steps and stages](../caching-ci-data/share-ci-data-across-steps-and-stages.md)
* [Cache Intelligence](../caching-ci-data/cache-intelligence.md)
* [Dependency management strategies](../manage-dependencies/dependency-mgmt-strategies.md)

## Optimize test times

For information about optimizing test times, go to [Run tests in CI pipelines](../set-up-test-intelligence/run-tests-in-ci.md).

## Optimize Docker images

The following practices can reduce your build times.

<details>
<summary>Pre-build images that include all required dependencies</summary>

If most of the build time is spent downloading dependencies, you should pre-build an image with all required dependencies in a separate pipeline. Then, set up a periodic pipeline that builds the image with all the latest dependencies and pushes it to your Docker registry. Use this image in all of your build pipelines.

Pre-building images with all required dependencies is more efficient than downloading them to a baseline image as part of the Build setup. This is especially true if you update your images often to ensure that they include all the latest updates.

</details>

<details>
<summary>Exclude unnecessary files and packages from your images</summary>

In addition to reducing build times, excluding unnecessary files and packages makes the resulting images smaller, simpler, and more portable. You can use [dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file) files to exclude unnecessary files and folders from your images.

</details>

<details>
<summary>Optimize Dockerfiles and enable Docker layer caching</summary>

* Sort multi-line arguments in your Dockerfile alphabetically. This makes it easier to update and avoid duplicate packages.
* Review [Docker's best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).
* [Enable Docker layer caching.](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#docker-layer-caching)

</details>

## Group, loop, and reuse

These strategies help you streamline complex pipelines and reuse pipelines and pipeline components.

### Step groups

You can use [step groups](./group-ci-steps-using-step-groups.md) to organize complex or busy stages and improve build times.

### Looping strategies

[Looping strategies](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) enable you to run a stage or step multiple times with different inputs. This eliminates the need to copy the same stage or step for each variation you need. It also makes the pipeline more organized, clean, and easy to maintain. Looping strategies enable use cases such as:

* You want to test a UI feature in multiple browsers and platforms. You can define a matrix that specifies the browsers and platforms to test.
* You want to build artifacts for multiple JDK versions in the same Build Stage.
* You have a Build Pipeline with 20 unit tests. To speed up execution, you want to run the tests in parallel across 4 jobs that run 5 tests each.

### Variables

Expressions and runtime inputs make your pipelines more dynamic.

* [Variables and expressions](/docs/category/variables-and-expressions/)
* [Stage variables](/docs/platform/Pipelines/add-a-stage#stage-variables)
* [Fixed values, runtime inputs, and expressions](/docs/platform/references/runtime-inputs/)
* [Built-in and custom Harness variables reference](/docs/platform/variables-and-expressions/harness-variables/)
* [Built-in CI codebase variables reference](../codebase-configuration/built-in-cie-codebase-variables-reference.md)
* [Secrets management](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview)
* [Input sets and overlays](/docs/platform/pipelines/input-sets/)

### Templates

Use [templates](/docs/category/templates/) to share and utilize pre-build pipelines, stages, and steps.

## Integrate and automate

Use these strategies to automate and manage build sequences.

* [Queue Intelligence](./queue-intelligence.md)
* [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining/)
* [Run specific stages in a pipeline](/docs/platform/pipelines/run-specific-stage-in-pipeline/)
* [Define failure strategies](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps/)
* [Automated triggers](/docs/category/triggers/)

There are many ways you can incorporate third party tools and services in your CI pipelines, such as GitHub Actions, Slack notifications, and Jira issue updates.

* [Explore plugins](../use-drone-plugins/explore-ci-plugins.md)
* [Bring-your-own Secrets Manager](/docs/platform/Secrets/Secrets-Management/add-secrets-manager)
* [Use a GitHub App in a GitHub connector](/docs/platform/Connectors/Code-Repositories/git-hub-app-support)
* [Send notifications](/docs/category/notifications)

## Increase step resources

Check your infrastructure monitoring tools for potential bottlenecks during the time windows when your builds are running. Increasing memory or CPU capacity in your Build steps might help speed up your builds.

You can also [enforce pipeline concurrency limits](/docs/platform/settings/pipeline-settings/).
