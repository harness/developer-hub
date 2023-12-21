---
title: SEI Snyk integration
description: Integrate SEI with Snyk.
sidebar_position: 190
sidebar_label: Snyk
---

Snyk Open Source helps development teams automatically find and fix vulnerabilities and license violations in their open source dependencies.

Use the SEI Snyk integration to integrate SEI with Snyk.

## Requirements

To use the SEI Snyk integration:

* Make sure your Snyk plan supports APIs. To check this, log in to Snyk, go to **Settings**, and then go to **Billing**.
* Get your Snyk API token. Copy the token somewhere that you can retrieve it when you configure the integration. For instructions, go to the Snyk documentation on [Authentication for API](https://docs.snyk.io/snyk-api-info/authentication-for-api).

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
3. Select **Available Integrations**, locate the **Snyk** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter `https://app.snyk.io`
   * **Username:** The email address of the user associated with the API token that you copied from Snyk.
   * **API Key:** Enter the Snyk API token.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Snyk server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: snyk
    url: '<SNYK_URL>' # https://app.snyk.io
    username: <SNYK_USERNAME>
    api_key: <SNYK_API_KEY>
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```


## Alternative: Upload report

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Snyk Report** semi-automated integration, and select **Upload report**.
