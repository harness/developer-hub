---
title: Continuous Integration (CI) FAQs
description: Here are some frequently asked questions about Harness CI.
# sidebar_position: 2
helpdocs_topic_id: qn0f5ut6ok
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness Continuous Integration (CI).

## How can a step call a service started by a Background step?

For information about calling services started by Background steps, go to **Important notes** and **Port Bindings** in [Background step settings](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings.md).

## What is the timeout limit for a CI pipeline?

By default, a stage can run for a maximum of 24 hours on a Kubernetes cluster build infrastructure and a maximum of 30 minutes on Harness Cloud build infrastructure.

For pipelines, the default timeout limit is, generally, the product of the stage limit multiplied by the number of stages. For example, a pipeline with three stages that use a Kubernetes cluster build infrastructure could run for a maximum of 72 hours. However, you can also set an overall pipeline timeout limit in each pipeline's **Advanced Options**.

For steps, you can set a custom timeout limit in each step's **Optional Configuration** settings. In stages that use a Kubernetes cluster build infrastructure, the default timeout for steps is 10 hours. However, this is constrained by the stage timeout limit of 24 hours. For example, if a stage has three steps, the total run time for the three steps can't exceed 24 hours or the stage fails due to the stage timeout limit.

## What are the default values for memory and CPU for CI steps?

The default for memory is `500Mi`. The default for CPU is `400m`.

## How do you replicate a list of Drone plugin settings in CI?

For information about using Drone plugins in Harness CI, go to [Run a Drone Plugin in CI](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

## What permissions are required for GitHub personal access tokens in NextGen and GitX?

When configuring permissions for a GitHub personal access token (PAT) that you'll use in Harness NextGen, under **Scopes**, select all **repo** and **user** options.

![](./static/continuous-integration-ci-faqs-20.png)

:::caution

When you enable API authentication in a GitHub connector (recommended), use the same personal access token for both [Authentication](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference#personal-access-token) and [API authentication](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference#enable-api-access).

:::

For more information, go to the [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference).

## What permissions are required to run CI builds in an OpenShift cluster?

You need the following permissions on Secret, Pod, and Event to run Harness CI builds in an OpenShift cluster:

* `create`
* `get`
* `list`
* `watch`
* `update`
* `delete`

## What are the minimum permissions required for the service account role for a Kubernetes Cluster connector?

You need the following permissions for a service account role for a Kubernetes Cluster connector.

* Pods and secrets:
  * `create`
  * `get`
  * `list`
  * `watch`
  * `update`
  * `delete`
* Events:
  * `list`
  * `watch`

## How can you share the codebase configuration between stages in a CI pipeline?

Each CI stage runs in it's own container. Steps in a stage can share data within the shared workspace. To share data between stages, you can use [save and restore cache steps](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages.md).

## Does CI support running Docker-in-Docker images?

Yes. For details, go to [Run Docker-in-Docker in a Build stage](/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

## How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?

You can run Docker-in-Docker (DinD) as a service with the `sharedPaths` set to `/var/run`. Following that, the steps can be executed as Docker commands. This works regardless of the Kubernetes container runtime.

The DinD service does not connect to the Kubernetes node daemon. It launches a new Docker daemon on the pod, and then other containers use that Docker daemon to run their commands.

For details, go to [Run Docker-in-Docker in a Build stage](/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

## Does Drone CI support importing libraries when using jsonnet? If you keep seeing RUNTIME EROR. 

You can set the env variable, otherwise it doesn't figure out the import path correctly: DRONE_JSONNET_IMPORT_LIMIT
See community PR for more details: [https://github.com/harness/drone/commit/d50e89d4114a3fed49a1317f147078269a4bdfb5#diff-e1045c16b3ce29369b845d8421af54321c52394275810fc6caf92ca75e8be974R143]
