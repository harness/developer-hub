---
title: SEI Tenable connector
description: Integrate SEI with Tenable.
sidebar_position: 200
sidebar_label: Tenable
---

Tenable provides actionable insight into your entire infrastructure's security risks.

Use the SEI Tenable connector to integrate SEI with Tenable.

## Requirements

To use the SEI Tenable connector you need a Tenable API Key. Copy the key somewhere that you can retrieve it when you configure the connector. For instructions, go to the Tenable documentation on [generating API keys](https://docs.tenable.com/security-center/Content/GenerateAPIKey.htm).

The user creating the token must have one of the following roles: **Basic**, **Scan Operator**, **Standard**, **Scan Manager**, or **Administrator**.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Tenable** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter the URL of the server where Tenable is running.
   * **Username:** The access key for the Tenable user that created the API key.
   * **API Key:** Enter the Tenable API key.
   * **Name:** Enter a name for the connector.
   * **Description** and **Tags** are optional.
