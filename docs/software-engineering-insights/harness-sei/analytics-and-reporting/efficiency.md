---
title: Efficiency
description: Measurement and analysis of how effectively an organization or team performs its software development processes
sidebar_label: Engineering Efficiency
sidebar_position: 1
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/efficiency
---

Efficiency in the context of SEI 2.0 refers to the measurement and analysis of how effectively an organization or team runs its software development processes. It focuses on key performance metrics that helps your organization or team understand and improve the speed and quality of software delivery. 

The primary metrics used to gauge efficiency are the following [DORA metrics](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report):

* **Lead Time for Changes:** The time it takes for a code change to go from commit to production.

* **Deployment Frequency:** How often an organization successfully releases to production.

* **Change Failure Rate:** The percentage of changes that fail in production.

* **Mean Time to Restore (MTTR):** The time it takes to recover from a failure in production.

These metrics are used to provide insights into the software delivery performance and help in identifying areas for improvement.

## Setup

Setting up an Efficiency Profile in SEI 2.0 involves the following steps to ensure that the right metrics are being tracked and analyzed:

1. Select the right profile: Choose from default profiles based on your integration setup. For example, if you have Issue Management and Source Code Management integrations configured, you can select the "Default IM, SCM Efficiency Profile."
1. Instantiate the profile: Customize the selected profile to fit your organization's specific needs. This involves defining the stages of the software development lifecycle you want to measure, such as Planning, Coding, Review, Build, and Deploy.
1. Assign the profile to an org tree: Map the instantiated profile to your organization's tree structure. This ensures that all teams within your organization adhere to the same efficiency metrics.
1. Configure team node definitions: Define the specific data scope for each team, including relevant projects, repositories, and issue types.
1. Activate insights: Once the profile is configured and mapped, activate the insights to start tracking and analyzing efficiency metrics.

### Configure an Efficiency Profile

Configuring an Efficiency Profile involves setting up the specific parameters and conditions under which metrics are tracked.

1. Define stages: Configure the start and end events for each stage of the software development lifecycle. 
For example, the Planning stage might start when a ticket is created and end when the first code commit is made.
1. Set up integrations: Ensure that all necessary integrations (e.g., Issue Management, SCM, and CI/CD) are configured to provide the data needed for each stage.
1. Apply team-specific configurations: Allow team managers to apply specific filters and settings relevant to their team's context, such as specific branches or issue types to track.

By following these steps, organizations can effectively set up and configure Efficiency Profile to gain valuable insights into their software delivery processes and drive continuous improvement.

## Efficiency Insight widgets

Our aim is to provide comprehensive, actionable insights into the efficiency of software delivery processes. By surfacing key DORA metrics, we help teams understand how effectively they ship code, identify opportunities to reduce bottlenecks, and drive continuous improvement. 

You can use the `Showing` dropdown menu to change the calculation method applied to all widgets. Available options include `mean`, `median`, `p90`, and `p95`.

Below is a brief overview of each widget on the **Efficiency** tab for SEI 2.0:

### Lead Time for Changes

![Lead Time for Changes](../static/lead-time.png)

This widget provides insights into how long it takes a code change to move from request to production, spanning all stages: development, review, testing, and deployment.

* **Metrics Displayed**: Average time from request to production, segmented by stage (e.g. coding, review, deployment) over the selected period.
* **Visualization**: A bar chart showing lead time, with bars segmented by stage of the lifecycle.

The following options are available for this widget:

* **View Breakdown**: Provides a detailed breakdown of lead time by team.

### Deployment Frequency

![Deployment Frequency](../static/deployment-frequency.png)

This widget provides insights into how often software is successfully released to production, highlighting the cadence of software delivery.

* **Metrics Displayed**: Number of deployments over the selected period.
* **Visualization**: A bar chart showing deployment counts for the selected period.

The following options are available for this widget:

  * **View Breakdown**: Provides a detailed breakdown of deployments by team.

### Change Failure Rate

![Change Failure Rate](../static/change-failure.png)

This widget displays the percentage of deployments that result in a failure or incident in production.

* **Metrics Displayed**: Failure rate, calculated as `(Deployments that caused a failure or incident in production / Total deployments) × 100`.
* **Visualization**: A bar chart showing percentage of failures, alongside counts of failed and total deployments.

The following options are available for this widget:

  * **View Breakdown**: Provides a detailed breakdown of the percentage of deployments that caused a failure in production by team.

### Mean Time to Restore

![MTTR](../static/mttr.png)

This widget provides insights into how long it takes to recover from a failure or incident in production, helping teams assess responsiveness.

* **Metrics Displayed**: Average time to restore service after a failure.
* **Visualization**: A bar chart showing restoration time.

The following options are available for this widget:

  * **View Breakdown**: Provides a detailed breakdown of restoration time by team.

## Troubleshooting

### Lead Time for Changes

#### Why does the Build phase show no data even when the PR merge time is before the build creation time?

![](../static/build-time-troubleshooting.png)

This occurs due to a correlation mismatch between commits and CI builds. The build time for the Effiency Profile is calculated as:

$$
\text{Build Time} = \text{First CI Build} - \text{Last PR Merged}
$$

If the build time calculation results in a negative value, for example, when the first CI build occurs before the last PR was merged (e.g. August 25 to September 2), the build time is considered `0`. This is why no data appears.