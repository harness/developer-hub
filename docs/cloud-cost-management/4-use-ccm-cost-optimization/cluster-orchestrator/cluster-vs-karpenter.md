---
title: Cluster Orchestrator vs Karpenter
description: Compare Harness Cluster Orchestrator with AWS Karpenter and discover unique advantages
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## Harness Cluster Orchestrator vs AWS Karpenter

### 1. Spot Node Orchestration

| Feature | Karpenter | Cluster Orchestrator |
|---------|-----------|---------------------|
| **Setup Complexity** | Requires manual SQS Queue setup and maintenance | Works out-of-the-box with zero configuration |
| **Interruption Handling** | Basic SQS-based monitoring | Sophisticated interruption prediction and handling |
| **Node Selection** | Limited strategy options | Configurable strategies (cost-optimized, least-interrupted) |
| **Fallback Mechanism** | Basic fallback to On-Demand | Intelligent fallback with reverse fallback capability |


### 2. Cost Visibility and Savings Analysis

| Feature | Karpenter | Cluster Orchestrator |
|---------|-----------|---------------------|
| **Cost Savings Visibility** | No visibility into cost savings achieved through Spot usage | Real-Time Savings Insights: Track actual cost savings from Spot node utilization |
| **Cluster Cost Insights** | Lacks insights into cluster cost optimization potential | Comprehensive Cost Analysis: Perspectives provide deep cluster cost visibility |

### 3. Intelligent Bin Packing

While Karpenter offers basic consolidation policies and budgets for node consolidation, it lacks granular control over underutilization thresholds. Users cannot precisely define what constitutes "underutilized" resources, limiting optimization effectiveness.

Cluster Orchestrator addresses this gap by allowing users to configure specific CPU and Memory percentage thresholds. When node usage falls below these customizable thresholds, the system intelligently evicts pods to other available nodes in the cluster. This process respects Pod Disruption Budgets and scheduling constraints, ensuring application availability while achieving efficient bin packing and optimal resource utilization.

### 4. Dynamic Spot/On-Demand Split Configuration

This feature is exclusive to Cluster Orchestrator and provides unprecedented control over workload distribution:

- **Percentage-Based Distribution**: Define exact percentages for Spot vs On-Demand pod placement
- **Base Capacity Management**: Maintain minimum On-Demand replicas for critical traffic

### 5. Commitment Utilization Guarantee

**Karpenter:**
- No active or complete management of Reserved Instances or Savings Plans
- Requires manual configuration on your nodepools
- Can lead to over-provisioning and missed commitment utilization if manual data is not correct

**Cluster Orchestrator:**
- **Commitment Integration**: Full integration with Harness Commitment Orchestrator
- **Utilization**: Ensures maximum utilization of idle commitment capacity
- **Cost Optimization**: Prevents over-provisioning by leveraging pre-purchased capacity

### 6. Replacement Schedules

**Cluster Orchestrator:**
- **Scheduled Operations**: Time-window based control when disruptive operations (bin packing, consolidation, reverse fallback) execute
- **Business-Aware Scheduling**: Prevent disruptions during critical business hours
