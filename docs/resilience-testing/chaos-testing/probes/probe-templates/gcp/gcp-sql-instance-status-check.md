---
id: gcp-sql-instance-status-check
title: GCP SQL Instance Status Check
sidebar_label: GCP SQL Instance Status Check
description: Built-in Command Probe template that validates whether a GCP Cloud SQL instance is in the Running state during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - gcp probe
  - cloud sql instance status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - gcp-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP SQL Instance Status Check is a built-in Command Probe template that validates whether a Google Cloud SQL instance is in the running state during a chaos experiment. Use it to assert that a managed database stays available and recovers cleanly while a fault disrupts the instance or its dependencies.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Cloud SQL Admin API, and prints `[Pass]` when the instance is in the `RUNNABLE` state. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that Cloud SQL instances stay available during chaos experiments.
- Validate database failover behavior and recovery.
- Monitor database health during network disruptions.
- Confirm database availability during infrastructure changes.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name gcp-sql-instance`. The utility resolves the instance named in `SQL_INSTANCE_NAME` in the supplied `GCP_PROJECT_ID`, calls the Cloud SQL Admin API, and prints `[Pass]` when the instance is in the `RUNNABLE` state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Cloud SQL Admin API endpoints.
- **GCP credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target instance exists:** The instance named in `SQL_INSTANCE_NAME` exists in `GCP_PROJECT_ID`.

---

## Permissions required

The service account used by the probe needs the following Cloud SQL permissions:

- `cloudsql.instances.get`
- `cloudsql.instances.list`

The probe uses the GCP credentials available to your chaos infrastructure. Go to [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) to grant access, or go to [prepare a secret for GCP](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to provide service account credentials as a secret.

---

## Probe properties

### Command

```bash
healthchecks -name gcp-sql-instance
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that the Cloud SQL instance is in the `RUNNABLE` state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SQL_INSTANCE_NAME` | Name of the Cloud SQL instance to check (for example, `my-sql-instance`). | Yes | - |
| `GCP_PROJECT_ID` | GCP project ID where the instance is located (for example, `my-project-123456`). | Yes | - |

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete (for example, `30s`, `1m`, `5m`). | String | `300s` |
| `interval` | Time between probe executions (for example, `5s`, `30s`, `1m`). | String | `10s` |
| `attempt` | Number of retry attempts before the probe is marked as failed. | Integer | `1` |
| `pollingInterval` | Time between retry attempts (for example, `1s`, `5s`, `10s`). | String | - |
| `initialDelay` | Initial delay before the probe starts (for example, `0s`, `10s`, `30s`). | String | - |
| `stopOnFailure` | Stop the experiment if the probe fails. | Boolean | `false` |
| `verbosity` | Log verbosity level (`info`, `debug`, `trace`). | String | - |
| `retry` | Number of times to retry the probe on failure. | Integer | - |

---

## Troubleshooting

<Troubleshoot
  issue="GCP SQL Instance Status Check probe fails with a permission denied error"
  mode="general"
  fallback="The service account available to the chaos infrastructure does not have the required Cloud SQL permissions. Confirm that the service account has cloudsql.instances.get and cloudsql.instances.list (for example through the Cloud SQL Viewer role) on the project named in GCP_PROJECT_ID."
/>

<Troubleshoot
  issue="GCP SQL Instance Status Check probe reports the instance was not found"
  mode="general"
  fallback="The instance did not resolve in the supplied project. Verify that SQL_INSTANCE_NAME matches the Cloud SQL instance name exactly and that GCP_PROJECT_ID is the project that owns the instance."
/>

<Troubleshoot
  issue="GCP SQL Instance Status Check probe times out before the instance reaches RUNNABLE"
  mode="general"
  fallback="The instance did not return to the RUNNABLE state within the probe timeout. Cloud SQL maintenance, failover, or restart operations can leave the instance in a transient state. Increase the run-property timeout and retry count, and confirm that the fault recovery step restores the instance."
/>

---

## Related probe templates

- [GCP VM Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-vm-instance-status-check): Validate that VM instances are running.
- [GCP VM Disk Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-vm-disk-status-check): Validate that a persistent disk is ready to use.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
