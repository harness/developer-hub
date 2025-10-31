---
title: Single Sign-On (SSO) with OneLogin
description: Learn about how single-sign on (SSO) works with OneLogin in Harness FME.
sidebar_position: 4
sidebar_label: OneLogin
---

## Overview

OneLogin is a cloud-based identity management provider that you can integrate with Split’s SAML 2.0 API, allowing you to log in to Split using your single sign-on (SSO) credentials.

## Create an SSO application

1. Sign in to OneLogin.
1. Click **Apps** > **Company Apps** > **Add App**.

   ![](../../static/ol-1.png)

1. Search and select **SAML Test Connector (IdP)**.

   ![](../../static/ol-2.png)

1. Edit the **Display Name** and click **Save**.

   ![](../../static/ol-3.png)

1. In **More Actions**, select **SAML Metadata** to download the file to be used in Split.

   ![](../../static/ol-4.png)

## Configure SAML

If you are a Split administrator, you can configure SAML in Admin Settings.

1. Go to **Admin Settings** > **Security** > **SAML**.
1. Add the IdP metadata downloaded from OneLogin.
1. Enable/disable **SAML strict mode**.
1. Enable/disable **Just-in-time user provisioning**.
1. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use this information when adding SAML settings in OneLogin.

![](../../static/ol-5.png)

## Add SAML settings

1. Go to the OneLogin app that you created.

1. Select the **Configuration** tab.

1. Populate the **Audience**, **Recipient**, **ACS URL Validator**, and **ACS URL** with the **Assertion Consumer Service URL** from above.

![](../../static/ol-6.png)

1. Click **Save**.

Split is now linked with OneLogin.