---
title: Sprint metrics
description: Use sprint metrics to plan and deliver on sprints more effectively.
sidebar_position: 30
---

Sprint metrics can help you plan and deliver on sprints more effectively, including backlog grooming and story hygiene. These metrics can help you address business problems like:

* Do teams consistently deliver on sprint plans? If not, why?
* What is the impact of creep or un-estimated tickets on plans?
* Are teams overburdened or underutilized by the sprint plans?

## Sprint metrics

* Average Ticket Size Per Sprint: This metric calculates the average size or effort of tickets (tasks, user stories, etc.) completed in each sprint. It helps in understanding the typical workload for the team in terms of effort.&#x20;
* Commit Done Tickets: The count of individual work items (tickets) that were committed and successfully completed.
* Commit Missed Tickets: The count of work items that were committed but not completed.
* Commit Tickets: The count of work items committed for the sprint.
* Creep Done Tickets: The count of tickets related to additional work that was completed during the sprint.
* Creep Missed Points: The sum of points associated with additional work that was not completed as planned.
* Creep Missed Tickets: The count of tickets related to additional work that was not completed.
* Creep Tickets: The count of tickets related to additional work introduced during the sprint.
* Done Tickets: The count of tickets that are marked as "done" or completed in the sprint.
* Missed Points: The sum of points of work that was planned but not completed.
* Missed Tickets: The count of tickets that were planned but not completed.
* (Sprint velocity) Velocity Points: The total sum of points completed in the sprint, indicating the team's productivity.
* (Sprint velocity) Velocity Points STDEV (Standard Deviation): Standard deviation of the velocity points. It shows the variability in the team's productivity over multiple sprints.

Sprint metrics include commit points, commit done points, commit missed points, creep points, creep done points, and delivered points.

:::info

Sprint metrics are not supported for sub-tasks.

:::

### Commit points

* Commit Points: The sum of points committed for the sprint, indicating the total planned effort.

Commit points represents the number of story points a team planned to deliver at the beginning of the sprint. It is the sum of story points for all the tickets in the sprint backlog at the sprint start time.

For example:

* An un-estimated task at the beginning of a sprint: Adds 0 commit points.
* A task estimated as 2 story points: Adds 2 commit points.
* A task estimated as 2 points at the beginning of the sprint and later revised to 5 points during the sprint: Adds 2 commit points.
* A task estimated at 1 point is removed from the sprint while the sprint is in progress: Adds 1 commit point.
* A task estimated at 2 points is completed before the sprint start time and then added to the sprint: Adds 2 commit points and 2 [commit done points](#commit-done).

### Commit done points

* Commits Done Points: Represents the sum of points associated with committed work that has been completed. Points can represent effort, complexity, or value of the work items.

Commit done is the sum of story points for all committed and completed tickets in the sprint backlog at the sprint close time.

For example:

* A completed a task estimated as 2 points: Adds 2 commit done points.
* A completed a task estimated as 3 points at the beginning of the sprint and later revised to 1 point during the sprint: Adds 1 commit done point.
* A task estimated at 1 point is removed from the sprint but still completed while the sprint was in progress: Adds 1 [commit point](#commit-points) and 1 commit done point.

### Commit missed points

* Commit Missed Points: The sum of points associated with committed work that was not completed as planned.

Commit missed points are the sum of story points for all planned, but incomplete, tasks at the sprint close time.

### Creep points

* Creep Points: The sum of points of additional work introduced during the sprint.

Creep points are the number of points for all tickets added to the sprint after the sprint start time.

For example:

* An unestimated ticket added in the middle of the sprint: Adds 0 creep points.
* A ticket estimated at 2 points added in the middle of the sprint: Adds 2 creep points.
* A ticket estimated at 2 points added in the middle of the sprint and later revised to 5 points during the sprint: Adds 5 creep points.

### Creep done points

* Creep Done Points: The sum of points associated with additional work or changes introduced during the sprint that were successfully completed.

Creep done points are the sum of story points for all creep tickets completed in the sprint. A creep ticket is a ticket added to the sprint after the sprint starts.

### Delivered points

Delivered points, also called the _velocity_, are the sum of story points for all tasks completed within a sprint. The calculation is based on the assigned story points at the end of the sprint. It is the sum of [commit done points](#commit-done-points) and [creep done points](#creep-done-points).

```
Delivered points = Commit done points + Creep done points
```

### Sprint Velocity

Sprint velocity is a measure of a development team's productivity and predictability. It quantifies the amount of work a team completes during a sprint. This work is typically measured in story points, a relative estimation unit used to gauge the complexity and effort required for a task.

Calculation: The Sprint Velocity is computed as the total number of story points completed in a sprint

**Sprint Velocity = Total Story Points Completed in a Sprint**

Sprint velocity is crucial for teams and organizations as it enables predicting future capacity for accurate planning, supports continuous improvement by refining estimation processes, aids resource allocation based on team performance, ensures realistic sprint commitments to prevent overcommitment, and helps teams adapt and optimize strategies in response to changing conditions.

## Sprint metrics ratios

* Commits Done Ratio: The ratio of points completed compared to the points committed. It indicates how well the team is meeting their commitments in terms of work effort.&#x20;
* Commits Done Ratio STDEV (Standard Deviation): Standard deviation of the commit done ratio. It shows the variability in meeting commit ratios over multiple sprints.
* * Commit Missed Ratio: The ratio of points not completed compared to the points committed. It highlights the extent to which commitments were not met.
* * Creep Done Ratio: The ratio of points of additional work completed compared to the points of original commitment.
* * Creep Done to Commit Ratio: The ratio of points of additional work completed to the points of original commitment.
* * Creep Missed Ratio: The ratio of points of additional work not completed compared to the points of original commitment.
* Creep to Commit Ratio: The ratio of points of additional work introduced to the points of original commitment.
* Creep to Commit Ratio STDEV (Standard Deviation): Standard deviation of the creep to commit ratio. It indicates variability in the ratio of additional work introduced to the original commitment.
* Delivered to Commit Ratio: The ratio of points delivered (completed) to the points committed for the sprint.
* Delivered to Commit Ratio STDEV (Standard Deviation): Standard deviation of the delivered to commit ratio. It represents the variability in the ratio of delivered points to committed points.

The following ratios are calculated from sprint metrics:

* `Delivered to commit ratio = Delivered points / Commit points`
* `Commit done ratio = Commit done points / Commit points`
* `Commit missed ratio = MAX(0, 1 - Commit done ratio`
* `Creep to commit ratio = Creep points / Commit points`
* `Creep done ratio = Creep done points / Creep points`
* `Creep missed ratio = MAX(0, 1 - Creep done ratio)`
* `Creep done to commit ratio = Creep done points / Commit points`

### Done to Commit

The Done to Commit Ratio is a pivotal metric that assesses the team's ability to meet their commitments and effectively manage their workload within a sprint. By quantifying the ratio of completed work to initially committed work, this metric provides key insights into the alignment between team capacity and sprint planning.&#x20;

Calculation: The Done to Commit Ratio is computed by dividing the number of points delivered at the end of the sprint by the story points committed at the beginning of the sprint.

**Done to Commit = Number of points delivered / Story points committed**&#x20;

**Done to Commit around 80%:** Here the team strikes a balance between pushing their capabilities and avoiding overcommitment. An 80% ratio suggests that the team is challenging itself while remaining realistic about what can be achieved within the sprint.&#x20;

**Done to Commit values above 95%:** Such ratios indicate that the sprint plan might not be fully leveraging the team's capacity. Overly high values could imply that the team isn't pushing themselves enough or that their commitments were conservative. This may lead to underutilization of the team's potential.&#x20;

**Done to Commit values below 65%:** Ratios below 65% signal potential overload. Teams might be stretching themselves too thin, and the commitments might be unrealistic given the available capacity. Low ratios could lead to reduced quality, burnout, and difficulties in meeting sprint goals.

### Scope Creep (Unplanned Work)

Scope creep refers to the unplanned work or changes that are introduced to a project after its initial planning and commitment. related to the points that are added to a sprint after its start, which can include tasks, features, or issues that were not part of the original sprint plan. These unplanned additions can impact a team's capacity and ability to deliver on their commitments.

Calculation: The Scope Creep ratio is calculated as the average of the Creep To Commit percentage, excluding sprints with 0% creep. In this context, “creep” refers to the points associated with unplanned work or changes, while “commit” refers to the planned points that the team committed to deliver during the sprint. The formula for the Scope Creep Ratio is as follows:

**Scope Creep Ratio = (Sum of Creep To Commit % for sprints)/ (Number of sprints)**&#x20;

Note: Only non-zero creep to commit % is considered for calculation\
\
It’s important to consider that while the value of creep points can be 0, indicating a situation where no unplanned work occurred (a positive outcome), the value of commit points cannot be 0 as it reflects a negative outcome, indicating that no work has been committed despite the project’s existence.

**Why is Scope Creep Ratio Calculated?**&#x20;

The scope creep ratio provides valuable insights into the impact of unplanned work on the sprint's overall plan and team's capacity. A higher scope creep ratio indicates that a significant portion of the team's effort is being diverted to tasks that were not originally accounted for.

## Sprint metrics reports

Use sprint metrics reports to analyze sprint and planning metrics.

:::tip

When configuring sprint metrics reports, the following two settings are popular for examining sprint metrics:

* **Sprint End Date:** Use this time range filter to limit metrics to the last few sprints. It is recommended to observe sprint metrics over 2 months or 6 sprints.
* **Sprint Report:** Use this field to limit the metrics to a selected _sprint stream_ or sprint names with a common prefix.

:::

### Creep to Commit Ratio

Creep to Commit Ratio is used to measure the extent of unplanned work (referred to as “creep”) that is added to the sprint after it started, in comparison to the original commitment made at the beginning of the sprint. The ratio helps teams and managers understand the impact of unplanned work on their sprint commitments and overall capacity.

Calculation: The Creep to Commit ratio is computed by dividing the total number of creep points by the number of commit points at the beginning of the sprint.

**Creep to Commit Ratio = (Unplanned Points Added to Sprint after Start) / (Committed Points at the Beginning of the Sprint)**

Ideally a team aims to keep this ratio low, as higher ratios can indicate challenges in managing unplanned work effectively. Here’s how to interpret the ratio:

**Low Ratio (<20%):** A lower ratio indicates that the team is relatively successful in managing unplanned work. The majority of the work completed aligns with the initial sprint commitment and unplanned work is being minimized.

**Moderate Ratio (20% - 40%):** A moderate ratio suggests that some unplanned work has been introduced, but it is still within acceptable limits. The team is accommodating some level of unplanned work without compromising their main commitments.

**High Ratio (>40%):** A higher ratio indicates that a significant portion of the work completed during the sprint was unplanned. This can signal challenges in managing unplanned work, potentially leading to difficulties in meeting planned commitments.

### Sprint Metrics Trend Report

The **Sprint Metrics Trend Report** is recommended for visualizing a time series trend of sprint metrics, like **commit done points**, **creep points**, or **commit points**.

<figure>

![](../static/sprint-metrics-trend-report.png)

<figcaption>Sprint Metrics Trend Report</figcaption>
</figure>

### Sprint Metrics Percentage Trend Report

Use the **Sprint Metrics Percentage Trend Report** to examine a time series trend of selected [sprint metrics ratios](#sprint-metrics-ratios). This report is recommended for visualizing changes in the **commit done ratio**, **total done to commit ratio**, and **creep to commit ratio**.

<figure>

![](../static/sprint-metrics-percentage-trend-report.png)

<figcaption>Sprint Metrics Percentage Trend Report</figcaption>
</figure>

### Sprint Metrics Single Stat

The **Sprint Metrics Single Stat** widget presents a single sprint metric averaged over the selected time interval.

<figure>

![](../static/sprint-metric-single-stat.png)

<figcaption>Sprint Metrics Single Stat</figcaption>
</figure>

For example, the **Sprint Metrics Single Stat** widget can help you [use historical metrics for sprint prediction and performance assessment](#use-historical-metrics-for-sprint-prediction-and-performance-assessment).

#### Sprint Metrics Single Stat configuration options

* **Metric Selection:** Select the [sprint metric](#sprint-metrics) or [sprint metrics ratio](#sprint-metrics-ratios) that you want to show on this widget.
* **Ideal Range:** Define ideal ranges for metrics such as velocity points, commit ratios, and more. You can set upper and lower bounds to indicate acceptable performance ranges.
* **Sprint Creep Grace Period:** Define a grace period during which any additional work or changes introduced at the beginning of the sprint are considered part of the original commitment rather than creep.
* **Additional Done Statuses:** Specify additional ticket statuses that you want to consider equivalent to **Done** for the purpose of metrics calculation.
* **Issue Management System:** Select the issue management system from which to pull data for the widget. Available systems depend on your configured [integrations](/docs/category/integrations).

### Other reports

* **Sprint Impact of Unestimated Tickets Report**
* **Sprint Goal Report**
* **Sprint Distribution Retrospective Report**

## Sprint metrics use cases

These examples show how you can use sprint metrics to measure team performance.

### Measure team performance in recent sprints

Use the **commit done ratio** to check the team's performance on recent sprint plans. Compute this metric as an average over the last 2 months or 6 sprints.

If the average **commit done ratio** over a long period of time is above 70 percent, then the team is executing sprint plans well and could potentially take on more load. If the **total done to commit ratio** is above 120 percent, then the sprint plans aren't making full use of the team's capacity.

An **commit done ratio** below 60 percent indicates poor performance on sprint plans, and there is room for improvement in sprint delivery. There are several reasons a team might perform poorly on sprint plans. Check for:

* The impact of creep and context switching on sprint plans. Check the **creep to commit ratio** and the **creep done to commit ratio**. Creep that is consistently above 40 percent could have an impact on sprint deliverables.
* Vague requirements that cause rework and impact sprint delivery. Use an [Issue Hygiene Report](../quality-metrics-reports/quality-metrics.md#issue-hygiene-reports) to check the sprint's **Hygiene Score**.
* If none of the above apply, then the team may be consistently planning for more than they can deliver.

Here is a flow chart illustrating the use of sprint metrics for performance analysis:

<!-- ![](../static/diagram-sprint-metrics.png) -->

<docimage path={require('../static/diagram-sprint-metrics.png')} />

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

| Issue   | Status      | Commit points | Commit done points | Delivered points | Creep points | Creep done points |
| ------- | ----------- | ------------- | ------------------ | ---------------- | ------------ | ----------------- |
| LO-1    | Done        | 2             | 2                  | 2                | -            | -                 |
| LO-2    | Done        | 1             | 2                  | 2                | -            | -                 |
| LO-3    | Done        | -             | -                  | 5                | 5            | 5                 |
| LO-4    | In Progress | 5             | -                  | -                | -            | -                 |
| LO-5    | In Progress | -             | -                  | -                | 1            | -                 |
| LO-6    | Done        | 1             | 1                  | 1                | -            | -                 |
| LO-7    | To Do       | 1             | -                  | -                | -            | -                 |
| Total   | -           | 10            | 5                  | 10               | 6            | 5                 |

Using the above points values to produce sprint metrics ratios, the results of the sprint performance analysis are as follows:

| Metric                          | Value        | Analysis                                                   |
| ------------------------------- | ------------ | ---------------------------------------------------------- |
| Commit done ratio               | 5/10 = 50%   | Indicates poor performance on the plan.                    |
| Done/Delivered to commit ratio  | 10/10 = 100% | Indicates an overall good job delivering on commitments.   |
| Creep to commit ratio           | 6/10 = 60%   | Indicates too much creep in the plan.                      |
| Creep done to commit ratio      | 5/10 = 50%   | Poor performance on the plan is explained by creep.        |

### Use historical metrics for sprint prediction and performance assessment

You can use historical cycle time data and key metrics to evaluate a team's performance, predict the number of items that can be completed in the next sprint, enhance sprint planning, and improve overall efficiency.

Use [Sprint Metrics Single Stat widgets](#sprint-metrics-single-stat) to present the [sprint metrics](#sprint-metrics) or [sprint metrics ratios](#sprint-metrics-ratios) on your Insights, such as the done to commit ratio, scope creep (unplanned work) ratio, sprint velocity, or creep to commit ratio.

After configuring the widgets, use the provided statistics to estimate the number of items for the next sprint, evaluate performance, and identify trends.
