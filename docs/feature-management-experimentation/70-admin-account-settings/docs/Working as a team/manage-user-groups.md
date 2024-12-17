---
title: Manage user groups
sidebar_label: Manage user groups
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020812952-Manage-user-groups </button>
</p>

A group is a convenient way to manage a collection of users in your account. Use groups to grant administrative controls and grant environment-, feature flag-, or segment-level controls.

# About default administrator group

When you set up Split, the Administrators group is automatically created.  Administrators are the only users that can access advanced administrative features, e.g., account settings, traffic type setup, team management, environment setup, API tokens and integrations.

# Creating a group
 
To create a new group, do the following:

1. From the left navigation pane, click the user's initials at the bottom, select **Admin settings** and then **Groups**.
2. Click **Add group**.
3. Enter a **Name** and **Description** for this group and click the **Create** button.

# Deleting a group

To delete a group, do the following:

From the left navigation pane, click the user's initials at the bottom, select **Admin settings** and then **Groups**.
2. Click **Delete** and confirm you want to delete this group.
    
:::warning[Deleting a group]
Deleting a group is **permanent**.  If you are using the group to control edit rights for feature flag or segments, users in this group may no longer be able to edit those items if the group is deleted.
:::

# Modifying group membership
 
To edit a group's membership, do the following:

1. From the left navigation pane, click the user's initials at the bottom, select **Admin settings** and then **Groups**.
2. Click the **Action** button and from the menu list, click **Edit** in the row for the group that you want to edit.
3. Add or remove users as desired and click the **Save** button.