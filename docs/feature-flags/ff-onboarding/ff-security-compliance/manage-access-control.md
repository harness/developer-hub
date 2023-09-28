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
---

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness resources according to the user's role. By using RBAC, you can increase security and improve efficiency.

This topic describes the roles available for Feature Flags. For more information about how RBAC works in Harness and instructions for implementing access control, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

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

* [Manage users](/docs/platform/role-based-access-control/add-users)
* [Manage User Groups](/docs/platform/role-based-access-control/add-user-groups)
* [Manage Resource Groups](../../../platform/role-based-access-control/add-resource-groups)
* [Manage Roles](../../../platform/role-based-access-control/add-manage-roles)

