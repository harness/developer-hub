---
title: Manage Access Control
description: This topic describes how to add and manage access control for Feature Flags.
tags: 
   - helpDocs
   - Access Control
   - feature flag
# sidebar_position: 2
helpdocs_topic_id: g8ajhy6msi
helpdocs_category_id: u0gbfyk4p4
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness resources according to the user's role. By using RBAC, you can increase security and improve efficiency.

This topic describes the roles available for Feature Flags. For more information about RBAC works with Harness, go to [Access Management (RBAC) Overview](../../../platform/4_Role-Based-Access-Control/1-rbac-in-harness.md) and for steps to implement Access Control, go to [Add and Manage Users](../../../platform/4_Role-Based-Access-Control/3-add-users.md).

## Feature Flags roles and permissions

The **Feature Flag Manage Role** default Role is available specifically for Feature Flags. On a project of Environment level, this role can:

* Create Flags
* View Flags
* Edit Flags
* View Target Groups
* Edit Target Groups
* View Environments and redacted SDK keys 

If you have permissions at the Project level, you can edit Flags within that Project or its Environments. If you have permissions for the Environment, then the role is limited to that Environment only.  

## See also

The following topics can help you understand how to implement Access Control:

* [Add and Manage Users](../../../platform/4_Role-Based-Access-Control/3-add-users.md)
* [Add and Manage User Groups](../../../platform/4_Role-Based-Access-Control/4-add-user-groups.md)
* [Add and Manage Resource Groups](../../../platform/4_Role-Based-Access-Control/8-add-resource-groups.md)
* [Add and Manage Roles](../../../platform/4_Role-Based-Access-Control/9-add-manage-roles.md)

