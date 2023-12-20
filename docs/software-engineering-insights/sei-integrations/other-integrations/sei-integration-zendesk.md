---
title: SEI Zendesk integration
description: Integrate SEI with Zendesk.
sidebar_position: 240
sidebar_label: Zendesk
---

Zendesk is a cloud-based customer service application designed to improve communication between the company and its customers.

Use the SEI Zendesk integration to integrate SEI with Zendesk.

## Configure authentication

To use the SEI Tenable integration you need a Zendesk API token that belongs to an Admin service account.

1. Create or obtain an Admin service account in Zendesk.
2. Make sure the service account has `read` access to all issues that you want to analyze.
3. Using the service account, create a Zendesk API token. For instructions, go to the Zendesk documentation on [generating a new API token](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token).
4. Copy the key somewhere that you can retrieve it when you configure the integration.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Configure the integration

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Cloud" default>
```

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Zendesk** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your Zendesk instance.
   * **Username:** The Zendesk service account username.
   * **API Key:** Enter the Zendesk API token.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Zendesk server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api'
integrations:
  - id: '<INTEGRATION_ID>'
    application: zendesk
    url: '<ZENDESK_URL>' # https://www.zendesk.com/
    username: <ZENDESK_USERNAME>
    api_key: <ZENDESK_API_KEY>
    metadata:
      jiralinks_enabled: true
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```
