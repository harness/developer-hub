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

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* Make sure you have **Manage** Permissions for Users.

### Step: Add new user

You must first invite Users to your Account/Org/Project to add them to User Groups and assign Role Bindings accordingly. For more information on User Groups and Role Bindings, see [Add and Manage User Groups](../4_Role-Based-Access-Control/3-add-user-groups.md) and [Role Assignment](../4_Role-Based-Access-Control/1-rbac-in-harness.md#role-assignment).

Click **Account Settings**, and click **Access Control**.

Click **New User** in **Users****.** The New User settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/hyoe7qcaz6/1656052187531/screenshot-2022-06-24-at-11-59-11-am.png)Enter the email address(es) that the User will use to log into the Harness platform.

If you have Roles and Resource Groups defined, select the Roles and Resource Groups for this user. To add Roles and Resource Groups, see [Add Roles](../4_Role-Based-Access-Control/7-add-manage-roles.md) and [Add Resource Groups](../4_Role-Based-Access-Control/6-add-resource-groups.md).

Click **Save**. The user will receive a verification email at the address(es) you provided. When the user logs into Harness, the user creates a password, the email address is verified, and the user name is updated.

You can add up to 50000 users in Harness Non-Community Edition.#### User invites

For any new user that you add to your Harness Account, Org, or Project, Harness checks the following and sends invites accordingly:

1. If your authentication mechanism is set to **Login via a Harness Account or Public OAuth Providers**, the invited user gets an email invitation. The user is added to the **Pending Users** list until the user accepts the invitation.
2. If your authentication mechanism is set to SAML, LDAP, or OAuth, and the feature flag `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled, Harness adds the invited user to the Active Users list.  
Harness does not send any emails to the user when this feature flag is enabled.
3. If your authentication mechanism is set to SAML, LDAP, or OAuth, and the feature flag `AUTO_ACCEPT_SAML_ACCOUNT_INVITES` is enabled, Harness sends a notification email to the user and adds the user to the Active Users list.

If you enable both feature flags, the feature flag`PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` takes precedence over the feature flag`AUTO_ACCEPT_SAML_ACCOUNT_INVITES`. Harness does not send any emails to users.### Step: Delete User

Click **Users** under **Access** **Control**.

Click **Delete** on the top right corner to delete a specific user.

![](https://files.helpdocs.io/i5nl071jo5/articles/hyoe7qcaz6/1620718285184/screenshot-2021-05-11-at-12-59-24-pm.png)### Step: Manage User

To edit Role Bindings for a User, do the following:

 In **Access Control**, click **Users.**

Click on the user you want to edit. The user details appear.

![](https://files.helpdocs.io/kw8ldg1itf/articles/hyoe7qcaz6/1665553064148/screenshot-2022-10-12-at-11-06-14-am.png)Click **Delete** on the right to remove a User Group.

Click **Role** to change Role Bindings for this User.

#### Group memberships

You can view the group membership of a specific user on the user details page by clicking **Group Memberships**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/hyoe7qcaz6/1665558035167/screenshot-2022-10-12-at-12-30-07-pm.png)Harness lets you select one of the following scopes to view the user's group membership:

* **All**: lists the user's group membership across all the scopes.
* **Account only**: lists the user's group membership only in the Account scope.
* **Organization** **only**: lists the user's group membership in the scope of the selected Organization.
* **Organization and Projects**: lists the user's group membership in the scope of the selected Organization and Project.

To add the user to a new user group, click **Add to a new User Group**.

Click **Remove** to remove the user as a member from a specific user group.

![](https://files.helpdocs.io/kw8ldg1itf/articles/hyoe7qcaz6/1665640015223/screenshot-2022-10-13-at-10-14-35-am.png)#### Role Bindings

You can view the role bindings for a specific user on the user details page by clicking **Role Bindings**.

Here, you can view a given user's role bindings across all scopes and user groups.

![](https://files.helpdocs.io/kw8ldg1itf/articles/hyoe7qcaz6/1665558792167/screenshot-2022-10-12-at-12-40-52-pm.png)Harness lets you select one of the following scopes to view the user's role bindings:

* **All**: lists the user's role bindings across all the scopes.
* **Account only**: lists the user's role bindings only in the Account scope.
* **Organization** **only**: lists the user's role bindings in the scope of the selected Organization.
* **Organization and Projects**: lists the user's role bindings in the scope of the selected Organization and Project.

To add a new role binding for a user, click **Role**.

### See also

* [Add and Manage User Groups](../4_Role-Based-Access-Control/3-add-user-groups.md)
* [Add and Manage Roles](../4_Role-Based-Access-Control/7-add-manage-roles.md)
* [Add and Manage Resource Groups](../4_Role-Based-Access-Control/6-add-resource-groups.md)
* [Permissions Reference](../4_Role-Based-Access-Control/ref-access-management/permissions-reference.md)

