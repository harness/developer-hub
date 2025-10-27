---
title: Kubernetes Command Probe Templates
sidebar_position: 3
description: Pre-built Command Probe templates for Kubernetes resource validation
---

import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection";
import ProbeTemplateCard from "@site/src/components/ChaosEngineering/ProbeTemplateCard";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import { kubernetesProbeTemplates } from "./templates";

# Kubernetes Command Probe Templates {#introduction}

Pre-built Command Probe templates for validating Kubernetes resource health and status during chaos experiments. These templates help you quickly set up probes to monitor pods, nodes, containers, and other Kubernetes resources.

Here are Kubernetes probe templates that you can use in your chaos experiments.

<ExperimentListSection experiments={kubernetesProbeTemplates} />

<ProbeTemplateCard category="kubernetes">

### Container Restart Check

Container restart check validates the restart count of a container.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter pods
- `TARGET_NAMES`: Comma-separated list of target pod names
- `TARGET_NAMESPACE`: Namespace of the target pods
- `TARGET_CONTAINER`: Name of the container to check restart count
- `CONTAINER_RESTART`: Maximum allowed restart count

<Accordion color="green">
<summary>Use cases</summary>

- Verify containers don't restart excessively during chaos experiments
- Monitor container stability during resource stress
- Validate application resilience to failures
- Ensure pods maintain healthy restart counts

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Node Status Check

Node status check validates the current state of Kubernetes nodes.

**Required Environment Variables:**
- `TARGET_NODE`: Comma-separated list of nodes to be checked
- `TARGET_NODES`: Comma-separated list of nodes to be checked
- `NODE_LABEL`: Node label to filter nodes (e.g., `node-role.kubernetes.io/worker=`)

<Accordion color="green">
<summary>Use cases</summary>

- Verify nodes remain healthy during chaos experiments
- Validate node recovery after failures
- Monitor cluster health during node-level chaos

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Pod Replica Count Check

Pod replica count check validates the current replica count of Kubernetes pods.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter resources
- `TARGET_NAMES`: Comma-separated list of target resource names
- `TARGET_NAMESPACE`: Namespace of the target resources
- `TARGET_KIND`: Kind of the target resource (e.g., deployment, statefulset)
- `MINIMUM_HEALTHY_REPLICA_COUNT`: Minimum healthy replica count for the target

<Accordion color="green">
<summary>Use cases</summary>

- Verify deployments maintain desired replica count
- Validate auto-scaling behavior during load chaos
- Monitor application availability during pod failures
- Ensure high availability during chaos experiments

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Pod Resource Utilisation Check

Pod resource utilisation check validates the current resource utilisation metrics of Kubernetes pods.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter pods
- `TARGET_NAMES`: Comma-separated list of target pod names
- `TARGET_NAMESPACE`: Namespace of the target pods
- `METRIC_TYPE`: Metric type to check (cpu or memory)
- `CPU_LIMIT`: CPU usage limit in millicores
- `MEMORY_LIMIT`: Memory usage limit in MB

<Accordion color="green">
<summary>Use cases</summary>

- Monitor resource usage during stress chaos experiments
- Verify resource limits are respected
- Validate application performance under load
- Ensure pods don't exceed resource thresholds

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Pod Startup Time Check

Pod startup time check validates the startup time of Kubernetes pods.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter pods
- `TARGET_NAMES`: Comma-separated list of target pod names
- `TARGET_NAMESPACE`: Namespace of the target pods
- `STARTUP_DURATION_CUTOFF`: All pods should start within this duration (in seconds)

<Accordion color="green">
<summary>Use cases</summary>

- Validate pods start within acceptable timeframes
- Monitor deployment performance during rollouts
- Detect slow startup issues during chaos experiments
- Ensure application readiness times are optimal

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Pod Status Check

Pod status check validates the current state of Kubernetes pods.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter pods
- `TARGET_NAMES`: Comma-separated list of target pod names
- `TARGET_NAMESPACE`: Namespace of the target pods

<Accordion color="green">
<summary>Use cases</summary>

- Verify pods remain in Running state during chaos experiments
- Validate pod health after failures and restarts
- Monitor application availability continuously
- Ensure pods recover to healthy state after disruptions

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="kubernetes">

### Pod Warnings Check

Pod warnings check checks for warnings in the pod events.

**Required Environment Variables:**
- `TARGET_LABELS`: Comma-separated list of target labels to filter pods
- `TARGET_NAMES`: Comma-separated list of target pod names
- `TARGET_NAMESPACE`: Namespace of the target pods

<Accordion color="green">
<summary>Use cases</summary>

- Monitor pod health indicators during chaos experiments
- Detect configuration issues during experiments
- Validate application behavior under stress
- Identify potential problems before they become critical

</Accordion>
</ProbeTemplateCard>

