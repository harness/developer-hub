import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="GCP" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
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

---

:::caution time for data delivery
It may take up to **24 hours** for AWS to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).
:::

---

## Cloud Connector Wizard
Once you've gathered the required GCP details, follow these steps in the Harness setup wizard to connect your GCP account and enable cost visibility.

<Tabs>
<TabItem value="Interactive Guide" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/f48937b7-996f-45f1-9fd9-b387d2570561?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add GCP Cloud Cost Connector in Harness" />
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">

### Step 1: Add GCP Account Details
1. In the wizard, enter a name for your connector (e.g., `ccm-gcp-prod`).
2. Enter your **GCP Project ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. Click **Continue**.

---

### Step 2: Select or Create a Billing Export
1. If your Billing Export already exists, select it from the list.
2. If not, return to GCP and follow the steps in the [Before You Start](#before-you-start) section to create one.
3. Once the Billing Export appears in the list, select it and click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required — leave it checked.
2. Optionally, you can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping
   - Cloud Governance
   - Commitment Orchestration
3. Click **Continue**.

---

### Step 4: Enter Cross Account Role Details
1. Paste the **Cross Account Role ARN** you created via the CloudFormation stack.
   - You can find this under **CloudFormation → Stacks → Outputs tab** in AWS.
2. The **External ID** will be pre-filled — leave it as is.
3. Click **Save and Continue**.

---

### Step 5: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because AWS has not yet delivered the first CUR file.
   - Wait up to **24 hours** after setting up the CUR before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your GCP account and enabled cost visibility in Harness.
</TabItem>
</Tabs>

---

## See Your Cloud Costs
Use **Perspectives** to organize and visualize your cloud costs by business context—such as teams, environments, or applications.
>_Placeholder_: This section will show you how to verify your setup, view cloud spend in Harness, and explore cost breakdowns.

---

## Next Steps
Once your data is flowing, explore the tools available in Harness CCM to help you manage and reduce your cloud spend:

- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-azure-vm-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
