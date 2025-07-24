import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Azure" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start Azure
To ensure a smooth and error-free setup experience, complete the following steps in your **Azure portal** before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

| Required Info                       | Where to Find It                             | Why It’s Needed                                       |
| ----------------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| **Storage Account Name**            | Azure Portal → Storage accounts              | Source location of exported billing data.             |
| **Subscription ID**                 | Azure Portal → Subscriptions                 | Identifies the subscription being monitored.          |
| **Storage Container**               | Azure Portal → Storage accounts → Containers | Target location for billing export data.              |
| **Storage Directory & Export Name** | When configuring Billing Export in Azure     | Required to locate and identify billing data exports. |

:::info Choose your billing type
Harness supports two billing types:
- **Actual**: Reflects real-time incurred charges.
- **Amortised**: Spreads out charges (e.g., reserved instances) evenly over usage.

Choose the one that aligns best with your internal reporting strategy. This cannot be changed later.
:::
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
Once you've gathered the required Azure details, follow these steps in the Harness setup wizard to connect your Azure account and enable cost visibility.

<Tabs>
<TabItem value="Interactive Guide" label="Interactive Guide">
   <DocVideo src="https://app.tango.us/app/embed/f48937b7-996f-45f1-9fd9-b387d2570561?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Azure Cloud Cost Connector in Harness" />
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">

### Step 1: Overview
1. Launch the wizard and select **Azure** as the cloud provider.
2. Enter a name and optional description for your connector.
3. Click **Continue**.

---

### Step 2: Azure Billing Exports
1. Click **Launch Azure Console**.
2. Follow the [instructions to create a Billing Export](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data).
3. Enter the following:
   * **Storage Account Name** (e.g., `harnessbillingstorage`)
   * **Subscription ID** (e.g., `12345678-9abc-def0-1234-56789abcdef0`)
   * **Storage Container** (e.g., `billingexports`)
   * **Storage Directory** (e.g., `ccm`)
   * **Export Name** (e.g., `ccm-export`)
4. Select your **Metric (Billing Type)**:
   * `Actual` or `Amortised`
5. Click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default.
2. Optionally select any of the following:
   * **Resource Inventory Management**: View VMs and resource inventory.
   * **Optimization by AutoStopping**: Orchestrate VMs based on idleness.
   * **Cloud Governance**: Apply cost guardrails and policies.
3. Click **Continue**.

---

### Step 4: Create Service Principal
1. Open your terminal or Azure Cloud Shell.
2. Run the following auto-generated commands:
```bash
# Register the Harness app (Harness provides a fixed multi-tenant app ID)
az ad sp create --id <harness-multi-tenant-app-id>

# Role assignment for enabling Cost Visibility
SCOPE=`az storage account show --name harnessbillingstorage --query "id" | xargs`

# Assign role to the app on the scope fetched above
az role assignment create --assignee <harness-multi-tenant-app-id> --role 'Storage Blob Data Reader' --scope $SCOPE
```
3. Click **Continue**.

---

### Step 5: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because AWS has not yet delivered the first CUR file.
   - Wait up to **24 hours** after setting up the CUR before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your Azure account and enabled cost visibility in Harness.
</TabItem>
</Tabs>

---

## See Your Cloud Costs
Use **Perspectives** to organize and visualize your cloud costs by business context—such as teams, environments, or applications.
> _Placeholder_: This section will show you how to verify your setup, view cloud spend in Harness, and explore cost breakdowns.

---

## Next Steps
Once your Azure billing data is flowing into Harness, explore these features to enhance your cloud cost management:

- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/azure-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).

Turn visibility into action and unlock cost efficiency across your Azure cloud infrastructure.