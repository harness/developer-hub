---
title: Manage service accounts
description: Create, edit, and delete Harness service accounts, and assign role bindings that API keys inherit for programmatic access.
keywords:
  - service account
  - api key
  - api token
  - role binding
  - rbac
  - programmatic access
  - access control
  - permissions
tags:
  - rbac
  - access-control
  - automation
sidebar_position: 70
helpdocs_topic_id: e5p4hdq6bd
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Service accounts are similar to <a href="/docs/platform/role-based-access-control/add-users" target="_blank">users</a> in Harness, but they are not associated with a human user. You assign <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">roles</a> and <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">resource groups</a> to a service account, and then you create <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">API keys</a> for it. Those API keys authenticate and authorize remote services that perform operations in Harness through Harness APIs, and they inherit the <a href="/docs/platform/role-based-access-control/rbac-in-harness#role-binding" target="_blank">role bindings</a> assigned to the service account.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Create a service account](#create-a-service-account) at any scope and assign its role bindings.
- [Manage API keys](#manage-api-keys) and tokens that inherit the service account permissions.
- [Edit a service account](#edit-a-service-account) to change its name, description, tags, or role bindings.
- [Delete a service account](#delete-a-service-account) that is no longer required.

---

## Before you begin

Before you create and manage service accounts, ensure you have the following:

- **Harness account access**: A role such as **Account Admin** with view, create or edit, manage, and delete <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions</a> for service accounts.
- **Target scope access**: Access to the <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the service account belongs. You can create service accounts at all scopes.
- **RBAC familiarity**: An understanding of how roles and resource groups combine into role bindings. For more information, see <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>.

---

## Create a service account

You can create a service account when a remote service, script, or integration needs to call Harness APIs without requiring a human user. The service account holds the role bindings, and every API key you generate under it inherits those permissions.

1. In Harness, navigate to the <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where you want to add the service account.

   * To add a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To add a service account at the organization scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To add a service account at the project scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Click **New Service Account**.
4. Enter a **Name** and **Email** for the service account.
5. Click **Save**.
6. Select **Manage Roles** next to the new service account.
7. Click **Add**, and then select a <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">role</a> and a <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">resource group</a>. Repeat until you have configured all necessary <a href="/docs/platform/role-based-access-control/rbac-in-harness#role-binding" target="_blank">role bindings</a> for the service account.

---

## Manage API keys

Create API keys after you create a service account, because the API keys derive their permissions from the service account. Grant the service account the necessary role bindings first, otherwise API calls made with the token fail authorization.

To generate credentials, <a href="/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens" target="_blank">create API keys and tokens</a> for the service account. These tokens authenticate and authorize remote services that perform operations in Harness through Harness APIs, and they inherit the role bindings assigned to the service account.

For more information, see the <a href="/docs/platform/automation/api/api-permissions-reference#service-accounts" target="_blank">API permissions reference</a>.

---

## Edit a service account

You can change the name, description, tags, and role bindings, but the **Id** and **Email** are fixed after creation.

1. In Harness, navigate to the <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the service account exists.

   * To edit a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a service account at the organization scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a service account at the project scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Locate the service account you want to edit.
4. Click the **More** icon (&vellip;).
5. Select **Edit** to change the **Name**, **Description**, or **Tags**. You cannot edit the **Id** or **Email**.
6. Select **Edit Role Bindings** to change the roles and resource groups assigned to the service account.

---

## Delete a service account

You can delete a service account when the integration that used it is obsolete. This way, its tokens can no longer authenticate against Harness APIs. Deleting the service account invalidates the API keys and tokens created under it.

1. In Harness, navigate to the <a href="/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the service account exists.

   * To delete a service account at the account scope, select **Account Settings**, and then select **Access Control**.
   * To delete a service account at the organization scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To delete a service account at the project scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **Service Accounts** in the header.
3. Locate the service account you want to delete.
4. Click the **More** icon (&vellip;), and then select **Delete**.

---

## FAQ

<details>
<summary>Can a service account created at the project scope be assigned permissions to access an account-level resource?</summary>

No. A service account created at the project scope cannot be granted access to account-level resources. Instead, create an account-level service account and then provide project-level role bindings for it that correspond to the project. You can also provide role bindings for account-level templates.

</details>

<details>
<summary>How long is a service account token valid?</summary>

The validity depends on how you create the token. If you specify an expiry date, the token expires on that date. If you want the token to never expire, select the **No Expiration** option.

</details>

<details>
<summary>Can you identify which service account a token belongs to by looking at the token?</summary>

No. There is no way to determine the associated service account from a service account token such as `sat.w8EaJoerQcqqkZwcb...` by inspecting the token itself.

</details>

<details>
<summary>How do service account tokens differ from personal access tokens?</summary>

Personal access tokens are created at the user profile level and are prefixed with `pat.`, while service account tokens are created at the service account level and are prefixed with `sat.`. Harness does not assign permissions directly to tokens. A token inherits permissions from the user or the service account under which it was created.

</details>

---

## Related articles

- <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a>: Create, rotate, and delete API keys and tokens for a service account.
- <a href="/docs/platform/role-based-access-control/heirarchichal-support-for-service-accounts" target="_blank">Hierarchical support for service accounts</a>: Inherit account-level service accounts in organizations and projects.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>: Understand scopes, principals, roles, resource groups, and role bindings.
- <a href="/docs/platform/automation/api/api-permissions-reference" target="_blank">API permissions reference</a>: Review the permissions available to API keys and service accounts.
