---
title: CI/CD Job Count Report
description: This widget shows the number of CI/CD jobs run in a certain time frame.
sidebar_position: 10
---

The **CI/CD Job Count Report** widget shows a bar graph of all CI/CD jobs run in the selected time frame. This widget shows how often jobs run and how many succeed.

When you add the **CI/CD Job Count Report** widget to Insights, the **Job End Date** filter is set to a relative time frame by default. The widget is ready to use with the default configuration.

## Report all jobs in Insight time

_Insight time_ is the time range selected by the user when viewing Insights. If you want a more interactive widget that reports all jobs run in the user-selected Insight time, set **Job End Date** to **Insight time**.

If you want the widget to report the status (success or failure) of all jobs in Insight time, configure the widget as follows:

* Job End Date: Insight time
* Metrics: Job Status
* Aggregations: Job Name

<figure>

![](../static/ci-cd-job-count-report.png)

<figcaption>Figure 1: The CI/CD Job Count Report set to all jobs in Insight time.</figcaption>
</figure>

## Filter by failed jobs

If you want the widget to highlight failed jobs, set **Filter, Job Status** to **Failed**. You can use this configuration in combination with Insight time, such as:

* Job End Date: Insight time
* Metrics: Job Status
* Aggregations: Job Name
* Filter, Job Status: Failed

<figure>

![](../static/ci-cd-job-count-report-failed.png)

<figcaption>Figure 2: The CI/CD Job Count Report showing only failed jobs.</figcaption>
</figure>
