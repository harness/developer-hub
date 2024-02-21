---
title: Insights
description: Guide on how to use RBAC on SEI features and resources.
sidebar_position: 5
---

# Manage access control for SEI insights

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness Resources according to their role assignment.

This topic describes how to add and manage access control for SEI Insights.

## Before You Begin

* [RBAC in SEI](/docs/software-engineering-insights/access-control/sei-roles-and-permissions)
* [RBAC in Harnesss](/docs/platform/role-based-access-control/add-manage-roles)

## SEI Insights Roles and Permissions

The following roles are supported for SEI Insights:

* **SEI Admin:** To view, add, edit, and delete SEI Insights with the capability to add widgets to Insights. The access can be given to all Insights or specific Insights.
* **SEI Collection Admin:** To view all Insights or user-associated Insights with the capability to edit the user-associated Collections.
* **SEI Viewer:** To view all Insights or user-associated Insights.

:::info
Note that the specific Insight or Collection selection option is supported only in the project-level scope.
:::

| Role | Scope | Permission |
| - | - | - |
| SEI Admin | Account | <ul><li>Add Insight</li> <li>Add Widgets / Reports</li> <li>Edit Insights</li> <li>Delete Insights</li></ul> |
| SEI Collection Admin | Account | View |
| SEI Collection Admin | Project | View |
| SEI Viewer | Account | View|
| SEI Viewer | Project | View|

It is important to note that the permissions mentioned in the table above are entirely dependent on the resource group that is mapped to the role. Therefore, it is crucial to define the role binding accurately between the role and the associated resource group for the user to ensure that the permissions are correctly applied.

## Add and Manage Access Control for Resource Groups

In this section, we will walk through the process of defining and managing access controls for resource groups within an account and project-level scope.

We will cover how to set up permissions for Insights at the account level, as well as limiting access to specific Insights at the project level.

### Account Level

At the account level scope, the resource group allows you to define permissions for the following SEI entities:

* Configuration Settings (All account level resources i.e. Integrations, Contributors, Profiles etc)
* Insights
* Collections
