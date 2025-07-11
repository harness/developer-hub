---
title: Set up Org Tree
description: Learn how to create organization trees for your team in SEI 2.0.
sidebar_label: Set up Org Tree
sidebar_position: 10
---

## Overview

Organization trees, otherwise known as Org Trees, help define your organization's hierarchy and reporting structure, enabling SEI to visualize team performance and insights effectively.

## Creating an organization tree

To create an organization tree:

1. From the left-hand navigation pane, click **Org Trees** under **Integration Mapping**.
1. Click **+ Create Org Tree**.
1. Define the organization hierarchy by:
   
   - Entering an Organization Tree Name (e.g., "SEI Org tree v2").
   - Confirming the **Developer Records** preview matches your expected data.
1. Click **Next**. 
1. SEI 2.0 will display a visual representation of your organization's hierarchy based on the **Manager Email** column. You can click on individual nodes (employees) to see their team members.
1. To see a table view of the Org Hierarchy, click on **The Table** tab. This provides details on total teams, root teams, total developers, and missing data.
1. Click **Next**. This will load profiles to power your insights.
1. Choose Efficiency and Productivity Profiles:
   
   - Under **Efficiency Profiles**, select the desired profiles for measuring software delivery performance (e.g., "New Profile 11 test profile," "new jun 27").
   - Under **Productivity Profiles**, select the desired profiles for measuring development activity and engineering output (e.g., "Test profile 1", "Test profile 3").
1. Click **Next**.
1. Choose the default integrations for all teams within this Org Tree. These settings can be overridden for individual teams later.
   
   - Under **Issue Management**, select the relevant integrations (e.g., **Jira New Temporal**, **JIRA_TEMPORAL_FF_TEST**, **Jira_Fix_Temporal**).
   - Under **Source Code Management**, select the relevant integrations (e.g., **GH-TEMPORAL-FF-TEST**, **GitHub_Fix_Temporal**).
   - Under **Continuous Delivery**, select your deployment pipeline tool.
1. To save your org tree, click **Save Org Tree**. An **Org tree created successfully** message will appear.