---
title: Manage users
description: Use Harness RBAC to manage users.
keywords:
  - users
  - manage users
  - rbac
  - role bindings
  - user groups
  - automated provisioning
  - scim
  - least privilege
tags:
  - rbac
  - access control
  - users
sidebar_position: 60
helpdocs_topic_id: hyoe7qcaz6
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

A Harness user is any individual registered with Harness with a unique email address. Users can be associated with multiple Harness accounts, and they can be in multiple user groups. You assign <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">roles</a> and <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">resource groups</a> directly to users, or they inherit them from <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">user groups</a>.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Import users and groups from your Identity Provider (IdP) through [automated provisioning](#use-automated-provisioning).
- [Add users manually](#add-users-manually) at the account, organization, or project scope.
- [Assign roles and resource groups](#assign-roles-and-resource-groups) to grant permissions and access.
- Review [role bindings](#view-role-bindings) and edit [direct](#edit-direct-assignments) and [inherited](#edit-inherited-assignments) assignments.
- [Delete users](#delete-users) from a Harness scope.

---

## Before you begin

Before you manage users, ensure you have the following:

- **User management permissions**: A role, such as **Account Admin**, that has <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permission</a> to invite and manage users.
- **Target scope access**: Access to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the user belongs, at the **Account**, **Organization**, or **Project** level.
- **Authentication method**: A configured <a href="/docs/platform/authentication/authentication-overview" target="_blank">authentication method</a>, which determines whether Harness sends invitation emails.

:::tip Recommendation
You can also create <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">service accounts</a> in Harness for programmatic access instead of individual user accounts.
:::

---

## Use automated provisioning

You can use automated provisioning to keep Harness users and groups in sync with your Identity Provider (IdP), including:

- <a href="/docs/platform/role-based-access-control/provision-users-with-okta-scim" target="_blank">Okta SCIM</a>
- <a href="/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim" target="_blank">Microsoft Entra ID SCIM</a>
- <a href="/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim" target="_blank">OneLogin SCIM</a>
- <a href="/docs/platform/role-based-access-control/just-in-time-user-provisioning/" target="_blank">Just-in-time provisioning</a>

When you use automated provisioning, users and user groups are imported from your IdP, and then you [assign roles and resource groups](#assign-roles-and-resource-groups) to the imported users and groups in Harness. For imported users and groups, you manage group metadata, group membership, and user profiles in your IdP, and you manage their role and resource group assignments in Harness. You can also create users and user groups directly in Harness, but any users or groups imported from your IdP must be managed in your IdP.

For example, if you use Okta as your IdP, you create a user group in Okta and assign users to that group in Okta. When the user group is first imported into Harness, the group and the group members are not associated with any roles or resource groups. You must assign roles and resource groups to the user group in Harness. The group members then inherit permissions and access from the role and resource group that is assigned to the user group.

---

## Add users manually

Add users manually when you do not use automated provisioning, or when you need to invite an individual outside your IdP sync.

You can add up to 50,000 users in paid plans. Free plans and Harness Community Edition accounts are limited to 1,500 users.

:::note
When a new user is added to a project, the user is automatically added to the `All Organization Users` user group of the parent organization. However, when a user is removed from a project, they are not removed from the `All Organization Users` user group of the parent organization.
:::

1. In Harness, navigate to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where you want to add the user.

   - To add a user at the **Account** scope, select **Account Settings**, and then select **Access Control**.
   - To add a user at the **Organization** scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   - To add a user at the **Project** scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **New User**.
3. In **Users**, enter the email address that the user will use to log in to Harness.

   You can add multiple users at once by entering multiple email addresses.

4. In **User Group(s)**, assign the user to one or more <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">user groups</a>.

   When assigned to a user group, the user inherits the [roles and resource groups](#assign-roles-and-resource-groups) assigned to that group.

   You can also assign roles and resource groups directly to individual users.

   Users are not required to belong to user groups. However, user groups make it easier to manage permissions and access. Instead of modifying each user individually, you can edit the permissions and access for the entire group at once.

5. In **Role**, assign roles and resource groups directly to the new user.

   If you selected any **User Groups**, the role and resource group assignments inherited from those groups *are not* listed in **Role**.

   If you did not select any user groups, you must select a role. Without a role, either direct or inherited from a user group, the user does not have any permissions or access in Harness.

6. Click **Apply**. Users receive a verification email at the addresses you entered. When the user logs in to Harness, the user creates a password, the email address is verified, and the user's name attribute is updated.

### Set default landing URL for invited users

Set a default landing URL to direct a new user to a specific page or dashboard when they first log in.

:::note
Currently, this feature is behind the feature flag `PL_PREFERENCE_LANDING_PAGE_URL`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

1. In the invitation form, enter the email addresses of the users you want to invite.

2. In the **Default Landing URL** field, specify the URL you want the invited user to be redirected to after they accept the invitation. For example, you set it to `https://app.harness.io/ng/account/<account-id>/module/ssca/projects` for the SCS homepage.

3. Send the invitation.

After the user accepts the invite and logs in, Harness redirects them to the specified URL.

### Update user preferences

Users update their own default landing URL from their profile settings, which overrides the URL set at invitation.

:::note
Currently, this feature is behind the feature flag `PL_PREFERENCE_LANDING_PAGE_URL`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

1. Sign in as the invited user.

2. Navigate to the user profile.

3. Select the **Preferences** tab.

4. Update the **Default Landing URL** to the desired page, such as `https://app.harness.io/ng/account/account/<account-id>/module/cf/home/projects` for the Feature Flags homepage.

5. Save the changes.

The next time the user logs in, Harness redirects them to the updated URL.

### Invitation emails

Whether a new user receives an invitation email depends on your authentication configuration. When you add a user, Harness checks your <a href="/docs/platform/authentication/authentication-overview" target="_blank">authentication method</a> and email invite preferences to determine if an email invitation should be sent:

- **Login via a Harness account or public OAuth providers**: The invited user gets an email invitation. The user is listed on **Pending Users** until the user accepts the invitation.
- **SAML, LDAP, or OAuth with `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` enabled**: Harness adds the user directly to the **Active Users** list and does not send an email to the user.
- **SAML, LDAP, or OAuth with `AUTO_ACCEPT_SAML_ACCOUNT_INVITES` enabled**: Harness adds the user directly to the **Active Users** list and sends a notification email to the user.
- **SAML, LDAP, or OAuth with both feature flags enabled**: `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` takes precedence over `AUTO_ACCEPT_SAML_ACCOUNT_INVITES`. Harness adds users directly to the **Active Users** list and does not send invitation emails.

---

## Assign roles and resource groups

Assign roles and resource groups when a user needs permissions and access in Harness. Users inherit roles and resource groups from <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">group membership</a>, or you assign roles and resource groups directly to individual users. Go to <a href="/docs/category/platform-access-control/rbac-in-harness#role-binding" target="_blank">RBAC in Harness: Role binding</a> for more information on assigning roles and resource groups.

To manage users in Harness, you need a role, such as **Account Admin**, that has <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permission</a> to manage users.

### Follow the principle of least privilege

Grant each user the minimum access and permissions necessary to complete their tasks, and nothing more. This is the principle of least privilege (PoLP).

RBAC is additive, so least privilege matters. The total expanse of a user or service account's permissions and access is the sum of all the roles and resource groups from all user groups they belong to, as well as any roles and resource groups assigned directly to them as an individual user or service account.

Harness includes some built-in roles and resource groups. To ensure the least privilege, consider:

- Being selective in the way you apply roles and resource groups.
- Creating your own roles and resource groups as needed for refined access control.

### View role bindings

Review role bindings to confirm which permissions a user holds and where each assignment originates.

1. In Harness, navigate to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the user exists.

   - To edit a user at the **Account** scope, select **Account Settings**, and then select **Access Control**.
   - To edit a user at the **Organization** scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   - To edit a user at the **Project** scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select the user you want to view.
3. Switch to the **Role Bindings** tab.
4. Select a <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">Scope</a>.

   - **All**: List role bindings across all scopes.
   - **Account only**: List role bindings only at the account scope.
   - **Organization only**: List role bindings in the scope of a specific organization, but not the projects under that organization.
   - **Organization and Projects**: List role bindings in the scope of a specific organization and all projects under that organization.

5. Review the role bindings.

   The **Assigned Through** column indicates the source of the role binding. Assignments are either **Direct** or inherited from a user group. If inherited, the user group name is listed.

   The **Assigned At** column indicates the scope at which the assignment was made. If assigned at an organization or project scope, the organization and project name are listed.

### Edit direct assignments

Edit direct assignments to change permissions for a single user without affecting any group. Use these steps to manage directly assigned role bindings.

1. In Harness, navigate to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the user exists.

   - To edit a user at the **Account** scope, select **Account Settings**, and then select **Access Control**.
   - To edit a user at the **Organization** scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   - To edit a user at the **Project** scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select the user you want to edit.
3. Switch to the **Role Bindings** tab.
4. Select **Manage Role Bindings**.
5. In **Role Bindings**, select **Add**, then select a <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">role</a> and a <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">resource group</a>. Repeat to add more role bindings.
6. To delete a role binding, select the **Delete** icon.
7. Click **Save**.

### Edit inherited assignments

Inherited assignments come from user groups, so you change them either through group membership or through the group's own role bindings. There are several ways to edit inherited role bindings:

- Edit group membership through an individual user's profile. This is best for changing group membership for a single user.
- <a href="/docs/platform/role-based-access-control/add-user-groups#edit-group-members" target="_blank">Edit membership in the user group's settings</a>, rather than editing each user individually. This is useful for adding and removing multiple users at once.
- <a href="/docs/platform/role-based-access-control/add-user-groups#assign-roles-and-resource-groups" target="_blank">Edit role bindings in the user group's settings</a>. Do this to change inherited role bindings without changing group membership.
- Edit group membership in your IdP. If you [use automated provisioning](#use-automated-provisioning), group membership is managed through your IdP.

To edit group membership through a user's profile:

1. In Harness, navigate to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the user exists.

   - To edit a user at the **Account** scope, select **Account Settings**, and then select **Access Control**.
   - To edit a user at the **Organization** scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   - To edit a user at the **Project** scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

2. Select the user you want to edit.
3. In the **Group Memberships** tab select a <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">Scope</a>.

   - **All**: List groups across all scopes.
   - **Account only**: List groups only at the account scope.
   - **Organization only**: List groups in the scope of a specific organization, but not the projects under that organization.
   - **Organization and Projects**: List groups in the scope of a specific organization and all projects under that organization.

4. Select **+ Add to a new User Group**, and then modify the user's group membership by selecting or deselecting groups accordingly.

   - To add the user to a group, search for and select the relevant group.
   - To remove the user from a group, search for and deselect the relevant group.

5. Click **Apply Selected**.

---

## Delete users

Delete a user to revoke their permissions and access in a Harness scope. Use these steps to delete a user from Harness.

If you [use automated provisioning](#use-automated-provisioning), user accounts are managed by your IdP. Delete or deactivate the user in your IdP to revoke their access to Harness.

When a user is deleted from an account and then added back, their permissions are not restored immediately. It takes 5 to 10 minutes for the user to inherit their previous permissions.

1. Make sure you have a role, such as **Account Admin**, that has <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permission</a> to manage users.
2. In Harness, navigate to the <a href="/docs/category/platform-access-control/rbac-in-harness#permissions-hierarchy-scopes" target="_blank">scope</a> where the user exists.

   - To delete a user at the **Account** scope, select **Account Settings**, and then select **Access Control**.
   - To delete a user at the **Organization** scope, navigate to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   - To delete a user at the **Project** scope, navigate to **Projects**, select the relevant project, and then select **Access Control**.

3. Locate the user you want to delete.
4. Select **More options** (&vellip;), and then select **Delete**.

---

## Related articles

- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage user groups</a>: Group users and manage their permissions in bulk.
- <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Manage roles</a>: Define the permissions you assign to users.
- <a href="/docs/platform/role-based-access-control/manage-resource-groups" target="_blank">Manage resource groups</a>: Control which resources a user can access.
- <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">Manage service accounts</a>: Set up programmatic access instead of individual user accounts.
