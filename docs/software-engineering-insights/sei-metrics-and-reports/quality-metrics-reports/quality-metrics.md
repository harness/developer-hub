---
title: Quality metrics
description: Learn about quality metrics, reports, and widgets.
sidebar_position: 10
---

This topic describes quality metrics, as well as configuration options for widgets and reports associated with these metrics.

## Issues Report

Use the Issues Report to examine metrics related to various tickets/work items (epics, stories, bugs, tasks, and so on) in your issue management system. The report aggregates data based on selected attributes, such as priority, status, labels, components, or any other field. This report helps you create comparisons based on various fields and draw conclusions to make decisions.

### Configure the Issues Report

The following options are available when configuring the Issue Report widget.

#### Filters

Select an attribute to use to filter the Issues Report data. You can use multiple filters together.

Select an attribute from the **Add Filter** dropdown menu, and then configure the filter values.

Depending on the selected attribute, you can:

* Select one or more filter values.
* Select values to exclude.
* Use pattern matching rather than strict values.

#### Metrics

Select a metric to use for the Y-axis. The Issues Report widget supports the following metrics:

* **Number of Tickets**
* **Sum of Story Points**

#### Aggregations

* **X-axis:** Select the attribute to use for the X-axis. For example, if you selected the **Number of Tickets** metric for the Y-axis, you could select **Issues Resolved by week** for the X-axis. Additional examples of X-axis dimensional attributes include **Project**, **Assignee**, **Labels**, **Priority**, and so on.
* * **Stacks:** Select how you want to group data in each X-axis dimension. For example, if you select **Priority** for the X-axis and stack by **Status Category**, then data in each X-axis column are grouped by status.

<figure>

![](../static/issues-report-widget.png)

<figcaption>Figure 1: An Issues Report widget configured to show <b>Ticket count</b> on the Y-axis and <b>Assignee</b> across the X-axis. For each Assignee, the issues are stacked by <b>Priority</b>.</figcaption>
</figure>

#### Settings

* Select the issue management system to use for this widget. Available options are based on your configured [connectors](/docs/category/connectors-and-integrations).
* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of values to show on the X-axis.
* Select the visualization style for the widget:
  * Bar chart
  * Donut Chart
  * Multi-Line chart
  * Percentage stacked bar chart
* Select the date format.

### Issues Report use cases

Here are some examples of configurations for the Issues Report widget.

<details>
<summary>Defects raised weekly</summary>

To configure the Issues Report widget to show bug tickets created weekly:

1. On the **Filter** tab, add an **Issue Type** filter set to **Bug/Defect**.
2. For the time range, either select **Use Insight time** or set **Issue Created In** to the desired time range. **Use Insight time** allows the user to select a desired time range when viewing the Insight.
3. On the **Metrics** tab, select **Number of Tickets**.
4. On the **Aggregations** tab, set **X-axis** to **Issue created by week**.
5. On the **Settings** tab, set the **Visualization** to **Bar Chart**.
6. Set the widget **Name** to **Defects raised weekly**.

</details>

<details>
<summary>Stories resolved weekly</summary>

To configure the Issues Report widget to show stories resolved weekly:

1. On the **Filter** tab, add an **Issue Type** filter set to **Story**.
2. For the time range, either **Use Insight time** or set **Issue Created In** to the desired time range. **Use Insight time** allows the user to select a desired time range when viewing the Insight.
3. On the **Metrics** tab, select **Number of Tickets**.
4. On the **Aggregations** tab, set **Stacks** to **Priority**, and set **X-axis** to **Issue resolved by week**.
5. On the **Settings** tab, set the **Visualization** to **Bar Chart**.
6. Set the widget **Name** to **Stories resolved weekly**.

</details>

<details>
<summary>Distribution of tickets in an active sprint</summary>

To configure the Issues Report widget to show the distribution of tickets in the active sprint:

1. On the **Filter** tab, add a **Sprint** filter set to **Select Active Sprints only**.
2. On the **Metrics** tab, select **Number of Tickets**.
3. On the **Aggregations** tab, set **Stacks** to **Issue Type**, and set **X-axis** to **Sprint**.
4. On the **Settings** tab, set the **Visualization** to **Bar Chart**.
5. Set the widget **Name** to **Active sprint tickets distribution**.

</details>

<details>
<summary>Team workload (in stories)</summary>

To configure the Issues Report widget to show the team workload:

1. On the **Filter** tab, add a **Status** filter, set the value to all closed statuses (Done, Closed, Resolved, Won't Do, and so on), and select **Exclude**.

   This ensures the widget only shows active or not-started work.

2. On the **Metrics** tab, select **Number of Tickets**.
3. On the **Aggregations** tab, set **Stacks** to **Issue Type**, and set **X-axis** to **Assignee**.
4. On the **Settings** tab, set the **Visualization** to **Bar Chart**.
5. Set the widget **Name** to **Team workload**.

</details>

## Issue Single Stat

The Issue Single Stat widgets provides single metrics over the given time range. This is useful for tracking events (created, resolved, etc.) happening over a period of time. For example, you can use the **Issue Resolution Time Single Stat** widget to know how many issues were *resolved* in the given time frame. Usually, the time range is set to **Use Insight time**, which allows the user to select a time range when viewing Insights.

Issue Single Stats widgets include:

* Issue created
* Issue due
* Issue resolution time
* Issue updated

You can configure these widgets to further filter and refine them, such as by issue type, label, priority, and so on.

## SCM Files Report

Use the SCM Files Report to identify code areas with a high frequency of changes. This is useful for ensuring that your hottest code areas have good test coverage.

:::info

Several tools-based metrics are available with SEI, such as SonarQube code complexity reports, Testrails test reports, PagerDuty incident reports, Junit test reports, and many more.

:::
