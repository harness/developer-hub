---
title: Overview
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cloud Asset Governance is a governance-as-code engine which allows you to define policy guardrails eliminating the need for manual approval flows which hamper productivity.  It helps you find non-compliant resources as defined in your standards from a cost, security and compliance standpoint. 

Cloud Asset Governance, while having the capability to service policies from other key use cases, focuses on helping you to optimize cloud spend and enhancing FinOps excellence. It supports a wide range of use cases: Auto-tagging, cleaning up of Orphaned resources and creating workflows around these policies.  By leveraging policy-as-code, it automates resource optimization, security, and compliance tasks, freeing your engineers to focus on creating innovative products and services that drive your revenue.

Cloud Asset Governance is built on top of the popular open source software Cloud Custodian, we have support for all 3 Major Cloud Service Providers: AWS, GCP and Azure.



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


### Harness vs Cloud Custodian

Cloud custodian is a widely used open-source cloud management tool backed by CNCF which helps organizations enforce policies and automate actions to enable them achieve a well maintained cloud environment. It operates on the principles of declarative YAML based policies. With support for multiple cloud providers, including AWS, Azure, and Google Cloud, Cloud Custodian enables users to maintain consistent policies and governance practices across diverse cloud environments, making it particularly appealing for organizations embracing a multi-cloud strategy.
 
Cloud Custodian comes with all the goodness of battle testing by the community & detects and auto remediates issues - it does come with its own set of challenges including lack of a graphical interface, scalability issues, limited reporting and security features, complex policy creation requiring YAML syntax knowledge, and operational overhead.

In contrast, Harness Cloud Asset Governance retains the strengths of Cloud Custodian while addressing its shortcomings. Harness provides preconfigured governance-as-code rules for easy implementation and customization, powered by an AI Development Assistant (AIDA™) for natural language policy authoring. It offers a fully managed and scalable rule execution engine, reducing operational complexities for organizations. 

The platform also includes a user-friendly visual interface, Role-Based Access Control, and detailed Audit trails for centralized visibility and precise access management. Additionally, Harness incorporates Out-of-the-Box Recommendations to identify cost-saving opportunities and improve compliance and security. By choosing Harness Cloud Asset Governance, organizations can optimize their cloud governance, enhance customization and usability, and overcome the challenges associated with self-hosting Cloud Custodian.

Harness Cloud Asset Governance streamlines cloud management processes, improves governance efficiency, and enables organizations to achieve a well-managed cloud environment effectively. More details about the comparison can be found [here](https://www.harness.io/blog/harness-cloud-asset-governance-cloud-custodian-beyond).

### Cloud-Custodian Versions at Harness

The cloud-custodian versions utilised currently are as following:
  - `c7n==0.9.44`
  - `c7n_azure==0.7.43`
  - `c7n_gcp==0.4.43`

