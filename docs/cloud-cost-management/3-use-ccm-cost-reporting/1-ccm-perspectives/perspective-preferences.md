---
title: Set up perspective preferences
description: Budgets allow you to set custom budgets and receive alerts when your costs exceed (or are forecasted to exceed) your budget.
sidebar_position: 3
---

With perspective preferences, you have the flexibility to tailor the cost data presented in your perspective. You can opt to include or exclude specific cost data provided by the Cloud Service Providers (CSPs) according to your needs and preferences. By including all cost data, any discrepancies between the CSP dashboards and Harness Perspectives can be avoided, ensuring accurate and comprehensive cost analysis.

## General preferences





## AWS preferences

When setting up your Perspective, the Preferences section allows you to include specific cost factors sourced from the AWS Cost and Usage Reports (AWS CUR). These selected cost factors will be incorporated into your Perspective for a more tailored and comprehensive view of your cloud costs. To change the default settings, go to the Default Settings page under Setup. 

* **Include Discounts**

  Includes any discounts that AWS applied to your usage. 
* **Include Credit**

  Includes any credits that AWS has applied to your bill. 
* **Include Refunds**

  Includes the negative charges that AWS refunded money for.
* **Include Taxes**

  Includes any taxes that AWS applied to your bill. For example, VAT or US sales tax.
* **Show costs as**

  * Net-amortised

    Net-Amortized Cost refers to the cost of using AWS resources after accounting for any upfront or upfront partial upfront payments made for reserved instances. It takes into consideration the amortization of upfront costs over the term of the reservation, which spreads the payment over time. 
  * Blended
  
    Blended Cost is the total cost of using AWS services, which includes both upfront and usage-based charges, divided by the total number of usage units. Blended rates are the rates associated with total usage in an organization averaged across accounts. For a line item, the blended cost is usage multiplied by the blended rate. The blended cost is the cost attributed to the account's usage as a linked account in an organization.
  * Unblended
  
    Unblended Cost is the direct cost incurred for using AWS services, without factoring in any upfront payments or volume discounts. Unblended rates are the rates associated with an individual account's service usage. For a line item, the unblended cost is usage multiplied by the unblended rate. The unblended cost would be the cost of the account's usage if it were a standalone account. 
    
  * Amortised

    Amortized Cost refers to the total upfront payment for reserved instances spread evenly over the term of the reservation. This method is used to allocate the upfront costs equally across the duration of the reservation, making it easier to analyze the cost distribution.
    
  * Effective

## GCP preferences

