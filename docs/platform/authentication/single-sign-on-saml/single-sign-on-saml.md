---
title: Overview of Single Sign-On with SAML
description: Overview of SAML-based single sign-on (SSO) in Harness, including key concepts, supported formats, and SCIM integration settings.
sidebar_position: 1
helpdocs_topic_id: mlpksc7s6c
helpdocs_category_id: fe0577j8ie
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/general-availability-harness-developer-hub-hdh
redirect_from:
    - /docs/platform/authentication/single-sign-on-saml/overview

---

import SCIMurl from '/docs/platform/shared/scimurl.md'

Harness supports Single Sign-On (SSO) with SAML by integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. This section explains how to set up SAML authentication.


:::info note
If you use <a href="/docs/self-managed-enterprise-edition/smp-overview"target="_blank" > Harness Self-Managed Enterprise Edition </a>, your instance must be accessed via an HTTPS load balancer. SAML authentication will fail over HTTP.
:::

---


## What will you learn in this topic?

By the end of this topic, you will be able to understand:
- How Harness supports SAML-based single sign-on and how to enable it as the default authentication method.
- XML SAML file format requirements used with Harness.
- How to use the System for Cross-domain Identity Management (SCIM) protocol with Harness to keep user group memberships continuously up to date.
- Key integration components required to integrate SAML SSO.

---

## Before you begin

- **A Harness account with admin permissions:** You need permission to manage Authentication Settings. Go to <a href="/docs/platform/authentication/authentication-overview"target="_blank" >Authentication overview</a> for details.
- **A SAML identity provider (IdP):** Such as Okta, Microsoft Entra ID, OneLogin, or Keycloak, with admin access to configure a new application integration.
- **Matching user accounts:** Users must exist in both Harness and the SAML provider with the same email address before SSO can be enabled.
- **At least two user accounts for testing:** One Harness Administrator account to configure SSO and one regular user account to test the login flow.

---

## Supported formats

The XML SAML file used with Harness must use UTF-8.

UTF-8 BOM is not supported. Some text editors like Notepad++ save in UTF-8 BOM by default.

:::info note
When integrating users through any SAML provider, users added to an external SAML provider are not automatically synchronized with Harness user groups. Synchronization occurs upon the first login by the user belonging to a specific provider's user group into Harness. Only at this point will the newly added user, having logged in through SAML, inherit all permissions and access rights associated with the Harness group linked to the SAML-provider's user group.
:::

---

## Use System for Cross-domain Identity Management (SCIM) protocol

To ensure continuous and real-time synchronization of user group bindings and access controls, Harness recommends that you utilize the System for Cross-domain Identity Management (SCIM) protocol. SCIM enables real-time syncing of user additions with Harness user groups, ensuring that user permissions and access rights are consistently applied and maintained.

For implementation details on provisioning users with SCIM, go to <a href="/docs/platform/role-based-access-control/provision-users-with-okta-scim"target="_blank" > Okta SCIM </a>, <a href="/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim"target="_blank" > Microsoft Entra SCIM </a>, or <a href="/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim"target="_blank" > OneLogin SCIM </a> based on your SAML provider.

### SCIM API integration settings

If you provision users and groups via SCIM API, use the following settings for your SAML integration.

- **SCIM connector base URL:** `https://app.harness.io/gateway/ng/api/scim/account/[YOUR_ACCOUNT_ID]`. enter the appropriate URL for your cluster:

<SCIMurl />

- **Unique identifier:** `userName`
- **Authentication Mode:** HTTP Header
- **Authorization:** `<YOUR_SERVICE_ACCOUNT_TOKEN>`

You must also do the following:

- Enable provisioning to Harness.
- Assign your user groups.
- Push your groups to Harness.

---

## SAML SSO with Harness

To set up SAML SSO with Harness, you add a SAML SSO provider to your Harness account and enable it as the default authentication method.

The following elements are required to successfully connect Harness to your SAML provider:

* **Harness User email addresses:** Users are invited to Harness using their email addresses. Once they log into Harness, their email addresses are registered with Harness as Harness Users. To use SAML SSO, Harness Users must use the same email addresses to register in Harness and the SAML provider.

:::info note
Ensure that you have at least two corresponding user accounts when setting up and testing SAML SSO in Harness. This allows you to set up the account with a Harness Administrator account and test it with a Harness user account.
:::

* **SAML provider user email addresses:** To use the SAML provider to verify Harness Users, the email addresses used in the SAML provider must match the email addresses for the registered Harness Users you want to verify.
* **Harness SAML Endpoint URL:** This URL is where the SAML provider will post the SAML authentication response to your Harness account. This URL is provided by Harness in the **Single Sign-On (SSO) Provider** dialog. You enter this URL in your SAML SSO provider app to integrate it with Harness.
* **SAML metadata file:** This file is provided by your SAML provider app. You upload this file into the Harness **Single Sign-On (SSO) Provider** dialog to integrate the app with Harness.

---

## Next steps

- <a href="/docs/platform/authentication/single-sign-on-saml/okta"target="_blank" >SAML SSO with Okta</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/ms-entra-id"target="_blank" >SAML SSO with Microsoft Entra ID</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/onelogin"target="_blank" >SAML SSO with OneLogin</a>
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak"target="_blank" >SAML SSO with Keycloak</a>
