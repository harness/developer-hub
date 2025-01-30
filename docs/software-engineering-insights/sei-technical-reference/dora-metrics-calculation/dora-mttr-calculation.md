---
title: DORA MTTR Calculation
description: How is Mean Time to Restore metric calculated for DORA reports on SEI?
sidebar_label: DORA MTTR
sidebar_position: 25
---

### What is Mean Time to Restore?

Mean Time to Restore (MTTR) measures the average time it takes to resolve an incident or recover from a service failure and restore the normal operational state. 

To monitor Mean Time to Restore (MTTR) in SEI, you must set up a [DORA type Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profiles/dora-profile), and then add the **DORA Mean Time to Restore** widget to your Insight.

To learn more, go to [DORA Reports](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics)

### Mean Time to Restore Calculation and Scoring

You can configure the DORA profile to measure the MTTR metric using Issue Management Platform or SCM or your Incident monitoring platform. 

### Mean Time to Restore using Issue Manangement or SCM

If you have configured the DORA profile to measure the MTTR metric using Issue Management Platform or SCM, the DORA MTTR report is displayed as the breakdown of stages across multiple stages. For example, the default configuration for a PR-based Workflow profile will display four stages:

* PR creation time.
* Time to Comment.
* Approval time.
* Merge time.

Similarly, for the default configuration of a Ticket-based Workflow profile settings the MTTR report will display five stages:

* Lead time to First Commit.
* PR Creation time.
* Time to Comment.
* Approval time.
* Merge time.

The calculation for this type of DORA MTTR report is similar to the DORA Lead Time calculation.

### Mean Time to Restore using Incident Monitoring Platform

If you have configured the DORA profile to measure the MTTR metric using Incident monitoring platform then the Mean Time to Restore report is displayed as a Time Series graph based on incidents per day and is ranked on the following grading scale:

* **Elite:** Less than 1 Hour.
* **High:** Less than 1 Day.
* **Medium:** Less than 1 Week.
* **Low:** More than 1 Week.

The DORA MTTR metric in this case is calculated by summing up the difference between the time it took to resolve an incident and the time the incident was created for all incidents that occurred within a specific time period. This total sum is then divided by the total number of incidents that occurred during that time period. The actual values included in this calculation are based on the following factors:

* The SEI PagerDuty integration chosen in the Workflow profile.
* Filters applied to the Workflow profile.
* Collection-level filters.
* Widget-level filters.
* Insight time range, which is the time range selected by the user when viewing the Insight.

:::info
Note that the definition of MTTR metric for monitoring incidents depends upon how the DORA profile definition for MTTR is configured. You can define the metric to be calculated for Incident Created, Updated or Resolved event.
:::

### Calculation Example using Incident Monitoring Platform

Consider the following Change Failure Rate configuration:

* **SEI integration:** PagerDuty
* **Filter for Mean Time to Restore:** User ID Equals PD-DEMO
* **Calculation parameter:** Incident Resolved in Insight time range
* **Time Range selected on the Insight:** First week of January 2024 i.e. 1st Jan 2024 to 7th Jan 2024

With this configuration, the DORA MTTR widget shows the total number of incidents that were resolved divided by the total number of incidents that occurred in the last one month.

| Incidents | Incident Created | Incident Resolved | Time duration |
| - | - | - | - |
| Incident 1 | 1st Jan 2024 at 12:00:00 | 1st Jan 2024 at 01:00:00 | 60 mins |
| Incident 2 | 2nd Jan 2024 at 04:30:00 | 2nd Jan 2024 at 05:00:00 | 30 mins |
| Incident 3 | 5th Jan 2024 at 06:00:00 | 5th Jan 2024 at 09:00:00 | 3 hours (180 mins) |

For the above example, for the week of 1st Jan 2024 to 7th Jan 2024, the value for the MTTR metric is calculated as below.

```bash
DORA Mean Time to Restore = (60 + 30 + 180) / 3 = 90 mins or 1.5 hours (MEDIUM)
```