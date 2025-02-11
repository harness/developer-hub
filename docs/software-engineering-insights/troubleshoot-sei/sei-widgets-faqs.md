---
title: Widgets FAQs
description: Frequently asked questions related to SEI widgets
sidebar_position: 60
---

This page includes FAQs and troubleshooting information for SEI widgets.

### What is the usage of OU UNIT OVERRIDES field in the report settings?

The OU UNIT OVERRIDES field in the report settings allows you to override filters defined at the Collections scope. This means that the report will display data based solely on the report filters, ignoring the Collection filter.

For example, suppose the Collection filter specifies that the Assignee must equal a certain value (e.g., a specific user). If you select "Assignee" in the "OU UNIT OVERRIDES" field, it will override the Collection filter. As a result, the report will display data for all users, not just the user specified in the Collection filter.

### What is the difference betweeen the Issue bounce & Stage bounce widget?

The calculation for the Stage Bounce widget is based on the status revisited in the ticket and not the assignee Here’s the distinction for reference:

* **Issue bounce widget:** Based on the reassignment of the same assignee (the same person reassigned to the ticket).
* **Stage bounce widget:** Based on the reassignment of the same status (status revisited or bounced back in the ticket workflow).
 

### Why does my velocity data in Jira does not match with SEI?

The calculation of velocity points in Harness SEI provides a more accurate reflection of completed work where both scope creep completed (creep tickets) and story creep completed (tickets where story points were changed) is included as contributing factors in the velocity points calculation.

```ssh 
Velocity points = Committed points completed + Scope creep points delivered + Story creep points delivered
```
To learn more, go to [Sprint metrics calculations](https://developer.harness.io/docs/software-engineering-insights/analytics-and-reporting/efficiency/agile-metrics/sei-sprints-metrics#sprint-velocity-delivered-points).

### How can I ignore commits that has multiple parents (i.e. merge commits) in the metric calculations?

