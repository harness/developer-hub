---
title: Manage dashboards
description: This topic describes how to add and manage access control for dashboards.
sidebar_position: 80
---

<a href="/docs/platform/dashboards/dashboard-standard/overview" target="_blank">Dashboards</a> display key metrics and data related to your builds, deployments, security, cloud costs, and more.
You can control who can view, create, edit, and delete dashboards in Harness through role-based access control. This page describes how to assign dashboard roles and configure access to specific dashboard folders.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Understand the <a href="#dashboard-roles-and-permissions">Dashboard Editor and Dashboard Viewer roles</a> and their permissions.
- <a href="#add-and-manage-the-dashboard-editor-role-for-users-or-user-groups">Assign the Dashboard Editor role</a> to users or user groups.
- <a href="#add-and-manage-the-dashboard-viewer-role-for-users-or-user-groups">Assign the Dashboard Viewer role</a> to users or user groups.
- <a href="#add-and-manage-access-control-for-resource-groups">Configure resource groups</a> to limit access to specific dashboards.
- <a href="#limit-project-access-for-sto-dashboards">Restrict project access</a> for STO dashboards based on RBAC permissions.

---

## Before you begin

Before you manage dashboard access control, ensure you have the following:

- **Account Admin permissions**: Permissions to modify access control settings at the **Account** level. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on role requirements.
- **Understanding of resource groups**: Knowledge of how resource groups work in Harness. Go to <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Manage resource groups</a> for more information.
- **Dashboards overview:** Understanding of what dashboards are and how they work in Harness before configuring access control. Go to <a href="/docs/platform/dashboards/dashboard-standard/overview" target="_blank">Dashboards</a> to learn more about it.

---

## Dashboard roles and permissions

Harness provides two built-in roles that control dashboard access. They are described as follows:

- **Dashboard Editor**: To add, edit, and delete dashboards.
- **Dashboard Viewer**: To view all the **By Harness** and **Custom** dashboards.

These roles are scoped to dashboard folders, and they determine what users can do with dashboards.

The following roles control dashboard access and capabilities. Assign these roles to users or user groups based on their responsibilities.


|  **Roles**| **Scope** |**Permissions** |
| --- | --- | --- |
| Dashboard Editor | Folder | <ul><li>Add Dashboard</li><li> Add Tile</li><li> Edit Dashboard</li><li>Delete Dashboard</li></ul>|
| Dashboard Viewer | Folder | View Dashboards|

The **Account Admin** and **Account Viewer** roles include these permissions by default.

---

## Add and manage the Dashboard Editor role for users or user groups

Assign the **Dashboard Editor** role to users or user groups to allow them to create, modify, and delete dashboards.

To add and manage permissions for the **Dashboard Editor** role for users, do the following:

1. In Harness, navigate to **Account Settings**, and then select **Access Control**.
2. Select **Manage Roles** for the user or user group. The **Manage Role Bindings** settings display.
3. Click **Add**.
4. Under **Roles**, select **Dashboard Editor**, and then click **Apply**.

---

## Add and manage the Dashboard Viewer role for users or user groups

Assign the **Dashboard Viewer** role to users or user groups to allow them to view dashboards without editing capabilities.

To add and manage permissions for the **Dashboard Viewer** role for users, do the following:

1. In Harness, navigate to **Account Settings**, and then select **Access Control**.
2. Select **Manage Roles** for the user or user group. The **Manage Role Bindings** settings display.
3. Click **Add**.
4. Under **Roles**, select **Dashboard Viewer**, and then click **Apply**.

---

## Limit project access for STO dashboards

You can restrict the **Project** filter on STO dashboards to only show projects where users have RBAC permissions. This prevents users from viewing entity information from projects they do not have access to.

By default, RBAC for STO custom dashboards is restricted to dashboard entities exclusively. When you grant folder access to a user, they can view all entity information on the dashboard. Therefore, the **Project** filter on dashboards includes all STO projects across your **Organization** by default, regardless of user RBAC project permissions.

You can restrict the projects available in the **Project** filter on STO dashboards to only those where users have RBAC permissions.

:::note
Currently, this feature is behind the feature flag `CDB_PROJECT_RBAC`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## Add and manage access control for resource groups

Limit access to specific dashboards by configuring resource groups. This ensures users only see the dashboards relevant to their work.

To limit access to specific dashboards, do the following:

1. Navigate to **Account Settings**, and then select **Access Control**.
2. In **Resource Groups**, select your resource group. Go to <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Manage resource groups</a> for more information on adding and managing resource groups.
3. In **Shared Resources**, select **Dashboards**.

   By default, **All Dashboards** is selected.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/manage-access-control-for-dashboards-01.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Select **Specified**, and then click **Add**. The **Add Dashboards** settings display.
5. In **Add Dashboards**, select the folders for which you want to limit the access.

   The selected folder may have more than one dashboard. All the dashboards in the selected folders will have the same access.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/manage-access-control-for-dashboards-02.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. Click **Add Folders**.
7. Click **Save**.

---

## Related articles

- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>: Understand role-based access control and permissions hierarchy.
- <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Manage resource groups</a>: Learn how to create and configure resource groups.
- <a href="/docs/platform/dashboards/dashboards-overview" target="_blank">Dashboards overview</a>: Explore dashboard capabilities and features.
- <a href="/docs/platform/role-based-access-control/add-users" target="_blank">Manage users</a>: Add and manage users in your Harness **Account**.