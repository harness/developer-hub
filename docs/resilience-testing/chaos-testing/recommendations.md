---
title: Recommendations
description: Understand how Harness Resilience Testing recommends chaos experiments for your services and surfaces probes that need attention.
keywords:
  - recommendations
  - recommended experiments
  - chaos recommendations
  - k8s watcher
  - config scanner
  - resilience testing
tags:
  - chaos-engineering
  - recommendations
sidebar_position: 80
---

Harness Resilience Testing watches your infrastructure and your test results, and proposes the next thing worth doing. A recommendation is either an experiment Harness thinks you should run against a service, or a probe that is failing and needs your attention.

Recommendations replace the experiments that earlier versions of onboarding generated automatically. Rather than creating several hundred experiments up front and leaving you to find the useful ones, Harness now keeps a ranked list and creates an experiment only when you accept the suggestion.

---

## What you will learn from this topic

- **Why suggestions replaced bulk experiments:** What onboarding used to create automatically, and what you gain by accepting recommendations instead.
- **Where recommendations come from:** The three sources that produce them, and how to filter by source or category.
- **How to act on a recommendation:** What **+ Create** and **Fix** do, and how the status filter tracks your progress.

---

## Why recommendations replaced automatic experiments

Earlier versions of the onboarding flow created a chaos experiment set for every application map they built. A single onboarding run could produce several hundred experiments. Most were never run, and the few worth running were hard to find among the rest.

Recommendations invert that. Harness still works out which experiments are worth running, but it presents them as suggestions with a stated reason instead of creating them. You get the same coverage guidance without an experiment list you have to prune.

Go to [Service discovery and onboarding](/docs/resilience-testing/chaos-testing/service-discovery#what-changed-from-the-earlier-flow) to review the other onboarding changes.

---

## Where recommendations come from

Every recommendation records the source that produced it, and you can filter the list by source.

| Source | What it watches |
|---|---|
| **K8s Watcher** | The workloads a discovery agent found in your cluster. It proposes experiments that target weaknesses in how a workload is deployed, such as a deployment that runs a single replica. |
| **Internal Watcher** | The results of your own tests. It surfaces probes that returned an unexpected value, so a probe that has quietly started failing does not stay unnoticed. |
| **Config Scanner** | Configuration read from your setup, rather than live cluster state or test results. |

Recommendations also carry a category, which describes what the recommendation is about rather than where it came from. Filter by **Experiment**, **Pipeline**, or **Probes**.

---

## Review the recommendations list

Go to **Resilience Testing → Insights → Recommendations** to open the list. It sorts by **Last Added**, newest first, and opens filtered to the **Pending** status so you see only what you have not acted on yet.

| Column | What it shows |
|---|---|
| **Type** | The action the recommendation proposes, such as **CREATE** for an experiment Harness suggests you add. |
| **Recommended experiments** | The name of the proposed experiment or the probe that needs attention, with a **Copy ID** action and the tags that describe it, such as `source=K8sWatcher` and `fault=pod-delete`. |
| **Infrastructure/Pipeline** | The infrastructure or pipeline the recommendation applies to. |
| **Reason** | Why Harness raised it, written out in full. An experiment recommendation explains the weakness it targets, and a probe recommendation reports the value that was wrong. |
| **Source** | The watcher or scanner that produced it. |
| **Fix** | The action to take, either **+ Create** for a proposed experiment or **Fix** for a probe that needs attention. |

A **K8s Watcher** entry reads like a short piece of reasoning about your deployment. For a workload with one replica, for example, the reason explains that the single replica makes the application vulnerable to downtime and that the Pod Delete fault tests whether it recovers.

An **Internal Watcher** entry reports a concrete failure instead, such as a probe that expected a `200` response and received a `404`.

---

## Act on a recommendation

The action in the **Fix** column depends on the kind of recommendation.

### Create an experiment

An experiment recommendation offers **+ Create**, which adds the experiment Harness proposed. Use it instead of authoring an experiment from scratch when the reason describes a weakness you want to test.

### Work a suggested fix

A probe recommendation offers **Fix**, which opens the **Suggested Fixes** dialog. The dialog groups remediation guidance into collapsible sections written for the specific failure. For a probe that received a `404` where it expected a `200`, for example, the sections cover the URL, resource availability, server configuration, redirects, permissions, caching, and error handling.

Two actions close the dialog.

- **Acknowledge:** Records that you have picked the recommendation up. Its dropdown also offers **Create Jira Ticket for Fix Task**, which raises a ticket for the work.
- **Ignore:** Dismisses the recommendation.

Filter by **Status** to separate work you have handled from work you have not. A recommendation is **Pending** until you act on it, and the list also tracks **Acknowledged**, **Tracking**, and **Ignored** entries.

:::tip Start with the services you already onboarded
A service with no test activity is onboarded but unvalidated. Rather than designing an experiment for it yourself, look for a recommendation that names it and create that one. The services list shows which services have no runs against them.
:::

---

## Next steps

- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Edit and run an experiment a recommendation created.
- [Risks](/docs/resilience-testing/chaos-testing/risks): Understand the static weaknesses Harness detects alongside these recommendations.
