---
title: SEI Harness integration
description: Integrate SEI with Harness.
sidebar_position: 110
sidebar_label: Harness
---

Harness is a modern software delivery platform that allows engineers and DevOps to build, test, deploy, and verify the software on demand.

Use the SEI Harness integration to integrate SEI with your Harness modules.

:::info

The SEI Harness integration is only for Harness NextGen modules. For an explanation of the difference between Harness FirstGen and NextGen, go to [Harness FirstGen vs Harness NextGen](/docs/get-started/harness-first-gen-vs-harness-next-gen).

:::

## Requirements

To configure the SEI Harness integration, you need:

* Your Harness account ID. You can find this under **Account Settings**.
* A [Harness API key and token](/docs/platform/automation/api/add-and-manage-api-keys).

Copy the account ID and token somewhere that you can retrieve them when you configure the integration.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Configure the integration


```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Cloud" default>
```

1. Select **Integrations** under **Settings**.
2. Select **Available Integrations**, locate the **Harness NG integration**, and select **Install**.
3. Configure and **save** the integration.
   * **URL**: Enter `https://app.harness.io`.
   * **API key**: Enter your Harness personal access token.
   * **Account ID**: Enter your Harness account ID.
   * **Name**: Enter a name for the integration.
   * **Description** and **Tags** are optional.
   * **Organization**: Enter your organization name. If you have multiple organizations, you can use a comma-separated list.
     
     For example, "Youtube, YouTubeTV." Please note that organization names are case-sensitive. You can leave this field blank to include all organizations accessible to the token user.
   * **Project**: Enter your project name. Similarly, you can use a comma-separated list if you have multiple projects.
     
     For example, "org/project, org2/project2." Like organization names, project names are case-sensitive. Leaving this field blank will ingest all the projects from organizations accessible to the token user.
4. Finish configuration and **Save** the integration.


```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud using the API key, with the exception of using satellite to communicate with the Harness NG server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a `satellite.yml` file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).


Here’s a sample `satellite.yml` file:

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: harnessng
    url: '<HARNESS_URL>'
    api_key: <HARNESS_API_KEY>
    metadata:
      accountId: <HARNESS_NG_ACCOUNTID>
      organization: default
      project: default

```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```