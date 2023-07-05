---
title: SEI Gerrit connector
description: Integrate SEI with Gerrit.
sidebar_position: 60
sidebar_label: Gerrit
---

Use the SEI Gerrit connector to integrate SEI with Gerrit.

## Generate the API key

You must create HTTP credentials in Gerrit that you will use as an API key when you configure the connector.

1. Launch Gerrit and log in.
2. Select the **Settings** icon near your user name.

   ![The Gerrit UI with the settings icon indicated.](./static/gerrit-settings1.png)

3. Select **HTTP Credentials**.

   ![The Gerrit User Settings screen with the HTTP Credentials option indicated.](./static/gerrit-settings2.png)

4. Select **Generate New Password**.

   ![The Gerrit HTTP Credentials page.](./static/gerrit-settings3.png)

5. Copy the password somewhere that you can retrieve it when you configure the connector.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Gerrit** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter the URL for your Gerrit instance with a slash at the end, such as `https://gerrit.example.com/`.
   * **User Name:** Enter your Gerrit account user name.
   * **API Key:** Enter your Gerrit HTTP credentials.
   * **Name:** Enter a name for the connector.
   * **Description** and **Tags** are optional.
