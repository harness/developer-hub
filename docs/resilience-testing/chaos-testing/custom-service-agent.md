---
title: Custom Service Agent
sidebar_label: Custom Service Agent
description: Create Resilience Testing services for Linux VMs, Windows VMs, AWS resources, and other targets that are not invented by Kubernetes discovery.
keywords:
  - custom service agent
  - custom discovery agent
  - linux vm
  - windows vm
  - aws custom service
  - service onboarding
tags:
  - chaos-engineering
  - services
  - service-discovery
sidebar_position: 60
---

Use the **Custom Service Agent** when the target you want to test is not coming from the Kubernetes discovery inventory. You define the service yourself under **Project Settings → Discovery**, then bind it to a Resilience Testing infrastructure so experiments and probes can run against it.

This path is separate from the bulk [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) wizard. Kubernetes discovery invents workloads from the cluster. Custom Service Agent invents the service record from the metadata you enter.

:::info Feature Flag
Service onboarding is currently behind a feature flag (`CHAOS_RISK_SERVICES_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## Before you begin

- **A Resilience Testing infrastructure:** Custom services require an explicit infrastructure assignment when you onboard them. Create the infrastructure first. Go to [Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure) to set one up.
- **A connector that reaches the target:** Use a connector that can reach the VM, cloud account, or endpoint you are describing.
- **Kubernetes discovery path when applicable:** If the target is a workload already visible to a discovery agent, use [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) for multiple workloads or [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding) for one workload instead of recreating it by hand.

---

## Where Custom Service Agent lives

1. Go to **Resilience Testing → Project Settings → Discovery** (Project Discovery).
2. Open the **Custom Discovery Agent** (also labeled **Custom Service Agent** in the detail view).
3. The list shows every custom service in the project, with **Name**, **Type**, and who last updated it.

From here you can search, filter by **Type**, and select **+ New Custom Service**.

---

## Supported custom service types

When you select **+ New Custom Service**, the library groups the types you can create:

| Category | Types |
|---|---|
| **Kubernetes** | Service, Workload, Node |
| **AWS** | Classic Load Balancer, Network Load Balancer, Application Load Balancer, EC2 Instance, Lambda, Relational Database Service |
| **Linux** | Linux VM, Linux VM Process |
| **Windows** | Windows VM, Windows VM Process |
| **Other** | Other |

Pick the type that matches the target. The wizard steps that follow depend on that type. The rest of this page uses **Linux VM** as the worked example. Other types follow the same Overview → configuration pattern with fields appropriate to that resource.

---

## Create a Linux VM custom service

1. On **Custom Service Agent**, select **+ New Custom Service**.
2. In the library, select **Linux VM**.

### Overview

Enter the service metadata.

| Field | Description |
|---|---|
| **Name** | Display name for the service. |
| **Id** | Service ID generated from the name. Edit it before you create the service if you need a stable identifier for automation. After creation, treat it as immutable. |
| **Description** | Optional. |
| **Tags** | Optional labels for filtering. |

Select **Next**.

### Endpoint configuration

Describe how Harness reaches the VM. Add one or more of:

- **FQDN**
- **IP Address**
- **Socket Path**

Select **+ Add** for each value you need, then select **Next**.

### Service configuration

Enter the VM details Harness stores on the service:

| Field | Example |
|---|---|
| **Hostname** | `my-linux-server.example.com` |
| **OS Distribution** | `Ubuntu`, `CentOS`, `RHEL` |
| **OS Version** | `20.04`, `8.4` |
| **Kernel** | `5.4.0-74-generic` |

Select **Create** to finish.

Assign the service to a Resilience Testing infrastructure when the flow asks for it. Custom services do not inherit infrastructure from a discovery agent the way Kubernetes discovered workloads do.

---

## After you create a custom service

- The service appears in **Insights → Services** with its type (for example `Linux VM`).
- Attach probes and target the service from Chaos Studio the same way you do for discovered services. Go to [Services](/docs/resilience-testing/chaos-testing/services#use-a-service-to-fill-in-probe-inputs-in-chaos-studio) for probe input fill-in.
- Run risk scans and experiments against it once the infrastructure binding is in place.

---

## Custom Service Agent compared with Kubernetes discovery

| | Kubernetes discovery onboarding | Custom Service Agent |
|---|---|---|
| **How targets appear** | Discovery agent invents workloads from the cluster | You invent the service from metadata you enter |
| **Typical use** | Greenfield or brownfield cluster onboarding | Linux or Windows VMs, AWS resources, other non-inventory targets |
| **Infrastructure** | Bound through the infrastructure you onboard | Must assign infrastructure explicitly |
| **Default probes** | Attached in bulk discovery onboarding | Attach probes yourself after creation |
| **Risk scanning in wizard** | Part of the three-stage onboarding flow | Run a risk scan after the service exists |

---

## Next steps

- [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery): Discover, scan, and onboard Kubernetes workloads in bulk.
- [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding): Add one workload from the discovery inventory.
- [Services](/docs/resilience-testing/chaos-testing/services): Manage services after they exist.
- [Infrastructure](/docs/resilience-testing/chaos-testing/infrastructure): Create the infrastructure custom services must bind to.
- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Target a custom service with a fault.
