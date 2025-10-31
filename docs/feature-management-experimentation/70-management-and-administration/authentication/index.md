---
title: Authentication
sidebar_position: 6
---

## Overview

Use the following topics to set up and manage authentication for your organization in Harness FME.

## Single sign-on (SSO)

- [Single sign-on overview](./sso/)
- [Single sign-on with Azure](./sso/azure)
- [Single sign-on with AD FS](./sso/ad-fs)
- [Single sign-on with G Suite](./sso/google)
- [Single sign-on with Okta](./sso/okta)
- [Single sign-on with OneLogin](./sso/onelogin)

## SCIM

- [SCIM overview](./scim/)
- [SCIM for Microsoft Entra ID](./scim/microsoft)
- [SCIM for Okta](./scim/okta)

## Two-factor authentication (2FA)

- [Two-factor authentication (2FA)](/docs/feature-management-experimentation/management-and-administration/account-settings/users#two-factor-authentication-2fa)

## Session management

The Split console uses a single important cookie: **`split-token`**, which stores the user’s JSON Web Token (JWT) credentials after authentication.  

This cookie is required to maintain the user’s session while they are logged in.