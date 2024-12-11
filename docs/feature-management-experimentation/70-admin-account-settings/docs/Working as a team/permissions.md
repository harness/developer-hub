---
title: Permissions
sidebar_label: Permissions
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020579052-Permissions <br /> ✘ images still hosted on help.split.io </button>
</p>

In the Split application, you can enable permissions by environment, feature flags, segment, or metric, which limits the actions that non-editors can take.

Administrators can control who can edit and configure feature flags and segments across an environment using environment-level permissioning. You can set the change permissions for an environment to limit categories of actions to administrators, individual users, or groups. Groups make it easy to create a collection of users with shared permissions. Use permissions to:

* Limit access to production environments: For example, for security compliance or per company requirements, you can limit edit access in production to an authorized group of individuals.
* Limit access by teams: For example, for improved usability, you can limit edit access for different teams that only need access to certain environments.

# Setting environment level permissions

An environment has the following three permission settings that you can set:

* Anyone can edit
* Restrict who can edit
* Require approvals for changes

To set up permissions, do the following:

1. From the left navigation, click the **user's initials** at the bottom and then **Admin settings**. The Projects page displays.
2. In the desired project, click **View** in the Actions column. The project page with any associated environments appears.
3. In the Environments tab, select the desired environment by clicking **Edit** in the Actions column. The Edit environment page appears. 

  <p>
      <img src="https://help.split.io/hc/article_attachments/30801270751629" alt="permissions.png" />
  </p>

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

        **Note: The administrators group is always added as an editor when permissions are enabled, both at the environment level or at the feature flag, segment, and metric levels.**

     **Restrict who can edit**

     With this setting, you can select any groups or users to be editors for feature flags and segments in this environment. In an environment where change permissions are set to Restrict who can edit, only those added as editors can do the following:

        * Add a feature to the environment.
        * Edit an existing flag definition (including the kill or restore functionality).
        * Delete a flag.
        * Add a segment to the environment.
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
    
     **Note: For either option, you can check Allow kills without approval which allows users to kill a feature flag without submitting for approval. If Allow kills without approval is not selected, then admins still need to go through the KILL and restore approvals in the same environment, even if Allow Admins to skip approval is selected.**

      For more information about allowing admins to skip approvals, refer to Skipping administrators approval flow section later in this guide.

      **Data export permissions**
    With this setting, you can select the following:
        * **Anyone can export.** Allows anyone to export data on Data hub.
        * **Restrict who can export.** Allows you to restrict who can export data. You can add additional groups or users you want to have export access and add an exporter type.

5. Click **Save** to save your changes.

# Allowing administrators to skip approval 

You can optionally specify if admins can skip an approval flow for specific environments when feature flags and segments need updating. This prevents delays in necessary changes to feature flags and segments that need to quickly occur and remove adoption blockers. To set this up, do the following:

1. From the left navigation pane, click the **user's initials** at the bottom, then select **Admin settings**. The Admin settings view appears.
2. In the Projects page, click **View** to view the desired project.
3. In the Environments tab, click **Edit** in the Actions column on the environment you want to update. The Edit environment page appears.
4. In the Change permissions section, select the **Allow Administrators to skip approval** checkbox.
5. Click **Save**. The new setting is saved.

:::info
**Note: The administrators group is always added as an editor when permissions are enabled, both at the environment level or at the feature flag, segment, and metric level.**
:::
