---
title: Single sign-on with OneLogin
sidebar_label: Single sign-on with OneLogin
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020924372-Single-sign-on-with-OneLogin <br /> ✘ images still hosted on help.split.io </button>
</p>

OneLogin is a cloud-based identity management provider that you can integrate with Split’s SAML 2.0 API, allowing you to log in to Split using your single sign-on (SSO) credentials. [Learn more about configuring SAML in Split.](https://help.split.io/hc/en-us/articles/360021120871)

# Create SSO app
 
1. Sign in to OneLogin.
2. Click **Apps** > **Company Apps** > **Add App**.

 <p>
 	<img src="https://help.split.io/hc/article_attachments/360017696791/OneLogin_Add_App.png" alt="OneLogin_Add_App.png" />
</p>

3. Search and select **SAML Test Connector (IdP)**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017808292/OneLogin_SAML_Test_Connector.png" alt="OneLogin_SAML_Test_Connector.png" />
</p>

5. Edit **Display Name** and click **Save**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017696771/OneLogin_Edit_Display_Name.png" alt="OneLogin_Edit_Display_Name.png" />
</p>	

6. In **More Actions** select **SAML Metadata** to download the file to be used in Split.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017696751/OneLogin_Download_SAML_Metadata.png" alt="OneLogin_Download_SAML_Metadata.png" />
</p>

# Configure SAML
 
If you are a Split administrator, you can configure SAML in Admin Settings.

1. Go to **Admin Settings** > **Security** > **SAML**.
2. Add the **IdP metadata** downloaded from OneLogin.
3. Enable/disable **SAML strict mode**.
4. Enable/disable **Just-in-time user provisioning**.
5. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use this information when adding SAML settings in OneLogin.

<p>
  <img src="https://help.split.io/hc/article_attachments/360017808272/OneLogin_Configured_Banner.png" alt="OneLogin_Configured_Banner.png" />
</p>

# Add SAML settings
 
1. Go to the OneLogin app that you created.
2. Select the **Configuration** tab.
3. Populate the **Audience**, **Recipient**, **ACS URL Validator**, and **ACS URL** with the **Assertion Consumer Service URL** from above.

 <p>
  <img src="https://help.split.io/hc/article_attachments/360087203191/onelogin_blurred.png" alt="onelogin_blurred.png" />
</p>

4. Click **Save**.

Split is now linked with OneLogin.
