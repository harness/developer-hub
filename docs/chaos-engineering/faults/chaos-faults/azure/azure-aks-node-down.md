---
id: azure-aks-node-down
title: Azure AKS node down
sidebar_label: Azure AKS Node Down
description: Deallocate a percentage of AKS worker VMs (selected by node pool and zone) for a configurable duration so you can test how the workload behaves when AKS nodes disappear.
keywords:
  - chaos engineering
  - azure aks node down
  - azure fault
  - aks
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-aks-node-down
- /docs/chaos-engineering/chaos-faults/azure/azure-aks-node-down
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure AKS node down is an Azure chaos fault that resolves the VMSS instances backing the AKS cluster `AKS_CLUSTER_NAME` in `AKS_RESOURCE_GROUP` (limited to `TARGET_NODE_POOL_NAMES` and `TARGET_ZONES`), selects `NODE_AFFECTED_PERCENTAGE` of them, deallocates them for `TOTAL_CHAOS_DURATION` seconds, then starts them again.

Use this fault to test how a workload behaves when AKS nodes disappear: whether the scheduler reschedules pods inside the alerting SLA, whether load balancers fail traffic over, whether ephemeral storage is preserved correctly, and whether monitoring detects the node failures within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Pod rescheduling:** When a percentage of nodes disappear, does the scheduler find homes for affected pods inside the SLA?
- **PodDisruptionBudgets:** Do PDBs honor the budget across the node-down window without serving fewer replicas than required?
- **Cluster autoscaler:** Does the cluster autoscaler add capacity in time when pods become unschedulable?
- **Zone-level resilience:** Targeting a single zone tests how the workload survives losing an entire AZ's worth of nodes.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target AKS cluster:** `AKS_CLUSTER_NAME` exists in `AKS_RESOURCE_GROUP`. `TARGET_NODE_POOL_NAMES` and `TARGET_ZONES` (empty means all) refer to existing node pools and zones.
- **Azure credentials available:** Service principal File Secret, workload identity, or managed identity on the AKS node pool that hosts the chaos infrastructure.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AKS with VMSS node pools | Supported |
| AKS Virtual Machines (Standalone) | Not supported |
| AKS Automatic / Karpenter-managed nodes | Supported (cluster autoscaler decides recovery) |
| Multi-zone AKS clusters | Supported via `TARGET_ZONES` |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the AKS resource group (or the auto-generated `MC_<rg>_<cluster>_<region>` resource group that owns the VMSS).

**Recommended built-in role:** `Virtual Machine Contributor` on the node resource group (`MC_<rg>_<cluster>_<region>`).

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos AKS Node Down",
  "Actions": [
    "Microsoft.ContainerService/managedClusters/read",
    "Microsoft.ContainerService/managedClusters/agentPools/read",
    "Microsoft.Compute/virtualMachineScaleSets/read",
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

Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to set up Service principal, Workload identity, or Managed identity.

---

## Fault tunables

Configure the following fault parameters when you add Azure AKS node down to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AKS_CLUSTER_NAME` | Name of the AKS cluster. | (required) |
| `AKS_RESOURCE_GROUP` | Resource group that contains the AKS cluster. | (required) |

**Selection parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE_POOL_NAMES` | Comma-separated list of node pool names to target. Empty means all node pools in the cluster. | `""` |
| `TARGET_ZONES` | Comma-separated list of availability zones to target (for example `1,2`). Empty means all zones. | `""` |
| `NODE_AFFECTED_PERCENTAGE` | Percentage of matching nodes to deallocate (0-100). `0` defaults to all matches. | `0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. Nodes stay deallocated for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple nodes are deallocated: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Lists VMSS instances backing the AKS cluster in `AKS_RESOURCE_GROUP`, filters by `TARGET_NODE_POOL_NAMES` and `TARGET_ZONES`, picks `NODE_AFFECTED_PERCENTAGE` of the matches, deallocates them via the VMSS API for `TOTAL_CHAOS_DURATION`, then starts them again.

---

## Expected behavior during fault execution

- The selected AKS nodes transition `running` → `deallocated` and stay there for the duration.
- Pods on the affected nodes go to `NotReady`/`Unknown`; the scheduler reschedules them onto healthy nodes (within PDB constraints).
- LoadBalancer Services drop the affected backends and shift traffic.
- After the duration ends, the nodes start back, the kubelet re-registers, and pods may rebalance.

:::info When the fault ends
The chaos pod calls `start` on every deallocated VMSS instance. AKS marks the node `Ready` once the kubelet checks in.
:::

### Signals to watch

- **Node readiness:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `kubectl get nodes` and assert ready-count is consistent with PDBs.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **List VMSS instances and their state.**

   ```bash
   az vmss list-instances --resource-group MC_<rg>_<cluster>_<region> --name <vmss> \
     --query "[].{name:name,powerState:instanceView.statuses[?starts_with(code, 'PowerState/')].code}"
   ```

2. **Inspect AKS nodes from kubectl.**

   ```bash
   kubectl get nodes -o wide
   ```

   Affected nodes should appear `NotReady` during the chaos window and `Ready` afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos pod starts every deallocated VMSS instance.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also starts them.
- **Manual recovery:** Run `az vmss start --resource-group <node-rg> --name <vmss> --instance-ids <id>` for any instance that stayed deallocated.

---

## Limitations

- **VMSS node pools only:** AKS Virtual Machines (standalone) node pools are not supported.
- **Single cluster per run:** Each fault run targets one AKS cluster.
- **Cluster autoscaler interaction:** The autoscaler may interpret the deallocation as capacity loss; this is the intended behavior under test.
- **Zone selection:** `TARGET_ZONES` values must match the zone labels reported by `kubectl get nodes --label-columns=topology.kubernetes.io/zone`.

---

## Troubleshooting

<Troubleshoot
  issue="Azure AKS node down fails with AuthorizationFailed in Harness Chaos Engineering"
  mode="docs"
  fallback="The principal is missing VMSS deallocate/start actions on the node resource group (MC_<rg>_<cluster>_<region>). Assign Virtual Machine Contributor on that resource group, not the AKS resource group."
/>

<Troubleshoot
  issue="Azure AKS node down selected zero nodes"
  mode="docs"
  fallback="Verify TARGET_NODE_POOL_NAMES matches the actual node pool names with az aks nodepool list -g <rg> --cluster-name <cluster> --query '[].name'. Verify TARGET_ZONES values match kubectl get nodes --label-columns=topology.kubernetes.io/zone."
/>

<Troubleshoot
  issue="Nodes did not become Ready after the experiment ended"
  mode="docs"
  fallback="Allow up to 5 minutes for kubelet to re-register after the start call. If a node stays NotReady, inspect Azure activity log for failed start actions and run az vmss start manually."
/>

---

## Related faults

- [Azure instance stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Stop a named VM instead of a percentage of AKS nodes.
- [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog): Stress CPU on a node instead of deallocating it.
- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Cordon and drain a node from inside Kubernetes.
