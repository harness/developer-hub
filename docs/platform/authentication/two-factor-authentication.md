---
title: Two-factor authentication
description: Set up and enforce two-factor authentication (2FA) for your Harness account or for all users in the account.
sidebar_position: 15
helpdocs_topic_id: ipsux8n7gm
helpdocs_category_id: fe0577j8ie
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - 2FA
  - two factor authentication
  - 2FA setup
  - enable 2FA
  - enforce 2FA
  - multi-factor authentication
  - MFA
  - authenticator app
  - 2FA QR code
  - 2FA secret key
  - TOTP
  - time-based one-time password
  - 2FA reset
  - reset 2FA
  - 2FA recovery
  - account security
  - two-step verification
  - 2FA enforcement
  - 2FA configuration
  - user 2FA
  - account-wide 2FA
tags:
  - Authentication
  - Security
  - 2FA
  - Multi-Factor Authentication
  - Account Security
---

Two-factor authentication (2FA) adds a second verification step when you log in to Harness. After you enter your password, Harness prompts you for a time-based code from an authenticator app on your phone. This protects your account even if your password is compromised.

You can enable 2FA for your own profile without impacting other user accounts, or an account administrator can enforce it for all users in the account.

---

## What will you learn in this topic?

By the end of this topic, you will know how to:

- Set up 2FA for your user profile.
- Enforce 2FA for all users in the account if you are an account administrator.
- Reset 2FA for a user who has lost access to their authenticator app.

---

## Before you begin

Before you begin, ensure you have the following:
- **Authentication permissions:** To enforce account-wide 2FA, you need a Harness account with **Create/Edit** permissions on Authentication Settings. Go to <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a> to review required permissions.
- **Authenticator app:** Install a 2FA token generator app on your phone, such as Google Authenticator.

---

## Set up 2FA for your profile

To enable 2FA for your own account without affecting other users:

1. Select your **User Profile** icon in the bottom-left corner of the Harness UI.
2. On the Profile page, toggle **Two-Factor Authentication** on. The **Enable Two-Factor Authentication** dialog appears with a QR code.
3. Open your authenticator app and scan the QR code. The app adds **Harness-Inc** to your token list.

   :::info Cannot scan the QR code?
   The dialog also displays a Secret Key. Enter this key manually in your authenticator app to add the account.
   :::

4. Select **Enable**.

The next time you log in, Harness prompts you for the 2FA code from your authenticator app after you enter your password.

---

## Enforce 2FA for all account users

An account administrator or a user with the **Create/Edit** permissions to **Authentication Settings** can enforce 2FA for all users in the account. When an administrator enforces account-wide 2FA:

- **New members** set up 2FA during signup.
- **Existing members** who have not enabled 2FA receive an email with a QR code and setup instructions.

To enforce 2FA for all users:

1. Enable 2FA for your own profile as described in [Set up 2FA for your profile](#set-up-2fa-for-your-profile).
2. Go to **Account Settings** and select **Authentication**. The **Authentication** page appears. 

   <DocImage path={require('./static/two-factor-authentication-01.png')} alt="Authentication configuration page in Account Settings" title="Click to view full size image" />

3. Toggle **Enforce Two Factor Authentication** on.

   If you have not set up 2FA for your own profile, Harness displays a prompt to protect your login first.

   <DocImage path={require('./static/two-factor-authentication-02.png')} alt="Prompt to set up 2FA for your own profile before enforcing account-wide 2FA" title="Click to view full size image" />

4. If prompted, select **Go to settings** and complete 2FA setup for your profile. Store the QR code and secret key for your account recovery.

   <DocImage path={require('./static/two-factor-authentication-03.png')} alt="QR code and secret key for the administrator 2FA setup" title="Click to view full size image" />

5. Return to **Account Settings** and select **Authentication**.
6. Toggle **Enforce Two Factor Authentication** on. Harness displays a confirmation dialog:

   <DocImage path={require('./static/two-factor-authentication-04.png')} alt="Confirmation dialog to enforce 2FA for all users in the account" title="Click to view full size image" />

7. Select **Confirm**.

### How account-level and user-level 2FA settings interact
Harness evaluates two settings at login: 
- The **account-level** 2FA setting 
- The **user-level** 2FA setting 

Harness sends a 2FA challenge if **one or both** of these settings are enabled. Harness skips the 2FA challenge only when **both** settings are disabled.

- If the 2FA settings is enabled at the account-level, all users receive a 2FA challenge at login, regardless of their user-level setting.

- If the 2FA settings is disabled at the account-level but enabled at the user-level, only that individual user receives a 2FA challenge.

When an administrator enables account-level 2FA, Harness sends 2FA setup emails to users but does not change their individual user-level setting. Users can still enable or disable their own user-level setting independently from their profile.

---

## Reset 2FA for a user

If a user loses access to their authenticator app or QR code, an account administrator can reset 2FA and email them a new QR code and secret key.

To reset 2FA for a user:

1. Go to **Account Settings** and select **Access Control**, then select **Users**.
2. Locate the user and select **More Options** (&vellip;) next to their name.

   <DocImage path={require('./static/reset-two-factor-authentication.png')} alt="More Options menu showing the option to email a new 2FA secret" title="Click to view full size image" />

3. Select **Email new Two Factor Auth secret**. The user receives an email with a new QR code and secret key to reconfigure their authenticator app.

---

## Related articles

- <a href="/docs/platform/authentication/authentication-overview" target="_blank">Authentication overview</a>: Review all authentication methods available in Harness.
- <a href="/docs/platform/authentication/switch-account" target="_blank">Switch account</a>: Switch between multiple Harness accounts and understand re-authentication behavior.
