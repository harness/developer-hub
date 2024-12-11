---
title: SCIM overview
sidebar_label: SCIM overview
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/14256801844365-SCIM-overview <br /> ✘ images still hosted on help.split.io </button>
</p>

System for Cross-domain Identity Management (SCIM) is an open standard that allows admins to automate user and group provisioning. SCIM communicates user and group information between identity providers (IdPs) and service providers requiring user and group information (Split). With SCIM, IT administrators can govern Split users and groups within their own identity provider.

# Enabling SCIM

You can enable SCIM user provisioning to work with your SSO-strict enabled account. SCIM facilitates user provisioning which allows your IdP to create, update, and deactivate members in Split. You can:

* Enable SCIM for your Split organization
* Connect Split to a selected IdP
* Create and manage users and groups in Split directly from a selected IdP

Once SCIM is enabled for your organization:

* You must add new users in the IdP to give them access to Split. You can't invite new users using Split and any existing open invites are revoked.
* User management actions such as deactivate and activate is disabled in Split. IdP administrators control the user management.
* Groups that are synced from the selected IdP are uneditable in Split. If you want to change the members in a group, the administrators can push them over.

# What we support

We support the following IdP SCIMs:

* [Okta](https://help.split.io/hc/en-us/articles/10488076923021-SCIM-for-Okta)
* [Azure Access Directory (AzureAD)](https://help.split.io/hc/en-us/articles/12386431119245-SCIM-for-Azure-AD)
* Other IdPs. These are the IdPs of your choice. SCIM is a protocol supported by a large number of Identity providers. If your IdP is not explicitly supported by Split, you can still set up SCIM by following the instructions provided by your IdP. The instructions for setup with Split stay the same as described below. If you need help getting these set up, contact your CSM for support.

# Enabling SCIM for your Split organization

**Prerequisite: You must enable SAML in SSO Strict mode to use this capability. Refer to the appropriate single sign-on guide to enable SAML before configuring SCIM.**

To enable SCIM for your Split organization, do the following:

1. From the left navigation, click the **user's initials** at the bottom, select **Admin settings** and then **Security**. Click the **SCIM** tab on the Security Settings page.
2. Make an IDP selection based on your organization’s identity provider. Click SCIM toggle to **On**.
3. The SCIM enable view appears. Two pieces of information display and must be copied:

  * Access tokens. Be sure to copy and store this token in a safe location because you won’t be able to access this token again. This only appears once. If you do lose it, you can regenerate a new token.
  * SCIM connector base URL.

**Note: For security reasons, the access token is valid for one year from the time it's created. At the end of this period, administrators should regenerate this token and update your IdP with the new token to continue using the SCIM functionality.**

