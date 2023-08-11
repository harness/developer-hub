---
title: Manage service accounts
description: Steps to add and manage Service Account.
sidebar_position: 70
helpdocs_topic_id: e5p4hdq6bd
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Service accounts are similar to [users](./add-users.md) in Harness, but service accounts aren't associated with a human user. You assign [roles](./add-manage-roles.md) and [resource groups](./add-resource-groups.md) to service accounts, and then you create [API keys](/docs/platform/Resource-Development/APIs/add-and-manage-api-keys) for the service account. These API keys are used to authenticate and authorize remote services attempting to perform operations in Harness through Harness APIs. The API keys inherit the [role bindings](./rbac-in-harness.md#role-binding) assigned to the service account.

You can create service accounts at all [scopes](./rbac-in-harness.md#permissions-hierarchy-scopes).

To manage service accounts in Harness, you need a role, such as **Account Admin**, that has [permission](./permissions-reference.md) to view, create/edit, manage, and delete service accounts.

## Create a service account

1. In Harness, go to the [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) where you want to add the service account.

   * To add a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To add a service account at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To add a service account at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Select **New Service Account**.
4. Enter a **Name** and **Email** for the service account.
5. Select **Save**.
6. Select **Manage Roles** next to the new service account.
7. Select **Add**, and then select a [role](./add-manage-roles.md) and [resource group](./add-resource-groups.md). Repeat until you have configured all necessary [role bindings](./rbac-in-harness.md#role-binding) for the service account.

## Manage API keys

After creating a service account, you [create API keys and tokens](/docs/platform/Resource-Development/APIs/add-and-manage-api-keys#create-service-account-api-keys-and-tokens) for that service account. These tokens are used to authenticate and authorize remote services attempting to perform operations in Harness through Harness APIs. The API keys and tokens inherit the role bindings assigned to the service account.

For more information about API permissions go to the [API permissions reference](/docs/platform/Resource-Development/APIs/api-permissions-reference#service-accounts).

## Edit a service account

Use these steps to edit a service account's role bindings, name, description, or tags.

1. In Harness, go to the [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) where the service account exists.

   * To edit a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a service account at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a service account at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Locate the service account you want to edit.
4. Select **More options** (&vellip;).
5. Select **Edit** to edit the **Name**, **Description**, or **Tags**. You can't edit the **Id** or **Email**.
6. Select **Edit Role Bindings** to edit the service account's assigned roles and resource groups.

## Delete a service account

1. In Harness, go to the [scope](./rbac-in-harness.md#permissions-hierarchy-scopes) where the service account exists.

   * To delete a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To delete a service account at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To delete a service account at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Locate the service account you want to edit.
4. Select **More options** (&vellip;), and select **Delete**.
