---
title: Microsoft Entra ID 
description: This document explains SAML single sign-on with Microsoft Entra ID.
sidebar_position: 3
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

## What will you learn in this topic?

By the end of this topic, you will be able to understand:
- How to configure Microsoft Entra ID as a SAML SSO provider in Harness.
- How to setup authentication and user attribute mapping.
- How to enable and test SAML authorization with Azure.

---

## Before you begin

- A Harness account with Account Admin permissions.
- An existing Microsoft Entra ID tenant with permissions to create and configure enterprise applications.
- Users already provisioned in Microsoft Entra ID app, with the same email addresses they'll use in Harness.

---

Harness supports Single Sign-On (SSO) with SAML using Microsoft Entra ID, enabling Microsoft Entra ID users to log into Harness using their Microsoft Entra ID credentials.

For detailed steps on adding SAML SSO with Microsoft Entra ID, follow Microsoft's tutorial on [Microsoft Entra single sign-on (SSO) integration with Harness](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/harness-tutorial).

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview"target="_blank" > Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

The section describes the Microsoft Entra ID-specific steps you must perform to use an Microsoft Entra ID app for Harness SAML SSO:

:::info note
- Users are not created as part of the SAML SSO integration. Users are invited to Harness using their email addresses. Once they log into Harness, their email addresses are registered as Harness Users. For more information, go to <a href="/docs/platform/authentication/single-sign-on-saml/overview#saml-sso-with-harness"target="_blank" > Overview of SAML SSO with Harness </a>.

:::

The following image shows the basic exchange of information between Harness and your Microsoft Entra ID app's Single sign-on settings:

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/single-sign-on-saml-79.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Azure user accounts

The Harness User accounts and their corresponding Azure user accounts must have the same email addresses.

Ensure that you have at least two corresponding user accounts in both Harness and your Azure app when setting up and testing SAML SSO. This allows you to set up the account with a Harness Administrator account and test it with a Harness user account.

The following image shows a Harness User Group containing two users and their corresponding accounts in the Azure app that will be used for SAML SSO.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/single-sign-on-saml-80.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Endpoint URL for Azure

You must enter the **Harness SAML Endpoint URL** from Harness in your Azure app **Reply URL**:

1. In your Azure app, click **Single sign-on**. The SSO settings for the Azure app are displayed.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-81.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. In **Basic SAML Configuration**, click the edit icon (pencil).
3. Enter a unique identifier in the **Identifier (Entity ID)** field. When your tenant only has one SAML application, this can be `app.harness.io`. If there are several SAML applications in the same tenant, this should be a unique identifier. While setting up SAML in Harness, the same identifier should be configured in the **Entity ID** field.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-82.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

Next, you will use the **SAML SSO Provider** settings in Harness to set up your Azure app **Single sign-on**.

:::info note
For [Harness Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition/smp-overview), replace **app.harness.io** with your custom URL.
If you use a custom Harness subdomain in any Harness version, like **example.harness.io**, use that URL.
:::

4. In **Home**, under **ACCOUNT SETUP**, select **Authentication**. **The Authentication: Configuration** page appears.
5. Select **SAML Provider**. The **Add SAML Provider** page opens.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-83.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. In **Name**, enter a name for the SAML SSO Provider.
7. Under **Select a SAML Provider**, select **Azure**. The settings for Azure setup are displayed:

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-84.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

8. Copy the **Harness SAML Endpoint URL** from the **Add SAML Provider** dialog, and paste it in the **Reply URL** in your Azure app.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-85.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

9. Click **Save** on the Azure App SAML Settings page.

---

## User attributes and claims

Next, you need to ensure that Harness Users' email addresses will identify them when they log in via Azure. To do this, you set up the **Single sign-on** section of your Azure app to use the **User name** email address as the method to identify users.

The Azure users that are added to your Azure app must have their email addresses listed as their **User name.**

To set this **User name** email address as the method for identifying users, in the Azure app **Single sign-on** section, the Azure app must use the **user.userprincipalname** as the **Unique User Identifier**, and **user.userprincipalname** must use **Email address** as the **name identifier format**.

:::info note
If **user.userprincipalname** can't use an email address as the **Name ID format**, then **user.email** should be used as the unique identifier in the **Identifier (Entity ID)** field.
:::

To set this up in your Azure app, do the following:

1. In your Azure app, in the **Single sign-on** blade, in **User Attributes & Claims**, click the edit icon (pencil). The **User Attributes & Claims** settings appear.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-86.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. For **Unique User identifier value**, click the edit icon. The **Manage claims** settings appear.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-87.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Click **Choose name identifier format**, and select **Email address**.
4. In **Source attribute**, select **user.userprincipalname**.
5. Click **Save**, and then close **User Attributes & Claims**.

:::info note
If your Azure users are set up with their email addresses in some field other than **User name**, just ensure that the field is mapped to the **Unique User Identifier** in the Azure app and the **name identifier format** is **Email address**.
:::

---

## Azure SAML metadata file

You must download the **Federation Metadata XML** from your Azure app and upload the file into Harness.

1. Download the **Federation Metadata XML** from your Azure app and upload it using **Upload the identity Provider metadata xml downloaded from your Azure App** in the **Add SAML Provider** settings in Harness.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-88.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. Select **Add Entity ID** and enter your custom Entity ID. The default Entity ID is **app.harness.io**. The value you enter here will override the default Entity ID.
3. Click **Add**. The new Azure SAML Provider is added.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-89.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

---

## Enable and test SSO with Azure

Now that Azure is set up in Harness as a SAML SSO provider, you can enable and test it.

You can test the Azure app SSO from within Azure if you are logged into Azure using an Azure user account that has the following:

* A corresponding Harness User account with the same email address.
* The Azure user account is in the Azure app **Users and groups** settings.
* The Azure user account has the Global Administrator Directory role in Azure.

To test Azure SSO using Azure, do the following:

1. In the Azure app, click **Single sign-on**, and then at the bottom of the **Single sign-on** settings, click **Test**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-90.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. In the **Test** panel, click **Sign in as current user**. If the settings are correct, you are logged into Harness. If you cannot log into Harness, the **Test** panel will provide debugging information. For more information, go to [Debug SAML-based single sign-on to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/debug-saml-sso-issues?WT.mc_id=UI_AAD_Enterprise_Apps_Testing_Experience) from Microsoft Entra ID.

To test Azure SSO using Harness, do the following:

1. In **Harness**, in **Account Settings** → **Security and Governance** → **Authentication**, select **Login via SAML**, to enable SAML SSO using the Azure provider.
2. Open a new Chrome Incognito window to test the SSO login using a Harness User account other than the one you are currently logged in with.
3. Sign into Harness using one of the user account email addresses shared by Harness and Azure. When you sign into Harness, you are prompted with the Microsoft Sign in dialog.
4. Enter the Azure user name for the user (most often, the email address), enter the Azure password, and click **Sign in**.

---

## SAML authorization with Azure

Once you have enabled Harness SSO with your Azure app, you can set up and enable SAML authorization in Harness using Azure.

To set up SAML authorization in Harness, you link a Harness User Group to a user group assigned to your Azure app. When a user from your Azure app logs into Harness, they are automatically added to the linked Harness User Group and inherit all the RBAC settings for that Harness User Group.

Below is the Harness SAML settings you need from Azure to set up SAML authorization in Harness:

* **Group Attribute Name** - In Azure, this value is obtained from the **Group Claims** in the Azure app **User Attributes & Claims** settings.

For Harness **Group Attribute Name**, here is the Harness **SAML Provider** setting on the left and their corresponding Azure **Group Claims** settings on the right:

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/single-sign-on-saml-91.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

To set up Azure Authorization in Harness, do the following:

1. In Azure, add the **Group Claim** (Name and Namespace) to the Azure app.
	1. In your Azure app, click **Single sign-on**, and then in **User Attributes & Claims**, click edit (pencil icon).

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-92.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	2. In **User Attributes & Claims**, edit the groups claim. The **Group Claims** settings appear.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-93.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	3. Click the **All groups** option and then enable **Customize the name of the group claim**.
	4. In **Name**, enter a name to use to identify the Harness Group Attribute Name.
	5. In **Namespace**, enter a namespace name.
	6. Click **Save**. **User Attributes & Groups** now display the group claim you created.
	7. Close **User Attributes & Groups**.
2. In Harness, enter the Group Claim name and namespace in the SAML SSO Provider **Group Attribute Name** field.
	1. Open the SAML SSO Provider dialog, and enable the **Enable Authorization** setting. You need to enable **Enable Authorization** in order to select this SSO Provider when you link a Harness User Group for authorization.
	2.  Enter the Group Claim name and namespace in the **Group Attribute Name** field in the same format as a Claim Name (`namespace/name`). The SAML SSO Provider dialog will look something like this:

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-94.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	3. Click **Save**. Authorization and the Group Attribute Name are set up. Next, you need to set up your Azure and Harness groups.
3. In Azure, ensure the Azure users with corresponding Harness accounts belong to an Azure group. Here is an Azure group named **ExampleAzureGroup** with two members:

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-95.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Ensure that the Azure group is assigned to the Azure app. Here you can see the **ExampleAzureGroup** group in the Azure app's **Users and groups**:

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-96.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. Link the Harness User Group to the Azure group using the Azure group Object ID.
	1. In Azure, copy the Azure group **Object ID**.

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-97.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	2. In Harness, create a new User Group or open an existing User Group.
	3. In **Account Settings**, click **User Groups** and then click on the User Group you want to link the SAML SSO Provider to**.**
	4. Click **Link to SSO Provider Group**.

	    <div style={{textAlign: 'center'}}>
	       <DocImage path={require('../static/single-sign-on-saml-98.png')} width="80%" height="40%" title="Click to view full size image" />
	    </div>

	5. In the **Link to SSO Provider Group** dialog, in **SSO Provider**, select the Azure SSO Provider you set up, and in **Group Name**, paste the Object ID you copied from Azure. When you are done, the dialog will look something like this:

       <div style={{textAlign: 'center'}}>
          <DocImage path={require('../static/single-sign-on-saml-99.png')} width="80%" height="40%" title="Click to view full size image" />
       </div>

	6. Click **Save**. The User Group is now linked to the SAML SSO Provider and Azure group Object ID.
6. Test Authorization.
	1. Open a new Chrome Incognito window to test the authorization using a Harness User account other than the one you are currently logged in with.
	2. Log into Harness using the user email address, and sign in using the Azure username and password. If you are already logged into Azure in Chrome, you might be logged into Harness automatically.
	3. In the linked Harness User Group, ensure that the Harness User account you logged in with was added.

The Harness User is now added and the RBAC settings for the Harness User Group are applied to its account. For more information, go to <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage User Groups</a>.

---

## Users in over 150 groups

When a user has many group memberships, the number of groups listed in the token can grow the token size. Microsoft Entra ID limits the number of groups it will emit in a token to 150 for SAML assertions.

If a user is a member of a larger number of groups, the groups are omitted and a link to the Graph endpoint to obtain group information is included instead.

To invoke the API, Harness requires **Client ID** and **Client Secret** for your registered app.

To get this information, do the following:

1. In your Azure account, go to **App registrations**.
2. Click on your app. Copy the Application (client) ID and paste it in **Client ID** in your Harness account.
3. In your Azure account, go to **App registrations**. Click **Certificates and Secrets**.
4. Select **New Client Secret**.
5. Add a description and click **Add**.
6. You must copy this secret and save it as an encrypted text secret. For detailed steps to create an encrypted text in Harness, go to <a href="/docs/platform/secrets/add-use-text-secrets"target="_blank" > Use Encrypted text Secrets </a>.
7. Select the above secret reference in the **Client Secret** field in your Harness account.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-100.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

When the user authenticating SAML is part of more than 150 groups in Microsoft Entra ID, you must set `User.Read.All` access for the application if you want to configure the optional **Client ID** and **Client Secret**. For more information on Azure application permissions, go to [Application permissions](https://learn.microsoft.com/en-us/graph/permissions-reference#application-permissions-93) in the Azure documentation.

To set `User.Read.All` access for the application, do the following:

1. In Azure, go to **Manage**, and then select **API Permissions**.
2. Select **Add a permission**.
3. Under **Microsoft APIs**, select Microsoft Graph, and then select **Application permissions**.
4. Add the `User.Read.All` permission.

The following App registration permissions are required to configure the optional `client-id` and `client-secret` for Harness SAML SSO with the Azure app:

- `Directory.Read.All`
- `Group.Read.All`
- `GroupMember.Read.All`
- `User.Read.All`

:::info note
You must set the above for both Delegated permissions and Application permissions.
:::

## Next steps

- <a href="/docs/platform/authentication/single-sign-on-saml/okta"target="_blank" >SAML SSO with Okta</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/saml-sso-with-onelogin"target="_blank" >SAML SSO with OneLogin</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak"target="_blank" >SAML SSO with Keycloak</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration"target="_blank" > Advanced SAML configuration</a>