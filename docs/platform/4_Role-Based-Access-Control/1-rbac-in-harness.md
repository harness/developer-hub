---
title: Harness Role-Based Access Control Overview
description: This topic explains the concept of Harness Role-Based Access Control.
# sidebar_position: 2
helpdocs_topic_id: vz5cq0nfg2
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Access management for resources is a critical function for your Accounts, Organizations, and Projects. Harness Role-Based Access Control (RBAC) helps you manage who has access to your Harness resources, what they can do with those resources, and in what scope they have access.

### What is Harness Role-Based Access Control?

Harness RBAC is role-based. This means the permissions to resources are determined by the roles assigned to Users, User Groups, and Service Accounts.

For example, certain users may have permission to execute pipelines, whereas other users may have permission to view the pipelines but not execute them.

Harness RBAC is an authorization system that provides fine-grained access management of Harness resources.

### Visual Summary

Here is a quick overview of Harness RBAC:

* The Account Administrator invites Users to the Account.
* The Account Administrator creates User Groups.
* The Account Administrator creates Service Accounts.
* Role Assignments happen on individual Users, User Groups, or Service Accounts.
* Each User can be a member of multiple user groups and hence can have multiple role assignments.
* Each User Group and Service Account can have multiple role assignments.
* You can assign roles at any [scope](#rbac-scope).![](./static/rbac-in-harness-00.png)

### Harness RBAC Components

* **Users:** These are individual users within the Harness system. One User can belong to many user groups.  
For more information on creating a new User, see [Add and Manage Users](../4_Role-Based-Access-Control/3-add-users.md).
* **User Groups:** User Groups contain multiple Harness Users. Each User Group has assigned roles. You can create User Groups at Account/Org/Project scope.  
For more information on creating a new User Group, see [Add and Manage User Groups](../4_Role-Based-Access-Control/4-add-user-groups.md).
* **Service Account:** A Service Account is a set of [API Keys](../4_Role-Based-Access-Control/7-add-and-manage-api-keys.md) with a set of permissions assigned to them via role assignment. API Keys are used for authenticating and authorizing remote services attempting to perform operations in Harness via our APIs. API Keys that are part of a Service Account are assigned permissions (equivalent to users) that Service Accounts inherit.  
For more information on creating a new Service Account, see [Add and Manage Service Accounts.](../4_Role-Based-Access-Control/6-add-and-manage-service-account.md)
* **Resource Groups:** A [Resource Group](#resource-group) is a set of Harness resources that a User or User Group can access. You can create Resource Groups at Account/Org/Project scope.  
For more information on creating a new Resource Group, see [Add and Manage Resource Groups](../4_Role-Based-Access-Control/8-add-resource-groups.md).
* **Roles:** A [Role](#role) is a group of permissions you assign to a User Group. You can create roles at Account/Org/Project scope.  
For more information on creating a new Role, see [Add and Manage Roles](../4_Role-Based-Access-Control/9-add-manage-roles.md).
* **Principal:** A principal can be a **User**, **User Group,** or **Service Account** to which you provide access. [Role assignments](#role-assignment) are done on any of these principals, also known as **Subjects**.![](./static/rbac-in-harness-01.png)

### What Can You do with RBAC?

Here are a few examples of what RBAC can be used for:

* Allow Users, User Groups, or Service Accounts to manage and access the resources through the Account/Org/Project Admin role.
* Allow Users, User Groups, or Service Accounts to view the resources through the Account/Org/Project Viewer role.
* Allow Users, User Groups, or Service Accounts to manage and access specific resources through Custom Roles.

### How Does RBAC Work?

The way you control access to resources using RBAC is to assign permissions to users and groups to manage resources.

* Permissions that you want to assign to a User or User Group or a Service Account are grouped together in a Role.
* Resources that you want to control access to are grouped together in a Resource Group.
* An account administrator assigns a Role and Resource Group to a Principal - User or User Group or Service Account. This assignment is called [Role Assignment](#role-assignment).
* Role Assignment grants the Principal the permissions from the Role on the set of resources in the Resource Group.

### RBAC Scope

Harness Accounts allow you to group Organizations and Projects that share the same goal. These have their own scope of access.

In Harness, you can specify scopes at three levels:

* Account
* Organization
* Project

Scopes are structured in a parent-child relationship. You can assign roles at any of these levels of scope.

![](./static/rbac-in-harness-02.png)
The following table shows what it means to add users and resources at different scopes or hierarchies:



|  |  |  |
| --- | --- | --- |
| **Scope** | **When to add users?** | **When to add resources?** |
| **Account** | To manage administrative functions or have total access and authority over the whole hierarchy, add them to the Account scope. | Add resources to the Account scope to allow sharing across the entire hierarchy. |
| **Organization** | To have visibility and control over all of the projects within this Org, add users to the Org scope. | Add resources to the Org scope to allow sharing across projects within this Org while isolating from other organizations. |
| **Project** | To manage or contribute to this Project, add users to the Project scope. | Add resources to the Project scope to provide total control to the Project teams. |

To know more about Organizations and Projects, see [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

### Resource Group

A Resource Group is a collection of resources that are all managed by the same set of users and have the same access control policies.

Resource Groups can be of two types:

* **All Resources**– Collection of all the resources of a given type.
* **Named Resources**– Collection of a specific set of individual resources.

![](./static/rbac-in-harness-03.png)
Harness includes the following default Resource Groups at each scope:



|  |  |  |
| --- | --- | --- |
| **Scope** | **Resource Group** | **Description** |
| **Account** | **All Resources Including Child Scopes** | Includes all resources within the Account's scope, as well as those within the scope of the Orgs and Projects within the Account. |
| **Account** | **All Account Level Resources** | Includes all resources within the Account's scope. Excludes resources that are within the scope of an Org or Project. |
| **Org** | **All Resources Including Child Scopes** | Includes all the resources within the Org's scope, as well as those within the scope of all Projects within the Org. |
| **Org** | **All Organization Level Resources** | Include all resources within the Org's scope. Excludes resources that are within the scope of a Project. |
| **Project** | **All Project Level Resources** | Includes all resources within the scope of a Project. |

You can also create custom resource groups within any scope.

For more information, see [Add and Manage Resource Groups](../4_Role-Based-Access-Control/8-add-resource-groups.md).

### Role

A Role is a set of permissions that allow or deny specific operations on a specific set of resources. A Role defines access to resources within a single scope — Project/Org/Account.

Harness provides the following default roles at the Account, Org, and Project scope:



|  |  |
| --- | --- |
| **Scope** | **Role** |
| **Account** | Account Admin |
| **Account** | Account Viewer |
| **Account** | Feature Flag Manage Role |
| **Org** | Organization Admin |
| **Org** | Organization Viewer |
| **Org** | Feature Flag Manage Role |
| **Project** | Project Admin |
| **Project** | Project Viewer |
| **Project** | Pipeline Executor |
| **Project** | Feature Flag Manage Role |

For more information, see [Add and Manage Roles](../4_Role-Based-Access-Control/9-add-manage-roles.md).

### Role Assignment

A role assignment consists of the following elements:

* Principal
* Role
* Resource Group
* Scope

Following are a few key points for role assignment in Harness:

* Role Assignment is nothing but assigning a Role and a Resource Group to a Principal.
* The Principal gets access to resources through Role Assignment.
* The Principal on which role assignment is done can be an individual User, User Group, or Service Account.
* Each Principal can have multiple role assignments.
* Depending on where you wish to set up access control, you may assign roles at the Account, Org, or Project scope.

![](./static/rbac-in-harness-04.png)
The following list explains the different role assignments with the default roles and resource groups:



|  |  |
| --- | --- |
| **Role Assignment (Default Role + Default Resource Group)** | **Description** |
| **Account Admin +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* All permissions on all the resources in the Account scope as well as Organizations and Project scopes within the entire Account.
 |
| **Account Admin +** **All Account Level Resources** | A User Group with this role assignment has the following permissions:* All permissions on all the resources in the Account scope only.
 |
| **Account Viewer +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* View permissions on all the resources in the Account as well as Organizations and Projects scopes within the entire Account.
 |
| **Account Viewer +** **All Account Level Resources** | A User Group with this role assignment has the following permissions:* View permissions on all the resources in the Account scope only.
 |
| **Feature Flag Manage Role +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* Create/Edit permissions on Feature Flags and Target Management in the Account as well as Organizations and Projects scopes within the entire Account.
 |
| **Feature Flag Manage Role +** **All Account Level Resources** | A User Group with this role assignment has the following permissions:* Create/Edit permissions on Feature Flags and Target Management in the Account scope only.
 |
| **Organization Admin +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* All permissions on all the resources in the Organization as well as Projects within the Organization.
 |
| **Organization Admin + All Organization Level Resources** | A User Group with this role assignment has the following permissions:* All permissions on all the resources in the Organization scope only.
 |
| **Organization Viewer +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* View permissions on all the resources in the Organization as well as Projects within the Organization.
 |
| **Organization Viewer + All Organization Level Resources** | A User Group with this role assignment has the following permissions:* View permissions on all the resources in the Organization scope only.
 |
| **Feature Flag Manage Role +** **All Resources Including Child Scopes** | A User Group with this role assignment has the following permissions:* Create/Edit permissions on Feature Flags and Target Management in the Organizations, and Projects within the entire Organization.
 |
| **Feature Flag Manage Role + All Organization Level Resources** | A User Group with this role assignment has the following permissions:* Create/Edit permissions for Feature Flags and Target Management in the Organization scope only.
 |
| **Project Admin + All Project Level Resources** | A User Group with this role assignment has the following permissions:* All permissions on all the resources within the Project scope.
 |
| **Project Viewer + All Project Level Resources** | A User Group with this role assignment has the following permissions:* View permissions on all the resources in the Project.
 |
| **Feature Flag Manage + All Project Level Resources** | A User Group with this role assignment has the following permissions:* Create/Edit permissions for Feature Flags and Target Management within the Project scope.
 |
| **Pipeline Executor + All Project Level Resources** | A User Group with this role assignment has the following permissions:* View permission on Resource Group, Project, Users, User Groups, and Roles
* View and Access permissions on Secrets, Connectors, Environments, Services
* View and Execute permissions on Pipelines
 |

### Permissions

When a Harness User is a member of multiple User Groups, the sum of all the role assignments determines the effective permissions for the user.

For example, let us consider a user with the following role assignments:

* **Account Admin** role for **All Resources Including Child Scopes**.
* **Organization Viewer** role for **All Resources Including Child Scopes**.

The sum of these role assignments is effectively the **Account Admin** role for **All Resources Including Child Scopes.** Therefore, in this case, the **Organization Viewer** role for **All Resources Including Child Scopes** has no impact.

By default, users will have **View** permissions for all resources at all scopes (Account/Org/Project).

### Blog Post

The following blog post walks you through User and Role Management in Harness:

[User and Role Management in the Harness Software Delivery Platform](https://harness.io/blog/continuous-delivery/user-role-management/)

### Next steps

* [Get Started with RBAC](https://docs.harness.io/article/e1ww0jmacp-getting-started-with-rbac)
* [Add and Manage Users](../4_Role-Based-Access-Control/3-add-users.md)
* [Add and Manage User Groups](../4_Role-Based-Access-Control/4-add-user-groups.md)
* [Add and Manage Service Accounts](../4_Role-Based-Access-Control/6-add-and-manage-service-account.md)
* [Add and Manage Resource Groups](../4_Role-Based-Access-Control/8-add-resource-groups.md)
* [Add and Manage Roles](../4_Role-Based-Access-Control/9-add-manage-roles.md)
* [Attribute-Based Access Control](../4_Role-Based-Access-Control/2-attribute-based-access-control.md)
* [Permissions Reference](../4_Role-Based-Access-Control/ref-access-management/permissions-reference.md)

