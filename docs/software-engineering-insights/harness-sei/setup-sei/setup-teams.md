---
title: Set up Teams
description: Learn how to configure team settings in SEI 2.0.
sidebar_label: Set up Teams
sidebar_position: 15
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/teams
---

## Overview

Teams are the core unit of measurement in SEI 2.0. Every leaf node in the Org Tree is treated as a Team, making it the fundamental grouping for surfacing insights, applying goals, and driving accountability.

Each Team represents a group of developers working together within the organizational hierarchy and is automatically derived from the Org Tree structure.

### Key concepts

* **Auto-derived:** Every leaf node in the Org Tree is automatically considered a Team.
* **Configurable:** Each Team has its own configuration to define how metrics are calculated and displayed.
* **Contextualized and metric specific settings:** Teams include metadata such as associated integrations, relevant services, repositories, destination branches, pipelines, environments, etc.

This configuration layer adds precision to how metrics like Deployment Frequency, Lead Time, MTTR, and others are calculated, which ensures each metric reflects the real scope, velocity, and complexity of the team's delivery lifecycle.

### Why team settings matters

Out of the box, SEI builds teams from your organization’s hierarchy. However, each team needs to be contextualized with additional configuration to ensure data is mapped correctly and insights are accurate.

This includes:

* Identifying the right developers and matching them to their work.
* Linking the team to the right integrations across issue management systems, source code managers, continuous delivery and incident monitoring/management systems.
* Defining how metrics like incidents, bugs, and features are recognized in your software delivery workflow.

## Team Settings Overview

Each team’s configuration includes the following:

### Developer Identifiers (Required for Productivity Insights)

To measure productivity metrics accurately (e.g., coding days, PR activity), SEI needs to know which developer performed which action in each tool.

Team admins must manually map developers to their identifiers in each system:

* Jira: User Account ID
* GitHub: Username
* GitLab: Username
* Bitbucket: Username

This step is mandatory for productivity metrics.

### Tool specific settings

SEI supports integration with various DevOps tools. Each team can override global settings to use specific integrations that better reflect their actual tool usage.

Only tools included in the team's linked Efficiency or Business Alignment profiles will require configuration.

#### Supported Tools

* Issue Management: Jira, Azure Boards
* Source Code Management (SCM): GitHub, GitLab, Bitbucket
* Continuous Integration / Delivery (CI/CD): Harness CD, GitHub Actions and Jenkins.





## Configuring team settings

To configure your team's settings:

1. From the left-hand navigation pane, click on **Teams**.
1. Click on the **Actions** button (three vertical dots) next to the team you want to configure and select **Edit**.
1. In the **Team settings** window, click on the **Integrations** tab.
1. Override the default Org Tree integrations by selecting specific integrations for this team.

   - Under **Issue Management**, choose relevant integrations (e.g., "Jira_For_Temporal," "JIRA_TEMPORAL_FF_TEST").
   - Under **Source Code Management**, select relevant integrations (e.g., "GH Split org," "Github_For_Temporal_2").
   - Under **Continuous Delivery**, select the appropriate pipeline tool.

1. Click **Save Integrations**.
1. Click on the **Issue Management** tab within **Team settings**.
1. Define Production Incidents or Failures:
   
   - Click **Add Condition**.
   - Select a Property (e.g., "Project").
   - Choose a Condition (e.g., "Equals").
   - Select Value(s) (e.g., "SRM").

1. Define Features:
   - Click **Add Condition**.
   - Select a Property (e.g., "Issue Type").
   - Choose a Condition (e.g., "Equals").
   - Select Value(s) (e.g., "Story," "Sub-task").
1. Define Bugs:
   - Click **Add Condition**.
   - Select a Property (e.g., "Issue Type").
   - Choose a Condition (e.g., "Equals").
   - Select Value(s) (e.g., "Bug," "Hotfix").
1. Click **Save IM Settings**.
1. Click on the **Source Code Management** tab within **Team settings**.

1. Define code for Production Deployments by selecting repositories (e.g., "devops/sei-common-develop," "devops/sei-data-platform," or "devops/sei-temporal-api").
1. Add PR Labels for Incidents or Hotfix-related Merges:
   - Click **Add Condition**.
   - Select a Property (e.g., "Source Branch").
   - Choose a Condition (e.g., "Equals").
   - Select Value(s) (e.g., "SEI-12040", "SEI-12185").
1. Click **Save SCM Settings**.

You have now successfully configured Org Trees, integrations, and team settings within Harness SEI 2.0! To view the generated data and metrics, navigate to **Insights**.

