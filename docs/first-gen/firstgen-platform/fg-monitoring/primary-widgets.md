---
title: Primary Widgets
description: The Harness Primary Widget Library gets you started by offering the following predefined visualizations of popular DevOps metrics --  Most-Active Services. Change Failure Rate. Deployment History. Lead…
# sidebar_position: 2
helpdocs_topic_id: xmho7wqlo6
helpdocs_category_id: d53e6970ow
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Primary Widget Library gets you started by offering the following predefined visualizations of popular DevOps metrics:

* Most-Active Services
* Change Failure Rate
* Deployment History
* Lead Time to Production
* Deployment Frequency
* Mean Time to Restore

![](https://files.helpdocs.io/kw8ldg1itf/articles/xmho7wqlo6/1596707814303/screenshot-2020-08-06-at-3-26-28-pm.png)In this topic:

* [Before You Begin](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#before_you_begin)
* [Most-Active Services](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#most_active_services)
* [Change Failure Rate](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#change_failure_rate)
* [Deployment History](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#deployment_history)
* [Lead Time to Production](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#lead_time_to_production)
* [Deployment Frequency](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#deployment_frequency)
* [Mean Time to Restore](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#mean_time_to_restore)
* [Artifacts and Build Numbers](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#artifacts_and_build_numbers)
* [Next Steps](https://docs.harness.io/article/xmho7wqlo6-primary-widgets#next_steps)

### Before You Begin

* [Custom Dashboards](/article/rxlbhvwe6q-custom-dashboards)
* [Custom Widgets](/article/qjsd7uzgp2-custom-widgets)
* [Filters, Groups, and Tags in Primary and Custom Widgets](/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets)

On most Widgets, authorized users can click chart segments to access detailed underlying data.### Most-Active Services

This Widget corresponds to the horizontal bar chart that appears on Harness'  [Main Dashboard](https://docs.harness.io/article/xldc13iv1y-meet-harness#main_dashboard). This Widget displays the Services that are most frequently deployed in your Environment. It graphs the deployment activity of your Harness Services, in descending order. This version is customizable by data refresh interval.

Each bar's length indicates the number of times each Service has been deployed. Colored bands show a breakdown by deployment status. (Scroll to the Widget's bottom to display a legend by color.)

For this Widget, Harness Services are the only entity available for measurement and Applications are the only available filters.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568266938000/image.png)### Change Failure Rate

This Widget displays Services with the highest failure rates. It visually ranks your Harness Services by their consistency of deployment success, in descending order. You can customize the chart's data refresh interval.

For this Widget, Harness Services are the only entity available for measurement. You can filter on Applications, Environments, and Service Tags.

![](https://files.helpdocs.io/kw8ldg1itf/other/1571298740500/image.png)When you click on a Service, you get the deployments for that Service. When you hover over the FAILED status, you get the error for the first failed step in the Workflow or stage in the Pipeline.

![](https://files.helpdocs.io/kw8ldg1itf/articles/xmho7wqlo6/1619544555638/image.png)Clicking the failed deployment jumps you right to the failed step in the Workflow, with the first failure information displayed clearly:

![](https://files.helpdocs.io/kw8ldg1itf/articles/xmho7wqlo6/1619544686356/image.png)### Deployment History

This Widget displays the recent successful deployments, failed deployments, and associated instances. The Widget is a customizable (by time range) version of the Deployments bar chart that appears on Harness' [Main Dashboard](/article/xldc13iv1y-meet-harness#main_dashboard).

For this Widget, deployments are the only entity available for measurement, and time intervals are the only available filters.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568267025509/image.png)### Lead Time to Production

This Widget displays the average duration of deployments by Application, Service, or Tag over a selectable time range. The display shows one diamond node for each Application.

For this Widget, deployments are the only entity available for measurement. You can filter on multiple Harness entities and Tags.

![](https://files.helpdocs.io/kw8ldg1itf/other/1569961800022/image.png)### Deployment Frequency

This line chart shows the daily frequency of deployments by Application, Service, or Tag. You can customize the Time Filter (range) and can filter on multiple Harness entities and Tags.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568267136686/image.png)### Mean Time to Restore

This line chart shows the average rollback duration by Application, Service, or Tag. You can customize the Time Filter (range), and can filter on multiple Harness entities and Tags.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568267175602/image.png)### Artifacts and Build Numbers

The dashboard that uses a Primary Widget has Artifact and Build Number in its detail view. For example, here is a Most Active Services dashboard:

![](https://files.helpdocs.io/kw8ldg1itf/articles/rxlbhvwe6q/1589235551293/image.png) When you click the dashboard, you see the **Artifacts** details.

![](https://files.helpdocs.io/kw8ldg1itf/articles/rxlbhvwe6q/1589235762972/image.png)### Next Steps

* [Create and Manage Custom Dashboards](/article/zbe3yyssa6-create-and-manage-dashboards)
* [Add and Configure Primary Widgets](/article/906fuf04ne-add-and-configure-primary-widgets)
* [Add and Configure Custom Widgets](/article/0hgsfuoojo-configure-custom-widgets)

