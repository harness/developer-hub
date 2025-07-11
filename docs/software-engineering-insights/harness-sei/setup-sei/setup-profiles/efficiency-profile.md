---
title: Efficiency profile
description: Learn how to create an efficiency profile in SEI 2.0.
sidebar_label: Efficiency profile
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Efficiency Profiles are essential for measuring software delivery performance using DORA metrics.

## Creating an efficiency profile

To create an efficiency profile:

1. From the left-hand navigation pane, click on **Efficiency** under **Configuration**, then select **Efficiency Profiles**.
1. To create a profile, click **Create** in the top right corner.
1. Enter a descriptive Efficiency Profile Name (e.g., **Efficiency qrv7**). You can also add a description.
1. Configure Lead Time for changes by measuring the time it takes a task to go into production.

   <Tabs queryString="phase">
    <TabItem value="planning" label="Planning">

    - Choose **Start Event Source** (e.g., _Issues Management_) and **Start event status category** (e.g., _To Do / Proposed_).
    - Choose **End Event Source** (e.g., _Issues Management_) and **End event status category** (e.g., _In Progress_).

    </TabItem>

    <TabItem value="coding" label="Coding">

    - Choose **Start Event Source** (e.g., _Issues Management_) and **Start Event Type** (e.g., _In Progress_).
    - Choose **End Event Source** (e.g., _Source Code Management_) and **End Event** (e.g., _First Commit created_).

    </TabItem>

    <TabItem value="review" label="Review">

    - Choose **Start Event Source** (e.g., _Source Code Management_) and **Start Event Type** (e.g., _First Commit created_).
    - Choose **End Event Source** (e.g., _Source Code Management_) and **End Event** (e.g., _Last PR Merged_).

    </TabItem>

    <TabItem value="build" label="Build">

    - Choose **Start Event Source** (e.g., _Source Code Management_) and **Start Event Type** (e.g., _Last PR Merged_).
    - Choose **End Event Source** (e.g., _Continuous Integration_) and **End Event** (e.g., _Time for first CI execution_).

    </TabItem>

    <TabItem value="deployment" label="Deployment">

    - Choose **Start Event Source** (e.g., _Continuous Integration_) and **Start Event Type** (e.g., _Time for first CI execution_).
    - Choose **End Event Source** (e.g., _Continuous Deployment_) and **End Event** (e.g., _Time for last CD execution_).

    </TabItem>
    </Tabs>

1. Configure Deployment Frequency by selecting the type of tool you use for successful deployments (e.g., **Continuous Deployment**). This measures the number of times a team deploys code to production in a given time period.
1. Configure Change Failure Rate by selecting the failure event type source (e.g., **Continuous Deployment**). This is the percentage of deployments that cause a failure in production.
1. Configure Mean Time to Restore (MTTR) by selecting the tool you use to track tasks in your team (e.g., **Issues Management**). This measures how long it takes a team to recover from a failure in production.
1. Click the **Save** button in the top right corner. A **Efficiency profile created successfully** message will appear.