---
id: azure-instance-io-stress
title: Azure instance IO stress
sidebar_label: Azure Instance IO Stress
description: Drive disk IO load on one or more Azure VMs for a configurable duration so you can test how the workload behaves when the storage subsystem is saturated.
keywords:
  - chaos engineering
  - azure instance io stress
  - azure fault
  - disk io stress
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-io-stress
- /docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure instance IO stress is an Azure chaos fault that drives sustained disk read/write IO on the volume mounted at `VOLUME_MOUNT_PATH` of each VM listed in `AZURE_INSTANCE_NAMES` (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) for `TOTAL_CHAOS_DURATION` seconds. The fault writes `FILESYSTEM_UTILIZATION_BYTES` GB (or `FILESYSTEM_UTILIZATION_PERCENTAGE` percent when set) across `NUMBER_OF_WORKERS` workers using the Azure VM run-command extension.

Use this fault to test how a workload behaves when the storage subsystem is saturated: whether application latency degrades gracefully, whether write-heavy paths back off correctly, whether IO autoscale (Premium SSD bursting) kicks in, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **IO pressure:** When the disk is saturated, does application latency stay inside the SLA?
- **Premium SSD bursting:** Does the disk burst credit cover the spike, or does throttling kick in?
- **Write-amplification:** Do logs, journals, or background writers degrade gracefully?
- **Monitoring fidelity:** Do alerts on `Disk Read Bytes` / `Disk Write Bytes` and disk queue depth fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target VMs reachable:** Each entry in `AZURE_INSTANCE_NAMES` exists in `RESOURCE_GROUP` and is in `running` state.
- **VM Agent and run-command enabled:** The Azure VM Agent must be running on the target VM.
- **Mount path exists:** `VOLUME_MOUNT_PATH` (default `/tmp`) must be a writable directory on the VM with enough free space for `FILESYSTEM_UTILIZATION_BYTES`.
- **Azure credentials available:** A service principal File Secret in Harness Secret Manager, workload identity on AKS, or managed identity on the AKS node pool.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Standalone Linux VMs | Supported |
| Standalone Windows VMs | Supported (use [Windows disk stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-disk-stress) for native Windows support) |
| VMSS instances | Supported (set `SCALE_SET=enable`) |
| AKS worker nodes (VMSS-backed) | Supported with `SCALE_SET=enable` |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Virtual Machine Contributor`

**Custom role (minimum actions):** see the [Azure instance CPU hog permissions](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-cpu-hog#permissions-required) (same actions apply).

Go to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to read the full permission catalog.

---

## Authentication

Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to set up Service principal, Workload identity, or Managed identity.

---

## Fault tunables

Configure the following fault parameters when you add Azure instance IO stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_INSTANCE_NAMES` | Comma-separated list of VM names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the VMs. | (required) |

**Stress parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILESYSTEM_UTILIZATION_BYTES` | Total bytes (GB) written by the stress workers. Ignored when `FILESYSTEM_UTILIZATION_PERCENTAGE > 0`. | `5` |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Percentage of filesystem free space to use. Set to `0` to use `FILESYSTEM_UTILIZATION_BYTES`. | `0` |
| `NUMBER_OF_WORKERS` | Number of parallel IO stress workers. | `1` |
| `VOLUME_MOUNT_PATH` | Filesystem path used as the stress target. | `/tmp` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SCALE_SET` | Set to `enable` when the VMs belong to a Virtual Machine Scale Set. | `""` |
| `SEQUENCE` | Order in which multiple instances are stressed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity. | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Uses the Azure VM run-command extension to launch `NUMBER_OF_WORKERS` IO stress workers on each VM, writing `FILESYSTEM_UTILIZATION_BYTES` GB (or `FILESYSTEM_UTILIZATION_PERCENTAGE` percent of free space) to `VOLUME_MOUNT_PATH` for `TOTAL_CHAOS_DURATION` seconds, then terminates the workers and cleans up the stress files.

---

## Expected behavior during fault execution

- Disk read/write throughput on the affected VMs climbs for the duration.
- Application latency on read/write paths grows in proportion to the load.
- Azure Monitor `Disk Read Bytes/sec`, `Disk Write Bytes/sec`, and queue depth reflect the spike.
- After the duration ends, the workers exit, the stress files are cleaned up, and IO returns to baseline.

:::info When the fault ends
The chaos pod terminates the workers and removes the stress files written under `VOLUME_MOUNT_PATH`. Disk usage returns to baseline.
:::

### Signals to watch

- **VM disk metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_disk_io_time_seconds_total` and assert the spike is observed.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a write-heavy endpoint.

---

## Verify the fault execution effect

1. **Inspect Azure Monitor disk metrics.**

   ```bash
   az monitor metrics list \
     --resource /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm> \
     --metric "Disk Read Bytes,Disk Write Bytes" \
     --interval PT1M
   ```

2. **SSH into the VM and run `iostat -x 2` during the chaos window.**

   `%util` should climb and `await` should grow.

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the workers and removes the stress files from `VOLUME_MOUNT_PATH`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also cleans up.
- **Manual recovery:** SSH into the VM and remove any `stress-*` files left behind under `VOLUME_MOUNT_PATH`.

---

## Limitations

- **Filesystem space requirement:** The chosen `VOLUME_MOUNT_PATH` must have enough free space; the fault errors out if it does not.
- **Premium SSD bursting:** Bursting credit may mask the impact on small VMs; size `FILESYSTEM_UTILIZATION_BYTES` accordingly.
- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.

---

## Troubleshooting

<Troubleshoot
  issue="Azure instance IO stress fails with No space left on device in Harness Chaos Engineering"
  mode="docs"
  fallback="VOLUME_MOUNT_PATH does not have enough free space. Verify with df -h <path> on the VM, then either lower FILESYSTEM_UTILIZATION_BYTES or pick a different mount path."
/>

<Troubleshoot
  issue="No IO spike visible in Azure Monitor"
  mode="docs"
  fallback="Azure Monitor metrics aggregate at 1-minute granularity. For short chaos windows, inspect node-level metrics through iostat or a Prometheus node exporter scrape. Premium SSD burst credits may also absorb short bursts."
/>

---

## Related faults

- [Azure instance CPU hog](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-cpu-hog): Stress CPU instead of disk.
- [Azure instance memory hog](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-memory-hog): Stress memory instead of disk.
- [Azure disk loss](/docs/chaos-engineering/faults/chaos-faults/azure/azure-disk-loss): Detach the disk entirely.
