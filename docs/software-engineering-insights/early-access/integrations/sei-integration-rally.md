---
title: SEI Rally integration
description: Integrate SEI with Rally Software.
sidebar_position: 132
sidebar_label: Rally
redirect_from:
  - /docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-rally
---

:::info
The SEI Rally integration is currently in BETA and is accessible behind the Feature Flag `<SEI_RALLY>`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

Rally is a web-based platform for managing and tracking the entire application development lifecycle, including project management, release planning, iteration planning, and defect tracking.

Use the **SEI Rally integration** to integrate SEI with the Rally Software. The primary purpose of this rally integration is to ensure that SEI can track, manage, and analyze user stories, tasks, and defects in real time, leading to improved efficiency and enhanced productivity.

## Requirements

Before you configure the SEI Rally integration, you must generate a **Rally Personal API token**.

1. Create a **Rally Personal API token**. For instructions, go to the Rally documentation on [Creating a personal API token](https://rally1.rallydev.com/slm/doc/webservice/).
2. Make sure to copy the token somewhere that you can retrieve it when you configure the integration.

## Add the integration

### Step 1: Install the integration

* In your **Harness project**, go to the **SEI module**, and select **Account**.
* Select **Integrations** under **Data Settings**.
* Select **Available Integrations**, locate the **Rally integration**, and select **Install**.

### Step 2: Configure the integration

* Add the **URL** of your Rally integration instance, for example, `https://rally1.rallydev.com`. Make sure it's a valid URL.
* Provide the **API KEY** that you previously generated within your Rally account.
* Choose the **Fields** you wish to exclude from ingestion. You might exclude fields containing sensitive information such as **Summary**, **Description**, and **Comments**. Excluded fields will not be evaluated for hygiene or adherence to best practices.
* Click on the **Next**.

### Step 3: Define and save the integration

* Add the **Integration Name**, which is mandatory.
* You can also add **Description** and **Tags** (Optional).
* Click on **Add Integration** to save the configuration. The integration is now successfully saved.

:::info
The Rally integration is currently in BETA and does not support on-prem installation using the Ingestion Satellite.
:::
