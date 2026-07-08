---
id: vmware-io-stress
title: VMware IO stress
sidebar_label: VMware IO Stress
description: Drive disk IO load on a Linux VMware VM for a configurable duration so you can test how the workload behaves when storage throughput is saturated.
keywords:
  - chaos engineering
  - vmware io stress
  - vmware fault
  - disk stress
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-io-stress
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware IO stress is a VMware chaos fault that drives disk IO on the Linux VM `VM_NAME` by running `NUMBER_OF_WORKERS` IO worker processes that each consume `FILESYSTEM_UTILIZATION_PERCENTAGE` percent of available filesystem (or `FILESYSTEM_UTILIZATION_BYTES` GB when set) for `TOTAL_CHAOS_DURATION` seconds, then stops the workers. The fault uses VMware Tools (Guest Operations API) to run the stress workload inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when storage throughput is saturated: whether IO latency stays inside the SLA, whether databases queue writes correctly, whether vSphere DRS reacts to datastore latency, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **IO pressure on a vSphere VM:** When disk throughput saturates, does application latency stay inside the SLA?
- **Database resilience:** Does the database queue writes correctly when fsync latency spikes?
- **Datastore impact:** Do co-tenant VMs on the same datastore degrade?
- **Monitoring fidelity:** Do vCenter datastore counters fire alerts inside the SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v` inside the VM.
- **Stress binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the IO stress prerequisite.
- **Free space in the target filesystem:** The guest filesystem has enough free space to absorb `FILESYSTEM_UTILIZATION_BYTES` or `FILESYSTEM_UTILIZATION_PERCENTAGE` worth of writes.
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools) | Supported |
| Linux VMs without VMware Tools | Not supported |
| Windows VMs | Not supported (use [VMware Windows disk stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-disk-stress)) |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs:

- Virtual machine → Guest operations → Program execution, Modifications, Queries.

**On the guest OS.** `VM_USER_NAME` must be able to execute the IO stress binary and write into the working directory.

---

## Authentication

| Layer | Tunables |
| --- | --- |
| vCenter | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

Configure the following fault parameters when you add VMware IO stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |

**Stress parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Percentage of available filesystem to write to. Ignored when `FILESYSTEM_UTILIZATION_BYTES` is set. | `10` |
| `FILESYSTEM_UTILIZATION_BYTES` | Amount of data to write in GB. Takes precedence over `FILESYSTEM_UTILIZATION_PERCENTAGE` when set. | `""` |
| `NUMBER_OF_WORKERS` | Number of IO worker processes. | `4` |
| `VOLUME_MOUNT_PATH` | Filesystem path on the guest where the workers write. | `""` (defaults to the working dir of the stress process) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations. | `10` |
| `SEQUENCE` | Order in which multiple targets are stressed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GOVC_URL` | vCenter server URL. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, launches `NUMBER_OF_WORKERS` IO workers that write `FILESYSTEM_UTILIZATION_PERCENTAGE` percent of the filesystem (or `FILESYSTEM_UTILIZATION_BYTES` GB) under `VOLUME_MOUNT_PATH` for `TOTAL_CHAOS_DURATION` seconds, then stops the workers and removes the scratch files.

---

## Expected behavior during fault execution

- Disk read/write throughput on `VM_NAME` saturates the underlying datastore.
- Application IO latency may rise.
- vCenter datastore counters (`datastore.totalWriteLatency.average`, `datastore.numberWriteAveraged.average`) reflect the activity.
- After the duration ends, the workers exit and IO returns to baseline.

:::info When the fault ends
The chaos pod stops the IO workers via Guest Operations and removes the scratch files. IO latency and datastore activity return to baseline within seconds.
:::

### Signals to watch

- **Disk IO:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_disk_io_time_seconds_total` from a node exporter inside the VM.
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert latency stays inside the SLA.

---

## Verify the fault execution effect

1. **Inspect vCenter datastore performance.**

   In vCenter UI, open Datastore → Monitor → Performance for the datastore backing the VM.

2. **SSH and run `iostat -x 1`.**

   Throughput on the target disk should spike during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the workers and removes scratch files via Guest Operations.
- **Abort the experiment:** Stopping the experiment also stops the workers.
- **Manual recovery:** SSH and `sudo pkill -f stress-ng`, then `rm -rf` any leftover scratch files under `VOLUME_MOUNT_PATH`.

---

## Limitations

- **Disk full risk:** Setting `FILESYSTEM_UTILIZATION_PERCENTAGE` close to 100 can fill the filesystem before the fault ends.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **Datastore contention:** Stressing IO can affect co-tenant VMs on the same datastore.
- **Single VM per run:** Each fault run targets one `VM_NAME`.

---

## Troubleshooting

<Troubleshoot
  issue="VMware IO stress fails with no space left on device in Harness Chaos Engineering"
  mode="docs"
  fallback="The chosen VOLUME_MOUNT_PATH does not have enough free space for FILESYSTEM_UTILIZATION_BYTES or FILESYSTEM_UTILIZATION_PERCENTAGE. Use df -h inside the guest to check free space, then either point VOLUME_MOUNT_PATH at a roomier filesystem or reduce the request."
/>

<Troubleshoot
  issue="VMware IO stress fails with VMware Tools not running"
  mode="docs"
  fallback="The Guest Operations API requires VMware Tools to be installed and running on the target VM. Install or restart open-vm-tools / VMware Tools on the guest and retry."
/>

---

## Related faults

- [VMware CPU hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-cpu-hog): Stress CPU instead of disk IO.
- [VMware memory hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-memory-hog): Stress memory instead of disk IO.
