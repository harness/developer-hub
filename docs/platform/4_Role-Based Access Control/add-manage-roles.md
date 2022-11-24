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

In this topic:

* [Before You Begin](/article/tsons9mu0v-add-manage-roles#before_you_begin)
* [Step: Add a New Role](/article/tsons9mu0v-add-manage-roles#step_add_a_new_role)
* [Step: Delete Role](/article/tsons9mu0v-add-manage-roles#step_delete_role)
* [Step: Manage Role](/article/tsons9mu0v-add-manage-roles#step_manage_role)
* [See Also](/article/tsons9mu0v-add-manage-roles#see_also)

### Before You Begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* [Access Management (RBAC) Overview](/article/vz5cq0nfg2-rbac-in-harness)
* Make sure you have Create/Edit/Delete Permissions for Roles.

The **Account Admin** Role has permissions for all the resources within the Account scope as well as its child scope (Organizations and Projects within this Account).

![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1643809958805/screenshot-2022-02-02-at-7-21-59-pm.png)### Step: Add a New Role

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization).

You can add a Role in Project/Organization/Account scope. To do this, go to Project SETUP, Organization, or Account Settings. This topic explains how to create a role in the Account scope.

Select your **Project/Org/****Account**, and click **Access Control**.

Click **Roles**.

Click **New Role**. The **New Role** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1620785497460/screenshot-2021-05-12-at-7-39-29-am.png)Enter a **Name** for your **Role**.

Enter optional **Description** and **Tags** for your **Role**.

Click **Save**.

### Step: Delete Role

Click the **Roles** tab under **Access** **Control**.

Click **Delete** in the top right corner to delete a specific role.

### Step: Manage Role

Click the **Roles** tab under **Access Control**.

Click on the role you want to edit. The **Update Role Permissions** page appears.

![](https://files.helpdocs.io/i5nl071jo5/articles/tsons9mu0v/1643810163897/screenshot-2022-02-02-at-7-23-29-pm.png)Add/Remove Resource-specific permissions from this page. Click **Apply Changes**.

### Harness Built-in Roles

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

* [Add and Manage Users](/article/hyoe7qcaz6-add-users)
* [Add and Manage User Groups](/article/dfwuvmy33m-add-user-groups)
* [Add and Manage Resource Groups](/article/yp4xj36xro-add-resource-groups)
* [Permissions Reference](/article/yaornnqh0z-permissions-reference)

