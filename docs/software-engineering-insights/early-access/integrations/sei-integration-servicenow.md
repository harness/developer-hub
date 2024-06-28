---
title: SEI ServiceNow integration
description: Integrate SEI with the ServiceNow Platform.
sidebar_position: 150
sidebar_label: ServiceNow
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ServiceNow is used to set up systems that define, manage, automate and structure IT services for companies. You can use the SEI ServiceNow integration to integrate SEI with ServiceNow Cloud and ServiceNow On-Prem accounts.

This integration allows you to track, manage, and analyze incidents, and change requests in real-time, leading to improved efficiency and enhanced productivity.

<DocVideo src="https://www.youtube.com/embed/wFWHAAIj3_o?si=mL8xNInFtNp4GwPG" />

## Requirements

* ServiceNow Account with Admin access
* ServiceNow Client ID and ServiceNow Client Secret (Only OAuth based authentication)

### Create a Client ID and Client Secret in ServiceNow

To create a Client ID and Client Secret in ServiceNow, follow these steps:

<Tabs>
<TabItem value="Interactive Guide">
  <iframe 
    src="https://app.tango.us/app/embed/331fe2f1-c6bb-401d-a9af-c94cc87384c0" 
    title="Step-by-step instructions to create a ServiceNow Client ID and Client Secret" 
    style={{minHeight:'640px'}}
    width="100%" 
    height="100%" 
    referrerpolicy="strict-origin-when-cross-origin" 
    frameborder="0" 
    webkitallowfullscreen="webkitallowfullscreen" 
    mozallowfullscreen="mozallowfullscreen" 
    allowfullscreen="allowfullscreen"></iframe>
</TabItem>
<TabItem value="Step-by-step">

* Log in to the **ServiceNow** platform with an admin account.

* Navigate to **System OAuth > Application Registry**.

* Click the **New** button to create a new application registry.

* Select **Create an OAuth API endpoint for external clients**.

* Enter a descriptive name for the application registry, e.g., "SEI Connect".

* Locate the **Redirect URL** in the **SEI ServiceNow integration** configuration settings. Click the lock button and paste the Redirect URL copied from SEI.

* In the **Auth Scopes** section, add the table_read scope.

* Click **Submit** to create the application registry.

* After the successful creation of the application registry, open the newly created application.

* Click the lock button to display the **Client Secret**.

* Copy and save the **Client ID** and **Client Secret**, as they will be required during the integration configuration on the SEI platform.

Please note that the Client ID and Client Secret are sensitive credentials and should be handled with care.

</TabItem>
</Tabs>

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
* Choose the **Authentication Method** as **Use ServiceNow OAuth**
* Add the **ServiceNow Client ID** and **Client Secret** that you generated after creating the application registry in ServiceNow
* Click on the **Connect ServiceNow** button. This will redirect you to the ServiceNow application.
* Allow the application, and it will redirect you back to SEI
* Click on **Validate Connection** to run the pre-flight checks and on successfull authentication the integration will be saved in your account.

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