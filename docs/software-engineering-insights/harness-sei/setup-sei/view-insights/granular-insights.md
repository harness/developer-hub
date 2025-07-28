---
title: View Insights for a Specific Team After Applying Team Settings
description: Learn how to view insights for a specific team after applying the team settings in SEI 2.0.
sidebar_label: View Insights for a Specific Team After Applying Team Settings
sidebar_position: 7
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/granular-insights
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

To get more granular insights on [Efficiency](../../analytics-and-reporting/efficiency), [Productivity](../../analytics-and-reporting/productivity), and [Business Alignment](../../analytics-and-reporting/business-alignment), you can drill down into specific [teams](../setup-teams) within an [Org Tree](../setup-org-tree) and apply team-specific settings.

## Viewing insights for a specific team after applying team settings

To view insights for a specific team after applying team settings:

1. From the left-hand navigation pane, click on **Insights**.
1. In the left-hand panel, expand the Org Tree (e.g., "SEI org tree v7 July") to reveal the individual teams.
1. Click on the specific team (e.g., "Noah Lewis," "Ava Patel") for which you want to view insights.
1. Configure [Team Settings](../setup-teams) (if not already done):

   - To adjust settings for a team, go to **Teams** from the left navigation.
   - Click the **Edit** icon next to the desired team.

     <Tabs queryString="config-tab">
     <TabItem value="integrations" label="Integrations Tab">

     Select specific integrations for this team (e.g., _"Jira_For_Temporal"_, _"HarnessCD-prod-engopps/audit"_).

     </TabItem>

     <TabItem value="issues" label="Issue Management Tab">

     Define criteria for the following:

         - **Production incidents or failures**: Add conditions based on project, labels, etc.
         - **Features**: Add conditions based on issue type, status, etc.
         - **Bugs**: Add conditions based on issue type, status, etc.

     </TabItem>

     <TabItem value="scm" label="Source Code Management Tab">

     Define the following:

         - **Repositories**: Select which repositories are part of this team's work.
         - **PR labels for incidents/hotfix-related merges**: Add conditions based on target branch or source branch.

     </TabItem>

     <TabItem value="cd" label="CD Pipelines Tab">

     Define the following:

         - **Successful deployment**: Select pipelines and criteria.
         - **Production failure**: Select pipelines and criteria.

     </TabItem>
     </Tabs>

1. Click **Save Team Details** or **Save IM Settings** / **Save SCM Settings** / **Save CD Settings** as applicable for each tab.

After configuring team settings, the **Insights** dashboard will refresh to show data specific to the selected team, reflecting the applied configurations. You can explore the DORA metrics for that team.

For more information on sharing insights surfaced by Harness SEI, see [Exporting SEI 2.0 Insights](../../analytics-and-reporting/export).