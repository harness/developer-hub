---
title: Metrics FAQs
description: Frequently asked questions related to SEI widgets & metrics
sidebar_position: 60
---

This page includes FAQs and troubleshooting information for SEI widgets.

### What is the purpose of the OU UNIT OVERRIDES field in widget settings?

The **OU UNIT OVERRIDES** field allows you to override filters applied at the Collection level, ensuring that the report only reflects the filters set within the report itself.

For example, if a Collection filter restricts data to a specific Assignee, selecting Assignee in the OU UNIT OVERRIDES field will override that restriction, displaying data for all users instead.

### What is the difference betweeen the Issue bounce & Stage bounce widget?

The calculation for the Stage Bounce widget is based on the status revisited in the ticket and not the assignee Here’s the distinction for reference:

* **Issue bounce widget:** Based on the reassignment of the same assignee (the same person reassigned to the ticket).
* **Stage bounce widget:** Based on the reassignment of the same status (status revisited or bounced back in the ticket workflow).

### Why doesn’t my Jira velocity data match SEI’s velocity data?

The calculation of velocity points in Harness SEI provides a more accurate reflection of completed work where both scope creep completed (creep tickets) and story creep completed (tickets where story points were changed) is included as contributing factors in the velocity points calculation.

```ssh 
Velocity points = Committed points completed + Scope creep points delivered + Story creep points delivered
```
To learn more, go to [Sprint metrics calculations](https://developer.harness.io/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/agile-metrics/sei-sprints-metrics#sprint-velocity-delivered-points).

### How can I ignore commits that has multiple parents (i.e. merge commits) in the metric calculations?

Yes, SEI allows filtering out commits with multiple parents (merge commits) to focus on individual contributions. This feature is currently supported for the Code Rework widget when using Bitbucket and GitLab integrations.

### Can I associate a Business Alignment profile to a widget?

Business Alignment profiles are applied at the widget level.

To begin with this you can create a new BA profile with the necessary details. After creating the profile, return to the insight where you want to use it and access the BA widget settings.

Now you can switch between existing BA profiles from the profile selection option.

### Does SEI support widgets for Kanban?

Yes. The key Kanban metrics are -

* **Lead Time:** Lead time measures the time it takes for a software development task to move from the moment it's added to the Kanban board until it's marked as complete. It reflects the total time a task spends in the Kanban workflow.
* **Cycle Time:** Cycle time focuses on the "active work" phase in Kanban, measuring the duration between when a team member starts a task and when they finish it. Cycle time begins when a task enters the active workflow.
* **Work-in-progress:** Work-in-progress also often referred to as WIP represents the number of tasks currently in the "active" or "in-progress" stages within the Kanban system. It provides a snapshot of ongoing work at any given time.
* **Throughput:** Throughput quantifies the number of tasks or work items your team successfully completes within a specific time frame, like a day or a week. It measures your team's productivity during that period.

### Can I customize the Trellis Score visualization for Kanban metrics and comparisons?

Customization options may depend on your specific tools and access rights. If you have editing rights you should be able to modify the Trellis dashboard to align it with your requirements, including adding comparisons or adjusting views.

### Can SEI track improvement in developer productivity over time?

Yes. SEI can display trends that show whether the team or project is improving over time.

### Can SEI track on how long was an issue open before it got delivered (Ticket, Story, Epic, etc.)?

Yes. We can track the time a ticket, story, or epic was open before it got delivered. This is often referred to as lead time or velocity.

### Can SEI show what was delivered in production?

Yes. SEI can show what was delivered in production, but it depends on how you have defined their delivery workflow.

### Can SEI track if a task was in the commitment of the week or was it creep?

Yes. SEI can track whether a task was part of the commitment for the week or if it was added later, often referred to as "creep" tickets.

### Why can't I track developer metrics such as lines of code and code rework when using Azure DevOps repos?

The SCM Rework widget and Rework/Legacy Trellis feature for Azure DevOps repositories are being deprecated due to limitations in Azure DevOps' API functionality. Currently, Azure DevOps does not provide official APIs that return detailed line-level changes per file for each commit. Because these metrics rely on such data, the SCM Rework widget and Trellis Rework feature will no longer be supported for Azure DevOps repos.

### Can I track trellis scores for the selected time period in the dashboard?

The Trellis widgets support only the default time ranges. You can use Dev insights widgets such as PR lead time, Review collaboration widget, Code rework widget, Coding days, Code change size, Comment density which can use the dashboard time (Use Insight Time). 
 
If you want to submit a feature request, we allow users to enter their ideas on our [ideas portal](https://ideas.harness.io).

### Can I generate a yearly report of pull requests (PRs) with month-by-month segregation?

Yes, this is possible.

You can configure filters using **PR Merged In** or **PR Closed In** attributes to define the timeline and use the SCM PRs widget to track pull requests on a monthly basis. This allows you to analyze PR activity over a year with clear month-by-month segregation.

### Why don’t Trellis metrics update in real-time or reflect the current period?

Trellis metrics are calculated on a monthly cycle, meaning they are updated at the start of each month based on the previous month's data. This process ensures accurate computations but does not support real-time or mid-month updates.

### Can I track Trellis metrics for the current period instead of retrospectively?

Currently, this is not supported due to the resource-intensive nature of Trellis computations. Metrics are processed in a batch cycle at the beginning of each month, so any improvements or changes made within the current month will only be reflected in the next update.

### Is there a way to request more frequent updates or additional time period options?

If you need more flexibility in tracking Trellis metrics, we recommend submitting an enhancement request via our [Ideas portal](https://ideas.harness.io). This allows the product team to evaluate the feasibility of adding more options based on demand and use cases.

### Can I customize the thresholds for Lead Time for Changes in SEI?

The thresholds for Lead Time for Changes are configurable only within DORA profiles. SEI does not provide additional customization options outside of this.

### What SCM activities are available for Lead Time insights?

SEI provides insights into the following SCM activities:

* Lead Time to First Commit
* First PR Creation Time
* Time to First Comment
* First Approval Time
* Last Merge Time

### Does SEI track the time from branch creation to merge as part of lead time?

No, SEI does not currently track Branch Created as part of Lead Time for Changes, as it was determined to provide limited value in analysis.

### If a PR is created in one month, approved in another, and merged in a third, which month is it counted against?

It depends on the metric & selected filter:

* PR Created In: The PR is counted in the month it was created.
* PR Merged In: The PR is counted in the month it was merged.

### Why is an inactive user still showing productivity stats in SEI?

This can occur if an inactive user shares the same GitHub username with an active user. If the GitHub ID was previously merged with the inactive user, the system may prevent it from being reassigned to the active user.

**Resolution**

To resolve this, you need to disassociate the GitHub ID from the inactive user and merge it with the active user. This can be done using the export and import process:

* Export the user data.
* Remove the GitHub ID from the inactive user.
* Add the GitHub ID to the correct active user.
* Re-import the updated data.

This will ensure that the productivity stats are correctly attributed to the active user.

### Can Lead Time for Changes be configured to use business days instead of calendar days?

No, SEI calculates Lead Time for Changes using calendar days across all widgets. Business day calculations are not currently supported.


