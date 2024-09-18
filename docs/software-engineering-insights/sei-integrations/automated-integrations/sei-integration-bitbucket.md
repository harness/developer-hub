---
title: SEI Bitbucket cloud integration
description: Integrate SEI with Bitbucket cloud.
sidebar_position: 30
sidebar_label: Bitbucket cloud
canonical_url: https://www.harness.io/blog/bitbucket-servers-sunset
---

Bitbucket is a web-based version control repository hosting service, for source code and development projects that use either Mercurial or Git revision control systems.

Use the SEI Bitbucket integration to integrate SEI with Bitbucket Cloud or Bitbucket Enterprise.

## Requirements

The following permissions and settings are required to use the SEI Bitbucket integration:

* You have a Bitbucket account.
* Your role is **Member** or higher.

## Configure the integration


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



<Tabs>
  <TabItem value="cloud" label="Cloud" default>


1. In your **Harness Project**, select the **SEI Module**, and go to your **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, and locate the **Bitbucket Cloud** integration, and select **Install**

   To integrate with the on-premises offering, Bitbucket Data Center, install the **Bitbucket Enterprise** integration and use an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

4. Select **Install**.
5. Configure and save the integration.

   * If you are redirected to Bitbucket, select **Grant Access** to allow the integration. You might need to sign in. Bitbucket uses OAuth authentication.
   * Enter a **Name** for the integration.
   * The **Description** and **Tags** are optional.


</TabItem>
  <TabItem value="satellite" label="Satellite">

The Bitbucket Cloud integration does not support configuration using the Ingestion Satellite.

</TabItem>
</Tabs>
