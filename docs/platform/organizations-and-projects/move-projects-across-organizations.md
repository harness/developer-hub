---
title: Move projects across organizations
description: Learn how to move an existing project from one organization to another within your account to reorganize your projects without starting from scratch.
sidebar_position: 30
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
tags:
  - organizations
  - projects
  - project-management
  - rbac
keywords:
  - move project
  - transfer project
  - project migration
  - organization management
  - project reorganization
---

Move projects from one organization to another without losing your work. All pipelines, services, environments, and settings transfer with the project, so you can reorganize teams or restructure your account without starting over. 

This is useful for organizational restructuring, team changes, or ensuring proper access control alignment.

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
  
    <DocImage path={require('./static/move-project-modal.png')} width="50%" height="50%" title="Move project modal" />

3. Click **Move Project** to start the move process

### Step 3: Confirm the Move

1. Review the confirmation dialog showing potential impacts
2. Type the **Project name** to confirm

    <DocImage path={require('./static/confirm-project-move.png')} width="50%" height="50%" title="Move project confirm" />

3. Click **Confirm Move**

Once the move completes, you'll be redirected to the project in its new organization. Verify that pipelines and deployments function as expected.

## Post-Move Impact

### Banner Notification

After moving a project, a banner appears at the top of project pages:

:::warning
This project was recently moved from another organization. Fix references to resources from the previous organization, if any.
:::

The banner displays for all users with project access until dismissed or after 7 days, whichever occurs first.

### What Continues Working

- **Project-level resources**: All connectors, secrets, and templates scoped to the project
- **Account-level resources**: All account-scoped configurations remain accessible
- **Pipeline components**: Code sources, input sets, triggers, execution history, variables, notifications, and policy sets

### What Requires Updates

Organization-level resources from the source organization will no longer be accessible:

- **Connectors**: Git, Docker, and cloud provider connectors must be recreated or remapped
- **Secrets**: API tokens, passwords, and credentials must be recreated in the destination organization  
- **Templates**: Step, stage, and pipeline templates must be available in the new organization
- **YAML references**: Fully qualified identifiers like `org.identifier.connectorId` must be updated
