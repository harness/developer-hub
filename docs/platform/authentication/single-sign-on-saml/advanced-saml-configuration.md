---
title: Advanced SAML configuration
description: This document explains advanced SAML configuration.
sidebar_position: 6
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

Once SAML SSO is in place, additional configuration may be required to meet security requirements. For example, an identity provider (IdP) outage can lock users out of Harness, unencrypted SAML assertions may not adhere to your organization's compliance policies, and teams with different workflows may need to land on different parts of the product after login.

This page covers the advanced SAML configuration options to address the above mentioned scenarios.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:
- [Use Harness local login](#harness-local-login) as a fallback when your IdP is unavailable.
- [Enable encrypted SAML assertions](#use-encrypted-saml) to meet compliance requirements for assertions in transit.
- [Configure the default landing page](#set-the-default-experience) so teams land on relevant product after login.

---

## Before you begin

Before you begin, ensure you have:

- A Harness account with Account Admin permissions to modify authentication settings.
- An active SAML SSO provider already configured in Harness (such as [Okta](/docs/platform/authentication/single-sign-on-saml/okta), [Microsoft Entra ID](/docs/platform/authentication/single-sign-on-saml/microsoft-entra-id)).

---

## Harness Local Login

import Harnessll from '/docs/platform/shared/harness-local-login.md'

<Harnessll />

If you use <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank">Harness Self-Managed Enterprise Edition</a>, your instance must be accessed via an HTTPS load balancer, otherwise the SAML authentication will fail over HTTP.


---

## Use encrypted SAML

To use encrypted SAML with Harness, download the encryption certificate from the Harness UI and upload it to your identity provider (IdP) settings to support the encrypted SAML flow.

To download your encryption certificate and upload it to your IdP settings, follow the steps below:

1. In your Harness account, go to **Account Settings**, and select **Authentication**.
2. Assuming you have a SAML provider set up, select your provider. Under **Enable Authorization**, click the **Download** button.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/enable-encrypted-saml.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

This downloads the Harness encryption certificate required for SAML assertions.

3. Sign in to your IdP (identity providers, such as Okta, Microsoft Entra ID).
4. To edit your SAML integration in the IdP:

   1. Enable assertion encryption.
   2. Select your encryption algorithm.
   3. Upload the encrypted certificate file you downloaded from the Harness UI in step 2 above.

When you sign in to Harness via SAML, the operation is completed using encrypted assertions.

---

## Set the default experience

When you log in through SAML, Harness redirects you to a default landing page. If your organization has teams that work in different modules (for example, developers in CI and operations in CD), account administrators can set the default landing experience so each user lands on the relevant part of the product after login.

To set the default landing page, follow the steps below:

1. In your Harness account, go to **Account Settings** and select **Account Details**.
2. Under **Default Experience**, select the experience you want users to see when they log in (First generation or next generation).
3. Click **Save**.

For more information on account-level settings, go to <a href="/docs/platform/subscriptions-licenses/view-account-info-and-subscribe-to-alerts#account-details" target="_blank">Account details</a>.


---

## Related articles

- <a href="/docs/platform/authentication/single-sign-on-sso-with-ldap" target="_blank">Single sign-on with LDAP</a>: Configure directory-based authentication using an LDAP provider.
- <a href="/docs/platform/authentication/single-sign-on-sso-with-oauth" target="_blank">Single sign-on with OAuth</a>: Enable login through public OAuth providers such as GitHub and Google.
- <a href="/docs/platform/authentication/single-sign-on-sso-with-oidc" target="_blank">Single sign-on with OIDC</a>: Set up OpenID Connect-based SSO with your identity provider.
