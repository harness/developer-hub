---
id: windows-cpu-stress
title: Windows CPU stress
sidebar_label: Windows CPU Stress
description: Consume CPU resources on a Windows VM for a configurable duration so you can test how the workload behaves when compute headroom shrinks.
keywords:
  - chaos engineering
  - windows cpu stress
  - windows fault
  - cpu stress
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-cpu-stress
- /docs/chaos-engineering/chaos-faults/windows/windows-cpu-stress
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-cpu-hog
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows CPU stress is a Windows chaos fault that drives CPU utilization to `CPU_PERCENTAGE` percent across `CPU_CORES` cores on the target Windows VM for `DURATION`, then stops the stress workload. The fault runs through the Windows chaos agent installed as a service on the target VM (no remote credentials needed at fault time).

Use this fault to test how a workload on a Windows VM behaves when compute headroom shrinks: whether latency stays inside the SLA, whether the OS scheduler keeps critical processes responsive, whether autoscaling reacts correctly, and whether monitoring detects CPU saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **CPU pressure on a Windows VM:** When CPU utilization climbs, does application latency stay inside the SLA?
- **Cluster failover:** Does a Windows Failover Cluster move workloads off a hot node correctly?
- **Monitoring fidelity:** Do Performance Monitor counters and downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions) for prerequisites.
- **User privileges:** Basic faults run as a non-administrator user; advanced faults require an administrator. CPU stress is a Basic fault.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs (with the Windows chaos agent installed) | Supported |
| Windows VMs on vSphere, Azure, GCP, AWS, or bare metal | Supported |
| Linux VMs | Not supported (use [VMware CPU hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-cpu-hog) or [Linux CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-cpu-stress)) |

---

## Permissions required

This fault is classified as **Basic**. The chaos agent must be installed with administrator privileges; the fault itself can run as a non-administrator user.

Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions#security-considerations) to review the security model.

---

## Fault tunables

**Required parameters**

The chaos agent on the target VM is the only required prerequisite; this fault has no required tunables.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`, `5m`). | `30s` |
| `CPU_CORES` | Number of CPU cores to stress. `0` means all available cores. | `0` |
| `CPU_PERCENTAGE` | Target CPU utilization percentage per stressed core (0-100). | `50` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM launches a CPU stress workload that drives `CPU_CORES` cores to `CPU_PERCENTAGE` percent for `DURATION`, then stops the workload.

---

## Expected behavior during fault execution

- CPU utilization on the target VM climbs to `CPU_PERCENTAGE` on `CPU_CORES` cores for the duration.
- Application latency may grow in proportion to the load.
- Performance Monitor `Processor(_Total)\% Processor Time` reflects the spike.
- After the duration ends, the stress workload exits and CPU utilization returns to baseline.

:::info When the fault ends
The chaos agent stops the stress workload. CPU utilization returns to baseline within seconds.
:::

### Signals to watch

- **VM CPU:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Windows Exporter `windows_cpu_time_total`.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Open Task Manager → Performance → CPU on the target VM.**

   You should see a spike during the chaos window matching `CPU_PERCENTAGE`.

2. **Run `Get-Counter '\Processor(_Total)\% Processor Time' -Continuous` in PowerShell.**

   Utilization should match `CPU_PERCENTAGE` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos agent stops the stress workload.
- **Abort:** Stopping the experiment from Chaos Studio also stops the workload.
- **Manual recovery:** Open Task Manager → Details and end the chaos process if it survived (rare).

---

## Limitations

- **Single VM per run:** Each fault run targets the VM where the agent runs. Use multiple infrastructure installations to fan out.
- **Process scheduler dependent:** Final utilization depends on the Windows scheduler and existing load.

---

## Troubleshooting

<Troubleshoot
  issue="Windows CPU stress has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the chaos agent service is running on the VM (Get-Service -Name HCEAgent). Confirm CPU_PERCENTAGE is high enough to be visible above the workload's normal usage."
/>

<Troubleshoot
  issue="Windows CPU stress fails to start"
  mode="docs"
  fallback="Inspect the chaos agent logs on the VM (default: C:\\ProgramData\\Harness\\HCEAgent\\logs). Common causes are missing administrator privileges during agent install or an outdated agent version."
/>

---

## Related faults

- [Windows memory stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-memory-stress): Stress memory instead of CPU.
- [Windows disk stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-disk-stress): Stress disk instead of CPU.
