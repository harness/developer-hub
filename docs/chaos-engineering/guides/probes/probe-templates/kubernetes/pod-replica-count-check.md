---
id: pod-replica-count-check
---

# Pod Replica Count Check {#introduction}

Pod replica count check validates the current replica count of Kubernetes pods.

## Infrastructure type

- **Kubernetes**

## Use cases

Pod Replica Count Check probe helps you:
- Verify deployments maintain desired replica count
- Validate auto-scaling behavior during load chaos
- Monitor application availability during pod failures
- Ensure high availability during chaos experiments

---

## Overview

This probe validates that Kubernetes resources (Deployments, StatefulSets, DaemonSets, etc.) maintain the minimum required number of healthy replicas during chaos experiments.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- Access to target namespace and resources
- Sufficient RBAC permissions to query resource status

---

## Probe properties

### Command
```
healthchecks -name validate-pod-replica
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the resource has the minimum required healthy replicas.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TARGET_LABELS` | Comma-separated list of target labels to filter resources. | No | - |
| `TARGET_NAMES` | Comma-separated list of target resource names. | No | - |
| `TARGET_NAMESPACE` | Namespace of the target resources. | No | - |
| `TARGET_KIND` | Kind of the target resource (e.g., `deployment`, `statefulset`, `daemonset`). | No | deployment |
| `MINIMUM_HEALTHY_REPLICA_COUNT` | Minimum healthy replica count for the target. | No | 1 |
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

### Using resource labels

```yaml
probe:
  - name: "replica-count-validation"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-replica"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_LABELS
          value: "app=nginx,tier=frontend"
        - name: TARGET_NAMESPACE
          value: "production"
        - name: TARGET_KIND
          value: "deployment"
        - name: MINIMUM_HEALTHY_REPLICA_COUNT
          value: "3"
    runProperties:
      timeout: 180s
      interval: 1s
      attempt: 1
      stopOnFailure: false
```

### Using resource names

```yaml
probe:
  - name: "deployment-replica-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name validate-pod-replica"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: TARGET_NAMES
          value: "my-deployment,my-statefulset"
        - name: TARGET_NAMESPACE
          value: "default"
        - name: MINIMUM_HEALTHY_REPLICA_COUNT
          value: "2"
        - name: STATUS_CHECK_TIMEOUT
          value: "120"
    runProperties:
      timeout: 150s
      interval: 2s
      attempt: 3
```
