---
id: pod-status-check
---

# Pod Status Check {#introduction}

Pod status check validates the current state of Kubernetes pods.

## Infrastructure type

- **Kubernetes**

## Use cases

Pod Status Check probe helps you:
- Verify pods remain in Running state during chaos experiments
- Validate pod health after failures and restarts
- Monitor application availability continuously
- Ensure pods recover to healthy state after disruptions

---

## Overview

This probe validates that pods are in the expected state (typically Running) during chaos experiments. It's one of the most fundamental probes for ensuring application availability.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Access to target namespace and pods
- Sufficient RBAC permissions to query pod status

---

## Probe properties

### Command
```
healthchecks -name pod-level
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating all specified pods are in a healthy Running state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of target labels to filter pods. | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | No | - |
| `TARGET_KIND` | Kind of the target resource (e.g., `deployment`, `statefulset`, `daemonset`). | No | deployment |
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

### Using pod labels

```yaml
probe:
  - name: "pod-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name pod-level"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx,tier=frontend"
        - name: TARGET_NAMESPACE
          value: "production"
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

### Using pod names

```yaml
probe:
  - name: "specific-pod-status-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name pod-level"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-app-pod-1,my-app-pod-2"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: STATUS_CHECK_TIMEOUT
          value: "120"
    runProperties:
      timeout: 150s
      interval: 2s
      attempt: 3
```
