---
title: Lead Time (Behind FF)
description: A new calculation logic for computing the Lead Time metric.
sidebar_position: 100
sidebar_label: Lead Time (Behind FF)
---
:::info
Note that the **202404.1.1 Release** introduced a new calculation logic for computing the **Lead Time** metric.
:::

Lead Time is a metric that measures the total time taken for an issue (e.g., a new feature, bug fix, or any other code change) to move through the entire software delivery pipeline, from the initial creation of the issue to its final release into production.

## Measure Average Lead Time

The new calculation logic uses the time of the entry into each stage, rather than the exit time from that stage. This means that the **Lead Time** for a particular stage is calculated as the time taken for the issue to reach that stage for the first time, rather than the time spent in that stage itself.

The **Lead Time** for a stage is calculated as the time difference between the start time of the current stage and the start time of the previous stage.

```bash
Lead Time for a Stage = Start Time of the Current Stage - Start Time of the Previous Stage
```

```bash
Total Lead Time = Sum of the Lead Time of all the Individual Stages
```

The **Total Lead Time** is calculated by summing the **Lead Time** of all the individual stages.

This change impacts the following reports:

* **Issue Lead Time By Stage report**
* **Issue Lead Time By Type report**
* **SCM PR Lead Time by Stage report**
* **DORA Lead Time for Changes report**.

This feature is currently in **BETA** and is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable this feature.

### Calculation Example

In this example, we consider a use case where a single pull request (PR) is associated with a single Jira ticket. The new **Lead Time** calculation with stages for Issue Management, CI/CD Platform and SCM is displayed below.

The table provides details on the different stages, their descriptions, formulas, and an example calculation.

<table>
  <thead>
    <tr>
      <th>Stage</th>
      <th width="224">Description</th>
      <th>Formula</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ticket In Progress Time</td>
      <td>The time taken for a ticket to move from the <code>Created</code> state to the <code>In Progress</code> state for the first time.</td>
      <td><code>In Progress Time - Ticket Created Time</code></td>
      <td>10:00 AM - 9:50 AM = 10 minutes</td>
    </tr>
    <tr>
      <td>First Commit Time</td>
      <td>The time taken to make the first commit after the ticket is in progress.</td>
      <td><code>First Commit Time - First In Progress Time</code></td>
      <td>10:05 AM - 10:00 AM = 5 minutes</td>
    </tr>
    <tr>
      <td>First Pull Request Creation Time</td>
      <td>The time when the first pull request (PR) was created after the first commit.</td>
      <td><code>First PR Creation Time - First Commit Time</code></td>
      <td>10:10 AM - 10:05 AM = 5 minutes</td>
    </tr>
    <tr>
      <td>First Pull Request Approval Time</td>
      <td>The time taken for the first approval after the first pull request was created.</td>
      <td><code>First PR Approval Time - PR Creation Time</code></td>
      <td>10:11 AM - 10:10 AM = 1 minute</td>
    </tr>
    <tr>
      <td>Last Pull Request Merge Time</td>
      <td>The time taken to merge the pull request after it was approved.</td>
      <td><code>Last PR Merged Time - First PR Approval Time</code></td>
      <td>10:15 AM - 10:11 AM = 4 minutes</td>
    </tr>
    <tr>
      <td>First Continuous Integration Time</td>
      <td>The time taken to complete the continuous integration (CI) pipelines for the first time after the last pull request is merged.</td>
      <td><code>CI Completion Time for First Time - Last PR Merged Time</code></td>
      <td>10:16 AM - 10:15 AM = 1 minute</td>
    </tr>
    <tr>
      <td>First Continuous Deployment Time</td>
      <td>The time taken for the continuous deployment (CD) pipelines to complete for the first time after the CI process is finished.</td>
      <td><code>CD Completion Time for First Time - CI Completion Time for First Time</code></td>
      <td>10:17 AM - 10:16 AM = 1 minute</td>
    </tr>
    <tr>
      <td>First Issue Management Done Time</td>
      <td>The time taken to mark the issue as <code>Done</code> in the Issue Management System (e.g., Jira) after the CD process is completed.</td>
      <td><code>Time at which the JIRA was marked as Done status for the First Time - CD Completion Time for First Time</code></td>
      <td>10:20 AM - 10:17 AM = 3 minutes</td>
    </tr>
    <tr>
      <td>First Release Time</td>
      <td>The time at which the <code>fix version</code> added to the issue is released in Jira after the issue was marked as <code>Done</code> for the first time.</td>
      <td><code>Jira Release Time - Time at which the JIRA was marked as Done status for the First Time</code></td>
      <td>11:00 AM - 10:20 AM = 40 minutes</td>
    </tr>
  </tbody>
</table>

**Total Lead Time**

The **Total Lead Time** is calculated by summing the time differences between consecutive stages:

Substituting the example values, we get:

```bash
Total Lead Time = 10 min + 5 min + 5 min + 1 min + 4 min + 1 min + 1 min + 3 min + 40 min = 70 minutes
```

Therefore, the Total Lead Time for this example is **70 minutes**.

:::info
Note that for the **Lead Time** calculation, if an issue moves to the same status multiple times during its lifecycle, only the first transition to that status is used for calculating the Lead Time for that particular stage.
:::

## Measure Median Lead Time

The median lead time is a measure that represents the middle value of all lead times when arranged in ascending order. It provides insight into the typical or expected lead time for completing work across all tickets or process instances.

### Calculation (Sum of Medians)

This is the standard way to calculate the median lead time:

For each stage in the worlkflow (for example: Stage 1, Stage 2, Stage 3, ..., Stage N), the median lead time is calculated across all tickets:

```bash
Median Lead Time for Stage 1 = Median(Stage 1 Lead Times for all tickets)
Median Lead Time for Stage 2 = Median(Stage 2 Lead Times for all tickets)
...
Median Lead Time for Stage N = Median(Stage N Lead Times for all tickets)
```

The overall median lead time is calculated as the sum these individual stage medians:

```bash
Overall Median Lead Time = Median Lead Time for Stage 1 + Median Lead Time for Stage 2 + ... + Median Lead Time for Stage N
```

### Calculation (Median of Sums)

This is an alternative way to calculate the median lead time, which you can enable using a feature flag:

For each ticket, the lead time is calculated for each stage and then the overall lead time calculated as the sum of the lead time across all stages:

```bash
Ticket 1 Total Lead Time = Stage 1 Lead Time + Stage 2 Lead Time + ... + Stage N Lead Time
Ticket 2 Total Lead Time = Stage 1 Lead Time + Stage 2 Lead Time + ... + Stage N Lead Time
...
Ticket M Total Lead Time = Stage 1 Lead Time + Stage 2 Lead Time + ... + Stage N Lead Time
```

Then the median of these total lead times is calculated across all tickets:

```bash
Median Lead Time = Median(Ticket 1 Total Lead Time, Ticket 2 Total Lead Time, ..., Ticket M Total Lead Time)

Median Lead Time = Median(Sum of Stage Lead Times for all tickets)

```

This new calculation method provides a different approach on the overall lead time by considering the total lead time for each ticket rather than summing the stage-level medians.

The choice between these two methods depends on your specific requirements and assumptions about the distribution of lead times across stages or tickets.