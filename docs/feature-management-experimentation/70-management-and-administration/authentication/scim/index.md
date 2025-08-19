---
title: System for Cross-domain Identity Management (SCIM)
description: Learn about how system for cross-domain identity management (SCIM) works in Harness FME.
sidebar_position: 1
---

## Overview

System for Cross-domain Identity Management (SCIM) is an open standard that allows admins to automate user and group provisioning. SCIM communicates user and group information between identity providers (IdPs) and service providers requiring user and group information (Split). With SCIM, IT administrators can govern Split users and groups within their own identity provider.

## Enabling SCIM

You can enable SCIM user provisioning to work with your SSO-strict enabled account. SCIM facilitates user provisioning which allows your IdP to create, update, and deactivate members in Split. 

You can:

* Enable SCIM for your Split organization.
* Connect Split to a selected IdP.
* Create and manage users and groups in Split directly from a selected IdP.

:::tip
Once SCIM is enabled for your organization:

- You must add new users in the IdP to give them access to Split. You can't invite new users using Split and any existing open invites are revoked.
- User management actions such as deactivate and activate is disabled in Split. IdP administrators control the user management.
- Groups that are synced from the selected IdP are uneditable in Split. If you want to change the members in a group, the administrators can push them over.
:::

## Supported identity providers

We support the following IdP SCIMs:

* [Okta](./okta)
* [Microsoft Entra ID](./microsoft)
* Other IdPs. These are the IdPs of your choice. SCIM is a protocol supported by a large number of Identity providers. 

  If your IdP is not explicitly supported by Split, you can still set up SCIM by following the instructions provided by your IdP. The instructions for setup with Split stay the same as described below. If you need help getting these set up, contact your CSM for support.

## Enabling SCIM for your Split organization

:::tip
You must enable SAML in SSO Strict mode to use this capability. Refer to the appropriate single sign-on documentation to enable SAML before configuring SCIM.
:::

To enable SCIM for your Split organization, do the following:

1. From the left navigation, navigate to **Admin settings** and then **Security**. Click the **SCIM** tab on the **Security Settings** page.
1. Make an IdP selection based on your organization’s identity provider. Click the **SCIM** toggle to **On**.
1. The SCIM enable view appears. Two pieces of information display and must be copied:

   * Access tokens. Be sure to copy and store this token in a safe location because you won’t be able to access this token again. This only appears once. If you do lose it, you can regenerate a new token.

     :::info
     For security reasons, the access token is valid for one year from the time it's created. At the end of this period, administrators should regenerate this token and update your IdP with the new token to continue using the SCIM functionality.
     :::

   * SCIM connector base URL.

