---
title: Set up Cloud Cost Management for GCP
description: This topic describes how to set up cost visibility for GCP.
# sidebar_position: 2
helpdocs_topic_id: kxnsritjls
helpdocs_category_id: 7vy86n7cws
helpdocs_is_private: false
helpdocs_is_published: true
---


```mdx-code-block
import create_dataset from './static/set-up-cost-visibility-for-gcp-02.png'
import dataset_name from './static/set-up-cost-visibility-for-gcp-03.png'
```

Harness Cloud Cost Management (CCM) monitors the cloud costs of your GCP products, projects, SKUs, and location. As a first step, you need to connect Harness to your GCP account to get insights into your cloud infrastructure, and GCP services, Compute Engine, Cloud Storage, BigQuery, etc. CCM offers a wide range of features to track and control costs associated with your cloud resources.

> **☆ NOTE —** After enabling CCM, it takes about 24 hours for the data to be available for viewing and analysis.

## Before you begin

* The same connector cannot be used in NextGen and FirstGen. For information on creating a GCP connector in the FirstGen see [Set Up Cost Visibility for GCP](https://docs.harness.io/article/x53e2by67m-enable-cloud-efficiency-for-google-cloud-platform-gcp).
* Review [Required permissions and roles](https://cloud.google.com/iam/docs/understanding-custom-roles#required_permissions_and_roles) to create an IAM role at the organization level
* Ensure that you have the following permissions to enable and configure the export of Google Cloud billing data to a BigQuery dataset:
	+ **Billing Account Administrator** role for the target Cloud Billing account
	+ [BigQuery User role for the Cloud project](https://cloud.google.com/bigquery/docs/dataset-access-controls) that contains the BigQuery dataset that will be used to store the Cloud Billing data

## Connect Harness to Google Cloud Platform (GCP) Account

Connect Harness to your GCP account to gain access your GCP services, Compute Engine, Cloud Storage, BigQuery, etc. Harness CCM gives you cost insights that are derived from the billing export. For deep Kubernetes visibility and rightsizing recommendations based on the historical utilization and usage metrics, set up Kubernetes connectors. See [Set Up Cloud Cost Management for Kubernetes](https://ngdocs.harness.io/article/ltt65r6k39-set-up-cost-visibility-for-kubernetes).

> **☆ NOTE —** Time periods in the GCP Cloud Billing report use the Pacific Time Zone (PST) and observe daylight saving time shifts. However, Harness CCM explorer uses the UTC time zone. You may notice some cloud cost differences between Harness CCM explorer and the GCP Cloud Billing report due to the time zone difference.



1. In **Account Setup**, in **Account Resources**, click **Connectors**.

    ![](./static/set-up-cost-visibility-for-gcp-00.png)
2. In **Connectors**, click **+ Connector**.
3. In **Cloud Costs**, click **GCP**.

    ![](./static/set-up-cost-visibility-for-gcp-01.png)
### Overview
4. In **Overview**, in **Connector Name**, enter a name that describes this account.
5. In **Specify Project ID**, enter the project ID and click **Continue**. For more information on how to get a project ID, see [Create a BigQuery dataset](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup#create-bq-dataset).

### GCP Billing Export

Cloud Billing export to BigQuery enables you to export detailed Google Cloud billing data (such as usage and cost estimate data) automatically throughout the day to a BigQuery dataset that you specify.

1. In **GCP Billing Export**, click **Launch GCP console**.
2. In the GCP **Explorer** window, in the pinned projects section, click **your project ID** to open the project. If you see an overflow menu (:) next to your project ID, click the menu and select **Open**.
3. Click **Create dataset**. For more information, see [Create a BigQuery dataset](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup#create-bq-dataset).
  
  
  ```mdx-code-block
<img src={create_dataset} alt="A screenshot that illstrates how and where to create a dataset in your GCP console." height="500" width="700" />

4. Enter a **Dataset Name**.  
You need to enter Dataset Name in Harness.
5. Select a **Data location**.
6. Set the **Default table expiration** to **Never**.
7. Set the **Encryption** option to **Google-managed key**.
8. To save, click **CREATE DATASET**.
9. Enter the **Dataset Name** in Harness.

  ```mdx-code-block
<img src={dataset_name} alt="A screenshot that illstrates how and where to enter the dataset name." height="500" width="600" />

10. Next, you need to enter the table name in Harness. From the GCP console, copy the table name where the billing export is available. In your BigQuery dataset, the table is named `gcp_billing_export_v1_<BILLING_ACCOUNT_ID>`.![](./static/set-up-cost-visibility-for-gcp-04.png)Enter the **Table Name** in Harness.
11. Click **Continue**. When you are done it will look something like this:
  
  ![](./static/set-up-cost-visibility-for-gcp-05.png)

### Choose Requirements

Select the Cloud Cost Management features that you would like to use on your GCP account.

![](./static/set-up-cost-visibility-for-gcp-06.png)CCM offers the following features:

| **Features**  | **Capabilities** | 
| --- | --- | 
| **Cost Visibility** (Required)| This feature is available by default. Make sure you have set up the GCP Billing Export. Provides the following capabilities:<ul><li>Insights into GCP costs by projects, products, etc.</li><li>Root cost analysis using cost perspectives </li><li>Cost anomaly detection</li><li>Governance using budgets and forecasts</li><li>Alert users using Email and Slack notification</li></ul>|
| **GCP Inventory Management** (Optional)| This feature provides visibility into your GCE VMs and unused disks and snapshots. The insights provided by inventory management can be used by Finance teams to understand resource utilization across the board.|
| **GCP optimization using AutoStopping rules** (Required for AutoStopping Rules)| This feature allows you to enable Intelligent Cloud AutoStopping for your GCP cloud resources. For more information, see [Create AutoStopping Rules for GCP](create-auto-stopping-rules-for-gcp.md).<ul><li>Orchestrate GCE VMs based on idleness</li><li>Set dependencies between VMs</li><li>Granular savings visibility</li><li>Simple one-time setup</li></ul>|


Make your selection and click **Continue**.

### Grant Permissions

Cloud Billing Export to BigQuery helps you export detailed Google Cloud billing data (such as usage and cost estimate data) to a BigQuery dataset that you specify. The export happens throughout the day automatically. 

1. In **Grant permissions**, click **Open BigQuery Page**.
2. Log into the GCP console and go to the BigQuery page.
3. Select your project in the left panel.
4. Select your dataset. For more information on creating a dataset, see [Creating datasets](https://cloud.google.com/bigquery/docs/datasets).

  [![](./static/set-up-cost-visibility-for-gcp-07.png)](./static/set-up-cost-visibility-for-gcp-07.png)
5. Click **SHARE DATASET**.
6. In **Dataset permissions**, in **Add members**, enter the Harness service account as a member.  
    Copy the service account detail from Harness. The service account is generated dynamically for your account.
7. In **Select a** **role**, select **BigQuery Data Viewer**, and then click **Add**.
8. Click **Done**.  
When you are done, the following screen is displayed:
  [![](./static/set-up-cost-visibility-for-gcp-09.png)](./static/set-up-cost-visibility-for-gcp-09.png)
    
  To enable AutoStopping rules, you need to add more permissions. For more information, see [Create a GCP Connector for AutoStopping Rules](../o2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/1-add-connectors/create-a-gcp-connector-for-auto-stopping-rules.md).
9. Click **Continue** in Harness.


### Connection Test

The connection is validated and verified in this step. After successfully testing the connection, click **Finish**.

![](./static/set-up-cost-visibility-for-gcp-12.png)Your connector is now listed in the **Connectors**.

![](./static/set-up-cost-visibility-for-gcp-13.png)

### Next Steps

* [Analyze Cost for GCP ​Using Perspectives](/article/ryhe4aut1y-analyze-cost-for-gcp-using-perspectives)
* [Create Cost Perspectives](/article/dvspc6ub0v-create-cost-perspectives)

