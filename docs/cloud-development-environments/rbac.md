---
title: RBAC for CDE - Role-Based Access Control
description: Learn how Harness enhances developer experience with pre-configured cloud development environments.
sidebar_position: 10
sidebar_label: Access Control - RBAC
---

Harness CDE provide granular role-based access control (RBAC) for all CDE resources. This means that you can control who can view, access and modify your CDE resources across different scopes. Role-based access control (RBAC) lets you define who can access your resources and what actions they can perform on them. This adds an addition layer of security to ensure only authorized users can access and use your CDE resources. You can configure **permissions** and **resource groups** at the Account, Organization or Project level. 

This document will take you through the basic concepts of RBAC components for CDEs and will help you configure RBAC for CDE users. For more details on the Harness RBAC setup, go to the [Harness RBAC Configuration](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) guide. 

:::info
To assign Roles, you need Administrative privileges at the Account level **(Account Admin role)**.
:::

## RBAC Components 
Harness CDEs utilizes Platform Hierarchy and RBAC to provide fine-grained control over CDE resources. There are three [key components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-components) for Harness RBAC:

* **Principals** – Entities that take action within the system. (e.g., users, user groups, etc.)
* **Resource Groups** – Define which objects can be acted upon (e.g., gitspaces, infrastructure providers, etc.).
* **Roles** – Define what actions can be taken on those objects (e.g., view, create, edit, delete).

### Principals: User Groups & Users
In Harness CDE, **principals** refer to entities that take action in the system — namely, **User Groups** and **Users**. You assign permissions and access to CDE resources via roles and resource groups applied to these principals.

Permissions define **what actions** a principal can take.
Access defines **which objects** they can act on.

To learn more about users, go to [Manage Users](https://developer.harness.io/docs/platform/role-based-access-control/add-users/) and to learn more about user groups, go to [Manage User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/). 

### Resource Groups
A **resource group** is a collection of Harness resources a principal can access. These are **scope-specific**, and can be created at the **Account**, **Organization**, or **Project** level.

For example, a group created at the project level will only be available within that project. Resource groups are always assigned alongside roles.

* **Roles** = define actions (permissions)
* **Resource Groups** = define scope (access)

To understand more about resource groups, go to [Manage Resource Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/). 

#### Resource Group Scope

Each group also includes **Resource Scope** options that control sub-level access. For example, a group created at the Org level can provide access to:

* All projects within that Org
* Or only selected projects

To learn more about the resource scope options, go to [Scopes and Refinement](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/#scopes-and-refinement).

### Roles

**Roles** are sets of [permissions](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference) that allow or restrict specific operations on resources. They are applied **along with resource groups** to create effective RBAC policies.

Harness CDE offers predefined roles, and you can also create [custom roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles#create-a-role) to enforce fine-grained access control. Roles are **scope-specific** and can be created at any scope.

To learn more about roles, go to [Manage Roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles). 

## CDE Resources & Permissions
CDE resources can be easily managed and configured using granular RBAC. Each CDE resource has its own set of some specific permissions, which you can assign to Roles. Roles, when combined with Resource Groups, determine the access level and permissions users have within CDE. 

There are two CDE resources that can be created at different scopes: **Gitspaces** and **Infrastructure Providers**.

Gitspaces are only created at the **Project** scope. 
Infrastructure Providers are only configured at the **Account** scope. 

### Resources

| **Resource**   | **Permissions**                                                           | **Account Scope** | **Org Scope** | **Project Scope** | **Notes**                                                                                          |
| -------------- | ------------------------------------------------------------------------- | ----------------- | ------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| **Gitspaces**    | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute</li></ul>                 | ✅                 | ✅             | ✅                 | Gitspaces can be created, managed and executed at the project scope but can be controlled across the Account and Org scope (for project settings). |
| **Infrastructure Providers**  | <ul><li>View</li><li>Edit</li><li>Delete</li></ul> | ✅                 | ✅             | ✅                 | Infrastructure providers for the CDE Account can be accessed, modified or deleted across all scopes.                                  |

### Permission Details

| **Permission**   | **Description**                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| **View**         | Allow users read-only access to resources.                                |
| **Create/Edit**  | Allow users to configure, create or edit resources.                                  |
| **Delete**       | Allow users to delete resources.                                          |
| **Execute**      | Allow users to execute Gitspaces (use them).                                          |

## CDE Roles 
Harness CDE provides **three built-in roles** specifically designed for CDE resources and use cases. These roles come pre-configured with certain permissions on the CDE resources. Let's understand more about each role in detail. 

### CDE Admin
This role should be assigned to users who should have **full control over CDE resources**. This is an admin role and provides admin access to all CDE resources. This role provides the following permissions over CDE resources: 

| **Resource**   | **Permissions**                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| **Gitspaces**         | View, Create/Edit, Delete, Execute                                |
| **Infrastructure Providers**  | View, Edit, Delete                                  |

### CDE Creator
This role should be assigned to users who should only have **create access** over **Gitspaces**. This is a **Creator** role and is only relevant for the **Gitspaces** resource. This role provides the following permissions over CDE resources: 

| **Resource**   | **Permissions**                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| **Gitspaces**         | Create                                |

### CDE User
This role should be assigned to users who should not have the **create access** over CDE resources. This role provides the following permissions over CDE resources: 

| **Resource**   | **Permissions**                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| **Gitspaces**         | View, Edit, Delete, Execute                                |
| **Infrastructure Providers** | View |

## RBAC Workflow
Here's the workflow for configuring RBAC in Harness CDE: 
1. Go to your administrative settings and select the scope (**Account**, **Org** or **Project**) at which you want to configure RBAC for CDE resources. 
2. [Create custom roles with desired permissions](/docs/platform/role-based-access-control/add-manage-roles.md#create-a-role) ([or use the default CDE roles](/docs/cloud-development-environments/rbac#cde-roles)). 
3. [Create resource groups](/docs/platform/role-based-access-control/add-resource-groups.md#create-a-resource-group) to apply RBAC to a specific set of CDE resources for the principal. 
4. [Create user groups](/docs/platform/role-based-access-control/add-user-groups.md#create-user-groups-manually) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users). 
5. Role Binding: [Assign roles and resource groups](/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users or user groups. 

### CDE RBAC Example


