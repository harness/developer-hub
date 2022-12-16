---
title: Provisioning Users with Okta (SCIM)
description: Use Okta's SCIM integration to provision and manage Harness users and User Groups.
# sidebar_position: 2
helpdocs_topic_id: 8hwnfif0v1
helpdocs_category_id: 49yov609ez
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Okta's SCIM integration to provision Harness users and [User Groups](users-and-permissions.md) (which confer role-based access permissions).


### Review: Harness Okta SCIM Integration

By using Okta as your identity provider, you can efficiently provision and manage your organization's users in Harness. Harness' [SCIM](https://www.okta.com/blog/2017/01/what-is-scim/) integration enables Okta to serve as a single identity manager for adding and removing users, and for provisioning User Groups. This is especially efficient for managing large numbers of users.

In exchange for the convenience of Okta-provisioned users and groups, you must configure several aspects of Okta, as described in the following sections. You will also have restrictions on modifying Okta-provisioned users and groups natively within Harness, as described in [Limitations](#limitations).


#### Features Supported

Once you set up the SCIM integration between Okta and Harness (as described below), Administrators will be able to perform the following Harness actions within Okta:

* [Create users](#assign_users), individually, in your Harness app.
* [Assign Okta-defined groups](#assign_groups) to your Harness app.
* [Group push](#push) already-assigned groups to Harness.
* [Update User Attributes](#update_user) from Okta to Harness.
* [Deactivate Users](#deactivate) in Okta and Harness.


### Review: Harness and Okta Requirements

To provision Harness users via Okta, you must be an Administrator in your Okta account, and must have the [Account Administrator role](users-and-permissions.md#default-user-groups) in Harness.


### Step 1: ​Add Harness App to Okta​

To start, you must add a Harness app to your Okta account, as follows:

1. From your Okta user home page, select **Add Apps** at upper right.![](./static/scim-okta-164.png)

2. Use the search field to locate the Harness app.![](./static/scim-okta-165.png)

3. Click **Add**, and look for the confirmation message.![](./static/scim-okta-166.png)
Your Harness app is now set up in Okta. Next, you're ready to authorize it.![](./static/scim-okta-167.png)



### Step 2: Authorize Okta Integration

Follow these steps to authorize the integration between your Okta app (configured just [above](#add_app)) and Harness:

1. Log into your Harness account.
2. In Harness Manager's address bar, copy the **Harness account ID** in your Harness URL.  
  
The Harness account ID comes after `account` in the URL.  
  
For example, in the following URL, the account ID is `1a2b3c`: `https://app.harness.io/#/account/1a2b3c`.![](./static/scim-okta-168.png)

3. Add your account ID to the end of the following URL: `https://app.harness.io/gateway/api/scim/account/<account_ID>`For [Harness On-Prem](/docs/category/self-managed-enterprise-edition-fg), the URL will use your custom domain name. For example, if your On-Prem domain name is **harness.mycompany.com**: `https://harness.mycompany.com/api/scim/account/<account_ID>`
4. Copy the full URL.
5. From your Okta user home page, select **Admin** at upper right.![](./static/scim-okta-169.png)

6. From the resulting Dashboard, select **Applications** > **Applications**.![](./static/scim-okta-170.png)

7. Locate your Okta app, and select it.
8. In your Okta app, select the **Provisioning** tab, at the top, and select the Integration tab at left. Then click **Edit**.![](./static/scim-okta-171.png)

9. Click the **Enable API Integration** check box.
10. As shown below, paste the account number into the **Base URL** field, using this format: `https://app.harness.io/gateway/api/scim/account/<account_ID>`![](./static/scim-okta-172.png)

11. In Harness Manager, create an API key, following the instructions in [API Keys](api-keys.md). Make sure this key's permissions are inherited from the **Account Administrator** User Group with **Manage User and User Groups** permissions, as shown here:![](./static/scim-okta-173.png)

12. Copy your new API key's value to the clipboard (using the instructions at the above link).
13. In Okta, paste the key's value into the **API****Token** field.![](./static/scim-okta-174.png)
Okta will include this **Bearer** token with API requests to Harness, to authenticate those requests.
14. Click **Test API Credentials**.
15. When the test is successful, click **Save**.
16. Click **To App** at left. The **Provisioning** tab will now look something like this:![](./static/scim-okta-175.png)

17. Click **Edit** at top right, then select **Enable** beside the **Create Users**, **Update User Attributes**, and **Deactivate Users** options.![](./static/scim-okta-176.png)

18. Click **Save**.  
  
Your Okta app is now authorized with Harness. Next, you must edit the default Attribute Mappings, so as to properly map users' fields from Okta to Harness.


### Option 1: Edit Attribute Mappings

To edit your app's field mappings between Okta and Harness:

1. On the **Provisioning** tab, scroll down to [Your App Name] **Attribute Mappings**:![](./static/scim-okta-177.png)

2. Remove all rows except these six: **Username** (cannot be deleted), **Given name**, **Family name**, **Primary email**, **Primary email type**, and **Display name**.![](./static/scim-okta-178.png)

3. Edit the **Given name** attribute's row. Clicking its pencil icon opens this dialog:![](./static/scim-okta-179.png)

4. Change the **Given name** attribute value from the default `firstName` to `displayName`. Then click **Save**:![](./static/scim-okta-180.png)
Your **Attribute Mappings** section should now look like this:![](./static/scim-okta-181.png)
At this point, your integration setup is complete. You can now assign this app to users and/or groups, which will provisioning those users/groups in Harness.

Where email addresses in Okta are mixed-case, this integration converts them to all-lowercase in Harness.
### Option 2: Create Users

This option directly assigns your Harness app to individual (existing) Okta users, thereby provisioning the users in Harness. Then, within Harness Manager, you will be free to add these users to Harness [User Groups](users-and-permissions.md). To assign users:

1. Start on Okta's **Assignments** tab, and select **People** at left.![](./static/scim-okta-182.png)

2. Select **Assign** > **Assign to People**.![](./static/scim-okta-183.png)

3. In this modal, select a user and click **Assign.**![](./static/scim-okta-184.png)

4. In the modal's second page, click **Save and Go Back**.![](./static/scim-okta-185.png)

5. Repeat the preceding steps to assign other users. Once you've assigned all intended users, click **Done**.![](./static/scim-okta-186.png)
Users with the Harness app assignment now appear on the **People** tab.![](./static/scim-okta-187.png)


You can use the two buttons at right to edit a user's details, or to remove a user from the app. Removing a user here removes them from Harness.
### Option 3: Assign Groups

This option assigns the Harness app to Okta-defined groups of users.

You will not be able to modify these users' group assignments in Harness Manager—only in Okta. If you want to preserve the option to modify User Group assignments within Harness Manager, instead use the [Assign/Remove Users](#assign_users) option.To assign groups:

1. From Okta's **Assignments** tab, select **Assign** > **Assign to Groups**.![](./static/scim-okta-188.png)

2. From this modal's list of existing groups, click **Assign** beside the group you want to assign.![](./static/scim-okta-189.png)

3. You can normally ignore these resulting fields, and simply click **Save and Go Back**:![](./static/scim-okta-190.png)

4. Repeat the preceding steps to assign other groups. Once you've assigned all intended groups, click **Done**.![](./static/scim-okta-191.png)
Users with the Harness app assignment now appear on the **Groups** tab.![](./static/scim-okta-192.png)


Next, you must use **Push Groups**, to provision these assigned groups as Harness User Groups.


#### Group Push to Harness

To provision your app's assigned groups in Harness:

1. Select Okta's **Push Groups** tab, then select **Push Groups** > **Find Groups by Name**:![](./static/scim-okta-193.png)

2. In the resulting form, search for the group(s) you want to provision:![](./static/scim-okta-194.png)

3. Click to select a matching group, then pull down **Create Group** and select its top **Create Group** option:![](./static/scim-okta-195.png)

4. Once the group is added, click **Save**:![](./static/scim-okta-196.png)
The group now appears on Okta's **Push Groups** tab:![](./static/scim-okta-197.png)
The corresponding User Group now also appears in Harness' [User Groups](users-and-permissions.md):![](./static/scim-okta-198.png)



### Option 4: Update User Attributes

You can edit a user's profile in Okta to update the following attribute values for the corresponding user in Harness:

* Given name
* Family name
* Primary email
* Primary email type
* Display name

To update user attributes:

1. From Okta's top menu, select **Directory** > **People**.

   ![](./static/scim-okta-199.png)

2. Locate the user you want to edit, and click their name to display their profile.

   ![](./static/scim-okta-200.png)

3. Click the **Profile** tab, then click the **Edit** button.

   ![](./static/scim-okta-201.png)
   
4. Update desired attributes in the fields shown below, then click **Save**.

   ![](./static/scim-okta-202.png)

Only the five fields listed at the top of this section will be synced to Harness users. You can update values in other fields, but those values will be saved for this user only in Okta. They won't be reflected in Harness.

#### Deactivate Users

You can deactivate users in Okta to delete their Harness accounts, as follows:

1. From Okta's top menu, select **Directory** > **People**, then navigate to the user you want to deactivate.
2. From that user's profile, select **More Actions** > **Deactivate**.![](./static/scim-okta-203.png)

3. Click **Deactivate** in the resulting confirmation dialog.![](./static/scim-okta-204.png)


Deactivating a user removes them from all their provisioned apps, including Harness. While a user account is deactivated, you cannot make changes to it.  
  
However, as shown below, you can reactivate users by clicking **Activate** on their profile page. Once they're reactivated, you can restore their Harness account) by [reassigning the Harness app](#assign_users) to them.![](./static/scim-okta-205.png)



### Limitations

This integration does not support updating a configured user's **Primary email** or **Username** in Okta. (However, you can freely update the **Display name** field.)

When you provision Harness User Groups and users from Okta, you will not be able to modify some of their attributes in Harness Manager. You must do so in Okta.

![](./static/scim-okta-206.png)
Operations that you *cannot* perform on Okta-provisioned User Groups within Harness Manager are:

* Managing users within the User Group.
* Adding users to the User Group.
* Removing users from the User Group.
* Renaming the User Group.
* Cloning the User Group.
* Deleting the User Group.

![](./static/scim-okta-207.png)
If a User Group provisioned from Okta duplicates the name of an existing Harness User Group, Harness will maintain both groups. To prevent confusion, you are free to rename the native User Group (but not the Okta-provisioned group).

![](./static/scim-okta-208.png)
Where a User Group has been provisioned from Okta, you cannot use Harness Manager to edit the member users' details (**Email Address**, **Full Name**, or **User Groups** assignments).

![](./static/scim-okta-209.png)
You must use Okta to assign these users to other User Groups (to grant corresponding permissions). You must also use Okta to delete these users from Harness, by removing them from the corresponding Okta app.

![](./static/scim-okta-210.png)
When you use Okta to [directly assign](#assign_users) users to Harness, those users initially have no User Group assignments in Harness. With this method, you are free to use Harness Manager to add and modify their User Group assignments.

### Migrating to Okta SCIM from Okta SAML

To migrate, first you will mirror the SCIM group in Harness, as described in this topic. Next, you will delink the old SAML group in Harness.

If you currently use SAML authentication with Harness, your existing Harness User Groups are linked with Okta groups. Typically, the Harness User Goups and the Okta groups have different names.

When you migrate to the Okta SCIM authorization, the group names will be the exact same.

Once the Okta SCIM group **Okta\_group\_Harness\_Administrator** is automatically created in Harness, it has no permissions. You can mirror permissions between the two user groups either manually or through the [Harness API](../../techref-category/api/sample-queries-create-users-user-groups-and-assign-permissions.md#assign-permissions).

Once the user group between Okta SCIM and Harness are the same, delink the User Group that is linked using Okta SAML authentication. The mirrored Okta SCIM group is now managed by Okta SCIM.

### Assigning Permissions Post-Provisioning

Permissions can be assigned manually or via the Harness API:

* [Managing Users and Groups (RBAC)](users-and-permissions.md)
* [Use Users and Groups API](../../techref-category/api/sample-queries-create-users-user-groups-and-assign-permissions.md)

