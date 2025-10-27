---
id: gcp-vm-instance-status-check
---

# GCP VM Instance Status Check {#introduction}

Validates if a GCP Compute Engine VM instance is in Running state.

## Infrastructure type

- **Kubernetes**

## Use cases

GCP VM Instance Status Check probe helps you:
- Verify VM instances remain running during chaos experiments
- Validate instance recovery after failures or restarts
- Monitor VM health in multi-zone deployments
- Ensure compute availability during infrastructure chaos

---

## Overview

This probe uses the GCP CLI to query VM instance status and validates that the instance is in the 'RUNNING' state. It supports filtering by instance names or labels, making it flexible for various deployment scenarios.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- GCP credentials configured with appropriate IAM permissions:
  - `compute.instances.get`
  - `compute.instances.list`
- Network connectivity to GCP API endpoints
- Target VM instances should exist in the specified zones

---

## Probe properties

### Command
```
healthchecks -name gcp-vm-instance
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the VM instance is in the 'RUNNING' state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VM_INSTANCE_NAMES` | Comma-separated list of VM instance names to check (e.g., `instance-1,instance-2`). One of `VM_INSTANCE_NAMES` or `INSTANCE_LABEL` must be specified. | No* | - |
| `INSTANCE_LABEL` | Label of the VM instance to check (e.g., `env=production`). One of `VM_INSTANCE_NAMES` or `INSTANCE_LABEL` must be specified. | No* | - |
| `GCP_PROJECT_ID` | GCP Project ID where the VM is located (e.g., `my-project-123456`). | Yes | - |
| `ZONES` | Comma-separated list of GCP zones where the VM is deployed (e.g., `us-central1-a,us-central1-b`). | Yes | - |

**Note:** At least one of `VM_INSTANCE_NAMES` or `INSTANCE_LABEL` must be provided.

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (e.g., `30s`, `1m`, `5m`) | String | 300s |
| `interval` | Time between probe executions (e.g., `5s`, `30s`, `1m`) | String | 10s |
| `attempt` | Number of retry attempts before marking the probe as failed | Integer | 1 |
| `pollingInterval` | Time between retry attempts (e.g., `1s`, `5s`, `10s`) | String | - |
| `initialDelay` | Initial delay before starting the probe (e.g., `0s`, `10s`, `30s`) | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails | Boolean | false |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`) | String | - |
| `retry` | Number of times to retry the probe on failure | Integer | - |

---

## Probe definition

You can define this probe in your chaos experiment as follows:

### Using instance names

```yaml
probe:
  - name: "gcp-vm-instance-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name gcp-vm-instance"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: VM_INSTANCE_NAMES
          value: "instance-1,instance-2,instance-3"
        - name: GCP_PROJECT_ID
          value: "my-project-123456"
        - name: ZONES
          value: "us-central1-a,us-central1-b"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
```

### Using instance labels

```yaml
probe:
  - name: "gcp-vm-label-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name gcp-vm-instance"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: INSTANCE_LABEL
          value: "environment=production"
        - name: GCP_PROJECT_ID
          value: "my-project-123456"
        - name: ZONES
          value: "asia-south1-a"
    runProperties:
      timeout: 60s
      interval: 5s
      attempt: 3
      pollingInterval: 2s
