---
title: RBAC
description: Guide on how to use RBAC on SEI features and resources.
sidebar_position: 4
---

# SEI Roles and Permissions

Harness SEI has three built-in user roles:

* SEI Admin
* SEI Collection Admin
* SEI Viewer

These roles replace the user roles that existed in Propelo (Admin, Org Manager/Admin, Auditor, Limited User, Restricted User, Assigned Issue User, and Public Dashboard User). In the Harness Platform, use Harness RBAC for access control. For example, you can add user groups or add user roles according to your custom access needs.

## SEI Admin

This role has the highest level of access and is responsible for administrative functions within the SEI module. This role exists at the account level and has CRUD level permissions to all SEI resources (For ex: Configuration settings, Insights, and Collections) and entities.

## SEI Collection Admin

This role allows the user to manage and view all collections or specific collections as defined by the admin. This role does not have access to administrative functions. It operates at the project level, managing collections within specific projects.

## SEI Viewer

This role has read-only access and is meant for users who need to view SEI resources but do not require administrative or management capabilities. Users with this role have viewing access to SEI insights within projects.

Users can be granted these roles individually or as part of user groups.

# Permissions

The following table describes the Permissions enabled in the default Harness Roles, including the three SEI default Roles.


| Resources | SEI Admin | SEI Collection Admin | SEI Viewer | Account Admin | Account Viewer |
| - | - | - | - | - | - |
| Projects | CRUD | View | No access | CRUD | View |
| Collections | CRUD | View/Update | No access | CRUD | View |
| Connector Mapping | CRUD | No access | View | CRUD | View |
| Insights | CRUD | View | View | CRUD | View |
| Integrations | CRUD | No access | No access | CRUD | View |
| Contributors | CRUD | No access | No access | CRUD | View |
| Profiles | CRUD | No access | No access | CRUD | View |
| Tables and Propels | CRUD | No access | No access | CRUD | View |
| Customize | Manage/Update | No access | No access |  CRUD | View |
| Activity Logs | View | No access | No access |  CRUD | View |
| API Keys | Create/Update/Delete | No access | No access |  CRUD | View |
| Roles | Manage/Assign | View | View | CRUD | View |

