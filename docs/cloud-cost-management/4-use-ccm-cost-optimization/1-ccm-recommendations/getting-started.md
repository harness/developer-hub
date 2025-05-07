---
title: Getting Started 
description: Learn how to set up and use Harness CCM recommendations for different cloud resources.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Before you can start using CCM recommendations, ensure you have:

- A Harness account with CCM module enabled
- Access to the cloud accounts you want to monitor

## Setting Up CCM Connectors

The first step to accessing recommendations is setting up the appropriate CCM connectors for your cloud providers. Each connector type requires specific configurations to enable recommendations.


### Kubernetes Connector Setup

1. Navigate to **Setup** > **Connectors** > **New Connector**
2. Select **Kubernetes Cluster** as the connector type
3. Configure the connector with the following settings:
   - **Name**: Provide a meaningful name
   - **Authentication**: Choose the appropriate method for your cluster
   - **Features**: Enable **Cost Visibility**

:::tip
For detailed instructions, see [Set up Cloud Cost Management for Kubernetes](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes).
:::

  </TabItem>
</Tabs>

## Enabling Recommendations by Resource Type

After setting up your connectors, you need to ensure specific features are enabled to receive recommendations for different resource types.

### AWS EC2 Recommendations

**Requirements:**
- AWS CCM connector with **Inventory Management** feature enabled
- Cost Visibility properly configured

**Setup Steps:**
1. Connect your AWS cloud account in Harness and set up CCM for cost management
2. Configure a Harness AWS CCM connector with the Inventory Management feature enabled
3. Wait 24-48 hours for initial data collection and analysis
4. Navigate to **Cloud Costs** > **Recommendations** to view EC2 recommendations

**Additional Capabilities:**
- Create [Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives) to group EC2 resources in ways meaningful to your business

### AWS ECS Recommendations

**Requirements:**
- AWS CCM connector with **Inventory Management** feature enabled
- CCM Perspectives configured for container services

**Setup Steps:**
1. Ensure your AWS connector has Inventory Management enabled
2. No delegate setup is required as utilization metrics are obtained using a cross-account IAM role
3. Wait 24-48 hours for initial data collection and analysis
4. Navigate to **Cloud Costs** > **Recommendations** to view ECS recommendations

:::note
For detailed setup instructions, see [Set Up Cloud Cost Management for AWS](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws).
:::

### Azure VM Recommendations

**Requirements:**
- Azure CCM connector with **Cost Visibility** and **Inventory Management** features enabled

**Setup Steps:**
1. Verify your Azure connector has both required features enabled
2. Ensure proper permissions are assigned to the storage accounts
3. Wait 24-48 hours for initial data collection and analysis
4. Navigate to **Cloud Costs** > **Recommendations** to view Azure VM recommendations

:::important
For detailed permission requirements, see [Azure Storage Account Permissions](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure#assign-permissions-to-the-storage-accounts).
:::

### Kubernetes Nodepool Recommendations

**Requirements:**
- Kubernetes CCM setup completed
- CCM Perspectives configured for Kubernetes resources

**Setup Steps:**
1. Complete the [Kubernetes CCM setup](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)
2. Create appropriate Perspectives to organize your Kubernetes resources
3. Wait 24-48 hours for initial data collection and analysis
4. Navigate to **Cloud Costs** > **Recommendations** to view Nodepool recommendations

### Kubernetes Workload Recommendations

**Requirements:**
- Kubernetes CCM setup completed
- CCM Perspectives configured for Kubernetes resources

**Setup Steps:**
1. Complete the [Kubernetes CCM setup](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)
2. Create appropriate Perspectives to organize your Kubernetes workloads
3. Wait 24-48 hours for initial data collection and analysis
4. Navigate to **Cloud Costs** > **Recommendations** to view Workload recommendations

### Governance Recommendations

**Requirements:**
- CCM connector with **Cloud Governance** feature enabled
- Appropriate permissions configured in your cloud account

**Setup Steps:**
1. During connector setup, enable the Cloud Governance feature
2. Verify that you have added the required permissions in your cloud account
3. Wait 24-48 hours for initial policy evaluation
4. Navigate to **Cloud Costs** > **Recommendations** to view Governance recommendations

## Accessing Your Recommendations

Once your connectors are set up and data has been collected:

1. Navigate to **Cloud Costs** > **Recommendations**
2. View the list of available recommendations across all your resources
3. Use filters to narrow down recommendations by:
   - Resource type (EC2, ECS, VM, Nodepool, Workload)
   - Cloud provider (AWS, Azure, GCP)
   - Potential savings
   - And more

## Next Steps

After setting up recommendations:

- [Configure recommendation preferences](./overview.md#customizing-recommendations) to tailor them to your needs
- Create custom presets for different resource types
- Set up [ticketing integration](./overview.md#implementing-recommendations) to streamline implementation
- Regularly review and apply recommendations to maximize cloud cost savings

:::tip
For a comprehensive overview of all recommendation features and capabilities, see the [CCM Recommendations Overview](./overview.md).
:::