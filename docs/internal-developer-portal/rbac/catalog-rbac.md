---
title: Catalog RBAC
description: Learn how to configure Catalog RBAC. 
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info For IDP 1.0 Customers
This RBAC guide is applicable **only to IDP 2.0 customers**, as the RBAC Harness platform hierarchy is available exclusively in IDP 2.0.
* To learn how to upgrade, refer to the [IDP 2.0 Upgrade Guide](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md).
* If you're using **IDP 1.0** and want to implement access control, please refer to the [Access Control Guide for IDP 1.0](#permissions--resource-scopes).
:::

With the release of **Granular RBAC in IDP 2.0**, you can now control access to your **Catalog entities**—i.e., you can restrict who can create and view these entities. Catalog entities can be created at all available scopes: **Account**, **Org**, or **Project**. To learn more about entities, permissions, and scopes, visit the [IDP 2.0 Data Model](/docs/internal-developer-portal/catalog/data-model.md).

:::tip For IDP 2.0 Customers
If you're using Harness IDP 2.0, please ensure you have reviewed the [IDP 2.0 Overview guide](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path.md) and are familiar with the key steps for [upgrading to IDP 2.0](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o.md). To enable IDP 2.0, you must raise a support ticket to activate the `IDP_2_0` feature flag for your account.
:::

## RBAC Workflow in Harness IDP

Before configuring RBAC for your Catalog entities, ensure you’ve reviewed the documentation on [Scopes](/docs/internal-developer-portal/rbac/scopes#scopes), [Permissions](/docs/internal-developer-portal/rbac/scopes#permissions--resources), and different [RBAC Components](/docs/internal-developer-portal/rbac/scopes#rbac-components).

Here’s the workflow for configuring RBAC in Harness IDP:

1. Go to your administrative settings and select the scope (**Account**, **Org**, or **Project**) at which you want to configure RBAC.
2. [Create roles with the desired permissions](/docs/platform/role-based-access-control/add-manage-roles.md#create-a-role).
   *Example: If you are configuring RBAC for Catalog entity creation, ensure the role has the **Create/Edit (Catalog)** permission enabled.*
3. [Create resource groups](/docs/platform/role-based-access-control/add-resource-groups.md#create-a-resource-group) to apply RBAC to a specific set of resources for the principal.
   *Example: To configure RBAC for Catalog entities, ensure the **Catalog** resource is added to the resource group.*
4. [Create user groups](/docs/platform/role-based-access-control/add-user-groups.md#create-user-groups-manually) and [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).
5. [Assign roles and resource groups](/docs/platform/role-based-access-control/rbac-in-harness#role-binding) to users or user groups.
6. If you haven’t already, [configure authentication](/docs/platform/authentication/authentication-overview.md).

## Permissions for Catalog Entities

All core Catalog entities (**Component**, **API**, **Resource**) fall under the **"Catalog"** resource category for RBAC. The following permissions can be configured when creating a custom role:

| **Permission**  | **Description**                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| **Create/Edit** | Allows users to create Catalog entities and modify their configuration.       |
| **View**        | Allows users to view Catalog entities but not create, modify, or delete them. |
| **Delete**      | Allows users to delete Catalog entities.                                      |

These permissions can be configured when [creating a custom role](/docs/platform/role-based-access-control/add-manage-roles/#create-a-role). Select the desired permissions based on the level of access you want to grant. To learn more, see [Manage Roles](/docs/platform/role-based-access-control/add-manage-roles).

<img width="850" alt="Image" src="https://github.com/user-attachments/assets/28bbaebe-a480-4141-b118-250c45771bc5" />

## Catalog RBAC Example

### Configure RBAC for Account-Level Catalog Entity Creation

This example shows how to configure RBAC to allow full control over Catalog entity creation and modification at the **Account scope** (including all child resources).

In this example, we use:

* A custom role: **IDP Catalog Create**
* *(Optional)* A custom resource group: **All Catalog Create Resources**
* *(Optional)* A custom user group: **Catalog Create Users**

The **All Catalog Create Resources** group exists at the **Account scope** and provides **Create/Edit** access to all Catalog entities across the account, including all organizations and projects. The **IDP Catalog Create** role includes the **Create/Edit** permission for Catalog resources.

You can access **Administrative Settings** from your Harness UI directly using the sidenavbar. 

<DocVideo src="https://app.tango.us/app/embed/1dcbc9e9-70f4-49e7-bbec-6a2c94c97ae7" title="Create the IDP Catalog Create Role" />

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
4. Under **Add Users**, select the users to include in this group.~
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