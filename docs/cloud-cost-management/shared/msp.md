---
title: Margin obfuscation
description: This feature enables managed service providers to efficiently establish profit margins for cloud providers on a per-customer, per-region, and per-service basis, streamlining the setup process.
# sidebar_position: 2
---

# Margin obfuscation for managed service providers (MSP)

Each managed service provider (MSP) works with multiple end customers who have Harness CACM customer accounts. The MSP has pre-negotiated discounted costs with each cloud service provider (CSP), which are reflected in the AWS CUR and Azure/GCP billing exports. Harness CACM retrieves these discounted costs from the billing exports.

In addition to the pre-negotiated discounted costs paid to each CSP, the MSP adds a margin that can vary based on the customer, CSP, and service. The MSP enters this margin per service to be added on top of the costs.

Harness CACM incorporates the pre-negotiated discounted costs per CSP and the additional margin per customer and service. As a result, end customers can view the cost per service per CSP as the MSP's negotiated cost plus the MSP margin.

## Prerequisites

1. Set up CACM for your CSP. Go to the following topics for more information: 

* [Set up CACM for AWS](../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md)
* [Set up CACM for GCP](../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-gcp.md)
* [Set up CACM for Azure](../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md)
* [Set up CACM for Kubernetes clusters](../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes.md)

2. Add customers to the Harness CACM account. Create [Harness Support](mailto:support@harness.io) tickets to add customers.


:::note
In its initial release, **Margin Obfuscation** is supported only on AWS.
:::


## Set Markup

![](./static/set-markup.gif)


To add a markup to your CSP cost of a managed account, perform the following steps: 

1. In your Harness application, go to **Cloud Costs**.
2. Select **Margin Obfuscation**.
3. Select **+ Set markup**.
4. Select the managed account.
5. In the **Resource Markups** section, specify the following details:

  * **Markup%** - Specify the markup percentage to add to the billing amount retrieved from the CSP.
  * **Scope** - Specify scope of the markup.
  
    1. Select the Cloud Service Provider.
    2. Select the accounts.
    3. Select the resource or service for which you want to set markup. You could use the search text box to search for a particular resource or service.
6. Select **Add**. You could add multiple markups for the same account if you want to set up different markup percentages for different services.
7. Select **Apply**.

## View the set markups 

The Summary area displays the following information: 
* **Total Markup Amount** - The total markup amount including all managed accounts.
* **Total Spend** — The total spend includes the CSP cost plus the markup amount.
* **Total Customers** — The total number of managed accounts set up for margin obfuscation.

The markup details of each customer: 

  The managed account name, the CSP accounts, the markup percentage, the markup amount, and the total spend are displayed. Expand to view all the markups for a customer. 
  
<DocImage path={require('./static/msp-home.png')} width="50%" height="50%" title="Click to view full size image" />

To view details of individual markups, select the customer.

  <DocImage path={require('./static/markup-details.png')} width="50%" height="50%" title="Click to view full size image" />

On this page, you can view the total markup amount and total spend associated with a specific customer. The Markup Vs Spend graph visually presents the markup amount and total spend based on the selected time filter.
## Edit Markups

To edit an existing markup, perform one of the following steps:

1. Select the more options menu (three vertical dots) available for the managed account, and then select **Edit**. The **Set Markup** window opens.

  (or)
  
  Select the managed account, and then select **Edit Markup** on the customer's markup details page. The **Set Markup** window opens.

2. Update the required fields. Go to [Set Markup](msp.md#set-markup) for more information.
3. Select **Apply**.
   