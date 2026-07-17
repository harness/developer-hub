---
title: Overview
sidebar_label: Overview
sidebar_position: 10
description: Overview of the Kubernetes, Linux, and Windows chaos infrastructure types in Harness Chaos Testing, and where to manage them in the UI.
keywords:
  - chaos infrastructure
  - resilience testing
  - chaos testing
  - kubernetes
  - linux
  - windows
  - DDCR
  - delegate
tags:
  - chaos-engineering
  - infrastructure
redirect_from:
  - /docs/category/chaos-infrastructure
  - /docs/category/harness-dedicated-infrastructure
  - /docs/chaos-engineering/onboarding/harness-infra
  - /docs/chaos-engineering/technical-reference/architecture/kubernetes
  - /docs/chaos-engineering/get-started/prerequisites
  - /docs/chaos-engineering/features/chaos-infrastructure/introduction
  - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra
  - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/
  - /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure/
  - /docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures
  - /docs/chaos-engineering/features/chaos-infrastructure/disconnect-chaos-infrastructure
  - /docs/chaos-engineering/chaos-infrastructure/connect-chaos-infrastructures
  - /docs/chaos-engineering/chaos-infrastructure/disconnect-chaos-infrastructure
  - /docs/chaos-engineering/concepts/explore-concepts/infrastructures/
  - /docs/chaos-engineering/use-harness-ce/infrastructures
  - /docs/chaos-engineering/use-harness-ce/infrastructures/enable-disable
  - /docs/chaos-engineering/guides/infrastructures
  - /docs/chaos-engineering/guides/infrastructures/infrastructures
  - /docs/chaos-engineering/guides/infrastructures/ddcr-vs-dedicated
  - /docs/chaos-engineering/guides/infrastructures/enable-disable
  - /docs/chaos-engineering/guides/infrastructures/types
  - /docs/chaos-engineering/guides/infrastructures/types/types
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr-vs-dedicated
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra/
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra/legacy-infra
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra/kubernetes
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra/openshift
  - /docs/resilience-testing/chaos-testing/infrastructure/infrastructures
  - /docs/resilience-testing/chaos-testing/infrastructure/types
  - /docs/resilience-testing/chaos-testing/infrastructure/types/types
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr-vs-dedicated
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/legacy-infra
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/kubernetes
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/openshift
  - /docs/resilience-testing/chaos-testing/infrastructure/kubernetes-dedicated
---

## What you will learn

- What a chaos infrastructure is and why it is needed.
- The three supported types and how they map to the **Project Settings → Resilience Testing Infrastructures** UI.
- Where to go next to install, secure, and upgrade infrastructure.

---

## Where infrastructures live in the UI

Chaos infrastructures are managed per project under **Resilience Testing → Project Settings → Resilience Testing Infrastructures**. The page has one tab per supported type:

- **Kubernetes (Harness Infrastructure)**
- **Linux**
- **Windows**

Each infrastructure is scoped to a Harness **environment** (project, organization, or account-scoped). One environment can have multiple chaos infrastructures attached.

:::note Deprecated: Kubernetes (Dedicated Chaos Infrastructure)
You may also see a **Kubernetes (Dedicated Chaos Infrastructure)** tab. This is the legacy chaos-agent-based topology and is deprecated. New infrastructures cannot be created on it, and existing ones should be migrated to **Kubernetes (Harness Infrastructure)** (the DDCR flow) when possible.
:::

:::info Deleting environments
To delete an environment, first detach or delete every chaos infrastructure attached to it. The environment delete will fail while a referenced infrastructure exists.
:::

---

## Supported infrastructure types

Harness Chaos Testing supports three chaos infrastructure types. **Kubernetes** is recommended for all new setups; the others cover non-Kubernetes targets.

| Type | Target | Doc |
|---|---|---|
| **Kubernetes** | Kubernetes clusters, via the Harness Delegate (DDCR) | [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) |
| **Linux** | Linux VMs and Cloud Foundry | [Linux infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/linux) |
| **Windows** | Windows VMs | [Windows infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/windows) |

Chaos experiments against AWS, GCP, Azure, VMware, and bare-metal targets run **on top of** a Kubernetes chaos infrastructure (the runner pods execute there even when the fault hits a non-Kubernetes resource). Cloud Foundry experiments run on Linux infrastructure.

---

## Next steps

- [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes): install the Delegate-driven runner and connect a target cluster.
- [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions): review the Kubernetes RBAC the chaos service account needs.
- [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config): mTLS and Harness Network Proxy (HNP) settings for Kubernetes chaos infrastructure.
- [Upgrade Linux infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/linux/upgrade): upgrade an existing Linux install across releases.
- [Upgrade Windows infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/windows/upgrade): upgrade an existing Windows install across releases.

Before creating an infrastructure, [create an environment](/docs/chaos-engineering/guides/chaos-experiments/create-experiments#create-environment). A chaos infrastructure always lives inside an environment.
