---
title: ServiceNow Integration
description: Set up the ServiceNow integration to ingest incident and change management data into AI DLC Insights.
sidebar_position: 1
sidebar_label: ServiceNow
redirect_from:
  - /docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/beta-integrations/servicenow/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ServiceNow integration enables AI DLC Insights to ingest incident and change management (ITSM) data from ServiceNow. This data can be used to track operational performance and correlate incidents and changes with engineering metrics in SEI dashboards.

AI DLC Insights supports the following authentication methods:

* **API key authentication** using a ServiceNow API key with permissions to read ServiceNow data
* **Username/password authentication** using ServiceNow account credentials
* **OAuth authentication** using a ServiceNow client ID and client secret

### Prerequisites

Before you can configure the ServiceNow integration, ensure you have the following requirements:

- A ServiceNow instance URL
- Admin access to your ServiceNow account
- A ServiceNow service account with the required permissions

Ensure the ServiceNow service account has the following roles:

| Role | Description |
| --- | --- |
| `itil` | Provides access to IT Service Management (ITSM) data such as incidents, change requests, users, and CMDB records. |
| `personalize_choices` | Allows SEI to retrieve choice field labels such as incident state and severity values. |
| `personalize_dictionary` | Allows SEI to retrieve field metadata and custom field definitions. |
| `oauth_admin` | Required only when configuring OAuth applications in ServiceNow. |
| `user` | Required to ingest user-related metadata for all users in the ServiceNow instance. Assign together with `user_admin`. |
| `user_admin` | Optional. Required only if you want to ingest extended user attributes. |

To ingest user-related metadata for all users in the ServiceNow instance, ensure that `user` and `user_admin` roles are also assigned.

:::info Harness IP Addresses
If your ServiceNow instance uses IP allowlisting, ensure the required Harness IP addresses are added to the allowlist. 

Go to [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) to add the required Harness IP addresses to your allowlist.
:::

#### Configure OAuth in ServiceNow

To use OAuth authentication, create an OAuth application in ServiceNow.

1. Log in to ServiceNow with an administrator account.
1. Navigate to **System OAuth > Application Registry**.
1. Click **New**.
1. Select **Create an OAuth API endpoint for external clients**.
1. Enter a name for the application.
1. Add the redirect URL generated during the ServiceNow integration setup.
1. In the **Auth Scopes** section, add the `table_read` scope.
1. Save the application.
1. Copy the generated **Client ID** and **Client Secret** for use during integration setup. 

   :::danger 
   The Client ID and Client Secret are sensitive credentials. Store them securely.
   :::

## Setup

To configure the ServiceNow integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the ServiceNow integration tile under `Incident Management` and click **Add Integration**.
1. Select an installation option: **ServiceNow Cloud** or **ServiceNow On-Prem**.

   <Tabs queryString="installation-type">
   <TabItem value="cloud" label="ServiceNow Cloud">
   
   Once you've selected **ServiceNow Cloud**, click **Using Cloud Credentials** (prerequisites include ServiceNow account with Admin access and a ServiceNow account with username and password) or **Using OAuth** (prerequisites include ServiceNow account with Admin access, ServiceNow client ID, and ServiceNow client secret).

   If you are using **Cloud Credentials**:

   1. In the **Overview** section, enter a name for the integration. Optionally, add a description or tags.
   1. In the **Credentials** section, enter your ServiceNow URL and select an authentication method: **API Key** or **Username**.
      
      - For **API Key**, enter your API token in the `API Token` field.
      - For **Username**, enter a username and password in the `Username` and `Password` fields.

   1. Enter a timezone in the `Timezone` field.
   1. Optionally, to limit the incidents and change requests ingested into AI DLC Insights, create a filter query in ServiceNow.
   1. In ServiceNow, create and copy the query string for the incidents or change requests you want to ingest, then paste the query into the appropriate filter fields in the **Advanced Configuration** section.
   1. Click **Validate Connection**.
   1. Once validation succeeds, click **Validate and Create Integration**.
   
   If you are using **OAuth**:

   1. In the **Overview** section, enter a name for the integration. Optionally, add a description or tags.
   1. In the **Credentials** section, enter your ServiceNow URL and copy the generated redirect URL.
   1. In ServiceNow, configure your [Application Registry](https://www.servicenow.com/docs/r/zurich/security-management/security-incident-response/configure-application-registry-splunk.html) to include the redirect URL.
   1. Enter a client ID and client secret.
   1. Enter a timezone in the `Timezone` field.
   1. Optionally, to limit the incidents and change requests ingested into AI DLC Insights, create a filter query in ServiceNow.
   1. In ServiceNow, create and copy the query string for the incidents or change requests you want to ingest, then paste the query into the appropriate filter fields in the **Advanced Configuration** section.
   1. Click **Connect ServiceNow**.
   1. Once validation succeeds, click **Validate and Create Integration**.

   </TabItem>
   <TabItem value="onprem" label="ServiceNow On-Prem">
   
   Once you've selected **ServiceNow On-Prem**:

   1. In the **Overview** section, enter a name for the integration. Optionally, add a description or tags.
   1. In the **Provide ServiceNow Details** section, enter your ServiceNow URL and provide a username and password.
   1. Enter a timezone in the `Timezone` field.
   1. Optionally, to limit the incidents and change requests ingested into AI DLC Insights, create a filter query in ServiceNow.
   1. In ServiceNow, create and copy the query string for the incidents or change requests you want to ingest, and add it to the appropriate fields in the **Advanced Configuration** section.
   1. Click **Download YAML File**. This `satellite.yml` file contains the metadata and configurations for establishing the connection and data ingestion from ServiceNow.
   1. [Deploy the `satellite.yml` file](/docs/software-engineering-insights/harness-sei/setup-sei/ingestion-satellite/container) to your on-premises infrastructure. 
   1. Click **Done**.

   </TabItem>
   </Tabs>

Once the integration is configured, Harness AIDI begins ingesting ITSM data from ServiceNow.

## Custom fields

The **Custom Fields** tab allows you to map additional ServiceNow fields to SEI. You can use custom fields to include organization-specific metadata (such as priority, assignment group, or custom attributes) in your SEI dashboards and reports. 

You can map custom fields by defining filter sets for incident and change request identification on the **Incident Management** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams/#configure-team-tool-settings).

![](../../../static/teams-18.png)

Once configured, these fields are included in data ingestion and become available for filtering and analysis in AI DLC Insights.

## Integration monitoring

To monitor the status of the ServiceNow integration, navigate to the **Monitoring** tab. This page displays ingestion logs that provide visibility into data synchronization.

You can click the **Filters** icon to filter logs by **Status** (`Success`, `Failed`, `Pending`, or `Scheduled`).

Each ingestion log includes the following fields:

| Field | Description |
|------|-------------|
| **Scan Range Time** | The time window of data retrieved from ServiceNow during the ingestion task. |
| **Data Retrieval Process** | The ingestion job responsible for fetching data from ServiceNow. |
| **Task Start Time** | The timestamp when the ingestion task began running. |
| **Status** | The current state of the ingestion task (for example, Success, Failed, Pending, or Scheduled). |
| **Time to Complete** | The total duration required for the ingestion task to complete. |
| **Retries** | The number of times the ingestion task was retried after a failure. |