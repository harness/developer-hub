---
title: SEI Harness integration
description: Integrate SEI with Harness.
sidebar_position: 110
sidebar_label: Harness
---

Harness is a modern software delivery platform that allows engineers and DevOps to build, test, deploy, and verify the software on demand.

Use the SEI Harness integration to integrate SEI with your Harness modules.

:::info

The SEI Harness integration is only for Harness NextGen modules. For an explanation of the difference between Harness FirstGen and NextGen, go to [Harness FirstGen vs Harness NextGen](/docs/getting-started/harness-first-gen-vs-harness-next-gen).

:::

## Requirements

To configure the SEI Harness integration, you need:

* Your Harness account ID. You can find this under **Account Settings**.
* A [Harness API key](/docs/platform/user-management/add-and-manage-api-keys/) and [personal access token](/docs/platform/User-Management/add-and-manage-api-keys#create-personal-access-token).

Copy the account ID and token somewhere that you can retrieve them when you configure the integration.

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Harness NG** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter `https://app.harness.io`.
   * **API key:** Enter your Harness personal access token.
   * **Account ID:** Enter your Harness account ID.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

<!-- Org and Project should already be selected? -->
