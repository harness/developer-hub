---
title: Dynatrace
description: Add Dynatrace health source to a monitored service.
sidebar_position: 5

---

# Configure Dynatrace as health source

In Harness, a health source is a mapping that connects a Service in Harness to a service running in a deployment environment that is being monitored by an Application Performance Monitoring (APM) or logging tool. This mapping allows Harness to collect metrics and data from the APM or logging tool and use it to determine the health and status of the Service in Harness.

This topic describes how to add Dyanatrace as a health source to Harness monitored service.


## Prerequisite

Before configuring Dynatrace as a health source, ensure the following:

- Label the metrics as [key requests](https://www.dynatrace.com/support/help/platform-modules/applications-and-microservices/services/analysis/monitor-key-requests) in your Dynatrace queries to enable Harness to access Dynatrace metrics via the Dynatrace API.

- In your Dynatrace queries, set the entity selector for metrics to a service or service method.

- In your Harness account, add a [Dynatrace connector](/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems#add-dynatrace) to facilitate integration with Harness.



## Add Dynasource as health source

To add Dynatrace as a health source to a monitored service:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.
   
   A list of monitored services appears.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select Edit service. The Configurations page appears. 

3. Go to the **Health Sources** tab and select **+ Add New Health Source**.
   
   The Add New Health source page appears.


### Select Dynatrace and connector

To select Dynatrace as health source and a Dynatrace connector, perform the following steps:

   
1. Select Dynatrace as the **health source type**, and enter a name for the health source.
   
2. Select a Dynatrace connector and then select **Next**.


### Configure metrics

On the Configuration tab, specify the metrics to receive from Dynatrace. You can either choose a prebuilt metric pack or build your own Dynatrace query to receive the metrics.

- **Select a prebuilt metric pack**
  
   1. On the Configuration tab, from the **Find a Dynatrace Service** dropdown, select a Dynatrace service that you wish to configure with Harness monitored service.
      
   2. Select a **Metric Pack**. You can either choose **Infrastructure** or **Performance**. These are predefined metric queries by Harness to suit your specific needs.
      
- **Configure custom metrics**

   1. In the **Custom Metrics (optional**) section, select **Add Metric**.

   2. Enter a name for the metric.

   3. Expand Query Specifications and mapping and just copy and paste the query that you have created in your Dynatrace account.


### Save settings

- Select **Submit** to save the configuration settings.
  
 Dynatrace now appears in the list of configured health sources.
