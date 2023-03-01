---
title: Connect Harness Feature Flag to a monitored service
description: Learn how to connect Harness Feature Flag to a monitored service.
sidebar_position: 40
---


You can connect Harness Feature Flag to a monitored service. This helps you monitor the impact of feature flag status change on the service health. The following steps explain how to connect a feature flag to a monitored service.

1. In your Harness project, navigate to the **Feature Flag** module, and then select **Feature Flags**.  
   A list of all your feature flags is displayed.

   ![Feature Flag list](./static/change-impact-view-ff-navigation.png)

2. Select the feature flag that you want to connect to a monitored service.  
   The feature flag settings page appears.

   ![Feature Flag Settings](./static/change-impact-view-ff-settings.png)


3. In the **Services** section, select the pencil icon next to the **Services**.  
   The Monitored Service dialog appears.
4. Select the monitored service to which you want to connect the feature flag. You can connect a single feature flag to multiple monitored services.
   ![Select Monitored Service](./static/change-impact-view-ff-select-monitoredservice.png)

5. Select **Save**.  
   The feature flag gets connected to the monitored service that you selected.  
   
The monitored service that you selected appears in the **Services** section.

Whenever the feature flag is turned off or on, a change event is recorded in the Service Health page of the monitored service.

The following figure shows an event getting recorded in the Service Health page of the monitored service when the feature flag is turned on.

![FF event generated](./static/change-impact-view-ff-event-generated.png)