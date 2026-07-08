---
title: Role-based access control (RBAC) in Harness
description: Learn about RBAC in Harness.
sidebar_position: 10
sidebar_label: RBAC in Harness
canonical_url: https://www.harness.io/blog/rbac
---

<!-- No redirect for /4_role-based-access-control/1-rbac-in-harness because that link didn't exist in prod. Now the link is true to prod: /role-based-access-control/rbac-in-harness. -->

Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups.

Using RBAC helps you:

- Ensure users can only access the information and resources necessary to perform their tasks. This reduces the risk of security breaches and unauthorized access to sensitive data.
- Create systematic, repeatable permissions assignments. RBAC saves time and increases efficiency for administrators who otherwise have to manage access for individual user accounts. You can quickly add and change roles, as well as implement them across APIs.
- Increase accountability by clearly defining who has access to which resources and information. This makes it easier to track and audit user activities, helping to identify and prevent misuse or abuse of access privileges.
- More effectively comply with regulatory and statutory requirements for confidentiality and privacy. It helps you enforce privacy and data protection policies.

:::tip

If you're not familiar with RBAC, check out this blog post on [User and Role Management in the Harness Software Delivery Platform](https://harness.io/blog/continuous-delivery/user-role-management/).

:::

Before configuring RBAC in Harness, you should have an understanding of:

- [Harness' key concepts](/docs/platform/get-started/overview).
- [Creating organizations and projects](/docs/platform/get-started#create-an-organization).
- The functionality of the modules in your Harness account.

The video below gives an overview of RBAC in Harness.

 <DocVideo src="https://www.loom.com/embed/b71549af4874451e9885dfe67ddfb0c2" width="100%" height="600" />

## Permissions hierarchy (scopes)

The Harness Platform has a three-level hierarchical structure. The three levels, or scopes, are **Account**, **Organization** (Org), and **Project**.

You can configure permissions for each scope. This helps you delegate responsibilities to different teams and efficiently organize and manage your resources by providing granular access control that is flexible, scalable, and easy to manage.

The **Account** scope is the highest level. It is your Harness account and it encompasses all the resources within your Harness subscription. It provides a way to manage billing, user authentication, and global settings for all the organizations and projects within the account. Users with account-level permissions can manage the account-level settings, including billing, subscription, and SSO configuration. Resources, such as connectors, created at the account scope are available for use in all the organizations and projects within that account.

The **Organization** scope contains related projects, resources, and users within a specific domain or business unit. It provides a way to manage resources and permissions specific to a particular organization, as separate from other areas of the account. Users with org-level permissions can manage organization-level settings, including the creation of projects and user groups in the org, and assigning access policies to those user groups. Resources created at the organization scope are available for use in all projects within that organization, but aren't available outside that org.

The **Project** scope contains related resources, such as apps, pipelines, and environments. It provides a way to manage resources and permissions specific to a particular project, as separate from the larger org (business unit) and account. Users with project-level permissions can manage project-level settings, including the creation of pipelines, environments, and infrastructure definitions. Resources created at the project scope are only available in that project.

```mermaid
flowchart TD
    A[Account] --> B(Organization)
    A[Account] --> C(Organization)
    B --> D[Project]
    B --> E[Project]
    C --> F[Project]
    C --> G[Project]
```

The scope at which you create resources depends on the level of control and visibility you require. For example, if you create a connector at the account scope, it is available to all organizations and projects within the account. However, if you create a connector at the organization scope, it is only available to that organization and any projects under that organization. It is not available at the account scope or to other organizations. This lets you control access to your resources more effectively and prevent unauthorized access.

To learn about organizations and projects, go to [Create Organizations and Projects](/docs/platform/get-started#create-an-organization).

## RBAC components

Harness RBAC uses **Principals**, **Resource Groups**, and **Roles** to control access.

- [Principals](#principals) are entities taking action in the system. These include users, user groups, and service accounts.
- [Resource groups](#resource-groups) define what objects can be acted on. Objects include organizations, projects, pipelines, connectors, users, and more.
- [Roles](#roles) define what actions can be taken on objects. Actions include view, create, edit, delete, and so on.

You [assign roles and resource groups to principals](#role-binding). Roles and resource groups assigned to user groups are inherited by the users in those user groups.

```mermaid
flowchart TD
    A[Roles & Resource groups]-->C[User groups]
    A--->B
    A--->E[Service accounts]
    C-->B[Users]
```

### Principals

Principals are entities taking action in the system. You assign permissions and access, through roles and resource groups, to principals. Permissions define what actions a principal can take. Access defines which objects they can act on.

Principals include:

- [Users](/docs/platform/role-based-access-control/add-users): Individual users in Harness. Each user can belong to many user groups. You can assign roles and resource groups directly to users, or they can inherit these from user groups that they belong to.
- [User Groups](/docs/platform/role-based-access-control/add-user-groups): User groups contain multiple Harness users. Roles and resource groups are assigned to groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members. You can create user groups at all [scopes](#permissions-hierarchy-scopes).
- [Service Accounts](/docs/platform/role-based-access-control/add-and-manage-service-account): Service accounts are like API users. You assign roles and resource groups to service accounts. Service accounts also have one or more [API keys](/docs/platform/automation/api/add-and-manage-api-keys), which authenticate and authorize remote services attempting to perform operations in Harness through Harness APIs.

### Resource groups

A resource group is a set of Harness resources that a principal can access. You can create resource groups at all [scopes](#permissions-hierarchy-scopes). Resource groups are assigned along with [roles](#roles) to principals. Roles grant permissions (what actions can be taken) and resource groups grant access (what objects can be acted on).

Resource groups either include **All Resources** (all resources of a given type) or **Named Resources** (specific, individual resources).

Harness has built-in resource groups at each scope, and you can create custom resource groups. For more information, go to [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups).

### Roles

Roles are sets of [permissions](/docs/platform/role-based-access-control/permissions-reference) that allow or deny specific operations on objects (resources). Roles are applied together with [resource groups](#resource-groups) to create a complete set of permissions and access.

Harness includes some built-in roles, and you can create your own custom roles, which are useful for limited and fine-grained access control. For more information, go to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).

Roles are scope-specific and can be created at all [scopes](#permissions-hierarchy-scopes).

## Role binding

Role binding refers to the process of assigning [roles](#roles) and [resource groups](#resource-groups) to [principals](#principal) (users, user groups, and service accounts). Role binding can be configured at all scopes.

```mermaid
flowchart TD
    A[Roles & Resource groups]-->C[User groups]
    A--->B
    A--->E[Service accounts]
    C-->B[Users]
```

<details>
<summary>Built-in role binding configurations</summary>

The following table describes the role bindings (permissions and access) that result from some combinations of built-in [roles](#roles) and [resource groups](#resource-groups). This table doesn't include module-specific built-in roles, such as CET Admin or Chaos Admin.

| Role                | Resource Group                                 | Resulting role binding                                                                                                                                                                        |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account Admin       | Account - All Resources Including Child Scopes | All permissions on all resources in the account and resources in organizations and projects under the account.                                                                                |
| Account Admin       | All Account Level Resources                    | All permissions on all resources at the account level only.                                                                                                                                   |
| Account Viewer      | Account - All Resources Including Child Scopes | View resources in the account and resources in organizations and projects under the account.                                                                                                  |
| Account Viewer      | All Account Level Resources                    | View resources at the account level only.                                                                                                                                                     |
| Organization Admin  | Org - All Resources Including Child Scopes     | All permissions on all resources in a specific organization and all projects under that organization.                                                                                         |
| Organization Admin  | All Organization Level Resources               | All permissions on all resources in a specific organization only.                                                                                                                             |
| Organization Viewer | Org - All Resources Including Child Scopes     | View resources in a specific organization and resources in projects under that organization.                                                                                                  |
| Organization Viewer | All Organization Level Resources               | View resources in a specific organization only.                                                                                                                                               |
| Project Admin       | All Project Level Resources                    | All permissions on all resources within a specific project.                                                                                                                                   |
| Project Viewer      | All Project Level Resources                    | View resources in a specific project.                                                                                                                                                         |
| Pipeline Executor   | All Project Level Resources                    | <ul><li>View resource groups, projects, users, user groups, and roles.</li><li>View and access secrets, connectors, environments, and services.</li><li>View and execute pipelines.</li></ul> |

<!-- | Feature Flag Manage Role | Account - All Resources Including Child Scopes | Create and edit Feature Flags and Target Management resources in the account and in organizations and projects under the account. | -->
<!-- | Feature Flag Manage Role | All Account Level Resources | Create and edit Feature Flags and Target Management resources at the account level only. | -->
<!-- | Feature Flag Manage Role | Org - All Resources Including Child Scopes | Create and edit Feature Flags and Target Management resources in a specific organization and in projects under that organization. | -->
<!-- | Feature Flag Manage Role | All Organization Level Resources | Create and edit Feature Flags and Target Management resources in a specific organization only. | -->
<!-- | Feature Flag Manage Role | All Project Level Resources | Create and edit Feature Flags and Target Management resources in a specific project. | -->

</details>

### RBAC is additive

RBAC is an additive model; therefore, role and resource group assignments in Harness are additive. The total expanse of a principal's permissions and access is the sum of all the roles and resource groups from all user groups they belong to, as well as any roles and resource groups assigned directly to them as an individual user or service account.

:::warning Least privilege

It is important to follow the principle of least privilege (PoLP). This is a security principle that means users are granted the absolute minimum access/permissions necessary to complete their tasks and nothing more.

While Harness includes some built-in roles and resource groups, it is a good idea to create your own roles and resource groups as needed to ensure the least privilege.

:::

For example, assume a user has these role and resource group assignments:

- **Account Admin** role with **All Resources Including Child Scopes**. This is the most permissive combination of role and resource group. It grants all permissions on all resources throughout the entire account.
- **Organization Viewer** role with **All Resources Including Child Scopes**. This combination, by itself, grants the ability to view resources in a specific organization and resources in the projects under that organization.

Because the **Account Admin** combination includes the **Org Viewer** combination (and more), the user is effectively an account admin throughout the entire account. Assigning the **Org Viewer** role makes no difference to this user's access.

To control this user's access, you could change the resource group for the **Account Admin** role to **All Account Level Resources**. This would limit the **Account Admin** permissions to the resources at the account level only and remove admin access to lower scopes.

### Extend RBAC with ABAC

For more fine-grained control over access to connectors and environments, you can use [Attribute-Based Access Control (ABAC)](/docs/platform/role-based-access-control/attribute-based-access-control) as an extension of RBAC on your resource groups.

ABAC provides highly refined control by using rules to restrict access based on combinations of attributes, such as connector and environment type.
