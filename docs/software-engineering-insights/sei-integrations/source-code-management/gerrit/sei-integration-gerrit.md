---
title: SEI Gerrit integration
description: Integrate SEI with Gerrit.
sidebar_position: 80
sidebar_label: Connect with Gerrit
---

Gerrit is a free, web-based team code collaboration tool.

Use the SEI Gerrit integration to integrate SEI with Gerrit.

## Requirements

You must create HTTP credentials in Gerrit that you will use as an API key when you configure the integration. You can generate a new HTTP credential by selecting 'Generate New Password' under the HTTP credentials section in the Gerrit settings.

For more information, Go to [Generating HTTP credentials in Gerrit](https://gerrit-review.googlesource.com/Documentation/config-gerrit.html).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configure the integration

<Tabs>
  <TabItem value="cloud" label="Cloud" default>

1. In your **Harness Project**, select the **SEI Module**, and go to your **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Gerrit** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your Gerrit instance with a slash at the end, such as `https://gerrit.example.com/`.
   * **User Name:** Enter your Gerrit account user name.
   * **API Key:** Enter your Gerrit HTTP credentials.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

</TabItem>
  <TabItem value="satellite" label="Satellite">

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Gerrit server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the Environment of your Harness Account.
integrations:
  - id: '<INTEGRATION_ID>'
    application: gerrit
    url: '<GERRIT_URL>' 
    username: <GERRIT_USERNAME>
    api_key: <GERRIT_API_KEY>
```

</TabItem>
</Tabs>