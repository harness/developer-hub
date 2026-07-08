---
title: Steps to move a project from one organization to another
description: Step-by-step guide to move a project across organizations.
sidebar_label: Steps to move a project
sidebar_position: 10
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

This page provides step-by-step instructions to move a project from one organization to another within your Harness account. This process includes selecting the destination organization, confirming the move, and verifying the outcome.

Moving a project transfers a project and all its entities from one organization to another within your Harness account. The project retains its identifier, access control settings, and audit history. However, entities that reference organization-level resources (such as connectors, secrets, or templates) may break and require updates after the move.

## Feature availability

- This feature is currently in **closed beta**, and is available for select accounts only. The access is determined based on the currently <a href="/docs/platform/organizations-and-projects/move-projects/move-projects#supported-modules" target="_blank">supported modules and entities</a>.
- This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.

---

## What will you learn in this topic?

By the end of this page, you will understand how to:

- Move a project from source to destination.
- Verify the project in its new organization.

---

## Before you begin

Before you move a project across organizations, ensure you have the following:

- **Create and move project permissions**: `core_project_create` and `core_project_move` permissions on the source and destination projects. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to understand how permissions are assigned through roles.
- **Pre-move validation**: Complete the checks in the <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-and-post-move-guide" target="_blank">pre-move guide</a> to understand which entities may break after the move.

---

## Move a project across organizations

Follow these steps to move a project from one organization to another:

### Step 1: Select a project to move

1. Go to one of the following:
   - **Project overview page**: `https://app.harness.io/ng/account/<ACCOUNT_ID>/all/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/overview`
   - **Projects listing page**: `https://app.harness.io/ng/account/<ACCOUNT_ID>/all/orgs/<ORGANIZATION_ID>/projects`

2. On the **Projects** page, select the **⋮** (more options) icon. The location depends on which page you are on:
   - On the project overview page, select the **⋮** icon in the top right corner.
   - On the projects listing page, select the **⋮** icon next to the project you want to move.
3. Select **Move Project**.

    <DocImage path={require('../static/project-list-view.png')} width="80%" height="80%" title="Move project modal" />

### Step 2: Select destination organization

1. In the Move Project pop-up window, review the warning about potential impacts and the list of entities that may break after the move. This list is not exhaustive. Manually check the entities to understand the full scope of impact.

    <DocImage path={require('../static/review-move-project.png')} width="50%" height="50%" title="Move project modal" />

    If needed, view details and select each referenced entity type to explore further.
        <iframe
        src="https://app.tango.us/app/embed/59110a63-da09-4967-af2c-f40c42bc0782"
        style={{ minHeight: "440px" }}
        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
        title="View Expired Delegates in Harness"
        width="80%"
        height="40%"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        allowFullScreen
        ></iframe>

2. Select the destination organization from the dropdown menu where you want to move the project. 

    <DocImage path={require('../static/select-destination-org.png')} width="50%" height="50%" title="Move project modal" />

3. Select **Move Project** to proceed.

### Step 3: Confirm the move

1. Review the confirmation dialog showing potential impacts. Type the **Project identifier** to confirm the move.

2. Select **Confirm Move**.

    <DocImage path={require('../static/move-confirm.png')} width="50%" height="50%" title="Move project confirm" />

After you confirm, Harness moves the project to the destination organization. All project-level access control components (users, service accounts, user groups, role bindings, resource groups, and roles) are moved asynchronously in the background, which may take some time to complete.

After the move completes, you are redirected to the project overview page. The project now appears within the new organization. A banner appears stating: **This project was recently moved from another organization. Some entities may reference resources that no longer exist.**

<DocImage path={require('../static/move-complete.png')} width="80%" height="80%" title="Move project confirm" /> 

---

## Next steps

Follow the [post-move remediation](/docs/platform/organizations-and-projects/move-projects/post-move-guide) guide to verify and update any broken references, and ensure the project functions correctly in its new organization. This guide is not exhaustive; you might need additional steps based on your project setup.

