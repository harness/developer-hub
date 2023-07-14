---
title: SCM reports
description: These widgets show metrics related to SCM activity.
sidebar_position: 50
---



## SCM PRs Report

The **SCM PRs Report** shows a high level view of PRs moving through your SCM.

On the **Filters** tab, you can configure what data feeds into this widget by creating inclusive and exclusive filters. For example, you can set the widget to show PRs in closed status in the last 7 days.

On the **Aggregations** tab, you can select the dimension to use for the X-axis, such as **Project**, **Creator**, **Branch**, and so on. This determines what you want the widget to focus on. For example, focusing on **Project** can show you the PR resolution time for different work areas; whereas, focusing on **Creator** can show you PR resolution time by PR author.

On the **Settings** tab, you can:

* Select the code change size and code density, if you want to exclude small PRs.
* Select how you want to sort X-axis data, such as ascending or descending.
* Select the maximum number of unique values to show on the X-axis.
* Select the visualization (bar chart, pie chart, line chart, and so on).

## SCM Lead Time

<!-- ("issues lead time by stage" - Lead time by development stages, entire SDLC, all tools) VELOCITY: lead time by stage, lead time trend, lead time by type, lead time single stat -->
<!-- (Specifically for jira/issue management) VELOCITY: lead time by time spent in stages -->
<!-- VELOCITY & DORA: SCM commit to cicd job lead time report, aka Commit to deployment lead time - jobs commits lead single stat, jobs commit leads trends report -->
<!--  (this section) VELOCITY: SCM PR lead time by stage report - scm pr lead time trend report, scm pr lead time by stage report -->

Use the **SCM PR Lead Time by Stage Report** to examine Lead Time based on PR stages. You can also use the **SCM PR Lead Time by Stage Trend Report** to examine daily, weekly, and monthly PR lead time trends.

:::info

The terms *Pull Request (PR)* and *Merge Request* are interchangeable.

:::

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

## Other SCM and code velocity reports

* **Code Volume Vs. Deployment Report**
