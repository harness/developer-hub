---
title: Custom Widgets
description: Custom Widgets offer less predefined structure than Primary Widgets but offers more flexibility. When configuring Custom Widgets --  First, you select a principal Harness entity that you want to analyze…
# sidebar_position: 2
helpdocs_topic_id: qjsd7uzgp2
helpdocs_category_id: d53e6970ow
helpdocs_is_private: false
helpdocs_is_published: true
---

Custom Widgets offer less predefined structure than Primary Widgets but offers more flexibility. When configuring Custom Widgets:

* First, you select a principal Harness entity that you want to analyze, such as, Deployments, Instances, Services, etc.
* Next, select a visualization type, such as a bar chart, line chart, etc.
* Finally configure details, including visual formatting, time range, groupings, and additional filters.

In this topic:

* [Before You Begin](https://docs.harness.io/article/qjsd7uzgp2-custom-widgets#undefined)
* [Custom Widget Types](https://docs.harness.io/article/qjsd7uzgp2-custom-widgets#custom_widget_types)
* [Visualization Types](https://docs.harness.io/article/qjsd7uzgp2-custom-widgets#visualization_types)
* [Next Steps](https://docs.harness.io/article/qjsd7uzgp2-custom-widgets#next_steps)

### Before You Begin

* [Custom Dashboards](https://docs.harness.io/article/rxlbhvwe6q-custom-dashboards)
* [Primary Widgets](/article/xmho7wqlo6-primary-widgets)
* [Filters, Groups, and Tags in Primary and Custom Widgets](/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets)

### Custom Widget Types

The following entities are available at the top level. Harness considers each to be a Custom Widget type:



|  |  |
| --- | --- |
| * Deployments
* Instances
* Services
* Environments
* Workflows
 |  * Pipelines
* Triggers
* Applications
* Cloud Providers
* Connectors
 |

### Visualization Types

If you're a [non-Administrator](#non_administrators), your access to the detailed data and settings behind the visualizations is filtered by your User Group memberships and permissions.Under each Custom Widget type, a row of buttons enables you to select a supported visualization type. You'll see some or all of these options, depending on which entity you're selecting:



|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| Donut Chart | Bar Chart | Line Chart | Area Chart | Aggregate Value |

#### Donut Chart

When displaying Deployments as a donut chart, if you **Group By** a granular entity (such as Services, Environments, or Cloud Providers) or Tag, the displayed count can increase. This is because the display now includes the count for these entities or Tags.

![](https://files.helpdocs.io/kw8ldg1itf/articles/qjsd7uzgp2/1596717474228/screenshot-2020-08-06-at-6-05-20-pm.png)#### Bar Chart

Compared to a donut chart, a bar chart provides more ways to define and display your data. Using the added **Second Group By** option, you can display a time series, or you can plot an X/Y relationship among two entities or Tags.

![](https://files.helpdocs.io/kw8ldg1itf/articles/qjsd7uzgp2/1596717494114/screenshot-2020-08-06-at-6-05-31-pm.png)#### Line Chart and Area Chart

For this visualization type, the **Second Group By** setting must always be a time interval, building a time series. Use the **Group By** field to break down the displayed totals by any entity or Tag you want.

![](https://files.helpdocs.io/kw8ldg1itf/articles/qjsd7uzgp2/1596717521036/screenshot-2020-08-06-at-6-05-41-pm.png)#### Area Chart

For this visualization type, the **Second Group By** setting must always be a time interval, building a time series. Use the **Group By** field to break down the displayed totals by any entity or Tag you want.

![](https://files.helpdocs.io/kw8ldg1itf/articles/qjsd7uzgp2/1596717570201/screenshot-2020-08-06-at-6-06-01-pm.png)#### Aggregate Value

This visualization type **(**selectable with a "**21**” icon**)** simply displays a Total Count. It offers no **Group By** options and no clickable chart segments, but users can click its **View Details** link to pass through to the Harness Manager details aggregated in the total.

![](https://files.helpdocs.io/kw8ldg1itf/articles/qjsd7uzgp2/1596717588004/screenshot-2020-08-06-at-6-06-15-pm.png)### Next Steps

* [Create and Manage Custom Dashboards](https://docs.harness.io/article/zbe3yyssa6-create-and-manage-dashboards)
* [Add and Configure Primary Widgets](https://docs.harness.io/article/906fuf04ne-add-and-configure-primary-widgets)
* [Add and Configure Custom Widgets](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets)

