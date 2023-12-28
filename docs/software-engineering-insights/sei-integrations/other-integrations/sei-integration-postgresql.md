---
title: SEI PostgreSQL integration
description: Integrate SEI with PostgreSQL.
sidebar_position: 160
sidebar_label: PostgreSQL
---

PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.

Use the SEI PostgreSQL integration to integrate SEI with a Cloud-based PostgreSQL instance.

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
3. Select **Available Integrations**, locate the **PostgreSQL** integration, and select **Install**.
4. Configure and save the integration.
   * Enter your **Org Name**. This field should not be left empty.
   * Provide the **IP address** or **Hostname** of your Cloud-based PostgreSQL instance. For example: `"101.152.176.91"`
   * **Username:** Enter the username associated with your PostgreSQL database.
   * **Password:** Provide the password corresponding to the username you entered.
5. Specify the **Name** of your **PostgreSQL database**.
6. Finish configuration and **Save** the integration

To integrate with an on-premises PostgreSQL instance, you must use an [Ingestion Satellite](/docs/category/ingestion-satellite).


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the PostgreSQL server.

Make sure to select the satellite integration checkbox while configuring the integration. Once you save the integration a satellite.yml file will be automatically generated and downloaded to your computer. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>'
    application: postgres
    username: <POSTGRESQL_USERNAME>
```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>

