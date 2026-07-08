---
title: Just-In-Time (JIT) user provisioning
description: Automatically provision users in Harness when they first log in via SAML SSO using Just-In-Time provisioning.
sidebar_position: 110
sidebar_label: Just-In-Time user provisioning
slug: /platform/role-based-access-control/just-in-time-user-provisioning/
redirect_from:
  - /docs/platform/role-based-access-control/provision-use-jit/
keywords:
  - JIT provisioning
  - just-in-time provisioning
  - SAML JIT
  - user provisioning
  - SAML SSO
  - automated user creation
  - JIT validation
  - SAML assertion
  - IdP provisioning
  - SSO provisioning
  - automatic user onboarding
tags:
  - RBAC
  - Authentication
  - SAML
  - SSO
  - User Management
---

import DocImage from '@site/src/components/DocImage';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Just-In-Time (JIT) provisioning in Harness automatically creates user accounts when users log in for the first time via SAML single sign-on (SSO). JIT provisioning eliminates the need to manually invite each user to Harness by creating user accounts dynamically based on the SAML assertion sent by your identity provider (IdP).

The key principle is that JIT provisioning only handles user creation automatically. Authorization (permissions, group memberships, roles, and resource groups) requires separate configuration through <a href="/docs/platform/authentication/single-sign-on-saml/" target="_blank"> SAML authorization settings</a> and user group linking. Users only receive permissions if they are placed in Harness user groups that already have role bindings configured.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:
- Understand how JIT provisioning works with SAML SSO.
- Enable JIT provisioning in Harness for supported identity providers.

---

## Before you begin

Before you enable JIT provisioning in Harness, ensure you have the following:

- **SAML SSO configured**: An active SAML SSO provider already configured in Harness (Okta, Microsoft Entra ID, OneLogin, or Keycloak). Go to the appropriate SAML SSO guide to configure your provider:
  - <a href="/docs/platform/authentication/single-sign-on-saml/okta" target="_blank">Okta</a>
  - <a href="/docs/platform/authentication/single-sign-on-saml/microsoft-entra-id" target="_blank">Microsoft Entra ID</a>
  - <a href="/docs/platform/authentication/single-sign-on-saml/onelogin" target="_blank">OneLogin</a>
  - <a href="/docs/platform/authentication/single-sign-on-saml/keycloak" target="_blank">Keycloak</a>

- **Account administrator permissions**: Account administrator access in Harness to configure authentication settings. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles and permissions.
- **Users assigned in IdP**: Users must exist in your identity provider and be assigned to the Harness SAML application before they can use JIT provisioning.

---

## How JIT provisioning works

This describes the JIT provisioning flow when a user logs in to Harness for the first time via SAML SSO.

When a user attempts to log in to Harness:

1. The user is redirected to your configured identity provider (IdP) for authentication.
2. After successful authentication, the IdP sends a SAML assertion containing user attributes (email, name, groups) back to Harness.
3. Harness checks if the user already exists in the account:
   - **If the user exists**: Harness authenticates the user and grants access based on their assigned roles and permissions.
   - **If the user does not exist and JIT provisioning is enabled**: Harness validates the SAML assertion against configured JIT validation rules (if any), creates a new user account using the email from the assertion, and grants access.
4. If JIT validation rules are configured, the SAML assertion must contain the specified validation key-value pair for automatic provisioning to occur. If the validation fails, the user is denied access.

---

## Enable JIT provisioning in Harness

To enable JIT provisioning for your SAML SSO provider, do the following:

1. In your Harness account, go to **Account Settings** -> **Authentication**.
2. Select **SAML Provider** to add a new SAML provider, or select **Login via SAML** to edit an existing provider.
3. If creating a new provider, enter a **Name** for the SAML provider and select your IdP (Okta, Microsoft Entra ID, OneLogin, or Other).
4. Select **Enable JIT Provisioning**.

   <DocImage path={require('./static/jit-user-provisioning.png')} width="80%" height="60%" title="Enable JIT provisioning in Harness" />

5. (Optional) To control who can get added to Harness on their first login, specify **JIT Validation Key** and **JIT Validation Value**, which serve as the key-value that must be present in the SAML assertions.
6. Complete the remaining SAML provider configuration, such as uploading metadata, configuring entity ID, and enabling authorization if needed.
7. Select **Save** or **Add**.

After you enable JIT provisioning, new users who authenticate via SAML SSO are automatically created in Harness on their first successful login.

---

## User management with JIT provisioning

The following table compares user management workflows with and without JIT provisioning enabled.

| Aspect | Without JIT Provisioning | With JIT Provisioning |
|--------|-------------------------|----------------------|
| **User invitation** | You must manually invite users to Harness before they can log in via SAML SSO. | You do not need to manually invite users to Harness. |
| **Invitation process** | Users receive an email invitation to join Harness. | No email invitation is required. |
| **First login** | After accepting the invitation and logging in for the first time via SAML SSO, their email addresses are registered in Harness. | On first successful SAML SSO login, Harness automatically creates a user account with the email address from the SAML assertion. |
| **User access** | Users can log in only after accepting the invitation. | The user can immediately log in to Harness. However, roles and resource groups are not assigned automatically. Users only receive permissions if they are placed in Harness user groups that already have role bindings configured. |
| **IdP requirements** | Users must be assigned to the Harness SAML application in your IdP. | Users must be assigned to the Harness SAML application in your IdP. |
| **Group membership** | User groups must be manually assigned in Harness. | If SAML authorization is enabled, the user is automatically added to Harness user groups based on IdP group memberships. |

---

## Troubleshooting

<Troubleshoot
  issue="Users cannot log in on first attempt after JIT provisioning is enabled"
  mode="fallback-only"
  fallback="Users must first log in through the SAML SSO application in their identity provider (click the Harness icon in Okta, Microsoft Entra ID, OneLogin, or Keycloak) instead of accessing app.harness.io directly. This provisions the user in Harness. Subsequent logins can be direct to Harness."
/>

<Troubleshoot
  issue="Error when updating JIT-provisioned user via SCIM"
  mode="fallback-only"
  fallback="Choose one provisioning method exclusively. If using SCIM, remove the JIT-provisioned user and re-add them through SCIM. Users should be managed by a single provisioning method (either JIT or SCIM, not both)."
/>

<Troubleshoot
  issue="JIT-provisioned users have no permissions or group memberships"
  mode="fallback-only"
  fallback="JIT provisioning only creates the user account. Permissions must be configured separately in Harness. Enable SAML authorization (not just authentication) to sync group memberships from your IdP, then link Harness user groups to SAML SSO provider groups. If SAML authorization is not enabled, manually assign users to user groups."
/>

<Troubleshoot
  issue="User loses group access after logging in via SAML"
  mode="fallback-only"
  fallback="SAML-linked user groups synchronize on every login. If group assignments changed in the IdP or the user was removed from the SAML application group claims, those changes sync to Harness on next login. Verify the user group assignments in your identity provider."
/>

<Troubleshoot
  issue="What should I put in JIT Validation Key and JIT Validation Value fields?"
  mode="fallback-only"
  fallback="These fields are optional. Leave them blank if you want all users assigned to the Harness SAML application in your IdP to be provisioned. Specify a Key (SAML attribute name) and Value if you want to selectively provision users based on a specific attribute in the SAML assertion. Only users whose SAML assertion contains the matching key-value pair will be provisioned."
/>

<Troubleshoot
  issue="Does JIT provisioning send confirmation emails to new users?"
  mode="fallback-only"
  fallback="No, JIT provisioning does not send emails for confirmation or password creation. The user account is created automatically without requiring an invitation or email confirmation."
/>

<Troubleshoot
  issue="Can Harness automatically map permissions from my identity provider to Harness roles?"
  mode="fallback-only"
  fallback="No, Harness does not support automatic permission mapping or inheritance from external systems. User permissions must be explicitly configured within Harness. While JIT provisioning creates user accounts automatically, their permissions and role assignments must be configured separately through SAML authorization and user group linking."
/>

---

## Related articles

- <a href="/docs/platform/authentication/single-sign-on-saml/okta" target="_blank">SAML SSO with Okta</a> - Configure Okta as a SAML SSO provider with JIT provisioning.
- <a href="/docs/platform/authentication/single-sign-on-saml/microsoft-entra-id" target="_blank">SAML SSO with Microsoft Entra ID</a> - Configure Microsoft Entra ID as a SAML SSO provider with JIT provisioning.
- <a href="/docs/platform/authentication/single-sign-on-saml/onelogin" target="_blank">SAML SSO with OneLogin</a> - Configure OneLogin as a SAML SSO provider with JIT provisioning.
- <a href="/docs/platform/authentication/single-sign-on-saml/keycloak" target="_blank">SAML SSO with Keycloak</a> - Configure Keycloak as a SAML SSO provider with JIT provisioning.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Understand roles, permissions, and user group management.
- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage user groups</a> - Create and manage user groups for role-based access control.