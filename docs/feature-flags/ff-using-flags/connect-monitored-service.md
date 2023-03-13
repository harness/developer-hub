---
title: Connect Flags to Monitored Services
description: This topic describes how to connect flags to monitored services to see the impact of flags states on service health.
tags: 
   - feature flag
   - monitored services
sidebar_position: 34
helpdocs_topic_id: iijdahygdm
helpdocs_category_id: jqfkw27d3u
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness [Service Reliability Management (SRM)](/docs/service-reliability-management/howtos-service-reliability-management/service-reliability-management-basics) module provides tools to help meet Service Level Objectives (SLOs) and identify root causes of changes to service health. You can use Feature Flags with SRM to analyze how service health is impacted by a feature.

For example, with a Harness SRM subscription you can access the **Service Health** and **Changes** dashboards to observe the health of your services and to correlate change events to service health.
Then, if you want to see how a new feature impacts services, you can put the new feature behind a feature feature flag and connect that flag to one or more monitored services. You can then use SRM to see the impact of turning the flag on or off on the selected service(s).

Follow the instructions in these topics to:

* [Connect a feature flag to a monitored service](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-add-featureflag)
* [Create a monitored service](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-quickstart)
* [Use the **Service Health** dashboard](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-service-health-dashboard)
* [Use the **Changes** dashboard](/docs/service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-changes-dash-board)
