---
title: Overview
description: This topic introduces Cluster Orchestrator
sidebar_position: 1
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note

Currently, this early access feature is behind a feature flag . Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Harness’ Cloud Cost Management is centered on three key pillars: Cost Visibility, Cost Optimization and Cost Governance.
Currently AutoStopping, Recommendations and Commitment Orchestrator are present under cost optimisation. Harness CCM has added Cluster Orchestrator for EKS (Beta) to enhance workload-driven autoscaling and intelligent management of AWS Spot instances, contributing to overall cost efficiency. 

## AWS Spot Instances and challenges 

Amazon EC2 provides a range of purchase options catering to diverse computing needs, including On-Demand Instances, Reserved Instances, and Spot Instances. While On-Demand Instances offer flexibility with pay-as-you-go pricing, Reserved Instances provide significant cost savings with long-term commitments. Spot Instances, on the other hand, allow users to bid for unused EC2 capacity at lower prices, making them ideal for fault-tolerant, flexible and stateless workloads. However, Spot Instances come with challenges such as potential interruptions and the risk of termination within just 2 minutes of a notice if capacity becomes unavailable.

<DocImage path={require('./static/aws-pricing.png')} width="70%" height="70%" title="Click to view full size image" />

## Harness Cluster Orchestrator for Amazon Elastic Kubernetes Service (EKS)

The **Harness Cluster Orchestrator** for Amazon Elastic Kubernetes Service (EKS), a component of the Harness Cloud Cost Management (CCM) module, is designed to tackle the obstacles listed above. It **intelligently scales EKS cluster nodes** according to actual workload requirements. Additionally, by leveraging CCM's **distributed Spot orchestration capability**, you can **save up to 90% on cloud costs** with Amazon EC2 Spot Instances.

It also facilitates **workload-driven autoscaling**, dynamically adjusting cluster resources to match workload demands while optimizing the utilization of AWS Spot instances. This approach ensures **efficient resource allocation** and **cost-effective cluster management**. Harness' Cluster Orchestrator for Amazon EKS **distinguishes itself** from other solutions in the market because of additional features like **distributed spot orchestration**.

## AWS Service Ready Partner

Harness is a part of [**AWS Service Ready Program**](https://aws.amazon.com/blogs/apn/optimize-cost-and-performance-with-amazon-ec2-spot-ready-partners/) for Amazon EC2 Spot instances. This recognition acknowledges that Harness CCM with Cluster Orchestrator adheres to **industry best practices** and provides **robust API support** for effectively managing Amazon EC2 Spot instances in customers' cloud environments.

Being part of the Amazon EC2 Spot Service Ready Program distinguishes Harness as an esteemed member of the AWS Partner Network (APN) with a solution that seamlessly integrates with Amazon EC2 Spot instances. This ensures that our product is widely accessible and fully supports AWS customers, enabling them to leverage the **cost-saving benefits** of Amazon EC2 Spot instances for their workloads. In the upcoming time, **not only AWS but other cloud providers will be supported** too. 


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
- **Workload-Aware Scaling**: Scale additional capacity on cost-effective Spot nodes
- **Traffic Pattern Optimization**: Ideal for applications requiring guaranteed availability with cost-efficient scaling

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
