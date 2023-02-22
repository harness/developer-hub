---
title: Harness Feature Flag as change source
description: Learn how to add Harness Feature Flag as change source.
sidebar_position: 40
---


You can add Harness Feature Flag as a change source. This helps you monitor the impact of feature flag on service health. The following steps explain how to add feature flag as a change source.

1. In your Harness project, navigate to the **Feature Flag** module, and then select **Feature Flags**.  
   A list of all your feature flags is displayed.
2. Select the feature flag that you want to add as a change source.  
   For example, my flag.
   The settings page of the new feature flag appears.
3. In the **Services** section, select the pencil icon next to the **Services**.  
   The Monitored Service dialog appears.
4. Select the monitored service to which you want to add the feature flag as a change source. You can add feature flag as change source to multiple monitored services. 
5. Select **Save**.  
   The feature flag gets configured as a change source for the monitored service that you selected.  
   
The monitored service that you selected appears in the **Services** section.

When the feature flag is turned off or on, a change event is recorded in the monitored service.

The following figure shows an event getting recorded in the Service Health page of monitored service when the feature flag is turned on.
