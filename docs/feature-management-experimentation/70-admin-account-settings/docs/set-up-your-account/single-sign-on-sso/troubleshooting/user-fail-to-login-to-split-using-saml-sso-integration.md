---
title: Users fail to login to Split using SAML/SSO integration
sidebar_label: Users fail to login to Split using SAML/SSO integration
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360032252031-User-fail-to-login-to-Split-using-SAML-SSO-integration-error-returned-405-403-or-475-errors </button>
</p>

## Question

Users fail to login to Split using SAML SSO integration, error returned 405, 403, or 475 errors

After setting up Split SSO integration with a SAML Provider (like OKTA, GSuite, etc.), when a user tries to login, getting 403 HTTP error, and page go back to Split login page.

## Root cause

There are multiple root causes:

1. In SAML Provider setup or configuration page, ACS URL field does not match Entity ID field.
2. Signed Response box is checked for GSuite. 
3. There are multiple Certificates used in IdP Metadata. The Split integration for SSO only allows a single certificate to be configured.
4. User is trying to login from the Split login page, not SAML
5. New user has an existing Split Invite which will collide with the JIT SAML feature that allows creating user with Just-In-Time Provisioning
6. The SSO Provider requires the SAML Response to be signed, but this configuration option for Split app within the SSO server is not enabled.

## Solution

1. Make sure the ACS URL field is identical to Entity ID field. As shown in OKTA example below
Okta_URL_settings.png

![](https://help.split.io/hc/article_attachments/360039801412/Okta_URL_settings.png)

2. Make sure Signed Response is unchecked in GSuite

![](https://help.split.io/hc/article_attachments/360039784711/GSuite_Security-provider-details.png)

3. Make sure to use only one certificate in GSuite for the IdP metadata.

4. Always use your SAML page to login to Split app, you can also use the login URL from the Administrator site, Security page.

![](https://help.split.io/hc/article_attachments/360039801952/Screen_Shot_2019-10-01_at_11.46.45_AM.png)

5. Go to the Split Administrator page, click on Users tab, verify if the user show up under pending Status Column, if the record does exist, click revoke invite to delete the invitation.

![](https://help.split.io/hc/article_attachments/360049469472/Screen_Shot_2019-10-01_at_11.32.46_AM.png)

6. Confirm with the SSO Admin if the SSO provider requires signing SAML Response, and make sure the option is enabled for Split app configuration in the SSO provider server.

For Azure SSO, make sure to select Sign both response and assertion.

![](https://help.split.io/hc/article_attachments/360068428792/unnamed.png)