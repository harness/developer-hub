---
title: K8s Coverage
sidebar_label: K8s Coverage
description: Understand how Kubernetes AutoStopping discovers workloads, builds a Network Map, and recommends rules, and how it moves traffic detection out of the request path.
sidebar_position: 2.1
toc_max_heading_level: 4
redirect_from:
  - /docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/kubernetes-autostopping-v2/overview
---

## Introduction

**K8s Coverage** automatically discovers the applications running in your cluster, maps how their workloads communicate with each other, and recommends AutoStopping rules you can create in a single click. It combines cluster scanning with a lightweight eBPF agent that observes real traffic, so the map reflects how your workloads actually connect. The result is faster onboarding, rules that cover a whole application at once, and a simpler in-cluster architecture that keeps traffic detection out of the request path.

<DocImage path={require('./static/k8s-coverage-tab.png')} title="The K8s Coverage tab on the AutoStopping Rules page" />

<!-- TODO: confirm eBPF agent distribution (Harness-hosted Helm chart vs customer-managed manifest) before linking install specifics here. -->

:::note

K8s Coverage requires an AutoStopping controller (version 2.0.0 and later) that supports [multi-workload rules](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/single-multi-workload-rules). Discovery, the Network Map, and recommendations are all built by that controller, so a cluster running an earlier controller does not appear in K8s Coverage.

:::

---

## Workload Discovery

AutoStopping runs discovery continuously and refreshes the results periodically. It builds up a picture of your cluster in steps:

- First, it finds the workloads running in the cluster, but not yet how they connect.
- Next, it finds which workloads are exposed through an ingress, along with the hostnames and paths that reach them.
- Finally, as your workloads handle real traffic, the eBPF agent observes how they connect to each other, for example when one deployment calls another while serving a request.

:::note

AutoStopping supports only Deployments and StatefulSets. Discovery surfaces only these workload kinds; other kinds do not appear in recommendations.

:::

The eBPF agent runs as a DaemonSet on every node and observes activity at the kernel level, so it adds the connection information without sitting in the request path and without adding latency. It sends only connection metadata to Harness, such as timing, counts, and service identifiers. It does not send raw packets, payloads, HTTP headers, or pod logs.

<!-- TODO: link the data-privacy FAQ here once that page exists (spec lists it as a required doc). -->
<!-- Discovery interval: transcript "~10 min"; ADR 12 evaluation window "min 1 min, max 10 min". Keep "periodically" in the body until PM confirms the exact user-facing number for AutoStopping. -->

## The Network Map and Applications

Harness combines the discovery results into a Network Map. Workloads appear as nodes, the ingress that exposes them appears as its own node, and the connections between them appear as edges.

<DocImage path={require('./static/network-map.png')} title="Network Map of a discovered application" />

In this map, the ingress reaches two workloads, `alice` and `bob`. Both of them call `charlie`, so Harness groups the whole set into a single application.

From this map, Harness groups workloads that belong together into an **application**. An application is a grouping that Harness maintains, not a Kubernetes object, so there is no matching label or resource in your cluster. Harness groups workloads because they need to start and stop together: a workload that is exposed through an ingress is grouped with the other workloads it calls to serve a request, so the whole path comes up when a request arrives and goes down when it is idle.

Workloads can also be grouped because they share a dependency. In the map above, `alice` and `bob` are separate entry points, but both call `charlie`. Harness groups them into one application, because stopping `charlie` would affect both, so they need to start and stop together.

:::note

Grouping is persistent. After Harness detects a connection between two workloads, it keeps them grouped even if one is later removed, so an application does not split apart on its own.

:::

## Recommendations and Rule Creation

When an application is not yet covered by a rule, Harness creates a **recommendation** for it. A recommendation lists the workloads in that application and lets you create an AutoStopping rule for them. It is a ready-to-create rule for that application, so you do not have to work out which workloads belong in the rule.

When you create a rule from a recommendation, Harness sets it up in one step. You then configure how the rule behaves, such as the idle time before it stops workloads or a fixed schedule.

Every AutoStopping rule is defined in YAML. Harness composes this YAML for you from the recommendation, and you can still edit it directly if you prefer.

---

## Related Concepts

- [Set up K8s Coverage](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/k8s-coverage-setup): Install the controller, discover your application, and create a rule from a recommendation.
- [AutoStopping Rules overview](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/auto-stopping-rules): Understand how AutoStopping reduces spend on non-production resources.
