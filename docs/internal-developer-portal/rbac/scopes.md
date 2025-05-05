---
title: Scopes, Roles & Permission [2.0]
description: Learn how to create roles with required permissions and assign them to users and user groups.
sidebar_position: 1
---
IDP 2.0 introduces granular RBAC across different IDP resources like Catalog, Workflows, etc. which means now you can control who could view or edit your IDP resources. Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. With this, Harness IDP introduces scope-aware permissions aligned with Harness Projects, Organizations and Account. 

To learn more about the entities, permissions and different scopes we've introduced with IDP 2.0, please refer to the Data Model here. 

To learn more about configuring RBAC, go to [configure RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#configure-rbac-in-harness). 

## Scopes 
IDP 2.0 follows a three-level hierarchical structure. The three levels, or scopes, are **Account**, **Organization**, and **Project**. IDP resources can be explicitly created at any scope.

You can configure permissions for each scope. This helps delegate responsibilities to different teams and allows efficient organization and management of resources by providing granular access control that is flexible, scalable, and easy to manage.

### Account Scope

The **Account Scope** is the highest level. It is your Harness account and encompasses all resources within your subscription. Resources created at the account scope are accessible platform-wide. Permissions for resources created at this level can be modified using granular RBAC and shared across user groups.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/313af370-dff9-44ba-a6f1-0d944a64c1c6" />

### Organization Scope

The **Organization Scope** contains related projects, resources, and users within a specific domain or business unit. It provides a way to create and manage resources specific to a particular organization, separate from other areas of the account. Resources created at the organization scope are scoped to the orgs that own them but can also be shared using granular RBAC.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/702e2a2a-6117-4efb-a83c-5ccd2a0202bb" />

### Project Scope

The **Project Scope** includes resources for a specific team or project. It enables the creation and management of resources specific to a particular project, separate from the larger organization and account. Resources created at this scope are only available within that project and scoped to the teams that own them.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/e1192086-0bc6-45c2-a869-133dd2aff600" />

Learn more about the [Harness platform hierarchy](https://developer.harness.io/docs/platform/get-started/key-concepts/#account).

## Permissions & Resources 
All IDP resources can exist at different scopes, but their permissions and access levels depend on the RBAC settings you apply. With granular RBAC, you can use the pre-defined roles or define custom roles with specific permissions, and organize them into reusable resource groups. These permissions are fully aligned with the existing Harness RBAC framework.

With IDP 2.0, you can create resources at any scope: **Account**, **Org**, or **Project**. Here's how resources, permissions for these resources and scopes link together in IDP 2.0:

| **Resource**   | **Permissions** | **Account scope** | **Org scope** | **Project scope** | **Notes**  |
| -------------- | ---------------- | ----------------- | ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Catalog**    |<ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> | ✅                 | ✅             | ✅                 | Core catalog entities **(Component, API, Resource)** can be created and managed across all scopes.         |
| **Workflows**  |<ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute</li></ul> | ✅                 | ✅             | ✅                 | Workflows can be created, managed, and executed across all scopes.                                         |
| **Scorecards** |<ul><li>View</li><li>Create/Edit</li><li>Delete</li></ul> | ✅                 | ❌             | ❌                 | Only supported at the Account scope currently. Org/Project scope support is planned in the future roadmap. |
| **Layouts**    |<ul><li>View</li><li>Create/Edit</li></ul> | ✅                 | ❌             | ❌                 | Supported only at the Account scope currently. Org/Project scope support is planned.                       |
| **Plugins**    |<ul><li>View</li><li>Create/Edit</li><li>Toggle</li><li>Delete</li></ul> | ✅                 | ❌             | ❌                 | Plugins can be created and configured only at the Account scope.                                           |

You can configure RBAC for resources with different permissions for each resource and create a reusable resource group to apply these permissions onto. Learn more about [Platform RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) here. 

## RBAC Components
IDP 2.0 utilises Platform Hierarchy and RBAC to add granular control over IDP resources. There are three [key components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-components) for Harness RBAC: 
- **Principals**: These are the entities taking action in the system. These include users, user groups, and service accounts.
- **Resource groups**: These define what objects can be acted on. Objects include organizations, projects, pipelines, connectors, users, and more.
- **Roles**: These define what actions can be taken on objects. Actions include view, create, edit, delete, and so on.

In IDP 2.0, as we introduce granular control over resources - you can assign [roles (with specific permissions) and resource groups (with access to specific resources)](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#role-binding) to principals. Let's understand this in detail. 

### Principals: User Groups & Users
In Harness IDP, principals refer to the entities taking action in the system i.e. User Groups & Users. You assign permissions and access to IDP resources, through roles and resource groups, to principals. Permissions define what actions a principal can take. Access defines which objects they can act on. All user groups and users are registered as Catalog entities, you can check and access the same here from the Catalog. 

**Principals** include:

- [**Users**](https://developer.harness.io/docs/platform/role-based-access-control/add-users): Individual users in Harness. Each user can belong to many user groups. You can assign roles and resource groups directly to users, or they can inherit these from user groups that they belong to. Learn more about [managing and creating users](https://developer.harness.io/docs/platform/role-based-access-control/add-users) here. 
- [**User Groups**](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups): User groups contain multiple Harness users. Roles and resource groups are assigned to groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members. You can create user groups at all scopes. Learn more about [managing and creating user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) here. 

### Resource Groups
A resource group is a set of Harness resources that a principal can access. You can create resource groups at all [scopes](#scopes). Resource groups are assigned along with roles to principals. [Roles](#roles) grant permissions (what actions can be taken) and resource groups grant access (what objects can be acted on). 

Resource groups either include **All Resources** (all resources of a given type) or **Named Resources** (specific, individual resources). For Harness IDP, you can manage the following resources for a principal: 
- Catalog
- Workflow
- Layouts
- Scorecards
- Integrations
- Plugins
- Advanced Configuration

This means as per the permissions defined in the role you select and grant to the principal, you can manage and select the resource group (set of resources) you want to apply the role on for the principal. 

Harness has built-in resource groups at each scope, and you can create custom resource groups. For more information, go to [Manage resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups).

### Roles
Roles are sets of [permissions](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference) that allow or deny specific operations on resources. Roles are applied together with resource groups to create a complete set of permissions and access.

Harness includes some built-in roles, and you can create your own [custom roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles#create-a-role), which are useful for limited and fine-grained access control. For more information, go to [Manage roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). Roles are scope-specific and can be created at [all scopes](#scopes).

#### IDP Admin Role
Harness IDP has a pre-defined built-in role known as **IDP Admin**. This role gives the principal all the permissions access to all resources at all scopes:
<img width="800" alt="Image" src="https://github.com/user-attachments/assets/e7d9c33f-013e-417e-8a23-353c6fa8b0ab" /> 


## RBAC Workflow in Harness IDP
To configure RBAC in Harness IDP, you must do the following: 
1. Go to your administrative settings and select the scope at which you want to configure RBAC.
2. [Create roles with the desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles).
3. [Create resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) to apply RBAC to a specific set of resources for the principal. 
4. [Create user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users). 
5. [Assign roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users, user groups.
6. If you have not already done so, [configure authentication](https://developer.harness.io/docs/platform/authentication/authentication-overview). 



