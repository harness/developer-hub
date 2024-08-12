---
title: Prerequisites
sidebar_position: 1
description: Resources required to run chaos experiments on target environments.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites
---

This topic describes the [prerequisites](#permissions-required) that you need to fulfill before executing chaos experiments and [steps to execute chaos experiments on your target environments](#steps-to-create-and-execute-a-hce-experiment).

## Required permissions

- Obtain the permissions required and prepare your target system (VM or K8s):
	- Prepare yourself with the [right permissions](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) (`Chaos Resources Role Permissions` in `Access Control`). Your target system or application can reside on a VM or a K8s cluster, prepare accordingly.
	- Prepare yourself with the respective permissions on the cloud account or the [Kubernetes cluster](/docs/category/permissions) or the VM (Kube RBAC, [IAM Roles](/docs/chaos-engineering/chaos-faults/aws/security-configurations/aws-iam-integration)): Depending on the platform where you wish to execute your chaos experiments, you will need specific permissions.

- Enable the necessary Feature Flags (as a general step) and corresponding sanity checks (such as places to click, and entities to see enabled): Some features may be behind a Feature Flag. You can contact [Harness Support](mailto:support@harness.io) to enable the flag feature for your account.

- Prepare [network connectivity, firewall rules](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/) (if any), and identify [proxy requirements](/docs/category/configure-proxy-on-self-managed-enterprise-edition),.

- Identify application (or infrastructure) steady-state parameters (even if this requires manual effort)- using APMs or logs or other methods: You can use [resilience probes](/docs/chaos-engineering/features/resilience-probes/overview) to monitor your application and validate the data.

- Identify image registry requirements and steps to set up the registry with secrets: Chaos experiments use Docker images that need to be stored in a repository. In HCE, these images are hosted in [image registry](/docs/chaos-engineering/features/image-registry).

- Identify specific needs, especially for Kubernetes. You might need to specify the following while creating a chaos experiment:
	- [Namespace quotas](/docs/chaos-engineering/architecture-and-security/security/namespace-considerations): Ensure that you configure the namespace in the right manner to limit the exposure of all services of your application.
	- Workload-specific labels or annotations
	- Workload resource limits
	- [Proxy environments for outbound container](/docs/chaos-engineering/chaos-faults/cloud-foundry/permissions/)
	- Specific nodes or groups where workloads should reside

- Identify permissions for advanced use cases, which may vary, such as [SCC](/docs/chaos-engineering/architecture-and-security/security/security-templates/openshift-scc), [IRSA](/docs/chaos-engineering/chaos-faults/aws/security-configurations/aws-iam-integration#authentication-methods), etc.: For advanced use cases, you may require the administrator to control the pods in your cluster, that requires security policies, such as [PSP](/docs/chaos-engineering/architecture-and-security/security/security-templates/psp), [Kyverno](/docs/chaos-engineering/architecture-and-security/security/security-templates/kyverno-policies) to enforce runtime security, and so on.

- [ChaosHub requirements and connectivity to Git sources](/docs/chaos-engineering/features/chaos-hubs/add-chaos-hub): To add custom chaos experiments based on your requirements, you can add a custom ChaosHub.

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