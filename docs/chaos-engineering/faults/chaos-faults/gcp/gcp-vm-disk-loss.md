---
id: gcp-vm-disk-loss
title: GCP VM disk loss
sidebar_label: GCP VM Disk Loss
description: Detach one or more non-boot persistent disks from GCP VM instances for a configurable duration, then reattach them, so you can test how the workload behaves when its storage disappears.
keywords:
  - chaos engineering
  - gcp vm disk loss
  - gcp fault
  - persistent disk
tags:
  - chaos-engineering
  - gcp-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-disk-loss
- /docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM disk loss is a GCP chaos fault that detaches one or more non-boot persistent disks listed in `DISK_VOLUME_NAMES` (in `ZONES`, project `GCP_PROJECT_ID`) from their attached VM instances for `TOTAL_CHAOS_DURATION` seconds, then reattaches them on the same device path. Boot disks are excluded by design.

Use this fault to test how a workload behaves when its storage disappears: whether the application surfaces `EIO`/IO errors cleanly, whether file systems remount correctly when the disk returns, whether backups and snapshot strategies cover sudden volume loss, and whether monitoring detects the volume loss within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Storage loss handling:** When the data disk disappears, does the application surface a clean error or wedge on I/O?
- **Filesystem recovery:** Does the filesystem remount cleanly when the disk is reattached?
- **Stateful workload resilience:** Do databases (Postgres, MySQL, Cassandra) recover from a brief storage outage without data loss?
- **DR readiness:** Do snapshots and replicas catch up after the volume returns?
- **Monitoring fidelity:** Do alerts on `compute.googleapis.com/instance/disk/read_ops_count`, mount-point failures, and application errors fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target disks reachable:** Each entry in `DISK_VOLUME_NAMES` exists in the corresponding zone in `ZONES` and `GCP_PROJECT_ID`.
- **Disks are non-boot:** Boot disks are rejected. Verify with `gcloud compute disks describe <name> --zone=<zone> --format='value(users)'`.
- **GCP credentials available:** Either a Google service account JSON key uploaded as a **File Secret in Harness Secret Manager** (referenced via `GCP_AUTHENTICATION_SECRET`) or Workload Identity bound to the chaos infrastructure service account.
- **IAM permissions granted:** The service account includes the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Compute Engine VMs with non-boot persistent disks | Supported |
| Regional persistent disks | Supported |
| Local SSD | Not supported (cannot be detached) |
| Boot disks | Not supported (rejected by design) |
| Multi-zone targeting in a single run | Supported via comma-separated `ZONES` matching the order of `DISK_VOLUME_NAMES` |

---

## Permissions required

The Google service account used by the chaos pod needs the following IAM permissions on the target project.

```json
{
  "permissions": [
    "compute.disks.get",
    "compute.disks.list",
    "compute.instances.get",
    "compute.instances.attachDisk",
    "compute.instances.detachDisk"
  ]
}
```

Granting `roles/compute.instanceAdmin.v1` is the simplest setup.

---

## Authentication

The fault supports two credential delivery models.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager File Secret | Chaos infrastructure runs outside GKE, or you want explicit static credentials | Upload the GCP service account JSON key as a **File Secret** in Harness Secret Manager and reference its identifier via `GCP_AUTHENTICATION_SECRET` |
| Workload Identity | Chaos infrastructure runs on GKE with Workload Identity enabled | Bind a Google service account to the chaos infra Kubernetes service account; no tunable changes required |

Go to [Creating secrets for GCP experiments](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to read the secret format.

---

## Fault tunables

Configure the following fault parameters when you add GCP VM disk loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_PROJECT_ID` | ID of the GCP project that contains the disks. | (required) |
| `DISK_VOLUME_NAMES` | Comma-separated list of disk volume names to detach (for example `data-1,logs-1`). | (required) |
| `ZONES` | Comma-separated list of zones in the same order as `DISK_VOLUME_NAMES`. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The disks stay detached for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple disks are detached: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the GCP service account JSON key. Not required when using Workload Identity. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Reads the current attachment for each disk in `DISK_VOLUME_NAMES` (in the matching zone from `ZONES`), calls `instances.detachDisk` to remove it from the attached VM, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `instances.attachDisk` with the same device path to reattach it.

---

## Expected behavior during fault execution

- Each affected VM's `/dev/disk/by-id/google-<device>` entry disappears for the duration.
- Filesystems mounted from the detached disk go into an I/O error state; processes accessing them block or return `EIO`.
- After the duration ends, the disks reattach with the same device name; depending on the workload, the filesystem may remount automatically or require manual `mount -a`.
- Cloud Monitoring metrics (`disk/read_ops_count`, `disk/write_ops_count`) drop to zero on the affected device for the duration.

:::info When the fault ends
The chaos pod reattaches each disk to its original VM on the same device path. Whether the filesystem remounts automatically depends on the VM's fstab options and the application's I/O retry behavior.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk presence on the VM:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that SSHs to the VM and runs `lsblk` / `mount | grep <device>`.
- **Application I/O errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application error counters (Postgres `pg_stat_database_xact_rollback`, Cassandra disk-failure counters).
- **Monitoring:** Use a Prometheus probe on `compute.googleapis.com/instance/disk/read_ops_count` to confirm I/O dropped during the chaos window.

---

## Verify the fault execution effect

1. **Inspect disk attachment state.**

   ```bash
   gcloud compute disks describe <disk-name> \
     --zone=<zone> \
     --format="value(users)"
   ```

   The `users` field should be empty during the chaos window and contain the VM URL afterwards.

2. **Inspect the VM's block devices.**

   ```bash
   gcloud compute ssh <vm-name> --zone=<zone> --command="lsblk"
   ```

   The detached device should not appear during the chaos window.

3. **Inspect audit logs.**

   ```bash
   gcloud logging read 'protoPayload.methodName=v1.compute.instances.detachDisk' --limit=10
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `instances.attachDisk` to reattach every detached disk.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also reattaches the disks.
- **Manual recovery:** If a disk stayed detached, run `gcloud compute instances attach-disk <vm-name> --disk=<disk-name> --device-name=<device-name> --zone=<zone>` to reattach it (device name is recorded in the chaos pod logs).
- **Workload recovery:** Filesystems may need `mount -a` or an application restart depending on retry behavior.

---

## Limitations

- **Non-boot only:** Boot disks are not supported.
- **Same-project targeting:** A single experiment targets one `GCP_PROJECT_ID`.
- **Local SSDs unsupported:** Local SSDs cannot be detached and are rejected.
- **No mid-flight retarget:** Disk lists cannot be changed during the chaos window; abort and re-run to change them.
- **Filesystem remount is best-effort:** Whether the filesystem remounts automatically depends on the VM's fstab and the OS image; verify recovery in your workload's logs.

---

## Troubleshooting

<Troubleshoot
  issue="GCP VM disk loss fails with disk is a boot disk in Harness Chaos Engineering"
  mode="docs"
  fallback="The fault rejects boot disks by design. Confirm DISK_VOLUME_NAMES contains only non-boot disks with gcloud compute disks describe <name> --zone=<zone> --format='value(users,boot)'."
/>

<Troubleshoot
  issue="GCP VM disk loss fails with PermissionDenied"
  mode="docs"
  fallback="The service account used by the chaos pod is missing compute.instances.attachDisk or compute.instances.detachDisk. Grant roles/compute.instanceAdmin.v1 on the target project."
/>

<Troubleshoot
  issue="Disk reattached but filesystem did not remount"
  mode="docs"
  fallback="The filesystem may not auto-remount depending on fstab options. SSH into the VM and run sudo mount -a (or remount the specific device explicitly). For application-level recovery, restart the dependent service."
/>

---

## Related faults

- [GCP VM disk loss by label](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-disk-loss-by-label): Detach disks selected by label.
- [GCP VM instance stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop): Stop the VM instead of detaching a disk.
