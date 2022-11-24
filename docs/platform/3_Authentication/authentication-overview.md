---
title: Authentication Overview
description: An overview of how to control access to your organization's Harness account by SSO (single sign-on) provider, email domain, 2FA (two-factor authentication), and password policies (strength, expiration, and lockout).
# sidebar_position: 2
helpdocs_topic_id: gdob5gvyco
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides an overview of Authentication in Harness. It describes various ways to authenticate users.

### Before You Begin

* See [Access Management (RBAC) Overview](/article/vz5cq0nfg2-rbac-in-harness).
* Make sure you have permissions to **Create/Edit, Delete** Authentication Settings.

### Review: Authentication Settings

Harness Access control includes:

* Authentication — This checks who the user is.
* Authorization — This checks what the user can do.
* Auditing — This logs what the user does.

This topic focuses on Authentication. For more on Authorization, see [Access Management (RBAC) Overview](/article/vz5cq0nfg2-rbac-in-harness).

Users in Administrator groups can use Authentication Settings to restrict access to an organization's Harness account. The options you choose will apply to all your account's users. These options include:

* [Enable Public OAuth Providers](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enable_public_o_auth_providers)
* [Enable SAML Providers](/article/gdob5gvyco-authentication-overview#enable_security_assertion_markup_language_saml_providers)
* [Enforce Password Policies](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enforce_password_policies)
	+ [Enforce Password Strength](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enforce_password_strength)
	+ [Enforce Password Expiration](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enforce_password_expiration)
	+ [Enforce Lockout After Failed Logins](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enforce_lockout_after_failed_logins)
* [Enforce Two Factor Authentication](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#enforce_two_factor_authentication)
* [Restrict Email Domains](https://ngdocs.harness.io/article/gdob5gvyco-authentication-overview#restrict_email_domains)

### Configure Authentication

* In **Home**, Click **Authentication** under **ACCOUNT SETUP.**
* The **Authentication: Configuration** page appears.![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1624603497308/screenshot-2021-06-25-at-12-14-01-pm.png)
* You can choose one of the below as the default Authentication method:
	+ Login via a Harness Account or Public OAuth Providers
	+ SAML Provider#### Enable Public OAuth Providers

In the **Use Public OAuth Providers** section, you can enable Harness logins via a range of single sign-on mechanisms. Enable this slider to expose sliders for enabling individual OAuth partners.  
For more on OAuth Providers, see [Single Sign-On with OAuth](/article/rb33l4x893).![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1623222405229/screenshot-2021-06-09-at-12-35-56-pm.png)#### Enable Security Assertion Markup Language (SAML) Providers

Select **SAML Provider** to enable a SAML Provider. To do this, you should first disable any configured public OAuth providers.  
For more on adding a SAML Provider, see [Single Sign-On with SAML](/article/mlpksc7s6c).### Enforce Password Policies

You'll see specific controls to govern the following password requirements:
	+ Enforce password strength
	+ Periodically expire passwords
	+ Enforce Two Factor Authentication#### Enforce Password Strength

Select **Enforce password strength** to open the dialog shown below.![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1623216912411/screenshot-2021-06-09-at-11-04-26-am.png)
* Here you can specify and enforce any or all of the below options:
	+ Minimum password length.
	+ Include at least one uppercase letter.
	+ Include at least one lowercase letter.
	+ Include at least one digit.
	+ Include at least one special character.

If you enforce **Have at least one special character**, each password must include one (or more) of the following characters: `~!@#$%^&*_-+=`|\(){}[]:;"'&lt;this-tag&gt;,.?/`

#### Enforce Password Expiration

Select **Periodically expire passwords** to set an interval at which users must refresh their Harness passwords. In the same dialog, you can also set an advance notification interval.

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1623218272636/screenshot-2021-06-09-at-11-03-02-am.png)#### Enforce Lockout After Failed Logins

Select **Enforce lockout policy** to open the dialog shown below. It offers independent controls over the lockout trigger (how many failed logins), lockout time (in days), and notifications to locked-out users and to Harness user groups.

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1623219026871/screenshot-2021-06-09-at-11-39-31-am.png)You can see a summary on the main Authentication page:

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1631231029350/clean-shot-2021-09-09-at-16-42-23.png)### Enforce Two Factor Authentication

Select **Enforce Two Factor Authentication** to enforce 2FA for all users in Harness. This option will govern all logins — whether through SSO providers or Harness username/password combinations. For more information on Two-Factor Authentication see [Two-Factor Authentication](/article/ipsux8n7gm).

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1623222096803/screenshot-2021-06-09-at-11-03-29-am.png)### Set Up Vanity URL

You can access `app.harness.io` using your own unique subdomain URL.

The subdomain URL will be in the following format, with `{company}` being the name of your account:

 `https://{company}.harness.io`

Contact [Harness Support](mailto:support@harness.io) to set up your Account's subdomain URL. The subdomain URL cannot be changed later.Harness automatically detects your Account ID from the subdomain URL and redirects you to the Account's login mechanism.

### Restrict Email Domains

Select **Only allow users with the following email domains:** to allow (whitelist) only certain domains as usable in login credentials. In the dialog shown below, build your allowlist by simply typing your chosen domains into the **Domains** multi-select field.

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1624613232161/screenshot-2021-06-25-at-2-53-25-pm.png)Click **Save**. You can see the success message - **Domain restrictions have been updated successfully** displayed on top of the page and the domains you have whitelisted in the panel.

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1624613670643/screenshot-2021-06-25-at-3-00-22-pm.png)Your resulting allowlist will impose a further filter on logins to Harness via both SSO providers and Harness username/passwords.You can modify your domain selections by clicking the Edit icon.

![](https://files.helpdocs.io/i5nl071jo5/articles/gdob5gvyco/1624613842576/screenshot-2021-06-25-at-3-06-10-pm.png)