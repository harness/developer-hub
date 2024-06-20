---
title: Summary of Your Asset Governance Rules  
sidebar_label: Asset Governance Overview Page
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 3
---

The **Overview** page offers a consolidated summary of your organization's governance active enforcements, evaluations and cost savings resulting from rule evaluations.This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings. 

## Asset Governance Overview 
Here is an in-depth explanation of the Overview page and the information it displays for the users:

  <DocImage path={require('./static/AG5.png')} width="120%" height="120%" title="Click to view full size image" />

  - **Total Evaluations** — The total number of evaluations performed to date.
  - **Total Active Enforcements** — The total number of active enforcements created to date.
  - **Total Savings** —  The total cost savings achieved from day one to date.
  - **Savings in Timeframe** — The total cost savings achieved in the timeframe selected.
  - **Evaluations in Timeframe** — The total number of evaluations in the timeframe selected.
  - **Savings Breakdown** — A granular graph that shows savings breakdown across different cloud providers and resources. You can see savings broken down by:
    - **Cloud Provider**:  This shows total cost savings for each cloud provider.
    - **Resource Type**: This shows total cost savings by resource type .
  - **Evaluations Trend** - This graph shows evaluations performed per day in the selected timeframe. If timeframe is selected for more than 2 months, the evaluations are shown per month in the selected timeframe.
  - **Recommendations** - Governance Overview displays a list of all recommendations that can help optimize the cloud assets and minimize cloud costs. Governance Overview highlights the total potential savings that can be achieved if all recommendations are applied.
  
    Additional to this, for each recommendation, Harness shows more details like:
    - **Potential Monthly Savings**: Monthly cost savings that can be realized if the recommendations are applied.
    - **Potential Monthly Spend**: Potential Monthly Spend is the monthly spend for all the resources that surfaced out as part of recommendations. Why potential? Because the resource might be newly added and Harness looks at the last 30 days of cost data which might not be present for all the days for newly created resources.
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

## Cost Correlation

### What’s supported

| Cloud | Cost Correlation | First Class Region Filter Support | Recommendations | Multi-Policy | Autostopping (EC2/VM/Instance) |
|-------|------------------|---------------------------------|------------------|--------------|--------------------------------|
| AWS   | `aws.ec2`, `aws.ebs`, `aws.rds`, `aws.ebs-snapshot`, `aws.elastic-ip`, `aws.elb`, `cache-cluster`, `s3`, `redshift`, `redshift-snapshot` | Yes ✅ | Yes ✅ | Yes ✅ | Yes ✅ |
| GCP   | `gcp.instance`, `gcp.disk`, `gcp.snapshot`, `gcp.sql-instance`, `gcp.image` | No ❌                             | Yes ✅               | Yes ✅         | No ❌ |
| Azure | Every Resource in Billing Report | Yes ✅ | Yes ✅ | Yes ✅ | No ❌ |

### Cost Correlation Refresh API
This API is used to refresh or update the cost of all resources in the evaluation. It is exposed to resolve cases where the cost for any resource is not yet part of CUR, Billing Report, or Billing Data (due to newly deployed resources, etc.).You can hit the refresh cost button only once every 30 minutes for any evaluation.

:::note
Cost co-relation for GCP would work only if detailed billing export is setup.
:::