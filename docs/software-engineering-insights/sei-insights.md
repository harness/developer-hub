---
title: Insights
description: Insights are dashboards.
sidebar_position: 50
---

Insights are dashboards that make it easy to visualize and interpret metrics that are captured by SEI. With a variety of out-of-the-box widgets, you can create Insights that show the data you care about most and help you understand your engineering team's effectiveness and efficiency. You can also share Insights with your team members.

This topic explains how to create and view SEI Insights. For information about metrics that are captured by SEI and reported on widgets, go to [Metrics and reports](/docs/category/metrics-and-reports).

## View Insights

There are several navigation options for accessing Insights.

:::info

* Attempting to access an unrecognized Insight link redirects you to the SEI module home page where you'll have to select a Collection to proceed to the desired Insight.
* If you're already in a project, going to the SEI module home page automatically presents the Collection category selection page.
* Selecting the **Insights** icon on the navigation menu navigates you to the project's default Insight or the first available Insight in the first Collection category in the current project.
* To enable continuity of though processes and actions, on subsequent logins, you're automatically redirected to the Insight you had accessed before logging off.

:::

1. Log in to the Harness Platform and go to the SEI module.
2. If your organization has multiple projects, select a project.

    If you're already in a project, make sure you're in the correct project for the Collection and Insight that you want to view. You can use the **Project** dropdown menu to switch projects.

<!-- image .gitbook/assets/Workspace selection page- banner updated.png - Propelo home page -->

3. Select the relevant Collection category within the project.

   Admins can access Collection category management options from this page.

<!-- image .gitbook/assets/Collection category selection page.png - Collection category selection page -->

4. Select a Collection. The Insights available for each Collection depend on the [Insight associations](#manage-insights-associations).

<!-- image .gitbook/assets/Collection and Dashboard selection page.pn - Collection and dashboard selection page -->

5. Select an Insight to view it.

<!-- image .gitbook/assets/Dashboard view.png - example of viewing a dashboard -->

### Explore data

Once you're viewing an Insight, you can explore the widgets and interact with the data.

:::info Where does the data come from?

Widgets get data from [integrations](/docs/category/connectors-and-integrations), which are inherited from the [Collections associated with Insights](#manage-insights-associations). In turn, Collections inherit integrations from their associated Harness project, because integrations are configured at the project level. For more information about this hierarchy and configuring Collections, go to [Collections](/docs/category/collections).

You can also configure individual metrics and widgets to specify what data is used in calculations, how data is presented, and other criteria. For more information, go to [Metrics and reports](/docs/category/metrics-and-reports).

:::

#### Set the dashboard time

_Dashboard time_ is the time range selected by the user viewing an Insight. Widgets and reports must be configured to **Use Dashboard Time** in order for their data to update when you change the Insight time range.

If a widget or report uses a specific time range, changing the Insight time has no impact on the data shown by that widget or report.

#### Drill down into data

Some widgets allow you to drill down into data. For example, you can select a segment of a bar on a bar chart to examine the data for that segment.

### Navigate from the Insights header

When viewing Insights, you can use the breadcrumbs, menus, and links in the header to switch Insights and Collections.

<!-- image - .gitbook/assets/Dashboard header 1.png - Dashboard header with indicators for the Collection breadcrumb and the all dashboards dropdown. -->

The header includes direct links to some Insights, as well as an **All Insights** dropdown menu. The **Default** label indicates the Collection's default Insight.

<!-- image .gitbook/assets/Dashboard header 3.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->

:::tip

If integration monitoring is enabled, you can view the integration status in the Insights header.

:::

#### Admin functions in the Insights header

If you're an admin, you can:

* Access **Manage Teams** options from the Collection dropdown menu.
* Access **Manage Insights** options from the **All Insights** dropdown menu.

<!-- image .gitbook/assets/Dashboard header 2.png - Dashboard header with breadcrumb dropdown menu expanded and the Manage Teams button available -->

#### Access Insights from the Insights list

1. While viewing Insights, select **All Insights** in the header, and then select **Manage Insights** to go to the **Insights** list page. <!-- image .gitbook/assets/Dashboard - manage dashboard option.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->
2. Select the Insight you want to view from the **Insights** list. <!-- image .gitbook/assets/Dashboard List page.png - Dashboard list page -->
3. Select a Collection category.
4. Select a Collection. Upon selecting a Collection, the Insight you selected from the **Insights** list opens.

## Create Insights

1. Go to any Insight. For instructions, go to [View Insights](#view-insights).
2. In the header, select **All Insights**, and then select **Manage Insights**. <!-- image .gitbook/assets/Dashboard - manage dashboard option (1).png - Dashboard header with all dashboards expanded and the manage dashboards button available. -->
3. Select **New Insight**. <!-- image .gitbook/assets/Dashboard List page.png - Dashboards list page with New Dashboard button available. -->
4. Enter a **Name** for the Insight.
5. If you want to make this Insight private, make sure **Allow everyone in my organization to view the Insight** is *not* selected.
6. Under **Parameters**, you can modify the following settings:

   * **Dashboard Time Range:** You can enable dashboard time. _Dashboard time_ is the time range selected by the user when viewing an Insight.
   * **Effort Investment Profile** and **Effort Investment Units** are used for [Business Alignment Insights](#create-business-alignment-insights) and [DORA Insights](#create-dora-insights).

7. Select at least one Collection category to associate with this Insight. <!-- image .gitbook/assets/Create dashboard - hover option.png - Create Dashboard dialog -->

   All [Collections](./sei-collections/manage-collections.md) and child Collections under the selected category are automatically associated with the Insight. You can refine the [Insight associations](#manage-insights-associations) after initial Insight creation.

   If you want to examine Collections under a certain Collection category, select **View Collections** on the **Collections Categories** dropdown menu. <!-- image .gitbook/assets/Create dashboard - view Collections (1).png - Collection category details after selecting View Collections -->

8. Select **Create** to save the Insight metadata. Initially, the Insight is empty. From here, you can add widgets or modify the Insight settings. <!-- image .gitbook/assets/View dashboard after creation.png - empty new dashboard -->

:::info Where does the data in widgets come from?

Widgets get data from [integrations](/docs/category/connectors-and-integrations), which are inherited from the [Collections associated with Insights](#manage-insights-associations). In turn, Collections inherit integrations from their associated Harness project, because integrations are configured at the project level. For more information about this hierarchy and configuring Collections, go to [Collections](/docs/category/collections).

You can also configure individual metrics and widgets to specify what data is used in calculations, how data is presented, and other criteria. For more information, go to [Metrics and reports](/docs/category/metrics-and-reports).

:::

### Manage Insights associations

There are two ways to manage the Collections associated with Insights:

* When viewing Insights, select the **Settings** icon, and then select **Collections**.
* From the **Edit Collection** page, edit the **Insights** settings. For more information about this option, go to **Managing Insights associations** in [Manage Collections](./sei-collections/manage-collections.md#manage-insights-associations).

## Create Business Alignment Insights

Business Alignment Insights can help visualize where your teams are expending the most effort and help your teams prioritize their time.

To create a Business Alignment Insights, select the **Effort Investment Profile** option under **Parameters** when [creating Insights](#create-insights).

<!-- image /.gitbook/assets/image (4).png - Create dashboard with Effort Investment Profile selected -->

With **Effort Investment Profile** selected, your new Insight starts with the following widgets, which provide an overview of the categories or projects where engineers are allocating the most time:

* **Effort Investment Single Stat**
* **Effort Investment Trend Report**
* **Effort Investment By Engineer**

For more information about these metrics, go to the [Alignment metrics](./sei-metrics-and-reports/alignment-metrics.md) documentation.

## Create DORA Insights

Use DORA Insights to examine your organization's [DORA (DevOps Research Assessment) metrics](./sei-metrics-and-reports/execution/dora-metrics.md).

To create DORA Insights:

1. Follow the steps to [create Insights](#create-insights), and select both **Effort Investment Profile** and **Effort Investment Units**.
2. Add widgets for [DORA metrics](./sei-metrics-and-reports/execution/dora-metrics.md).

## Change the color scheme

You can change the color scheme for all Insights.

1. In your Harness project, go to the SEI module.
2. Select **Account**.
3. Select **Customize**.
