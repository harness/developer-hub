---
title: Steps to move a project from one organization to another
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
1. This feature is currently in **closed beta**, and is available for select accounts only. The access is determined based on the currently [supported modules and entities](#supported-modules).
2. This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

This document provides step-by-step guide to move a project across organizations, including prerequisites and detailed movement steps.

## Prerequisites

 - Move Project (`core_project_move`) permission on the source project.
 - Create Project (`core_project_create`) permission in the destination organization.

## Steps to move a project

### Step 1: Navigate and access the move option

1. Navigate to the project overview page (eg.`https://app.harness.io/ng/account/<ACCOUNT_ID>/all/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/overview`) of the project you wish to move. Alternatively, go to the Projects listing page (eg.`https://app.harness.io/ng/account/<ACCOUNT_ID>/all/orgs/<ORGANIZATION_ID>/projects`) in the organization.
2. On the Project Overview page, click on the **⋮** icon on top right. Alternatively, on the Projects listing page, click the **⋮** icon next to the project you want to move.
4. Select **Move Project**

    <DocImage path={require('../static/project-list-view.png')} width="80%" height="80%" title="Move project modal" />

### Step 2: Select destination organization

1. In the Move Project modal, review the warning about potential impacts and the list of entities that may break after the move. This list is not exhaustive, so manually checking the entities is recommended.

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

3. Select the destination organization from the dropdown where you want to move the selected project. 

    <DocImage path={require('../static/select-destination-org.png')} width="50%" height="50%" title="Move project modal" />

4. Click **Move Project** to proceed.

### Step 3: Confirm Move

1. Review the confirmation dialog showing potential impacts. Type the **Project identifier** to confirm

2. Click **Confirm Move**

    <DocImage path={require('../static/move-confirm.png')} width="50%" height="50%" title="Move project confirm" />

:::warning Access control components movement
When a project is moved, all project-level access control components—including users, service accounts, user groups, role bindings, resource groups, and roles—are moved asynchronously in the background, which may take some time to complete.
:::

Once a project is moved, you'll be redirected to the project overview page. You can notice that the project now appears within the new organization. A banner will appear stating: **This project was recently moved from another organization. Some entities may reference resources that no longer exist.**

<DocImage path={require('../static/move-complete.png')} width="80%" height="80%" title="Move project confirm" /> 

Follow the [post-move remediation](./pre-move-and-post-move-guide/#post-move-remediation) guide to verify and update any broken references, and ensure the project functions correctly in its new organization. This guide is not exhaustive; you might need additional steps based on your project setup.

