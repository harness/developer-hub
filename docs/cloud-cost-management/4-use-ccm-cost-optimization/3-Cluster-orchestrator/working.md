---
title: "How it works: Cluster Orchestrator for AWS EKS"
description: How Cluster Orchestrator works and how it's different from other solutions.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## Working of Cluster Orchestrator
Cluster Orchestrator primarily performs the action of node provisioning based on workload and pod requirements and removing those nodes when the load and demand declines. But what makes it powerful and flexible is its ability to determine the type of instances or nodes to bring up (whether Spot, or On-Demand) coupled with its built-in Spot instance orchestration capabilities.

### Spot Instance Orchestration: A High-Level Overview of Cluster Orchestrator's Working


<DocImage path={require('./static/working_spot.png')} width="90%" height="90%" title="Click to view full size image" />


Spot instances offer **discounts of up to 90% for the same performance of On-Demand instances**, which makes them a great option for cost savings. But, as discussed previously, their availability is subject to Amazon's two-minute interruption notice. This is where **Cluster Orchestrator's Spot instance orchestration** comes into play. 

Upon receiving a Spot interruption notice, the Cluster Orchestrator searches for an alternate Spot Instance with adequate capacity and minimal likelihood of future interruptions so the workload can be shifted to the newly found Spot Instance.

But, in case **Spot capacity is unavailable**, a fallback to On-Demand instances occurs to maintain availability. The frequency at which this lookout for new spot machine after fallback happens can be configured by the user (minutes, hours or days). But even though this happens, in background, Cluster Orchestrator continuously monitors Spot capacity and looks for available Spot Instances. When a new Spot Instance is found, it seamlessly switches back to Spot Instances thereby increasing the utilization of Spot Instances and maximizing savings.

This entire setup ensures that users remain up-to-date with AWS spot management without manual intervention.

## How is Harness Cluster Orchestrator Different?

### Workload Distribution Between Spot and On-Demand for Maximum Efficiency

Spot orchestration is efficient for spot-ready workloads that can tolerate interruptions, but critical workloads cannot afford this risk. To address this, we developed a custom resource: the workload distribution rule. This rule enables three key capabilities:

    - **Replica Splitting:** You can now split replicas within a workload, allowing some replicas to run on On-Demand instances and others on Spot instances. This flexibility reduces interference and risk, unlike the previous option of running all replicas on either spot or On-Demand instances.

<DocImage path={require('./static/replica.png')} width="80%" height="80%" title="Click to view full size image" />

    - **Cost-Optimized and Least-Interrupted Configurations:** The workload distribution rule can be set to either:

        - **Cost-Optimized** : All Spot replicas run on the minimum number of nodes, maximizing cost savings but increasing risk. The Spot Instances come from the lowest-priced pool that has available capacity. If the lowest-priced pool doesn't have available capacity, the Spot Instances come from the next-lowest-priced pool that has available capacity. If a pool runs out of capacity before fulfilling your desired capacity, EC2 Fleet will continue to fulfill your request by drawing from the next-lowest-priced pool. To ensure that your desired capacity is met, you might receive Spot Instances from several pools. Because this strategy only considers instance price and not capacity availability, it might lead to high interruption rates.

        - **Least-Interrupted** : Cluster Orchestrator identifies the pools with the highest capacity availability for the number of instances that are launching. This means that it will request Spot Instances from the pools that have the lowest chance of interruption in the near term. It also splits the replicas to multiple Spot nodes to minimize disruption. This strategy works well for workloads that may have a higher cost of interruption associated with restarting work or workloads that cannot be interrupted often. By offering the possibility of fewer interruptions, the least-interrupted strategy can lower the overall cost of your workload.

<DocImage path={require('./static/configuration.png')} width="80%" height="80%" title="Click to view full size image" />

    - **Base On-Demand Capacity Configuration:** You can define a fixed number of On-Demand replicas, with additional capacity split between On-Demand and Spot nodes according to your preferences.

### Automatic Scaling of Nodes
The Cluster Orchestrator can automatically scale nodes for minimizing costs. When the demand is high and more resources are needed, the Cluster Orchestrator can provision more nodes and when the demand is less, it can scale down as well.

### Dynamic Selection of Node Instance Families
Node instance families are dynamically selected based on user preferences and workload requirements, eliminating the need to manage auto scaling groups manually.

## Example: 84% savings on a non-production cluster

Let’s take an example of a non-production EKS cluster to illustrate how staggering the savings can be with Harness CCM and the Cluster Orchestrator.

This sample non-production EKS cluster has 10 m4.xlarge nodes running in the US East (Ohio) on Linux. 

<DocImage path={require('./static/example.png')} width="90%" height="90%" title="Click to view full size image" />

EKS EC2 Nodes: 10

**Each Node:**
- CPU - 4
- Memory - 16 GiB
- Price - $144/mo
- m4.xlarge in US East (Ohio) on Linux 
- Pods per Node: 4

**Each Pod:**
- CPU - 1
- Memory - 4 GiB
- Price - $36

**Without the Cluster Orchestrator:** On-Demand cost, running all month: $1,440

**With the Cluster Orchestrator & AutoStopping:** On-Demand cost after dynamic idle time scale down: $533 ($907 or 63% savings)

**Assumptions:**
- Avg. 70% idle time per month across pods
- Min. 1 Node at all times 

**Final Spot cost after dynamic idle time scale down: $231 ($1,209 or 84% savings)**

**Assumptions:**

- 81% Spot savings over On-Demand for m4.xlarge running in US East (Ohio) on Linux
- 70% Spot nodes, 30% On-Demand nodes

## Saving Computation for Cluster Orchestrator

With Cluster Orchestrator, the savings are realized from the spot utilization of the connected EKS cluster. 

- n: Total number of nodes running
- x: Number of on-demand nodes
- y: Number of spot nodes
- n = x + y

The **Potential Cost** of the cluster is the amount the cluster would have cost if all n nodes were running as on-demand nodes. 

The **Actual Cost** of the cluster is the combined price of x on-demand nodes and y spot nodes. 

Hence, the **Actual Savings** is the difference between these two values.

`Actual Savings** = Potential Cost - Actual Cost`

The Cluster Orchestrator has an inbuilt algorithm for computing the potential cost and actual cost, and thus the actual savings are derived from these two costs.

