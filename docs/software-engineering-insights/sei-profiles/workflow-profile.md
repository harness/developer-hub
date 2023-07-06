---
title: Workflow profile
description: Use Workflow profiles to define stages, events, and measurement criteria for Lead Time reporting.
sidebar_position: 30
---

Workflow profiles, also known as Lead Time profiles, define the stages, events, and measurement criteria for [Lead Time reporting](../sei-metrics-and-insights/execution/dora-metrics.md). You can use these profiles to get insight on end-to-end lead time taken to ship changes or the time taken for bug fixes to reach production.

You can configure the profile depending on the factors you want to include in your Lead Time calculations. For example, you can:

* Define the **Start of Change** to start calculating lead time, which can be ticket creation in an issue management system, commits to source code, pull requests, or deployments to dev, staging, or prod environments.
* Track time spent in various issue statuses, if your profile includes monitoring for an issue management system, such as Jira.
* Track time spent in source code lifecycle stages, such as commit to merge and activities related to pull requests.
* Track lead time through your CI/CD tools.

## Configure Workflow profiles

To add or edit Workflow profiles:

1. In your Harness project, go to the SEI module.
2. Select **Account**.
3. Select **Workflow** under **Profiles**.
4. To create a profile, select **New Workflow Profile**. To edit a profile, select the profile's name in the profiles list.

:::tip

You can create profiles by copying existing profiles. Make sure to edit copies accordingly and that your Lead Time widgets reference the correct profile.

:::

Workflow profile settings include:

* **Name:** Enter a name for the profile.
* **Description:** Optional profile description.
* **Issue Management System:** If applicable, select the issue management system to associated with this profile.
* **Lead Time for Changes**, **Deployment Frequency**, **Mean Time to Restore**, and **Change Failure Rate**: Modify these settings to refine your [DORA metrics](../sei-metrics-and-insights/execution/dora-metrics.md) calculations.
  * **Stages:** You can change the start event that initiates the first stage, and you can add, edit, and remove stages. When editing stages, you can change fields or data that drive stage changes, define ideal and acceptable time ranges, and more. This refines how you track KPIs.
* **Associations:** Modify the Org Units associated with this profile.

## Configuration examples

The following examples describe popular or useful Workflow profile configurations.

### Track Lead Time in SCM

Use this profile configuration to track Lead Time across the Pull Request lifecycle and gain insight into your SCM system, such as GitHub, Bitbucket, GitLab, and so on.

1. In your Harness project, go to the SEI module and select **Account**.
2. Select **Workflow** under **Profiles**.
3. Select **New Workflow Profile**.
4. Under **Profile Info**, enter a **Name** and optional **Description**.
5. Under **Definitions** or **Lead Time for Changes**, select **Stages**, and set the **Start Event** to **Commit Created**.
6. Review the prepopulated **Stages** that represent the PR lifecycle, from PR creation to merge. You can edit, add, and remove stages as needed. You can edit the data or fields that drive each stage, set time range goals, and more.

<!-- image of "Create Workflow Profile" with "Commit Created" and 4 default stages. -->

:::tip Monitor CI/CD lead time

If you want to include CI/CD builds and deployments in your lead time calculation, edit your Workflow profile, and add stages to track your CI/CD build and deploy jobs.

:::

### Track Lead Time in issue management and SCM

1. In your Harness project, go to the SEI module and select **Account**.
2. Select **Workflow** under **Profiles**.
3. Select **New Workflow Profile**.
4. Under **Profile Info**, enter a **Name** and optional **Description**, and then select the **Issue Management System** to associate with this profile.
5. Under **Definitions** or **Lead Time for Changes**, select **Stages**, and set the **Start Event** to **Ticket Created**.
6. Review the prepopulated **Development Stages** and edit them, if necessary. These stages represent the progression of code in your SCM tool, from first commit to PR merge.

<!-- image of "Create Workflow Profile" with default Deployment Stages -->

7. To track progress in your issue management tool, select the **+** icon to add stages before and after the **Development Stages**. This allows you to track progress in both your issue management and SCM tools, from issue creation through code deployment.

<!-- image of "Create workflow profile" with pre- and post- development stages. -->

### Include CI/CD in Lead Time

If you want to include CI/CD builds and deployments in your lead time calculation, follow the steps to [Track Lead Time in SCM](#track-lead-time-in-scm) or [Track Lead Time in issue management and SCM](#track-lead-time-in-issue-management-and-scm), and then add stages to track your CI/CD build and deploy jobs.

### Use a webhook to trigger Lead Time tracking

Use this profile configuration to use an API event to initiate Lead Time tracking.

1. In your Harness project, go to the SEI module and select **Account**.
2. Select **Workflow** under **Profiles**.
3. Select **New Workflow Profile**.
4. Under **Profile Info**, enter a **Name** and optional **Description**.
5. Under **Definitions** or **Lead Time for Changes**, select **Stages**, and set the **Start Event** to **API Event**.
6. Use the following REST API request to push custom API events to SEI:

```
curl --location --request POST 'https://api.levelops.io/v1/generic-events' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Apikey YOUR_API_KEY' \
--header 'Cookie: JSESSIONID=23F...BA12' \
--data-raw '{
    "component": "jira",
    "key": "PROP-1460",
    "event_type": "incident_1",
    "event_time": 1664925769
}'
```

In addition to an API Key and session ID, you must supply relevant values for the `data-raw` object according to the following definitions:

* `component`: The correlation component for the event, such as `jira`, `scm`, `ado`, and so on.
* `key`: The correlating identifier. For issue management system, this is the issue ID. For SCM, this is the commit SHA.
* `event_type`: Free form text field identifying the type of event.
* `event_time`: A timestamp, in seconds, identifying when the event occurred.
