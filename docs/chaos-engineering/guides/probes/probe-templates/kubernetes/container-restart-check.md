---
id: container-restart-check
---

# Container Restart Check {#introduction}

Container restart check validates the restart count of a container.

## Infrastructure type

- **Kubernetes**

## Use cases

Container Restart Check probe helps you:
- Verify containers don't restart excessively during chaos experiments
- Monitor container stability during resource stress
- Validate application resilience to failures
- Ensure pods maintain healthy restart counts

---

## Overview

This probe validates that container restart counts remain within acceptable thresholds during chaos experiments. It supports filtering by pod names, labels, or resource kinds (Deployment, StatefulSet, DaemonSet, etc.).

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
healthchecks -name validate-container-restart
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating container restart counts are within the acceptable threshold.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of target labels to filter pods (e.g., `app=nginx,env=prod`). | No | - |
| `TARGET_NAMES` | Comma-separated list of target pod names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target pods. | No | - |
| `TARGET_KIND` | Kind of the target resource (e.g., `deployment`, `statefulset`, `daemonset`). | No | deployment |
| `TARGET_CONTAINER` | Name of the container to check restart count. | No | - |
| `CONTAINER_RESTART` | Maximum allowed restart count. Restart count should be equal or less than this value. | No | 1 |
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
  - name: "container-restart-validation"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name validate-container-restart"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx,tier=frontend"
        - name: TARGET_NAMESPACE
          value: "production"
        - name: TARGET_CONTAINER
          value: "nginx"
        - name: CONTAINER_RESTART
          value: "3"
    runProperties:
      timeout: 180s
      interval: 1s
      attempt: 1
      stopOnFailure: false
```

### Using pod names

```yaml
probe:
  - name: "specific-pod-restart-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name validate-container-restart"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-app-pod-1,my-app-pod-2"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: CONTAINER_RESTART
          value: "5"
        - name: STATUS_CHECK_TIMEOUT
          value: "120"
    runProperties:
      timeout: 150s
      interval: 2s
      attempt: 3
```
