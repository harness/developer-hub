---
title: Add and Manage Roles
description: This document shows steps to create new Roles and assign permissions to them.
# sidebar_position: 2
helpdocs_topic_id: tsons9mu0v
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Roles are a group of permissions you can assign to a Harness User Group. These permissions determine what operations a User Group can perform on a specific Harness Resource.

This topic will explain the steps to create and manage Roles within Harness.

### Before you begin

* Make sure you have Create/Edit/Delete Permissions for Roles.

The **Account Admin** Role has permissions for all the resources within the Account scope as well as its child scope (Organizations and Projects within this Account).

![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1643809958805/screenshot-2022-02-02-at-7-21-59-pm.png)

### Step: Add a new role

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

You can add a Role in Project/Organization/Account scope. To do this, go to Project SETUP, Organization, or Account Settings. This topic explains how to create a role in the Account scope.

Select your **Project/Org/****Account**, and click **Access Control**.

Click **Roles**.

Click **New Role**. The **New Role** settings appear.

<!-- ![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1620785497460/screenshot-2021-05-12-at-7-39-29-am.png)Enter a **Name** for your **Role**. -->
<img src="https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1620785497460/screenshot-2021-05-12-at-7-39-29-am.png" width="50%" height ="50%"></img>

Enter a **Name** for your **Role**.

Enter optional **Description** and **Tags** for your **Role**.

Click **Save**.

### Step: Delete role

Click the **Roles** tab under **Access** **Control**.

Click **Delete** in the top right corner to delete a specific role.

### Step: Manage role

Click the **Roles** tab under **Access Control**.

Click on the role you want to edit. The **Update Role Permissions** page appears.

![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1643810163897/screenshot-2022-02-02-at-7-23-29-pm.png)

Add/Remove Resource-specific permissions from this page. Click **Apply Changes**.

### Harness built-in roles

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

### See Also

* [Add and Manage Users](../4_Role-Based-Access-Control/2-add-users.md)
* [Add and Manage User Groups](../4_Role-Based-Access-Control/3-add-user-groups.md)
* [Add and Manage Resource Groups](../4_Role-Based-Access-Control/6-add-resource-groups.md)
* [Permissions Reference](../4_Role-Based-Access-Control/ref-access-management/permissions-reference.md)

