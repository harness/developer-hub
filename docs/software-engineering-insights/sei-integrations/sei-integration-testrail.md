---
title: SEI TestRail integration
description: Integrate SEI with TestRail.
sidebar_position: 230
sidebar_label: TestRail
---

[TestRail](https://www.testrail.com/) is a test management platform that helps you streamline your software testing processes, get visibility into QA, and release high-quality software.

Use the SEI TestRail integration to integrate SEI with TestRail.

## Requirements

To use the SEI TestRail integration you need a TestRail API Key.

1. In TestRail, go to **My Settings**, select the **API Keys** tab, and then select **Add Key**.

   <!-- ![](./static/testrail-api-key1.png) -->

   <docimage path={require('./static/testrail-api-key1.png')} />

2. Enter a name for the key and select **Generate Key**.

   <!-- ![](./static/testrail-api-key2.png) -->

   <docimage path={require('./static/testrail-api-key2.png')} />

3. Copy the key somewhere that you can retrieve it when you configure the integration.

   <!-- ![](./static/testrail-api-key3.png) -->

   <docimage path={require('./static/testrail-api-key3.png')} />

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **TestRail** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL for your TestRail instance.
   * **Username:** The user name for the TestRail user that created the API key.
   * **API Key:** Enter the TestRail API key.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
