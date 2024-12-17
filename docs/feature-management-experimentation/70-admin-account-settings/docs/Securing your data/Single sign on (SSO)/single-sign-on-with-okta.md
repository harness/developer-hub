---
title: Single sign-on with Okta
sidebar_label: Single sign-on with Okta
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020924112-Single-sign-on-with-Okta <br /> ✘ images still hosted on help.split.io </button>
</p>

Okta is a cloud-based identity management provider that you can integrate with Split’s SAML 2.0 API, allowing you to log in to Split using your single sign-on (SSO) credentials. [Learn more about configuring SAML in Split.](https://help.split.io/hc/en-us/articles/360021120871)

# Create SSO App
 
1. Sign in to Okta.
2. Click **Admin** to go to the Admin panel.
3. Select the **Applications** sidebar menu item.

<p>
	<img src="https://help.split.io/hc/article_attachments/18971835824397" alt="Applications" />
</p>

4. Click **Create App Integration**.

<p>
  <img src="https://help.split.io/hc/article_attachments/18971835827725" alt="App integration" />
</p>

5. Select **SAML 2.0**, and then click **Next**.

<p>
  <img src="https://help.split.io/hc/article_attachments/18971773232781" alt="New app integration" />
</p>

6. For **App name**, enter a name for your Split app and click **Next**.

<p>
  <img src="https://help.split.io/hc/article_attachments/18971773238157" alt="Create new SAML integration" />
</p>

7. Create the app with a temporary **Single sign-on URL**. You will get the real URL later during the Split configuration, and come back to change it. Use the following settings:
    * Set a temporary **Audience URI** (SP Entity ID). You will also get the real value during the Split configuration and change it later.
    * Set the **Name ID format** as **EmailAddress**.
    * Leave the rest of the options as default and click **Next**.

<p>
  <img src="https://help.split.io/hc/article_attachments/18971835834893" alt="Create new SAML integration" />
</p>

8. Before finishing, select **I'm an Okta customer adding an internal app**.

<p>
 <img src="https://help.split.io/hc/article_attachments/18971773241101" alt="Create new SAML integration" />
</p>	

9. Click **Finish**.
10. SSO parameters are now available. Click **View Setup Instructions**. 

 <p>
 	<img src="https://help.split.io/hc/article_attachments/18971835844109" alt="Create new SAML integration" />
</p>

11. Copy the IDP metadata.

<p>
	<img src="https://help.split.io/hc/article_attachments/18971773248653" alt="IdP metadata" />
</p>	

# Configure SAML
 
If you are a Split administrator, you can configure SAML in Admin Settings.

1. Go to **Admin Settings** > **Security** > **SAML**.
2. Add the **IdP metadata** copied from Okta.
3. Enable/disable **SAML strict mode**.
4. Enable/disable **Just-in-time user provisioning**.
5. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use this information when adding SAML settings in Okta.

<p>
  	<img src="https://help.split.io/hc/article_attachments/18971773252365" alt="Split SAML configuration parameters" />
</p>

# Add SAML Settings
 
1. Go to the Okta Admin Panel.
2. Select the **General** tab.
3. Under **SAML Settings**, click **Edit**.

<p>
 	<img src="https://help.split.io/hc/article_attachments/18971835849101" alt="Okta SAML settings" />
</p>

4. Click **Next**.
5. Change the **Single sign-on URL** to the **Assertion Consumer Service URL** provided in Split in the configuration parameters.  
   Change the **Audience URI** to the **Audience URI** provided in Split in the configuration parameters.  
   Change the **Default RelayState** to the **Default RelayState** provided in Split in the configuration parameters.

<p>
  <img src="https://help.split.io/hc/article_attachments/18971835854093" alt="Edit SAML config" />
</p>

6. Click **Show Advanced Settings.**
7. Click **Add Another** under **Other Requestable SSO URLs** and set the **URL** to the **Requestable SSO URL** provided in Split in the configuration parameters. Set the **Index** value to 1.

<p>
 	<img src="https://help.split.io/hc/article_attachments/18971773266573" alt="Okta SAML settings advanced" />
</p>

8. Click **NEXT** and then **FINISH**.

Split is now linked with Okta.
