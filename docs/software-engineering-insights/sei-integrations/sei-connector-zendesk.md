---
title: SEI Zendesk connector
description: Integrate SEI with Zendesk.
sidebar_position: 240
sidebar_label: Zendesk
---

Zendesk is a cloud-based customer service application designed to improve communication between the company and its customers.

Use the SEI Zendesk connector to integrate SEI with Zendesk.

## Configure authentication

To use the SEI Tenable connector you need a Zendesk API token that belongs to an Admin service account.

1. Create or obtain an Admin service account in Zendesk.
2. Make sure the service account has `read` access to all issues that you want to analyze.
3. Using the service account, create a Zendesk API token. For instructions, go to the Zendesk documentation on [generating a new API token](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token).
4. Copy the key somewhere that you can retrieve it when you configure the connector.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Zendesk** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter the URL for your Zendesk instance.
   * **Username:** The Zendesk service account username.
   * **API Key:** Enter the Zendesk API token.
   * **Name:** Enter a name for the connector.
   * **Description** and **Tags** are optional.
