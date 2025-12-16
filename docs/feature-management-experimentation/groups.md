---
title: Groups
sidebar_position: 30
redirect_from:
  - /docs/feature-management-experimentation/management-and-administration/account-settings/groups
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="fme-split">
<TabItem value="fme" label="Harness FME">

import Groups from '/docs/platform/role-based-access-control/add-user-groups.md'

<Groups />

</TabItem>
<TabItem value="split" label="Split Legacy">

:::warning Migrated from Split?
This documentation describes the **Split legacy** User group experience.

If your organization is using Harness FME, user groups and the UI may differ. For more information, see [RBAC for Split Admins](/docs/feature-management-experimentation/split-to-harness/administering-migrated-account/#user-groups) and [Inviting an IT Colleague to Your New Harness Account](/docs/feature-management-experimentation/split-to-harness/invitation).
:::

A group is a convenient way to manage a collection of users in your account. Use groups to grant administrative controls and grant environment-, feature flag-, or segment-level controls.

## About default administrator group

When you set up Harness FME, the Administrators group is automatically created.  Administrators are the only users that can access advanced administrative features, e.g., account settings, traffic type setup, team management, environment setup, API tokens and integrations.

## Creating a group
 
To create a new group, do the following:

1. From the left navigation pane, click the **profile button** at the bottom, select **Admin settings** and then **Groups**.
2. Click **Add group**.
3. Enter a **Name** and **Description** for this group and click the **Create** button.

## Deleting a group

To delete a group, do the following:

From the left navigation pane, click the **profile button** at the bottom, select **Admin settings** and then **Groups**.
2. Click **Delete** and confirm you want to delete this group.
    
:::danger Deleting a group
Deleting a group is **permanent**.  If you are using the group to control edit rights for feature flag or segments, users in this group may no longer be able to edit those items if the group is deleted.
:::

## Modifying group membership
 
To edit a group's membership, do the following:

1. From the left navigation pane, click the **profile button** at the bottom, select **Admin settings** and then **Groups**.
2. Click the **Action** button and from the menu list, click **Edit** in the row for the group that you want to edit.
3. Add or remove users as desired and click the **Save** button.

</TabItem>
</Tabs>