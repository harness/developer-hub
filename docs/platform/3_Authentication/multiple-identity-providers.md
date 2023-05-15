---
title: Multiple Identity Providers
description: Configure and use multiple IdPs for authentication.
---

You can configure multiple Identity Providers (IdPs) in SAML for user authentication.
Harness supports Single Sign-On (SSO) and multiple IdPs with SAML. 

## Configure multiple SAML providers
To configure multiple SAML providers in Harness: 
1. Select **ACCOUNT SETTINGS** and then select **Authentication**.
2. If you have not configured any SAML provider in your account, select **SAML Provider**.
   If you already have a configured SAML provider, select **Add SAML Provider** to add another SAML provider.
   The SAML Provider settings appear.
3. In **Name**, enter a name for the SAML provider.
4. Enter a name in **Friendly Name** if you want this to be displayed in the login screen.
5. Select **Continue**.

## Select a SAML provider
1. Select one of the following SAML provider: 
   - Azure: For more information, go to [SAML SSO with Azure](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-azure).
   - Okta: For more information, go to [SAML SSO with Azure](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-okta).
   - OneLogin: For more information, go to [SAML SSO with Azure](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-onelogin)
   - Other: For more information, go to [SAML SSO with Azure](/docs/platform/Authentication/single-sign-on-saml#saml-sso-with-keycloak)
2. Select **Continue**.
