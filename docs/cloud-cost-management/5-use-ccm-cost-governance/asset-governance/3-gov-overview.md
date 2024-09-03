---
title: Summary of Your Asset Governance Rules  
sidebar_label: Asset Governance Overview Page
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 3
---

The **Overview** page offers a consolidated summary of your organization's governance active enforcements, evaluations and cost savings resulting from rule evaluations.This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings. 

## Asset Governance Overview 
Here is an in-depth explanation of the Overview page and the information it displays for the users:

  <DocImage path={require('./static/AG7.png')} width="120%" height="120%" title="Click to view full size image" />

  - **Total Evaluations** — The total number of evaluations performed to date.
  - **Total Active Enforcements** — The total number of active enforcements created to date.
  - **Total Savings** —  The total cost savings achieved from day one to date.
  - **Savings in Timeframe** — The total cost savings achieved in the timeframe selected.
  - **Evaluations in Timeframe** — Harness supports multiple statuses for Evaluations. The overview page now displays a detailed breakdown of evaluation counts by status.
        - Total Evaluations: The total number of evaluations in the timeframe selected. 
        - Success Evaluations: Total number of evaluations with status as "Successful".
        - Failure Evaluations: Total number of evaluations with status as "Failure".
        - Partial Success Evaluations: Total number of evaluations with status as "Partial Success".
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
    - **Custom Recommendations**: All Custom Recommendations show up with a "Custom" badge after successful creation. 
:::important note
  - In case of AWS and Azure, Account/ Subscription and region combination with greater than 300$ of monthly spend are considered for recommendations.
  - In case of GCP, Project with greater than 300$ of monthly spend is considered for recommendations.
:::

To apply a recommendation, select the row. The recommendation opens on the **Recommendations** page. To learn how to enforce this recommendation, go to [Governance recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/governance).

You can see a list of all recommendations offered by Harness for each Cloud provider here:

- [Asset Governance recommendations for AWS](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/AWS/AWS-recommendations)
- [Asset Governance recommendations for Azure](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/Azure/azure-recommendations)
- [Asset Governance recommendations for GCP](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/GCP/gcp-recommendations)

### Custom Recommendations

Harness CCM's Cloud Asset Governance provides recommendations out of the box for management of cloud resources. Harness CCM now offers the ability to customize these recommendations.

Custom recommendations allow users to create personalized policies that integrate with the existing CCM recommendation engine.
These custom recommendations not only show up in the recommendation section but also leverage features like the Ignore list, state management, and ticketing integration.
  <DocImage path={require('./static/create-custom.png')} width="120%" height="120%" title="Click to view full size image" />
  <DocImage path={require('./static/custom-tab.png')} width="120%" height="120%" title="Click to view full size image" />
  
:::note
- Currently, per account, a maximum of 10 custom recommendations can be created.
- Custom Recommendations can only be created for the resources supported for cost correlation as listed below. In addition to that, multi-policy rules cannot be converted into Custom Recommendations.
- It can take up to 24 hours for a custom recommendation to appear.
- In case of AWS and Azure, Account/ Subscription and region combination with greater than 300$ of monthly spend are considered for recommendations.
- In case of GCP, Project with greater than 300$ of monthly spend is considered for recommendations.

:::

## Cost Correlation

### What’s supported

| Cloud | Cost Correlation | First Class Region Filter Support | Recommendations | Multi-Policy | Autostopping (EC2/VM/Instance) | Perspective Preferences |
|-------|------------------|---------------------------------|------------------|-----------------|--------------------------------|--------------------------|
| AWS   | `aws.ec2`, `aws.ebs`, `aws.rds`, `aws.ebs-snapshot`, `aws.elastic-ip`, `aws.elb`, `cache-cluster`, `s3`, `redshift`, `redshift-snapshot`, `aws.log-group`, `aws.rds-snapshot`, `aws.nat-gateway`, `aws.sqs`, `aws.firehose`, `aws.dynamodb-table` | Yes ✅ | Yes ✅ | Yes ✅ | Yes ✅ |  Yes ✅ |
| GCP   | `gcp.instance`, `gcp.disk`, `gcp.snapshot`, `gcp.sql-instance`, `gcp.image`, `gcp.loadbalancer-address`, `gcp.loadbalancer-forwarding-rule`, `gcp.bucket`, `gcp.gke-cluster`, `gcp.bq-dataset`, `gcp.function`, `gcp.redis`, `gcp.cloud-run-service`, `gcp.dataflow-job` | No ❌                             | Yes ✅               | Yes ✅         | No ❌ |  Yes ✅ |
| Azure | Every Resource in Billing Report | Yes ✅ | Yes ✅ | Yes ✅ | No ❌ |  Yes ✅ |

### Cost Correlation Refresh API
This API is used to refresh or update the cost of all resources in the evaluation. It is exposed to resolve cases where the cost for any resource is not yet part of CUR, Billing Report, or Billing Data (due to newly deployed resources, etc.).You can hit the refresh cost button only once every 30 minutes for any evaluation.

:::note
- Cost co-relation for GCP would work only if detailed billing export is setup.
- Changes made to "Perspective Preferences" in Account Settings of Cloud Cost Management will be now applied to Asset Governance. In case of AWS, previously, costs were taken as "Unblended". Now, users can select it to be Blended, Net-Amortised, Amortised, Effective or Unblended. Kindly note, it might take up to 30 minutes for costs to be refreshed after changes are applied.
- Azure Preferences set in Account Settings will now also be honored.
:::
