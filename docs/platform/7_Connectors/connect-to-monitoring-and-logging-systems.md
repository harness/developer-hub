---
title: Connect to Monitoring and Logging Systems
description: You can connect Harness to Monitoring and Logging Systems.
# sidebar_position: 2
helpdocs_topic_id: g21fb5kfkg
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Connect Harness to monitoring and logging systems by adding a verification provider Connector.

You can add a verification provider Connector inline when developing your pipeline, or separately in your Account/Org/Project's resources. Once you add the Connector, it is available in Pipelines of the same Account/Org/Project.


### Monitoring and Logging Systems Scope

You can add a verification provider Connector at the Account/Org/Project scope.

This topic will explain how to add it at the Project scope. The process is same for Org and Account.

### Step: Add AppDynamics

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **AppDynamics** in **Monitoring and Logging Systems**. The AppDynamics connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-11.png)
   
4. In **Name**, enter a name for this connector. You will use this name when selecting the Verification Provider in Harness Environments and Workflows. If you plan to use multiple providers of the same type, ensure that you give each provider a different name.
5. Click **Continue**.
6. In the **Controller URL** field, enter the URL of the AppDynamic controller in the format:  
   **http://<Controller\_Host>:<port>/controller </port>**  
   For example:  
   **https://xxxx.saas.appdynamics.com/controller**

   ![](./static/connect-to-monitoring-and-logging-systems-12.png)

7. In **Account Name**, enter the name of AppDynamics account you want to use.

   
:::note
For Harness On-Prem, enter **customer1**.
:::
   
8. In **Authentication**, you can choose one of the following options:
	* **Username and Password**: In **User Name** and **Password**, enter the credentials to authenticate with the AppDynamics server. In **Password**, you can choose [Create or Select a secret](../6_Security/2-add-use-text-secrets.md)**.**
	* **API Client**: In **Client Id** and **Client Secret** fields, enter a valid Id and secret string that the application uses to prove its identity when requesting a token. In **Client Secret**, you can choose [Create or Select a secret](../6_Security/2-add-use-text-secrets.md).
  
9. Click **Continue**. The Setup Delegates settings appear.
10. You can choose **Connect via any available delegate** or **Connect only via delegates which has all of the following tags.** If you select a Delegate, Harness will always use that Delegate for this Connector.
11. Click **Save and Continue**.
12. Once the Test Connection succeeds, click **Finish**. AppDynamics is listed under the list of Connectors.

### Step: Add Prometheus

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **Prometheus**in **Monitoring and Logging Systems**. The Prometheus connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-13.png)

4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure that you give each provider a different name.
5. Click **Continue**.
6. In the **URL** field, enter the URL of your Prometheus account. You cannot use a Grafana URL.
   
   ![](./static/connect-to-monitoring-and-logging-systems-14.png)

   
:::note
You cannot use a Grafana URL.
:::


7. Click **Next**. The Setup Delegates settings appear.
8. You can choose **Connect via any available delegate** or **Connect only via delegates which has all of the following tags.** If you select a Delegate, Harness will always use that Delegate for this Connector.
9.  Click **Save and Continue**.
10. Once the Test Connection succeeds, click **Finish**. Prometheus is listed under the list of Connectors.

### Step: Add New Relic

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **New Relic**in **Monitoring and Logging Systems**. The New Relic connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-15.png)
   
4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure you give each provider a different name.
5. Click **Continue**.
6. In the **New Relic** **URL** field, enter the URL of your New Relic account. 
   
   ![](./static/connect-to-monitoring-and-logging-systems-16.png)

7.  To get the **New Relic Account ID** for your New Relic account, copy the number after the **/accounts/** portion of the URL in the New Relic Dashboard.
8.  In **Encrypted** **API Key**, you can choose **Create or Select a secret.**

For secrets and other sensitive settings, select or create a new [Text Secret.](../6_Security/2-add-use-text-secrets.md)Enter the API key needed to connect with the server.

For steps on generating the New Relic API key, follow this doc from New Relic: [Insights query API](https://docs.newrelic.com/docs/apis/insights-apis/query-insights-event-data-api/).

If you have trouble finding step on generating the **Insights query key**, look for the API key types help in the New Relic help panel:

![](./static/connect-to-monitoring-and-logging-systems-17.png)

9. Click **Continue**. The Setup Delegates settings appear.
10. You can choose **Connect via any available delegate** or **Connect only via delegates which has all of the following tags.** If you select a Delegate, Harness will always use that Delegate for this Connector.
11. Click **Save and Continue**.
12. Once the Test Connection succeeds, click **Finish**. New Relic is listed under the list of Connectors.

Usage scope is inherited from the secrets used in the settings. Pro or higher subscription level is needed. For more information, see [Introduction to New Relic's REST API Explorer](https://docs.newrelic.com/docs/apis/rest-api-v2/api-explorer-v2/introduction-new-relics-rest-api-explorer) from New Relic.

### Step: Add Splunk

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **Splunk**in **Monitoring and Logging Systems**. The Splunk connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-18.png)
   
4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure you give each provider a different name.
5. Click **Continue**.
6. In the **URL** field, enter the URL for accessing the REST API on the Splunk server. Include the port number in the format **https://<deployment-name>.cloud.splunk.com:8089.</deployment-name> ** The default port number is 8089, which is required for hosted Splunk, also. For example: **https://mycompany.splunkcloud.com:8089**.
   
   ![](./static/connect-to-monitoring-and-logging-systems-20.png)
   

Splunk APIs require that you authenticate with a non-SAML account. To access your Splunk Cloud deployment using the Splunk REST API and SDKs, submit a support case requesting access on the Support Portal. For managed deployments, Splunk Support opens port 8089 for REST access. You can specify a range of IP addresses to control who can access the REST API. For self-service deployments, Splunk Support defines a dedicated user and sends you credentials that enable that user to access the REST API. For information see [Using the REST API with Splunk Cloud](http://docs.splunk.com/Documentation/Splunk/7.2.0/RESTTUT/RESTandCloud).

Ensure that the Splunk user account used to authenticate Harness with Splunk is assigned to a role that contains the following REST-related capabilities:

* Search.
* Access to the indexes you want to search.

In the following example we've created a new Splunk role named **Harness User**, and assigned it search capability:

![](./static/connect-to-monitoring-and-logging-systems-22.png)

We've given this role access to **All non-internal indexes**. However, we could restrict the access to only the few relevant indexes:

![](./static/connect-to-monitoring-and-logging-systems-23.png)

7. In the **Username** field, enter the username of your Splunk account.
8. In **Password** field, you can choose **Create or Select a secret.**


:::note
For secrets and other sensitive settings, select or create a new [Text Secret.](../6_Security/2-add-use-text-secrets.md)

:::

9. Click **Connect and Save**. The Setup Delegates settings appear.
10. You can choose **Connect via any available delegate** or **Connect only via delegates which has all of the following tags.** If you select a Delegate, Harness will always use that Delegate for this Connector.
11. Click **Save and Continue**.
12. Once the Test Connection succeeds, click **Finish**. Splunk is listed under the list of Connectors.

### Step: Add Google Cloud Operations (formerly Stackdriver)


:::note
For details on settings and permissions, see [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md).

:::

Google Cloud Metrics and Google Cloud Logs are supported with GCP connector. See [Add a GCP Connector](connect-to-a-cloud-provider.md#step-add-a-gcp-connector).

The following roles must be attached to the account used to connect Harness and Google Cloud Operations as a Google Cloud Provider:

* **Stackdriver Logs** - The minimum role requirement is **logging.viewer**
* **Stackdriver Metrics** - The minimum role requirements are **compute.networkViewer** and **monitoring.viewer**.

See [Access control](https://cloud.google.com/monitoring/access-control) from Google.

### Step: Add Datadog

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **Datadog**in **Monitoring and Logging Systems**. The Datadog connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-24.png)
   
4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure you give each provider a different name.
5. Click **Continue**.
6. In **URL**, enter the URL of the Datadog server. Simply take the URL from the Datadog dashboard, such as https://app.datadoghq.com/ and add the API and version: **https://app.datadoghq.com/api/**.
   

:::note
   The trailing forward slash after `api` (`api/`) in mandatory. Also, if your URL has `v1` at the end of it, remove `v1`.

:::
   
   ![](./static/connect-to-monitoring-and-logging-systems-25.png)
   
7.  In **Encrypted APP Key**, enter the application key.  
    
	To create an application key in Datadog, do the following:
	1. In **Datadog**, hover over **Integrations**, and then click **APIs**. The **APIs** page appears.
   
       ![](./static/connect-to-monitoring-and-logging-systems-26.png)
   
	2. In **Application Keys**, in **New application key**, enter a name for the application key, such as **Harness**, and click **Create Application Key**.
	3. Copy the API key and, in **Harness**, paste it into the **Application Key** field.
8. In Encrypted API Key, enter the API key for API calls.  
To create an API key in Datadog, do the following:
	1. In **Datadog**, hover over **Integrations**, and then click **APIs**. The **APIs** page appears.
   
       ![](./static/connect-to-monitoring-and-logging-systems-27.png)
   
	2. In **API Keys**, in **New API key**, enter the name for the new API key, such as **Harness**, and then click **Create API key**.
	3. Copy the API key and, in **Harness**, paste it into the **API Key** field.
1. Click **Next**. The Setup Delegates settings appear.
2.  You can choose **Connect via any available delegate** or **Connect only via delegates which has all of the following tags.** If you select a Delegate, Harness will always use that Delegate for this Connector.
3.  Click **Save and Continue**.
4.  Once the Test Connection succeeds, click **Finish**. Datadog is listed under the list of Connectors.

### Step: Add Dynatrace

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **Dynatrace**in **Monitoring and Logging Systems**. The Custom Health connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-28.png)
   
4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure you give each provider a different name.
5. Click **Continue**.
6. In **URL**, enter the URL of your Dynatrace account. The URL has the following syntax: **https://*****your\_environment\_ID*****.live.dynatrace.com.** HTTPS is mandatory for Dynatrace connections.
7.  In **API Token**, enter the API token generated in Dynatrace. To generate a Dynatrace access token, perform the following steps:
	1. Log into your Dynatrace environment.
	2. In the navigation menu, click **Settings**, and then click **Integration**.
	3. Select **Dynatrace API**. The Dynatrace API page appears.
   
       ![](./static/connect-to-monitoring-and-logging-systems-29.png)
   
	4. Enter a token name in the text field. The default Dynatrace API token switches are sufficient for Harness.
	5. Click **Generate**. The token appears in the token list.
	6. Click **Edit**. The token details appear.
   
       ![](./static/connect-to-monitoring-and-logging-systems-31.png)
   
	7. Click **Copy**. You will use this token when connecting Harness to Dynatrace.
8. Click **Next**. The Setup Delegates settings appear.
9. You can choose **Connect via any available Delegate** or **Connect only via Delegates which has all of the following tag****.** If you select a Delegate, Harness will always use that Delegate for this Connector.
10. Click **Save and Continue**.
11. Once the Test Connection succeeds, click **Finish**. Dynatrace is listed under the list of Connectors.

### Step: Add Custom Health

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **+** **Connector**, and click **Custom Health**in **Monitoring and Logging Systems**. The Custom Health connector settings appear.
   
   ![](./static/connect-to-monitoring-and-logging-systems-33.png)
   
4. In **Name**, enter a name for this connector. If you are going to use multiple providers of the same type, ensure you give each provider a different name.
5. Click **Continue**.
6. In **URL**, enter the URL of the metrics data provider. For example, **https://mycompany.appd.com.**
7.  In **Headers**, enter the query headers required by your metrics data provider. In **Key**, enter a valid query key. In **Value**, you can create or select a key by clicking [**Create or Select a Secret**](../6_Security/2-add-use-text-secrets.md)**.** You can also enter a **Plaintext** value**.**
8.  Click **Next**. The **Parameters** setting appears.
9.  In **Parameters**, enter the request parameters. In **Key**, enter a valid query key. In **Value**, you can create or select by clicking [**Create or Select a Secret**](../6_Security/2-add-use-text-secrets.md) or enter a **Plaintext** value**.**
10. Click **Next**. The **Validation Path** settings appear.
11. In **Request Method**, select **GET** or **POST**.
12. In **Validation Path**, enter the query string from your metric provider.
13. Click **Next**. The Setup Delegates settings appear.
14. You can choose **Connect via any available Delegate** or **Connect only via Delegates which has all of the following tag****.** If you select a Delegate, Harness will always use that Delegate for this Connector.
15. Click **Save and Continue**.
16. Once the Test Connection succeeds, click **Finish**. Custom Health is listed under the list of Connectors.

