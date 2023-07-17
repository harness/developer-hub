---
title: Support metrics
description: Learn about support metrics, reports, and widgets.
sidebar_position: 10
---

This topic describes quality and support metrics, as well as configuration options for widgets associated with these metrics.

## Hygiene reports

[Support hygiene reports](../hygiene-metrics.md#support-hygiene-reports) include the **Support Hygiene Report** and the **Support Hygiene Trend Report**.

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
2. For the time range, either **Use Insight time** or set **Issue Created In** to the desired time range. **Use Insight time** allows the user to select a desired time range when viewing the Insight.
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

## Issue Resolution Time

There are two Issue Resolution Time widgets: The **Issue Resolution Time Single Stat** and the **Issue Resolution Time Report**.

The Issue Resolution Time Single Stat widget is an [Issue Single Stat widget](#issue-single-stat) that reports the number of issues marked as resolved in a given time period.

The Issue Resolution Time Report is a configurable bar graph showing the number of tickets closed along with the average time it took to close those tickets, based on the time the tickets were created. This report can help answer questions like:

* Is my team getting faster at delivering features or fixing issues?
* Is the resolution times for a project or component decreasing over time?
* On average, how long does it take fix customer issues? Are we able to meet the SLA timeline?

<!-- img .gitbook/assets/image (76).png - issue resolution time report widget example -->

:::tip Use Issue Resolution Time to monitor MTTR and MTBF

Mean Time To Recover (MTTR) and Mean Time Between Failures (MTBF) are [DORA metrics](../dora-metrics.md).

You can use the **Issue Resolution Time Report** and **Issue Resolution Time Single Stat** widgets to monitor MTTR and MTBF. You'll need to configure the filters and settings for these widgets so that they only track issues related to failure recovery.

:::

### Configure the Issue Resolution Time Report

By default, the Issue Resolution Time Report widget is filtered by issues closed (**Last closed date**) within a selected time range. Usually, the time range is set to **Use Insight time**, which allows the user to select a time range when viewing Insights.

<!-- img .gitbook/assets/image (56).png - issue resolution time report widget config - filters tab - last closed date and Insight time -->

On the **Aggregations** tab, you can select the dimension, from your issue management system, to use for the X-axis, such as **Assignee**, **Story Points**, **Ticket Category**, **Issue Closed Last Time Period**, and so on. This determines what you want the widget to focus on. For example, focusing on **Category** or **Component** can show you the issue resolution time for different work areas; whereas, focusing on **Assignee** can show you issue resolution time by developer.

<!-- img .gitbook/assets/image (59).png - issue resolution time report widget config - aggregations tab - x axis dropdown -->

On the **Settings** tab, you can:

* Select the issue management system to use for this widget. Available options are based on your configured [connectors](/docs/category/connectors-and-integrations).
* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of unique values to show on the X-axis.

#### Issue Resolution Time Report examples

The primary way to modify the Issue Resolution Time Report widget is to change the X-axis dimension on the **Aggregations** tab. Here are some examples of other configurations for this widget.

<details>
<summary>Average time to issue closed by assignee</summary>

This configuration produces a bar graph showing which assignees are taking the most time to close issues within the selected time frame.

1. On the **Aggregations** tab, select **Assignee** for the X-axis dimension.
2. On the **Settings** tab, set **Sort X-axis** to **By Value, High --> Low**, and set the **Max X-Axis Entries** high enough so that it can show all team members.

<!-- img /.gitbook/assets/image (53).png - Issue Resolution Time Report widget config - settings tab - sort xaxis high to low and 20 max entries -->

</details>

<details>
<summary>Story point estimation accuracy</summary>

This configuration produces a bar graph showing how well your story points are estimated. Good estimation is evidenced by a graph showing linear progression, with higher point issues taking longer to resolve than lower ones.

<!-- img .gitbook/assets/image (30).png - Story point estimation accuracy bar graph w linear progression -->

1. On the **Aggregations** tab, select **Story Points** for the X-axis dimension.
2. On the **Filters** tab, exclude backlog stages by adding an **Exclude Time In Status** filter, and set the filter value to your backlog status(es), such as **To Do** or **Backlog**.

   <!-- img .gitbook/assets/image (29).png - exclude time in status filter example config -->

3. On the **Settings** tab, set **Sort X-axis** to **By Label, Low --> High**.

</details>

<details>
<summary>Time to close issue by last time period</summary>

This configuration produces a bar graph showing a historical record of the average time it took to close all issues within the selected time frame.

<!-- img .gitbook/assets/image (38).png - time to close issue by last time period bar graph example -->

1. On the **Aggregations** tab, select **Issue Last Closed (Week, Month, Quarter)** for the X-axis dimension.
2. On the **Filters** tab, add filters to demonstrate [MTTR](../dora-metrics.md#mean-time-to-restore-mttr) or [Lead Time For Changes](../dora-metrics.md#lead-time-for-changes) trends:

   * For MTTR: Add an **Issue Type** filter, and set the filter value to **Bugs**.
   * For Lead Time For Change: Add an **Issue Type** filter, and set the filter values to **Tasks** and **Stories**.

3. On the **Settings** tab, set **Sort X-axis** to **By Label, Low --> High**.

</details>

## Issue Single Stat

The Issue Single Stat widgets provides single metrics over the given time range. This is useful for tracking events (created, resolved, etc.) happening over a period of time. For example, you can use the **Issue Resolution Time Single Stat** widget to know how many issues were *resolved* in the given time frame. Usually, the time range is set to **Use Insight time**, which allows the user to select a time range when viewing Insights.

Issue Single Stats widgets include:

* Issue created
* Issue due
* Issue resolution time
* Issue updated

You can configure these widgets to further filter and refine them, such as by issue type, label, priority, and so on.
