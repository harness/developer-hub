---
title: Access control
description: Learn how to add and manage access control for Continuous Error Tracking.
sidebar_position: 8
---

# CET roles and permissions

Harness employs Role-Based Access Control (RBAC) to manage user and group access to Harness resources based on their roles. RBAC enhances security and operational efficiency.

This section describes the roles available for Continuous Error Tracking (CET). For details on implementing access control in Harness, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).


## CET specific role

The **CET Admin** default role is available specifically for CET at the Account, Organization (Org), and Project levels. The **CET Admin** role includes the following permissions:

- View tokens
- Create/edit tokens
- Revoke tokens
- View critical events
- Create/edit critical events
- Delete critical events
- View Agents


## Harness Platform roles and CET permissions

The following default Harness Platform roles come with specific CET permissions:


### Account Admin role

The **Account Admin** role includes the following CET specific permissions:

- View tokens
- Create/edit tokens
- Revoke tokens 
- View critical events 
- Create/edit critical events
- Delete critical events  
- View Agents


### Account Viewer role

The **Account Viewer** role includes the following CET specific permissions:

- View tokens
- View critical events 
- View Agents


## See also

The following topics can help you understand how to implement access control in Harness:

- [Manage users](/docs/platform/role-based-access-control/add-users)
- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups)
- [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups)
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles)