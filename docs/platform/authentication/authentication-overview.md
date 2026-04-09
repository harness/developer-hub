---
title: Overview
description: Configure authentication methods, password policies, session timeouts, and audit login events in Harness.
# sidebar_position: 2
helpdocs_topic_id: gdob5gvyco
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/authentication/multiple-identity-providers
  - /docs/platform/authentication/authentication-overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Authentication in Harness controls who can access your account and how. The first layer of Harness access control includes:

- **Authentication:** Checks who you are.
- **Authorization:** Checks what you can do.
- **Auditing:** Logs what you do.

If you are in an Administrator group, you can use Authentication Settings to restrict access to an organization's Harness account. The options you choose apply to all account users.


This page covers **_authentication_**. For information about **_authorization_**, go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" >RBAC in Harness</a>.

---

## What will you learn in this topic?

By the end of this topic, you will be able to understand:

- How to [configure authentication](#configure-authentication) methods for your Harness account, including [Harness login, OAuth](#enable-public-oauth-providers), Security Assertion Markup Language (SAML), and Lightweight Directory Access Protocol (LDAP).
- How to [enforce password policies](#enforce-password-policies), including [password strength requirements](#enforce-password-strength), [expiration intervals](#enforce-password-expiration), and [lockout rules](#enforce-lockout-after-failed-logins) after failed login attempts.
- How to set up [session timeouts](#set-inactive-session-timeout) (inactive) and [absolute session timeout](#set-absolute-session-timeout) to automatically log you out after inactivity or after an absolute time limit.
- How to restrict account access by [whitelisting specific email domains](#restrict-email-domains) and [enabling two-factor authentication](#enforce-two-factor-authentication) account-wide.
- [Audit logs for authentication events](#audit-logs-for-authentication), including how to identify and troubleshoot failed login attempts across all supported auth methods.

---

## Before you begin

- **Basic Harness navigation:** <a href="/docs/platform/get-started/onboarding-guide#step-1-access-your-harness-account" target="_blank" >Sign up or sign in to your Harness account</a>.
- **Harness account hierarchy:** Authentication settings are configured at the account level and apply to all users. Understand the <a href="/docs/platform/get-started/key-concepts#account" target="_blank" >account</a>/<a href="/docs/platform/get-started/key-concepts#organizations-and-projects" target="_blank" >organization/project</a> hierarchy before proceeding.
- **Admin-level permissions:** Permission to create, edit, and delete Authentication Settings. Contact your administrator to get the required permissions.
- **RBAC concepts:** A general [understanding](https://www.harness.io/blog/user-role-management) of role-based access control, since authentication is one of the three aspects of Harness access control, and how <a href="/docs/platform/get-started/key-concepts#how-rbac-works-in-harness" target="_blank" >RBAC works in Harness</a>.
- **SSO familiarity:** Basic knowledge of what SAML, LDAP, and OAuth are, so you can choose the right method for your organization.

---

## Configure authentication

To configure authentication, follow the steps below:

1. In **Home**, select **Account Settings**, and then select **Authentication**.

   The **Authentication** page opens.

  <div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/authentication-overview-41.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

2. Select one of the following authentication methods to follow its configuration:

   - <a href="/docs/platform/authentication/authentication-overview#enable-public-oauth-providers" target="_blank" >Login via a Harness Account or Public OAuth Providers</a>: Authenticate using a Harness username/password or a connected OAuth provider such as GitHub, GitLab, Azure, and so on.
   - <a href="/docs/platform/authentication/authentication-overview#enable-multiple-identity-providers" target="_blank" >Login via SAML</a>: Authenticate through your organization's identity provider using SAML-based single sign-on.
   - <a href="/docs/platform/authentication/single-sign-on-sso-with-ldap#add-ldap-sso-provider" target="_blank" >Login via LDAP</a>: Authenticate using your organization's LDAP directory service with your corporate username and password.

---

## Enable public OAuth providers

You can use Harness logins with different single sign-on mechanisms by enabling the **Use Public OAuth Providers** under **Login via a Harness Account or Public OAuth Providers** and selecting individual OAuth partners (such as Azure, Bitbucket, GitLab, Github, and so on).

For more information, go to <a href="/docs/platform/authentication/single-sign-on-sso-with-oauth" target="_blank" >Single Sign-On with OAuth</a>.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/authentication-overview-42.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

### Enforce password policies

Under **Password Policies**, configure the following requirements:

- **Enforce password strength:** Set minimum length and character requirements.
- **Periodically expire passwords:** Define how often passwords must be refreshed.
- **Enforce Two Factor Authentication:** Require 2FA as part of password policy enforcement.

### Enforce password strength

1. Select **Enforce password strength** to open the dialog.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-43.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

2. Specify and enforce any of the following options:

   - **Minimum password length:** Set the minimum number of characters required.
   - **Include at least one uppercase letter:** Require at least one capital letter.
   - **Include at least one lowercase letter:** Require at least one lowercase letter.
   - **Include at least one digit:** Require at least one number.
   - **Include at least one special character:** Require one or more of the following: `! @ # $ % ^ & * ( ) - _ = + \ | [ ] { } ; : / ? . >`

### Enforce password expiration

Select **Periodically expire passwords** to set an interval at which you must refresh your Harness passwords. In the same dialog, you can also set an advance notification interval.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-44.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

### Enforce lockout after failed logins

Select **Enforce lockout policy** to open the dialog. Use the dialog to configure the lockout trigger (how many failed logins), lockout time (in days), and notifications to locked-out users and Harness user groups.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-45.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

A summary appears on the main Authentication page:

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-46.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

### Enforce two factor authentication

Select **Enforce Two Factor Authentication** to enforce 2FA for all users in Harness. This option governs all logins - whether through SSO providers or Harness username/password combinations. For more information, go to <a href="/docs/platform/authentication/two-factor-authentication" target="_blank" >Two-factor authentication</a>.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-47.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

---

## Enable multiple identity providers

Harness supports multiple identity providers (IdPs) for user authentication using SAML.
You can configure a variety of SAML providers and enable or disable them for user authentication.

:::note
Currently, this feature is behind the feature flag `PL_ENABLE_MULTIPLE_IDP_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

To configure multiple SAML providers in Harness, follow the steps below:

1. Select **Account Settings**, and then select **Authentication**.

2. Select **Login via SAML** and add the SAML providers you need.

    a. If no SAML providers are configured for the account, select **Add SAML Provider**.

    <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/add-provider.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

    The SAML Provider settings appear.
      - In the **Name** field, enter a name for the SAML provider. Names can only contain alphanumeric characters, `_`, `-`, `.`, and spaces. Optionally, add a **Display Name (optional)**. Select **Continue**.

    <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/name-description.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

      - **Select a SAML provider** from the list of providers and select **Continue**.

    <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/select-provider.png')} width="80%" height="40%" title="Click to view full size image" />
    </div>

        <Tabs>
        <TabItem value="Microsoft Entra ID">


          For steps to configure, go to <a href="/docs/platform/authentication/single-sign-on-saml#saml-sso-with-azure" target="_blank" >SAML SSO with Microsoft Entra ID</a>.


        </TabItem>
        <TabItem value="Okta">


          For steps to configure, go to <a href="/docs/platform/authentication/single-sign-on-saml#saml-sso-with-okta" target="_blank" >SAML SSO with Okta</a>.


        </TabItem>
              <TabItem value="OneLogin">


          For steps to configure, go to <a href="/docs/platform/authentication/single-sign-on-saml#saml-sso-with-onelogin" target="_blank" >SAML SSO with OneLogin</a>.


        </TabItem>
        <TabItem value="Others">


          For steps to configure, go to <a href="/docs/platform/authentication/single-sign-on-saml#saml-sso-with-keycloak" target="_blank" >SAML SSO with Keycloak</a>.


        </TabItem>
        </Tabs>

      - In the **URL and Identity Provider** screen, upload the Identity Provider metadata XML and select **Continue**.

      <div style={{textAlign: 'center'}}>
          <DocImage path={require('./static/url-id-provider.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

      - Click **Submit**.
      
      The SAML provider is now listed under **Login via SAML**.

          <div style={{textAlign: 'center'}}>
          <DocImage path={require('./static/multiple-idp-list-saml.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


    b. If one or more SAML providers are configured, enable them.

Before enabling SAML, disable any configured public OAuth providers. For more information, go to <a href="/docs/platform/authentication/single-sign-on-saml" target="_blank" >Single Sign-On with SAML</a>.

### Enable login via SAML

[Enable one or more SAML providers](#enable-multiple-identity-providers) and follow the steps to enable SAML login for your account .

1. Login to your Harness account and select **Login via SAML**.
2. Choose your organization's SAML provider. When you click **Single sign-on**, you will be redirected to your selected provider's login page to complete authentication.    

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/multiple-idp-login.png')} width="80%" height="40%" title="Click to view full size image" />
</div>
                                                                                                
---

## Set up vanity URL

You can access `app.harness.io` using your own unique subdomain URL.

The subdomain URL is in the following format, with `{company}` being the name of your account:

`https://{company}.harness.io`

Contact [Harness Support](mailto:support@harness.io) to set up your account's subdomain URL. The subdomain URL cannot be changed later. Harness automatically detects your Account ID from the subdomain URL and redirects you to the account's login mechanism.

---

## Restrict email domains

Select **Only allow users with the following email domains:** to allow (whitelist) only certain domains as usable in login credentials. In the dialog, enter your chosen domains into the **Domains** multi-select field.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-48.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

Click **Save**. The success message **Domain restrictions have been updated successfully** appears at the top of the page, indicating that certain domains were added to the allowlist.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-49.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

The allowlist filters logins to Harness via both SSO providers and username/passwords. To modify your domain selections, select the Edit icon.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/authentication-overview-50.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

---

## Allow public access to resources

You can use this feature to grant unauthenticated access to view Harness resources without requiring login. Once enabled, you can allow public access to your pipelines. For more information, go to <a href="/docs/platform/pipelines/executions-and-logs/allow-public-access-to-executions" target="_blank" >Allow public access to executions</a>.

:::note
- Currently, this feature is behind the feature flag `PL_ALLOW_TO_SET_PUBLIC_ACCESS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


## Set inactive session timeout

Harness logs you out after a period of inactivity.

To configure your account's session inactivity timeout, follow the steps below:

1. In your Harness account, select **Account Settings** and select **Authentication**.

2. In **Session Inactivity Timeout (in minutes)**, enter the time in minutes to set the session inactivity timeout.

   The default session inactivity timeout value is 1440 minutes (1 day).

   You can set this to a minimum of 30 minutes and a maximum of 4320 minutes (3 days). The field automatically converts the minutes you enter to higher units of time and displays the result under the field. For example, if you enter 1440, the UI shows **1 day** below the field.

  <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/session-timeout.png')} width="80%" height="90%" title="Click to view full size image" /> </div>

3. Click **Save**.

---

## Set absolute session timeout

When you set the **Absolute Session Timeout (in minutes)**, Harness logs you out after the configured timeout, regardless of any activity.

To configure your account's absolute session timeout, follow the steps below:

1. In your Harness account, select **Account Settings** and select **Authentication**.

2. In **Absolute Session Timeout (in minutes)**, enter the time in minutes to set the absolute session timeout.

   The default absolute session timeout is 0, which means it is not set.

   You can set this to a maximum of 4320 minutes (3 days). The field automatically converts the minutes you enter to higher units of time and displays the result under the field. For example, if you enter 1440, the UI shows **1 day** below the field.

   <div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/absolute-timeout.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

3. Click **Save**.

:::info
When both the session inactivity timeout and the absolute session timeout are set, whichever condition is met first takes precedence.
:::

---

## Audit logs for authentication

Harness audit trails record login attempts across all supported authentication methods. These audit events help administrators monitor authentication activity and investigate both successful and failed login attempts. Audit logs are generated for the following methods:

- [LDAP](#ldap-authentication)
- [SAML](#saml-authentication)
- [Two-Factor Authentication (2FA)](#two-factor-authentication-2fa)
- [Password-based authentication](#usernamepassword-authentication)

Each audit entry shows **how the login was attempted**, whether it was successful or failed, and the reason for failure, if applicable. Audit logs are only created for users who exist in your Harness account and are associated with a valid email address. No audit log is generated for login attempts by users who do not exist in the account.

While successful login events are common, pay closer attention to unsuccessful attempts. You may encounter the following failure reasons in the audit trail or in the JSON output when audit streaming is enabled for your account.

### LDAP authentication

Unsuccessful login attempts can occur for the following reasons:

- **Domain not whitelisted:** Your email domain is not permitted for the account.
- **LDAP not configured for the account:** LDAP authentication is not set up.
- **Invalid credentials:** The username or password provided is incorrect.
- **Unable to fetch LDAP configuration:** Harness could not retrieve LDAP settings due to an internal error.
- **LDAP not configured:** LDAP authentication is not configured for this account.
- **LDAP authentication error:** An unexpected error occurred during the LDAP authentication process.

**Example JSON:**

```json
{
  "module": "CORE",
  "resource": {
    "type": "USER",
    "identifier": "demouser@harness.io",
    "labels": {
      "resourceName": "Demo Test",
      "userId": "68xLsmP7RzOJ_F3M_LBBHw"
    }
  },
  "action": "UNSUCCESSFUL_LOGIN",
  "auditEventData": {
    "type": "UnsuccessfulLoginEventData",
    "loginType": "LDAP",
    "failureReason": "Invalid LDAP credentials"
  }
}
```

### SAML authentication

Unsuccessful login attempts can occur for the following reasons:

- **Domain not in allowlist:** Your email domain is not included in the account's allowed domain list.
- **Replay attack:** A previously used SAML login request was detected and blocked for security reasons.

**Example JSON:**

```json
{
  "module": "CORE",
  "resource": {
    "type": "USER",
    "identifier": "demouser@harness.io",
    "labels": {
      "resourceName": "Demo Test",
      "userId": "jWF23r4XQjyRTLVsAS_mVw"
    }
  },
  "action": "UNSUCCESSFUL_LOGIN",
  "auditEventData": {
    "type": "UnsuccessfulLoginEventData",
    "loginType": "SAML",
    "failureReason": "Domain not whitelisted"
  }
}
```

### Two-Factor Authentication (2FA)

Unsuccessful login attempts can occur for the following reasons:

- **Invalid two-factor configuration:** Two-factor authentication is not properly set up for your account.
- **Invalid TOTP token:** The one-time password provided is incorrect or has expired.
- **Two-factor authentication failed:** The security code could not be verified.

**Example JSON:**

```json
{
  "module": "CORE",
  "resource": {
    "type": "USER",
    "identifier": "demouser@harness.io",
    "labels": {
      "resourceName": "Demo Test",
      "userId": "jWF23r4XQjyRTLVsAS_mVw"
    }
  },
  "action": "UNSUCCESSFUL_LOGIN",
  "auditEventData": {
    "type": "UnsuccessfulLoginEventData",
    "loginType": "TWOFA",
    "failureReason": "Invalid TOTP token"
  }
}
```

### Username/password authentication

Failed login attempts using username/password occur when:

- Your credentials are incorrect.
- Your account is temporarily locked or deactivated, or your access has been revoked.

:::note
The JSON response for username/password failures follows a different schema than the audit event entries above. This is an API error response.
:::

**Example JSON:**

```json
{
  "metaData": null,
  "resource": null,
  "responseMessages": [
    {
      "code": "INVALID_CREDENTIAL",
      "level": "ERROR",
      "message": "Invalid credentials: INVALID_CREDENTIAL"
    }
  ]
}
```

---

## Next steps

- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" >RBAC in Harness</a> - learn how authorization and permissions work with authentication.
- <a href="/docs/platform/authentication/single-sign-on-saml" target="_blank" >Single Sign-On with SAML</a> - configure SAML-based SSO for your organization.
- <a href="/docs/platform/authentication/two-factor-authentication" target="_blank" >Two-factor authentication</a> - set up and enforce 2FA for your account.
