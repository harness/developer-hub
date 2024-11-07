---
title: Sprints Metrics Overview
description: The Complete Sprints Metrics Handbook
sidebar_position: 10
sidebar_label: Overview
redirect_url: /docs/category/sprint-metrics
canonical_url: https://www.harness.io/blog/top-3-sprint-metrics-to-measure-developer-productivity
---
Sprint metrics can help you plan and deliver on sprints more effectively, including backlog grooming and story hygiene. These metrics can help you address business problems like:

* Do teams consistently deliver on sprint plans? If not, why?
* What is the impact of creep or un-estimated tickets on plans?
* Are teams overburdened or underutilized by the sprint plans?

## Onboarding Path

<table>
    <tr>
        <td><b>Step</b></td>
        <td><b>Description</b></td>
        <td><b>Documentation</b></td>
    </tr>
    <tr>
        <td>Sprint metrics use cases</td>
        <td>These examples show how you can use sprint metrics to measure team performance</td>
        <td>[Click Here](#sprint-metrics-use-cases)</td>
    </tr>
    <tr>
        <td>Sprint metrics reports</td>
        <td>Use sprint metrics reports to analyze sprint and planning metrics </td>
        <td>[Click Here](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports)</td>
    </tr>
    <tr>
        <td>Sprint metrics</td>
        <td>List of all the metrics supported in SEI for measuring sprint success</td>
        <td>[Click Here](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics)</td>
    </tr>
    <tr>
        <td>Sprint metrics ratios</td>
        <td>These ratios are calculated from sprint metrics</td>
        <td>[Click Here](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios)</td>
    </tr>
    <tr>
        <td>Create a Sprints Insight</td>
        <td>Step by step guide to create a Sprint Insight</td>
        <td>[Click Here](/docs/software-engineering-insights/insights/sprint-metrics-insight)</td>
    </tr>
    <tr>
        <td>Best Practices and Recommendations</td>
        <td>Recommendations to improve your Sprint Metrics reporting </td>
        <td>[Click Here](#best-practices-and-recommendations)</td>
    </tr>
</table>

## Sprint metrics use cases

These examples show how you can use sprint metrics to measure team performance.

### Measure team performance in recent sprints

Use the [commit done ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#commit-done-ratio) to check the team's performance on recent sprint plans. Compute this metric as an average over the last 2 months or 6 sprints.

If the average commit done ratio over a long period of time is above 70 percent, then the team is executing sprint plans well and could potentially take on more load. If the total [done to commit ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#done-to-commit-ratio) is above 120 percent, then the sprint plans aren't making full use of the team's capacity.

A commit done ratio below 60 percent indicates poor performance on sprint plans and room for improvement in sprint delivery. There are several reasons a team might perform poorly on sprint plans. Check for:

* The impact of creep and context switching on sprint plans. Check the [creep to commit ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#creep-to-commit-ratio) and the [creep done to commit ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#creep-done-to-commit-ratio). Creep that is consistently above 40 percent could have an impact on sprint deliverables.
* Vague requirements that cause rework and impact sprint delivery. Use an [Issue Hygiene Report](/docs/software-engineering-insights/sei-metrics-and-reports/hygiene-metrics#issue-hygiene-report) to check the sprint's Hygiene Score.
* If none of the above apply, then the team may be consistently planning for more than they can deliver.

Here is a flow chart illustrating the use of sprint metrics for performance analysis:

<!-- ![](../static/diagram-sprint-metrics.png) -->

<DocImage path={require('./static/diagram-sprint-metrics.png')} />

### Analyze sprint performance

This example analyzes team performance over a sprint, as represented by the following JIRA sprint report:

| Ticket ID | Points | Status      | Notes                        |
| --------- | ------ | ----------- | ---------------------------- |
| LO-1      | 2      | Done        | Completed in the sprint      |
| LO-2      | 1 -> 2 | Done        | Points changed from 1 to 2 mid-sprint, completed in the sprint |
| LO-3      | 5      | Done        | Creep, completed in the sprint |
| LO-4      | 5      | In Progress | Not completed                |
| LO-5      | 1      | In Progress | Creep, not completed         |
| LO-6      | 1      | Done        | Completed outside the sprint |
| LO-7      | 1      | To Do       | Removed from sprint          |

The following table represents how the above JIRA sprint report is interpreted by SEI:

| Issue | Status | [Commit points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#commit-points) | [Commit done points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#commit-done-points) | [Delivered points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#sprint-velocity-delivered-points) | [Creep points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#creep-points) | [Creep done points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#creep-done-points) |
| ----- | ------ | ------------------------------- | ----------------------------------------- | ----------------------------------- | ----------------------------- | --------------------------------------- |
| LO-1    | Done        | 2             | 2                  | 2                | -            | -                 |
| LO-2    | Done        | 1             | 2                  | 2                | -            | -                 |
| LO-3    | Done        | -             | -                  | 5                | 5            | 5                 |
| LO-4    | In Progress | 5             | -                  | -                | -            | -                 |
| LO-5    | In Progress | -             | -                  | -                | 1            | -                 |
| LO-6    | Done        | 1             | 1                  | 1                | -            | -                 |
| LO-7    | To Do       | 1             | -                  | -                | -            | -                 |
| Total   | -           | 10            | 5                  | 10               | 6            | 5                 |

SEI uses the above points values to calculate sprint metrics ratios, generating the following sprint performance analysis:

| Metric | Value | Analysis |
| ------ | ----- | -------- |
| [Commit done ratio](#commit-done-ratio) | `5/10 = 50%` | Indicates poor performance on the plan. |
| [Done/Delivered to commit ratio](#done-to-commit-ratio) | `10/10 = 100%` | Indicates an overall good job delivering on commitments. |
| [Creep to commit ratio](#creep-to-commit-ratio) | `6/10 = 60%` | Indicates too much creep in the plan. |
| [Creep done to commit ratio](#creep-done-to-commit-ratio) | `5/10 = 50%` | Poor performance on the plan is explained by creep. |

### Use historical metrics for sprint prediction and performance assessment

You can use historical cycle time data and key metrics to evaluate a team's performance, predict the number of items that can be completed in the next sprint, enhance sprint planning, and improve overall efficiency.

Use [Sprint Metrics Single Stat widgets](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-single-stat) to present [sprint metrics](#sprint-metrics) or [sprint metrics ratios](#sprint-metrics-ratios) on your Insights, such as the [done to commit ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#done-to-commit-ratio), [scope creep (unplanned work) ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#creep-points), [sprint velocity](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#sprint-velocity-delivered-points), or [creep to commit ratio](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios#creep-to-commit-ratio).

After configuring the widgets, use the provided statistics to estimate the number of items for the next sprint, evaluate performance, and identify trends.

## Sprint metrics reports

Use sprint metrics reports to analyze sprint and planning metrics.

* [Sprint Metrics Trend Report](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-trend-report)
* [Sprint Metrics Percentage Trend Report](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-percentage-trend-report)
* [Sprint Metrics Single Stat](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-single-stat)
* Sprint Goal Report
* Sprint Distribution Retrospective Report
* Sprint Impact of Unestimated Tickets Report

## Sprint metrics

Sprint metrics measure points and tickets in a sprint. This includes work that was planned (committed), completed (done/delivered), incomplete (missed), or added after the sprint started (creep).

Sprint work is typically measured in story points, which are a relative estimation unit used to gauge the complexity and effort required for a task. Point can represent expected level of effort, complexity, or value of tickets.

The key sprint metrics include [Sprint velocity (delivered points)](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#sprint-velocity-delivered-points), [Churn rate](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#churn-rate), [Commit done points](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics#commit-done-points) etc. Find the complete list of supported [Sprint Metrics here](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics).

## Sprint metrics ratios

In addition to the individual metrics, there are mathematical ratios that provide insights into the team's performance and efficiency during the sprint. These ratios are calculated based on the existing sprint metrics.

Find the complete list of [Sprint Metrics ratios here](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprint-metrics-ratios).

## Create a Sprint metrics Insight

Having a Sprint Insight can help address issues related to the sprint success and enhance the overall sprint planning and delivery process. Refer to the below tutorial to learn how to create an Insight (i.e. Dashboard) configured with the most frequently used Sprint metrics reports to measure your team's contribution and activity across various sprint cycles.

* [**Tutorial: Create a Sprint Metrics Insight**](/docs/software-engineering-insights/insights/sprint-metrics-insight)

## Best Practices and Recommendations

### Improving Sprint Metrics reporting

* Apply appropriate **Filters** to ensure that the widget displays data relevant to your team's sprints or projects. This will help you analyze the right set of data for your team.
* Choose the sprint metrics that are most important for your team's goals and objectives. Different metrics provide insights into different aspects of your sprint performance, such as commitment, scope creep, and delivery.
* Configure the **Aggregation** settings (e.g., by sprint, weekly, or monthly) to align with your team's sprint cadence and reporting needs. This will help you identify trends and patterns more effectively.
* Customize the widget settings to your team's specific processes and conventions. For example, define the **Sprint Creep Grace Period** and **Additional Done Statuses** to accurately reflect your team's workflow.

### Maintaining Issue Hygiene

* Ensure that all team members consistently use the correct status fields in the issue management system when updating tickets. The platform relies on specific status values (e.g., **Done**) to calculate completed work accurately.
* When making changes to sprints, such as adding, removing, or re-estimating issues, ensure that these changes are accurately reflected in SEI by configuring the widget settings. Failing to do so can lead to discrepancies between the committed and delivered metrics displayed in the widgets.