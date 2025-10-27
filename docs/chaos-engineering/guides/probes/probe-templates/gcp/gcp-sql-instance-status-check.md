---
id: gcp-sql-instance-status-check
---

# GCP SQL Instance Status Check {#introduction}

Validates if a GCP Cloud SQL instance is in Running state.

## Infrastructure type

- **Kubernetes**

## Use cases

GCP SQL Instance Status Check probe helps you:
- Verify Cloud SQL instances remain available during chaos experiments
- Validate database failover behavior and recovery
- Monitor database health during network disruptions
- Ensure database availability during infrastructure changes

---

## Overview

This probe uses the GCP CLI to query Cloud SQL instance status and validates that the instance is in the 'RUNNABLE' state. It's essential for ensuring database availability during chaos experiments targeting GCP infrastructure.

### Probe type
**Command Probe**

### Prerequisites

- Kubernetes cluster with chaos infrastructure installed
- GCP credentials configured with appropriate IAM permissions:
  - `cloudsql.instances.get`
  - `cloudsql.instances.list`
- Network connectivity to GCP API endpoints
- Target Cloud SQL instance should exist in the specified project

---

## Probe properties

### Command
```
healthchecks -name gcp-sql-instance
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | [Pass] |

The probe passes when the command output contains `[Pass]`, indicating the Cloud SQL instance is in the 'RUNNABLE' state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SQL_INSTANCE_NAME` | Name of the Cloud SQL instance to check (e.g., `my-sql-instance`). | Yes | - |
| `GCP_PROJECT_ID` | GCP Project ID where the instance is located (e.g., `my-project-123456`). | Yes | - |

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

```yaml
probe:
  - name: "gcp-sql-instance-health-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "healthchecks -name gcp-sql-instance"
      comparator:
        type: "string"
        criteria: "contains"
        value: "[Pass]"
      env:
        - name: SQL_INSTANCE_NAME
          value: "my-sql-instance"
        - name: GCP_PROJECT_ID
          value: "my-project-123456"
    runProperties:
      timeout: 300s
      interval: 10s
      attempt: 1
      stopOnFailure: false
