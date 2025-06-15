---
title: Set up CCM for GCP
sidebar_label: GCP
description: This topic describes how to set up cost visibility for GCP.
# sidebar_position: 2
helpdocs_topic_id: kxnsritjls
helpdocs_category_id: 7vy86n7cws
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-gcp
---

import select_gcp from './static/set-up-cost-visibility-for-gcp-01.png'
import create_dataset from './static/set-up-cost-visibility-for-gcp-02.png'
import dataset_name from './static/set-up-cost-visibility-for-gcp-03.png'
import dataset_permissions from './static/data-permissions-gcp.png'

Harness Cloud Cost Management (CCM) monitors the cloud costs of your GCP products, projects, SKUs, and location. As a first step, you need to connect Harness to your GCP account to get insights into your cloud infrastructure, and GCP services, Compute Engine, Cloud Storage, BigQuery, etc. CCM offers a wide range of features to track and control costs associated with your cloud resources.

:::info

After enabling CCM, it takes about 24 hours for the data to be available for viewing and analysis.

:::

## Before you begin

* Review [Required permissions and roles](https://cloud.google.com/iam/docs/understanding-custom-roles#required_permissions_and_roles) to create an IAM role at the organization level
* Ensure that you have the following permissions to enable and configure the export of Google Cloud billing data to a BigQuery dataset:
	+ **Billing Account Administrator** role for the target Cloud Billing account
	+ [BigQuery User role for the Cloud project](https://cloud.google.com/bigquery/docs/dataset-access-controls) that contains the BigQuery dataset that will be used to store the Cloud Billing data

## Connect Harness to Google Cloud Platform (GCP) Account

Connect Harness to your GCP account to gain access your GCP services, Compute Engine, Cloud Storage, BigQuery, etc. Harness CCM gives you cost insights that are derived from the billing export. For deep Kubernetes visibility and rightsizing recommendations based on the historical utilization and usage metrics, set up Kubernetes connectors. See [Set Up Cloud Cost Management for Kubernetes](set-up-cost-visibility-for-kubernetes.md).

:::info

Time periods in the GCP Cloud Billing report use the Pacific Time Zone (PST) and observe daylight saving time shifts. However, Harness CCM explorer uses the UTC time zone. You may notice some cloud cost differences between Harness CCM explorer and the GCP Cloud Billing report due to the time zone difference.

:::

1. Create a new Kubernetes connector using one of the two options below:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab-number">
<TabItem value="4" label="From Account Settings">

1. Go to **Account Resources** > **Connectors**.
2. Select **+ New Connector**.
3. Under **Cloud Costs**, select **GCP**.

</TabItem>
<TabItem value="5" label="From Cloud Costs">

1. Go to **Setup** > **Cloud Integration**.  
2. Select **New Cluster/Cloud account**.
3. Select **GCP**.

</TabItem>
</Tabs>

2. Perform the following tasks in the **GCP Connector** wizard.

### Overview
1. In **Overview**, in **Connector Name**, enter a name that describes this account.
2. In **Specify Project ID**, enter the project ID and select **Continue**. For more information on how to get a project ID, go to [Create a BigQuery dataset](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup#create-bq-dataset).

### GCP Billing Export

Cloud Billing export to BigQuery enables you to export detailed Google Cloud billing data (such as usage and cost estimate data) automatically throughout the day to a BigQuery dataset that you specify.

:::info
Make sure that you have enabled **Detailed Usage Cost** on the **Billing Export** page on your GCP console. For more information, see [ Enable Cloud Billing export to the BigQuery dataset](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup#enable-bq-export).
:::

1. In **GCP Billing Export**, select **Launch GCP console**.
2. In the GCP **Explorer** window, in the pinned projects section, select **your project ID** to open the project. If you see an overflow menu (:) next to your project ID, select the menu and select **Open**.
3. Select **Create dataset**. For more information, go to [Create a BigQuery dataset](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup#create-bq-dataset).

   <img src={create_dataset} alt="Creating a dataset in the GCP console." height="50%" width="50%" />

4. Enter a **Dataset Name**.
You need to enter Dataset Name in Harness.
5. Select a **Data location**.
6. Set the **Default table expiration** to **Never**.
7. Set the **Encryption** option to **Google-managed key**.
8. To save, select **CREATE DATASET**.
9. Enter the **Dataset Name** in Harness.

   <img src={dataset_name} alt="Entering the dataset name." height="50%" width="50%" />

10. Next, you need to enter the table name in Harness. From the GCP console, copy the table name where the billing export is available. In your BigQuery dataset, the table is named `gcp_billing_export_v1_*`.
11. Once the billing account is selected, open the navigation menu>Billing export>BigQuery export. In BigQuery Export section, user needs to setup "Detailed usage cost". When setting up your dataset, it is recommended to choose the United States (US) as the dataset location.
12. From the Project list, choose the project that contains your BigQuery dataset. You’ll be requested to establish a BigQuery dataset if you don’t already have one. 
13. To create a dataset, if you don’t have one
    - In the Google Cloud Console, go to the Google BigQuery Page.
    - In the Explorer Panel, choose the Project for which you wish to build a dataset.
    - Select +Create Dataset from the drop-down menu.
    - Certain fields, such as Dataset ID, data location, and data expiry, will be required. You will be able to perform billing exports after you have your dataset ready.

   <DocImage path={require('./static/set-up-cost-visibility-for-gcp-04.png')} width="50%" height="50%" title="Click to view full size image" />

12. Enter the **Table Name** in Harness.
13. Select **Continue**.

:::info 
⚠️ GCP Billing Export Table Limitations and CMEK Restrictions
When setting up a connector for GCP Billing Export, keep the following limitations and guidelines in mind:

- GCP does not support copying data across regions if the source table uses CMEK.
- GCP also does not allow copying data from Materialized Views.
- If your organization enforces CMEK policies, consider creating a new dataset without CMEK enabled specifically for the integration.
- It is recommended to create the dataset in the US region, as it offers the most compatibility with GCP billing export operations.
- Use datasets with default (Google-managed) encryption when configuring the connector.

:::

### Choose Requirements

Select the Cloud Cost Management features that you would like to use on your GCP account.

CCM offers the following features:

| Features  | Capabilities | 
| --- | --- | 
| **Cost Visibility** (Required)| This feature is available by default. Make sure you have set up the GCP Billing Export. Provides the following capabilities:<ul><li>Insights into GCP costs by projects, products, etc.</li><li>Root cost analysis using cost perspectives </li><li>Cost anomaly detection</li><li>Governance using budgets and forecasts</li><li>Alert users using Email and Slack notification</li></ul>|
| **GCP Inventory Management** (Optional)| This feature provides visibility into your GCE VMs and unused disks and snapshots. The insights provided by inventory management can be used by Finance teams to understand resource utilization across the board.|
| **GCP optimization using AutoStopping rules** (Required for AutoStopping Rules)| This feature allows you to enable Intelligent Cloud AutoStopping for your GCP cloud resources. For more information, see **Create AutoStopping Rules for GCP**.<ul><li>Orchestrate GCE VMs based on idleness</li><li>Set dependencies between VMs</li><li>Granular savings visibility</li><li>Simple one-time setup</li></ul>|
| **Cloud Governance** (Optional)              | This feature allows you to optimize your cloud spend and avoid unnecessary costs by rightsizing resources and decommissioning unused instances. For more information, see [Asset governance](../../cost-governance/asset-governance/1-asset-governance.md). <ul><li> Asset Management (Instance, Disk, SQL-instance, Image) </li><li>Automated Actions</li></ul>     

Make your selection and select **Continue**.

### Grant Permissions

Cloud Billing Export to BigQuery helps you export detailed Google Cloud billing data (such as usage and cost estimate data) to a BigQuery dataset that you specify. The export happens throughout the day automatically. 

1. In **Grant permissions**, select **Open BigQuery Page**.
2. Log into the GCP console and go to the BigQuery page.
3. Select your project in the left panel.
4. Select your dataset. For more information on creating a dataset, see [Creating datasets](https://cloud.google.com/bigquery/docs/datasets).

   <DocImage path={require('./static/gcp_billing_export_resource.png')} width="50%" height="50%" title="Click to view full size image" />

5. Select the **more actions** icon (three vertical dots) against the dataset, and then select **Share.**

   <DocImage path={require('./static/gcp-dataset-share.png')} width="50%" height="50%" title="Click to view full size image" />

6. In **Dataset permissions**, in **Add Principals**, enter the Harness service account as a member.  
    Copy the service account detail from Harness. The service account is generated dynamically for your account.

   <DocImage path={require('./static/Adding-principals-gcp.png')} width="50%" height="50%" title="Click to view full size image" />

7. In **Select a role**, select **BigQuery Data Viewer**, and then select **Add**.
8. Select **Done**.  
    When you are done, the following screen is displayed:

   <img src={dataset_permissions} alt="Entering the dataset name." height="50%" width="50%" />

:::info

To add AutoStopping permissions:

1. Navigate to the IAM & Admin page on the GCP console.
2. Click **IAM** on the right pane.
3. Click **Add** in the PERMISSION tab.
4. In the **Add Principals to [Project name]** window, enter the service principal.
5. Select the required roles and click **Save**.

When a connector is created, a service account is created in Harness' GCP project that is unique for each customer. This service account is created only once per customer. You need to assign two roles to this service account in the GCP project that they are connecting to Harness CCM:

* **Compute Admin** - Assign this role to Harness' service account. This allows Harness CCM to be able to perform AutoStopping actions such as starting and stopping of VMs and Instance groups. Also, GCP AutoStopping involves the usage of a custom VM with configurations as per your preference (instance type configuration). This requires access to create and launch a VM in which a custom load balancer for AutoStopping is installed.
* **Secret Manager Secret Accessor** - Assign this role if you intend to use TLS/HTTPS in the routing configurations of the AutoStopping Rule. You need to upload the certificate's private key and the public certificate as secrets in GCP. Harness needs access to these secrets to be able to configure the custom load balancer. This role provides access to only the particular versions of the secrets, provided the complete path is entered during the creation of the custom load balancer. It does not let Harness view or list all the secrets in your GCP project. You can also add additional protection in the GCP on your end to provide conditional access to secrets as necessary. For example, provide access to Harness' service account to versions of only those secrets with a naming convention like "Harness-".
:::

9. Select **Continue** in Harness.

### Cloud asset governance rules

:::info

Now, Harness CCM supports CAG for GCP.

<DocImage path={require('./static/GCP-connector-CAG.png')} width="60%" height="60%" title="Click to view full size image" />

Regions for Asset Governance Rules for GCP are not available in drop-down menu but can be configured manually in the YAML.

:::

### Connection Test

The connection is validated and verified in this step. After successfully testing the connection, select **Finish**.

<DocImage path={require('./static/set-up-cost-visibility-for-gcp-12.png')} width="50%" height="50%" title="Click to view full size image" />

Your connector is now listed in the **Connectors**.

<DocImage path={require('./static/set-up-cost-visibility-for-gcp-13.png')} width="50%" height="50%" title="Click to view full size image" />



### Next Steps

* [Analyze Cost for GCP ​Using Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-gcp-using-perspectives)
* [Create Cost Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives)
