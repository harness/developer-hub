---
title: Harness Role-Based Access Control Quickstart
description: This document explains how to set up RBAC for Pipelines.
# sidebar_position: 2
helpdocs_topic_id: lrz2e4t1ko
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Role-Based Access Control (RBAC) helps you manage who has access to your Harness resources, what they can do with those resources, and in what scope they have access.

[Role Assignments](./1-rbac-in-harness.md#role-assignment) to Users, User Groups, and Service Accounts at a specific scope, determine their permissions.

This quickstart shows how to configure Role-Based Access Control (RBAC) for Pipeline Creation, Execution, and Connector Admin.

### Objectives

You will learn how to:

* Create custom Roles.
* Create custom Resource Groups.
* Set up role-based access control for Pipeline Owner.
* Set up role-based access control for Connector Admin.

### Before you begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md)
* For information on creating a Pipeline and adding a Stage, see [Add a Stage](../8_Pipelines/add-a-stage.md#step-1-create-a-pipeline).
* Make sure you have **Admin** rights for the Account/Org/Project where you want to configure Access Management.

### Prerequisites

* You must have **View**, **Manage**, and **Invite** permissions for **Users**.
* You must have **View** and **Manage** permissions for **User Groups**.
* You must have **View**, **Create/Edit**, and **Delete** permissions for **Resource Groups**.
* You must have **View**, **Create/Edit**, and **Delete** permissions for **Roles**.
* You must have created your Organizations and Projects. See [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

### RBAC Components

To manage access control in Harness, you must have the following components in place:

* **Principal**: can be a [User](./3-add-users.md), [User Group](./4-add-user-groups.md), or [Service Account](./6-add-and-manage-service-account.md).
* **Resource Group**: is a list of resources within a specific scope on which a Principal can perform actions. See [Add and Manage Resource Groups](./8-add-resource-groups.md).
* **Roles**: is a set of permissions that is assigned to a Principal for specific Resource Groups. See [Add and Manage Roles](./9-add-manage-roles.md).

Harness provides a set of built-in Resource Groups and Roles for you to easily manage access control. For more information, see [Role Assignments](./1-rbac-in-harness.md#role-assignment).

However, you can always create your own custom Resource Groups and Roles to manage access control as per your needs.

For example, you can give access to **Create** Pipelines within all the Projects under Org O1, but not **Delete** or **Execute** them.

Let us look at a few examples to create a few custom Resource Groups and Roles and set up RBAC accordingly.

### Set Up RBAC for Pipeline Owner

Let us set up access control for a custom Role called Pipeline Owner.

Following are the components required for this RBAC setup:

* **Principal**: a User Group named `Pipeline Owners`.
* **Resource Group**: a custom Resource Group named `All Pipeline Resources`.
* **Role**: a custom Role named `Pipeline Admin`.

The following table shows the Role Assignment for a Pipeline Owner:



|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Custom Role Name** | **Custom Resource Group Name** | **Resource Scope** | **Resources**  | **Permissions** |
| **Pipeline Admin** | **All Pipeline Resources** | **All (including all Organizations and Projects)** | <li> Pipelines</li><li> Secrets</li><li>Connectors</li><li>Delegates</li><li> Environments &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li><li>Templates</li><li>Variables</li>| <li> View, Create/Edit, Delete, Execute Pipelines</li><li>View, Create/Edit, Access Secrets</li><li>View, Create/Edit, Delete, Access Connectors</li><li>View, Create/Edit Delegates</li><li>View, Create/Edit, Access Environments</li><li>View, Create/Edit, Access Templates</li><li>View, Create/Edit Variables</li>|

#### Step 1: Create a User Group

1. In your Harness Account, click **Account Settings**.
2. Click **Access Control**.
3. In **User Groups,** click **New User** **Group**. The New User Group settings appear.
4. Enter a **Name** for your **User Group**. In this case, enter Pipeline Owners.
5. Enter **Description** and [**Tags**](../20_References/tags-reference.md) for your **User Group**.
6. Select Users under **Add Users**.
7. Click **Save.**

Your User Group is now listed under User Groups.

#### Step 2: Create a Custom Resource Group

1. In your Harness Account, click **Account Settings**.
2. Click **Access Control**.
3. In **Resource Groups**, click **New Resource** **Group**. The New Resource Group settings appear.
4. Enter a **Name** for your **Resource Group**. In this case, enter **All Pipeline Resources**.
5. Enter **Description** and **Tags** for your **Resource Group**.
6. Click **Save**.
7. In **Resource Scope**, select **All (including all Organizations and Projects)**. This would mean the Principal can access the specified resources within the Account as well as those within the Organizations and their Projects.![](./static/set-up-rbac-pipelines-41.png)
8. In Resources, select **Specified**.![](./static/set-up-rbac-pipelines-42.png)
9. Select the following resources:
	1. Environments
	2. Variables
	3. Templates
	4. Secrets
	5. Delegates
	6. Connectors
	7. Pipelines
10. Click **Save**.

#### Step 3: Create a Custom Role

1. In your Harness Account, click **Account Settings**.
2. Click **Access Control**.
3. In **Roles**, click **New Role**. The New Role settings appear.
4. Enter a **Name** for your **Role**. In this case, enter **Pipeline Admin.**
5. Enter optional **Description** and **Tags** for your **Role**.
6. Click **Save**.
7. Select the following permissions for the resources:
	1. View, Create/Edit, Delete, Execute Pipelines
	2. View, Create/Edit, Access Secrets
	3. View, Create/Edit, Delete, Access Connectors
	4. View, Create/Edit Delegates
	5. View, Create/Edit, Access Environments
	6. View, Create/Edit, Access Templates

#### Step 4: Assign Role Permission to the User Group

Let us now complete the [Role Assignment](./1-rbac-in-harness.md#role-assignment) for the User Group to complete the RBAC set up for Pipeline Owner.

1. In your Harness Account, click **Account Settings**.
2. Click **Access Control**.
3. In **User Groups,** locate the User Group you just created and click on **Role**.![](./static/set-up-rbac-pipelines-43.png)
The **Add Role** settings appear.
4. In **Assign Role Bindings**, click **Add**.
5. In **Role**, select the custom Role that you created.
6. In **Resource** **Group**, select the custom Resource Group you just created.![](./static/set-up-rbac-pipelines-44.png)
7. Click **Apply**.

### Next steps

* [Permissions Reference](ref-access-management/permissions-reference.md)

