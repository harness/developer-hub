---
title: Get Started with Harness CI
description: A self-service onboarding guide for Harness CI.
sidebar_position: 4
sidebar_label: Get Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the Harness CI onboarding guide. Discover how Harness accelerates software builds, enhances developer productivity, and streamlines CI processes with [intelligence features](/docs/continuous-integration/use-ci/harness-ci-intelligence), AI-driven insights, and hyper-optimized build infrastructure.

This guide will help you quickly get started with Harness CI, from setup to running your first build.

## Prerequisites

Before beginning the walkthroughs in this guide, ensure you have:

- Access to a Harness account.
- Access to a source code repository such as [Harness Code Repository](/docs/code-repository/get-started/overview).
- Have reviewed [CI overview](/docs/continuous-integration/get-started/overview) and [CI key concepts](/docs/continuous-integration/get-started/key-concepts).
- Have reviewed the [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide) and [Harness Platform key concepts](/docs/platform/get-started/key-concepts).
- Have reviewed the [Harness CI migration guides](/docs/category/migrate-to-harness-ci) if you're migrating from another CI provider.

## Create your first Harness CI pipeline

This getting started guide will walk you through setting up a build pipeline for the first time.

<Tabs>
<TabItem value="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/e56c08cc-4d5c-40b0-a6f7-f8cf27a06a89?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create your first CI Pipeline"/>
</TabItem>
<TabItem value="Step-by-step">

### Create a pipeline

1. Click the module selector in the top left and navigate to the Continuous Integration module. 
2. Click **Pipelines**
3. Click **+ Create a Pipeline**.
4. Enter the name of your pipeline.
5. Click **Start**.

### Add and configure a CI stage

1. Click **Add Stage**. 
2. Select **Build** as your stage type and name your stage.
3. Select your git provider. If you choose you a third party provider, you will need to set up a connector. Refer to the [connectors' documentation](/docs/category/code-repo-connectors/)
4. Select your code repository.
5. Click **Set up Stage**.

### Choose your infrastructure

In your CI stage:

1. Click the **Infrastructure** tab.
2. Choose **Cloud**. 
   - This will run the build on Harness Cloud. To learn more, refer to the [Harness Cloud documentation](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).
   - Learn more about [which build infrastructure option is right for you](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).
3. Leave the default options for the operating system and architecture. 
4. Click **Continue**.

### Create your execution steps

In your CI stage:

1. Click the **Execution** tab.
2. Click the plus button to add a step. 
3. Find and select the **Run** step from the step library.
4. Name your run step. 
5. Enter your build command. For example:
    ```
    echo "Harness CI is fast"
    ```
6. Click **Apply Changes**.
7. Click **Save**. 

### Run your pipeline

In your pipeline:

1. Click **Run**. 
2. Select **Git Branch** as your build type.
3. Enter your branch name.
4. Click **Run Pipeline**.

Congratulations on running your first CI pipeline!

</TabItem>
</Tabs>

---

## Next Steps

Explore the documentation to learn what your Harness CI pipelines can do.

* [Build images, push images, and upload artifacts.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact)
* [Use caching](/docs/category/share-and-cache-ci-data) and [manage dependencies](/docs/category/manage-dependencies).
* Run [scripts](/docs/continuous-integration/use-ci/run-step-settings.md) and [tests](/docs/category/run-tests).
* [Use plugins](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins.md) and [write your own plugins](/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins.md).
* [Explore CI Tutorials and Code Samples](/docs/category/tutorials-and-code-samples) for your use case.
* [Find the right build infrastructure for you](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).