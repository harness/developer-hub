---
title: Workflows RBAC [2.0]
description: Learn how to create roles with required permissions and assign them to users and user groups.
sidebar_position: 3
---

With the release of Granular RBAC in IDP 2.0, you can now control the access over Workflows i.e. you can now restrict access of who can create and execute Workflows in your Harness IDP. You can create Workflows at all available scopes i.e. Account, Org or Project scopes. To learn more about the permissions and scopes, go to [IDP 2.0 Data Model](/docs/internal-developer-portal/catalog/data-model.md).

## RBAC Workflow in Harness IDP
Before configuring RBAC for your Workflows, make sure you've read about the [scopes](/docs/internal-developer-portal/rbac/scopes#scopes), [permissions](/docs/internal-developer-portal/rbac/scopes#permissions--resources), and different [RBAC components](/docs/internal-developer-portal/rbac/scopes#rbac-components) here. Here's the workflow of configuring RBAC in your Harness IDP: 
1. Go to your administrative settings and select the scope settings at which you want to configure RBAC for your Workflow.
2. [Create roles with the desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). For example: If you are configuring RBAC for Workflow creation, make sure you have the **Create/Edit** (Workflow) permission enabled for your role. 
3. [Create resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) to apply RBAC to a specific set of resources for the principal. For example: If you want to configure RBAC for your Workflows, make sure you have added **Workflow** resource added under the resource group. 
4. [Create user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users). 
5. [Assign roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users, user groups.
6. If you have not already done so, [configure authentication](https://developer.harness.io/docs/platform/authentication/authentication-overview). 

## Permissions for Workflows
There are different permissions for Workflows that can be configured while creating a custom role: 

| **Permission** | **Description** | 
| ---------- | ---------- |
| **Create/Edit** | Users can create Workflows and can modify the configuration of these Workflows if given this permission. |
| **View** | Users can view the Workflows, but can not create/modify/delete any of it. | 
| **Delete** | Users can delete the Workflows. | 
| **Execute** | Users can execute these Workflows if given this permission. | 

You can configure these permissions for Workflows when you are [configuring your custom role](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). You can choose the permissions you want the user to have while configuring RBAC. To learn more about how to create and manage custom roles, go to [Manage Roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). 

<img width="850" alt="Image" src="https://github.com/user-attachments/assets/28bbaebe-a480-4141-b118-250c45771bc5" />

## Recommendations for using RBAC in Workflows

## Workflow RBAC Examples

### Configure RBAC for specific project-level Workflow creation
This example walks through an RBAC configuration that allows full control over Workflow execution for specific project level Workflows. This configuration uses a custom role called **IDP Workflow Execute**, a custom resource group called **All Workflow Execute Resources** and a custom user group called **Workflow Execute Users**. 

The **All Workflow Execute Resources** resource group exists at the project scope and allows **Execute** access to all the Workflows at the project level. The **IDP Workflow Execute** role has the **Execute** permission for the Workflows. 

#### Create the IDP Workflow Execute Role
1. In Harness, go to the project where you want to configure RBAC. To configure RBAC for a specific project, you must navigate to that project first.
2. Select **Project Settings**, and then select **Roles** under the **Access Control** category.
3. Under **Roles**, select **New Role** to add a new role. 
4. For **Name**, enter **IDP Workflow Execute**. Description and Tags are optional.
5. Select **Save**.
6. Select the following permissions for **Developer Portal**:
    - For **Workflow**, select **Execute**. 
7. Select **Apply Changes**. 

For more information about roles and permissions, go to [Manage roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles) and the [Permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/).

#### Create the project resource group
1. In the same Harness project where you [created the "IDP Workflow Execute" role](#create-the-idp-workflow-execute-role), select **Project Settings**, and then select **Resource Groups** under the **Access Control** category.
2. Under **Resource Groups**, select **New Resource Group** to add and create a new resource group. 
3. For **Name**, enter **All Workflow Execute Resources**. Select a colour for the resource group. Description and Tags are optional.
4. Select **Save**. 
5. For **Resource Scope**, you can only have the **Project only** scope. This means this resource group includes all resources in the project's scope. 
6. For **Resources**, select **Specified**, and then select the **Workflow** resource from the table. 
7. Select **Save**.

In this example, the **Resource Scope** is locked to **Project only**, which means the resource group can only access the selected resources within this project. If you want to **execute Workflows at a higher scope**, you would need to configure RBAC at the account or org scope and then refine access by project. Similarly, if you wanted to create a user group that could execute any Workflow in an organization or account, you would need to create the role, resource group, and user group at the account scope (by navigating to Account Settings and then selecting Access Control).

For more information about creating resource groups, go to [Manage resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups).

#### Create the Workflow Execute Users user group
1. In the same Harness project where you [created the "IDP Workflow Execute" role](#create-the-idp-workflow-execute-role), select **Project Settings**, and then select **User Groups** under the **Access Control** category.
2. Under **User Groups**, select **New User Group** to add and create a new user group. 
3. For **Name**, enter **Workflow Execute Users**. Description and Tags are optional.
4. In **Add Users**, select users to add to the group.
5. Select **Save**.

For more information about user groups and users, go to [Manage user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).

#### Assign the role and resource group to the user group
1. In the same Harness project where you [created the "IDP Workflow Execute" role](#create-the-idp-workflow-execute-role), select **Project Settings**, and then select **User Groups** under the **Access Control** category.
2. Locate the **Workflow Execute Users** user group, and select **Manage Roles**.
3. Under **Role Bindings**, select **Add**.
4. For **Role**, select the **IDP Workflow Execute** role.
5. For **Resource Groups**, select the **All Workflow Execute Resources** group.
6. Select **Apply**.

For more information about assigning roles and resource groups, go to [Role binding](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#role-binding).

This will configure RBAC for the added users to allow them to execute Workflows at the specified project scope. 