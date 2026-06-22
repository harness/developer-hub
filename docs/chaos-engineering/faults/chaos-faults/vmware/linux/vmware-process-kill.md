---
id: vmware-process-kill
title: VMware process kill
sidebar_label: VMware Process Kill
description: Kill one or more processes inside a Linux VMware VM for a configurable duration so you can test how supervisors and application logic recover.
keywords:
  - chaos engineering
  - vmware process kill
  - vmware fault
  - process resilience
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-process-kill
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-process-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware process kill is a VMware chaos fault that terminates the processes listed in `PROCESS_IDS` (PIDs) on the Linux VM `VM_NAME` for `TOTAL_CHAOS_DURATION` seconds, then waits `VERIFICATION_WINDOW` seconds to confirm the outcome. Set `FORCE=true` to send `SIGKILL`; otherwise the fault sends `SIGTERM`. The fault uses VMware Tools (Guest Operations API) to act inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload running on a VMware-hosted VM behaves when a critical process is killed: whether the supervisor (`systemd`, `supervisord`, `runit`) restarts it inside the SLA, whether replicas absorb the load, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Crash resilience:** When a critical PID dies, does the supervisor restart it inside the SLA?
- **Replica absorption:** When one replica's process dies, do peers absorb the traffic inside the SLO budget?
- **Alert fidelity:** Do downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **Process IDs:** You know the PID(s) to kill, or your workload includes a wrapper that reports the PID(s) of supervised processes.
- **Sudo permissions:** `VM_USER_NAME` can kill the target PID(s) (process owner or root via `sudo`).
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools) | Supported |
| Linux VMs without VMware Tools | Not supported |
| Windows VMs | Not supported (use [Windows process kill](/docs/chaos-engineering/faults/chaos-faults/windows/windows-process-kill)) |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs Guest Operations (Program execution, Modifications, Queries).

**On the guest OS.** `VM_USER_NAME` must own the target processes or have `sudo` to kill them.

---

## Authentication

| Layer | Tunables |
| --- | --- |
| vCenter | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |
| `PROCESS_IDS` | Comma-separated list of PIDs to kill on the target VM. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FORCE` | If `true`, send `SIGKILL` instead of `SIGTERM`. | `false` |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `VERIFICATION_WINDOW` | Time window in seconds after the kill during which the fault verifies the outcome. | `10` |
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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, sends `SIGTERM` (or `SIGKILL` when `FORCE=true`) to each PID in `PROCESS_IDS`, waits `VERIFICATION_WINDOW` seconds, and reports success once every targeted PID is gone.

---

## Expected behavior during fault execution

- Each PID in `PROCESS_IDS` receives the kill signal.
- A supervisor (`systemd`, `supervisord`, `runit`) typically respawns the process inside its own restart policy.
- Application metrics may dip while the process restarts; replicas may absorb traffic if the workload is clustered.
- After the duration ends, the fault exits without further action; supervised processes are expected to be running normally.

:::info When the fault ends
The fault does not restart processes. Recovery depends on the guest's process supervisor or the user's manual intervention.
:::

### Signals to watch

- **Process up:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `pgrep -x <name>` and assert the process is back inside the SLA.
- **Workload health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **SSH into the VM during the chaos window.**

   ```bash
   ps -p <PID>
   ```

   The PID should briefly disappear and be replaced by a new PID for the same command when the supervisor restarts it.

2. **Inspect the supervisor log.**

   ```bash
   journalctl -u <unit> -n 50
   ```

---

## Recovery and cleanup

- **Supervised processes:** The supervisor restarts them automatically.
- **Unsupervised processes:** Restart them manually (`sudo systemctl start <unit>` or your own runner).
- **Abort:** Stopping the experiment from Chaos Studio also stops further iterations of the fault.

---

## Limitations

- **PID-based:** The fault targets exact PIDs, not process names. If the workload's PID changes between iterations, you must look up the new PID.
- **No auto-restart:** The fault does not restart killed processes; supervision is the user's responsibility.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **Single VM per run:** Each fault run targets one `VM_NAME`.

---

## Troubleshooting

<Troubleshoot
  issue="VMware process kill fails with no such process in Harness Chaos Engineering"
  mode="docs"
  fallback="The PIDs in PROCESS_IDS may have changed since you looked them up. SSH into the VM, look up the current PIDs (pgrep <name>), update PROCESS_IDS, and retry."
/>

<Troubleshoot
  issue="Killed process did not restart"
  mode="docs"
  fallback="The fault only kills the process; restart is up to the guest's supervisor. Check journalctl -u <unit> and ensure the unit has Restart=on-failure (or similar) in its systemd unit file."
/>

---

## Related faults

- [VMware service stop](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-service-stop): Stop a service (which the supervisor manages) instead of killing a PID directly.
