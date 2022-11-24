---
title: Switch Account
description: This topic explains the authentication mechanism when the Account is switched for a user.
# sidebar_position: 2
helpdocs_topic_id: 918lei069y
helpdocs_category_id: fe0577j8ie
helpdocs_is_private: false
helpdocs_is_published: true
---

You can be a part of more than one Harness Accounts.

This topic explains how to switch between multiple Accounts in Harness.

### View and switch Accounts

You can check to see if you are a part of multiple Accounts by clicking on your User Profile. 

![](https://files.helpdocs.io/kw8ldg1itf/articles/918lei069y/1659947223593/screenshot-2022-08-08-at-1-55-04-pm.png)Click **Switch Account**. The **Switch Account** settings appear.

![](https://files.helpdocs.io/kw8ldg1itf/articles/918lei069y/1659947371793/screenshot-2022-08-08-at-1-58-49-pm.png)All the Accounts that you are a member of, are listed here. 

You can set a specific Account as default by clicking **Set as Default**.

Switching Accounts might require re-authentication based on the configured authentication settings.The following table shows which settings will need a re-authentication when you switch accounts:



|  |  |  |
| --- | --- | --- |
| **Authentication Setting of Current Account** | **Authentication Setting of the switch Account** | **Need to Re-authenticate** |
| Username and Password | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| Username and Password + OAuth | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| OAuth (All providers) | * Username and Password
* Username and Password + OAuth
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| OAuth (All providers) | * OAuth (All Providers)
 | No |
| OAuth (Google + GitHub) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| OAuth (Google + GitHub) | * OAuth (Google + GitHub)
 | No |
| OAuth (Google) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| OAuth (Google) | * OAuth (Google)
 | No |
| SAML (SSO Settings 1) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| SAML (SSO Settings 1) | * SAML (SSO Settings 1)
 | No |
| SAML (SSO Settings 2) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| SAML (SSO Settings 2) | * SAML (SSO Settings 2)
 | No |
| LDAP (Settings 1) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 2)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| LDAP (Settings 1) | * LDAP (Settings 1)
 | No |
| LDAP (Settings 2) | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* Whitelisted domains
* 2FA at Account scope + OAuth
 | Yes |
| LDAP (Settings 2) | * LDAP (Settings 2)
 | No |
| Whitelisted domains  | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* 2FA at Account scope + OAuth
 | Yes |
| Whitelisted domains  | * Whitelisted domains
 | No |
| 2FA at Account scope + OAuth | * Username and Password
* Username and Password + OAuth
* OAuth (All Providers)
* OAuth (Google + GitHub)
* OAuth (Google)
* SAML (SSO Settings 1)
* SAML (SSO Settings 2)
* LDAP (Settings 1)
* LDAP (Settings 2)
* Whitelisted domains
 | Yes |
| 2FA at Account scope + OAuth | * 2FA at Account scope + OAuth
 | No |

