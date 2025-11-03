---
title: GCP Command Probe Templates
sidebar_position: 2
description: Pre-built Command Probe templates for GCP infrastructure validation
---

import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection";
import ProbeTemplateCard from "@site/src/components/ChaosEngineering/ProbeTemplateCard";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import { gcpProbeTemplates } from "./templates";

# GCP Command Probe Templates {#introduction}

Pre-built Command Probe templates for validating Google Cloud Platform infrastructure health and status during chaos experiments. These templates help you quickly set up probes to monitor GCP resources like Cloud SQL instances, Compute Engine VMs, and persistent disks.

Here are GCP probe templates that you can use in your chaos experiments.

<ExperimentListSection experiments={gcpProbeTemplates} />

<ProbeTemplateCard category="gcp">

### GCP SQL Instance Status Check

Validates if a GCP Cloud SQL instance is in Running state.

**Required Environment Variables:**
- `SQL_INSTANCE_NAME`: Name of the Cloud SQL instance to check
- `GCP_PROJECT_ID`: GCP Project ID where the instance is located

<Accordion color="green">
<summary>Use cases</summary>

- Verify Cloud SQL instances remain available during chaos experiments
- Validate database failover behavior and recovery
- Monitor database health during network disruptions
- Ensure database availability during infrastructure changes

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="gcp">

### GCP VM Disk Status Check

Validates if a GCP Compute Engine persistent disk is in ready to use state.

**Required Environment Variables:**
- `DISK_VOLUME_NAMES`: Comma-separated list of persistent disk names (one of this or `DISK_VOLUME_LABEL` required)
- `DISK_VOLUME_LABEL`: Label of the persistent disk (one of this or `DISK_VOLUME_NAMES` required)
- `GCP_PROJECT_ID`: GCP Project ID where the disk is located
- `ZONES`: Comma-separated list of GCP zones where the disk is deployed

<Accordion color="green">
<summary>Use cases</summary>

- Verify persistent disks remain attached and ready during chaos experiments
- Validate disk availability after VM failures or restarts
- Monitor storage health during infrastructure chaos
- Ensure data persistence during compute disruptions

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="gcp">

### GCP VM Instance Status Check

Validates if a GCP Compute Engine VM instance is in Running state.

**Required Environment Variables:**
- `VM_INSTANCE_NAMES`: Comma-separated list of VM instance names (one of this or `INSTANCE_LABEL` required)
- `INSTANCE_LABEL`: Label of the VM instance (one of this or `VM_INSTANCE_NAMES` required)
- `GCP_PROJECT_ID`: GCP Project ID where the VM is located
- `ZONES`: Comma-separated list of GCP zones where the VM is deployed

<Accordion color="green">
<summary>Use cases</summary>

- Verify VM instances remain running during chaos experiments
- Validate instance recovery after failures or restarts
- Monitor VM health in multi-zone deployments
- Ensure compute availability during infrastructure chaos

</Accordion>
</ProbeTemplateCard>

