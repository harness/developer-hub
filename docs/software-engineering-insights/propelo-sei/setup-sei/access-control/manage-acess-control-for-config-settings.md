---
title: Configuration Settings
description: Guide on how to use RBAC to define access control on SEI Configuration Settings at the Account Level.
sidebar_position: 25
redirect_from:
  - /docs/software-engineering-insights/setup-sei/access-control/manage-acess-control-for-config-settings
---

# Manage access control for SEI Configuration Settings

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness Resources according to their role assignment.

This topic describes how to add and manage access control for SEI **Configuration Settings** available at the **Account Level**.

<details>
<summary>What is Configuration Settings in SEI?</summary>

Configuration Settings refers to all the SEI module resources that are available at the **Account Level**. For example: Integrations, Profiles, Contributors, Tables etc.

</details>

## Before You Begin

* [RBAC in SEI](/docs/software-engineering-insights/propelo-sei/setup-sei/access-control/sei-roles-and-permissions)
* [RBAC in Harnesss](/docs/platform/role-based-access-control/add-manage-roles)

## SEI Configuration Settings Roles and Permissions

To define the permission and access control for the **SEI Configuration Settings** only `SEI ADMIN` is supported. This allows the user to add, edit, and delete any account-level resource with the capability to add edit Insights at the project level.

| Role | Scope | Permission |
| - | - | - |
| SEI Admin | Account | <ul><li>Add Resource</li> <li>Edit Resource</li> <li>Delete Resource</li></ul> (Only Account Level Resources)|

It is important to note that the permissions mentioned in the table above are entirely dependent on the resource group that is mapped to the role. Therefore, it is crucial to define the role binding accurately between the role and the associated resource group for the user to ensure that the permissions are correctly applied.

## Add and Manage Access Control for Resource Groups

In this section, we will walk through the process of defining and managing access controls for resource groups for defining access control for **Configuration Settings (Account Level SEI Resources)** within an Account.

In this section, we cover how you can use the existing [built-in resource group](/docs/software-engineering-insights/propelo-sei/setup-sei/access-control/sei-roles-and-permissions#built-in-resource-groups) or [create a new resource group](/docs/platform/role-based-access-control/add-resource-groups) for managing access to Configuration Settings on Harness SEI.

At the **Account Level**, there are two built-in resource groups available:

* **All Resources Including Child Scopes:** This group defines permissions for all resources within the account's scope, including those within the scope of orgs and projects under the account.
* **All Account Level Resources:** This group only defines permissions for the resources in the account's scope.

![](./static/account-level-default-rg.png)

Now since we want to setup the access control for **Configuration Settings**, which is a Account-Level entity, we will use the **All Account Level Resources** resource group in the **Role Binding** to that user.

For more information on adding and managing resource groups, go to [Manage Resource Groups](/docs/platform/role-based-access-control/add-resource-groups).

Perform the following steps to **create a new Resource Group** to define access to **Configuration Settings**.

1. In **Harness**, click **Account Settings**, and then click **Access Control**.
2. In **Resource Groups**, click on the **+New Resource Group**. For more information on adding and managing resource groups, see [Manage Resource Groups](/docs/platform/role-based-access-control/add-resource-groups).
3. Choose the scope of the resource group: 
   1. **Account Only:** Applies permissions across the accoount. This is the only scope which supports defining permissions for Configuration Settings as they are a **Account Level** resource entity.
   2. **All (including all Organizations and Projects):** Configuration Settings access is unavailable when selecting this scope as they are a **Account Level** resource entity.
   3. **Specified Organizations (and their Projects):** Configuration Settings access is unavailable when selecting this scope as they are a **Account Level** resource entity.
4. Under the settings for the SEI module’s shared resources, select **Configuration Settings**.
5. Click **Apply Changes**.

:::info
Note that while creating a custom resource group ensure that you have added the required **Administrative Functions** permissions to enable the user to access and operate over the respective entities. For example: In this scenario, the resource group must have permissions for `account`, `projects` etc.
:::

## Add and Manage Access Control for Users​

Perform the following steps to define access to **Configuration Settings** for different users.

1. In **Harness**, click **Access Control**.
2. In **User**, in **New User**, add or select the **User** for which you want to add or modify the access control. For more information on adding and managing resource groups, see [Manage users](/docs/platform/role-based-access-control/add-users).
3. In **Assign Roles**, select the **Role** from the drop-down list. To define access control for Configuration Settings you can only select the `SEI ADMIN` role as the other two roles does not have the permissions to access **Configuration Settings**.
4. In **Resource Groups**, select the resource group for which you want to add or modify the access control.
5. Click **Save**.

## Use cases

### Add User with Configuration Settings Access at the Account Level

In this scenario, we will configure a user with complete access to the **Configuration Settings**.

#### Step 1: Selecting the Resource Group

In this scenario, we will use the default built-in resource group **All Account Level Resources**. This resource group includes all resources within the account's scope.

To view all the permissions associated with the Resource Group:

1. In **Harness**, click **Account Settings**, and then click **Access Control**.
2. In **Resource Groups**, click on the **All Account Level Resources** Resource Group. The permissions will be displayed. For more information on adding and managing resource groups, see [Manage Resource Groups](/docs/platform/role-based-access-control/add-resource-groups).

#### Step 2: Add the role-binding to the required user

1. In **Harness**, click **Access Control**.
2. In **User**, in **New User**, add or select the **User** for which you want to add or modify the access control. For more information on adding and managing users, see [Manage users](/docs/platform/role-based-access-control/add-user-groups).
3. In **Assign Roles**, select the `SEI ADMIN` role from the dropdown.
4. In **Resource Groups**, select the **All Account Level Resources** resource group to define the access control.
5. Click **Save**.

After adding a user to an account, the **Account Viewer - All Account Level Resources** resource group is automatically included in the user's role binding, along with the additional **Role Bindings** that have been configured. 

This will enable the user to view all account-level resources and seamlessly access the application.