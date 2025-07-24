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
| **Fallback & Reverse Fallback** | Basic fallback: moves pods to On-Demand once Spot is interrupted; no automatic return | Intelligent fallback automatically launches an On-Demand instance when Spot capacity is unavailable or an interruption risk is detected **and** reverse fallback seamlessly moves workloads back to Spot when capacity is healthy. |


### 2. Cost Visibility and Savings Analysis

| Feature | Karpenter | Cluster Orchestrator |
|---------|-----------|---------------------|
| **Cost Savings Visibility** | No visibility into cost savings achieved through Spot usage | Real-Time Savings Insights: Track actual cost savings from Spot node utilization |
| **Cluster Cost Insights** | Lacks insights into cluster cost optimization potential | Comprehensive Cost Analysis: Perspectives provide deep cluster cost visibility |

### 3. Intelligent Bin Packing

| Feature | Karpenter | Cluster Orchestrator |
|---------|-----------|---------------------|
| **Granular Thresholds** | Fixed consolidation logic; cannot tune under-utilisation levels | Customisable CPU & Memory thresholds that drive extra bin-packing on top of Karpenter’s consolidation |
| **Pod Evictions** | Basic eviction | Evicts pods intelligently while honoring Pod Disruption Budgets |
| **Resulting Utilisation** | Moderate | Maximised node utilisation and lower waste |

### 4. Dynamic Spot/On-Demand Split Configuration

| Capability | Karpenter | Cluster Orchestrator |
|------------|-----------|---------------------|
| **Percentage-based Spot/On-Demand mix** | Not available | Specify exact Spot vs On-Demand percentages via WorkloadDistributionRules |
| **Base capacity safeguards** | Not available | Ensure minimum On-Demand replicas for critical workloads |

### 5. Commitment Utilization Guarantee

| Feature | Karpenter | Cluster Orchestrator |
|---------|-----------|---------------------|
| **RI / Savings Plan awareness** | Limited; manual tracking required | Fully integrated with [Harness Commitment Orchestrator](https://developer.harness.io/docs/category/commitment-orchestrator) |
| **Automatic node type selection** | Not supported | Launches nodes that consume idle commitments first |
| **Over-provisioning risk** | High if data outdated | Minimized by commitment-aware scheduling |

### 6. Replacement Windows

| Capability | Karpenter | Cluster Orchestrator |
|------------|-----------|---------------------|
| **Time-window control for disruptive ops** | Available (NodePool Disruption Budgets) | Schedule bin packing / consolidation inside defined windows |
| **Business-hour safeguards** | Not available | Skip disruptive actions during critical periods |
