---
title: Propelo and Harness
description: Propelo is now Harness SEI.
sidebar_position: 20
---

In January 2023, Harness acquired Propelo, now called Harness Software Engineering Insights (SEI). This page provides information for former Propelo customers who are now using Software Engineering Insights in the Harness Platform.

For more information about the acquisition, go to the [Harness blog](https://www.harness.io/blog/harness-acquires-propelo).

## Get started with Harness

If you're new to Harness, go to [Get started with Harness](/docs/getting-started).

## Authentication, access, and user management

Authentication, access, and user management are part of the Harness Platform. Permissions granted to users and user groups depends on their associations with resources and resource groups, which are controlled at the account and project level in Harness. For more information about authentication, access, and user management, go to the following:

* [Harness Platform authentication (including 2FA and SSO)](/docs/category/authentication)
* [Harness RBAC overview](/docs/platform/role-based-access-control/rbac-in-harness)

### User roles

Harness SEI has three built-in user roles:

* SEI Admin
* SEI Collection Admin
* SEI Viewer

These roles replace the user roles that existed in Propelo (Admin, Org Manager/Admin, Auditor, Limited User, Restricted User, Assigned Issue User, and Public Dashboard User). In the Harness Platform, use [Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness) for access control. For example, you can [add user groups](/docs/platform/role-based-access-control/add-user-groups) or [add user roles](/docs/platform/role-based-access-control/add-manage-roles) according to your custom access needs.

## Terminology

Some Propelo terminology changed to align with the Harness Platform.

| Propelo term | Harness term | Comments |
| ------------ | ------------ | -------- |
| Tenant | Account | |
| Dashboards | Insights | |
| Workspaces | Projects | Each Harness project is a workspace. Harness organizations are umbrellas over projects. SEI can't track an organization as a conglomerate of the projects within it. |
| Global Settings | Customize | Located under **SEI Settings** in the module navigation. Only includes the **Dashboard Color Scheme** setting. |
| Audit Logs | Activity Logs | Located under **SEI Settings** in the module navigation. |
| Org Users | Contributors | This refers to user records that contribute to metrics and insights. This doesn't refer to [user roles](#user-roles). |
| Org Managers/Admins | Collection Admins | |

The following terms are the same:

* Ingestion Satellites
* Integrations
* Profiles
* Propels
* Tables
* Trellis Score
