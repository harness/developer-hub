---
title: Run Bamboo plans in CD pipelines
description: Run Bamboo plans in CD stages.
sidebar_position: 2
---

:::note

Currently, this feature is behind the feature flag `BAMBOO_ARTIFACT_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

This topic describes how to use the Bamboo step in a Harness Continuous Delivery (CD) pipeline.

Continuous Integration (CI) can be performed in Harness using the module and CI pipelines.

If you are using Harness CD but not Harness Continuous Integration (CI), you can still perform CI using the Bamboo step in your CD stage.

Harness integrates with Bamboo, enabling you to run Bamboo plans as part of your CD stage.

## Supported platforms and technologies

For more information, go to [supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies).

## Add the Bamboo step

This step assumes you have a created a pipeline and CD stage. If you are new to stages, go to [add a stage](https://developer.harness.io/docs/platform/Pipelines/add-a-stage).

In your CD stage's **Execution**, select **Add Step**, then select **Bamboo**.

## Bamboo Connector

Select or create a Harness Bamboo connector.

### Build plan permissions

Make sure the connector's user account has the following Bamboo permissions:

- View plan.
- Build plan (if you plan to trigger a build as part of your pipeline).

For more information, go to [Bamboo Permissions](https://confluence.atlassian.com/bamboo/bamboo-permissions-369296034.html).

## Plan Name

Select the Bamboo plan to build. The list is automatically populated using the Bamboo server you set up in the Bamboo connector you selected.

## Plan Parameters

If you are using a parameterized build, when you select the plan in **Plan Name**, Harness will automatically populate any plan parameters from the server.

You can also add parameters manually by selecting **Add Plan Parameter**.

For example, let's say you have a build plan that generates a software package with a version number. Instead of hardcoding the version number in the build configuration, you can create a plan parameter called `VersionNumber`. This parameter can be set when running the plan with the Bamboo step, allowing you to specify the desired version dynamically.

Runtime inputs and expressions are supported for the **Value** only.



