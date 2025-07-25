---
title: Overview
description: Learn how to use recommendations to optimize your cloud costs.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Cloud Cost Management (CCM) provides tailored recommendations to help you optimize cloud spend and improve infrastructure efficiency. CCM analyzes historical resource usage and identifies opportunities to right-size, shut down, or better utilize resources across AWS, Azure, GCP, and Kubernetes environments.

---

Harness offers a range of recommendations to help you optimize your cloud costs and improve resource utilization. Here are the types of recommendations available (based on platform/resource type):

## Types of Recommendations
- **Azure VM Recommendations**: Detect underutilized virtual machines in Azure and suggest rightsizing or deallocation to avoid unnecessary spend.
- **AWS EC2 Recommendations**: Identify idle or oversized Amazon EC2 instances, recommending actions such as resizing or termination based on utilization.
- **AWS ECR Recommendations**: Surface unused container images in Amazon Elastic Container Registry, enabling cleanup to control storage costs.
- **Governance Recommendations**: Analyze cloud tagging, cost allocation, and compliance patterns to help enforce best practices across AWS, Azure, and GCP.
- **Node Pool Recommendations**: Review node pool configurations in Kubernetes clusters, suggesting optimal scaling and node types for performance and cost.
- **Workload Recommendations**: Highlight Kubernetes workloads with inefficient CPU or memory allocation, providing right-sizing guidance for containers.

---

Not all recommendation types are available for every cloud provider or resource. The following table summarizes where each recommendation type applies.

## Platform Coverage
| Cloud Platform | Azure VM | AWS EC2 | AWS ECR | Governance | Node Pool | Workload |
| -------------- | -------- | ------- | ------- | ---------- | --------- | -------- |
| **AWS**        | ❌       | ✅      | ✅      | ✅         | ✅        | ❌       |
| **Azure**      | ✅       | ❌      | ❌      | ✅         | ✅        | ❌       |
| **GCP**        | ❌       | ❌      | ❌      | ✅         | ✅        | ❌       |
| **Kubernetes** | ❌       | ❌      | ❌      | ❌         | ✅        | ✅       |

---

## How Recommendations Are Generated
Harness CCM analyzes your infrastructure usage data and surfaces optimization opportunities using a blend of cloud-native insights and Harness analytics. Recommendations are refreshed automatically every 24 hours to reflect the most recent utilization data from your connected cloud environments.

CCM generates recommendations through several methods:
- **Historical Utilization**: Analyzes CPU, memory, and network usage patterns over time to detect underutilized or overprovisioned resources.
- **Cloud Provider Insights**: Integrates with native services like AWS Cost Explorer and Azure Advisor, importing their recommendations and enhancing them with CCM-specific context for actionable guidance.
- **Statistical Analysis**: For Kubernetes workloads and node pools, CCM aggregates resource usage into histograms and applies statistical models to suggest optimal resource allocations and scaling.
- **Governance Analysis**: Reviews tagging, business units, and cloud policies to highlight resources that may not align with your governance or cost management standards.

You can filter recommendations by platform or resource type, and buffer thresholds can be customized to meet your organization’s reliability or risk preferences.

:::note
Recommendations are suggestions only—always review them in the context of your production and compliance requirements before making changes. Implementing changes without due diligence may affect performance or reliability.
:::

Recommendations for Kubernetes node pools are not generated for clusters using mixed instance families or managed by third-party scaling solutions such as spot.io.
Go to [Computation and Pricing Details](#computation-and-pricing-details) section below for more details.

---

## Computation and Pricing Details
<Tabs groupId="cloud-platform" queryString>
<TabItem value="aws" label="AWS">

### AWS

#### EC2 Recommendations
- **Source**: Harness retrieves instance recommendations directly from AWS Compute Optimizer and Cost Explorer APIs.
- **Analysis**: Recommendations are based on historical CPU and memory utilization. Memory metrics require the CloudWatch Agent or integration with a supported external tool (like Datadog).
- **Types**:  
  - *Instance resizing*: Recommendations to move within or across instance families based on actual resource needs.
  - *Decommissioning*: Idle instances flagged for shutdown.
- **Savings Calculation**: Follows AWS’s native methodology (no Reserved Instance/Savings Plan discounts). [Learn more](https://docs.aws.amazon.com/cost-management/latest/userguide/understanding-rr-calc.html#savings-calc).

#### ECS Recommendations
- **Source**: Harness computes ECS recommendations by collecting CPU/memory metrics every minute, aggregated into 20-minute “partial histograms.” These are merged for daily usage analysis.
- **Computation**: A default 15% buffer is applied (tunable in UI). All days in your selected time window are weighted equally to avoid skew from periodic spikes.
- **Example**: If your service’s 95th percentile CPU usage is 450 millicores, a recommendation might suggest a new CPU reservation of 517.5 millicores (450 + 15% buffer).

</TabItem>
<TabItem value="azure" label="Azure">

### Azure VM
- **Source**: Fetched directly from Azure Advisor through the Azure APIs.
- **Analysis**: Recommendations consider VMs with CPU utilization ≤ 5% and network usage ≤ 2% as idle. Advisor identifies candidates for rightsizing (changing SKU) or deallocation (shutdown).
- **Pricing**: Monthly VM cost is calculated as: `Max (retailPrice) × 730.5` (hours in a month).  
  - **Example:** If the max retail price for a SKU is $2.60/hr, monthly cost is $1,899. Savings are based on the difference between current and recommended SKUs, using Azure’s public pricing API.

</TabItem>
<TabItem value="gcp" label="GCP">

### Governance & Node Pool
- **Source**: Harness uses GCP APIs to gather cost allocation, tagging, and node pool configuration data.
- **Computation**: Node pool recommendations are generated from aggregated CPU and memory utilization patterns; governance recommendations leverage GCP resource labels and billing metadata.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

### Node Pool
- **Source**: Aggregates pod CPU/memory usage across node pools over a user-selected time window (1, 7, or 30 days).
- **Computation**: For each timestamp, the max CPU and memory usage/request per pod is computed and summed across all nodes. The highest observed values drive scaling and sizing suggestions.
- **Exclusions**: Recommendations skip node pools with autoscaling enabled or mixed instance types.

### Workload
- **Source**: Minute-by-minute usage is collected, aggregated into 20-minute histograms, and sent daily to Harness for processing.
- **Computation**: Recommendations can be set to cost-optimized (lower bound: 50th percentile, upper: 95th) or performance-optimized (max 95th percentile). A buffer (default 15%) and Kubernetes QoS (Burstable/Guaranteed) are both tunable in the UI.
- **Example**: If a container’s 95th percentile CPU is 1 vCPU and RAM is 3.5 GiB, a performance recommendation may propose setting requests to 1.15 vCPU and 4.0 GiB (adding the buffer).

</TabItem>
</Tabs>

---

Customize how recommendations are displayed and calculated using the following settings and preferences.

## Customize recommendation settings
:::note
Changes to Recommendation Preferences may take up to 24 hours to fully propagate across the platform. Adjustments are immediately visible on drill-down pages, while the Overview page may reflect updates with a delay.
:::

Recommendation settings in Harness CCM empower you to control how recommendations are generated and presented across your environments. The configuration is organized into two main areas: Preferences and Manage Presets.

### Preferences
Customize the general behavior of recommendations to match your organizational needs. The available options include:

**General Preferences**
- Show Recommendations on Parent Resources: Enable to receive recommendations for parent-level resources, such as Nodepools, EC2 instances, and ECS Services, ensuring that optimization opportunities at the infrastructure layer are surfaced.
- Show Recommendations on Child Resources: Display recommendations for individual workloads and application components, allowing for targeted optimizations.
- Show Recommendations on Resources Added to the Ignore List: If enabled, recommendations will be displayed even for resources that have been manually ignored.

**Resource-Specific Preferences**
- Configure default time ranges and presets for each resource type, enabling you to tailor the analysis window and recommendation style to your operational standards.

### Manage presets
:::note
Harness CCM provides default presets for all resources. To customize recommendations, expand the “Tune Recommendations” section on a recommendation card to configure and save custom values.
:::

Manage Presets allows you to create and store reusable configuration profiles for different resource types. Presets capture custom tuning parameters—such as buffer percentages, instance selection scope, and resource quality settings—which can then be quickly applied across your environment.

**Key Benefits:**
- **Time-Saving Automation:** Presets eliminate the need for manual adjustment whenever recommendations are generated.
- **Flexibility and Customization:** Maintain distinct presets for different workloads, environments, or use cases, and apply them as needed.
- **Simplified Experience:** Presets make it easier to manage and control recommendation settings in a consistent and scalable manner.

<Tabs groupId="preset-type" queryString>
<TabItem value="workload" label="Kubernetes Workload">

- **Quality of Service (QoS):** Define the default QoS class (Burstable or Guaranteed) for workload recommendations.
- **CPU/Memory Buffer Percentage:** Set buffer values to ensure recommendations are aligned with your reliability or performance needs.
</TabItem>
<TabItem value="nodepool" label="Kubernetes Nodepools">

- **Minimum Node Count:** Establish a baseline for node pool scaling.
- **CPU/Memory Buffer Percentage:** Define buffers for recommended resource allocation.
</TabItem>
<TabItem value="ecs" label="Amazon ECS">

- **CPU/Memory Buffer Percentage:** Adjust buffer percentages to fine-tune recommendations for Fargate and EC2 Spot workloads.
</TabItem>
<TabItem value="ec2" label="Amazon EC2">

- **Instance Family Scope:**
- **Within Same Instance Family:** Restrict recommendations to compatible instance types, minimizing migration complexity.
- **Across Instance Families:** Allow recommendations to suggest the most optimal instance types, even across different families, for maximum potential savings.
</TabItem>
</Tabs>


## Ignore list
You can put any **EC2 instance**, **VM**, **Service**, **Nodepool**, **Workload**, **Governance** recommendation in an **Ignore List**. Adding resources to the **Ignore List** will stop Harness from displaying recommendations for those resources. You can view the **Ignore List** with details by clicking on "Manage Ignore List" on the overview page.

:::note
For Governance, we support [Granular Recommendations](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/aws/aws-recommendations#granular-recommendations). Owing to this, now, while adding a recommendation to Ignore List, users have the option to specify the scope at which the users want to ignore the recommendation. 
:::

Some resources should not receive recommendations—add them to the Ignore List to keep your dashboard focused.

---

## Filtering
CCM provides filtering capabilities to help you quickly find and act on relevant recommendations.

- **AWS EC2**: Filtering is supported on AWS Account ID. Nested Cost Categories are not supported.  
- **AWS ECS**: Filtering is supported on AWS Account ID. Nested Cost Categories are not supported.  
- **Azure VM**: Filtering is not supported.  
- **Kubernetes**: Filtering is supported on Labels and Cluster Name. Nested Cost Categories are not supported.  
- **Governance Recommendations**:
  -   **AWS**: No filtering support.  
  -   **Azure**: No filtering support.  
  -   **GCP**: No filtering support.  

:::note
Filtering support for recommendations extends to **RBAC configurations based on perspective folder access settings**, ensuring that cost-saving suggestions are appropriately scoped to the right teams. 
:::

---

## Get started
Enable, view, and apply your recommendations by selecting **Recommendations** in the Cloud Costs module. Recommendations will appear automatically based on your connected cloud resources.
For specific recommendation guidance, go to [**Configure Recommendations**](/docs/cloud-cost-management/cost-optimization/recommendations/configure-recommendations).