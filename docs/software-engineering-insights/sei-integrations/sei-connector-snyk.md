---
title: SEI Snyk connector
description: Integrate SEI with Snyk.
sidebar_position: 170
sidebar_label: Snyk
---

Use the SEI Snyk connector to integrate SEI with Snyk.

## Requirements

To use the SEI Snyk connector:

* Make sure your Snyk plan supports APIs. To check this, log in to Snyk, go to **Settings**, and then go to **Billing**.
* Get your Snyk API token. Copy the token somewhere that you can retrieve it when you configure the connector. For instructions, go to the Snyk documentation on [Authentication for API](https://docs.snyk.io/snyk-api-info/authentication-for-api).

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Snyk** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter `https://app.snyk.io`
   * **Username:** The email address of the user associated with the API token that you copied from Snyk.
   * **API Key:** Enter the Snyk API token.
   * **Name:** Enter a name for the connector.
   * **Description** and **Tags** are optional.
