---
title: Catalog RBAC [2.0]
description: Learn how to create roles with required permissions and assign them to users and user groups.
sidebar_position: 2
---

With the release of Granular RBAC in IDP 2.0, you can now control the access over your Catalog entities i.e. you can now restrict access of who can create and view your Catalog entities. You can create your Catalog entities at all available scopes i.e. Account, Org or Project scopes. To learn more about the entities, permissions and scopes, go to [IDP 2.0 Data Model](/docs/internal-developer-portal/catalog/data-model.md).

## RBAC Workflow in Harness IDP
Before configuring RBAC for your Catalog entities, make sure you've read about the [scopes](/docs/internal-developer-portal/rbac/scopes#scopes), [permissions](/docs/internal-developer-portal/rbac/scopes#permissions--resources), and different [RBAC components](/docs/internal-developer-portal/rbac/scopes#rbac-components) here. Here's the workflow of configuring RBAC in your Harness IDP: 
1. Go to your administrative settings and select the scope settings at which you want to configure RBAC.
2. [Create roles with the desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). For example: If you are configuring RBAC for Catalog entity creation, make sure you have the **Create/Edit** (Catalog) permission enabled for your role. 
3. [Create resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) to apply RBAC to a specific set of resources for the principal. For example: If you want to configure RBAC for your Catalog entities, make sure you have added **Catalog** resource added under the resource group. 
4. [Create user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users). 
5. [Assign roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users, user groups.
6. If you have not already done so, [configure authentication](https://developer.harness.io/docs/platform/authentication/authentication-overview). 

## Permissions for Catalog Entities
All your core Catalog entities (Component, API, Resource) fall under the resource category "Catalog" for RBAC. There are different permissions for Catalog that can be configured while creating a custom role: 

| **Permission** | **Description** | 
| ---------- | ---------- |
| **Create/Edit** | Users can create Catalog entities and can modify the configuration of these entities if given this permission. |
| **View** | Users can view the Catalog entity, but can not create/modify/delete any of it. | 
| **Delete** | Users can delete the Catalog entity. | 

You can configure these permissions for the Catalog entities when you are [configuring your custom role](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). You can choose the permissions you want the user to have while configuring RBAC. To learn more about how to create and manage custom roles, go to [Manage Roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). 

<img width="850" alt="Image" src="https://github.com/user-attachments/assets/28bbaebe-a480-4141-b118-250c45771bc5" />

## Recommendations for using RBAC in Catalog

## Catalog RBAC Examples

### Configure RBAC for account-level Catalog entity creation
This example walks through an RBAC configuration that allows full control over Catalog entity creation and modification for entities created at the account scope (including all child resources). This configuration uses a custom role called **IDP Catalog Create**, a custom resource group called **All Catalog Create Resources** and a custom user group called **Catalog Create Users**. 

The **All Catalog Create Resources** resource group exists at the account scope and allows **Create/Edit** access to all the Catalog entities at the account level and in all organizations and projects under the account. The **IDP Catalog Create** role has the **Create/Edit** permission for the Catalog entities. 

#### Create the IDP Catalog Create Role
1. In Harness, select **Account Settings**, and then select **Roles** under the **Access Control** category.
2. Under **Roles**, select **New Role** to add a new role. 
3. For **Name**, enter **IDP Catalog Create**. Description and Tags are optional.
4. Select **Save**.
5. Select the following permissions for **Developer Portal**:
    - For **Catalog**, select **Create/Edit**. 
6. Select **Apply Changes**. 

For more information about roles and permissions, go to [Manage roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles) and the [Permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/).

#### Create the custom resource group
1. In Harness, select **Account Settings**, and then select **Resource Groups** under the **Access Control** category.
2. Under **Resource Groups**, select **New Resource Group** to add and create a new resource group. 
3. For **Name**, enter **All Catalog Create Resources**. Select a colour for the resource group. Description and Tags are optional.
4. Select **Save**. 
5. For **Resource Scope**, select **All (including all Organizations and Projects)**. This means the resource group grants access to the specified resources at the account level and in all organizations and projects under the account. Read more about **Resource Scopes** [here](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/#scopes-and-refinement). 
6. For **Resources**, select **Specified**, and then select the **Catalog** resource from the table. 
7. Select **Save**.

For more information about creating resource groups, go to [Manage resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups).

#### Create the Catalog Create Users user group
1. In Harness, select **Account Settings**, and then select **User Groups** under the **Access Control** category.
2. Under **User Groups**, select **New User Group** to add and create a new user group. 
3. For **Name**, enter **Catalog Create Users**. Description and Tags are optional.
4. In **Add Users**, select users to add to the group.
5. Select **Save**.

For more information about user groups and users, go to [Manage user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).

#### Assign the role and resource group to the user group
1. In Harness, select **Account Settings**, and then select **User Groups** under the **Access Control** category.
2. Locate the **Catalog Create Users** user group, and select **Manage Roles**.
3. Under **Role Bindings**, select **Add**.
4. For **Role**, select the **IDP Catalog Create** role.
5. For **Resource Groups**, select the **All Catalog Create Resources** group.
6. Select **Apply**.

For more information about assigning roles and resource groups, go to [Role binding](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#role-binding).

This will configure RBAC for the added users to allow them to create/edit catalog entities at the account level as well all the organizations and projects under the account. 
