---
title: Provisioning Users with Okta (SCIM)
description: Use Okta's SCIM integration to provision and manage Harness users and User Groups.
# sidebar_position: 2
helpdocs_topic_id: 8hwnfif0v1
helpdocs_category_id: 49yov609ez
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Okta's SCIM integration to provision Harness users and [User Groups](/article/ven0bvulsj-users-and-permissions) (which confer role-based access permissions).


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

To provision Harness users via Okta, you must be an Administrator in your Okta account, and must have the [Account Administrator role](/article/ven0bvulsj-users-and-permissions#default_user_groups) in Harness.


### Step 1: ​Add Harness App to Okta​

To start, you must add a Harness app to your Okta account, as follows:

1. From your Okta user home page, select **Add Apps** at upper right.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576743014362/image.png)
2. Use the search field to locate the Harness app.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583806563593/image.png)
3. Click **Add**, and look for the confirmation message.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583806868854/image.png)Your Harness app is now set up in Okta. Next, you're ready to authorize it.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583806905164/image.png)


### Step 2: Authorize Okta Integration

Follow these steps to authorize the integration between your Okta app (configured just [above](#add_app)) and Harness:

1. Log into your Harness account.
2. In Harness Manager's address bar, copy the **Harness account ID** in your Harness URL.  
  
The Harness account ID comes after `account` in the URL.  
  
For example, in the following URL, the account ID is `1a2b3c`: `https://app.harness.io/#/account/1a2b3c`.![](https://files.helpdocs.io/kw8ldg1itf/articles/3hmfr07oz9/1586891224386/image.png)
3. Add your account ID to the end of the following URL: `https://app.harness.io/gateway/api/scim/account/<account_ID>`For [Harness On-Prem](/category/xqs7h6dqu5-firstgen-self-managed-enterprise-edition), the URL will use your custom domain name. For example, if your On-Prem domain name is **harness.mycompany.com**: `https://harness.mycompany.com/api/scim/account/<account_ID>`
4. Copy the full URL.
5. From your Okta user home page, select **Admin** at upper right.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576743014362/image.png)
6. From the resulting Dashboard, select **Applications** > **Applications**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576743348508/image.png)
7. Locate your Okta app, and select it.
8. In your Okta app, select the **Provisioning** tab, at the top, and select the Integration tab at left. Then click **Edit**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583801963373/image.png)
9. Click the **Enable API Integration** check box.
10. As shown below, paste the account number into the **Base URL** field, using this format: `https://app.harness.io/gateway/api/scim/account/<account_ID>`![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583802666368/image.png)
11. In Harness Manager, create an API key, following the instructions in [API Keys](/article/smloyragsm-api-keys). Make sure this key's permissions are inherited from the **Account Administrator** User Group with **Manage User and User Groups** permissions, as shown here:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1642768002444/screenshot-2022-01-21-at-5-55-30-pm.png)
12. Copy your new API key's value to the clipboard (using the instructions at the above link).
13. In Okta, paste the key's value into the **API****Token** field.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576716545458/image.png)Okta will include this **Bearer** token with API requests to Harness, to authenticate those requests.
14. Click **Test API Credentials**.
15. When the test is successful, click **Save**.
16. Click **To App** at left. The **Provisioning** tab will now look something like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576719403485/image.png)
17. Click **Edit** at top right, then select **Enable** beside the **Create Users**, **Update User Attributes**, and **Deactivate Users** options.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1585598443683/image.png)
18. Click **Save**.  
  
Your Okta app is now authorized with Harness. Next, you must edit the default Attribute Mappings, so as to properly map users' fields from Okta to Harness.


### Option 1: Edit Attribute Mappings

To edit your app's field mappings between Okta and Harness:

1. On the **Provisioning** tab, scroll down to [Your App Name] **Attribute Mappings**:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1589217149977/image.png)
2. Remove all rows except these six: **Username** (cannot be deleted), **Given name**, **Family name**, **Primary email**, **Primary email type**, and **Display name**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576744736664/image.png)
3. Edit the **Given name** attribute's row. Clicking its pencil icon opens this dialog:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576745110419/image.png)
4. Change the **Given name** attribute value from the default `firstName` to `displayName`. Then click **Save**:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576745264318/image.png)Your **Attribute Mappings** section should now look like this:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576745309628/image.png)At this point, your integration setup is complete. You can now assign this app to users and/or groups, which will provisioning those users/groups in Harness.

Where email addresses in Okta are mixed-case, this integration converts them to all-lowercase in Harness.
### Option 2: Create Users

This option directly assigns your Harness app to individual (existing) Okta users, thereby provisioning the users in Harness. Then, within Harness Manager, you will be free to add these users to Harness [User Groups](/article/ven0bvulsj-users-and-permissions). To assign users:

1. Start on Okta's **Assignments** tab, and select **People** at left.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576746136893/image.png)
2. Select **Assign** > **Assign to People**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576746175413/image.png)
3. In this modal, select a user and click **Assign.**![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576778875497/image.png)
4. In the modal's second page, click **Save and Go Back**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576778914781/image.png)
5. Repeat the preceding steps to assign other users. Once you've assigned all intended users, click **Done**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779031345/image.png)Users with the Harness app assignment now appear on the **People** tab.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779052419/image.png)

You can use the two buttons at right to edit a user's details, or to remove a user from the app. Removing a user here removes them from Harness.
### Option 3: Assign Groups

This option assigns the Harness app to Okta-defined groups of users.

You will not be able to modify these users' group assignments in Harness Manager—only in Okta. If you want to preserve the option to modify User Group assignments within Harness Manager, instead use the [Assign/Remove Users](#assign_users) option.To assign groups:

1. From Okta's **Assignments** tab, select **Assign** > **Assign to Groups**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779675243/image.png)
2. From this modal's list of existing groups, click **Assign** beside the group you want to assign.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779695506/image.png)
3. You can normally ignore these resulting fields, and simply click **Save and Go Back**:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779711744/image.png)
4. Repeat the preceding steps to assign other groups. Once you've assigned all intended groups, click **Done**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779798317/image.png)Users with the Harness app assignment now appear on the **Groups** tab.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576779819461/image.png)

Next, you must use **Push Groups**, to provision these assigned groups as Harness User Groups.


#### Group Push to Harness

To provision your app's assigned groups in Harness:

1. Select Okta's **Push Groups** tab, then select **Push Groups** > **Find Groups by Name**:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576780057477/image.png)
2. In the resulting form, search for the group(s) you want to provision:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576780210966/image.png)
3. Click to select a matching group, then pull down **Create Group** and select its top **Create Group** option:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576780319693/image.png)
4. Once the group is added, click **Save**:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576780536845/image.png)The group now appears on Okta's **Push Groups** tab:![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576781554998/image.png)The corresponding User Group now also appears in Harness' [User Groups](/article/ven0bvulsj-users-and-permissions):![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576781576523/image.png)


### Option 4: Update User Attributes

You can edit a user's profile in Okta to update the following attribute values for the corresponding user in Harness:

* Given name
* Family name
* Primary email
* Primary email type
* Display name

To update user attributes:

1. From Okta's top menu, select **Directory** > **People**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583820169042/image.png)
2. Locate the user you want to edit, and click their name to display their profile.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583820573205/image.png)
3. Click the **Profile** tab, then click the **Edit** button.

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583822719666/image.png)1. Update desired attributes in the fields shown below, then click **Save**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583822882206/image.png)

Only the five fields listed at the top of this section will be synced to Harness users. You can update values in other fields, but those values will be saved for this user only in Okta. They won't be reflected in Harness.
#### Deactivate Users

You can deactivate users in Okta to delete their Harness accounts, as follows:

1. From Okta's top menu, select **Directory** > **People**, then navigate to the user you want to deactivate.
2. From that user's profile, select **More Actions** > **Deactivate**.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583823546369/image.png)
3. Click **Deactivate** in the resulting confirmation dialog.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583823644644/image.png)

Deactivating a user removes them from all their provisioned apps, including Harness. While a user account is deactivated, you cannot make changes to it.  
  
However, as shown below, you can reactivate users by clicking **Activate** on their profile page. Once they're reactivated, you can restore their Harness account) by [reassigning the Harness app](#assign_users) to them.![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1583824480836/image.png)
### Limitations

This integration does not support updating a configured user's **Primary email** or **Username** in Okta. (However, you can freely update the **Display name** field.)

When you provision Harness User Groups and users from Okta, you will not be able to modify some of their attributes in Harness Manager. You must do so in Okta.

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576787669818/image.png)Operations that you *cannot* perform on Okta-provisioned User Groups within Harness Manager are:

* Managing users within the User Group.
* Adding users to the User Group.
* Removing users from the User Group.
* Renaming the User Group.
* Cloning the User Group.
* Deleting the User Group.

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576786652418/image.png)If a User Group provisioned from Okta duplicates the name of an existing Harness User Group, Harness will maintain both groups. To prevent confusion, you are free to rename the native User Group (but not the Okta-provisioned group).

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576787016045/image.png)Where a User Group has been provisioned from Okta, you cannot use Harness Manager to edit the member users' details (**Email Address**, **Full Name**, or **User Groups** assignments).

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576786841471/image.png)You must use Okta to assign these users to other User Groups (to grant corresponding permissions). You must also use Okta to delete these users from Harness, by removing them from the corresponding Okta app.

![](https://files.helpdocs.io/kw8ldg1itf/articles/8hwnfif0v1/1576787237658/image.png)When you use Okta to [directly assign](#assign_users) users to Harness, those users initially have no User Group assignments in Harness. With this method, you are free to use Harness Manager to add and modify their User Group assignments.### Migrating to Okta SCIM from Okta SAML

To migrate, first you will mirror the SCIM group in Harness, as described in this topic. Next, you will delink the old SAML group in Harness.

If you currently use SAML authentication with Harness, your existing Harness User Groups are linked with Okta groups. Typically, the Harness User Goups and the Okta groups have different names.

When you migrate to the Okta SCIM authorization, the group names will be the exact same.

Once the Okta SCIM group **Okta\_group\_Harness\_Administrator** is automatically created in Harness, it has no permissions. You can mirror permissions between the two user groups either manually or through the [Harness API](/article/p9ssx4cv5t-sample-queries-create-users-user-groups-and-assign-permissions#assign_permissions).

Once the user group between Okta SCIM and Harness are the same, delink the User Group that is linked using Okta SAML authentication. The mirrored Okta SCIM group is now managed by Okta SCIM.

### Assigning Permissions Post-Provisioning

Permissions can be assigned manually or via the Harness API:

* [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions)
* [Use Users and Groups API](/article/p9ssx4cv5t-sample-queries-create-users-user-groups-and-assign-permissions)

