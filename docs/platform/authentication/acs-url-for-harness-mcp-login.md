---
title: Single Sign-On (SSO) for Harness MCP
sidebar_label: Single Sign-On (SSO) for Harness MCP
description: Learn how to add an additional ACS URL or redirect URI in your Identity Provider to enable Harness MCP login via SAML or OIDC.
sidebar_position: 16
slug: /platform/authentication/single-sign-on-for-harness-mcp
redirect_from:
  - /docs/platform/authentication/acs-url-for-harness-mcp-login
keywords:
  - single sign-on
  - sso
  - saml
  - oidc
  - acs url
  - assertion consumer service
  - redirect uri
  - harness mcp
  - identity provider
  - idp
  - azure ad
  - entra id
  - okta
  - ping identity
  - pingone
  - authentication
tags:
  - authentication
  - sso
  - mcp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FAQ } from '@site/src/components/AdaptiveAIContent';

Harness MCP supports authentication through your existing Single Sign-On (SSO) provider. To enable SSO for MCP, add an Assertion Consumer Service (ACS) URL (for SAML) or redirect URI (for OIDC) to your Identity Provider (IdP).

An ACS URL or redirect URI specifies where your IdP sends authentication responses after a user signs in. Harness MCP requires its own ACS URL or redirect URI because it authenticates through a separate endpoint from the standard Harness platform.

Adding the MCP-specific URL does not affect your existing Harness platform login. You can continue to access both Harness and Harness MCP through the same SSO provider.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

* <a href="#configure-saml-for-harness-mcp">Retrieve the MCP-specific ACS URL</a> or <a href="#configure-oidc-for-harness-mcp">redirect URI from Harness</a>.
* Add the MCP URL to your <a href="#configure-saml-for-harness-mcp">Identity Provider</a>.
* <a href="#configure-saml-for-harness-mcp">Configure SAML</a> or <a href="#configure-oidc-for-harness-mcp">OIDC authentication</a> for Harness MCP.

---

## Before you begin

Before you configure SSO for Harness MCP, ensure you have the following:

* **Account Admin** or **Authentication Settings** permissions in Harness.
* Identity Provider configured for SAML or OIDC authentication with Harness. Go to <a href="/docs/platform/authentication/single-sign-on-saml" target="_blank">Single Sign-On (SSO) with SAML</a> to set this up if needed.
* Administrative access to your Identity Provider.

---

## Configure SAML for Harness MCP

Before you update your Identity Provider, retrieve the MCP ACS URL from your Harness SAML configuration.


<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to Harness.
2. Go to **Account Settings** > **Security and Governance** > **Authentication**.
3. Locate your SAML provider.
4. Select **⋮** > **Edit**.
5. Copy the value from **Enter this SAML Endpoint URL as your Harness SAML Provider application's ACS URL**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/95bbba7a-0744-4f0a-b47f-d483464aab72" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Configure SSO for Harness MCP" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>


Based on your Identity Provider, go to <a href="#microsoft-entra-id-azure-ad">Microsoft Entra ID</a>, <a href="#okta">Okta</a>, or <a href="#ping-identity-pingone">Ping Identity</a> and add the MCP ACS URL.

### Microsoft Entra ID (Azure AD)

<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to the Azure portal.
2. Go to **Microsoft Entra ID** > **Manage** >  **Enterprise Applications**.
3. Select your Harness application.
4. Select **Manage** > **Single sign-on**.
5. In **Basic SAML Configuration**, click **Edit**.
6. Under **Reply URL (Assertion Consumer Service URL)**, click **Add reply URL**.
7. Enter the MCP ACS URL copied from Harness.
8. Click **Save**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/0077839f-e0dd-4d99-b605-cffe8eecdb85" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Configure Harness Single Sign-On in Entra ID" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

#### Troubleshooting

If you receive the following error:

```bash
AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application.
```

Verify that the MCP ACS URL has been added and exactly matches the value displayed in Harness.

---

### Okta

Okta handles multiple ACS URLs differently from other Identity Providers. Instead of a list of Reply URLs, Okta requires you to enable **Requestable SSO URLs** and add each additional endpoint with an index value.

<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to the **Okta Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. On the **General** tab, select **Edit** in the **SAML Settings** section.
5. Select **Next**.
6. Leave the existing **Single sign-on URL** unchanged.
7. Enable **Allow this app to request other SSO URLs**.
8. Under **Other Requestable SSO URLs**, select **Add Another**.
9. Select **Next**, then click **Finish**.


After configuration, your Okta application will have three URLs:

    | URL | Source | Purpose |
    | --- | ------ | ------- |
    | **SAML Endpoint URL** (index 0) | Copy from Harness SAML config | Harness platform login via HarnessID |
    | **Additional Reply URL for MCP** (index 1) | Copy from Harness SAML config | Harness MCP login |

Both URLs are required. Removing the SAML Endpoint URL disables Harness platform login. Removing the MCP URL disables MCP login.


</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/8dfc15f0-f5dd-49db-941b-95071e17fdf6" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Add MCP URL to Okta" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

---

### Ping Identity (PingOne)

PingOne supports multiple ACS URLs for a single SAML application and automatically selects the appropriate URL during authentication.

1. Sign in to the **PingOne Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. Open the **Configuration** tab.
5. Select **Edit**.
6. Under **ACS URLs**, select **Add**.
7. Enter the MCP ACS URL copied from Harness.
8. Click **Save**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/pingone.png')} alt="PingOne ACS URL configuration" title="Click to view full size image" width="80%" height="40%" />
</div>

Keep your existing ACS URL and add the MCP ACS URL as an additional entry. Both URLs are required to support authentication for the Harness platform and Harness MCP.

Do not modify any other SAML settings, including certificates, Entity IDs, signing configuration, or NameID settings.


---

## Configure OIDC for Harness MCP

This section explains how to add the MCP redirect URI to your Identity Provider for OIDC authentication.

If your Harness account uses OpenID Connect (OIDC), add the MCP redirect URI to your Identity Provider.

<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to Harness.
2. Go to **Account Settings** > **Authentication**.
3. Locate your OIDC provider under **Login via OIDC**.
4. Select **⋮** > **Edit**.
5. Copy the value from **Additional Reply URL for MCP (Optional)**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/ca437b6d-42d1-44ff-bf9a-1d583a518a34" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Configure SSO (OIDC) for Harness MCP" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

### Microsoft Entra ID (Azure AD)

<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to the Azure portal.
2. Go to **Microsoft Entra ID** > **App registrations**.
3. Select your Harness application.
4. Go to **Authentication** in the left navigation.
5. Under **Redirect URIs**, click **Add URI**.
6. Enter the MCP redirect URL and click **Save**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/b73a9125-82c7-4622-8eff-353fc5dbf9b1" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Configure Teams Reader Redirect URI" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

---

### Okta

1. Sign in to the **Okta Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. On the **General** tab, select **Edit** in the **Login** section.
4. Under **Sign-in redirect URIs**, select **Add URI**.
5. Enter the MCP redirect URL and click **Save**.

---

### Ping Identity (PingOne)

1. Sign in to the **PingOne Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. Open the **Configuration** tab.
5. Select **Edit**.
6. Under **Redirect URIs**, select **+ Add**.
7. Enter the MCP redirect URL and click **Save**.

Keep your existing redirect URI and add the MCP redirect URI as an additional entry. Both redirect URIs are required to support authentication for the Harness platform and Harness MCP.

---

## Verify the configuration

After you configure SSO for Harness MCP, verify that users can authenticate successfully by signing in to Harness MCP using your Identity Provider.

---

## Frequently asked questions

<FAQ
  question="Will adding the MCP URL affect my existing Harness login?"
  mode="docs"
  fallback="No. Adding the MCP ACS URL or redirect URI does not affect your existing SSO configuration. Users can continue to access both Harness and Harness MCP through the same Identity Provider."
/>

<FAQ
  question="Do I need to update certificates, Entity IDs, or other SSO settings?"
  mode="docs"
  fallback="No. You only need to add the MCP ACS URL (SAML) or redirect URI (OIDC). No other changes are required."
/>

<FAQ
  question="What happens if I do not add the MCP URL?"
  mode="docs"
  fallback="Users will not be able to sign in to Harness MCP through SSO. Standard Harness platform login will continue to work."
/>

<FAQ
  question="Can my Identity Provider support multiple ACS URLs or redirect URIs?"
  mode="docs"
  fallback="Most enterprise Identity Providers, including Microsoft Entra ID, Okta, and PingOne, support multiple ACS URLs or redirect URIs for a single application."
/>

<FAQ
  question="Do I need to make this change if I do not use Harness MCP?"
  mode="docs"
  fallback="No. This update is only required if you use Harness MCP with SSO authentication. If you only use the standard Harness platform login, no action is required."
/>

<FAQ
  question="Do I need to create a separate application in my Identity Provider for Harness MCP?"
  mode="docs"
  fallback="No. Add the MCP ACS URL or redirect URI to your existing Harness application. You do not need to create a separate application for Harness MCP."
/>

---

## Next steps

* <a href="/docs/platform/authentication/single-sign-on-saml" target="_blank">Single Sign-On (SSO) with SAML</a>: Configure SAML-based SSO with your Identity Provider.
* <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>: Understand role-based access control and permissions.
* <a href="/docs/platform/role-based-access-control/add-and-manage-service-account" target="_blank">Manage service accounts</a>: Configure programmatic access to Harness.