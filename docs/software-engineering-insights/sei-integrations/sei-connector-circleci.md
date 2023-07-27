---
title: SEI CircleCI integration
description: Integrate SEI with CircleCI.
sidebar_position: 50
sidebar_label: CircleCI
---

CircleCI lets teams build fully-automated pipelines, from testing to deployment.

Use the SEI CircleCI integration to integrate SEI with CircleCI.

## Requirements

To use the SEI CircleCI integration, you need a CircleCI personal API token. Copy the token somewhere that you can retrieve it when you configure the integration. For instructions, go to the CircleCI documentation on [Creating a personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **CircleCI** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your CircleCI platform.
   * **Authorization Token:** Enter your [CircleCI personal API token](https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token).
   * **Repositories:** You can specify repositories to associate with the integration. If unspecified, the integration associates all available repositories.
   * **Fetch Action Logs:** Select this option if you want SEI to ingest action logs from CircleCI.
   * **Name:** Enter a name for the integration.
   * **Description**, **Tags**, and **Timezone** are optional.
