---
title: Sumo Logic
sidebar_label: Sumo Logic
description: ""
---

Sumo Logic provides log monitoring, management, and analytics service. Integrate Harness FME data into Sumo Logic to get rollout and rollback events in Sumo Logic. These events can be overlayed with any other log data to quickly detect and correlate application issues with feature flag changes.

If you are having trouble completing the integration, contact us at [support@split.io](mailto:support@split.io).

## In Sumo Logic
 
1. Click **Manage** and **Setup Wizard** from the dropdown to set up new streaming data.

   ![](./static/sumologic-setupwizard.png)

2. On the Select Data Type page click **Your Custom App**.

   ![](./static/sumologic-selectdatatype.png)

3. On the Set Up Collection page click **HTTP Source**.

   ![](./static/sumologic-setupcollection.png)

4. On the Configure Source page specify a **Source Category** (use *Split* as the name) and a **Time zone**, and then click **Continue**.

   ![](./static/sumologic-configuresource.png)

5. Copy the URL provided to configure the Sumo Logic integration in Harness FME , and then click **Continue**. This URL contains the token/key used to identify your Sumo Logic account.

   ![](./static/sumologic-httpsource.png)

## In Harness FME

1. From the FME navigation menu, click **FME Settings** and navigate to the **Integrations** page.
1. Locate the Sumo Logic integration and click **Add**.
1. Select the project for which you would like to configure the integration.

   ![](./static/sumologic-splitadmin.png)

1. Paste the Source Address you copied in Step 5.

   ![](./static/sumologic-integration.png)

1. Click **Save**.

Harness FME notifications should now be flowing into Sumo Logic. If you have any issues with this integration, contact [support@split.io](mailto:support@split.io).
