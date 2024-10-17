---
title: Manage roles
description: Use roles for RBAC in Harness.
sidebar_position: 20
helpdocs_topic_id: tsons9mu0v
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Roles are an [RBAC component](./rbac-in-harness.md#rbac-components) that contain a set of [permissions](/docs/platform/role-based-access-control/permissions-reference). Roles define what actions, such as viewing, creating, editing, or deleting, can be taken on Harness resources. When you assign a role to a user, user group, or service account, the permissions defined in the role are granted to the target user, group, or service account.

Harness includes some [built-in roles](#built-in-roles), and you can [create custom roles](#create-a-role), which are useful for limited and fine-grained access control.

Roles are scope-specific, and you can create them at any [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes). For example, a role created at the project scope is only available in that project.

## Roles and resource groups work together

Roles are applied together with [resource groups](/docs/platform/role-based-access-control/add-resource-groups) to create a complete set of permissions and access. For example:

* You can assign the **Organization Admin** role with a resource group that is limited to specific projects or specific organizations.
* You can assign the **Pipeline Executor** role with a resource group that only allows access to specific pipelines, rather than all pipelines in the project.

:::warning Least privilege

RBAC is additive. The total expanse of a user/service account's permissions and access is the sum of all the roles and resource groups from all user groups they belong to, as well as any roles and resource groups assigned directly to them as an individual user/service account.

It is important to follow the principle of least privilege (PoLP). This is a security principle that means users are granted the absolute minimum access/permissions necessary to complete their tasks and nothing more.

While Harness includes some built-in roles and resource groups, to ensure the least privilege, consider:

* Being selective in the way you apply roles and resource groups.
* Creating your own roles and resource groups as needed for refined access control.

:::

## Built-in roles

Harness includes several built-in roles. To examine the permissions assigned to these roles, view them in Harness:

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the role exists.

   * To view a role at the account scope, select **Account Settings**, and then select **Access Control**.
   * To view a role at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To view a role at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Roles** in the header.
3. Select the role you want to view. For details about specific permissions, go to the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference).

:::note

Built-in roles can be hidden. This functionality is behind the feature flags `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE`, `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`, and `PL_HIDE_ACCOUNT_LEVEL_MANAGED_ROLE`. Contact [Harness Support](mailto:support@harness.io) to enable the features.

:::

### Platform roles

These roles are not specific to any modules. They are for administration and oversight of an entire Harness account, organization, or project. They also provide access to cross-module components, such as dashboards and pipelines.

| Role | [Scope](./rbac-in-harness.md#permissions-hierarchy-scopes) |
| ---  | ----- |
| Account Admin | Account |
| Account Viewer | Account |
| Dashboard Admin | Account |
| Dashboard Viewer | Account |
| Billing Admin | Account |
| Organization Admin | Organization |
| Organization Viewer | Organization |
| Project Admin | Project |
| Project Viewer | Project |
| Pipeline Executor | Project |

### Module-specific roles

Harness creates these roles for you depending on the modules you use. These roles exist at all [scopes](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

* Feature Flag Manage Role
* CET Admin
* Chaos Admin
* CCM Admin
* CCM Viewer
* Security Testing SecOps Role
* Security Testing Developer Role
* GitOps Admin Role
* Code Admin (for [Harness Code Repository](/docs/code-repository/get-started/overview.md))

## Manage roles in Harness

To manage roles in Harness, you need a role, such as **Account Admin**, that has [permission](/docs/platform/role-based-access-control/permissions-reference) to view, create/edit, and delete roles.

<!-- ![](./static/add-manage-roles-17.png) -->

<DocImage path={require('./static/add-manage-roles-17.png')} />

### Create a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where you want to create the role.

   * To create a role at the account scope, select **Account Settings**, and then select **Access Control**.
   * To create a role at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To create a role at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Roles** in the header, and then select **New Role**.
3. Enter a **Name** for the role. **Description** and **Tags** are optional.
4. Select **Save**.
5. Select [permissions](/docs/platform/role-based-access-control/permissions-reference) for the role.

   <!-- ![](./static/add-manage-roles-19.png) -->

   <DocImage path={require('./static/add-manage-roles-19.png')} />

6. Select **Apply Changes**.

### Edit a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the role exists.

   * To edit a role at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a role at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a role at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Roles** in the header.
3. Locate the role you want to edit.
4. Select **More options** (&vellip;) on the role card, and then select **Edit**.
5. Edit the role's name, description, or tags, if needed, and then select **Save**.
6. Edit the role's permissions, and then select **Apply Changes**. For details about specific permissions, go to the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference).

### Delete a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the role exists.

   * To delete a role at the account scope, select **Account Settings**, and then select **Access Control**.
   * To delete a role at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To delete a role at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Roles** in the header.
3. Locate the role you want to delete.
4. Select **More options** (&vellip;) on the role card, and then select **Delete**.

## Continue RBAC configuration

Creating roles is one part of [configuring RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness#configure-rbac-in-harness).

Roles, which grant permissions, work alongside [resource groups](/docs/platform/role-based-access-control/add-resource-groups), which grant access.

After configuring roles and resource group, you assign them to [users](./add-users.md), [user groups](./add-user-groups.md), and [service accounts](./add-and-manage-service-account.md).

## Add permissions access to specific resources selected via Custom Resource Group

You can do role bindings to a user and attach the user to a specific resource group at the Account, Project, or Organization scope.

To add new users to a custom Resource Group with role bindings, do the following:

1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to add new users to a custom Resource Group and do role bindings.
2. Under **Access Control**, select **Resource Groups**.
3. Create a new **Resource Group**, select the desired resource types, and click **Save**.
4. Return to **Account Settings**. Under **Access Control**, select **Users**.
5. Click **New User**, enter the user's email, then, under **Role Bindings**, select **Add**.
6. Under Roles, click **Select a role**, then choose **Account Admin** or any custom role with all permissions selected for the resources in the resource group from the dropdown.
7. Under **Resource Groups**, click **All Resources Including** and select your **Resource Group**.
8. Click **Apply** to send an invitation to the user's email. After the user accepts the invite, the role-binding process is complete.

The user can now sign in to their account and access only those resources allowed in the resource groups with their **Account Admin** permissions.

To add role bindings to an existing user:

1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to add new users to a custom Resource Group and do role bindings.
2. Under **Access Control**, select **Resource Groups**.
3. Create a new **Resource Group**, select the desired resource types, and then select **Save**.
4. Return to **Account Settings**. Under **Access Control**, select **Users**.
5. Search for the user to whom you want to assign the Account Admin role or any custom role with all permissions selected for the resources in the resource group, and then select the user.
6. Go to the **Role Bindings** tab, then select **Manage Role Bindings**.
7. Under **Role Bindings**, select **Add**. 
8. Under **Roles**, click **Select a role**, and then select **Account Admin**.
9. Under **Resource Groups**, select **All Resources Including**, and then select your **Resource Group**.
10. Select **Apply**. You will receive a notification stating **Role Assignments updated successfully**, and the role binding process is complete.
  
The user can now sign in to their account and access only those resources allowed in the resource groups with their **Account Admin** permissions.

## Reuse roles across scopes

You can further streamline role management by reusing roles across scopes in Harness, simplifying access control configuration across your account, organizations, and projects. By creating a role at the account level, you can easily assign it to users, user groups, or service accounts at more granular levels like the organization or project scope.

:::important
You can only reuse custom roles across scopes. Built-in roles are not reusable.
:::

:::note
This feature is behind the feature flag `PL_ROLE_REUSABILITY_ACROSS_CHILD_SCOPES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

<details>
<summary>Example: Reusing roles across scopes</summary>

This example walks through reusing a role across scopes. The role is created at the account scope and then assigned to users at the organization and project scopes.

#### Create a role at the account scope

1. In Harness, go to **Account Settings**, and then select **Access Control**.
2. Select **Roles** in the header, and then select **New Role**.
3. For **Name**, enter `TEST_ROLE`. **Description** and **Tags** are optional.
4. Select **Save**.
5. Select the following permissions:
   - For **Pipelines**, select **Execute**.
6. Select **Apply Changes**.

#### Assign the role to users at the organization scope
1. In Harness, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
2. Select **User Groups** in the header, and then select the User Group you want to assign the role to.
3. Select **Manage Role Bindings**.
4. Under **Role Bindings**, select **Add**.
5. Under **Select an Existing Role**, select **Account** in the header and then select the role you want to assign.
   <DocImage path={require('./static/add-manage-roles-20.png')} />
6. Select **Apply Selected**.
7. Select **Save**.
   <DocImage path={require('./static/add-manage-roles-21.png')} />

</details>

