---
title: Support metrics
description: Learn about support metrics, reports, and widgets.
sidebar_position: 10
---

This topic describes metrics and reports related to customer support, such as issues in Zendesk or SalesForce.

* Support Agent Wait Time Report
* Support Agent Wait Time Trend Report
* Support Bounce Report
* Support Bounce Trend Report
* Support Config-To-Fix Trends
* Support Escalation Report
* Support Hops Report
* Support Hops Trend Report
* Support Hotspots Report (also quality)
* Support Replies Report
* Support Replies Trend Report
* Support Requester Wait Time Report (also velocity)
* Support Requester Wait Time Trend Report (also velocity)
* Support Resolution Time Report (also velocity)
* Support Resolution Time Trend Report (also velocity)
* Support Response Time Report (also velocity)
* Support Response Time Trend Report (also velocity)
* Support Themes Report
* Support Ticket Reopens Report
* Support Ticket Reopens Trend Report
* Support Tickets Report
* Support Tickets Trend Report
* Support Time Across Stages
* Support Top Customers Report

## Support hygiene reports

[Support hygiene reports](../hygiene-metrics.md#support-hygiene-reports) include the **Support Hygiene Report** and the **Support Hygiene Trend Report**.

## Issue reports

* **Issues Report:** Examine metrics related to various tickets/work items (epics, stories, bugs, tasks, and so on) in your issue management system. The report aggregates data based on selected attributes, such as priority, status, labels, components, or any other field. This report helps you create comparisons based on various fields and draw conclusions to make decisions.
* **Issues Trend Report:** Examine changes over time in issue management, such as the number of tickets closed each day or week.
* **Issue Resolution Time Report:** Presents a bar graph showing the number of tickets closed along with the average time it took to close those tickets, based on the time the tickets were created. This report is useful for understanding whether your team is getting faster at delivering features or fixing issues, whether average resolution time is decreasing, and whether you're meeting SLA timelines.
* **Issue Resolution Time Trend Report:** Track changes over time in issue resolution time.
* **Issue Resolution Time Single Stat:** Present the number of issues marked as resolved in a given time period.
* **Issues Single Stat:** Present a single stat for a given time range, such as how many issues were created, resolved, or updated in a given time period.

For information about issue reports, go to [velocity metrics](../velocity-metrics-reports/velocity-metrics.md).

:::tip Use Issue Resolution Time to monitor MTTR and MTBF

Mean Time To Recover (MTTR) and Mean Time Between Failures (MTBF) are [DORA metrics](../dora-metrics.md).

You can use the **Issue Resolution Time Report** and **Issue Resolution Time Single Stat** widgets to monitor MTTR and MTBF. You'll need to configure the filters and settings for these widgets so that they only track issues related to failure recovery.

:::
