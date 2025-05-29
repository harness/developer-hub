---
title: Overview
description: Learn how Harness Cluster Orchestrator manages AWS Spot Instances to maximize cost savings while maintaining workload availability
sidebar_position: 1
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---


AWS Spot Instances are unused EC2 capacity that Amazon offers at steep discounts—up to 90% off On-Demand pricing—making them an excellent choice for cost optimization. However, these instances come with a significant trade-off: AWS can reclaim them with just a two-minute notice when they need the capacity back.

This volatility creates challenges for workload stability and availability, which is where Harness Cluster Orchestrator's intelligent Spot Instance management comes into play.

## How Cluster Orchestrator Manages Spot Instances

Cluster Orchestrator provides a comprehensive solution for managing Spot Instances in your EKS clusters, ensuring both cost savings and workload availability through several key capabilities:

### Intelligent Interruption Handling

When AWS issues a Spot Instance interruption notice, Cluster Orchestrator immediately:

1. **Detects the interruption signal** through AWS's termination notice
2. **Cordons the affected node** to prevent new pods from being scheduled
3. **Initiates a search** for replacement capacity with similar specifications
4. **Drains workloads** gracefully from the affected node
5. **Relocates pods** to the new capacity before the instance terminates

### Smart Fallback Mechanisms

If suitable Spot capacity isn't immediately available, Cluster Orchestrator implements a fallback strategy:

- **Automatic fallback to On-Demand instances** to maintain workload availability
- **Configurable fallback policies** that balance cost savings with availability requirements
- **Continuous monitoring** for Spot capacity even after falling back to On-Demand

### Reverse Fallback for Maximum Savings

Cluster Orchestrator doesn't stop at fallback, it continuously works to optimize costs:

- **Periodic checks** for available Spot capacity at configurable intervals
- **Automatic transition** back to Spot Instances when they become available
- **Seamless workload migration** that maintains application availability during transitions

