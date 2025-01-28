---
title: Single sign-on overview
sidebar_label: Single sign-on overview
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021120871-Single-sign-on-overview <br /> ✘ images still hosted on help.split.io </button>
</p>

Split implements single sign-on (SSO) using the SAML 2.0 protocol. Security assertion markup language (SAML) is an XML-based data format that makes it easier for your users to log in to their Split account using your organization's identity provider (IdP). With SAML, users can sign in to multiple software applications using the same login details. 

Configuring SAML for your Split account lets you and your teammates log into Split using the credentials stored in your organization's active directory, LDAP, or other identity stores that are configured with a SAML IdP.

For more information about configuring specific IdPs, refer to the following guides:

 * [Azure Active Directory](https://help.split.io/hc/en-us/articles/360021124931) 
 * [Active Directory Federation Services (AD FS)](https://help.split.io/hc/en-us/articles/360021127411) 
 * [Okta](https://splitsoftware.zendesk.com/hc/en-us/articles/360020924112) 
 * [OneLogin](https://help.split.io/hc/en-us/articles/360020924372)
 * [GSuite](https://help.split.io/hc/en-us/articles/360020881352) 

# Configure SAML

If you are a Split Administrator, configure SAML as follows:

1. From the left navigation, click on the **user's initials**, and then click **Admin Settings**.
2. Click **Security** and then the **SAML** tab.

  <p>
   <img src="https://help.split.io/hc/article_attachments/15617759444493" alt="Screen_Shot_2023-05-09_at_9.56.11_AM.png" />
  </p>

2. Add your IdP metadata to the text area.
3. Enable or disable [**SAML strict mode**](#saml-strict-mode).
4. Enable or disable [**Just-in-time provisioning**](#just-in-time-user-provisioning).
5. Click the **Save** button.

# Update SAML session settings

You can update your SAML session settings by doing the following:

1. Click the **Session settings** tab. The timeout value page opens.
2. Select a new timeout value and click **Update**.

## About SAML strict mode
 
If you enable SAML strict mode, all users must use SAML to log into Split. Any existing Split usernames and passwords, or alternatives such as Google OAuth, are not valid. To test your SAML configuration before forcing all users in your organization to log in using your IdP, leave this disabled before rolling out the change to your organization. You can then enable it in the future.

**Note:** You can enable or disable SAML strict mode at any time. 

## About just-in-time user provisioning

Under most circumstances, users must be invited to Split, even for organizations where SAML is enabled. If a user has not been invited to Split using your organization's IdP, Split validates the SAML assertion, but the user is redirected to an error page because that user does not exist in Split.

To eliminate the need of creating and inviting users in advance, enable just-in-time provisioning. This provisioning uses a SAML assertion to create a Split user on the fly the first time a new user attempts to log in. Note that new users cannot sign in using Split's login screen until they access Split from your IdP.

# Disable SAML
 
To disable your SAML settings, click **Disable** in the top right of the enabled banner.

:::info[Note]
When you disable SAML, members need to sign in to Split with their username and password. If a user is provisioned with just-in-time provisioning, they can reset their password on the login screen to sign into Split.
:::