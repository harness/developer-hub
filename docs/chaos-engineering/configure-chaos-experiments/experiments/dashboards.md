---
title: Use the chaos dashboards
sidebar_position: 80
---

Harness Chaos Engineering (HCE) comes with out-of-the-box dashboards that provide various aggregated views of data about your chaos experiments at an organization level. This includes experiments across all projects and environments in an organization.

With Harness dashboards, you can:

* Edit, customize, and create your own custom dashboards. 
* Download data in multiple formats to use in other tools. 
* Schedule delivery and set up alerts on dashboard data.  

For a complete guide to Harness dashboards, go to [Dashboards](/docs/category/dashboards-1).

This topic provides some highlights and useful information about the HCE dashboards.

## HCE dashboard highlights

### View the dashboards

To view the HCE dashboards: 

1. In Harness, select **Dashboards** in the left navigation pane.
1. In the Dashboards page, select **Chaos**, and then choose one of the chaos dashboards.

On the dashboard, you can: 

* Hover over elements of a chart with your mouse to view details.
* Select different areas of the charts to view information in tabular form, and download it to use in other tools.
* Schedule delivery of the dashboard data to email addresses.
* Set up alerts to be notified when specific data changes.
* Clone a dashboard to customize it for different needs and audiences.


### View experiment runs by users


### View chaos infrastructures by users


## Download, schedule, and share dashboard data

You can download data in many formats to use in other tools, and you can schedule delivery of data to share with others in email.

### Download data

You can download the entire dashboard or individual charts.

#### To download the entire dashboard:

Select the **Dashboard actions** icon at the top of the dashboard, select **Download**, and then modify the settings as needed.

![Dashboard actions icon circled in red at top right of dashboard](./static/dashboards/dashboard-download-data-top1.png)

#### To download a chart:

Select the **Tile actions** icon at the top of the chart, select **Download data**, and then modify the settings as needed.


### Schedule and share data

You can schedule delivery of the dashboard data to share with one or more email addresses.

To schedule delivery of dashboard data:

1. On your dashboard, select the **Dashboard actions** icon at the top, and then choose **Schedule delivery**.

	![The Schedule Delivery dialog with 3 tabs: Settings, Filters, Advanced options.](./static/dashboards/dashboard-sched-delivery.png)

1. Adjust the **Settings**, **Filters**, and other options as needed.
1. (Optional) Select **Test now** to test these settings.
1. Select **Save**.

## Alert on dashboard data

You can set up alerts on any chart by selecting the alert icon, and then modifying the alert settings for that chart.

IMAGE HERE

## Create a custom dashboard

You can clone and modify existing dashboards or create new ones. 

### Clone and modify an existing dashboard

To clone a dashboard:

1. Find the dashboard, select the actions icon, and then select **Clone**.

	IMAGE HERE ./static/dashboards/dashboard-clone.png

1. Select a **Folder**, provide a dashboard **Name** and optional **Tags**, and then select **Continue**.

	The new dashboard appears on the **Dashboards** page.

1. To customize it, select your new dashboard, then select the **Dashboard actions** icon at the top, and then choose **Edit dashboard**.

	IMAGE HERE ./static/dashboards/dashboard-actions-icon.png

1. In the edit view, click the **Tile actions** icon on any chart to customize, hide, delete, or duplicate it.

	IMAGE HERE ./static/dashboards/dashboard-edit.png

### Create a new dashboard

For detailed instructions for creating dashboards, go to these topics:

* [Best practices for building dashboards](/docs/platform/Dashboards/dashboard-best-practices)
* [Create dashboards](/docs/platform/Dashboards/create-dashboards)
* [Add custom fields](/docs/platform/Dashboards/add-custom-fields)
* [Create visualizations and graphs](/docs/platform/Dashboards/create-visualizations-and-graphs)



