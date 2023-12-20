---
title: SEI PagerDuty integration
description: Integrate SEI with PagerDuty.
sidebar_position: 150
sidebar_label: PagerDuty
---

PagerDuty specializes in a SaaS incident response platform for IT departments.

Use the SEI PagerDuty integration to integrate SEI with any Cloud-based PagerDuty account/plan.

## Requirements

To use the SEI PagerDuty integration, you need a **read-only PagerDuty API key**. Copy the key somewhere that you can retrieve it when you configure the integration. For instructions, go to the PagerDuty documentation on [API Access Keys](https://support.pagerduty.com/docs/api-access-keys).

<figure>

![](../static/pagerduty-api-key.png)

<figcaption>Creating a read-only PagerDuty API key.</figcaption>
</figure>

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
3. Select **Available Integrations**, locate the **PagerDuty** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter `https://api.pagerduty.com`, unless you have a special use case that requires a different URL.
   * **Username:** The email address of the user that created the API key in PagerDuty.
   * **API Key:** Enter your PagerDuty API key.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.

To integrate with an on-premises PagerDuty offering, you must use an [Ingestion Satellite](/docs/category/ingestion-satellite).

```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **satellite** is similar to configuring the integration on cloud, with the exception of using **satellite to communicate** with the Pagerduty server.

Make sure to select the **satellite integration checkbox** while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: foo
  api_key: <SEI_API_KEY>
  url: 'https://testapi1.propelo.ai'
integrations:
  - id: '4697'
    application: pagerduty
    url: <PAGERDUTY_URL>
    username: <PAGERDUTY_USERNAME>
    api_key: <PAGERDUTY_API_KEY>
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```

