---
title: SEI Circle CI connector
description: Integrate SEI with Circle CI.
sidebar_position: 40
---

Use the SEI Circle CI connector to integrate SEI with Circle CI.

## Requirements

To use the SEI Circle CI connector, you need a Circle CI personal API token. Copy the token somewhere that you can retrieve it when you configure the connector. For instructions, go to the Circle CI documentation on [Creating a personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Circle CI** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter the URL for your Circle CI platform.
   * **Authorization Token:** Enter your [Circle CI personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).
   * **Repositories:** You can specify repositories to associate with the connector. If unspecified, the connector associates all available repositories.
   * **Fetch Action Logs:** Select this option if you want SEI to ingest action logs from Circle CI.
   * **Name:** Enter a name for the connector.
   * **Description**, **Tags**, and **Timezone** are optional.
