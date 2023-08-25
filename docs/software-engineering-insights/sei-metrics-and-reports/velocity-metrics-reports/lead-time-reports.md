---
title: Lead time reports
description: Use these reports to analyze lead time metrics.
sidebar_position: 60
---

Lead time measures elapsed time to deliver features, close issues, or complete workflows. For example, it can measure:

* The time elapsed from when a new feature is requested to when it is delivered to the customer.
* How long support tickets, SCM issues, or issues in your issue management system remain open.
* The time between PR creation and merge.

The overall lead time is the sum of the average time spent in each stage configured in a workflow, such as the commit-to-deployment cycle in SCM or the issue lifecycle in an issue management system. This can help identify where the team is spending time and if the amount of time spent in each stage falls in an acceptable range.

## Workflow profiles for lead time

Lead time is based on time spent in stages defined in a [Workflow profile](../../sei-profiles/workflow-profile.md).

For example, the default configuration for a [PR-based Workflow profile](../../sei-profiles/workflow-profile.md#create-a-profile-to-track-lead-time-in-scm) has four stages:

* PR creation time.
* Time to first comment.
* Approval time.
* Merge time.

When [calculating lead time](#lead-time-calculation), the time spent in each stage depends on the stages that a PR or issue actually goes through. For example, if your Workflow profile includes a *time to first comment* stage, but there are no comments on the PR or ticket, then the *time to first comment* is zero.

You can configure grading thresholds (good, acceptable, and slow) for each stage. These thresholds determine grades that appear on your lead time widgets. Grades are reported for each stage as well as a cumulative grade for all stages combined.

You can modify Workflow profile stages and grades according to your team's SDLC process. If your Workflow profile includes stages across issue management, SCM, and CI/CD, make sure the same event is not tracked in multiple tools, such as *Deploy to Production* in Jira and a *CI/CD Deploy* stage.

For more information about modifying Workflow profiles and configuring stages for lead time calculation, go to [Workflow profile](../../sei-profiles/workflow-profile.md).

### Lead time calculation

Overall lead time is the sum of the time spent in each stage in a workflow, such as commit-to-deployment time for a change, open-to-merge time for PRs, or the issue workflow for issues in your issue management system. Lead time can help identify where a team is spending time and if the amount of time spent in each stage falls in an acceptable range.

The specific events or stages considered in a lead time calculation depend on the report and the stages defined in the associated [Workflow profile](#workflow-profiles-for-lead-time). The lead time ultimately depends on the stages that a PR or issue actually goes through. For example, if there are no comments on the a, then the *time to first PR comment* is zero.

The following examples demonstrate how PR lead time would be calculated in different scenarios. These examples are based on the default configuration for a PR-based Workflow profile, which has four stages: PR creation time, time to first comment, approval time, and merge time.

When reviewing these examples, consider the following:

* *Time to first comment* helps you understand the lead time between PR creation time and the first review.
* There are two ways to track the time taken for a PR approval:
  * Default *Approval Time* configuration: The overall approval time, starting from PR creation.
  * *Approval Time* minus *Time to first comment*: Time spent in the review cycle when an active reviewer is involved.
* The *overall lead time* is the sum of the average time spent in each stage. This is where you can determine where teams are spending their time and whether this is an acceptable range.

<details>
<summary>PR Lead Time calculation example #1</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a Pull Request (`Pull Request created event`).
3. The Pull Request is approved by an approver (`Pull Request approval event`).
4. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result the following calculations are made:

```
PR creation time = Pull Request created event - Commit created event
Time to first comment = Pull Request approval event - Pull Request created event
Approval Time = 0
Merge Time = Pull Request Merged event - Pull Request approval event
```

Approval Time is calculated as `0` because there were no review comments made on the PR.

</details>

<details>
<summary>PR Lead Time calculation example #2</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a pull request (`Pull Request created event`).
3. Reviewer adds a comment (`Review1 event`).
4. The Pull Request is approved by an approver (`Pull Request approval event`).
5. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result, the following calculations are made:

```
PR creation time = Pull Request created event - Commit created event
Time to first comment = Review1 event - Pull Request created event
Approval Time = Pull Request approval event - Review1 event
Merge Time = Pull Request Merged event - Pull Request approval event
```

</details>

<details>
<summary>PR Lead Time calculation example #3</summary>

For this example, assume the following series of events occurs:

1. Contributor makes a commit (`Commit created event`).
2. Contributor creates a pull request (`Pull Request created event`).
3. Reviewer adds a comment (`Review1 event`).
4. Reviewer adds a comment (`Review2 event`).
5. Reviewer adds a comment (`Review3 event`).
6. The Pull Request is approved by an approver (`Pull Request approval event`).
7. The Pull Request is merged to the repository (`Pull Request Merged event`).

As a result, the following calculations are made:

```
PR creation time = Pull Request created event - Commit created event
Time to first comment = Review1 event - Pull Request created event
Approval Time = Review3 event - Review1 event
Merge Time = Pull Request Merged event - Pull Request approval event
```

</details>

## Lead Time by Time Spent in Stages Report

Use the **Lead Time by Time Spent in Stages Report** to calculate lead time for issues moving through your issue management system, such as Jira. By default, this report shows the average total lead time for all issues. You can drill down to explore data for individual issues. You can also configure this report to show the median, 90th percentile, or 95th percentile, instead of the average time.

Lead time is based on the stages configured in the [Workflow profile](#workflow-profiles-for-lead-time). Elapsed time for a stage is based on when an issue enters a given stage and when it leaves that stage. Overall lead time for all issues is based on all issues that have passed through the defined stages.

When configuring the [Workflow profile](../../sei-profiles/workflow-profile.md) for this report, make sure you only track issues in issue management. To do this:

* Make sure the **Start Event** is **Ticket Created**.
* Disable the development (SCM) stages.
* Make sure the workflow only includes issue management stages.

This report requires that you set the **Issues Resolved In** filter, because only issues that have completed the entire issue management workflow are considered in the lead time calculation.

:::tip Tips

* For the most accurate lead time measurements, be diligent about updating issue statuses, and make sure your workflow has a sufficient variety of statuses to capture the entire development process. This report tracks the entire issue lifecycle, including bounces back into previous stages.
* Use this report along with the [Jira Releases Report](./issues-reports.md#configure-the-jira-releases-report), which helps analyze your team's release pattern and understand the average time elapsed between issue creation and release.
* To reduce load time for this widget, you can enable **Pre-Calculation**. This setting prepares Lead Time calculations, rather than running calculations in real time each time you load the Insight. Pre-calculation must be enabled for specific **Lead Time by Time Spent in Stages Report** widgets - You can't enable it globally. The following time ranges are pre-calculated: Last two weeks, last month, last three months, last 30 days, last quarter, and last two quarters.

:::

## Issue Lead Time by Stage Report

The **Issue Lead Time by Stage Report** tracks lead time by development stages. You can limit it to issue management or track your entire SDLC (including issue management, SCM, and CI/CD). By default, this report shows the average total lead time for all issues. You can drill down to explore data for individual issues. You can also configure this report to show the median, 90th percentile, or 95th percentile, instead of the average time.

This report is useful for measuring the velocity of tasks from the time they are created in issue management to the time they are deployed through CI/CD.

Lead time is based on the stages configured in the [Workflow profile](#workflow-profiles-for-lead-time). Elapsed time for a stage is based on the first time an issue enters a given stage and the first time it leaves that stage. Overall lead time for all issues is based on all tickets that have passed through the defined stages.

When configuring the [Workflow profile](../../sei-profiles/workflow-profile.md) for this report, make sure:

* The **Start Event** is **Ticket Created**. This ensures that lead time tracking starts in issue management.
* Configure stages for issue management and other tools you want to track, such as SCM and CI/CD.
* Stages flow sequentially from one tool to the next, such as *Development in Progress* in Jira followed by your SCM development stages (first commit and PR creation-to-merge time).
* Stages *do not* overlap. Meaning, the same event *is not* tracked in multiple tools, such as *Deploy to Production* in Jira and a *CI/CD Deploy* stage.

This report requires that you set the **Issues Resolved In** filter, because only issues that have completed the entire issue management workflow are considered in the lead time calculation.

You can add additional filters to the widget to define what type of issues or PRs should be considered in the lead time calculation. Filters are associated with the widget/Insight, and they persist even if you change [collections associated with Insights](../../sei-collections/manage-collections.md#manage-insights-associations). When configuring widgets or modifying Insight associations. widgets may break or gain/lose data when associations change.

You can also add filters at the collection level. Collection-level filters take precedence over widget-level filters when defined for the same attribute. For non-conflicting filters, both filters are considered.

If you have multiple filters, they are inherently combined with `AND` operators.

## Issue Lead Time by Type Report

Similar to the [Issue Lead Time by Stage Report](#issue-lead-time-by-stage-report), the **Issue Lead Time by Type Report** presents lead time measurements broken down by issue type (bug, story, task, and so on).

## Lead Time Single Stat

**Lead Time Single Stat** presents a single stat related to lead time over a given time range.

When you configure a single stat widget:

* You can create filters for any field that can be viewed as a single value, such as issue type, priority, status, labels, components, and so on.
* The available fields depend on your [integrations](/docs/category/integrations), and you can choose from custom fields, if they exist in your SCM, issue management, or support tool.
* If you use multiple filters to focus the widget (such as to show the total number of *bugs* in the *won't do* status for a specific project), the filters are inherently combined by `AND` operators.
* Keep in mind that single stat widgets intend to show a single value, such as the total number of tickets or the sum of story points. Determine what single stat you want to show, and then create your filters accordingly.

You might want to set the time range to **Use Insight time**, which allows the user to select a time range when viewing the Insight where this widget is present.

## DORA Lead Time For Changes

For information about the Lead Time For Changes DORA metric, go to [DORA metrics](../dora-metrics.md).

## PR and SCM lead time

For information about reports that track PR lead time, SCM issue lead time, and lead time between SCM commits and CI/CD jobs, go to [SCM reports](./scm-reports.md). Such reports include:

## Support lead time

For information about support lead time reports, such as the **Support Response Time Report** and the **Support Response Time Trend Report**, go to [Support reports](../support-metrics.md).
