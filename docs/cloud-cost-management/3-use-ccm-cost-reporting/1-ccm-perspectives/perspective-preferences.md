---
title: Set up perspective preferences
description: Budgets allow you to set custom budgets and receive alerts when your costs exceed (or are forecasted to exceed) your budget.
sidebar_position: 3
---

With perspective preferences, you have the flexibility to tailor the cost data presented in your perspective. You can opt to include or exclude specific cost data provided by the Cloud Service Providers (CSPs) according to your needs and preferences. By including all cost data, any discrepancies between the CSP dashboards and Harness Perspectives can be avoided, ensuring accurate and comprehensive cost analysis.

You can configure perspective preferences in the **Default Settings** page **Setup**. You can override these settings at the perspective level if needed.


:::important Note
Remember that any changes made to these settings will affect all CCM perspectives. To ensure smooth operations, it is advisable not to update these settings frequently. If changes are necessary, it's recommended to allow a time gap of at least 5 minutes between updates. 
:::


## General preferences

The following preferences settings are applicable to all perspectives. By default, some of these preferences are enabled. However, you could choose to disable or enable these preferences in individual perspectives. 

* **Show anomalies**

 Displays the anomalies in the perspective. This option is enabled by default. For more information about cloud cost anomalies, go to [Detect anomalies](../4-detect-cloud-cost-anomalies-with-ccm.md).

* **Show Others**

  The graphs displayed in a Perspective show the top 12 costs only. The remaining data is displayed as **Others**.
  **Others** is always the total cost minus the top 12 costs listed in the graph you are viewing.
  
  You can also enable **Show Others** in the Perspective chart:
  
    ![](./static/create-cost-perspectives-24.png)
    
  Edit the perspective and enable the **Show Others** option in **Preferences** to make it persist in the perspective.

* **Show "unallocated" costs on clusters**

  In certain graphs, you may come across an item labeled as **Unallocated**. This entry is included to provide a comprehensive view of all costs. When you examine the **Total Cost** in the perspective, it encompasses the costs of all items, including the unallocated cost. This option is available only in perspectives with cluster rules.
  
    ![](./static/create-cost-perspectives-25.png)
    
  The **Show "unallocated" costs on clusters** option is only available in the chart when the **Group By** is using **Cluster** and the following options are selected:
  
  * Namespace
  * Namespace ID
  * Workload
  * Workload ID
  * ECS Task
  * ECS Task ID
  * ECS Service ID
  * ECS Service
  * ECS Launch Type ID
  * ECS Launch Type

To know how to analyze your cluster perspective data, go to [Analyze cost for Kubernetes or AWS ECS](../3-root-cost-analysis/analyze-cost-for-k8s-ecs-using-perspectives.md).
## AWS preferences

When creating your perspective, the **Preferences** section allows you to include specific cost factors sourced from the AWS Cost and Usage Reports (AWS CUR). These selected cost factors will be incorporated into your perspective for a more tailored and comprehensive view of your cloud costs. To change the default settings, go to the **Default Settings** page under **Setup**. 

* **Include Discounts**: Includes any discounts that AWS applied to your usage. Selected by default.
* **Include Credit**: Includes any credits that AWS has applied to your bill. Selected by default.
* **Include Refunds**: Includes the negative charges that AWS refunded money for. Selected by default.
* **Include Taxes**: Includes any taxes that AWS applied to your bill. For example, VAT or US sales tax. Selected by default.
* **Show costs as**: The following are the various AWS cost types supported by Perspectives.

  * **Net-amortised**

    Net-Amortized Cost in AWS is the actual cost of using resources, accounting for upfront payments made for Reserved Instances. It evenly spreads the upfront costs over the reservation term, considers monthly fees, and includes discounts like RI volume discounts. 

  * **Blended**
  
    Blended Cost is the total cost of using AWS services, which includes both upfront and usage-based charges, divided by the total number of usage units. Blended rates are the rates associated with total usage in an organization averaged across accounts. For a line item, the blended cost is usage multiplied by the blended rate. The blended cost is the cost attributed to the account's usage as a linked account in an organization. It’s the default option for analyzing costs using AWS Cost Explorer or setting custom budgets using AWS Budgets.

  * **Unblended**
  
    A vast majority of AWS customers use the unblended cost dataset to understand their usage. This is the default cost type.Unblended cost is the direct cost incurred for using AWS services, without factoring in any upfront payments or volume discounts. Unblended rates are the rates associated with an individual account's service usage. For a line item, the unblended cost is usage multiplied by the unblended rate. The unblended cost would be the cost of the account's usage if it were a standalone account. Unblended costs represent your usage costs on the day they are charged to you. In finance terms, they represent your costs on a cash basis of accounting.
    
  * **Amortised**

    Amortized Cost refers to the total upfront payment for reserved instances spread evenly over the term of the reservation. This method is used to allocate the upfront costs equally across the duration of the reservation, making it easier to analyze the cost distribution.
    
      For example, Alejandro decides to buy a Partial Upfront t2.micro Reserved Instance (RI) with a one-year term. The upfront cost for this RI is $30, which he pays at the beginning. Additionally, there is a monthly fee of $2.48 associated with the RI. In this case, the Cost Explorer chart will show Alejandro's RI costs as a spike on the first day of each month. This spike represents the monthly fee of $2.48 being charged. When Alejandro chooses "Amortized costs" in the Cost Explorer settings, it provides a different perspective on the cost data. Amortization is a process of spreading the upfront cost of a reserved instance over its duration (one year in this case). Instead of showing a large upfront cost, Amortized costs evenly distribute the upfront cost over the term of the RI. Selecting **Amortized costs** and considering a 30-day month, the Cost Explorer chart will display a daily effective rate. This daily effective rate is calculated by taking the EC2 effective rate (which is the hourly cost of running an instance) and multiplying it by the number of hours in a day. So, if the EC2 effective rate for the t2.micro instance is $0.165 per hour, the daily effective rate will be $0.165 multiplied by 24 hours, resulting in $3.96.
    
  * **Effective**

    Effective Cost, in the context of Reserved Instances (RI), is the average hourly rate obtained by combining both the upfront payment and the hourly rate. `EffectiveCost` is calculated by adding the `amortizedUpfrontCostForUsage` to the `recurringFeeForUsage`. 

#### AWS Cost Types relationship with LineItemType
Currently, Harness CCM considers only three types of discounts under the LineItemType:

* **BundledDiscount**: A usage-based discount that provides free or discounted usage of a service or feature based on the usage of another service or feature.

* **PrivateRateDiscount**: Discount provided by AWS for using private pricing rates. When customers negotiate custom pricing with AWS, they may receive discounted rates for specific services based on their agreement.

* **EdpDiscount**: Discounts associated with the use of AWS Enterprise Discount Program (EDP). The AWS Enterprise Discount Program offers volume-based discounts to customers who commit to certain usage levels and financial commitments with AWS.

<!--The table below provides details on the AWS `LineItemType` that is associated or utilized with each AWS cost type: 

| **AWS Cost Type**  | **Discount** | **Refund** | **Tax** | **Credit** |
| --- | --- | --- | --- | --- |
-->

To know how to analyze the AWS perspective data, go to [Analyze cost for AWS](../3-root-cost-analysis/analyze-cost-for-aws.md).
## GCP preferences
The following cost factors retrieved from your GCP Billing Export data can be included or excluded in your perspectives for a more comprehensive view of your cloud costs.
* **Include Discounts**: Includes any discounts that GCP applied to your usage. 
* **Include Taxes**: Includes any taxes that GCP applied to your bill. For example, VAT or US sales tax. Selected by default.
  
To know how to analyze the perspective data, go to [Analyze cost for GCP](../3-root-cost-analysis/analyze-cost-for-gcp-using-perspectives.md).