import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
To ensure a smooth and error-free setup experience, complete the following steps in your **AWS console** before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

| Required Info                     | Where to Find It | Why It’s Needed |
|----------------------------------|------------------|-----------------|
| **AWS Account ID** (12-digit number) | AWS Console → Account Settings | Used to associate your cloud costs with your Harness project. |
| **Cost and Usage Report (CUR)**  | AWS Console → Billing → Cost & Usage Reports | Harness uses this to ingest detailed billing data. |
| **S3 Bucket Name**               | AWS Console → S3 | Stores the CUR files for Harness to access. |
| **Cross Account Role ARN**       | AWS Console → CloudFormation > Stack Outputs | Grants Harness permission to access billing data via a secure IAM role. |

---

### Set Up the Cost and Usage Report
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

### Create the Cross Account Role

1. Open the [Harness CloudFormation template](https://console.aws.amazon.com/cloudformation/home).
2. Follow the prompts to **create a new stack**.
3. After the stack is created, go to **CloudFormation → Stacks**.
4. Select your stack and open the **Outputs** tab.
5. Copy the value listed next to `CrossAccountRoleArn`.

This is the value you’ll paste into the wizard later on.

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
Once you've gathered the required AWS details, follow these steps in the Harness setup wizard to connect your AWS account and enable cost visibility.

<Tabs>
<TabItem value="Interactive Guide" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/f48937b7-996f-45f1-9fd9-b387d2570561?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add AWS Cloud Cost Connector in Harness" />
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">

### Step 1: Add AWS Account Details
1. In the wizard, enter a name for your connector (e.g., `ccm-aws-prod`).
2. Enter your **12-digit AWS Account ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. If you're using a GovCloud account, select **Yes**; otherwise, leave the default.
5. Click **Continue**.

---

### Step 2: Select or Create a Cost and Usage Report
1. If your Cost and Usage Report (CUR) already exists, select it from the list.
2. If not, return to AWS and follow the steps in the [Before You Start](#before-you-start) section to create one.
3. Once the CUR appears in the list, select it and click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required — leave it checked.
2. Optionally, you can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping
   - Cloud Governance
   - Commitment Orchestration
3. Click **Continue**.

:::tip
Not sure which options to choose? [Learn more about each feature](#before-you-start).
:::

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

🎉 You’ve now connected your AWS account and enabled cost visibility in Harness.
</TabItem>
</Tabs>

---

## See Your Cloud Costs
Use **[Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective)** to organize and visualize your cloud costs by business context—such as teams, environments, or applications.
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