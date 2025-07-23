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

Harness’ Cloud Cost Management (CCM) is built on three pillars: **Cost Visibility**, **Cost Optimization**, and **Cost Governance**.
Within the Cost Optimization pillar, **Cluster Orchestrator for Amazon EKS (Beta)** adds a next-generation, Karpenter-based autoscaling and scheduling engine that balances cost and performance across Spot, On-Demand, and committed capacity.

## Harness CCM Cluster Orchestrator for Amazon Elastic Kubernetes Service (EKS)

The **Harness Cluster Orchestrator** for EKS dynamically provisions the optimal mix of Spot, On-Demand, and committed capacity, guided by real-time workload demand and business constraints. Powered by Karpenter, it:

* Launches exactly-right nodes in seconds; no warm buffer required.
* Packs pods tightly using sophisticated bin-packing algorithms and disruption budgets.
* Automatically shifts workloads between Spot and On-Demand capacity with fallback and reverse-fallback.
* Prioritises pre-purchased Reserved Instances and Savings Plans to maximise commitment utilisation.
* Surfaces detailed, per-workload cost metrics directly in CCM Perspectives.

Combined, these capabilities can drive **up to 90 % cost savings** while maintaining application reliability.

### Key capabilities at a glance

- **Karpenter-based autoscaling** with quick, one-click migration for existing Karpenter users.
- **Advanced bin-packing & replacement schedules** to maximise node utilisation without over-provisioning.
- **Workload-level Spot/On-Demand distribution** with automated fallback and reverse-fallback logic.
- **Commitment-aware scheduling** that leverages Reserved Instances and Savings Plans before purchasing new capacity.
- **True workload cost attribution** and real-time cost tracking in CCM Perspectives.

## Key challenges solved

Harness Cluster Orchestrator tackles the most common obstacles teams face when running production workloads on EKS:

| Challenge | How Harness CCM Cluster Orchestrator solves it |
|-----------|------------------------------------|
| Unpredictable Spot interruptions | Automated fallback & reverse-fallback seamlessly migrate workloads between Spot and On-Demand with minimal disruption while maintaining high cost-savings. |
| Idle or over-provisioned nodes | Advanced bin-packing and replacement schedules right-size the cluster continuously, eliminating waste. |
| Slow, manual scaling | Karpenter-based engine launches exactly right nodes based on unscheduled pod resources in few seconds. |
| Under-utilised Reserved Instances / Savings Plans | When new nodes are required, Cluster Orchestrator automatically creates nodes using under-utilized instance types to maximise committed-usage efficiency. |
| Complex multi-workload requirements | NodePools & NodeClasses shape the node supply, while WorkloadDistributionRules specify the desired Spot/On-Demand split per cluster or per namespace (override) with automatic fallback. Together they give fine-grained, policy-driven workload placement. |
| Limited cost visibility | Per-workload, Per-namespace, per-node, etc. cost metrics are surfaced in CCM Perspectives for true-up and showback. |


## AWS Service Ready Partner

Harness is a part of [**AWS Service Ready Program**](https://aws.amazon.com/blogs/apn/optimize-cost-and-performance-with-amazon-ec2-spot-ready-partners/) for Amazon EC2 Spot instances. This recognition acknowledges that Harness CCM with Cluster Orchestrator adheres to **industry best practices** and provides **robust API support** for effectively managing Amazon EC2 Spot instances in customers' cloud environments.

Being part of the Amazon EC2 Spot Service Ready Program distinguishes Harness as an esteemed member of the AWS Partner Network (APN) with a solution that seamlessly integrates with Amazon EC2 Spot instances. This ensures that our product is widely accessible and fully supports AWS customers, enabling them to leverage the **cost-saving benefits** of Amazon EC2 Spot instances for their workloads. In the upcoming time, **not only AWS but other cloud providers will be supported** too. 
