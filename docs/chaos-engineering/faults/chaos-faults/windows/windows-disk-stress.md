---
id: windows-disk-stress
title: Windows disk stress
sidebar_label: Windows Disk Stress
description: Drive disk IO load on a Windows VM for a configurable duration so you can test how the workload behaves when storage throughput is saturated.
keywords:
  - chaos engineering
  - windows disk stress
  - windows fault
  - disk stress
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-disk-stress
- /docs/chaos-engineering/chaos-faults/windows/windows-disk-stress
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-disk-stress
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-disk-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows disk stress is a Windows chaos fault that drives disk IO on the target Windows VM by running `NUMBER_OF_WORKERS` IO worker processes that write `MEMORY_CONSUMPTION` MB to `DISK_PATH` (in `BLOCK_SIZE_IN_KILOBYTES` KB blocks with `WRITE_PERCENTAGE` percent writes) for `DURATION`, then stops the workers and cleans up the scratch files. The fault runs through the Windows chaos agent installed as a service on the target VM.

Use this fault to test how a workload on a Windows VM behaves when storage throughput is saturated: whether IO latency stays inside the SLA, whether databases queue writes correctly, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **IO pressure on a Windows VM:** When disk throughput saturates, does application latency stay inside the SLA?
- **Database resilience:** Does the database queue writes correctly when fsync latency spikes?
- **Page-file impact:** Does the workload survive when the page-file disk slows down?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions) for prerequisites.
- **User privileges:** Disk stress is an Advanced fault and requires administrator user.
- **Free space:** `DISK_PATH` has enough free space to absorb `MEMORY_CONSUMPTION` MB of writes per worker.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware IO stress](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-io-stress) or [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill)) |

---

## Permissions required

This fault is classified as **Advanced**. The chaos agent must be installed with administrator privileges and the fault must run as an administrator user.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `MEMORY_CONSUMPTION` | Amount of data each worker writes in MB. | `1024` |
| `BLOCK_SIZE_IN_KILOBYTES` | Block size used to fill the disk in KB. | `50` |
| `WRITE_PERCENTAGE` | Percentage of operations that are writes (0-100). The remainder are reads. | `100` |
| `NUMBER_OF_WORKERS` | Number of IO worker processes. | `2` |
| `DISK_PATH` | Path on the Windows VM where workers write. | `C:\` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM launches `NUMBER_OF_WORKERS` IO workers that read/write `MEMORY_CONSUMPTION` MB under `DISK_PATH` in `BLOCK_SIZE_IN_KILOBYTES` KB blocks (with `WRITE_PERCENTAGE` percent writes) for `DURATION`, then stops the workers and removes the scratch files.

---

## Expected behavior during fault execution

- Disk read/write throughput on `DISK_PATH` saturates.
- Application IO latency may rise.
- Performance Monitor `PhysicalDisk\Avg. Disk Queue Length` reflects the activity.
- After the duration ends, the workers exit and the scratch files are removed.

:::info When the fault ends
The chaos agent stops the IO workers and removes the scratch files. IO latency returns to baseline within seconds.
:::

### Signals to watch

- **Disk IO:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Windows Exporter `windows_logical_disk_*` metrics.
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe).

---

## Verify the fault execution effect

1. **Open Resource Monitor → Disk.**

   You should see the chaos worker process writing to `DISK_PATH` at the configured throughput during the window.

2. **Run `Get-Counter '\PhysicalDisk(*)\Avg. Disk Queue Length' -Continuous` in PowerShell.**

   Queue length on the target disk should rise during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos agent stops the workers and removes the scratch files.
- **Abort:** Stopping the experiment also stops the workers and cleans up.
- **Manual recovery:** Delete any leftover scratch files under `DISK_PATH` if cleanup failed.

---

## Limitations

- **Disk full risk:** Setting `MEMORY_CONSUMPTION` * `NUMBER_OF_WORKERS` close to free space can fill the disk before the fault ends.
- **System drive risk:** Stressing the system drive (`C:\`) can affect the OS itself; consider using a non-system drive.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows disk stress fails with not enough space on disk in Harness Chaos Engineering"
  mode="docs"
  fallback="DISK_PATH does not have enough free space for MEMORY_CONSUMPTION * NUMBER_OF_WORKERS. Check free space (Get-PSDrive) and either reduce the request or target a roomier disk."
/>

<Troubleshoot
  issue="Windows disk stress fails with access denied"
  mode="docs"
  fallback="The chaos agent must be installed and running with administrator privileges for advanced faults like Disk stress. Reinstall the agent as administrator and retry."
/>

---

## Related faults

- [Windows CPU stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-cpu-stress): Stress CPU instead of disk IO.
- [Windows memory stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-memory-stress): Stress memory instead of disk IO.
