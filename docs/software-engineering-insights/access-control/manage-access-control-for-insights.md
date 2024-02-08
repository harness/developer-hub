---
title: Insights
description: Guide on how to use RBAC on SEI features and resources.
sidebar_position: 5
---

# Manage access control for SEI insights

Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness Resources according to their role assignment.

This topic will describe how to add and manage access control for SEI Insights.

## Before You Begin

* [RBAC in SEI](/docs/software-engineering-insights/access-control/sei-roles-and-permissions)
* [RBAC in Harnesss](/docs/platform/role-based-access-control/add-manage-roles)

## Use Cases

### How to configure a user role with view-only access to Insights?

To add users to Harness, you need a role, such as Account Admin, that has permission to invite and manage users.

**Step 1: Configure the Insights association with the specific Collection**

For this scenario, we assume that the user has access to Insights only associated with a particular collection. In Harness SEI, you can associate Insights to a collection under the Insights tab when creating a new collection or modifying an existing one.

**Step 2: Configure the User and Resource Group Settings**

To configure a new user with view-only access to Insights, follow these steps:

1. Go to Resource Group under the Access Control setting.
2. Click on the +New Resource Group button to create a new Resource Group.
3. Select the scope of the Resource Group.
4. Go to the SEI permissions control under the Resource Group configuration.
5. Configure the permissions for Insights and Collection access.
   * Select Insights access as `All` if you want to allow the user to access all Insights under their collections.
   * Specify specific Insights if you want to allow the user to access only selected Insights from the entire list of available Insights.
   * Similarly, configure the permissions for Collections (i.e. `All` for collection access or specify the collections from the list of available collections).
6. Add a new user to your account or project. For more information, go to Manage Users.
7. Under the Role Binding section, select the role associated with the user as `SEI_VIEWER`.
8. Select the Resource Group that you configured earlier and click on apply.

:::info

Note that the user will only be able to access and view the Insights to which they have access, considering the user also has access to the collection under which the Insight is associated or defined.

:::