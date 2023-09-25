---
title: Continuous Integration (CI) FAQs
description: Here are some frequently asked questions about Harness CI.
sidebar_position: 1
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

When you enable API authentication in a GitHub connector (recommended), use the same personal access token for both [Authentication](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#personal-access-token) and [API authentication](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#enable-api-access).

:::

For more information, go to the [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference).

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

## Memory and CPU resource allocation as part of a Run Test Step. 

If a Run Test Step is part of a Kubernetes infrastructure, then the resources (CPU and Memory) can be configured as part of the step. This is not the case if the Run Test Step has a VM or Cloud Infra assigned. In this case the entire memory allocation of the VM is allocated to the step. 

## Which Drone plugins are supported in Harness CI?
You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).
Yes, for details, go to [Use plugins](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins).

## Using S3 to cache and restore between Steps?

Yes, for details, go to [Save and Restore Cache from S3](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/).

## Using GCS to cache and restore between Steps?

Yes, for details, go to [Save and Restore Cache from GCS](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs).

## How to use Background step settings?

Use Background steps to manage dependent services that need to run for the entire lifetime of a Build stage. 
For details, go to  [Background step settings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings).

## How to build and push artifacts and images?

You can use Harness CI to upload artifacts, such as Docker images or test results.
For details, go to [Build and push artifacts and images](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

## How to Use Harness Cloud build infrastructure?

With Harness Cloud, you can run builds in isolation on Harness-hosted VMs that are preconfigured with tools, packages, and settings commonly used in CI pipelines
For details, go to [Harness Cloud build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).

## How to create and configure a codebase?

CI pipelines build and test code that is pulled from a Git code repository. When you add a Build stage to a CI pipeline, you can select a code repo connector that connects to the Git account or repository where your code is stored.
For details, go to [Create and configure a codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).

## CI codebase variables reference

In Harness CI, you set up a codebase by creating a Harness connector that connects to a Git repo.
For details, go to [CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

## How to Enable Test Intelligence?

Harness Test Intelligence (TI) improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build
For details, go to [Enable Test Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-test-intelligence/).

## Does Harness CI support Multilayer caching?
Yes, for details, go to [https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching).

## Does Harness CI support script execution?

Yes, for details, go to [Run scripts](https://developer.harness.io/docs/category/run-scripts).
