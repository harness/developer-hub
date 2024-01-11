---
title: SEI Coverity integration
description: Integrate SEI with Coverity.
sidebar_position: 60
sidebar_label: Coverity
---

Coverity is a static analysis scanner from Snopsys.

Use the SEI Coverity integration to integrate SEI with Coverity.

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
3. Select **Available Integrations**, locate the **Coverity** integration, and select **Install**.
4. Configure and save the integration.
   * Add the **Coverity instance URL**
   * Enter your **Username**
   * Enter the **Coverity API Key** and click **Next**. To generate an **API key** for your Coverity instance, Go to [Generating API key](https://community.synopsys.com/s/article/Authentication-with-REST-API-using-auth-key).
   * Provide a **Name** for the integration.
   * The **Description** and **Tags** are optional.


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Coverity server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: coverity
    url: '<COVERITY_URL>' # https://scan.coverity.com/
    username: <COVERITY_USERNAME>
    api_key: <COVERITY_API_KEY>
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>

