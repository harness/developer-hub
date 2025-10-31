---
id: gcp-vm-disk-status-check
---

# GCP VM Disk Status Check {#introduction}

Validates if a GCP Compute Engine persistent disk is in ready to use state.

## Infrastructure type

- **Kubernetes**

## Use cases

GCP VM Disk Status Check probe helps you:
- Verify persistent disks remain attached and ready during chaos experiments
- Validate disk availability after VM failures or restarts
- Monitor storage health during infrastructure chaos
- Ensure data persistence during compute disruptions

---

## Overview

This probe uses the GCP CLI to query persistent disk status and validates that the disk is in a ready-to-use state. It supports filtering by disk names or labels, making it flexible for various deployment scenarios.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- GCP credentials configured with appropriate IAM permissions:
  - `compute.disks.get`
  - `compute.disks.list`
- Network connectivity to GCP API endpoints
- Target persistent disks should exist in the specified zones

---

## Probe properties

### Command
```
healthchecks -name gcp-vm-disk
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the persistent disk is in a ready-to-use state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISK_VOLUME_NAMES` | Comma-separated list of persistent disk names to check (e.g., `disk-1,disk-2`). One of `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL` must be specified. | No* | - |
| `DISK_VOLUME_LABEL` | Label of the persistent disk to check (e.g., `env=production`). One of `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL` must be specified. | No* | - |
| `GCP_PROJECT_ID` | GCP Project ID where the disk is located (e.g., `my-project-123456`). | Yes | - |
| `ZONES` | Comma-separated list of GCP zones where the disk is deployed (e.g., `us-central1-a,us-central1-b`). | Yes | - |

**Note:** At least one of `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL` must be provided.

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

### Using disk names

```yaml
probe:
  - name: "gcp-disk-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name gcp-vm-disk"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: DISK_VOLUME_NAMES
          value: "disk-1,disk-2,disk-3"
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

### Using disk labels

```yaml
probe:
  - name: "gcp-disk-label-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "healthchecks -name gcp-vm-disk"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: DISK_VOLUME_LABEL
          value: "environment=production"
        - name: GCP_PROJECT_ID
          value: "my-project-123456"
        - name: ZONES
          value: "europe-west1-b"
    runProperties:
      timeout: 60s
      interval: 5s
      attempt: 3
      pollingInterval: 2s
