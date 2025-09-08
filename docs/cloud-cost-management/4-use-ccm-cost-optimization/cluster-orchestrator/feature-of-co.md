---
title: Features of Cluster Orchestrator
description: Features of Cluster Orchestrator
sidebar_position: 4
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Orchestrator Configuration Features

When enabling Cluster Orchestrator, you can configure various settings under the **Orchestrator Configuration** section:

<Tabs>
<TabItem value="cluster" label="Cluster Preferences">

<DocImage path={require('./static/cluster-one.png')} width="80%" height="80%" title="Click to view full size image" />
- **Enable Commitment Context (Integration with Commitment Orchestrator):** Select the Master Account from your connector dropdown to leverage existing commitments. When enabled, Cluster Orchestrator intelligently checks for unused commitments and prioritizes them over spot instances, preventing duplicate coverage and maximizing your cloud investment. This integration ensures optimal utilization of pre-purchased compute capacity before provisioning additional resources.
- **Set the Time-To-Live (TTL) for Karpenter nodes:** Set the Time-To-Live (TTL) for Karpenter nodes to ensure that nodes are automatically terminated after a specified period of inactivity.

- **Cluster Capacity Limits:** Cluster Capacity Limits restrict the maximum resources a cluster per nodepool can scale up to. This prevents scenarios where configuration errors or unexpected behavior could result in uncontrolled node provisioning. When configured, Cluster Capacity Limits enforce limits on:
    - Maximum vCPUs (cores) – defines the total CPU capacity the cluster Nodepool can scale up to.
    - Maximum Memory (GiB) – defines the total memory capacity the cluster Nodepool can scale up to.

      If, Karpenter Nodepools Already have limits configured, when new nodepools (spot/ondemand) are created out of the existing karpenter nodepools, the limits configuration will be copied over. If the limits are configured on the cluster level, then the limits will be copied over to all nodepools which does not have a limit set explicitly in the default nodepool. If limits are not set on Cluster Config/Default Nodepool, then a default limit will be calculated by cluster orchestrator with the following equation and will be applied on all the nodepools managed by Harness:

      ```
      cpu = total cpu available in the cluster * 2
      memory = total memory available in the cluster * 2
      ```

- **Bin-Packing:** Bin-packing is a resource optimization technique that Cluster Orchestrator uses to efficiently distribute workloads across your Kubernetes cluster. The goal is to maximize resource utilization by consolidating workloads onto fewer nodes, allowing underutilized nodes to be safely removed from the cluster.
    - **Pod Eviction By Harness:** To optimize resources, nodes may be evicted before consolidation. Enabling this ensures workloads are safely rescheduled to maintain performance and availability while freeing up underutilized resources.
        - **Single replica eviction of workload:** Can be set to On or Off
        - **Resource Utilization Thresholds:** Set minimum CPU and memory usage levels to determine when a node is considered underutilized. This helps balance cost savings and performance by ensuring nodes are consolidated only when their resources fall below the specified thresholds.
      - **Bin Packing Supports Robust Distribution Mode from `0.5.1`:** **Robust Distribution Mode** is an enhancement to the default Cluster Orchestrator scheduling flow which gets automatically enabled when bin packing is enabled. With Bin Packing enabled, the orchestrator enforces the configured spot/on-demand distribution more effectively. It identifies pods that violate distribution rules due to configuration changes or missing tolerations. Using the Kubernetes Descheduler's policy `RemovePodsViolatingNodeTaints`, it automatically evicts pods from incompatible nodes and reschedules them to nodes that match your configured distribution.

        <DocImage path={require('./static/cluster-two.png')} width="80%" height="80%" title="Click to view full size image" />

    - **Node Disruption Using Karpenter:** Activate Karpenter's node disruption management to optimize resource utilization and maintain application stability. Toggalable Options:
    - **Node Deletion Criteria:** Choose when nodes should be targeted for removal:
        - **Empty:** Only nodes with no running pods will be removed
        - **Underutilized:** Nodes that fall below your defined CPU and memory thresholds will be consolidated
    - **Node Deletion Delay:** This setting controls how long a node should remain in the cluster after becoming empty before it's deleted. You can specify a time period (e.g., 10 minutes) after which nodes with no pods will be deleted. 
    - **Disruption Budgets:** Manage node consolidation by specifying limits on allowed disruptions as a percentage or a fixed number.Disruption budgets provide a safety mechanism to prevent excessive node terminations that could impact application availability. For each disruption budget, you can:
            - **Select reason:** Drifted, Underutilized, Empty
            - **Allowed node disruptions:** Specify percentage or number of nodes
            - **Budget scheduling:** When a budget begins being active. It can be set to be: (hourly, midnight, daily, weekly, monthly or annually) and Active duration (Specifies how long the budget remains active)
    

- **Spot to Spot Consolidation:** Automatically switch workloads between spot instance types when cheaper options become available to maximize cost savings while maintaining performance requirements for your cluster. 

:::important
- If Node Deletion Delay or Bin Packing is not set, the cluster won't scale down. 
:::
</TabItem>
<TabItem value="spot" label="Spot Preferences">

<DocImage path={require('./static/cluster-three.png')} width="80%" height="80%" title="Click to view full size image" />

### Spot Instance Management

Run all or specific workloads on spot instances to achieve significant cost savings. Cluster Orchestrator provides comprehensive spot orchestration with built-in interruption handling to maintain workload availability while optimizing costs.

#### Key Configuration Options:

- **Spot/On-demand Split**: Define the percentage distribution between spot and on-demand instances (out of 100). Higher spot percentages increase cost savings but may introduce more volatility.

- **Base On-demand Capacity**: Establish a minimum number of on-demand instances that will always run regardless of the spot/on-demand split. This ensures a stable foundation for critical workloads that require guaranteed availability.

- **Distribution Strategy**: Choose between:
  - **Cost Optimized**: All Spot replicas run on the minimum number of nodes, maximizing cost savings but increasing risk. The Spot Instances come from the lowest-priced pool that has available capacity. If the lowest-priced pool doesn't have available capacity, the Spot Instances come from the next-lowest-priced pool that has available capacity. [Read More](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/working#how-is-harness-cluster-orchestrator-different)
  - **Least Interrupted**: Cluster Orchestrator identifies the pools with the highest capacity availability for the number of instances that are launching. This means that it will request Spot Instances from the pools that have the lowest chance of interruption in the near term. It also splits the replicas to multiple Spot nodes to minimize disruption. [Read More](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/working#how-is-harness-cluster-orchestrator-different)

- **Spot Ready**: Determine which workloads can run on spot instances:
  - **All Workloads**: Apply spot/on-demand split to all workloads regardless of replica count (more aggressive savings)
  - **Spot-ready Workloads Only**: Apply spot configuration only to workloads with multiple replicas (>1), ensuring single-replica critical services remain on reliable on-demand instances

- **Reverse Fallback Retry**: When spot instances are interrupted, Cluster Orchestrator automatically replaces them with on-demand instances (fallback). This setting controls how frequently the system attempts to replace those on-demand instances with spot instances once spot capacity becomes available again, helping you return to optimal cost efficiency.

</TabItem>
<TabItem value="replacement" label="Replacement Schedules">

<DocImage path={require('./static/cluster-four.png')} width="80%" height="80%" title="Click to view full size image" />

Define precise time windows when cluster disruptions are acceptable for maintenance operations. During these scheduled periods, Cluster Orchestrator performs node replacements, consolidations, and system updates that might temporarily affect workload availability.

#### Schedule Options:

- **Custom**: Define specific days and time windows when maintenance can occur (e.g., weekends, off-hours, or maintenance windows aligned with your business cycle). This gives you complete control over when potentially disruptive operations take place.

- **Always**: Maintenance operations can occur at any time, prioritizing cost savings and efficiency over potential disruption. Best for non-production environments or systems with built-in resilience.

- **Never**: Disables automatic maintenance operations completely. All changes require manual intervention. Use this for highly sensitive production workloads where any disruption is unacceptable.

#### Operations Governed by Schedules:

- **Bin-packing Operations**:
  - **Harness Pod Eviction**: Controls when pods can be evicted from nodes to facilitate consolidation
  - **Node Consolidation**: Determines when underutilized nodes can be drained and removed

- **Spot Instance Management**:
  - **Reverse Fallback**: Schedules when on-demand instances can be replaced with spot instances after spot capacity becomes available again
  
</TabItem>
</Tabs>

