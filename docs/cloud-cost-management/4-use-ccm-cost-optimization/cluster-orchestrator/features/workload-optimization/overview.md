---
title: Workload Optimization Overview
description: Learn how Harness Cluster Orchestrator optimizes workload distribution between Spot and On-Demand instances
sidebar_position: 1
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## Balancing Cost and Reliability

Workload optimization in Cluster Orchestrator focuses on intelligently distributing your applications between Spot and On-Demand instances to achieve the optimal balance of cost savings and reliability.

While Spot instances offer significant cost savings (up to 90% compared to On-Demand), they come with the risk of interruption. Cluster Orchestrator solves this challenge through sophisticated workload distribution strategies.

## Workload Distribution Rules

Cluster Orchestrator introduces a custom resource called the **Workload Distribution Rule** that enables you to define exactly how your applications should be distributed across different instance types.

This approach provides three key capabilities:

### 1. Replica Splitting

Traditionally, all replicas of a workload would run on either Spot or On-Demand instances. Cluster Orchestrator's replica splitting allows you to:

- Split replicas within a single workload between Spot and On-Demand instances
- Specify exactly what percentage of replicas should run on each instance type
- Reduce risk by ensuring critical workloads always have some replicas on stable On-Demand instances

### 2. Strategic Spot Instance Selection

Cluster Orchestrator offers two optimization strategies for Spot instance selection:

#### Cost-Optimized Strategy

The Cost-Optimized strategy prioritizes maximum cost savings by:

- Running all Spot replicas on the minimum number of nodes
- Selecting instances from the lowest-priced Spot pools with available capacity
- Cascading to the next-lowest-priced pool when capacity is exhausted
- Drawing from multiple pools if necessary to meet capacity requirements

This approach maximizes cost savings but may lead to higher interruption rates since it prioritizes price over stability.

#### Least-Interrupted Strategy

The Least-Interrupted strategy prioritizes workload stability by:

- Identifying Spot pools with the highest capacity availability
- Selecting instances from pools with the lowest chance of near-term interruption
- Distributing replicas across multiple Spot nodes to minimize disruption impact
- Balancing slightly higher costs against fewer interruptions

This strategy is ideal for workloads that have higher costs associated with interruption or that cannot tolerate frequent disruptions.

### 3. Automatic Adaptation

Cluster Orchestrator continuously monitors both your workloads and AWS Spot market conditions to:

- Automatically adjust distribution based on changing conditions
- Preemptively migrate workloads when interruptions are likely
- Maintain the specified distribution ratios even as the cluster scales
