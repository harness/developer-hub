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

AWS Spot Instances offer significant cost savings (up to 90% compared to On-Demand pricing) by allowing you to utilize unused EC2 capacity. However, they come with a key limitation: AWS can reclaim these instances with only a two-minute warning when capacity is needed elsewhere.

This interruption risk creates challenges for Kubernetes workloads that require stability and reliability.

## How Cluster Orchestrator Manages Spot Instances

Harness Cluster Orchestrator provides sophisticated Spot Instance management capabilities designed to maximize cost savings while maintaining application reliability:

<DocImage path={require('./static/working.png')} width="90%" height="90%" title="Click to view full size image" />

### 1. Intelligent Spot Selection

Cluster Orchestrator analyzes AWS Spot market data to identify the optimal Spot Instance types for your workloads based on:

- **Historical interruption rates** across different instance families and sizes
- **Current market conditions** and capacity availability
- **Price stability** patterns in different availability zones
- **Your workload requirements** for CPU, memory, and other resources

This analysis helps select Spot Instances that offer the best balance between cost savings and stability for your specific needs.

### 2. Interruption Handling

When AWS signals that a Spot Instance will be interrupted, Cluster Orchestrator:

- **Detects the interruption signal** immediately
- **Cordons the affected node** to prevent new workloads from being scheduled
- **Gracefully drains workloads** with respect to PodDisruptionBudgets
- **Triggers replacement capacity** provisioning
- **Reschedules workloads** to maintain application availability

This process happens automatically within the two-minute warning window, ensuring your applications remain available even during Spot interruptions.

### 3. Capacity Diversification

To reduce the impact of Spot interruptions, Cluster Orchestrator implements capacity diversification strategies:

- **Multi-instance-type approach** that spreads workloads across different instance families
- **Availability zone distribution** to mitigate zone-specific interruptions
- **Capacity pool selection** that balances between the lowest-cost and most-stable options

## Configuring Spot Management

### Spot Strategy Selection

Cluster Orchestrator offers two primary strategies for Spot Instance management:

#### Cost-Optimized Strategy

The Cost-Optimized strategy prioritizes maximum cost savings by:

- Running workloads on the lowest-priced Spot pools available
- Cascading to the next-lowest-priced pool when capacity is exhausted
- Optimizing for immediate cost reduction over interruption avoidance

This approach is ideal for non-critical workloads that can tolerate occasional interruptions.

#### Least-Interrupted Strategy

The Least-Interrupted strategy prioritizes workload stability by:

- Selecting Spot pools with historically lower interruption rates
- Choosing instances from pools with higher capacity availability
- Balancing slightly higher costs against fewer interruptions

This strategy is better suited for production workloads where stability is more important than maximizing cost savings.

### Base Capacity Settings

You can configure a base level of On-Demand capacity to ensure critical workloads always have stable resources available, while allowing the rest of your cluster to leverage Spot savings.

## Benefits of Cluster Orchestrator's Spot Management

- **Maximized cost savings** through intelligent Spot utilization
- **Minimized interruption impact** through proactive management
- **Simplified operations** with automated handling of complex Spot dynamics
- **Balanced approach** that optimizes for both cost and reliability
