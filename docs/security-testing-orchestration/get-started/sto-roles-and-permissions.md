---
title: STO access control
description: Learn about STO roles and permissions.
sidebar_position: 100
---

# STO access control

Harness employs Role-Based Access Control (RBAC) to manage user and group access to Harness resources based on their roles. RBAC enhances security and operational efficiency. This topic describes the permissions available for Security Testing Orchestration (STO).

The Harness Platform has a three-level hierarchical structure:

- Accounts (contains organizations and projects)
  - Organizations (contains projects)
    - Projects

To learn more about access control in Harness, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

## STO roles

Harness includes two [RBAC roles](/docs/platform/role-based-access-control/rbac-in-harness/) specifically for STO users:

* **Security Testing Developer** — Permissions for developers: 

  - Configure and run scans
  - Set baselines (such as the `main` branch of `latest` tag) for scan targets
  - View scan results and troubleshoot detected issues
  - Configure scan steps to fail the pipeline based on scan results  
  - Request exemptions for specific vulnerabilities to override the pipelines' failure criteria  
  - View/create/edit [external tickets](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations) for issues detected by STO scans 
  
* **Security Testing SecOps** — Permissions for SecOps staff:  
  - All Security Testing Developer permissions
  - Approve/reject exemptions
  - Delete external tickets

:::note important notes

- You need **Account Admin** permissions to assign these roles.

- The **Account Admin**, **Organization Admin**, and **Project Admin** roles include all **Security Testing SecOps** permissions. 

- The **Account Viewer**, **Organization Viewer**, and **Project Viewer** roles include view-only permissions for STO resources.

:::

## STO permissions

The following table shows the permissions associated with each role.

<table>
    <tr>
        <th>Permission</th>
        <th>Security Testing Developer</th>
        <th>Security Testing SecOps</th>
    </tr>
    <tr>
        <td>Run scans</td>
        <td align="center">✅</td>
        <td align="center">✅</td>
    </tr>
    <tr>
        <td>View issues</td>
        <td align="center">✅</td>
        <td align="center">✅</td>
    </tr>
    <tr>
        <td>View/create/edit test targets</td>
        <td align="center">✅</td>
        <td align="center">✅</td>
    </tr>
    <tr>
        <td>View/create/edit exemptions</td>
        <td align="center">✅</td>
        <td align="center">✅</td>
    </tr>
    <tr>
        <td>Approve/reject exemptions</td>
        <td align="center"></td>
        <td align="center">✅</td>
    </tr>    
    <tr>
        <td>View/create/edit external tickets</td>
        <td align="center">✅</td>
        <td align="center">✅</td>
    </tr>
    <tr>
        <td>Delete external tickets</td>
        <td align="center"></td>
        <td align="center">✅</td>
    </tr>
    </table>


## See also

The following topics can help you understand how to implement access control in Harness:

- [Manage users](/docs/platform/role-based-access-control/add-users)
- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups)
- [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups)
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles)
