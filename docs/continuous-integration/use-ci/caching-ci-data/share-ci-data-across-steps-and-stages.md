---
title: Share CI data across steps and stages
description: This topic describes how you can share CI data across steps and stages.
sidebar_position: 10
helpdocs_topic_id: fbrgw2ixjr
helpdocs_category_id: 01tyeraya4
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you can cache and share data across steps, stages, and builds.

## Share data between steps in a stage

When a pipeline runs, it creates a temporary volume for each stage called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is a volume that persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The workspace is destroyed when the stage ends.

The workspace is the current working directory for each step in the stage, and the default shared working directory for any stage is `/harness`. Any step in the stage can create, retrieve, update, and delete files in this folder. If you need to share additional volumes between steps in the stage, you can add **Shared Paths** in the [Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md). Paths must begin with a forward slash, such as `/vol`. <!-- resolves as `/vol/harness`? -->

For example, the maven `m2` repo is stored in `/root/.m2` by default, which is outside the `/harness` directory. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

![](./static/share-ci-data-across-steps-and-stages-01.png)

## Share data across stages

How you share data across stages depends on the type of data you need to share. You can:

* [Use caching.](#use-caching-to-reduce-build-time)
* [Upload artifacts](../build-and-upload-artifacts/build-and-upload-an-artifact.md#upload-artifacts) in one stage and pull them into another stage with, for example, a [Run step](../run-step-settings.md).
* [Build and push an image](../build-and-upload-artifacts/build-and-upload-an-artifact.md#build-and-push) in one stage and pull that image in another stage. For example, you could build and push a Docker image, then pull and run it in a [Background step](../manage-dependencies/background-step-settings.md) and then use a [Run step](../run-step-settings.md) to run integration tests on the image.

## Use caching to reduce build time

Use the following caching methods to reduce build time:

* [Docker layer caching](./docker-layer-caching.md)
* [Harness Cache Intelligence](./cache-intelligence.md)
* [Save and Restore Caches from S3 buckets](./saving-cache.md)
* [Save and Restore Caches from GCS buckets](./save-cache-in-gcs.md)
* [Save and Restore Caches from Azure storage](./save-cache-azure.md)

You cannot share access credentials or other [Text Secrets](/docs/platform/secrets/add-use-text-secrets) with caching.

:::tip Multilayer caching

For multilayer caching, use multiple **Restore Cache** and **Save Cache** steps according to the pattern described in [Multilayer caching](./multilayer-caching.md).

:::

## Run dependent services

If you need to maintain a long-running service for the duration of a stage, use a [Background step](../manage-dependencies/background-step-settings.md).

## Troubleshoot caching and data sharing

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to caching, data sharing, dependency management, workspaces, shared paths, and more. For example:

* [Why are changes made to a container image filesystem in a CI step is not available in the subsequent step that uses the same container image?](/kb/continuous-integration/continuous-integration-faqs/#why-are-changes-made-to-a-container-image-filesystem-in-a-ci-step-is-not-available-in-the-subsequent-step-that-uses-the-same-container-image)
* [How can I use an artifact in a different stage from where it was created?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-use-an-artifact-in-a-different-stage-from-where-it-was-created)
* [How can I check if the cache was restored?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-check-if-the-cache-was-restored)
* [How do I enable Cache Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-enable-cache-intelligence)
* [What is the Cache Intelligence cache storage limit?](/kb/continuous-integration/continuous-integration-faqs/#what-is-the-cache-intelligence-cache-storage-limit)
