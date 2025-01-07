---
title: Sprint Metrics
description: All the supported sprints metrics on SEI
sidebar_position: 13
sidebar_label: Sprint Metrics
---

## What are Sprint metrics?

Sprint metrics measure points and tickets in a sprint. This includes work that was planned (committed), completed (done/delivered), incomplete (missed), or added after the sprint started (creep).

Sprint work is typically measured in story points, which are a relative estimation unit used to gauge the complexity and effort required for a task. Point can represent the expected level of effort, complexity, or value of tickets.

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

### Average ticket size per sprint

The **Average Ticket Size per Sprint** is the average point value assigned to tickets (Tasks, User Stories, Bugs, and so on) completed in a sprint. It helps you understand the typical workload for the team in terms of point value (or expected effort).

### Commit points

**Commit points** is the number of story points a team planned to deliver at the beginning of the sprint. It is the sum of story points for all the tickets in the sprint backlog at the sprint start time.

For example:

* An un-estimated task at the beginning of a sprint: Adds 0 commit points.
* A task estimated as 2 story points: Adds 2 commit points.
* A task estimated as 2 points at the beginning of the sprint and later revised to 5 points during the sprint: Adds 5 delivered story creep points.
* A task estimated at 1 point is removed from the sprint while the sprint is in progress: Adds 1 commit point.
* A task estimated at 2 points is completed before the sprint start time and then added to the sprint: Adds 2 commit points and 2 [commit done points](#commit-done-points).

### Commit tickets

**Commit tickets** is the total number of individual work items committed to a sprint.

### Commit done points

**Commit done points** is the sum of story points for all committed _and completed_ tickets in the sprint backlog at the end of the sprint.

For example:

* A completed a task estimated as 2 points: Adds 2 commit done points.
* A completed a task estimated as 3 points at the beginning of the sprint and later revised to 1 point during the sprint: Adds 1 commit done point.
* A task estimated at 1 point is removed from the sprint but still completed while the sprint was in progress: Adds 1 [commit point](#commit-points) and 1 commit done point.

### Commit done tickets

**Commit done tickets** is the total number of individual work items (tickets) that were committed and completed in a sprint.

### Commit missed points

**Commit missed points** (or **missed points**) is the sum of story points for all planned tasks that weren't completed by the end of the sprint.

### Commit missed tickets

**Commit missed tickets** (or **missed tickets**) is the total number of individual work items (tickets) that were committed but not completed in a sprint.

### Creep points

**Creep points** is the sum of points for tickets added to the sprint after the sprint started.

For example:

* An unestimated ticket added in the middle of the sprint: Adds 0 creep points.
* A ticket estimated at 2 points added in the middle of the sprint: Adds 2 creep points.
* A ticket estimated at 2 points added in the middle of the sprint and later revised to 5 points during the sprint: Adds 5 creep points.

### Creep tickets

A creep ticket is a ticket added to a sprint after the sprint starts. The **Creep tickets** metric is the total number of individual work items added to a sprint after the sprint started.

### Creep done points

**Creep done points** is the sum of story points for all [creep tickets](#creep-tickets) that were completed in the sprint.

### Creep done tickets

**Creep done tickets** is the total number of individual work items (tickets) that were added after the sprint started _and_ completed within the sprint.

### Creep missed points

**Creep missed points** is the sum of story points for all additional tasks that weren't completed by the end of the sprint. This represents work that was added after the sprint started and wasn't finished by the end of the sprint.

### Creep missed tickets

**Creep missed tickets** is the total number of individual work items (tickets) that were added after the sprint started _and not_ completed by the end of the sprint.

### Churn rate

**Churn Rate** measures the scope change during a sprint, providing insights into the volatility of the sprint backlog. It is calculated using the following formula:

```bash
Churn Rate = (Points added mid-sprint + Points removed mid-sprint + Positive difference of changes in planned issues) / Points committed at the start of the sprint

```

* Points added mid-sprint represent the sum of story points for items added during the sprint.
* Points removed mid-sprint represent the sum of story points for items removed during the sprint
* The Positive difference of changes in planned issues is the positive sum of story points for items with planned changes.
* Points committed at the start of the sprint is the sum of story points for planned issues at the beginning of the sprint.

This metric helps teams assess how much their scope is changing during a sprint, providing a quantitative measure of the impact of mid-sprint changes and adjustments.

### Done tickets

**Done tickets** is the total number of individual work items (tickets) that were marked as done (or an equivalent completed status) before the end of the sprint.

### Sprint velocity (Delivered points)

Sprint velocity is a crucial metric for teams and organizations. By quantifying the amount of work a team completes during a sprint, you can:

* Measures a team's productivity.
* Predict future capacity for realistic sprint planning.
* Support continuous improvement by refining estimation processes.
* Accurately allocate resources based on team performance.
* Prevent overcommitments in sprint planning.
* Understand how teams should adapt and strategize in response to changing conditions.

**Sprint velocity**, also called _delivered points_ or _velocity points_, is calculated as the sum of [commit done points](#commit-done-points), delivered scope creep points (i.e. [creep done points](#creep-done-points)), and delivered story creep points based on the number of story points assigned to completed tickets when the sprint ends.

* **Delivered scope creep points:** This [metric](#creep-done-points) captures the total story points from all completed creep tickets within the sprint, giving you better visibility into scope changes.
* **Delivered story creep points:** This represents the sum of story points from completed tickets where estimates were increased during the sprint.

```bash
Sprint velocity = Commit done points + Creep done points (i.e. Delivered scope creep points) + Delivered story creep points
```

The **Velocity Points STDEV** is the standard deviation of sprint velocity points. It represents the variability in a team's productivity over multiple sprints.

### Delivered Tickets STDEV

Delivered Tickets STDEV is the standard deviation of the number of tickets completed (delivered) by a team across multiple sprints. It represents the variability in the team's productivity measured in terms of the number of tickets they were able to deliver over different sprints.

A low Delivered Tickets STDEV means the team completes a similar number of tickets in most sprints. A high value signals the number of completed tickets fluctuates more between sprints.
