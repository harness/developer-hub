---
title: Dashboards
description: Create and view SEI dashboards.
sidebar_position: 60
---

Dashboards make it easy to visualize and interpret metrics that are captured by SEI. With a variety of out-of-the-box widgets, you can create dashboards that show the data you care about most and provide insights into your engineering team's effectiveness and efficiency. You can also share dashboards with your team members.

This topic explains how to create and view SEI dashboards. For information about metrics that are captured by SEI and reported on widgets, go to [Metrics and insights](/docs/category/metrics-and-insights).

## View dashboards

There are several navigation options for accessing dashboards.

:::info

* Attempting to access an unrecognized dashboard link redirects you to the SEI module home page where you'll have to select an Org Unit to proceed to the desired dashboard.
* If you're already in a project, going to the SEI module home page automatically presents the Org Unit category selection page.
* Selecting the **Dashboard** icon on the navigation menu navigates you to the project's default dashboard or the first available dashboard in the first Org Unit category in the current project.
* To enable continuity of though processes and actions, on subsequent logins, you're automatically redirected to the dashboard you had accessed before logging off.

:::

1. Log in to the Harness Platform and go to the SEI module.
2. If your organization has multiple projects, select a project.

    If you're already in a project, make sure you're in the correct project for the Org Unit and dashboard that you want to view. You can use the **Project** dropdown menu to switch projects.

<!-- image .gitbook/assets/Workspace selection page- banner updated.png - Propelo home page -->

3. Select the relevant Org Unit category within the projecte.

   Admins can access Org Unit category management options from this page.

<!-- image .gitbook/assets/OU category selection page.png - Org Unit category selection page -->

4. Select an Org Unit. The dashboards available for each Org Unit depend on the [dashboard associations](#manage-dashboard-associations).

<!-- image .gitbook/assets/OU and Dashboard selection page.pn - Org Unit and dashboard selection page -->

5. Select a dashboard to view it.

<!-- image .gitbook/assets/Dashboard view.png - example of viewing a dashboard -->

### Explore dashboard data

Once you're viewing a dashboard, you can explore the dashboard and interact with the data.

:::info Where does the data come from?

Widgets derive data from integrations that are inherited from the Org Unit associated with the dashboard. In turn, Org Units inherit integrations from their associated projects. For more information about configuring these associations, go to [Projects and Org Units](/docs/category/projects-and-org-units).

You can configure metrics and widgets to control what data is used to calculate metrics, how data is presented, and other criteria. For more information, go to [Metrics and insights](/docs/category/metrics-and-insights).

:::

#### Set the dashboard time

_Dashboard time_ is the time range selected by the user viewing a dashboard. Widgets and reports must be configured to **Use Dashboard Time** in order for their data to update when you change the dashboard time range.

If a widget or report uses a specific time range, changing the dashboard time has no impact on the data shown by that widget or report.

#### Drill down into data

Some widgets allow you to drill down into data. For example, you can select a segment of a bar on a bar chart to examine the data for that segment.

### Navigate from the dashboard header

If you're currently viewing a dashboard, you can use the breadcrumbs, menus, and links in the dashboard header to switch to a different dashboard, Org Unit, or a child Org Unit under the current Org Unit.

<!-- image - .gitbook/assets/Dashboard header 1.png - Dashboard header with indicators for the org unit breadcrumb and the all dashboards dropdown. -->

The header includes direct links to some dashboards, as well as an **All Dashboards** dropdown menu. The **Default** label indicates the Org Unit's default dashboard.

<!-- image .gitbook/assets/Dashboard header 3.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->

:::tip

If integration monitoring is enabled, you can view the integration status in the dashboard header.

:::

#### Admin functions in the dashboard header

If you're an admin, you can:

* Access **Manage Teams** options from the Org Unit dropdown menu.
* Access **Manage Dashboards** options from the **All Dashboards** dropdown menu.

<!-- image .gitbook/assets/Dashboard header 2.png - Dashboard header with breadcrumb dropdown menu expanded and the Manage Teams button available -->

#### Access dashboards from the Dashboards list

1. While viewing a dashboard, select **All Dashboards** in the dashboard header, and then select **Manage Dashboards** to go to the **Dashboards** list page.

<!-- image .gitbook/assets/Dashboard - manage dashboard option.png - Dashboard header with All Dashboards menu expanded and the MAnage Dashboards button available -->

2. Select the dashboard you want to view from the **Dashboards** list.

<!-- image .gitbook/assets/Dashboard List page.png - Dashboard list page -->

3. Select an Org Unit category.
4. Select an Org Unit. Upon selecting an Org Unit, the dashboard you selected from the **Dashboards** list opens.

## Create dashboards

1. Go to any dashboard. For instructions, go to [View dashboards](#view-dashboards).
2. In the dashboard header, select **All Dashboards**, and then select **Manage Dashboards**.

<!-- image .gitbook/assets/Dashboard - manage dashboard option (1).png - Dashboard header with all dashboards expanded and the manage dashboards button available. -->

3. Select **New Dashboard**.

<!-- image .gitbook/assets/Dashboard List page.png - Dashboards list page with New Dashboard button available. -->

4. Enter a **Name** for the dashboard.
5. If you want to make this dashboard private, make sure **Allow everyone in my organization to view the dashboard** is *not* selected.
6. Under **Parameters**, you can modify the following settings:

   * Select **Dashboard Time Range** if you want to enable dashboard time. _Dashboard time_ is the time range selected by the user when viewing a dashboard.
   * Select the **Effort Investment Profile** option if you want to create a [Business Alignment Dashboard](#create-a-business-alignment-dashboard).
   * If desired, enable **Effort Investment Units**.

7. Select at least one Org Unit category to associated with this dashboard.

<!-- image .gitbook/assets/Create dashboard - hover option.png - Create Dashboard dialog -->

   All [Org Units](/docs/category/projects-and-org-units) and child org Units under the selected category are automatically associated with the dashboard. You can refine the [dashboard associations](#manage-dashboard-associations) after initial dashboard creation.

   If you want to examine Org Units under a certain Org Unit category, select **View OUs** on the **Org Unit Categories** dropdown menu.

<!-- image .gitbook/assets/Create dashboard - view OUs (1).png - org unit category details after selecting View OUs -->

8. Select **Create** to save the dashboard metadata. Initially, the dashboard is empty. From here, you can add widgets or modify the dashboard settings.

<!-- image .gitbook/assets/View dashboard after creation.png - empty new dashboard -->

:::info Where does the data in widgets come from?

Widgets derive data from integrations that are inherited from the Org Unit associated with the dashboard. In turn, Org Units inherit integrations from their associated projects. For more information about configuring these associations, go to [Projects and Org Units](/docs/category/projects-and-org-units).

You can configure metrics and widgets to control what data is used to calculate metrics, how data is presented, and other criteria. For more information, go to [Metrics and insights](/docs/category/metrics-and-insights).

:::

### Manage dashboard associations

There are two ways to manage dashboard associations:

* When viewing a dashboard, select the **Settings** icon, and then select **Org Units**.
* From the **Edit Org Unit** page, edit the **Dashboards** settings. For more information about this option, go to **Managing dashboard associations** in [Manage Org Units](./sei-projects-and-org-units/manage-org-units.md#manage-dashboard-associations).

## Create Business Alignment dashboards

Business Alignment dashboards can help visualize where your teams are expending the most effort and help your teams prioritize their time.

To create a Business Alignment Dashboard, select the **Effort Investment Profile** option under **Parameters** when [creating a dashboard](#create-dashboards).

<!-- image /.gitbook/assets/image (4).png - Create dashboard with Effort Investment Profile selected -->

With **Effort Investment Profile** selected, your new dashboard starts with the following widgets, which provide an overview of the categories or projects where engineers are allocating the most time:

* **Effort Investment Single Stat**
* **Effort Investment Trend Report**
* **Effort Investment By Engineer**

For more information about these metrics, go to [Alignment metrics](./sei-metrics-and-insights/alignment-metrics.md).
