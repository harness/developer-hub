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

In this topic:

* [How can a step call a service started by a Background step?](continuous-integration-ci-faqs.md#how-can-a-step-call-a-service-started-by-a-Background-step)
* [What is the maximum timeout for a CI step or stage?](continuous-integration-ci-faqs.md#what-is-the-maximum-timeout-for-a-cie-step-or-stage)
* [What are the default values for memory and CPU for CI steps?](continuous-integration-ci-faqs.md#what-are-the-default-values-for-memory-and-cpu-for-cie-steps)
* [How do you replicate a list of Drone plugin settings in CI?](continuous-integration-ci-faqs.md#how-to-replicate-a-list-or-a-map-of-drone-plugin-settings-in-cie)
* [What permissions are required for GitHub personal access tokens in NextGen and GitX?](continuous-integration-ci-faqs.md#permissions-required-for-git-hub-personal-access-token-in-next-gen-and-git-x)
* [What permissions are required to run CI builds in an OpenShift cluster?](continuous-integration-ci-faqs.md#permissions-required-to-run-cie-builds-in-an-open-shift-cluster)
* [What are the minimum permissions required for a service account role for a Kubernetes Cluster connector?](continuous-integration-ci-faqs.md#list-of-minimum-permissions-required-for-service-account-role-for-kubernetes-connector)
* [How can you share the codebase configuration between stages in a CI pipeline?](continuous-integration-ci-faqs.md#how-can-you-share-the-codebase-configuration-between-stages-in-the-cie-pipeline)
* [Does CI support running Docker-in-Docker images?](continuous-integration-ci-faqs.md#does-cie-support-running-docker-in-docker-images)
* [How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?](continuous-integration-ci-faqs.md#how-can-you-execute-docker-commands-in-a-ci-pipeline-that-runs-on-a-kubernetes-cluster-that-lacks-a-docker-runtime)


## How can a step call a service started by a Background step?

For information about calling services started by Background steps, go to **Important notes** and **Port Bindings** in [Background step settings](../continuous-integration/ci-technical-reference/../../../continuous-integration/ci-technical-reference/background-step-settings.md).

## What is the timeout limit for a CI pipeline?

By default, a stage can run for a maximum of 24 hours on a Kubernetes cluster build infrastructure and a maximum of 30 minutes on Harness Cloud build infrastructure.

For pipelines, the default timeout limit is, generally, the product of the stage limit multiplied by the number of stages. For example, a pipeline with three stages that use a Kubernetes cluster build infrastructure could run for a maximum of 72 hours. However, you can also set an overall pipeline timeout limit in each pipeline's **Advanced Options**.

For steps, you can set a custom timeout limit in each step's **Optional Configuration** settings. In stages that use a Kubernetes cluster build infrastructure, the default timeout for steps is 10 hours. However, this is constrained by the stage timeout limit of 24 hours. For example, if a stage has three steps, the total run time for the three steps can't exceed 24 hours or the stage fails due to the stage timeout limit.

## What are the default values for memory and CPU for CIE steps?

| **Memory** | **CPU** |
| --- | --- |
| 500Mi | 400m |

## How do you replicate a list of Drone plugin settings in CI?

For lists, merge them with comma separation.

For example, here are some Drone plugin settings:

```
Settings:
  tags:
    - latest
	- '1.0.1'
	- '1.0'
```

Here are the same settings as you would declare them in Harness CI:

```yaml
Settings:
    tags: latest,1.0.1,1.0
```

## What permissions are required for GitHub personal access tokens in NextGen and GitX?

When configuring permisisons for a GitHub personal access token (PAT) that you'll use in Harness NextGen, under **Scopes**, select all **repo** and **user** options.

![](./static/continuous-integration-ci-faqs-20.png)

:::caution

When you enable API authentication in a GitHub connector (recommended), use the same personal access token for both [Authentication](/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference#personal-access-token) and [API authentication](/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference#enable-api-access).

:::

For more information, go to the [GitHub connector settings reference](/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference).

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

Each CI stage runs in it's own container. Steps in a stage can share data within the shared workspace. To share data between stages, you can use the [Save and restore cache steps](../../continuous-integration/use-ci/caching-ci-data/saving-cache.md).

## Does CI support running Docker-in-Docker images?

Yes. For details, go to [Run Docker-in-Docker in a CI stage](../../continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

## How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?

You can run Docker-in-Docker (DinD) as a service with the `sharedPaths`set to `/var/run`. Following that, the steps can be executed as Docker commands. This works regardless of the Kubernetes container runtime.

The DinD service does not connect to the Kubernetes node daemon. It launches a new Docker daemon on the pod, and then other containers use that Docker daemon to run their commands.
