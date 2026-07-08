---
id: azure-instance-stop
title: Azure instance stop
sidebar_label: Azure Instance Stop
description: Stop one or more Azure VM instances by name for a configurable duration, then start them again, so you can test how the workload behaves when a VM disappears.
keywords:
  - chaos engineering
  - azure instance stop
  - azure fault
  - virtual machines
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-instance-stop
- /docs/chaos-engineering/chaos-faults/azure/azure-instance-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure instance stop is an Azure chaos fault that stops (deallocates) one or more Virtual Machines listed in `AZURE_INSTANCE_NAMES` (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) for `TOTAL_CHAOS_DURATION` seconds, then starts them again. When `SCALE_SET=enable`, the fault deallocates VMSS instances; the scale set's auto-recovery decides whether to bring them back.

Use this fault to test how a workload behaves when a VM disappears: whether load balancers shift traffic, whether VMSS auto-healing recreates the instance inside the alerting SLA, whether AKS node-down handling reschedules pods, and whether monitoring detects the outage within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **VM disappears:** When the target VM deallocates, do load balancers fail traffic over inside the SLA?
- **VMSS recovery:** Does the scale set recreate the deallocated instance with the expected boot time?
- **AKS node-down handling:** If the VM is an AKS worker, does the cluster drain pods and reschedule them on healthy nodes?
- **Monitoring fidelity:** Do alerts on `Microsoft.Compute/virtualMachines/Availability`, instance count, and end-to-end availability fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target VMs reachable:** Each entry in `AZURE_INSTANCE_NAMES` exists in `RESOURCE_GROUP` inside `AZURE_SUBSCRIPTION_ID`.
- **VM in `running` state:** The fault refuses to deallocate a VM that is already `stopped` or `deallocated`.
- **Azure credentials available:** A service principal JSON delivered as a File Secret in Harness Secret Manager, workload identity bound to the chaos infra service account, or managed identity on the AKS node pool.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Standalone Virtual Machines | Supported |
| Virtual Machine Scale Set instances | Supported (set `SCALE_SET=enable`) |
| AKS worker nodes (VMSS-backed) | Supported with `SCALE_SET=enable` |
| Spot VMs | Supported (note: Azure may not start them back automatically) |

---

## Permissions required

The Azure principal used by the chaos pod (service principal, workload identity, or managed identity) needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Virtual Machine Contributor`

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos VM Stop",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/deallocate/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/deallocate/action"
  ],
  "AssignableScopes": ["/subscriptions/<SUBSCRIPTION_ID>"]
}
```

Go to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to read the full permission catalog.

---

## Authentication

Pick one of the following methods. Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to read the full setup.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Service principal | Chaos infrastructure runs outside AKS, or you want explicit static credentials | Upload the service principal JSON file as a **File Secret in Harness Secret Manager** and reference it via `AZURE_AUTHENTICATION_SECRET` |
| Workload identity | Chaos infrastructure runs on AKS with OIDC issuer + workload identity enabled | Annotate the chaos infra service account with `azure.workload.identity/client-id`; the pod authenticates without static credentials |
| Managed identity | Chaos infrastructure runs on AKS with a system-assigned or user-assigned managed identity on the node pool | No tunable changes; the pod inherits the identity from IMDS |

---

## Fault tunables

Configure the following fault parameters when you add Azure instance stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_INSTANCE_NAMES` | Comma-separated list of VM names (for example `vm-1,vm-2`). | (required) |
| `RESOURCE_GROUP` | Resource group that contains the VMs. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The VMs stay deallocated for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SCALE_SET` | Set to `enable` when the VMs belong to a Virtual Machine Scale Set. Otherwise leave empty. | `""` |
| `SEQUENCE` | Order in which multiple instances are stopped: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. Required when using workload identity or managed identity. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity (only if you have multiple identities attached). | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Calls the Azure Resource Manager API to deallocate each VM in `AZURE_INSTANCE_NAMES` (in `RESOURCE_GROUP`), waits for `TOTAL_CHAOS_DURATION` seconds, then starts the VMs again.

---

## Expected behavior during fault execution

- The target VMs transition `running` → `stopping` → `deallocated` and stay there for `TOTAL_CHAOS_DURATION`.
- For AKS worker nodes: pods on the node go to `NotReady`/`Unknown`, then the scheduler reschedules them.
- For VMs behind a load balancer: backend health probes fail; traffic shifts to healthy backends.
- After the duration ends, the VMs transition back to `running`.

:::info When the fault ends
The chaos pod calls `start` on every targeted VM. Boot time depends on the OS image and post-boot init scripts.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `az vm get-instance-view -g <rg> -n <vm> --query 'instanceView.statuses[?starts_with(code, ''PowerState/'')].code'` and assert the state changed.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint behind the load balancer.

---

## Verify the fault execution effect

1. **Inspect VM power state with `az`.**

   ```bash
   az vm get-instance-view --resource-group <rg> --name <vm> \
     --query "instanceView.statuses[?starts_with(code, 'PowerState/')].code"
   ```

   The state should be `PowerState/deallocated` during the chaos window and `PowerState/running` afterwards.

2. **Inspect Azure activity log.**

   ```bash
   az monitor activity-log list --resource-group <rg> --max-events 20 \
     --query "[?contains(operationName.value,'deallocate')]"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `start` on every targeted VM.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also calls `start`.
- **Manual recovery:** If the chaos pod exited before restart, run `az vm start --resource-group <rg> --name <vm>` manually.
- **Workload recovery:** Boot time depends on the OS image and init scripts; AKS node `Ready` transitions usually complete within 2-3 minutes.

---

## Limitations

- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.
- **Resource group scope:** All entries in `AZURE_INSTANCE_NAMES` must be in `RESOURCE_GROUP`.
- **Spot VMs:** Azure may not start back evicted Spot VMs automatically.
- **VMSS instance IDs:** When `SCALE_SET=enable`, entries in `AZURE_INSTANCE_NAMES` are VMSS instance IDs (`0`, `1`, ...), not VM names.

---

## Troubleshooting

<Troubleshoot
  issue="Azure instance stop fails with AuthorizationFailed in Harness Chaos Engineering"
  mode="docs"
  fallback="The Azure principal used by the chaos pod is missing Microsoft.Compute/virtualMachines/deallocate or start. Assign the Virtual Machine Contributor role (or a custom role with the required actions) on the target resource group or subscription."
/>

<Troubleshoot
  issue="Azure instance stop fails with ResourceNotFound"
  mode="docs"
  fallback="Confirm each VM name in AZURE_INSTANCE_NAMES exists in RESOURCE_GROUP with az vm list -g <rg> --query '[].name'. Confirm AZURE_SUBSCRIPTION_ID matches the subscription that owns the resource group."
/>

<Troubleshoot
  issue="VMs stayed deallocated after the experiment ended"
  mode="docs"
  fallback="If the chaos pod exited before start, run az vm start --resource-group <rg> --name <vm> manually. For VMSS instances, run az vmss start --resource-group <rg> --name <vmss> --instance-ids <id>."
/>

---

## Related faults

- [Azure AKS node down](/docs/chaos-engineering/faults/chaos-faults/azure/azure-aks-node-down): Deallocate AKS VMSS nodes selected by node pool or zone.
- [Azure disk loss](/docs/chaos-engineering/faults/chaos-faults/azure/azure-disk-loss): Detach disks instead of stopping VMs.
- [Azure web app stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-web-app-stop): Stop an App Service web app instead of a VM.
