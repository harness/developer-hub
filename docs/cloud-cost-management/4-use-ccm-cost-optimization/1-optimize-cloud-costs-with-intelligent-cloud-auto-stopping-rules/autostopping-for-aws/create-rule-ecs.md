---
title: AutoStopping Rules for AWS ECS
description: This topic describes how to create an AutoStopping Rules for Amazon ECS.
sidebar_position: 5
helpdocs_topic_id: r6y5h5i6r1
helpdocs_category_id: biypfy9p1i
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

AutoStopping Rules are configured for the ECS services. You need to create an AutoStopping Rule for each ECS service. There is a one-to-one mapping between the AutoStopping rule and the ECS service. When AutoStopping is configured for a specific ECS service, AutoStopping Rules monitor the traffic coming into this ECS service and start or stop the ECS tasks based on the traffic and idleness.

:::note
The current version of AutoStopping Rules orchestrates the ECS tasks. For the auto scaling groups (ASGs) based ECS clusters, you need a separate setup. However, Fargate clusters do not require any additional setup because the cloud provider charges per task that are running in the cluster.
:::

## Prerequisites

- [AWS Connector](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws)
- ECS running on EC2 nodes or Fargate
- AWS [Proxy](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/autostopping-proxy) or [Load Balancer](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/load-balancer)

### Required Permissions
- Access to AWS Cost and Usage Reports (CUR)
- Permissions to create cross-account IAM roles
- For proxy-based setup: permissions to create VMs and read secrets in your AWS account
- Permissions to create a cross-account role.
- Permissions for AWS ECS and Resource Inventory Management.
- Permissions for AWS Resource Optimization Using AutoStopping Rules. 

:::note
AutoStopping rules based on ECS can only use the ALB associated with the ECS service. When creating a new AutoStopping rule, you can select the ALB.

Once configured, AutoStopping will monitor network traffic for ALB in order to keep ECS tasks running. When ALB receives no traffic, it is considered idle and ECS tasks are scaled down.
:::

## Creating an AutoStopping Rule for ECS

1. In Harness, navigate to **Cloud Costs** module -> **AutoStopping Rules**
2. Click **New AutoStopping Rule**
3. Select **AWS** as your cloud provider. Choose an existing AWS connector or click **New Connector** to [create one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws). 

After this, there are 3 simple steps to set up your AutoStopping rule:

<Tabs>
<TabItem value="configuration" label="Step 1: Configuration">

1. Enter a **Name** for your rule
2. Set the **Idle Time** - how long an instance should be inactive before stopping
3. In the **Resources to be managed by the AutoStopping rules** section, select "ECS Service". 
4. Click on **Add an ECS Service**. In **Select ECS Service**, select one of the following options:
   * ECS Service Name: If you chose **ECS Service Name**, select a region and a cluster to see all of their services:
      - Select the region where your cluster is hosted from the **Select Region** dropdown list.
      - Select your cluster from the **Select Cluster** dropdown list.
      - Select the ECS Service where you want to enable the AutoStopping Rule. 
      - Click **Add Selected**.
   
   * ECS Service Tags: If you chose **ECS Service Tags**, select the region, cluster, and the tag associated with the service. Once you create a rule using this option, the rule is applied automatically to the most recently created ECS service using the tag. 
      - Select the region where your cluster is hosted from the **Select Region** dropdown list.
      - Select your cluster from the **Select Cluster** dropdown list.
      - Select the tag key and the tag value from the dropdown lists. If you want to learn how to add tags to your service, go to [Tagging your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html).

6. Specify Desired Task Count: In **Desired Task Count**, specify the desired task count for the selected ECS service. This is the number of tasks that Harness will instantiate when your service is up and running. For more information, see [Amazon ECS service quotas](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-quotas.html).

7.  Set up Advanced Configuration: 
    - Hide Progress Page: This is especially useful when the service is invoked by an automation system, as it prevents misinterpretation of the progress page as the intended response from a service that is onboarded to AutoStopping.
    - Dry-Run: Toggle the button if you wish to evaluate this feature without terminating your cloud resources. For more information, go to Evaluate AutoStopping rules in dry-run mode.
    - Dependencies: Link your rule to other AutoStopping rules when resources depend on each other.
    - Fixed Schedules: Create fixed schedules to automatically start or stop your instances at specific times. 


</TabItem>
<TabItem value="access" label="Step 2: Setup Access">

:::note
You can skip this step if you are creating an AutoStopping Rule for an ECS Service that does not have a load balancer associated with it.  
:::

A DNS link allows you to access the resources managed by the AutoStopping rule using an HTTP or HTTPS URL. To create a DNS Link, you need to:

* **Select a Load Balancer**: The rule requires a load balancer to detect traffic and shut down appropriate instances. Multiple instances and rules can use a single load balancer. It identifies instances based on hostnames and directs the HTTP traffic appropriately.
* **Select the URL Used to Access the Resources**: You can use either of the following methods:
    + **Auto-generated URL**: You can use the auto-generated URL to access the resources managed by this AutoStopping Rule.
    + **Custom URL**: If using a custom URL:
        - The domain name should be entered without prefixing the scheme.
        - A rule can have multiple URLs.
        - You can enter comma-separated values into a custom URL to support multiple URLs.
        - AutoStopping rule can also use an additional custom domain. In such a case, it should be configured in the DNS provider.

#### Select a Load Balancer

Select the load balancer from the drop-down list. The associated load balancer with your ECS service is listed.
   
     ![](./static/create-auto-stopping-rules-for-ecs-07.png)

#### Select the URL for Accessing the Resources

You can use either of the following methods:

* Auto-generated URL
* Custom URL

**Auto-generated URL**

Every AutoStopping rule will have an auto-generated URL. This URL will be a subdomain to the domain name specified for the [load balancer](../3-load-balancer/create-load-balancer-aws.md). Since the load balancer configures a wildcard domain such as `*.autostopping.yourcompany.com`, the auto-generated URL will work automatically and point to the correct load balancer.

Select **Use the auto-generated URL to access the resources managed by this AutoStopping Rule**.

![](./static/create-auto-stopping-rules-for-ecs-08.png)

**Custom URL**

AutoStopping rule can use multiple custom domains. In such a case, it should be configured in the DNS provider. AutoStopping Rules also allows you to use custom domains or change the root of your site's URL from the default, like,`autostop.harness.io`, to any domain you own. To point your site's default domain to a custom domain, you can set it up in your DNS provider.

Enter the custom URL currently used to access the instances. The domain name should be entered without prefixing the scheme. A rule can have multiple URLs. You can enter comma-separated values into a custom URL to support multiple URLs.

![](./static/create-auto-stopping-rules-for-ecs-09.png)


</TabItem>
<TabItem value="review" label="Step 3: Review">

In Review, verify all the configuration details and click **Save Rule**. To edit any of the configuration settings, click **EDIT** and modify the settings.

Your AutoStopping rule is listed under the AutoStopping Rules dashboard.

</TabItem>
</Tabs>

