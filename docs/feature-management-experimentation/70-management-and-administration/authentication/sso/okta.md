---
title: Single Sign-On (SSO) with Okta
description: Learn about how single-sign on (SSO) works with Okta in Harness FME.
sidebar_position: 3
sidebar_label: Okta
---

## Overview

Okta is a cloud-based identity management provider that you can integrate with Split’s SAML 2.0 API, allowing you to log in to Split using your single sign-on (SSO) credentials.

## Create an SSO application

1. Sign in to Okta.
1. Click **Admin** to go to the Admin panel.
1. Select the **Applications** sidebar menu item.
   
   ![](../../static/okta-1.png)

1. Click **Create App Integration**.
   
   ![](../../static/okta-2.png)

1. Select **SAML 2.0**, and then click **Next**.

   ![](../../static/okta-3.png)

1. For the **App name** field, enter a name for your Split app and click **Next**.

   ![](../../static/okta-4.png)

1. Create the app with a temporary **Single sign-on URL**. You will get the real URL later during the Split configuration, and come back to change it. 
   
   ![](../../static/okta-5.png)

   Use the following settings:

   * Set a temporary **Audience URI** (SP Entity ID). You will also get the real value during the Split configuration and change it later.
   * Set the Name ID format as `EmailAddress`.
   * Leave the rest of the options as default and click **Next**.

1. Before finishing, select **I'm an Okta customer adding an internal app**.

   ![](../../static/okta-6.png)

1. Click **Finish**.

1. SSO parameters are now available. Click **View Setup Instructions**.
   
   ![](../../static/okta-7.png)

1. Copy the IDP metadata.
   
   ![](../../static/okta-8.png)

## Configure SAML

If you are a Split administrator, you can configure SAML in Admin Settings.

1. Go to **Admin Settings** > **Security** > **SAML**.
1. Add the IdP metadata copied from Okta.
1. Enable/disable **SAML strict mode**.
1. Enable/disable **Just-in-time user provisioning**.
1. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use this information when adding SAML settings in Okta.

![](../../static/okta-9.png)

## Add SAML Settings

1. Go to the Okta Admin Panel.
1. Select the **General** tab.
1. Under **SAML Settings**, click **Edit**.

   ![](../../static/okta-10.png)

1. Click **Next**.
1. Change the **Single sign-on URL** to the Assertion Consumer Service URL provided in Split in the configuration parameters.
1. Change the **Audience URI** to the Audience URI provided in Split in the configuration parameters.
1. Change the **Default RelayState** to the Default RelayState provided in Split in the configuration parameters.
   
   ![](../../static/okta-11.png)

1. Click **Show Advanced Settings**.
1. Click **Add Another** under **Other Requestable SSO URLs** and set the **URL** to the **Requestable SSO URL** provided in Split in the configuration parameters. Set the **Index** value to 1.

   ![](../../static/okta-12.png)

1. Click **Next** and then **Finish**.

Split is now linked with Okta.