---
title: Get Started
sidebar_label: Get Started
description: Connect an infrastructure, onboard your services, and run your first chaos experiment in Harness Resilience Testing.
keywords:
  - get started
  - quickstart
  - chaos experiment
  - service onboarding
  - resilience testing
tags:
  - chaos-engineering
  - get-started
sidebar_position: 5
redirect_from:
  - /docs/chaos-engineering/getting-started/getting-started
  - /docs/chaos-engineering/getting-started
  - /docs/chaos-engineering/getting-started/prerequisites
  - /docs/chaos-engineering/get-started/
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide takes you from an empty project to your first chaos experiment. You connect an infrastructure, onboard the services running in it, and then run a fault against one of them.

Onboarding is what makes the rest of the flow fast. Once your services are onboarded, Harness already knows what your chaos targets are and each one already has health probes attached, so building an experiment is a matter of picking a target and a fault.

---

## Before you begin

- **A Harness account with Resilience Testing access:** [Sign up](https://app.harness.io/auth/#/signup) if you do not have one, and confirm you can open the Resilience Testing module.
- **A target cluster:** A Kubernetes cluster with `kubectl` access. Go to [Supported platforms](/docs/resilience-testing/whats-supported) to confirm your target is supported.
- **Permissions on the target:** Administrator access to the cluster so that you can install the Harness Delegate. Go to [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions) to review the least-privilege alternative.
- **A Harness project:** Create one, or ask your administrator to add you to an existing project.

---

## Connect a chaos infrastructure

A chaos infrastructure is the connection between Harness and the cluster you want to test. On Kubernetes it runs through the Harness Delegate, so there is no separate chaos agent to install.

1. Install the Harness Delegate on the target cluster. Go to [Install Delegate](/docs/platform/delegates/install-delegates/overview) for the platform steps, and use the standard Delegate image rather than the minimal one.
2. Go to **Resilience Testing → Project Settings → Resilience Testing Infrastructures**.
3. Select the **Kubernetes (Harness Infrastructure)** tab, then select **+ New Infrastructure**.
4. Pick the environment the infrastructure belongs to, complete the infrastructure form, and select **Save**.

Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) for the full set of options, including the centralized delegate approach and least-privilege installs.

:::tip Start with a non-production environment
Run your first experiment against a non-production environment. You can target production once you are confident in the blast radius controls.
:::

---

## Onboard your services

Saving the infrastructure opens the **Onboard a new resilience testing infrastructure** wizard. Continuous discovery keeps inventing workloads in the cluster. This wizard is the one-time Resilience Testing flow that discovers, scans for risk, and onboards the workloads you select as services.

1. In Step 2, select the **Service onboarding** card, then select **Go!**.
2. Complete the **Discovery** stage so the agent invents the workload inventory.
3. Complete the **Scanning** stage so selected targets get a risk assessment.
4. In the **Onboarding** stage, deselect any workload you do not intend to test. Every discovered workload is selected by default, including system namespaces.
5. Select **Onboard Services** to create a service for each selected workload, then review the report summary.

Each service created in this bulk flow gets three health probes attached automatically, so you do not need to author validation before your first run.

Go to [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) for a detailed walkthrough of each stage. For Linux VMs, Windows VMs, or AWS resources outside Kubernetes discovery, go to [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent).

---

## Review your onboarded services

Go to **Resilience Testing → Insights → Services** to confirm the services were created. Each row shows the service name, its type, and the infrastructure it came from.

Go to [Services](/docs/resilience-testing/chaos-testing/services) to understand what onboarding created and how to add a service manually.

---

## Create your first chaos experiment

Start with **Pod Delete**. It has a small blast radius and is safe for most applications, which makes it a good first test.

1. Go to **Resilience Testing → Chaos Experiments** and select **New Experiment**.
2. Name the experiment, then select the infrastructure you connected.
3. Select **Add Fault**, then choose **Kubernetes → Pod → Pod Delete**.
4. Configure the fault:
    - **Target:** Select one of your onboarded services.
    - **Chaos duration:** Start with 30 seconds.
    - **Force:** Leave as `false` so that pods are deleted gracefully.
5. Add a probe if you want validation beyond the defaults. An [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against your application endpoint, expecting a `200` response, is a good starting point.
6. Save the experiment.

Go to [Pod Delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete) to review every tunable the fault supports.

:::tip Start from a recommendation
Harness generates recommended experiments for your services, so you can create one of those instead of building an experiment from scratch.
:::

---

## Run the experiment

Select **Run** to start the experiment. The execution view updates in real time, so you can watch the fault inject, the probes evaluate, and the target recover.

---

## Analyze the results

When the run finishes, the results view reports the resilience score alongside the outcome of every probe and fault.

Read the results as follows:

- **Passed probes:** Your application held up under the injected fault.
- **Failed probes:** A weakness the experiment exposed. This is a useful result, not a broken experiment.
- **Resilience score:** A weighted score across the probe and fault outcomes in the run. Go to [Probes](/docs/resilience-testing/chaos-testing/probes) to understand how the score is calculated.

---

## Troubleshooting

<Troubleshoot
  issue="The onboarding wizard discovers no services in the target cluster"
  mode="general"
  fallback="The discovery agent could not read workloads in the cluster. Confirm the Delegate is running and connected, and that the chaos service account has get, list, and watch on pods and deployments in the target namespaces. Then rerun onboarding from the module Overview."
/>

<Troubleshoot
  issue="Fewer services were onboarded than the number discovered in Harness Resilience Testing"
  mode="general"
  fallback="Discovery reports every workload the agent can see, including kinds that are not valid chaos targets, so the onboarded count is usually lower than the discovered count. Open Insights then Services to confirm which services were created, and onboard any missing target manually."
/>

<Troubleshoot
  issue="The chaos infrastructure stays Inactive after the Delegate is installed"
  mode="general"
  fallback="The infrastructure becomes Active only once the Delegate registers the chaos runner and the discovery agent completes its first sweep. Confirm the Delegate is connected in Project Settings, and that it uses the standard image rather than the minimal image, which lacks kubectl and go-template."
/>

---

## Next steps

You have connected an infrastructure, onboarded your services, and run your first experiment. Build on that with the following.

- [Services](/docs/resilience-testing/chaos-testing/services): Review and manage the services onboarding created.
- [Application maps](/docs/resilience-testing/chaos-testing/application-maps): Group related services so that you can test a whole application.
- [Chaos faults](/docs/chaos-engineering/faults/chaos-faults): Browse the fault library for other failure scenarios.
- [Probes](/docs/resilience-testing/chaos-testing/probes): Add your own validation on top of the default probes.
- [CI/CD integrations](/docs/resilience-testing/chaos-testing/integrations/cicd/harness-cd): Run chaos experiments automatically from your pipelines.
