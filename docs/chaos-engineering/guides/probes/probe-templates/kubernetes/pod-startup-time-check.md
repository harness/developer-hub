---
id: pod-startup-time-check
---

# Pod Startup Time Check {#introduction}

Pod startup time check validates the startup time of Kubernetes pods.

## Infrastructure type

- **Kubernetes**

## Use cases

Pod Startup Time Check probe helps you:
- Validate pods start within acceptable timeframes
- Monitor deployment performance during rollouts
- Detect slow startup issues during chaos experiments
- Ensure application readiness times are optimal

---

## Overview

This probe validates that pods start within a specified duration. It's useful for monitoring deployment performance and ensuring applications initialize quickly after pod creation or restart.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Access to target namespace and pods
- Sufficient RBAC permissions to query pod status and events

---

## Probe properties

### Command
```
healthchecks -name validate-pod-startup-time
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating all pods started within the specified duration.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of target labels to filter pods. | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | No | - |
| `TARGET_KIND` | Kind of the target resource (e.g., `deployment`, `statefulset`, `daemonset`). | No | deployment |
| `AGE_CRITERIA` | Pods older than this age (in seconds) will be excluded from the check. | No | 300 |
| `STARTUP_DURATION_CUTOFF` | All pods should start within this duration (in seconds). | No | 300 |
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
  - name: "startup-time-validation"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-startup-time"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx"
        - name: TARGET_NAMESPACE
          value: "production"
        - name: STARTUP_DURATION_CUTOFF
          value: "120"
        - name: AGE_CRITERIA
          value: "600"
    runProperties:
      timeout: 180s
      interval: 1s
      attempt: 1
      stopOnFailure: false
```

### Using pod names

```yaml
probe:
  - name: "specific-pod-startup-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-startup-time"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-app-pod"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: STARTUP_DURATION_CUTOFF
          value: "60"
    runProperties:
      timeout: 90s
      interval: 2s
      attempt: 3
```
