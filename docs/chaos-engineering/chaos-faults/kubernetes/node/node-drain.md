---
id: node-drain
title: Node drain
---

Node drain drains the node of all its resources running on it. 
- Due to this, services running on the target node should be rescheduled to run on other nodes. 

![Node Drain](./static/images/node-drain.png)


## Use cases
- This fault drains all the resources running on a node. 
- It determines the resilience of the application when the application replicas scheduled on a node are removed.
- It validates the application failover capabilities when a node suddenly becomes unavailable.
- It simulates node maintenance activity (hardware refresh, OS patching, Kubernetes upgrade). 
- It verifies resource budgeting on cluster nodes (whether request (or limit) settings are honored on available nodes).
- It verifies whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not. 

**Note**
- Kubernetes > 1.16 is required to execute this fault.
- Node specified in the <code>TARGET_NODE</code> environment variable (the node for which Docker service would be killed) should be cordoned before executing the chaos fault. This ensures that the fault resources are not scheduled on it (or subject to eviction). This is achieved by the following steps:
  - Get node names against the applications pods using command <code>kubectl get pods -o wide</code>.
  - Cordon the node using command <code>kubectl cordon &lt;nodename&gt;</code>.
- The target nodes should be in the ready state before and after injecting chaos.

## Fault tunables

### Mandatory Fields

| Variables    | Description                                                         | Notes                                                                                                                                                                                                                                                                                                                                |
|--------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TARGET_NODES | Comma-separated list of nodes subject to node CPU hog.              | More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes">here.</a>                                                                                                                                                        |
| NODE_LABEL   | It contains the node label that is used to filter the target nodes. | It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">here.</a> |

### Optional fields

| Variables            | Description                                                                                       | Notes                                                                                                                                                                         |
|----------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TOTAL_CHAOS_DURATION | Duration that you specify, through which chaos is injected into the target resource (in seconds). | Defaults to 60s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">here.</a> |
| RAMP_TIME            | Period to wait before injecting chaos (in seconds).                                               | For example, 30s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">here.</a>            |

### Drain node

It contains the name of the target node subject to the chaos. Tune it by using the `TARGET_NODE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-drain/node-drain.yaml yaml)
```yaml
# drain the targeted node
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-drain
    spec:
      components:
        env:
        # name of the target node
        - name: TARGET_NODE
          value: 'node01'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
