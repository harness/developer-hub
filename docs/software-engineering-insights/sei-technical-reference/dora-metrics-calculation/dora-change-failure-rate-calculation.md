---
title: Change Failure Rate Calculation
description: How is Change Failure Rate calculated for DORA metrics on SEI?
sidebar_label: Change Failure Rate
sidebar_position: 20
---

### What is Change Failure Rate?

Change Failure Rate represents the percentage of deployments that cause a failure in production.

To monitor Change Failure Rate in SEI, you must set up a [Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profiles/dora-profile), and then add the **Change Failure Rate** widget to Insights.

To learn more, go to [DORA Reports](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics)

### Change Failure Rate Calculation and Scoring

Change Failure Rate performance is ranked on the following grading scale:

* **Elite:** Failure rate under 15 percent.
* **High:** Failure rate of 16 to 30 percent.
* **Medium:** Failure rate of 31 to 45 percent.
* **Low:** Failure rate above 45 percent.

The Change Failure Rate is calculated by dividing the number of failed deployments by the total number of deployments. The actual values included in this calculation are based on the following factors:

* The SEI integration chosen in the Workflow profile.
  * For issue management SEI integrations, SEI counts the number of issues deployed.
  * For SCM SEI integrations, SEI counts the number of PRs deployed.
  * For CI/CD SEI integrations, SEI counts the number of jobs deployed.
* Filters applied to the Workflow profile.
* Collection-level filters.
* Widget-level filters.
* Insight time range, which is the time range selected by the user when viewing the Insight.

### Calculation Example

Consider the following Change Failure Rate configuration:

* **SEI integration:** Jira
* **Filter for Failed Deployment:** Status Category Equals Done
* **Filter for Total Deployment:** Status Category Equals Done, To do, In Progress
* **Calculation parameter:** Ticket resolved in Insight time range
* **Time Range selected on the Insight:** Last 3 months

With this configuration, the Change Failure Rate widget shows the total number of tickets with a status of **Done** divided by the total number of tickets with a status of **Done**, **In Progress**, or **To Do**.

```bash
Change Failure Rate = ( Tickets in Done status ) / (Tickets in Done status + Ticket in In Progress status + Tickets in To Do status )
```

Assuming there are 45 tickets in **Done** status and 90 tickets in **Done**, **In Progress**, or **To Do** status, then the Change Failure Rate is 45 divided by 90, or 0.5 (50 percent).

```bash
45 / 90 = 0.5
Change Failure Rate = 50%
```