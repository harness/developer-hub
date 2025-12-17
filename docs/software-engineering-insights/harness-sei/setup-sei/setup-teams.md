---
title: Set up Teams
description: Learn how to configure team settings in SEI 2.0.
sidebar_label: Set up Teams
sidebar_position: 7
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/teams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Teams are the core unit of measurement in SEI 2.0. Every leaf node in the Org Tree is treated as a Team, making it the fundamental grouping for surfacing insights, applying goals, and driving accountability.

Each Team represents a group of developers working together within the organizational hierarchy and is automatically derived from the Org Tree structure.

### Key concepts

* **Auto-derived:** Every leaf node in the Org Tree is automatically considered a Team.
* **Configurable:** Each Team has its own configuration to define how metrics are calculated and displayed.
* **Contextualized and metric specific settings:** Teams include metadata such as associated integrations, relevant services, repositories, destination branches, pipelines, environments, etc.

This configuration layer adds precision to how metrics like Deployment Frequency, Lead Time, MTTR, and others are calculated, which ensures each metric reflects the real scope, velocity, and complexity of the team's delivery lifecycle.

Out of the box, Harness SEI builds teams from your organization’s hierarchy. However, each team needs to be contextualized with additional configuration to ensure data is mapped correctly and insights are accurate.

This includes:

* Identifying the right developers and matching them to their work.
* Linking the team to the right integrations across issue management systems, source code managers, continuous delivery and incident monitoring/management systems.
* Defining how metrics like incidents, bugs, and features are recognized in your software delivery workflow.

## Set up Teams

To configure teams in SEI 2.0:

1. From the SEI navigation menu, click **Insights**. Your Org Tree is displayed on the left, allowing you to switch between organization-level and individual team-level insights.
1. Select a leaf node (a **Team**) in the Org Tree.
1. A **Team Settings** side panel opens, allowing you to configure integrations, developer identifiers, shared developers, tool settings, and developer records for that team.

### Step 1: Choose the integrations to power insights

In this step, choose the integrations that is used by your team for issue management systems, source code managers & CI/CD systems. Note that it is mandatory to select and save the integrations to continue configuring the rest of the team settings.

The choice of integrations in this page is powered by the profile definition. For example: An Efficiency profile that is configured for using issue management system to measure LTTC & MTTR, CD system to measure deployment frequency & change failure rate will require the team manager to define the issue management system integration & CD system integration.

![](../static/team-1.png)

### Step 2: Review & update developer identifiers

To measure productivity metrics accurately (e.g., coding days, PR activity), Harness SEI needs to know which developer performed which action in each tool. This is done by mapping each developer's cloud identities across your integrated systems.

The **Developer Records** table on the **Developers** tab in **Team Settings** includes attributes that determine how a developer was added and whether they belong to the selected team: 

* `Source`: Developers added through the [API](/docs/software-engineering-insights/harness-sei/api/cloud-ids) or CSV upload, appear with `Source: Developers`. Developers added in the UI appear with `Source: Manual`.
* `Shared`: Developers inherited from the team's Org Tree leaf node appear with `Shared: No`. Developers who are not from this team (or Org Tree node) but are manually added because they contribute to the team's work appear with `Shared: Yes`. 

![](../static/shared-1.png)

However, some contributors, such as engineering managers or individual developers who regularly contribute across teams, may not belong to the selected team's leaf node in the Org Tree. For these cases, you can add them as shared developers, which appear with `Shared: Yes` and `Source: Manual`.

Both automatically added developers and manually added shared developers must have correct identity mappings to ensure the accuracy of DORA, sprint, and productivity metrics.

#### Cloud identifiers by integration

The following table lists each integration along with the type of cloud identifier used and sample values. 

| Integration          | Identifier Type | Example(s)                                            |
| -------------------- | ------------ | -------------------------------------------------------- |
| **Jira**             | Account ID   | `081de7ae-0631-4474-befe-40064cc640ff`, `JIRAUSER208441` |
| **GitHub**           | Username     | `Aaron-Phillips_ver`, `dp1_mca`                          |
| **Azure DevOps**     | Email        | `Anh.McFeely@gmfinancial.com`                            |
| **Bitbucket Cloud**  | Account ID   | `0026fd8b-03fd-47ef-9eb9-13c11c27385f`                   |
| **Bitbucket Server** | Email        | `steve.madden@crowdstrike.com`                           |
| **Harness Code**     | Email        | `lebron.james@harness.io`                                |
| **GitLab**           | Name         | `adithya r`, `aidevops`                                  |

This step is mandatory for productivity metrics, and mapping must be kept up-to-date in **Team Settings** to ensure metrics are accurate. You can automate this step using [Auto Identity Discovery](/docs/software-engineering-insights/harness-sei/manage/automatch-developers/), which reduces manual mapping by correlating developer identities across supported integrations.

#### Managing shared developers

In addition to identity mapping, the **Developers** tab in **Team Settings** allows you to add contributors who are not inherited from the Org Tree but still affects the selected team's metrics. While inherited developers appear with `Source: Developers` and `Shared: No`, shared developers appear with `Source: Manual` and `Shared: Yes`.

Shared developers typically include engineering managers, individual contributors who regularly contribute across teams, and contributors whose commits, PRs, or Jira activity influence the team's insights.

To add a shared developer in the **Developers** tab:

1. Click **+ Shared Developer**.
1. Search by name or email, and select one or more developers.
1. Click **Continue**.

   ![](../static/shared-2.png)

1. After adding the shared developers, the **Developer Records** table updates with the following information:

   | Column                   | Description                                                       |
   | ------------------------ | ----------------------------------------------------------------- |
   | **Name**                 | Developer’s full name                                             |
   | **Email**                | Developer’s email                                                 |
   | **Shared**               | `Yes` (until identities are matched, status may appear `PENDING`) |
   | **Source**               | `Manual`                                                          |
   | **Developer Identities** | `PENDING` until cloud IDs are mapped                              |

1. To remove a shared developer, click the **-** icon in the **Actions** column.

   ![](../static/shared-4.png)

1. Click **Save**.

When browsing the **Developer Records** table, you can search for developers by name or email, filter shared developers using the `Shared` dropdown menu, and use the `Developer Identities` dropdown menu to show only records with missing or present developer identities.

![](../static/shared-3.png)

Click the **+** icon next to the `Developer Identities` dropdown menu to add additional columns such as `Added By` (who created the record) and `Last Updated` (the most recent modification timestamp) to the **Developer Records** table.

### Step 3: Tool or system specific settings

Once you’ve selected your team’s integrations and mapped developer identities, the final step is to configure tool-specific settings. These configurations allow you to fine-tune how Harness SEI interprets data from your tools—ensuring the metrics reflect your team’s actual workflows and tool usage.

Only the tools associated with the team’s linked Efficiency or Business Alignment profile will require configuration. Each team can override global settings to use specific integrations that better reflect their actual tool usage.

<Tabs queryString="team-settings">

<TabItem value="im-settings" label="Issue Management Settings">

Use this section to define which tickets or work items are relevant to your team.

#### Configure Projects for your Team

Define the scope of work items relevant to your team using a combination of filters (such as projects, code area etc)

![](../static/team-3.png)
    
:::info
Impacts the following metrics if the profile was configured to use Issue Management as the source system:
     
* Lead Time for Changes (LTTC)
* Mean Time to Restore (MTTR)
* Change Failure Rate (CFR)
* Deployment Frequency
* Business Alignment

:::


#### How do you identify production failures or incidents?

To calculate Change Failure Rate and MTTR, Harness SEI needs to know which work items represent failures or incidents. Define this using:
    
* Issue Type (e.g., Bug, Incident)
* Labels (e.g., production-incident, sev1)

![](../static/team-4.png)

:::info
Impacts the following metrics if the profile was configured to use Issue Management as the source system:

* DORA MTTR
* DORA Change Failure Rate

:::

#### Business Alignment

If your Org Tree includes Business Alignment, use this section to define how work items map to each category.

Business Alignment categories (e.g., Strategic Work, Tech Debt, Customer Commitments) are centrally defined by the Harness SEI Admin in the profile and apply across the organization. Teams configure how to filter work items into these categories using their own logic.

![](../static/team-4.png)

To set up these filters:

* Define Filter Sets for each category.
  * Use up to three distinct Filter Sets per category.
  * Each Filter Set can contain one or more filter conditions.
* Configure each condition by:
  * Selecting an attribute from the Properties dropdown (e.g., Label, Issue Type)
  * Choosing a matching rule from the Conditions dropdown (e.g., Equals, Contains)
  * Specifying the desired Value
* Set the logical operator between Filter Sets:
  * Use AND if all Filter Sets must match
  * Use OR if any one Filter Set can match

This flexible logic ensures accurate mapping of work items to the correct Business Alignment categories.

</TabItem>

<TabItem value="scm-settings" label="Source Code Management Settings">

This section allows you to define how Harness SEI tracks coding activity, repository scope, and production deployments using your SCM system.

#### Define / Add the repositories

Specify which repositories your team uses for development work. Use filters such as:

* Repository Name: Equals, Starts With, Contains
* GitHub Teams: To auto-include all repos a team contributes

![](../static/team-5.png)


:::info

Impacts the following metrics if the profile was configured to use Source Code Manager as the source system:

* DORA LTTC
* Deployment Frequency

:::

#### Set the destination / target branches

Identify which branches are considered production or deployment targets. This is essential for accurately calculating Lead Time and Deployment Frequency.

![](../static/team-6.png)

:::info

Impacts the following metrics if the profile was configured to use Source Code Manager as the source system:

* DORA LTTC
* Deployment Frequency

:::
    
#### Define the signal to track deployments driven by the SCM system

To calculate Deployment Frequency from SCM activity, Harness SEI needs to understand what constitutes a deployment event.

By default, Harness SEI considers:

* Pull Requests merged to a production branch
* With a specific label (e.g., deploy, release)

You can configure or customize these values as needed.
    
:::info

Impacts the Deployment Frequency metric if the profile was configured to use Source Code Manager as the source system.

:::

</TabItem>

<TabItem value="cicd-settings" label="Pipeline Settings">

Use this section to define which services or pipelines are relevant to your team, and how Harness SEI should identify successful and failed deployments.

#### Identify your services or CD pipelines
    
Use filters (such as pipeline name or tags) to select the pipelines that should be included in SEI’s analysis.


:::info

Impacts the following metrics if the profile was configured to use Continuous Delivery Tool as the source system:

* Deployment Frequency
* Change Failure Rate

:::

#### How do you identify a successful deployment?

Specify the criteria that indicate a successful deployment. For example: `Pipeline Status = Success`

SEI uses this to calculate Deployment Frequency.

#### How do you identify a failure in production?

Specify how Harness SEI should detect failed deployments or rollbacks, using conditions such as: `Pipeline status = Rollback or Failure`

This helps Harness SEI compute the Change Failure Rate metric.

</TabItem>

</Tabs>

## What's next

Once you complete and save your tool-specific settings, Harness SEI will:

* Attribute data to your team: Events and activity from integrated systems will be mapped to the configured team based on your filters and identifiers.
* Start calculating metrics: All relevant Efficiency and Business Alignment metrics will be computed using your defined criteria.
* Update dashboards automatically: Your team’s dashboards will begin reflecting data-driven insights based on the latest configuration.

## Best practices

* Align filters with real workflows: Define filter conditions that mirror how your team actually organizes and tracks work.
* Standardize labels and conventions: Use consistent naming for incidents, bugs, and deployments across tools to improve metric reliability.
* Review settings regularly: Revisit and update your team’s configurations whenever tools, processes, or team ownership changes.

Keeping your configurations current ensures your dashboards always reflect the most meaningful, up-to-date insights.

## Next steps

* View team insights
* View organization insights