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

## Cluster Infrastructure and challenges  

#### 1. Dynamic Workload Balancing ✓ SOLVED

Traditional clusters struggle with fluctuating workload demands, leading to either over-provisioning (wasted resources) or under-provisioning (performance issues).

**Cluster Orchestrator Solution**: AI-driven predictive scaling that anticipates workload changes before they occur, maintaining optimal performance while minimizing costs through real-time resource allocation adjustments.

#### 2. Cost Visibility & Allocation ✓ SOLVED

Organizations struggle to gain comprehensive visibility into cluster costs across pods and nodes due to diverse consumption patterns.

**Cluster Orchestrator Solution**: Granular cost attribution with team/project tagging capabilities and customizable dashboards that provide real-time cost insights down to the pod level, enabling accurate chargeback models.

#### 3. Resource Optimization ✓ SOLVED

Persistent overprovisioning of workloads and nodes leads to significant cloud waste, while choosing between instance types adds complexity.

**Cluster Orchestrator Solution**: Intelligent bin-packing algorithms that maximize node utilization and automatically select the optimal mix of On-Demand, Reserved, and Spot instances based on workload characteristics and business priorities.

#### 4. Pod-to-Node Orchestration ✓ SOLVED

Kubernetes' native horizontal (HPA) and vertical (VPA) pod autoscaling often create mismatches with available node resources.

**Cluster Orchestrator Solution**: Seamless coordination between pod autoscaling and node provisioning through workload-aware node groups that ensure pods always have the right infrastructure, eliminating pending pods and reducing deployment disruptions by 95%.

## Harness Cluster Orchestrator for Amazon Elastic Kubernetes Service (EKS)

The **Harness Cluster Orchestrator** for Amazon Elastic Kubernetes Service (EKS), a component of the Harness Cloud Cost Management (CCM) module, is designed to tackle the obstacles listed above. It **intelligently scales EKS cluster nodes** according to actual workload requirements. Additionally, by leveraging CCM's **distributed Spot orchestration capability**, you can **save up to 90% on cloud costs** with Amazon EC2 Spot Instances.

It also facilitates **workload-driven autoscaling**, dynamically adjusting cluster resources to match workload demands while optimizing the utilization of AWS Spot instances. This approach ensures **efficient resource allocation** and **cost-effective cluster management**. Harness' Cluster Orchestrator for Amazon EKS **distinguishes itself** from other solutions in the market because of additional features like **distributed spot orchestration**.

> ### AWS Service Ready Partner
> 
> Harness is a part of [**AWS Service Ready Program**](https://aws.amazon.com/blogs/apn/optimize-cost-and-performance-with-amazon-ec2-spot-ready-partners/) for Amazon EC2 Spot instances. This recognition acknowledges that Harness CCM with Cluster Orchestrator adheres to **industry best practices** and provides **robust API support** for effectively managing Amazon EC2 Spot instances in customers' cloud environments.
> 
> Being part of the Amazon EC2 Spot Service Ready Program distinguishes Harness as an esteemed member of the AWS Partner Network (APN) with a solution that seamlessly integrates with Amazon EC2 Spot instances. This ensures that our product is widely accessible and fully supports AWS customers, enabling them to leverage the **cost-saving benefits** of Amazon EC2 Spot instances for their workloads. In the upcoming time, **not only AWS but other cloud providers will be supported** too. 

