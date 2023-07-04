---
title: AWS Application Load Balancer 
description: Describes how to create a new Application Load Balancer for AWS.
# sidebar_position: 2
helpdocs_topic_id: eba1bn2jm6
helpdocs_category_id: k8xq40kf08
helpdocs_is_private: false
helpdocs_is_published: true
---
# Create an Application Load Balancer for AWS

A load balancer serves as the single point of contact for clients. The load balancer distributes incoming application traffic across multiple targets, such as EC2 instances, in multiple Availability Zones. This increases the availability of your application.

An Application Load Balancer (ALB) makes routing decisions at the application layer (HTTP/HTTPS), supports path-based routing, and can route requests to one or more ports on each container instance in your cluster.


This topic describes how to create a new application load balancer for creating AutoStopping Rules for AWS. 


## Before You Begin

* [Connect to an AWS Connector](../1-add-connectors/connect-to-an-aws-connector.md)
* [Create AutoStopping Rules for AWS](../4-create-auto-stopping-rules/create-autostopping-rules-aws.md)

## Why do You Need a Load Balancer?

AutoStopping integrates with the cloud provider's native load balancing technologies (Application Load Balancer, Azure AppGateway, etc.) to provide start and stop capability for the AutoStopping-managed cloud services.

  ![](./static/create-load-balancer-aws-14.png)

* The rule requires a load balancer to direct traffic/shut down appropriate instances. Each load balancer is identified by its DNS hostname `(autostopping.example.com`, `www.example.com`, etc.).
* AutoStopping can use the same load balancer for multiple AutoStopping rules. This means multiple instances can be added under one single load balancer and AutoStopping manages the traffic based on the HTTP host details.
* DNS configuration for load balancer is a one-time setup.
* When configuring a load balancer, it is required to choose a domain name. This domain name will be used for all the AutoStopping rules created under this load balancer. For example:  
  

```
*.autostopping.example.com -> Load balancer IP
```
A Harness load balancer in AWS consists of two primary components:

* **Application Load Balancer (ALB)**: The ALB receives incoming traffic from clients and distributes it across a group of backend servers. It is a Layer 7 load balancer, which means it can route traffic based on application-level information such as HTTP headers or cookies.

* **Lambda Function**: The Lambda function with its target group is mapped to the default rule of the ALB. It is used to warm up resources, hold traffic, and display progress page until the intended page comes up. See [Update AWS Lambda function code](create-load-balancer-aws.md#update-aws-lambda-function-code) to update the function code to the latest version. 

## Create a New Application Load Balancer

A DNS link allows you to access the resources managed by the AutoStopping rule using an HTTP or HTTPS URL. Select DNS Link if the underlying application running on the resources managed by this AutoStopping Rule is currently accessed by an HTTP or HTTPS URL.

Perform the following steps to create a new Application Load Balancer in AWS.

1. In **Cloud Costs**, click **New AutoStopping Rule**.

2. In **AutoStopping Rules**, select **AWS**. It is the cloud account in which your workloads are running that you want to manage using AutoStopping rules.
   
     ![](./static/create-load-balancer-aws-15.png)
3. If you have already linked your AWS account and want to use that account, then select the AWS account from the **Connect to your AWS account** drop-down list.
4. If you have not added your cloud account, click **Connect to your AWS account** drop-down list and then click **New Connector**. For the detailed steps, see [Connect to an AWS Connector](../1-add-connectors/connect-to-an-aws-connector.md).
   
     ![](./static/create-load-balancer-aws-17.png)
5. Define an AutoStopping Rule. See [Step: Define an AutoStopping Rule](../4-create-auto-stopping-rules/create-autostopping-rules-aws.md#define-an-autostopping-rule).
6. Select the resources to be managed by the AutoStopping Rule. See Step: Select the Resources to be Managed by the AutoStopping Rule in [Create AutoStopping Rules for AWS](../4-create-auto-stopping-rules/create-autostopping-rules-aws.md#select-the-resources-to-be-managed-by-the-autostopping-rule).
7. (Optional) Set up advanced configuration. See Step: Set Up Advanced Configuration.
8. In **Setup Access**, select **DNS Link**.
9.  In **Select a load balancer**, click **New Load Balancer** to add a load balancer.
     
	  ![](./static/create-load-balancer-aws-19.png)
10. In **Create a new Load Balancer**, in **Provide a name for the Load balancer**, enter a name for your load balancer. This name will appear in your load balancer list.

The Application Load Balancer (ALB) does not have a domain name associated with it. The AutoStopping Rule directs traffic to resources through the load balancer. Hence the load balancer requires a domain name to be accessed by the rule. You can configure DNS using **Route 53** or **Others** DNS providers to do the mapping.

### Configure DNS Using Route 53

AutoStopping Rule has first-class integration with Route 53. 


:::note
This works only if Route 53 is in the same AWS account as the instance you want to include in the AutoStopping rule.1. In **Select your preferred DNS provider and perform the mapping**, select **Route 53**.
:::
1. Select the correct Route 53 hosted zone from the drop-down list.
   
     ![](./static/create-load-balancer-aws-20.png)
2. In **Enter Domain name**, enter the domain name. For example, `autostopping`.
   
     ![](./static/create-load-balancer-aws-21.png)
3. Click **Continue**.
4. Select region from the drop-down list to install the Access Point.
5. Select a certificate from the drop-down list.
6. Select VPC.
7. Select security groups.
8. Click **Save Load Balancer**.
     
	   ![](./static/create-load-balancer-aws-22.png)
	 
After saving your load balancer, AutoStopping Rule creates an entry similar to the following example in your Route 53 account.  
  

```
A record: *.autostopping.yourdomain.com<lightwing.io> -> up-a1thp0i3k1k7ment50l0-4225468.ap-south-1.elb.amazonaws.com
```

### Configure DNS Using other DNS Providers

1. In **Select your preferred DNS provider and perform the mapping**, select **Others**.
2. In **Enter Domain name**, enter the domain name. For example, `autostopping.yourcompany.com`.
   
     ![](./static/create-load-balancer-aws-23.png)
3. Click **Continue**.
4. Select region from the drop-down list to install the Access Point.
5. (Optional) Select a certificate from the drop-down list.
6. Select VPC.
7. Select security groups.
8. Click **Save Load Balancer**.
   
     ![](./static/create-load-balancer-aws-24.png)
9.  In your DNS provider’s configuration page, add CNAME record.  See [Add DNS CNAME record](https://docs.aws.amazon.com/managedservices/latest/ctexguide/ex-dirserv-cname-record-add-col.html). For example:  
  

```
*.autostopping.test.com -> Load balancer DNS address
```

Your Load Balancer is now listed.

## Locate and update AWS Lambda function code

You can use a Lambda function to process requests from an Application Load Balancer. Elastic Load Balancing supports Lambda functions as a target for an Application Load Balancer. Use load balancer rules to route HTTP requests to a function, based on path or header values. Process the request and return an HTTP response from your Lambda function.

### Locate the corresponding Lambda function of the ALB
1. Navigate to your AWS console and select the Application Load Balancer (ALB).
2. In the **Listeners** tab, you can view the available listeners.
3. Choose one of the listeners and view the list of rules associated with that listener.
4. Locate the **Default** rule in the list of rules and then select the target group that it is pointing to.

  The target group contains the Lambda function as a registered target that you need to update.

### Update the Lambda function code

:::important
The current version of AWS Lambda function proxy code to be used is `aws-proxymanager-0.1.3.zip`.
:::

To update the Lambda function code, follow these steps: 
1. [Download](https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/aws-proxymanager-0.1.3.zip) the latest code package in the form of a .zip file.
2. Select the **Code** tab in **Lambda** > **Functions**.

    <docimage path={require('./static/lambda-function-code.png')} width="50%" height="50%" title="Click to view full size image" />

3. Click **Upload from** and choose the zip file you downloaded, and then click **Save**.