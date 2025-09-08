---
title: RBAC for CDE - Role-Based Access Control
description: Learn how Harness enhances developer experience with pre-configured cloud development environments.
sidebar_position: 10
sidebar_label: Access Control - RBAC
---

Harness CDE provides granular role-based access control (RBAC) for all CDE resources. RBAC allows you to control who can view, access, and modify resources across different scopes. By defining roles and resource groups, you can ensure that only authorized users can take actions on CDE resources, adding an extra layer of security and compliance.

This document introduces the core RBAC concepts for CDE and explains how to configure RBAC for CDE users. For a deeper overview of Harness RBAC, go to [Harness RBAC Configuration Guide](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/).

:::info
To assign roles, you must have **administrative privileges** at the Account level (i.e., **Account Admin** role).
:::

---

## Harness RBAC Components 
Harness CDEs utilize Platform Hierarchy and RBAC to provide fine-grained control over CDE resources. There are three [key components](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-components) for Harness RBAC:

* **Principals** – Entities that take action within the system. (e.g., users, user groups, etc.)
* **Resource Groups** – Define which objects can be acted upon (e.g., gitspaces, infrastructure providers).
* **Roles** – Define what actions can be taken on those objects (e.g., view, create, edit, delete).

### Principals: User Groups & Users
In Harness CDE, **principals** refer to entities that take action in the system — namely, **User Groups** and **Users**. You assign permissions and access to CDE resources via roles and resource groups applied to these principals.

Permissions define **what actions** a principal can take.
Access defines **which objects** they can act on.

To learn more about users, go to [Manage Users](https://developer.harness.io/docs/platform/role-based-access-control/add-users/). 
To learn more about user groups, go to [Manage User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/). 

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

---

## CDE Resources & Permissions
CDE resources can be managed and configured using granular RBAC. Each resource has its own specific set of permissions that can be assigned to roles. When roles are combined with resource groups, they define the access levels and permissions that users have within CDE.

CDE RBAC supports two resources:  
- **Gitspaces** - Created at the **Project** scope. 
- **Infrastructure Providers** - Configured at the **Account** scope. 

### Resources

| **Resource**   | **Permissions**                                                           | **Account Scope** | **Org Scope** | **Project Scope** | **Notes**                                                                                          |
| -------------- | ------------------------------------------------------------------------- | ----------------- | ------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| **Gitspaces**    | <ul><li>View</li><li>Create/Edit</li><li>Delete</li><li>Execute</li></ul>                 | ✅                 | ✅             | ✅                 | Created at **project scope**; managed across all scopes. |
| **Infrastructure Providers**  | <ul><li>View</li><li>Edit</li><li>Delete</li></ul> | ✅                 | ✅             | ✅                 | Configured at **account scope**; accessible across all scopes.                                  |

### Permission Details

| **Permission**   | **Description**                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| **View**         | Allow users read-only access to resources.                                |
| **Create/Edit**  | Allow users to configure, create or edit resources.                                  |
| **Delete**       | Allow users to delete resources.                                          |
| **Execute**      | Allow users to execute Gitspaces (use them).                                          |

---

## CDE Roles

Harness CDE provides **three built-in roles** specifically designed for CDE resources and use cases. These roles come preconfigured with certain permissions on CDE resources. Below is a detailed explanation of each role.

### CDE Admin

This role should be assigned to users who require **full control over CDE resources**. It is an admin role that grants administrative access to all CDE resources. The following permissions are included:

| **Resource**                 | **Permissions**                    |
| ---------------------------- | ---------------------------------- |
| **Gitspaces**                | View, Create/Edit, Delete, Execute |
| **Infrastructure Providers** | View, Edit, Delete                 |

### CDE Creator

This role should be assigned to users who need **create access** for **Gitspaces** only. It is a **Creator** role and applies exclusively to the **Gitspaces** resource. The following permissions are included:

| **Resource**  | **Permissions** |
| ------------- | --------------- |
| **Gitspaces** | Create          |

### CDE User

This role should be assigned to users who should not have **create access** to CDE resources. The following permissions are included:

| **Resource**                 | **Permissions**             |
| ---------------------------- | --------------------------- |
| **Gitspaces**                | View, Edit, Delete, Execute |
| **Infrastructure Providers** | View                        |

---

## RBAC Workflow

Follow these steps to configure RBAC in Harness CDE:

1. Go to your **administrative settings** and select the scope (**Account**, **Organization**, or **Project**) where you want to configure RBAC for CDE resources.
2. [Create custom roles with the required permissions](/docs/platform/role-based-access-control/add-manage-roles.md#create-a-role), or use the [default CDE roles](/docs/cloud-development-environments/rbac#cde-roles).
3. [Create resource groups](/docs/platform/role-based-access-control/add-resource-groups.md#create-a-resource-group) to define the CDE resources and scope for the principals.
4. [Create user groups](/docs/platform/role-based-access-control/add-user-groups.md#create-user-groups-manually) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users) to them.
5. Perform **role binding**: [Assign roles and resource groups](/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users or user groups.

### CDE RBAC Example

Here’s an example of configuring RBAC for CDE resources:

1. Create a **custom resource group**, select **Gitspaces** as the resource type, and choose the appropriate scope.
2. Create a **user group** and add all relevant users to it.
3. Assign the **CDE User** role to the user group, and bind it to the resource group created in step 1.

<DocVideo src="https://app.tango.us/app/embed/ce9eb490-c256-4dc8-8ff4-a35b3e97c3fc" title="CDE RBAC Example" />



---
