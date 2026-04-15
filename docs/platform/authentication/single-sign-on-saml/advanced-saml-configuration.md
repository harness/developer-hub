---
title: Advanced SAML configuration
description: This document explains advanced SAML configuration.
sidebar_position: 6
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

## What will you learn in this topic?
By the end of this topic, you will be able to understand:

- How to enable encrypted SAML assertions.
- How to use Harness local login as a fallback.
- How to configure the default landing page experience for your users.

---

## Before you begin

- A Harness account with Account Admin permissions to modify authentication settings.
- An active SAML SSO provider already configured in Harness

---

## Harness Local Login

import Harnessll from '/docs/platform/shared/harness-local-login.md'

<Harnessll />


This page covers advanced SAML configuration options in Harness, including local login fallback, encrypted SAML assertions, and setting the default UI experience for your users.

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview" target="_blank">Harness Self-Managed Enterprise Edition</a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

---

## Use encrypted SAML

To use encrypted SAML with Harness, you download the encryption certificate from the Harness UI and upload it to your identity provider (IdP) settings to support the encrypted SAML flow.

To download your encryption certificate and upload it to your IdP settings, do the following:

1. In your Harness account, go to **Account Settings**, and then select **Authentication**.
2. Under **Login via SAML**, select **More Options** (&vellip;), and then select **Edit**. The **Edit SAML Provider** options open.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('../static/enable-encrypted-saml.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Select the **Download** link to download the encryption certificate for SAML assertions.
4. Sign in to your IdP.
5. Edit your SAML integration.

   1. Enable assertion encryption.
   2. Select your encryption algorithm.
   3. Upload the encrypted certificate file you downloaded from the Harness UI in step 3 above.

When you sign in to Harness via SAML, the operation is completed using encrypted assertions.

---

## Set the default experience

Environment administrators can set the default Harness generation landing page, FirstGen or NextGen, for their users to ensure the correct Harness Experience is provided to each user. For more information, go to <a href="/docs/platform/subscriptions-licenses/view-account-info-and-subscribe-to-alerts#account-details" target="_blank">Account details</a>.

---

## Next steps

- <a href="/docs/platform/authentication/single-sign-on-sso-with-ldap" target="_blank">Single sign-on with LDAP</a>
- <a href="/docs/platform/authentication/single-sign-on-sso-with-oauth" target="_blank">Single sign-on with OAuth</a>
- <a href="/docs/platform/authentication/single-sign-on-sso-with-oidc" target="_blank">Single sign-on with OIDC</a>
