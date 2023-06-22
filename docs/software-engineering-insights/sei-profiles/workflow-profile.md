---
title: Workflow profile
description: Use Workflow profiles to define stages, events, and measurement criteria for Lead Time reporting.
sidebar_position: 30
---

Workflow profiles, also known as Lead Time profiles, define the stages, events, and measurement criteria for [Lead Time reporting](../sei-metrics-and-insights/execution-insights/dora-metrics.md). You can use these profiles to get insight on end-to-end lead time taken to ship changes or the time taken for bug fixes to reach production.

You can configure the profile depending on the factors you want to include in your Lead Time calculations. For example, you can:

* Define the **Start of Change** for relevant commits, which can be commits to source code, pull requests, and deployments to dev, staging, or prod environments.
* Track time spent in various issue status, if the profile is aligned with an issue management tool (such as Jira).
* Only track time spent in source code lifecycle stages, such as commit to merge and the activities.

## Configure Workflow profiles

To add or edit Workflow profiles, go to **Settings**, and then select **Workflow Profiles**. You can clone existing profiles and modify them as needed. Make sure to reference the correct profile in your Lead Time widgets.

Workflow profile settings include:

* **Name:** Enter a name for the profile.
* **Description:** Optional profile description.
* **Issue Management System:** Select the issue management system to associated with this profile.
* **Definitions:** Modify each definition's settings to refine your Lead Time calculation.
  * **Stages:** You can change the start event that initiates the first stage, and you can add, edit, and remove stages. When editing stages, you can change fields or data that drive stage changes, define ideal and acceptable time ranges, and more. This refines how you track KPIs.

## Configuration examples

The following examples describe popular or useful Workflow profile configurations.

### Track Lead Time in SCM

Use this profile configuration to track Lead Time across the Pull Request lifecycle and gain insight into your SCM system, such as GitHub, Bitbucket, GitLab, and so on.

1. Go to **Settings**, select **Workflow Profiles**, and then select **Add Profile**.
2. Under **Profile Info**, enter a **Name** and optional **Description**.
3. Under **Definitions**, select **Stages**, and set the **Start Event** to **Commit Created**.
4. Review the prepopulated **Stages** that represent the PR lifecycle, from PR creation to merge. You can edit, add, and remove stages as needed. You can edit the data or fields that drive each stage, set time range goals, and more.

<!-- image of "Create Workflow Profile" with "Commit Created" and 4 default stages. -->

### Track Lead Time in issue management and SCM

1. Go to **Settings**, select **Workflow Profiles**, and then select **Add Profile**.
2. Under **Profile Info**, enter a **Name** and optional **Description**, and then select the **Issue Management System** to associate with this profile.
3. Under **Definitions**, select **Stages**, and set the **Start Event** to **Ticket Created**.
4. Review the prepopulated **Development Stages** and edit them, if necessary. These stages represent the progression of code in your SCM tool, from first commit to PR merge.

<!-- image of "Create Workflow Profile" with default Deployment Stages -->

5. To track progress in your issue management tool, select the **+** icon to add stages before and after the **Development Stages**. This allows you to track progress in both your issue management and SCM tools, from issue creation through code deployment.

<!-- image of "Create workflow profile" with pre- and post- development stages. -->

### Use a webhook to trigger Lead Time tracking

Use this profile configuration to use an API event to initiate Lead Time tracking.

1. Go to **Settings**, select **Workflow Profiles**, and then select **Add Profile**.
2. Under **Profile Info**, enter a **Name** and optional **Description**.
3. Under **Definitions**, select **Stages**, and set the **Start Event** to **API Event**.
4. Use the following REST API request to push custom API events to SEI:

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
