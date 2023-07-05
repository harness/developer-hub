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

When a pipeline runs, it creates a temporary volume called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is a volume that persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The workspace is destroyed when the stage ends.

The workspace is the current working directory for each step in the stage, and the default shared working directory for any stage is `/harness`. Any step in the stage can create, retrieve, update, and delete files in this folder. If you need to share additional volumes between steps in the stage, you can add **Shared Paths** in the [Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md). Paths must begin with a forward slash, such as `/vol`. <!-- resolves as `/vol/harness`? -->

For example, the maven `m2` repo is stored in `/root/.m2` by default, which is outside the `/harness` directory. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

![](./static/share-ci-data-across-steps-and-stages-01.png)

## Share data across stages

You can use the following caching methods to share data across stages:

* [Harness Cache Intelligence](./cache-intelligence.md)
* [Save and Restore Caches from S3 buckets](saving-cache.md)
* [Save and Restore Caches from GCS buckets](save-cache-in-gcs.md)

You cannot share access credentials or other [Text Secrets](/docs/platform/Secrets/add-use-text-secrets) across stages.

If you need to maintain a long-running service for the duration of a stage, use a [Background step](../manage-dependencies/background-step-settings.md).

## Use caching to reduce build time

Use the following caching methods to reduce build time:

* [Harness Cache Intelligence](./cache-intelligence.md)
* [Save and Restore Caches from S3 buckets](saving-cache.md)
* [Save and Restore Caches from GCS buckets](save-cache-in-gcs.md)

You cannot share access credentials or other [Text Secrets](/docs/platform/Secrets/add-use-text-secrets) with caching.

:::tip Multilayer caching

For multilayer caching, use multiple **Restore Cache** and **Save Cache** steps according to the pattern described in [Multilayer caching](./multilayer-caching.md).

:::

## Docker layer caching

Remote Docker layer caching can dramatically improve build times by sharing layers across pipelines, stages, and steps. You can set up Docker layer caching in the following steps:

* [Build and Push to Docker Registry](../build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to ECR](../build-and-upload-artifacts/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GCR](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr.md)

For more recommendations for optimizing Docker images, go to [Optimize and enhance CI pipelines](../optimize-and-more/optimizing-ci-build-times.md).
