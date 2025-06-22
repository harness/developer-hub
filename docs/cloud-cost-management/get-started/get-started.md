---
title: Get started
description: Learn how to get started with Harness Cloud Cost Management (CCM).
sidebar_position: 2
sidebar_label: Get Started (Single Page)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Cloud Cost Management (CCM) is a comprehensive solution designed to help your gain visibility and control over your cloud spending. By integrating seamlessly with major cloud providers, Harness CCM enables teams to monitor, analyse, and optimize cloud costs across multiple environments.

With features like automated cost allocation, real-time reporting, and actionable insights, CCM empowers engineering, finance, and DevOps teams to make data-driven decisions, reduce waste, and maximize the value of their cloud investments.

Follow these steps to connect your cloud infrastructure and start visualizing your spend within minutes.

### Prerequisites
- A Harness project with CCM enabled.
- Access to your cloud provider's billing and IAM settings.
- Permissions to create billing exports and read cost data.

## 1. Configure Cloud Provider
Depending on which cloud provider you are connecting, you will need the following:

<Tabs groupId="cloud-provider" queryString>
<TabItem value="aws" label="AWS">
To ensure a smooth and error-free setup experience, complete the following steps in your **AWS console** before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

| Required Info                     | Where to Find It | Why It’s Needed |
|----------------------------------|------------------|-----------------|
| **AWS Account ID** (12-digit number) | AWS Console → Account Settings | Used to associate your cloud costs with your Harness project. |
| **Cost and Usage Report (CUR)**  | AWS Console → Billing → Cost & Usage Reports | Harness uses this to ingest detailed billing data. |
| **S3 Bucket Name**               | AWS Console → S3 | Stores the CUR files for Harness to access. |
| **Cross Account Role ARN**       | AWS Console → CloudFormation > Stack Outputs | Grants Harness permission to access billing data via a secure IAM role. |

---

#### **Set Up the Cost and Usage Report**
1. Go to **AWS Billing → Cost & Usage Reports**.
2. Click **Create report**.
3. Enter a name for the report (e.g., `ccm-harness-report`).
4. Check the following options:
   - ✅ **Include resource IDs**
   - 🕒 **Time granularity**: `Hourly`
   - ♻️ **Report versioning**: `Overwrite existing report`
5. Choose or create an **S3 bucket** as the report destination.
6. Complete the setup.

---

#### **Create the Cross Account Role**
1. Open the [Harness CloudFormation template](https://console.aws.amazon.com/cloudformation/home).
2. Follow the prompts to **create a new stack**.
3. After the stack is created, go to **CloudFormation → Stacks**.
4. Select your stack and open the **Outputs** tab.
5. Copy the value listed next to `CrossAccountRoleArn`.

This is the value you’ll paste into the wizard later on.

---

</TabItem>
<TabItem value="azure" label="Azure">
- A Harness project with CCM enabled.
- Access to your cloud provider's billing and IAM settings.
- Permissions to create billing exports and read cost data.
</TabItem>
<TabItem value="gcp" label="GCP">
To ensure a successful setup and pass the final connection test, complete the following tasks in your **Google Cloud Console** before launching the Harness wizard.

---

| Required Info                        | Where to Find It                               | Why It’s Needed |
|-------------------------------------|------------------------------------------------|-----------------|
| **GCP Project ID**                  | GCP Console → IAM & Admin → Settings           | Identifies the project Harness connects to. |
| **Billing Account ID**              | GCP Console → Billing                          | Links spend data to the correct billing source. |
| **BigQuery Dataset Name**          | BigQuery Console → Datasets                    | Target location for billing export data. |
| **BigQuery Table Name**            | Automatically created in the dataset           | Must match what you input in the wizard. |
| **Harness Service Account Access** | Grant `BigQuery Data Viewer` role to: `<account-id>@<project-id>.iam.gserviceaccount.com` | Allows Harness to read billing data. |

---

#### Step 1: Set Up the Billing Export

1. Go to **Billing → Billing export**.
2. Enable **Export detailed billing data to BigQuery**.
3. Choose a billing-enabled project and dataset.
4. Enable:
   - 📅 **Daily cost detail**
   - 📊 Export type: `Detailed usage cost data`
5. Note the **Dataset Name** and **Table Name** for the wizard.

[More Help → GCP Billing Export Guide](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

---

#### **Step 2: Grant Permissions**
1. Go to **BigQuery → Your Project → Dataset**.
2. Click **Share Dataset**.
3. Add the following service account as a **Viewer**: `<account-id>@<project-id>.iam.gserviceaccount.com`
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
- A Harness project with CCM enabled.
- Access to your cloud provider's billing and IAM settings.
- Permissions to create billing exports and read cost data.
</TabItem>
</Tabs>

:::caution time for data delivery
It may take up to **24 hours** for AWS to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).
:::

---

## 2. Cloud Connector Wizard
Once you've gathered the required AWS details, follow these steps in the Harness setup wizard to connect your AWS account and enable cost visibility.

<Tabs groupId="cloud-provider" queryString>
<TabItem value="aws" label="AWS">

#### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/6b42eeea-c39c-4a4f-b8da-8c7021e0cff2?makeViewOnly=true&hideAuthorAndDetails=true" title="Add Cloud Costs Connector in Harness" />

#### Step-by-Step
1. Go to **Account Settings** > **Connectors**.
2. Select **New Connector**.
3. Under **Cloud Costs**, select your cloud provider, e.g. AWS, Azure, GCP, or Kubernetes.
4. Perform the following tasks in the selected cloud provider connector wizard.

</TabItem>
<TabItem value="gcp" label="GCP">

#### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/6b42eeea-c39c-4a4f-b8da-8c7021e0cff2?makeViewOnly=true&hideAuthorAndDetails=true" title="Add Cloud Costs Connector in Harness" />

#### Step-by-Step
After preparing the prerequisites, return to Harness and complete each step in the wizard:

**Overview**
- Connector Name: `gcp-cost-connector` (or your preferred name)  
- Project ID: `your-gcp-project-id`

**Setup Billing Export**  
- Dataset Name: `your-dataset-name`  
- Table Name: `your-table-name`  

**Choose Requirements**  
- ✅ Cost Visibility (mandatory)  
- Optionally enable:
  - Resource Inventory Management  
  - AutoStopping  
  - Cloud Governance

**Grant Permissions**  
- Reconfirm you granted `BigQuery Data Viewer` to the service account.
---

**Final Step: Connection Test**
Harness will attempt to:
- Validate access to your dataset.
- Confirm the billing export table exists.
- Verify permissions.

**Common Connection Errors**:

| Error | Likely Cause | Resolution |
|-------|--------------|------------|
| `Unable to find dataset` | Dataset name or project ID is incorrect | Double-check both values in GCP and in the wizard |
| `Permission denied` | Missing or incorrect IAM roles | Re-grant `BigQuery Data Viewer` to Harness’ service account |
| `Table not found` | Billing export is not enabled or table name is wrong | Wait for billing export to initialize or adjust name in the wizard |

</TabItem>
<TabItem value="azure" label="Azure">

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

</TabItem>
</Tabs>

:::tip
Harness CCM follows least-privilege best practices. All permissions are scoped to read-only access needed for billing data ingestion.
[Learn more about how CCM accesses and ingests billing data →](/docs/cloud-cost-management/get-started/onboarding-guide/external-data-ingestion/)
:::

## 3. See Your Cloud Costs
> _Coming soon_: This section will show you how to verify your setup, view AWS spend in Harness, and explore cost breakdowns.

---

## Next Steps
Once your data is flowing, explore the tools available in Harness CCM to help you manage and reduce your cloud spend:

- Use [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to stay on top of spend thresholds.
- Visualize trends and optimize usage with [Business Intelligence (BI) Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards).
- Revisit optional features you didn’t select earlier:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).

Take the next step in your cloud cost management journey and turn visibility into action.