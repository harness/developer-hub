import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Kubernetes" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Kubernetes Recommendations

<Tabs>
<TabItem value="nodepool" label="Nodepool Recommendations">

:::caution Important to note

- Node pool recommendations do not support node pools with autoscalers enabled.
- These recommendations should be treated as a nudge, not a source of accurate cost data in such cases.
- Please note: cost data might be incorrect for autoscaled node pools. To hide node pool recommendations for autoscaled pools, kindly reach out to [Harness Support](mailto:support@harness.io)

:::

### Before You Begin

Harness CCM uses labels to process node pool recommendations. Make sure to add one of the labels listed to the Kubernetes nodes in your cluster. The following table shows the labels for the respective cloud providers:

|  **Cloud provider**| **Labels** |
| --- | --- |
| Amazon Web Services (AWS) |<ul><li>`eks.amazonaws.com/nodegroup​`</li> <li>`alpha.eksctl.io/nodegroup-name​`</li><li> `node-pool-name​`</li><li> `kops.k8s.io/instancegroup`</li><li>`nodegroup​`</li></ul>|
| Google Cloud Platform (GCP) |  <ul><li>`cloud.google.com/gke-nodepool`</li><li> `nodegroup​`</li><li>`kops.k8s.io/instancegroup`</li></ul>|
| Microsoft Azure | <ul><li> `Agentpool​`</li><li> `node-pool-name​` </li><li> `nodegroup​`</li><li>`kops.k8s.io/instancegroup`</li></ul>|

## Types of Nodepool Recommendations

- **Node Pool Rightsizing**: Node Pool Rightsizing is a strategy that analyzes your Kubernetes infrastructure to identify opportunities for more efficient resource allocation. 

## How Are Nodepool Recommendations Computed?

:::important note
For nodepool recommendations, we base our calculations using public pricing data, which may differ from actual price.
:::

The node pool recommendations are computed by analyzing historical utilization data and requests metrics of Pods. CCM recommends the optimal resource configurations for the Spot and On-demand instances. It uses the following parameters to determine the maximum node counts:

* Total CPUs
* Total memory
* Max CPUs
* Max Memory

The recommendations are calculated by aggregating the resource utilization and request across all pods running across nodes in the node pool. You can select the number of days to compute recommendations based on the utilization data. The available options are last 7, 30, 60, and 90 days.


### Recommendation Calculation Formula

```
Nodepool Recommendation = Max at a given instant [Aggregated Max(Resource Utilization, Resource Requests)]
```

### Detailed Example

To illustrate how nodepool recommendations are computed, let's walk through a practical example with two nodes in a nodepool, each running two pods. We'll analyze CPU utilization and requests at two different time points.

#### Time Instant 1

<div class="recommendation-example">

| Node | Pod | CPU Utilization | CPU Request |
|------|-----|-----------------|-------------|
| **Node 1** | Pod 1 | 2.1 vCPU | 4.0 vCPU |
|      | Pod 2 | 1.4 vCPU | 1.0 vCPU |
| **Node 2** | Pod 1 | 1.1 vCPU | 4.0 vCPU |
|      | Pod 2 | 0.9 vCPU | 1.0 vCPU |

</div>

#### Time Instant 2

<div class="recommendation-example">

| Node | Pod | CPU Utilization | CPU Request |
|------|-----|-----------------|-------------|
| **Node 1** | Pod 1 | 2.2 vCPU | 4.0 vCPU |
|      | Pod 2 | 1.5 vCPU | 1.0 vCPU |
| **Node 2** | Pod 1 | 2.0 vCPU | 4.0 vCPU |
|      | Pod 2 | 0.3 vCPU | 1.0 vCPU |

</div>

### Calculation Process

For each pod, we take the maximum of its utilization and request, then sum these values for all pods at each time instant:

#### Time Instant 1:
```
Total = Max(2.1, 4.0) + Max(1.4, 1.0) + Max(1.1, 4.0) + Max(0.9, 1.0)
Total = 4.0 + 1.4 + 4.0 + 1.0 = 10.4 vCPU
```

#### Time Instant 2:
```
Total = Max(2.2, 4.0) + Max(1.5, 1.0) + Max(2.0, 4.0) + Max(0.3, 1.0)
Total = 4.0 + 1.5 + 4.0 + 1.0 = 10.5 vCPU
```

### Final Recommendation

The final CPU recommendation is the maximum value across all time instants:
```
Recommended CPU = Max(10.4, 10.5) = 10.5 vCPU
```

## Recommendation Drilldown

- **Potential Monthly Spend**: Projected cost with and without recommendations
- **Potential Monthly Savings**: Expected monthly cost reduction

- **Current and Recommended**:
    - Estimated Savings
    - Instance Family
    - Node Count
    - CPU (vCPU)
    - Memory (GiB)
    - Cost per node per hour
    - Region
    - Potential monthly cost (current and after recommendation)
The recommended values show Spot and On-demand configurations, estimated savings and potential monthly cost. 

- **Cluster details and Resource Utilization** (CPU, Memory, Node Count) in the last X days where X is the number of days selected for the recommendation (7,30,60 or 90). 

- **Tune recommendations**: You can either set a preset or tune your recommendations by modifying:
    - Minimum Node count
    - Percentage Buffer to be considered for CPU/Memory values
    - Preferred Instance families: All or Specified.
    - Minimum Workload Requirements (CPU and RAM): These are calculated using the peak historical CPU and memory usage observed on the nodes. You can adjust the values if needed.
    - Preferred Resource Requirements(CPU and RAM): These are calculated by aggregating CPU and memory usage and requests from all pods running across nodes in the node pool. You can adjust the values if needed.
As and when these values are adjusted, the recommendationed values are computed based on these values.


</TabItem>
<TabItem value="workload" label="Workload Recommendations">

### Before You Begin

- Connect your Kubernetes cluster in Harness and [set up CCM for cost management](/docs/cloud-cost-management/get-started/#kubernetes).
- Cost Visibility and the Inventory Management features should be enabled on your Kubernetes CCM connector.
- Enabling the **Visibility** feature allows retrieving recommendations from the Azure Advisor. The **Inventory Management** feature allows you to fetch the CPU utilization data and display the corresponding recommendations. If the Inventory Management feature is not enabled, the graph and table may show a null state.

## How are Workload Recommendations Computed?

In Harness CCM, the workload recommendations are computed by analyzing the past utilization of CPU and memory of your workload. The implementation uses a histogram method to compute the recommendations.

The computation adds a 15% buffer to the recommended resources by default. CCM also allows you to add any additional buffer using the Tune recommendations option.

When you enable Cost Visibility for your Kubernetes Cluster, the Delegate associated with your Connector starts collecting CPU and memory resource utilization metrics for every node and pod (including individual containers) present in the cluster every minute using a metrics server. CCM relies on the Metrics Server and initializes recommendations after an initial data collection of 24-48 hours. The Metrics Server is queried by the controller every minute for utilization data.

The utilization data collected every minute is then aggregated in the Delegate for a 20-minute window. The 20-minute aggregated data is then sent to Harness:

* **CPU**: For CPU values, a partial histogram for the last 20 minutes is sent.
* **Memory**: The maximum value of the memory is sent as a single data point.

We use this data for further processing and to compute the complete histogram displayed in the UI (partial histograms are merged for the CPU and memory histogram is computed using the data points).

Each of these daily histograms has an equal weightage for a given workload. As a result, if you select the last 30 days of data to aggregate, we will assign equal weightage to each of the 30 days.

You can choose to tune the recommendations by changing the Quality of Service (QoS) and the percentage of recommended CPU and memory requests/limits buffer. See Tune Recommendations.

You can also customize your recommendations by increasing or decreasing the request and limit coverage of the CPU and memory samples. Simply drag the slider of the number of samples to adjust the percentile. The slider indicates the percentile of all the CPU and memory samples that are covered to compute the resource recommendations. Based on your selection, the recommendations for your workload are made.

:::tip Why Histogram?

A histogram is used to account for the seasonality of high resource utilization on certain days of the week. Assume your application receives a lot of traffic (and thus a lot of resource utilization) on weekends and we're using a decaying histogram. In that case:

* If you view workload recommendation on Friday and selected the last seven days of utilization data, then Saturday will be given the least weightage, followed by Sunday, hence the recommended resources will be low.
* If you view the workload recommendation on Monday, Sunday will be given the most weightage, hence your recommended resources may be high.

To avoid this, we use the histogram method and give equal weight to all previous days.
:::

##  Categorization of Recommendations

The recommendations are categorized as the following:

* Cost Optimized
* Performance Optimized

### Cost Optimized

The cost-optimized recommendations are computed as the following:

* The lower bound is determined by analyzing the 50th percentiles of CPU samples and memory peaks. This means that the recommendations will consider the average or median usage levels of CPU and memory resources over a given period.
* There is no upper bound for CPU samples and memory peaks are based on the 95th percentile. It is recommended not to set the upper bound for the CPU samples, because the CPU is considered a compressible resource. If your application starts hitting the CPU limits, Kubernetes starts throttling the pods.
* There is no limit set for the CPU. This is to avoid the throttling of the workloads when there is a spike in CPU usage. The usage of the CPU may go up in certain conditions, for example during the pod start. In such a scenario, the CPU can burst and get the required additional resources.
* The potential monthly spend and savings are calculated based on the 90th percentiles of CPU samples and memory peaks.

Since the recommendations are computed using the 50th percentile of the CPU samples and memory peaks, this may potentially lead to system performance issues. Before using cost-optimized recommendations, ensure that you evaluate the recommendation's impact thoroughly.


### Performance Optimized

The performance-optimized recommendations are computed using the 95th percentile of CPU samples and memory peaks. Because of this, the probability of having any effect on the performance is minimum. However, the cost may go high for the resources that are optimized using this method.

The potential monthly spend and savings are calculated based on the 90th percentiles of CPU samples and memory peaks.


#### Example

Let's try to understand how the recommendations are computed using the following example. The following example illustrates how the resources can be optimized using the performance-optimized recommendations:


```
Current Resources:  
  limits:  
    memory: 8Gi  
    cpu: 1  
   requests:  
     memory: 8Gi  
     cpu: 1  
   
Recommended Resources based on utilization data for the last 7 days (QoS: Guaranteed, %of buffer: 0)  
  
 limits:  
  memory: 3.5Gi  
  cpu: 1.1  
requests:  
  memory: 3.5Gi  
  cpu: 1.1
```
The current resources are provisioned using `8Gi memory` and `1 CPU`, the recommended resources require only `3.5Gi memory` and `1.1m CPU` for limits and requests both.

-----

## Recommendations Drilldown

:::info
These workload recommendations are computed based on number of samples received which shows very low resource utilisation. The recommended numbers might not be sufficient for starting the workload as resource consumption at start up might be higher. Please take this into account while applying recommendation.
:::
When you click on an individual recommendation, the following details are shown:
- Potential Monthly Workload Spend
- Potential Monthly Workload Savings
- Resource Changes to be made to apply the recommendation
- Cost Optimized Histogram of samples analysed over the last X days where X is the number of days selected for the recommendation (7,30,60 or 90).
- Workload Details: Including Cluster, Namespace, Workload and more details as [shown here.](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#faq)
- Tune Recommendations: You can either apply a preset or tune the recommendations by changing:
    -  Quality Of Service(QoS): You can set burstable or guaranteed QoS for recommended requests/limits. For more information on QoS, see [Configure Quality of Service for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/).
        - Burstable: A pod is assigned to a QoS class of burstable if:
            * The pod does not meet the criteria for QoS class Guaranteed.
            * At least one container in the pod has a memory or CPU request.
        
            In this QoS class, resources can go beyond requests up to the limits. This recommended action does not affect other workloads and stays within bounds of usage. The scheduler uses the request to place the pod on a node, but the pod can use more resources up to the limit before it’s killed or throttled. For more information, see the [QoS class of Burstable](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/#create-a-pod-that-gets-assigned-a-qos-class-of-burstable).
        
            We do not recommend CPU limits in the case of burstable QoS.

        - Guaranteed: In this Quality of Service (QoS) class, resource requests and limits are set to the same values. Setting them to the same values guarantees that the resources requested by the container will be available to it when it is scheduled. This is considered as the ideal QoS class for the most stable Kubernetes clusters.

            For a pod to be given a QoS class of guaranteed:

            * Every container in the pod must have a memory limit and a memory request, and they must be the same.
            * Every container in the pod must have a CPU limit and a CPU request, and they must be the same.

            For more information, see the [QoS class of Guaranteed](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/#create-a-pod-that-gets-assigned-a-qos-class-of-guaranteed).
    - Buffer for workloads: You can set the percentage of buffer for recommended requests/limits.


## FAQ

<details>
<summary>What additional details are displayed for a recommendation? And what are the aggregation types?</summary>

- **Workload details**: The following information is displayed:
    + Workload
    + Namespace
    + Workload Type
    + Cluster
- **Cost details**: The following cost details are displayed:
    + **Total Cost**: For Kubernetes clusters, the total cost is the sum of all the node costs. For ECS clusters, the sum of all container instances.
    + **Idle Cost**: Idle cost is the cost of idle resources (CPU and memory) allocated to a Kubernetes pod or an Amazon ECS task but is not utilized. For more information, see [Idle Cost](../../get-started/key-concepts.md#idle-cost).
    + **Utilized Cost**: Utilized cost is the cost estimate for the utilized node or pod resources.
* **Aggregation**: The aggregated CPU and memory utilization value of your workload. The values are displayed as the following:
    + **Time-weighted**: This considers the active duration of pods when calculating the CPU and memory utilization.
    + **Absolute**: This simply aggregates the CPU and memory utilization values.

#### Example 1

Let's assume you want to check the CPU requests of your workload between 3 a.m. and 4 a.m. Imagine there were two pods during that duration:

1. Each pod requesting 0.4 CPU
2. 1st pod was deleted at 3:53 a.m. So the 1st pod was active for 53 minutes in that duration
3. 2nd pod was created at 3.53 a.m., so it was active for 7 mins in that duration

In the case of **time-weighted**, the utilization value is calculated as the following:

`[(cpu request of pod 1) * (active time) + (cpu request of pod 2) * (active time)]/ total duration`

which is equal to `[(0.4*53) + (0.4*7)]/60 = 0.4`

In the case of **absolute**, the utilization value is calculated as the following:

`(cpu request of pod 1) + (cpu request of pod 2)`

which is equal to `0.4 + 0.4 = 0.8`

#### Example 2

Let's assume you want to check the CPU requests of three workloads in your cluster:

1. Each workload requesting 0.4 CPU
2. Workload 1 runs from 0-25 mins into the hour
3. Workload 2 runs from 15-40 mins into the hour
4. Workload 3 runs from 35-60 mins into the hour

In the case of **time-weighted**, the utilization value is calculated as the following:

`[(cpu request of pod 1) * (active time) + (cpu request of pod 2) * (active time) + (cpu request of pod 3) * (active time)]/ total duration`

which is equal to `((0.4*25) + (0.4*25) + (0.4*25))/60 = 0.5`

In the case of **absolute**, the utilization value is calculated as the following:

`(cpu request of pod 1) + (cpu request of pod 2) + (cpu request of pod 3)`

which is equal to `0.4 + 0.4 + 0.4 = 1.2`

</details>
</TabItem>
</Tabs>

