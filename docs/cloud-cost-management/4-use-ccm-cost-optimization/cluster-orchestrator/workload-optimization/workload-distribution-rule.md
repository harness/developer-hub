---
title: Workload Distribution Rules
description: Learn how to configure workload distribution between Spot and On-Demand instances in Harness Cluster Orchestrator
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

Workload Distribution Rules are custom resources in Cluster Orchestrator that give you fine-grained control over how your applications are distributed between Spot and On-Demand instances. These rules allow you to balance cost savings with reliability based on your specific workload requirements.

## Configuration Levels

Cluster Orchestrator allows you to configure workload distribution at two levels:

### Cluster-Level Configuration

The cluster-level configuration serves as the default rule for all workloads across your entire cluster.

### Namespace-Level Configuration

For more granular control, you can create namespace-specific rules that override the cluster-level configuration for workloads in particular namespaces.

```yaml
apiVersion: ccm.harness.io/v1
kind: WorkloadDistributionRule
metadata:
  name: production-rule     # You can choose any name for namespace-level rules
spec:
  namespace: production     # The namespace this rule applies to
  distribution:
    spot: 30                # Lower percentage of Spot for production workloads
    ondemand: 70            # Higher percentage of On-Demand for stability
  selector: SpotReady       # Selector for eligible workloads
```

**Key points about namespace-level rules:**
- You can create multiple rules for different namespaces
- Each rule must specify the namespace it applies to
- These rules override the cluster-level rule for the specified namespace
- If no rule exists for a namespace, the cluster-master rule applies

## Workload Selection

The `selector` field determines which workloads the rule applies to. Currently, Cluster Orchestrator supports the following selectors:

- **`SpotReady`**: Applies to workloads that can tolerate Spot instance interruptions
- **`All`**: Applies to all workloads in the namespace or cluster
