---
id: windows-memory-stress
title: Windows memory stress
sidebar_label: Windows Memory Stress
description: Consume memory on a Windows VM for a configurable duration so you can test how the workload behaves when memory headroom shrinks.
keywords:
  - chaos engineering
  - windows memory stress
  - windows fault
  - memory stress
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-memory-stress
- /docs/chaos-engineering/chaos-faults/windows/windows-memory-stress
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-memory-hog
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows memory stress is a Windows chaos fault that consumes `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent of total RAM when `MEMORY_CONSUMPTION=0`) on the target Windows VM for `DURATION`, then releases the memory. The fault runs through the Windows chaos agent installed as a service on the target VM.

Use this fault to test how a workload on a Windows VM behaves when memory headroom shrinks: whether the OS swaps gracefully, whether GC-heavy applications (.NET) pause, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Memory pressure on a Windows VM:** When RAM utilization climbs, does the workload degrade gracefully?
- **.NET GC behavior:** Does the GC pause for an unacceptable duration under pressure?
- **Page-file growth:** Does the workload survive when Windows starts using the page file aggressively?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions) for prerequisites.
- **User privileges:** Memory stress is a Basic fault and runs as a non-administrator user.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware memory hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-memory-hog) or [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress)) |

---

## Permissions required

This fault is classified as **Basic**. The chaos agent must be installed with administrator privileges; the fault itself can run as a non-administrator user.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`, `5m`). | `30s` |
| `MEMORY_CONSUMPTION` | Amount of memory to consume in MB. Set to `0` to use `MEMORY_PERCENTAGE` instead. | `0` |
| `MEMORY_PERCENTAGE` | Percentage of total RAM to consume (used when `MEMORY_CONSUMPTION=0`). | `50` |
| `MODE` | `touch` (writes to allocated pages) or `commit` (allocates without writing). `touch` exerts real pressure; `commit` is gentler. | `touch` |
| `MEMORY_STEP_IN_MB` | Memory allocated per step in MB. `0` means a single allocation. | `0` |
| `PACE` | Delay in seconds between allocation steps. `0` means as fast as possible. | `0` |
| `VERBOSITY` | Verbosity of fault logs: `low`, `medium`, or `high`. | `low` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM allocates `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent of RAM) using `MODE` semantics in `MEMORY_STEP_IN_MB` chunks every `PACE` seconds, holds the memory for `DURATION`, then releases it.

---

## Expected behavior during fault execution

- Available memory on the target VM drops for the duration.
- Workloads with high memory pressure may hit GC pauses, page-file growth, or out-of-memory errors.
- Performance Monitor `Memory\Available MBytes` reflects the drop.
- After the duration ends, memory is released and returns to baseline.

:::info When the fault ends
The chaos agent releases the allocated memory. Available memory returns to baseline within seconds.
:::

### Signals to watch

- **VM memory:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `windows_memory_available_bytes` (Windows Exporter).
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe).

---

## Verify the fault execution effect

1. **Open Task Manager → Performance → Memory.**

   "In use" should rise during the chaos window.

2. **Run `Get-Counter '\Memory\Available MBytes' -Continuous` in PowerShell.**

   Available MB should drop during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos agent releases the memory.
- **Abort:** Stopping the experiment also releases the memory.
- **Manual recovery:** Open Task Manager and end the chaos process if it survived.

---

## Limitations

- **OOM risk:** Setting `MEMORY_PERCENTAGE` close to 100 may push critical processes out of memory or trigger page-file thrashing.
- **`touch` vs `commit`:** `commit` does not exert real pressure on most Windows configurations; use `touch` to verify behavior under genuine memory pressure.

---

## Troubleshooting

<Troubleshoot
  issue="Windows memory stress has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="If MODE=commit and Windows is not committed-memory constrained, the fault may not produce visible pressure. Switch to MODE=touch."
/>

<Troubleshoot
  issue="VM became unresponsive during memory stress"
  mode="docs"
  fallback="MEMORY_PERCENTAGE was likely too high. Reduce it (start with 30-50%) and ensure the page file is sized appropriately. Reboot the VM through your cloud or hypervisor console to recover."
/>

---

## Related faults

- [Windows CPU stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-cpu-stress): Stress CPU instead of memory.
- [Windows disk stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-disk-stress): Stress disk instead of memory.
