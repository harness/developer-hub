---
title: SEI Microsoft Teams connector
description: Integrate SEI with Microsoft Teams.
sidebar_position: 140
sidebar_label: Microsoft Teams
---

Use the SEI Microsoft Teams connector to integrate SEI with Microsoft Teams.

## Requirements

To transmit data from Microsoft Teams to SEI, you must create a service account in your Microsoft Teams account. The service account must have a user role.

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Microsoft Teams** connector, and select **Install**.
4. Wait for the Microsoft login page to appear, and then log in with the service account's credentials.
5. When asked **Let this app access your info?**, select **Yes**.

   <!-- ![](./static/ms-teams-allow-app-access.png) -->

   <docimage path={require('./static/ms-teams-allow-app-access.png')} />

6. Enter a **Name** for the connector. **Description** and **Tags** are optional.
7. Finish configuration and save the connector.
