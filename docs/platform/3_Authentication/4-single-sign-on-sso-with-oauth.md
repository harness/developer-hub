---
title: Single Sign-On (SSO) with OAuth
description: This document explains single sign-on with various OAuth providers.
# sidebar_position: 2
helpdocs_topic_id: rb33l4x893
helpdocs_category_id: fe0577j8ie
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports Single Sign-On (SSO) with OAuth 2.0 identity providers, such as GitHub, Bitbucket, GitLab, LinkedIn, Google, and Azure. This integration allows you to use an OAuth 2.0 provider to authenticate your Harness Users.

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623430496791/screenshot-2021-06-11-at-10-23-51-pm.png)Once OAuth 2.0 SSO is enabled, Harness Users can simply log into Harness using their GitHub, Google, or other provider's email address.


### Before you begin

* See Authentication Overview.
* See Access Management (RBAC) Overview.
* For information on OAuth 2.0 see [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/) from Aaron Parecki.

### Requirements

To set up OAuth 2.0 successfully, the following requirements should be met:

* Each Harness User should be registered with Harness using their email address. Users are registered once they have logged into Harness. Harness Users are required to register the first time they log into Harness.
* A Harness User's email address should also be used to authenticate with the OAuth 2.0 provider you plan to enable in Harness for SSO.

For example, if a Harness User is registered with Harness using the email address **JohnOAuth20@outlook.com**, and OAuth SSO is enabled in Harness using Bitbucket as the provider, then the user must also be registered with Bitbucket using **JohnOAuth20@outlook.com**.

#### GitHub primary email required for Harness login

GitHub supports [primary](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-email-preferences/changing-your-primary-email-address) and secondary email addresses:

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623478958948/screenshot-2021-06-12-at-11-45-39-am.png)If you use GitHub for Harness OAuth 2.0 SSO with Harness, the primary email must be used for the Harness account and login.

### Setup overview

Only Harness Users that are members of the User Groups with Create/Edit permissions for Authentication Settings can set up and enable OAuth 2.0 SSO.Setting up Harness OAuth 2.0 SSO involves the following high-level steps:

1. Ensure that the email addresses of registered Harness Users are also registered with the OAuth 2.0 provider you will use for Harness OAuth 2.0 SSO. This applies to all users you plan to invite to Harness after you enable Harness OAuth 2.0 SSO.
2. Enable Harness OAuth 2.0 SSO, and select the OAuth 2.0 providers to use for SSO.
3. Test SSO by having a user log into Harness using each enabled OAuth 2.0 provider.

#### How do I prevent lockouts?

The following steps can help you prevents lockouts when setting up SSO in Harness:

* When you enable OAuth 2.0 SSO, using a Harness User account that is a member of the Administrator Group, remain logged in until you have tested SSO using a separate User account. If there is any error, you can disable OAuth 2.0 SSO.
* Ensure that one or more Harness Users in the Administrators Group are registered with Harness using the same email address they use to log into the OAuth 2.0 provider you plan to use for SSO. Repeat this test for each enabled OAuth 2.0 provider.

If you accidentally get locked out of Harness, email [support@harness.io](mailto:support@harness.io), call 855-879-7727, or contact [Harness Sales](https://harness.io/company/contact-sales).

#### Harness local login

To prevent lockouts or in the event of OAuth downtime, a User in the Harness Administrators Group can use the [**Local Login**](http://app.harness.io/auth/#/local-login) URL (http://app.harness.io/auth/#/local-login) to log in and update the OAuth settings.

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1638374284838/screenshot-2021-12-01-at-9-27-06-pm.png)1. Log in using **Harness Local Login**.
2. Change the settings to enable users to log in.

You can disable Local Login using the feature flag `DISABLE_LOCAL_LOGIN`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.

### Set Up OAuth 2.0 SSO

To set up OAuth 2.0 SSO, do the following:

1. Log into Harness using a Harness User account that is a member of the Administrator User Group with Create/Edit, Delete permissions for Authentication Settings. For information on Harness RBAC, see [Access Management (RBAC) Overview](../4_Role-Based-Access-Control/1-rbac-in-harness.md).  
  
The email address used to log into Harness should also be registered with the OAuth 2.0 providers you intend to enable for Harness SSO.
2. Click **Home**, and then click **Access Control** under **ACCOUNT SETUP**. The **Access Control** page appears.![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623651350568/screenshot-2021-06-14-at-11-34-19-am.png)
3. In the **Users** tab, we can see the list of all the **Active Users** and their **Email**.
4. Before you set up SSO, confirm that your users' email addresses registered with Harness are the same email addresses they use to log into the OAuth 2.0 provider you're enabling for Harness SSO.
5. Click **Authentication** under **ACCOUNT SETUP**. The **Authentication: Configuration** page appears.
6. If it's not already enabled, enable **Use Public OAuth Providers**.
7. Enable each public OAuth 2.0 provider you want to use for SSO.![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623660711540/screenshot-2021-06-11-at-10-23-51-pm.png)

### Log In With An OAuth 2.0 Provider

The first time you log into Harness using OAuth 2.0 SSO, you will be redirected to the OAuth 2.0 provider. Enter the same email address you used for Harness, along with the OAuth 2.0 provider-specific password. Next, you are redirected back to Harness and automatically logged in.

For all future logins, if you are already logged into your OAuth 2.0 provider in the same browser as Harness, simply enter your email address in Harness and log in automatically.

Let's look at an example:

**ExampleUser** is registered in Harness with the email address **exampleharnessUser@gmail.com**:

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623663453106/screenshot-2021-06-14-at-3-06-12-pm.png)The email address **exampleharnessUser@gmail.com** is also registered with Google:

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623664308063/screenshot-2021-06-14-at-3-17-01-pm.png)And Google is enabled as the Harness SSO provider.

ExampleUser logs into Harness with the email address **exampleharnessUser@gmail.com**:

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1638880593931/screenshot-2021-12-07-at-6-05-34-pm.png)When the user clicks Google, the browser is redirected to the Google website:

![](https://files.helpdocs.io/i5nl071jo5/articles/rb33l4x893/1623666585979/screenshot-2021-06-14-at-3-58-48-pm.png)The user enters the email address as **exampleharnessUser@gmail.com** and clicks **Next**. The user enters the password and clicks **Next**.

Google verifies the email address and password and returns the browser to Harness, where Example User is logged in automatically.

Harness OAuth 2.0 login successful!

Each time you use the OAuth provider to log into Harness, you will be required to log into the OAuth provider first. This is the standard OAuth process.### Limit OAuth 2.0 SSO Domain Names

By default, any member invited to Harness by a Harness Administrator can log in using an OAuth 2.0 SSO identity provider that's enabled on Harness. However, you can limit which email domain names can be used to log into Harness.

For example, you might set up Google as a Harness OAuth 2.0 SSO provider, but you want only users who have **example.io** in their (login) email address to be able to log in via Google.

To filter domain names in this way, see our [Authentication Overview](../3_Authentication/1-authentication-overview.md) topic's section on [Restrict Email Domains](../3_Authentication/1-authentication-overview.md#restrict-email-domains).

### Next Steps

* [Two-Factor Authentication](../3_Authentication/2-two-factor-authentication.md)

