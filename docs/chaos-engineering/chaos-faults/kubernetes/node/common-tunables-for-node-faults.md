---
title: Common node fault tunables
---
Fault tunables which are common to all the node faults are described here. These tunables can be provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Target single node

It defines the name of the target node subject to chaos. You can tune it using the `TARGET_NODE` environment variable. It contains a single node name.

**Note**
It supports node drain, node taint, node restart, kubelet service kill, and docker service kill faults. 

Use the following example to tune it:

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

It defines the comma-separated names of the target nodes subject to chaos. You can tune it using the `TARGET_NODES` environment variable.
**Note:** It supports node CPU hog, node memory hog, and node I/O stress faults.

Use the following example to tune it:

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

It defines the labels of the target node(s) subject to chaos. You can tune it using the `NODE_LABEL` environment variable.
It is mutually exclusive with the `TARGET_NODE` environment variable. If `TARGET_NODE` environment variable is set, the nodes provided will be used. Otherwise, it derives the node name(s) by matching it with the node labels.

Use the following example to tune it:

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

It defines the percentage of nodes subject to chaos by matching the node labels. You can tune it using the `NODES_AFFECTED_PERC` environment variable. If `NODES_AFFECTED_PERC` environment variable is set to `empty` or `0`, it targets a minimum of one node.
It supports node CPU hog, node memory hog, and node I/O stress faults.

Use the following example to tune it:

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
