---
title: Configure CloudWatch as health source
sidebar_label: CloudWatch
description: Add CloudWatch health source to a monitored service.
sidebar_position: 2
---

:::info note

Currently, this feature is behind the feature flag `SRM_ENABLE_HEALTHSOURCE_CLOUDWATCH_METRICS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

In Harness, a health source is a mapping that connects a Service in Harness to a service running in a deployment environment that is being monitored by an Application Performance Monitoring (APM) or logging tool. This mapping allows Harness to collect metrics and data from the APM or logging tool and use it to determine the health and status of the Service in Harness.
This topic describes how to set up CloudWatch as a health source in a monitored service.


## Prerequisites

- CloudWatch connector has been added to the Harness platform.
- A monitored service has already been created in the Harness SRM.

## Add CloudWatch health source

To add CloudWatch as a health source:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select **Edit service**.  
   The Configurations page appears.

3. Go to the **Service** tab, and under **Define Your Sources**, select **+ Add New Health Source**.  
   
   ![](./static/verify-deployments-with-cloudwatch-114.png)

4. In **Select health source type**, select **CloudWatch**.
5. 3. In **Health Source Name**, enter a name for the Health Source.
6. Under **Connect Health Source**, click **Select Connector**.
7. In **Connector** settings, you can either choose an existing connector or click **New Connector.**
   
   ![](./static/verify-deployments-with-cloudwatch-115.png)

8. Click **Apply Selected**. The Connector is added to the Health Source.
9. In **Select Feature**, select the CloudWatch feature to be used.
10. Click **Next**.  
The **Customize Health Source** settings appear.  
You can customize the metrics to map the Harness Service to the monitored environment in **Query Specifications and Mapping** settings. The subsequent settings in **Customize Health Source** depend on the Health Source Type you selected. Click **Map Queries to Harness Services** dropdown.
11. Select the **AWS Region**.
12. Click **Add Metric**.
13. Enter a name for the query in **Name your Query**.
14. Click **Select Query** to select a saved query. This is an optional step. You can also enter the query manually in the **Query** field.
15. Click **Fetch Records** to retrieve the details. The results are displayed under **Records.**
   
   ![](./static/verify-deployments-with-cloudwatch-116.png)
   
15.  Once the records are fetched, click the plus icon in **Identify Service Instance** to select the path for service instance.
16.  Click **Submit**. The CloudWatch health source gets added to the monitored service.
   
   ![](./static/verify-deployments-with-cloudwatch-117.png)

You can add multiple health sources.

