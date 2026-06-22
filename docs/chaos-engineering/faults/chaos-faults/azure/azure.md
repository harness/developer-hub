---
id: azure
title: Chaos faults for Azure
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure
- /docs/chaos-engineering/chaos-faults/azure
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

Azure faults disrupt resources that run on Microsoft Azure: Virtual Machines (standalone or VMSS), Azure Kubernetes Service (AKS) node pools, managed disks, App Service web apps, and Service Bus queues. Each fault calls the Azure Resource Manager API to inject the disruption, then reverses it cleanly at the end of the configured duration. Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to set up service principals, workload identity, or managed identity, and to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to grant the right RBAC roles.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="azure">

### Azure AKS node down

Azure AKS node down resolves the VMSS instances backing an AKS cluster (filtered by `TARGET_NODE_POOL_NAMES` and `TARGET_ZONES`), picks `NODE_AFFECTED_PERCENTAGE` of them, deallocates them for `TOTAL_CHAOS_DURATION` seconds, then starts them again.

<Accordion color="green">
<summary>Use cases</summary>

- Test that the scheduler reschedules pods inside the SLA when a percentage of AKS nodes disappear.
- Validate PodDisruptionBudgets across a node-down window.
- Test cluster autoscaler reaction time when pods become unschedulable.
- Simulate zone-level failures by targeting a single zone.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure disk loss

Azure disk loss detaches one or more managed data disks (`VIRTUAL_DISK_NAMES`) from their attached VMs for `TOTAL_CHAOS_DURATION` seconds, then reattaches them on the same LUN. OS disks are excluded by design.

<Accordion color="green">
<summary>Use cases</summary>

- Test how stateful workloads (databases, file servers) handle a brief storage outage.
- Validate that filesystems remount cleanly when the disk returns.
- Confirm DR snapshot strategies cover sudden volume loss.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure instance CPU hog

Azure instance CPU hog drives CPU utilization to `CPU_LOAD` percent (or saturates `CPU_CORES` cores) on the target VMs for `TOTAL_CHAOS_DURATION` seconds via the Azure VM run-command extension.

<Accordion color="green">
<summary>Use cases</summary>

- Test that application latency stays inside the SLA when compute headroom shrinks.
- Validate VMSS autoscale, AKS HPA, or App Service autoscale reaction time.
- Confirm critical processes keep getting CPU time during saturation.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure instance IO stress

Azure instance IO stress drives sustained disk read/write IO on the volume mounted at `VOLUME_MOUNT_PATH` of the target VMs for `TOTAL_CHAOS_DURATION` seconds via the Azure VM run-command extension.

<Accordion color="green">
<summary>Use cases</summary>

- Test that application latency degrades gracefully when storage is saturated.
- Validate Premium SSD burst credit and write-path back-off behavior.
- Confirm monitoring alerts on disk metrics fire inside the SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure instance memory hog

Azure instance memory hog consumes `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent of RAM) through `NUMBER_OF_WORKERS` workers on the target VMs for `TOTAL_CHAOS_DURATION` seconds via the Azure VM run-command extension.

<Accordion color="green">
<summary>Use cases</summary>

- Test that the OOM killer targets the right process under memory pressure.
- Validate GC pause behavior on JVM/CLR workloads.
- Confirm VMSS autoscale reaction time on memory metrics.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure instance stop

Azure instance stop deallocates one or more VMs listed in `AZURE_INSTANCE_NAMES` (or VMSS instance IDs when `SCALE_SET=enable`) for `TOTAL_CHAOS_DURATION` seconds, then starts them again.

<Accordion color="green">
<summary>Use cases</summary>

- Test how the workload behaves when a VM disappears.
- Validate VMSS auto-healing and AKS node-down handling.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure Service Bus queue state change

Azure Service Bus queue state change sets the status of one or more queues to `disabled`, `sendDisabled`, or `receiveDisabled` (via `ACTION`) for `TOTAL_CHAOS_DURATION` seconds, then restores `Active`.

<Accordion color="green">
<summary>Use cases</summary>

- Test that producers retry cleanly when sends are disabled.
- Validate consumer behavior when receives are disabled and the queue builds up.
- Confirm dead-letter handling under sustained chaos.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure web app access restrict

Azure web app access restrict adds an Access Restriction rule (`RULE_NAME`) to one or more App Service web apps with `ACTION` against `IP_ADDRESS_BLOCK` for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

<Accordion color="green">
<summary>Use cases</summary>

- Test that Traffic Manager / Front Door reroute traffic when an Access Restriction blocks the web app.
- Validate runbooks for removing a stale or misconfigured Access Restriction.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure web app stop

Azure web app stop calls the App Service `stop` API on one or more web apps for `TOTAL_CHAOS_DURATION` seconds, then starts them again.

<Accordion color="green">
<summary>Use cases</summary>

- Test how clients behave when an App Service web app is unavailable.
- Validate Traffic Manager / Front Door failover SLA.
- Confirm dependent services degrade gracefully and recover.

</Accordion>

</FaultDetailsCard>
