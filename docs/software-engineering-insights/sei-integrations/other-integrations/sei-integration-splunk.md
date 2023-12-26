---
title: SEI Splunk integration
description: Integrate SEI with Splunk.
sidebar_position: 210
sidebar_label: Splunk
---

Splunk produces software for searching, monitoring, and analyzing machine-generated big data via a web-style interface.

Use the SEI Splunk integration to integrate SEI with Splunk.

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
3. Select **Available Integrations**, locate the **Splunk** integration, and select **Install**.
4. Configure and save the integration.
    * Add the **URL** of your Splunk instance
    * Add your splunk **username** for authentication
    * Add your **Splunk API Key** or **Authentication token** that you previously generated.
5. Specify any relevant options (**Ignore Server Cert**, **Is Splunk Cloud**)
6. **Description** and **Tags** are optional
7. Finish configuration and **Save** the integration.


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Splunk server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: splunk
    url: '<SPLUNK_URL>' 
    username: <SNYK_USERNAME>
    api_key: <SNYK_API_KEY>
    metadata:
      ignore_server_cert: true
      is_splunk_cloud: true
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>
