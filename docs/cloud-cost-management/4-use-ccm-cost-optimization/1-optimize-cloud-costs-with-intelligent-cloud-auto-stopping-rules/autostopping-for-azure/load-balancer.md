---
title: Azure Application Gateway 
description: Describes how to create a new Application Gateway for Azure.
sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---
# Create an Application Gateway for Azure

Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications. Application Gateway can make routing decisions based on additional attributes of an HTTP request, for example, URI path or host headers.


## Create a New Application Gateway

You can either create a new application gateway when creating a new Autostopping rule or you can do so from Load Balancer Manager page. By using the second option, you can easily import the created gateway into your rule.

<DocImage path={require('./static/as-alb-azure.png')} width="100%" height="100%" title="Click to view full size image" />

1. In the AutoStopping overview page, click **Load Balancers** in the top right
2. Enter a name and select **Azure** in **Cloud Provider**
3. Choose a cloud connector or create a [new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure). 
4. Enter **Application Gateway Configuration**.
   - Region: The region where your target VM or the cloud resource is hosted.
   - Resource Group: A Resource Group (RG) in Azure is a logical container that holds related resources for a solution. In the context of an Azure Application Gateway, the resource group serves as the container for the various resources associated with the Application Gateway, such as: Virtual Machines (VMs), Storage Accounts, Networking Resources, etc.
   - Certificate (Optional)
   - Virtual Network: Azure Virtual Network is a service that provides the fundamental building block for your private network in Azure. VNet allows you to create and manage virtual private networks (VPNs) in the Azure cloud. 
   - Subnet: AppGateway subnet should only contain AppGateway, no other resources can be placed in this subnet.
   - Frontend IP
   - SKU
   - Azure Function Region
5. Click on **Save Load Balancer**.

This newly created application gateway can be imported in any new Autostopping rule. 

:::note
We’ve recently launched support for Azure WAF Gateways. Currently, only import functionality is available for this gateway type.
:::

