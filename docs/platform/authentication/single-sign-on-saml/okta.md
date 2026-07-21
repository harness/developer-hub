---
title: Okta
description: Use Okta as a SAML SSO provider to let your users log into Harness with their Okta credentials.
sidebar_position: 2
keywords:
  - Okta
  - SAML
  - SSO
  - single sign-on
  - Okta SAML
  - Okta SSO
  - identity provider
  - IdP
  - Okta authentication
  - SAML authorization
  - group attribute statements
  - Okta app integration
  - SAML metadata
  - Okta groups
  - JIT provisioning
  - just-in-time provisioning
tags:
  - Authentication
  - SAML
  - SSO
  - Okta
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Okta acts as a SAML identity provider (IdP) for Harness, so your users authenticate with their existing Okta credentials. This page walks you through creating an Okta app integration, exchanging the SAML metadata with Harness, and enabling group-based authorization so Okta group members map automatically to Harness user groups.

When a user attempts to log in to Harness, Harness redirects them to Okta for authentication. After successful authentication, Okta sends a signed SAML assertion containing user attributes back to Harness, which validates it and grants access. Optionally, Okta includes group membership information in the SAML assertion through group attribute statements, so Harness assigns users to corresponding Harness user groups for role-based access control (RBAC).

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Create a SAML app integration in Okta](#step-2-create-app-integration-in-okta) for Harness.
- [Configure Harness to use Okta](#step-3-okta-saml-metadata-file) as a SAML SSO provider.
- [Enable and test](#step-4-enable-sso-with-okta) SSO Okta login.
- Set up [SAML authorization](#step-5-saml-authorization-with-okta) using Okta.
- Use [Just-in-Time (JIT) provisioning](#just-in-time-jit-provisioning) to automatically create users on first login.

---

## Before you begin

Before you configure Okta as the SAML identity provider for Harness, ensure you have the following:

- **Harness account access**: A Harness account with Account Admin permissions.
- **Okta account access**: An Okta account with admin access.
- **Provisioned Okta users**: Users already provisioned in Okta, with the same email addresses they use in Harness.

---

## Set up your workspace

Prepare both applications before you configure SAML so you can copy values between them without losing your place. Use two browser windows or tabs for this process: open Okta in one tab and Harness in the other.

In your Harness tab, <a href="/docs/platform/authentication/authentication-overview#enable-multiple-identity-providers" target="_blank">add a SAML provider</a>.

:::note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank">Harness Self-Managed Enterprise Edition</a>, your instance must be accessed through an HTTPS load balancer, otherwise SAML authentication fails over HTTP.

- Users are not created as part of the SAML SSO integration. Okta user accounts must exist before you exchange information between your Okta account and Harness.
- Users are invited to Harness using their email addresses. After they log into Harness, their email addresses are registered as Harness users. Go to <a href="/docs/platform/authentication/single-sign-on-saml/overview" target="_blank">SAML SSO with Harness</a> for more information on user registration.
:::

---

## Step 1: Set up user accounts in Okta and Harness

To set up SAML support in your Okta Harness app, ensure that the app has corresponding users in Harness:

1. In Harness, add the users you want to set up for SAML SSO by <a href="/docs/platform/get-started#invite-collaborators" target="_blank">inviting them to Harness</a> using the same email addresses that they use in your SAML provider.
2. In Okta, assign them to your SAML provider app.

:::tip
- The only user property that must match between a Harness user and its corresponding SAML provider user account is its **email address**.
- Sometimes users have mixed case email addresses in Okta. In these situations, Harness converts the email address to lowercase when adding them to Harness.
:::

---

## Step 2: Create app integration in Okta

Create the SAML app integration in Okta to establish the trust between Okta and Harness.

1. Sign in to your Okta administrator account, and select **Applications**.
2. Click **Create App Integration**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-53.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   The **Create a new app integration** dialog opens.

3. Select **SAML 2.0**, and then click **Next**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-54.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. In **General Settings**, enter a name in the **Application label** field, and then click **Next**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-55.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. On the **Configure SAML** tab, enter the Harness SAML endpoint URL in the **Single sign on URL** field. To get the SAML endpoint URL from Harness:
	1. If you are not already on the **Add SAML Provider** page in Harness, open a new browser tab and navigate there. Sign in to Harness, navigate to **Account Settings**, select **Authentication**, select **SAML Provider**, enter a **Name** for the SAML configuration, and then select **Okta**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-56.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	2. Copy the endpoint URL from **Enter this SAML Endpoint URL as your Harness application's ACS URL**. This is the URL you paste in the **Single sign on URL** field in Okta.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-58.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	3. Keep this page open. You use it later in this process.

6. In **Audience URI (SP Entity ID)**, enter `app.harness.io`. The SAML application identifier is always `app.harness.io`.
7. In **Default RelayState**, leave the field blank. Harness uses this to exchange additional information between the IdP SAML provider (Okta) and the Service Provider (Harness), by sending Custom RelayState information.
8. In **Name ID format**, enter the username format you are sending in the SAML Response. The default format is **Unspecified**.
9. In **Application username**, enter the default username.
10. Click **Next**, and then click **Finish**.

11. Navigate to the **Sign on** tab and go to the **Attribute statements** section.

   <div style={{textAlign: 'center'}}>
	   <DocImage path={require('../static/sign-on.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

12. Expand **Show legacy configuration** and click **Edit**.
   In **Profile attribute statements**, enter a name in the **Name** field, select **Name Format** as **Basic**, and select the **Value** as **user.email**.

   When you create a new SAML integration or modify an existing one, you can define custom attribute statements. These statements are inserted into the SAML assertions shared with your app. Go to the Okta documentation on <a href="https://help.okta.com/oie/en-us/content/topics/apps/define-attribute-statements.htm" target="_blank">defining attribute statements</a> for more information on custom attribute statements.

   <div style={{textAlign: 'center'}}>
	   <DocImage path={require('../static/add-attributes.png')} width="80%" height="40%" title="Click to view full size image" />
	</div>

13. In **Group attribute statements**, enter a name in the **Name** field, select **Name format** as **Basic**, select an appropriate **Filter**, and enter its value.

   If your Okta org uses groups to categorize users, you can add group attribute statements to the SAML assertion shared with your app. Go to the Okta documentation on <a href="https://help.okta.com/oie/en-us/content/topics/apps/define-group-attribute-statements.htm" target="_blank">defining group attribute statements</a> for more information on group attribute statements.

14. Click **Save**.

---

## Step 3: Okta SAML metadata file

Download the **Identity Provider metadata** XML from your Okta app and upload it into Harness to complete the trust exchange.

1. In your Harness Okta app, navigate to the **Sign On** tab, and then click **Edit**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-60.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. Click **Copy** to copy that data into a file, and save it with an `.xml` extension.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/copy-metadata.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. In Harness, on the **Add SAML Provider** page, in **Upload the Identity Provider metadata XML downloaded from your Okta app**, click **Choose a file** or **Upload**, and select the SAML metadata file you downloaded from your Okta app.

<div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/url-id-provider.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Deselect **Enable Authorization**. The default Entity ID is `app.harness.io`. To override the default entity ID, click **Add Entity ID** and enter your custom entity ID. Click **Submit**.

<div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/deselect-auth.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

Your Okta configuration appears under **Login via SAML**.

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/add-provider.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

---

## Step 4: Enable SSO with Okta

Now that Okta is set up in Harness as a SAML SSO provider, enable and test it.

1. In Harness, navigate to **Account Settings**, and then select **Authentication**.
2. Select **Login via SAML**.
3. On the **Enable SAML Provider** confirmation window, click **Test** to verify the connection.

<div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-63.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

A new browser tab opens where you log in to **Okta**.

   If the connection test succeeds, Harness displays a **SAML test successful** banner.

4. Click **Confirm** to enable Okta SAML SSO in Harness.

### Test SSO configuration

To test the SSO configuration, log into Harness through a different user account. Do this in a separate private browsing (Incognito) window so you can disable SSO in your Harness Administrator account if there are any errors.

If you get locked out of Harness due to an SSO issue, you can log into Harness through <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration#harness-local-login" target="_blank">local login</a>.

   1. In a private browsing window, navigate to Harness.
   2. Log in using a Harness <a href="/docs/platform/role-based-access-control/add-users" target="_blank">user account</a> that has a corresponding email address registered in Okta. If successful, Harness redirects you to the Okta log in page.

   3. On the Okta log in page, enter the email address associated with the Harness user account. The Harness account and Okta account can have different passwords. If successful, you are returned to Harness.

import Llnote from '/docs/platform/shared/local-login-note.md'

<Llnote />

---

## Step 5: SAML authorization with Okta

Once you have enabled Harness SSO with your Okta app, set up and enable Okta SAML authorization in Harness.

To set up SAML authorization in Harness, link a <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Harness user group</a> to an Okta user group. When an Okta user in that Okta user group logs in to Harness, Harness adds them automatically to the associated Harness user group, and the user inherits all permissions and access assigned to that group. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

1. Set up SAML SSO in Harness as described in <a href="/docs/platform/authentication/single-sign-on-saml/okta#step-1-set-up-user-accounts-in-okta-and-harness" target="_blank">Set up user accounts in Okta and Harness</a>.

   When you enable SAML authorization, Harness authorizes the same Harness users that are authenticated using your SAML provider.

   :::note
   Harness uses email addresses to match Harness user accounts with Okta user accounts. Make sure the email addresses of your registered Harness users match the Okta users you want to authenticate and authorize.
   :::

2. In Okta, create a user group and add users to the group, if you do not already have one.

	a. Sign in to Okta using an admin account.
	b. Under **Directory**, select **Groups**, and then click **Add Group**.

      <div style={{textAlign: 'center'}}>
	   <DocImage path={require('../static/add-group.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

   The **Add Group** dialog opens.

   c. Enter a **Name** and **Group Description** for your group. Click **Save**.

	   <div style={{textAlign: 'center'}}>
	   <DocImage path={require('../static/single-sign-on-saml-65.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	d. Okta redirects you to the **Groups** page. Search for the group you created, and then select it.
	e. Click **Assign People**. Find and add members to your group. Click **Done**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-66.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

3. Make note of the Okta group name. You need it later to link the Okta group to a Harness user group.
4. Make sure the Okta user group is assigned to the same Okta SAML provider app you use for Harness SAML SSO.

	1. In Okta, under **Directory**, select **Groups**.
	2. Find and select your Okta user group.
	3. Click **Assign applications**. Find your Harness Okta app and click **Assign**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-68.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	4. Click **Done**.
	6. Under **Applications**, select **Applications**.
	7. Find and select your Harness Okta app.
	8. Under **Assignments**, select **Groups**, and make sure your Okta user group is listed there.

5. Configure the **Group attribute statements** in your Okta app. Later, you use the name configured under **Group attribute statements** to enable SAML authorization in Harness.

   a. In **Okta**, select **Applications**, and then select your Harness Okta SAML SSO app.

   b. Follow steps 11 to 14 specified in <a href="/docs/platform/authentication/single-sign-on-saml/okta#step-2-create-app-integration-in-okta" target="_blank">create app integration</a>.

   c. Under **Group attribute statements**, ensure that the **Filter** is set to **Matches regex** and is set to the **.*** value.

      <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/match-regex.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   The `Group Attribute Name` is different from an `Okta Group Name`. Your company might have many groups set up in Okta, and the Group Attribute Name filters the groups that you want to authenticate to Harness.

6. In Harness, navigate to **Account Settings**, and select **Authentication**.
7. Select the arrow to expand the **Login via SAML** section.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-73.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

8. Select **More options** (&vellip;) next to your Okta provider configuration, and then select **Edit**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-111.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

9. On the **Edit SAML Provider** page, select **Enable Authorization**.
10. Enter the **Group Attribute Name**.

    <div style={{textAlign: 'center'}}>
       <DocImage path={require('../static/single-sign-on-saml-74.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

11. Click **Add**. Your Okta configuration now uses the Group Attribute Name for authorization.
12. Link your Okta user group to a corresponding <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Harness user group</a>. You can create a user group or use an existing group if your Harness user account is a member and your user account is registered under the same email address as in Okta.

	1. In Harness, navigate to **Account Settings**, and select **Access Control**.
	2. Select **User Groups** in the header, and locate the user group that you want to connect to your Okta user group.
	3. Select **Link to SSO Provider Group**.

	    <div style={{textAlign: 'center'}}>
	       <DocImage path={require('../static/single-sign-on-saml-75.png')} width="80%" height="40%" title="Click to view full size image" />
	    </div>

	4. In **Search SSO Settings**, select your Okta SAML SSO configuration.
	5. Enter the Okta **Group Name**, and click **Save**.

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-76.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	6. Repeat these steps if you need to connect more user groups.

### Test SAML authorization

To test the SAML authorization configuration, log into Harness through a different user account.

   1. Follow the steps mentioned in <a href="/docs/platform/authentication/single-sign-on-saml/okta#test-sso-configuration" target="_blank">test configuration</a>.

   2. In your other browser window (where you are logged in to your admin account), make sure the user appears in the Harness user group. Navigate to **Account Settings**, select **Access Control**, select **User Groups** in the header, select the user group you linked to Okta, and make sure the user you just logged in with is listed as a member.

    By being a member of this user group, the user receives the permissions and access granted to that group. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on group permissions.

---

## Just-in-time (JIT) provisioning

Harness supports SAML configuration <a href="/docs/platform/authentication/single-sign-on-saml/#just-in-time-jit-provisioning" target="_blank">with or without JIT user provisioning</a>. Go to <a href="/docs/platform/role-based-access-control/provision-use-jit" target="_blank">Just-in-Time (JIT) user provisioning</a> for more information on how Harness creates users on first SAML login when JIT is enabled.

---

## Delink groups

If you no longer want a Harness user group to be connected with an Okta user group, delink the groups without losing group members.

Delinking groups is required to remove a SAML SSO provider configuration from Harness. You cannot delete the SAML SSO provider from Harness until you have delinked all associated Harness user groups.

1. In Harness, navigate to **Account Settings**, and select **Access Control**.
2. Select **User Groups** in the header, and locate the user group that you want to delink.
3. Select **Delink Group**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-77.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. On the **Delink Group** window, select **Retain all members in the user group** to keep the users (as local Harness user accounts) in the Harness user group. If unselected, the groups are delinked and the group members who were authenticated through Okta are removed from the Harness user group.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-78.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. Click **Save**.

---

## Troubleshooting

<Troubleshoot
  issue="SAML assertion validation failed when signing in to Harness with Okta"
  mode="docs"
  fallback="Ensure the SAML Endpoint URL from Harness is entered in the Single sign-on URL field in Okta. Verify the Audience URI (SP Entity ID) is set to app.harness.io. Confirm users or groups are assigned to the Harness application under the Assignments tab."
/>

---

## Related articles

- <a href="/docs/platform/authentication/single-sign-on-saml/microsoft-entra-id" target="_blank">SAML SSO with Microsoft Entra ID</a>: Configure Microsoft Entra ID as a SAML SSO provider in Harness.
- <a href="/docs/platform/authentication/single-sign-on-saml/onelogin" target="_blank">SAML SSO with OneLogin</a>: Configure OneLogin as a SAML SSO provider in Harness.
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak" target="_blank">SAML SSO with Keycloak</a>: Configure Harness to use Keycloak SAML client as an SSO provider.
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration" target="_blank">Advanced SAML configuration</a>: Configure advanced SAML options in Harness.
