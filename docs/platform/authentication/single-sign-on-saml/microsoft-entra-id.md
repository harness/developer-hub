---
title: Microsoft Entra ID
description: Configure Microsoft Entra ID as a SAML SSO provider in Harness.
sidebar_position: 3
keywords:
  - Microsoft Entra ID
  - Azure AD
  - Azure Active Directory
  - SAML
  - SSO
  - single sign-on
  - Microsoft Entra SAML
  - Azure SAML
  - Azure SSO
  - identity provider
  - IdP
  - SAML authorization
  - group claims
  - user attributes
  - federation metadata
  - Azure enterprise application
  - Microsoft authentication
tags:
  - Authentication
  - SAML
  - SSO
  - Microsoft Entra ID
  - Azure
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

You can use Microsoft Entra ID as a SAML identity provider for Harness, allowing users to log in with their existing Microsoft credentials and optionally sync Entra ID groups to Harness user groups for automatic access control.

Users are not created as part of the SAML SSO integration. They are invited to Harness using their email addresses, and once they log in, Harness registers their email addresses. For more information, go to <a href="/docs/platform/authentication/single-sign-on-saml/overview#saml-sso-with-harness" target="_blank">Overview of SAML SSO with Harness</a>.

For detailed steps on adding SAML SSO with Microsoft Entra ID, follow Microsoft's tutorial on [Microsoft Entra single sign-on (SSO) integration with Harness](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/harness-tutorial).

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank">Harness Self-Managed Enterprise Edition</a>, your instance must be accessed via an HTTPS load balancer, otherwise SAML authentication will fail over HTTP.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to understand:
- How to configure Microsoft Entra ID as a SAML SSO provider in Harness.
- How to set up authentication and user attribute mapping.
- How to enable and test SAML authorization with Azure.

---

## Before you begin

Before you configure Microsoft Entra ID app to be the SAML identity provider for Harness, ensure you have the following:
- A Harness account with Account Admin permissions.
- A Microsoft Entra ID tenant with permissions to create and configure enterprise applications.
- Users provisioned in Microsoft Entra ID with the same email addresses they use in Harness.
- At least two user accounts in both Harness and your Azure app; one Harness Administrator and one standard user.

---

## Interaction between Harness and Microsoft Entra ID 

The following diagram shows how Harness and Microsoft Entra ID exchange information during SAML SSO setup:

<DocImage path={require('../static/single-sign-on-saml-79.png')} alt="Diagram showing the SAML SSO information exchange between Harness and Microsoft Entra ID" title="Click to view full size image" />

---

## Azure user accounts

To set up and test SAML SSO, you need at least two accounts each in Harness and in your Azure app. This allows you to set up an administrator and test it with a user. 

These user accounts should share the same email address so you can configure SSO without locking yourself out and verify it works for a regular user.

The following image shows a Harness User Group with two users and their corresponding Azure accounts:

   <DocImage path={require('../static/single-sign-on-saml-80.png')} alt="Harness User Group with two users and their corresponding Microsoft Entra ID accounts" title="Click to view full size image" />

---

## Endpoint URL for Azure

Use two browser windows or tabs for this process. Open Azure app in one tab and Harness in the other. Follow the steps below to add the entity ID in Harness.

### Step 1. Add entity ID in Harness

You must enter the **Harness SAML Endpoint URL** from Harness in your Azure app **Reply URL**. The **Reply URL** tells Azure where to send the SAML response after user authentication. Without it, Azure has no destination to redirect the user to after login.

1. In your Azure app, select **Single sign-on**. The SSO settings for the Azure app are displayed.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-81.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. In **Basic SAML Configuration**, select the edit icon (pencil).

3. Enter a unique identifier in the **Identifier (Entity ID)** field. When your tenant only has one SAML application, this can be `app.harness.io`. If there are several SAML applications in the same tenant, this should be a unique identifier. While setting up SAML in Harness, the same identifier should be configured in the **Entity ID** field.

      Keep this tab open.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-82.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

:::info note
For <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank">Harness Self-Managed Enterprise Edition</a>, replace **app.harness.io** with your custom URL.
For example, if you use a custom Harness subdomain in any Harness version, such as **example.harness.io**, use that URL.
:::

### Step 2. Get Harness SAML endpoint URL

Next, use the **SAML SSO Provider** settings in Harness to set up your Azure app **Single sign-on**.

4. In Harness, under **Account Settings**, select **Authentication**. The authentication configuration page appears.
5. Select **SAML Provider**. The **Add SAML Provider** page opens.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-83.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. In **Name**, enter a name for the SAML SSO Provider.
7. Under **Select a SAML Provider**, select **Azure**. The settings for Azure setup are displayed:

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-84.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

### Step 3. Add endpoint URL in Azure

8. Copy the **Harness SAML Endpoint URL** from the **Add SAML Provider** dialog, and paste it in the **Reply URL** in your Azure app.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-85.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

9. Click **Save** on the Azure App SAML Settings page.

---

## User attributes and claims

To ensure that Harness Users' email addresses are identified when they log in via Azure, set up the **Single sign-on** section of your Azure app to use the **User name** email address as the method to identify users.

This step ensures Azure sends the right email as the unique identifier so Harness can match the incoming SAML assertion to the correct Harness account.

The Azure users that are added to your Azure app must have their email addresses listed as their **User name.**

To set this **User name** email address as the method for identifying users, in the Azure app **Single sign-on** section, the Azure app must use the **user.userprincipalname** as the **Unique User Identifier**, and **user.userprincipalname** must use **Email address** as the **name identifier format**.

:::info note
- If **user.userprincipalname** cannot use an email address as the **Name ID format**, then **user.mail** should be used as the unique identifier in the **Identifier (Entity ID)** field.
- If your Azure users are set up with their email addresses in some field other than **User name**, ensure that the field is mapped to the **Unique User Identifier** in the Azure app and the **name identifier format** is **Email address**.
:::

To set this up in your Azure app, do the following:

1. In your Azure app, in the **Single sign-on** blade, in **User Attributes & Claims**, click the edit icon (pencil). The **User Attributes & Claims** settings appear.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-86.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. For **Unique User identifier value**, select the edit icon. The **Manage claims** settings appear.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-87.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Select **Choose name identifier format**, and select **Email address**.
4. In **Source attribute**, select **user.userprincipalname**.
5. Click **Save**, and then close **User Attributes & Claims**.

---

## Azure SAML metadata file

The Federation Metadata XML contains Azure's signing certificate and endpoint URLs. Harness needs this file to validate that the SAML responses it receives actually came from your Azure tenant and have not been tampered with.

Download the **Federation Metadata XML** from your Azure app to upload the file into Harness.

1. Download the **Federation Metadata XML** from your Azure app and upload it using **Upload the identity Provider metadata xml downloaded from your Azure App** in the **Add SAML Provider** settings in Harness.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-88.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. Select **Add Entity ID** and enter your custom Entity ID. The default Entity ID is **app.harness.io**. The value you enter here overrides the default Entity ID.
3. Select **Add**. The new Azure SAML Provider is added under **Login via SAML**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-89.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

---

## Enable and test SSO with Azure

Now that Azure is set up in Harness as a SAML SSO provider, you can enable and test it.

Testing before you enforce SSO for all users prevents lockouts. 
You can test the Azure app SSO from within Azure if you are logged into Azure using an Azure user account that has the following:

* A Harness user with the same email address as your Azure user.
* Your Azure user added to the Azure app **Users and groups**.
* Global Administrator Directory role assigned to your Azure user.

To test Azure SSO using Azure, do the following:

1. In the Azure app, select **Single sign-on**, and at the bottom of the **Single sign-on** settings, select **Test**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-90.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

2. In the **Test** panel, select **Sign in as current user**. If the settings are correct, you are logged into Harness. If you cannot log into Harness, the **Test** panel provides debugging information. For more information, go to [Debug SAML-based single sign-on to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/debug-saml-sso-issues?WT.mc_id=UI_AAD_Enterprise_Apps_Testing_Experience) from Microsoft Entra ID.

To test Azure SSO using Harness, do the following:

1. In **Harness**, in **Account Settings** > **Authentication**, select **Login via SAML**, to enable SAML SSO using the Azure provider.
2. Open a new Chrome Incognito window to test the SSO login using a Harness User account other than the one you are currently logged in with.
3. Sign into Harness using one of the user account email addresses shared by Harness and Azure. When you sign into Harness, you are prompted with the Microsoft Sign in dialog.
4. Enter the Azure username (most often, the email address), enter the Azure password, and select **Sign in**.

---

## SAML authorization with Azure

Once you have enabled Harness SSO with your Azure app, you can set up and enable SAML authorization in Harness using Azure.

To set up SAML authorization in Harness, you link a Harness User Group to a user group assigned to your Azure app. When a user from your Azure app logs into Harness, they are automatically added to the linked Harness User Group and inherit all the RBAC settings for that Harness User Group.

**Authentication** confirms who the user is and **authorization** determines what they can access.

Below are the Harness SAML settings you need from Azure to set up SAML authorization in Harness:

* **Group Attribute Name** - In Azure, this value is obtained from the **Group Claims** in the Azure app **User Attributes & Claims** settings.

For Harness **Group Attribute Name**, here is the Harness **SAML Provider** setting on the left and their corresponding Azure **Group Claims** settings on the right:

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/single-sign-on-saml-91.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

To set up Azure Authorization in Harness, do the following:

1. In Azure, add the **Group Claim** (Name and Namespace) to the Azure app.
	1. In your Azure app, select **Single sign-on**, and then select edit (pencil icon) for **Attributes & Claims**.

	   <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-92.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	2. Select **Add a group claim**. The **Group Claims** settings appear.
	3. Select the **All groups** option and expand the **Advanced options** and enable **Customize the name of the group claim**.

      <div style={{textAlign: 'center'}}>
	      <DocImage path={require('../static/single-sign-on-saml-93.png')} width="80%" height="40%" title="Click to view full size image" />
	   </div>

	4. In **Name**, enter a name to use to identify the Harness Group Attribute Name.
	5. In **Namespace**, enter a namespace name.
	6. Click **Save**. **User Attributes & Groups** now display the group claim you created.
	7. Close **User Attributes & Groups**.

2. In Harness, enter the Group Claim name and namespace in the SAML SSO Provider **Group Attribute Name** field.
	1. Open the SAML SSO Provider dialog, and enable the **Enable Authorization** setting. You must turn on **Enable Authorization** to link this SSO Provider to a Harness User Group for authorization.
	2.  Enter the Group Claim name and namespace in the **Group Attribute Name** field in the same format as a Claim Name (`namespace/name`). The SAML SSO Provider dialog looks something like this:

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-94.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	3. Click **Save**. Authorization and the Group Attribute Name are set up. Next, set up your Azure and Harness groups.
3. In Azure, ensure the Azure users with corresponding Harness accounts belong to an Azure group. Here is an Azure group named **ExampleAzureGroup** with two members:

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-95.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

4. Ensure that the Azure group is assigned to the Azure app. Here you can see the **ExampleAzureGroup** group in the Azure app's **Users and groups**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-96.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. Link the Harness User Group to the Azure group using the Azure group Object ID.
	1. In Azure, copy the Azure group **Object ID**.

		<div style={{textAlign: 'center'}}>
		   <DocImage path={require('../static/single-sign-on-saml-97.png')} width="80%" height="40%" title="Click to view full size image" />
		</div>

	2. In Harness, create a new User Group or open an existing User Group.
	3. In **Account Settings**, select **User Groups** and then select the User Group you want to link the SAML SSO Provider to.
	4. Select **Link to SSO Provider Group**.

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
	3. In the linked Harness User Group, confirm that the Harness user account appears in the group.

The Harness User is now added and the RBAC settings for the Harness User Group are applied to its account. For more information, go to <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage User Groups</a>.

---

## Configure group claims for users with 150+ groups

Microsoft Entra ID limits the number of groups included in SAML tokens to 150. When a user belongs to more than 150 groups, Entra ID omits the group list from the token and instead provides a link to the Microsoft Graph API endpoint to retrieve group information.


### Configure API credentials

To enable Harness to query the Graph API for group memberships, you must configure **Client ID** and **Client Secret** credentials, as described below:

1. In your Azure account, go to **App registrations** and select your app.
2. Copy the **Application (client) ID** and paste it into the **Client ID** field in your Harness SAML configuration.
3. In your app, go to **Certificates and Secrets** → **New Client Secret**.
4. Add a description and select **Add**.
5. Copy the generated secret value.
6. In Harness, create an encrypted text secret with this value. For detailed steps, go to [Use encrypted text secrets](/docs/platform/secrets/add-use-text-secrets).
7. In your Harness SAML configuration, select this secret reference in the **Client Secret** field.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/single-sign-on-saml-100.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

### Configure API permissions

The registered Azure app requires the following Microsoft Graph API permissions (set for both **Delegated** and **Application** permission types):

- `Directory.Read.All`
- `Group.Read.All`
- `GroupMember.Read.All`
- `User.Read.All`

To add these permissions:

1. In your Azure app, go to **Manage** → **API Permissions** → **Add a permission**.
2. Under **Microsoft APIs**, select **Microsoft Graph**.
3. Select **Application permissions** and add all four permissions listed above.
4. Click **Add permissions**.
5. Add the four permissions mentioned earlier for **Delegated permissions**.
6. Click **Add permissions**.
7. Select **Grant admin consent** to activate the permissions.

For more information on Azure application permissions, go to [Application permissions](https://learn.microsoft.com/en-us/graph/permissions-reference#application-permissions-93) in the Microsoft documentation.

---

## Related articles

- <a href="/docs/platform/authentication/single-sign-on-saml/okta" target="_blank" >SAML SSO with Okta</a> - Create an SAML integration in Okta for Harness.
- <a href="/docs/platform/authentication/single-sign-on-saml/saml-sso-with-onelogin" target="_blank" >SAML SSO with OneLogin</a> - Configure OneLogin as a SAML SSO provider in Harness.
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak" target="_blank" >SAML SSO with Keycloak</a> - Configure Harness to use Keycloak SAML client as an SSO provider.
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration" target="_blank" > Advanced SAML configuration</a> - Configure advanced SAML options in Harness.
