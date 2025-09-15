---
title: Metrics FAQs
description: Frequently asked questions related to SEI widgets & metrics
sidebar_position: 60
---

This page includes FAQs and troubleshooting information for SEI widgets.

:::danger SEI Version Notice
The following FAQs reflect SEI 1.0 behavior. If you are using SEI 2.0, see the [SEI 2.0 documentation](/docs/category/sei-recommended/).
:::

### What is the purpose of the OU UNIT OVERRIDES field in widget settings?

The **OU UNIT OVERRIDES** field allows you to override filters applied at the Collection level, ensuring that the report only reflects the filters set within the report itself.

For example, if a Collection filter restricts data to a specific Assignee, selecting Assignee in the OU UNIT OVERRIDES field will override that restriction, displaying data for all users instead.

### What is the difference between the Issue bounce & Stage bounce widget?

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

### Why did it take time for the data to load initially?

The initial delay in data loading could be due to the process of fetching and caching the data for the first time. This can take some extra time as the system establishes the cache. After the first load, the data should be available more quickly. 

### Do API Keys Expire for SEI?

No, API keys for do not expire. There is no need to renew them.

### Is it possible to clone projects in SEI?

Currently, it is not possible to clone a project in SEI. If this feature becomes available in the future, we will update our documentation accordingly.

### How does the filter hierarchy work in SEI?

In SEI, the hierarchy follows a top-down approach: Collections to Widgets.
Filters applied at the Collection level take priority over filters at the Widget level. This ensures consistent data context across all widgets under a collection.

### What is the recommendation to set project definitions in SEI ?

Project definitions should ideally be set within the Collection definition, not at the Widget level.
Widget-level project filters should only be used if a project definition is missing in the Collection.

### What does "Lead Time to First Commit" mean?

Lead Time to First Commit" refers to the time it takes for development work to start after a task is moved to the "In Progress" state. It tracks the gap between starting a task and making the first code commit related to it.

### How is "Lead Time to First Commit" calculated?

It is calculated using the formula:
Lead Time to First Commit = Time of first commit - Time when the ticket was first moved to 'In Progress'.
This measures how quickly coding begins after a task officially starts.

### When does "Lead Time to First Commit" start — after story creation or later?

Lead Time to First Commit" does not start immediately after the story is created. It begins from the last configured stage before coding work starts — typically when the story is moved to the 'In Progress' state for the first time.
The metric measures the time between when the issue is moved to 'In Progress' and when the first commit is made.

### Why are some issues missing from the "Lead Time - Bugs" and "DORA Lead Time for Changes" widgets?

Since the DORA profile considers both Issue Management and SCM data together, and if the integration is excluded from the collection, issues with PRs or commits in Bitbucket/Jira are not included when calculating lead time.
To fix this, The integration should be linked to the client services collection (with repo filters if needed).
Adding Bitbucket integration also improves the DORA Lead Time for Changes widget, as it ensures no issues with PRs or commits are missed.

### How is the "Total Time" calculated in the widget?

The Total Time displayed in the widget is the sum of the time spent in all the stages that are selected within the widget settings.

### How is time calculated when stages like Jira approval and Bitbucket code review overlap?

Even if activities like Jira approval and Bitbucket code review happen at the same time, the system does not double count the overlapping period.
The total time is calculated by splitting the time across stages into non-overlapping spans, ensuring each moment is only counted once.

### How does SEI calculate "Story Points Planned" and "Committed Points"?

Story Points Planned: SEI calculates story points for tickets that were originally planned before the sprint started. This aligns with the Commitment field in the Jira velocity chart.

Committed Points: SEI calculates story points for tickets that truly contribute to the sprint's progress. It excludes issues that were outside of the sprint scope or removed during the sprint.

### What is the purpose of tracking Sprint Metrics?

Sprint Metrics help teams understand how well they plan, execute, and adapt during a sprint. They provide insights into team performance, sprint predictability, and areas for improvement.

### Are sub-tasks considered in sprint performance reports?

No, sub-tasks are excluded. Sprint Metrics focus on primary work items like stories, tasks, and bugs, ensuring clarity in planning and delivery.

### Why might my committed story points seem lower than the total points in the sprint?

If issues were added after the sprint started or if sub-tasks are present, these might not count toward committed points, leading to apparent differences.

### What does it mean if a ticket is classified as "Outside of Sprint"?

It means the ticket was completed before the sprint officially began, so it doesn't contribute to sprint performance metrics.

### How does SEI handle tickets removed mid-sprint when calculating metrics?

Tickets removed before sprint completion are excluded because they didn't contribute to the delivered work or velocity.

### What is considered a "creep" in sprint tracking?

A "creep" refers to any work item added to a sprint after it starts, representing unplanned or additional scope.

### How can mid-sprint changes affect our velocity measurement?

Scope changes like adding or removing issues mid-sprint impact Churn Rate and can inflate or deflate perceived velocity if not carefully managed.

### Why should teams monitor their Churn Rate?

A high Churn Rate indicates unstable planning, making it harder to predict future work capacity and deliverables.

### What’s the difference between Creep Points and Delivered Scope Creep Points?

Creep Points represent all added points after sprint start, while Delivered Scope Creep Points only include the creep work that was actually completed.

### How does estimate revision mid-sprint impact metrics?

If a task’s point estimate changes during the sprint, the updated estimate is considered for completed work, helping to better reflect effort and scope.

###  How can sprint velocity help in future sprint planning?

By averaging sprint velocities over several sprints, teams can better forecast their realistic capacity for upcoming sprints and avoid overcommitting.

### What does a high Delivered Tickets STDEV indicate?

It signals variability in the number of completed tickets between sprints, suggesting inconsistent team output that may need investigation.

### If a ticket is completed but removed from the sprint, does it still count?

Yes, it may still add to commit points and commit done points, ensuring effort isn’t lost from team achievement tracking.

### Why does SEI exclude mid-sprint removed issues from sprint success metrics?

Because removing tickets means they weren’t part of the final committed delivery, and including them would distort success rates.

### How do delivered story creep points differ from creep done points?

Delivered story creep points track increases in existing ticket estimates mid-sprint, whereas creep done points track entirely new issues added and completed after the sprint began.

### How does SEI handle tickets that change status multiple times during a sprint?

SEI considers the final status at sprint close. Only tickets marked done or delivered at sprint end contribute to commit done points and velocity.

### If I add an unestimated ticket mid-sprint, how is it factored into metrics?

An unestimated ticket adds 0 creep points initially. If you later estimate it, the updated story points are counted in creep points.

### Does moving a ticket between sprints affect historical sprint metrics?

Yes, moving a ticket out of a sprint will adjust metrics retroactively, reducing commit points and possibly commit done points depending on its status.

### How do missed tickets impact team health reports?

High missed points over multiple sprints can indicate planning problems, poor estimations, or workflow blockers, and could affect health metrics like sprint predictability.

### Are scope creep tickets tracked separately from originally committed work?

Yes, SEI clearly separates committed work from creep work to help teams see how much unplanned effort was introduced during a sprint

### Can delivered story creep points inflate our reported sprint velocity?

Yes, significant mid-sprint estimate increases (story creep) can make sprint velocity appear artificially high if not reviewed carefully.

### What happens if a story point estimate is reduced during a sprint?

SEI reflects the reduced estimate in delivered points, helping to maintain an accurate record of actual effort rather than planned complexity.

### How does SEI treat bugs versus user stories in Sprint Metrics?

All work items with story points (bugs, tasks, user stories) are treated equally for metric calculation, provided they are not sub-tasks.

### How important is Sprint Velocity STDEV in evaluating team consistency?

A low Sprint Velocity STDEV suggests consistent team delivery sprint-to-sprint, while a high STDEV indicates unpredictable performance needing attention.

### If a sprint has 0 committed points but completed tickets, how is that shown?

Tickets added after sprint start will be recorded as creep done points, meaning the team delivered work but didn’t commit to it initially.

### How does SEI determine if a ticket is considered "idle" when calculating hygiene scores?

A ticket is flagged as "idle" if there is no status change, comment, or field update within a configured threshold time (e.g., 3 days). This threshold is customizable based on your hygiene settings.

### What happens to the hygiene score if a ticket is missing multiple fields like Assignee, Due Date, and Components at once?

Each missing field counts as a separate hygiene miss. The final hygiene score aggregates the impact based on the category weights you configured.

### Can I configure different hygiene scoring rules for Jira and Zendesk separately in the same SEI project?

Yes, hygiene settings are scoped to each integration. You can configure different category weights, thresholds, and custom hygiene misses for Jira vs. Zendesk independently.

###  If a ticket temporarily has no assignee but gets reassigned before sprint close, will it still count as a hygiene miss?

No, hygiene scoring evaluates the latest state of a ticket within the reporting window. If the missing data is corrected before evaluation, it won’t count as a miss.

### How often is data refreshed in the Hygiene reports — real-time, daily, or manually triggered?

Hygiene report data is typically updated daily based on SEI's data sync schedules, but you can manually trigger a resync if needed.

### When configuring weights for hygiene categories, can weights be dynamically adjusted based on ticket priority?

No, category weights are static per report configuration. However, you can apply priority-based filters to create separate widgets targeting high-priority issues.

### Does the Support Hygiene Trend report differentiate between internal notes and public replies when calculating idle time?

Yes, SEI can differentiate activity types if your support integration (like Zendesk) provides metadata separating internal comments from public replies.

### Can historical hygiene scores be retroactively updated if we fix tickets that had earlier hygiene misses?

No, hygiene scores are a point-in-time snapshot based on ticket data at collection. Fixing historical tickets does not retroactively alter previous report results.

### How are custom hygiene categories tracked if the related fields in Jira are non-standard custom fields?

You can map custom fields in your SEI integration settings when configuring Custom Hygiene Misses, allowing non-standard fields to be included in hygiene scoring.

### Is it possible to exclude certain ticket types (like Epics or Service Requests) from impacting hygiene reports?

Yes, you can apply filters during widget setup to exclude specific issue types or custom fields from hygiene calculations.

### If multiple users work on a ticket and one is inactive, how does that affect the inactive assignee hygiene miss?

Only the latest active assignee is considered for the hygiene check. If a ticket is assigned to an inactive user at evaluation time, it triggers an inactive assignee miss.

### Can I configure hygiene reports to trigger alerts if the Overall Hygiene Score falls below a certain threshold?

While native threshold-based alerts aren't yet built-in, you can set up external monitoring via API polling or integrate SEI reports with custom notification systems.

### In trend charts, can hygiene score fluctuations be correlated with sprint changes or specific process modifications?

Yes, you can overlay hygiene trend data with sprint timelines manually or by using combined Insights dashboards to correlate score changes with process shifts.

### What impact does a low hygiene score have on downstream metrics like lead time, resolution SLA adherence, or deployment frequency?

Poor hygiene can delay issue triage, increase cycle time, violate response SLAs, and contribute to deployment bottlenecks by introducing poorly groomed work into pipelines.

### How does the system treat support tickets that are escalated but not resolved within the defined resolution SLA?

Tickets escalated but unresolved still count against the Missed Resolution Time hygiene category if they exceed the SLA threshold configured.

### Does setting a weight to zero completely remove a category from being considered in hygiene trend reporting?

Yes, assigning a weight of zero to a category removes it from the overall score calculation but does not remove its raw data from trend analysis if displayed separately.

### What’s the best practice for setting idle thresholds differently for backlog tickets vs. in-progress tickets?

Best practice is to set stricter idle thresholds for In Progress tickets (e.g., 1–2 days) and more lenient thresholds for Backlog tickets (e.g., 5–7 days).

### Can Hygiene Trend Reports be broken down by team, label, or component for more granular analysis?

Yes, you can apply filters for team ownership, ticket labels, or components during widget setup to get team-specific or area-specific hygiene views.

###  If two hygiene issues occur simultaneously (e.g., Poor Description + Idle), are they weighted separately or compounded together?

They are weighted separately based on each category's assigned weight and then aggregated for the total hygiene score calculation.

### How does SEI calculate the hygiene score for merged or split tickets — does it track parent/child ticket hygiene separately?

Hygiene is calculated at the individual ticket level. If a ticket is merged or split, each resulting ticket is independently evaluated for hygiene compliance.

### Can I compare hygiene scores between different projects or products within the same SEI dashboard?

Yes, by setting up multiple widgets with distinct filters based on project keys, labels, or product identifiers, you can compare hygiene scores across different projects or teams side by side.

### How are missed response time and missed resolution time calculated for reopened tickets?

For reopened tickets, SEI recalculates response and resolution timers from the latest status change. Each reopening is treated as a fresh evaluation cycle for SLA-based hygiene categories.

### Is it possible to automatically archive or suppress hygiene misses from very old tickets that are no longer relevant?

While hygiene reports don't auto-archive misses, you can configure date-based filters (e.g., tickets created or updated within the last 90 days) to exclude stale issues from impacting your active hygiene scores.
