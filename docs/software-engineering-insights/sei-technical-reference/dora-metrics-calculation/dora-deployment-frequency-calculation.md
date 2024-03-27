---
title: Deployment Frequency Calculation
description: How is Deployment Frequency calculated for DORA metrics on SEI?
sidebar_label: Deployment Frequency
sidebar_position: 15
---

### What is Deployment Frequency?

Deployment Frequency represents how often an organization successfully releases software to production.

To monitor Deployment Frequency, you must create a **DORA type Workflow profile** and add the **Deployment Frequency** report to your Insights.

To learn more, go to [DORA Reports](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics)

### Deployment Frequency scoring

Deployment Frequency performance is ranked on the following grading scale:

* Elite: More than one deployment per day.
* High: Deployments occur anywhere from once per day to once per week.
* Medium: Deployments occur anywhere from once per week to once per month.
* Low: Deployment occur less than once per month.

The Deployment Frequency formula depends on whether you are tracking issue
management, SCM, or CI/CD. The following factors can contribute to Deployment
Frequency calculations:

* The SEI integration chosen in the Workflow profile.
* For Issue Management SEI integrations, SEI counts the Number of issues deployed.
* For SCM SEI integrations, SEI counts the number of PRs deployed.
* For CI/CD SEI integrations, SEI counts the number of jobs deployed
* Filters applied to the Workflow profile.
* Collection-level filters.
* Widget-level filters.
* Insight time range, which is the time range selected by the user when viewing the
Insight.

### Calculation Example

Consider the following Deployment Frequency configuration:

* SEI integration: Jira
* Filter: Status Category Equals Done
* Calculation parameter: Ticket resolved in Insight time range
* Time Range selected on the dashboard: Last 3 months

With this configuration, the Deployment Frequency widget shows the total number of
tickets with a status of Done in the given time range.

**Daily Deployment Frequency = ( Tickets in Done status ) / ( Days in Time Range )** 

**Daily Deployment Frequency = 24 / 91 = 0.263**

**Weekly Deployment Frequency = ( Tickets in Done status ) / ( Days in Time Range / 7 )**

**Weekly Deployment Frequency = 24 / 13 = 1.846**

Assuming there are 24 tickets in Done status in the last 91 days, then the Deployment
Frequency is 0.263 deployments per day and 1.846 deployments per week.