---
title: SEI ServiceNow integration
description: Integrate SEI with the ServiceNow Platform.
sidebar_position: 150
sidebar_label: ServiceNow
---
ServiceNow is used to set up systems that define, manage, automate and structure IT services for companies. You can use the SEI ServiceNow integration to integrate SEI with ServiceNow Cloud and ServiceNow On-Prem accounts.

This integration allows you to track, manage, and analyze incidents, and change requests in real-time, leading to improved efficiency and enhanced productivity.

:::info
Please note that the integration currently allows authentication only through the **Username** and **Password** of your **ServiceNow** account.
:::

## Add the integration

### Step 1: Select the integration

* In your **Harness project**, go to the **SEI module**, and select **Account**.
* Select **Integrations** under **Integration and Data Settings**.
* Select **Available Integrations**, locate the **ServiceNow integration** under the **Others** **integration** tab and select **Install**.

### Step 2: Choose the Type of ServiceNow setup

* Choose your ServiceNow type:
  * ServiceNow Cloud
  * ServiceNow On-Prem

### Step 3: Configure and save the integration

* Add the **Name** for the integration, which is mandatory. You can add **Description** and **Tags** (Optional).
* Add the **URL** of your **ServiceNow application instance**, for example, "`https://xyz.service-now.com`". Make sure it's a valid URL.
* Add the **Username** and **Password**, for your **ServiceNow account**.
* You can click on **Advanced Configurations** and choose the **Fields** you wish to exclude from ingestion. You might exclude fields containing sensitive information such as **Summary**, **Description**, and **Comments**.
* Click on the **Next: Validate Connection**.\
  It will establish a connection with the provided URL, perform authentication, and then run the preflight checks. If everything is successful, you will see a message confirming a successful connection.
* Click on the **Done** button and the integration will be successfully saved.

## What data is ingested

The data is updated every hour. The following details are ingested from the ServiceNow platform using this integration.

### Incidents

Details like the incident number, state, priority, impact, assignments, updates, resolution information, and other relevant incident data are ingested.

### Change Requests

Information about change requests, including number, state, priority, impact, assignments, updates, approval details, and other relevant change request data is ingested.

### Users

User information like name, employee number, username, email, and other user-related details is ingested.