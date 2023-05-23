---
title: AWS EC2 recommendations
description: Optimize the utilization of your EC2 instances using Harness CCM recommendations.
# sidebar_position: 2
---

# Optimize AWS EC2 costs with recommendations
An effective way to reduce AWS EC2 instance costs is to optimize VM utilization. This involves resizing instances based on active tasks and decommissioning unused instances.

Harness helps you reduce costs with recommendations.

You can view the recommendations for all of your AWS accounts on the recommendations page. 

You can also tune these recommendations by instance family or across instance families (General Purpose, Compute Optimized, etc.).


:::note
Before using recommendations in your environment, ensure that you evaluate their impact thoroughly. The person reviewing the recommendations should be able to understand the impacts identified in the recommendations, as well as the impact on the infrastructure and business.

Using recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.
:::


## Before you begin


* Connect your AWS cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for AWS](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md).
* To obtain EC2 recommendations, configure a Harness AWS CCM connector with the Inventory Management feature enabled.
* Go to [Perspectives](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md) to learn how to create perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.


## How are EC2 recommendations computed?


The recommendations are computed by analyzing the past utilization of the CPU and memory of your EC2 instance. Harness CCM leverages the AWS EC2 recommendations. CCM uses the AWS APIs and fetches the data from the AWS account.


### Types of EC2 recommendations

Harness CCM provides two types of recommendations to optimize your EC2 instances:



* **Instance resizing**: In this type of recommendation, CCM recommends resizing your instance within the same instance family or using a different instance family based on instance usage. For information about the different instance families in AWS, go to [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/instance-types.html#AvailableInstanceTypes). 
 



![](./static/ec2-recommendations-1.png)

* **Decommissioning**: In this type of recommendation, the instance is terminated or decommissioned if not in use for a long time.
 

![](./static/ec2-recom-decommission.png)



## Enable EC2 recommendations

You must add the required permissions and enable EC2 recommendations in AWS.
Go to [Enable EC2 recommendations](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#enable-ec2-recommendations) for the tasks to be performed on your AWS console.

After completing the aforementioned tasks, you need to perform the following steps in Harness:

1. While creating a new AWS CCM connector, select the **Inventory Management** feature to enable recommendations. For more information, go to [Set up CCM for your AWS account](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md).

 
2. Add the required **Cost Explorer** permissions to the CCM template:

    ![](./static/ec2-create-cross-account-role.png)

### View your EC2 recommendations

1. In **Harness**, go to the **Cloud Costs** module.
2. Click **Recommendations**.
3. Click the filter icon.
4. In the **Recommendation Type** dropdown list, select **EC2_INSTANCE**.
5. Click **Apply**. 

  All the AWS accounts with EC2 instances are displayed. 

6. Click the row to view the recommendations for that account.  The CPU and Memory utilization graph shows the current utilization data. Go to [View and apply recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/home-recommendations) to learn how to apply these recommendations.


### Tune the EC2 recommendations

You can tune the recommendations by providing your preferred instance type. Select one of the following options:


  ![](./static/ec2-tune-recommendations.png)


* **Within the same instance family**: If you select this option, the recommendations stay within the same family.
* **Across instance families**: If you select this option, CCM recommends instance types across instance families. The priority is to provide maximum cost savings.



### Sharing recommendations​


When you tune a recommendation, the URL for the recommendation captures your changes.


You can see the changes following `details?` in the URL. For example, `details?buffer=10&QoS="GUARANTEED"`.


Capturing your changes in the URL enables you to share your tuned recommendation and ensure others can see your tuning. Simply tune the recommendation and then share the URL.

