---
id: pod-resource-utilisation-check
---

# Pod Resource Utilisation Check {#introduction}

Pod resource utilisation check validates the current resource utilisation metrics of Kubernetes pods.

## Infrastructure type

- **Kubernetes**

## Use cases

Pod Resource Utilisation Check probe helps you:
- Monitor resource usage during stress chaos experiments
- Verify resource limits are respected
- Validate application performance under load
- Ensure pods don't exceed resource thresholds

---

## Overview

This probe validates that pod resource utilisation (CPU and memory) remains within acceptable limits during chaos experiments. It requires metrics-server to be installed in the cluster.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Metrics server installed and running in the cluster
- Access to target namespace and pods
- Sufficient RBAC permissions to query pod metrics

---

## Probe properties

### Command
```
healthchecks -name pod-resource-metrics-check
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating pod resource utilisation is within acceptable limits.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of target labels to filter pods. | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | No | - |
| `TARGET_KIND` | Kind of the target resource (e.g., `deployment`, `statefulset`, `daemonset`). | No | deployment |
| `TARGET_CONTAINER` | Name of the container to check resource metrics. | No | - |
| `METRIC_TYPE` | Metric type to check: `cpu` or `memory`. | No | cpu |
| `CPU_LIMIT` | Pods should have CPU usage (in millicores) less than or equal to this value. | No | 1000 |
| `MEMORY_LIMIT` | Pods should have memory usage (in MB) less than or equal to this value. | No | 1024 |
| `STATUS_CHECK_TIMEOUT` | Maximum time in seconds to wait for status check. | No | 180 |
| `STATUS_CHECK_DELAY` | Delay in seconds between status checks. | No | 2 |

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

### CPU utilisation check

```yaml
probe:
  - name: "cpu-utilisation-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name pod-resource-metrics-check"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx"
        - name: TARGET_NAMESPACE
          value: "production"
        - name: METRIC_TYPE
          value: "cpu"
        - name: CPU_LIMIT
          value: "800"
    runProperties:
      timeout: 180s
      interval: 1s
      attempt: 1
      stopOnFailure: false
```

### Memory utilisation check

```yaml
probe:
  - name: "memory-utilisation-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name pod-resource-metrics-check"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-app-pod"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: TARGET_CONTAINER
          value: "app-container"
        - name: METRIC_TYPE
          value: "memory"
        - name: MEMORY_LIMIT
          value: "2048"
    runProperties:
      timeout: 180s
      interval: 2s
      attempt: 3
