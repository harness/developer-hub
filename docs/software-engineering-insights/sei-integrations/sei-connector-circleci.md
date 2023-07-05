---
title: SEI CircleCI connector
description: Integrate SEI with CircleCI.
sidebar_position: 40
sidebar_label: CircleCI
---

Use the SEI CircleCI connector to integrate SEI with CircleCI.

## Requirements

To use the SEI CircleCI connector, you need a CircleCI personal API token. Copy the token somewhere that you can retrieve it when you configure the connector. For instructions, go to the CircleCI documentation on [Creating a personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).

## Configure the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **CircleCI** connector, and select **Install**.
4. Configure and save the connector.

   * **URL:** Enter the URL for your CircleCI platform.
   * **Authorization Token:** Enter your [CircleCI personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).
   * **Repositories:** You can specify repositories to associate with the connector. If unspecified, the connector associates all available repositories.
   * **Fetch Action Logs:** Select this option if you want SEI to ingest action logs from CircleCI.
   * **Name:** Enter a name for the connector.
   * **Description**, **Tags**, and **Timezone** are optional.
