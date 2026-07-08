---
id: gcp-vm-instance-stop-by-label
title: GCP VM instance stop by label
sidebar_label: GCP VM Instance Stop By Label
description: Stop a percentage of GCP Compute Engine VM instances selected by label for a configurable duration, then start them again, so you can test how the workload behaves when a labeled subset of VMs disappears.
keywords:
  - chaos engineering
  - gcp vm instance stop by label
  - gcp fault
  - compute engine
tags:
  - chaos-engineering
  - gcp-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-instance-stop-by-label
- /docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop-by-label
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM instance stop by label is a GCP chaos fault that resolves a set of Compute Engine VM instances matching `INSTANCE_LABEL` in the zones listed in `ZONES` (project `GCP_PROJECT_ID`), selects `INSTANCE_AFFECTED_PERCENTAGE` of them, stops them for `TOTAL_CHAOS_DURATION` seconds, then starts them again. When `MANAGED_INSTANCE_GROUP=enable`, the fault does not start the stopped instances; it relies on the managed instance group (MIG) auto-healer to recreate them.

Use this fault to test how a workload behaves when a labeled subset of VMs disappears: whether managed instance groups recreate them, whether load balancers fail traffic over, whether GKE drains and reschedules pods, and whether monitoring detects the outage within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Tagged subset failure:** When `INSTANCE_AFFECTED_PERCENTAGE` of VMs labeled `INSTANCE_LABEL` stop, do dependents recover inside the SLA?
- **Multi-AZ resilience:** Spread the label across multiple `ZONES` and verify the workload survives losing one zone's worth of instances.
- **MIG auto-healing:** Does the managed instance group recreate the affected VMs with the expected boot time?
- **Cluster-level resilience (GKE):** If the labeled instances are GKE nodes, does the cluster drain pods and reschedule them on healthy nodes inside the SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Label exists on at least one VM:** `INSTANCE_LABEL` (formatted `key:value`) matches at least one VM in `ZONES`/`GCP_PROJECT_ID`.
- **VMs in `RUNNING` state:** The fault skips VMs that are already `TERMINATED` or `STOPPING`.
- **GCP credentials available:** Either a Google service account JSON key uploaded as a **File Secret in Harness Secret Manager** (referenced via `GCP_AUTHENTICATION_SECRET`) or Workload Identity bound to the chaos infrastructure service account.
- **IAM permissions granted:** The service account includes the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Compute Engine VMs (any machine type) | Supported |
| GKE worker nodes (Compute Engine MIGs) | Supported |
| GKE Autopilot nodes | Not supported (nodes are managed by GCP) |
| Spot/Preemptible VMs | Supported |
| Multi-zone targeting in a single run | Supported via comma-separated `ZONES` |

---

## Permissions required

The Google service account used by the chaos pod needs the following IAM permissions on the target project.

```json
{
  "permissions": [
    "compute.instances.get",
    "compute.instances.start",
    "compute.instances.stop",
    "compute.instances.list"
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

Configure the following fault parameters when you add GCP VM instance stop by label to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_PROJECT_ID` | ID of the GCP project that contains the VM instances. | (required) |
| `ZONES` | Comma-separated list of zones to scan for the label. | (required) |
| `INSTANCE_LABEL` | Label that selects the target VMs (format `key:value`, for example `env:staging`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The VMs stay stopped for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `MANAGED_INSTANCE_GROUP` | When `enable`, the fault does not start the instances after the chaos; the MIG auto-healer recreates them. | `disable` |
| `INSTANCE_AFFECTED_PERCENTAGE` | Percentage of label-matching VMs to stop (0-100). `0` defaults to all matches. | `0` |
| `SEQUENCE` | Order in which selected instances are stopped: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the GCP service account JSON key. Not required when using Workload Identity. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Lists Compute Engine VMs across `ZONES` (in `GCP_PROJECT_ID`) that match `INSTANCE_LABEL`, picks `INSTANCE_AFFECTED_PERCENTAGE` of them, calls `instances.stop` on each, waits for `TOTAL_CHAOS_DURATION`, then calls `instances.start` (unless `MANAGED_INSTANCE_GROUP=enable`).

---

## Expected behavior during fault execution

- A subset of label-matching VMs transition `RUNNING` → `STOPPING` → `TERMINATED` for the duration.
- For GKE worker nodes: pods on the affected nodes go to `NotReady`/`Unknown`, then the scheduler reschedules them.
- For VMs behind load balancers: health checks fail on the affected backends; traffic shifts to healthy ones.
- When `MANAGED_INSTANCE_GROUP=enable`, the MIG auto-healer launches replacement VMs with new instance IDs.
- After the duration ends (and `MANAGED_INSTANCE_GROUP=disable`), the affected VMs transition back to `RUNNING`.

:::info When the fault ends
The chaos pod calls `instances.start` on every targeted VM unless `MANAGED_INSTANCE_GROUP=enable`. Boot time depends on the machine image and startup scripts.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Instance count by label:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `gcloud compute instances list --filter='labels.<key>=<value> AND status=RUNNING' --format='value(name)' | wc -l` and assert the count dropped.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.
- **MIG health:** Use a command probe running `gcloud compute instance-groups managed describe <mig>` to confirm the auto-healer recreated the VMs.

---

## Verify the fault execution effect

1. **List affected VMs.**

   ```bash
   gcloud compute instances list \
     --filter="labels.<key>=<value>" \
     --format="table(name,zone,status)"
   ```

   You should see `TERMINATED` rows during the chaos window and `RUNNING` rows afterwards.

2. **Inspect Cloud Monitoring.**

   Use the Cloud Console to confirm `compute.googleapis.com/instance/uptime` dropped on the affected instances.

3. **Inspect audit logs.**

   ```bash
   gcloud logging read 'resource.type=gce_instance AND protoPayload.methodName=v1.compute.instances.stop' --limit=20
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `instances.start` on every targeted VM (unless `MANAGED_INSTANCE_GROUP=enable`).
- **Abort the experiment:** Stopping the experiment from Chaos Studio also calls `instances.start`.
- **Manual recovery:** Run `gcloud compute instances start <vm-name> --zone=<zone>` for each VM that stayed stopped.
- **Workload recovery:** Boot time depends on the machine image and startup scripts; GKE node `Ready` transitions usually complete within 2-3 minutes.

---

## Limitations

- **Same-project targeting:** A single experiment targets one `GCP_PROJECT_ID`.
- **Label scoped to listed zones:** VMs in zones not listed in `ZONES` are not considered even if the label matches.
- **Percentage rounding:** `INSTANCE_AFFECTED_PERCENTAGE` rounds down; at least one VM is always selected if the label matches anything.
- **Spot/preemptible behavior:** GCP may not start preempted Spot VMs back automatically.
- **MIG mode skips restart:** When `MANAGED_INSTANCE_GROUP=enable`, recovery is fully driven by the MIG auto-healer.

---

## Troubleshooting

<Troubleshoot
  issue="GCP VM instance stop by label fails with no matching instances in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm INSTANCE_LABEL is formatted key:value and the zones in ZONES contain VMs with that label. List them with gcloud compute instances list --filter='labels.<key>=<value>' --format='table(name,zone)'."
/>

<Troubleshoot
  issue="GCP VM instance stop by label fails with PermissionDenied"
  mode="docs"
  fallback="The service account used by the chaos pod is missing compute.instances.list, compute.instances.stop, or compute.instances.start. Grant roles/compute.instanceAdmin.v1 on the target project."
/>

<Troubleshoot
  issue="VMs stayed STOPPED after the experiment ended"
  mode="docs"
  fallback="If MANAGED_INSTANCE_GROUP=disable, run gcloud compute instances start <vm-name> --zone=<zone> for each VM still in TERMINATED state. If MANAGED_INSTANCE_GROUP=enable, check the MIG auto-healer status."
/>

---

## Related faults

- [GCP VM instance stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop): Stop named VMs instead of label-selected ones.
- [GCP VM disk loss by label](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-disk-loss-by-label): Detach disks selected by label.
