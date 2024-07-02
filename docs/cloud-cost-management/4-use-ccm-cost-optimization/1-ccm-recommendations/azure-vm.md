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

* Connect your Azure cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for Azure](../../get-started/onboarding-guide/set-up-cost-visibility-for-azure.md).
* To obtain Azure VM recommendations, configure a Harness Azure CCM connector with the Cost Visibility and the Inventory Management features enabled. For more information, go to [Connect CCM to your Azure account](../../get-started/onboarding-guide/set-up-cost-visibility-for-azure.md#connect-ccm-to-your-azure-account).
  
:::note
Enabling the **Visibility** feature allows retrieving recommendations from the Azure Advisor. The **Inventory Management** feature allows you to fetch the CPU utilization data and display the corresponding recommendations. If the Inventory Management feature is not enabled, the graph and table may show a null state.
:::

## How are Azure recommendations computed?

The recommendations are computed by analyzing the past CPU utilization. Harness CCM leverages the Azure Advisor recommendations. CCM uses the Azure APIs to retrieve data from the Azure account.

:::note
Azure Advisor automatically runs in the background to find newly created resources. It can take up to 24 hours to provide recommendations on those resources as well as the newly created connectors for existing VMs.
:::

### Configure Azure Advisor

You must configure Azure Advisor to receive recommendations for cost optimization. For more information, go to [Enable Azure recommendations](../../get-started/onboarding-guide/set-up-cost-visibility-for-azure.md#enable-azure-recommendations).

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
    
The CPU utilization graph shows the current utilization data. Go to [View and apply recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/azure-vm) to learn how to apply these recommendations.


## How Pricing Works for Azure VM Recommendations

To determine the pricing for Azure Virtual Machines (VMs), public pricing information from an official source, Azure Retail Prices, is used.

An API call is made in the format: `https://prices.azure.com/api/retail/prices?$filter=serviceName eq 'Virtual Machines' and priceType eq 'Consumption' and armSkuName eq '%s' and armRegionName eq '%s'`.

The SKU name and region name sourced from Azure Advisor recommendations. The price of the current VM is calculated by multiplying the maximum retail price by 730.5, representing the total hours in a month.

`Price of VM = max (retailPrice ) * 730.5`

Public pricing is relied upon as Azure Advisor also depends on this data to show savings for its recommendations.

### Calculating costs for Right Sizing Recommendation

For Right Sizing Recommendations, the highest price from all available retail prices for the current VM is selected. For the recommended VM, the savings provided by Azure Advisor are subtracted to determine its cost. The highest price is chosen to prevent cases where the cost of the recommended VM might be negative due to incorrect potential cost calculations.

Example:

Consider the given example of Standard_F32s_v2 in eastus2. Cost is given in form of [`https://prices.azure.com/api/retail/prices?$filter=serviceName eq 'Virtual Machines' and priceType eq 'Consumption' and armSkuName eq 'Standard_F32s_v2' and armRegionName eq 'eastus2`.](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20priceType%20eq%20%27Consumption%27%20and%20armSkuName%20eq%20%27Standard_F32s_v2%27%20and%20armRegionName%20eq%20%27eastus2%27)

Spot and Low Priority SKU's costs are filtered out and maximum cost hence received is 2.604 here.
```
Maximum Cost = 2.604
Total Cost =2.604* 730.5 = 1902.222$.
```

### Calculating costs for Shutdown Recommendation
Here whatever Azure Advisor tells the savings is, we consider that cost of current VM. Because its a shutdown recommendation. Here, Savings = Cost of VM.

:::info
The savings number shown in recommendation directly comes from Azure Advisor, Harness does not change it. 
:::

