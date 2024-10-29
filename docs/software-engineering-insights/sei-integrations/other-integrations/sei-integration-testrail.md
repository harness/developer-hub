---
title: SEI TestRail integration
description: Integrate SEI with TestRail.
sidebar_position: 230
sidebar_label: TestRail
---

[TestRail](https://www.testrail.com/) is a test management platform that helps you streamline your software testing processes, get visibility into QA, and release high-quality software.

Use the SEI TestRail integration to integrate SEI with TestRail.

## Requirements

Before setting up the SEI TestRail integration, ensure that you have generated the TestRail API Key. The API can be generated from the TestRail platform settings. For more information, go to the [TestRail API Key Documentation.](https://support.testrail.com/hc/en-us/articles/7077039051284-Accessing-the-TestRail-API)

:::info
Note that the TestRail's API settings are correctly configured by enabling the API and session authentication in Site Settings.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configure the integration

<Tabs>
  <TabItem value="cloud" label="Cloud" default>

1. In your **Harness Project**, select the **SEI Module**, and go to your **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **TestRail** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your TestRail instance.
   * **Username:** The user name for the TestRail user that created the API key.
   * **API Key:** Enter the TestRail API key.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

By completing these steps, you ensure that TestRail is configured to allow API access and authentication, which is crucial for the SEI TestRail integration to fetch data from the TestRail platform.

</TabItem>
  <TabItem value="satellite" label="Satellite">

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the TestRail server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a ```satellite.yml``` file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml`

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the Environment of your Harness Account.
integrations:
  - id: '<INTEGRATION_ID>'
    application: testrails
    url: '<TESTRAIL_URL>'
    username: <TESTRAIL_USERNAME>
    api_key: <TESTRAIL_API_KEY>
```

</TabItem>
</Tabs>
