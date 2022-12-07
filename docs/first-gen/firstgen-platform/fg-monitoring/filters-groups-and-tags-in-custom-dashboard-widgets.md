---
title: Filters, Groups, and Tags in Primary and Custom Widgets
description: Many Primary Widget and Custom Widget types offer you the option to filter and/or group by multiple Harness entities and Tags. This provides flexibility to define and display complex relationships am…
# sidebar_position: 2
helpdocs_topic_id: r8678luoeo
helpdocs_category_id: d53e6970ow
helpdocs_is_private: false
helpdocs_is_published: true
---

Many [Primary Widget](/article/xmho7wqlo6-primary-widgets#next_steps) and [Custom Widget](#custom_widgets/article/qjsd7uzgp2-custom-widgets#custom_widget_types) types offer you the option to filter and/or group by multiple Harness entities and [Tags](/article/nrxfix3i58-tags). This provides flexibility to define and display complex relationships among your data. However, sometimes because of over-filtering, the desired data gets hidden or an unwarranted **No Data!** error is returned. 

Filter conditions are not validated when you preview, create, or update a Widget. Therefore, as you add filter conditions and filter values, consider the points outlined in this topic.

In this topic:

* [Before You Begin](https://docs.harness.io/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets#before_you_begin)
* [Add Data Filter](https://docs.harness.io/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets#add_data_filter)
* [Tag Filters](https://docs.harness.io/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets#tag_filters)
* [Tips](https://docs.harness.io/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets#tips)

### Before You Begin

* [Custom Dashboards](/article/rxlbhvwe6q-custom-dashboards)
* [Primary Widgets](/article/xmho7wqlo6-primary-widgets)
* [Custom Widgets](/article/qjsd7uzgp2-custom-widgets)
* [Create and Manage Custom Dashboards](/article/zbe3yyssa6-create-and-manage-dashboards)
* [Add and Configure Primary Widgets](/article/906fuf04ne-add-and-configure-dashboard-widgets)
* [Add and Configure Custom Widgets](/article/0hgsfuoojo-modify-existing-widgets-and-dashboards)

### Add Data Filter

Click **Add Data Filter** to begin defining a filter. Use the resulting **Select Filter Type** drop-down to select which Harness entity or Tag to use as the filter.

![](https://files.helpdocs.io/kw8ldg1itf/other/1569367088939/image.png)In most Widgets, the **Add Data Filter** link remains available to add more filters. Multiple filter rows combine using AND search logic. Each filter that you add can further narrow the returned data.

![](https://files.helpdocs.io/kw8ldg1itf/other/1569367803657/image.png)The adjacent **Select Filter Values** drop-down allows multiple selections. Within a given filter, values combine using OR search logic. Each value that you add can broaden the data retrievable with this filter.

![](https://files.helpdocs.io/kw8ldg1itf/other/1568847340918/image.png)

|  |  |
| --- | --- |
| To remove a filter, click the trash-can icon at its right. |  |

### Tag Filters

Each Tag filter can target only a single entity type (**Application**, **Environment**, or **Service**). To filter on one or more Tags across *multiple* entities, add more filter rows.

Remember that the AND logic among the rows will further restrict your retrieved data.![](https://files.helpdocs.io/kw8ldg1itf/other/1568849034043/image.png)### Tips

Here are some tips about how to avoid unintended filter results.

* Adding a filter target with *no* filter value doesn't restrict the Widget's data. The incomplete examples below don't actually function as filters.![](https://files.helpdocs.io/kw8ldg1itf/other/1568848851925/image.png)
* Do not filter on an entity name, or Tag value, that's not used on the Harness entity (**Metric**) you're charting. This will generate a **No Data!** error when you preview, create, or update the Widget.![](https://files.helpdocs.io/kw8ldg1itf/other/1568861808068/image.png)

