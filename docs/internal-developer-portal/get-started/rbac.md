---
title: Get Started with RBAC
sidebar_position: 9
sidebar_label: Get Started with RBAC
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info For IDP 1.0 Customers
This RBAC guide is applicable **only to IDP 2.0 customers**, as the RBAC and project/org hierarchy is available exclusively in IDP 2.0.
* To learn how to upgrade, refer to the [IDP 2.0 Upgrade Guide](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md).
* If you're using **IDP 1.0** and want to implement access control, please refer to the [Access Control Guide for IDP 1.0](#permissions--resource-scopes).
:::

## RBAC in IDP 2.0

**Harness IDP 2.0** introduces **granular RBAC** across various IDP resources such as Catalog and Workflows. This means you now have precise control over **who can view or edit** your IDP resources. RBAC enables administrators to define **what actions users can perform** on specific resources, with scope-aware permissions aligned with **Harness Projects, Organizations, and Accounts**.

Harness IDP leverages the **platform hierarchy** and applies the same access control model as **Platform RBAC**. To learn more, visit the [RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) documentation.

## Prerequisites

:::tip For IDP 2.0 Customers
If you're using Harness IDP 2.0, please ensure you have reviewed the [IDP 2.0 Overview guide](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path.md) and are familiar with the key steps for [upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md). To enable IDP 2.0, you must raise a support ticket to activate the `IDP_2_0` feature flag for your account.
:::

Before configuring RBAC in Harness IDP:

* You must be an **Admin** at the **Account**, **Organization**, or **Project** scope.
* For newly created accounts, contact **Harness Support** to provision the first admin.

If you're not an admin, you may still configure certain RBAC settings if you have the required granular permissions:

| **Feature**        | **Required Permissions**      |
| --------------- | ------------------------- |
| Users           | View, Manage, Invite      |
| User Groups     | View, Manage              |
| Resource Groups | View, Create/Edit, Delete |
| Roles           | View, Create/Edit, Delete |

Also, ensure you understand the following concepts:

* [Scopes, Roles & Permissions](/docs/internal-developer-portal/rbac/scopes.md)
* [Key Concepts of Harness Platform Hierarchy](/docs/platform/role-based-access-control/rbac-in-harness.md)
* [Harness IDP RBAC Components](/docs/internal-developer-portal/rbac/scopes.md#rbac-components)
* [Catalog RBAC](/docs/internal-developer-portal/rbac/catalog-rbac.md) & [Workflow RBAC](/docs/internal-developer-portal/rbac/workflow-rbac.md) Principles

## RBAC Configuration Workflow

To configure RBAC in Harness IDP, follow these steps:

1. Go to **Account**, **Organization**, or **Project Settings** where you want to apply RBAC.
2. [Create roles with desired permissions](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles).
3. (Optional) [Create resource groups to control access over certain resources](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) to control access over specific resources.
4. [Create user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).
5. [Assign roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users or user groups.
6. (Optional) [Configure authentication](https://developer.harness.io/docs/platform/authentication/authentication-overview), if not already done.

---

## Permissions & Resource Scopes

IDP 2.0 resources can be created at any scope—**Account**, **Organization**, or **Project**—and access is determined by the RBAC permissions configured at each level. You can use **predefined roles** or create **custom roles**, and organize permissions using **resource groups**. These follow the same model as the broader Harness RBAC framework.

| **Resource**   | **Permissions**                    | **Account Scope** | **Org Scope** | **Project Scope** | **Notes**                                                                             |
| -------------- | ---------------------------------- | ----------------- | ------------- | ----------------- | ------------------------------------------------------------------------------------- |
| **Catalog**    | View, Create/Edit, Delete          | ✅                 | ✅             | ✅                 | Core entities like **Component**, **API**, **Resource** can be managed at all scopes. |
| **Workflows**  | View, Create/Edit, Delete, Execute | ✅                 | ✅             | ✅                 | Workflows can be created and executed at all scopes.                                  |
| **Scorecards** | View, Create/Edit, Delete          | ✅                 | ❌             | ❌                 | Currently supported only at Account scope.                                            |
| **Layouts**    | View, Create/Edit                  | ✅                 | Partial             | Partial                 | Workflow Groups are supported at the Project and Org scopes. Other Layout functions are currently only supported at the Account scope.                                            |
| **Plugins**    | View, Create/Edit, Toggle, Delete  | ✅                 | ❌             | ❌                 | Only supported at the Account scope.                                                  |

## Configure RBAC for Account-Level Catalog Entity Creation

This example shows how to configure RBAC to allow full control over Catalog entity creation and modification at the **Account scope** (including all child resources).

In this example, we use:

* A custom role: **IDP Catalog Create**
* *(Optional)* A custom resource group: **All Catalog Create Resources**
* *(Optional)* A custom user group: **Catalog Create Users**

The **All Catalog Create Resources** group exists at the **Account scope** and provides **Create/Edit** access to all Catalog entities across the account, including all organizations and projects. The **IDP Catalog Create** role includes the **Create/Edit** permission for Catalog resources.

You can access **Administrative Settings** from your Harness UI directly using the sidenavbar.

<DocVideo src="https://app.tango.us/app/embed/1dcbc9e9-70f4-49e7-bbec-6a2c94c97ae7" title="Access Admin Settings" />
---

#### Step 1: Create the IDP Catalog Creator Role
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/d3160dfc-3011-462f-a877-da804d730609" title="Create the IDP Catalog Create Role" />
</TabItem>
<TabItem value="Step-by-step">
1. In Harness, go to **Account Settings** → **Roles** under the **Access Control** section.
2. Click **New Role** to create a new role.
3. Name the role **IDP Catalog Create**. (Optional: Add a description and tags.)
4. Click **Save**.
5. Under **Permissions → Developer Portal**, select:
   * **Catalog** → **Create/Edit**
6. Click **Apply Changes**.
</TabItem>
</Tabs>

> Learn more about roles: [Manage roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles) | [Permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/)

---

#### *(Optional)* Step 2: Create a custom Resource Group
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/e6962da9-989b-4885-b697-63c265b74d1d" title="Create the IDP Catalog Create Role" />
</TabItem>
<TabItem value="Step-by-step">
1. In Harness, go to **Account Settings** → **Resource Groups** under **Access Control**.
2. Click **New Resource Group**.
3. Name the group **All Catalog Create Resources**. (Optional: Select a color, description, and tags.)
4. Click **Save**.
5. For **Resource Scope**, choose **All (including all Organizations and Projects)**.
   This grants access to the selected resources across the account, including all orgs and projects.
   [More on Resource Scopes](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/#scopes-and-refinement)
6. For **Resources**, select **Specified**, and then add **Catalog** from the table.
7. Click **Save**.
</TabItem>
</Tabs>

> Learn more: [Manage resource groups](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups)

---

#### *(Optional)* Step 3: Create the "Catalog Create Users" User Group

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/42821be8-f647-4e2e-8cd1-c057051a3e15" title="Create the IDP Catalog Create Role" />
</TabItem>
<TabItem value="Step-by-step">
1. In Harness, go to **Account Settings** → **User Groups** under **Access Control**.
2. Click **New User Group**.
3. Name the group **Catalog Create Users**. (Optional: Add a description and tags.)
4. Under **Add Users**, select the users to include in this group.
5. Click **Save**.
</TabItem>
</Tabs>

> Learn more: [Manage user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) | [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users)

---

#### Step 4: Assign the Role and Resource Group to the User Group
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/cc01bb71-292b-4448-b1b7-9b04bc8a7f9a" title="Create the IDP Catalog Create Role" />
</TabItem>
<TabItem value="Step-by-step">
1. In Harness, go to **Account Settings** → **User Groups**.
2. Find the **Catalog Create Users** group and click **Manage Roles**.
3. Under **Role Bindings**, click **Add**.
4. For **Role**, select **IDP Catalog Create**.
5. For **Resource Group**, select **All Catalog Create Resources**.
6. Click **Apply**.
</TabItem>
</Tabs>

> Learn more: [Role binding](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#role-binding)

This setup configures RBAC so that users in the **Catalog Create Users** group have **Create/Edit** access to Catalog entities at the **Account scope**, as well as within all Organizations and Projects under the account.
