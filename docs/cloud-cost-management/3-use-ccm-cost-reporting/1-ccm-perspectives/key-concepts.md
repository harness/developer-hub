---
title: Key Concepts
description: Key Concepts
sidebar_position: 4
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
- /docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/filters-in-perspectives
- /docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/perspective-preferences
- /docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/6-filters-in-perspectives
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocVideo src="https://app.tango.us/app/embed/89164540-a07f-4900-bca7-b303fbb37154?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" style="min-height:720px" title="Perspective Overview in Harness CCM" />

## Overview

Perspectives in Harness CCM provide powerful cost analysis capabilities through customizable views of your cloud spending data. This guide covers the key concepts and features available in Perspectives.

## Perspective Drilldown


<DocImage  path={require('./static/total-cost.png')} width="100%" height="100%" title="Click to view full size image" />

- **Total Cost**: The total cost of the resources in the Perspective.
- **Budget**: The budget for the resources in the Perspective.
- **Forecasted Cost**: The forecasted cost of the resources in the Perspective.
- **Recommendations**: The recommendations for the resources in the Perspective.

### Group By

<DocImage  path={require('./static/group-by.png')} width="100%" height="100%" title="Click to view full size image" />

You can create a Perspective for your resources using rules and filters. The filters are used to group the resources. The following are the supported filters:

* **Cost Categories**: You can create a perspective by filtering based on the cost categories you have created. To create cost categories, see [Use Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories).
* **Region**: Each AWS, GCP, or Azure region you're currently running services in.
* **Product**: Each of your active products with its cloud costs.
* **Cloud Provider**: Filter and group costs by the cloud service provider (AWS, GCP, Azure, or Kubernetes clusters) to analyze spending across different cloud platforms.
* **Label**: Each label that you assign to your AWS resources. You can select a label name to get more granular details of your label. For more information, go to [Tagging your AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html). For tags to appear in the Perspective, you must activate the user-defined cost allocation tags in the AWS Billing and Cost Management console. For more information, go to [Activating User-Defined Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html). CCM updates the tag keys as follows:
	+ For the user-defined tags, `user_` prefix is added.
	+ For the AWS system tags, `aws_` prefix is added.
	+ The characters that do not follow regex `[a-zA-Z0-9_]` are changed to `_`.
	+ The tags are case-sensitive. If the tags are specified as `UserName` and `username`, then the number suffix `_<Number>`is added to the tag. For example, `UserName` and `username_1`.
* **Label V2**: Preserves the original structure from AWS similar to how GCP, Azure and Cluster tags are stored. See [Understanding the Difference: Label vs. Label V2](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts?cloud-providers=cluster#understanding-the-difference-label-vs-label-v2-and-migration) and [Migrate from Label to Label V2](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts?cloud-providers=cluster#migration-from-label-to-label-v2). 

#### Grouping Options by Data Source

CCM provides various grouping options to analyze your cloud costs based on different dimensions. Select the appropriate tab to view available grouping options for each cloud provider, container platform, or external data source.

<Tabs groupId="cloud-providers" queryString>
<TabItem value="aws" label="AWS" default>

#### AWS Grouping Options

CCM allows you to view your AWS costs at a glance, understand what is costing the most, and analyze cost trends across all your Amazon Web Services:

| Grouping Option | Description |
|----------------|-------------|
| **Account** | Cost by AWS account connected via Harness AWS Cloud Provider, showing account name and ID |
| **Billing Entity** | Distinguishes between AWS Marketplace transactions and other AWS service purchases ([Learn more](https://docs.aws.amazon.com/cur/latest/userguide/billing-columns.html)) |
| **Instance Type** | Cost by [Amazon EC2 instance type](https://aws.amazon.com/ec2/instance-types/) (e.g., t2.micro, m5.large) |
| **Line Item Type** | Cost by charge type (Usage, Tax, Credit, etc.) ([Learn more](https://docs.aws.amazon.com/cur/latest/userguide/Lineitem-columns.html)) |
| **Payer Account** | Cost by AWS account that pays for member accounts in an AWS Organization |
| **Service** | Cost by AWS service (EC2, S3, RDS, etc.) |
| **Usage Type** | Cost by specific resource usage measurement (e.g., BoxUsage:t2.micro(Hrs) for EC2 t2.micro instance hours) |

</TabItem>
<TabItem value="azure" label="Azure">

#### Azure Grouping Options

Analyze your Microsoft Azure costs across services, resource groups, and other dimensions:

| Grouping Option | Description |
|----------------|-------------|
| **Benefit Name** | Cost by benefit applied to resources (Enterprise Agreement discounts, Azure Hybrid Benefit, etc.) |
| **Billing Account ID** | Cost by unique billing account identifier |
| **Billing Account Name** | Cost by billing account name |
| **Charge Type** | Cost by charge type (Usage, Purchase, Refund, etc.) |
| **Frequency** | Cost by charge frequency (OneTime, Recurring, UsageBased) |
| **Instance ID** | Cost by specific resource instance identifier |
| **Meter** | Cost by usage meter (Compute Hours, IP Address Hours, Data Transfer, etc.) |
| **Meter Category** | Cost by meter category (Cloud Services, Networking, etc.) |
| **Meter Subcategory** | Cost by meter subcategory (A6 Cloud Services, ExpressRoute, etc.) |
| **Pricing Model** | Cost by pricing structure (Pay-as-you-go, Reserved Instance, etc.) |
| **Publisher Name** | Cost by Marketplace service publisher |
| **Publisher Type** | Cost by publisher type (Microsoft/Azure, Marketplace, AWS) |
| **Reservation ID** | Cost by reservation instance identifier |
| **Reservation Name** | Cost by reservation instance name |
| **Resource** | Cost by specific Azure resource |
| **Resource GUID** | Cost by resource unique identifier |
| **Resource Group Name** | Cost by resource group |
| **Resource Name** | Cost by resource name |
| **Resource Type** | Cost by resource type (Virtual Machine, Storage Account, App Service, etc.) |
| **Service Name** | Cost by Azure service (Virtual Machines, App Service, DNS, etc.) |
| **Service Tier** | Cost by service tier (VMs, Dv3, Dsv3, etc.) |
| **Subscription ID** | Cost by subscription identifier |
| **Subscription Name** | Cost by subscription name |

</TabItem>
<TabItem value="gcp" label="GCP">

#### GCP Grouping Options

Analyze your Google Cloud Platform costs across products, projects, and other dimensions:

| Grouping Option | Description |
|----------------|-------------|
| **Billing Account** | Cost by billing account, allowing tracking across multiple linked projects |
| **Invoice Month** | Cost by billing period |
| **Product** | Cost by GCP product (Compute Engine, Cloud Storage, BigQuery, etc.) |
| **Project** | Cost by GCP project |
| **SKU** | Cost by specific [SKU](https://cloud.google.com/skus), representing the billable unit for GCP services |

</TabItem>
<TabItem value="external" label="External Data">

#### External Data Grouping Options

Analyze costs from external data sources that you've integrated with CCM:

| Grouping Option | Description |
|----------------|-------------|
| **Account ID** | Cost by account identifier from external data sources |
| **Account Name** | Cost by account name from external data sources |
| **Billing Account ID** | Cost by billing account identifier from external systems |
| **Billing Account Name** | Cost by billing account name from external systems |
| **Provider Name** | Cost by provider or vendor name from external data |
| **Resource** | Cost by specific resource from external data sources |
| **SKU** | Cost by SKU or product identifier from external systems |
| **Data Source** | Cost by external data source name or identifier |
| **Category** | Cost by custom categories defined in your external data |
| **Cost Center** | Cost by organizational cost center from external systems |
| **Department** | Cost by department or business unit from external data |
| **Project** | Cost by project identifier from external systems |
| **Team** | Cost by team or group from external data sources |
| **Custom Field 1** | Cost by first custom field defined in external data |
| **Custom Field 2** | Cost by second custom field defined in external data |
| **Custom Field 3** | Cost by third custom field defined in external data |
| **Custom Field 4** | Cost by fourth custom field defined in external data |
| **Custom Field 5** | Cost by fifth custom field defined in external data |

</TabItem>
<TabItem value="cluster" label="Kubernetes & ECS">

#### Kubernetes & Container Grouping Options

Analyze costs for your Kubernetes clusters and ECS environments with these grouping options:

| Grouping Option | Description |
|----------------|-------------|
| **Cluster Name** | Total cost, cost trend, idle cost, unallocated cost, and efficiency score for each cluster name |
| **Cluster Type** | Cost by cluster type (e.g., ECS, Kubernetes) |
| **Namespace** | Cost of each Kubernetes namespace in the cluster (not applicable to ECS clusters) |
| **Namespace ID** | Cost of each Kubernetes namespace ID in the cluster |
| **Workload** | Cost of each Kubernetes workload or ECS service, with workload types identified as Kubernetes pods or ECS tasks |
| **Workload ID** | Cost of each Kubernetes workload ID |
| **Node** | Cost of each Kubernetes node or ECS instance |
| **Storage** | Cost of persistent volumes in your Kubernetes cluster ([Learn more about Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)) |
| **Application** | Sum of your Harness Application costs |
| **Environment** | Cost of cloud platform infrastructures grouped by environment (Dev, QA, Stage, Production, etc.) |
| **Service** | Cost of your microservices and applications |
| **Cloud Provider** | Cost of your cloud platforms (AWS, Kubernetes, etc.) |
| **ECS Service** | Cost of ECS services running task definition instances ([Learn more about ECS Services](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html)) |
| **ECS Launch Type** | Cost by launch type (Fargate or EC2) |
| **ECS Launch Type ID** | Cost by unique identifier for an Amazon ECS launch type |
| **ECS Service ID** | Cost by unique identifier for an ECS service |
| **ECS Task** | Cost of each ECS task (smallest deployable unit in Amazon ECS) |
| **ECS Task ID** | Cost by unique identifier for an ECS task |

</TabItem>
</Tabs>

### Preferences

<DocImage  path={require('./static/preferences.png')} width="100%" height="100%" title="Click to view full size image" />

#### General Preferences

- **Show Others**: The default perspective graph displays only the top 12 cost items. Enable this option to group all remaining costs into an "Others" category, ensuring you see your complete spending picture.

- **Show Anomalies**: Highlight unusual spending patterns or sudden cost changes in your visualizations. This feature makes it easy to spot potential issues or unexpected charges that may require investigation. The number of anomalies are shown on the Group By graph in a red triangle.

<DocImage  path={require('./static/anomalies.png')} width="100%" height="100%" title="Click to view full size image" />

- **Show Negative Cost**: Displays instances where discounts exceed the actual billing amount, resulting in negative cost values in your reports. Displays the negative cost with a dotted red bar and labels it as NegativeCost in the legend. To view it, please select "Group By" as None because in other Group Bys, it might not appear in the top 12 entries.

- **Show Unallocated costs on clusters**: In certain graphs, you may come across an item labeled as Unallocated. This entry is included to provide a comprehensive view of all costs. When you examine the Total Cost in the perspective, it encompasses the costs of all items, including the unallocated cost. This option is available only in perspectives with cluster rules. The Show "unallocated" costs on clusters option is only available in the chart when the Group By is using Cluster and the following options are selected:
    - Namespace
    - Namespace ID
    - Workload
    - Workload ID
    - ECS Task
    - ECS Task ID
    - ECS Service ID
    - ECS Service
    - ECS Launch Type ID
    - ECS Launch Type

<DocImage  path={require('./static/cluster-cost.png')} width="100%" height="100%" title="Click to view full size image" />

:::info
When preferences are selected in a Perspective on the perspective overview page, those settings are saved automatically. Upon returning to the same Perspective, the previously selected preferences are reapplied. Once the user logs out, all view preferences stored in the cache will be cleared. The preferences include (but not limited to):
  - Group By selection
  - Filters applied
  - Cost preference 
  - Cost granularity 
:::

#### Cloud-Based Preferences
- [AWS Preferences](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective?steps=step3&cloud=aws)
- [GCP Preferences](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective?steps=step3&cloud=gcp)
- [Azure Preferences](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective?steps=step3&cloud=azure)

:::info Understanding "Others" vs "No [GroupBy]" Categories

When working with Perspectives that include multiple data sources, you'll see two different grouping behaviors:

#### "Others" Category
- Shows when you have **more than 12 cost items** in a single data source
- Groups the smaller cost items together for cleaner visualization
- **Example**: If you have 20 AWS services, the top 12 show individually and the rest appear as "Others"

#### "No [GroupBy]" Category  
- Appears when you group by a field that **doesn't exist in all your data sources**
- Shows costs from data sources that don't have the selected grouping field

#### Real-World Examples

**Scenario 1**: You have AWS + GCP data and group by "AWS->Account"
- **AWS costs** → Show by individual account names
- **GCP costs** → Show as "No Account" (because GCP doesn't have AWS accounts)

**Scenario 2**: You have AWS + GCP data and group by "GCP->Project"  
- **GCP costs** → Show by individual project names
- **AWS costs** → Show as "No Project" (because AWS doesn't use GCP projects)

#### 🔍 How to Filter "No [GroupBy]" Items

To view only the costs that appear as "No [GroupBy]", use the **IS NULL** filter:

- **Filter**: `AWS > Account` IS NULL → Shows only non-AWS costs
- **Filter**: `GCP > Project` IS NULL → Shows only non-GCP costs

:::

## Features behind Feature Flag

<div style={{
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeaa7',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 0'
}}>
  <p style={{margin: 0}}>
    <img src="/img/icon_ff.svg" alt="Feature Flag" width="18" style={{marginRight: '0.4rem', verticalAlign: 'middle'}}/> <strong>Behind a Feature Flag</strong>

    The below listed features are behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature for usage. 
  </p>
</div>

### Dynamic Perspective Reports

**What are Dynamic Perspective Reports?**

Dynamic Perspective Reports are a new capability that allows you to generate, schedule, and manage cost reports directly from your Perspectives. Create reports from your perspectives to bookmark specific filter and grouping configurations. No need to rebuild the same view repeatedly just save it once and access it anytime. Reports dynamically include all relevant data columns based on your selected grouping criteria and filters. This ensures consistency between your interactive perspective view and exported reports. 


<Tabs>
<TabItem value="create-report" label="Create Reports">


<DocVideo src="https://app.tango.us/app/embed/9d694765-9542-47a8-a2fd-a23a2c01e2ca" style="min-height:720px" title="Perspective Overview in Harness CCM" />

1. Navigate to the specific Perspective you wish to create a report for.
2. Click the **Download/Save as Report** button in the upper-right corner of the Perspective view

**Report Details** 
  - **Name**: Provide a name for your report 
  - **Group By**: Select how data should be organized using [available grouping options](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#grouping-options-by-data-source) 
  - **Time Period**: Choose from Last 7 Days, Last 30 Days, Last Month, or This Month 
  - **Granularity**: Select Daily, Weekly, or Monthly data points 
  - **Filters**: Apply specific [filters](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#group-by) to focus your report 
  - **Data Columns**: Customize which metrics and dimensions appear in your report. The system automatically suggests relevant columns based on your Group By selection, but you can add or remove specific data points to tailor the report to your requirements. 
  - **Export Rows up to**: Set maximum number of data rows to include 
  - **Exclude rows with cost below**: Optionally exclude rows below a specified cost value

**Delivery Options:**
  - **Scheduled Delivery:** Set specific date and time for automated delivery and frequency (Daily, Weekly, Monthly, Quarterly, Yearly). You can add up to 50 recipient email addresses (comma-separated)
  - **Immediate Download:** Download Perspective Chart data or Table data as CSV

:::important 

-  When the Dynamic Perspective Reports feature flag is enabled for your account, CCM will disable the legacy report creation method from the Perspective Creation workflow.

<DocImage  path={require('./static/enabled-ff.png')} width="80%" height="80%" title="Click to view full size image" />

- For previously created reports where **Group By settings, time range, or granularity were not available for reports,CCM utomatically takes these parameters from the perspective. In these cases, the maximum export row limit defaults to 10,000 rows.

:::

</TabItem>
<TabItem value="view-report" label="View Saved Reports">

<DocImage  path={require('./static/saved-reports.png')} width="100%" height="100%" title="Click to view full size image" />

To view and manage all your saved reports: Navigate to **Cloud Costs** > **Perspectives** > **Saved Reports**

The Saved Reports page provides a comprehensive view of all your configured reports with the following options:

* **Report Creation**: Create new reports by clicking **+New Report** > **Perspective**
* **Report Management**: View information for each report including:
  * Report name and scheduled delivery frequency
  * Associated perspective
  * Time period selected for data
  * Creation and modification metadata
* **Report Actions**: You can:
  * Edit or Delete a report.
  * Subscribe or unsubscribe from scheduled deliveries.

</TabItem>
</Tabs>

-----

### Dynamic Cost Categories Toggle
**Feature Flag Name: `CCM_COST_CATEGORY_STAMPED_DATA`**

<DocImage  path={require('./static/dynamic-toggle.png')} width="100%" height="100%" title="Click to view full size image" />

The Dynamic toggle on the Perspective page gives you control over how cost category rules are applied to your cost data. It lets you balance real-time accuracy with faster performance.

#### Internal Working:

<DocImage  path={require('./static/dynamic-toggle.gif')} width="100%" height="100%" title="Click to view full size image" />

**If Dynamic ON (Runtime Mode):**
- Perspectives apply **cost category rules as soon as the page loads (dynamically)**.
- Any recent changes to cost category rules (even from a few minutes ago) are reflected immediately.
- ⏱️ Load times may be slower since rules are processed at runtime.

**If Dynamic OFF (Stored Data Mode):**
- Harness CCM evaluates cost category rules during the daily data ingestion process and persists the results in a dedicated dataset. This optimized dataset contains pre-computed rule evaluations for the current month's cost data. 
- When Dynamic Toggle is OFF, Perspectives use **cost category rules from the stored dataset**.
- This ensures ⚡ **faster performance** since stored data is used without any computations at runtime.
- Note that if in case, CCM's daily process of updating the dataset is still running, **stored data is not available and only Dynamic ON (runtime calculation) is available** and a message will be displayed on the UI to inform.
<DocImage  path={require('./static/updation-in-process.png')} width="90%" height="90%" title="Click to view full size image" />

:::note
- **Historical Data**: CCM updates cost category rules **daily for the current month only**. For previous months with Dynamic OFF, Perspectives use the rules that existed when that month's data was ingested. To apply new rules to historical data, contact support to request a backfill.

- **New Cost Categories**: When you create a new cost category and use it in a Perspective with Dynamic OFF (stored data mode), no data will be displayed initially. This occurs because the new cost category hasn't been processed by CCM's daily job yet. You'll need to either switch to Dynamic ON temporarily or wait for upto 24 hours for the new cost category data to appear.
:::

-----

## Label Migration: Label vs. Label V2

Harness CCM is transitioning from the traditional Label system to the enhanced Label V2 system. Support for the legacy Label system will be discontinued in the coming months.

- **Label (Legacy)**: Normalizes AWS tags. GCP, Azure and Clusters tags are not normalized.
- **Label V2 (New)**: Preserves the original structure from AWS similar to how GCP, Azure and Cluster tags are stored.

### Key Benefits of Label V2:

- Original tags: Displays your original cloud tag keys exactly as they appear in AWS, Azure, or GCP
- Improved Performance: Enhanced data processing and query performance

After Label V2, AWS labels are stored as-is without any normalization.

### Who Needs to Migrate?

<div style={{
  backgroundColor: '#e7f3ff',
  border: '1px solid #b3d9ff',
  borderRadius: '8px',
  padding: '15px',
  margin: '15px 0'
}}>
  <h4 style={{margin: '0 0 10px 0', color: '#0066cc'}}>✅ Migration Required</h4>
  <p style={{margin: '0'}}>Label V2 will replace the current Labels in the next release. Harness CCM will automatically migrate your existing rules. However, if your scripts reference Labels in Perspectives or CCs, you’ll need to [update them manually](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#how-to-migrate) to use Label V2. <strong>Existing Labels will also continue to work without interruption</strong></p>
</div>

<div style={{
  backgroundColor: '#d4edda',
  border: '1px solid #c3e6cb',
  borderRadius: '8px',
  padding: '15px',
  margin: '15px 0'
}}>
  <h4 style={{margin: '0 0 10px 0', color: '#155724'}}>🆕 No Migration Needed</h4>
  <p style={{margin: '0'}}>If you're a new user or haven't used Labels in your Perspectives, simply use <strong>Label V2</strong> for all new configurations.</p>
</div>

### How to Migrate

<Tabs>
<TabItem value="via-ui" label="Via UI">

- Identify affected components: Review all Perspectives that use Label-based grouping or filtering
- Update each component: Edit each Perspective. Locate all instances where you've defined rules, filters, or grouping using AWS Labels. Change the selection from "Label" to "Label V2". Save your changes
- Verify your updates: After updating the Perspective, confirm that your cost data appears correctly. Ensure all previously configured Label-based filters work as expected


<iframe src="https://app.tango.us/app/embed/44d091fd-3177-44a1-b575-1a5a8febf36d" title="Migrating Label to Label V2" style={{minHeight:'480px'}} width="100%" height="100%" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>

</TabItem>
<TabItem value="via-api" label="Via API">

**Label (Original Format)** normalizes AWS tags as follows:
* User-defined tags: Adds `user_` prefix (e.g., `environment` becomes `user_environment`)  
* AWS system tags: Adds `aws_` prefix (e.g., `aws:createdBy` becomes `aws_createdBy`)  
* Special characters: Characters not matching `[a-zA-Z0-9_]` are replaced with `_`  
* Case sensitivity: For duplicate tag names with different cases (e.g., `UserName` and `username`), a numeric suffix is added (`UserName` and `username_1`)  

**Label V2** preserves the original tag structure without these modifications

So, when migrating from Label to Label V2 in your API calls:

1. Change the `identifier` from `LABEL` to `LABEL_V2`
2. Change the `identifierName` from `Label` to `Label V2`
3. For AWS, identify all Labels that start with `user_` or `aws_ ` prefixes and replace them with the actual tag key (without the prefix). For other cloud providers, no Label prefix changes are needed.

Here's how the API request format changes:

<Tabs>
<TabItem value="aws-users" label="AWS Users">


Earlier every request had the Label field as:

```json
                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "user_key1",
                        "identifier": "LABEL",
                        "identifierName": "Label"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                } 
```
Now the request has the Label V2 field as:

```json

                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "Key1",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                }
```
Similarly, for `fieldId`:

Earlier:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL",
                        "identifierName": "Label"
                    },
                    "operator": "IN",
                    "values": []
                }

```

Now:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": []
                }
``` 


</TabItem>
<TabItem value="aws-users-label" label="Other Cloud Providers">

Earlier every request had the Label field as:

```json
                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "key",
                        "identifier": "LABEL",
                        "identifierName": "Label"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                } 
```
Now the request has the Label V2 field as:

```json

                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "key",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                }
```
Similarly, for labels.key:

Earlier:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL",
                        "identifierName": "Label"
                    },
                    "operator": "IN",
                    "values": []
                }

```

Now:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": []
                }
``` 
</TabItem>
</Tabs>

Please refer the following API docs for details:

- [Create a Perspective](https://apidocs.harness.io/cloud-cost-perspectives/createperspective)
- [Update a Perspective](https://apidocs.harness.io/cloud-cost-perspectives/updateperspective)

</TabItem>
</Tabs>


## Organize Perspectives using Folders

You can organize Perspectives by adding them to folders. The number of Folders that **can be created is 2000.**

Click **New folder**, name the folder, and then select the Perspectives you want to add.

<DocImage path={require('./static/folder-perspectives.png')} width="90%" height="90%" title="Click to view full size image" />

You can also add a Perspective to a folder when you create it or move it to a folder when you edit it.

<DocImage path={require('./static/folder-two.png')} width="90%" height="90%" title="Click to view full size image" />

<DocImage path={require('./static/move-folder.png')} width="90%" height="90%" title="Click to view full size image" />


