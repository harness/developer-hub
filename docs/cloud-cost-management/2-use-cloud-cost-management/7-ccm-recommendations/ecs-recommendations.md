---
title: Optimize AWS ECS Costs with Recommendations
description: Optimize AWS ECS Costs with Recommendations
# sidebar_position: 2
helpdocs_topic_id: 7xxejpvs9w
helpdocs_category_id: viib5j7fek
helpdocs_is_private: false
helpdocs_is_published: true
---

One of the most impactful ways to reduce spend on AWS ECS infrastructure is to make sure your ECS clusters are optimally sized for the services and tasks they run. Harness Cloud Cost Management (CCM) provides recommendations for your ECS clusters to show you resource optimization opportunities to potentially reduce your monthly spend.

The recommendations are computed by analyzing the past utilization of CPU and memory of your service. ECS workloads are called services.

You can also tune recommendations by changing the percentage of cpu/memory requests buffer (in the **Buffer to be considered for CPU/Memory values** setting). ECS Services only have request and don't have limits.

This topic describes how CCM computes ECS service recommendations and how you can use them to potentially reduce monthly costs.

Before using recommendations in your ECS cluster environment, ensure that you evaluate their impact thoroughly. The person reviewing the recommendations should be able to understand the impacts identified in the recommendations, as well as the impact on the infrastructure and business.  
Using recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.

## Before You Begin

* [CCM Perspectives](../2-ccm-perspectives/1-create-cost-perspectives.md)

### Prerequisites

To obtain ECS recommendations, configure an AWS CCM Connector with the Inventory Management feature enabled.

No Delegate setup is required. All utilization metrics are obtained using a cross account IAM role.
See [Set Up Cloud Cost Management for AWS](../../1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md).

## How are Recommendations Computed?

The recommendations are computed by analyzing the past utilization of CPU and memory of your service. ECS workloads are called services.

ECS recommendations are computed both for AWS Fargate and EC2 spot instances. 

The implementation uses a histogram method to compute the recommendations.

The computation adds a 15% buffer to the recommended resources by default. CCM also allows you to add any additional buffer using the **Tune recommendations** option.

When you enable [Cost Visibility](../../1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes.md) for your ECS cluster, Harness starts collecting CPU and memory resource utilization metrics for every service present in the cluster every minute.

The utilization data collected every minute is then aggregated in the Delegate for a 20-minute window. The 20-minute aggregated data is then sent to Harness:

* **CPU**: For CPU values, a partial histogram for the last 20 minutes is sent.
* **Memory**: The maximum value of the memory is sent as a single data point.

We use this data for further processing and to compute the complete histogram displayed in the UI (partial histograms are merged for the CPU and memory histogram is computed using the data points).

Each of these daily histograms has an equal weightage for a given task. As a result, if you select the last 30 days of data to aggregate, we will assign equal weightage to each of the 30 days.

You can also tune recommendations by changing the percentage of recommended CPU and memory requests buffer.

The task definitions for AWS Fargate can only be set to predefined values. For more information, go to [AWS Fargate Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/userguide/fargate-task-defs.html). Therefore, the recommendations are rounded off to the nearest configuration available on ECS Fargate.

### Why Histogram?

A histogram is used to account for the seasonality of high resource utilization on certain days of the week. Assume your application receives a lot of traffic (and thus a lot of resource utilization) on weekends and we're using a decaying histogram. In that case:

* If you view service recommendation on Friday and selected the last seven days of utilization data, then Saturday will be given the least weightage, followed by Sunday, hence the recommended resources will be low.
* If you view the service recommendation on Monday, Sunday will be given the most weightage, hence your recommended resources may be high.

To avoid this, we use the histogram method and give equal weight to all previous days.

## Types of Service Recommendations

The recommendations are categorized as the following:

* Cost Optimized
* Performance Optimized

### Cost Optimized

The cost-optimized recommendations are computed as the following:

* The lower bound is based on the 50th percentiles of CPU samples and memory peaks.
* There is no upper bound for CPU samples and memory peaks are based on the 95th percentile. It is recommended not to set the upper bound for the CPU samples, because the CPU is considered a compressible resource.
* There is no limit set for the CPU. This is to avoid the throttling of the services when there is a spike in CPU usage. The usage of the CPU may go up in certain conditions, for example during the service start. In such a scenario, the CPU can burst and get the required additional resources.
* The potential monthly spend and savings are calculated based on the 90th percentiles of CPU samples and memory peaks.

Since the recommendations are computed using the 50th percentile of the CPU samples and memory peaks, this may potentially lead to system performance issues. Before using cost-optimized recommendations, ensure that you evaluate the recommendation's impact thoroughly.

### Performance Optimized

The performance-optimized recommendations are computed using the 95th percentile of CPU samples and memory peaks. Because of this, the probability of having any effect on the performance is minimum. However, the cost may go high for the resources that are optimized using this method.

The potential monthly spend and savings are calculated based on the 90th percentiles of CPU samples and memory peaks.

## View Recommendations

Once you enable CCM, it may take up to 48 hours for the recommendations to appear in Cloud Costs. It depends on the time at which CCM receives the utilization data for the service.In **Cloud Costs**, click **Recommendations**.

The recommendations page displays the following information:

* A breakdown of all the available recommendations.
* **Potential Monthly Savings** across your ECS clusters if you apply the recommendations.
* **Forecasted Monthly Spend** across your ECS clusters if you do not apply the recommendations.
* **Emissions that can be reduced** and **Potential Carbon Emissions** are features that track greenhouse gas emissions.

The **Recommendation Breakdown** displays the following information:



|  |  |
| --- | --- |
| **Monthly Savings** | Potential monthly savings for your resource, if you apply the recommendations. |
| **Resource Name** | Name of the resource for which CCM displays the recommendation. |
| **Monthly Saving** | Potential Monthly Savings for the resource, if you apply the recommendations. |
| **Monthly Cost** | The monthly cost of the recommendation. |
| **Recommendation Type** | Type of the recommendation for your resource. For example, **rightsizing** or **resizing**. Based on your resource type, CCM recommends rightsizing or resizing your CPU, memory, or node counts. |

You can create and use filters to select resources and recommendations.

You can filter by:

* **Resource Name:** the name of the resource being monitored.
* **Namespace**: each namespace in the cluster.
* **Cluster Name**: each cluster in your infrastructure.
* **Resource Type**: the type of resources for which the recommendation is displayed. Currently, CCM supports ECS service, node pool and workload.
* **Savings**: enter the minimum monthly savings. For example, all the recommendations with potential monthly savings of more than $1000.
* **Potential Spend**: filter by forecasted monthly spend greater than the specified amount. For example, all the recommendations with forecasted monthly spend of more than $1000.

The recommendation for the selected resource is displayed.

Click a recommendation to view its details.

Within a recommendation, select the number of days to compute recommendations based on the utilization data. You can select the last day, 7 days, or 30 days.

You can use this information to optimize your resources to potentially reduce your monthly cloud costs.

## Tune and Share Recommendations

You can tune your recommendations by adding a buffer to the resource preferences.

In **% Buffer to be considered for CPU/Memory values**, drag the slider to increase or decrease the percentage of the buffer. By default, it is set to 0.

The resource recommendations are based on the percentage of the buffer you set.

### Sharing Recommendations

When you tune a recommendation, the URL for the recommendation captures your changes.

You can see the changes following `details?` in the URL. For example, `details?buffer=10&QoS="GUARANTEED"`.

Capturing your changes in the URL enables you to share your tuned recommendation and ensure others can see you tuning. Simply tune the recommendation and then share the URL.

