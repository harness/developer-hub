---
title: Efficiency profile
description: Learn how to create an efficiency profile in SEI 2.0.
sidebar_label: Efficiency profile
sidebar_position: 1
redirect_from:
- /docs/software-engineering-insights/sei-new-experience/setup/profiles
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

An Efficiency Profile defines how your team’s work is measured across each phase of the software delivery lifecycle. Once configured, these profiles power the core DORA metrics that help track delivery performance over time.

You can set up Lead Time tracking down to each engineering phase from planning all the way to deployment and configure the key signals used for Deployment Frequency, Change Failure Rate, and MTTR.

:::note Coming soon
The Efficiency profile will also support defining your sprint settings across the organization in the future.
:::

## Set up the profile

To create an efficiency profile:

1. In your **Harness project**, go to the SEI module.
2. Select **Account Management**.
3. Select **Efficiency** under **Profiles**.
4. To create a profile, select **+New Efficiency Profile**. To edit an existing profile, select the profile's name in the profiles list.
5. Configure basic information for the Efficiency profile, such as a Name and an optional Description.

### Set up Lead Time for Changes

Lead Time for Changes measures how long it takes for a task to move from development to production. Setting up LTTC in your Efficiency Profile involves mapping the phases of your delivery workflow and selecting events that signal the start and end of each phase.

#### Configuration steps

* **Workflow phases:** You can define up to five sequential phases that represent your software delivery lifecycle — from planning all the way to deployment. At-most you can define 5 phases.
* **Events & event sources:** Each phase is defined by a Start Event and an End Event, pulled from tools your team already uses (like Jira, GitHub, CI/CD systems, etc.). Event Sources include:
  * Issue Management System
  * Source Code Manager
  * Continuos Integration
  * Continuous Delivery
  * ITSM
* **Start event source:** This is the tool or system where the signal that starts the phase originates.
* **Start event:** This is the specific signal or event that marks the beginning of the phase.
  * A ticket status moving to “In Progress” status category
  * A developer pushing the first commit
  * A pull request being opened
* **End event source:** This is the tool or system where the end signal of the phase is recorded. It could be a different tool than the start source. For example, a phase might start in Jira and end in GitHub.
* **End event:** This is the specific signal or milestone that marks the completion of the phase. Common examples:
  * First commit created
  * Last pull request merged
  * Time to complete the first CI build etc
* SEI 2.0 comes with five default phases: Planning, Coding, Review, Build & Deploy.
* These phases are sequential i.e. the end of one phase automatically becomes the start of the next. You can enable or disable these as needed.

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
2. Configure Change Failure Rate by selecting the failure event type source (e.g., **Continuous Deployment**). This is the percentage of deployments that cause a failure in production.
3. Configure Mean Time to Restore (MTTR) by selecting the tool you use to track tasks in your team (e.g., **Issues Management**). This measures how long it takes a team to recover from a failure in production.
4.  Click the **Save** button in the top right corner. A **Efficiency profile created successfully** message will appear.