---
id: vmware-cpu-hog
title: VMware CPU hog
sidebar_label: VMware CPU Hog
description: Consume CPU resources on a Linux VMware VM for a configurable duration so you can test how the workload behaves when compute headroom shrinks.
keywords:
  - chaos engineering
  - vmware cpu hog
  - vmware fault
  - cpu stress
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-cpu-hog
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware CPU hog is a VMware chaos fault that drives CPU utilization to `CPU_LOAD` percent across `CPU_CORES` cores on the Linux VM `VM_NAME` (hosted in vCenter) for `TOTAL_CHAOS_DURATION` seconds, then stops the stress workload. The fault uses VMware Tools (Guest Operations API) to run the stress workload inside the guest as `VM_USER_NAME` and reverts cleanly at the end.

Use this fault to test how a workload on a VMware-hosted VM behaves when compute headroom shrinks: whether latency stays inside the SLA, whether the OS scheduler keeps critical processes responsive, whether vSphere DRS responds correctly, and whether monitoring detects CPU saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU pressure on a vSphere VM:** When CPU utilization climbs, does application latency stay inside the SLA?
- **DRS migration:** Does vSphere DRS migrate the VM to a less-loaded host when sustained CPU pressure persists?
- **Co-tenant impact:** Do other VMs on the same ESXi host degrade because of the CPU steal time?
- **Monitoring fidelity:** Do vCenter performance counters and downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v` inside the VM.
- **Stress binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the CPU stress prerequisite (`stress-ng` and `pkill`).
- **vCenter chaos role:** The vCenter user (`GOVC_USERNAME`) is mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools) | Supported |
| Linux VMs without VMware Tools | Not supported (the fault drives the guest via Guest Operations) |
| Windows VMs | Not supported (use [VMware Windows CPU hog](/docs/chaos-engineering/faults/chaos-faults/windows/windows-cpu-stress)) |

---

## Permissions required

Two layers of permissions apply.

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). For this Basic fault, the role needs at minimum:

- Virtual machine → Guest operations → Program execution, Modifications, Queries.

**On the guest OS.** `VM_USER_NAME` must be able to execute the CPU stress binary and (on abort) run `pkill`. For non-root accounts, configure `sudo` for the stress binary if needed.

---

## Authentication

Two credential sets are required.

| Layer | Tunables |
| --- | --- |
| vCenter (control plane) | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS (target VM) | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

Set `GOVC_INSECURE=true` only if your vCenter certificate is self-signed and not yet trusted.

---

## Fault tunables

Configure the following fault parameters when you add VMware CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |

**Stress parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores to stress. | `2` |
| `CPU_LOAD` | Target CPU utilization percentage per stressed core (0-100). | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `10` |
| `SEQUENCE` | Order in which multiple targets are stressed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GOVC_URL` | vCenter server URL (without scheme), for example `vcenter.example.com`. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter (`GOVC_URL`), opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, launches a CPU stress workload that targets `CPU_CORES` at `CPU_LOAD` percent for `TOTAL_CHAOS_DURATION` seconds, then terminates the workload.

---

## Expected behavior during fault execution

- CPU utilization on the target VM climbs to `CPU_LOAD` percent on `CPU_CORES` cores for the duration.
- Application latency may grow in proportion to the load.
- vCenter performance counters (`cpu.usage.average`) reflect the spike on the VM and may show steal time impact on co-tenant VMs.
- After the duration ends, the stress workload exits and CPU utilization returns to baseline.

:::info When the fault ends
The chaos pod stops the stress workload via Guest Operations. CPU utilization returns to baseline within seconds.
:::

### Signals to watch

- **VM CPU:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_cpu_seconds_total` from a node exporter inside the VM.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Inspect vCenter performance counters.**

   In vCenter UI, open the VM → Monitor → Performance, switch to **CPU** view. You should see a spike during the chaos window.

2. **SSH into the VM and run `top`.**

   The stress process should be visible during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the stress workload through Guest Operations.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the workload.
- **Manual recovery:** SSH into the VM and `sudo pkill -f stress-ng` if the workload survived.

---

## Limitations

- **VMware Tools required:** Without VMware Tools, vCenter cannot inject the workload.
- **Guest user privileges:** If `VM_USER_NAME` cannot run the stress binary, the fault errors out.
- **Single VM per run:** Each fault run targets one `VM_NAME`. Use multiple experiments to fan out.
- **ESXi co-tenant impact:** Aggressive `CPU_LOAD` on `CPU_CORES` close to the VM's vCPU count can affect co-tenants; size conservatively in production.

---

## Troubleshooting

<Troubleshoot
  issue="VMware CPU hog fails with VMware Tools not running in Harness Chaos Engineering"
  mode="docs"
  fallback="The Guest Operations API requires VMware Tools to be installed and running on the target VM. Install or restart open-vm-tools / VMware Tools on the guest and retry."
/>

<Troubleshoot
  issue="VMware CPU hog fails with authentication failure"
  mode="docs"
  fallback="Verify GOVC_URL, GOVC_USERNAME, GOVC_PASSWORD against vCenter and VM_USER_NAME / VM_PASSWORD against the guest. For self-signed vCenter certificates, set GOVC_INSECURE=true."
/>

<Troubleshoot
  issue="No CPU spike visible after starting the fault"
  mode="docs"
  fallback="Confirm the stress binary is installed inside the guest. SSH into the VM and run which stress-ng. Reinstall it per the VMware Linux binary installation page if missing."
/>

---

## Related faults

- [VMware memory hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-memory-hog): Stress memory instead of CPU.
- [VMware IO stress](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-io-stress): Stress disk IO instead of CPU.
- [VMware VM power off](/docs/chaos-engineering/faults/chaos-faults/vmware/vcenter/vmware-vm-poweroff): Power off the VM entirely.
