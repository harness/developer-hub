---
title: Manage roles
description: Use roles for RBAC in Harness.
sidebar_position: 20
helpdocs_topic_id: tsons9mu0v
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Roles are an [RBAC component](/docs/platform/role-based-access-control/rbac-in-harness#rbac-components) that bundle together [permissions](/docs/platform/role-based-access-control/permissions-reference). They define what actions a user can take on Harness resources- like viewing, creating, editing, or deleting things.

Use roles to control what actions users, user groups, and service accounts can perform in Harness. When you assign a role to a user, user group, or service account, Harness grants the permissions defined in the role to that user, group, or service account.

Roles are scope-specific, and you can create them at any [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes). For example, a role created at the project scope is only available in that project.

Harness provides [built-in roles](#built-in-roles) for common use cases. You can also [create custom roles](#create-a-role) for fine-grained access control.

This page explains how to view built-in roles, create custom roles, and assign permissions.

---

## What will you learn in this topic?

By the end of this page, you will understand how to:

- View built-in roles in Harness.
- Create custom roles with specific permissions.
- Edit and delete existing roles.
- Assign roles to users, user groups, and service accounts across different scopes.
- Reuse roles across account, organization, and project scopes.

---

## Before you begin

Before you create or manage roles, ensure you have:

- **Harness account access:** Access to the account, organization, or project where you want to manage roles.
- **Appropriate permissions:** A role with permissions to view, create, edit, and delete roles (such as **Account Admin**, **Organization Admin**, or **Project Admin**).
- **RBAC familiarity:** Understanding of RBAC components and permissions hierarchy scopes. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness#rbac-components" target="_blank">RBAC components</a> and <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">Permissions hierarchy scopes</a> to review these concepts.

### Navigate Access Control

Many procedures in this page require you to navigate to **Access Control** at a specific scope:

- **Account scope**: Select **Account Settings** → **Access Control**
- **Organization scope**: Go to **Organizations** → select your organization → **Access Control**
- **Project scope**: Go to **Projects** → select your project → **Access Control**


---

## Roles and resource groups

Roles work alongside [resource groups](/docs/platform/role-based-access-control/add-resource-groups) to create a complete set of permissions and access. For example, you can:

- Assign the **Organization Admin** role with a resource group that is limited to specific projects or specific organizations.
- Assign the **Pipeline Executor** role with a resource group that only allows access to specific pipelines, rather than all pipelines in the project.

:::note Recommendation
Follow the principle of least privilege (PoLP), and give users only the access (or permissions) they need to complete their tasks.
:::

RBAC is additive. A user's total permissions come from:
- All roles and resource groups from user groups they are in.
- Any roles and resource groups assigned directly to them.

---

## Built-in roles

Built-in roles provide ready-to-use permission sets so you do not have to build access control from scratch. Harness pre-configures them with relevant permission sets for common responsibilities, such as admin, viewer, and so on, saving setup time.

Built-in platform roles cover all levels of your hierarchy: account, organization, and project. 
They give your teams a baseline for access control, which you can complement with custom roles for fine-grained control.

Harness includes several built-in roles. To examine the permissions assigned to these roles, follow the steps below:

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/add-manage-roles#navigate-to-access-control) where the role exists.
2. Select **Roles** in the header.
3. Select the role you want to view. Go to <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a> for details about specific permissions.

At times, built-in roles could be behind the feature flags `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE`, `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`, and `PL_HIDE_ACCOUNT_LEVEL_MANAGED_ROLE`. Contact [Harness Support](mailto:support@harness.io) to enable the features.


:::tip Recommendation
Harness provides built-in roles and resource groups, but you should:

- Be selective when you assign them. Do not give everyone the **Account Admin** role.
- Create custom roles and resource groups when built-in ones are too broad.
:::

### Platform roles

These roles are not specific to any modules. They are utilized for administration and oversight of an entire Harness account, organization, or project. They also provide access to cross-module components, such as dashboards and pipelines.

| Role | Scope |
| ---  | ----- |
| Account Admin, Account Viewer, Dashboard Admin, Dashboard Viewer, Billing Admin | Account |
| Organization Admin, Organization Viewer | Organization |
| Project Admin, Project Viewer, Pipeline Executor | Project |

### Module-specific roles

Harness creates these roles for you depending on the modules you use. These roles exist at all [scopes](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

* **Feature Flag Manage Role**: Manage feature flags, including creating, editing, and targeting flags.
* **CET Admin**: Administer Continuous Error Tracking, including managing monitored services and error events.
* **Chaos Admin**: Administer Chaos Engineering experiments and chaos infrastructure.
* **CCM Admin**: Administer Cloud Cost Management, including viewing costs, creating budgets, and managing cost optimization.
* **CCM Viewer**: View Cloud Cost Management dashboards and reports without editing capabilities.
* **Security Testing AppSec Role**: Manage security testing for application security teams, including reviewing scan results and configuring security policies.
* **Security Testing Developer Role**: View security testing scan results and exemptions for development teams.
* **GitOps Admin Role**: Administer GitOps applications, repositories, clusters, and agents.
* **Code Admin**: Administer Harness Code Repository, including managing repositories, branches, and pull requests.

---

## Manage roles in Harness

To manage roles in Harness, you need a role, such as **Account Admin**, that has [permission](/docs/platform/role-based-access-control/permissions-reference) to view, create/edit, and delete roles.

<DocImage path={require('./static/add-manage-roles-17.png')} />

### Create a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/add-manage-roles#navigate-to-access-control) where you want to create the role.
2. Select **Roles** in the header, and then select **New Role**.
3. Enter a **Name** for the role. **Description** and **Tags** are optional.
4. Click **Save**.
5. Select [permissions](/docs/platform/role-based-access-control/permissions-reference) for the role.

   <DocImage path={require('./static/add-manage-roles-19.png')} />

6. Click **Apply Changes**.

### Edit a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/add-manage-roles#navigate-to-access-control) where the role exists.
2. Select **Roles** in the header.
3. Locate the role you want to edit.
4. Select **More options** (&vellip;) on the role card, and then select **Edit**.
5. Edit the role's name, description, or tags, if needed, and then click **Save**.
6. Edit the role's permissions, and then click **Apply Changes**. Go to <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a> for details about specific permissions.

### Delete a role

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/add-manage-roles#navigate-to-access-control) where the role exists.
2. Select **Roles** in the header.
3. Locate the role you want to delete.
4. Select **More options** (&vellip;) on the role card, and then click **Delete**.

---

## Reuse roles across scopes

You can further streamline role management by reusing roles across scopes in Harness, simplifying access control configuration across your account, organizations, and projects. By creating a role at the account level, you can easily assign it to users, user groups, or service accounts at granular levels like the organization or project scope.

:::note
- This feature is behind the feature flag `PL_ROLE_REUSABILITY_ACROSS_CHILD_SCOPES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
- You can only reuse custom roles across scopes. Built-in roles are not reusable.
:::

The example below walks through reusing a role across scopes. The role is created at the account scope and then assigned to users at the organization and project scopes.

### Create a role at the account scope

1. In Harness, go to **Account Settings** -> **Access Control**.
2. Select **Roles** in the header, and then select **New Role**.
3. For **Name**, enter `TEST_ROLE`. **Description** and **Tags** are optional.
4. Click **Save**.
5. Select the following permissions:
   - For **Pipelines**, click **Execute**.
6. Click **Apply Changes**.

### Assign the role to users at the organization scope
1. In Harness, go to **Account Settings** -> **Organizations**, select the relevant organization, and then select **Access Control**.
2. Select **User Groups** in the header, and then select the User Group you want to assign the role to.
3. Select **Manage Role Bindings**.
4. Under **Role Bindings**, click **Add**.
5. Under **Select an Existing Role**, select **Account** in the header and then select the role you want to assign.

   <DocImage path={require('./static/add-manage-roles-20.png')} />
   
6. Click **Apply Selected**.
7. Click **Save**.

   <DocImage path={require('./static/add-manage-roles-21.png')} />

---

## View principals assigned to a role

:::note
This feature is behind the feature flag `PL_ROLE_REUSABILITY_ACROSS_CHILD_SCOPES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

To view principals assigned to a [specified role](#platform-roles), navigate to the appropriate scope (account, organization, or project) and follow the steps below. 

The steps below use the Account scope and Account Admin role as an example. You can follow the same steps for the Organization and Project scopes.

<Tabs>
  <TabItem value="Interactive" label="Interactive" default>
    <iframe
      src="https://app.tango.us/app/embed/50c1adef-4946-4bff-ab05-10a47e8d1d50"
      style={{ minHeight: '640px', width: '100%' }}
      sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
      title="View principals assigned to a role"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
    />
  </TabItem>

   <TabItem value="Manual" label="Manual" default>
      1. Navigate to the scope’s Settings → Access Control → Roles.
      2. Locate or search for the [specific role](#platform-roles).
      3. Click on the role, switch to the **Assigned To** tab.
      4. By default, the "Users" list appears for the assigned role. You can also switch to the "User Groups" or "Service Accounts" tabs to view principals for the specified role.
   </TabItem>
</Tabs>

---

## Related articles

- <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Create resource groups</a> - Define access to specific Harness resources.
- <a href="/docs/platform/role-based-access-control/add-users" target="_blank">Add users</a> - Add users to your Harness account, organization, or project.
- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Create user groups</a> - Create user groups and assign roles and resource groups to them.
- <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">Manage service accounts</a> - Configure programmatic access to Harness.
- <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a> - Review detailed information about available permissions.
