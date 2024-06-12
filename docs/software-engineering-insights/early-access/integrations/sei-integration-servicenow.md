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

<DocVideo src="https://www.youtube.com/embed/Qcb3u558_7U?si=xlI0rIfuYrTWMTGI" />

## Requirements

* ServiceNow Account with Admin access

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Connect with ServiceNow Cloud

### Step 1: Select the integration

* In your **Harness project**, go to the **SEI module**, and select **Account**.
* Select **Integrations** under **Integration and Data Settings**.
* Select **Available Integrations**, locate the **ServiceNow integration** under the **Others** **integration** tab and select **Install**.

### Step 2: Choose the Type of ServiceNow setup

* Choose your ServiceNow type:
  * ServiceNow Cloud
  * ServiceNow On-Prem

In this case select the type of ServiceNow setup as ServiceNow Cloud

### Step 3: Configure the integration

The ServiceNow integration can set up the authentication either by using Username and Password or by using OAuth mode of authentication.

<Tabs>
  <TabItem value="Username" label="Username/Password" default>

* Add the **Name** for the integration, which is mandatory. You can add **Description** and **Tags** (Optional).
* Add the **URL** of your **ServiceNow application instance**, for example, "`https://xyz.service-now.com`". Make sure it's a valid URL.
* Choose the authentication mode as Use ServiceNow Username/Password. Add the **Username** and **Password**, for your **ServiceNow account**.
* You can click on **Advanced Configurations** and choose the **Fields** you wish to exclude from ingestion. You might exclude fields containing sensitive information such as **Summary**, **Description**, and **Comments**.
* Click on the **Next: Validate Connection**.
  It will establish a connection with the provided URL, perform authentication, and then run the preflight checks. If everything is successful, you will see a message confirming a successful connection.
* Click on the **Done** button and the integration will be successfully saved.

</TabItem>
  <TabItem value="Oauth" label="OAuth">

* Add the **Name** for the integration, which is mandatory. You can add **Description** and **Tags** (Optional).
* Add the **URL** of your **ServiceNow application instance**, for example, "`https://xyz.service-now.com`". Make sure it's a valid URL.
* Choose the authentication mode as Use ServiceNow OAuth
* Add the ServiceNow Client ID and Client Secret that you generated after creating the application registry in ServiceNow
* Redirect URL has to be copied from the integration settings. Add the Redirect URL in ServiceNow, click on lock button and paste the redirect url copied from SEI.
* Add table_read scope inside Auth Scopes.


</TabItem>
</Tabs>

## What data is ingested

The data is updated every hour. The following details are ingested from the ServiceNow platform using this integration.

### Incidents

Details like the incident number, state, priority, impact, assignments, updates, resolution information, and other relevant incident data are ingested.

### Change Requests

Information about change requests, including number, state, priority, impact, assignments, updates, approval details, and other relevant change request data is ingested.

### Users

User information like name, employee number, username, email, and other user-related details is ingested.