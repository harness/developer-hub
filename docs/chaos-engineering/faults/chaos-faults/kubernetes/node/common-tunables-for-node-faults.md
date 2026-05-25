---
title: Common node fault tunables
sidebar_label: Common Node Fault Tunables
description: Environment variables shared by node-level chaos faults for selecting target nodes by name, by label, or by percentage.
keywords:
  - chaos engineering
  - node fault tunables
  - target node
  - node label
  - nodes affected percentage
tags:
  - chaos-engineering
  - node-faults
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/common-tunables-for-node-faults
  - /docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults
---

These tunables apply to every node-level chaos fault in Harness Chaos Engineering. Set them on the fault in Chaos Studio to choose which nodes the experiment targets.

---

## Target single node

Use the `TARGET_NODE` environment variable to name the single node the fault should run against.

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE` | Name of the node to target. | `""` |

Supported by: [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain), [Node taint](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-taint), [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart), [Kubelet service kill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/kubelet-service-kill).

```yaml
- name: TARGET_NODE
  value: "node01"
```

---

## Target multiple nodes

Use the `TARGET_NODES` environment variable to target a comma-separated list of nodes.

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODES` | Comma-separated list of node names to target. | `""` |

Supported by: [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog), [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog), [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress), [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss), [Node network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-latency).

```yaml
- name: TARGET_NODES
  value: "node01,node02"
```

---

## Target nodes with labels

Use the `NODE_LABEL` environment variable to select target nodes by label. This is mutually exclusive with `TARGET_NODE` and `TARGET_NODES`. If both are set, the explicit node list wins.

| Tunable | Description | Default |
| --- | --- | --- |
| `NODE_LABEL` | Label selector in `key=value` form. The fault targets nodes whose labels match. | `""` |

```yaml
- name: NODE_LABEL
  value: "kubernetes.io/role=worker"
```

---

## Node affected percentage

Use the `NODES_AFFECTED_PERCENTAGE` environment variable to target a percentage of nodes that match the label selector. A value of `0` (the default) means one node.

| Tunable | Description | Default |
| --- | --- | --- |
| `NODES_AFFECTED_PERCENTAGE` | Percentage of nodes (matching the selector) to target. `0` means one node. | `0` |

Supported by: [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog), [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog), [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress).

```yaml
- name: NODES_AFFECTED_PERCENTAGE
  value: "100"
- name: NODE_LABEL
  value: "kubernetes.io/role=worker"
```
