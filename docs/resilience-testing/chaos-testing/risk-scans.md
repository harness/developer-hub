---
title: Risk Scans
sidebar_label: Risk Scans
description: Run a pipeline scan or an infrastructure scan in Harness Resilience Testing to detect risks and generate a risk report.
keywords:
  - risk scan
  - pipeline scan
  - infrastructure scan
  - risk report
  - risk analysis
tags:
  - chaos-engineering
  - risks
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

A risk scan reads the manifests behind your applications, matches them against the Harness resilience rules, and produces a report of the risks it found. Run a scan when you want to know where your system is fragile before you spend time designing experiments.

You also get a scan during [service onboarding](/docs/resilience-testing/chaos-testing/service-discovery#scanning-stage), as the middle stage of the discovery → scanning → onboarding flow. This page covers the on-demand pipeline and infrastructure scans you start from Insights. Everything after collection, including the analysis, the scoring, and the report, is identical regardless of how the scan started.

:::info Feature Flag
Risk scans are currently behind a feature flag (`CHAOS_RESILIENCE_RISKS_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## Before you begin

- **A scan source:** Either a Harness pipeline with a deploy stage, or an infrastructure with a discovery agent and a connector that reaches the cluster. Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) to connect an infrastructure.
- **Risk concepts:** Go to [Risks](/docs/resilience-testing/chaos-testing/risks) to understand risk rules, severity, and the difference between a passive and a confirmed risk.
- **Project access:** Permissions to view and create resilience testing resources in the project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## How a scan runs

Every scan moves through three stages in order, and the status tells you which stage it is in.

1. **Collection:** Harness gathers the application manifests from the source. This is the only stage that differs between the two scan kinds.
2. **Analysis:** Harness matches the collected manifests against the risk rules and produces risks with severities attached.
3. **Reporting:** Harness assembles the findings into a downloadable risk report.

The status moves through **Pending**, **Collecting**, **Analyzing**, and **Reporting** before it reaches **Completed**. A scan that fails reports **Errored**, and one that is stopped reports **Aborted**. An errored scan can still show partial results, so treat its counts as incomplete rather than final.

---

## Run a scan

Choose the scan kind that matches the source you want to read from.

<Tabs>
<TabItem value="pipeline" label="Pipeline Scan" default>

A pipeline scan reads the application definition from a pipeline's deploy stage. Use it to catch risks in what a pipeline is about to deploy, before it reaches a cluster.

1. Go to **Resilience Testing → Insights → Pipeline Scans**.
2. Select **+ New Scan**.
3. Find the pipeline to scan. The list contains only pipelines that include a deploy stage, because the deploy stage is where the application manifests are available.
4. Select **Scan now** on that row, or open the dropdown beside it to choose between a **Rule-based Scan** and an **AI Scan**. Go to [Choose an analyzer](#choose-an-analyzer) to decide which one to use.

The scan starts as soon as you choose, and the new run appears at the top of the list.

:::info A pipeline is missing from the list
Only pipelines with a deploy stage can be scanned. A pipeline that only builds, tests, or runs custom stages has no application manifest for Harness to read, so it does not appear.
:::

Pipeline scans are available on Harness SaaS only. On Self-Managed Enterprise Edition, use an infrastructure scan instead. Go to [Risks](/docs/resilience-testing/chaos-testing/risks#availability-on-self-managed-enterprise-edition) to review what is supported where.

</TabItem>
<TabItem value="infrastructure" label="Infrastructure Scan">

An infrastructure scan reads the applications a discovery agent already found in a cluster. Use it to assess what is running now rather than what is about to be deployed.

1. Go to **Resilience Testing → Insights → Infrastructure Scans**.
2. Select **+ New Scan**. The **Scan a Kubernetes Infrastructure** dialog lists every discovery agent with the number of resources it found and the time of its last discovery.
3. Find the discovery agent to scan. Each scan maps to one discovery agent, and therefore to one infrastructure.
4. Select **Scan now** on that row, or open the dropdown beside it to choose between a **Rule-based Scan** and an **AI Scan**. Go to [Choose an analyzer](#choose-an-analyzer) to decide which one to use.

The scan starts as soon as you choose, and the new run appears at the top of the list.

Because the source is a discovery agent, the scan covers whatever that agent discovered on its last sweep. Go to [Customize discovery agent](/docs/platform/service-discovery/customize-agent) to change the namespaces or schedule the agent uses.

</TabItem>
</Tabs>

---

## Choose an analyzer

Both scan kinds offer two analyzers, chosen from the dropdown beside **Scan now**. The collection and reporting stages are the same either way, and only the analysis differs.

| Analyzer | Behavior |
|---|---|
| **Rule-based Scan** | Matches manifests against the risk rules with deterministic logic. Faster, and repeatable across runs. |
| **AI Scan** | Passes the manifests and the risk rules to an AI agent, which reasons about which risks apply. Slower, and better at context that fixed logic misses. |

Start with the rule based analyzer when you want quick, repeatable results in a pipeline. Use the AI analyzer when you want a closer reading of an application you are about to take to production.

The analyzer a scan used is recorded against it, so the scan list shows a **Rule-based Scan** or **AI Scan** label on every row and you can tell which reading produced which result.

---

## Review a completed scan

Select a scan to open it. The scan page opens with **About this Scan** in the left rail, holding the date of the scan and its status. A pipeline scan also names the **Pipeline** it read from, and an infrastructure scan names the **Environment** and the **Infrastructure**, both as links back to the source.

Three cards sit across the top of the page.

| Card | What it shows |
|---|---|
| **Pipeline Risk Score** or **Infrastructure Risk Score** | The risk score for the scan, out of 1000. The label tracks the scan type. |
| **Services Scanned** | How many services the scan read. |
| **Risks Detected** | The total risk count, broken down into Critical, High, Medium, and Low. |

Three sections follow.

- **Risk Detection Heatmap:** Services against risk rules, with each cell colored by severity. Go to [Risks](/docs/resilience-testing/chaos-testing/risks#the-risk-heat-map) to read it.
- **Services with risk:** Every affected service, sorted from highest to lowest severity composition, with a stacked **Risk Composition** bar per service.
- **Risks Detected:** The full list of risks, with a **Severity**, **Risk**, **Service**, and **Recommendation** column. Search it by risk name or sort by most recently detected.

---

## Download the risk report

A scan that reaches **Completed** offers a **Report** action in the scan list and a **PDF Report** button on the scan itself. Scans that errored or were aborted have no report to download.

The report is titled **Passive Risk Detection Report** and runs to nine pages. Its sections are numbered and move from summary to detail.

| Section | Contents |
|---|---|
| **Executive Summary** | The risk score, the counts by severity, a written overview of what the scan found, and a **Scanned via** table naming the scan type, organization, project, infrastructure, environment, and timestamp. |
| **Services Found in Infra** | Each service with its Resilience Risk Score and its counts by severity, plus whether the score sits above or below the recommended gate threshold of 500. The heading tracks the scan type, so a pipeline scan reads **Services Found in Pipeline**. |
| **Risks Found** | One card per risk, with its severity, a description of the weakness, and the services it affects. |
| **Risk Heatmap, Service by Risk Type** | Risk count per service per severity, where darker cells indicate higher concentration and the least severe rule columns are grouped into **Other**. |
| **Risk Composition by Service** | A doughnut chart per category, so you can see the split across Availability, Performance, Resilience, and Config at a glance. |
| **Recommendations & Next Steps** | The top services by Resilience Risk Score, with a **What we found** column and a **Recommended fix** column. |
| **How Harness Chaos Engineering Validates These Fixes** | The chaos experiments that verify the recommended fixes. |
| **Appendix, About This Report & Glossary** | How the scan was run, what it did and did not assess, and a glossary of the terms used, including RRS, HPA, PDB, and QoS. |

Go to [Risks](/docs/resilience-testing/chaos-testing/risks#severity-and-risk-score) to understand how the score is calculated.

---

## What a scan does not do

Scans are on-demand and single-source by design. Plan around the following limits.

- **One source per scan:** A scan targets a single pipeline or a single discovery agent. You cannot select several pipelines or several infrastructures in one scan.
- **No scheduled scans:** Scans do not run on a recurring schedule. Start each one yourself.
- **No trigger-based scans:** Scans cannot be started by an event or a pipeline trigger.

To keep risk data current, re-run the scan after a deployment that changes the manifests it read.

---

## Find an earlier scan

Both scan lists show every scan of that kind, one row per run, with these columns.

| Column | Contents |
|---|---|
| **Scan** | The scan name and its ID. |
| **Details** | The source it read from, and whether it ran as a **Rule-based Scan** or an **AI Scan**. |
| **Risk Score** | The score out of 1000, with a bar. |
| **Risks Detected** | The total, and the counts for Critical, High, Medium, and Low. |
| **Status** | **Completed**, **Errored**, or **Aborted**. |
| **Last Scanned** | Who ran it and when. |

Filter by source, which is the **Pipeline** dropdown for a pipeline scan and the **Discovery Agent** dropdown for an infrastructure scan, and filter by **Status** to separate completed runs from the rest. **Reset** clears the filters, search narrows by name, and the list sorts by **Last Scanned** with the newest first.

The row menu on each scan offers three actions. **JSON** opens the raw scan output, which is useful when you want the findings in a machine-readable form rather than the PDF. **Retry** runs the scan again against the same source, which is how you recover from an errored run. **Delete** removes the scan and its findings.

Because a scan is a point-in-time reading, the list doubles as a history. Compare two scans of the same source to see whether a mitigation actually reduced the risk count.

---

## Confirm the risks a scan found

A scan leaves every risk it finds in the **passive** state, which means the risk is detected but unproven. Confirm the ones that matter.

1. Review the risks by severity, starting with critical.
2. Associate the matching risk rule with a probe, in the **Risk Rule** step of the probe wizard under **Project Settings → Probes**.
3. Add that probe to a chaos experiment that targets the affected service.
4. Run the experiment. A probe failure moves the risk from **Passive** to **Confirmed**.

Go to [Risks](/docs/resilience-testing/chaos-testing/risks#passive-and-confirmed-risks) to understand the states in full.

---

## Troubleshooting

<Troubleshoot
  issue="A Harness pipeline does not appear in the list when creating a new pipeline scan in Resilience Testing"
  mode="general"
  fallback="Only pipelines that contain a deploy stage can be scanned, because that stage supplies the application manifests. Add a deploy stage to the pipeline, or run an infrastructure scan against the cluster instead."
/>

<Troubleshoot
  issue="A Resilience Testing risk scan stays in the Collecting stage and never reaches Analyzing"
  mode="general"
  fallback="Collection depends on the scan source. For an infrastructure scan, confirm the discovery agent is connected and has completed a sweep. For a pipeline scan, confirm the deploy stage resolves its manifests successfully."
/>

<Troubleshoot
  issue="A Resilience Testing infrastructure scan completes but returns far fewer risks than expected"
  mode="general"
  fallback="An infrastructure scan only covers what the discovery agent found on its last sweep, and not every risk rule applies to every application. Confirm the agent covers the namespaces you expect, then re-run the scan."
/>

---

## Next steps

- [Risks](/docs/resilience-testing/chaos-testing/risks): Understand risk rules, scoring, and the passive to confirmed lifecycle.
- [Probes](/docs/resilience-testing/chaos-testing/probes): Build the checks that confirm a risk.
- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Run a fault to verify a finding against a live system.
