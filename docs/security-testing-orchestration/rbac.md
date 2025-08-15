---
title: RBAC for STO - Role-Based Access Control
description: Manage resources and role permissions for STO.
sidebar_label: Access Control - RBAC
sidebar_position: 95
---

Harness STO offers granular Role-Based Access Control (RBAC) for all its resources. You can precisely control who can view, create, or manage resources across different scopes. RBAC ensures that only authorized users or teams can access or perform actions on critical resources such as **Issues**, **Scans**, **Exemptions**, **Test Targets** etc. You can configure permissions and resource groups at the **Account**, **Organization**, or **Project** level. For more details on general RBAC setup, refer to the [Harness RBAC configuration guide](/docs/platform/role-based-access-control/rbac-in-harness). This document details about:

- [STO Resources and Role Permissions](#sto-resources-and-role-permissions)
- [Built-in STO Roles (Default Roles)](#built-in-sto-roles-default-roles)

<DocVideo src="https://youtu.be/c_JU141TGas" />

:::info
To assign Roles, you need Administrative privileges at the **Account** level (**Account Admin** role).
:::

## STO Resources and Role Permissions

STO resources can be managed and secured using Role-Based Access Control (RBAC). Each resource has its own set of permissions, which you assign to roles. [**Roles**](/docs/platform/role-based-access-control/add-manage-roles), when combined with **[Resource Groups](/docs/platform/role-based-access-control/add-resource-groups)**, determine the access level and permissions users have within STO.

Access to STO resources depends on the **[scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes)** at which a role is assigned:

* **Account**: Permissions apply across the entire account.
* **Organization**: Permissions apply to all projects within an organization.
* **Project**: Permissions apply only within a specific project.

STO resources are available at different scopes, and not every scope includes all resources.
The table below outlines which resources are supported at each scope. Here's how it looks at the Project level.

<DocImage path={require('./use-sto/static/rbac-resource-groups.png')} width="80%" height="80%" title="Click to view full-size image" />

The following table provides a detailed overview of each STO resource, its supported permissions, available scopes, and descriptions:

| Resource          | Permissions                      | Project Scope | Organization Scope | Account Scope | Description                                                                 |
|-------------------|----------------------------------|:-------:|:------------:|:-------:|-----------------------------------------------------------------------------|
| Issues            | <ul><li>View</li><li>Create / Edit</li><li>Delete</li></ul>        |   ✅    |      ✅      |   ✅    | Vulnerabilities identified by security scans. Tracked at project level and viewable at higher scopes. |
| Test Targets      | <ul><li>View</li><li>Create / Edit</li></ul>                 |   ✅    |      ❌      |   ❌    | Artifacts or repositories configured for scanning within specific projects. |
| Scans             | <ul><li>View</li></ul>                              |   ✅    |      ❌      |   ❌    | Security test executions within pipelines.                       |
| Exemptions        | <ul><li>View</li><li>Create / Edit</li><li>Approve / Reject</li></ul>  (*Refer to [Exemption Permissions  Matrix](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#exemption-permissions-matrix) for more details.*)|   ✅    |      ✅      |   ✅    | Requests to ignore identified vulnerabilities from policy enforcement.    |
| External Tickets (*coming soon*) | <ul><li>View</li><li>Create / Edit</li><li>Delete</li></ul>        | ✅ (*planned*) | ❌ &nbsp; &nbsp; (*planned*) | ❌ (*planned*) | External issue-tracker tickets linked to STO vulnerabilities (e.g., Jira).  |

<DocImage path={require('./use-sto/static/rbac-appsec-role.png')} width="80%" height="80%" title="Click to view full-size image" />

### Permission Details

Permissions control the specific actions users can perform on STO resources:

* **View**: Allows users read-only access to resources.
* **Create/Edit**: Enables users to configure, create, or modify resources.
* **Delete**: Grants the ability to remove resources (where applicable).
* **Approve/Reject (Exemptions only)**: Provides authority to approve or reject exemption requests.

## Built-in STO Roles (Default Roles)
Harness includes two built-in roles specifically designed for STO use cases. **[Security Testing Developer](#security-testing-developer)** and **[Security Testing AppSec](#security-testing-appsec)**. These roles come pre-configured with sets of permissions on STO resources to match typical developer and security team responsibilities.

### Security Testing Developer
For development or DevOps engineering teams, this role allows full access except for "Delete" on external tickets and "Approve/Reject" on exemptions.

<DocImage path={require('./use-sto/static/rbac-developer-role.png')} width="80%" height="80%" title="Click to view full-size image" />

### Security Testing AppSec
For security operations and application security teams, this role grants all available permissions including exemption approvals and ticket deletions.

<DocImage path={require('./use-sto/static/rbac-appsec-role.png')} width="80%" height="80%" title="Click to view full-size image" />

<details>
<summary>Assign Security Testing roles: Default workflow</summary>


1. Select **Account/Organization/Project Settings** (left menu) > **Access Control**.
2. In the **Users** table, select the user profile.
3. Under Role Bindings, select **+Role**.
4. Assign the **Security Testing Developer** role or the **Security Testing AppSec** role to the user profile.

<DocImage path={require('/docs/security-testing-orchestration/get-started/static/set-up-harness-for-sto-16.png')} width="40%" height="40%" title="Click to view full size image" />


</details>