---
id: node-status-check
---

# Node Status Check {#introduction}

Node status check validates the current state of Kubernetes nodes.

## Infrastructure type

- **Kubernetes**

## Use cases

Node Status Check probe helps you:
- Verify nodes remain healthy during chaos experiments
- Validate node recovery after failures
- Monitor cluster health during node-level chaos
- Ensure node availability during infrastructure disruptions

---

## Overview

This probe validates that Kubernetes nodes are in a healthy state during chaos experiments. It supports filtering by node names or labels, making it suitable for checking specific nodes or groups of nodes in your cluster.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Access to cluster nodes
- Sufficient RBAC permissions to query node status

---

## Probe properties

### Command
```
healthchecks -name node-level
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating all specified nodes are in a healthy state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_NODE` | Comma-separated list of nodes to be checked. One of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL` must be specified. | No* | - |
| `TARGET_NODES` | Comma-separated list of nodes to be checked. One of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL` must be specified. | No* | - |
| `NODE_LABEL` | Node label to filter nodes to be checked (e.g., `node-role.kubernetes.io/worker=`). One of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL` must be specified. | No* | - |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for status check. | No | 180 |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | 2 |

**Note:** At least one of `TARGET_NODE`, `TARGET_NODES`, or `NODE_LABEL` must be provided.

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (e.g., `30s`, `1m`, `5m`) | String | 180s |
| `interval` | Time between probe executions (e.g., `1s`, `5s`, `10s`) | String | 1s |
| `attempt` | Number of retry attempts before marking the probe as failed | Integer | 1 |
| `pollingInterval` | Time between retry attempts (e.g., `1s`, `5s`, `10s`) | String | - |
| `initialDelay` | Initial delay before starting the probe (e.g., `0s`, `10s`, `30s`) | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails | Boolean | false |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`) | String | - |

---

## Probe definition

You can define this probe in your chaos experiment as follows:

### Using node names

```yaml
probe:
  - name: "node-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name node-level"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NODES
          value: "node-1,node-2,node-3"
        - name: STATUS_CHECK_TIMEOUT
          value: "180"
        - name: STATUS_CHECK_DELAY
          value: "2"
    runProperties:
      timeout: 180s
      interval: 1s
      attempt: 1
      stopOnFailure: false
```

### Using node labels

```yaml
probe:
  - name: "worker-nodes-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name node-level"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: NODE_LABEL
          value: "node-role.kubernetes.io/worker="
        - name: STATUS_CHECK_TIMEOUT
          value: "120"
    runProperties:
      timeout: 150s
      interval: 2s
      attempt: 3
      pollingInterval: 5s
```
