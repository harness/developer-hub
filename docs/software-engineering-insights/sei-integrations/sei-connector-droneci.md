---
title: SEI Drone CI integration
description: Integrate SEI with Drone CI.
sidebar_position: 70
sidebar_label: Drone
---

Drone is a self-service CI platform for busy development teams.

Use the SEI Drone CI integration to integrate SEI with Drone.

To integrate with Harness CI, use the [SEI Harness NG integration](./sei-connector-harnessng.md).

## Requirements

The following permissions and settings are required to use the SEI Drone CI integration:

* You have set up the Drone platform for your CI pipelines.
* You need your Drone personal API token. To find your token in Drone, select your avatar to go to your **Account Settings**. Either keep the Drone **Account Settings** page open or copy the token somewhere that you can retrieve it when you configure the integration.

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **Drone CI** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your Drone platform.
   * **Authorization Token:** Enter your Drone personal API token.
   * **Repositories:** You can specify repositories to associate with the integration. If unspecified, the integration associates all available repositories. Available repositories are repositories that the user associated with the **Authorization Token** can access.
   * **Fetch Step Logs:** Select this option if you want SEI to ingest step logs from Drone.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
