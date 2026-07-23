import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

:::important

AWS **CUR 2.0** (Data Exports) is now supported and recommended for new connectors. It covers all CACM features. **CUR 1.0 (Legacy CUR)** remains fully supported for existing connectors.

:::

---

## Before You Start
To ensure a smooth and error-free setup experience, complete the following steps in your **AWS console** before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

| Required Info                     | Where to Find It | Why It’s Needed |
|----------------------------------|------------------|-----------------|
| **AWS Account ID** (12-digit number) | AWS Console → Account Settings | Used to associate your cloud costs with your Harness project. |
| **Cost and Usage Report (CUR)**  | AWS Console → Billing → Cost & Usage Reports | Harness uses this to ingest detailed billing data. |
| **S3 Bucket Name**               | AWS Console → S3 | Stores the CUR files for Harness to access. |

### Set Up the Cost and Usage Report

Create the report in your AWS console, then use its name and S3 bucket when you configure the Harness connector. Choose **CUR 2.0** for new connectors, or **Legacy CUR** for existing ones:

<Tabs queryString="cur">
<TabItem value="cur2" label="CUR 2.0 (recommended)" default>

1. In the AWS console, navigate to **Billing and Cost Management** → **Data Exports** → **Create export**.
2. Under **Report details**, select all four options:
   - Include resource IDs
   - Split cost allocation data
   - Include caller identity (IAM principal) allocation data
   - Include capacity reservation columns and granularity
3. Under **Delivery options**, configure the following:

   | Setting | Required Value |
   |---------|----------------|
   | **Compression type** | Parquet |
   | **S3 bucket** | Select or create a bucket. Copy the bucket name, as you will need it for the Harness connector. |
   | **S3 path prefix** | Enter any prefix. |

4. Do not uncheck any columns.
5. Review and create the export. Copy the export name, as you will need it for the Harness connector.

   <DocImage path={require('./static/aws-cur-2-0.png')} width="100%" height="100%" title="Click to view full size image" />

</TabItem>
<TabItem value="cur1" label="Legacy CUR">

1. In the AWS console, go to **Billing → Cost & Usage Reports** and click **Create report**.
2. Select **Legacy CUR export** and give the report a descriptive name. Copy this name, as you will need it for the Harness connector.
3. Under **Report details**, configure the following:

   | Setting | Required Value | Notes |
   |---------|----------------|-------|
   | **Include Resource IDs** | ✅ Enabled | Must be checked in "Additional report details" |
   | **Time Granularity** | Hourly | Required for accurate cost tracking |
   | **Report versioning** | Create new report version | - |

4. Under **Delivery options**, configure the following:

   | Setting | Required Value | Notes |
   |---------|----------------|-------|
   | **S3 bucket** | Select or create a bucket | Copy the bucket name for the Harness connector |
   | **S3 path prefix** | Enter any prefix | Note it if you set one |
   | **Compression** | GZIP | Required format |
   | **File Format** | CSV | Parquet is not supported |
   | **Data Refresh Settings** | Automatic | Enable "Automatically refresh" |

5. Review and create the report.

</TabItem>
</Tabs>

#### Related Documentation

- [AWS CUR User Guide](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html)
- [Legacy CUR vs CUR 2.0](https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-cur2.html)

---

:::caution time for data delivery
It may take up to **24 hours** for AWS to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CACM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).
:::

---

## Interactive Guide

Connect your AWS account to Harness using the connector wizard. Watch the walkthrough below, or follow the [Step-by-Step](#step-by-step) instructions for the full detail on each step.

<DocVideo src="https://app.tango.us/app/embed/3bcd4491-b41a-434f-8598-3bf6ca4674b5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add AWS Cloud Cost Connector in Harness" />

## Step-by-Step

### Step 1: Add AWS Account Details
1. In the wizard, enter a name for your connector (e.g., `ccm-aws-prod`).
2. Enter your **12-digit AWS Account ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. If you're using a GovCloud account, select **Yes**; otherwise, leave the default.
5. Click **Continue**.

### Step 2: Select or Create a Cost and Usage Report

In the connector wizard, select the report type based on the features you need:

| Report type | Supported features | Recommended for |
|---|---|---|
| **CUR 2.0 (recommended)** | Cost Visibility, Asset Governance, Recommendations | New connectors, AI cost attribution (e.g. Amazon Bedrock), organizations that do not need AutoStopping, Commitments, or Cluster Orchestrator |
| **CUR 1.0 (legacy)** | Cost Visibility, Asset Governance, Recommendations, AutoStopping, Commitments, Cluster Orchestrator | Existing connectors that rely on AutoStopping, Commitments, or Cluster Orchestrator |

<Tabs queryString="cur-version">
<TabItem value="cur2" label="CUR 2.0 (recommended)" default>

1. In the connector wizard, select the **CUR 2.0 (recommended)** tab.
2. Click **Launch AWS console** and follow the [CUR 2.0 setup steps](?cur=cur2#set-up-the-cost-and-usage-report) to create a Data Export if you have not done so already.
3. Enter the **Data Export Name** and **S3 Bucket Name** in the fields provided.
4. Click **Continue**.

<DocImage path={require('./static/curtwo.png')} width="100%" height="100%" title="Click to view full size image" />

</TabItem>
<TabItem value="cur1" label="CUR 1.0 (legacy)">

1. In the connector wizard, select the **CUR 1.0 (legacy)** tab.
2. Click **Launch AWS console** and follow the [Legacy CUR setup](?cur=cur1#legacy-cur-setup) steps to create a report if you have not done so already.
3. Enter the **Cost and Usage Report Name** and **S3 Bucket Name** in the fields provided.
4. Click **Continue**.

</TabItem>
</Tabs>

:::info
Review [Feature Permissions](/docs/cloud-cost-management/feature-permissions) for CACM to understand the minimum IAM roles or policies needed for every CACM feature.
:::

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required, leave it checked.
2. (Optional) You can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping
   - Cloud Governance
   - Commitment Orchestration
3. Click **Continue**.

:::tip
Not sure which options to choose? [Learn more about each feature](#before-you-start).
:::

### Step 4: Authentication (Conditional)

If you have selected **Optimization by AutoStopping**, **Cloud Governance** or **Commitment Orchestration**, in previous step, you can set up Authentication using OIDC. If not selected, this step will not be prompted.

You can enable authentication for your AWS account via

- Cross Account Role: Created with [custom permissions](/docs/cloud-cost-management/feature-permissions)
- [OIDC Authentication](/docs/cloud-cost-management/oidc-auth): Federated access with no stored credentials

### Step 5: Enter Cross Account Role Details
1. Paste the **Cross Account Role ARN** you created via the [CloudFormation template](https://continuous-efficiency.s3.us-east-2.amazonaws.com/setup/v1/ng/HarnessAWSTemplate.yaml). You can find it under **CloudFormation → Stacks → Outputs tab** in AWS.

:::note
If you are using **CUR 2.0**, ensure the Cross Account IAM role has been updated with the **CUR 2.0** permissions by re-running the [CloudFormation template](https://continuous-efficiency.s3.us-east-2.amazonaws.com/setup/v1/ng/HarnessAWSTemplate.yaml) or manually adding them as described in the [Migrating from CUR 1.0](#migrating-from-cur-10) section.
:::
2. The **External ID** will be pre-filled. Leave it as is.
3. Click **Save and Continue**.

### Step 6: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because AWS has not yet delivered the first CUR file.
   - Wait up to **24 hours** after setting up the CUR before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your AWS account and enabled cost visibility in Harness.

---

## Migrating from CUR 1.0

If you already have an AWS billing connector configured with **CUR 1.0** and want to migrate to **CUR 2.0**:

1. Edit the existing AWS billing connector.
2. In the **Cost and Usage Report** step, select the **CUR 2.0 (recommended)** tab.
3. Update the Cross Account IAM role with the required **CUR 2.0** permissions using one of the following methods:
   - **CloudFormation template (recommended):** Re-run the [CloudFormation template](https://continuous-efficiency.s3.us-east-2.amazonaws.com/setup/v1/ng/HarnessAWSTemplate.yaml), which includes all required permissions for both **CUR 1.0** and **CUR 2.0**.
   - **Manual:** Add the following permissions directly to the existing Cross Account IAM role:

     ```json
     {
       "Action": [
         "cur:DescribeReportDefinitions",
         "bcm-data-exports:GetExport",
         "bcm-data-exports:ListExports",
         "organizations:Describe*",
         "organizations:List*"
       ]
     }
     ```

4. Ensure the role also has the required S3 bucket permissions and resource-level access for the Data Export location.

:::note
After you migrate, AWS generates all new billing data in **CUR 2.0** format. Keep the following in mind:

- **Historical data:** Data from before the migration remains in **CUR 1.0** format and is not automatically converted.
- **Backfill:** If you need pre-migration data in **CUR 2.0** format, contact AWS Support. AWS can backfill up to 36 months. Harness recommends requesting at least the current year to maintain uninterrupted reporting in Harness CCM.

Go to [Migration to CUR 2.0 - Cloud Intelligence Dashboards on AWS](https://docs.aws.amazon.com/guidance/latest/cloud-intelligence-dashboards/migration-to-cur.html) to understand the full impact of migrating.
:::

---


## Next Steps
Once your **AWS billing data** is flowing into Harness, explore these features to enhance your cloud & AI cost management:

- [View and Create Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective) to visualize cloud usage and trends.
- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations you skipped earlier:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).

Take the next step in your cloud & AI cost management journey and turn visibility into action.
