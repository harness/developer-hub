---
id: vmware-memory-hog
title: VMware memory hog
sidebar_label: VMware Memory Hog
description: Consume a configurable amount of memory on a Linux VMware VM for a configurable duration so you can test how the workload behaves when memory headroom shrinks.
keywords:
  - chaos engineering
  - vmware memory hog
  - vmware fault
  - memory stress
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-memory-hog
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware memory hog is a VMware chaos fault that consumes `MEMORY_CONSUMPTION_PERCENTAGE` percent of RAM (or `MEMORY_CONSUMPTION_MEBIBYTES` mebibytes when set) through `NUMBER_OF_WORKERS` worker processes on the Linux VM `VM_NAME` for `TOTAL_CHAOS_DURATION` seconds, then stops the workers. The fault uses VMware Tools (Guest Operations API) to run the stress workload inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when memory headroom shrinks: whether the OOM killer fires on the right process, whether GC-heavy applications pause, whether vSphere DRS reacts, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Memory pressure on a vSphere VM:** When RAM utilization climbs, does the OOM killer target the expected process?
- **GC behavior:** Does the JVM/CLR pause for an unacceptable duration under memory pressure?
- **DRS reaction:** Does vSphere DRS migrate the VM to a host with more headroom?
- **Monitoring fidelity:** Do vCenter performance counters and downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v` inside the VM.
- **Stress binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the memory stress prerequisite.
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools) | Supported |
| Linux VMs without VMware Tools | Not supported |
| Windows VMs | Not supported (use [VMware Windows memory hog](/docs/chaos-engineering/faults/chaos-faults/windows/windows-memory-stress)) |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). For this Advanced fault, the role needs:

- Virtual machine → Guest operations → Program execution, Modifications, Queries.

**On the guest OS.** `VM_USER_NAME` must be able to execute the memory stress binary and `pkill`.

---

## Authentication

| Layer | Tunables |
| --- | --- |
| vCenter (control plane) | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS (target VM) | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

Configure the following fault parameters when you add VMware memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |

**Stress parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_CONSUMPTION_PERCENTAGE` | Percentage of guest RAM to consume (0-100). Ignored when `MEMORY_CONSUMPTION_MEBIBYTES` is set. | `30` |
| `MEMORY_CONSUMPTION_MEBIBYTES` | Memory to consume in mebibytes. Takes precedence over `MEMORY_CONSUMPTION_PERCENTAGE` when set. | `""` |
| `NUMBER_OF_WORKERS` | Number of worker processes that hold the memory. | `4` |

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
| `GOVC_URL` | vCenter server URL. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, launches `NUMBER_OF_WORKERS` memory-stress workers that hold `MEMORY_CONSUMPTION_PERCENTAGE` percent of RAM (or `MEMORY_CONSUMPTION_MEBIBYTES` MiB) for `TOTAL_CHAOS_DURATION` seconds, then stops the workers.

---

## Expected behavior during fault execution

- Available memory on the target VM drops for the duration.
- Workloads with high memory pressure may hit GC pauses, swap, or OOM kill.
- vCenter performance counters (`mem.usage.average`, `mem.swapout.average`) reflect the drop.
- After the duration ends, the workers exit and memory returns to baseline.

:::info When the fault ends
The chaos pod stops the stress workers via Guest Operations. Memory returns to baseline within seconds.
:::

### Signals to watch

- **VM memory:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_memory_MemAvailable_bytes`.
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error rate stays under threshold.

---

## Verify the fault execution effect

1. **Inspect vCenter Memory performance.**

   In vCenter UI, open the VM → Monitor → Performance, switch to **Memory** view.

2. **SSH and run `free -h`.**

   `available` should drop during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the workers via Guest Operations.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the workers.
- **Manual recovery:** SSH into the VM and `sudo pkill -f stress-ng` if any workers survived.

---

## Limitations

- **OOM risk:** Setting `MEMORY_CONSUMPTION_PERCENTAGE` close to 100 may OOM-kill critical processes; start conservatively.
- **Swap behavior varies:** Guest swap configuration affects behavior; pages may swap instead of OOM.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **Single VM per run:** Each fault run targets one `VM_NAME`.

---

## Troubleshooting

<Troubleshoot
  issue="VMware memory hog fails with VMware Tools not running in Harness Chaos Engineering"
  mode="docs"
  fallback="The Guest Operations API requires VMware Tools to be installed and running on the target VM. Install or restart open-vm-tools / VMware Tools on the guest and retry."
/>

<Troubleshoot
  issue="VM became unresponsive during memory hog"
  mode="docs"
  fallback="If MEMORY_CONSUMPTION_PERCENTAGE was very high, the OOM killer may have terminated VMware Tools or SSH. Power-cycle the VM via vCenter (or use ESXi reset) and reduce MEMORY_CONSUMPTION_PERCENTAGE."
/>

---

## Related faults

- [VMware CPU hog](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-cpu-hog): Stress CPU instead of memory.
- [VMware IO stress](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-io-stress): Stress disk IO instead of memory.
