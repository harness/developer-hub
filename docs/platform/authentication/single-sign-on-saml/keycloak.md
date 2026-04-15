---
title: Keycloak
description: This document explains SAML single sign-on with Keycloak.
sidebar_position: 5
---

import SCIMurl from '/docs/platform/shared/scimurl.md'

## What will you learn in this topic?

By the end of this topic, you will be able to understand:
- How to set up a Keycloak SAML client.
- How to configure Harness to use Keycloak SAML client as an SSO provider.
- How to enable group-based authorization.

---

## Before you begin

- A Harness account with Account Admin permissions.
- An existing Keycloak instance with admin access to create and configure SAML clients.

---

You can use Keycloak as a SAML identity provider for Harness, letting Keycloak users log in to Harness with their existing credentials and optionally syncing Keycloak group memberships to Harness user groups automatically.

:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview"target="_blank" > Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

Harness supports configuration with or without <a href="/docs/platform/role-based-access-control/provision-use-jit/" target="_blank">Just-In-Time (JIT) user provisioning</a>. Without JIT, perform the following steps to add new users:

1. In Harness, add the users you want to set up for SAML SSO by inviting them to Harness using the same email addresses that they use in your SAML provider.
2. In Keycloak, add the users and make sure they are in scope for the client you create in the configuration steps below.

With JIT, you add users to Keycloak, and they will automatically be added to Harness upon first login.

### Set up a client in Keycloak

1. Log in to your Keycloak account.
2. Switch to your target Realm, then select **Clients**.
3. Select **Create Client**, then enter the following values.

	**General settings**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Client Type**                | SAML                                                                                                                                            |
	| **Client ID**                  | app.harness.io                                                                                                                                  |
	| **Name**                       | _optional_                                                                                                                                      |
	| **Description**                | _optional_                                                                                                                                      |
	| **Always display in UI**       | Off                                                                                                                                             |

	**Login settings**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Root URL**                   | `https://app.harness.io/`                                                                                                                       |
	| **Home URL**                   | `https://app.harness.io/ng/account/<YOUR ACCOUNT ID>/main-dashboard`                                                                            |
	| **Valid post logout redirect URIs** | `https://app.harness.io/ng/account/<YOUR ACCOUNT ID>/main-dashboard`                                                                       |
	| **Master SAML Processing URL** | `https://app.harness.io/gateway/api/users/saml-login?accountId=<YOUR ACCOUNT ID>`                                                               |

:::info note
If the account uses a vanity URL, then use the vanity URL in your SAML setup. For example, `https://<yourvanityurl>/gateway/api/users/saml-login?accountId=<YOUR ACCOUNT ID>`.
:::

4. Select **Save**.
5. In the newly-created client's configuration, enter the following values.

	**Settings -> SAML capabilities**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Name ID format**             | email                                                                                                                                           |
	| **Force POST binding**         | On                                                                                                                                              |
	| **Include AuthnStatement**     | On                                                                                                                                              |
	| _All other options_            | Off                                                                                                                                             |

	**Settings -> Signature and Encryption**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Sign documents**             | On                                                                                                                                              |
	| **Sign assertions**            | On                                                                                                                                              |
	| **Signature algorithm**        | RSA_SHA256                                                                                                                                      |
	| **SAML signature key name**    | NONE                                                                                                                                            |
	| **Canonicalization method**    | EXCLUSIVE                                                                                                                                       |

	**Keys**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Client signature required**  | Off                                                                                                                                             |

	**Advanced**

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Assertion Consumer Service POST Binding URL**  | `https://app.harness.io/gateway/api/users/saml-login?accountId=<YOUR ACCOUNT ID>`                                             |

6. Select **Save**.
7. From the left-nav menu, go to **Realm Settings**, then select **SAML 2.0 Identity Provider Metadata**. A new tab opens with XML data.

8. Save the data to a file to use when configuring Harness.

9. (Optional) To automatically sync group memberships in Harness based on group memberships in Keycloak, perform the following steps.

   1. Go to your newly-created Client, then select the **Client Scopes** tab.

   2. In the first row, select the value in the **Assigned client scope** field.

   3. Select **Configure a new mapper**, then select **Group list**.
   4. Configure the following settings.

	| **Name**                       | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Name**                       | grouplist                                                                                                                                       |
	| **Group attribute name**       | member                                                                                                                                          |
	| **SAML Attribute NameFormat**  | Basic                                                                                                                                           |
	| **Single Group Attribute**     | On                                                                                                                                              |
	| **Full group path**            | Off                                                                                                                                             |
   5. Select **Save**.

### Set up Keycloak SAML SSO in Harness

1. In your Harness account, go to **Account Settings**, and then select **Authentication**.
2. Select **+ SAML Provider**, then enter the following values.

	| **Field**                      | **Description**                                                                                                                                 |
	| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
	| **Name**            			 | Keycloak                                                                                                                                        |
	| **Select an SAML Provider**    | Other                                                                                                                                           |
	| **Enable Authorization**       | _Enable if you want to automatically sync group memberships in Harness based on group memberships in Keycloak_                                  |
	| **Group Attribute Name**       | member _(only available if Enable Authorization is selected)_                                                                                   |
	| **Add Entity Id**              | _Enabled_                                                                                                                                       |
	| **Entity Id**                  | app.harness.io                                                                                                                                  |
	| **Enable JIT Provisioning**    | _Enable if Just In Time user provisioning is desired_                                                                                           |

3. Select **Add**.
4. In **Upload the Identity Provider metadata XML downloaded from your app**, select **Upload**, then select the XML file you added when you set your Keycloak configuration steps.
5. Select **Add**. The new SSO provider is displayed under **Login via SAML**. You might need to expand this section using the arrow on the right-hand side of the screen.

### Enable and test SSO with Keycloak

Now that Keycloak is set up in Harness as a SAML SSO provider, you can enable and test it.

1. To enable the SSO provider, select **Login via SAML**.
2. In the resulting **Enable SAML Provider** dialog, click **TEST** to verify the SAML connection you've configured.
3. Upon a successful test, Harness will display the **SAML test successful** banner on top.
4. Click **CONFIRM** to enable SAML SSO in Harness.

## Harness Local Login

import Harnessll from '/docs/platform/shared/harness-local-login.md'

<Harnessll />

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

## Set the default experience

Environment administrators can set the default Harness generation landing page, FirstGen or NextGen, for their users to ensure the correct Harness Experience is provided to each user. For more information, go to <a href="/docs/platform/subscriptions-licenses/view-account-info-and-subscribe-to-alerts#account-details" target="_blank">Account details</a>.


---

## Next steps
- <a href="/docs/platform/authentication/single-sign-on-saml/okta"target="_blank" >SAML SSO with Okta</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/ms-entra-id"target="_blank" >SAML SSO with Microsoft Entra ID</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/saml-sso-with-onelogin"target="_blank" >SAML SSO with OneLogin</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration"target="_blank" > Advanced SAML configuration</a>