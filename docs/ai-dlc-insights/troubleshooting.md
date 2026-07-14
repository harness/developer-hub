---
title: Troubleshooting AI DLC Insights
description: Learn how to troubleshoot common issues in AI DLC Insights.
sidebar_label: Troubleshooting
---

This page provides information to help you troubleshoot issues with Software Engineering Insights. 

<details>
<summary>What are the out-of-the-box roles in AI DLC Insights?</summary>

AI DLC Insights includes three pre-defined roles:

- SEI Admin: Full control over SEI data, settings, and configurations.
- SEI Team Manager: Manage teams and developer records at the project level.
- SEI Viewer: Read-only access to SEI data and dashboards.

</details>
<details>
<summary>What can an SEI Team Manager do?</summary>

An SEI Team Manager can:

- Manage team settings and developer records at the project level.
- View integrations and profiles.
- Access insights in read-only mode.

</details>
<details>
<summary>Can I create custom SEI roles in AI DLC Insights?</summary>

Yes. Account Admins can create custom roles with specific AI DLC Insights permissions such as View, Edit, Create, or Delete, depending on the needs of the organization.

</details>
<details>
<summary>What is a Team in AI DLC Insights?</summary>

Team represents a group of developers working together within your organization’s hierarchy. Every **leaf node** in the Org Tree automatically becomes a Team in SEI, making it the fundamental unit for insights, goals, and accountability.

</details>
<details>
<summary>How are Teams created in AI DLC Insights?</summary>

Teams are auto-derived from your organization’s hierarchy (Org Tree). You don’t have to manually create them; SEI automatically identifies every leaf node as a Team.

</details>
<details>
<summary>Why do Team settings matter?</summary>

While SEI auto-builds teams, each must be contextualized through configuration. Correct settings ensure that metrics like Deployment Frequency, Lead Time, MTTR, and Change Failure Rate accurately reflect your team’s real workflow and delivery lifecycle.

</details>
<details>
<summary>Is selecting integrations mandatory?</summary>

Yes. You must select and save integrations before you can continue configuring other team settings. This ensures SEI knows where to pull data from.

</details>
<details>
<summary>Why do I need to update developer identifiers?</summary>

To measure metrics like coding days and PR activity, SEI must know which developer performed which action in each system.

</details>
<details>
<summary>How do I update developer identifiers?</summary>

Team managers manually update each developer’s system-specific user identifiers.

</details>
<details>
<summary>What is Business Alignment in SEI?</summary>

Business Alignment maps work items to high-level organizational categories, such as **Strategic Work**, **Tech Debt**, and **Customer Commitments**, to illustrate how engineering effort supports business priorities.

</details>
<details>
<summary>What happens after I save my team configuration?</summary>

Once saved:

- SEI starts attributing data to your team based on the filters and identifiers you defined.
- Metrics are automatically calculated.
- Team dashboards update to reflect accurate insights.

</details>
<details>
<summary>How long does it take for dashboards to update?</summary>

Typically, dashboards update automatically within minutes after configurations are saved; however, large data syncs may take longer, depending on the system size.

</details>
<details>
<summary>Why does a Jira issue appear under a developer in **Work Completed Per Developer** even if the issue is currently unassigned?</summary>

In the Productivity Insights dashboard, the **Work Completed Per Developer** widget does not attribute work to the issue’s current Jira assignee; instead, it attributes work to historical assignments during configured development statuses from the **Issue Management** tab in Team Settings.

A Jira issue may still appear under a developer even if it is currently unassigned (or assigned to someone else) because SEI attributes completed work using the person who owned the issue while it was in an active development state, not in its final state.

An issue is attributed to a developer if:

- The developer was assigned to the issue at any point during its lifecycle, and
- The issue was in a status configured as a development status (for example, `In Progress` or `Inbox`), and
- The issue eventually transitions into a terminal status (for example, `Done`, `Closed`, or `Merged`).

For example, if `Inbox` is configured as a development status and `Closed` is configured as a terminal status, a developer is assigned to the issue while it is in `Inbox`, and the issue is unassigned or reassigned before it is moved to `Closed`.

The original developer will still receive credit in **Work Completed Per Developer**, even if they are not the current assignee.

</details>
<details>
<summary>How long does AI DLC Insights store data and for what time period can we go back in history in the widgets?</summary>

The default historical data backfill duration depends on the integration:  
  
  - Jira supports up to **1 year** of historical data.  
  - GitLab and GitHub support up to **14 days** of historical data.  
  - HarnessNG supports up to **30 days** of historical data.  
  
Requests for extended historical backfill beyond these default durations are handled manually on demand.  
  
Data retention periods vary by data source:  
  
  - Incident Management (IM): **1 year and 3 months**  
  - Source Code Management (SCM): **No limit**  
  - Continuous Integration / Continuous Deployment (CI/CD): **No limit**

</details>

If you need additional help, contact [Harness Support](/docs/software-engineering-insights/sei-support) or visit the [Harness Community](https://join-community-slack.harness.io/).