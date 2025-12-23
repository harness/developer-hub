---
title: Efficiency Profiles in SEI 2.0
description: Learn how to create an efficiency profile to capture DORA and sprint metrics in SEI 2.0.
sidebar_label: Efficiency
sidebar_position: 1
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/profiles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Efficiency Profile defines how your team’s work is measured across each phase of the software delivery lifecycle. Once configured, these profiles power the core [DORA metrics](https://dora.dev/guides/dora-metrics-four-keys/) that help track delivery performance and maturity over time.

Efficiency Profiles allow you to:

- Define how Lead Time for Changes is measured across workflow stages
- Configure Deployment Frequency, Change Failure Rate, and MTTR
- Establish maturity levels that categorize performance into clear, consistent bands
- Control how sprint metrics are calculated and reported

Maturity levels are applied consistently across DORA metrics and sprint reporting, enabling teams to understand not just what their performance is, but how it compares to define delivery standards across the organization. 

## Prerequisites

Before you set up an Efficiency Profile in SEI 2.0, make sure the following are in place:

* The SEI 2.0 module is enabled for your Harness account.
* You must have the **SEI Admin** role to create or manage Efficiency Profiles.
* At least one Issue Management (like Jira or Azure Boards) or a Source Code Management (like GitHub or GitLab) integration should be present in the account.

:::info
If you’re not sure about your access or integration status, check with your Account Admin or reach out to [Harness Support](/docs/software-engineering-insights/sei-support).
:::

## Set up the profile

To create an Efficiency profile:

1. In your **Harness project**, navigate to **Software Engineering Insights** and click **Account Management**.
1. Under **Profiles**, select **Efficiency**.
1. To create a profile, click **Create**. To edit an existing profile, click the **Edit Profile** icon in the profiles list.
1. In the **Overview** tab, enter a name, add an optional description for the profile, and define your organization's maturity levels. 

   ![](../../static/efficiency-1.png)

   Maturity levels represent performance bands used to evaluate delivery efficiency across DORA metrics and sprints. By default, SEI 2.0 includes four maturity levels with different colors: **Elite**, **High**, **Medium**, and **Low**. 
   
   | Label      | Description                           |
   | ---------- | ------------------------------------- |
   | **Elite**  | Top-tier delivery performance.         |
   | **High**   | Strong, consistent performance.        |
   | **Medium** | Acceptable but improvable performance. |
   | **Low**    | Performance below expected thresholds. |

   These labels are configurable and are reused throughout Lead Time reporting, maturity assessments, and dashboards.
   
1. Navigate to the **DORA** and **Sprints** tabs to configure the individual metrics for the profile:

   * DORA metrics such as `Lead Time for Changes`, `Deployment Frequency`, `Change Failure Rate`, and `Mean Time to Restore`

     ![](../../static/efficiency-2.png)
  
   * Sprint-based delivery metrics, analysis, and reporting behavior

     ![](../../static/efficiency-3.png)

## Set up DORA metrics

### Lead Time for Changes

Lead Time for Changes (LTTC) measures how long it takes for work to move from development to production. In SEI 2.0, configuring LTTC in your Efficiency Profile involves defining global maturity thresholds, mapping workflow stages and events, and customizing stage-level maturity thresholds.

#### Configure workflow stages globally

You can define the default maturity model used across all enabled workflow stages in the **Configure Workflow Stages** section from the **Lead time for changes** view on the **DORA** tab. Choose how lead time is measured (in **Days**, **Hours**, or **Minutes**) and click **Restore to defaults** to reset thresholds to system defaults.

![](../../static/efficiency-8.png)

The **Maturity Ranges** table displays four color-coded performance bands. These defaults apply to all workflow stages unless overridden.

For example:

| Color | Label  | From | To | Unit |
| ----- | ------ | ---- | -- | ---- |
| Green    | **Elite**  | 0    | 1  | Days |
| Yellow    | **High**   | 1    | 7  | Days |
| Orange    | **Medium** | 7    | 30 | Days |
| Red    | **Low**    | 30   | ∞  | Days |

You can customize the `To` values for **Elite**, **High**, and **Medium** thresholds. **Low** is automatically inferred.

#### Configure workflow stages and events

Below the global maturity settings, SEI 2.0 displays the enabled workflow stages:

$$ Planning → Coding → Review → Build → Deployment $$

Each stage can be enabled or disabled as needed, and enabled stages include two tabs: **Configuration** and **Maturity Settings**.

<Tabs queryString="configuration-or-maturity">
<TabItem value="configuration" label="Configuration">

Define how SEI 2.0 detects the start and end in the **Configuration** tab for each workflow stage.

Each stage is configured with the following:

* A Start Event Source and a Start Event
* A End Event Source and an End Event

| Configuration          | Description                                                                                         | Examples                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Start Event Source** | The system where the signal that starts the stage originates.                                       | `Issue Management`, `Source Code Management`, `Continuous Integration`, or `Continuous Deployment`            |
| **Start Event**        | The signal that marks the beginning of the stage.                                                   | `Issue Management: To Do / Proposed` <br/> `Source Code Management: First Commit Created` |
| **End Event Source**   | The system where the signal that ends the stage is recorded. This can differ from the start source. | `Issue Management` or `Source Code Management`                     |
| **End Event**          | The signal that marks completion of the stage.                                                      | `Last PR Merged` <br/> `Last PR Approval`       |

Event correlation (such as linking tickets to commits or builds) is automatically inferred by the Harness SEI correlation engine.

![](../../static/efficiency-8.png)

#### Default workflow stages

SEI 2.0 provides five default stages that reflect common delivery workflows which are customizable. 

<Tabs queryString="workflow-stage">
<TabItem value="planning" label="Planning">

![](../../static/efficiency-12.png)

Tracks how long it takes to move work from the idea stage to active development.

* **Start Event Source**: Issue Management (e.g., Jira)
* **Start Event**: Ticket transitions to `To Do` or `Proposed`
* **End Event Source**: Issue Management
* **End Event**: Ticket transitions to `In Progress`

</TabItem>
<TabItem value="coding" label="Coding">

![](../../static/efficiency-13.png)

Captures the time taken to start actual development work and make the code changes.

* **Start Event Source**: Issue Management
* **Start Event**: Ticket transitions to `In Progress`
* **End Event Source**: Source Code Management
* **End Event**: First commit pushed to a repository

</TabItem>
<TabItem value="review" label="Review">

![](../../static/efficiency-14.png)

Tracks the time between first code being committed and the code being approved and merged.

* **Start Event Source**: Source Code Management
* **Start Event**: First commit created
* **End Event Source**: Source Code Management
* **End Event**: Last pull request merged

</TabItem>
<TabItem value="build" label="Build">

![](../../static/efficiency-15.png)

Measures the time between PR merge and a successful CI build.

* **Start Event Source**: Source Code Management
* **Start Event**: Last pull request merged
* **End Event Source**: Continuous Integration
* **End Event**: Last CI pipeline execution completed

</TabItem>
<TabItem value="deployment" label="Deployment">

![](../../static/efficiency-16.png)

Captures time between successful build and deployment to production.

* **Start Event Source**: Continuous Integration
* **Start Event**: First CI build completed
* **End Event Source**: Continuous Deployment
* **End Event**: Last CD pipeline execution to production

</TabItem>
</Tabs>

:::info 
Event correlation such as linking tickets to commits or builds is automatically inferred and derived by the SEI Correlation Engine.
:::

</TabItem>
<TabItem value="maturity" label="Maturity Settings">

Each enabled workflow stage includes a **Maturity Settings** tab, which allows you to override the global maturity threshold for a specific stage. 

Stage-level maturity settings are useful when different parts of your delivery workflow have different performance expectations.

<Tabs queryString="workflow-stage">
<TabItem value="planning" label="Planning">

![](../../static/efficiency-17.png)

Configure the maturity thresholds used to classify **Planning** lead time. You can adjust the **Elite**, **High**, and **Medium** ranges to reflect how quickly work is expected to move from ideation into active development for your teams.

</TabItem>
<TabItem value="coding" label="Coding">

![](../../static/efficiency-18.png)

Configure the maturity thresholds used to classify **Coding** lead time. You can adjust the **Elite**, **High**, and **Medium** ranges to define what constitutes fast, acceptable, or slow development cycles based on your organization's coding practices.

</TabItem>
<TabItem value="review" label="Review">

![](../../static/efficiency-19.png)

Configure the maturity thresholds used to classify **Review** lead time. You can adjust the **Elite**, **High**, and **Medium** ranges to align with your expectations around code review responsiveness and approval turnaround.

</TabItem>
<TabItem value="build" label="Build">

![](../../static/efficiency-20.png)

Configure the maturity thresholds used to classify **Build** lead time. You can adjust the **Elite**, **High**, and **Medium** ranges to account for differences in CI complexity, build duration, and pipeline performance.

</TabItem>
<TabItem value="deployment" label="Deployment">

![](../../static/efficiency-21.png)

Configure the maturity thresholds used to classify **Deployment** lead time. You can adjust the **Elite**, **High**, and **Medium** ranges to reflect how quickly successfully built changes are expected to reach production.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### Advanced configuration

You can customize how SEI 2.0 interprets workflow events when calculating Lead Time for Changes.

![](../../static/efficiency-11.png)

In the **Which work should be considered when calculating lead time** section: 

- Click **All Completed Work** to measure lead time for all work completed within the selected time range, regardless of whether it was deployed. 
- Click **Only Deployed Work** to measure lead time only for work that has been successfully deployed to production. 

In the **Workflow Settings** section: 

- Click **Enforce Workflow Order** to calculate lead time only when events follow the defined phase sequence. This option is recommended for accurate and consistent lead time tracking.
- Click **Allow Workflow Exceptions** to include work even if some events occur outside the defined sequence. This option is useful for capturing non-standard workflows or identifying anomalies in your delivery process.

### Deployment Frequency

Deployment Frequency measures how often code changes are successfully deployed to production. It helps you understand how quickly your teams are delivering value to users.

![](../../static/efficiency-22.png)

#### Select a deployment source

Choose a tool type that provides deployment signals. SEI 2.0 supports the following systems:

* **Continuous Deployment**: SEI detects all completed pipeline executions. No additional configuration is required.
* **Issue Management**: SEI counts all work items in Issue Management systems such as Jira. Selecting this enables `Consider Issue Management Releases`.
* **Source Code Management**: SEI counts only pull requests merged to your production branch with the labels defined in **Team Settings**. Selecting this enables `Pull Request Merged to Destination Branch`.

#### Configure the maturity model

You can classify your teams' deployment performance into four color-coded bands in the **Maturity Ranges** section. Customize thresholds for **Elite**, **High**, and **Medium** performance; the **Low** band is automatically inferred.

This unified setup ensures that deployment frequency is consistently classified while still reflecting the specifics of each team’s deployment workflow.

### Change Failure Rate

Change Failure Rate measures the percentage of deployments that result in a failure, such as a rollback, incident, or hotfix. Tracking this metric helps your teams understand deployment quality and identify areas that need improvement.

![](../../static/efficiency-23.png)

#### Select a failure detection source

Choose the system from which SEI will detect failure events related to deployments. You can measure change failures using one of the following sources:

* **Continuous Deployment**: SEI detects all pipeline executions that result in a failure, such as a rollback or job failure. No additional configuration is required.
* **Issue Management** (e.g., Jira): SEI counts all work items in Issue Management systems (e.g., Jira) that are marked as incidents, bugs, or failures caused by a deployment. Selecting this enables consideration of issue-based failure events.

#### Configure the maturity model

You can classify your teams' change failure performance into four color-coded bands in the **Maturity Ranges** section. Customize thresholds for **Elite**, **High**, and **Medium** performance; the **Low** band is automatically inferred.

This unified setup ensures that change failure rate is consistently classified while still reflecting each team’s operational realities and failure patterns.

### Mean Time to Restore

Mean Time to Restore (MTTR) measures the average time it takes for your teams to restore service after a failure or incident. This metric helps you understand how quickly your teams respond to and resolve production issues.

![](../../static/efficiency-24.png)

#### Select an Incident/Failure Detection Source

![](../../static/efficiency-profile-6.png)

Harness SEI supports MTTR measurement using:

* **Issue Management** (e.g., Jira): SEI counts incidents or issues tracked in your Issue Management system that mark service downtime or failures. Selecting this enables Harness SEI to measure Mean Time to Restore based on issue resolution events.

#### Configure the maturity model

You can classify your teams' mean time to restore (MTTR) performance into four color-coded bands in the **Maturity Ranges** section. Customize thresholds for **Elite**, **High**, and **Medium** performance; the **Low** band is automatically inferred.

This unified setup ensures that MTTR is consistently classified while still reflecting each team’s incident response practices and recovery patterns.

## Set up Sprint metrics

:::tip
Sprint Metrics is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The **Sprints** tab lets you configure how sprint-based work is measured, analyzed, and displayed across SEI 2.0. Sprint configuration includes computation mode, summary cards, delivery analysis, and sprint boundary grace periods.

### Computation Mode

Choose how your team measures work in sprints. This setting determines the units used across sprint maturity definitions.

![](../../static/efficiency-4.png)

* **Story Points**: Measures work using story point estimates.
* **Work Item Count**: Measures work by counting work items or issues.

All sprint maturity thresholds are evaluated using the maturity levels defined in the **Overview** tab.

### Summary Cards

Summary Cards control which sprint metrics appear in sprint dashboards. 

![](../../static/efficiency-5.png)

You can enable or disable the entire section, enable or disable individual metrics, and customize the display name for each metric. 

:::tip
Harness recommends enabling the following metrics to get a strong baseline view of sprint health, delivery efficiency, and predictability: 

* **Work:** Average Sprint Size, Scope Creep
* **Delivery:** Work Delivered, Sprint Velocity, Total Delivered Work vs Committed Work
* **Analysis:** Churn Rate, Predictability (Delivery Consistency)

These metrics provide the most actionable view of sprint planning accuracy, execution efficiency, and delivery reliability.
:::

#### Work

* Sprint Commit
* Sprint Creep
* Sprint Size
* Average Sprint Size
* Scope Creep %

#### Delivery

* Delivered Commit
* Missed Commit
* Delivered Creep
* Missed Creep
* Work Delivered
* Sprint Velocity
* Total Delivered Work vs Committed Work

#### Analysis

* Churn Rate
* Predictability (Delivery Consistency)
* Predictability % (Reliability of Commitment)

### Delivery Analysis

Delivery Analysis controls how sprint delivery performance is evaluated. 

![](../../static/efficiency-6.png)

You can enable or disable the entire section or individual metrics, and customize the display names.

* Committed Work Delivered (%)
* Creep Work Delivered (%)
* Total Work Delivered (%)

### Sprint Boundary Grace Periods

Sprint Boundary Grace Periods define time buffers around sprint start and end dates.

![](../../static/efficiency-7.png)

A grace period allows you to include work completed slightly before the sprint starts or slightly after it ends. Define the number of days before a sprint starts in the **Sprint Start Grace Period** field. 

Work completed within this window is counted towards planned sprint work. For example, if you set the grace period to 2 days and the sprint starts on January 1, work completed on December 30-31 is included.

Once you have completed the DORA and Sprints configurations, click **Save** in the top right corner. A confirmation message appears when the profile is successfully created. 

## Configure team-level settings

Once you have created and configured an Efficiency Profile, you can configure [team-level settings](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams#configure-team-tool-settings) to calculate the DORA metrics enabled in the profile. Efficiency profiles define the organization-wide metric definitions, while **Team Settings** ensure that each team's tools and workflows are correctly connected to produce accurate metrics within that framework.