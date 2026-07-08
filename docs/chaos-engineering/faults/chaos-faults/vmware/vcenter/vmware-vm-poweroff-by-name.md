---
id: vmware-vm-poweroff-by-name
title: VMware VM power off (by name)
sidebar_label: VMware VM Power Off (by Name)
description: Power off one or more VMware VMs (identified by name) for a configurable duration so you can test how applications behave when a VM disappears.
keywords:
  - chaos engineering
  - vmware vm poweroff by name
  - vmware fault
  - vm resilience
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vcenter/vmware-vm-poweroff-by-name
- /docs/chaos-engineering/chaos-faults/vmware/vcenter/vmware-vm-poweroff-by-name
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware VM power off (by name) is a VMware chaos fault that powers off the VMs whose names are listed in `VM_NAMES` for `TOTAL_CHAOS_DURATION` seconds, then powers them back on. The fault resolves VM names through the ESXi host enumeration and supports running targets in `parallel` or `serial` (`SEQUENCE`).

Use this fault to test how a workload behaves when a VMware VM disappears: whether replicas absorb the load, whether DNS/load-balancer health checks remove the VM cleanly, whether monitoring detects the outage within the alerting SLA, and whether on-call alerts fire correctly. Use this variant when working with VM names is more convenient than tracking Managed Object IDs.

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
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VM names known:** You know the exact name of each VM you want to power off (as it appears in vCenter).
- **vCenter chaos role:** The vCenter user (`GOVC_USERNAME`) is mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions), including Virtual Machine → Interaction → Power Off and Power On.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter | Supported |
| Windows VMs hosted on vSphere / vCenter | Supported (this fault is OS-agnostic since it acts on the VM, not the guest) |
| Standalone ESXi (no vCenter) | Not supported |

---

## Permissions required

This fault is classified as **Basic**. Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs at minimum:

- Virtual machine → Interaction → Power Off
- Virtual machine → Interaction → Power On

---

## Authentication

| Tunable | Description |
| --- | --- |
| `GOVC_URL` | vCenter server URL or hostname. |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. Set to `true` only for self-signed certificates. |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAMES` | Comma-separated list of target VM names as they appear in vCenter. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The VMs stay powered off for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | `parallel` (power off all listed VMs at once) or `serial` (power off one VM at a time). | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GOVC_URL` | vCenter server URL or hostname. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter (`GOVC_URL`), resolves each name in `VM_NAMES` to a VM, powers each VM off (in `parallel` or `serial` per `SEQUENCE`), waits `TOTAL_CHAOS_DURATION` seconds, then powers them back on.

---

## Expected behavior during fault execution

- Each VM in `VM_NAMES` transitions to `poweredOff` state.
- Workloads on those VMs become unreachable; replicas (if any) absorb the load.
- After the duration ends, each VM is powered back on and the guest OS boots up.

:::info When the fault ends
The chaos pod powers each VM back on through vCenter. Guest OS boot time depends on the workload and is not included in `TOTAL_CHAOS_DURATION`.
:::

### Signals to watch

- **VM power state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `govc vm.info <vm-name>` and assert the state.
- **Workload health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint served by other replicas.

---

## Verify the fault execution effect

1. **Inspect VM power state in vCenter.**

   In vCenter UI, find each VM by name. The state should be `Powered Off` during the chaos window and `Powered On` afterwards.

2. **Confirm guest OS recovery.**

   After the fault ends, SSH (or RDP) into each VM to confirm the OS booted and the workload restarted.

---

## Recovery and cleanup

- **End of duration:** The chaos pod powers each VM back on.
- **Abort:** Stopping the experiment from Chaos Studio also triggers power-on.
- **Manual recovery:** If a VM remains powered off, power it on from vCenter UI or via `govc vm.power -on <vm-name>`.

---

## Limitations

- **Name uniqueness:** VM names must be unique inside the vCenter inventory. If duplicate names exist, behavior is undefined; use [VMware VM power off (by MOID)](/docs/chaos-engineering/faults/chaos-faults/vmware/vcenter/vmware-vm-poweroff) instead.
- **Boot time not counted:** Guest OS boot time after power-on is not included in the duration.
- **Hard power off:** This is a hardware-level power off, not a graceful guest shutdown. Workloads must tolerate sudden disappearance.

---

## Troubleshooting

<Troubleshoot
  issue="VMware VM power off by name fails with VM not found in Harness Chaos Engineering"
  mode="docs"
  fallback="VM_NAMES must match the names exactly as they appear in vCenter. Run govc find -type m to enumerate VM names, then update VM_NAMES."
/>

<Troubleshoot
  issue="VMware VM power off by name fails with SSL certificate verification failed"
  mode="docs"
  fallback="If your vCenter uses a self-signed certificate, set GOVC_INSECURE=true. For production, trust the vCenter CA in the chaos infrastructure image instead."
/>

---

## Related faults

- [VMware VM power off (by MOID)](/docs/chaos-engineering/faults/chaos-faults/vmware/vcenter/vmware-vm-poweroff): Power off VMs by Managed Object ID.
- [VMware process kill](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-process-kill): Kill a process inside the VM instead of powering off the entire VM.
- [VMware service stop](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-service-stop): Stop a service inside the VM instead of powering off the entire VM.
