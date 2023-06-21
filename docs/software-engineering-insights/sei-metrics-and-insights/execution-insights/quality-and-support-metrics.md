---
title: Quality and support metrics
description: Learn about quality and support metrics and widgets.
sidebar_position: 30
---

This topic describes quality and support metrics, as well as configuration options for widgets associated with these metrics.

## Mean Time To Recover (MTTR)

Mean Time To Recovery measures the average amount of time it takes to resolve an incident or failure, from the moment it is detected to the moment it is fully resolved.

## Mean Time Between Failures (MTBF)

Mean Time Between Failures measures the average amount of time a system or component operates without failing. It is expressed as a continuous operating time in hours, days, or other units of time.

## Issues Report

The Issues Report gives insight into various tickets/work items (epics, stories, bugs, tasks, and so on) in your issue management system. The report aggregates data based on selected attributes, such as priority, status, labels, components, or any other field. This report helps you create comparisons based on various fields and derive insights to make decisions.

### Configure the Issues Report widget

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

<!-- Figure 1: An Issues Report widget configured to show <b>Ticket count</b> on the Y-axis and <b>Priority</b> across the X-axis. For each Priority, the issues are stacked by <b>Status</b>. -->
<!-- img https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FEb01tnHrNFJhZsvID4IW%2Fuploads%2Fgtbk8giItf7dlTVo92h9%2Fimage.png?alt=media&#x26;token=a0166b30-465b-48ed-9396-2d85600d45f0 - Issues Report widget example -->

#### Settings

* Select the issue management system to use for this widget. Available options are based on your configured integrations.
* Select how you want to sort X-axis data, such as ascending or descending.
* Select values to show on the X-axis.
* Select the visualization style for the widget:
  * Bar chart
  * Donut Chart
  * Multi-Line chart
  * Percentage stacked bar chart

## Issue Hygiene Report

The Issue Hygiene Report widget shows a list of _hygiene misses_ in the designated time frame. Each hygiene miss is tallied against a score of 100. A score of 100 indicates that no tickets were submitted with missing hygiene points.

Scores are calculated using the following formula:

```
Category Score = ( Number of Tickets Missing Hygiene / Total Number of Tickets in Time Frame ) * Weight

Total Score = Sum of Category Scores
```

<!-- image .gitbook/assets/image (72).png - Active Sprint Hygiene Insights widget -->

### Configure the Issue Hygiene Report widget

:::info Prerequisites

Before adding the Issue Hygiene Report widget to a dashboard, you must configure any **Custom Hygiene Misses** in your [Integrations](../../sei-integrations/sei-integrations-overview.md).

:::

The following options are available when configuring the Issue Hygiene Report widget:

* **Filters:** Filters can be blank or filtered down to a desired ticket type or time frame.
* **Weights:** Configure the weight for each **Hygiene Criteria**. A lower weight causes a criterion to have a lower impact on the overall score, and a higher weight causes a criterion to have a larger impact on the overall score. Make sure the total of all weights equals 100.

   <!-- image - /.gitbook/assets/image (71).png -- Issue Hygiene Report widget config - Weights tab -->

* **Settings:** Select the issue management system to use for this widget. Available options are based on your configured integrations.

:::tip

The Issue Hygiene Report is often used in conjunction with the **Issue Hygiene Trend Report** to show a history of hygiene scores.

:::

#### Example configurations

Here are some examples of configurations for the Issue Hygiene Report widget.

<details>
<summary>Active sprint hygiene</summary>

You can configure the widget to show your team's current sprint only. To do this, go to the **Filter** tab, select **Sprint**, and then select **Includes Active Sprints Only**.

<!-- img .gitbook/assets/image (55).png - Configure issue hygiene report -- filters tab - include active sprints only -->

</details>

<details>
<summary>Dashboard time hygiene</summary>

_Dashboard time_ is the time range selected by the user when viewing the dashboard. You can configure the widget to show the hygiene score for all tickets created in the user-selected dashboard time. To do this, go to the **Filter** tab, select **Issue Created In**, and then select **Use Dashboard Time**.

<!-- img .gitbook/assets/image (33).png - Configure issue hygiene report -- filters tab - use dashboard time -->

</details>

<details>
<summary>Issues in progress hygiene</summary>

You can configure the widget to show the hygiene score for all in-progress tickets. To do this, go to the **Filter** tab, select **Status**, and then select the statuses that correspond to in-progress tickets.

<!-- img .gitbook/assets/image (64).png - Configure issue hygiene report -- filters tab - filter by in progress tickets -->

</details>

<details>
<summary>Issues in backlog hygiene</summary>

You can configure the widget to show the hygiene score for all tickets in your backlog. To do this, go to the **Filter** tab, select **Status**, and then select the statuses that correspond to backlog tickets.

<!-- img .gitbook/assets/image (47).png - Configure issue hygiene report -- filters tab - filter by status "to do" -->

</details>

## Issue Resolution Time Report

  The Issue Resolution Time Report is a bar graph showing the average time it
  takes to close a ticket.

The Issue Resolution Time Report shows the average time taken to close tickets from the time they were created. Resolution Time report can be used to answer questions like:

* Is my team getting faster at delivering features or fixing issues?
* Are resolution times for a project or component decreasing over time?
* On average how long does it take fix customer issues? Are we able to meet the SLA timeline?

The Issue Resolution Time Report graphs the average time for ticket close, along with the number of tickets that were closed. The X Axis can be a variety of variables, which changes the insights given by the graph.

<figure><img src="../../../.gitbook/assets/image (76).png" alt=""><figcaption></figcaption></figure>

### Setting Up The Widget&#x20;

By default, the widget is filtered by Issues closed within the selected period of time. This is most often set as the dashboard time.

<figure><img src="../../../.gitbook/assets/image (56).png" alt=""><figcaption></figcaption></figure>

The X Axis can be set to a variety of filters from your issue management system. Some of the most common selections are Assignee, Story Points, Ticket Category, Issue Closed Last Time Period.

<figure><img src="../../../.gitbook/assets/image (59).png" alt=""><figcaption></figcaption></figure>

### Popular Configurations

There are many ways to utilize this widget. The primary way to change the insights gained will be by changing the Aggregation (X-Axis). The most common Aggregations are listed below, along with any special setup instructions.

*
* **Average Time to Issue Closed By Assignee**
  *   Aggregation = Assignee: This will give a bar graph of who is taking the most time to close issues within the selected time frame. It is recommended that the X-Axis is sorted by Value, High --> Low and the Max X-Axis Entries is able to show all of your team members. \


      <figure><img src="../../../.gitbook/assets/image (53).png" alt=""><figcaption></figcaption></figure>


* **Story Point Estimation Accuracy**
  *   Aggregation = Story Points: This widget will show a graph of how well your story points are estimated. Your graph ideally should be a linear progression, with higher story point issues taking longer to resolve than lower ones.\


      <figure><img src="../../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

      * Under Filter_,_ make sure to exclude your backlog stages by adding the **Exclude Time In Status** filter.
      *   Under settings, you will want to **Sort X-Axis By Label, Low --> High**\


          <figure><img src="../../../.gitbook/assets/image (29).png" alt=""><figcaption></figcaption></figure>
* **Time to Close Issue by Last Time Period**
  *   Aggregation = Issue Last Closed (Week, Month, Quarter): This widget will give a historical record of the average time it took to close all issues within the selected timeframe. \
      Filters can be configured for _MTTR_ or _Lead Time For Change_ trends by using the I**ssue Type** filter set to **Bugs** (_MTTR_) or **Tasks** + **Stories** (_Lead Time for Change_). \


      <figure><img src="../../../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

## Issue Bounce Report

The term _bounce_ refers to the reassignment of a ticket to a previous assignee. The Issue Bounce Report shows the number of times a ticket "bounced" between assignees. The report is typically configured to observe the median number of "bounces" by component, project, or initiative.

The purpose of this visual is to highlight specific issues which are being bounced around to different resources. This may be because the issue wasn't initially triaged correctly, or doesn't have enough information to be assigned correctly.

The impact is potential missed SLAs and unnecessary resource utilization.

## Issue Hops Report

The term _hops_ refers to the number of times a ticket is reassigned. The Issue Hops Report is typically configured to observe the median number of hops or reassignments by component, project, or initiative.

The purpose of this visual is to highlight specific issues which are reassigned multiple times. This may be because the issue wasn't initially triaged correctly, or doesn't have enough information to be assigned correctly.

The impact is potential missed SLAs and unnecessary resource utilization.

## SCM Files Report

Use the SCM Files Report to identify code areas with a high frequency of changes. Used to make sure that the hottest code areas have good test coverage.

:::info

Several tools-based insights are available with SEI, such as SonarQube code complexity reports, Testrails test reports, PagerDuty incident reports, Junit test reports, and many more.

:::
