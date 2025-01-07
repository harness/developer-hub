---
title: Single sign-on with G Suite
sidebar_label: Single sign-on with G Suite
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020881352-Single-sign-on-with-G-Suite <br /> ✘ images still hosted on help.split.io </button>
</p>

With Split's SAML 2.0 API, you can use your managed Google account credentials to sign in to Split using your single sign-on (SSO) credentials. [Learn more about configuring SAML in Split.](https://help.split.io/hc/en-us/articles/360021120871)

# Create SSO app
 
1. Sign in to the **Google Admin console**.
2. From the console dashboard, go to **Apps** and then **SAML Apps**.
3. Click the plus **+** icon in the bottom corner.
4. Click **Setup my own custom app**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017627771/GSuite_custom_app.png" alt="GSuite_custom_app.png" />
</p>

5. Download the IdP metadata, and copy and paste for later use in Split.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017627751/GSuite_idp.png" alt="GSuite_idp.png" />
</p>

6. Click **NEXT** and go to Split.

# Configure SAML
 
If you are a Split administrator, you can configure SAML in your Admin settings.

1. Go to **Admin Settings** > **Security** > **SAML**.
2. Add your **idP metadata** copied from Google.
3. Enable/disable **SAML strict mode**.
4. Enable/disable **Just-in-time user provisioning**.
5. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use this information when adding SAML settings in Google.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017743472/GSuite_SAML_Configured_Banner.png" alt="GSuite_SAML_Configured_Banner.png" />
</p>

# Add SAML settings
 
1. Go to the Google Admin console.
2. Enter the **Name**, **Description**, add the **Split logo**, and then click **NEXT**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017627731/GSuite_idp_info.png" alt="GSuite_idp_info.png" />
</p>

3. Paste the **Assertion Consumer Service URL** from Split in the **ACS URL** and **Entity ID** fields.
4. Paste the **Single Sign-on URL** from Split in the field **Start URL**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017743452/GSuite_Security-provider-details.png" alt="GSuite_Security-provider-details.png" />
</p>

5.  Click **NEXT** and then **FINISH**.
6. Remember to select **ON for everyone**.

Split is now linked with Google.
