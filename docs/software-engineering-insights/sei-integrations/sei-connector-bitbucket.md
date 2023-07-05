---
title: SEI Bitbucket connector
description: Integrate SEI with Bitbucket.
sidebar_position: 30
sidebar_label: Bitbucket
---

Bitbucket Cloud is a web-based version control repository hosting service, for source code and development projects that use either Mercurial or Git revision control systems.

Use the SEI Bitbucket connector to integrate SEI with Bitbucket Cloud.

To integrate with the on-premises offering, Bitbucket Data Center, you must use the [generic SEI connector](./sei-connector-generic.md).

## Requirements

The following permissions and settings are required to use the SEI Bitbucket connector:

* You have a Bitbucket account.
* Your role is **Member** or higher.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Bitbucket** or **Bitbucket Cloud** connector, and select **Install**.
4. Configure and save the connector.

   * If you are redirected to Bitbucket, select **Grant Access** to allow the integration. You might need to sign in. Bitbucket uses OAuth authentication.
   * Enter a **Name** for the connector.
   * The **Description** and **Tags** are optional.
