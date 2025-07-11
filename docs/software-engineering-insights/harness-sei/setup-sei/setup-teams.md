---
title: Set up Teams
description: Learn how to configure team settings in SEI 2.0.
sidebar_label: Set up Teams
sidebar_position: 15
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/teams
---

## Overview

Team settings allow you to tailor how SEI 2.0 collects and interprets data for specific [teams](./teams), including defining incidents, features, and bugs.

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

