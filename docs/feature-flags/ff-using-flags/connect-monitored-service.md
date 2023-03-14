---
title: Connect Flags to Monitored Services
description: This topic describes how to connect flags to monitored services to see the impact of flags states on service health.
tags: 
   - feature flag
   - monitored services
sidebar_position: 34
---

You may want to monitor your services to be notified when there are issues related to flag changes. To do this, you can connect a feature flag to a monitored service. A monitored service is a combination of a Service and Environment that Harness monitors for changes and events, as well as health trends. Connecting a feature flag to the service lets you analyze how service health is impacted by a feature. For more information on monitored services, go to [Service Reliability Management (SRM)](/docs/service-reliability-management).

For example, with a Harness SRM subscription you can access the **Service Health** and **Changes** dashboards to observe the health of your services and to correlate change events to service health.
Then, if you want to see how a new feature impacts services, you can put the new feature behind a feature feature flag and connect that flag to one or more monitored services. You can then use SRM to see the impact on the selected service(s) when you turn the flag on or off .

For more information on monitored services, go to these topics to:

* [Create a monitored service](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-quickstart)
* [Use the **Service Health** dashboard](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-service-health-dashboard)
* [Use the **Changes** dashboard](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-changes-dash-board)
