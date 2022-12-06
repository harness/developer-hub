---
title: Add and Manage Users
description: This document shows steps to create a new user.
# sidebar_position: 2
helpdocs_topic_id: hyoe7qcaz6
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

A Harness User is any individual registered with Harness with a unique email address. A User can be a part of multiple Accounts.

This topic will explain the steps to create and manage Users within Harness.

### Before you begin

* Make sure you have **Manage** Permissions for Users.

### Step: Add New User

You must first invite Users to your Account/Org/Project to add them to User Groups and assign Role Bindings accordingly. For more information on User Groups and Role Bindings, see [Add and Manage User Groups](./4-add-user-groups.md) and [Role Assignment](./1-rbac-in-harness.md#role-assignment).

Click **Account Settings**, and click **Access Control**.

Click **New User** in **Users**. The New User settings appear.

![](./static/add-users-11.png)
Enter the email address(es) that the User will use to log into the Harness platform.

If you have Roles and Resource Groups defined, select the Roles and Resource Groups for this user. To add Roles and Resource Groups, see [Add Roles](./9-add-manage-roles.md) and [Add Resource Groups](./8-add-resource-groups.md).

Click **Save**. The user will receive a verification email at the address(es) you provided. When the user logs into Harness, the user creates a password, the email address is verified, and the user name is updated.

You can add up to 50000 users in Harness Non-Community Edition.

#### User invites

For any new user that you add to your Harness Account, Org, or Project, Harness checks the following and sends invites accordingly:

1. If your authentication mechanism is set to **Login via a Harness Account or Public OAuth Providers**, the invited user gets an email invitation. The user is added to the **Pending Users** list until the user accepts the invitation.
2. If your authentication mechanism is set to SAML, LDAP, or OAuth, and the feature flag `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled, Harness adds the invited user to the Active Users list.  
Harness does not send any emails to the user when this feature flag is enabled.
3. If your authentication mechanism is set to SAML, LDAP, or OAuth, and the feature flag `AUTO_ACCEPT_SAML_ACCOUNT_INVITES` is enabled, Harness sends a notification email to the user and adds the user to the Active Users list.

If you enable both feature flags, the feature flag`PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` takes precedence over the feature flag`AUTO_ACCEPT_SAML_ACCOUNT_INVITES`. Harness does not send any emails to users.

### Step: Delete User

Click **Users** under **Access** **Control**.

Click **Delete** on the top right corner to delete a specific user.

![](./static/add-users-12.png)
### Step: Manage User

To edit Role Bindings for a User, do the following:

 In **Access Control**, click **Users.**

Click on the user you want to edit. The user details appear.

![](./static/add-users-13.png)
Click **Delete** on the right to remove a User Group.

Click **Role** to change Role Bindings for this User.

#### Group Memberships

You can view the group membership of a specific user on the user details page by clicking **Group Memberships**.

![](./static/add-users-14.png)
Harness lets you select one of the following scopes to view the user's group membership:

* **All**: lists the user's group membership across all the scopes.
* **Account only**: lists the user's group membership only in the Account scope.
* **Organization** **only**: lists the user's group membership in the scope of the selected Organization.
* **Organization and Projects**: lists the user's group membership in the scope of the selected Organization and Project.

To add the user to a new user group, click **Add to a new User Group**.

Click **Remove** to remove the user as a member from a specific user group.

![](./static/add-users-15.png)
#### Role Bindings

You can view the role bindings for a specific user on the user details page by clicking **Role Bindings**.

Here, you can view a given user's role bindings across all scopes and user groups.

![](./static/add-users-16.png)
Harness lets you select one of the following scopes to view the user's role bindings:

* **All**: lists the user's role bindings across all the scopes.
* **Account only**: lists the user's role bindings only in the Account scope.
* **Organization** **only**: lists the user's role bindings in the scope of the selected Organization.
* **Organization and Projects**: lists the user's role bindings in the scope of the selected Organization and Project.

To add a new role binding for a user, click **Role**.

### See also

* [Add and Manage User Groups](./4-add-user-groups.md)
* [Add and Manage Roles](./9-add-manage-roles.md)
* [Add and Manage Resource Groups](./8-add-resource-groups.md)
* [Permissions Reference](./ref-access-management/permissions-reference.md)

