---
title: SEI Tenable integration
description: Integrate SEI with Tenable.
sidebar_position: 220
sidebar_label: Tenable
---

Tenable provides actionable insight into your entire infrastructure's security risks.

Use the SEI Tenable integration to integrate SEI with Tenable.

## Requirements

To use the SEI Tenable integration you need a Tenable API Key. Copy the key somewhere that you can retrieve it when you configure the integration. For instructions, go to the Tenable documentation on [generating API keys](https://docs.tenable.com/security-center/Content/GenerateAPIKey.htm).

The user creating the token must have one of the following roles: **Basic**, **Scan Operator**, **Standard**, **Scan Manager**, or **Administrator**.

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Tenable** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL of the server where Tenable is running.
   * **Username:** The access key for the Tenable user that created the API key.
   * **API Key:** Enter the Tenable API key.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
