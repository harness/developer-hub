---
title: Catalog RBAC [2.0]
description: Learn how to create roles with required permissions and assign them to users and user groups.
sidebar_position: 2
---

With the release of Granular RBAC in IDP 2.0, you can now control the access over your Catalog entities i.e. you can now restrict access of who can create and view your Catalog entities. You can create your Catalog entities at all available scopes i.e. Account, Org or Project scopes. To learn more about the entities, permissions and scopes, go to [IDP 2.0 Data Model](/docs/internal-developer-portal/catalog/data-model.md).

## RBAC Workflow in Harness IDP
Before configuring RBAC for your Catalog entities, make sure you've read about the [scopes](/docs/internal-developer-portal/rbac/scopes#scopes), [permissions](/docs/internal-developer-portal/rbac/scopes#permissions--resources), and different [RBAC components](/docs/internal-developer-portal/rbac/scopes#rbac-components) here. Here's the workflow of configuring RBAC in your Harness IDP: 
1. Go to your administrative settings and select the scope settings at which you want to configure RBAC.
2. [Create roles with the desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). For example: If you are configuring RBAC for Catalog entity creation, make sure you have the **Create/Edit** permission enabled for your role. 
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

## Catalog RBAC Workflow Examples

### Configure RBAC for account-level Catalog entity creation
This example walks through an RBAC configuration that allows full control over Catalog entity creation and modification for entities created at the account scope. 
//scope of access under account
//specific catalog entity

### Configure RBAC for project-specific Catalog entity view access