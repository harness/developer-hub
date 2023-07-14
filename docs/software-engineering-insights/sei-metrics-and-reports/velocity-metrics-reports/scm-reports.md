---
title: SCM reports
description: These widgets show metrics related to SCM activity.
sidebar_position: 50
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
* **SCM Coding Days Single Stat:** Report a single stat related to coding days.
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
* **SCM Issues Report Trends:** Analyze changes over time in the volume of SCM issues.

### Issue first response lead time

First response lead time is measured as the time elapsed between issue creation and when someone, other than the reporter, comments on the issue.

* **SCM Issues First Response Report:** Analyze the creation-to-first-response lead time for issues in your SCM tool.
* **SCM Issues First Response Single Stat:** Report a single stat related to first response lead time.
* **SCM Issues First Response Report Trends:** Analyze changes over time for first response lead time.

### Issue resolution time

Use the **SCM Issues Resolution Time Report** to analyze the overall time taken to close SCM issues.

### Issue cycle time

The **SCM Issues Time Across Stages Report** analyzes cycle time for SCM issues. You can configure this widget by project, repository, or other parameters to help you identify the Kanban state where issues spend the most time.

Only GitHub is supported, and your [SEI GitHub connector](../../sei-integrations/sei-connector-github.md) must have the appropriate configuration to ingest issue cycle time data.

## SCM PR reports

:::info

The terms *Pull Request (PR)* and *Merge Request* are interchangeable.

:::

SCM PR Lead Time Trend Report (scm_pr_lead_time_trend_report)
SCM PR Lead Time by Stage Report (scm_pr_lead_time_by_stage_report)
SCM PRs First Review To Merge Trend Single Stat (github_prs_first_review_to_merge_single_stat)
SCM PRs First Review To Merge Trends (github_prs_first_review_to_merge_trends)
SCM PRs First Review Trend Single Stat (github_prs_first_review_single_stat)
SCM PRs First Review Trends (github_prs_first_review_trends)
SCM PRs Merge Trend Single Stat (github_prs_merge_single_stat?)
SCM PRs Merge Trends (github_prs_merge_trends) 
SCM PRs Report (github_prs_report)
SCM PRs Response Time Report (github_prs_response_time_report)
SCM PRs Response Time Single Stat (github_prs_response_time_single_stat)
SCM PRs Single Stat (github_prs_single_stat)
SCM Review Collaboration Report (review_collaboration_report)
* **SCM File Types Report:** Analyze commit and PR activity by file extension.

### SCM PRs Report

The **SCM PRs Report** shows a high level view of PRs moving through your SCM.

On the **Filters** tab, you can configure what data feeds into this widget by creating inclusive and exclusive filters. For example, you can set the widget to show PRs in closed status in the last 7 days.

On the **Aggregations** tab, you can select the dimension to use for the X-axis, such as **Project**, **Creator**, **Branch**, and so on. This determines what you want the widget to focus on. For example, focusing on **Project** can show you the PR resolution time for different work areas; whereas, focusing on **Creator** can show you PR resolution time by PR author.

On the **Settings** tab, you can:

* Select the code change size and code density, if you want to exclude small PRs.
* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of unique values to show on the X-axis.
* Select the visualization (bar chart, pie chart, line chart, and so on).

### SCM PR Lead Time by Stage Report

Use the **SCM PR Lead Time by Stage Report** to examine Lead Time based on PR stages. You can also use the **SCM PR Lead Time by Stage Trend Report** to examine PR lead time trends over time.

To add the SCM PR Lead Time widget to Insights:

1. Go to the Insight where you want to add the widget. Make sure you are in the correct project.
2. Select **Settings**, and then select **Add Widget**.
3. Select the **SCM PR Lead Time by Stage Report** widget.
4. Configure the filters for the widget.
5. On the **Settings** tab, select the relevant [Workflow profile](../../sei-profiles/workflow-profile.md), and then select **Next: Place Widget**.

   The default configuration for a [PR-based Workflow profile](../../sei-profiles/workflow-profile.md#create-a-profile-to-track-lead-time-in-scm) has four stages:

   * PR creation time.
   * Time to first comment.
   * Approval time.
   * Merge time.

   Time spent in each stage depends on the stages that a PR actually goes through. For example, if there are no comments on the PR, then there is no time to calculate for that.

   You can modify Workflow profile stages according to your team's SDLC process. For more information, go to [Workflow profile](../../sei-profiles/workflow-profile.md).

6. Select where you want to place the widget on the Insight, and then select **Save Layout**.

### Calculating PR lead time and stages

Here are some examples of PR lead time and stage calculations.

These examples are based on the default workflow configuration profile with the four stages of PR creation time, time to first comment, approval time, and merge time.

When reviewing these examples, consider the following:

* `Time to first comment` helps you understand the lead time between `PR creation time` and the first review. The Lead Time widget shows the average time for all PRs. You can drill down to explore individual PRs in the widget or Insight time frame.
* There are two ways to track the time taken for a PR approval:
  * Default `Approval Time` configuration: Time spent in the review cycle when an active reviewer is involved.
  * `Approval Time + Time to First comment`: The overall approval time, starting from PR creation.
* The overall lead time is the sum of the average time spent in each stage. This is where you can determine where teams are spending their time and whether this is an acceptable range.

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
