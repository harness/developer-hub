---
title: Bin-Packing and Node Optimization
description: Learn how Harness Cluster Orchestrator uses bin-packing to optimize resource utilization and reduce costs
sidebar_position: 3
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# Bin-Packing and Node Optimization

## What is Bin-Packing?

Bin-packing is a resource optimization technique that Cluster Orchestrator uses to efficiently distribute workloads across your Kubernetes cluster. The goal is to maximize resource utilization by consolidating workloads onto fewer nodes, allowing underutilized nodes to be safely removed from the cluster.

This approach offers several benefits:

- **Reduced infrastructure costs**: By running your workloads on fewer nodes, you pay for less infrastructure
- **Improved resource efficiency**: Higher utilization of your existing resources
- **Simplified management**: Fewer nodes means less operational overhead

## How to Configure Bin-Packing

To access and configure bin-packing settings for your cluster:

1. Navigate to the **Cloud Cost Management** module in your Harness account
2. Select **Cluster Orchestrator** from the left navigation menu
3. Click on your cluster name in the list of available clusters
4. If Cluster Orchestrator is not yet enabled, click **Enable** to begin the setup process
5. In the setup wizard, navigate to the **Cluster Preferences** tab
6. Scroll to the **Bin-packing** section to configure your settings
<!-- 
<DocImage path={require('./static/bin-packing-config.png')} width="90%" height="90%" title="Bin-Packing Configuration Screen" /> -->

From this configuration screen, you can adjust all bin-packing related settings including:
- Pod eviction options
- Resource utilization thresholds
- Node deletion criteria and delay
- Disruption budgets
- Spot to Spot consolidation

## Key Features

<DocImage path={require('../static/ctl-three.png')} width="100%" title="Spot Instance Management" />

### Pod Eviction by Harness

To optimize resources effectively, Cluster Orchestrator may need to evict pods from underutilized nodes before consolidation. This feature ensures that workloads are safely rescheduled to maintain performance and availability while freeing up resources.

**Configuration options:**

- **Single Replica Eviction**: Toggle this setting on or off depending on your tolerance for workload disruption. When enabled, even single-replica workloads can be evicted and rescheduled to optimize resource usage.

> **Note:** Pod eviction is performed with careful consideration of pod disruption budgets, ensuring that application availability is maintained according to your defined requirements.

### Resource Utilization Thresholds

These settings determine when a node is considered underutilized and becomes a candidate for consolidation. By configuring minimum CPU and memory usage thresholds, you can balance cost savings with performance needs.

**Configurable thresholds:**

- **Minimum CPU Utilization**: Set the percentage of CPU usage below which a node is considered underutilized
- **Minimum Memory Utilization**: Set the percentage of memory usage below which a node is considered underutilized

For example, setting CPU utilization to 30% means that nodes using less than 30% of their CPU capacity will be considered for consolidation, with their workloads potentially moved to other nodes.

## Node Disruption using Karpenter

Cluster Orchestrator leverages Karpenter's advanced node management capabilities to intelligently disrupt and replace nodes based on your defined criteria. Unlike standard Kubernetes scaling, this feature provides fine-grained control over when and how nodes are removed from your cluster.

### Node Deletion Criteria

You can choose when nodes should be targeted for removal:

- **Empty**: Only nodes with no running pods will be removed
- **Underutilized**: Nodes that fall below your defined CPU and memory thresholds will be consolidated

### Node Deletion Delay

This setting controls how long a node should remain in the cluster after becoming empty before it's deleted. You can specify a time period (e.g., 10 minutes) to prevent premature node removal during temporary workload fluctuations.

### Disruption Budgets

Disruption budgets provide a safety mechanism to prevent excessive node terminations that could impact application availability. By setting these budgets, you can control the pace of cluster changes, ensuring that cost optimization activities don't compromise service reliability.

**Customizable disruption rules:**

1. **Trigger conditions**:
   - **Drifted**: When nodes no longer match your optimal instance types
   - **Underutilized**: When nodes fall below resource utilization thresholds
   - **Empty**: When nodes have no running workloads

2. **Change scope**:
   - Percentage-based: Limit disruptions to a percentage of your cluster (e.g., 20%)
   - Count-based: Specify a maximum number of nodes (e.g., no more than 5 nodes)

3. **Schedule activation** (optional):
   - **Frequency options**: Hourly, Midnight, Daily, Weekly, Monthly, or Annually
   - **Active duration**: Control how long the budget remains in effect after activation

## Spot to Spot Consolidation

This advanced feature continuously monitors AWS Spot instance pricing across all available instance families and automatically migrates your workloads to take advantage of price fluctuations.

Unlike basic Spot implementations that only react to interruptions, this proactive approach seeks out better deals even when your current Spot instances are stable. This means you're always running on the most cost-effective Spot instances available, maximizing your savings.

**Benefits of Spot to Spot Consolidation:**

- **Continuous cost optimization**: Automatically moves workloads to lower-priced Spot instances
- **Proactive management**: Doesn't wait for interruptions to optimize
- **Broader instance selection**: Considers all compatible instance families, not just your current types
- **Automatic workload migration**: Handles the complexity of moving workloads between instance types


For detailed monitoring information, refer to the [Post-Enablement Monitoring](/docs/cloud-cost-management/4-use-ccm-cost-optimization/cluster-orchestrator/post-enablement) documentation.

