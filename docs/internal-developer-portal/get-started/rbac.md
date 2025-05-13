---
title: Get Started with RBAC
sidebar_position: 5
sidebar_label: Get Started with RBAC
---

Harness IDP 2.0 introduces granular RBAC across various IDP resources like Catalog, Workflows, etc. which means now you can control who could view or edit your IDP resources. Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. With this, Harness IDP introduces scope-aware permissions aligned with Harness Projects, Organizations and Account.

Harness IDP follows platform hierarchy and follows the same access control that Platform RBAC utilises. To learn more about the same, go to RBAC in Harness. 

## Prerequisites
Before configuring RBAC in Harness IDP, you must be an **Admin** in the relevant account, organization or project. If your Harness account is new, you might need to contact **Harness Support** to get the first admin provisioned in your account.

If you are not an admin, you can configure some aspects of RBAC if you have the required granular permissions:
- Users: Requires View, Manage, and Invite permissions for Users.
- User groups: Requires View and Manage permissions for User Groups.
- Resource groups: Requires View, Create/Edit, and Delete permissions for Resource Groups.
- Roles: Requires View, Create/Edit, and Delete permissions for Roles.

Also, ensure you have an understanding of: 
- Scopes, Roles & Permissions
- Harness' Key Concepts
- Harness IDP RBAC Components
- Catalog & Workflow RBAC Principles
- Creating Organizations & Projects

## RBAC Workflow
To configure RBAC in Harness IDP, you can follow the given workflow:  
1. Go to your administrative settings and select the scope settings (account, organisation or project settings) at which you want to configure RBAC.
2. [Create roles with the desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles).
3. [Create resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) to apply RBAC to a specific set of resources for the principal. 
4. [Create user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users). 
5. [Assign roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users, user groups.
6. If you have not already done so, [configure authentication](https://developer.harness.io/docs/platform/authentication/authentication-overview). 


## Permissions & Resources
All IDP resources can exist at different scopes, but their permissions and access levels depend on the RBAC settings you apply. With granular RBAC, you can use the pre-defined roles or define custom roles with specific permissions, and organize them into reusable resource groups. These permissions are fully aligned with the existing Harness RBAC framework.

You can configure RBAC for resources with different permissions for each resource and create a reusable resource group to apply these permissions onto. Learn more about [Platform RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) here. 


With IDP 2.0, you can create resources at any scope: **Account**, **Org**, or **Project**. Here's how resources, permissions for these resources and scopes link together in IDP 2.0:

| **Resource**   | **Permissions** | **Account scope** | **Org scope** | **Project scope** | **Notes**  |
| -------------- | ---------------- | ----------------- | ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Catalog**    |<ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> | ✅                 | ✅             | ✅                 | Core catalog entities **(Component, API, Resource)** can be created and managed across all scopes.         |
| **Workflows**  |<ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute</li></ul> | ✅                 | ✅             | ✅                 | Workflows can be created, managed, and executed across all scopes.                                         |
| **Scorecards** |<ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> | ✅                 | ❌             | ❌                 | Only supported at the Account scope currently. Org/Project scope support is planned in the future roadmap. |
| **Layouts**    |<ul><li>View</li><li>Create/Edit</li></ul> | ✅                 | ❌             | ❌                 | Supported only at the Account scope currently. Org/Project scope support is planned.                       |
| **Plugins**    |<ul><li>View</li><li>Create/Edit</li><li>Toggle</li><li>Delete</li></ul> | ✅                 | ❌             | ❌                 | Plugins can be created and configured only at the Account scope.                                           |

## Configure RBAC for Account-level Catalog entity creation
This example walks through an RBAC configuration that allows full control over Catalog entity creation and modification for entities created at the account scope (including all child resources). Read more about **Catalog RBAC** here. 

This configuration uses a custom role called **IDP Catalog Create**, a custom resource group called **All Catalog Create Resources** and a custom user group called **Catalog Create Users**. 

The **All Catalog Create Resources** resource group exists at the account scope and allows **Create/Edit** access to all the Catalog entities at the account level and in all organizations and projects under the account. The **IDP Catalog Create** role has the **Create/Edit** permission for the Catalog entities. 

### Create a custom role
1. In Harness, select **Account Settings**, and then select **Roles** under the **Access Control** category.
2. Under **Roles**, select **New Role** to add a new role. 
3. For **Name**, enter **IDP Catalog Create**. Description and Tags are optional.
4. Select **Save**.
5. Select the following permissions for **Developer Portal**:
    - For **Catalog**, select **Create/Edit**. 
6. Select **Apply Changes**. 

For more information about roles and permissions, go to [Manage roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles) and the [Permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/).

### Create the custom resource group
1. In Harness, select **Account Settings**, and then select **Resource Groups** under the **Access Control** category.
2. Under **Resource Groups**, select **New Resource Group** to add and create a new resource group. 
3. For **Name**, enter **All Catalog Create Resources**. Select a colour for the resource group. Description and Tags are optional.
4. Select **Save**. 
5. For **Resource Scope**, select **All (including all Organizations and Projects)**. This means the resource group grants access to the specified resources at the account level and in all organizations and projects under the account. Read more about **Resource Scopes** [here](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/#scopes-and-refinement). 
6. For **Resources**, select **Specified**, and then select the **Catalog** resource from the table. 
7. Select **Save**.

For more information about creating resource groups, go to [Manage resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups).

### Create a custom user group
1. In Harness, select **Account Settings**, and then select **User Groups** under the **Access Control** category.
2. Under **User Groups**, select **New User Group** to add and create a new user group. 
3. For **Name**, enter **Catalog Create Users**. Description and Tags are optional.
4. In **Add Users**, select users to add to the group.
5. Select **Save**.

For more information about user groups and users, go to [Manage user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).

### Assign the role and resource group to the user group
1. In Harness, select **Account Settings**, and then select **User Groups** under the **Access Control** category.
2. Locate the **Catalog Create Users** user group, and select **Manage Roles**.
3. Under **Role Bindings**, select **Add**.
4. For **Role**, select the **IDP Catalog Create** role.
5. For **Resource Groups**, select the **All Catalog Create Resources** group.
6. Select **Apply**.

For more information about assigning roles and resource groups, go to [Role binding](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#role-binding).

This will configure RBAC for the added users to allow them to create/edit catalog entities at the account level as well all the organizations and projects under the account. 
