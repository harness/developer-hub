---
id: gcp
title: Chaos faults for GCP
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp
- /docs/chaos-engineering/chaos-faults/gcp
- /docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-service-kill
- /docs/chaos-engineering/chaos-faults/gcp/gcp-vm-service-kill
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

GCP faults disrupt resources that run on Google Cloud Platform: Compute Engine VM instances, persistent disks, and managed Cloud SQL instances. Each fault calls the GCP API (using a service account JSON key uploaded as a File Secret in Harness Secret Manager, or Workload Identity on GKE) to inject the disruption, then reverses it cleanly at the end of the configured duration. Go to [Authentication options](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to set up credentials, and [GCP IAM integration](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/gcp-iam-integration) to use Workload Identity.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="gcp">

### GCP SQL Instance Failover

GCP SQL instance failover triggers a failover on a high-availability Cloud SQL instance (`SQL_INSTANCE_NAME` in `GCP_PROJECT_ID`). The standby node becomes the new primary; the original primary becomes the new standby once the failover completes.

<Accordion color="green">
<summary>Use cases</summary>

- Test that application connection pools reconnect cleanly when the primary fails over.
- Validate that in-flight transactions surface clean rollback errors rather than data corruption.
- Confirm the failover time (typically 30-90s for Cloud SQL HA) fits the application's SLO.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="gcp">

### GCP VM disk loss

GCP VM disk loss detaches one or more named non-boot persistent disks (`DISK_VOLUME_NAMES` in `ZONES`/`GCP_PROJECT_ID`) from their attached VMs for `TOTAL_CHAOS_DURATION` seconds, then reattaches them on the same device path. Boot disks are excluded by design.

<Accordion color="green">
<summary>Use cases</summary>

- Test how a stateful workload (Postgres, MySQL, Cassandra) handles a brief storage outage.
- Validate that filesystems remount cleanly when the disk returns.
- Confirm DR snapshot strategies cover sudden volume loss.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="gcp">

### GCP VM disk loss by label

GCP VM disk loss by label resolves the set of non-boot persistent disks matching `DISK_VOLUME_LABEL` in `ZONES`/`GCP_PROJECT_ID`, picks `DISK_AFFECTED_PERCENTAGE` of them, detaches them from their attached VMs for `TOTAL_CHAOS_DURATION` seconds, then reattaches them.

<Accordion color="green">
<summary>Use cases</summary>

- Test how replicated stateful workloads survive losing a tagged subset of storage.
- Validate DR procedures for losing a labeled subset of disks across zones.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="gcp">

### GCP VM instance stop

GCP VM instance stop stops one or more Compute Engine VMs listed in `VM_INSTANCE_NAMES` (in `ZONES`/`GCP_PROJECT_ID`) for `TOTAL_CHAOS_DURATION` seconds, then starts them again. With `MANAGED_INSTANCE_GROUP=enable`, recovery is driven by the MIG auto-healer.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that managed instance groups recreate VMs inside the alerting SLA.
- Test GKE node-down handling when a worker VM disappears.
- Confirm that clients connected to stopped VMs fail over to surviving instances cleanly.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="gcp">

### GCP VM instance stop by label

GCP VM instance stop by label resolves Compute Engine VMs matching `INSTANCE_LABEL` in `ZONES`/`GCP_PROJECT_ID`, picks `INSTANCE_AFFECTED_PERCENTAGE` of them, stops them for `TOTAL_CHAOS_DURATION` seconds, then starts them again (unless `MANAGED_INSTANCE_GROUP=enable`).

<Accordion color="green">
<summary>Use cases</summary>

- Test how the workload survives losing a tagged subset of VMs across zones.
- Validate cluster-level resilience when multiple labeled VMs disappear at once.

</Accordion>

</FaultDetailsCard>
