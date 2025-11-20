---
title: Move a project across organizations
description: Step-by-step guide to move a project across organizations.
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

:::note Feature availability
This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

This document provides a step-by-step guide to migrate projects from one organization to another, including prerequisites, permissions, and detailed migration procedures.

## Prerequisites

 - Move Project (`core_project_move`) permission on the source project.
 - Create Project (`core_project_create`) permission in the destination organization.

## Steps to move a project

### Step 1: Navigate and access the move option

1. Navigate to **Projects** at account or organization level
2. Click the **⋮** menu next to your project
3. Select **Move Project**

    <DocImage path={require('../static/project-list-view.png')} width="80%" height="80%" title="Move project modal" />

### Step 2: Select destination organization

1. In the Move Project modal, review the warning about potential impacts

  <DocImage path={require('../static/review-move-project.png')} width="50%" height="50%" title="Move project modal" />

2. Select the destination organization from the dropdown. Only organizations where you have Create Project permission are available.

  <DocImage path={require('../static/select-destination-org.png')} width="50%" height="50%" title="Move project modal" />

3. Click **Move Project** to start the move process

  <DocImage path={require('../static/move-project.png')} width="50%" height="50%" title="Move project modal" />

### Step 3: Confirm Move

1. Review the confirmation dialog showing potential impacts. Type the **Project name** to confirm

2. Click **Confirm Move**

  <DocImage path={require('../static/move-confirm.png')} width="50%" height="50%" title="Move project confirm" />

Once the move completes, you'll be redirected to the project in its new organization. Follow the [post-move remediation](./pre-move-and-post-move-guide/#post-move-remediation) guide to complete the movement.
