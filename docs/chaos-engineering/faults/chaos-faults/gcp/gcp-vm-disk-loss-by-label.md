---
id: gcp-vm-disk-loss-by-label
title: GCP VM disk loss by label
sidebar_label: GCP VM Disk Loss By Label
description: Detach a percentage of non-boot persistent disks selected by label from GCP VM instances for a configurable duration, then reattach them, so you can test how the workload behaves when a labeled subset of storage disappears.
keywords:
  - chaos engineering
  - gcp vm disk loss by label
  - gcp fault
  - persistent disk
tags:
  - chaos-engineering
  - gcp-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-disk-loss-by-label
- /docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss-by-label
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM disk loss by label is a GCP chaos fault that resolves the set of non-boot persistent disks matching `DISK_VOLUME_LABEL` in the zones listed in `ZONES` (project `GCP_PROJECT_ID`), selects `DISK_AFFECTED_PERCENTAGE` of them, detaches them from their attached VMs for `TOTAL_CHAOS_DURATION` seconds, then reattaches them.

Use this fault to test how a workload behaves when a labeled subset of storage volumes disappears: whether the application surfaces clean `EIO` errors, whether stateful workloads recover, whether DR procedures kick in, and whether monitoring detects the volume loss within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Tagged subset disk loss:** When `DISK_AFFECTED_PERCENTAGE` of disks labeled `DISK_VOLUME_LABEL` disappear, do dependents handle the failure cleanly?
- **Stateful workload resilience:** Do replicated stateful workloads (Cassandra, Postgres replicas) survive losing a labeled subset of storage?
- **DR rehearsal:** Validate the recovery procedure for losing a tagged subset of disks across zones.
- **Monitoring fidelity:** Do alerts on disk I/O and application errors fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Label exists on at least one disk:** `DISK_VOLUME_LABEL` (formatted `key:value`) matches at least one non-boot disk in `ZONES`/`GCP_PROJECT_ID`.
- **Disks are non-boot:** Boot disks are rejected by design.
- **GCP credentials available:** Either a Google service account JSON key uploaded as a **File Secret in Harness Secret Manager** (referenced via `GCP_AUTHENTICATION_SECRET`) or Workload Identity bound to the chaos infrastructure service account.
- **IAM permissions granted:** The service account includes the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Compute Engine VMs with non-boot persistent disks | Supported |
| Regional persistent disks | Supported |
| Local SSD | Not supported (cannot be detached) |
| Boot disks | Not supported |
| Multi-zone targeting in a single run | Supported via comma-separated `ZONES` |

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

Configure the following fault parameters when you add GCP VM disk loss by label to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_PROJECT_ID` | ID of the GCP project that contains the disks. | (required) |
| `ZONES` | Comma-separated list of zones to scan for the label. | (required) |
| `DISK_VOLUME_LABEL` | Label that selects the target disks (format `key:value`, for example `tier:data`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The disks stay detached for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `DISK_AFFECTED_PERCENTAGE` | Percentage of label-matching disks to detach (0-100). Empty defaults to all matches. | `""` |
| `SEQUENCE` | Order in which selected disks are detached: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the GCP service account JSON key. Not required when using Workload Identity. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Lists non-boot Compute Engine disks across `ZONES` (in `GCP_PROJECT_ID`) that match `DISK_VOLUME_LABEL`, picks `DISK_AFFECTED_PERCENTAGE` of them, calls `instances.detachDisk` for each on its attached VM, waits for `TOTAL_CHAOS_DURATION`, then calls `instances.attachDisk` to reattach with the same device path.

---

## Expected behavior during fault execution

- Each affected VM loses the matching disk for the duration; the device entry disappears under `/dev/disk/by-id/`.
- Filesystems mounted from the detached disk go into an I/O error state; processes accessing them block or return `EIO`.
- After the duration ends, the disks reattach with the same device name.
- Cloud Monitoring metrics (`disk/read_ops_count`, `disk/write_ops_count`) drop to zero on the affected devices for the duration.

:::info When the fault ends
The chaos pod reattaches each disk to its original VM on the same device path. Whether the filesystem remounts automatically depends on fstab options and application I/O retry behavior.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk count by label:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `gcloud compute disks list --filter='labels.<key>=<value>' --format='value(users)'` and assert some had an empty `users` field during the chaos window.
- **Application I/O errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application error counters.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises a write path.

---

## Verify the fault execution effect

1. **List affected disks.**

   ```bash
   gcloud compute disks list \
     --filter="labels.<key>=<value>" \
     --format="table(name,zone,users)"
   ```

   You should see empty `users` rows during the chaos window and populated `users` rows afterwards.

2. **Inspect Cloud Monitoring.**

   Use the Cloud Console to confirm `disk/read_ops_count` dropped on the affected devices.

3. **Inspect audit logs.**

   ```bash
   gcloud logging read 'protoPayload.methodName=v1.compute.instances.detachDisk' --limit=20
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `instances.attachDisk` to reattach every detached disk.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also reattaches the disks.
- **Manual recovery:** Run `gcloud compute instances attach-disk <vm-name> --disk=<disk-name> --device-name=<device-name> --zone=<zone>` for any disk that stayed detached.
- **Workload recovery:** Filesystems may need `mount -a` or an application restart depending on retry behavior.

---

## Limitations

- **Non-boot only:** Boot disks are not supported.
- **Same-project targeting:** A single experiment targets one `GCP_PROJECT_ID`.
- **Label scoped to listed zones:** Disks in zones not listed in `ZONES` are not considered.
- **Percentage rounding:** `DISK_AFFECTED_PERCENTAGE` rounds down; empty selects all matches.
- **No mid-flight retarget:** Label or percentage cannot be changed during the chaos window.

---

## Troubleshooting

<Troubleshoot
  issue="GCP VM disk loss by label fails with no matching disks in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm DISK_VOLUME_LABEL is formatted key:value and the zones in ZONES contain non-boot disks with that label. List them with gcloud compute disks list --filter='labels.<key>=<value>' --format='table(name,zone,users)'."
/>

<Troubleshoot
  issue="GCP VM disk loss by label fails with PermissionDenied"
  mode="docs"
  fallback="The service account used by the chaos pod is missing compute.disks.list, compute.instances.attachDisk, or compute.instances.detachDisk. Grant roles/compute.instanceAdmin.v1 on the target project."
/>

<Troubleshoot
  issue="Disks reattached but filesystems did not remount"
  mode="docs"
  fallback="The filesystem may not auto-remount depending on fstab options. SSH into each affected VM and run sudo mount -a (or remount the specific device). For application-level recovery, restart the dependent service."
/>

---

## Related faults

- [GCP VM disk loss](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-disk-loss): Detach named disks instead of label-selected ones.
- [GCP VM instance stop by label](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop-by-label): Stop the VMs instead of detaching disks.
