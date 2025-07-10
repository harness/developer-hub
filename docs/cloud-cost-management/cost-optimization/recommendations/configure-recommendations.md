---
title: Configure Recommendations
description: Learn how to configure recommendations to optimize your cloud costs.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Cloud Cost Management (CCM) recommendations help you identify opportunities to optimize your cloud spend and improve resource efficiency. These automated insights analyze your usage patterns and suggest actionable steps to reduce costs across your cloud environments.

## Types of recommendations
- **Azure VM Recommendations**: Identify underutilized virtual machines in your Azure environment and suggest rightsizing or termination to reduce spend.
- **AWS EC2 Recommendations**: Analyze EC2 usage to detect idle or oversized instances, offering guidance to optimize instance types or stop them altogether.
- **AWS ECR Recommendations**: Highlight unused container images in Amazon Elastic Container Registry and recommend cleanup actions.
- **Governance Recommendations**: Provide cost governance insights based on tagging, business units, and spending patterns across AWS, GCP, and Azure.
- **Node Pool Recommendations**: Recommend better node pool configurations for your Kubernetes clusters to balance cost and performance, with cloud-specific requirements.
- **Workload Recommendations**: Target inefficient Kubernetes workloads by analyzing CPU/memory utilization and proposing updated resource requests/limits.

---

## Platform Coverage
| Cloud Platform | Azure VM | AWS EC2 | AWS ECR | Governance | Node Pool | Workload |
|----------------|----------|---------|---------|------------|------------|----------|
| **AWS**        | ❌       | ✅      | ✅      | ✅         | ✅         | ❌       |
| **Azure**      | ✅       | ❌      | ❌      | ✅         | ✅         | ❌       |
| **GCP**        | ❌       | ❌      | ❌      | ✅         | ✅         | ❌       |
| **Kubernetes** | ❌       | ❌      | ❌      | ❌         | ✅         | ✅       |

---

:::tip
Use this page to adjust the thresholds used by Harness CCM to generate recommendations for AWS, Azure, Kubernetes, and ECS workloads. You can tune buffer percentages and set platform-specific parameters to better align recommendations with your infrastructure and risk tolerance.
:::

---

The following topics provide step-by-step instructions for configuring recommendations for each cloud platform, 

## Before you begin
Before enabling recommendations, ensure your cloud environments are connected and the correct features are enabled. Go to [Get Started](#) to connect your cloud provider.

<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">
<Tabs groupId="recommendation-type" queryString>
<TabItem value="ec2" label="EC2">

- Connect your AWS cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for AWS](#).
- To obtain EC2 recommendations, configure a Harness AWS CCM connector with the Inventory Management feature enabled.
- Go to [Perspectives](/docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives) to learn how to create perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.
</TabItem>
<TabItem value="ecs" label="ECS">

- Go to [Perspectives](docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives) to learn how to create perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.

- Configure an AWS CCM Connector with the Inventory Management feature enabled to get ECS recommendations.

:::info delegate not required
No Delegate setup is required. All utilization metrics are obtained using a cross account IAM role.
See [Set Up Cloud Cost Management for AWS](#).
:::

</TabItem>
</Tabs>
</TabItem>
<TabItem value="azure" label="Azure">

- Connect your Azure cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for Azure](#).
- To obtain Azure VM recommendations, configure a Harness Azure CCM connector with the Cost Visibility and the Inventory Management features enabled. For more information, go to [Connect CCM to your Azure account](#).
  
:::note
Enabling the **Visibility** feature allows retrieving recommendations from the Azure Advisor. The **Inventory Management** feature allows you to fetch the CPU utilization data and display the corresponding recommendations. If the Inventory Management feature is not enabled, the graph and table may show a null state.
:::

</TabItem>
<TabItem value="gcp" label="GCP">
Placeholder for GCP recommendation prerequisites
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Nodepool and workload prerequisites:
* [Set Up Cloud Cost Management for Kubernetes](#)
* [CCM Perspectives](#)

Harness CCM uses labels to process node pool recommendations. Make sure to add one of the labels listed in the following table for the respective cloud providers:

</TabItem>
</Tabs>

---
## Enable recommendations
Recommendations are enabled as part of your cloud connector configuration. To enable recommendations for a cloud platform, follow the instructions [add a new connector](#get-started) or edit an existing one by:

1. Select **Account settings** from the left navigation.
2. Select **Connectors**.
3. Select an existing **Cloud cost connector**.
4. Select **Edit details**.
5. Follow the connector configuration wizard and select **Resource inventory management** from the **Choose requirements** step.

:::info aws cost reporter
For AWS connectors, you must also enable the **Cost Explorer** permissions to the CCM template, see the **Create cross account role** section step in the configuration wizard.
:::

---

## View recommendations
<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">
aws
</TabItem>
<TabItem value="azure" label="Azure">
azure
</TabItem>
<TabItem value="gcp" label="GCP">
gcp
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
kubernetes
</TabItem>
</Tabs>

---

## Recommendation settings
<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">
aws
</TabItem>
<TabItem value="azure" label="Azure">
azure
</TabItem>
<TabItem value="gcp" label="GCP">
gcp
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
kubernetes
</TabItem>
</Tabs>

---

## Apply recommendations
<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">
aws
</TabItem>
<TabItem value="azure" label="Azure">
azure
</TabItem>
<TabItem value="gcp" label="GCP">
gcp
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
kubernetes
</TabItem>
</Tabs>

---

## Governance
Harness Cloud Asset Governance provides tools to optimize your cloud spend and avoid unnecessary costs. By leveraging these recommendations, you can better control your cloud expenses while ensuring that your cloud infrastructure is optimized for maximum efficiency and cost-effectiveness.

The following resources can be optimized with Asset Governance:

<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">

- EC2 instances
- EBS
- ELB
- Cache-cluster
- S3 buckets
- Lambda functions
- RDS (Relational Database Service) instances
- CloudFormation stacks

Go to [AWS Asset Governance](/docs/cloud-cost-management/governance/asset-governance) to view all the AWS recommendations.
</TabItem>
<TabItem value="azure" label="Azure">

- Virtual Machines (VMs)
- Storage accounts
- App services
- Cosmos DB accounts
- SQL server
- PostgreSQL servers
- Key Vaults

Go to [Azure Asset Governance](/docs/cloud-cost-management/governance/asset-governance) to view all the Azure recommendations.
</TabItem>
<TabItem value="gcp" label="GCP">

- Compute Engine instances
- Cloud Storage buckets
- App Engine applications
- Cloud SQL instances
- Cloud IAM policies

Go to [GCP Asset Governance](/docs/cloud-cost-management/governance/asset-governance) to view all the GCP recommendations.
</TabItem>
</Tabs>

### Enable governance
Similarly to other cloud recommendations, **Cloud governance** is enabled as part of your cloud connector configuration. To enable governance for your cloud platform, follow the instructions [add a new connector](#get-started) or edit an existing one by:

1. Select **Account settings** from the left navigation.
2. Select **Connectors**.
3. Select an existing **Cloud cost connector**.
4. Select **Edit details**.
5. Follow the connector configuration wizard and select **Cloud governance** from the **Choose requirements** step.

### View cost governance recommendations
1. In Harness, go to the Cloud Costs module.
2. Click **Recommendations**.
3. There are two tabs present on the window - "Open Recommendations" and "Applied Recommendations". Open Recommendation tab shows all the recommendations that are currently available for applying and the potential monthly savings that the user can achieve if they are applied. On the other hand, Applied Recommendations show all the recommendations that have already been applied and the total savings achieved with their application.
4. The recommendations window allows you to put filters on the recommendations to see the result as per convenience. Kindly choose "Governance" in "Recommendation Type" filter for all governance recommendations. Currently, these are filters supported: