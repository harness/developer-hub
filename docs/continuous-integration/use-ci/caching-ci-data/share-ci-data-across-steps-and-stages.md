---
title: Share CI data across steps and stages
description: This topic describes how you can share CI data across steps and stages.
sidebar_position: 10
helpdocs_topic_id: fbrgw2ixjr
helpdocs_category_id: 01tyeraya4
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you can share CI data across steps and stages.

## Share data between steps in a stage

When a pipeline runs, it creates a temporary volume called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is a volume that persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The workspace is destroyed when the stage ends.

The workspace is the current working directory for each step in the stage, and the default shared working directory for any stage is `/harness`. Any step in the stage can create, retrieve, update, and delete files in this folder. If you need to share additional volumes between steps in the stage, you can add **Shared Paths** in the [Build stage settings](../build-stage-settings/ci-stage-settings.md). Paths must begin with a forward slash, such as `/vol`. <!-- resolves as `/vol/harness`? -->

For example, the maven `m2` repo is stored in `/root/.m2` by default, which is outside the `/harness` directory. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

![](./static/share-ci-data-across-steps-and-stages-01.png)

## Share data across stages

You must use one of the following caching methods to share data across stages:

* [Harness Cache Intelligence](./cache-intelligence.md)
* [Save and Restore Caches from S3 buckets](saving-cache.md)
* [Save and Restore Caches from GCS buckets](save-cache-in-gcs.md)

You cannot share access credentials or other [Text Secrets](/docs/platform/6_Security/2-add-use-text-secrets.md) across stages. For complete end-to-end examples, go to the following:

If you need to maintain a long-running service for the duration of a stage, use a [Background step](../../ci-technical-reference/background-step-settings.md).

## Docker layer caching

Remote Docker layer caching can dramatically improve build times by sharing layers across pipelines, stages, and steps. You can set up Docker layer caching in the following steps:

* [Build and Push to Docker Registry](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to ECR](../../ci-technical-reference/build-and-push-to-ecr-step-settings.md)
* [Build and Push to GCR](../../ci-technical-reference/build-and-push-to-gcr-step-settings.md)

For more recommendations for optimizing Docker images, go to [Optimize and enhance CI pipelines](../optimize-and-more/optimizing-ci-build-times.md).
