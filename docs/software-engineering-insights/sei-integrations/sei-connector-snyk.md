---
title: SEI Snyk integration
description: Integrate SEI with Snyk.
sidebar_position: 190
sidebar_label: Snyk
---

Snyk Open Source helps development teams automatically find and fix vulnerabilities and license violations in their open source dependencies.

Use the SEI Snyk integration to integrate SEI with Snyk.

## Requirements

To use the SEI Snyk integration:

* Make sure your Snyk plan supports APIs. To check this, log in to Snyk, go to **Settings**, and then go to **Billing**.
* Get your Snyk API token. Copy the token somewhere that you can retrieve it when you configure the integration. For instructions, go to the Snyk documentation on [Authentication for API](https://docs.snyk.io/snyk-api-info/authentication-for-api).

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Snyk** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter `https://app.snyk.io`
   * **Username:** The email address of the user associated with the API token that you copied from Snyk.
   * **API Key:** Enter the Snyk API token.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
