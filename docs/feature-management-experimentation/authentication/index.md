---
title: Authentication
id: index
slug: /feature-management-experimentation/authentication
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/feature-management-experimentation/management-and-administration/authentication
---

:::warning Migrated from Split?
This documentation describes the **Split legacy** Authentication experience.

If your organization is using Harness FME, authentication practices and the UI may differ. For more information, see [SSO for Split Admins](/docs/feature-management-experimentation/split-to-harness/sso-for-admins) and [Account Migrated to Harness](/docs/feature-management-experimentation/split-to-harness/migrated-account#next-steps).
:::

## Overview

Use the following topics to set up and manage authentication for your organization in Harness FME.

## Single sign-on (SSO)

- [Single sign-on overview](/docs/feature-management-experimentation/authentication/sso)
- [Single sign-on with Azure](/docs/feature-management-experimentation/authentication/sso/azure)
- [Single sign-on with AD FS](/docs/feature-management-experimentation/authentication/sso/ad-fs)
- [Single sign-on with G Suite](/docs/feature-management-experimentation/authentication/sso/google)
- [Single sign-on with Okta](/docs/feature-management-experimentation/authentication/sso/okta)
- [Single sign-on with OneLogin](/docs/feature-management-experimentation/authentication/sso/onelogin)

## SCIM

- [SCIM overview](/docs/feature-management-experimentation/authentication/scim)
- [SCIM for Microsoft Entra ID](/docs/feature-management-experimentation/authentication/scim/microsoft)
- [SCIM for Okta](/docs/feature-management-experimentation/authentication/scim/okta)

## Two-factor authentication (2FA)

- [Two-factor authentication (2FA)](/docs/feature-management-experimentation/users#two-factor-authentication-2fa)

## Session management

The Split console uses a single important cookie: **`split-token`**, which stores the user’s JSON Web Token (JWT) credentials after authentication.  

This cookie is required to maintain the user’s session while they are logged in.