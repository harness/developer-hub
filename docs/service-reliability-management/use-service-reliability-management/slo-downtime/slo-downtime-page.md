---
title: View SLO downtimes and history
description: View all your configured SLO downtimes and history.
sidebar_position: 30
---

:::info note
Currently, this feature is behind the feature flag `SRM_DOWNTIME`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


The SLO downtime page displays information about all the configured SLO downtimes.


## SLO downtime page

To view the SLO downtime list:

1. In your Harness project, navigate to the **Service Reliability Management** module, expand **PROJECT SETUP**, and then select **SLO Downtime**.  
   The SLO Downtime page appears.

   ![SLO Downtime page](./static/slo-downtime-page.png)
   
On the SLO Downtime page, you can view a list of all your configured SLO downtimes. For each downtime, the page displays details such as its current status, name, window of time during which it applies, duration, affected services, downtime category, and the user who last modified the SLO downtime.

You can filter the list using the **Monitored Services** filter.


## History page

To go to the History page, select the **History** tab.  

The History page shows all the downtimes that have occurred in the past, including recurring SLO downtimes. For each downtime, the page displays details such as its name, start time, end time, duration, affected services, and downtime category.

You can filter the list using the **Monitored Services** filter.


## Next Steps

Learn how to [manage SLO downtime](/docs/service-reliability-management/use-service-reliability-management/slo-downtime/manage-slo-downtime.md).