---
title: Azure VM recommendations
description: Optimize the utilization of your Azure VMs using Harness CCM recommendations.
# sidebar_position: 2
---

# Optimize Azure VM costs with recommendations

An effective way to reduce Azure VM costs is to optimize VM utilization. This involves resizing idle or underutilized VMs based on active tasks and shutting down unused VMs.

Virtual machines are considered low-utilization:

* If their CPU utilization is 5 percent or less and their network utilization is less than 2 percent and have threshold memory pressure numbers.

* If the current workload can be accommodated by a smaller sized virtual machine.

You can view the recommendations for your Azure VMs on the **Recommendations** page. 

:::note
Before using recommendations in your environment, ensure that you evaluate their impact thoroughly. The person reviewing the recommendations should be able to understand the impacts identified in the recommendations, as well as the impact on the infrastructure and business.

Using recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.
:::

## Before you begin

* Connect your Azure cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for Azure](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md).
* To obtain Azure VM recommendations, configure a Harness Azure CCM connector with the Cost Visibility and the Inventory Management features enabled. For more information, go to [Connect CCM to your Azure account](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md#connect-ccm-to-your-azure-account).
  
:::note
Enabling the **Visibility** feature allows retrieving recommendations from the Azure Advisor. The **Inventory Management** feature allows you to fetch the CPU utilization data and display the corresponding recommendations. If the Inventory Management feature is not enabled, the graph and table may show a null state.
:::

## How are Azure recommendations computed?

The recommendations are computed by analyzing the past CPU utilization. Harness CCM leverages the Azure Advisor recommendations. CCM uses the Azure APIs to retrieve data from the Azure account.

:::note
Azure Advisor automatically runs in the background to find newly created resources. It can take up to 24 hours to provide recommendations on those resources.
:::

### Configure Azure Advisor

You must configure Azure Advisor to receive recommendations for cost optimization. For more information, go to [Enable Azure recommendations](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md#enable-azure-recommendations).

## Types of Azure VM recommendations

Harness CCM provides two types of recommendations to optimize your VMs:

* **VM Rightsizing**: In this type of recommendation, CCM recommends resizing your VM based on usage. For information about the different types of Azure VMs, go to [Available instance types](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes). 

* **Shutdown**: In this type of recommendation, the instance is terminated or shutdown if not in use for a long time.  
  
## View your Azure recommendations

1. In **Harness**, go to the **Cloud Costs** module.
2. Select **Recommendations**.
3. Select the filter icon.
4. In the **Recommendation Type** dropdown list, select **AZURE_INSTANCE**.
5. Select **Apply**. 

  The recommendations for Azure VMs are displayed. 

6. Select a row to view the recommendations for that account.  
    
The CPU utilization graph shows the current utilization data. Go to [View and apply recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/home-recommendations#enable-azure-recommendations) to learn how to apply these recommendations.

