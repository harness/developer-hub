---
title: OneLogin
description: This document explains SAML single sign-on with OneLogin.
sidebar_position: 4
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

## What will you learn in this topic?

By the end of this topic, you will be able to understand:

- How to configure OneLogin as a SAML SSO provider in Harness.
- How to assign users, and test OneLogin authorization.

---

## Before you begin

- A Harness account with Account Admin permissions.
- An existing OneLogin account with admin access to create and configure applications.

---

You can use OneLogin as a SAML identity provider for Harness, allowing OneLogin users to log in to Harness with their existing credentials. Once configured, Harness delegates authentication to OneLogin and can optionally sync OneLogin roles to Harness user groups for automatic access control.

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview"target="_blank" > Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

To set up OneLogin as a SAML SSO provider on Harness, you exchange the necessary information between the OneLogin Harness application and Harness. The following sections cover Authentication steps, followed by Authorization steps.

## OneLogin authentication on Harness

Enabling OneLogin authentication on Harness requires configuration on both platforms, as described in these sections:

### Exchange Harness Consumer URL and OneLogin Metadata

1. In **Home**, click **Authentication** under **ACCOUNT SETUP**. **The Authentication: Configuration** page appears.
2. Click **SAML Provider**. The **Add SAML Provider** page appears.
3. In **Name**, enter a name for the SAML SSO Provider.
4. Select **OneLogin** under **Select a SAML Provider**. The settings for OneLogin setup are displayed.
5. Copy the provided URL under **Enter the SAML Endpoint URL, as your Harness OneLogin application's ACS URL**, to clipboard.
6. In OneLogin, add the **Harness** app (for SaaS setup) or **Harness (On Prem)** app for Harness Self-Managed Enterprise Edition setup. To do so, perform the following steps:
	1. Log in to OneLogin.
	2. Click **Administration**.
	3. Under the **Applications** tab, click **Applications**.
	4. Click **Add App**.
	5. Find **Harness** or **Harness (On Prem)** based on your setup, and then click the app.

	   <div style={{textAlign: 'center'}}>
	     <DocImage path={require('../static/single-sign-on-saml-101.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

7. In **Configuration**, paste this URL into the **SCIM Base URL** field.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-102.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

8. Skip all other **Application Details** fields, and click **Save**.
9. Navigate to OneLogin's **Applications** > **SSO** tab. At the upper right, select **More Actions** > **SAML Metadata**.

	<div style={{textAlign: 'center'}}>
	  <DocImage path={require('../static/single-sign-on-saml-103.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

10. From the resulting dialog, download the .xml authentication file that you'll need to upload to Harness.

### Assign users to roles

1. In OneLogin, select **Users** > **Users**.

:::tip
   If you prefer to assign *groups* to roles, instead start at **Users** > **Groups**, and modify the following instructions accordingly.
:::

2. Search for a user that you want to add to Harness.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-104.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Click to select the user.
4. The **Users** page appears. Click the **Applications** tab.
5. Click the **+** button at the upper right to assign an Application.
6. Select the Application, then click **Continue**.
7. Repeat this section for other users (or groups) that you want to add to Harness.

### Enable OneLogin as a Harness SSO provider

1. In **Account Settings**, select **Authentication** and the configuration page appears.
2. Click to expand the **Login via SAML** section.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-105.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. You can see the SSO Provider you have setup listed in this section. Click the vertical ellipsis (**︙**) next to the SSO Provider you have set up for SSO authentication, and click **Edit**.
4. Use **Choose File** to upload the .xml file that you obtained from OneLogin.
5. Deselect **Enable Authorization**.
6. Select **Add Entity ID** and enter your custom Entity ID. The default Entity ID is **app.harness.io**. The value you enter here will override the default Entity ID.
7. Click **Add**.
8. Click **Login via SAML** toggle, to enable your new provider.
9.  In the resulting **Enable SAML Provider** dialog, click **TEST** to verify the SAML connection you've configured.

	<div style={{textAlign: 'center'}}>
	  <DocImage path={require('../static/single-sign-on-saml-106.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

10. Once the test is successful, click **Confirm** to finish setting up OneLogin authentication.

---

## OneLogin authorization on Harness

Once you've enabled OneLogin authentication on Harness, refer to the below sections to enable authorization between the two platforms:

### Assign roles to users

Harness' SAML authorization replicates OneLogin Roles as Harness User Groups. Here is how to begin mapping between these entities.

1. From OneLogin's, menu, select **Users** > **Users**.
2. Find and select a user, assigned to Harness, to assign appropriate OneLogin Roles.
3. Click the **Applications** tab.
4. Select the specific Roles you want to assign to this user.
5. Click **Save User** at the upper right.
6. Repeat this section for other users to whom you want to assign Roles.

### Define parameters

1. Select **Applications** > **Parameters**, then select the `+` button to add a new Parameter.
2. In the resulting **New Field** dialog, assign a **Field name** (for example **Groups**).

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-107.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Select **Include in SAML assertion** and **Multi-value parameter**. Then click **Save**.
4. Back on the **Parameters** tab, select your new **Groups** field.
5. In the resulting **Edit Field Groups** dialog, set **Default if no value selected** to **User Roles**. Below that, select **Semicolon Delimited input (Multi-value output)**. Then select **Save**.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-108.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. Select **Save** again at the **Parameters** page's upper right.

### Sync users in Harness

1. In **Home**, click **Authentication** under **ACCOUNT SETUP**. **The Authentication: Configuration** page appears.
2. Click to expand the **Login via SAML** section.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-109.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. You can see the SSO Provider you have set up listed in this section. Click the vertical ellipsis (**︙**) next to the SSO Provider you have set up for SSO authentication, and click **Edit**.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/single-sign-on-saml-111.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. In the **Edit SAML Provider** dialog, click **Enable Authorization**.
5. In **Group Attribute Name**, enter the name of the **Field Group** you configured in OneLogin.
6. Click **Save**.
7. Under **ACCOUNT SETUP** click **User Groups**.
8. Click on the User Group you want to link the SAML SSO Provider to**.**
9. Click **Link to SSO Provider Group**.
10. In the **Link to SSO Provider Group** dialog, in **Search SSO Settings**, select the SAML SSO Provider you have set up.
11. In the **Group Name**, enter the name of the Field Group you configured in OneLogin.
12. Click **Save**.

### Test the integration

After you've synced Users between OneLogin and Harness, users will be assigned to the designated Harness User Group upon your next login to Harness. To test whether OneLogin authentication and authorization on Harness are fully functional do the following:

1. In Chrome, open an Incognito window, and navigate to Harness.
2. Log into Harness using the email address of a Harness User that is also used in the SAML provider group linked to the Harness User Group.
When the user submits their email address in Harness Manager, the user is redirected to the SAML provider to log in.
3. Log into the SAML provider using the same email that the user is registered with, within Harness.
Once the user logs in, the user is redirected to Harness and logged into Harness using the SAML credentials.
4. In your Harness account in the other browser window, check the User Group you linked with your SAML provider. The user that logged in is now added to the User Group, receiving the authorization associated with that User Group.

:::info note
You cannot delete a SAML SSO Provider from Harness that is linked to a Harness Group. You must first remove the link to the SSO Provider from the Group.
:::

---

## Next steps

- <a href="/docs/platform/authentication/single-sign-on-saml/okta"target="_blank" >SAML SSO with Okta</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/ms-entra-id"target="_blank" >SAML SSO with Microsoft Entra ID</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak"target="_blank" >SAML SSO with Keycloak</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration"target="_blank" > Advanced SAML configuration</a>