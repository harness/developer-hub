---
id: azure-instance-memory-hog
title: Azure instance memory hog
sidebar_label: Azure Instance Memory Hog
description: Consume a configurable amount of memory on one or more Azure VMs for a configurable duration so you can test how the workload behaves when memory headroom shrinks.
keywords:
  - chaos engineering
  - azure instance memory hog
  - azure fault
  - memory stress
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-memory-hog
- /docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure instance memory hog is an Azure chaos fault that consumes `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent when set) of RAM through `NUMBER_OF_WORKERS` worker processes on each VM listed in `AZURE_INSTANCE_NAMES` (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) for `TOTAL_CHAOS_DURATION` seconds. The fault uses the Azure VM run-command extension to launch a stress workload inside the target VM.

Use this fault to test how a workload behaves when memory headroom shrinks: whether the OOM killer fires on the right process, whether GC-heavy applications pause, whether memory-pressure alerts fire inside the SLA, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Memory pressure:** When RAM utilization climbs, does the OOM killer target the expected process?
- **GC behavior:** Does the JVM/CLR pause for an unacceptable duration under memory pressure?
- **VMSS autoscale:** Does scale-out trigger correctly on memory metrics?
- **Monitoring fidelity:** Do alerts on `Available Memory Bytes` in Azure Monitor fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target VMs reachable:** Each entry in `AZURE_INSTANCE_NAMES` exists in `RESOURCE_GROUP` and is in `running` state.
- **VM Agent and run-command enabled:** The Azure VM Agent must be running on the target VM.
- **Azure credentials available:** A service principal File Secret in Harness Secret Manager, workload identity on AKS, or managed identity on the AKS node pool.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Standalone Linux VMs | Supported |
| Standalone Windows VMs | Supported (use [Windows memory stress](/docs/chaos-engineering/faults/chaos-faults/windows/windows-memory-stress) for native Windows support) |
| VMSS instances | Supported (set `SCALE_SET=enable`) |
| AKS worker nodes (VMSS-backed) | Supported with `SCALE_SET=enable` |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Virtual Machine Contributor`

**Custom role (minimum actions):** see the [Azure instance CPU hog permissions](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-cpu-hog#permissions-required) (same actions apply).

Go to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to read the full permission catalog.

---

## Authentication

Pick one of the following methods. Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to read the full setup.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Service principal | Chaos infrastructure runs outside AKS | Upload the service principal JSON file as a **File Secret in Harness Secret Manager** and reference it via `AZURE_AUTHENTICATION_SECRET` |
| Workload identity | Chaos infrastructure runs on AKS with workload identity enabled | Annotate the chaos infra service account with `azure.workload.identity/client-id` |
| Managed identity | Chaos infrastructure runs on AKS with a managed identity on the node pool | No tunable changes; the pod inherits the identity from IMDS |

---

## Fault tunables

Configure the following fault parameters when you add Azure instance memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_INSTANCE_NAMES` | Comma-separated list of VM names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the VMs. | (required) |

**Stress parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_CONSUMPTION` | Memory to consume in MB. Ignored when `MEMORY_PERCENTAGE > 0`. | `500` |
| `MEMORY_PERCENTAGE` | Target memory utilization percentage (0-100). Set to `0` to consume `MEMORY_CONSUMPTION` MB instead. | `0` |
| `NUMBER_OF_WORKERS` | Number of worker processes that hold the memory. | `1` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SCALE_SET` | Set to `enable` when the VMs belong to a Virtual Machine Scale Set. | `""` |
| `SEQUENCE` | Order in which multiple instances are stressed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. Required when using workload identity or managed identity. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity. | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Uses the Azure VM run-command extension to launch `NUMBER_OF_WORKERS` memory-stress workers on each VM in `AZURE_INSTANCE_NAMES`, holding a total of `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent of RAM) for `TOTAL_CHAOS_DURATION` seconds, then terminates the workers.

---

## Expected behavior during fault execution

- Available memory drops on the target VMs for the duration.
- Workloads with high memory pressure may hit GC pauses, swap, or OOM kill.
- Azure Monitor `Available Memory Bytes` reflects the drop.
- After the duration ends, the stress workers exit and memory returns to baseline.

:::info When the fault ends
The chaos pod terminates the stress workers through a follow-up run-command call. Memory returns to baseline within seconds (no swap thrashing).
:::

### Signals to watch

- **VM memory:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_memory_MemAvailable_bytes` (Linux) or `windows_memory_available_bytes` and assert the drop is observed.
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error rate stays under threshold.

---

## Verify the fault execution effect

1. **Inspect Azure Monitor `Available Memory Bytes`.**

   ```bash
   az monitor metrics list \
     --resource /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm> \
     --metric "Available Memory Bytes" \
     --interval PT1M
   ```

2. **SSH and run `free -h`.**

   `available` should drop during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress workers.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also terminates the workers.
- **Manual recovery:** SSH into the VM and `pkill -f memory-stress` if the workers survived.
- **Workload recovery:** Memory returns to baseline within seconds; affected applications may need a restart if they swapped or were OOM-killed.

---

## Limitations

- **OOM risk:** Setting `MEMORY_PERCENTAGE` close to 100 may trigger the OOM killer on critical processes; start conservatively.
- **Swap behavior varies:** Linux VMs with swap configured may swap instead of OOM; behavior depends on guest OS settings.
- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.

---

## Troubleshooting

<Troubleshoot
  issue="Azure instance memory hog fails with run-command failed in Harness Chaos Engineering"
  mode="docs"
  fallback="The Azure VM Agent must be running and reachable. Verify with az vm get-instance-view -g <rg> -n <vm> --query 'instanceView.vmAgent.statuses'. Reinstall the VM Agent if its status is not Ready."
/>

<Troubleshoot
  issue="VM became unresponsive during memory hog"
  mode="docs"
  fallback="If MEMORY_PERCENTAGE was very high (>90%), the OOM killer may have terminated the SSH or VM Agent. Restart the VM with az vm restart -g <rg> -n <vm> and reduce MEMORY_PERCENTAGE."
/>

---

## Related faults

- [Azure instance CPU hog](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-cpu-hog): Stress CPU instead of memory.
- [Azure instance IO stress](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-io-stress): Stress disk IO instead of memory.
