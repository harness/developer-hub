---
title: Scopes, Roles & Permission [2.0]
description: Learn how to create roles with required permissions and assign them to users and user groups.
sidebar_position: 1
---
IDP 2.0 introduces granular RBAC across different IDP resources like Catalog, Workflows, etc. which means now you can control who could view or edit your IDP resources. Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. With this, Harness IDP introduces scope-aware permissions aligned with Harness Projects, Organizations and Account. 

To learn more about the entities, permissions and different scopes we've introduced with IDP 2.0, please refer to the Data Model here. 

## Scopes 
IDP 2.0 follows a three-level hierarchical structure. The three levels, or scopes, are **Account**, **Organization**, and **Project**. IDP resources can be explicitly created at any scope.

You can configure permissions for each scope. This helps delegate responsibilities to different teams and allows efficient organization and management of resources by providing granular access control that is flexible, scalable, and easy to manage.

### Account Scope

The **Account Scope** is the highest level. It is your Harness account and encompasses all resources within your subscription. Resources created at the account scope are accessible platform-wide. Permissions for resources created at this level can be modified using granular RBAC and shared across user groups.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/313af370-dff9-44ba-a6f1-0d944a64c1c6" />

### Organization Scope

The **Organization Scope** contains related projects, resources, and users within a specific domain or business unit. It provides a way to create and manage resources specific to a particular organization, separate from other areas of the account. Resources created at the organization scope are scoped to the orgs that own them but can also be shared using granular RBAC.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/702e2a2a-6117-4efb-a83c-5ccd2a0202bb" />

### Project Scope

The **Project Scope** includes resources for a specific team or project. It enables the creation and management of resources specific to a particular project, separate from the larger organization and account. Resources created at this scope are only available within that project and scoped to the teams that own them.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/e1192086-0bc6-45c2-a869-133dd2aff600" />

Learn more about the [Harness platform hierarchy](https://developer.harness.io/docs/platform/get-started/key-concepts/#account).

## Permissions & Resources 
All IDP resources can exist at different scopes, but their permissions and access levels depend on the RBAC settings you apply. With granular RBAC, you can use the pre-defined roles or define custom roles with specific permissions, and organize them into reusable resource groups. These permissions are fully aligned with the existing Harness RBAC framework.

With IDP 2.0, you can create resources at any scope: **Account**, **Org**, or **Project**. Here's how resources and scopes link together in IDP 2.0:

| **Resource**   | **Permissions** | **Account scope** | **Org scope** | **Project scope** | **Notes**  |
| -------------- | ---------------- | ----------------- | ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Catalog**    | | ✅                 | ✅             | ✅                 | Core catalog entities **(Component, API, Resource)** can be created and managed across all scopes.         |
| **Workflows**  | | ✅                 | ✅             | ✅                 | Workflows can be created, managed, and executed across all scopes.                                         |
| **Scorecards** | | ✅                 | ❌             | ❌                 | Only supported at the Account scope currently. Org/Project scope support is planned in the future roadmap. |
| **Layouts**    | | ✅                 | ❌             | ❌                 | Supported only at the Account scope currently. Org/Project scope support is planned.                       |
| **Plugins**    | | ✅                 | ❌             | ❌                 | Plugins can be created and configured only at the Account scope.                                           |

## Roles & Resource Groups

## User Groups & Users




