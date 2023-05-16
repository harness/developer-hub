---
title: Common node fault tunables
---
## Introduction
Fault tunables which are common to all the node faults are described here. These tunables can be provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Target single node

Name of the target node. Tune it by using the `TARGET_NODE` environment variable. It contains a single node name.

:::info note
It supports node drain, node taint, node restart, kubelet service kill, and docker service kill faults. 
:::

The following YAML snippet illustrates the use of this environment variable:

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

### Target multiple nodes

Comma-separated names of the target nodes. Tune it by using the `TARGET_NODES` environment variable.

:::info note
It supports node CPU hog, node memory hog, and node I/O stress faults.
:::

The following YAML snippet illustrates the use of this environment variable:

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

### Target nodes with labels

Labels of the target nodes. Tune it by using the `NODE_LABEL` environment variable.
This variable is mutually exclusive with the `TARGET_NODE` environment variable. If `TARGET_NODE` environment variable is set, the nodes provided will be used. Otherwise, it derives the node name(s) by matching it with the node labels.

The following YAML snippet illustrates the use of this environment variable:

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

### Node affected percentage

Percentage of target nodes that match the node labels. Tune it by using the `NODES_AFFECTED_PERC` environment variable. If `NODES_AFFECTED_PERC` environment variable is set to `empty` or `0`, it targets a minimum of one node.
It supports node CPU hog, node memory hog, and node I/O stress faults.

The following YAML snippet illustrates the use of this environment variable:

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
