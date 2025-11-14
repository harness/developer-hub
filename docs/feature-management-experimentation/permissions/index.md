---
title: Permissions
sidebar_position: 1
id: index
slug: /feature-management-experimentation/permissions
redirect_from:
  - /docs/feature-management-experimentation/management-and-administration/fme-settings/permissions/
---

Permissions in Harness FME determine who can manage feature flags and related resources, whether access is governed by Harness RBAC or upheld through legacy restrictions during migration.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="split-harness-users">
<TabItem value="harness-fme" label="Harness FME">

## Environment-level permissions

With Harness RBAC, all environment-level edit permissions can be controlled through RBAC Resource Groups and Roles. For more information, see [Harness RBAC in FME](/docs/feature-management-experimentation/permissions/rbac).

If you are using a Split Legacy account and using permissions, see [Permissions Enforcement](/docs/feature-management-experimentation/permissions/enforcement) to understand how Harness RBAC combines with Split Legacy permissions.

To combine edit restrictions with approval flows, you can set environment change approvals. For more information, see [Approval flows](/docs/feature-management-experimentation/feature-management/setup/approval-flows) and [Environments](/docs/feature-management-experimentation/environments#navigate-environments).

</TabItem>
<TabItem value="split-migrated-existing" label="Split Legacy">

Administrators can control who can edit and configure feature flags and segments across an environment using environment-level permissions. You can set the change permissions for an environment to limit categories of actions to administrators, individual users, or groups. Groups make it easy to create a collection of users with shared permissions. Use permissions to:

* Limit access to production environments: For example, for security compliance or per company requirements, you can limit edit access in production to an authorized group of individuals.
* Limit access by teams: For example, for improved usability, you can limit edit access for different teams that only need access to certain environments.

## Setting environment level permissions

An environment has the following three permission settings that you can set:

* Anyone can edit
* Restrict who can edit
* Require approvals for changes

To set up permissions, do the following:

1. From the left navigation, click **FME Settings**. The Projects page displays.
2. In the desired project, click **View** in the Actions column. The project page with any associated environments appears.
3. In the Environments tab, select the desired environment by clicking **Edit** in the Actions column. The Edit environment page appears. 
   
   ![](./static/edit-env.png)

4. Fill in the fields as follows:
    * In the Name field, enter a name.
    * In the Environment type area, select an environment type.
    * In the Change permissions area, set the following permissions:
   
     **Anyone can edit**

     By default, all environments are set to allow anyone to edit. When this setting is selected for an environment, any user can make changes to feature flags, segments, and metrics in this environment. Users can also set per flag and segment change permissions in this environment. Set up any permission levels as follows:
        1. Go to the feature flag, segment, or metric.
        2. Select the environment that you want to enable permissions in.
        3. Select the Editing menu and click the **Restrict who can edit** radio button.
        4. Select additional users or groups as editors.
        5. Click **Apply**.
  
        When setting change permissions for a particular flag or segment in an environment, the owners and the user making the change are automatically added as editors, along with the account's administrators.

     **Restrict who can edit**

     With this setting, you can select any groups or users to be editors for feature flags and segments in this environment. In an environment where change permissions are set to Restrict who can edit, only those added as editors can do the following:

        * Add a feature flag definition to the environment.
        * Edit an existing flag definition (including the kill or restore functionality).
        * Delete a flag.
        * Add a segment definition to the environment.
        * Edit an existing segment.
        * Delete a segment.
        * Add additional editors.

     Editors can still add more editors to individual feature flags and segments in this environment. 

     **Require approvals for changes**

      With this setting, you can select the following:
        * **Let submitters choose their approvers.** Let submitters choose their approvers. Allows users in the admin's account to select at least one other user to review and approve their changes. You can:
        * **Allow KILLs without approvals.** Allows anyone with access to the environment to KILL a feature flag without additional approvals.
        * **Allow administrators to skip approvals.** Specifically applies to editing feature flags and segments and only gives the Admins access to make updates without approval. All other users need to submit an approval for change.
        * **Restrict who can approve.** An admin can select any groups, users, or API keys to be approvers for feature flags and segments in this environment. All changes to flags and segments in this environment require approval, but they are all submitted to the group you select. You can:
        * **Allow KILLs without approvals.** Allows anyone with access to the environment to KILL a feature flag without additional approvals.
        * **Allow administrators to skip approvals.** Specifically applies to editing feature flags and segments and only gives the Admins access to make updates without approval. All other users need to submit an approval for change. 
    
      :::info[note] 
      For either option, you can check Allow kills without approval which allows users to kill a feature flag without submitting for approval. If Allow kills without approval is not selected, then admins still need to go through the KILL and restore approvals in the same environment, even if Allow Admins to skip approval is selected.
      :::

      For more information about allowing admins to skip approvals, refer to Skipping administrators approval flow section later in this guide.

      **Data export permissions**
      
    With this setting, you can select the following:
        * **Anyone can export.** Allows anyone to export data on Data hub.
        * **Restrict who can export.** Allows you to restrict who can export data. You can add additional groups or users you want to have export access and add an exporter type.

5. Click **Save** to save your changes.

## Allowing administrators to skip approval 

You can optionally specify if admins can skip an approval flow for specific environments when feature flags and segments need updating. This prevents delays in necessary changes to feature flags and segments that need to quickly occur and remove adoption blockers. To set this up, do the following:

1. From the left navigation pane, click the **profile button** at the bottom, then select **Admin settings**. The Admin settings view appears.
2. In the Projects page, click **View** to view the desired project.
3. In the Environments tab, click **Edit** in the Actions column on the environment you want to update. The Edit environment page appears.
4. In the Change permissions section, select the **Allow Administrators to skip approval** checkbox.
5. Click **Save**. The new setting is saved.

</TabItem>
</Tabs>
