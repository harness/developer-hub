---
title: OneLogin
description: This document explains how you can use OneLogin as a SAML identity provider for Harness.
sidebar_position: 4
redirect_from:
  - /docs/platform/authentication/single-sign-on-saml#saml-sso-with-onelogin
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

You can use OneLogin as a SAML identity provider for Harness, allowing OneLogin users to log in to Harness with their existing credentials. Once configured, Harness delegates authentication to OneLogin and can optionally sync OneLogin roles to Harness user groups for automatic access control.

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank"> Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to understand:

- How to configure OneLogin as a SAML SSO provider in Harness.
- How to assign users, and test OneLogin authorization.
- How to login to Harness using OneLogin credentials.

---

## Before you begin

- A Harness account with Account Admin permissions.
- An existing OneLogin account with admin access to create and configure applications.
- A <a href="/docs/platform/role-based-access-control/add-user-groups/#create-user-groups-manually" target="_blank" > user group </a> in Harness to link to OneLogin.
- Understand <a href="/docs/platform/authentication/single-sign-on-saml/overview#saml-sso-with-harness" target="_blank"> SAML SSO with Harness </a>.

---

## OneLogin authentication on Harness

Enabling OneLogin authentication on Harness requires configuration on both Harness and OneLogin.

Use two browser windows or tabs for this process. Open OneLogin in one tab and Harness in the other.


### Obtain SAML endpoint URL

To get the SAML Endpoint URL from Harness to configure OneLogin:

1. In Harness, go to **Account Settings** and select **Authentication**. 

  <div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/acc-auth.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

  The Authentication page appears.

2. Click **+ SAML Provider** (if you are configuring SAML for the first time) or **Login via SAML** (if you have already configured SAML providers). Select **Add SAML Provider**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/add-provider.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

3. In **Name**, enter a name for the SAML SSO Provider. Select **Continue**.

4. Select **OneLogin** under **Select a SAML Provider**. Select **Continue**.

  The settings to configure OneLogin setup are displayed.

5. Copy the URL provided under **Enter the SAML Endpoint URL, as your Harness OneLogin application's ACS URL**, to clipboard.

<div style={{textAlign: 'center'}}>
<DocImage path={require('../static/onelogin-auth.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

    
    After copying the URL in step 5, keep the tab open, and [Add Harness app to OneLogin](#add-harness-app-to-onelogin).

### Add Harness app to OneLogin

Add the **Harness** app (for SaaS setup) (or **Harness (On Prem)** app for Harness Self-Managed Enterprise Edition setup) and configure it inside OneLogin so OneLogin knows where to send SAML metadata.

1. Log in to OneLogin. Under the **Applications** tab, click **Applications**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/app-search-1.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

2. Select **Add App**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/add-app-2.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

3. Find **Harness** or **Harness (On Prem)** based on your setup, and then select it.

	<div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/single-sign-on-saml-101.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

4. In **Configuration**, paste this URL into the **SCIM Base URL** field. Skip all other **Application Details** fields, and click **Save**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/single-sign-on-saml-102.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

5. Navigate to **SSO** tab. At the upper right corner, select **More Actions** and then select **SAML Metadata**. This downloads the .xml authentication file that you'll need to upload to Harness when you [enable OneLogin as a Harness SSO provider](#enable-onelogin-as-a-harness-sso-provider). 

	<div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/single-sign-on-saml-103.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

### Assign users to roles

To provide a OneLogin user access to the Harness application to authenticate via SSO:

1. In OneLogin, under **Users** tab, select **Users**.

  <div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/select-user.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

2. Search for a user that you want to add to Harness. Select the user.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-104.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. The **Users** page appears. Click the **Applications** tab. Click the **+** button at the upper right to assign an Application.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/assign-app.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

4. Select the Application, then select **Continue**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/new-login-assign.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

5. Repeat this section for other users (or groups) that you want to add to Harness.

### Assign users to groups

If you have multiple users requiring OneLogin access, you can (optionally) create a group and add multiple users into it.
To create a group:

1. In OneLogin, under **Users**, select **Groups**.

2. Select **New Group** on upper right to create a group.

3. Provide a **Name**, select the green check mark. Click **Save**.

4. Under **Users** tab, select **Users** and select the user you want to add to a group. Go to **Authentication** tab and select the group from the dropdown, and select **Save User**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/save-user-group.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>


### Enable OneLogin as a Harness SSO provider

To upload the OneLogin metadata into Harness and activate the SAML connection to complete the authentication setup:

Return to the Harness browser tab you left open in step 5 of [Obtain SAML endpoint URL from Harness](#obtain-saml-endpoint-url).

1. Select **Upload** to upload the .xml file that you obtained from OneLogin.

2. Deselect **Enable Authorization**. Select **Add Entity ID** and enter your custom Entity ID. The default Entity ID is **app.harness.io**. The value you enter here overrides the default Entity ID. Select **Add**. 

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/onelogin-auth-2.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

    This configures a new OneLogin provider that you can use to log in to Harness.

3. To enable the new provider that you configured, click **Login via SAML** toggle.

4.  In the resulting **Enable SAML Provider** dialog, click **Test** to verify the SAML connection you've configured.

	<div style={{textAlign: 'center'}}>
	  <DocImage path={require('../static/single-sign-on-saml-106.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

5. Once the test is successful, select **Confirm** to finish setting up OneLogin authentication.

---

## OneLogin authorization on Harness

Once you've enabled [OneLogin authentication](#onelogin-authentication-on-harness) on Harness, refer to the below sections to enable authorization between the two platforms to control what users can do inside Harness.

### Assign roles to users

Harness' SAML authorization replicates [**OneLogin Roles**](https://onelogin.service-now.com/support?id=kb_article&sys_id=cc2e602a973b2150c90c3b0e6253af3c&kb_category=566ffd6887332910695f0f66cebb3556) as **Harness User Groups**.

**Harness User Groups** is a collection of multiple Harness users. You assign roles and resource groups to a user group, and the permissions and access granted by those assignments are automatically applied to all members of the group. For more information, go to [Manage Harness Groups](/docs/platform/role-based-access-control/add-user-groups/).

Follow the steps below to map these entities:

1. From OneLogin's menu, under **Users** tab, select **Users**.

2. Find and select a user that is assigned to Harness, to assign appropriate OneLogin Roles. Select the **Applications** tab of the user you selected. Select the specific Roles you want to assign to this user. Select **Save User** at the upper right.

  <div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/manage-user-2.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>
 
Repeat this section for other users to whom you want to assign Roles.


### Define parameters

Before defining parameters, enable provisioning in your OneLogin application. Go to **Applications** → your application → **Provisioning**, and under **Workflows**, select the **Enable provisioning** checkbox.

Once provisioning is enabled, define a parameter to include role information in the SAML assertion so Harness can map users to the correct User Groups.


1. Under **Applications**, select your application. 

  <div style={{textAlign: 'center'}}>
	<DocImage path={require('../static/provision-0.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

Your application page appears in OneLogin.

2. Select the **Parameters** tab in your application, then select the `+` button to add a new Parameter.

3. In the resulting **New Field** dialog, assign a **Field name** (for example **Groups**).

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-107.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Select **Include in SAML assertion** and **Multi-value parameter**. Then click **Save**.

5. Back on the **Parameters** tab, select your new **Groups** field.
6. In the resulting **Edit Field Groups** dialog, set **Default if no value selected** to **User Roles**. Below that, select **Semicolon Delimited input (Multi-value output)**. Click **Save**.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-108.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

7. Click **Save** again at the **Parameters** page's upper right.

### Sync users in Harness

Configure Harness to recognize the OneLogin group and link it to a Harness user group so permissions are inherited on login.

1. In **Account Settings**, select **Authentication**.
2. Click to expand the **Login via SAML** section.

3. You can see the SSO Provider you have set up listed in this section. Select the vertical ellipsis (**︙**) next to the SSO Provider you have set up for SSO authentication, and select **Edit**.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-111.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. In the **Edit SAML Provider** dialog, enable **Enable Authorization**. In **Group Attribute Name**, enter the name of the **Field Group** you configured in OneLogin. Click **Save**.

5. Under **Account Settings**, under **Users**, select **User Groups**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/user-group-1.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

6. Click on the **User Group** that you want to link the SAML SSO Provider to. To create a new user group, go to <a href="/docs/platform/role-based-access-control/add-user-groups/#create-user-groups-manually" target="_blank" > Create User Groups manually </a>.

7. Select **Link to SSO Provider Group**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/link-sso-onelogin.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>

8. In the **Link to SSO Provider Group** dialog, in **Search SSO Settings**, select the SAML SSO Provider you have set up. In the **Group Name**, enter the name of the **Field Groups** you configured in OneLogin. Click **Save**.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('../static/sso-provider-onelogin.png')} width="80%" height="40%" title="Click to view full size image" />
  </div>


### Test the integration

After you've synced Users between OneLogin and Harness, users will be assigned to the designated Harness User Group upon your next login to Harness. To test whether OneLogin authentication and authorization on Harness are fully functional do the following:

1. In Chrome, open an Incognito window, and navigate to Harness.

2. Log into Harness using the email address of a Harness User that is also used in the SAML provider group linked to the Harness User Group.
  
    **Result:** When the user submits their email address in Harness Manager, the user is redirected to the SAML provider to log in.

3. Log into the SAML provider using the same email that the user is registered with, within Harness.
  
    **Result:** Once the user logs in, the user is redirected to Harness and logged into Harness using the SAML credentials.

4. In your Harness account in the other browser window, check the User Group you linked with your SAML provider. 


    **Result:** The user that logged in is now added to the User Group, receiving the authorization associated with that User Group.

:::info note
You cannot delete a SAML SSO Provider from Harness that is linked to a Harness Group. You must first remove the link to the SSO Provider from the Group.
:::

---

## Next steps

- <a href="/docs/platform/authentication/single-sign-on-saml/okta"target="_blank" >SAML SSO with Okta</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/ms-entra-id"target="_blank" >SAML SSO with Microsoft Entra ID</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak"target="_blank" >SAML SSO with Keycloak</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration"target="_blank" > Advanced SAML configuration</a>