---
title: Lead time reports
description: Use these reports to analyze lead time metrics.
sidebar_position: 60
---

<!-- Lead time -->
<!-- ("issues lead time by stage" - Lead time by development stages, entire SDLC, all tools) VELOCITY: lead time by stage, lead time trend, lead time by type, lead time single stat -->
<!-- (Specifically for jira/issue management) VELOCITY: lead time by time spent in stages -->
<!-- Done - VELOCITY & DORA: SCM commit to cicd job lead time report, aka Commit to deployment lead time - jobs commits lead single stat, jobs commit leads trends report -->
<!-- Done - VELOCITY: SCM PR lead time by stage report - scm pr lead time trend report, scm pr lead time by stage report -->

* Lead Time Single Stat
* Lead Time by Time Spent in Stages
* Issue Lead Time By Stage Report
* Issue Lead Time by Type Report
* DORA Lead Time For Changes (covered on DORA)
* SCM Commits to CI/CD Job Lead Time Trend Report (on SCM or ci/cd reports)
* SCM Commits to CI/CD Job Lead Time Single Stat (on SCM or ci/cd reports)
* SCM PR Lead Time Trend Report (on SCM reports)
* SCM PR Lead Time by Stage Report (on SCM reports)

## Lead time single stat

Single stats are versatile widgets that provide a single metric over a given time range. These are useful for tracking events (created, resolved, etc.) happening over a period of time.

When you configure a single stat widget:

* You can create filters for any field that can be viewed as a single value, such as issue type, priority, status, labels, components, and so on.
* The available fields depend on your [integrations](/docs/category/connectors-and-integrations), and you can choose from custom fields, if they exist in your SCM, issue management, or support tool.
* If you use multiple filters to focus the widget (such as to show the total number of *bugs* in the *won't do* status for a specific project), the filters are inherently combined by `AND` operators.
* Keep in mind that single stat widgets intend to show a single value, such as the total number of tickets or the sum of story points. Determine what single stat you want to show, and then create your filters accordingly.

You might want to set the time range to **Use Insight time**, which allows the user to select a time range when viewing the Insight where this widget is present.
