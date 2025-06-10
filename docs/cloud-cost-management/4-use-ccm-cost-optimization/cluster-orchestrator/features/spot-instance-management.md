---
title: Spot Instance Management
description: Learn how Harness Cluster Orchestrator manages AWS Spot Instances for optimal cost savings and reliability
sidebar_position: 1
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# Spot Instance Management

## Understanding AWS Spot Instances

AWS Spot Instances offer significant cost savings (up to 90% compared to On-Demand pricing) for the same performance as On-Demand instances. However, they come with a key limitation: AWS can reclaim these instances with only a two-minute warning when capacity is needed elsewhere.

This interruption risk creates challenges for Kubernetes workloads that require stability and reliability.

## How Cluster Orchestrator Manages Spot Instances

Harness Cluster Orchestrator provides sophisticated Spot Instance management capabilities designed to maximize cost savings while maintaining application reliability:

<DocImage path={require('./static/working.png')} width="90%" height="90%" title="Click to view full size image" />

### 1. Intelligent Spot Selection and Interruption Handling

When AWS sends a Spot interruption notice, Cluster Orchestrator:

1. Immediately searches for an alternate Spot Instance with adequate capacity and minimal likelihood of future interruptions
2. If suitable Spot capacity is found, workloads are seamlessly migrated to the new Spot Instance
3. If no Spot capacity is available, the system automatically falls back to On-Demand instances to maintain workload availability
4. In the background, Cluster Orchestrator continuously monitors Spot capacity availability
5. When Spot capacity becomes available again, workloads are automatically migrated back to Spot Instances to maximize cost savings

This entire process happens without any manual intervention, ensuring you benefit from AWS Spot savings while maintaining workload availability.

### 2. Advanced Workload Distribution

Cluster Orchestrator's unique workload distribution capabilities set it apart from standard Kubernetes solutions:

#### Replica Splitting

Unlike traditional approaches that run all replicas of a workload on either Spot or On-Demand instances, Cluster Orchestrator enables:

- Splitting replicas within a single workload between Spot and On-Demand instances
- Running critical replicas on stable On-Demand instances while placing others on cost-effective Spot instances
- Reducing risk while still capturing significant cost savings

#### Distribution Strategies

Cluster Orchestrator offers two sophisticated distribution strategies:

**Cost-Optimized Strategy**

The Cost-Optimized strategy prioritizes maximum cost savings by:

- Running Spot replicas on the minimum number of nodes to maximize efficiency
- Selecting Spot Instances from the lowest-priced pools with available capacity
- Cascading to the next-lowest-priced pool when capacity is exhausted
- Optimizing for immediate cost reduction over interruption avoidance

This approach is ideal for non-critical workloads that can tolerate occasional interruptions.

**Least-Interrupted Strategy**

The Least-Interrupted strategy prioritizes workload stability by:

- Identifying Spot pools with the highest capacity availability to minimize interruption risk
- Distributing replicas across multiple Spot nodes to reduce the impact of any single interruption
- Selecting instances from pools with historically lower interruption rates
- Balancing slightly higher costs against fewer interruptions

This strategy is better suited for production workloads where stability is important but cost savings are still desired.

## Configuring Spot Management

<DocImage path={require('../static/ctl-five.png')} width="100%" title="Spot Instance Management" />

To configure Cluster Orchestrator's Spot instance management capabilities:

1. Navigate to the **Cloud Cost Management** module in your Harness account
2. Select **Cluster Orchestrator** from the left navigation menu
3. Click on your cluster name in the list of available clusters
4. In the setup wizard, navigate to the **Spot Preferences** tab
