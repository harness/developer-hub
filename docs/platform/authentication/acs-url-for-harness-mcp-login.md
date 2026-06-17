---
title: Configure Single Sign-On (SSO) for Harness MCP
sidebar_label: Configure SSO for Harness MCP
description: Learn how to add an additional ACS URL or redirect URI in your Identity Provider to enable Harness MCP login via SAML or OIDC.
sidebar_position: 60
redirect_from:
  - /docs/platform/authentication/acs-url-for-harness-mcp-login
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

Harness MCP supports authentication through your existing Single Sign-On (SSO) provider. To enable SSO for MCP, add an additional Assertion Consumer Service (ACS) URL (for SAML) or redirect URI (for OIDC) to your Identity Provider (IdP).

An ACS URL or redirect URI specifies where your Identity Provider sends authentication responses after a user signs in. Because Harness MCP uses a different authentication endpoint than the standard Harness platform login, it requires its own ACS URL or redirect URI.

Adding the MCP-specific URL does not affect your existing Harness platform login. Users can continue to access both Harness and Harness MCP through the same SSO provider.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

* Retrieve the MCP-specific ACS URL or redirect URI from Harness.
* Add the MCP URL to your Identity Provider.
* Configure SSO authentication for Harness MCP.
* Verify that users can authenticate successfully.

---

## Before you begin

Before you configure SSO for Harness MCP, ensure that:

* You have **Account Admin** or **Authentication Settings** permissions in Harness.
* Your Identity Provider is already configured for SAML or OIDC authentication with Harness. Go to [Single Sign-On (SSO) with SAML](/docs/platform/authentication/single-sign-on-saml) to set this up if needed.
* You have administrative access to your Identity Provider.

---

## Configure SAML for Harness MCP

Before updating your Identity Provider, retrieve the MCP ACS URL from your Harness SAML configuration.

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

Add the MCP ACS URL to your Identity Provider.

### Microsoft Entra ID (Azure AD)

<Tabs>
<TabItem value="manual" label="Manual">

1. Sign in to the Azure portal.
2. Go to **Microsoft Entra ID** > **Manage** >  **Enterprise Applications**.
3. Select your Harness application.
4. Select **Manage** > **Single sign-on**.
5. In **Basic SAML Configuration**, select **Edit**.
6. Under **Reply URL (Assertion Consumer Service URL)**, select **Add reply URL**.
7. Enter the MCP ACS URL copied from Harness.
8. Select **Save**.

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

### Okta

Okta handles multiple ACS URLs differently from other Identity Providers. Instead of a simple list of Reply URLs, Okta requires you to enable **Requestable SSO URLs** and add each additional endpoint with an index value.

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
    :::note
    After configuration, your Okta application will have three URLs total:

    | URL | Source | Purpose |
    | --- | ------ | ------- |
    | **SAML Endpoint URL** (index 0) | Copy from Harness SAML config | Harness platform login via HarnessID |
    | **Additional Reply URL for MCP** (index 1) | Copy from Harness SAML config | Harness MCP login |

    Two URLs must be present. If you remove the SAML Endpoint URL, platform login breaks. If you remove the MCP URL, MCP login breaks.
    :::
9. Select **Next**, then select **Finish**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/8dfc15f0-f5dd-49db-941b-95071e17fdf6" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Add MCP URL to Okta" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

### Ping Identity (PingOne)

1. Sign in to the **PingOne Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. Open the **Configuration** tab.
5. Select **Edit**.
6. Under **ACS URLs**, select **Add**.
7. Enter the MCP ACS URL copied from Harness.
8. Select **Save**.

    <DocImage path={require('./static/pingone.png')} alt="PingOne ACS URL configuration" title="Click to view full size image" width="600" height="400" />

Keep your existing ACS URL and add the MCP ACS URL as an additional entry. Both URLs are required to support authentication for the Harness platform and Harness MCP.

:::note
PingOne supports multiple ACS URLs for a single SAML application and automatically selects the appropriate URL during authentication.

You do not need to modify any other SAML settings, including certificates, Entity IDs, signing configuration, or NameID settings.
:::

---

## Configure OIDC for Harness MCP

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
5. Under **Redirect URIs**, select **Add URI**.
6. Enter the MCP redirect URL and select **Save**.

</TabItem>
<TabItem value="interactive" label="Interactive">

<iframe src="https://app.tango.us/app/embed/b73a9125-82c7-4622-8eff-353fc5dbf9b1" style={{minHeight: '640px'}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Configure Teams Reader Redirect URI" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>

</TabItem>
</Tabs>

### Okta

1. Sign in to the **Okta Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. On the **General** tab, select **Edit** in the **Login** section.
4. Under **Sign-in redirect URIs**, select **Add URI**.
5. Enter the MCP redirect URL and select **Save**.

### Ping Identity (PingOne)

1. Sign in to the **PingOne Admin Console**.
2. Go to **Applications** > **Applications**.
3. Select your Harness application.
4. Open the **Configuration** tab.
5. Select **Edit**.
6. Under **Redirect URIs**, select **+ Add**.
7. Enter the MCP redirect URL and select **Save**.

:::note
Keep your existing redirect URI and add the MCP redirect URI as an additional entry. Both redirect URIs are required to support authentication for the Harness platform and Harness MCP.
:::

---

## Frequently asked questions

#### Will adding the MCP URL affect my existing Harness login?

No. Adding the MCP ACS URL or redirect URI does not affect your existing SSO configuration. Users can continue to access both Harness and Harness MCP through the same Identity Provider.

#### Do I need to update certificates, Entity IDs, or other SSO settings?

No. You only need to add the MCP ACS URL (SAML) or redirect URI (OIDC). No other changes are required.

#### What happens if I do not add the MCP URL?

Users will not be able to sign in to Harness MCP through SSO. Standard Harness platform login will continue to work.

#### Can my Identity Provider support multiple ACS URLs or redirect URIs?

Most enterprise Identity Providers, including Microsoft Entra ID, Okta, and PingOne, support multiple ACS URLs or redirect URIs for a single application.

#### Do I need to make this change if I do not use Harness MCP?

No. This update is only required if you use Harness MCP with SSO authentication. If you only use the standard Harness platform login, no action is required.

#### Do I need to create a separate application in my Identity Provider for Harness MCP?

No. Add the MCP ACS URL or redirect URI to your existing Harness application. You do not need to create a separate application for Harness MCP.


