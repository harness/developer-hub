---
id: windows-process-kill
title: Windows process kill
sidebar_label: Windows Process Kill
description: Kill one or more processes on a Windows VM by PID or process name so you can test how supervisors and application logic recover.
keywords:
  - chaos engineering
  - windows process kill
  - windows fault
  - process resilience
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-process-kill
- /docs/chaos-engineering/chaos-faults/windows/windows-process-kill
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-process-kill
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-process-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows process kill is a Windows chaos fault that terminates processes on the target Windows VM. You can specify them by PID (`PROCESS_IDS`), by name (`PROCESS_NAMES`), or by both. Set `FORCE=enable` to terminate forcefully (`/F` equivalent); otherwise the fault attempts a normal close. The fault runs through the Windows chaos agent installed as a service on the target VM and runs for `DURATION`.

Use this fault to test how a workload running on a Windows VM behaves when a critical process is killed: whether a service recovery action restarts it inside the SLA, whether replicas absorb the load, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Crash resilience:** When a critical process dies, does the service recovery action restart it inside the SLA?
- **Cluster failover:** Does Windows Failover Cluster move workloads off the affected VM when a critical process disappears?
- **Alert fidelity:** Do downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Process identifier:** You know the PID or process name to kill.
- **Permissions to kill the process:** The agent's user can terminate the process. System processes require administrator privileges.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware process kill](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-process-kill) or [Linux process kill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-process-kill)) |

---

## Permissions required

This fault is classified as **Basic**. Killing user-owned processes does not require administrator; killing system or admin-owned processes requires the agent to run as administrator.

---

## Fault tunables

**One of these is required**

| Tunable | Description | Default |
| --- | --- | --- |
| `PROCESS_IDS` | Comma-separated list of PIDs to terminate. | `""` |
| `PROCESS_NAMES` | Comma-separated list of process names to terminate (without `.exe` suffix). | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `FORCE` | `enable` to force-kill (`/F`); `disable` for a normal close. | `disable` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM terminates each PID in `PROCESS_IDS` and each process matching `PROCESS_NAMES` for `DURATION`. With `FORCE=enable` the agent uses a forceful terminate; otherwise it requests a normal close.

---

## Expected behavior during fault execution

- Each targeted process is terminated.
- Service Control Manager may restart configured services per their recovery action.
- Replicas (if any) absorb traffic during the gap.
- After the duration ends, the fault exits without further action; supervised processes are expected to be running normally.

:::info When the fault ends
The fault does not restart processes. Recovery depends on Windows Service Recovery actions or user intervention.
:::

### Signals to watch

- **Process up:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `Get-Process <name>` and assert success after the SLA.
- **Workload health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **During the chaos window, on the VM, run `Get-Process <name>` in PowerShell.**

   The process should briefly disappear and (if a recovery action restarts it) reappear with a new PID.

2. **Inspect Event Viewer → Application logs.**

   You should see entries from Service Control Manager when a service is restarted.

---

## Recovery and cleanup

- **Supervised services:** Windows Service Recovery actions restart them automatically.
- **Unsupervised processes:** Restart them manually or via your management tooling.
- **Abort:** Stopping the experiment also stops further iterations of the fault.

---

## Limitations

- **PID changes between iterations:** When a process is restarted, its PID changes. If you target by PID and iterate, you must look up the new PID. Targeting by `PROCESS_NAMES` avoids this.
- **No auto-restart:** The fault does not restart killed processes; supervision is the user's responsibility.

---

## Troubleshooting

<Troubleshoot
  issue="Windows process kill fails with access denied in Harness Chaos Engineering"
  mode="docs"
  fallback="The chaos agent's user account may not be able to kill the targeted process. For system or admin-owned processes, reinstall the chaos agent as administrator."
/>

<Troubleshoot
  issue="Killed process did not restart"
  mode="docs"
  fallback="The fault only kills the process; restart is up to Windows Service Recovery or your own supervisor. Inspect Services.msc, open the service's properties, switch to the Recovery tab, and configure Restart on first/second/subsequent failures."
/>

---

## Related faults

- [Windows CPU stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-cpu-stress): Stress CPU instead of killing processes.
- [Windows memory stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-memory-stress): Stress memory instead of killing processes.
