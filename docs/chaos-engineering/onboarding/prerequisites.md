---
title: Prerequisites
sidebar_position: 1
description: Resources required to run chaos experiments on target environments.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites/
---

This topic describes the [prerequisites](#permissions-required) that you need to fulfill before executing chaos experiments and [steps to execute chaos experiments on your target environments](#steps-to-create-and-execute-a-hce-experiment).

## Required permissions

- Prepare yourself with the right permissions (`Chaos Resources Role Permissions` in `Access Control`).

- Prepare yourself with the right permissions on the cloud account or the Kubernetes cluster or the VM (Kube RBAC, IAM Roles).

- Enable the necessary Feature Flags (as a general step) and corresponding sanity checks (such as places to click, and entities to see enabled).
- Prepare the target systems (VMs or K8s).

- Prepare **network connectivity**, identify **proxy requirements**, **firewall rules** (if any).

- Identify application (or infrastructure) steady-state parameters (even if this requires manual effort)- using APMs or logs or other methods.

- Identify image registry requirements and steps to set up the registry with secrets.

- Identify specific needs, especially for Kubernetes. You might need to specify:
	- Namespace quotas

	- Workload-specific labels or annotations

	- Workload resource limits

	- Proxy environments for outbound container

	- Specific nodes or groups where workloads should reside

- Identify permissions for advanced use cases, which may vary, such as SCC, IRSA, etc.

- ChaosHub requirements and connectivity to Git sources.

## Steps to create and execute a HCE experiment

You can execute a chaos experiment by:

1. [Fulfilling the resource requirements](/docs/chaos-engineering/onboarding/prerequisites.md): In this step, you can create resources or get the required permissions to create the necessary resources.

2. [Adding an environment](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.

3. [Adding a chaos infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.

4. [Validating the chaos infrastructure installation](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner.

5. [Creating a demo application](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your application on which you can execute chaos experiments.

6. [Creating and running a chaos experiment](/docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments.md): Once you have set up your application, you can decide which resources to target and execute the chaos experiments on.

The steps mentioned earlier required some reading and exploring, but if you want a head start to your chaos journey, enter [automated onboarding](/docs/chaos-engineering/onboarding/single-click-onboarding) and [guided onboarding](/docs/chaos-engineering/onboarding/guided-onboarding).

These onboarding methods will guide you in creating and executing chaos experiments with the click of a button, without the hassle of explicitly creating environment, infrastructure and other entities!