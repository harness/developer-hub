---
id: gcp-vm-instance-stop
title: GCP VM instance stop
sidebar_label: GCP VM Instance Stop
description: Stop one or more GCP Compute Engine VM instances by name for a configurable duration, then start them again, so you can test how the workload behaves when a VM disappears.
keywords:
  - chaos engineering
  - gcp vm instance stop
  - gcp fault
  - compute engine
tags:
  - chaos-engineering
  - gcp-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-instance-stop
- /docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP VM instance stop is a GCP chaos fault that stops one or more Compute Engine VM instances listed in `VM_INSTANCE_NAMES` (in `ZONES`, project `GCP_PROJECT_ID`) for `TOTAL_CHAOS_DURATION` seconds, then starts them again. When `MANAGED_INSTANCE_GROUP=enable`, the fault does not start the stopped instances; it relies on the managed instance group (MIG) auto-healer to recreate them.

Use this fault to test how a workload behaves when a VM disappears: whether managed instance groups recreate the VM inside the alerting SLA, whether clients fail over cleanly, whether GKE node-down handling kicks in (if the VM is a GKE node), and whether monitoring detects the outage within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **VM disappears:** When the target VM stops, do dependents (load balancers, MIGs, GKE) recover inside the SLA?
- **MIG auto-healing:** Does the managed instance group recreate the VM with the expected boot time?
- **GKE node-down handling:** If the VM is a GKE node, does the cluster drain pods and reschedule them on healthy nodes?
- **Client failover:** Do clients connected to the stopped VM fail over to surviving instances cleanly?
- **Monitoring fidelity:** Do alerts on `compute.googleapis.com/instance/uptime`, instance count, and end-to-end availability fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target VMs reachable:** Each entry in `VM_INSTANCE_NAMES` exists in the corresponding zone in `ZONES` and `GCP_PROJECT_ID`.
- **VM in `RUNNING` state:** The fault refuses to stop a VM that is already `TERMINATED` or `STOPPING`.
- **GCP credentials available:** Either a Google service account JSON key uploaded as a **File Secret in Harness Secret Manager** (referenced via `GCP_AUTHENTICATION_SECRET`) or Workload Identity for chaos infrastructure running on GKE.
- **IAM permissions granted:** The service account includes the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Compute Engine VMs (any machine type) | Supported |
| GKE worker nodes (Compute Engine MIGs) | Supported |
| GKE Autopilot nodes | Not supported (nodes are managed by GCP) |
| Spot/Preemptible VMs | Supported (note: GCP may not start them back automatically) |
| Multi-zone targeting in a single run | Supported via comma-separated `ZONES` matching the order of `VM_INSTANCE_NAMES` |

---

## Permissions required

The Google service account used by the chaos pod (delivered through `GCP_AUTHENTICATION_SECRET` or Workload Identity) needs the following IAM permissions on the target project.

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

Granting the predefined role `roles/compute.instanceAdmin.v1` covers these and is the simplest setup.

Go to [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) to use Workload Identity instead of a service account key.

---

## Authentication

The fault supports two credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager File Secret | Chaos infrastructure runs outside GKE, or you want explicit static credentials | Upload the GCP service account JSON key as a **File Secret** in Harness Secret Manager and reference its identifier via `GCP_AUTHENTICATION_SECRET` |
| Workload Identity | Chaos infrastructure runs on GKE with Workload Identity enabled | Bind a Google service account to the chaos infra Kubernetes service account; no tunable changes required |

Go to [Creating secrets for GCP experiments](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to read the secret format. Go to [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) for Workload Identity.

---

## Fault tunables

Configure the following fault parameters when you add GCP VM instance stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_PROJECT_ID` | ID of the GCP project that contains the VM instances. | (required) |
| `VM_INSTANCE_NAMES` | Comma-separated list of VM instance names to stop (for example `vm-1,vm-2`). | (required) |
| `ZONES` | Comma-separated list of zones in the same order as `VM_INSTANCE_NAMES` (for example `us-central1-a,us-central1-b`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The VMs stay stopped for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `60` |
| `MANAGED_INSTANCE_GROUP` | When `enable`, the fault does not start the instances after the chaos; the MIG auto-healer recreates them. | `disable` |
| `SEQUENCE` | Order in which multiple instances are stopped: `parallel` stops all at once; `serial` stops them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the GCP service account JSON key. Not required when using Workload Identity. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Calls the Compute Engine API to stop each VM in `VM_INSTANCE_NAMES` (in the matching zone from `ZONES`), waits for `TOTAL_CHAOS_DURATION` seconds, then starts the VMs again (unless `MANAGED_INSTANCE_GROUP=enable`).

---

## Expected behavior during fault execution

- The target VMs transition `RUNNING` → `STOPPING` → `TERMINATED` and stay there for `TOTAL_CHAOS_DURATION`.
- For GKE worker nodes: pods on the node go to `NotReady`/`Unknown`, then the scheduler reschedules them onto healthy nodes.
- For VMs behind a load balancer: health checks on the affected backends start to fail and traffic shifts to healthy backends.
- When `MANAGED_INSTANCE_GROUP=enable`: the MIG auto-healer launches a replacement VM with a new instance ID.
- After the duration ends (and `MANAGED_INSTANCE_GROUP=disable`), the VMs transition back to `RUNNING`.

:::info When the fault ends
The chaos pod calls `instances.start` on every targeted VM unless `MANAGED_INSTANCE_GROUP=enable`. Boot time depends on the machine image and startup scripts.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `gcloud compute instances describe <vm> --zone=<zone> --format='value(status)'` and assert the state changed.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint behind the load balancer.
- **MIG health:** Use a command probe running `gcloud compute instance-groups managed describe <mig>` to confirm the auto-healer recreated the VM.

---

## Verify the fault execution effect

While the experiment is running, confirm the VM stopped and then restarted:

1. **Inspect VM state with gcloud.**

   ```bash
   gcloud compute instances describe <vm-name> \
     --zone=<zone> \
     --format="value(status)"
   ```

   The status should be `STOPPING`/`TERMINATED` during the chaos window and `RUNNING` afterwards.

2. **Inspect Cloud Monitoring metrics.**

   Use the Cloud Console to inspect `compute.googleapis.com/instance/uptime` and confirm the gap during the chaos window.

3. **Inspect Compute Engine audit logs.**

   ```bash
   gcloud logging read 'resource.type=gce_instance AND protoPayload.methodName=v1.compute.instances.stop' --limit=10
   ```

   The `stop` call from the chaos pod's service account should appear.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `instances.start` on every targeted VM (unless `MANAGED_INSTANCE_GROUP=enable`).
- **Abort the experiment:** Stopping the experiment from Chaos Studio also calls `instances.start`.
- **Manual recovery:** If the chaos pod exited before restarting the VM, run `gcloud compute instances start <vm-name> --zone=<zone>` manually.
- **Workload recovery:** Boot time depends on the machine image and startup scripts; GKE node `Ready` transitions usually complete within 2-3 minutes.

---

## Limitations

- **Same-project targeting:** A single experiment targets one `GCP_PROJECT_ID`. Use multiple experiments for cross-project scope.
- **Zone alignment:** `ZONES` must match `VM_INSTANCE_NAMES` positionally; mismatches return an `Instance not found` error.
- **Spot/preemptible behavior:** GCP may not start preempted Spot VMs back automatically; combine with `MANAGED_INSTANCE_GROUP=enable` for MIG-managed VMs.
- **GKE Autopilot:** Not supported because GCP manages the underlying nodes.
- **MIG mode skips restart:** When `MANAGED_INSTANCE_GROUP=enable`, recovery is fully driven by the MIG auto-healer; the fault does not call `instances.start`.

---

## Troubleshooting

<Troubleshoot
  issue="GCP VM instance stop fails with PermissionDenied in Harness Chaos Engineering"
  mode="docs"
  fallback="The service account used by the chaos pod does not have compute.instances.stop and compute.instances.start. Grant roles/compute.instanceAdmin.v1 (or the four permissions listed above) on the target project and re-run."
/>

<Troubleshoot
  issue="GCP VM instance stop fails with Instance not found"
  mode="docs"
  fallback="VM_INSTANCE_NAMES and ZONES must align positionally. Confirm with gcloud compute instances list --filter='name=<vm>' --format='value(zone)' that the zone is correct. Also confirm GCP_PROJECT_ID matches the project that owns the VMs."
/>

<Troubleshoot
  issue="VMs stayed STOPPED after the experiment ended"
  mode="docs"
  fallback="If MANAGED_INSTANCE_GROUP=disable and the chaos pod exited before restart, run gcloud compute instances start <vm-name> --zone=<zone> manually. If MANAGED_INSTANCE_GROUP=enable, check the MIG auto-healer (gcloud compute instance-groups managed describe <mig>) and confirm it created a replacement."
/>

---

## Related faults

- [GCP VM instance stop by label](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop-by-label): Stop a percentage of VMs selected by label instead of named ones.
- [GCP VM disk loss](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-disk-loss): Detach disks instead of stopping VMs.
- [GCP SQL instance failover](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-sql-instance-failover): Failover a Cloud SQL instance.
