---
id: gcp-vm-disk-status-check
title: GCP VM Disk Status Check
sidebar_label: GCP VM Disk Status Check
description: Built-in Command Probe template that validates whether GCP Compute Engine persistent disks are in a ready-to-use state during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - gcp probe
  - persistent disk status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - gcp-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM Disk Status Check is a built-in Command Probe template that validates whether one or more Google Cloud Compute Engine persistent disks are in a ready-to-use state during a chaos experiment. You select disks by name or by label, which makes the probe flexible across static and dynamically provisioned storage.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Compute Engine API, and prints `[Pass]` when every targeted disk is ready to use. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that persistent disks stay attached and ready during chaos experiments.
- Validate disk availability after VM failures or restarts.
- Monitor storage health during infrastructure chaos.
- Confirm data persistence during compute disruptions.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name gcp-vm-disk`. The utility resolves the target disks from `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL` in the supplied `GCP_PROJECT_ID` and `ZONES`, calls the Compute Engine API, and prints `[Pass]` when every resolved disk is in a ready-to-use state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Google Cloud Compute Engine API endpoints.
- **GCP credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target disks exist:** Every value in `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL` resolves to a disk in `GCP_PROJECT_ID` and `ZONES`.

---

## Permissions required

The service account used by the probe needs the following Compute Engine permissions:

- `compute.disks.get`
- `compute.disks.list`

The probe uses the GCP credentials available to your chaos infrastructure. Go to [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) to grant access, or go to [prepare a secret for GCP](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to provide service account credentials as a secret.

---

## Probe properties

### Command

```bash
healthchecks -name gcp-vm-disk
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted persistent disk is in a ready-to-use state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISK_VOLUME_NAMES` | Comma-separated list of persistent disk names to check (for example, `disk-1,disk-2`). Provide this or `DISK_VOLUME_LABEL`. | Conditional | - |
| `DISK_VOLUME_LABEL` | Label of the persistent disks to check (for example, `env=production`). Provide this or `DISK_VOLUME_NAMES`. | Conditional | - |
| `GCP_PROJECT_ID` | GCP project ID where the disk is located (for example, `my-project-123456`). | Yes | - |
| `ZONES` | Comma-separated list of GCP zones where the disk is deployed (for example, `us-central1-a,us-central1-b`). | Yes | - |

:::info Disk selection
Provide at least one of `DISK_VOLUME_NAMES` or `DISK_VOLUME_LABEL`.
:::

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
  issue="GCP VM Disk Status Check probe fails with a permission denied error"
  mode="general"
  fallback="The service account available to the chaos infrastructure does not have the required Compute Engine permissions. Confirm that the service account has compute.disks.get and compute.disks.list (for example through the Compute Viewer role) on the project named in GCP_PROJECT_ID."
/>

<Troubleshoot
  issue="GCP VM Disk Status Check probe reports the disk was not found"
  mode="general"
  fallback="The disk name or label did not resolve in the supplied project and zones. Verify that the values in DISK_VOLUME_NAMES or DISK_VOLUME_LABEL are correct, that GCP_PROJECT_ID owns the disks, and that ZONES lists every zone where the disks reside."
/>

<Troubleshoot
  issue="GCP VM Disk Status Check probe reports the disk is not ready to use"
  mode="general"
  fallback="The disk exists but is not in a ready-to-use state, which can happen while a disk is being created, attached, or restored. Increase the run-property timeout and retry count so the probe waits for the disk to become ready, and confirm that the fault recovery step reattaches the disk."
/>

---

## Related probe templates

- [GCP VM Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-vm-instance-status-check): Validate that VM instances are running.
- [GCP SQL Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-sql-instance-status-check): Validate that a Cloud SQL instance is running.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
