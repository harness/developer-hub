---
title: DORA metrics
description: DORA metrics are key metrics for describing a software development team's performance.
sidebar_position: 10
sidebar_label: DORA
---

DORA (DevOps Research Assessment) identified the following key metrics that describe a software development team's performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore service (MTTR), and Reliability (MTBF).

With SEI, you can use [DORA Metrics Insights](../sei-insights.md#dora-metrics) to examine your organization's DORA metrics. This helps you understand how your organization or team is performing and helps you get an overview of daily, weekly, and monthly trends.

Furthermore, SEI gives you the flexibility to choose the [integrations](/docs/category/integrations) from which you want to derive data, such as issue management, SCM, incident management, and CI/CD tools, as well as the ability to select filters to refine the data used to generate your metrics.

## Deployment Frequency

Deployment Frequency represents how often an organization successfully releases software to production.

To monitor Deployment Frequency, you must create a [Workflow profile](../sei-profiles/workflow-profile.md) and add the **Deployment Frequency** widget to your Insights.

Workflow profiles determine the integrations to track, the events that mark deployments (such as merged PRs or CI/CD jobs), and the associated Collections. You can modify Workflow profiles according to your team's SDLC process and the parts of the SDLC process you want to monitor (such as only SCM or combined issue management, SCM, and CI/CD). For more information, go to [Workflow profile](../sei-profiles/workflow-profile.md).

To add the **Deployment Frequency** widget to Insights:

1. Go to the Insight where you want to add the widget. Make sure you are in the correct project.
2. Select **Settings**, and then select **Add Widget**.
3. Select the **Deployment Frequency** widget.
4. Configure the widget settings as desired.
5. Select **Next: Place Widget**, place the widget on the Insight, and then select **Save Layout**.

The widget automatically detects the relevant Workflow profile based on the Collections associated with the Insight.

### Deployment Frequency calculation

Deployment Frequency performance is ranked on the following grading scale:

* Elite: More than one deployment per day.
* High: Deployments occur anywhere from once per day to once per week.
* Medium: Deployments occur anywhere from once per week to once per month.
* Low: Deployment occur less than once per month.

The Deployment Frequency formula depends on whether you are tracking issue management, SCM, or CI/CD. The following factors can contribute to Deployment Frequency calculations:

* The SEI integration chosen in the Workflow profile.
  * For issue management SEI integrations, SEI counts the number of issues deployed.
  * For SCM SEI integrations, SEI counts the number of PRs deployed.
  * For CI/CD SEI integrations, SEI counts the number of jobs deployed.
* Filters applied to the Workflow profile.
* Collection-level filters.
* Widget-level filters.
* Insight time range, which is the time range selected by the user when viewing the Insight.

<details>
<summary>Deployment Frequency calculation example</summary>

Consider the following Deployment Frequency configuration:

* SEI integration: Jira
* Filter: Status Category Equals Done
* Calculation parameter: Ticket resolved in Insight time range
* Time Range selected on the dashboard: Last 3 months

With this configuration, the Deployment Frequency widget shows the total number of tickets with a status of **Done** in the given time range.

```
Daily Deployment Frequency = ( Tickets in Done status ) / ( Days in Time Range )
Weekly Deployment Frequency = ( Tickets in Done status ) / ( Days in Time Range / 7 )
```

Assuming there are 24 tickets in **Done** status in the last 91 days, then the Deployment Frequency is 0.263 deployments per day and 1.846 deployments per week.

```
24 / 91 = 0.263
24 / 13 = 1.846
```

</details>

## Lead Time for Changes

Lead Time for Changes represents the amount of time it takes a commit to get into production.

The overall lead time is the sum of the average time spent in each stage configured in the workflow. This metric can help identify where the team is spending time and if the amount of time spent in each stage falls in an acceptable range.

Note that for lead time metrics you can define stages based on either of the following events:

* Ticket Created: This event ensures that lead time tracking starts in issue management.
* Commit Created: This event ensures that lead time tracking starts when the first commit is committed.
* API Event: This This event triggers the lead time calculation based on a custom API event.

The default configuration for a Ticket-based workflow profile has five stages where as PR-based Workflow profile has four stages. To find more information, go to [Workflow profiles for lead time](../sei-profiles/workflow-profile.md#workflow-profiles-for-lead-time).

### Lead Time for Changes calculation

Overall lead time is the sum of the time spent in each stage in a workflow, such as commit-to-deployment time for a change, open-to-merge time for PRs, or the issue workflow for issues in your issue management system. Lead time can help identify where a team is spending time and if the amount of time spent in each stage falls in an acceptable range.

The specific events or stages considered in a lead time calculation depend on the report and the stages defined in the associated [Workflow profile](../sei-profiles/workflow-profile.md#workflow-profiles-for-lead-time). The lead time ultimately depends on the stages that a PR or issue actually goes through. For example, if there are no comments on the a, then the *time to comment* is zero.

### Development Stages in Lead Time For Changes

#### Lead Time to First commit

This metric refers to the amount of time that passes from the beginning of a development cycle (like the start of a sprint or when a feature is first planned) to the first commit in the SCM. Essentially, it measures how long it takes to start actual coding work after a task is defined.

#### PR Creation Time

This metric can be defined as either:

* Time from Commit to First PR Creation: This is the duration between the first commit in a repository and the creation of the first pull request that includes this commit. It reflects how promptly changes are proposed for review after initial development.
* Time from Commit to Last PR Creation: This measures the time from the first commit to the creation of the last pull request that includes this commit. This could be longer, especially in cases where commits are made early but the PR is created much later after further development.

#### Time to Comment

Users can choose to calculate this as either:
  
* Time from PR Creation to First Comment: This metric measures the duration from the moment a pull request is created to the time the first comment is made on it. It's an indicator of the engagement and response time of the team or reviewers.
* Time from PR Creation to Last Comment: This is the time taken from the creation of the PR to the last comment made. It could indicate the overall duration of discussion or review on the PR.

#### Approval Time

This metric can be defined as either:
  
* Time from the PR Creation to the First Approval: This measures the time taken from the creation of a pull request to its first approval. It's a gauge of how quickly a PR is reviewed and approved by the team.
* Time from the PR Creation to the Last Approval: This is the duration from the PR creation to the last approval it receives. In workflows requiring multiple approvals, this metric indicates the total time taken for all necessary reviews.

#### Merge Time

This metric can be defined as either:

* Time to Merge the First PR: This is the time taken to merge the first pull request after it has been created. It indicates the speed at which changes are integrated into the main branch.
* Time to Merge for the Last PR Merge: This measures the time taken to merge the last pull request. In scenarios with multiple PRs, this metric can show how long it takes to integrate all changes from various PRs into the main branch.

:::info
Note that for Lead Time For Changes Report you can choose to enable or disable the Development Stages based on your requirements.
:::

The following examples demonstrate how PR lead time would be calculated in different scenarios. These examples are based on the default configuration for a PR-based Workflow profile, which has four stages: PR creation time, time to first comment, approval time, and merge time.

When reviewing these examples, consider the following:

* *Time to Comment* helps you understand the lead time between PR creation time and the associated review.
* There are two ways to track the time taken for a PR approval:
  * Default *Approval Time* configuration: The overall approval time, starting from PR creation.
  * *Approval Time* minus *Time to Comment*: Time spent in the review cycle when an active reviewer is involved.
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
PR creation time = Time to First PR creation - Time to Commit (Default)
Time to Comment = Time to first comment - Time to PR creation (Default)
Approval Time = 0
Merge Time = Time for the first approval - Time to the PR creationb(Default)
```

Approval Time is calculated as `0` because there were no review comments made on the PR.

</details>

### Add the report

The **Lead Time for Changes** widget aggregates lead time across your issue management system, SCM, and CI/CD tools.

To add the **Lead Time for Changes** widget to Insights:

1. Go to the Insight where you want to add the widget. Make sure you are in the correct project.
2. Select **Settings**, and then select **Add Widget**.
3. Select the **Lead Time for Changes** widget.
4. Configure the filters for the widget.
5. On the **Settings** tab, select the relevant [Workflow profile](../sei-profiles/workflow-profile.md).

  Workflow profiles, also known as Lead Time profiles, determine the integrations to track, the start events that trigger lead time tracking (such as ticket creation or commit creation), and the stages that issues follow in your SDLC.

  You can modify Workflow profile stages according to your team's SDLC process and the parts of the SDLC process you want to monitor (such as only SCM or combined issue management, SCM, and CI/CD). For more information, go to [Workflow profile](../sei-profiles/workflow-profile.md).

6. Select **Next: Place Widget**, place the widget on the Insight, and then select **Save Layout**.

For information about other Lead Time reports, go to [Lead time reports](./velocity-metrics-reports/lead-time-reports.md).

## Change Failure Rate

Change Failure Rate represents the percentage of deployments that cause a failure in production.

To monitor Change Failure Rate in SEI, you must set up a [Workflow profile](../sei-profiles/workflow-profile.md), and then add the **Change Failure Rate** widget to Insights.

1. Go to **Settings** and select **Workflow Profiles**.
2. Select **Add Profile** or select an existing profile to modify.
3. If this is a new profile, on the **Workflow Profile Configuration** page, enter a name for the profile.
4. Select **Change Failure Rate**, and select the [SEI integration](/docs/category/integrations) to use. Configuration details vary by SEI integration type. Default values are pre-populated, and you can change them, if desired. For example:

   * Select factors to use to calculate failed deployments.
   * Select factors to use to calculate total deployments.
   * Select whether the failed deployment calculation should be based on items that were *updated/ended* or *created/started* within the Insight time range. *Insight time* is the time range selected by the user when viewing the Insight.

   Here you can also select **Show absolute value** if you would rather get the absolute value than the rate (percentage).

5. If you want to view or change the projects and Collections associated with the profile, select **Associations**. Projects and Collections are automatically derived from the SEI integration you chose for **Change Failure Rate**. For more information, go to [Collections](/docs/category/projects-and-collections).
6. Select **Save** to save the profile.
7. Go to the Insight where you want to add the Change Failure Rate widget. Make sure you are in the correct project.
8. Select **Settings**, and then select **Add Widget**.
9. Select the **Change Failure Rate** widget.
10. Select **Next: Place Widget**, select where you want to place the widget on the Insight, and then select **Save Layout**.

The Change Failure Rate widget is now part of your Insight.

### Change Failure Rate calculation and scoring

Change Failure Rate performance is ranked on the following grading scale:

* Elite: Failure rate under 15 percent.
* High: Failure rate of 16 to 30 percent.
* Medium: Failure rate of 31 to 45 percent.
* Low: Failure rate above 45 percent.

The Change Failure Rate is calculated by dividing the number of failed deployments by the total number of deployments. The actual values included in this calculation are based on the following factors:

* The SEI integration chosen in the Workflow profile.
  * For issue management SEI integrations, SEI counts the number of issues deployed.
  * For SCM SEI integrations, SEI counts the number of PRs deployed.
  * For CI/CD SEI integrations, SEI counts the number of jobs deployed.
* Filters applied to the Workflow profile.
* Collection-level filters.
* Widget-level filters.
* Insight time range, which is the time range selected by the user when viewing the Insight.

<details>
<summary>Change Failure Rate calculation example</summary>

Consider the following Change Failure Rate configuration:

* SEI integration: Jira
* Filter for Failed Deployment: Status Category Equals Done
* Filter for Total Deployment: Status Category Equals Done, To do, In Progress
* Calculation parameter: Ticket resolved in Insight time range
* Time Range selected on the dashboard: Last 3 months

With this configuration, the Change Failure Rate widget shows the total number of tickets with a status of **Done** divided by the total number of tickets with a status of **Done**, **In Progress**, or **To Do**.

```
Change Failure Rate = ( Tickets in Done status ) / (Tickets in Done status + Ticket in In Progress status + Tickets in To Do status )
```

Assuming there are 45 tickets in **Done** status and 90 tickets in **Done**, **In Progress**, or **To Do** status, then the Change Failure Rate is 45 divided by 90, or 0.5 (50 percent).

```
45 / 90 = 0.5
Change Failure Rate = 50%
```

</details>

## Mean Time To Restore (MTTR)

Mean Time To Restore/Recover (MTTR), or Time to Restore Service, indicates how long it takes an organization to recover from a failure in production.

MTTR is a good metric for assessing the speed of your recovery process across several areas of technology. The overall time can be analyzed stage by stage over the organization's failure recovery workflow.

There are several ways to present MTTR in SEI Insights, including:

* **DORA Mean Time To Restore**
* **Time To Restore Service**
* **[Issue Resolution Time reports](./velocity-metrics-reports/issues-reports.md)**

## Mean Time Between Failures (MTBF)

Mean Time Between Failures (MTBF), or reliability, measures the average amount of time a system or component operates without failing. It is expressed as a continuous operating time in hours, days, or other units of time. It is an indicator of an assets reliability, or availability, and it is useful for estimating how likely an asset is to fail and how often certain failures occur. This metric is critical for reliability engineering.

There are several ways to present MTTR in SEI Insights. For example, you can use [Issue Resolution Time reports](./velocity-metrics-reports/issues-reports.md) to track MTBF.
