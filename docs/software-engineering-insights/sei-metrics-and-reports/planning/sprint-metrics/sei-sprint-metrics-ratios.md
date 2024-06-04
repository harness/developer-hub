---
title: Sprint Metric Ratios
description: All the supported sprints metrics ratios on SEI
sidebar_position: 15
sidebar_label: Sprint Metric Ratios
---

These ratios are calculated from sprint metrics.

:::warning
**Excluded Issues in Sprint Metrics Calculation**

The following types of issues are excluded from the Sprint Metrics calculation:

#### Sub-tasks

Sprint metrics are not calculated for sub-tasks.

**Outside of Sprint**

Issues that were planned and delivered before the start of the sprint are not considered for the Sprint Metrics calculation. These issues are considered `"Outside of Sprint"` and are excluded since the work was completed before the sprint began, therefore not contributing to the sprint velocity.

**Issues Removed in the Mid-Sprint**

Issues that were removed from the sprint backlog during the middle of the sprint, before the sprint was completed, are excluded from the Sprint Metrics calculation. Since these issues did not contribute to the planned and delivered work, they are not considered for the calculation.
:::

### Commit done ratio

The **Commit done ratio** is calculated by dividing **Commit done points** by **Commit points**. It is the ratio of completed points to committed points, and it indicates how well the team is meeting their commitments in terms of work effort. You can use this ratio to [measure team performance in recent sprints](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-overview#measure-team-performance-in-recent-sprints).

The **Commit done ratio STDEV** is the standard deviation of the **Commit done ratio**. It represents the variability in commit done ratios over multiple sprints.

### Commit missed ratio

The **Commit missed ratio** is the ratio of incomplete points compared to committed points. It highlights the extent to which sprint commitments were not met. The calculation is:

```bash
Commit missed ratio = MAX(0, 1 - Commit done ratio)
```

### Creep done ratio

The **Creep done ratio** is calculated by dividing **Creep done points** by **Creep points**. It is the ratio of creep points of completed compared to the total creep points committed. It represents how well the team completes additional work that was not in the original sprint plan (scope creep).

### Creep done to commit ratio

The **Creep done to Commit ratio** is calculated by dividing **Creep done points** by **Commit points**. It is the ratio of creep points completed compared with the original commitment at the beginning of the sprint.

### Creep missed ratio

The **Creep missed ratio** is the ratio of incomplete creep points compared to total committed creep points. It highlights the extent to which creep commitments were not met. The calculation is:

```bash
Creep missed ratio = MAX(0, 1 - Creep done ratio)
```

### Creep to commit ratio

Use the **Creep to commit ratio** ratio to compare unplanned work (known as _creep_) added to a sprint to the original commitment made at the beginning of the sprint. This ratio is calculated by dividing **Creep points** by **Commit points**, and it helps you understand the impact of unplanned work on sprint commitments and overall capacity.

```bash
Creep to commit ratio = (Unplanned points added to sprint after start) / (Committed points at the beginning of the sprint)
```

Ideally, this ratio should be below 20%. Higher ratios can indicate that unplanned work is ineffectively managed. Use these benchmarks to analyze your creep to commit ratios:

* **Low (below 20%):** A low ratio indicates that a team is generally successful in managing unplanned work. The majority of the work completed aligns with the initial sprint commitment and unplanned work is minimized.
* **Moderate (20% to 40%):** A moderate ratio suggests that some unplanned work has been introduced, but it is still within acceptable limits. The team is accommodating some level of unplanned work without compromising their main commitments.
* **High (above 40%):** A high ratio indicates that a significant portion of the work completed during the sprint was unplanned. This can signal challenges in managing unplanned work or ineffective sprint planning, potentially leading to difficulties in meeting planned commitments.

The **Creep to commit ratio STDEV** is the standard deviation of the **Creep to commit ratio**. It represents the variability in creep to commit ratios over multiple sprints.

### Delivered to commit ratio

The **Delivered to commit ratio** is calculated by dividing **Delivered points** by **Commit points**. It is the ratio of points delivered (completed) to the points committed for the sprint.

The **Delivered to commit ratio STDEV** is the standard deviation of the **Delivered to Commit ratio**. It represents the variability in delivered points to commit points over multiple sprints.

### Done to commit ratio

Use the **Done to commit ratio** to assess a team's ability to meet their commitments and effectively manage their workload within a sprint. By comparing total completed work to the initial sprint commitment, this ratio provides insight into the alignment of a team's actual capacity with planned commitments for a sprint. It is calculated by dividing the **Delivered points** by the **Commit points**.

```bash
Done to commit ratio = (Points completed at sprint end) / (Points committed at sprint start)
```

Use these benchmarks to analyze your Done to commit ratios:

* **Balanced (around 80%):** A ratio of around 80% suggests that a team is challenging themselves while remaining realistic about what can be achieved within a sprint. The team has struck a balance between pushing their capabilities and avoiding overcommitment.
* **Undercommitted (above 95%):** Ratios above 95% indicate that the sprint plan might not be fully leveraging the team's capacity, the team isn't pushing themselves enough, or that their sprint commitments are conservative. This may lead to underutilization of the team's potential.
* **Overcommitted (below 65%):** Ratios below 65% indicate possible overload. Teams might be stretching themselves too thin, and sprint commitments might be unrealistic given the available capacity. Low ratios could lead to reduced quality, burnout, and difficulties in meeting sprint goals.

### Scope creep ratios

Scope creep refers to unplanned work or changes that are introduced to a sprint after initial planning and commitment. These unplanned additions can impact a team's capacity and ability to deliver on their commitments. In this context, _creep_ refers to the points associated with unplanned work or changes, and _commit_ refers to the planned points that the team committed to deliver during sprint planning.

The **Scope creep ratio** provides valuable insights into the impact of unplanned work on the sprint plan and the team's capacity. A high scope creep ratio indicates that a significant portion of the team's effort is being diverted to tasks that were not originally planned for.

It is calculated as the average **Creep to commit** ratio for all sprints in the selected duration, excluding sprints with 0% creep.

```bash
Scope creep ratio = (Sum of all creep to commit ratios for all sprints in the specified duration) / (Number of sprints)
```

It's important to consider that while zero creep points is a positive outcome that indicates a sprint had no unplanned work, zero _commit_ points is a negative outcome that indicates that no work was committed despite the sprint's existence.