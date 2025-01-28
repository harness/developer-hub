---
title: Invite users and manage user permissions
sidebar_label: Invite users and manage user permissions
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/16432983870605-Invite-users-and-manage-user-permissions <br /> ✘ images still hosted on help.split.io </button>
</p>

Split supports three roles to give users different permission levels in the Split UI:

* **Viewer** - Users with the Viewer role are only allowed to view data and objects. They cannot modify any objects like feature flags or segments in the web console. 

* **Editor** - Users with the Editor role can modify objects like feature flags and segments. They also can approve or reject change requests.

* **Administrators** - Administrators have full permissions. They can view and modify all objects in the web console. They also participate in approval decisions and perform all administrative responsibilities. For example, they can create new users or manage groups. Administrators are also the only users that can create and manage API and SDK keys.

**Note: Administrators is a group that has been created for you. The first user in a new account is automatically added to the Administrators group. A user added to the Administrators group will have full administrator privileges, without regard for other role assignments.**

# Assigning user roles

The following sections explain how a user in the Administrators group can assign a role to other users.

## Assigning an Editor or Viewer Role when creating a user

A role is assigned when creating a new user as described below.

1. From the left navigation click the **user's initials** at the bottom and click the **Invite** menu item.
2. Assign the Editor or Viewer role by selecting the role in the User role menu list. The Editor role is selected by default.
3. Click the **Invite** button. The new user is created.

## Creating a new user in the Administrators group

A new user can be created in the Administrators group as described below.

1. From the left navigation click the **Invite** menu item.
2. Add the user to the Administrators group by typing 'Administrators' in the Group text box.
3. Click the **Invite** button. The new user is created.

## Changing permissions of existing users by assigning the Editor or Viewer role

The Editor or a Viewer role can be assigned to an existing user by following the steps below.

1. In the left navigation, click the **user's initials** at the bottom, select **Admin settings**, and click **Users**. A list of users appears.
2. Find the desired user and click **Edit**.
3. Select the desired role from the User role menu list.

   <p>
     <img src="https://help.split.io/hc/article_attachments/16432983379341" alt="restrict-user.png" />
   </p>

4. Click the **Save** button. The new role will be assigned to the user.

## Adding an existing user to the Administrators group

An existing user can be added to the Administrators group as described below.

1. In the left navigation, click the **user's initials** at the bottom and select **Admin settings**.
2. Click **Groups** and in the Action column, click **View** in the Administrators group.

   <p>
     <img src="https://help.split.io/hc/article_attachments/16432872334605" alt="add-users-to-group.png" />
   </p>

3. Select an existing user and click **Add member**. A new member is added.

   <p>
     <img src="https://help.split.io/hc/article_attachments/16432917628941" alt="add-as-admin.png" />
   </p>

# About object-level edit permissions

For a user that is not in the Administrators group, object-level edit permissions previously granted will no longer be honored once the user is switched to the Viewer role. In other words, even if the user still appears in object-level edit permissions (Feature flag, Segment, or Metric owners), Environment settings (in the list of editors and approvers), or Feature flag change requests (in the list of approvers), the user will only be able to view any of those objects, and will not be able to edit them.

# About audit logging

A change in the role assignment for a user (e.g. from Editor to Viewer) is tracked in the Admin audit logs (under Admin settings, Security). Viewing behavior of a Viewer user is not captured in audit logs.
