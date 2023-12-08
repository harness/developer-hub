---
title: Access control
description: Learn how to add and manage access control for Service Reliability Management.
sidebar_position: 100
---

# SRM roles and permissions

Harness employs Role-Based Access Control (RBAC) to manage user and group access to Harness resources based on their roles. RBAC enhances security and operational efficiency.

The Harness Platform has a three-level hierarchical structure. The three levels, or scopes, are Account, Organization (Org), and Project. An Account contains Organizations and Projects. An Organization contains Projects.

To learn more about access control in Harness, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

This section describes the permissions available for Service Reliability Management (SRM).


## SRM specific permissions

You can assign the following SRM specific permissions to roles in Harness:   

- View SLO
- Create/edit SLO
- Delete SLO
- View monitored services
- Create/edit monitored services
- Delete monitored services
- Toggle monitored services
- View downtime
- Create/edit downtime
- Delete downtime


## Harness Platform roles and SRM permissions

The following default Harness Platform roles come with specific SRM permissions:


### Account Admin role

The **Account Admin** role includes the following SRM specific permissions:

- View SLO
- Create/edit SLO
- Delete SLO
- View monitored services
- Create/edit monitored services
- Delete monitored services
- Toggle monitored services
- View downtime
- Create/edit downtime
- Delete downtime


### Account Viewer role

The **Account Viewer** role includes the following SRM specific permissions:

- View SLO
- View monitored services
- View downtime


### Org Admin role

The **Org Admin** role includes the following SRM specific permissions:

- View SLO
- Create/edit SLO
- Delete SLO
- View monitored services
- Create/edit monitored services
- Delete monitored services
- Toggle monitored services
- View downtime
- Create/edit downtime
- Delete downtime


### Org Viewer role

The **Org Viewer** role includes the following SRM specific permissions:

- View SLO
- View monitored services
- View downtime


### Project Admin role

The **Project Admin** role includes the following SRM specific permissions:

- View SLO
- Create/edit SLO
- Delete SLO
- View monitored services
- Create/edit monitored services
- Delete monitored services
- Toggle monitored services
- View downtime
- Create/edit downtime
- Delete downtime


### Project Viewer role

The **Project Viewer** role includes the following SRM specific permissions:

- View SLO
- View monitored services
- View downtime


## See also

The following topics can help you understand how to implement access control in Harness:

- [Manage users](/docs/platform/role-based-access-control/add-users)
- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups)
- [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups)
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles)
