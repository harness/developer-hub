import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="GCP" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
To ensure a smooth and error-free setup experience, set up GCP Billing Export before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

**Why is Billing Export required?**

Harness Cloud Cost Management (CCM) analyzes your cloud spending by accessing detailed billing data from your GCP account. The billing export automatically sends your cost and usage data to BigQuery, where Harness can securely read it.

:::info 
⚠️ GCP Billing Export Table Limitations and CMEK Restrictions
When setting up a connector for GCP Billing Export, keep the following limitations and guidelines in mind:

- GCP does not support copying data across regions if the source table uses CMEK.
- GCP also does not allow copying data from Materialized Views.
- If your organization enforces CMEK policies, consider creating a new dataset without CMEK enabled specifically for the integration.
- It is recommended to create the dataset in the US region, as it offers the most compatibility with GCP billing export operations.
- Use datasets with default (Google-managed) encryption when configuring the connector.

:::

---

### Step 1: Set Up the Billing Export
1. Go to **Billing → Billing export**.
2. Enable **Export detailed billing data to BigQuery**.
3. Choose a billing-enabled project and dataset.
4. Enable:
   - 📅 **Daily cost detail**
   - 📊 Export type: `Detailed usage cost data`
5. Note the **Dataset Name** and **Table Name** for the wizard.

[More Help → GCP Billing Export Guide](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

---

### **Step 2: Grant Permissions**
1. Go to **BigQuery → Your Project → Dataset**.
2. Click **Share Dataset**.
3. Add the following service account as a **Viewer**: `<account-id>@<project-id>.iam.gserviceaccount.com`

---

:::caution time for data delivery
It may take up to **24 hours** for GCP to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
:::

---

## Cloud Connector Wizard
Once you've gathered the required GCP details, follow these steps in the Harness setup wizard to connect your GCP account and enable cost visibility.

### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/3eb1eed3-85aa-4b1a-b4e6-d249989e7ce5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add GCP Cloud Cost Connector in Harness" />

### Step-by-Step Guide

### Step 1: Add GCP Account Details
1. In the wizard, enter a name for your connector (e.g., `gcp-demo-prod`).
2. Specify **Project ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. Click **Continue**.

---

### Step 2: Select or Create a Billing Export
Cloud Billing export to BigQuery enables you to export detailed Google Cloud billing data (such as usage and cost estimate data) automatically throughout the day to a BigQuery dataset that you specify.
1. If your Billing Export already exists, select it from the list.
2. If not, return to GCP and follow the steps in the [Before You Start](#before-you-start) section to create one. 
3. Once the Billing Export appears in the list, select it and click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required.
2. (Optional) You can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping. If selected, you can select granular permissions for AutoStopping by clicking **Continue**
   - Cloud Governance
3. Click **Continue**.

---

### Step 4: Authentication (Conditional)

If you have selected **Optimization by AutoStopping** or **Cloud Governance**, in previous step, you can set up Authentication. If not selected, this step will not be prompted.

You can enable authentication for your GCP account via

- Service Account with Custom Role: Created with [custom permissions](/docs/cloud-cost-management/feature-permissions)
- [OIDC Authentication](/docs/cloud-cost-management/oidc-auth): Federated access with no stored credentials

-----

### Step 5: Grant Permissions

Based on what you selected in **Step 3 - Choose Requirements**, you will be prompted to grant permissions to your service account alongwith the steps to be followed.

:::info
Review [Feature Permissions](/docs/cloud-cost-management/feature-permissions) for CCM to understand the minimum roles or permissions needed for every CCM feature.
:::

---

### Step 6: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because GCP has not yet delivered the first billing export.
   - Wait up to **24 hours** after setting up the billing export before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your GCP account and enabled cost visibility in Harness.

---

## Next Steps
Once your data is flowing, explore the tools available in Harness CCM to help you manage and reduce your cloud spend:

- [View and Create Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective) to visualize cloud usage and trends.
- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/gcp-dashboard).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
