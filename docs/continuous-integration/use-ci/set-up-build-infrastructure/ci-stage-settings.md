---
title: CI Build stage settings
description: This topic describes CI Build stage settings.
sidebar_position: 60
helpdocs_topic_id: yn4x8vzw3q
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes CI Build stage settings. For more information about configuring stages in CI pipelines, go to [CI pipeline creation overview](../prep-ci-pipeline-components.md).

To create, edit, and delete stages in CI pipelines, you need either Project Admin or Project Member permissions. For more information, go to the [Permission Reference](/docs/platform/role-based-access-control/permissions-reference).

## Add a Build stage to a pipeline

1. In Harness, edit or [create a pipeline](../prep-ci-pipeline-components.md).
2. Select **Add Stage**, and then select **Build**.
3. In **Stage Name**, enter a name summarizing the stage's purpose.

   Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id** when you first add the stage. After you add the stage, it the **Id** can't be changed.

   The description and [tags](../../../platform/references/tags-reference.md) are optional.

4. Configure the [default codebase settings](../codebase-configuration/create-and-configure-a-codebase.md).
5. Select **Set Up Stage**.
6. Select the [Overview](#overview), [Infrastructure](#infrastructure), [Execution](#execution), and [Advanced](#advanced) tabs to configure the stage settings, [set up the build infrastructure](/docs/category/set-up-build-infrastructure), and add steps to the stage.

## Overview

These settings are found on the **Overview** tab after adding a Build stage to a pipeline.

### Stage Details

You can edit the [Name](#stage-name), [Description](#description), and [Tags](#tags). You can also toggle the [Clone Codebase](#clone-codebase) setting for this stage.

### Shared Paths

You can use **Shared Paths** to specify paths to folders outside the default workspace. You can use this to [share data across steps](../caching-ci-data/share-ci-data-across-steps-and-stages.md) or customize cache paths for [Cache Intelligence](../caching-ci-data/cache-intelligence.md).

When a pipeline runs, it creates a temporary volume for each stage called a *workspace*. During initialization, the stage clones your codebase to the root of the workspace. Then, the steps in the stage run inside the root. The workspace is the current working directory for each step in the stage. The workspace persists for the lifetime of the stage and enables steps in that stage to communicate and share state information. The default shared working directory for a stage is `/harness`. The workspace is destroyed when the stage ends.

Individual steps can communicate and share state using the workspace filesystem. The workspace is a volume, so filesystem changes persist throughout the stage lifetime. If you need to share additional volumes, you can add **Shared Paths**. Path declarations must begin with a forward slash, such as `/vol`.

For example, the maven `m2` repo is stored in `/root/.m2` by default. If your Build stage uses Maven, you can specify `/root/.m2` as a **Shared Path** so that all steps in that stage can access that directory.

If you need to shared data across stages, use [caching](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-across-stages).

### Cache Intelligence

Use these settings to [enable and configure Cache Intelligence](../caching-ci-data/cache-intelligence.md).

For fully supported build tools with dependencies stored in the default location for the tool used, you only need to select **Enable Cache Intelligence**.

For other build tools or non-default cache locations, you must provide custom cache **Paths** in addition to enabling Cache Intelligence. Depending on the cache location, you might also need to specify these paths in **Shared Paths**.

Optionally, you can specify a custom cache **Key**

If you are using self-managed build infrastructure (any build infrastructure other than Harness CI Cloud), you must also [define S3-compatible object storage](/docs/platform/settings/default-settings.md#continuous-integration) that Harness can use to store and manage your caches.

### SLSA Provenance

These settings are for the [Harness SCS module](/docs/software-supply-chain-assurance).

### Advanced: Stage Variables

[Stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) are available to all steps in the stage. There are many uses for these variables. For example, stage variables are inherently available to steps as environment variables.

## Infrastructure

These settings are found on the **Infrastructure** tab after adding a stage to a pipeline.

Infrastructure is where the build runs the steps in this stage. It is a build farm, such as a Kubernetes cluster. Infrastructure settings vary by [build infrastructure type](./which-build-infrastructure-is-right-for-me.md).

The first stage requires you to configure a build infrastructure. In stages after the first, you can either **Propagate from an existing stage** or **Use a New Infrastructure**.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cloud" label="Cloud" default>

<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Use the **Cloud** infrastructure option for [Harness Cloud build infrastructure](./use-harness-cloud-build-infrastructure.md).

The following **Platform** settings are available:

* **Select the Operating System:** Select the relevant OS.
* **Select the Architecture:** Select the relevant architecture.

</TabItem>
  <TabItem value="kubernetes" label="Kubernetes">

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Use the **Kubernetes** infrastructure option to [set up a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

Kubernetes cluster build infrastructure has the following **Platform** settings:

* **Select the Operating System:** Select the relevant OS.
* **Kubernetes Cluster:** Select a [Kubernetes cluster connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector).
* **Namespace:** Enter the Kubernetes namespace to use in the target cluster. You can also use a Runtime Input (`<+input>`) or expression for the namespace. For more information, go to [Runtime Inputs](../../../platform/variables-and-expressions/runtime-inputs).

For information about **Advanced** settings for Kubernetes cluster build infrastructure, go to [Set up a Kubernetes cluster build infrastructure](./k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md)
The following **Advanced** settings are available for the **Kubernetes** infrastructure:

</TabItem>
  <TabItem value="local" label="Local">


<DocsTag  text="Free plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Use the **Local** infrastructure option for a [local runner build infrastructure](./define-a-docker-build-infrastructure.md).

The following **Platform** settings are available:

* **Select the Operating System:** Select the relevant OS.
* **Select the Architecture:** Select the relevant architecture.


</TabItem>
  <TabItem value="vm" label="VMs">


<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

Use the **VMs** infrastructure option for [self-managed cloud provider VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

The following **Platform** settings are available:

* **Select the Operating System:** Select the build infrastructure OS.
* **Pool Name:** Enter the pool name as specified in the `pool.yml` setup file in your build infrastructure.
* **Override Image Connector:** By default, [Harness pulls certain images from public Docker Hub repos](./harness-ci.md) that are needed to run a build. You can override this by using a [Docker connector that downloads the images from the Harness Container Image Registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector) instead. This option is useful when your default Delegate cannot access the public registry (for example, due to security policies in your organization or if your infrastructure is running in a private cloud).


</TabItem>
</Tabs>


## Execution

The **Execution** tab is where you add steps to the stage. For details about different step types, go to:

* [Build and push images or upload and download artifacts](/docs/category/build-push-upload-download)
* [Run tests](/docs/category/run-tests)
* [Manage dependencies](/docs/category/manage-dependencies)
* [Share and cache CI data](/docs/category/share-and-cache-ci-data)
* [Run scripts](/docs/continuous-integration/use-ci/run-step-settings)
* [Use plugins](/docs/category/use-plugins)
* [Security step (Harness STO)](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)

## Advanced

The **Advanced** tab contains settings for [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md), [conditional executions](/docs/platform/pipelines/step-skip-condition-settings), [looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism), and [failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps).

:::info

If you use a delegate selector with a Kubernetes cluster build infrastructure, and your delegate selector specifies a Docker delegate, your Kubernetes cluster connector must be set to [Specify Master URL and Credentials](/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md#specify-master-url-and-credentials).

Kubernetes cluster connectors can't inherit delegate credentials (use the credentials of a specific Harness Delegate) from Docker delegates because they are not in the same environment.

:::
