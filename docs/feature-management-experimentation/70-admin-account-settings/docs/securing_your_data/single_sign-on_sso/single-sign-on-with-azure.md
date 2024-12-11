---
title: Single sign-on with Azure
sidebar_label: Single sign-on with Azure
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021124931-Single-sign-on-with-Azure <br /> ✘ images still hosted on help.split.io </button>
</p>

Azure Active Directory (Azure AD) is Microsoft's cloud-based directory and identity management service that you can integrate with Split's SAML 2.0 API to allow users to log into Split using their single sign-on (SSO) credentials. To learn more about configuring SAML in Split, refer to the [Single sign-on overview](https://help.split.io/hc/en-us/articles/360021120871) guide.

# Create an enterprise app in Azure

To create an enterprise app in Azure, do the following:

1. From the MS Azure console, enter **Enterprise** in the top search box and click **Enterprise Applications**. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707167501" alt="Enterprise search" />
  </p>

2. Click **New Application**, then **Create your own application**. The Create your own application page appears.
3. In the What’s the name of your app? field, enter "Split".
4. Select the **Integrate any other application you don’t find in the gallery** radio button.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971697712397" alt="Create your own application" />
  </p>

5. Click **Create**. 

# Configure enterprise app for SSO 

Once the application is added, you can add users and set up SSO by doing the following:

1. Click the **Assign Users and Groups** link, and then **Add user/group** to add the users or groups that will use Split.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707169165" alt="Assign users and groups" />
  </p>

2. Under Manage, click **Single sign-on**. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707169677" alt="Manage single sign-on" width="284" />
  </p>

3. Click **SAML**.
4. In the Basic SAML Configuration view, click **Edit**. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971697715213" alt="Basic SAML config" />
  </p>

5. In both the Identifier and Reply URL fields, enter **https://www.placeholder.split.io** and click **Save**.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707170189" alt="Basic SAML config" />
  </p>


6. In the SAML Certificates box, click to download the SSO **Federation Metadata XML**. Note where you save the XML file.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971697716365" alt="Download metadata" width="672" />
  </p>

# Configure Split

**Note:** You need to be a Split administrator to configure SAML.

To configure Split SSO, do the following:

1. Navigate to the Split user interface and in the left navigation, click the **user's initials** at the bottom and select **Admin settings**.
2. Under Organizational settings, select **Security**. The Security page appears.
3. In the SAML tab, copy and paste the XML file contents into the Identity provider (IdP) metadata field.
4. Depending on your needs, select either **SAML Strict Mode** or **Just-In-Time Provisioning (JIT)** and click **Save**.

**Note:** For more information on SAML Strict Mode or JIT, refer to [Adding SAML/SSO users](https://help.split.io/hc/en-us/articles/360037289472-How-do-I-add-users-if-I-m-using-SAML-SSO-) guide.

A message displays indicating that the SAML is enabled. This gives you the proper information to place in the Identifier and Reply URL from the Basic SAML Configuration box that you first filled in with https://placeholder.split.io. Copy the Assertion Consumer Service URL link to your clipboard.

# Add SAML settings

1. Navigate back to Azure and use the value for **Assertion Consumer Service URL**, provided in Split in the configuration parameters, into the Basic SAML Configuration box for **Reply URL**.  
   Use the value for **Audience URI**, provided in Split in the configuration parameters, into the Basic SAML Configuration box for **Identifier**.  
   Use the value for **Default RelayState**, provided in Split in the configuration parameters, into the Basic SAML Configuration box for **Relay State**.  
   Optionally place the **Single Sign-on URL** from Split’s user interface into the **Sign on URL** to enable SP Initiated SSO using that URL

2. Click on **Add reply URL** and set the **Reply URL** to the **Requestable SSO URL** provided in Split in the configuration parameters:

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971697717773" alt="Basic SAML config" />
  </p>

3. Click **Save**. SSO is enabled.
4. You can test that single sign-on now works with Split by following the instructions below, depending on your setup.

* If you have JIT enabled or if your Azure account’s email address already exists in your Split organization:

Click **Test** in Test single sign-on with Split.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707171469" alt="Test single sign-on" />
  </p>

A new panel will open in Azure. Click on **Test sign in**.

  <p>
    <img src="https://help.split.io/hc/article_attachments/18971707171981" alt="Test single sign-on" />
  </p>

A new tab will open and you will be logged into Split if the test is successful.  

*  If you do not have JIT enabled and your Azure account's email address does not exist in your Split organization:

You can test with a user that is in the Split app you created in Azure and in Split itself. Use the **Single Sign-on URL** provided in Split in the configuration parameters to test single sign-on using this user.

  
