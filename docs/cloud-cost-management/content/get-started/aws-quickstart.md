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

---

<details>
<summary>Set Up the Cost and Usage Report</summary>

Harness Cloud Cost Management (CCM) requires AWS Cost and Usage Reports (CUR) to be configured in **Legacy CUR format**. AWS CUR 2.0 (Data Exports) is **NOT supported**.

> **Important**: When creating a new CUR in AWS, you must select the "Legacy CUR export" option. AWS now defaults to CUR 2.0 / Data Exports for new reports, which will not work with Harness.

**Required CUR Settings**

When creating a Legacy CUR report in AWS, configure the following settings:

| Setting | Required Value | Notes |
|---------|----------------|-------|
| **Report Type** | Legacy CUR export | Not "CUR 2.0" or "Data Exports" |
| **Include Resource IDs** | ✅ Enabled | Must be checked in "Additional report details" |
| **Time Granularity** | Hourly | Required for accurate cost tracking |
| **Compression** | GZIP | Required format |
| **Data Refresh Settings** | Automatic | Enable "Automatically refresh" |
| **File Format** | CSV | Parquet is not supported |

**Connector Configuration**

When setting up an AWS CCM connector in Harness, you need to provide:

| Field | Description | Required |
|-------|-------------|----------|
| `reportName` | The exact name of your CUR report in AWS | Yes |
| `s3BucketName` | The S3 bucket where CUR files are delivered | Yes |
| `region` | AWS region of the S3 bucket | No (defaults to us-east-1) |
| `s3Prefix` | S3 prefix path for the report | No |

**Troubleshooting**

**"CUR report setting is not found"**
- The report name doesn't exist or the connector doesn't have permission to access it
- Verify the report name matches exactly (case-sensitive)

**"Compression is not GZIP"**
- The CUR report is configured with a different compression type
- Recreate the report with GZIP compression

**"Time Granularity is not Hourly"**
- The report is set to Daily or Monthly granularity
- Recreate the report with Hourly granularity

**"Include resource IDs is not enabled"**
- The report was created without resource ID tracking
- Recreate the report with "Include resource IDs" checked

**"No CUR file found"**
- Files haven't been delivered yet (can take up to 24 hours for new reports)
- S3 path prefix mismatch between connector and actual report location

**Step-by-Step Setup Guide**

**Create Legacy CUR in AWS**

1. Go to AWS Billing Console → Cost & Usage Reports
2. Click "Create report"
3. **Important**: Select "Legacy CUR export" (not the default CUR 2.0)
4. Configure:
   - Report name: Choose a descriptive name
   - Include resource IDs: Check this box
   - Time granularity: Select "Hourly"
   - Report versioning: "Create new report version"
5. Configure S3 delivery:
   - S3 bucket: Select or create a bucket
   - S3 path prefix: Optional, but note it if you set one
   - Compression: Select "GZIP"
6. Review and create

**2. Wait for Report Delivery**

- AWS delivers the first CUR file within 24 hours
- Subsequent updates occur multiple times per day

**3. Configure Harness Connector**

1. In Harness, go to Connectors → New Connector → AWS Cloud Cost
2. Enter the Cross-Account Role ARN and External ID
3. In CUR settings:
   - Report Name: Enter the exact report name from AWS
   - S3 Bucket: Enter the bucket name
   - S3 Prefix: Enter if you configured one in AWS
   - Region: Enter the bucket's region

#### Related Documentation

- [AWS CUR User Guide](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html)
- [Legacy CUR vs CUR 2.0](https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-cur2.html)

</details>

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

### Interactive Guide 
<DocVideo src="https://app.tango.us/app/embed/f48937b7-996f-45f1-9fd9-b387d2570561?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add AWS Cloud Cost Connector in Harness" />

### Step-by-Step

#### Step 1: Add AWS Account Details
1. In the wizard, enter a name for your connector (e.g., `ccm-aws-prod`).
2. Enter your **12-digit AWS Account ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. If you're using a GovCloud account, select **Yes**; otherwise, leave the default.
5. Click **Continue**.

---

#### Step 2: Select or Create a Cost and Usage Report
1. If your Cost and Usage Report (CUR) already exists, select it from the list.
2. If not, return to AWS and follow the steps in the [Before You Start](#before-you-start) section to create one.
3. Once the CUR appears in the list, select it and click **Continue**.

:::info
Review [Feature Permissions](/docs/cloud-cost-management/feature-permissions) for CCM to understand the minimum IAM roles or policies needed for every CCM feature.
:::
---

#### Step 3: Choose Requirements
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

---

#### Step 4: Authentication (Conditional)

If you have selected **Optimization by AutoStopping**, **Cloud Governance** or **Commitment Orchestration**, in previous step, you can set up Authentication using OIDC. If not selected, this step will not be prompted.

You can enable authentication for your AWS account via

- Cross Account Role: Created with [custom permissions](/docs/cloud-cost-management/feature-permissions)
- [OIDC Authentication](/docs/cloud-cost-management/oidc-auth): Federated access with no stored credentials

----

#### Step 5: Enter Cross Account Role Details
1. Paste the **Cross Account Role ARN** you created via the CloudFormation stack.
   - You can find this under **CloudFormation → Stacks → Outputs tab** in AWS.
2. The **External ID** will be pre-filled — leave it as is.
3. Click **Save and Continue**.

---

#### Step 6: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because AWS has not yet delivered the first CUR file.
   - Wait up to **24 hours** after setting up the CUR before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your AWS account and enabled cost visibility in Harness.

---


## Next Steps
Once your **AWS billing data** is flowing into Harness, explore these features to enhance your cloud cost management:

- [View and Create Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective) to visualize cloud usage and trends.
- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations you skipped earlier:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).

Take the next step in your cloud cost management journey and turn visibility into action.