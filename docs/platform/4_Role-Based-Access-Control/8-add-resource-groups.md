---
title: Add and Manage Resource Groups
description: This document shows steps to create and manage resource groups and assign them to user groups.
# sidebar_position: 2
helpdocs_topic_id: yp4xj36xro
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

A Resource Group is a set of Harness resources that the permission applies to. Permissions given to a user or user group as part of a Role, apply to the set of resources that are part of the Resource Group.

This topic will explain the steps to create and manage Resource Groups within Harness System.

### Before you begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* Make sure you have **Create/Edit/Delete** Permissions for Resource Groups.

### Visual Summary

Here is a quick overview of Resource Groups at various scopes:

* **Account Only** - To include all the resources within the scope of the Account. This does not include resources within the scope of Org or Project.
* **All (including all Organizations and Projects)** - To include all the resources within the scope of the Account, as well as those within the scope of the Orgs and Projects in this Account.
* **Specified Organizations (and their Projects)** - To include all the resources within the scope of specific Organizations and their Projects.

![](./static/add-resource-groups-32.png)
### Review: Resource Groups and Scopes

A Resource Group can contain any of the following:

* All or selected resources from the list of resources in the Resource Group's scope - For example, a Resource Group RG1 created within Account Acc1 can contain all or selected resources created within the same Account Acc1.
* All or selected resources in the scope in which it is defined. For example, all Account level resources, all Account Level Secret Managers, all Connectors in Org A.
* All or specific resources for the entire account - For example, a Resource Group RG1 within Account Acc1 can contain all or selected resources created within Acc1, Organizations within Acc1, Projects within Organizations in Acc1.![](./static/add-resource-groups-33.png)

Harness includes the following built-in Resource Groups at the Account, Org, and Project scope:



|  |  |  |
| --- | --- | --- |
| Scope | Resource Group | Description |
| Account | **All Resources Including Child Scopes** | Includes all the resources within the scope of the Account, as well as those within the scope of the Orgs and Projects in this Account. |
| Account | **All Account Level Resources** | Includes all the resources within the scope of the Account. This does not include resources within the scope of Org or Project. |
| Org | **All Resources Including Child Scopes** | Includes all the resources within the scope of the Org, as well as those within the scope of all the Projects created within this Org. |
| Org | **All Organization Level Resources** | Includes all the resources within the scope of the Org. This does not include resources within the scope of Projects. |
| Project | **All Project Level Resources** | Includes all the resources within the scope of the Project. |

### Step 1: Add a New Resource Group

Select your **Project/Org/Account**, and click **Access Control**.

Click **Resource Groups** and then click **New Resource Group**. The New Resource Group settings appear.

Enter a **Name** for your **Resource Group**.

Enter **Description** and **Tags** for your **Resource Group**.

![](./static/add-resource-groups-34.png)
Click **Save**.

### Step 2: Select a Resource Scope

You must select the scope of the resources that must be included in your new Resource Group after it has been saved.

![](./static/add-resource-groups-35.png)
You can select one of the following in Resource Group:

* **Account Only**
* **All (including all Organizations and Projects)**
* **Specified Organizations (and their Projects)**![](./static/add-resource-groups-36.png)
For each Organization you select, you can further select **All** or **Specified** Projects within this Organization to include the resources accordingly.![](./static/add-resource-groups-37.png)

Click **Apply**.

### Step 3: Select Resources

After you have selected Resource Scope, you must select the resources that you want to include in this Resource group.

You can either Select **All** or **Specified** resources.

![](./static/add-resource-groups-38.png)
Click **Save**.

Go back to Resource Groups. Your Resource Group is now listed here.

![](./static/add-resource-groups-39.png)
### Step: Delete A Resource Group

Click the **Resource Groups** tab under **Access Control.**

Click **Delete** on the top right corner to remove a Resource Group.

![](./static/add-resource-groups-40.png)
### Step: Manage Resource Group

Click the **Resource Groups** tab under **Access Control.**

Click the Resource Group you want to edit. The Resource Group details page appears.

You can add/remove resources from this page.

Click **Apply Changes**.

### Next steps

* [Add and Manage Users](./3-add-users.md)
* [Add and Manage User Groups](./4-add-user-groups.md)
* [Add and Manage Roles](./9-add-manage-roles.md)
* [Permissions Reference](./ref-access-management/permissions-reference.md)

