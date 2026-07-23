---
title: Manage roles
description: Use roles for RBAC in Harness.
sidebar_position: 20
keywords:
  - roles
  - RBAC
  - custom roles
  - built-in roles
  - permissions
  - role assignment
  - role bindings
  - manage roles
  - access control
tags:
  - rbac
  - roles
  - access-control
helpdocs_topic_id: tsons9mu0v
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Roles are an <a href="/docs/platform/role-based-access-control/rbac-in-harness#rbac-components" target="_blank">RBAC component</a> that bundle together <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions</a>. They define which actions a user can take on Harness resources, including view, create, edit, and delete operations. When you assign a role to a user, user group, or service account, Harness grants the permissions defined in the role to that principal.

Roles are scope-specific, and you can create them at any <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a>. For example, a role created at the project scope is available only in that project. Harness provides <a href="#built-in-roles">built-in roles</a> for common use cases, and you can create <a href="#create-a-role">custom roles</a> for fine-grained access control.

---

## What will you learn in this topic?

By the end of this page, you will be able to:

- View <a href="#built-in-roles">built-in roles</a> in Harness.
- Create <a href="#create-a-role">custom roles</a> with specific permissions.
- <a href="#edit-a-role">Edit</a> and <a href="#delete-a-role">delete</a> existing roles.
- <a href="#assign-the-role-to-users-at-the-organization-scope">Assign roles to users, user groups, and service accounts</a> across different scopes.
- <a href="#reuse-roles-across-scopes">Reuse roles</a> across account, organization, and project scopes.

---

## Before you begin

Before you create or manage roles, ensure you have the following:

- **Harness account access**: Access to the account, organization, or project where you want to manage roles.
- **Appropriate permissions**: A role with permissions to view, create, edit, and delete roles, such as **Account Admin**, **Organization Admin**, or **Project Admin**.
- **RBAC familiarity**: Understanding of RBAC components and permissions hierarchy scopes. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness#rbac-components" target="_blank">RBAC components</a> and <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">permissions hierarchy scopes</a> for more information on these concepts.

### Navigate to Access Control

Many procedures on this page require you to navigate to **Access Control** at a specific scope:

- **Account scope**: Navigate to **Account Settings** → **Access Control**.
- **Organization scope**: Navigate to **Organizations**, select your organization, and then select **Access Control**.
- **Project scope**: Navigate to **Projects**, select your project, and then select **Access Control**.

---

## Roles and resource groups

Roles work alongside <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">resource groups</a> to create a complete set of permissions and access. For example, you can:

- Assign the **Organization Admin** role with a resource group that is limited to specific projects or specific organizations.
- Assign the **Pipeline Executor** role with a resource group that allows access only to specific pipelines, rather than all pipelines in the project.

:::note Recommendation
Follow the principle of least privilege (PoLP), and give users only the access they need to complete their tasks.
:::

RBAC is additive. A user's total permissions come from:

- All roles and resource groups from user groups they are in.
- Any roles and resource groups assigned directly to them.

---

## Built-in roles

Built-in roles provide ready-to-use permission sets, so you do not have to build access control from scratch. Harness pre-configures them with relevant permission sets for common responsibilities, such as admin and viewer, which saves setup time.

Built-in platform roles cover all levels of your hierarchy: **Account**, **Organization**, and **Project**. They give your teams a baseline for access control, which you can complement with custom roles for fine-grained control.

Harness includes several built-in roles. To examine the permissions assigned to these roles, do the following:

1. In Harness, navigate to the <a href="#navigate-to-access-control">scope</a> where the role exists.
2. Select **Roles** in the header.
3. Select the role you want to view. Go to the <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions reference</a> for more information on specific permissions.

:::note
Currently, some built-in roles are behind the feature flags `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE`, `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`, and `PL_HIDE_ACCOUNT_LEVEL_MANAGED_ROLE`. Contact [Harness Support](mailto:support@harness.io) to enable them.
:::

:::tip Recommendation
Harness provides built-in roles and resource groups, but you should:

- Be selective when you assign them. Do not give everyone the **Account Admin** role.
- Create custom roles and resource groups when built-in ones are too broad.
:::

### Platform roles

Platform roles are not specific to any module. Use them for administration and oversight of an entire Harness account, organization, or project. They also provide access to cross-module components, such as dashboards and pipelines.

| Role | Scope |
| ---  | ----- |
| Account Admin, Account Viewer, Dashboard Admin, Dashboard Viewer, Billing Admin | Account |
| Organization Admin, Organization Viewer | Organization |
| Project Admin, Project Viewer, Pipeline Executor | Project |

### Module-specific roles

Harness creates these roles for you depending on the modules you use. These roles exist at all <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scopes</a>.

- **Feature Flag Manage Role**: Manage feature flags, including creating, editing, and targeting flags.
- **CET Admin**: Administer Continuous Error Tracking, including managing monitored services and error events.
- **Chaos Admin**: Administer Chaos Engineering experiments and chaos infrastructure.
- **CCM Admin**: Administer Cloud Cost Management, including viewing costs, creating budgets, and managing cost optimization.
- **CCM Viewer**: View Cloud Cost Management dashboards and reports without editing capabilities.
- **Security Testing AppSec Role**: Manage security testing for application security teams, including reviewing scan results and configuring security policies.
- **Security Testing Developer Role**: View security testing scan results and exemptions for development teams.
- **GitOps Admin Role**: Administer GitOps applications, repositories, clusters, and agents.
- **Code Admin**: Administer Harness Code Repository, including managing repositories, branches, and pull requests.

---

## Manage roles in Harness

To manage roles in Harness, you need a role, such as **Account Admin**, that has <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permission</a> to view, create, edit, and delete roles.

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/add-manage-roles-17.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

### Create a role

1. In Harness, navigate to the <a href="#navigate-to-access-control">scope</a> where you want to create the role.
2. Select **Roles** in the header, and then click **New Role**.
3. Enter a **Name** for the role. **Description** and **Tags** are optional.
4. Click **Save**.
5. Select the <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions</a> for the role.
6. Click **Apply Changes**.

### Edit a role

1. In Harness, navigate to the <a href="#navigate-to-access-control">scope</a> where the role exists.
2. Select **Roles** in the header.
3. Locate the role you want to edit.
4. Select **More options** (&vellip;) on the role card, and then select **Edit**.
5. Edit the role's name, description, or tags, if needed, and then click **Save**.
6. Edit the role's permissions, and then click **Apply Changes**. Go to the <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions reference</a> for more information on specific permissions.

### Delete a role

1. In Harness, navigate to the <a href="#navigate-to-access-control">scope</a> where the role exists.
2. Select **Roles** in the header.
3. Locate the role you want to delete.
4. Select **More options** (&vellip;) on the role card, and then click **Delete**.

---

## Reuse roles across scopes

Reuse roles across scopes to simplify access control configuration across your account, organizations, and projects. When you create a role at the account level, you can assign it to users, user groups, or service accounts at granular levels, such as the organization or project scope.

:::note
- Currently, this feature is behind the feature flag `PL_ROLE_REUSABILITY_ACROSS_CHILD_SCOPES`. Contact [Harness Support](mailto:support@harness.io) to enable it.
- You can reuse only custom roles across scopes. Built-in roles are not reusable.
:::

The following example walks through reusing a role across scopes. The role is created at the account scope, and then assigned to users at the organization and project scopes.

### Create a role at the account scope

1. In Harness, navigate to **Account Settings** → **Access Control**.
2. Select **Roles** in the header, and then click **New Role**.
3. For **Name**, enter `TEST_ROLE`. **Description** and **Tags** are optional.
4. Click **Save**.
5. Select the following permissions:
   - For **Pipelines**, select **Execute**.
6. Click **Apply Changes**.

### Assign the role to users at the organization scope

1. In Harness, navigate to **Account Settings** → **Organizations**, select the relevant organization, and then select **Access Control**.
2. Select **User Groups** in the header, and then select the user group you want to assign the role to.
3. Select **Manage Role Bindings**.
4. Under **Role Bindings**, click **Add**.
5. Under **Select an Existing Role**, select **Account** in the header, and then select the role you want to assign.

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/add-manage-roles-20.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. Click **Apply Selected**.
7. Click **Save**.

---

## View principals assigned to a role

View the principals assigned to a role to audit which users, user groups, and service accounts hold a given set of permissions.

:::note
Currently, this feature is behind the feature flag `PL_ROLE_REUSABILITY_ACROSS_CHILD_SCOPES`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

To view the principals assigned to a <a href="#platform-roles">specified role</a>, navigate to the appropriate scope (account, organization, or project) and follow the steps below. The steps use the **Account** scope and **Account Admin** role as an example. You can follow the same steps for the organization and project scopes.

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

   <TabItem value="Manual" label="Manual">
      1. Navigate to the scope's **Settings** → **Access Control** → **Roles**.
      2. Locate or search for the <a href="#platform-roles">specific role</a>.
      3. Select the role, and then switch to the **Assigned To** tab.
      4. By default, the **Users** list appears for the assigned role. You can also switch to the **User Groups** or **Service Accounts** tabs to view principals for the specified role.
   </TabItem>
</Tabs>

---

## Related articles

- <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Create resource groups</a>: Define access to specific Harness resources.
- <a href="/docs/platform/role-based-access-control/add-users" target="_blank">Add users</a>: Add users to your Harness account, organization, or project.
- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Create user groups</a>: Create user groups and assign roles and resource groups to them.
- <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">Manage service accounts</a>: Configure programmatic access to Harness.
- <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a>: Review detailed information about available permissions.
