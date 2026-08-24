---
title: Automated service onboarding
sidebar_label: Automated Service Onboarding
description: Use automated service onboarding to discover, scan, and onboard Kubernetes workloads in Harness Resilience Testing.
keywords:
  - service discovery
  - service onboarding
  - automated service onboarding
  - discovery agent
  - onboard infrastructure
  - resilience testing
  - greenfield
  - brownfield
tags:
  - chaos-engineering
  - service-discovery
sidebar_position: 40
redirect_from:
  - /docs/chaos-engineering/guides/service-discovery
---

Automated service onboarding discovers Kubernetes workloads, scans the workloads you select for risk, and creates Resilience Testing services in one guided flow. Service discovery continuously inventories what exists in your environment. Automated onboarding turns selected targets from that inventory into services you can test and attach probes to.

This page covers the automated Kubernetes path that runs when you onboard a Resilience Testing infrastructure. To add one workload after the bulk flow completes, go to [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding). For targets outside the Kubernetes inventory, such as Linux VMs, Windows VMs, or AWS resources, go to [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent).

:::info Feature Flag
Service onboarding is currently behind a feature flag (`CHAOS_RISK_SERVICES_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## Before you begin

- **A Kubernetes connector (or compatible connector):** Discovery needs a connector that can reach the cluster. Create the connector before you start onboarding.
- **A Resilience Testing infrastructure:** Infrastructure is the logical unit that tracks onboarding state and prevents you from onboarding the same infrastructure twice. It is not a second physical agent. Create the infrastructure before you run the onboarding wizard. Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) to create one.
- **Discovery agent concepts:** Go to [Service discovery](/docs/platform/service-discovery/) to understand how the Harness discovery agent scans a cluster on a schedule.
- **Cluster permissions:** The discovery agent needs read access to the workloads it scans. Go to [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions) to review the required RBAC.

:::tip Reuse the fault execution permissions
You can use the same [permissions granted for fault execution](/docs/resilience-testing/security/security-templates/openshift-scc#run-service-account-as-a-cluster-admin) for service discovery.
:::

---

## Two processes, not one

Keep these separate when you read the UI and this documentation.

| Process | Where it lives | What it does | Cadence |
|---|---|---|---|
| **Service discovery** | Discovery agent on the cluster (Project Settings → Discovery) | Builds and refreshes an inventory of workloads (and optionally network relationships) | Continuous. Runs on a schedule you configure on the agent. |
| **Automated service onboarding (Resilience Testing)** | Resilience Testing onboarding wizard | Selects targets from that inventory, scans them for risk, and creates Resilience Testing services with probes | One-time per infrastructure for the bulk wizard. You can still onboard individual services later. |

Discovery alone never creates a Resilience Testing service. A workload that appears in the discovery inventory stays untestable in Resilience Testing until you onboard it.

Go to [Services](/docs/resilience-testing/chaos-testing/services) to understand what an onboarded service is after the wizard finishes.

---

## Terminology

Use the product terms consistently.

| Term | Meaning |
|---|---|
| **Connector** | The Harness connection that reaches the cluster or cloud account. Discovery and infrastructure depend on it. |
| **Infrastructure** | The Resilience Testing logical unit bound to a connector and environment. It tracks whether onboarding has already run and blocks duplicate onboarding. |
| **Workload** | A discovered Kubernetes target in the inventory (for example a Deployment). Discovery reports workloads. |
| **Service** | The Resilience Testing entity created when you onboard a workload (or a custom target). Experiments, probes, and risks attach to services. |
| **Service ID** | The immutable identifier generated when the service is created. Experiments and probes reference this ID. Renaming the display name does not change it. |

---

## Greenfield and brownfield entry points

How you enter the wizard depends on whether the infrastructure already exists.

- **Greenfield:** You create a new Resilience Testing infrastructure. The **Onboard a new resilience testing infrastructure** wizard opens automatically after you save it, with the infrastructure step already complete.
- **Brownfield:** The infrastructure already exists. Go to **Resilience Testing → Overview** and select **Set Up** on the **Onboard a resilience testing infrastructure** card. Select **View Progress** to return to a run you already started.

An infrastructure marked **Already in use** has completed onboarding and cannot run the bulk wizard again. Go to [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding) to add another workload from the discovery inventory.

---

## How automated onboarding works

Resilience Testing onboarding runs in three stages.

1. **Discovery:** The discovery agent scans the infrastructure and builds an inventory of workloads. Network relationship discovery is optional and off by default. Enable the trace setting in advanced settings when you need topology edges between workloads.
2. **Scanning:** Harness runs a risk assessment against the services you select for onboarding. This stage is part of the new onboarding flow, and it records resilience risks against each service it scans.
3. **Onboarding:** Harness creates a Resilience Testing service for each selected workload, attaches the default probes for bulk onboarding, and reports what was created.

Discovery is read-only. Nothing in stage one is a chaos target until onboarding finishes in stage three.

### Choose an onboarding path

- **Automated service onboarding:** Use the infrastructure onboarding wizard to discover, scan, and onboard many Kubernetes workloads in one run. Use this path when you connect an infrastructure for the first time.
- **Manual service onboarding:** Add one workload from the discovery inventory without rerunning the bulk wizard. Go to [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding) for the single-service flow.
- **Custom Service Agent:** Define targets that do not come from the Kubernetes discovery inventory, such as Linux VMs, Windows VMs, and AWS resources. Go to [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent) for this path.

### What changed from the earlier flow

If you onboarded an infrastructure before services existed, three things are different.

- **Onboarding stops at services, probes, and risk scanning.** Earlier versions generated a large chaos experiment set during onboarding. Most experiments were never used. Generate experiments only for the services you choose to test.
- **You target services directly.** You no longer need an application map to address a single workload. Application maps remain a separate Insights feature and are not wired into this onboarding flow.
- **A single onboarding mode replaces the earlier choice.** The **Guided onboarding** and **Automatic onboarding** options are gone, and **Service Onboarding** is the only mode.

Legacy services remain usable. New onboarding is backward compatible, and legacy entry points redirect into the new flow when the feature flag is enabled.

---

## Select an infrastructure

Step 1 asks which existing infrastructure to onboard services for. It has two fields, and the second appears only once the first is set.

1. Select the environment the infrastructure belongs to, then select **Apply Selected**. Select **+ New Environment** if the environment does not exist yet.
2. Select the infrastructure, then select **Apply Selected**. The picker lists each one with its type, connector, and namespace, and marks whether it is **Compatible** with onboarding and whether it is **Already in use**. Select **+ New Infrastructure** if you need to create one.
3. Select **Next**.

**Already in use** means onboarding already completed for that infrastructure. **Apply Selected** stays disabled when you select it, so choose a different infrastructure or create one.

This step is already complete when the wizard opens straight after you create an infrastructure.

---

## Choose how to onboard

Step 2 asks **How would you like us to onboard your infrastructure?** Select the **Service Onboarding** card, which discovers workloads, scans selected targets for risk, associates probes, and onboards them for testing. The card carries a time estimate of roughly five minutes for a typical cluster.

Select **Go!** to run the flow with the default settings. To change the defaults for the chaos runner and the discovery agent before the scan starts, select **Configure Advanced Settings**.

In advanced settings:

- Configure the discovery agent schedule, namespaces, and service account. Go to [Customize discovery agent](/docs/platform/service-discovery/customize-agent) for the full option set.
- Enable network relationship (trace) discovery only when you need topology edges. It is disabled by default.

:::info GKE Autopilot clusters
On GKE Autopilot, enable **Use static name for configmap and secret** on the discovery agent. Without it, the agent cannot satisfy the security restrictions Autopilot enforces. Go to the [GKE Autopilot guide](/docs/resilience-testing/chaos-testing/gke-autopilot) for the full setup.
:::

---

## Discovery stage

The discovery stage scans the cluster. The panel on the left tracks each discovery step and its status, and the panel on the right renders the workloads as a topology graph as they are found.

While the scan runs, you can:

- **Filter by namespace:** Use the **Namespace** dropdown to focus on one namespace, or leave it on **All**.
- **Search:** Find a specific workload by name.
- **Change the view:** Switch between the topology graph and the list view, and zoom the graph or fit it to the window.

Individual steps in the checklist can report **Skipped** rather than **Completed**. Node detection is skipped when the discovery agent is not configured to scan nodes, which does not prevent discovery from succeeding.

Network edges appear only when you enabled the trace setting in advanced settings. Without it, you still get the workload inventory.

Select **Next** when discovery finishes.

---

## Scanning stage

After discovery, Harness scans the workloads you select for onboarding and records resilience risks against them. Use this stage to see configuration weaknesses before you spend time designing experiments.

What the scan produces matches a normal infrastructure risk scan: risk rules, severities, and findings per service. You can run the same scan again after onboarding.

:::info Findings are configuration based
A scan inspects declared configuration. It does not exercise the running system. Confirm important findings with chaos experiments after onboarding.
:::

---

## Onboarding stage

This stage is where discovered workloads become Resilience Testing services.

1. Review the list. Each entry shows the workload name and its namespace. Use the search field and the **Namespace** filter to narrow it down, or clear **Select All** to start from an empty selection.
2. Deselect any workload you do not intend to test. System namespaces and supporting workloads are included in discovery, and onboarding them adds services you do not need.
3. Select **Onboard Services** to create a service for each selected workload. The button shows the current count.

To connect the infrastructure without creating any services yet, select **Skip**. You can onboard services later from the Services page or by returning to the wizard progress view.

As onboarding runs, the left panel tracks each service to completion and the right panel lists the probes being attached. The report at the end names the infrastructure, the discovery agent, how many workloads were discovered, how many services were onboarded, how many probes were associated, and how long the run took.

### Default probes attached during onboarding

Bulk onboarding attaches three [built-in probe templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to every service it creates. All three are [command probes](/docs/resilience-testing/chaos-testing/probes/command-probe) that run the `healthchecks` utility against the Kubernetes API. Services you create one at a time start with no probes unless you attach them. Go to [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding) for that path.

| Probe | Identifier | What it validates |
|---|---|---|
| [Container Restart Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/container-restart-check) | `container-restart-check` | The restart count of the targeted container stays at or below the threshold, so the workload does not enter a crash loop. |
| [Pod Status Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-status-check) | `pod-status-check` | Every targeted pod reaches and holds a healthy `Running` state. |
| [Pod Warnings Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/pod-warnings-check) | `pod-warnings-check` | No warning events are raised against the targeted pods, such as image pull errors or scheduling failures. |

Each probe page documents the environment variables you can tune, such as the restart threshold and the status check timeout.

Harness reads the spec of the workload behind the service and populates each probe input from it:

| Input | Filled in from |
|---|---|
| `TARGET_NAMES` | The name of the workload the service represents. |
| `TARGET_NAMESPACE` | The namespace the workload runs in. |
| `TARGET_KIND` | The workload kind, such as `Deployment`. |
| `TARGET_LABELS` | Left empty. Add a comma separated list of labels to narrow the target further. |

Probes that poll for a result also arrive with their timing inputs set, such as `STATUS_CHECK_TIMEOUT` and `STATUS_CHECK_DELAY`. Every input stays editable. Harness appends a short random suffix to each probe name, such as `Container Restart Check-7habg`, so probes for different services stay distinguishable in the project probe list.

These probes contribute to the service resilience score the same way as probes you write yourself. Go to [Probes](/docs/resilience-testing/chaos-testing/probes) to understand how probe outcomes are weighted into the score.

:::info Onboarded count can be lower than the discovered count
The number of services created is often smaller than the number of workloads discovered, even when you leave every workload selected. Discovery reports everything the agent can see, including workload kinds that are not valid chaos targets, so those entries are not turned into services.
:::

---

## Next steps

- [Services](/docs/resilience-testing/chaos-testing/services): Review, filter, and manage the services onboarding created.
- [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding): Add one workload from a discovery agent after automated onboarding.
- [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent): Onboard Linux, Windows, AWS, and other custom targets.
- [Customize discovery agent](/docs/platform/service-discovery/customize-agent): Change the scan schedule, namespaces, and service account the agent uses.
- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Target an onboarded service with a fault.
