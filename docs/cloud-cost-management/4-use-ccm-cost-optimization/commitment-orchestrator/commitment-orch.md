---
title: Overview 
description: An overview of Harness Commitment Orchestrator.
sidebar_position: 1
---  
 

# Overview of Commitment Orchestrator

The Harness Cloud Cost Management (CCM) platform provides powerful cost-saving mechanisms through its AutoStopping and Cluster Orchestrator features, which can automatically shut down non-production resources that are idle and run workloads on fully orchestrated spot instances. However, these mechanisms are not suitable for all workloads. Workloads that are not fault-tolerant, have unclear dependencies, lack high availability, or are stateful may not be compatible with these cost-saving mechanisms.

In such cases, you can still optimize your resource utilization and save costs by making the most of your existing Reserved Instances (RI) before purchasing new ones. By carefully managing your RIs and ensuring that they're being utilized effectively, you can reduce your overall spending and make the most of your available resources.

Types of Compute purchasing options available within AWS:


### On-Demand Instances

With On-Demand Instances, you pay for the compute capacity by the second with no long-term commitments. You have complete control over its lifecycle. You decide when to launch, stop, hibernate, start, reboot, or terminate the instance.

There is no long-term commitment required when you purchase On-Demand Instances. You pay only for the seconds that your On-Demand instances are running, with a 60-second minimum. The price per second for a running On-Demand Instance is fixed and is listed on the [Amazon EC2 Pricing, On-Demand Pricing page](http://aws.amazon.com/ec2/pricing/on-demand/).

On-Demand Instances work well for applications with short-term, irregular workloads that cannot be interrupted.

For significant savings over On-Demand Instances, use [AWS Savings Plans](http://aws.amazon.com/savingsplans/), [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html), or [Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html).


### Savings Plans

Savings Plan is a flexible pricing model offering lower prices compared to On-Demand pricing, in exchange for a specific usage commitment (measured in dollars/hour) for a one or three-year period. AWS offers three types of Savings Plans – Compute Savings Plans, EC2 Instance Savings Plans, and SageMaker Savings Plans. Compute Savings Plans apply to usage across Amazon EC2, AWS Lambda, and AWS Fargate. The EC2 Instance Savings Plans apply to EC2 usage, and SageMaker Savings Plans apply to SageMaker usage. 

Harness supports the following two types of Savings Plans:

* **Compute Savings Plans** provide the most flexibility and help to reduce your costs by up to 66%. These plans automatically apply to EC2 instance usage regardless of instance family, size, AZ, region, OS, or tenancy, and also apply to Fargate and Lambda usage. For example, with Compute Savings Plans, you can change from C4 to M5 instances, shift a workload from EU (Ireland) to EU (London), or move a workload from EC2 to Fargate or Lambda at any time and automatically continue to pay the Savings Plans price.
* **EC2 Instance Savings Plans** provide the lowest prices, offering savings of up to 72% in exchange for a commitment to the usage of individual instance families in a region. For example, M5 usage in N. Virginia. This automatically reduces your cost on the selected instance family in that region regardless of AZ, size, OS, or tenancy. EC2 Instance Savings Plans give you the flexibility to change your usage between instances within a family in that region. For example, you can move from c5.xlarge running Windows to c5.2xlarge running Linux and automatically benefit from the Savings Plans prices.

For more information about Savings Plans, go to [Amazon EC2 Savings Plans](https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-reservation-models/savings-plans.html).


### Reserved Instances

EC2 Reserved Instances provide a discounted hourly rate and an optional capacity reservation for EC2 instances. AWS Billing automatically applies your RI’s discounted rate when attributes of EC2 instance usage match attributes of an active RI.

If an Availability Zone is specified, EC2 reserves capacity matching the attributes of the RI. The capacity reservation of an RI is automatically utilized by running instances matching these attributes.

You can also choose to forego the capacity reservation and purchase an RI that is scoped to a region. Reserved Instances that are scoped to a region automatically apply the RI’s discount to instance usage across AZs and instance sizes in a region, making it easier for you to take advantage of the RI’s discounted rate.

AWS offers two types of Reserved Instances: **Standard** and **Convertible**. The Convertible RIs provide more flexibility. You can set up Commitment Orchestrator for Convertible RIs. To learn more about the different types of Reserved Instances, go to [Types of Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-types.html).

You can exchange your Convertible Reserved instance for another Convertible Reserved Instance with a different configuration, including instance family, operating system, and tenancy. There are no limits to how many times you perform an exchange, as long as the new Convertible Reserved Instance is of an equal or higher value than the Convertible Reserved Instances that you are exchanging. For more information, go to [Exchange Convertible Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-convertible-exchange.html).

For more information about Reserved Instances, go to [Reserved Instances. \
](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html)



# How does Commitment Orchestrator optimize utilization?

Setting up the Commitment Orchestrator enables you to make the most of your Reserved Instances (RIs) by utilizing them to their full capacity, even for instances that are only partially in use or not in use at all. This ensures that on-demand instance requirements are met while optimizing the use of available RIs within a region.

To accomplish this, the Commitment Orchestrator matches the available RIs with the on-demand instances in the region. This includes identifying cases where multiple smaller RIs can be combined to match the needs of larger on-demand instances, or where larger RIs can be divided to match the needs of smaller on-demand instances. The Reserved Instance lifecycle is automated and operates in real-time to provide maximum coverage based on the setup.

By using the Commitment Orchestrator, you can ensure that your organization is fully utilizing all available resources, saving money, and optimizing performance.

For example:

Imagine a scenario where you have one Reserved Instance of type `r5.large`, but the On-Demand instances you're currently using are `t2.micro`, `c5.large`, and `t3.micro`. To optimize the utilization of your available resources, the `r5.large` is converted to `c5.large` automatically to meet your requirements.

<!--1. First, you can convert the Reserved Instance of r5.large to t2.nano. This leaves you with 22 t2.nano Reserved Instances (the exact number may vary based on pricing).
2. Next, you can convert some of the t2.nano instances to c5.large to match the On-Demand instances. Given the hourly price of c5.large, you can exchange 14 t2.nano instances for one c5.large instance. However, this won't result in an exact match for the price of c5.large, so you will need to pay the difference for the exchange. It's important to note that you cannot exchange 15 t2.nano instances for one c5.large instance to avoid the difference in amount.

By taking these steps, you can optimize your resource usage, reduce costs, and make the most of your available resources.-->







