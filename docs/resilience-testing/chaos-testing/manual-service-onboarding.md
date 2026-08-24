---
title: Manual service onboarding
sidebar_label: Manual Service Onboarding
description: Onboard one Kubernetes workload as a Resilience Testing service from the discovery inventory.
keywords:
  - manual service onboarding
  - service onboarding
  - discovery agent
  - resilience testing service
tags:
  - chaos-engineering
  - services
  - service-discovery
sidebar_position: 50
---

Use manual service onboarding to add one Kubernetes workload from the discovery inventory as a Resilience Testing service. This path lets you add a workload after automated onboarding completes, without rerunning the infrastructure onboarding wizard.

:::info Feature flag
Service onboarding is currently behind a feature flag (`CHAOS_RISK_SERVICES_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

---

## Before you begin

- **Discovery agent:** A discovery agent that has found the Kubernetes workload you want to onboard.
- **Infrastructure:** A Resilience Testing infrastructure associated with the discovery agent.
- **Service access:** Permission to create Resilience Testing services in the project.

Use [automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) instead when you connect an infrastructure for the first time and want to discover, scan, and onboard multiple workloads in one run.

---

## Onboard a service manually

1. Navigate to **Resilience Testing**, then select **Insights** > **Services**.
2. Click **Resilience Testing Service**. The **Onboard a Resilience Testing Service** wizard opens.
3. In **Onboard Service**, select the **Discovery Agent** that found the workload. The picker shows the number of services each agent discovered and the time of its last discovery.
4. Click **Select Discovery Agent**.
5. In **Service**, select the workload to onboard. Use the **Namespace** filter to narrow the list. Each workload shows its namespace, IP address, and port number.
6. Click **Select Service**, then click **Next**.
7. In **Configure Metadata**, review the service details:

   - **Name:** Harness prefills the display name from the workload. Edit it when you need a different name in Resilience Testing.
   - **Service ID:** Harness generates this immutable identifier from the workload, namespace, and discovery agent.
   - **Description:** Add optional context about the service.
   - **Tags:** Add optional labels to organize and filter services.

8. Click **Next**.
9. In **Associate Probes**, click **Associate another probe** to attach a probe, then configure its inputs. Repeat this step for each probe the service requires.
10. Click **Finish**.

The service appears under **Insights** > **Services** after onboarding completes.

---

## Attach probes during manual onboarding

Manual onboarding does not attach the default probes from the automated onboarding flow. If you finish the wizard without step 9, the service starts with no health checks.

Attach probes during onboarding when you already know which service health signals to validate. Some probes, such as **Pod Status Check**, have no inputs to configure. Other probes prompt you for target or timing values.

Go to [Probes](/docs/resilience-testing/chaos-testing/probes) to review the available probe types and how their outcomes affect the resilience score.

---

## Use the correct onboarding path

- **Multiple discovered workloads:** Go to [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) to discover, scan, and onboard Kubernetes workloads in bulk.
- **One discovered workload:** Use the manual flow on this page.
- **Target outside the Kubernetes inventory:** Go to [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent) to define Linux VMs, Windows VMs, AWS resources, and other custom targets.

---

## Next steps

- Go to [Services](/docs/resilience-testing/chaos-testing/services) to manage the service and review its Resilience Testing activity.
- Go to [Probes](/docs/resilience-testing/chaos-testing/probes) to add or edit health checks.
- Go to [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments) to target the service with a fault.
