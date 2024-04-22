---
title: Summary of Your Asset Governance Rules  
sidebar_label: Asset Governance Overview Page
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 3
---

The **Overview** page offers a consolidated summary of your organization's governance rules, enforcements, and cost savings resulting from rule executions. This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings. 

### Asset Governance Overview 
Here is an in-depth explanation of the Overview page and the information it displays for the users:

  <DocImage path={require('./static/AG4.png')} width="120%" height="120%" title="Click to view full size image" />

  - **Total Evaluations** — The total number of evaluations performed to date.
  - **Total Enforcements** — The total number of enforcements created up to the current date.
  - **Total Savings** — The total cost savings achieved from the day you began utilizing CCM Asset Governance up to the present date.
  - **Savings in Timeframe** — The total cost savings achieved in the timeframe selected.
  - **Evaluations in Timeframe** — The total number of evaluations in the timeframe selected.
  - **Savings Breakdown** — A granular graph that shows savings breakdown across different cloud providers and resources. You can see savings broken down by:
    - **By Cloud Provider**: This shows savings data for each cloud provider.
    - **By Resource Type**: This shows savings data for each resource type supported.
  - **Evaluations Trend** - This graph shows evaluations performed per day in the selected timeframe.
  - **Recommendations** - Harness displays a list of ten recommendations that can help optimize the cloud assets and minimize cloud costs. Harness highlights the total potential savings that can be achieved if all recommendations are applied.
  
    Additional to this, for each recommendation, Harness shows:
    - **Potential Monthly Savings**: Monthly cost savings that can be realized if the recommendations are applied.
    - **Potential Monthly Spend**: Potential Monthly Spend is the monthly spend for all the resources that surfaced out as part of recommendations. Why potential? Because the resource might be newly added and Harness looks at the last 30 days of data which will be not present for newly created resources.
    - **Resource Count**: Number of resources to which the recommendation will be applied.
    - **Ignored list tag** if the recommendation is added to the "Ignored list".
    - Option to **view details** about the recommendation like which Account (in case of Azure, AWS)/ Project (in case of GCP), resource (AWS, Azure) the recommendation was applied to, the enforcements, etc.

:::important note
- Number of targets considered for Recommendations: Top 15
- Number of regions considered for Recommendations: Top 5 in case of AWS
:::

To apply a recommendation, select the row. The recommendation opens on the **Recommendations** page. To learn how to enforce this recommendation, go to [Governance recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/governance).

You can see a list of all recommendations offered by Harness for each Cloud provider here:

- [Asset Governance recommendations for AWS](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/AWS/AWS-recommendations)
- [Asset Governance recommendations for Azure](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/Azure/azure-recommendations)
- [Asset Governance recommendations for GCP](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/GCP/gcp-recommendations)

### Cost Correlation

### What’s supported

| Cloud | Cost Correlation | First Class Region Filter Support | Recommendations | Multi-Policy | Autostopping (EC2/VM/Instance) |
|-------|------------------|---------------------------------|------------------|--------------|--------------------------------|
| AWS   | aws.ec2, aws.ebs, aws.rds, aws.ebs-snapshot | Yes | Yes | No | Yes |
| GCP   | None             | No                              | No               | No           | No  |
| Azure | Every Resource in Billing Report | Yes | Yes | No | No |

### How is Cost Correlation Computed
Cost Correlation Refresh API: This API is used to refresh or update the cost of all resources in the evaluation. It is exposed to resolve cases where the cost for any resource is not yet part of CUR, Billing Report, or Billing Data (due to newly deployed resources, etc.).You can hit the refresh cost button only once every 30 minutes for any evaluation.

Make use of Harness AIDA to create a new rule. Select the **Create a new rule with AIDA** option. A new rule opens in the rule editor with an auto-generated name. For more information, go to [Harness AIDA for asset governance](../asset-governance/cag-aida/gen-ai-overview.md).
