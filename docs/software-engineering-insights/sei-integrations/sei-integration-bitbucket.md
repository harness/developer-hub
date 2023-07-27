---
title: SEI Bitbucket integration
description: Integrate SEI with Bitbucket.
sidebar_position: 30
sidebar_label: Bitbucket
---

Bitbucket is a web-based version control repository hosting service, for source code and development projects that use either Mercurial or Git revision control systems.

Use the SEI Bitbucket integration to integrate SEI with Bitbucket Cloud or Bitbucket Enterprise.

To integrate with the on-premises offering, Bitbucket Data Center, you must use the [generic SEI integration](./sei-integration-generic.md).

## Requirements

The following permissions and settings are required to use the SEI Bitbucket integration:

* You have a Bitbucket account.
* Your role is **Member** or higher.

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, and locate the **Bitbucket Enterprise** or **Bitbucket Cloud** integration, depending on your Bitbucket configuration.
4. Select **Install**.
5. Configure and save the integration.

   * If you are redirected to Bitbucket, select **Grant Access** to allow the integration. You might need to sign in. Bitbucket uses OAuth authentication.
   * Enter a **Name** for the integration.
   * The **Description** and **Tags** are optional.
