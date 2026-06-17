---
title: Manage user groups
description: User groups are part of RBAC in Harness.
sidebar_position: 50
redirect_from:
- /docs/platform/role-based-access-control/rbac-in-harness#split-manage-permissions
helpdocs_topic_id: dfwuvmy33m
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---


User groups contain multiple Harness users. You assign [roles](/docs/platform/role-based-access-control/add-manage-roles) and [resource groups](/docs/platform/role-based-access-control/add-resource-groups) to user groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members.

You can also assign roles and resource groups to individual users that are not in a group. However, user groups help keep your RBAC organized and make it easier to manage permissions and access. Instead of modifying each user individually, you can edit the permissions and access for the entire group at once.

Harness includes some [built-in user groups](#built-in-user-groups), and you can [create user groups manually](#create-user-groups-manually), through [inheritance](#create-roles-by-inheritance-assign-roles), or through [automated provisioning](#use-automated-provisioning). You can create user groups at all [scopes](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

## Built-in user groups

Harness has a built-in user group at each [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes). This group is called **All Project Users**, **All Organization Users**, or **All Account Users**, depending on the scope. By default, users within a particular scope are in the **All Users** group for that scope.

* **All Account Users:** All users in the account scope.
* **All Organization Users:** All users in an organization's scope.
* **All Project Users:** All users in a project's scope.

Whenever you [create an organization or project](/docs/platform/organizations-and-projects/create-an-organization), Harness creates an **All Users** group for the org or project.

Initially, built-in user groups have no role or resource group assignments. You can [assign a role and resource group](#assign-roles-and-resource-groups) to the built-in user group at a specific scope, which becomes the default role/resource group for all users at that scope.

For example, if you add a user to a project, they are added to the **All Project Users** group for that project, and they inherit the role and resource group you assigned to the **All Project Users** group.

Aside from assigning roles and resource groups, you can't edit or delete the built-in user groups. These groups are created and managed by Harness.

## Use automated provisioning

You can [manually create user groups](#create-user-groups-manually) and users in Harness, and you can use automated provisioning, including:

* [Okta SCIM](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
* [Azure AD SCIM](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
* [OneLogin SCIM](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
* [Just-in-time provisioning](/docs/platform/role-based-access-control/provision-use-jit)

When you use automated provisioning, users and user groups are imported from your IdP, and then you [assign roles and resource groups](#assign-roles-and-resource-groups) to the imported users and groups in Harness. For imported users and groups, you manage group metadata, group membership, and user profiles in your IdP, and you manage their role and resource group assignments in Harness. You can also create users and user groups directly in Harness, but any users or groups imported from your IdP must be managed in your IdP.

For example, if you use Okta as your IdP, you could create a user group in Okta and assign users to that group in Okta. When the user group is first imported into Harness, the group and the group members are not associated with any roles or resource groups. You must assign roles and resource groups to the user group in Harness. The group members then inherit permissions and access from the role and resource group that is assigned to the user group.

For user groups provisioned from SCIM to Harness, for the corresponding user groups created in Harness, the user group `identifier` is derived from the display name of the user group in the SCIM provider. Harness replaces `.` (dots) and `-` (dashes) with an `_` (underscore). All other special characters (`#`, `?`, `%`, and so on) and spaces are removed. Leading digits`0` through `9` and `$` are also removed.

**Example 1:** For a user group in SCIM with the name `Harness.Group?Next#Gen-First`, the user group created in Harness will have the `identifier`: `Harness_GroupNextGen_First`.

**Example 2:** For a user group in SCIM with the name `123#One.$Two.$Three.123`, the user group created in Harness will have the `identifier`: `One_$Two_$Three_123`.

The name of the corresponding user group created in Harness will retain the special symbols as present in the user group of the SCIM provider. Example: For a user group in SCIM with the name `Harness.Group?Next#Gen-First`, the user group created in Harness will have the same `name`: `Harness.Group?Next#Gen-First`.

## Create user groups manually

To create user groups in Harness, you need a role, such as **Account Admin**, that has [permission](/docs/platform/role-based-access-control/permissions-reference) to view and manage user groups.

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where you want to create the user group.

   * To create a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To create a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To create a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header, and then select **New User Group**.
3. Enter a **Name** for the user group. **Description** and **Tags** are optional.
4. In **Add Users**, select users to add to the group. If you haven't invited any users yet, you can [add users](#add-users-to-a-group) later.
4. Select **Save**.
5. [Assign roles and resource groups](#assign-roles-and-resource-groups) to the user group.

## Create groups by inheritance

At the organization and project scopes, you can quickly create groups by inheriting them from higher scopes. Metadata and members of inherited groups are managed at their original scope. When inherited at a lower scope, you can only change the role and resource group assignment at the inherited scope. Any other modifications to the group must be made at the group's original scope, and those changes are reflected at all scopes where the group is inherited.

| Action | Scope |
| ------ | ----  |
| Edit group members | Original scope only. The changes are reflected in all scopes where the group is inherited. |
| Edit name, description, tags, and notification preferences | Original scope only. The changes are reflected in all scopes where the group is inherited. |
| Edit roles and resource groups | You can change the roles and resource groups that were assigned at the current scope only. You can't make cross-scope modifications.<br/><ul><li>Original scope: Manage role and resource group assignments for the original scope only. Can't edit role/resource groups for inherited scopes.</li><li>Inherited scope: Manage role and resource group assignments for the inherited scope only. Can't edit higher-level roles/resource groups or roles/resource groups in other inherited scopes.</li></ul> |
| Delete group | Original scope only. If deleted, the group is also removed from all scopes where it was inherited. |

:::note

When a user group is inherited from the account scope to a project scope, the system automatically assigns the Organization Viewer role to that user group for the organization containing the project. The role assignment is also recorded in the Audit Logs.

If this role assignment is removed, the user group may lose access to the Organization.
:::
To inherit user groups in Harness, you need the following [permissions](/docs/platform/role-based-access-control/permissions-reference):

* **View** user groups at the original scope. For example, if the group originates from the account scope, you must have the ability to view user groups at the account scope.
* **Manage** user groups at the inheritance scope. For example, if you want to inherit a group at a project scope, you must have the ability to manage user groups at that project scope.
   
   :::note More granular control over Manage permissions
   Now, you can split the **Manage** permission into more granular permissions, so you can give users access only to the actions they actually need when managing user groups.

   Learn more about split Manage permissions [here](/docs/platform/role-based-access-control/rbac-in-harness#split-manage-permissions).
   :::

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where you want to inherit the user group.

   * To inherit a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To inherit a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header, and then select **Assign Roles** next to **New User Group**.
3. In **User Group(s)**, select the groups to inherit. If you don't see a particular group, it either exists at a lower scope or you don't have permission to view it.

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/add-user-groups-54.png')} width="80%" height="60%" title="Click to view full size image" />
   </div>

4. Select **Apply Selected**.
5. Select **Add** to [assign a role and resource group](#assign-roles-and-resource-groups) to the inherited group at the inherited scope. This determines the group's permissions and access at the inherited scope. If the group doesn't already have sufficient permissions/access from the original scope, you need to add the additional necessary permissions/access here.
6. Select **Apply**.

When viewing user groups at higher scopes, you can find a list of **Organizations and Projects Using This Group** in the group details. These are the organizations and projects where the group is inherited.

<!-- ![](./static/add-user-groups-55.png) -->

<div style={{textAlign: 'center'}}>
<DocImage path={require('./static/add-user-groups-55.png')} width="80%" height="60%" title="Click to view full size image" />
</div>

## Assign roles and resource groups

Initially, user groups have no permissions or access. You assign [roles](/docs/platform/role-based-access-control/add-manage-roles) and [resource groups](/docs/platform/role-based-access-control/add-resource-groups) to user groups, and then the permissions and access granted by the assigned roles and resource groups are applied to all group members. Go to [RBAC in Harness: Role binding](/docs/platform/role-based-access-control/rbac-in-harness#role-binding) for more information.

:::warning Least privilege

RBAC is additive. The total expanse of a user/service account's permissions and access is the sum of all the roles and resource groups from all user groups they belong to, as well as any roles and resource groups assigned directly to them as an individual user/service account.

It is important to follow the principle of least privilege (PoLP). This is a security principle that means users are granted the absolute minimum access/permissions necessary to complete their tasks and nothing more.

While Harness includes some built-in roles and resource groups, to ensure the least privilege, consider:

* Being selective in the way you apply roles and resource groups.
* Creating your own roles and resource groups as needed for refined access control.

:::

To manage user groups in Harness, you need a role, such as **Account Admin**, that has [permission](/docs/platform/role-based-access-control/permissions-reference) to view and manage user groups.

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where you want to configure the group's  role and resource group assignments.

   * To edit a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header.
3. Locate the group you want to edit and select **Manage Roles**.
4. In **Role Bindings**, select **Add**, then select a [role](/docs/platform/role-based-access-control/add-manage-roles) and a [resource group](/docs/platform/role-based-access-control/add-resource-groups).

   To delete a role binding, select the **Delete** icon.
   To add another role binding, select **Add** again.

5. Select **Apply**.

## Edit group metadata

Use these steps to edit a user group's name, description, or tags.

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the user group exists.

   * To edit a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header.
3. Locate the group you want to edit.
4. Select **More options** (&vellip;), and then select **Edit**.
5. Edit the groups's name, description, or tags, and then select **Save**.

## Edit group members

Use these steps to add and remove users in a user group.

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the user group exists.

   * To edit a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header.
3. Select the group you want to edit.
4. To add users to the group, select **Members**, select the users to add, and then select **Save**.
5. To remove users from the group, locate the user you want to remove, select **More options** (&vellip;), and then select **Remove**.

## Edit notification preferences

You can configure notification channels for Harness to send messages to group members. When you assign an alert notification rule to a group, the channels specified in the group's **Notification Preferences** are used to notify all group members.

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the user group exists.

   * To edit a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To edit a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To edit a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header.
3. Select the group you want to edit.
4. Under **Notification Preferences**, select **Channel**.
5. Configure the notification settings for the preferred channel:

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/channel-notification-preference.png')} width="80%" height="60%" title="Click to view full size image" />
   </div>

   * **Email/Alias**: Enter any group email addresses where Harness can send notifications. Go to <a href="/docs/platform/notifications/notifications/add-smtp-configuration#option-send-notifications-for-a-user-group-using-email">Send Notifications Using Email</a> for more information.
   * **Microsoft Teams Webhook URL(s)**: Enter the Microsoft Teams incoming webhook URL. Go to <a href="/docs/platform/notifications/send-notifications-to-microsoft-teams/">Send notifications to Microsoft Teams</a> for more information.
   * **Slack Webhook URL (Optional)**: Enter the Slack channel Incoming Webhook URL. Go to <a href="/docs/platform/notifications/notifications/send-notifications-using-slack">Send Notifications Using Slack</a> for more information.
   * **PagerDuty Integration Key**: Enter the key for a PagerDuty Account/Service to which Harness can send notifications. You can get this key from the integration details in PagerDuty (navigate to **Services** and then **Service Directory**).

      <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/add-user-groups-56.png')} width="80%" height="60%" title="Click to view full size image" />
      </div>

   * **Datadog (/v1/events API)**: Enter the **Datadog URL** and **Datadog API Key** to send notifications to Datadog. Harness recommends that you create an <a href="/docs/platform/secrets/add-use-text-secrets">encrypted text secret</a> for your Datadog API key and reference it using an expression (for example, `<+secrets.getValue("datadogkey")>`). Go to <a href="https://docs.datadoghq.com/account_management/api_keys/" target="_blank">Datadog API keys documentation</a> to obtain your API key from Datadog.
   * **Webhook**: Enter the webhook URL that Harness will call to send notifications to your external application or service. The webhook receives POST requests with JSON payloads containing notification details. Use expressions to compose the URL if needed (for example, `https://companyurl.notify.com/webhook`).


## Delete user groups

1. In Harness, go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) where the user group exists.

   * To delete a user group at the account scope, select **Account Settings**, and then select **Access Control**.
   * To delete a user group at the organization scope, go to **Account Settings**, select **Organizations**, select the relevant organization, and then select **Access Control**.
   * To delete a user group at the project scope, go to **Projects**, select the relevant project, and then select **Access Control**.

2. Select **User Groups** in the header.
3. Locate the group you want to delete.
4. Select **More options** (&vellip;), and then select **Delete**.

## Split Manage Permissions

### User Groups

Harness now supports granular permissions for [User Groups](/docs/platform/role-based-access-control/add-user-groups). Instead of a single broad Manage permission that allowed full control, you can now grant access only to the specific actions required.

#### Feature Flag Rollout Process

This feature is controlled by two feature flags that must be enabled in the following order:

- `PL_USER_GROUPS_MANAGE_PERMISSION_SPLIT_MIGRATION`: This flag enables migration — roles are migrated into granular permissions as shown in the [table below](#user-group-permissions).
- `PL_USER_GROUPS_MANAGE_PERMISSION_SPLIT_ENFORCE`: Permissions are now enforced — UI changes and access checks depend on the split permissions.


:::note 
Reach out to [Harness Support](mailto:support@harness.io) to enable these feature flags.
:::

#### User Group Permissions

The **View** permission remains unchanged and is always available. The **Manage** permission for User Groups has been split into multiple granular permissions to provide administrators with finer control, as shown below:

:::note
`core_usergroup_manage` permission is a no longer available once the feature flag is enabled.
:::
   
| **Action**              | **Permission**              | **Description**                                                               |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Create                  | `core_usergroup_create`                | Permission to create a user group                                             |
| Edit (metadata)         | `core_usergroup_editMetadata`          | Permission to edit metadata of a user group                                   |
| Delete                  | `core_usergroup_delete`                | Permission to delete a user group                                             |
| Manage Users            | `core_usergroup_manageUsers`           | Permission to manage users in a user group                                    |
| Manage SSO              | `core_usergroup_manageSSO`             | Permission to perform SSO-related operations within the scope of a user group |
| Manage SCIM             | `core_usergroup_manageSCIM`            | Permission to manage a user group through SCIM                                |
| Manage Notifications    | `core_usergroup_manageNotifications`   | Permission to manage notification settings for a user group                   |
| Manage Role Assignments | `core_usergroup_manageRoleAssignments` | Permission to manage role assignments for a user group                        |


<details>
<summary>View all User Group permissions</summary>

The following permissions are always available:

- `core_usergroup_view` — permission to view a user group  
- `core_usergroup_manage` — permission to manage a user group

**With feature flag enabled**:

- `core_usergroup_create` — permission to create a user group  
- `core_usergroup_editMetadata` — permission to edit metadata of a user group  
- `core_usergroup_delete` — permission to delete a user group  
- `core_usergroup_manageUsers` — permission to manage users in a user group  
- `core_usergroup_manageSSO` — permission to perform SSO-related operations within the scope of a user group.  
- `core_usergroup_manageSCIM` — permission to manage user group through SCIM. 
- `core_usergroup_manageNotifications` — permission to manage notifications settings for a user group.
- `core_usergroup_manageRoleAssignments` — permission to manage role assignments for a user group

</details>

:::warning 
When the feature flag is enabled, review your existing permissions carefully to understand how they are used and which additional permissions may be required.

* If your automation assigns the `core_usergroup_manage` permission to the user, then it now needs to assign the new permissions. Otherwise, users will not be able to perform the intended operations.
* Any APIs that were previously accessed using the `core_usergroup_manage` permission now require new granular permissions. Review the APIs calls and add the required permissions for each operation; otherwise, those API requests will fail after the feature flag is enabled.

**New permission behavior**

* **Creating a user group**
  The `core_usergroup_create` permission is mandatory. If additional permissions (such as `core_usergroup_manageUsers`, `core_usergroup_manageSSO`, or `core_usergroup_manageNotifications`) are missing, the request still succeeds, but only the components covered by the granted permissions are created.

* **Updating a user group**
  At least one relevant edit or manage permission is required (for example, `core_usergroup_editMetadata`, `core_usergroup_manageUsers`, `core_usergroup_manageSSO`, or `core_usergroup_manageNotifications`).

  * If none of these permissions are present, the request fails.
  * If some permissions are present, only the components covered by those permissions are updated.
:::