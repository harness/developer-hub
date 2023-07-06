---
title: Insights
description: Insights are dashboards.
sidebar_position: 10
---

Insights are dashboards that make it easy to visualize and interpret metrics that are captured by SEI. With a variety of out-of-the-box widgets, you can create Insights that show the data you care about most and help you understand your engineering team's effectiveness and efficiency. You can also share Insights with your team members.

This topic explains how to create and view SEI Insights. For information about metrics that are captured by SEI and reported on widgets, explore the other [Metrics and Insights](/docs/category/metrics-and-insights) documentation.

## View Insights

There are several navigation options for accessing Insights.

:::info

* Attempting to access an unrecognized Insight link redirects you to the SEI module home page where you'll have to select an Org Unit to proceed to the desired Insight.
* If you're already in a project, going to the SEI module home page automatically presents the Org Unit category selection page.
* Selecting the **Insights** icon on the navigation menu navigates you to the project's default Insight or the first available Insight in the first Org Unit category in the current project.
* To enable continuity of though processes and actions, on subsequent logins, you're automatically redirected to the Insight you had accessed before logging off.

:::

1. Log in to the Harness Platform and go to the SEI module.
2. If your organization has multiple projects, select a project.

    If you're already in a project, make sure you're in the correct project for the Org Unit and Insight that you want to view. You can use the **Project** dropdown menu to switch projects.

<!-- image .gitbook/assets/Workspace selection page- banner updated.png - Propelo home page -->

3. Select the relevant Org Unit category within the project.

   Admins can access Org Unit category management options from this page.

<!-- image .gitbook/assets/OU category selection page.png - Org Unit category selection page -->

4. Select an Org Unit. The Insights available for each Org Unit depend on the [Insight associations](#manage-insights-associations).

<!-- image .gitbook/assets/OU and Dashboard selection page.pn - Org Unit and dashboard selection page -->

5. Select an Insight to view it.

<!-- image .gitbook/assets/Dashboard view.png - example of viewing a dashboard -->

### Explore Insight data

Once you're viewing an Insight, you can explore the widgets and interact with the data.

:::info Where does the data come from?

Widgets derive data from [integrations](/docs/category/connectors-and-integrations) that are inherited from the Org Unit associated with Insights. In turn, Org Units inherit integrations from their associated projects. For more information about configuring these associations, go to [Pivot Points](/docs/category/pivot-points).

You can configure metrics and widgets to control what data is used to calculate metrics, how data is presented, and other criteria. For more information, go to [Metrics and Insights](/docs/category/metrics-and-insights).

:::

#### Set the dashboard time

_Dashboard time_ is the time range selected by the user viewing an Insight. Widgets and reports must be configured to **Use Dashboard Time** in order for their data to update when you change the Insight time range.

If a widget or report uses a specific time range, changing the Insight time has no impact on the data shown by that widget or report.

#### Drill down into data

Some widgets allow you to drill down into data. For example, you can select a segment of a bar on a bar chart to examine the data for that segment.

### Navigate from the Insights header

When viewing Insights, you can use the breadcrumbs, menus, and links in the header to switch Insights and Org Units.

<!-- image - .gitbook/assets/Dashboard header 1.png - Dashboard header with indicators for the org unit breadcrumb and the all dashboards dropdown. -->

The header includes direct links to some Insights, as well as an **All Insights** dropdown menu. The **Default** label indicates the Org Unit's default Insight.

<!-- image .gitbook/assets/Dashboard header 3.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->

:::tip

If integration monitoring is enabled, you can view the integration status in the Insights header.

:::

#### Admin functions in the Insights header

If you're an admin, you can:

* Access **Manage Teams** options from the Org Unit dropdown menu.
* Access **Manage Insights** options from the **All Insights** dropdown menu.

<!-- image .gitbook/assets/Dashboard header 2.png - Dashboard header with breadcrumb dropdown menu expanded and the Manage Teams button available -->

#### Access Insights from the Insights list

1. While viewing Insights, select **All Insights** in the header, and then select **Manage Insights** to go to the **Insights** list page.

<!-- image .gitbook/assets/Dashboard - manage dashboard option.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->

2. Select the Insight you want to view from the **Insights** list.

<!-- image .gitbook/assets/Dashboard List page.png - Dashboard list page -->

3. Select an Org Unit category.
4. Select an Org Unit. Upon selecting an Org Unit, the Insight you selected from the **Insights** list opens.

## Create Insights

1. Go to any Insight. For instructions, go to [View Insights](#view-insights).
2. In the header, select **All Insights**, and then select **Manage Insights**.

<!-- image .gitbook/assets/Dashboard - manage dashboard option (1).png - Dashboard header with all dashboards expanded and the manage dashboards button available. -->

3. Select **New Insight**.

<!-- image .gitbook/assets/Dashboard List page.png - Dashboards list page with New Dashboard button available. -->

4. Enter a **Name** for the Insight.
5. If you want to make this Insight private, make sure **Allow everyone in my organization to view the Insight** is *not* selected.
6. Under **Parameters**, you can modify the following settings:

   * **Dashboard Time Range:** You can enable dashboard time. _Dashboard time_ is the time range selected by the user when viewing an Insight.
   * **Effort Investment Profile** and **Effort Investment Units** are used for [Business Alignment Insights](#create-business-alignment-insights) and [DORA Insights](#create-dora-insights).

7. Select at least one Org Unit category to associated with this Insight.

<!-- image .gitbook/assets/Create dashboard - hover option.png - Create Dashboard dialog -->

   All [Org Units](../sei-pivot-points/manage-org-units.md) and child Org Units under the selected category are automatically associated with the Insight. You can refine the [Insight associations](#manage-insights-associations) after initial Insight creation.

   If you want to examine Org Units under a certain Org Unit category, select **View OUs** on the **Org Unit Categories** dropdown menu.

<!-- image .gitbook/assets/Create dashboard - view OUs (1).png - org unit category details after selecting View OUs -->

8. Select **Create** to save the Insight metadata. Initially, the Insight is empty. From here, you can add widgets or modify the Insight settings.

<!-- image .gitbook/assets/View dashboard after creation.png - empty new dashboard -->

:::info Where does the data in widgets come from?

Widgets derive data from [integrations](/docs/category/connectors-and-integrations) that are inherited from the Org Unit associated with Insights. In turn, Org Units inherit integrations from their associated projects. For more information about configuring these associations, go to [Pivot Points](/docs/category/pivot-points).

You can configure metrics and widgets to control what data is used to calculate metrics, how data is presented, and other criteria. For more information, go to [Metrics and insights](/docs/category/metrics-and-insights).

:::

### Manage Insights associations

There are two ways to manage Insights associations:

* When viewing Insights, select the **Settings** icon, and then select **Org Units**.
* From the **Edit Org Unit** page, edit the **Insights** settings. For more information about this option, go to **Managing Insights associations** in [Manage Org Units](../sei-pivot-points/manage-org-units.md#manage-insights-associations).

## Create Business Alignment Insights

Business Alignment Insights can help visualize where your teams are expending the most effort and help your teams prioritize their time.

To create a Business Alignment Insights, select the **Effort Investment Profile** option under **Parameters** when [creating Insights](#create-insights).

<!-- image /.gitbook/assets/image (4).png - Create dashboard with Effort Investment Profile selected -->

With **Effort Investment Profile** selected, your new Insight starts with the following widgets, which provide an overview of the categories or projects where engineers are allocating the most time:

* **Effort Investment Single Stat**
* **Effort Investment Trend Report**
* **Effort Investment By Engineer**

For more information about these metrics, go to the [Alignment metrics](./alignment-metrics.md) documentation.

## Create DORA Insights

Use DORA Insights to examine your organization's [DORA (DevOps Research Assessment) metrics](./execution/dora-metrics.md).

To create DORA Insights:

1. Follow the steps to [create Insights](#create-insights), and select both **Effort Investment Profile** and **Effort Investment Units**.
2. Add widgets for [DORA metrics](./execution/dora-metrics.md).
