---
title: Cost Estimation
sidebar_label: Cost Estimation
description: Learn how to get cost estimation for infrastructure changes.
keywords:
  - cost estimation
  - infracost
  - terraform cost
  - cloud cost
  - workspace configuration
  - infrastructure cost
tags:
  - iacm
  - workspaces
sidebar_position: 40
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import DocImage from '@site/src/components/DocImage';

Cost estimation in Harness IaCM uses Infracost to analyze Terraform plans and show estimated monthly cost changes during pipeline execution, including approval steps when your pipeline uses them.

Enable it on a workspace when you want spending context before apply, for example to support budget checks or cost-aware approvals.

---

## Prerequisites

- **Workspace configuration access:** You need permissions to edit workspace settings. Go to [Workspace RBAC](/docs/infra-as-code-management/manage-projects/workspace-rbac) to configure permissions.
- **Terraform-based workspace:** Cost estimation works with Terraform and OpenTofu workspaces. Go to [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace) to set up a workspace.
- **Optional - Paid Infracost Cloud and custom pricing:** Add an API key only if you subscribe to a paid Infracost Cloud plan and maintain custom pricing there. Go to [Infracost Cloud](https://www.infracost.io/) and [Infracost documentation](https://www.infracost.io/docs/) for account types and setup.

---

## How cost estimation works

Harness IaCM integrates with Infracost to estimate cloud infrastructure costs by analyzing Terraform plan output. When enabled, Harness automatically runs Infracost during every Terraform plan operation and calculates the estimated monthly cost difference based on current cloud provider pricing.

**Key characteristics:**
- **Approximations only:** Cost estimates may differ from actual costs based on your cloud provider agreement, usage patterns, and regional pricing variations
- **Infrastructure focus:** Estimates cover infrastructure costs (compute, storage, networking) but not usage-based charges like data transfer or API calls
- **Cloud provider support:** Works with AWS, Azure, and Google Cloud Platform
- **Infracost Cloud API key (optional):** Harness integrates Infracost into IaCM, so estimates use public list prices from the open-source pricing data without an Infracost Cloud account. Set `INFRACOST_API_KEY` only if you have a **paid** Infracost Cloud plan **and** you define custom pricing in Infracost Cloud; otherwise the key does not add value

---

## Enable cost estimation

To enable cost estimation for a workspace:

1. In your IaCM project, go to **Workspaces**.
2. Select the workspace you want to configure.
3. Go to the **Configuration** tab.
4. Toggle **Enable Cost Estimation** to on.

<DocImage path={require('./static/cost1.png')} alt="Enable cost estimation in workspace configuration" title="Click to view full size" />
<p align="center"><em>Enable cost estimation in the workspace Configuration tab</em></p>

The setting applies immediately. Future pipeline executions that include a Terraform plan operation will automatically calculate and display cost estimates.

---

## Where to view cost estimates

Once enabled, cost estimates appear in two locations during pipeline execution.

### Approval steps

When your pipeline includes an approval step after a Terraform plan, the approval interface displays cost estimates alongside resource changes. This allows approvers to review the financial impact before authorizing the apply operation.

<DocImage path={require('./static/cost2.png')} alt="Cost estimates in approval step" title="Click to view full size" />
<p align="center"><em>Cost estimates displayed in the approval step alongside resource changes</em></p>

The approval step shows the estimated monthly cost difference (increase or decrease) compared to the current infrastructure state.

### Cost Change Estimation tab

For a complete audit trail, Harness stores cost estimation data for every pipeline execution in the **Cost Change Estimation** tab. You can review historical cost estimates for past runs, compare cost impacts across different changes, and track infrastructure spending trends over time.

<DocImage path={require('./static/cost3.png')} alt="Cost Change Estimation tab" title="Click to view full size" />
<p align="center"><em>Cost Change Estimation tab showing historical cost data for pipeline executions</em></p>

This tab is available in the pipeline execution details view and persists the cost data even after the pipeline completes.

---

## Configure Infracost Cloud (optional)

Harness integrates Infracost into IaCM. Cost estimation uses Infracost's open-source pricing database and public list prices by default, so you get estimates without signing up for Infracost Cloud.

Configure an Infracost Cloud API key **only** when you meet **both** of the following:

- You subscribe to a **paid** Infracost Cloud plan.
- You maintain **custom pricing** in Infracost Cloud (for example, enterprise discounts or negotiated rates), and you want those rules applied to estimates in IaCM.

If you do not need custom pricing or do not have a paid Infracost Cloud plan, skip this step. An API key does not change the default experience.

To connect a paid Infracost Cloud organization that uses custom pricing:

1. Use your paid Infracost Cloud account at [Infracost Cloud](https://www.infracost.io/).
2. Generate an API key from the Infracost dashboard. Go to [Infracost documentation](https://www.infracost.io/docs/) to follow the setup instructions.
3. In your workspace, go to the **Connectors and Variables** tab.
4. Under **Environment Variables**, select **+ Add Variable**, enter `INFRACOST_API_KEY` as the key, and your API key as the value.

With a valid key from a paid plan, Infracost can apply the custom pricing rules you configure in Infracost Cloud where supported.

---

## Limitations

Be aware of these limitations when using cost estimation:

- **Cloud provider support:** Cost estimation supports AWS, Azure, and Google Cloud Platform. Other cloud providers are not currently supported.
- **Resource coverage:** Not all Terraform resources have cost estimates. Infracost maintains pricing data for common infrastructure resources (compute instances, storage, databases, networking), but some specialized or newer resource types may show as "unsupported" or display $0 estimates.
- **Estimation accuracy:** Cost estimates are approximations based on standard pricing. Actual costs may vary due to enterprise agreements, reserved instances, committed use discounts, spot pricing, or usage-based charges that cannot be predicted from Terraform plans alone.
- **OpenTofu compatibility:** Cost estimation works with both Terraform and OpenTofu workspaces, but ensure you are using a recent version of Infracost that supports your OpenTofu version.
- **Performance impact:** Enabling cost estimation adds minimal overhead to Terraform plan operations. Most plans complete within seconds, but very large plans with thousands of resources may see a slight increase in execution time.

---

## Troubleshooting

<Troubleshoot
  issue="Cost estimates do not appear after enabling cost estimation"
  mode="docs"
  fallback="Verify that your pipeline includes a Terraform plan operation. Cost estimates only appear for plan operations, not for apply-only runs. Check the workspace Configuration tab to confirm cost estimation is toggled on."
/>

<Troubleshoot
  issue="Infracost API errors or authentication failures with Infracost Cloud"
  mode="general"
  fallback="Verify the INFRACOST_API_KEY environment variable is correctly set in the workspace Connectors and Variables tab under Environment Variables. Test your API key by running `infracost auth login` locally. Ensure your Infracost Cloud account is active and the API key has not expired."
/>

<Troubleshoot
  issue="Cost estimate shows $0 or unavailable for specific resources"
  mode="docs"
  fallback="Some Terraform resources are not supported by Infracost's pricing database. Check the Infracost documentation for supported resources at https://www.infracost.io/docs/supported_resources/. If you need estimates that reflect negotiated rates, you need a paid Infracost Cloud plan with custom pricing and an API key configured as described under Configure Infracost Cloud (optional)."
/>

<Troubleshoot
  issue="Cost estimate differs significantly from actual cloud bill"
  mode="general"
  fallback="Cost estimates are based on standard cloud provider pricing and cannot account for enterprise agreements, reserved instances, spot pricing, or usage-based charges. Review your cloud provider's billing dashboard to understand the source of cost differences. Use cost estimates as directional guidance, not exact predictions."
/>

---

## Next steps

Now that you understand how cost estimation works in IaCM, explore related workspace and governance topics:

- [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace): Learn how to create and configure workspaces
- [Workspace RBAC](/docs/infra-as-code-management/manage-projects/workspace-rbac): Control who can enable cost estimation and view cost estimates
- [IaCM pipelines](/docs/category/iacm-pipelines): Understand how cost estimates integrate with Terraform plan and approval steps
- [Infracost documentation](https://www.infracost.io/docs/): Optional Infracost Cloud setup, API keys for paid plans, and supported resources
