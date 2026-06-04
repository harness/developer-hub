---
title: Add ACS URL for Harness MCP login
description: Learn how to add an additional ACS URL or redirect URI in your Identity Provider to enable Harness MCP login via SAML or OIDC.
sidebar_position: 60
---

## Overview

Harness MCP login authenticates through a separate identity broker (HarnessID) rather than the standard Harness platform login flow. Because of this, the Assertion Consumer Service (ACS) URL in the SAML request differs from the one your Identity Provider (IdP) currently has on file.

Most IdPs verify that the ACS URL in an incoming SAML request exactly matches one of the Reply URLs registered in your application's configuration. If the MCP-specific ACS URL is not added, SAML authentication for MCP login fails.

Adding this URL does not affect your existing Harness platform login. Your current SAML configuration continues to work as before.

| Authentication flow        | ACS URL                                                                               | Action required                           |
| -------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Harness platform login** | `https://<your-domain>.harness.io/gateway/api/users/saml-login?accountId=<accountId>` | No changes required                       |
| **Harness MCP login**      | Account-specific URL provided by Harness                                              | Add the ACS URL to your IdP configuration |

### What you'll learn

- How to retrieve the MCP ACS URL from the Harness SAML configuration.
- How to add the ACS URL in Azure AD (Microsoft Entra ID), Okta, or Ping Identity.
- How to configure the equivalent redirect URI if you use OIDC instead of SAML.

### Before you begin

- You must have **Account Admin** or **Authentication Settings** permissions in Harness.
- Your IdP must already be configured for SAML or OIDC SSO with Harness. If you haven't set this up yet, see [Single Sign-On (SSO) with SAML](/docs/platform/authentication/single-sign-on-saml).
- You need admin access to your IdP (Azure AD, Okta, or Ping Identity) to add Reply URLs or redirect URIs.

---

## Retrieve the additional ACS URL from Harness

Harness displays the MCP-specific ACS URL on the SAML configuration page.

1. Sign in to your Harness account.
2. Navigate to **Account Settings** > **Security and Governance** > **Authentication**.
3. Locate your SAML provider configuration.
4. Select the **three-dot menu (⋮)** on the SAML provider and select **Edit**.
5. On the first page (Name and Display Name), select **Continue**.
6. On the **URL and Identity Provider** page, you will see two URL fields:
   - **SAML Endpoint URL** — Your existing ACS URL (no changes needed).
   - **Additional Reply URL for MCP (Optional)** — The new ACS URL to add to your IdP.
7. Copy the **Additional Reply URL for MCP** value. The URL follows this pattern:

    ```
    https://id.harness.io/idp/realms/HarnessIDP/broker/<broker-id>/endpoint
    ```

:::note
If the Additional Reply URL for MCP field is empty or not visible, contact [Harness Support](mailto:support@harness.io) or your Customer Success Manager to enable MCP for your account.
:::

---

## Add the ACS URL in your Identity Provider

### Azure AD (Microsoft Entra ID)

1. Sign in to the [Azure Portal](https://portal.azure.com).
2. Navigate to **Microsoft Entra ID** > **Enterprise Applications**.
3. Select your Harness application.
4. Go to **Single sign-on** in the left navigation.
5. In the **Basic SAML Configuration** section, select **Edit**.
6. Under **Reply URL (Assertion Consumer Service URL)**, select **Add reply URL**.
7. Enter the MCP ACS URL copied from Harness.
8. Select **Save**.

:::warning
Do not remove your existing Reply URL. Your original Harness platform login continues to use that URL. Add the new MCP URL as an additional entry so both login flows work.
:::

#### Troubleshooting

- If you see the error `AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application`, the MCP ACS URL has not been registered yet.
- Azure AD supports multiple Reply URLs per Enterprise Application. The correct URL is selected automatically based on the ACS URL in the incoming AuthnRequest.

---

### Okta

Okta requires you to add **two additional** ACS URLs as Requestable SSO URLs. Your existing Single sign-on URL remains unchanged. Both new URLs are displayed in the Harness SAML configuration UI and must both be added — if either is missing, one of the two login flows will break.

1. Sign in to your **Okta Admin Console**.
2. Navigate to **Applications** > **Applications**.
3. Select your Harness application.
4. On the **General** tab, select **Edit** in the **SAML Settings** section.
5. Select **Next** to proceed to the **Configure SAML** step.
6. Leave the existing **Single sign-on URL** unchanged.
7. Check the box **"Allow this app to request other SSO URLs"**.
8. In the **Requestable SSO URLs** section, select **Add Another**.
9. Add the **SAML Endpoint URL** from Harness with Index `1`.
10. Select **Add Another** again.
11. Add the **Additional Reply URL for MCP** from Harness with Index `2`.
12. Select **Next**, then **Finish** to save.

:::warning
All three URLs must be present — the original Single sign-on URL plus both new Requestable SSO URLs. Removing the SAML Endpoint URL breaks platform login; removing the MCP URL breaks MCP login.
:::

#### Where to find the URLs in Harness

- Both new URLs are available in the Harness UI under **Account Settings** > **Authentication** > **SAML Provider** > **Edit** > **Continue** (URL and Identity Provider page).
- No other SAML settings (certificates, Entity ID, SSO URL) need to change.

---

### Ping Identity (PingOne)

1. Sign in to the **PingOne Admin Console**.
2. Navigate to **Applications** > **Applications** in the left sidebar.
3. Select your Harness application.
4. Select the **Configuration** tab.
5. Select the **Edit** (pencil) icon to open the configuration editor.
6. In the **SAML Settings** section, locate the **ACS URLs** field.
7. Select **+ Add** below the existing ACS URL.
8. Enter the MCP ACS URL copied from Harness.
9. Select **Save**.

:::warning
Do not remove your existing ACS URL. Add the new MCP URL as an additional entry so both login flows work.
:::

#### How multiple ACS URLs work in PingOne

- PingOne supports multiple ACS URLs per SAML application. The correct URL is selected automatically based on the ACS URL in the incoming AuthnRequest.
- All other SAML settings (Signing Key, Signing Algorithm, Entity ID, Subject NameID Format) remain unchanged.

---

## OIDC authentication

If your Harness account uses OIDC (OpenID Connect) instead of SAML, you need to add the MCP callback URL as an additional redirect URI in your IdP.

### Retrieve the additional redirect URL

1. Sign in to your Harness account.
2. Navigate to **Account Settings** > **Authentication**.
3. Under the **Login via OIDC** section, locate your OIDC provider configuration.
4. Select the **three-dot menu (⋮)** on the OIDC provider and select **Edit**.
5. On the first page (OIDC Provider Overview), select **Continue**.
6. On the **Client Settings** page, copy the **Additional Reply URL for MCP** value.

The URL follows the same pattern as the SAML ACS URL:

```
https://id.harness.io/idp/realms/HarnessIDP/broker/<broker-id>/endpoint
```

### Add the redirect URI in your Identity Provider

#### Azure AD (Microsoft Entra ID)

1. In the [Azure Portal](https://portal.azure.com), go to **Microsoft Entra ID** > **App registrations**.
2. Select your Harness application.
3. Go to **Authentication** in the left navigation.
4. Under **Redirect URIs**, select **Add URI**.
5. Enter the MCP redirect URL and select **Save**.

#### Okta

1. In the **Okta Admin Console**, go to **Applications** > **Applications**.
2. Select your Harness OIDC application.
3. On the **General** tab, select **Edit** in the **Login** section.
4. Under **Sign-in redirect URIs**, select **Add URI**.
5. Enter the MCP redirect URL and select **Save**.

#### Ping Identity (PingOne)

1. In the **PingOne Admin Console**, go to **Applications** > **Applications**.
2. Select your Harness application.
3. On the **Configuration** tab, select the **Edit** (pencil) icon.
4. Under **Redirect URIs**, select **+ Add**.
5. Enter the MCP redirect URL and select **Save**.

:::warning
Do not remove your existing redirect URI. Add the MCP URL as an additional entry so both login flows work.
:::

---

## FAQ

**Will my existing Harness login stop working?**

No. Adding an additional URL does not affect your current configuration. Both URLs work simultaneously.

**Do I need to update certificates, Entity ID, or other IdP settings?**

No. Only the ACS URL (or redirect URI for OIDC) needs to be added.

**What happens if I don't add the new URL?**

MCP login fails with an authentication error. Traditional platform login continues to work normally.

**Can I have multiple ACS URLs in my IdP?**

Yes. All major IdPs (Azure AD, Okta, Ping Identity) support multiple ACS URLs per application. The correct URL is selected based on the ACS URL in the incoming AuthnRequest.

**Is this change required for all customers?**

Only if you use or plan to use Harness MCP login. If you only use traditional Harness platform login, no changes are needed.
