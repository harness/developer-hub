---
title: Bin-Packing
description: Learn how Harness Cluster Orchestrator uses bin-packing to optimize resource utilization and reduce costs
sidebar_position: 3
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## What is Bin-Packing?

Bin-packing is a resource optimization technique that Cluster Orchestrator uses to efficiently distribute workloads across your Kubernetes cluster. The goal is to maximize resource utilization by consolidating workloads onto fewer nodes, allowing underutilized nodes to be safely removed from the cluster.

This approach is similar to efficiently packing items into containers to use the minimum number of containers possible—hence the name "bin-packing."

## How Cluster Orchestrator Implements Bin-Packing

Cluster Orchestrator's bin-packing functionality works through a series of intelligent processes:

### 1. Resource Utilization Analysis

The system continuously monitors node resource utilization across your cluster, identifying:

- **Underutilized nodes** that are running well below their capacity
- **Workload distribution patterns** across the cluster
- **Consolidation opportunities** where workloads can be redistributed

### 2. Pod Eviction and Rescheduling

To optimize resources, Cluster Orchestrator may evict pods from underutilized nodes before consolidation. This process:

- **Safely cordons nodes** to prevent new workloads from being scheduled
- **Gracefully evicts pods** with respect to PodDisruptionBudgets
- **Ensures workloads are rescheduled** on other nodes before removing the original node
- **Maintains performance and availability** throughout the consolidation process

### 3. Node Consolidation

After pods are safely rescheduled, Cluster Orchestrator:

- **Terminates underutilized nodes** to reduce infrastructure costs
- **Adjusts cluster capacity** based on actual resource needs
- **Optimizes instance distribution** across availability zones for reliability

## Configuring Bin-Packing

Cluster Orchestrator provides several configuration options to control bin-packing behavior:

### Single Replica Eviction

One of the key settings is the ability to control whether single-replica workloads can be evicted during bin-packing:

- **Enabled (On)**: Allows eviction of all workloads, including those with only one replica. This maximizes cost savings but may cause brief service disruptions for non-replicated workloads.
  
- **Disabled (Off)**: Prevents eviction of workloads with only one replica. This is a more conservative approach that prioritizes availability for non-replicated workloads at the cost of potentially less efficient bin-packing.

### Additional Configuration Options

Cluster Orchestrator also allows you to configure:

#### Resource Utilization Thresholds

This setting allows you to set minimum CPU and memory usage levels to determine when a node is considered underutilized. For example, you might configure:

- **CPU threshold**: 30% (nodes with less than 30% CPU utilization are candidates for consolidation)
- **Memory threshold**: 40% (nodes with less than 40% memory utilization are candidates for consolidation)

These thresholds help balance cost savings and performance by ensuring nodes are consolidated only when their resources fall below the specified levels.

Other configurable options include:

- **Consolidation schedule** - When bin-packing operations should occur (e.g., during off-peak hours)
- **Node drain timeout** - How long to wait for pods to be evicted before proceeding
