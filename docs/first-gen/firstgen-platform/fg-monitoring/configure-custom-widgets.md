---
title: Add and Configure Custom Widgets
description: You can add Primary and Custom Widgets to your Custom Dashboards. Custom Widgets offer less predefined structure than Primary Widgets but offers more flexibility. In this topic --  Before You Begin. Ste…
# sidebar_position: 2
helpdocs_topic_id: 0hgsfuoojo
helpdocs_category_id: d53e6970ow
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add [Primary](/article/xmho7wqlo6-primary-widgets) and [Custom](/article/qjsd7uzgp2-custom-widgets) Widgets to your Custom Dashboards. Custom Widgets offer less predefined structure than Primary Widgets but offers more flexibility.

In this topic:

* [Before You Begin](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#before_you_begin)
* [Step: Add Custom Widgets](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#step_add_custom_widgets)
* [Step: Configure Custom Widgets](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#step_configure_custom_widgets)
* [Step: Configure Services Widget](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#step_configure_services_widget)
* [Step: Configure Workflows Widget](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#step_configure_workflows_widget)
* [View/Edit Widgets](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#view_edit_widgets)
* [Remove Widgets](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#remove_widgets)
* [Next Steps](https://docs.harness.io/article/0hgsfuoojo-configure-custom-widgets#next_steps)

### Before You Begin

* [Custom Dashboards](/article/rxlbhvwe6q-custom-dashboards)
* [Primary Widgets](/article/xmho7wqlo6-primary-widgets)
* [Custom Widgets](/article/qjsd7uzgp2-custom-widgets)
* [Filters, Groups, and Tags in Primary and Custom Widgets](/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets)

### Step: Add Custom Widgets

Ensure that you select entities that contain deployment data.

For example, if you select a Workflow with only **Pre-deployment** and **Post-deployment** steps but no deployment Phases, it will not have data on deploying a Service because no Service is used. Also, this Workflow might have an Environment in its setup, but that Environment won't be used because there is no deployment Phase. Hence, there will be no Environment data to display.

In such a case, the custom dashboard columns will be null.

To add Custom Widgets, perform the following steps:

1. Click **Add Widget** at the dashboard's upper right corner to populate or expand a Custom Dashboard. For more information, see [Edit a Dashboard](/article/zbe3yyssa6-create-and-manage-dashboards#step_edit_or_clone_a_dashboard).![](https://files.helpdocs.io/kw8ldg1itf/other/1567818887659/image.png)
2. Select **Custom Widgets**.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596729229060/screenshot-2020-08-06-at-9-23-19-pm.png)
3. Select the [Custom Widget Types](/article/qjsd7uzgp2-custom-widgets#custom_widget_types).
4. Select a visualization type.

### Step: Configure Deployments Widget

Deployments widget display and visualize your deployment data and patterns.

First, you need to **Configure Your Widget** (required) and then **Format Graph Display** (optional).

The available options will vary depending on your Widget Type selection.  
  
This document uses **Deployment Widget Type** and **Donut Visualization Type** to demonstrate the steps required to configure the Widget.#### Configure Your Widget

1. In **Configure Your Widget**, in **Widget Title**, enter a title for your widget.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596796020927/screenshot-2020-08-07-at-10-59-31-am.png)

The widgets with the **Time Filter** option can now show data for up to a year.  
  
Currently, this feature is in Beta and behind a Feature Flag. Contact [Harness Support](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it is available for Trial and Community Editions.1. Select the **Time Filter**.  
  
In **Deployments** and **Instances** Custom Widget type, for a bar chart, line chart, and area chart, you can select the following options in **Time Filter**:  
  
- Show Last 1 Hour Data  
- Show Last 24 Hours Data  
- Show Last 7 Days Data  
- Show Last 30 Days Data  
- Show Last 6 Months Data  
- Show Last 1 Year Data![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596740217758/screenshot-2020-08-07-at-12-26-29-am.png)
2. In **Apply Time Filter on**, select **Start Time** or **End Time**.  
  
If you select **Start Time**, then you will have two additional intermediate [Status](/article/0hgsfuoojo-configure-custom-widgets#status), **Running** and **Paused**.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596796584849/screenshot-2020-08-07-at-4-06-05-pm.png)
3. In **Filter Data**, **Add Data Filter**. For more information on filters, see [Filters, Groups, and Tags](https://docs.harness.io/article/r8678luoeo-filters-groups-and-tags-in-custom-dashboard-widgets).
4. In **Select Filter Type**, select the filter. You can select:
* **Application**
* **Service**
* **Environment**
* **Environment Type**
* **Cloud Providers**
* **Status**
* **Tag** (**Application**)
* **Tag** (**Service**)
* **Tag** (**Environment)**
* **Tag** (**Deployment**).

Filter values are listed based on your Filter type selection.

You can add up to nine data filters.##### Tags

Ensure you are familiar with Harness Tags and using variables expressions in Tag names and values. See [Use Expressions in Workflow and Pipeline Tags](/article/285bu842gb-use-expressions-in-workflow-and-pipeline-tags).

This can be a very powerful method for creating Custom Dashboards. For example, let's say you had a Workflow or Pipeline Tag named **commitID**. The value for it is passed in as an expression, such as `${workflow.variables.commitID}`. You could provide the value for the variable using [a Trigger that passes in a Git commit ID](/article/revc37vl0f-passing-variable-into-workflows).

When you deploy, the expression is evaluated and the commit ID is displayed in **Deployments** like **commitID:521747298a3790fde1710f3aa2d03b55020575aa**.

Now, you can create a Custom Dashboard for the name **commitID** that filters or groups deployments by each commit ID.

* You can create a Harness Custom Dashboard that filters or groups using Tags that use expressions.
* You can use a Tag whose name or value uses an expression, but you can only filter or group by Tag *name*.
* You cannot use the expression itself to filter or group. You must use the evaluated expression displayed in Harness **Deployments**.

##### Status

For **Status** the following terminal statuses are available:

* **Rejected**: Filters the rejected deployments.
* **Expired**: Filters the expired deployments.
* **Error**: Filters the deployments with errors. This status filters the deployments with unforeseen circumstances, for example, delegate not available, corrupted data, etc.
* **Failed**: Filters the failed deployments. This status filters the deployments that might have failed because of health check or configuration issues.
* **Success**: Filters the successful deployments.
* **Aborted**: Filters the aborted deployments.![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596783422394/screenshot-2020-08-07-at-12-25-20-pm.png)
1. In **Metric**, select **Count**, **Time Taken**, or **Rollback Time Taken**.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596797720226/screenshot-2020-08-07-at-4-24-59-pm.png)
2. In **Group By** select, **Group by Entity** or **Group by Tag**.
	1. **Group by Entity**: Select **Application**, **Environment**, **Environment Type**, **Service**, **Status**, or **Cloud Provider**.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596798109652/screenshot-2020-08-07-at-4-30-25-pm.png)
	2. **Group by Tag**: Select **Tag (in Application)**, **Tag (in Service)**, **Tag (in Environment),** or **Tag (in Deployment)**.![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1596798252219/screenshot-2020-08-07-at-4-33-53-pm.png)
	3. Select the **Tag Name**.![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596741705610/screenshot-2020-08-07-at-12-51-26-am.png)

You can use the added **Second Group By** option for **Bar Chart**, **Line Chart** and **Area Chart** to display a time series, or you can plot an X/Y relationship among two entities or Tags.

For example, if you selected **Filter Data: Environment Type: Production, Non-Production** and **Group By: Application** you will see each Applications for Production and Non-Production Environments, but they are separated by Environment Type:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621447279998/image.png)If you select **Second Group By: Environment Type**, you can see the same Applications grouped by Environment Type:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621447355285/image.png)#### Format Graph Display

1. In **Define Data Refresh Interval**, select the interval. The default value of **Define Data Refresh Interval** is **Never**.![](https://files.helpdocs.io/kw8ldg1itf/other/1569366748659/image.png)
2. Once you have configured the Widget, click **Create Widget**.

### Step: Configure Applications Widget

The Applications widget displays data about your Harness Applications.

#### Configure Your Widget

1. In **Widget Title**, enter a title for your widget.![](https://files.helpdocs.io/kw8ldg1itf/articles/2853nrayap/1615806217710/image.png)
2. In **Group By**, select **Tag (in Application).** For more information on tags, see [Manage Tags](https://docs.harness.io/article/mzcpqs3hrl-manage-tags).  
  
**Tag (in Application)** is available for **Donut** and **Bar Chart** visualization types only.![](https://files.helpdocs.io/kw8ldg1itf/articles/2853nrayap/1616061411348/image.png)
3. In **Tag Name**, select the name of the tag.![](https://files.helpdocs.io/kw8ldg1itf/articles/2853nrayap/1616061267199/image.png)

#### Format Graph Display

1. In **Define Data Refresh Interval**, select the interval. The default value is **Never.**![](https://files.helpdocs.io/kw8ldg1itf/other/1569366748659/image.png)
2. Once you have configured the Widget, click **Create Widget**.

### Step: Configure Services Widget

The Services widget displays data about your Harness Services.

For example, you can filter by the Service deployment type:

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621447646803/image.png)This filter will display all of the Harness Services by deployment type (this also uses **Second Group By: Deployment Type**):

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621447726174/image.png)Clicking any of the bars will drill down to show the deployments of that type.

### Step: Configure Workflows Widget

This widget displays data about your deployment Workflows.

For example, you can filter by Workflow Type (strategy used by a Workflow):

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621448097743/image.png)This filter will display all of the Harness Workflow by Workflow type (this also uses **Second Group By: Workflow Type**):

![](https://files.helpdocs.io/kw8ldg1itf/articles/0hgsfuoojo/1621448146375/image.png)### View/Edit Widgets

[Account Administrators](#administrators) can edit the existing Widgets.

1. Click Widget's More Options •••.![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596742782491/screenshot-2020-08-07-at-1-09-21-am.png)
2. Select **View/****Edit**. This reopens controls for [Add Primary Widgets](https://docs.harness.io/article/906fuf04ne-add-and-configure-dashboard-widgets#step_add_primary_widgets). You can follow the [Add Primary Widgets](https://docs.harness.io/article/906fuf04ne-add-and-configure-dashboard-widgets#step_add_primary_widgets) steps to edit the configurations.
3. Once you have configured the Widget, click **Update Widget**.

### Remove Widgets

[Account Administrators](#administrators) can Remove the existing Widgets. **Remove** deletes the Widget from this Custom Dashboard.

If you've customized the Widget's configuration, this also removes that configuration from your Harness account. This action cannot be undone. Consider first cloning a backup copy of the current dashboard.1. In Widget, click More Options •••.![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596742782491/screenshot-2020-08-07-at-1-09-21-am.png)
2. Select **Remove**.![](https://files.helpdocs.io/kw8ldg1itf/articles/906fuf04ne/1596742984376/screenshot-2020-08-07-at-1-12-19-am.png)
3. Click **Delete** to remove the Widget.

### Next Steps

* [Add and Configure Primary Widgets](/article/906fuf04ne-add-and-configure-primary-widgets)

