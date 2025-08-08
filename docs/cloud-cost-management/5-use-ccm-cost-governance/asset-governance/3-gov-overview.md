---
title: Summary of Your Asset Governance Rules
sidebar_label: Asset Governance Overview Page
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 3
---
import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::tip [Latest Features Released in 1.48.1](/release-notes/cloud-cost-management#april-2025---version-1481)
<Tabs>
  <TabItem value="Alerts for Rule Evaluations" label="Alerts for Rule Evaluations">
  [Docs](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/gov-overview#governance-alerts)
  Users can now configure alerts in Cloud Assets Governance based on customizable criteria such as cloud provider, resource type, cloud accounts (AWS accounts, Azure subscriptions, or GCP projects), minimum number of resources found, and minimum cost impact. When an alert is triggered, users can specify email recipients to be notified and optionally include a `.json` file with detailed evaluation output.
  </TabItem>
</Tabs>
:::

The **Overview** page offers a consolidated summary of your organization's governance active enforcements, evaluations and cost savings resulting from rule evaluations.This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings.

## Asset Governance Overview

Here is an in-depth explanation of the Overview page and the information it displays for the users:

<DocImage path={require('./static/ag-overview.png')} width="120%" height="120%" title="Click to view full size image" />

- **Total Evaluations** — The total number of evaluations performed to date.
- **Total Active Enforcements** — The total number of active enforcements created to date.
- **Total Savings** — The total cost savings achieved from day one to date.
- **Savings in Timeframe** — The total cost savings achieved in the timeframe selected.
- **Evaluations in Timeframe** — Harness supports multiple statuses for Evaluations. The overview page now displays a detailed breakdown of evaluation counts by status. - Total Evaluations: The total number of evaluations in the timeframe selected. - Success Evaluations: Total number of evaluations with status as "Successful". - Failure Evaluations: Total number of evaluations with status as "Failure". - Partial Success Evaluations: Total number of evaluations with status as "Partial Success".
- **Alerts** - Option to create alerts for rule evaluations. 
- **Savings Breakdown** — A granular graph that shows savings breakdown across different cloud providers and resources. You can see savings broken down by:
  - **Cloud Provider**: This shows total cost savings for each cloud provider.
  - **Resource Type**: This shows total cost savings by resource type .
- **Evaluations Trend** - This graph shows evaluations performed per day in the selected timeframe. If timeframe is selected for more than 2 months, the evaluations are shown per month in the selected timeframe. Also, evaluations along with their status i.e. "Success", "Partial Success" and "Failed" are shown.
- **Recommendations** - Governance Overview displays a list of all recommendations that can help optimize the cloud assets and minimize cloud costs. Governance Overview highlights the total potential savings that can be achieved if all recommendations are applied.
  Additional to this, for each recommendation, Harness shows more details like: 
  - **Potential Monthly Savings**: Monthly cost savings that can be realized if the recommendations are applied.
  - **Potential Monthly Spend**: Potential Monthly Spend is the monthly spend for all the resources that surfaced out as part of recommendations. Why potential? Because the resource might be newly added and Harness looks at the last 30 days of cost data which might not be present for all the days for newly created resources. 
  - **Resource Count**: Number of resources to which the recommendation will be applied.
  - **Ignored list tag** if the recommendation is added to the "Ignored list". - Option to **view details** about the recommendation like which Account (in case of Azure, AWS)/ Project (in case of GCP), resource (AWS, Azure) the recommendation was applied to, the enforcements, etc. 
  - **Custom Recommendations**: All Custom Recommendations show up with a "Custom" badge after successful creation.

  :::important note
- In case of AWS and Azure, Account/ Subscription and region combination with greater than 300$ of monthly spend are considered for recommendations.
- In case of GCP, Project with greater than 300$ of monthly spend is considered for recommendations.
  :::

To apply a recommendation, select the row. The recommendation opens on the **Recommendations** page. To learn how to enforce this recommendation, go to [Governance recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/governance).

You can see a list of all recommendations offered by Harness for each Cloud provider here:

- [Asset Governance recommendations for AWS](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/aws/AWS-recommendations)
- [Asset Governance recommendations for Azure](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/azure/azure-recommendations)
- [Asset Governance recommendations for GCP](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/gcp/gcp-recommendations)


## Rules Generating Recommendations

### Customizing Governance Rules

Harness CCM provides flexibility in how governance rules are applied across your organization. You can define custom default rules to enforce globally or for specific account subsets and control which accounts are subject to specific governance policies

#### Adding Rules to Generate Recommendations

1. Click on "Rules Generating Recommendations" tab. Click the **+Include Rule** button to add an existing cost governance rule
2. Select the scope for recommendation generation:
   - **All Subscriptions**: Apply the rule across your entire environment
   - **Only Specific Subscriptions**: Target the rule to selected accounts

### Managing Governance Rules

Once rules are added, the governance dashboard displays the following information for each rule:

| Column | Description |
|--------|-------------|
| Name | The name of the governance rule |
| Target | Which accounts/subscriptions the rule applies to |
| Last Evaluation | When the rule was last processed |
| Recommendations | Number of recommendations generated |
| Potential Savings | Estimated cost savings if recommendations are implemented |
| Success Rate | Percentage of successful rule evaluations |

For each rule, you can:
- Modify target subscriptions
- Remove the rule from generating recommendations
- View detailed rule performance metrics

> **Note**: Only users with appropriate permissions can define default rules for groups or modify global governance policies.

### Governance Alerts

Alerts allow you to receive notifications when certain conditions are met during governance evaluations. These conditions can be fine-tuned based on cloud providers, resource types, account/subscription/project , cost impact, and resource count.

<DocImage path={require('./static/gov-alerts.png')} width="80%" height="80%" title="Click to view full size image" />

You can create alerts by defining the following parameters:

| Parameter                          | Description |
|-----------------------------------|-------------|
| **Cloud Provider**                | Choose the cloud platform(s) where the policy evaluation should trigger an alert: **AWS**, **GCP**, or **Azure**. |
| **Resource Type**                 | Select the type of resources to monitor. These are defined based on [Cloud Custodian](https://cloudcustodian.io/) resource types. |
| **Accounts / Subscriptions / Projects** | Specify the scope of the alert: **AWS accounts**, **Azure subscriptions**, or **GCP projects**. |
| **Minimum Number of Resources Found** | Set the threshold for the number of resources. |
| **Minimum Cost Impact**           | Set minimum cost impact associated with an evaluation. |
| **Email Recipients**              | Enter one or more email addresses to receive alert notifications. |
| **Attach Evaluation Output**      | Enable this to **attach a `.json` file** containing the full evaluation output in the email. Useful for automated analysis or deep dives. |


- **Granular RBAC for Governance Alerts**: You can assign granular permissions for Governance Alerts to specific resource groups and roles, enabling more precise access control. 
  
  **For Resource Groups:**
  1. Navigate to **Account Settings** > **Access Control** > **Resource Groups**
  2. Select an existing Resource Group or create a new one
  3. Enable the **Cloud Asset Governance Alerts** permission
  4. Choose between **All** alerts or **Specified** alerts for more granular control
  
  <DocImage path={require('./static/rg-granular.png')} width="90%" height="90%" title="Click to view full-size image" />

  **For Roles:**
  1. Navigate to **Account Settings** > **Access Control** > **Roles**
  2. Select an existing Role or create a new one
  3. Enable the **Cloud Asset Governance Alerts** permission
  4. Assign specific permissions such as **View** or **Edit/Delete**

 <DocImage path={require('./static/rbac-alerts.png')} width="90%" height="90%" title="Click to view full-size image" />


## Cost Correlation

### What’s supported

| Cloud | Cost Correlation                                                                                                                                                                                                                                                         | First Class Region Filter Support | Recommendations | Multi-Policy | Autostopping (EC2/VM/Instance) | Perspective Preferences |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | --------------- | ------------ | ------------------------------ | ----------------------- |
| AWS   | `aws.ec2`, `aws.ebs`, `aws.rds`, `aws.ebs-snapshot`, `aws.elastic-ip`, `aws.elb`, `cache-cluster`, `s3`, `redshift`, `redshift-snapshot`, `aws.log-group`, `aws.rds-snapshot`, `aws.nat-gateway`, `aws.sqs`, `aws.firehose`, `aws.dynamodb-table`                        | Yes ✅                            | Yes ✅          | Yes ✅       | Yes ✅                         | Yes ✅                  |
| GCP   | `gcp.instance`, `gcp.disk`, `gcp.snapshot`, `gcp.sql-instance`, `gcp.image`, `gcp.loadbalancer-address`, `gcp.loadbalancer-forwarding-rule`, `gcp.bucket`, `gcp.gke-cluster`, `gcp.bq-dataset`, `gcp.function`, `gcp.redis`, `gcp.cloud-run-service`, `gcp.dataflow-job` | No ❌                             | Yes ✅          | Yes ✅       | No ❌                          | Yes ✅                  |
| Azure | Every Resource in Billing Report                                                                                                                                                                                                                                         | Yes ✅                            | Yes ✅          | Yes ✅       | No ❌                          | Yes ✅                  |

### Cost Correlation Refresh API

This API is used to refresh or update the cost of all resources in the evaluation. It is exposed to resolve cases where the cost for any resource is not yet part of CUR, Billing Report, or Billing Data (due to newly deployed resources, etc.).You can hit the refresh cost button only once every 30 minutes for any evaluation.

:::note

- Cost co-relation for GCP would work only if detailed billing export is setup.
- Changes made to "Perspective Preferences" in Account Settings of Cloud Cost Management will be now applied to Asset Governance. In case of AWS, previously, costs were taken as "Unblended". Now, users can select it to be Blended, Net-Amortised, Amortised, Effective or Unblended. Kindly note, it might take up to 30 minutes for costs to be refreshed after changes are applied.
- Azure Preferences set in Account Settings will now also be honored.
  :::
