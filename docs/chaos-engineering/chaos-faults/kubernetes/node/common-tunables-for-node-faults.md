---
title: Common Node Fault Tunables
---
Fault tunables which are common for all the node faults. These tunables can be provided at `.spec.experiment[*].spec.components.env` in chaosengine.

### Target Single Node

It defines the name of the target node subjected to chaos. The target node can be tuned via `TARGET_NODE` ENV. It contains only a single node name.
`NOTE`: It is supported by [node-drain, node-taint, node-restart, kubelet-service-kill, docker-service-kill] faults. 

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/target-node.yaml yaml)
```yaml
## provide the target node name
## it is applicable for the [node-drain, node-taint, node-restart, kubelet-service-kill, docker-service-kill]
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
```

### Target Multiple Nodes

It defines the comma-separated name of the target nodes subjected to chaos. The target nodes can be tuned via `TARGET_NODES` ENV.
`NOTE`: It is supported by [node-cpu-hog, node-memory-hog, node-io-stress] faults.

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/target-nodes.yaml yaml)
```yaml
## provide the comma separated target node names
## it is applicable for the [node-cpu-hog, node-memory-hog, node-io-stress]
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-cpu-hog
    spec:
      components:
        env:
        # comma separated target node names
        - name: TARGET_NODES
          value: 'node01,node02'
```

### Target Nodes With Labels

It defines the labels of the targeted node(s) subjected to chaos. The node labels can be tuned via `NODE_LABEL` ENV.
It is mutually exclusive with the `TARGET_NODE(S)` ENV. If `TARGET_NODE(S)` ENV is set then it will use the nodes provided inside it otherwise, it will derive the node name(s) with matching node labels.

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/target-label.yaml yaml)
```yaml
## provide the labels of the targeted nodes
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-cpu-hog
    spec:
      components:
        env:
        # labels of the targeted node
        # it will derive the target nodes if TARGET_NODE(S) ENV is not set
        - name: NODE_LABEL
          value: 'key=value'
```

### Node Affected Percentage

It defines the percentage of nodes subjected to chaos with matching node labels. It can be tuned with `NODES_AFFECTED_PERC` ENV. If `NODES_AFFECTED_PERC` is provided as `empty` or `0` then it will target a minimum of one node.
It is supported by [node-cpu-hog, node-memory-hog, node-io-stress] faults. The rest of the fault selects only a single node for the chaos.

Use the following example to tune this:

[embedmd]:# (./static/manifests/common/node-affected-percentage.yaml yaml)
```yaml
## provide the percentage of nodes to be targeted with matching labels
## it is applicable for the [node-cpu-hog, node-memory-hog, node-io-stress]
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-cpu-hog
    spec:
      components:
        env:
        # percentage of nodes to be targeted with matching node labels
        - name: NODES_AFFECTED_PERC
          value: '100'
        # labels of the targeted node
        # it will derive the target nodes if TARGET_NODE(S) ENV is not set
        - name: NODE_LABEL
          value: 'key=value'
```
