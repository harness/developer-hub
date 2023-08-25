---
title: SCM reports
description: These widgets show metrics related to SCM activity.
sidebar_position: 70
---

SCM reports help you analyze activity in your SCM tools, including:

* Individual developer contributions.
* Volume of rework and other code changes.
* Lead time and activities related to PRs and SCM issues.
* Review collaboration.
* Most active repositories and files.

Reports can be filtered by project, repository, time range, and other data points, depending on your SCM [integrations](../../sei-integrations/sei-integrations-overview.md).

## SCM code activity reports

Use SCM code activity reports to analyze direct coding activity in your SCM tool, such as volume of commits, coding days, types of files modified, rework, and activity in each repository.

* **SCM Coding Days Report:** A coding day is any day where a developer commits code.
* **SCM Coding Days Single Stat:** Report a single stat related to coding days. Numeric values are calculated to two decimal places.
* **SCM Commits Report:** Analyze commit activity, such as number of commits per month.
* **SCM Commits Single Stat:** Report a single stat related to commit activity.
* **SCM Committers Report:** Analyze the volume of code changes by committer.
* **SCM File Types Report:** Analyze commit and PR activity by file extension.
* **SCM Files Report:** Identify code areas with a high frequency of changes. You can use this to make sure that your hottest code areas have good test coverage.
* **SCM Repos Report:** Volume of changes by repository. You can use this to identify your most active repositories.
* **SCM Rework Report:** Rework measures changes to previously-written code.

:::info Trellis Scores

Some code velocity metrics contribute to [Trellis Scores](../trellis-score.md):

* Coding days are part of the **Speed** factor.
* Number of commits per month is part of the **Volume** factor.
* Percentage of rework determines the **Quality** factor.

:::

### SCM Committers Report

With the **SCM Committers Report**, you can analyze the following data for each committer in the [Collection](../../sei-collections/collections-overview.md):

* The number of PRs they have worked on.
* The number of commits they've made.
* The number of lines of code they have contributed.

This information helps you with:

* Accountability and transparency: Establish accountability by identifying the individuals responsible for making changes to source code, and provide transparency by showing who contributed to a project.
* Project management and resource allocation: Understand the contributions of individual developers.
* Performance evaluation and recognition: Evaluate the performance of individual developers or teams based on their contributions to a project.

## SCM to CI/CD jobs reports

* **SCM Commit to CI/CD Job Lead Time Trend Report:** Analyze the time taken to deploy commits to production. This can help you improve commit-to-deployment lead time.
* **SCM Commit to CI/CD Job Lead Time Single Stat:** Report a single state related to commit-to-deployment lead time.
* **SCM Change Volume to CI/CD Job Trend Report:** Analyze the frequency and volume of deployed code changes. You can use this report to correlate increases in quality issues with the volume of deployed changes.
* **SCM Change Volume to CI/CD Jobs Single Stat:** Report a single stat related to the frequency or volume of deployed code changes.
* **Code Volume Vs. Deployment Report**

For more information about CI/CD job reports, go to [CI/CD job reports](./ci-cd-reports.md).

## SCM issues reports

Use SCM issues reports to analyze data related to the volume and lifetime of issues in your SCM tool.

### Issue volume

* **SCM Issues Report:** Analyze the number of issues in your SCM tool by time, label, or other categories.
* **SCM Issues Count Single Stat:** Report a single stat related to the number of issues in your SCM tool.
* **SCM Issues Trends Report:** Analyze changes over time in the volume of SCM issues.

### Issue first response lead time

First response lead time is measured as the time elapsed between issue creation and when someone, other than the reporter, comments on the issue.

* **SCM Issues First Response Report:** Analyze the creation-to-first-response lead time for issues in your SCM tool.
* **SCM Issues First Response Single Stat:** Report a single stat related to first response lead time.
* **SCM Issues First Response Trends Report:** Analyze changes over time for first response lead time.

### Issue resolution time

Use the **SCM Issues Resolution Time Report** to analyze the overall time taken to close SCM issues.

### Issue cycle time

The **SCM Issues Time Across Stages Report** analyzes cycle time for SCM issues. You can configure this widget by project, repository, or other parameters to help you identify the Kanban state where issues spend the most time.

Only GitHub is supported, and your [GitHub SEI integration](../../sei-integrations/sei-integration-github.md) must have the appropriate configuration to ingest issue cycle time data.

## SCM PR reports

Use the SCM PR reports to analyze data related to Pull Requests (also known as Merge Requests).

* **[SCM PRs Report](#scm-prs-report):** A high-level view of PRs moving through your SCM tool.
* **SCM PRs Single Stat:** Report a single stat related to PR activity.
* **SCM PRs First Review To Merge Trends:** Examine the time that passes between a PR's first review and when it is merged.
* **SCM PRs First Review To Merge Trend Single Stat:** Examine a single stat related to first-review-to-merge time.
* **SCM PRs First Review Trends**
* **SCM PRs First Review Trend Single Stat**
* **[SCM PR Lead Time by Stage Report](#scm-pr-lead-time-by-stage-report):** Examine lead time based on your defined PR lifecycle stages. By default, this report shows the average time for all PRs. You can drill down to explore data for individual PRs.
* **SCM PR Lead Time Trend Report:** Examine trends in PR lead-time-by-stage.
* **SCM PRs Merge Trends:** Analyze trends in lead time to merge PRs.
* **SCM PRs Merge Trend Single Stat:** Report a single stat related to lead time to merge PRs.
* **SCM PRs Response Time Report**
* **SCM PRs Response Time Single Stat**
* **SCM Review Collaboration Report:** Analyze how a team performs code reviews by examining whether PRs were approved before being merged or closed.
* **SCM File Types Report:** Analyze commit and PR activity by file extension.
* **PR Activity:** Generic PR activity report.

To examine PRs by committer, use the [SCM Committers Report](#scm-committers-report).

To understand how lead time is calculated, go to [PR lead time calculation](#pr-lead-time-calculation).

### SCM Review Collaboration Report

Use the **SCM Review Collaboration Report** to understand how a team performs code reviews, expended effort in the code review process, and overall team collaboration in PR reviews. You can determine if a team is adopting a buddy system culture, where peers regularly review each other's code, or if the team is overwhelmed by code reviews and merging code without proper approval.

You can configure this widget to track PRs merged or PRs closed by the team, along with other filters such as destination branch, project, and so on.

### SCM PRs Report

The **SCM PRs Report** shows a high level view of PRs moving through your SCM tool. This is a versatile report that analyzes different attributes in the development process through your SCM tool. You can configure this report to inspect data by assignee, destination branch, reviewer, repository, and more. For example, you can use this report to:

* Analyze how many PRs each developer raises.
* Analyze PR comments and categorize them based on a threshold.
* Better understand the overall contribution of the team.

On the **Filters** tab, you can configure what data feeds into this widget by creating inclusive and exclusive filters. For example, you can set the widget to show PRs in closed status in the last 7 days.

On the **Aggregations** tab, you can select the dimension to use for the X-axis, such as **Project**, **Creator**, **Branch**, and so on. This determines what you want the widget to focus on. For example, focusing on **Project** can show you the PR resolution time for different work areas; whereas, focusing on **Creator** can show you PR resolution time by PR author.

On the **Settings** tab, you can:

* Set thresholds for code change size and density. This is useful if you want to exclude small PRs.
   * Set small, medium, and large size thresholds based on lines of code or number of files.
   * Set shallow, good, or heavy density thresholds based on number of comments per file.
* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of unique values to show on the X-axis.
* Select the visualization (bar chart, pie chart, line chart, and so on).

### SCM PR Lead Time by Stage Report

Use the **SCM PR Lead Time by Stage Report** to examine PR velocity based on time spent in various PR lifecycle stages. By default, this report shows the average time for all PRs. You can drill down to explore data for individual PRs. You can also configure this report to show the median, 90th percentile, or 95th percentile, instead of the average time.

To add the **SCM PR Lead Time by Stage Report** to Insights:

1. Go to the Insight where you want to add the widget. Make sure you are in the correct project.
2. Select **Settings**, and then select **Add Widget**.
3. Select the **SCM PR Lead Time by Stage Report** widget.
4. Configure the filters for the widget, such as source/destination branch, reviewer, label, and so on. This defines the types of commits or PRs that are considered in the [lead time calculation](#pr-lead-time-calculation).
5. On the **Settings** tab, select the relevant [Workflow profile](#workflow-profiles-for-lead-time), and then select **Next: Place Widget**.
6. Select where you want to place the widget on the Insight, and then select **Save Layout**.

### Workflow profiles for lead time

Lead time is based on time spent in stages defined in a [Workflow profile](../../sei-profiles/workflow-profile.md).

The default configuration for a [PR-based Workflow profile](../../sei-profiles/workflow-profile.md#create-a-profile-to-track-lead-time-in-scm) has four stages:

* PR creation time.
* Time to first comment.
* Approval time.
* Merge time.

When [calculating lead time](#pr-lead-time-calculation), the time spent in each stage depends on the stages that a PR actually goes through. For example, if there are no comments on the PR, then the *time to first comment* is zero.

You can configure grading thresholds (good, acceptable, and slow) for each stage. These thresholds determine grades that appear on your PR lead time widgets. Grades are reported for each stage as well as a cumulative grade for all stages combined.

You can modify Workflow profile stages and grades according to your team's SDLC process. If you only want to track PR lead time in SCM, make sure the **Start Event** is **Commit Created**. If your Workflow profile includes stages across issue management, SCM, and CI/CD, make sure the same event is not tracked in multiple tools, such as *Deploy to Production* in Jira and a *CI/CD Deploy* stage.

For more information about modifying Workflow profiles and configuring stages for lead time calculation, go to [Workflow profile](../../sei-profiles/workflow-profile.md).

### PR lead time calculation

Several SCM PR reports include lead time. Lead time is the sum of the time spent in each stage in a workflow, such as commit-to-deployment time for a change, open-to-merge time for PRs, or the issue lifetime for SCM issues. Lead time can help identify where a team is spending time and if the amount of time spent in each stage falls in an acceptable range.

The specific events or stages considered in a lead time calculation depend on the report and the stages defined in the associated [Workflow profile](#workflow-profiles-for-lead-time). The time spent in each stage depends on the stages that a PR actually goes through. For example, if there are no comments on the PR, then the *time to first comment* is zero.

The following examples demonstrate how PR lead time would be calculated in different scenarios. These examples are based on the default Workflow profile configuration, which has four stages: PR creation time, time to first comment, approval time, and merge time.

When reviewing these examples, consider the following:

* *Time to first comment* helps you understand the lead time between PR creation time and the first review.
* There are two ways to track the time taken for a PR approval:
  * Default *Approval Time* configuration: The overall approval time, starting from PR creation.
  * *Approval Time* minus *Time to first comment*: Time spent in the review cycle when an active reviewer is involved.
* The *overall lead time* is the sum of the average time spent in each stage. This is where you can determine where teams are spending their time and whether this is an acceptable range.

<details>
<summary>SCM PR Lead Time calculation example #1</summary>

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
<summary>SCM PR Lead Time calculation example #2</summary>

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
<summary>SCM PR Lead Time calculation example #3</summary>

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
