---
title: Standardize your currency across CCM
description: Currency Preference allows you to view your entire CCM application in your preferred currency for different cloud providers. 
---



**_Note: The Currency Preference feature is currently in beta behind a feature flag and is available by request._**

Harness CCM allows you to view your cloud spend data in the currency of your choice. It is easier to view reports and dashboards in your preferred currency rather than having it in different currencies and then converting them to your preferred currency for the data displayed in the various dashboards for CCM. It provides more consistent, easy-to-consume, meaningful cloud analytics across the entire business. 

Presently, CCM allows you to choose from 16 different currencies and have the data displayed in the selected currency. After selecting the currency, CCM displays all the accounted costs in the specified currency.


## Before you begin

You must have signed up for your cloud accounts and the Harness CCM set up for your cloud accounts. For more information, refer to the following topics:

* [Set up cost visibility for AWS](https://developer.harness.io/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws)
* [Set up cost visibility for Azure](https://developer.harness.io/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-azure)
* [Set up cost visibility for GCP](https://developer.harness.io/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-gcp)
* [Set up cost visibility for Kubernetes](https://developer.harness.io/docs/cloud-cost-management/onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes)


## Setting up your preferred currency 

To standardize the currency in which your cloud cost data is displayed, perform the following steps:



1. In the Harness application, go to **Cloud Costs**. Under **Setup**, click **Currency Preferences**.
2. Select the currency from the **Currency followed on Cloud Cost Management** drop-down list. 


:::note
Once configured, you **cannot** change the currency settings. It takes up to 24 hours for you to be able to view the costs in the specified currency. Historical data is also converted and displayed in the preferred currency.
:::

1. You can use the default conversion factor or enter a custom value in the text box for each cloud service provider. This option is  useful when you have a predefined negotiated rate of conversion, or you want to use a fixed rate of conversion for reporting purposes.
2. Click **Save**. 
  
    The currency standardization process begins. On the **Perspectives** page, a banner displays the time and date by which the costs will be available in the selected currency.