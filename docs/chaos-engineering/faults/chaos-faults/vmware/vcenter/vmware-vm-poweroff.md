---
id: vmware-vm-poweroff
title: VMware VM power off (by MOID)
sidebar_label: VMware VM Power Off (by MOID)
description: Power off one or more VMware VMs (identified by Managed Object ID) for a configurable duration so you can test how applications behave when a VM disappears.
keywords:
  - chaos engineering
  - vmware vm poweroff
  - vmware fault
  - vm resilience
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vcenter/vmware-vm-poweroff
- /docs/chaos-engineering/chaos-faults/vmware/vcenter/vmware-vm-poweroff
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware VM power off (by MOID) is a VMware chaos fault that powers off the VMs whose Managed Object IDs are listed in `APP_VM_MOIDS` for `TOTAL_CHAOS_DURATION` seconds, then powers them back on. The fault talks to vCenter directly (no VMware Tools required on the guest) and supports running targets in `parallel` or `serial` (`SEQUENCE`).

Use this fault to test how a workload behaves when a VMware VM disappears: whether replicas absorb the load, whether DNS/load-balancer health checks remove the VM cleanly, whether monitoring detects the outage within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **VM disappearance:** When a VM is powered off, do replicas absorb the load inside the SLO budget?
- **Health-check fidelity:** Does the load balancer detect the unhealthy VM inside the failover SLA?
- **Stateful workloads:** Does a clustered stateful workload (database, message broker) recover correctly when one node disappears?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach the vCenter server over port 443.
- **VM MOIDs known:** You know the MOID of each VM you want to power off (visible via vCenter Managed Object Browser, `govc`, or PowerCLI).
- **vCenter chaos role:** The vCenter user (`VCENTER_USERNAME`) is mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions), including Virtual Machine → Interaction → Power Off and Power On.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter | Supported |
| Windows VMs hosted on vSphere / vCenter | Supported (this fault is OS-agnostic since it acts on the VM, not the guest) |
| Standalone ESXi (no vCenter) | Not supported |

---

## Permissions required

This fault is classified as **Basic**. Map `VCENTER_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs at minimum:

- Virtual machine → Interaction → Power Off
- Virtual machine → Interaction → Power On

---

## Authentication

| Tunable | Description |
| --- | --- |
| `VCENTER_SERVER` | vCenter server URL or hostname. |
| `VCENTER_USERNAME` | vCenter user mapped to the chaos role. |
| `VCENTER_PASSWORD` | Password for `VCENTER_USERNAME`. |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `APP_VM_MOIDS` | Comma-separated list of VM Managed Object IDs (for example `vm-1234`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The VMs stay powered off for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | `parallel` (power off all listed VMs at once) or `serial` (power off one VM at a time). | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `VCENTER_SERVER` | vCenter server URL or hostname. | `""` |
| `VCENTER_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `VCENTER_PASSWORD` | Password for `VCENTER_USERNAME`. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter (`VCENTER_SERVER`), powers off each VM in `APP_VM_MOIDS` (in `parallel` or `serial` per `SEQUENCE`), waits `TOTAL_CHAOS_DURATION` seconds, then powers them back on.

---

## Expected behavior during fault execution

- Each VM in `APP_VM_MOIDS` transitions to `poweredOff` state.
- Workloads on those VMs become unreachable; replicas (if any) absorb the load.
- After the duration ends, each VM is powered back on and the guest OS boots up.

:::info When the fault ends
The chaos pod calls `PowerOnVM_Task` for each VM in `APP_VM_MOIDS`. Guest OS boot time depends on the workload and is not included in `TOTAL_CHAOS_DURATION`.
:::

### Signals to watch

- **VM power state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `govc vm.info <vm-name>` and assert the state.
- **Workload health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint served by other replicas (not the targeted VMs).

---

## Verify the fault execution effect

1. **Inspect VM power state in vCenter.**

   In vCenter UI, find each VM by MOID. The state should be `Powered Off` during the chaos window and `Powered On` afterwards.

2. **Confirm guest OS recovery.**

   After the fault ends, SSH (or RDP) into each VM to confirm the OS booted and the workload restarted.

---

## Recovery and cleanup

- **End of duration:** The chaos pod powers each VM back on.
- **Abort:** Stopping the experiment from Chaos Studio also triggers `PowerOnVM_Task`.
- **Manual recovery:** If a VM remains powered off, power it on from vCenter UI or via `govc vm.power -on <vm>`.

---

## Limitations

- **MOID required:** The fault accepts only MOIDs, not VM names. To target by name, use [VMware VM power off (by name)](/docs/chaos-engineering/faults/chaos-faults/vmware/vcenter/vmware-vm-poweroff-by-name).
- **Boot time not counted:** Guest OS boot time after power-on is not included in the duration.
- **Hard power off:** This is a hardware-level power off, not a graceful guest shutdown. Workloads must tolerate sudden disappearance.

---

## Troubleshooting

<Troubleshoot
  issue="VMware VM power off fails with managed object not found in Harness Chaos Engineering"
  mode="docs"
  fallback="The MOID in APP_VM_MOIDS may be incorrect or the VM may have been removed. Confirm the MOID via vCenter MOB at https://<vcenter>/mob or with govc vm.info -dump <vm-name>."
/>

<Troubleshoot
  issue="VMware VM power off fails with permission denied"
  mode="docs"
  fallback="VCENTER_USERNAME needs Virtual machine > Interaction > Power Off and Power On on the target VMs. Verify the role assignment in vCenter Permissions and retry."
/>

---

## Related faults

- [VMware VM power off (by name)](/docs/chaos-engineering/faults/chaos-faults/vmware/vcenter/vmware-vm-poweroff-by-name): Power off VMs by name (via ESXi host enumeration) instead of by MOID.
- [VMware process kill](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-process-kill): Kill a process inside the VM instead of powering off the entire VM.
- [VMware service stop](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-service-stop): Stop a service inside the VM instead of powering off the entire VM.
