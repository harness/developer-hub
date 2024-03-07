---
title: Create a DORA metrics Insight
description: Learn how to create an Insight to measure DORA metrics on Harness SEI.
sidebar_position: 3
redirect_from:
  - /tutorials/software-engineering-insights/dora-insight
---

Enhancing the efficiency of software delivery is paramount for the success of your engineering team. However, achieving this without a clear understanding of the key performance indicators (KPIs) associated with the software delivery process is not easy. Without the right data, it becomes challenging to make well-informed decisions on optimizing workflows and communicating progress and achievements to stakeholders becomes equally difficult.

That's where DORA metrics come in handy. By using Harness SEI, you can streamline the process of identifying bottlenecks, get teams working together better, accelerate delivery speed, and articulate your team's accomplishments effectively.

This tutorial explains how to set up a DORA metrics Insight on Harness SEI, ensuring a smoother and simpler software delivery process for your engineering team.

## DORA Metrics Overview

DORA (DevOps Research Assessment) identified the following key metrics that describe a software development team's performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore (MTTR).

With SEI, you can use [DORA Metrics Insights](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics) to examine your organization's DORA metrics. This helps you understand how your organization or team is performing and helps you get an overview of daily, weekly, and monthly trends.

Furthermore, SEI gives you the flexibility to choose the [integrations](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview) from which you want to derive data, such as issue management, SCM, incident management, and CI/CD tools, as well as the ability to select filters to refine the data used to generate your metrics.

To learn more, go to [DORA Metrics](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics).

## Prerequisites

* Ensure that Harness SEI is enabled for your Account.
* Complete setting up your [Projects and Collection](/docs/software-engineering-insights/get-started/sei-onboarding-guide)
* Setup and configure the Integrations for your Issue Management tool, Source Code Manager and Deployment Manager.

## Set up your project, integration and collection

Begin by creating a project and collection.

1. In the sidebar of the Harness application, select the **SEI module** from the module selection.
2. Select **Projects** and choose an existing project or create a new one. For information about creating a project, go to [Create organizations and projects](/docs/platform/organizations-and-projects/projects-and-organizations).

:::info
A user can create multiple projects and be part of multiple projects.
:::

Once your project is created, you can set up and map integrations as an admin and set up the collection hierarchy.

## Integration Mapping

**Integration Mapping** is the process of associating available or new integrations with your current project. As an admin, you can set up and map integrations in your project. For more information, go to [Integrations](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview).

1. Go to the **Integration Mapping** tab within the SEI module.
2. Click **Map Integrations** and select existing integrations or create new ones as needed.
3. Ensure you associate the integrations with your current project.
4. Now for configuring a DORA Metrics insight, you'll need to map the [Jira integration (Issue Management Tool)](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira), [Github integration (Source Code Manager)](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github), [Harness NG integration (CI/CD Platform)](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng).

:::info
You can also use [Azure DevOps integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops) as the Issue Management tool.
:::

You can also create new integrations and associate the integration with the current project by mapping them.

* To create a new Jira integration, go to [Jira integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira).
* To create a new GitHub integration, go to [GitHub integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github).
* To create a new Harness NG integration, go to [Harness NG integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng).

## Create the Insight

1. Select the **Collection** under which your **DORA-type workflow profile** is associated. If you already have Insights in your project:
   1. Select any Insight. For instructions, go to [View Insights](/docs/software-engineering-insights/insights/sei-insights).
   2. In the header, select **All Insights**, and then select **Manage Insights**.
   3. Select **New Insight**.
2. If you don't have any Insight under the collection click on the **Associate Insight to this Collection** button.

### Insight settings

1. Enter a **Name** for the Insight.
2. Select at least one **Collection category** to associate with this Insight.
3. Select **Create** to save the Insight metadata. From here, you can add reports to this Insight.

## Add DORA metrics reports

You can use a DORA Metrics Insight to examine your organization's DORA metrics. This helps you understand how your organization or team is performing and helps you get an overview of daily, weekly, and monthly trends.

### Deployment Frequency reports

Include **DORA metrics reports** to understand how well your team is doing. The **Deployment Frequency report** tells you how often your team successfully releases software.

To keep track of Deployment Frequency, set up a [Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profile). This helps you pick what to monitor like merged pull requests or CI/CD jobs for the associated Collections. You can adjust Workflow profiles to fit your team's way of working, focusing on specific steps like Source Code Management (SCM) or a combination of issue management, SCM, and CI/CD. For more information, go to Workflow profile.

![](./static/deployment-frequency.png)

To add the **Deployment Frequency** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Deployment Frequency** widget.
3. Adjust the widget settings as needed.

:::info
Modifying the collection filters in the widget settings will direct you to the Edit Collection tab. Changes made here will impact the entire collection, not just the widget.
:::

4. Select **Next: Place Widget**, place the widget on the Insight, and then select **Save Layout**.

The widget automatically detects the relevant Workflow profile based on the Collections associated with the Insight.

### Lead Time For Changes report

DORA calculation for Lead Time is similar to how lead time, in general, is calculated, with the difference being the ability to associate a collection while defining the profile, i.e., at the profile level.

This report represents the amount of time it takes for a commit to get into production.

![](./static/leadtime-for-changes.png)

To add the **Lead Time for Changes** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Lead Time for Changes** widget.
3. Configure filters to refine conditions (e.g., `Issue Resolved In` for the last quarter) impacting overall lead time calculations.
4. Select **Average Time in the Stage** as the metric under the metrics tab.
5. Under the **Settings** tab, specify the relevant **Workflow profile**.
6. Select **Next: Place Widget**, place the widget on the Insight and then select **Save Layout**.

For information about other Lead Time reports, go to [Lead time reports](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/lead-time-reports).

### Change Failure Rate report

Change Failure Rate represents the percentage of deployments that cause a failure in production.
To monitor Change Failure Rate in SEI, you will again need to associate the widget with an existing workflow profile.

![](./static/change-failure-rate.png)

To add the **Change Failure Rate** Report widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Change Failure Rate** widget.
3. Configure the widget settings. Similar to the Deployment Frequency report customizing the **Collection-level Filters** redirects you to the **Edit Collection tab**.
4. Select **Next: Place Widget**, select where you want to place the widget on the Insight, and then select **Save Layout**.

The Change Failure Rate widget is now part of your Insight.

### Mean Time To Restore (MTTR) Report

The Mean Time To Restore (MTTR), also known as Time to Recover, represents the duration it takes for an organization to recover from a production failure. This metric serves as a valuable measure for evaluating the efficiency of the recovery process.

The overall time can be analyzed stage by stage over the organization's failure recovery workflow.

![](./static/mttr.png)

To add the **DORA Mean Time To Restore** report to the Insight:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Mean Time To Restore** widget.
3. Customize the widget by configuring **Filters**. This step allows you to specify conditions (such as `Issue Created In`/`Resolved In`) that contribute to the overall calculations. In this case, we will add the `Issue Resolved In` filter to restrict our calculation only for the last quarter.
4. Select the metric as `Average Time in Stage` under the **Metrics** tab
5. On the **Settings** tab, select the relevant [Workflow profile](/docs/software-engineering-insights/sei-profiles/workflow-profile).
6. Select **Next: Place Widget**, place the widget on the Insight, and then select **Save Layout**.

## Best Practices

* Ensure that the selected DORA metrics align with your organization's overarching business goals and objectives.
* Standardize workflow profiles across teams to maintain consistency in metric tracking.
* Define workflow profile at a granular level to capture the entire software delivery lifecycle. This includes specifying events such as the exclusion of PRs and commits, events defining what constitutes a deployment or a failure for CI/CD jobs, and other crucial items to provide a comprehensive view of the deployment process.
* Customize collection filters within widgets carefully. These filters impact not only the widget but the collection as a whole. Optimize filters to focus on the specific aspects of your software development process that you want to analyze.
