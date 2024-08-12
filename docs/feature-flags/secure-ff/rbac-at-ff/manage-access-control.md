---
title: Manage access control
description: This topic describes how to add and manage access control for Feature Flags.
tags: 
   - Access Control
   - feature flag
sidebar_position: 10
helpdocs_topic_id: g8ajhy6msi
helpdocs_category_id: u0gbfyk4p4
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-onboarding/ff-security-compliance/manage-access-control
  - /docs/article/3zj5zq5z5m-feature-flags
  - /docs/feature-flags/ff-security-compliance/manage-access-control
---

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness resources according to the user's role. By using RBAC, you can increase security and improve efficiency.

This topic describes the roles available for Feature Flags. For more information about how RBAC works in Harness and instructions for implementing access control, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

## Creating and Managing Roles

The **Feature Flag Admin Role** is a default Role available specifically for Feature Flags. The administrator roles gives you the ability to grant and revoke  permissions at an environment level. This includes:

* Creating, editing and deleting **Resources Groups**,
* Creating and editing **Default Settings**,
* Editing and deleting **Projects**,
* Managing **User Groups**,
* Creating, editing, managing and deleting **Service Accounts**,
* Creating, editing and deleting **Roles**, and
* Managing and inviting **Users**.


 ![The Access Control Panel for the Feature Flag Admin Role](../ff-security-compliance/static/ff-admin-role-access-control.png)


If you have permissions at the Project level, you can edit Flags within that Project or its Environments. If you have permissions for the Environment, then the role is limited to that Environment only.  

## Creating and Managing Permissions

You can create a role or manage permissions for **Resource Groups**, **Default Settings**, **Projects**, **User Groups**, **Service Accounts**, **Roles** and **Users**. 

Here's a guide to creating a role or managing permissions for the Feature Flags and for Target Management at the account level:

 1. Navigate to **Project Settings**. 
 2. Scroll down, or select  **Access Control** along the menu and select **Roles** within your Harness
 Account.
 3. From here, you can add a new role or select an existing one to modify.
 4. Within the role, select **Feature Flags**. This action will display the Feature flags and Target Management permissions. 

 ![The Panel for the Feature Flag Role Permissions](../ff-security-compliance/static/ff-feature-flag-role-permissions.png)

Feature flags is governed by the following permissions:

 * **Create**: Enables users to create new feature flags.
 * **Edit Config**: Enables users to edit existing configs.
 * **Edit Rules**: Enables users to edit rules.
 * **Toggle**: Enables users to toggle the feature flags on or off.
 * **Delete**: Allows users to delete any targets.

Target Management is governed by the following permissions:

 * **Create/Edit**: Enables users to create new targets and edit existing ones.
 * **Delete**: Allows users to delete any targets.

For the Organization level, open the same account settings and proceed to **Organizations**. Choose your organization and under **Organization Level Access Control** and **Audit Trail**, select **Access Control**. Here, configure the roles and permissions at the organization level in a manner similar to the account level process.

To set roles and permissions at the Project level, navigate to the **Project** section from the module navigation bar, and select **Access Control**. Follow similar steps as above to establish the roles and permissions for the project level.

## Creating and Managing Resource Groups

Here's how you can create and manage resource groups for the Feature flags and Target Management at the account level. Additionally, you can refer to [Manage Resource Groups](/docs/platform/role-based-access-control/add-resource-groups.md) document to learn more.

 ![The Feature Flag Permissions for Resource Groups](../ff-security-compliance/static/ff-resource-groups-permissions.png)

 1. Navigate to **Account Settings > Access Control > Resource groups** within your Harness Account.
 2. Add a new resource group or select an existing one to modify.
 3. Set the "Resource Scope" accordingly if you are creating one.
 4. Within the Resources, select **Feature Flags**, **Proxy Keys**, or both if that's what you require.

## Managing Feature Flags by Tags

Harness allows you to manage Feature Flags more granularly by using tags. By assigning specific tags to users within a Resource Group, you can control which Feature Flags they can interact with. This functionality enhances security and ensures users only have access to relevant Feature Flags.

If a user has the resource group ‘Feature Flag by tag’ assigned, the following rules apply:

 - **Toggle Permissions**: Users will not be able to toggle flags that have no tags.
 - **Edit Config Permissions**: Users will not be able to edit the configuration of flags with no tags.
 - **Tag-Specific Config Permissions**: Users will only be able to edit the configuration of flags that have the tag(s) defined in their resource group.

:::info
If you'd like to learn more about the Tagging Feature, you can head over to the Harness [Tagging Management on Feature Flags](/docs/feature-flags/use-ff/ff-creating-flag/tag_management.md) here.
:::

By following these steps, you can ensure that users are only able to interact with the Feature Flags that have the specific tags assigned to their resource groups, providing a finer level of access control.

## See also

The following topics can help you understand how to implement Access Control:

* [Create, Edit And Delete A Feature Flag](../../use-ff/ff-creating-flag/edit-and-delete-a-feature-flag.md)
* [Roles and Permissions in Feature Flags](../ff-security-compliance/roles-and-permissions.md)
* [Manage users](/docs/platform/role-based-access-control/add-users)
* [Manage User Groups](/docs/platform/role-based-access-control/add-user-groups)
* [Manage Resource Groups](/docs/platform/role-based-access-control/add-resource-groups.md)
* [Manage Roles](/docs/platform/role-based-access-control/add-manage-roles.md)
* [Tagging Management on Feature Flags](/docs/feature-flags/use-ff/ff-creating-flag/tag_management.md)
