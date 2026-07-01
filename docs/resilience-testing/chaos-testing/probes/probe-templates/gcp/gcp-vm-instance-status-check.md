---
id: gcp-vm-instance-status-check
title: GCP VM Instance Status Check
sidebar_label: GCP VM Instance Status Check
description: Built-in Command Probe template that validates whether GCP Compute Engine VM instances are in the Running state during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - command probe template
  - gcp probe
  - compute engine vm status
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - gcp-probes
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM Instance Status Check is a built-in Command Probe template that validates whether one or more Google Cloud Compute Engine VM instances are in the `RUNNING` state during a chaos experiment. You select instances by name or by label, which makes the probe flexible across static fleets and dynamically scaled deployments.

The probe runs the `healthchecks` utility bundled in the chaos probe image, queries the Compute Engine API, and prints `[Pass]` when every targeted instance is in the `RUNNING` state. The comparator marks the probe as passed when the output contains `[Pass]`.

:::info Built-in probe template
This is a built-in Command Probe template that runs on Kubernetes chaos infrastructure. Add it to an experiment from the probe library and customize its inputs. Go to [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse the full library, or go to [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to understand how command probes work.
:::

---

## Use cases

Use this probe template to:

- Verify that VM instances stay in the `RUNNING` state during chaos experiments.
- Validate instance recovery after failures or restarts.
- Monitor VM health in multi-zone deployments.
- Confirm compute availability during infrastructure chaos.

---

## How the probe works

The template configures a Command Probe that runs `healthchecks -name gcp-vm-instance`. The utility resolves the target instances from `VM_INSTANCE_NAMES` or `INSTANCE_LABEL` in the supplied `GCP_PROJECT_ID` and `ZONES`, calls the Compute Engine API, and prints `[Pass]` when every resolved instance is in the `RUNNING` state. The comparator passes the probe when the output contains `[Pass]`, and fails it otherwise.

---

## Prerequisites

- **Chaos infrastructure:** A Kubernetes chaos infrastructure with network access to the Google Cloud Compute Engine API endpoints.
- **GCP credentials:** Cloud credentials available to the chaos infrastructure, with the permissions listed below.
- **Target instances exist:** Every value in `VM_INSTANCE_NAMES` or `INSTANCE_LABEL` resolves to an instance in `GCP_PROJECT_ID` and `ZONES`.

---

## Permissions required

The service account used by the probe needs the following Compute Engine permissions:

- `compute.instances.get`
- `compute.instances.list`

The probe uses the GCP credentials available to your chaos infrastructure. Go to [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) to grant access, or go to [prepare a secret for GCP](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to provide service account credentials as a secret.

---

## Probe properties

### Command

```bash
healthchecks -name gcp-vm-instance
```

### Comparator

| Type | Criteria | Value |
|------|----------|-------|
| string | contains | `[Pass]` |

The probe passes when the command output contains `[Pass]`, which indicates that every targeted VM instance is in the `RUNNING` state.

### Environment variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VM_INSTANCE_NAMES` | Comma-separated list of VM instance names to check (for example, `instance-1,instance-2`). Provide this or `INSTANCE_LABEL`. | Conditional | - |
| `INSTANCE_LABEL` | Label of the VM instances to check (for example, `env=production`). Provide this or `VM_INSTANCE_NAMES`. | Conditional | - |
| `GCP_PROJECT_ID` | GCP project ID where the VM is located (for example, `my-project-123456`). | Yes | - |
| `ZONES` | Comma-separated list of GCP zones where the VM is deployed (for example, `us-central1-a,us-central1-b`). | Yes | - |

:::info Instance selection
Provide at least one of `VM_INSTANCE_NAMES` or `INSTANCE_LABEL`.
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
  issue="GCP VM Instance Status Check probe fails with a permission denied error"
  mode="general"
  fallback="The service account available to the chaos infrastructure does not have the required Compute Engine permissions. Confirm that the service account has compute.instances.get and compute.instances.list (for example through the Compute Viewer role) on the project named in GCP_PROJECT_ID."
/>

<Troubleshoot
  issue="GCP VM Instance Status Check probe reports the instance was not found"
  mode="general"
  fallback="The instance name or label did not resolve in the supplied project and zones. Verify that the values in VM_INSTANCE_NAMES or INSTANCE_LABEL are correct, that GCP_PROJECT_ID is the project that owns the instances, and that ZONES lists every zone where the instances run."
/>

<Troubleshoot
  issue="GCP VM Instance Status Check probe times out before the instance reaches RUNNING"
  mode="general"
  fallback="The instance did not return to the RUNNING state within the probe timeout. Increase the run-property timeout and the retry count, and confirm that the fault recovery step restores the instance. Inspect the chaos pod logs to see the last observed instance state."
/>

---

## Related probe templates

- [GCP VM Disk Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-vm-disk-status-check): Validate that a persistent disk is ready to use.
- [GCP SQL Instance Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/gcp/gcp-sql-instance-status-check): Validate that a Cloud SQL instance is running.
- [Built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates): Browse the full probe template library.
