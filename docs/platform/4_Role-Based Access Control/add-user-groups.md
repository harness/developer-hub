---
title: Add and Manage User Groups
description: This document shows steps to create new user groups and assign roles to them.
# sidebar_position: 2
helpdocs_topic_id: dfwuvmy33m
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness User Groups help you manage user access. Each member of a User Group inherits the [role bindings](/article/vz5cq0nfg2-rbac-in-harness#role_assignment) assigned to that group.

This topic explains the steps to create and manage User Groups within Harness.

In this topic:

* [Before You Begin](/article/dfwuvmy33m-add-user-groups#before_you_begin)
* [Add New User Group](/article/dfwuvmy33m-add-user-groups#add_new_user_group)
* [Delete User Group](/article/dfwuvmy33m-add-user-groups#step_delete_user_group)
* [Manage User Group](/article/dfwuvmy33m-add-user-groups#step_manage_user_group)
* [Option: Notification Preferences](/article/dfwuvmy33m-add-user-groups#option_notification_preferences)
* [See Also](/article/dfwuvmy33m-add-user-groups#see_also)

### Before You Begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)
* [Access Management (RBAC) Overview](/article/vz5cq0nfg2-rbac-in-harness)
* Make sure you have **Manage** Permissions for User Groups.

### Step: Add New User Group

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization).

You can add a User Group in Project/Organization/Account scope. To do this, go to Project SETUP, Organization, or Account Resources.

In your **Project/Org/****Account**, and click **Project/Org/Account SETUP**.

Click **Access Control**.

In **User Groups** click **New User** **Group****.** The New User Group settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/hyoe7qcaz6/1620650358109/screenshot-2021-05-10-at-6-08-00-pm.png)Enter a **Name** for your **User Group**.

Enter **Description** and [**Tags**](/article/i8t053o0sq) for your **User Group**.

Select Users under **Add Users**.

Click **Save**.

Your User Group is now listed under User Groups. You can assign Roles to your User Group by clicking on **Role**.

### Step: Delete User Group

Click **User Groups** under **Access** **Control**.

Click **Delete** on the top right corner for the User Group you want to delete.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1620748201889/screenshot-2021-05-11-at-9-18-57-pm.png)### Step: Manage User Group

Click the **User Groups** in **Access Control**.

Click the User Group you want to edit. The User Group details appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1620783514596/screenshot-2021-05-11-at-9-28-49-pm.png)Click **Members** to invite Users to this Group.

Click **Remove** to delete User from this Group.

Click **Role** to change Role Bindings for this User Group.

### Step: Assign Roles

Harness lets you inherit User Groups created at a higher scope by using **Assign Roles**. For example, you can inherit and use User Group(s) created at the Account scope in the Org or Project scope.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1654501769451/screenshot-2022-06-06-at-12-01-40-pm.png)To inherit the User Group at the child scope, you must have view User Group permissions at the parent scope and manage User Group permissions at the child scope.​​You can modify the inherited User Group's role bindings in the child scope, but not the member or notification settings. Changes to the User Group in the parent scope will be reflected in the child scope as well.​

You can inherit a User Group from any parent scope to a child scope.

This topic shows you how to inherit a User Group from the Account scope to the Project scope.

In Harness, go to your Project and click **Access Control** in **Project Setup**.

Click **User Groups**.

Click **Assign Roles**. The Assign Roles settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1654511773291/screenshot-2022-06-06-at-4-05-48-pm.png)In User Group(s), click **Select User Group(s)**. All the User Group(s) that you have permission to view across the scopes are listed.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1654512010443/screenshot-2022-06-06-at-4-08-36-pm.png)Select the User Group(s) that you want to inherit from any of the parent scopes to your Project. Click **Apply Selected**.

Click **Add** to assign Roles and Resource Groups to this User Group in your Project scope.

Select **Roles** and **Resource Groups** and click **Apply**.

The User Group is now listed in User Groups.

You can get the list of child scopes where the User Group is inherited by clicking on the User Group at the parent scope.

![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1654582159631/screenshot-2022-06-07-at-11-36-07-am.png)### Option: Notification Preferences

You can set notification channels for your User Group members using **Notification Preferences**.

When the User Group is assigned an Alert Notification Rule, the channels you set here will be used to notify them.

To add notification preferences to Harness User Groups, perform the following steps:

1. In your **Account**/**Organization**/**Project** click Access Control.
2. Click **User Groups**.
3. Select the User Group to which you want to add notification preferences.
4. In **Notification Preferences**, click **Channel**.
5. Configure one or more notification settings from the following options and click **Save:**
	* **Email/Alias** – Enter any group email addresses where Harness can send notifications. For more details, see [Send Notifications Using Email](/article/d43r71g20s-add-smtp-configuration#option_send_notifications_for_a_user_group_using_email).
	* **Slack Webhook URL** – Enter the Slack channel Incoming Webhook URL. For more details, see [Send Notifications Using Slack](/article/h5n2oj8y5y).
	* **PagerDuty Integration Key** – Enter the key for a PagerDuty Account/Service to which Harness can send notifications. You can copy/paste this key from **Integrations** of your service in **Services** > **Service Directory.**![](https://files.helpdocs.io/i5nl071jo5/articles/dfwuvmy33m/1638194176394/screenshot-2021-11-29-at-7-24-29-pm.png)
	* **Microsoft Teams Webhook URL** - Enter the Microsoft Teams Incoming Webhook URL.

### See Also

* [Add and Manage Users](/article/hyoe7qcaz6-add-users)
* [Harness Default User Groups](/article/n3cel7d8re-harness-default-user-groups)
* [Add and Manage Roles](https://ngdocs.harness.io/article/tsons9mu0v-add-roles)
* [Add and Manage Resource Groups](https://ngdocs.harness.io/article/yp4xj36xro-add-resource-groups)
* [Permissions Reference](/article/yaornnqh0z-permissions-reference)

