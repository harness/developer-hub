---
id: pod-warnings-check
---

# Pod Warnings Check {#introduction}

Pod warnings check checks for warnings in the pod events.

## Infrastructure type

- **Kubernetes**

## Use cases

Pod Warnings Check probe helps you:
- Monitor pod health indicators during chaos experiments
- Detect configuration issues during experiments
- Validate application behavior under stress
- Identify potential problems before they become critical

---

## Overview

This probe checks for warning events in pod event logs. It's useful for detecting issues like image pull errors, scheduling problems, resource constraints, and other warnings that might indicate problems during chaos experiments.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Access to target namespace and pods
- Sufficient RBAC permissions to query pod events

---

## Probe properties

### Command
```
healthchecks -name validate-pod-failure
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating no warning events were found in the pod logs.

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
  - name: "pod-warnings-validation"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-failure"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx"
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
  - name: "specific-pod-warnings-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-failure"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-app-pod"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: STATUS_CHECK_TIMEOUT
          value: "120"
    runProperties:
      timeout: 150s
      interval: 2s
      attempt: 3
```
