---
title: Okta
description: Use Okta as an SAML SSO provider to let your users log into Harness with their Okta credentials.
sidebar_position: 2
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

This page walks you through creating an Okta app integration, exchanging the SAML metadata with Harness, and optionally enabling group-based authorization so Okta group members are automatically mapped to Harness user groups. To set up Harness with Okta as a SAML SSO provider, you exchange the necessary information between your Okta app and Harness.

Use two browser windows or tabs for this process. Open Okta in one tab and open Harness in the other.

In your Harness tab, <a href="/docs/platform/authentication/authentication-overview#enable-multiple-identity-providers"target="_blank" > Add an SAML Provider</a>.

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview"target="_blank" > Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
- Users are not created as part of the SAML SSO integration. Okta user accounts must exist prior to exchanging information between your Okta account and Harness. 
- Users are invited to Harness using their email addresses. Once they log into Harness, their email addresses are registered as Harness Users. For more information, go to <a href="/docs/platform/authentication/single-sign-on-saml/overview"target="_blank"> SAML SSO with Harness </a>.
:::

---

## What will you learn in this topic?
By the end of this topic, you will be able to understand:
- How to create an SAML app integration in Okta for Harness.
- How to configure Harness to use Okta as a SAML SSO provider.
- How to enable and test SSO Okta login.
- How to set up group-based SAML authorization using Okta group attributes.

---

## Before you begin

- A Harness account with Account Admin permissions.
- An Okta account with admin access.
- Users already provisioned in Okta, with the same email addresses they'll use in Harness.

---

## Okta user accounts

To set up a SAML support in your Okta Harness app, ensure that the app has corresponding Users in Harness:

1. In Harness, add the users you want to set up for SAML SSO by <a href="/docs/platform/get-started#invite-collaborators"target="_blank"> inviting them to Harness </a> using the same email addresses that they use in your SAML provider.
2. In Okta, assign them to your SAML provider app.

:::tip
- The only user property that must match between a Harness User and its corresponding SAML provider user account is its **email address**.
- Sometimes users might have mixed case email addresses in Okta. In these situations, Harness converts the email address to lowercase when adding them to Harness.
:::

---

## Create app integration in Okta

1. Sign in to your Okta administrator account, and select **Applications**.
2. Select **Create App Integration**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-53.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   The **Create a new app integration** dialogue opens.

3. Select **SAML 2.0**, then select **Next**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-54.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. In **General Settings**, enter a name in the **Application label** field, and then select **Next**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-55.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. On the **Configure SAML** tab, enter the Harness SAML endpoint URL in the **Single sign on URL** field. To get the SAML endpoint URL from Harness:
	1. If you aren't already on the **Add SAML Provider** page in Harness, open a new browser tab and navigate there. Sign in to Harness, go to **Account Settings**, select **Authentication**, select **SAML Provider**, enter a **Name** for the SAML configuration, and then select **Okta**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-56.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	2. Copy the endpoint URL from **Enter this SAML Endpoint URL as your Harness application's ACS URL**. This is the URL you need to paste in the **Single sign on URL** field in Okta.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-58.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	3. Keep this page open. You will come back to it later in this process.

6. In **Audience URI (SP Entity ID)**, enter `app.harness.io`. The SAML application identifier is always `app.harness.io`.
7. In **Default RelayState**, leave **blank**.  Harness uses this to exchange additional info between IdP SAML provider (OKTA) and Service Provider (Harness), by sending Custom RelayState information.
8. In **Name ID format**, enter the username format you are sending in the SAML Response. The default format is **Unspecified**.
9. In **Application username**, enter the default username.
10.  In **Attribute Statements (optional)**, enter name in the **Name** field, select **Name Format** as **Basic**, and select the **Value** as **user.email**.

    When you create a new SAML integration or modify an existing one, you can define custom attribute statements. These statements are inserted into the SAML assertions shared with your app. For more information, go to the Okta documentation on [Defining Attribute Statements](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm#).

11. In **Group Attribute Statements (optional)**, enter a name in the **Name** field, select **Name format (optional)** as **Basic**, select an appropriate **Filter** and enter its value.

    If your Okta org uses groups to categorize users, you can add group attribute statements to the SAML assertion shared with your app. For more information, go to the Okta documentation on [Defining Group Attribute Statements](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm#).

    <div style={{textAlign: 'center'}}>
       <DocImage path={require('../static/single-sign-on-saml-59.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

12. Select **Next**, and then select **Finish**.

---

## Okta SAML metadata file

Download the **Identity Provider metadata** XML from your Okta app and upload it into Harness.

1. In your Harness Okta app, go to the **Sign On** tab, and then select **Edit**.
2. Select **Actions** to view the SAML metadata, then copy that data into a file and save it with an .xml extension.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-60.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. In Harness, on the **Add SAML Provider** page, in **Upload the Identity Provider metadata XML downloaded from your Okta app**, select **Choose a file** or **Upload**, and select the SAML metadata file you downloaded from your Okta app.
4. Deselect **Enable Authorization**.
5. The default Entity ID is `app.harness.io`. To override the default entity ID, select **Add Entity ID** and enter your custom entity ID.
6. Select **Add**. Your Okta configuration appears under **Login via SAML**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-61.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

---

## Enable and test SSO with Okta

Now that Okta is set up in Harness as a SAML SSO provider, you can enable and test it.

1. In Harness, go to **Account Settings**, and then select **Authentication**.
2. Select **Login via SAML**.
3. On the **Enable SAML Provider** confirmation window, select **Test** to verify the connection. A new browser tab opens where you need to log in to **Okta**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-62.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   If the connection test succeeds, Harness displays a **SAML test successful** banner.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-63.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Select **Confirm** to enable Okta SAML SSO in Harness.
5. As an additional test of the SSO configuration, log into Harness through a different user account. Do this in a separate private browsing (Incognito) window so you can disable SSO in your Harness Administrator account if there are any errors.

   1. In a private browsing window, navigate to Harness.
   2. Log in using a Harness <a href="/docs/platform/role-based-access-control/add-users"target="_blank" > user account </a> that has a corresponding email address registered in Okta. If successful, you're redirected to the Okta log in page.
   3. On the Okta log in page, enter the email address associated with the Harness user account. The Harness account and Okta account can have different passwords. If successful, you'll be returned to Harness.

   :::info

   If you get locked out of Harness due to an SSO issue, you can log into Harness through [local login](#harness-local-login).

   :::

import Llnote from '/docs/platform/shared/local-login-note.md'

<Llnote />

---

## SAML authorization with Okta

Once you have enabled Harness SSO with your Okta app, you can set up and enable Okta SAML authorization in Harness.

To set up SAML authorization in Harness, link a <a href="/docs/platform/role-based-access-control/add-user-groups"target="_blank" > Harness user group </a> to an Okta user group. When an Okta user in that Okta user group logs in to Harness, they are automatically added to the associated Harness user group, and the user inherits all permissions and access assigned to that group. For more information, go to <a href="/docs/platform/role-based-access-control/rbac-in-harness"target="_blank" > RBAC in Harness </a>.

1. Set up SAML SSO in Harness as described in [SAML SSO with Okta](#saml-sso-with-okta).

   Enabling SAML authorization will authorize the same Harness users that are authenticated using your SAML provider.

   :::info note

   Harness uses email addresses to match Harness user accounts with Okta user accounts. Make sure the email addresses of your registered Harness users match the Okta users you want to authenticate and authorize.

   :::

2. In Okta, create a user group and add users to the group, if you don't already have such a group.

	1. Sign in to Okta using Admin Account.
	2. Under **Directory**, select **Groups**, then select **Add Group**. The **Add Group** dialog opens.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-65.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	3. Enter a **Name** and **Group Description** for your group. Select **Add Group**.
	4. You are redirected to the **Groups** page. Search for the group you created, and then select it.
	5. Select **Manage People**. Find and add members to your group.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-66.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	   After adding the members to the group you created, the screen will looks like this:

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-67.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	   Both members are already registered in Harness using the same email addresses in both Harness and the SAML provider.

3. Make note of the Okta Group Name. You'll need it later to link the Okta group to a Harness user group.
4. Make sure the Okta user group is assigned to the same Okta SAML provider app you use for Harness SAML SSO.

	1. In Okta, under **Directory**, select **Groups**.
	2. Find and select your Okta user group.
	3. Select **Manage Apps**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-68.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	4. Find your Harness Okta app and select **Assign**.
	5. Select **Done**.
	6. Under **Applications**, select **Applications**.
	7. Find and select your Harness Okta app.
	8. Under **Assignments**, select **Groups**, and make sure your Okta user group is listed there.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-69.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

5. Configure the **Group Attribute Name** in your Okta app. Later, you'll use the Group Attribute Name to enable SAML authorization in Harness.

	1. In **Okta**, select **Applications**, and then select your Harness Okta SAML SSO app.
	2. Switch to the **General** tab.
	3. Under **SAML Settings**, select **Edit**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-70.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	4. Under **General Settings**, select **Next**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-71.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	5. Under **Group Attribute Statements (Optional)**, in the **Name** field, enter the Group Attribute Name you want to use, such as `dept`.

       The *Group Attribute Name* is different from an *Okta Group Name*. Your company might have many groups set up in Okta, and the Group Attribute Name is used to filter the groups that you want to authenticate to Harness.

	6. In **Filter**, select **Matches regex**, and enter `.*` as the value.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-72.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	7. Select **Next**, and then select **Finish**.

6. Make sure you have the following information from Okta:

   * **Group Name:** This is the name of the Okta user group containing the users you want to authorize in Harness. The email addresses registered in this group must be the same as the email addresses these users have registered in Harness.
   * **Group Attribute Name:** This is the Group Attribute Name associated with the Okta app you use for authentication.

   The *Group Attribute Name* is different from an *Okta Group Name*. Your company might have many groups set up in Okta, and the Group Attribute Name is used to filter groups.

   In Harness, you enter the Group Attribute Name in the SAML SSO provider settings, and then you link the Okta Group Name to the Harness user group.

   If you're configuring multiple groups, you need all the Group Names. You can only have one Group Attribute Name.

7. In Harness, go to **Account Settings**, and select **Authentication**.
8. Select the arrow to expand the **Login via SAML** section.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-73.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

9. Select **More options** (&vellip;) next to your Okta provider configuration, and then select **Edit**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-111.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

10. On the **Edit SAML Provider** page, select **Enable Authorization**.
11. Enter the **Group Attribute Name**.

    <div style={{textAlign: 'center'}}>
       <DocImage path={require('../static/single-sign-on-saml-74.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

12. Select **Add**. Your Okta configuration now uses the Group Attribute Name for authorization.
13. Link your Okta user group to a corresponding [Harness user group](/docs/platform/role-based-access-control/add-user-groups). You can create a user group or use an existing group if your Harness user account is a member and your user account is registered under the same email address as in Okta.

	1. In Harness, go to **Account Settings**, and select **Access Control**.
	2. Select **User Groups** in the header, and locate the user group that you want to connect to your Okta user group.
	3. Select **Link to SSO Provider Group**.

	    <div style={{textAlign: 'center'}}>
	       <DocImage path={require('../static/single-sign-on-saml-75.png')} width="80%" height="40%" title="Click to view full size image" />
	    </div>

	4. In **Search SSO Settings**, select your Okta SAML SSO configuration.
	5. Enter the Okta **Group Name**, and select **Save**.

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-76.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	6. Repeat these steps if you need to connect more user groups.

14. To test the SAML authorization configuration, log into Harness through a different user account. Do this in a separate private browsing (Incognito) window so you can disable SSO in your Harness Administrator account if there are any errors.

    1. In a private browsing window, navigate to Harness.
    2. Log in using a Harness [user account](/docs/platform/role-based-access-control/add-users) that has a corresponding email address registered in Okta. If successful, you're redirected to the Okta log in page.
    3. On the Okta log in page, enter the email address associated with the Harness user account. The Harness account and Okta account can have different passwords. If successful, you'll be returned to Harness.

    :::info note

    If you get locked out of Harness due to an SSO issue, you can log into Harness through [local login](#harness-local-login).

    :::

    4. In your other browser window (where you are logged in to your admin account), make sure the user appears in the Harness user group. Go to **Account Settings**, select **Access Control**, select **User Groups** in the header, select the user group you linked to Okta, and make sure the user you just logged in with is listed as a member.

    By being a member of this user group, the user receives the permissions and access granted to that group. For more information about this, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

:::tip Delink groups

If you no longer want a Harness user group to be connected with an Okta user group, you can delink the groups without losing group members.

Delinking groups is required to remove a SAML SSO provider configuration from Harness. You can't delete the SAML SSO provider from Harness until you have delinked all associated Harness user groups.

1. In Harness, go to **Account Settings**, and select **Access Control**.
2. Select **User Groups** in the header, and locate the user group that you want to delink.
3. Select **Delink Group**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-77.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. On the **Delink Group** window, you can select **Retain all members in the user group** to keep the users (as local Harness user accounts) in the Harness user group. If unselected, the groups are delinked and the group members who were authenticated through Okta are removed from the Harness user group.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-78.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. Select **Save**.

:::

---

## Next steps
- <a href="/docs/platform/authentication/single-sign-on-saml/ms-entra-id"target="_blank" >SAML SSO with Microsoft Entra ID</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/saml-sso-with-onelogin"target="_blank" >SAML SSO with OneLogin</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak"target="_blank" >SAML SSO with Keycloak</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration"target="_blank" > Advanced SAML configuration</a>