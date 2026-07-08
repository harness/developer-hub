---
id: azure-disk-loss
title: Azure disk loss
sidebar_label: Azure Disk Loss
description: Detach one or more managed data disks from an Azure VM for a configurable duration, then reattach them, so you can test how the workload behaves when its storage disappears.
keywords:
  - chaos engineering
  - azure disk loss
  - azure fault
  - managed disks
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-disk-loss
- /docs/chaos-engineering/chaos-faults/azure/azure-disk-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure disk loss is an Azure chaos fault that detaches one or more managed data disks listed in `VIRTUAL_DISK_NAMES` from their attached VMs (in `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) for `TOTAL_CHAOS_DURATION` seconds, then reattaches them on the same LUN. OS disks are excluded by design.

Use this fault to test how a workload behaves when its storage disappears: whether the application surfaces clean IO errors, whether file systems remount cleanly when the disk returns, whether backup and DR strategies cover sudden volume loss, and whether monitoring detects the volume loss within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Storage loss handling:** When the data disk disappears, does the application surface a clean error or wedge on IO?
- **Filesystem recovery:** Does the filesystem remount cleanly when the disk is reattached?
- **Stateful workload resilience:** Do databases (Postgres, MySQL, Cassandra) recover from a brief storage outage?
- **Monitoring fidelity:** Do alerts on `Microsoft.Compute/disks/Availability` and application errors fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Disks are data disks:** Every entry in `VIRTUAL_DISK_NAMES` is a managed data disk currently attached to a VM in `RESOURCE_GROUP`. OS disks are rejected.
- **Azure credentials available:** Service principal File Secret, workload identity, or managed identity on the AKS node pool.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Standalone VMs with managed data disks | Supported |
| VMSS instances with managed data disks | Supported (set `SCALE_SET=enable`) |
| Ultra Disk and Premium SSD v2 | Supported (subject to LUN limits) |
| OS disks | Not supported |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the target resource group or subscription.

**Recommended built-in role:** `Virtual Machine Contributor`

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos Disk Loss",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/write",
    "Microsoft.Compute/disks/read",
    "Microsoft.Compute/disks/write",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read",
    "Microsoft.Compute/virtualMachineScaleSets/virtualMachines/write"
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

Configure the following fault parameters when you add Azure disk loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VIRTUAL_DISK_NAMES` | Comma-separated list of managed data disk names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the disks. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The disks stay detached for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SCALE_SET` | Set to `enable` when the disks are attached to VMSS instances. | `""` |
| `SEQUENCE` | Order in which multiple disks are detached: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity. | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Reads the current attachment for each disk in `VIRTUAL_DISK_NAMES` (the VM name and LUN), updates the VM to detach the disk, waits for `TOTAL_CHAOS_DURATION`, then updates the VM again to reattach the disk on the same LUN.

---

## Expected behavior during fault execution

- Each affected VM loses the data disk for the duration; the OS block device disappears.
- Filesystems mounted from the detached disk go into an IO error state; processes accessing them block or return `EIO` / `STATUS_DISK_OPERATION_FAILED`.
- Azure Monitor disk metrics drop to zero on the affected device.
- After the duration ends, the disk reattaches on the same LUN; depending on the workload, the filesystem may remount automatically.

:::info When the fault ends
The chaos pod reattaches each disk to its original VM on the same LUN. Whether the filesystem remounts automatically depends on the VM's fstab and the application's IO retry behavior.
:::

### Signals to watch

- **Block device on the VM:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that SSHs to the VM and runs `lsblk`.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the application's IO-error counter.

---

## Verify the fault execution effect

1. **Inspect disk attachment.**

   ```bash
   az disk show --resource-group <rg> --name <disk> \
     --query "{state:diskState,managedBy:managedBy}"
   ```

   `managedBy` should be empty during the chaos window.

2. **Inspect the VM's block devices.**

   ```bash
   az vm run-command invoke --resource-group <rg> --name <vm> \
     --command-id RunShellScript --scripts "lsblk"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod reattaches each detached disk on the same LUN.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also reattaches the disks.
- **Manual recovery:** Run `az vm disk attach --resource-group <rg> --vm-name <vm> --name <disk> --lun <lun>` for any disk that stayed detached (LUN is recorded in the chaos pod logs).

---

## Limitations

- **Data disks only:** OS disks are not supported.
- **LUN preservation:** The fault reattaches on the same LUN as it was detached from; if a different process attached another disk to that LUN in the meantime, the call fails.
- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.

---

## Troubleshooting

<Troubleshoot
  issue="Azure disk loss fails with OS disk cannot be detached in Harness Chaos Engineering"
  mode="docs"
  fallback="VIRTUAL_DISK_NAMES contains an OS disk. The fault refuses to detach OS disks by design. Pass only data disk names; verify with az disk show --query 'osType' (empty means data disk)."
/>

<Troubleshoot
  issue="Azure disk loss fails with AuthorizationFailed"
  mode="docs"
  fallback="The Azure principal is missing Microsoft.Compute/virtualMachines/write or Microsoft.Compute/disks/write. Assign Virtual Machine Contributor (or a custom role with the required actions) on the target resource group or subscription."
/>

<Troubleshoot
  issue="Disk reattached but filesystem did not remount"
  mode="docs"
  fallback="The filesystem may not auto-remount depending on fstab. SSH into the VM and run sudo mount -a or remount the specific device. For application-level recovery, restart the dependent service."
/>

---

## Related faults

- [Azure instance IO stress](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-io-stress): Stress disk IO instead of detaching the disk.
- [Azure instance stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Stop the VM instead of detaching its disk.
