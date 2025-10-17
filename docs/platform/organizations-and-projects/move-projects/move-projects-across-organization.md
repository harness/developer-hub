---
title: Move a project across organizations
description: Step-by-step guide to move a project from one organization to another.
sidebar_label: Steps to move a project
sidebar_position: 3
tags:
  - organizations
  - projects
  - project-movement
  - step-by-step
  - tutorial
  - admin
keywords:
  - move project
---

This document provides a step-by-step guide to migrate projects from one organization to another, including prerequisites, permissions, and detailed migration procedures.

## Prerequisites

- **Move Project** permission on the source project
- **Create Project** permission in the destination organization

:::note
Organization-level connectors, secrets, and templates will need to be reconfigured or recreated in the destination organization.
:::

## Steps to Move a Project

### Step 1: Navigate and Access the Move Option

From the **Projects listing**:
1. Navigate to **Projects** at account or organization level
2. Click the **⋮** menu next to your project
3. Select **Move Project**

From the **Project overview page**:
1. Open your project
2. Click the **⋮** menu in the top right
3. Select **Move Project**

### Step 2: Select Destination Organization

1. In the Move Project modal, review the warning about potential configuration impacts
2. Choose your destination organization from the dropdown (only organizations where you have Create Project permission appear)
  
    <!--<DocImage path={require('./static/move-project-modal.png')} width="50%" height="50%" title="Move project modal" />-->

3. Click **Move Project** to start the move process

### Step 3: Confirm the Move

1. Review the confirmation dialog showing potential impacts
2. Type the **Project name** to confirm

    <!--<DocImage path={require('./static/confirm-project-move.png')} width="50%" height="50%" title="Move project confirm" />-->

3. Click **Confirm Move**

Once the move completes, you'll be redirected to the project in its new organization. Verify that pipelines and deployments function as expected.
