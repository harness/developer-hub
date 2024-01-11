---
title: SEI Checkmarx integration
description: Integrate SEI with Checkmarx SAST.
sidebar_position: 40
sidebar_label: Checkmarx SAST
---

Use the SEI Checkmarx SAST integration to integrate SEI with Checkmarx Static Analysis Solution (SAST).

:::info

This SEI integration is under development. It provides limited integration support in its current state.

:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Configure the integration


<Tabs>
  <TabItem value="cloud" label="Cloud" default>


1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Checkmarx SAST** integration, and select **Install**.
4. Configure and save the integration.
   * Add the **Checkmarx Instance URL**
   * Add the checkmarx account **Username**
   * Enter your checkmarx account **Password** and click **Next**
   * Add a **Name** and **Description** for the integration
   * You can add **Tags** to identify the integration (optional)


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate** with the Checkmarx server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```YAML
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: cxsast
    url: <CHECKMARX_URL> # 'https://sca.checkmarx.net'
    username: <CHECKMARX_USERNAME>
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>
